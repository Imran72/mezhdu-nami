"use client";

import Link from "next/link";
import { useEffect } from "react";
import { trackMetricaGoal } from "../lib/yandex-metrica";

const visitorKey = "mezhdu-nami-visitor";
let sessionVisitorId: string | undefined;

function visitorId() {
    if (sessionVisitorId) return sessionVisitorId;

    try {
        const saved = window.localStorage.getItem(visitorKey);
        if (saved) return (sessionVisitorId = saved);
    } catch {
        // Use an in-memory ID when browser storage is unavailable.
    }

    sessionVisitorId = window.crypto.randomUUID();
    try {
        window.localStorage.setItem(visitorKey, sessionVisitorId);
    } catch {
        // Views and clicks still share an ID until the page is reloaded.
    }
    return sessionVisitorId;
}

function track(event: "home_opened" | "test_started") {
    try {
        void fetch("/api/home-event", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ event, visitorId: visitorId() }),
            keepalive: true,
        }).catch(() => {});
    } catch {
        // Analytics should not interfere with the test.
    }
}

export default function StartTestLink() {
    useEffect(() => {
        track("home_opened");
    }, []);

    return (
        <Link href="/start" className="story-button" onClick={() => {
            trackMetricaGoal("test_started");
            track("test_started");
        }}>
            Пройти тест вдвоём <span aria-hidden="true">→</span>
        </Link>
    );
}
