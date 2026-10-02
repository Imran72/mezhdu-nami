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

            if (overall >= 85) return 45;
            if (overall >= 75) return 28;
            if (overall >= 65) return 16;
            if (overall >= 55) return 10;
            if (overall >= 45) return 6;
            if (overall >= 35) return 3;

            return 1;
        }, [data]);

    /*
     * Шкала теперь специально НЕ линейная по 60 годам.
     *
     * Иначе:
     * 1 год = почти 0%
     * 6 лет = всего 10%
     * 10 лет = 16%
     *
     * и визуально всё слипается слева.
     *
     * Вместо этого распределяем жизненные интервалы
     * равномернее по шкале.
     */
    const forecastPosition =
        useMemo(() => {
            const points = [
                { years: 0.08, position: 3 },
                { years: 1, position: 18 },
                { years: 5, position: 36 },
                { years: 10, position: 54 },
                { years: 25, position: 74 },
                { years: 60, position: 97 },
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

            return 97;
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

            {/* =====================================================
                MAIN RESULT
            ===================================================== */}

            <div className="content-shell">

                <header className="header">

                    <div className="brand">
                        между нами.
                    </div>

                    <div className="couple-names">

                        <span>
                            {nameA}
                        </span>

                        <b>×</b>

                        <span>
                            {nameB}
                        </span>

                    </div>

                </header>

                {/* =================================================
                    SCORES
                ================================================= */}

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

                {/* =================================================
                    FORECAST
                ================================================= */}

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
                            на основании ИИ-модели
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
                                        width:
                                            `${forecastPosition}%`,
                                    }}
                                />

                                <div
                                    className="scale-dot"
                                    style={{
                                        left:
                                            `${forecastPosition}%`,
                                    }}
                                />

                                <div
                                    className="scale-tick tick-1"
                                />

                                <div
                                    className="scale-tick tick-2"
                                />

                                <div
                                    className="scale-tick tick-3"
                                />

                                <div
                                    className="scale-tick tick-4"
                                />

                            </div>

                            <div className="scale-labels">

                                <span>
                                    1 месяц
                                </span>

                                <span>
                                    1 год
                                </span>

                                <span>
                                    5 лет
                                </span>

                                <span>
                                    10 лет
                                </span>

                                <span>
                                    25 лет
                                </span>

                                <span>
                                    вся жизнь
                                </span>

                            </div>

                        </div>

                    </div>

                </section>

            </div>

            {/* =====================================================
                FULL REPORT CARD
            ===================================================== */}

            <section className="paid-section">

                <div className="paid-card">

                    {/* =================================================
                        ART
                    ================================================= */}

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

                        <div className="art-color-fade" />

                    </div>

                    {/* =================================================
                        CONTENT
                    ================================================= */}

                    <div className="paid-content">

                        {/* =============================================
                            TITLE
                        ============================================= */}

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

                        {/* =============================================
                            BENEFITS 2 × 2
                        ============================================= */}

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

                        {/* =============================================
                            CTA
                        ============================================= */}

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

                                <b>
                                    →
                                </b>

                            </span>

                        </button>

                        <div className="paid-note">
                            один разбор · для вас двоих ·
                            сразу после оплаты
                        </div>

                    </div>

                </div>

            </section>

            <style jsx>{`

                /* =====================================================
                   GLOBAL
                ===================================================== */

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
                    padding-bottom: 80px;
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

                /* =====================================================
                   HEADER
                ===================================================== */

                .header {
                    min-height: 78px;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    gap: 20px;

                    border-bottom:
                        1px solid
                        #ddd5d2;
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

                /* =====================================================
                   COMMON LABEL
                ===================================================== */

                .section-label {
                    margin-bottom: 18px;

                    color: #c2215a;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size: 10px;
                    font-weight: 800;

                    letter-spacing: 2.2px;
                }

                /* =====================================================
                   RESULTS
                ===================================================== */

                .results {
                    padding:
                        38px 0 38px;
                }

                .category-list {
                    width: 100%;
                }

                /* =====================================================
                   FORECAST
                ===================================================== */

                .forecast {
                    padding:
                        43px 0 52px;

                    display: grid;

                    grid-template-columns:
                        minmax(300px, .95fr)
                        minmax(390px, 1.05fr);

                    gap: 66px;

                    align-items: center;

                    border-top:
                        1px solid
                        #dcd4d1;
                }

                .forecast-copy h2 {
                    margin: 0;

                    max-width: 430px;

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
                    margin:
                        13px 0 0;

                    color: #958b8e;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size: 11px;

                    line-height: 1.4;

                    letter-spacing: .15px;
                }

                .forecast-right {
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
                }

                .years strong {
                    font-size: 76px;
                    line-height: .88;

                    font-weight: 400;

                    letter-spacing: -4px;
                }

                .years span {
                    margin-left: 9px;

                    font-size: 39px;
                }

                /* =====================================================
                   FORECAST SCALE
                ===================================================== */

                .forecast-scale {
                    margin-top: 25px;
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
                            #edb3c6 0%,
                            #dc6e95 100%
                        );
                }

                .scale-dot {
                    position: absolute;

                    z-index: 4;

                    top: 50%;

                    width: 21px;
                    height: 21px;

                    border: 4px solid #f8f4f1;

                    border-radius: 50%;

                    background: #c21856;

                    box-shadow:
                        0 2px 8px
                        rgba(
                            104,
                            18,
                            52,
                            .18
                        );

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
                        rgba(
                            132,
                            113,
                            120,
                            .42
                        );

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

                    transform:
                        translateX(-50%);
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

                /* =====================================================
                   FULL REPORT
                ===================================================== */

                .paid-section {
                    width: min(
                        1180px,
                        calc(100% - 40px)
                    );

                    margin:
                        10px auto 0;
                }

                .paid-card {
                    position: relative;

                    width: 100%;
                    min-height: 590px;

                    overflow: hidden;

                    border-radius: 24px;

                    background: #ad194a;

                    isolation: isolate;
                }

                /* =====================================================
                   ART
                ===================================================== */

                .paid-art {
                    position: absolute;

                    z-index: 1;

                    inset:
                        0 auto 0 0;

                    width: 72%;

                    overflow: hidden;
                }

                /*
                 * Основная картинка остаётся резкой.
                 *
                 * Она не должна растягиваться
                 * на весь баннер.
                 */
                .art-main {
                    position: absolute;

                    z-index: 1;

                    inset: 0;

                    width: 80%;
                    height: 100%;

                    display: block;

                    object-fit: cover;

                    object-position:
                        50% 54%;

                    pointer-events: none;
                    user-select: none;
                }

                /*
                 * Та же картинка —
                 * размазанная копия справа.
                 */
                .art-blur {
                    position: absolute;

                    z-index: 2;

                    inset: 0;

                    width: 92%;
                    height: 100%;

                    object-fit: cover;

                    object-position:
                        50% 54%;

                    filter:
                        blur(25px);

                    transform:
                        scale(1.08);

                    opacity: .96;

                    pointer-events: none;

                    mask-image:
                        linear-gradient(
                            90deg,

                            transparent 47%,

                            rgba(
                                0,
                                0,
                                0,
                                .05
                            ) 54%,

                            rgba(
                                0,
                                0,
                                0,
                                .20
                            ) 62%,

                            rgba(
                                0,
                                0,
                                0,
                                .46
                            ) 70%,

                            rgba(
                                0,
                                0,
                                0,
                                .75
                            ) 79%,

                            black 91%
                        );

                    -webkit-mask-image:
                        linear-gradient(
                            90deg,

                            transparent 47%,

                            rgba(
                                0,
                                0,
                                0,
                                .05
                            ) 54%,

                            rgba(
                                0,
                                0,
                                0,
                                .20
                            ) 62%,

                            rgba(
                                0,
                                0,
                                0,
                                .46
                            ) 70%,

                            rgba(
                                0,
                                0,
                                0,
                                .75
                            ) 79%,

                            black 91%
                        );
                }

                /*
                 * Последний этап:
                 * blur плавно растворяется
                 * в berry-фоне.
                 */
                .art-color-fade {
                    position: absolute;

                    z-index: 3;

                    inset: 0;

                    pointer-events: none;

                    background:
                        linear-gradient(
                            90deg,

                            transparent 40%,

                            rgba(
                                173,
                                25,
                                74,
                                .01
                            ) 49%,

                            rgba(
                                173,
                                25,
                                74,
                                .06
                            ) 56%,

                            rgba(
                                173,
                                25,
                                74,
                                .16
                            ) 63%,

                            rgba(
                                173,
                                25,
                                74,
                                .34
                            ) 70%,

                            rgba(
                                173,
                                25,
                                74,
                                .57
                            ) 77%,

                            rgba(
                                173,
                                25,
                                74,
                                .78
                            ) 84%,

                            rgba(
                                173,
                                25,
                                74,
                                .93
                            ) 91%,

                            #ad194a 100%
                        );
                }

                /* =====================================================
                   PAID CONTENT
                ===================================================== */

                .paid-content {
                    position: relative;

                    z-index: 10;

                    min-height: 590px;
                }

                /* =====================================================
                   TITLE
                ===================================================== */

                .paid-copy {
                    position: absolute;

                    top: 54px;
                    left: 51%;

                    width: 44%;

                    max-width: 510px;
                }

                .paid-label {
                    margin-bottom: 14px;

                    color:
                        rgba(
                            255,
                            244,
                            247,
                            .72
                        );

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
                        clamp(
                            42px,
                            4vw,
                            56px
                        );

                    line-height: .98;

                    font-weight: 400;

                    letter-spacing: -2.1px;

                    text-shadow:
                        0 2px 18px
                        rgba(
                            64,
                            0,
                            28,
                            .16
                        );
                }

                /* =====================================================
                   BENEFITS
                ===================================================== */

                .benefits {
                    position: absolute;

                    top: 245px;

                    left: 51%;
                    right: 42px;

                    display: grid;

                    grid-template-columns:
                        repeat(
                            2,
                            minmax(0, 1fr)
                        );

                    column-gap: 38px;
                    row-gap: 30px;
                }

                /* =====================================================
                   CTA
                ===================================================== */

                .paid-cta {
                    position: absolute;

                    z-index: 20;

                    right: 32px;
                    bottom: 61px;

                    width: 48%;
                    height: 78px;

                    padding:
                        0 28px;

                    display: flex;

                    align-items: center;
                    justify-content:
                        space-between;

                    gap: 20px;

                    border: 0;

                    border-radius: 18px;

                    background: #fffaf7;

                    color: #201d1e;

                    cursor: pointer;

                    box-shadow:
                        0 12px 32px
                        rgba(
                            67,
                            0,
                            29,
                            .12
                        );

                    transition:
                        transform
                        160ms ease,
                        box-shadow
                        160ms ease;
                }

                .paid-cta:hover {
                    transform:
                        translateY(-2px);

                    box-shadow:
                        0 16px 35px
                        rgba(
                            67,
                            0,
                            29,
                            .17
                        );
                }

                .cta-title {
                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size: 15px;
                    font-weight: 600;

                    letter-spacing: -.1px;
                }

                .cta-right {
                    display: flex;
                    align-items: center;

                    gap: 22px;

                    color: #c71e57;
                }

                .cta-right strong {
                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size: 30px;
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

                    right: 32px;
                    bottom: 27px;

                    width: 48%;

                    color:
                        rgba(
                            255,
                            240,
                            244,
                            .63
                        );

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size: 9px;

                    text-align: center;
                }

                /* =====================================================
                   TABLET
                ===================================================== */

                @media (
                    max-width: 1000px
                ) {

                    .forecast {
                        grid-template-columns:
                            minmax(260px, .9fr)
                            minmax(340px, 1.1fr);

                        gap: 40px;
                    }

                    .forecast-copy h2 {
                        font-size: 37px;
                    }

                    .paid-card,
                    .paid-content {
                        min-height: 550px;
                    }

                    .paid-art {
                        width: 74%;
                    }

                    .paid-copy {
                        top: 48px;
                        left: 49%;

                        width: 47%;
                    }

                    .paid-copy h2 {
                        font-size: 44px;
                    }

                    .benefits {
                        top: 225px;

                        left: 50%;
                        right: 30px;

                        column-gap: 25px;
                        row-gap: 24px;
                    }

                    .paid-cta {
                        right: 25px;

                        bottom: 57px;

                        width: 51%;
                        height: 70px;
                    }

                    .paid-note {
                        right: 25px;

                        bottom: 25px;

                        width: 51%;
                    }
                }

                /* =====================================================
                   MOBILE
                ===================================================== */

                @media (
                    max-width: 640px
                ) {

                    .page {
                        padding:
                            0 12px 36px;
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

                    /* =============================================
                       RESULT
                    ============================================= */

                    .results {
                        padding:
                            27px 0 30px;
                    }

                    .section-label {
                        margin-bottom: 14px;

                        font-size: 9px;
                    }

                    /* =============================================
                       FORECAST
                    ============================================= */

                    .forecast {
                        display: block;

                        padding:
                            29px 0 37px;
                    }

                    .forecast-copy h2 {
                        max-width: 330px;

                        font-size: 34px;

                        letter-spacing:
                            -1.5px;
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

                    /*
                     * На маленьком экране
                     * не показываем все подписи,
                     * чтобы шкала не превращалась
                     * в кашу.
                     *
                     * Точки/геометрия остаются.
                     */
                    .scale-labels span:nth-child(2),
                    .scale-labels span:nth-child(4),
                    .scale-labels span:nth-child(5) {
                        display: none;
                    }

                    /* =============================================
                       PAID SECTION
                    ============================================= */

                    .paid-section {
                        width: 100%;

                        margin: 0;
                    }

                    .paid-card,
                    .paid-content {
                        min-height: 750px;
                    }

                    .paid-card {
                        border-radius: 22px;
                    }

                    /* =============================================
                       MOBILE ART
                    ============================================= */

                    .paid-art {
                        top: 0;
                        left: 0;

                        width: 100%;
                        height: 415px;

                        bottom: auto;
                    }

                    .art-main {
                        width: 100%;
                        height: 100%;

                        object-fit: cover;

                        object-position:
                            50% 50%;
                    }

                    .art-blur {
                        width: 100%;
                        height: 100%;

                        object-position:
                            50% 50%;

                        filter:
                            blur(22px);

                        transform:
                            scale(1.08);

                        mask-image:
                            linear-gradient(
                                180deg,

                                transparent 48%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .04
                                ) 56%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .18
                                ) 65%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .43
                                ) 74%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .72
                                ) 84%,

                                black 96%
                            );

                        -webkit-mask-image:
                            linear-gradient(
                                180deg,

                                transparent 48%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .04
                                ) 56%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .18
                                ) 65%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .43
                                ) 74%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .72
                                ) 84%,

                                black 96%
                            );
                    }

                    .art-color-fade {
                        background:
                            linear-gradient(
                                180deg,

                                transparent 45%,

                                rgba(
                                    173,
                                    25,
                                    74,
                                    .02
                                ) 55%,

                                rgba(
                                    173,
                                    25,
                                    74,
                                    .10
                                ) 64%,

                                rgba(
                                    173,
                                    25,
                                    74,
                                    .28
                                ) 73%,

                                rgba(
                                    173,
                                    25,
                                    74,
                                    .53
                                ) 82%,

                                rgba(
                                    173,
                                    25,
                                    74,
                                    .78
                                ) 90%,

                                rgba(
                                    173,
                                    25,
                                    74,
                                    .95
                                ) 97%,

                                #ad194a 100%
                            );
                    }

                    /* =============================================
                       MOBILE TITLE
                    ============================================= */

                    .paid-copy {
                        top: 326px;
                        left: 25px;

                        width:
                            calc(
                                100% - 50px
                            );

                        max-width: none;
                    }

                    .paid-label {
                        margin-bottom: 10px;

                        font-size: 8px;

                        letter-spacing:
                            1.9px;
                    }

                    .paid-copy h2 {
                        max-width: 330px;

                        font-size: 35px;

                        line-height: .98;

                        letter-spacing:
                            -1.5px;

                        text-shadow:
                            0 2px 15px
                            rgba(
                                55,
                                0,
                                26,
                                .24
                            );
                    }

                    /* =============================================
                       MOBILE BENEFITS
                    ============================================= */

                    .benefits {
                        top: 457px;

                        left: 25px;
                        right: 25px;

                        width: auto;

                        grid-template-columns:
                            repeat(
                                2,
                                minmax(0, 1fr)
                            );

                        column-gap: 20px;
                        row-gap: 21px;
                    }

                    /* =============================================
                       MOBILE CTA
                    ============================================= */

                    .paid-cta {
                        left: 20px;
                        right: 20px;

                        bottom: 49px;

                        width:
                            calc(
                                100% - 40px
                            );

                        height: 61px;

                        padding:
                            0 18px;

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
                        left: 20px;
                        right: 20px;

                        bottom: 20px;

                        width: auto;

                        font-size: 8px;
                    }
                }

                /* =====================================================
                   SMALL MOBILE
                ===================================================== */

                @media (
                    max-width: 390px
                ) {

                    .paid-card,
                    .paid-content {
                        min-height: 720px;
                    }

                    .paid-art {
                        height: 390px;
                    }

                    .paid-copy {
                        top: 307px;

                        left: 22px;

                        width:
                            calc(
                                100% - 44px
                            );
                    }

                    .paid-copy h2 {
                        font-size: 32px;
                    }

                    .benefits {
                        top: 430px;

                        left: 22px;
                        right: 22px;

                        column-gap: 14px;
                        row-gap: 18px;
                    }

                    .paid-cta {
                        left: 16px;
                        right: 16px;

                        width:
                            calc(
                                100% - 32px
                            );
                    }

                    .paid-note {
                        left: 16px;
                        right: 16px;
                    }
                }

            `}</style>
        </main>
    );
}

