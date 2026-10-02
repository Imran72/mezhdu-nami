"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { ReactNode } from "react";

type Couple = {
    id: string;
    partner_a_name?: string | null;
    partner_b_name?: string | null;
};

type ApiResponse = {
    waiting?: boolean;
    couple?: Couple;
    scores?: {
        overall?: number;
        sameAnswers?: number;
        closeAnswers?: number;
        differentAnswers?: number;
    };
};

type CategoryScore = {
    title: string;
    subtitle: string;
    value: number;
};

type BenefitIcon =
    | "heart"
    | "message"
    | "lightning"
    | "chart";

const MAX_SCORE = 10;
const PAID_IMAGE = "/images/full-report-couple.png";

export default function ResultPage() {
    const params = useParams();
    const router = useRouter();

    const coupleId = String(params.coupleId ?? "");

    const [data, setData] =
        useState<ApiResponse | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        if (!coupleId) {
            setLoading(false);
            return;
        }

        let cancelled = false;

        async function loadResult() {
            try {
                const response = await fetch(
                    `/api/report?id=${encodeURIComponent(coupleId)}`,
                    {
                        cache: "no-store",
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        "Не удалось загрузить результат"
                    );
                }

                const result =
                    (await response.json()) as ApiResponse;

                if (cancelled) {
                    return;
                }

                if (result.waiting) {
                    router.replace(
                        `/waiting/${coupleId}`
                    );
                    return;
                }

                setData(result);
            } catch (error) {
                console.error(error);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadResult();

        return () => {
            cancelled = true;
        };
    }, [coupleId, router]);

    const categories =
        useMemo<CategoryScore[]>(() => {
            const same =
                data?.scores?.sameAnswers ?? 0;

            const close =
                data?.scores?.closeAnswers ?? 0;

            const different =
                data?.scores?.differentAnswers ?? 0;

            const total = Math.max(
                same + close + different,
                1
            );

            const base = Math.round(
                ((same + close * 0.5) / total) *
                MAX_SCORE
            );

            const clamp = (value: number) =>
                Math.max(
                    0,
                    Math.min(MAX_SCORE, value)
                );

            return [
                {
                    title: "Дружба",
                    subtitle:
                        "хорошо ли вам просто вдвоём",
                    value: clamp(base + 1),
                },
                {
                    title: "Партнёрство",
                    subtitle:
                        "вы команда или каждый сам за себя",
                    value: clamp(base),
                },
                {
                    title: "Секс",
                    subtitle:
                        "совпадает ли ваше представление о близости",
                    value: clamp(base + 2),
                },
                {
                    title: "Деньги",
                    subtitle:
                        "одинаково ли вы смотрите на траты",
                    value: clamp(base - 2),
                },
                {
                    title: "Забота",
                    subtitle:
                        "понимаете ли вы «я рядом» одинаково",
                    value: clamp(base + 1),
                },
                {
                    title: "Быт",
                    subtitle:
                        "как вам живётся в обычный вторник",
                    value: clamp(base - 1),
                },
            ];
        }, [data]);

    const yearsForecast =
        useMemo(() => {
            const overall =
                data?.scores?.overall ?? 50;

            if (overall >= 88) return 40;
            if (overall >= 80) return 25;
            if (overall >= 72) return 14;
            if (overall >= 64) return 8;
            if (overall >= 56) return 5;
            if (overall >= 48) return 3;
            if (overall >= 40) return 2;

            return 1;
        }, [data]);

    const forecastPosition =
        useMemo(() => {
            const points = [
                { years: 1 / 12, position: 2 },
                { years: 1, position: 18 },
                { years: 5, position: 36 },
                { years: 10, position: 54 },
                { years: 25, position: 74 },
                { years: 60, position: 98 },
            ];

            if (
                yearsForecast <= points[0].years
            ) {
                return points[0].position;
            }

            for (
                let i = 0;
                i < points.length - 1;
                i++
            ) {
                const current = points[i];
                const next = points[i + 1];

                if (
                    yearsForecast >= current.years &&
                    yearsForecast <= next.years
                ) {
                    const ratio =
                        (yearsForecast -
                            current.years) /
                        (next.years -
                            current.years);

                    return (
                        current.position +
                        ratio *
                        (next.position -
                            current.position)
                    );
                }
            }

            return 98;
        }, [yearsForecast]);

    const nameA =
        data?.couple?.partner_a_name ||
        "Вы";

    const nameB =
        data?.couple?.partner_b_name ||
        "Партнёр";

    if (loading) {
        return (
            <main className="state">
                <div className="state-brand">
                    между нами.
                </div>

                <style jsx>{`
                    .state {
                        min-height: 100vh;
                        display: grid;
                        place-items: center;
                        background: #f8f4f1;
                    }

                    .state-brand {
                        font-family:
                            Georgia,
                            "Times New Roman",
                            serif;
                        font-size: 30px;
                        font-weight: 700;
                    }
                `}</style>
            </main>
        );
    }

    if (!data) {
        return (
            <main className="state">
                Не получилось загрузить результат.

                <style jsx>{`
                    .state {
                        min-height: 100vh;
                        display: grid;
                        place-items: center;
                        padding: 24px;
                        background: #f8f4f1;
                        font-family:
                            Arial,
                            Helvetica,
                            sans-serif;
                    }
                `}</style>
            </main>
        );
    }

    return (
        <main className="page">
            <div className="content-shell">
                <header className="header">
                    <div className="brand">
                        между нами.
                    </div>

                    <div className="couple-names">
                        <span>{nameA}</span>
                        <b>×</b>
                        <span>{nameB}</span>
                    </div>
                </header>

                <section className="results">
                    <div className="section-label">
                        ВАШ РЕЗУЛЬТАТ
                    </div>

                    <div className="category-list">
                        {categories.map(
                            (category) => (
                                <CategoryRow
                                    key={category.title}
                                    {...category}
                                />
                            )
                        )}
                    </div>
                </section>

                <section className="forecast">
                    <div className="forecast-copy">
                        <div className="section-label">
                            ПРОГНОЗ
                        </div>

                        <h2>
                            Примерная
                            <br />
                            длительность
                            <br />
                            ваших отношений
                        </h2>

                        <p>
                            на основании
                            ИИ-модели
                        </p>
                    </div>

                    <div className="forecast-right">
                        <div className="years">
                            <strong>
                                {yearsForecast}
                            </strong>

                            <span>
                                {getYearWord(
                                    yearsForecast
                                )}
                            </span>
                        </div>

                        <div className="forecast-scale">
                            <div className="scale">
                                <div
                                    className="scale-progress"
                                    style={{
                                        width: `${forecastPosition}%`,
                                    }}
                                />

                                <div
                                    className="scale-dot"
                                    style={{
                                        left: `${forecastPosition}%`,
                                    }}
                                />

                                <div className="scale-tick tick-1" />
                                <div className="scale-tick tick-2" />
                                <div className="scale-tick tick-3" />
                                <div className="scale-tick tick-4" />
                            </div>

                            <div className="scale-labels">
                                <span>1 месяц</span>
                                <span>1 год</span>
                                <span>5 лет</span>
                                <span>10 лет</span>
                                <span>25 лет</span>
                                <span>вся жизнь</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className="paid-section">
                <div className="paid-card">
                    <div className="paid-art">
                        <img
                            className="art-main"
                            src={PAID_IMAGE}
                            alt=""
                            draggable={false}
                        />

                        <img
                            className="art-blur"
                            src={PAID_IMAGE}
                            alt=""
                            draggable={false}
                        />

                        <div className="art-fade" />
                        <div className="art-glow" />
                    </div>

                    <div className="paid-content">
                        <div className="paid-copy">
                            <div className="paid-label">
                                ПОЛНЫЙ РАЗБОР
                            </div>

                            <h2>
                                Как продлить
                                <br />
                                ваши годы вместе.
                            </h2>
                        </div>

                        <div className="benefits">
                            <Benefit
                                icon="heart"
                                text={
                                    <>
                                        Где вы можете
                                        <br />
                                        не понимать друг друга
                                    </>
                                }
                            />

                            <Benefit
                                icon="lightning"
                                text={
                                    <>
                                        Что может стать
                                        <br />
                                        причиной ссор
                                    </>
                                }
                            />

                            <Benefit
                                icon="message"
                                text={
                                    <>
                                        Что каждый ждёт
                                        <br />
                                        от отношений
                                    </>
                                }
                            />

                            <Benefit
                                icon="chart"
                                text={
                                    <>
                                        Как сделать вашу
                                        <br />
                                        пару крепче
                                    </>
                                }
                            />
                        </div>

                        <button
                            type="button"
                            className="paid-cta"
                            onClick={() =>
                                router.push(
                                    `/report/${coupleId}`
                                )
                            }
                        >
                            <span className="cta-title">
                                Открыть полный разбор
                            </span>

                            <span className="cta-right">
                                <strong>
                                    299 ₽
                                </strong>

                                <b>→</b>
                            </span>
                        </button>

                        <div className="paid-note">
                            один разбор · для вас двоих · сразу после оплаты
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                :global(*) {
                    box-sizing: border-box;
                }

                :global(body) {
                    margin: 0;
                    background: #f8f4f1;
                    color: #201c1e;
                }

                .page {
                    min-height: 100vh;
                    padding-bottom: 72px;
                    overflow-x: hidden;
                    background: #f8f4f1;
                }

                .content-shell {
                    width: min(
                        920px,
                        calc(100% - 56px)
                    );
                    margin: 0 auto;
                }

                .header {
                    min-height: 78px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    border-bottom:
                        1px solid #ddd5d2;
                }

                .brand {
                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;
                    font-size: 24px;
                    font-weight: 700;
                    letter-spacing: -1.1px;
                }

                .couple-names {
                    display: flex;
                    gap: 9px;
                    align-items: center;
                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 1px;
                    color: #8f8588;
                    text-transform: uppercase;
                }

                .couple-names b {
                    color: #c2215a;
                }

                .section-label {
                    margin-bottom: 14px;
                    color: #c2215a;
                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;
                    font-size: 10px;
                    font-weight: 800;
                    letter-spacing: 2.2px;
                }

                .results {
                    padding: 42px 0 38px;
                }

                .forecast {
                    padding: 38px 0 50px;
                    display: grid;
                    grid-template-columns:
                        minmax(280px, 0.95fr)
                        minmax(360px, 1.05fr);
                    gap: 56px;
                    align-items: center;
                    border-top:
                        1px solid #dcd4d1;
                }

                .forecast-copy h2 {
                    margin: 0;
                    max-width: 460px;
                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;
                    font-size: 42px;
                    line-height: 1.01;
                    font-weight: 400;
                    letter-spacing: -2px;
                }

                .forecast-copy p {
                    margin: 12px 0 0;
                    color: #958b8e;
                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;
                    font-size: 11px;
                    line-height: 1.4;
                    letter-spacing: 0.1px;
                    text-transform: lowercase;
                }

                .years {
                    display: flex;
                    align-items: baseline;
                    color: #c21856;
                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;
                }

                .years strong {
                    font-size: 76px;
                    line-height: 0.88;
                    font-weight: 400;
                    letter-spacing: -4px;
                }

                .years span {
                    margin-left: 9px;
                    font-size: 39px;
                }

                .forecast-scale {
                    margin-top: 24px;
                }

                .scale {
                    position: relative;
                    height: 8px;
                    border-radius: 999px;
                    background: #e5dfe0;
                }

                .scale-progress {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    border-radius: inherit;
                    background:
                        linear-gradient(
                            90deg,
                            #efb6c9 0%,
                            #da6b93 100%
                        );
                }

                .scale-dot {
                    position: absolute;
                    z-index: 4;
                    top: 50%;
                    width: 21px;
                    height: 21px;
                    border:
                        4px solid #f8f4f1;
                    border-radius: 50%;
                    background: #c21856;
                    box-shadow:
                        0 2px 8px
                        rgba(104, 18, 52, 0.18);
                    transform:
                        translate(-50%, -50%);
                }

                .scale-tick {
                    position: absolute;
                    z-index: 2;
                    top: 50%;
                    width: 3px;
                    height: 3px;
                    border-radius: 50%;
                    background:
                        rgba(132, 113, 120, 0.42);
                    transform:
                        translate(-50%, -50%);
                }

                .tick-1 {
                    left: 18%;
                }

                .tick-2 {
                    left: 36%;
                }

                .tick-3 {
                    left: 54%;
                }

                .tick-4 {
                    left: 74%;
                }

                .scale-labels {
                    position: relative;
                    height: 28px;
                    margin-top: 12px;
                    color: #948b8e;
                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;
                    font-size: 9px;
                    white-space: nowrap;
                }

                .scale-labels span {
                    position: absolute;
                    transform: translateX(-50%);
                }

                .scale-labels span:nth-child(1) {
                    left: 0;
                    transform: none;
                }

                .scale-labels span:nth-child(2) {
                    left: 18%;
                }

                .scale-labels span:nth-child(3) {
                    left: 36%;
                }

                .scale-labels span:nth-child(4) {
                    left: 54%;
                }

                .scale-labels span:nth-child(5) {
                    left: 74%;
                }

                .scale-labels span:nth-child(6) {
                    right: 0;
                    transform: none;
                }

                .paid-section {
                    width: min(
                        1500px,
                        calc(100% - 40px)
                    );
                    margin: 12px auto 0;
                }

                .paid-card {
                    position: relative;
                    width: 100%;
                    min-height: 430px;
                    overflow: hidden;
                    border-radius: 24px;
                    background:
                        linear-gradient(
                            135deg,
                            #b0134f 0%,
                            #c8175c 48%,
                            #c0135b 100%
                        );
                    isolation: isolate;
                }

                .paid-art {
                    position: absolute;
                    inset: 0;
                    z-index: 1;
                    overflow: hidden;
                }

                .art-main {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    width: 58%;
                    height: 100%;
                    display: block;
                    object-fit: cover;
                    object-position: 50% 50%;
                    pointer-events: none;
                    user-select: none;
                    z-index: 1;
                }

                .art-blur {
                    position: absolute;
                    inset: -4%;
                    width: 82%;
                    height: 108%;
                    object-fit: cover;
                    object-position: 50% 50%;
                    filter: blur(30px);
                    transform: scale(1.03);
                    opacity: 0.98;
                    pointer-events: none;
                    z-index: 2;
                    mask-image:
                        linear-gradient(
                            90deg,
                            transparent 34%,
                            rgba(0, 0, 0, 0.05) 42%,
                            rgba(0, 0, 0, 0.16) 49%,
                            rgba(0, 0, 0, 0.38) 58%,
                            rgba(0, 0, 0, 0.62) 67%,
                            rgba(0, 0, 0, 0.84) 77%,
                            black 88%
                        );
                    -webkit-mask-image:
                        linear-gradient(
                            90deg,
                            transparent 34%,
                            rgba(0, 0, 0, 0.05) 42%,
                            rgba(0, 0, 0, 0.16) 49%,
                            rgba(0, 0, 0, 0.38) 58%,
                            rgba(0, 0, 0, 0.62) 67%,
                            rgba(0, 0, 0, 0.84) 77%,
                            black 88%
                        );
                }

                .art-fade {
                    position: absolute;
                    inset: 0;
                    z-index: 3;
                    pointer-events: none;
                    background:
                        linear-gradient(
                            90deg,
                            rgba(176, 19, 79, 0) 33%,
                            rgba(176, 19, 79, 0.05) 42%,
                            rgba(176, 19, 79, 0.14) 50%,
                            rgba(176, 19, 79, 0.28) 58%,
                            rgba(176, 19, 79, 0.48) 66%,
                            rgba(176, 19, 79, 0.7) 75%,
                            rgba(176, 19, 79, 0.88) 85%,
                            #b0134f 100%
                        );
                }

                .art-glow {
                    position: absolute;
                    inset: 0;
                    z-index: 4;
                    pointer-events: none;
                    background:
                        radial-gradient(
                            circle at 66% 8%,
                            rgba(255, 178, 210, 0.18) 0%,
                            rgba(255, 178, 210, 0.08) 20%,
                            rgba(255, 178, 210, 0) 42%
                        );
                }

                .paid-content {
                    position: relative;
                    z-index: 10;
                    min-height: 430px;
                }

                .paid-copy {
                    position: absolute;
                    top: 38px;
                    left: 56%;
                    width: 38%;
                    max-width: 510px;
                }

                .paid-label {
                    margin-bottom: 10px;
                    color: rgba(255, 244, 247, 0.8);
                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;
                    font-size: 9px;
                    line-height: 1;
                    font-weight: 700;
                    letter-spacing: 2.3px;
                }

                .paid-copy h2 {
                    margin: 0;
                    color: #fff9f6;
                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;
                    font-size:
                        clamp(38px, 3.9vw, 58px);
                    line-height: 0.95;
                    font-weight: 400;
                    letter-spacing: -1.7px;
                    text-shadow:
                        0 2px 18px
                        rgba(64, 0, 28, 0.16);
                }

                .benefits {
                    position: absolute;
                    top: 177px;
                    left: 56%;
                    right: 34px;
                    display: grid;
                    grid-template-columns:
                        repeat(2, minmax(0, 1fr));
                    column-gap: 34px;
                    row-gap: 22px;
                }

                .paid-cta {
                    position: absolute;
                    z-index: 20;
                    right: 28px;
                    bottom: 44px;
                    width: 46%;
                    height: 62px;
                    padding: 0 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    border: 0;
                    border-radius: 17px;
                    background: #fffaf7;
                    color: #201d1e;
                    cursor: pointer;
                    box-shadow:
                        0 12px 28px
                        rgba(67, 0, 29, 0.12);
                    transition:
                        transform 160ms ease,
                        box-shadow 160ms ease;
                }

                .paid-cta:hover {
                    transform: translateY(-2px);
                    box-shadow:
                        0 16px 35px
                        rgba(67, 0, 29, 0.16);
                }

                .cta-title {
                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;
                    font-size: 14px;
                    font-weight: 600;
                    letter-spacing: -0.1px;
                }

                .cta-right {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    color: #c71e57;
                }

                .cta-right strong {
                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;
                    font-size: 26px;
                    line-height: 1;
                    font-weight: 400;
                    white-space: nowrap;
                }

                .cta-right b {
                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;
                    font-size: 27px;
                    line-height: 1;
                    font-weight: 300;
                }

                .paid-note {
                    position: absolute;
                    right: 28px;
                    bottom: 18px;
                    width: 46%;
                    color:
                        rgba(255, 240, 244, 0.64);
                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;
                    font-size: 9px;
                    text-align: center;
                }

                @media (max-width: 1180px) {
                    .paid-card,
                    .paid-content {
                        min-height: 410px;
                    }

                    .art-main {
                        width: 59%;
                    }

                    .paid-copy {
                        top: 34px;
                        left: 55.5%;
                        width: 39%;
                    }

                    .benefits {
                        top: 168px;
                        left: 55.5%;
                        right: 28px;
                        column-gap: 24px;
                    }

                    .paid-cta {
                        width: 48%;
                    }

                    .paid-note {
                        width: 48%;
                    }
                }

                @media (max-width: 1000px) {
                    .forecast {
                        grid-template-columns:
                            minmax(260px, 0.95fr)
                            minmax(330px, 1.05fr);
                        gap: 40px;
                    }

                    .forecast-copy h2 {
                        font-size: 37px;
                    }

                    .paid-card,
                    .paid-content {
                        min-height: 390px;
                    }

                    .art-main {
                        width: 60%;
                    }

                    .art-blur {
                        width: 85%;
                    }

                    .paid-copy {
                        top: 30px;
                        left: 55%;
                        width: 40%;
                    }

                    .paid-copy h2 {
                        font-size: 40px;
                    }

                    .benefits {
                        top: 154px;
                        left: 55%;
                        right: 24px;
                        row-gap: 18px;
                    }

                    .paid-cta {
                        right: 22px;
                        bottom: 40px;
                        width: 49%;
                        height: 58px;
                    }

                    .paid-note {
                        right: 22px;
                        width: 49%;
                    }
                }

                @media (max-width: 640px) {
                    .page {
                        padding: 0 12px 36px;
                    }

                    .content-shell {
                        width: 100%;
                    }

                    .header {
                        min-height: 64px;
                    }

                    .brand {
                        font-size: 21px;
                    }

                    .couple-names {
                        max-width: 52%;
                        font-size: 8px;
                    }

                    .results {
                        padding: 27px 0 30px;
                    }

                    .forecast {
                        display: block;
                        padding: 29px 0 37px;
                    }

                    .forecast-copy h2 {
                        max-width: 330px;
                        font-size: 34px;
                        letter-spacing: -1.5px;
                    }

                    .forecast-copy p {
                        margin-top: 9px;
                        font-size: 10px;
                    }

                    .forecast-right {
                        margin-top: 27px;
                    }

                    .years strong {
                        font-size: 64px;
                    }

                    .years span {
                        font-size: 34px;
                    }

                    .forecast-scale {
                        margin-top: 21px;
                    }

                    .scale-labels {
                        font-size: 7px;
                    }

                    .scale-labels span:nth-child(2),
                    .scale-labels span:nth-child(4),
                    .scale-labels span:nth-child(5) {
                        display: none;
                    }

                    .paid-section {
                        width: 100%;
                        margin: 0;
                    }

                    .paid-card,
                    .paid-content {
                        min-height: 760px;
                    }

                    .paid-card {
                        border-radius: 22px;
                    }

                    .paid-art {
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 355px;
                        bottom: auto;
                    }

                    .art-main {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        object-position: 50% 50%;
                    }

                    .art-blur {
                        inset: 0;
                        width: 100%;
                        height: 100%;
                        object-position: 50% 50%;
                        filter: blur(20px);
                        transform: scale(1.06);
                        mask-image:
                            linear-gradient(
                                180deg,
                                transparent 48%,
                                rgba(0, 0, 0, 0.06) 57%,
                                rgba(0, 0, 0, 0.18) 66%,
                                rgba(0, 0, 0, 0.42) 75%,
                                rgba(0, 0, 0, 0.7) 86%,
                                black 100%
                            );
                        -webkit-mask-image:
                            linear-gradient(
                                180deg,
                                transparent 48%,
                                rgba(0, 0, 0, 0.06) 57%,
                                rgba(0, 0, 0, 0.18) 66%,
                                rgba(0, 0, 0, 0.42) 75%,
                                rgba(0, 0, 0, 0.7) 86%,
                                black 100%
                            );
                    }

                    .art-fade {
                        background:
                            linear-gradient(
                                180deg,
                                rgba(176, 19, 79, 0) 46%,
                                rgba(176, 19, 79, 0.04) 56%,
                                rgba(176, 19, 79, 0.13) 64%,
                                rgba(176, 19, 79, 0.3) 73%,
                                rgba(176, 19, 79, 0.56) 82%,
                                rgba(176, 19, 79, 0.82) 92%,
                                #b0134f 100%
                            );
                    }

                    .art-glow {
                        background:
                            radial-gradient(
                                circle at 72% 4%,
                                rgba(255, 178, 210, 0.2) 0%,
                                rgba(255, 178, 210, 0.08) 18%,
                                rgba(255, 178, 210, 0) 40%
                            );
                    }

                    .paid-copy {
                        top: 376px;
                        left: 22px;
                        width: calc(100% - 44px);
                        max-width: none;
                    }

                    .paid-label {
                        margin-bottom: 10px;
                        font-size: 8px;
                        letter-spacing: 1.9px;
                    }

                    .paid-copy h2 {
                        max-width: 330px;
                        font-size: 31px;
                        line-height: 0.97;
                        letter-spacing: -1.35px;
                        text-shadow:
                            0 2px 15px
                            rgba(55, 0, 26, 0.24);
                    }

                    .benefits {
                        top: 500px;
                        left: 22px;
                        right: 22px;
                        width: auto;
                        grid-template-columns:
                            repeat(2, minmax(0, 1fr));
                        column-gap: 16px;
                        row-gap: 18px;
                    }

                    .paid-cta {
                        left: 16px;
                        right: 16px;
                        bottom: 50px;
                        width: calc(100% - 32px);
                        height: 61px;
                        padding: 0 18px;
                        border-radius: 15px;
                    }

                    .cta-title {
                        font-size: 13px;
                    }

                    .cta-right {
                        gap: 14px;
                    }

                    .cta-right strong {
                        font-size: 25px;
                    }

                    .cta-right b {
                        font-size: 24px;
                    }

                    .paid-note {
                        left: 16px;
                        right: 16px;
                        bottom: 21px;
                        width: auto;
                        font-size: 8px;
                    }
                }

                @media (max-width: 390px) {
                    .paid-card,
                    .paid-content {
                        min-height: 735px;
                    }

                    .paid-art {
                        height: 340px;
                    }

                    .paid-copy {
                        top: 360px;
                    }

                    .paid-copy h2 {
                        font-size: 29px;
                    }

                    .benefits {
                        top: 482px;
                        column-gap: 12px;
                        row-gap: 16px;
                    }
                }
            `}</style>
        </main>
    );
}

function CategoryRow({
                         title,
                         subtitle,
                         value,
                     }: CategoryScore) {
    const safeValue =
        Math.max(
            0,
            Math.min(MAX_SCORE, value)
        );

    return (
        <div className="category-row">
            <div className="category-head">
                <div>
                    <div className="category-title">
                        {title}
                    </div>

                    <div className="category-subtitle">
                        {subtitle}
                    </div>
                </div>

                <div className="category-score">
                    <strong>
                        {safeValue}
                    </strong>

                    <span>/10</span>
                </div>
            </div>

            <div className="category-line">
                <div
                    style={{
                        width: `${safeValue * 10}%`,
                    }}
                />
            </div>

            <style jsx>{`
                .category-row {
                    padding: 16px 0 18px;
                    border-bottom:
                        1px solid #e0d9d6;
                }

                .category-row:first-child {
                    padding-top: 0;
                }

                .category-head {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 20px;
                }

                .category-title {
                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;
                    font-size: 29px;
                    letter-spacing: -1.2px;
                }

                .category-subtitle {
                    margin-top: 5px;
                    color: #8e8688;
                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;
                    font-size: 12px;
                }

                .category-score {
                    display: flex;
                    align-items: baseline;
                    color: #7f7679;
                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;
                }

                .category-score strong {
                    color: #c21856;
                    font-size: 42px;
                    font-weight: 400;
                }

                .category-score span {
                    margin-left: 3px;
                    font-size: 18px;
                }

                .category-line {
                    height: 6px;
                    margin-top: 11px;
                    overflow: hidden;
                    border-radius: 999px;
                    background: #e5dfdf;
                }

                .category-line div {
                    height: 100%;
                    border-radius: inherit;
                    background: #cb3a6d;
                }

                @media (max-width: 640px) {
                    .category-row {
                        padding: 13px 0 15px;
                    }

                    .category-title {
                        font-size: 24px;
                    }

                    .category-subtitle {
                        font-size: 10px;
                        max-width: 250px;
                    }

                    .category-score strong {
                        font-size: 34px;
                    }

                    .category-score span {
                        font-size: 14px;
                    }

                    .category-line {
                        height: 5px;
                    }
                }
            `}</style>
        </div>
    );
}

function Benefit({
                     icon,
                     text,
                 }: {
    icon: BenefitIcon;
    text: ReactNode;
}) {
    return (
        <div className="benefit">
            <div className="benefit-icon">
                <BenefitSvg type={icon} />
            </div>

            <div className="benefit-text">
                {text}
            </div>

            <style jsx>{`
                .benefit {
                    display: grid;
                    grid-template-columns:
                        22px minmax(0, 1fr);
                    gap: 10px;
                    align-items: start;
                    color: #fff8f6;
                }

                .benefit-icon {
                    width: 20px;
                    padding-top: 1px;
                    color: #ffd8e1;
                }

                .benefit-text {
                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;
                    font-size: 13px;
                    line-height: 1.28;
                    font-weight: 500;
                }

                @media (max-width: 640px) {
                    .benefit {
                        grid-template-columns:
                            19px minmax(0, 1fr);
                        gap: 8px;
                    }

                    .benefit-icon {
                        width: 17px;
                    }

                    .benefit-text {
                        font-size: 11px;
                        line-height: 1.27;
                    }
                }
            `}</style>
        </div>
    );
}

function BenefitSvg({
                        type,
                    }: {
    type: BenefitIcon;
}) {
    if (type === "heart") {
        return (
            <svg
                viewBox="0 0 24 24"
                width="100%"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    d="
                        M12 21
                        C10.9 19.9
                        5.4 15.2
                        3.1 12.3
                        C0.6 9.2
                        1.3 5.1
                        4.7 3.5
                        C7.2 2.3
                        10.1 3.1
                        12 5.3
                        C13.9 3.1
                        16.8 2.3
                        19.3 3.5
                        C22.7 5.1
                        23.4 9.2
                        20.9 12.3
                        C18.6 15.2
                        13.1 19.9
                        12 21
                        Z
                    "
                />
            </svg>
        );
    }

    if (type === "message") {
        return (
            <svg
                viewBox="0 0 24 24"
                width="100%"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    d="
                        M6 3
                        H18
                        C20.2 3
                        22 4.8
                        22 7
                        V14
                        C22 16.2
                        20.2 18
                        18 18
                        H12
                        L7 22
                        L8 18
                        H6
                        C3.8 18
                        2 16.2
                        2 14
                        V7
                        C2 4.8
                        3.8 3
                        6 3
                        Z
                    "
                />
            </svg>
        );
    }

    if (type === "lightning") {
        return (
            <svg
                viewBox="0 0 24 24"
                width="100%"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    d="
                        M13.6 1.8
                        L5.2 13
                        H10.5
                        L9.3 22.2
                        L18.8 9.6
                        H13.1
                        Z
                    "
                />
            </svg>
        );
    }

    return (
        <svg
            viewBox="0 0 24 24"
            width="100%"
            fill="currentColor"
            aria-hidden="true"
        >
            <rect
                x="3"
                y="13"
                width="4"
                height="8"
                rx="1"
            />

            <rect
                x="10"
                y="8"
                width="4"
                height="13"
                rx="1"
            />

            <rect
                x="17"
                y="3"
                width="4"
                height="18"
                rx="1"
            />
        </svg>
    );
}

function getYearWord(
    value: number
) {
    const mod100 =
        value % 100;

    const mod10 =
        value % 10;

    if (
        mod100 >= 11 &&
        mod100 <= 14
    ) {
        return "лет";
    }

    if (mod10 === 1) {
        return "год";
    }

    if (
        mod10 >= 2 &&
        mod10 <= 4
    ) {
        return "года";
    }

    return "лет";
}