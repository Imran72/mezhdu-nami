"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { TOP_MAIL_COUNTER_ID } from "./top-mail-config";
import { analyticsUrl, initialReferrer } from "../lib/analytics-url";

type PageView = {
    id: string;
    type: "pageView";
    start: number;
    url: string;
    referrer: string;
};

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
