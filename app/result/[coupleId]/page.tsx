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
        data?.couple?.partner_b_name ||
        "Партнёр";

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

                {/* =================================================
                    HEADER
                ================================================= */}

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

                {/* =================================================
                    RESULTS
                ================================================= */}

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

                        <h2 className="forecast-title">
                            Ориентировочная
                            <br />
                            длительность
                            <br className="desktop-break" />
                            ваших отношений
                        </h2>

                        <p className="forecast-description">
                            На основе ваших ответов мы оценили
                            ориентировочный сценарий
                            длительности ваших отношений.
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

            {/* =====================================================
                PAID REPORT
            ===================================================== */}

            <section className="paid-section">

                <div className="paid-card">

                    {/* =================================================
                        ORIGINAL ART
                    ================================================= */}

                    <div className="art">

                        <img
                            className="art-image"
                            src={PAID_IMAGE}
                            alt=""
                            draggable={false}
                        />

                        {/* =================================================
                            BLURRED COPY

                            Это принципиально.

                            Мы не пытаемся получить blur
                            через один gradient.

                            Здесь реальная вторая копия
                            изображения с filter: blur().
                        ================================================= */}

                        <img
                            className="art-image art-image-blur"
                            src={PAID_IMAGE}
                            alt=""
                            draggable={false}
                        />

                    </div>

                    {/* =================================================
                        FADE

                        Отдельный слой затемняет blur
                        и постепенно переводит его
                        в цвет карточки.
                    ================================================= */}

                    <div className="art-fade" />

                    <div className="card-overlay" />

                    {/* =================================================
                        CONTENT
                    ================================================= */}

                    <div className="paid-content">

                        {/* =================================================
                            TITLE
                        ================================================= */}

                        <div className="paid-title">

                            <div className="paid-label">
                                ПОЛНЫЙ РАЗБОР
                            </div>

                            <h2>
                                Чтобы вместе —
                                <br />
                                и надолго.
                            </h2>

                        </div>

                        {/* =================================================
                            BENEFITS
                        ================================================= */}

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

                        {/* =================================================
                            CTA
                        ================================================= */}

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

            <style jsx>{`

                /* =====================================================
                   GLOBAL
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

                    overflow-x: hidden;

                    background: #f8f4f1;

                    padding-bottom: 80px;
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

                    letter-spacing:
                        -1.1px;
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

                    letter-spacing:
                        1.2px;

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
                        42px 0
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

                    letter-spacing:
                        2.2px;
                }

                .results-title {
                    margin:
                        0 0 32px;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size: 48px;
                    line-height: 0.98;

                    font-weight: 400;

                    letter-spacing:
                        -2.5px;
                }

                .category-list {
                    display: flex;
                    flex-direction: column;
                }

                /* =====================================================
                   FORECAST
                ===================================================== */

                .forecast {
                    padding:
                        38px 0
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
                    max-width: 520px;

                    margin: 0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size: 43px;
                    line-height: 1.01;

                    font-weight: 400;

                    letter-spacing:
                        -2.2px;
                }

                .forecast-description {
                    max-width: 520px;

                    margin:
                        15px 0 0;

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

                    letter-spacing:
                        -4px;
                }

                .years span {
                    margin-left: 9px;

                    font-size: 39px;
                    line-height: 1;

                    letter-spacing:
                        -1.5px;
                }

                .forecast-scale {
                    width: 100%;
                    margin-top: 23px;
                }

                .scale-track {
                    position: relative;

                    height: 9px;

                    border-radius:
                        999px;

                    background:
                        #e5dfe0;
                }

                .scale-fill {
                    position: absolute;

                    inset:
                        0 auto 0 0;

                    border-radius:
                        inherit;

                    background:
                        #e99ab5;
                }

                .scale-dot {
                    position: absolute;

                    top: 50%;

                    width: 22px;
                    height: 22px;

                    border-radius:
                        50%;

                    background:
                        #c21856;

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
                   PAID SECTION
                ===================================================== */

                .paid-section {
                    width: min(
                        1180px,
                        calc(100% - 40px)
                    );

                    margin:
                        8px auto 0;
                }

                /* =====================================================
                   CARD
                ===================================================== */

                .paid-card {
                    position: relative;

                    width: 100%;

                    min-height: 500px;

                    overflow: hidden;

                    border-radius: 24px;

                    background:
                        linear-gradient(
                            90deg,
                            #9e104c 0%,
                            #a50f4c 48%,
                            #aa0e4f 100%
                        );

                    isolation: isolate;
                }

                /* =====================================================
                   ART

                   Desktop image deliberately ends BEFORE
                   the actual edge of the card.

                   The blur copy continues visually into
                   the right side.
                ===================================================== */

                .art {
                    position: absolute;

                    z-index: 1;

                    inset:
                        0 auto 0 0;

                    width: 68%;

                    overflow: visible;
                }

                .art-image {
                    position: absolute;

                    inset: 0;

                    width: 100%;
                    height: 100%;

                    display: block;

                    object-fit: cover;

                    object-position:
                        50% 50%;

                    user-select: none;

                    pointer-events: none;
                }

                /* =====================================================
                   BLURRED IMAGE COPY

                   Основной blur.

                   Он находится поверх оригинала,
                   но постепенно появляется только
                   ближе к краю.
                ===================================================== */

                .art-image-blur {
                    z-index: 2;

                    filter:
                        blur(18px);

                    transform:
                        scale(1.045);

                    opacity: 0.95;

                    mask-image:
                        linear-gradient(
                            90deg,
                            transparent 45%,
                            rgba(0,0,0,0.10) 53%,
                            rgba(0,0,0,0.35) 61%,
                            rgba(0,0,0,0.65) 69%,
                            black 78%,
                            black 100%
                        );

                    -webkit-mask-image:
                        linear-gradient(
                            90deg,
                            transparent 45%,
                            rgba(0,0,0,0.10) 53%,
                            rgba(0,0,0,0.35) 61%,
                            rgba(0,0,0,0.65) 69%,
                            black 78%,
                            black 100%
                        );
                }

                /* =====================================================
                   DESKTOP FADE

                   Теперь fade начинается значительно раньше.

                   Никакой вертикальной стены.
                ===================================================== */

                .art-fade {
                    position: absolute;

                    z-index: 3;

                    inset: 0;

                    pointer-events: none;

                    background:
                        linear-gradient(
                            90deg,

                            rgba(
                                166,
                                15,
                                77,
                                0
                            ) 40%,

                            rgba(
                                166,
                                15,
                                77,
                                0.025
                            ) 47%,

                            rgba(
                                166,
                                15,
                                77,
                                0.10
                            ) 55%,

                            rgba(
                                166,
                                15,
                                77,
                                0.24
                            ) 63%,

                            rgba(
                                166,
                                15,
                                77,
                                0.43
                            ) 71%,

                            rgba(
                                166,
                                15,
                                77,
                                0.64
                            ) 78%,

                            rgba(
                                166,
                                15,
                                77,
                                0.83
                            ) 85%,

                            rgba(
                                166,
                                15,
                                77,
                                0.95
                            ) 92%,

                            #a50f4c 100%
                        );
                }

                /* =====================================================
                   CARD OVERLAY
                ===================================================== */

                .card-overlay {
                    position: absolute;

                    z-index: 4;

                    inset: 0;

                    pointer-events: none;

                    background:
                        linear-gradient(
                            180deg,
                            rgba(
                                35,
                                0,
                                20,
                                0.02
                            ) 0%,

                            rgba(
                                35,
                                0,
                                20,
                                0
                            ) 55%,

                            rgba(
                                35,
                                0,
                                20,
                                0.08
                            ) 100%
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

                   Теперь чуть меньше и выше,
                   но не залезает так сильно
                   на левый край.
                ===================================================== */

                .paid-title {
                    position: absolute;

                    top: 38px;
                    left: 68px;

                    width: 480px;
                }

                .paid-label {
                    margin-bottom: 13px;

                    color:
                        rgba(
                            255,
                            244,
                            247,
                            0.88
                        );

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size: 10px;
                    line-height: 1;

                    font-weight: 700;

                    letter-spacing:
                        2.15px;
                }

                .paid-title h2 {
                    margin: 0;

                    color:
                        #fff9f6;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        clamp(
                            40px,
                            3.65vw,
                            52px
                        );

                    line-height:
                        0.97;

                    font-weight: 400;

                    letter-spacing:
                        -2.25px;

                    text-shadow:
                        0 2px 16px
                        rgba(
                            40,
                            0,
                            20,
                            0.12
                        );
                }

                /* =====================================================
                   BENEFITS

                   Чуть ниже.
                   Не прямо у верхнего края.
                ===================================================== */

                .benefits {
                    position: absolute;

                    top: 63px;
                    right: 72px;

                    width: 290px;

                    display: grid;

                    grid-template-columns:
                        1fr;

                    gap: 27px;
                }

                /* =====================================================
                   CTA

                   Чуть выше нижнего края.
                   Центрируем относительно
                   правой части.
                ===================================================== */

                .paid-cta {
                    position: absolute;

                    z-index: 20;

                    right: 38px;

                    bottom: 50px;

                    width:
                        min(
                            640px,
                            55%
                        );

                    height: 72px;

                    padding:
                        0 28px;

                    display: flex;

                    align-items: center;

                    justify-content:
                        space-between;

                    gap: 20px;

                    border: 0;

                    border-radius:
                        15px;

                    background:
                        #fffaf7;

                    color:
                        #201d1e;

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
                        transform
                        160ms ease,
                        box-shadow
                        160ms ease;
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

                    align-items:
                        center;

                    gap: 22px;

                    color:
                        #c51b58;
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

                    font-size: 26px;
                    line-height: 1;

                    font-weight: 300;
                }

                .paid-note {
                    position: absolute;

                    z-index: 20;

                    right: 38px;

                    bottom: 21px;

                    width:
                        min(
                            640px,
                            55%
                        );

                    color:
                        rgba(
                            255,
                            238,
                            243,
                            0.68
                        );

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size: 9px;
                    line-height: 1;

                    text-align:
                        center;
                }

                /* =====================================================
                   TABLET
                ===================================================== */

                @media (max-width: 1000px) {

                    .paid-card {
                        min-height:
                            470px;
                    }

                    .paid-content {
                        min-height:
                            470px;
                    }

                    .art {
                        width:
                            67%;
                    }

                    .paid-title {
                        top: 34px;
                        left: 46px;

                        width:
                            43%;
                    }

                    .paid-title h2 {
                        font-size:
                            43px;
                    }

                    .benefits {
                        top: 53px;
                        right: 35px;

                        width:
                            28%;

                        gap: 21px;
                    }

                    .paid-cta {
                        right: 28px;

                        bottom: 43px;

                        width:
                            54%;

                        height:
                            68px;
                    }

                    .paid-note {
                        right: 28px;

                        bottom: 18px;

                        width:
                            54%;
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
                            36px;
                    }

                    .content-shell {
                        width:
                            100%;
                    }

                    .header {
                        min-height:
                            64px;

                        gap: 12px;
                    }

                    .brand {
                        font-size:
                            21px;
                    }

                    .couple-names {
                        max-width:
                            52%;

                        gap:
                            5px;

                        font-size:
                            8px;

                        letter-spacing:
                            0.65px;
                    }

                    /* =============================================
                       RESULTS
                    ============================================= */

                    .results {
                        padding:
                            29px 0
                            33px;
                    }

                    .section-label {
                        margin-bottom:
                            11px;

                        font-size:
                            9px;

                        letter-spacing:
                            1.8px;
                    }

                    .results-title {
                        margin-bottom:
                            24px;

                        font-size:
                            37px;

                        line-height:
                            1;

                        letter-spacing:
                            -1.8px;
                    }

                    /* =============================================
                       FORECAST
                    ============================================= */

                    .forecast {
                        padding:
                            29px 0
                            37px;

                        display:
                            block;
                    }

                    .forecast-title {
                        max-width:
                            100%;

                        font-size:
                            34px;

                        line-height:
                            1.01;

                        letter-spacing:
                            -1.55px;
                    }

                    .forecast-description {
                        max-width:
                            100%;

                        margin-top:
                            13px;

                        font-size:
                            12px;

                        line-height:
                            1.45;
                    }

                    .desktop-break {
                        display:
                            none;
                    }

                    .forecast-result {
                        width:
                            100%;

                        margin-top:
                            25px;
                    }

                    .years strong {
                        font-size:
                            64px;

                        letter-spacing:
                            -3px;
                    }

                    .years span {
                        margin-left:
                            7px;

                        font-size:
                            34px;

                        letter-spacing:
                            -1px;
                    }

                    .forecast-scale {
                        margin-top:
                            20px;
                    }

                    .scale-track {
                        height:
                            7px;
                    }

                    .scale-dot {
                        width:
                            19px;

                        height:
                            19px;
                    }

                    .scale-labels {
                        margin-top:
                            10px;

                        font-size:
                            9px;
                    }

                    /* =============================================
                       PAID SECTION
                    ============================================= */

                    .paid-section {
                        width:
                            100%;

                        margin-top:
                            0;
                    }

                    .paid-card {
                        min-height:
                            650px;

                        border-radius:
                            22px;

                        background:
                            linear-gradient(
                                180deg,
                                #a20e4d 0%,
                                #aa104f 100%
                            );
                    }

                    .paid-content {
                        min-height:
                            650px;
                    }

                    /* =============================================
                       MOBILE ART

                       Картинка остаётся достаточно большой,
                       но fade начинается ДО её нижней границы.
                    ============================================= */

                    .art {
                        inset:
                            0
                            0
                            auto
                            0;

                        width:
                            100%;

                        height:
                            395px;

                        overflow:
                            visible;
                    }

                    .art-image {
                        object-fit:
                            cover;

                        object-position:
                            50%
                            50%;
                    }

                    /*
                     * На мобильном blur должен быть
                     * намного сильнее.
                     */

                    .art-image-blur {
                        filter:
                            blur(20px);

                        transform:
                            scale(1.07);

                        mask-image:
                            linear-gradient(
                                180deg,
                                transparent 40%,
                                rgba(0,0,0,0.06) 47%,
                                rgba(0,0,0,0.20) 56%,
                                rgba(0,0,0,0.45) 65%,
                                rgba(0,0,0,0.72) 74%,
                                black 84%,
                                black 100%
                            );

                        -webkit-mask-image:
                            linear-gradient(
                                180deg,
                                transparent 40%,
                                rgba(0,0,0,0.06) 47%,
                                rgba(0,0,0,0.20) 56%,
                                rgba(0,0,0,0.45) 65%,
                                rgba(0,0,0,0.72) 74%,
                                black 84%,
                                black 100%
                            );
                    }

                    /*
                     * ВАЖНО:
                     * fade теперь начинается прямо
                     * поверх нижней части картинки.
                     */

                    .art-fade {
                        z-index:
                            3;

                        inset:
                            0
                            0
                            auto
                            0;

                        width:
                            100%;

                        height:
                            245px;

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
                                    0.02
                                ) 17%,

                                rgba(
                                    163,
                                    14,
                                    77,
                                    0.07
                                ) 31%,

                                rgba(
                                    163,
                                    14,
                                    77,
                                    0.17
                                ) 45%,

                                rgba(
                                    163,
                                    14,
                                    77,
                                    0.32
                                ) 58%,

                                rgba(
                                    163,
                                    14,
                                    77,
                                    0.52
                                ) 70%,

                                rgba(
                                    163,
                                    14,
                                    77,
                                    0.73
                                ) 81%,

                                rgba(
                                    163,
                                    14,
                                    77,
                                    0.90
                                ) 92%,

                                #a30e4d 100%
                            );
                    }

                    /*
                     * Дополнительный blur самого перехода.
                     */

                    .art-fade::after {
                        content:
                            "";

                        position:
                            absolute;

                        inset:
                            30% 0 0 0;

                        backdrop-filter:
                            blur(12px);

                        -webkit-backdrop-filter:
                            blur(12px);

                        opacity:
                            0.55;

                        mask-image:
                            linear-gradient(
                                180deg,
                                transparent 0%,
                                black 55%,
                                black 100%
                            );

                        -webkit-mask-image:
                            linear-gradient(
                                180deg,
                                transparent 0%,
                                black 55%,
                                black 100%
                            );
                    }

                    /* =============================================
                       TITLE
                    ============================================= */

                    .paid-title {
                        top:
                            31px;

                        left:
                            28px;

                        width:
                            calc(100% - 56px);
                    }

                    .paid-label {
                        margin-bottom:
                            13px;

                        font-size:
                            9px;

                        letter-spacing:
                            1.9px;
                    }

                    .paid-title h2 {
                        font-size:
                            38px;

                        line-height:
                            0.96;

                        letter-spacing:
                            -1.8px;
                    }

                    /* =============================================
                       BENEFITS
                    ============================================= */

                    .benefits {
                        top:
                            405px;

                        left:
                            28px;

                        right:
                            28px;

                        width:
                            calc(100% - 56px);

                        display:
                            grid;

                        grid-template-columns:
                            repeat(
                                2,
                                minmax(
                                    0,
                                    1fr
                                )
                            );

                        column-gap:
                            22px;

                        row-gap:
                            20px;
                    }

                    /* =============================================
                       CTA
                    ============================================= */

                    .paid-cta {
                        left:
                            20px;

                        right:
                            20px;

                        bottom:
                            48px;

                        width:
                            calc(100% - 40px);

                        height:
                            58px;

                        min-width:
                            0;

                        padding:
                            0 18px;

                        border-radius:
                            14px;
                    }

                    .cta-title {
                        font-size:
                            13px;
                    }

                    .cta-right {
                        gap:
                            13px;
                    }

                    .price {
                        font-size:
                            24px;
                    }

                    .arrow {
                        font-size:
                            23px;
                    }

                    .paid-note {
                        left:
                            20px;

                        right:
                            20px;

                        bottom:
                            20px;

                        width:
                            calc(100% - 40px);

                        font-size:
                            8px;
                    }
                }

                /* =====================================================
                   SMALL MOBILE
                ===================================================== */

                @media (max-width: 390px) {

                    .paid-card {
                        min-height:
                            620px;
                    }

                    .paid-content {
                        min-height:
                            620px;
                    }

                    .art {
                        height:
                            375px;
                    }

                    .art-image-blur {
                        filter:
                            blur(19px);
                    }

                    .art-fade {
                        height:
                            235px;
                    }

                    .paid-title {
                        top:
                            27px;

                        left:
                            24px;

                        width:
                            calc(100% - 48px);
                    }

                    .paid-title h2 {
                        font-size:
                            35px;
                    }

                    .benefits {
                        top:
                            388px;

                        left:
                            24px;

                        right:
                            24px;

                        width:
                            calc(100% - 48px);

                        column-gap:
                            16px;

                        row-gap:
                            17px;
                    }

                    .paid-cta {
                        left:
                            16px;

                        right:
                            16px;

                        width:
                            calc(100% - 32px);

                        padding:
                            0 16px;
                    }

                    .paid-note {
                        left:
                            16px;

                        right:
                            16px;

                        width:
                            calc(100% - 32px);
                    }
                }

                /* =====================================================
                   VERY NARROW
                ===================================================== */

                @media (max-width: 350px) {

                    .paid-title h2 {
                        font-size:
                            32px;
                    }

                    .benefits {
                        column-gap:
                            10px;
                    }

                    .cta-title {
                        font-size:
                            12px;
                    }

                    .price {
                        font-size:
                            22px;
                    }

                    .arrow {
                        font-size:
                            21px;
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

    const safeValue = Math.max(
        0,
        Math.min(MAX_SCORE, value)
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
                        16px 0
                        18px;

                    border-bottom:
                        1px solid
                        #e0d9d6;
                }

                .category-row:first-child {
                    padding-top:
                        0;
                }

                .category-top {
                    display:
                        flex;

                    align-items:
                        flex-end;

                    justify-content:
                        space-between;

                    gap:
                        24px;
                }

                .category-copy {
                    min-width:
                        0;
                }

                .category-title {
                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        29px;

                    line-height:
                        1;

                    letter-spacing:
                        -1.2px;
                }

                .category-subtitle {
                    margin-top:
                        5px;

                    color:
                        #8e8688;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        12px;

                    line-height:
                        1.3;

                    font-weight:
                        500;
                }

                .category-score {
                    display:
                        flex;

                    align-items:
                        baseline;

                    flex-shrink:
                        0;

                    color:
                        #7f7679;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;
                }

                .category-score strong {
                    color:
                        #c21856;

                    font-size:
                        42px;

                    line-height:
                        0.8;

                    font-weight:
                        400;

                    letter-spacing:
                        -1.8px;
                }

                .category-score span {
                    margin-left:
                        3px;

                    font-size:
                        18px;
                }

                .category-track {
                    height:
                        6px;

                    margin-top:
                        11px;

                    overflow:
                        hidden;

                    border-radius:
                        999px;

                    background:
                        #e5dfdf;
                }

                .category-fill {
                    height:
                        100%;

                    border-radius:
                        inherit;

                    background:
                        #cb3a6d;
                }

                @media (max-width: 640px) {

                    .category-row {
                        padding:
                            13px 0
                            15px;
                    }

                    .category-top {
                        gap:
                            15px;
                    }

                    .category-title {
                        font-size:
                            24px;
                    }

                    .category-subtitle {
                        max-width:
                            250px;

                        margin-top:
                            4px;

                        font-size:
                            10px;
                    }

                    .category-score strong {
                        font-size:
                            34px;
                    }

                    .category-score span {
                        font-size:
                            14px;
                    }

                    .category-track {
                        height:
                            5px;

                        margin-top:
                            10px;
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
                    display:
                        grid;

                    grid-template-columns:
                        22px
                        minmax(
                            0,
                            1fr
                        );

                    gap:
                        11px;

                    align-items:
                        start;

                    color:
                        #fff8f6;
                }

                .benefit-icon {
                    width:
                        20px;

                    padding-top:
                        1px;

                    color:
                        #ffd8e1;
                }

                .benefit-text {
                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        14px;

                    line-height:
                        1.28;

                    font-weight:
                        500;

                    letter-spacing:
                        -0.1px;

                    text-shadow:
                        0 1px 8px
                        rgba(
                            65,
                            0,
                            27,
                            0.08
                        );
                }

                @media (max-width: 640px) {

                    .benefit {
                        grid-template-columns:
                            21px
                            minmax(
                                0,
                                1fr
                            );

                        gap:
                            8px;
                    }

                    .benefit-icon {
                        width:
                            18px;
                    }

                    .benefit-text {
                        font-size:
                            12px;

                        line-height:
                            1.25;
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
                height="auto"
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

    const mod100 = value % 100;
    const mod10 = value % 10;

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