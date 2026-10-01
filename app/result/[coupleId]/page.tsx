"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { ReactNode } from "react";

type Couple = {
    id: string;
    partner_a_name?: string | null;
    partner_b_name?: string | null;
    partner_a_completed?: boolean;
    partner_b_completed?: boolean;
};

type ApiResponse = {
    waiting?: boolean;
    couple?: Couple;
    comparisons?: unknown[];
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
        if (!coupleId) return;

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

                if (cancelled) return;

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

    const yearsForecast = useMemo(() => {
        const overall =
            data?.scores?.overall ?? 50;

        if (overall >= 85) return 45;
        if (overall >= 75) return 28;
        if (overall >= 65) return 16;
        if (overall >= 55) return 10;
        if (overall >= 45) return 6;
        if (overall >= 35) return 3;

        return 1;
    }, [data]);

    const forecastPosition = useMemo(() => {
        const maxYears = 60;

        return Math.max(
            4,
            Math.min(
                96,
                (yearsForecast / maxYears) * 100
            )
        );
    }, [yearsForecast]);

    const nameA =
        data?.couple?.partner_a_name || "Вы";

    const nameB =
        data?.couple?.partner_b_name || "Партнёр";

    if (loading) {
        return (
            <main className="loading-screen">
                <div className="loading-brand">
                    между нами.
                </div>

                <style jsx>{`
                    .loading-screen {
                        min-height: 100vh;
                        display: grid;
                        place-items: center;
                        background: #f8f4f1;
                        color: #211d1f;
                    }

                    .loading-brand {
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
            <main className="error-screen">
                Не получилось загрузить результат.

                <style jsx>{`
                    .error-screen {
                        min-height: 100vh;
                        display: grid;
                        place-items: center;
                        padding: 24px;
                        background: #f8f4f1;
                        color: #211d1f;
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

                {/* =====================================================
                    HEADER
                ===================================================== */}

                <header className="header">
                    <div className="brand">
                        между нами.
                    </div>

                    <div className="couple-names">
                        <span className="person-name">
                            {nameA}
                        </span>

                        <span className="couple-cross">
                            ×
                        </span>

                        <span className="person-name">
                            {nameB}
                        </span>
                    </div>
                </header>


                {/* =====================================================
                    RESULTS
                ===================================================== */}

                <section className="results">
                    <div className="section-label">
                        ВАШ РЕЗУЛЬТАТ
                    </div>

                    <h1 className="results-title">
                        Вот что
                        <br />
                        получилось
                    </h1>

                    <div className="category-list">
                        {categories.map(
                            (category) => (
                                <CategoryRow
                                    key={
                                        category.title
                                    }
                                    {...category}
                                />
                            )
                        )}
                    </div>
                </section>


                {/* =====================================================
                    FORECAST
                ===================================================== */}

                <section className="forecast">

                    <div className="forecast-copy">

                        <div className="section-label">
                            ПРОГНОЗ
                        </div>

                        <h2 className="forecast-title">
                            Ориентировочная
                            <br />
                            длительность
                            <br className="desktop-break" />
                            ваших отношений
                        </h2>

                        <p className="forecast-description">
                            На основе ваших ответов
                            мы оценили ориентировочный
                            сценарий длительности
                            ваших отношений.
                        </p>

                    </div>


                    <div className="forecast-result">

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

                            <div className="scale-track">

                                <div
                                    className="scale-fill"
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

                            </div>

                            <div className="scale-labels">
                                <span>
                                    1 месяц
                                </span>

                                <span>
                                    вся жизнь
                                </span>
                            </div>

                        </div>

                    </div>

                </section>

            </div>


            {/* =========================================================
                PAID REPORT
            ========================================================= */}

            <section className="paid-shell">

                <div className="paid-card">

                    {/* =================================================
                        FULL IMAGE
                    ================================================= */}

                    <div className="paid-art-layer">

                        <img
                            className="paid-art"
                            src={PAID_IMAGE}
                            alt=""
                            draggable={false}
                        />

                        {/* ---------------------------------------------
                            Основной мягкий переход.

                            НЕ обрезаем картинку на 73%.
                            Blur начинается только там,
                            где сцена должна раствориться.
                        --------------------------------------------- */}

                        <div className="art-transition" />

                        {/* ---------------------------------------------
                            Дополнительная цветовая дымка.
                            Она очень мягкая и не создаёт
                            вертикальной границы.
                        --------------------------------------------- */}

                        <div className="art-color-fade" />

                    </div>


                    {/* =================================================
                        CONTENT
                    ================================================= */}

                    <div className="paid-content">

                        {/* TITLE */}

                        <div className="paid-heading">

                            <div className="paid-label">
                                ПОЛНЫЙ РАЗБОР
                            </div>

                            <h2>
                                Чтобы вместе —
                                <br />
                                и надолго.
                            </h2>

                        </div>


                        {/* BENEFITS */}

                        <div className="paid-benefits">

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


                        {/* CTA */}

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

                                <span className="price">
                                    299 ₽
                                </span>

                                <span className="arrow">
                                    →
                                </span>

                            </span>

                        </button>


                        <div className="paid-note">
                            один разбор · для вас двоих ·
                            сразу после оплаты
                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================================
                STYLES
            ========================================================= */}

            <style jsx>{`

                /* =====================================================
                   BASE
                ===================================================== */

                :global(*) {
                    box-sizing: border-box;
                }

                :global(html) {
                    background: #f8f4f1;
                }

                :global(body) {
                    margin: 0;
                    background: #f8f4f1;
                    color: #201c1e;
                }

                button {
                    font: inherit;
                }


                /* =====================================================
                   PAGE
                ===================================================== */

                .page {
                    width: 100%;
                    min-height: 100vh;

                    padding:
                        0
                        28px
                        72px;

                    overflow-x: hidden;

                    background: #f8f4f1;
                }

                .content-shell {
                    width:
                        min(
                            920px,
                            100%
                        );

                    margin:
                        0
                        auto;
                }


                /* =====================================================
                   HEADER
                ===================================================== */

                .header {
                    min-height: 78px;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    gap: 24px;

                    border-bottom:
                        1px solid
                        #ddd5d2;
                }

                .brand {
                    flex-shrink: 0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size: 24px;
                    line-height: 1;

                    font-weight: 700;

                    letter-spacing: -1.1px;
                }

                .couple-names {
                    min-width: 0;

                    display: flex;
                    align-items: center;

                    gap: 9px;

                    color: #8f8588;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size: 10px;
                    font-weight: 700;

                    letter-spacing: 1.2px;

                    text-transform:
                        uppercase;
                }

                .person-name {
                    overflow: hidden;

                    text-overflow: ellipsis;

                    white-space:
                        nowrap;
                }

                .couple-cross {
                    flex-shrink: 0;
                    color: #c2215a;
                }


                /* =====================================================
                   RESULTS
                ===================================================== */

                .results {
                    padding:
                        42px
                        0
                        45px;
                }

                .section-label {
                    margin-bottom: 13px;

                    color: #c2215a;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size: 10px;
                    line-height: 1;

                    font-weight: 800;

                    letter-spacing: 2.2px;
                }

                .results-title {
                    margin:
                        0
                        0
                        32px;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size: 48px;
                    line-height: 0.98;

                    font-weight: 400;

                    letter-spacing: -2.5px;
                }


                /* =====================================================
                   FORECAST
                ===================================================== */

                .forecast {
                    padding:
                        38px
                        0
                        46px;

                    display: grid;

                    grid-template-columns:
                        minmax(0, 1.15fr)
                        minmax(280px, 0.85fr);

                    gap: 55px;

                    align-items: center;

                    border-top:
                        1px solid
                        #dcd4d1;
                }

                .forecast-copy {
                    min-width: 0;
                }

                .forecast-title {
                    max-width: 560px;

                    margin: 0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size: 43px;
                    line-height: 1.01;

                    font-weight: 400;

                    letter-spacing: -2.2px;
                }

                .forecast-description {
                    max-width: 560px;

                    margin:
                        15px
                        0
                        0;

                    color: #8d8587;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size: 14px;
                    line-height: 1.5;

                    font-weight: 500;
                }

                .forecast-result {
                    min-width: 0;
                }

                .years {
                    display: flex;
                    align-items: baseline;

                    color: #c21856;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    white-space:
                        nowrap;
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
                    line-height: 1;

                    letter-spacing: -1.5px;
                }

                .forecast-scale {
                    width: 100%;

                    margin-top: 23px;
                }

                .scale-track {
                    position: relative;

                    height: 9px;

                    border-radius: 999px;

                    background: #e5dfe0;
                }

                .scale-fill {
                    position: absolute;

                    inset:
                        0
                        auto
                        0
                        0;

                    border-radius: inherit;

                    background: #e99ab5;
                }

                .scale-dot {
                    position: absolute;

                    top: 50%;

                    width: 22px;
                    height: 22px;

                    border-radius: 50%;

                    background: #c21856;

                    transform:
                        translate(
                            -50%,
                            -50%
                        );
                }

                .scale-labels {
                    display: flex;

                    justify-content:
                        space-between;

                    margin-top: 12px;

                    color: #8d8587;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size: 11px;

                    font-weight: 600;
                }


                /* =====================================================
                   PAID SHELL
                ===================================================== */

                .paid-shell {
                    width:
                        min(
                            1180px,
                            100%
                        );

                    margin:
                        8px
                        auto
                        0;
                }


                /* =====================================================
                   PAID CARD
                ===================================================== */

                .paid-card {
                    position: relative;

                    width: 100%;

                    min-height: 500px;

                    overflow: hidden;

                    border-radius: 25px;

                    background:
                        linear-gradient(
                            90deg,
                            #971047 0%,
                            #a80e4d 52%,
                            #aa104f 100%
                        );

                    isolation: isolate;
                }


                /* =====================================================
                   IMAGE
                ===================================================== */

                .paid-art-layer {
                    position: absolute;

                    inset: 0;

                    z-index: 0;

                    overflow: hidden;

                    pointer-events: none;
                }

                .paid-art {
                    position: absolute;

                    inset: 0;

                    width: 100%;
                    height: 100%;

                    display: block;

                    /*
                     * Главное отличие от старого варианта:
                     *
                     * Картинка теперь НЕ 73%.
                     * Она является полноценным фоном
                     * всей карточки.
                     */

                    object-fit: cover;

                    /*
                     * Исходник уже нарисован так,
                     * чтобы пара была слева,
                     * замок ближе к центру,
                     * а справа был berry-background.
                     */

                    object-position:
                        center
                        center;

                    user-select: none;
                }


                /* =====================================================
                   REAL BLUR TRANSITION
                ===================================================== */

                .art-transition {
                    position: absolute;

                    top: 0;
                    bottom: 0;

                    left: 45%;

                    width: 28%;

                    z-index: 2;

                    pointer-events: none;

                    /*
                     * Реальный blur содержимого,
                     * а не просто цветной overlay.
                     */

                    backdrop-filter:
                        blur(9px);

                    -webkit-backdrop-filter:
                        blur(9px);

                    /*
                     * Mask делает blur видимым
                     * только в середине перехода.
                     */

                    -webkit-mask-image:
                        linear-gradient(
                            90deg,
                            transparent 0%,
                            black 24%,
                            black 70%,
                            transparent 100%
                        );

                    mask-image:
                        linear-gradient(
                            90deg,
                            transparent 0%,
                            black 24%,
                            black 70%,
                            transparent 100%
                        );
                }


                /* =====================================================
                   COLOR FADE
                ===================================================== */

                .art-color-fade {
                    position: absolute;

                    top: 0;
                    bottom: 0;

                    left: 38%;

                    width: 38%;

                    z-index: 3;

                    pointer-events: none;

                    background:
                        linear-gradient(
                            90deg,

                            rgba(
                                164,
                                14,
                                77,
                                0
                            ) 0%,

                            rgba(
                                164,
                                14,
                                77,
                                0.025
                            ) 15%,

                            rgba(
                                164,
                                14,
                                77,
                                0.08
                            ) 30%,

                            rgba(
                                164,
                                14,
                                77,
                                0.22
                            ) 45%,

                            rgba(
                                164,
                                14,
                                77,
                                0.43
                            ) 60%,

                            rgba(
                                164,
                                14,
                                77,
                                0.67
                            ) 74%,

                            rgba(
                                164,
                                14,
                                77,
                                0.87
                            ) 88%,

                            #a40e4d 100%
                        );
                }


                /* =====================================================
                   CONTENT
                ===================================================== */

                .paid-content {
                    position: relative;

                    z-index: 10;

                    min-height: 500px;

                    width: 100%;
                }


                /* =====================================================
                   TITLE
                ===================================================== */

                .paid-heading {
                    position: absolute;

                    top: 39px;
                    left: 70px;

                    width: 500px;
                }

                .paid-label {
                    margin-bottom: 14px;

                    color:
                        rgba(
                            255,
                            244,
                            247,
                            0.92
                        );

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size: 10px;
                    line-height: 1;

                    font-weight: 700;

                    letter-spacing: 2.1px;
                }

                .paid-heading h2 {
                    margin: 0;

                    color: #fff9f6;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    /*
                     * Размер близкий к референсу.
                     */

                    font-size: clamp(
                        46px,
                        4.2vw,
                        57px
                    );

                    line-height: 0.95;

                    font-weight: 400;

                    letter-spacing: -2.5px;

                    /*
                     * Благодаря тени текст
                     * не выглядит приклеенным сверху.
                     */

                    text-shadow:
                        0 2px 16px
                        rgba(
                            48,
                            0,
                            23,
                            0.22
                        );
                }


                /* =====================================================
                   BENEFITS
                ===================================================== */

                .paid-benefits {
                    position: absolute;

                    top: 48px;
                    right: 67px;

                    width: 315px;

                    display: flex;

                    flex-direction: column;

                    gap: 24px;
                }


                /* =====================================================
                   CTA
                ===================================================== */

                .paid-cta {
                    position: absolute;

                    right: 36px;
                    bottom: 52px;

                    width:
                        min(
                            638px,
                            55%
                        );

                    height: 72px;

                    padding:
                        0
                        26px;

                    display: flex;

                    align-items: center;

                    justify-content:
                        space-between;

                    gap: 20px;

                    border: 0;

                    border-radius: 16px;

                    background: #fffaf7;

                    color: #201d1e;

                    cursor: pointer;

                    box-shadow:
                        0 9px 25px
                        rgba(
                            65,
                            0,
                            27,
                            0.13
                        );

                    transition:
                        transform 160ms ease,
                        box-shadow 160ms ease;
                }

                .paid-cta:hover {
                    transform:
                        translateY(-2px);

                    box-shadow:
                        0 13px 30px
                        rgba(
                            65,
                            0,
                            27,
                            0.17
                        );
                }

                .paid-cta:active {
                    transform:
                        translateY(0);
                }

                .cta-title {
                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size: 15px;
                    line-height: 1;

                    font-weight: 600;

                    white-space:
                        nowrap;
                }

                .cta-right {
                    display: flex;

                    align-items: center;

                    gap: 22px;

                    color: #c51b58;
                }

                .price {
                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size: 29px;
                    line-height: 1;

                    font-weight: 400;

                    white-space:
                        nowrap;
                }

                .arrow {
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

                    right: 36px;
                    bottom: 22px;

                    width:
                        min(
                            638px,
                            55%
                        );

                    color:
                        rgba(
                            255,
                            238,
                            243,
                            0.72
                        );

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size: 9px;
                    line-height: 1;

                    font-weight: 400;

                    text-align: center;
                }


                /* =====================================================
                   TABLET
                ===================================================== */

                @media (max-width: 1000px) {

                    .content-shell {
                        width:
                            min(
                                820px,
                                100%
                            );
                    }

                    .paid-card {
                        min-height: 470px;
                    }

                    .paid-content {
                        min-height: 470px;
                    }

                    .paid-heading {
                        left: 48px;
                        top: 34px;

                        width: 430px;
                    }

                    .paid-heading h2 {
                        font-size: 45px;
                    }

                    .paid-benefits {
                        right: 38px;

                        width: 275px;

                        gap: 21px;
                    }

                    .paid-cta {
                        right: 28px;
                        bottom: 43px;

                        width: 52%;

                        height: 68px;
                    }

                    .paid-note {
                        right: 28px;
                        bottom: 18px;

                        width: 52%;
                    }
                }


                /* =====================================================
                   MOBILE
                ===================================================== */

                @media (max-width: 640px) {

                    .page {
                        padding:
                            0
                            12px
                            32px;
                    }

                    .content-shell {
                        width: 100%;
                    }


                    /* HEADER */

                    .header {
                        min-height: 64px;

                        gap: 12px;
                    }

                    .brand {
                        font-size: 21px;
                    }

                    .couple-names {
                        max-width: 52%;

                        gap: 5px;

                        font-size: 8px;

                        letter-spacing:
                            0.65px;
                    }


                    /* RESULTS */

                    .results {
                        padding:
                            29px
                            0
                            33px;
                    }

                    .section-label {
                        margin-bottom: 11px;

                        font-size: 9px;

                        letter-spacing:
                            1.8px;
                    }

                    .results-title {
                        margin-bottom: 24px;

                        font-size: 37px;

                        line-height: 1;

                        letter-spacing:
                            -1.8px;
                    }


                    /* FORECAST */

                    .forecast {
                        padding:
                            29px
                            0
                            37px;

                        display: block;
                    }

                    .forecast-title {
                        max-width: 100%;

                        font-size: 34px;

                        line-height: 1.01;

                        letter-spacing:
                            -1.55px;
                    }

                    .forecast-description {
                        max-width: 100%;

                        margin-top: 13px;

                        font-size: 12px;

                        line-height: 1.45;
                    }

                    .desktop-break {
                        display: none;
                    }

                    .forecast-result {
                        width: 100%;

                        margin-top: 25px;
                    }

                    .years strong {
                        font-size: 64px;

                        letter-spacing:
                            -3px;
                    }

                    .years span {
                        margin-left: 7px;

                        font-size: 34px;

                        letter-spacing:
                            -1px;
                    }

                    .forecast-scale {
                        margin-top: 20px;
                    }

                    .scale-track {
                        height: 7px;
                    }

                    .scale-dot {
                        width: 19px;
                        height: 19px;
                    }

                    .scale-labels {
                        margin-top: 10px;

                        font-size: 9px;
                    }


                    /* =================================================
                       MOBILE PAID CARD

                       Здесь НЕ используем desktop
                       композицию.

                       Верхняя часть — исходная
                       сцена.

                       Потом мягкий blur/fade.

                       Потом benefits.

                    ================================================= */

                    .paid-shell {
                        width: 100%;

                        margin-top: 0;
                    }

                    .paid-card {
                        min-height: 620px;

                        border-radius: 22px;

                        background:
                            linear-gradient(
                                180deg,
                                #a30e4d 0%,
                                #a90f4e 100%
                            );
                    }

                    .paid-content {
                        min-height: 620px;
                    }


                    /* =================================================
                       MOBILE IMAGE

                       Пара должна быть вместе.

                       Не растягиваем картинку
                       на всю вертикальную карточку.
                    ================================================= */

                    .paid-art {
                        left: 0;
                        top: 0;

                        width: 100%;

                        /*
                         * На телефоне высота сцены
                         * контролируется отдельно.
                         */

                        height: 385px;

                        object-fit: cover;

                        /*
                         * Сдвигаем фокус немного влево,
                         * чтобы парень + девушка
                         * оставались в кадре вместе.
                         */

                        object-position:
                            42%
                            center;
                    }

                    .paid-art-layer {
                        height: 420px;
                    }


                    /* =================================================
                       MOBILE BLUR

                       Теперь переход идёт вниз,
                       а не вправо.
                    ================================================= */

                    .art-transition {
                        top: 220px;
                        left: 0;

                        width: 100%;
                        height: 200px;

                        backdrop-filter:
                            blur(8px);

                        -webkit-backdrop-filter:
                            blur(8px);

                        -webkit-mask-image:
                            linear-gradient(
                                180deg,
                                transparent 0%,
                                black 25%,
                                black 72%,
                                transparent 100%
                            );

                        mask-image:
                            linear-gradient(
                                180deg,
                                transparent 0%,
                                black 25%,
                                black 72%,
                                transparent 100%
                            );
                    }

                    .art-color-fade {
                        top: 235px;
                        left: 0;

                        width: 100%;
                        height: 190px;

                        background:
                            linear-gradient(
                                180deg,

                                rgba(
                                    163,
                                    14,
                                    77,
                                    0
                                ) 0%,

                                rgba(
                                    163,
                                    14,
                                    77,
                                    0.05
                                ) 17%,

                                rgba(
                                    163,
                                    14,
                                    77,
                                    0.18
                                ) 36%,

                                rgba(
                                    163,
                                    14,
                                    77,
                                    0.42
                                ) 56%,

                                rgba(
                                    163,
                                    14,
                                    77,
                                    0.72
                                ) 76%,

                                #a30e4d 100%
                            );
                    }


                    /* =================================================
                       MOBILE TITLE
                    ================================================= */

                    .paid-heading {
                        top: 31px;

                        left: 28px;

                        width:
                            calc(
                                100% - 56px
                            );
                    }

                    .paid-label {
                        margin-bottom: 13px;

                        font-size: 9px;

                        letter-spacing:
                            1.9px;
                    }

                    .paid-heading h2 {
                        font-size: 38px;

                        line-height: 0.96;

                        letter-spacing:
                            -1.8px;

                        text-shadow:
                            0
                            2px
                            14px
                            rgba(
                                49,
                                0,
                                25,
                                0.22
                            );
                    }


                    /* =================================================
                       MOBILE BENEFITS

                       В референсе они идут
                       уже на berry-фоне.
                    ================================================= */

                    .paid-benefits {
                        top: 397px;

                        left: 28px;
                        right: 28px;

                        width:
                            calc(
                                100% - 56px
                            );

                        display: grid;

                        grid-template-columns:
                            1fr
                            1fr;

                        column-gap: 22px;

                        row-gap: 18px;
                    }


                    /* =================================================
                       MOBILE CTA
                    ================================================= */

                    .paid-cta {
                        left: 20px;
                        right: 20px;

                        bottom: 47px;

                        width:
                            calc(
                                100% - 40px
                            );

                        min-width: 0;

                        height: 58px;

                        padding:
                            0
                            18px;

                        border-radius: 14px;
                    }

                    .cta-title {
                        font-size: 13px;
                    }

                    .cta-right {
                        gap: 13px;
                    }

                    .price {
                        font-size: 24px;
                    }

                    .arrow {
                        font-size: 23px;
                    }

                    .paid-note {
                        left: 20px;
                        right: 20px;

                        bottom: 19px;

                        width:
                            calc(
                                100% - 40px
                            );

                        font-size: 8px;
                    }
                }


                /* =====================================================
                   SMALL MOBILE
                ===================================================== */

                @media (max-width: 390px) {

                    .paid-card {
                        min-height: 600px;
                    }

                    .paid-content {
                        min-height: 600px;
                    }

                    .paid-art {
                        height: 365px;

                        object-position:
                            42%
                            center;
                    }

                    .paid-art-layer {
                        height: 400px;
                    }

                    .paid-heading {
                        top: 28px;

                        left: 24px;

                        width:
                            calc(
                                100% - 48px
                            );
                    }

                    .paid-heading h2 {
                        font-size: 35px;
                    }

                    .paid-benefits {
                        top: 377px;

                        left: 24px;
                        right: 24px;

                        width:
                            calc(
                                100% - 48px
                            );

                        column-gap: 15px;

                        row-gap: 16px;
                    }

                    .paid-cta {
                        left: 16px;
                        right: 16px;

                        width:
                            calc(
                                100% - 32px
                            );

                        padding:
                            0
                            16px;
                    }

                    .paid-note {
                        left: 16px;
                        right: 16px;

                        width:
                            calc(
                                100% - 32px
                            );
                    }
                }

            `}</style>
        </main>
    );
}


/* ============================================================
   CATEGORY ROW
============================================================ */

function CategoryRow({
                         title,
                         subtitle,
                         value,
                     }: CategoryScore) {

    const safeValue =
        Math.max(
            0,
            Math.min(
                MAX_SCORE,
                value
            )
        );

    return (
        <div className="category-row">

            <div className="category-top">

                <div className="category-copy">

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

                    <span>
                        /10
                    </span>

                </div>

            </div>


            <div className="category-track">

                <div
                    className="category-fill"
                    style={{
                        width:
                            `${safeValue * 10}%`,
                    }}
                />

            </div>


            <style jsx>{`

                .category-row {
                    padding:
                        16px
                        0
                        18px;

                    border-bottom:
                        1px solid
                        #e0d9d6;
                }

                .category-row:first-child {
                    padding-top: 0;
                }

                .category-top {
                    display: flex;

                    align-items:
                        flex-end;

                    justify-content:
                        space-between;

                    gap: 24px;
                }

                .category-copy {
                    min-width: 0;
                }

                .category-title {
                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size: 29px;

                    line-height: 1;

                    letter-spacing:
                        -1.2px;
                }

                .category-subtitle {
                    margin-top: 5px;

                    color: #8e8688;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size: 12px;

                    line-height: 1.3;

                    font-weight: 500;
                }

                .category-score {
                    display: flex;

                    align-items:
                        baseline;

                    flex-shrink: 0;

                    color: #7f7679;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;
                }

                .category-score strong {
                    color: #c21856;

                    font-size: 42px;

                    line-height: 0.8;

                    font-weight: 400;

                    letter-spacing:
                        -1.8px;
                }

                .category-score span {
                    margin-left: 3px;

                    font-size: 18px;
                }

                .category-track {
                    height: 6px;

                    margin-top: 11px;

                    overflow: hidden;

                    border-radius: 999px;

                    background: #e5dfdf;
                }

                .category-fill {
                    height: 100%;

                    border-radius: inherit;

                    background: #cb3a6d;
                }

                @media (max-width: 640px) {

                    .category-row {
                        padding:
                            13px
                            0
                            15px;
                    }

                    .category-top {
                        gap: 15px;
                    }

                    .category-title {
                        font-size: 24px;
                    }

                    .category-subtitle {
                        max-width: 250px;

                        margin-top: 4px;

                        font-size: 10px;
                    }

                    .category-score strong {
                        font-size: 34px;
                    }

                    .category-score span {
                        font-size: 14px;
                    }

                    .category-track {
                        height: 5px;

                        margin-top: 10px;
                    }
                }

            `}</style>

        </div>
    );
}


/* ============================================================
   BENEFIT
============================================================ */

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
                <BenefitSvg
                    type={icon}
                />
            </div>

            <div className="benefit-text">
                {text}
            </div>


            <style jsx>{`

                .benefit {
                    display: grid;

                    grid-template-columns:
                        24px
                        minmax(0, 1fr);

                    gap: 12px;

                    align-items:
                        start;

                    color: #fff8f6;
                }

                .benefit-icon {
                    width: 21px;

                    padding-top: 1px;

                    color: #ffd8e1;
                }

                .benefit-text {
                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size: 14px;

                    line-height: 1.28;

                    font-weight: 500;

                    letter-spacing:
                        -0.1px;

                    text-shadow:
                        0
                        1px
                        8px
                        rgba(
                            65,
                            0,
                            27,
                            0.18
                        );
                }

                @media (max-width: 640px) {

                    .benefit {
                        grid-template-columns:
                            22px
                            minmax(0, 1fr);

                        gap: 9px;
                    }

                    .benefit-icon {
                        width: 19px;
                    }

                    .benefit-text {
                        font-size: 12px;

                        line-height: 1.25;
                    }
                }

            `}</style>

        </div>
    );
}


/* ============================================================
   BENEFIT ICONS
============================================================ */

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
                height="auto"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    d="
                        M12 21
                        C10.9 19.9 5.4 15.2 3.1 12.3
                        C0.6 9.2 1.3 5.1 4.7 3.5
                        C7.2 2.3 10.1 3.1 12 5.3
                        C13.9 3.1 16.8 2.3 19.3 3.5
                        C22.7 5.1 23.4 9.2 20.9 12.3
                        C18.6 15.2 13.1 19.9 12 21
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
                height="auto"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    d="
                        M6 3
                        H18
                        C20.2 3 22 4.8 22 7
                        V14
                        C22 16.2 20.2 18 18 18
                        H12
                        L7 22
                        L8 18
                        H6
                        C3.8 18 2 16.2 2 14
                        V7
                        C2 4.8 3.8 3 6 3
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
                height="auto"
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
            height="auto"
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


/* ============================================================
   YEAR WORD
============================================================ */

function getYearWord(value: number) {

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