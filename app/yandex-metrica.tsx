"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { analyticsUrl, initialReferrer } from "../lib/analytics-url";
import { trackMetricaView } from "../lib/yandex-metrica";

export default function YandexMetrica() {
    const pathname = usePathname();
    const query = useSearchParams().toString();
    const lastView = useRef<{ navigation: string; url: string } | null>(null);

    useEffect(() => {
        const navigation = query ? `${pathname}?${query}` : pathname;
        if (lastView.current?.navigation === navigation) return;

        const url = analyticsUrl(new URL(navigation, window.location.origin));
        trackMetricaView(url, lastView.current?.url ?? initialReferrer());
        lastView.current = { navigation, url };
    }, [pathname, query]);

    return (
        <Script
            id="yandex-metrica"
            src="https://mc.yandex.ru/metrika/tag.js?id=114586778"
            strategy="afterInteractive"
            referrerPolicy="strict-origin"
        />
    );
}
