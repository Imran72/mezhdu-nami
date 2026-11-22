"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { TOP_MAIL_COUNTER_ID } from "./top-mail-config";

type PageView = {
    id: string;
    type: "pageView";
    start: number;
    url: string;
    referrer: string;
};

const privateRoute = /^\/(invite|test|waiting|result|report)(?:\/.*)?$/;
const campaignParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "rb_clickid"];

function analyticsUrl(url: URL) {
    const page = new URL(url.origin);
    const route = privateRoute.exec(url.pathname);
    page.pathname = route ? `/${route[1]}` : url.pathname;
    if (page.pathname === "/result" && url.searchParams.get("checkout") === "1") {
        page.searchParams.set("checkout", "1");
    }
    for (const key of campaignParams) {
        const value = url.searchParams.get(key);
        if (value) page.searchParams.set(key, value);
    }
    return page.href;
}

function initialReferrer() {
    try {
        const referrer = new URL(document.referrer);
        return referrer.origin === window.location.origin ? analyticsUrl(referrer) : referrer.origin;
    } catch {
        return "";
    }
}

export default function TopMailCounter() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const query = searchParams.toString();
    const lastView = useRef<{ navigation: string; url: string } | null>(null);

    useEffect(() => {
        const navigation = query ? `${pathname}?${query}` : pathname;
        if (lastView.current?.navigation === navigation) return;

        const url = analyticsUrl(new URL(navigation, window.location.origin));
        const page = window as Window & { _tmr?: { push(view: PageView): unknown } };
        const queue: { push(view: PageView): unknown } = page._tmr ?? [];
        page._tmr = queue;
        queue.push({
            id: TOP_MAIL_COUNTER_ID,
            type: "pageView",
            start: Date.now(),
            url,
            referrer: lastView.current?.url ?? initialReferrer(),
        });
        lastView.current = { navigation, url };
    }, [pathname, query]);

    return (
        <Script
            id="tmr-code"
            src="https://top-fwz1.mail.ru/js/code.js"
            strategy="afterInteractive"
            referrerPolicy="strict-origin"
        />
    );
}
