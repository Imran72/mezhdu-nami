"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { PLAN_PRICE_LABEL } from "../../../lib/plan-price";
import type { ScoreResult } from "../../../lib/scoring";
import { trackMetricaGoal } from "../../../lib/yandex-metrica";
import { StoryArt, StoryCard, StoryHeader, StoryHeading, StoryState } from "../../story";

type Result = Pick<ScoreResult, "scores" | "highlights"> & {
    waiting?: boolean;
    couple: {
        partner_a_name?: string | null;
        partner_b_name?: string | null;
        paid?: boolean;
    };
};

const reportContents = [
    "Ваши сильные стороны",
    "Различия в ожиданиях",
    "5 вопросов для разговора",
    "Небольшой эксперимент для двоих",
];

export default function ResultPage() {
    const { coupleId } = useParams<{ coupleId: string }>();
    const router = useRouter();
    const checkout = useSearchParams().get("checkout") === "1";
    const resultUrl = `/result/${coupleId}`;
    const reportUrl = `/report/${coupleId}`;
    const [data, setData] = useState<Result>();
    const [error, setError] = useState("");
    const [paying, setPaying] = useState(false);
    const [paymentError, setPaymentError] = useState("");

    useEffect(() => {
        const request = new AbortController();
        async function loadResult() {
            try {
                const response = await fetch(`/api/report?id=${encodeURIComponent(coupleId)}`, {
                    cache: "no-store",
                    signal: request.signal,
                });
                if (!response.ok) throw new Error("Не удалось загрузить результат.");
                const result: Result = await response.json();
                if (request.signal.aborted) return;
                if (result.waiting) {
                    router.replace(`/waiting/${coupleId}`);
                    return;
                }
                setData(result);
            } catch {
                if (!request.signal.aborted) setError("Не удалось загрузить результат.");
            }
        }
        loadResult();
        return () => request.abort();
    }, [coupleId, router]);

    async function pay() {
        if (paying) return;
        setPaying(true);
        setPaymentError("");
        try {
            const response = await fetch("/api/payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ coupleId }),
            });
            const result = await response.json();
            if (!response.ok || !result.confirmation_url) throw new Error(result.error || "Не удалось открыть оплату");
            window.location.assign(result.confirmation_url);
        } catch (err) {
            setPaymentError(err instanceof Error ? err.message : "Не удалось открыть оплату");
            setPaying(false);
        }
    }

    if (error) return <StoryState>{error}</StoryState>;
    if (!data) return <StoryState>Сравниваем ваши ответы…</StoryState>;

    const nameA = data.couple.partner_a_name || "Первый участник";
    const nameB = data.couple.partner_b_name || "Второй участник";

    if (checkout && !data.couple.paid) {
        return (
            <main className="story story-checkout">
                <StoryHeader back={resultUrl} coral />
                <StoryHeading scene="checkout" />
                <StoryArt scene="checkout" />
                <ul className="story-checklist">
                    {reportContents.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}
                </ul>
                <section className="story-price">
                    <h2 className="story-rays">{PLAN_PRICE_LABEL}</h2>
                    <p>Один раз за полный разбор пары.</p>
                </section>
                <button className="story-button" type="button" disabled={paying} onClick={pay}>
                    {paying ? "Открываем оплату…" : "Перейти к оплате →"}
                </button>
                {paymentError && <p className="story-error" role="alert">{paymentError}</p>}
                <p className="story-note"><span aria-hidden="true">▣ </span>Оплата на защищённой странице ЮKassa.</p>
            </main>
        );
    }

    const { sameAnswers, closeAnswers, differentAnswers } = data.scores;
    const match = data.highlights.same[0];
    const difference = data.highlights.different[0] ?? data.highlights.close[0];
    return (
        <main className="story story-result">
            <StoryHeader coral />
            <p className="story-pill story-names">{nameA} + {nameB}</p>
            <StoryHeading scene="result" />
            <StoryArt scene="result" />
            <div className="story-stats">
                <span className="story-pill">✓ Совпали: {sameAnswers}</span>
                <span className="story-pill story-pill-peach"><span aria-hidden="true">ϟ </span>Есть различия: {closeAnswers + differentAnswers}</span>
            </div>
            {match && <StoryCard icon="♡" title="На одной волне" lilac><p>{match.question}</p><p>Оба выбрали «{match.labelA}».</p></StoryCard>}
            {difference && <StoryCard icon="☏" title="Есть что обсудить"><p>{difference.question}</p></StoryCard>}
            <section className="story-callout">
                <h2>Хотите разобраться глубже?</h2>
                <Link
                    href={data.couple.paid ? reportUrl : `${resultUrl}?checkout=1`}
                    className="story-button"
                    onClick={() => {
                        if (data.couple.paid) return;
                        trackMetricaGoal("full_report_clicked");
                        void fetch("/api/full-report-click", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ coupleId }),
                            keepalive: true,
                        }).catch(() => {});
                    }}
                >
                    {data.couple.paid ? "Открыть полный разбор →" : `Полный разбор · ${PLAN_PRICE_LABEL} →`}
                </Link>
            </section>
        </main>
    );
}
