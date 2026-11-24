import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { validId } from "./participant-auth";

const cookieName = "mezhdu_nami_ad_click";

function signature(clickId: string, secret: string) {
    return createHmac("sha256", secret).update(`ad-click-session:${clickId}`).digest("hex");
}

export function setAdClick(response: NextResponse, clickId: string, secret: string) {
    response.cookies.set(cookieName, `${clickId}.${signature(clickId, secret)}`, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });
}

export function sessionAdClick(request: NextRequest) {
    const value = request.cookies.get(cookieName)?.value;
    const secret = process.env.AD_CLICK_SECRET;
    if (!value || !secret) return undefined;

    const [clickId, digest, extra] = value.split(".");
    if (!validId(clickId) || !digest || !/^[a-f0-9]{64}$/.test(digest) || extra !== undefined) return undefined;

    if (timingSafeEqual(Buffer.from(digest, "hex"), Buffer.from(signature(clickId, secret), "hex"))) {
        return clickId;
    }
}
