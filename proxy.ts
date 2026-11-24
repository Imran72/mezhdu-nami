import { createHmac, randomUUID } from "node:crypto";
import { isIP } from "node:net";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { setAdClick } from "./lib/ad-attribution";
import { admin } from "./lib/supabase";

export const config = { matcher: "/" };

const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const writeTimeoutMs = 350;
type Campaign = Record<(typeof utmKeys)[number], string | null>;
type AdClick = Campaign & {
    click_id: string;
    created_at: string;
    ip_hash: string | null;
    user_agent: string | null;
    referer: string | null;
    is_preview: boolean;
    is_suspicious: boolean;
};

function bounded(value: string | null, max: number) {
    return value?.replaceAll("\0", "").slice(0, max) ?? null;
}

export function proxy(request: NextRequest, event: NextFetchEvent) {
    const incoming = request.nextUrl.searchParams;
    const utm = Object.fromEntries(utmKeys.map(key => [key, bounded(incoming.get(key), 256)])) as Campaign;
    if (!Object.values(utm).some(value => value?.trim())) {
        return NextResponse.next();
    }

    const response = NextResponse.next();
    response.headers.set("Cache-Control", "private, no-store");
    if (request.method !== "GET") return response;

    const createdAt = new Date().toISOString();
    const clickId = randomUUID();
    const userAgent = bounded(request.headers.get("user-agent"), 512);
    const purpose = [request.headers.get("purpose"), request.headers.get("sec-purpose")].join(" ");
    const preview = request.headers.has("next-router-prefetch")
        || request.headers.has("next-router-segment-prefetch")
        || request.headers.get("rsc") === "1"
        || incoming.has("_rsc")
        || /prefetch|prerender|preview/i.test(purpose)
        || /bot\b|crawler|spider|preview|slackbot|discordbot|facebookexternalhit|vkshare|telegrambot/i.test(userAgent ?? "");
    const suspicious = preview || !userAgent || /^(curl|wget|python-requests)\b/i.test(userAgent);
    const secret = process.env.AD_CLICK_SECRET;
    if (secret && !preview) setAdClick(response, clickId, secret);

    // Railway's public HTTP ingress overwrites X-Real-IP.
    const ip = request.headers.get("x-real-ip")?.trim();
    const ipHash = ip && isIP(ip) && secret
        ? createHmac("sha256", secret).update(`ad-click-ip:${ip}`).digest("hex")
        : null;

    event.waitUntil(recordAdClick({
        click_id: clickId,
        created_at: createdAt,
        ...utm,
        ip_hash: ipHash,
        user_agent: userAgent,
        referer: bounded(request.headers.get("referer"), 2048),
        is_preview: preview,
        is_suspicious: suspicious,
    }));
    return response;
}

async function recordAdClick(row: AdClick) {
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
        const write = admin().from("ad_clicks").insert(row).abortSignal(controller.signal).retry(false);

        const deadline = new Promise<never>((_, reject) => {
            timer = setTimeout(() => {
                controller.abort();
                reject(new Error("Ad click write timed out"));
            }, writeTimeoutMs);
        });
        const { error } = await Promise.race([write, deadline]);
        if (error) console.error("Could not record ad click", error.code);
    } catch {
        console.error("Ad click write failed or timed out");
    } finally {
        clearTimeout(timer);
    }
}