/* ============================================================
   CATEGORY
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

                    <span>
                        /10
                    </span>

                </div>

            </div>

            <div className="category-line">

                <div
                    style={{
                        width:
                            `${safeValue * 10}%`,
                    }}
                />

            </div>

            <style jsx>{`

                .category-row {
                    padding:
                        16px 0 18px;

                    border-bottom:
                        1px solid
                        #e0d9d6;
                }

                .category-row:first-child {
                    padding-top: 0;
                }

                .category-head {
                    display: flex;

                    align-items: flex-end;

                    justify-content:
                        space-between;

                    gap: 20px;
                }

                .category-title {
                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size: 29px;

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

                @media (
                    max-width: 640px
                ) {

                    .category-row {
                        padding:
                            13px 0 15px;
                    }

                    .category-title {
                        font-size: 24px;
                    }

                    .category-subtitle {
                        max-width: 250px;

                        font-size: 10px;
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
                        22px
                        minmax(0, 1fr);

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

                    line-height: 1.3;

                    font-weight: 500;
                }

                @media (
                    max-width: 640px
                ) {

                    .benefit {
                        grid-template-columns:
                            19px
                            minmax(0, 1fr);

                        gap: 8px;
                    }

                    .benefit-icon {
                        width: 17px;
                    }

                    .benefit-text {
                        font-size: 11px;

                        line-height: 1.28;
                    }
                }

            `}</style>

        </div>
    );
}

/* ============================================================
   ICONS
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

/* ============================================================
   YEAR WORD
============================================================ */

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