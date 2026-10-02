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

const PAID_IMAGE =
    "/images/full-report-couple.png";

export default function ResultPage() {
    const params = useParams();
    const router = useRouter();

    const coupleId = String(
        params.coupleId ?? ""
    );

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
                const response =
                    await fetch(
                        `/api/report?id=${encodeURIComponent(
                            coupleId
                        )}`,
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
                ((same + close * 0.5) /
                    total) *
                MAX_SCORE
            );

            const clamp = (
                value: number
            ) =>
                Math.max(
                    0,
                    Math.min(
                        MAX_SCORE,
                        value
                    )
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

    const forecastPosition =
        useMemo(() => {
            const points = [
                {
                    years: 1 / 12,
                    position: 2,
                },
                {
                    years: 1,
                    position: 18,
                },
                {
                    years: 5,
                    position: 36,
                },
                {
                    years: 10,
                    position: 54,
                },
                {
                    years: 25,
                    position: 74,
                },
                {
                    years: 60,
                    position: 98,
                },
            ];

            if (
                yearsForecast <=
                points[0].years
            ) {
                return points[0].position;
            }

            for (
                let i = 0;
                i < points.length - 1;
                i++
            ) {
                const current =
                    points[i];

                const next =
                    points[i + 1];

                if (
                    yearsForecast >=
                    current.years &&
                    yearsForecast <=
                    next.years
                ) {
                    const ratio =
                        (
                            yearsForecast -
                            current.years
                        ) /
                        (
                            next.years -
                            current.years
                        );

                    return (
                        current.position +
                        ratio *
                        (
                            next.position -
                            current.position
                        )
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

                        <span>
                            {nameA}
                        </span>

                        <b>
                            ×
                        </b>

                        <span>
                            {nameB}
                        </span>

                    </div>

                </header>

                {/* ================================
                    RESULT
                ================================ */}

                <section className="results">

                    <div className="section-label">
                        ВАШ РЕЗУЛЬТАТ
                    </div>

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

                {/* ================================
                    FORECAST
                ================================ */}

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

                                <div className="scale-tick tick-1" />
                                <div className="scale-tick tick-2" />
                                <div className="scale-tick tick-3" />
                                <div className="scale-tick tick-4" />

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

            {/* ================================
                FULL REPORT
            ================================ */}

            <section className="paid-section">

                <div className="paid-card">

                    <div className="paid-art">

                        {/* резкое изображение */}

                        <img
                            className="art-main"
                            src={PAID_IMAGE}
                            alt=""
                            draggable={false}
                        />

                        {/* очень лёгкий blur только на стыке */}

                        <img
                            className="art-edge-blur"
                            src={PAID_IMAGE}
                            alt=""
                            draggable={false}
                        />

                        {/* мягкое окрашивание в цвет карточки */}

                        <div className="art-color-wash" />

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

                                <b>
                                    →
                                </b>

                            </span>

                        </button>

                        <div className="paid-note">
                            один разбор · для вас двоих · сразу после оплаты
                        </div>

                    </div>

                </div>

            </section>

            <style jsx>{`

                /* =============================================
                   GLOBAL
                ============================================= */

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

                /* =============================================
                   HEADER
                ============================================= */

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

                /* =============================================
                   COMMON
                ============================================= */

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

                /* =============================================
                   RESULT
                ============================================= */

                .results {
                    padding:
                        42px 0 38px;
                }

                /* =============================================
                   FORECAST
                ============================================= */

                .forecast {
                    padding:
                        38px 0 50px;

                    display: grid;

                    grid-template-columns:
                        minmax(
                            280px,
                            .95fr
                        )
                        minmax(
                            360px,
                            1.05fr
                        );

                    gap: 56px;

                    align-items: center;

                    border-top:
                        1px solid
                        #dcd4d1;
                }

                .forecast-copy h2 {
                    max-width: 460px;

                    margin: 0;

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
                        12px 0 0;

                    color: #958b8e;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size: 11px;
                    line-height: 1.4;

                    letter-spacing: .1px;
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

                /* =============================================
                   SCALE
                ============================================= */

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
                        4px solid
                        #f8f4f1;

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
                        translate(
                            -50%,
                            -50%
                        );
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
                        translate(
                            -50%,
                            -50%
                        );
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

                /* =============================================
                   PAID CARD
                ============================================= */

                .paid-section {
                    width: min(
                        1500px,
                        calc(100% - 40px)
                    );

                    margin:
                        12px auto 0;
                }

                .paid-card {
                    position: relative;

                    width: 100%;

                    min-height: 430px;

                    overflow: hidden;

                    border-radius: 24px;

                    /*
                     * ВАЖНО:
                     *
                     * Цвет близок к правому краю
                     * самой картинки.
                     * Поэтому переход становится
                     * намного менее заметным.
                     */
                    background: #ad194a;

                    isolation: isolate;
                }

                /* =============================================
                   ART
                ============================================= */

                .paid-art {
                    position: absolute;

                    z-index: 1;

                    inset: 0;

                    overflow: hidden;

                    pointer-events: none;
                }

                /*
                 * ГЛАВНАЯ КАРТИНКА
                 *
                 * Вместо жёсткого обрыва справа
                 * сама картинка постепенно становится
                 * прозрачной.
                 *
                 * Это основа мягкого перехода.
                 */
                .art-main {
                    position: absolute;

                    z-index: 1;

                    top: 0;
                    bottom: 0;
                    left: 0;

                    width: 68%;
                    height: 100%;

                    display: block;

                    object-fit: cover;

                    object-position:
                        50% 50%;

                    user-select: none;

                    mask-image:
                        linear-gradient(
                            90deg,

                            black 0%,

                            black 56%,

                            rgba(
                                0,
                                0,
                                0,
                                .98
                            ) 61%,

                            rgba(
                                0,
                                0,
                                0,
                                .93
                            ) 66%,

                            rgba(
                                0,
                                0,
                                0,
                                .82
                            ) 71%,

                            rgba(
                                0,
                                0,
                                0,
                                .67
                            ) 76%,

                            rgba(
                                0,
                                0,
                                0,
                                .49
                            ) 81%,

                            rgba(
                                0,
                                0,
                                0,
                                .31
                            ) 86%,

                            rgba(
                                0,
                                0,
                                0,
                                .16
                            ) 91%,

                            rgba(
                                0,
                                0,
                                0,
                                .06
                            ) 96%,

                            transparent 100%
                        );

                    -webkit-mask-image:
                        linear-gradient(
                            90deg,

                            black 0%,

                            black 56%,

                            rgba(
                                0,
                                0,
                                0,
                                .98
                            ) 61%,

                            rgba(
                                0,
                                0,
                                0,
                                .93
                            ) 66%,

                            rgba(
                                0,
                                0,
                                0,
                                .82
                            ) 71%,

                            rgba(
                                0,
                                0,
                                0,
                                .67
                            ) 76%,

                            rgba(
                                0,
                                0,
                                0,
                                .49
                            ) 81%,

                            rgba(
                                0,
                                0,
                                0,
                                .31
                            ) 86%,

                            rgba(
                                0,
                                0,
                                0,
                                .16
                            ) 91%,

                            rgba(
                                0,
                                0,
                                0,
                                .06
                            ) 96%,

                            transparent 100%
                        );
                }

                /*
                 * BLUR ТОЛЬКО НА ГРАНИЦЕ
                 *
                 * Важно:
                 * геометрия абсолютно такая же,
                 * как у основной картинки.
                 *
                 * Поэтому нет двух разных
                 * вертикальных зон.
                 */
                .art-edge-blur {
                    position: absolute;

                    z-index: 2;

                    top: -2%;
                    bottom: -2%;
                    left: -1%;

                    width: 69%;
                    height: 104%;

                    object-fit: cover;

                    object-position:
                        50% 50%;

                    filter:
                        blur(13px);

                    transform:
                        scale(1.015);

                    opacity: .48;

                    user-select: none;

                    mask-image:
                        linear-gradient(
                            90deg,

                            transparent 0%,

                            transparent 55%,

                            rgba(
                                0,
                                0,
                                0,
                                .04
                            ) 60%,

                            rgba(
                                0,
                                0,
                                0,
                                .12
                            ) 65%,

                            rgba(
                                0,
                                0,
                                0,
                                .25
                            ) 70%,

                            rgba(
                                0,
                                0,
                                0,
                                .38
                            ) 75%,

                            rgba(
                                0,
                                0,
                                0,
                                .46
                            ) 80%,

                            rgba(
                                0,
                                0,
                                0,
                                .42
                            ) 85%,

                            rgba(
                                0,
                                0,
                                0,
                                .30
                            ) 90%,

                            rgba(
                                0,
                                0,
                                0,
                                .14
                            ) 95%,

                            transparent 100%
                        );

                    -webkit-mask-image:
                        linear-gradient(
                            90deg,

                            transparent 0%,

                            transparent 55%,

                            rgba(
                                0,
                                0,
                                0,
                                .04
                            ) 60%,

                            rgba(
                                0,
                                0,
                                0,
                                .12
                            ) 65%,

                            rgba(
                                0,
                                0,
                                0,
                                .25
                            ) 70%,

                            rgba(
                                0,
                                0,
                                0,
                                .38
                            ) 75%,

                            rgba(
                                0,
                                0,
                                0,
                                .46
                            ) 80%,

                            rgba(
                                0,
                                0,
                                0,
                                .42
                            ) 85%,

                            rgba(
                                0,
                                0,
                                0,
                                .30
                            ) 90%,

                            rgba(
                                0,
                                0,
                                0,
                                .14
                            ) 95%,

                            transparent 100%
                        );
                }

                /*
                 * ЦВЕТОВОЙ WASH
                 *
                 * Очень длинный и плавный.
                 *
                 * Его задача не спрятать картинку,
                 * а постепенно привести её
                 * к #ad194a.
                 */
                .art-color-wash {
                    position: absolute;

                    z-index: 3;

                    inset: 0;

                    background:
                        linear-gradient(
                            90deg,

                            transparent 0%,

                            transparent 34%,

                            rgba(
                                173,
                                25,
                                74,
                                .01
                            ) 40%,

                            rgba(
                                173,
                                25,
                                74,
                                .025
                            ) 45%,

                            rgba(
                                173,
                                25,
                                74,
                                .05
                            ) 50%,

                            rgba(
                                173,
                                25,
                                74,
                                .09
                            ) 55%,

                            rgba(
                                173,
                                25,
                                74,
                                .15
                            ) 60%,

                            rgba(
                                173,
                                25,
                                74,
                                .24
                            ) 65%,

                            rgba(
                                173,
                                25,
                                74,
                                .36
                            ) 70%,

                            rgba(
                                173,
                                25,
                                74,
                                .50
                            ) 75%,

                            rgba(
                                173,
                                25,
                                74,
                                .65
                            ) 80%,

                            rgba(
                                173,
                                25,
                                74,
                                .78
                            ) 85%,

                            rgba(
                                173,
                                25,
                                74,
                                .88
                            ) 90%,

                            rgba(
                                173,
                                25,
                                74,
                                .95
                            ) 95%,

                            #ad194a 100%
                        );
                }

                /* =============================================
                   PAID CONTENT
                ============================================= */

                .paid-content {
                    position: relative;

                    z-index: 10;

                    min-height: 430px;
                }

                .paid-copy {
                    position: absolute;

                    top: 38px;

                    left: 56%;

                    width: 40%;

                    max-width: 560px;
                }

                .paid-label {
                    margin-bottom: 10px;

                    color:
                        rgba(
                            255,
                            244,
                            247,
                            .82
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
                            38px,
                            3.9vw,
                            58px
                        );

                    line-height: .95;

                    font-weight: 400;

                    letter-spacing: -1.7px;

                    text-shadow:
                        0 2px 18px
                        rgba(
                            64,
                            0,
                            28,
                            .14
                        );
                }

                /* =============================================
                   BENEFITS
                ============================================= */

                .benefits {
                    position: absolute;

                    top: 177px;

                    left: 56%;
                    right: 34px;

                    display: grid;

                    grid-template-columns:
                        repeat(
                            2,
                            minmax(
                                0,
                                1fr
                            )
                        );

                    column-gap: 34px;
                    row-gap: 22px;
                }

                /* =============================================
                   CTA
                ============================================= */

                .paid-cta {
                    position: absolute;

                    z-index: 20;

                    right: 28px;
                    bottom: 44px;

                    width: 46%;
                    height: 62px;

                    padding:
                        0 24px;

                    display: flex;

                    align-items: center;

                    justify-content:
                        space-between;

                    gap: 20px;

                    border: 0;

                    border-radius: 17px;

                    background: #fffaf7;

                    color: #201d1e;

                    cursor: pointer;

                    box-shadow:
                        0 12px 28px
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
                            .16
                        );
                }

                .cta-title {
                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size: 14px;
                    font-weight: 600;

                    letter-spacing: -.1px;
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
                        rgba(
                            255,
                            240,
                            244,
                            .64
                        );

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size: 9px;

                    text-align: center;
                }

                /* =============================================
                   TABLET
                ============================================= */

                @media (
                    max-width: 1180px
                ) {

                    .paid-card,
                    .paid-content {
                        min-height: 410px;
                    }

                    .art-main {
                        width: 69%;
                    }

                    .art-edge-blur {
                        width: 70%;
                    }

                    .paid-copy {
                        top: 34px;

                        left: 55%;

                        width: 41%;
                    }

                    .benefits {
                        top: 168px;

                        left: 55%;

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

                @media (
                    max-width: 1000px
                ) {

                    .forecast {
                        grid-template-columns:
                            minmax(
                                260px,
                                .95fr
                            )
                            minmax(
                                330px,
                                1.05fr
                            );

                        gap: 40px;
                    }

                    .forecast-copy h2 {
                        font-size: 37px;
                    }

                    .paid-card,
                    .paid-content {
                        min-height: 390px;
                    }

                    .paid-copy {
                        top: 30px;

                        left: 54.5%;

                        width: 42%;
                    }

                    .paid-copy h2 {
                        font-size: 40px;
                    }

                    .benefits {
                        top: 154px;

                        left: 54.5%;

                        right: 24px;

                        row-gap: 18px;
                    }

                    .paid-cta {
                        right: 22px;

                        bottom: 40px;

                        width: 50%;
                        height: 58px;
                    }

                    .paid-note {
                        right: 22px;

                        width: 50%;
                    }
                }

                /* =============================================
                   MOBILE
                ============================================= */

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

                    .results {
                        padding:
                            27px 0 30px;
                    }

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

                    .scale-labels
                    span:nth-child(2),

                    .scale-labels
                    span:nth-child(4),

                    .scale-labels
                    span:nth-child(5) {
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

                    /*
                     * На телефоне та же логика,
                     * только переход идёт сверху вниз.
                     */
                    .paid-art {
                        height: 375px;
                    }

                    .art-main {
                        top: 0;
                        left: 0;

                        width: 100%;
                        height: 100%;

                        object-fit: cover;

                        object-position:
                            50% 50%;

                        mask-image:
                            linear-gradient(
                                180deg,

                                black 0%,

                                black 57%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .97
                                ) 63%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .86
                                ) 69%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .68
                                ) 75%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .47
                                ) 81%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .27
                                ) 87%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .11
                                ) 93%,

                                transparent 100%
                            );

                        -webkit-mask-image:
                            linear-gradient(
                                180deg,

                                black 0%,

                                black 57%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .97
                                ) 63%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .86
                                ) 69%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .68
                                ) 75%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .47
                                ) 81%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .27
                                ) 87%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .11
                                ) 93%,

                                transparent 100%
                            );
                    }

                    .art-edge-blur {
                        top: 0;
                        left: 0;

                        width: 100%;
                        height: 100%;

                        object-position:
                            50% 50%;

                        filter:
                            blur(12px);

                        transform:
                            scale(1.02);

                        opacity: .46;

                        mask-image:
                            linear-gradient(
                                180deg,

                                transparent 0%,

                                transparent 55%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .05
                                ) 61%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .18
                                ) 68%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .35
                                ) 75%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .44
                                ) 82%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .28
                                ) 90%,

                                transparent 100%
                            );

                        -webkit-mask-image:
                            linear-gradient(
                                180deg,

                                transparent 0%,

                                transparent 55%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .05
                                ) 61%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .18
                                ) 68%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .35
                                ) 75%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .44
                                ) 82%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .28
                                ) 90%,

                                transparent 100%
                            );
                    }

                    .art-color-wash {
                        background:
                            linear-gradient(
                                180deg,

                                transparent 0%,

                                transparent 40%,

                                rgba(
                                    173,
                                    25,
                                    74,
                                    .02
                                ) 50%,

                                rgba(
                                    173,
                                    25,
                                    74,
                                    .06
                                ) 58%,

                                rgba(
                                    173,
                                    25,
                                    74,
                                    .13
                                ) 66%,

                                rgba(
                                    173,
                                    25,
                                    74,
                                    .26
                                ) 74%,

                                rgba(
                                    173,
                                    25,
                                    74,
                                    .44
                                ) 81%,

                                rgba(
                                    173,
                                    25,
                                    74,
                                    .65
                                ) 87%,

                                rgba(
                                    173,
                                    25,
                                    74,
                                    .82
                                ) 92%,

                                rgba(
                                    173,
                                    25,
                                    74,
                                    .94
                                ) 97%,

                                #ad194a 100%
                            );
                    }

                    .paid-copy {
                        top: 385px;

                        left: 22px;

                        width:
                            calc(
                                100% - 44px
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
                        max-width: 340px;

                        font-size: 31px;
                        line-height: .97;

                        letter-spacing:
                            -1.35px;
                    }

                    .benefits {
                        top: 505px;

                        left: 22px;
                        right: 22px;

                        width: auto;

                        grid-template-columns:
                            repeat(
                                2,
                                minmax(
                                    0,
                                    1fr
                                )
                            );

                        column-gap: 16px;
                        row-gap: 18px;
                    }

                    .paid-cta {
                        left: 16px;
                        right: 16px;

                        bottom: 50px;

                        width:
                            calc(
                                100% - 32px
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
                        left: 16px;
                        right: 16px;

                        bottom: 21px;

                        width: auto;

                        font-size: 8px;
                    }
                }

                @media (
                    max-width: 390px
                ) {

                    .paid-card,
                    .paid-content {
                        min-height: 735px;
                    }

                    .paid-art {
                        height: 355px;
                    }

                    .paid-copy {
                        top: 365px;
                    }

                    .paid-copy h2 {
                        font-size: 29px;
                    }

                    .benefits {
                        top: 480px;

                        column-gap: 12px;
                        row-gap: 16px;
                    }
                }

            `}</style>

        </main>
    );
}

/* =============================================
   CATEGORY
============================================= */

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

/* =============================================
   BENEFIT
============================================= */

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
                        minmax(
                            0,
                            1fr
                        );

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

                @media (
                    max-width: 640px
                ) {

                    .benefit {
                        grid-template-columns:
                            19px
                            minmax(
                                0,
                                1fr
                            );

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

/* =============================================
   ICONS
============================================= */

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

    if (
        type ===
        "message"
    ) {
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

    if (
        type ===
        "lightning"
    ) {
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

/* =============================================
   YEAR WORD
============================================= */

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

    if (
        mod10 === 1
    ) {
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