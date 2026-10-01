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
                data?.scores?.sameAnswers ??
                0;

            const close =
                data?.scores?.closeAnswers ??
                0;

            const different =
                data?.scores
                    ?.differentAnswers ??
                0;

            const total = Math.max(
                same +
                close +
                different,
                1
            );

            const base =
                Math.round(
                    ((same +
                            close * 0.5) /
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
                    value:
                        clamp(base + 1),
                },
                {
                    title: "Партнёрство",
                    subtitle:
                        "вы команда или каждый сам за себя",
                    value:
                        clamp(base),
                },
                {
                    title: "Секс",
                    subtitle:
                        "совпадает ли ваше представление о близости",
                    value:
                        clamp(base + 2),
                },
                {
                    title: "Деньги",
                    subtitle:
                        "одинаково ли вы смотрите на траты",
                    value:
                        clamp(base - 2),
                },
                {
                    title: "Забота",
                    subtitle:
                        "понимаете ли вы «я рядом» одинаково",
                    value:
                        clamp(base + 1),
                },
                {
                    title: "Быт",
                    subtitle:
                        "как вам живётся в обычный вторник",
                    value:
                        clamp(base - 1),
                },
            ];
        }, [data]);

    const yearsForecast =
        useMemo(() => {
            const overall =
                data?.scores?.overall ??
                50;

            if (overall >= 85) {
                return 45;
            }

            if (overall >= 75) {
                return 28;
            }

            if (overall >= 65) {
                return 16;
            }

            if (overall >= 55) {
                return 10;
            }

            if (overall >= 45) {
                return 6;
            }

            if (overall >= 35) {
                return 3;
            }

            return 1;
        }, [data]);

    const forecastPosition =
        useMemo(() => {
            const maxYears = 60;

            return Math.max(
                4,
                Math.min(
                    96,
                    (yearsForecast /
                        maxYears) *
                    100
                )
            );
        }, [yearsForecast]);

    const nameA =
        data?.couple
            ?.partner_a_name ||
        "Вы";

    const nameB =
        data?.couple
            ?.partner_b_name ||
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

                        background:
                            #f8f4f1;
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
                Не получилось загрузить
                результат.

                <style jsx>{`
                    .state {
                        min-height: 100vh;

                        display: grid;
                        place-items: center;

                        padding: 24px;

                        background:
                            #f8f4f1;

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

                {/* HEADER */}

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

                {/* RESULTS */}

                <section className="results">

                    <div className="section-label">
                        ВАШ РЕЗУЛЬТАТ
                    </div>

                    <h1>
                        Вот что
                        <br />
                        получилось
                    </h1>

                    <div className="category-list">

                        {categories.map(
                            (
                                category
                            ) => (
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

                {/* FORECAST */}

                <section className="forecast">

                    <div>

                        <div className="section-label">
                            ПРОГНОЗ
                        </div>

                        <h2>
                            Ориентировочная
                            <br />
                            длительность
                            <br />
                            ваших отношений
                        </h2>

                        <p>
                            На основе ваших
                            ответов мы оценили
                            ориентировочный
                            сценарий длительности
                            ваших отношений.
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
                FULL REPORT
            ===================================================== */}

            <section className="paid-section">

                <div className="paid-card">

                    {/* =================================================
                        ART
                    ================================================= */}

                    <div className="art">

                        <img
                            className="art-crisp"
                            src={
                                PAID_IMAGE
                            }
                            alt=""
                            draggable={
                                false
                            }
                        />

                        <img
                            className="art-blurred"
                            src={
                                PAID_IMAGE
                            }
                            alt=""
                            draggable={
                                false
                            }
                        />

                        <div className="art-gradient" />

                    </div>

                    {/* =================================================
                        CONTENT
                    ================================================= */}

                    <div className="paid-content">

                        {/* TITLE */}

                        <div className="paid-copy">

                            <div className="copy-softness" />

                            <div className="paid-copy-inner">

                                <div className="paid-label">
                                    ПОЛНЫЙ РАЗБОР
                                </div>

                                <h2>
                                    Чтобы вместе —
                                    <br />
                                    и надолго.
                                </h2>

                            </div>

                        </div>

                        {/* BENEFITS */}

                        <div className="benefits">

                            <Benefit
                                icon="heart"
                                text={
                                    <>
                                        Где вы можете
                                        <br />
                                        не понимать
                                        друг друга
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

                            <span>
                                Открыть полный разбор
                            </span>

                            <div className="cta-right">

                                <strong>
                                    299 ₽
                                </strong>

                                <b>
                                    →
                                </b>

                            </div>

                        </button>

                        <div className="paid-note">
                            один разбор · для вас
                            двоих · сразу после
                            оплаты
                        </div>

                    </div>

                </div>

            </section>

            <style jsx>{`

                /* =====================================================
                   GLOBAL
                ===================================================== */

                :global(*) {
                    box-sizing:
                        border-box;
                }

                :global(body) {
                    margin:
                        0;

                    background:
                        #f8f4f1;

                    color:
                        #201c1e;
                }

                .page {
                    min-height:
                        100vh;

                    padding-bottom:
                        80px;

                    overflow-x:
                        hidden;

                    background:
                        #f8f4f1;
                }

                .content-shell {
                    width:
                        min(
                            920px,
                            calc(
                                100% -
                                56px
                            )
                        );

                    margin:
                        0 auto;
                }

                /* =====================================================
                   HEADER
                ===================================================== */

                .header {
                    min-height:
                        78px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        space-between;

                    gap:
                        20px;

                    border-bottom:
                        1px solid
                        #ddd5d2;
                }

                .brand {
                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        24px;

                    font-weight:
                        700;

                    letter-spacing:
                        -1.1px;
                }

                .couple-names {
                    display:
                        flex;

                    gap:
                        9px;

                    align-items:
                        center;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        10px;

                    font-weight:
                        700;

                    letter-spacing:
                        1px;

                    color:
                        #8f8588;

                    text-transform:
                        uppercase;
                }

                .couple-names b {
                    color:
                        #c2215a;
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
                    margin-bottom:
                        13px;

                    color:
                        #c2215a;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        10px;

                    font-weight:
                        800;

                    letter-spacing:
                        2.2px;
                }

                .results h1 {
                    margin:
                        0 0
                        32px;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        48px;

                    line-height:
                        .98;

                    font-weight:
                        400;

                    letter-spacing:
                        -2.5px;
                }

                /* =====================================================
                   FORECAST
                ===================================================== */

                .forecast {
                    padding:
                        38px 0
                        46px;

                    display:
                        grid;

                    grid-template-columns:
                        minmax(
                            0,
                            1.1fr
                        )
                        minmax(
                            280px,
                            .9fr
                        );

                    gap:
                        55px;

                    align-items:
                        center;

                    border-top:
                        1px solid
                        #dcd4d1;
                }

                .forecast h2 {
                    margin:
                        0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        43px;

                    line-height:
                        1.01;

                    font-weight:
                        400;

                    letter-spacing:
                        -2.2px;
                }

                .forecast p {
                    max-width:
                        500px;

                    margin:
                        15px 0
                        0;

                    color:
                        #8d8587;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        14px;

                    line-height:
                        1.5;
                }

                .years {
                    display:
                        flex;

                    align-items:
                        baseline;

                    color:
                        #c21856;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;
                }

                .years strong {
                    font-size:
                        76px;

                    line-height:
                        .88;

                    font-weight:
                        400;

                    letter-spacing:
                        -4px;
                }

                .years span {
                    margin-left:
                        9px;

                    font-size:
                        39px;
                }

                .forecast-scale {
                    margin-top:
                        23px;
                }

                .scale {
                    position:
                        relative;

                    height:
                        9px;

                    border-radius:
                        999px;

                    background:
                        #e5dfe0;
                }

                .scale-progress {
                    height:
                        100%;

                    border-radius:
                        inherit;

                    background:
                        #e99ab5;
                }

                .scale-dot {
                    position:
                        absolute;

                    top:
                        50%;

                    width:
                        22px;

                    height:
                        22px;

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
                    margin-top:
                        12px;

                    display:
                        flex;

                    justify-content:
                        space-between;

                    color:
                        #8d8587;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        11px;
                }

                /* =====================================================
                   PAID CARD
                ===================================================== */

                .paid-section {
                    width:
                        min(
                            1180px,
                            calc(
                                100% -
                                40px
                            )
                        );

                    margin:
                        8px auto 0;
                }

                .paid-card {
                    position:
                        relative;

                    min-height:
                        500px;

                    overflow:
                        hidden;

                    border-radius:
                        24px;

                    background:
                        #a70f4d;

                    isolation:
                        isolate;
                }

                /* =====================================================
                   ART
                ===================================================== */

                .art {
                    position:
                        absolute;

                    z-index:
                        1;

                    top:
                        0;

                    bottom:
                        0;

                    left:
                        0;

                    width:
                        70%;

                    overflow:
                        hidden;
                }

                .art img {
                    position:
                        absolute;

                    inset:
                        0;

                    width:
                        100%;

                    height:
                        100%;

                    object-fit:
                        cover;

                    object-position:
                        center;

                    pointer-events:
                        none;

                    user-select:
                        none;
                }

                .art-crisp {
                    z-index:
                        1;
                }

                .art-blurred {
                    z-index:
                        2;

                    filter:
                        blur(20px);

                    transform:
                        scale(1.06);

                    mask-image:
                        linear-gradient(
                            90deg,

                            transparent 47%,

                            rgba(
                                0,
                                0,
                                0,
                                .05
                            ) 55%,

                            rgba(
                                0,
                                0,
                                0,
                                .22
                            ) 64%,

                            rgba(
                                0,
                                0,
                                0,
                                .55
                            ) 73%,

                            black 84%,

                            black 100%
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
                            ) 55%,

                            rgba(
                                0,
                                0,
                                0,
                                .22
                            ) 64%,

                            rgba(
                                0,
                                0,
                                0,
                                .55
                            ) 73%,

                            black 84%,

                            black 100%
                        );
                }

                .art-gradient {
                    position:
                        absolute;

                    z-index:
                        3;

                    inset:
                        0;

                    background:
                        linear-gradient(
                            90deg,

                            transparent 45%,

                            rgba(
                                167,
                                15,
                                77,
                                .03
                            ) 54%,

                            rgba(
                                167,
                                15,
                                77,
                                .15
                            ) 64%,

                            rgba(
                                167,
                                15,
                                77,
                                .39
                            ) 75%,

                            rgba(
                                167,
                                15,
                                77,
                                .72
                            ) 86%,

                            #a70f4d 100%
                        );
                }

                /* =====================================================
                   CONTENT
                ===================================================== */

                .paid-content {
                    position:
                        relative;

                    z-index:
                        10;

                    min-height:
                        500px;
                }

                /* =====================================================
                   COPY / TITLE
                ===================================================== */

                .paid-copy {
                    position:
                        absolute;

                    /*
                     * Главное изменение:
                     *
                     * заголовок теперь находится
                     * прямо в blur-переходе.
                     */

                    top:
                        48px;

                    left:
                        53%;

                    width:
                        42%;

                    max-width:
                        490px;

                    isolation:
                        isolate;
                }

                /*
                 * Не плашка.
                 *
                 * Очень мягкая дымка,
                 * чтобы текст естественно
                 * читался поверх изображения.
                 */

                .copy-softness {
                    position:
                        absolute;

                    z-index:
                        -1;

                    top:
                        -38px;

                    right:
                        -42px;

                    bottom:
                        -40px;

                    left:
                        -45px;

                    pointer-events:
                        none;

                    background:
                        radial-gradient(
                            ellipse
                            at
                            46%
                            48%,

                            rgba(
                                92,
                                0,
                                39,
                                .22
                            )
                            0%,

                            rgba(
                                125,
                                2,
                                55,
                                .13
                            )
                            38%,

                            rgba(
                                125,
                                2,
                                55,
                                0
                            )
                            76%
                        );

                    filter:
                        blur(7px);
                }

                .paid-copy-inner {
                    position:
                        relative;

                    z-index:
                        2;
                }

                .paid-label {
                    margin-bottom:
                        15px;

                    color:
                        rgba(
                            255,
                            245,
                            247,
                            .76
                        );

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        9px;

                    line-height:
                        1;

                    font-weight:
                        700;

                    letter-spacing:
                        2.25px;
                }

                .paid-copy h2 {
                    margin:
                        0;

                    color:
                        #fffaf7;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        clamp(
                            39px,
                            3.55vw,
                            48px
                        );

                    line-height:
                        .99;

                    font-weight:
                        400;

                    letter-spacing:
                        -1.9px;

                    text-wrap:
                        balance;

                    text-shadow:
                        0 2px 18px
                        rgba(
                            52,
                            0,
                            25,
                            .18
                        );
                }

                /* =====================================================
                   BENEFITS
                ===================================================== */

                .benefits {
                    position:
                        absolute;

                    top:
                        205px;

                    right:
                        54px;

                    width:
                        305px;

                    display:
                        grid;

                    grid-template-columns:
                        1fr;

                    gap:
                        19px;
                }

                /* =====================================================
                   CTA
                ===================================================== */

                .paid-cta {
                    position:
                        absolute;

                    right:
                        36px;

                    bottom:
                        51px;

                    width:
                        56%;

                    height:
                        72px;

                    padding:
                        0 28px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        space-between;

                    gap:
                        20px;

                    border:
                        0;

                    border-radius:
                        15px;

                    background:
                        #fffaf7;

                    color:
                        #201d1e;

                    cursor:
                        pointer;

                    box-shadow:
                        0 9px 25px
                        rgba(
                            65,
                            0,
                            27,
                            .13
                        );
                }

                .paid-cta > span {
                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        15px;

                    font-weight:
                        600;
                }

                .cta-right {
                    display:
                        flex;

                    align-items:
                        center;

                    gap:
                        22px;

                    color:
                        #c51b58;
                }

                .cta-right strong {
                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        29px;

                    font-weight:
                        400;

                    white-space:
                        nowrap;
                }

                .cta-right b {
                    font-size:
                        26px;

                    font-weight:
                        300;
                }

                .paid-note {
                    position:
                        absolute;

                    right:
                        36px;

                    bottom:
                        21px;

                    width:
                        56%;

                    text-align:
                        center;

                    color:
                        rgba(
                            255,
                            238,
                            243,
                            .66
                        );

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        9px;
                }

                /* =====================================================
                   TABLET
                ===================================================== */

                @media (
                    max-width:
                    1000px
                ) {

                    .paid-card,
                    .paid-content {
                        min-height:
                            470px;
                    }

                    .art {
                        width:
                            69%;
                    }

                    .paid-copy {
                        left:
                            51%;

                        top:
                            40px;

                        width:
                            44%;
                    }

                    .paid-copy h2 {
                        font-size:
                            41px;
                    }

                    .benefits {
                        top:
                            187px;

                        right:
                            34px;

                        width:
                            28%;

                        gap:
                            18px;
                    }

                    .paid-cta {
                        right:
                            28px;

                        bottom:
                            43px;

                        width:
                            56%;

                        height:
                            68px;
                    }

                    .paid-note {
                        right:
                            28px;

                        bottom:
                            18px;

                        width:
                            56%;
                    }
                }

                /* =====================================================
                   MOBILE
                ===================================================== */

                @media (
                    max-width:
                    640px
                ) {

                    .page {
                        padding:
                            0 12px
                            36px;
                    }

                    .content-shell {
                        width:
                            100%;
                    }

                    .header {
                        min-height:
                            64px;
                    }

                    .brand {
                        font-size:
                            21px;
                    }

                    .couple-names {
                        max-width:
                            52%;

                        font-size:
                            8px;
                    }

                    .results {
                        padding:
                            29px 0
                            33px;
                    }

                    .results h1 {
                        font-size:
                            37px;

                        letter-spacing:
                            -1.8px;
                    }

                    .forecast {
                        display:
                            block;

                        padding:
                            29px 0
                            37px;
                    }

                    .forecast h2 {
                        font-size:
                            34px;
                    }

                    .forecast p {
                        font-size:
                            12px;
                    }

                    .forecast-right {
                        margin-top:
                            25px;
                    }

                    .years strong {
                        font-size:
                            64px;
                    }

                    .years span {
                        font-size:
                            34px;
                    }

                    .paid-section {
                        width:
                            100%;

                        margin:
                            0;
                    }

                    /* =============================================
                       CARD
                    ============================================= */

                    .paid-card,
                    .paid-content {
                        min-height:
                            665px;
                    }

                    .paid-card {
                        border-radius:
                            22px;
                    }

                    /* =============================================
                       IMAGE
                    ============================================= */

                    .art {
                        top:
                            0;

                        left:
                            0;

                        right:
                            0;

                        bottom:
                            auto;

                        width:
                            100%;

                        height:
                            335px;

                        overflow:
                            hidden;
                    }

                    .art img {
                        object-position:
                            center center;
                    }

                    .art-blurred {
                        filter:
                            blur(19px);

                        transform:
                            scale(1.07);

                        mask-image:
                            linear-gradient(
                                180deg,

                                transparent 47%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .06
                                ) 58%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .25
                                ) 69%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .58
                                ) 80%,

                                black 91%,

                                black 100%
                            );

                        -webkit-mask-image:
                            linear-gradient(
                                180deg,

                                transparent 47%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .06
                                ) 58%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .25
                                ) 69%,

                                rgba(
                                    0,
                                    0,
                                    0,
                                    .58
                                ) 80%,

                                black 91%,

                                black 100%
                            );
                    }

                    .art-gradient {
                        background:
                            linear-gradient(
                                180deg,

                                transparent 45%,

                                rgba(
                                    167,
                                    15,
                                    77,
                                    .04
                                ) 57%,

                                rgba(
                                    167,
                                    15,
                                    77,
                                    .16
                                ) 68%,

                                rgba(
                                    167,
                                    15,
                                    77,
                                    .43
                                ) 79%,

                                rgba(
                                    167,
                                    15,
                                    77,
                                    .76
                                ) 90%,

                                #a70f4d 100%
                            );
                    }

                    /* =============================================
                       TITLE

                       Самое важное изменение:
                       текст начинается ещё ВНУТРИ
                       blur-перехода.
                    ============================================= */

                    .paid-copy {
                        top:
                            273px;

                        left:
                            26px;

                        width:
                            calc(
                                100% -
                                52px
                            );

                        max-width:
                            none;
                    }

                    .copy-softness {
                        top:
                            -28px;

                        right:
                            -15px;

                        bottom:
                            -24px;

                        left:
                            -22px;

                        background:
                            radial-gradient(
                                ellipse
                                at
                                35%
                                50%,

                                rgba(
                                    92,
                                    0,
                                    39,
                                    .32
                                )
                                0%,

                                rgba(
                                    128,
                                    4,
                                    56,
                                    .18
                                )
                                44%,

                                rgba(
                                    128,
                                    4,
                                    56,
                                    0
                                )
                                82%
                            );

                        filter:
                            blur(8px);
                    }

                    .paid-label {
                        margin-bottom:
                            10px;

                        font-size:
                            8px;

                        letter-spacing:
                            1.9px;

                        color:
                            rgba(
                                255,
                                244,
                                247,
                                .78
                            );
                    }

                    .paid-copy h2 {
                        font-size:
                            34px;

                        line-height:
                            .98;

                        letter-spacing:
                            -1.45px;

                        text-shadow:
                            0 2px 15px
                            rgba(
                                43,
                                0,
                                22,
                                .25
                            );
                    }

                    /* =============================================
                       BENEFITS
                    ============================================= */

                    .benefits {
                        top:
                            389px;

                        left:
                            26px;

                        right:
                            26px;

                        width:
                            auto;

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
                            18px;
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
                            calc(
                                100% -
                                40px
                            );

                        height:
                            58px;

                        padding:
                            0 18px;

                        border-radius:
                            14px;
                    }

                    .paid-cta > span {
                        font-size:
                            13px;
                    }

                    .cta-right {
                        gap:
                            13px;
                    }

                    .cta-right strong {
                        font-size:
                            24px;
                    }

                    .cta-right b {
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
                            auto;

                        font-size:
                            8px;
                    }
                }

                /* =====================================================
                   SMALL MOBILE
                ===================================================== */

                @media (
                    max-width:
                    390px
                ) {

                    .paid-card,
                    .paid-content {
                        min-height:
                            645px;
                    }

                    .art {
                        height:
                            320px;
                    }

                    .paid-copy {
                        top:
                            260px;

                        left:
                            22px;

                        width:
                            calc(
                                100% -
                                44px
                            );
                    }

                    .paid-copy h2 {
                        font-size:
                            31px;
                    }

                    .benefits {
                        top:
                            370px;

                        left:
                            22px;

                        right:
                            22px;

                        column-gap:
                            14px;
                    }

                    .paid-cta {
                        left:
                            16px;

                        right:
                            16px;

                        width:
                            calc(
                                100% -
                                32px
                            );
                    }

                    .paid-note {
                        left:
                            16px;

                        right:
                            16px;
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

                .category-head {
                    display:
                        flex;

                    align-items:
                        flex-end;

                    justify-content:
                        space-between;

                    gap:
                        20px;
                }

                .category-title {
                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        29px;

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
                }

                .category-score {
                    display:
                        flex;

                    align-items:
                        baseline;

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

                    font-weight:
                        400;
                }

                .category-score span {
                    margin-left:
                        3px;

                    font-size:
                        18px;
                }

                .category-line {
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

                .category-line div {
                    height:
                        100%;

                    border-radius:
                        inherit;

                    background:
                        #cb3a6d;
                }

                @media (
                    max-width:
                    640px
                ) {

                    .category-row {
                        padding:
                            13px 0
                            15px;
                    }

                    .category-title {
                        font-size:
                            24px;
                    }

                    .category-subtitle {
                        font-size:
                            10px;

                        max-width:
                            250px;
                    }

                    .category-score strong {
                        font-size:
                            34px;
                    }

                    .category-score span {
                        font-size:
                            14px;
                    }

                    .category-line {
                        height:
                            5px;
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
                        10px;

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
                }

                @media (
                    max-width:
                    640px
                ) {

                    .benefit {
                        grid-template-columns:
                            19px
                            minmax(
                                0,
                                1fr
                            );

                        gap:
                            8px;
                    }

                    .benefit-icon {
                        width:
                            17px;
                    }

                    .benefit-text {
                        font-size:
                            11.5px;

                        line-height:
                            1.27;
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