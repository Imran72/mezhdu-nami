"use client";

import { PLAN_PRICE_LABEL } from "../../../lib/plan-price";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";


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

const MAX_SCORE = 10;

const PAID_IMAGE =
    "/images/full-report-couple.png";

const MIN_FORECAST_YEARS = 1;
const MAX_FORECAST_YEARS = 45;

export default function ResultPage() {
    const params =
        useParams();

    const router =
        useRouter();

    const coupleId =
        String(
            params.coupleId ?? ""
        );

    const [
        data,
        setData,
    ] =
        useState<ApiResponse | null>(
            null
        );

    const [
        loading,
        setLoading,
    ] =
        useState(true);

    const [paying, setPaying] = useState(false);
    const [paymentError, setPaymentError] = useState("");
    async function pay() {
        if (paying) return;
        setPaying(true); setPaymentError("");
        try {
            const response = await fetch("/api/payment", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({coupleId})});
            const result = await response.json();
            if (!response.ok || !result.confirmation_url) throw new Error(result.error || "Не удалось открыть оплату");
            window.location.assign(result.confirmation_url);
        } catch (error) { setPaymentError(error instanceof Error ? error.message : "Не удалось открыть оплату"); setPaying(false); }
    }

    useEffect(() => {
        if (!coupleId) {
            return;
        }

        let cancelled =
            false;

        async function loadResult() {
            try {
                const response =
                    await fetch(
                        `/api/report?id=${encodeURIComponent(
                            coupleId
                        )}`,
                        {
                            cache:
                                "no-store",
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

                /*
                 * Если второй человек
                 * ещё не закончил тест —
                 * результат пока не показываем.
                 */
                if (
                    result.waiting
                ) {
                    router.replace(
                        `/waiting/${coupleId}`
                    );

                    return;
                }

                setData(
                    result
                );
            } catch (
                error
                ) {
                console.error(
                    error
                );
            } finally {
                if (
                    !cancelled
                ) {
                    setLoading(
                        false
                    );
                }
            }
        }

        loadResult();

        return () => {
            cancelled =
                true;
        };
    }, [
        coupleId,
        router,
    ]);

    /*
     * Бесплатная часть результата.
     *
     * Используем те же данные,
     * которые уже отдаёт GET /api/report.
     */
    const categories =
        useMemo<
            CategoryScore[]
        >(() => {
            const same =
                data
                    ?.scores
                    ?.sameAnswers ??
                0;

            const close =
                data
                    ?.scores
                    ?.closeAnswers ??
                0;

            const different =
                data
                    ?.scores
                    ?.differentAnswers ??
                0;

            const total =
                Math.max(
                    same +
                    close +
                    different,
                    1
                );

            const base =
                Math.round(
                    (
                        same +
                        close * 0.5
                    ) /
                    total *
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
                    title:
                        "Дружба",

                    subtitle:
                        "хорошо ли вам просто вдвоём",

                    value:
                        clamp(
                            base + 1
                        ),
                },

                {
                    title:
                        "Партнёрство",

                    subtitle:
                        "вы команда или каждый сам за себя",

                    value:
                        clamp(
                            base
                        ),
                },

                {
                    title:
                        "Секс",

                    subtitle:
                        "совпадает ли ваше представление о близости",

                    value:
                        clamp(
                            base + 2
                        ),
                },

                {
                    title:
                        "Деньги",

                    subtitle:
                        "одинаково ли вы смотрите на траты",

                    value:
                        clamp(
                            base - 2
                        ),
                },

                {
                    title:
                        "Забота",

                    subtitle:
                        "понимаете ли вы «я рядом» одинаково",

                    value:
                        clamp(
                            base + 1
                        ),
                },

                {
                    title:
                        "Быт",

                    subtitle:
                        "как вам живётся в обычный вторник",

                    value:
                        clamp(
                            base - 1
                        ),
                },
            ];
        }, [
            data,
        ]);

    const yearsForecast = useMemo(() => {
        const overall = data?.scores?.overall ?? 50;
        const normalizedScore = Math.max(0, Math.min(100, overall));
        return Math.max(MIN_FORECAST_YEARS, Math.round(
            (MIN_FORECAST_YEARS +
            (MAX_FORECAST_YEARS - MIN_FORECAST_YEARS) * normalizedScore / 100) / 3
        ));
    }, [data]);

    const forecastPosition =
        useMemo(
            () => getForecastScalePosition(yearsForecast),
            [yearsForecast]
        );

    const nameA =
        data
            ?.couple
            ?.partner_a_name ||
        "Вы";

    const nameB =
        data
            ?.couple
            ?.partner_b_name ||
        "Партнёр";

    if (loading) {
        return (
            <main className="loading-screen">

                <div className="loading-brand">
                    между нами.
                </div>

                <style jsx>{`
                    .loading-screen {
                        min-height:
                            100vh;

                        display:
                            grid;

                        place-items:
                            center;

                        background:
                            #f8f4f1;

                        color:
                            #211d1f;
                    }

                    .loading-brand {
                        font-family: inherit;

                        font-size:
                            30px;

                        font-weight:
                            700;
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
                        min-height:
                            100vh;

                        display:
                            grid;

                        place-items:
                            center;

                        padding:
                            24px;

                        background:
                            #f8f4f1;

                        color:
                            #211d1f;

                        font-family: inherit;
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

                {/* =====================================================
                    FORECAST
                ===================================================== */}

                <section className="forecast">

                    <div className="forecast-copy">

                        <div className="section-label">
                            ПРОГНОЗ
                        </div>

                        <h2 className="forecast-title">
                            Примерная длительность ваших отношений
                        </h2>

                        <p className="forecast-description">
                            На основании ИИ модели
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
                                    className="scale-dot"
                                    style={{
                                        left:
                                            `${Math.max(1, Math.min(99, forecastPosition))}%`,
                                    }}
                                />

                            </div>

                            <div className="ribbon-labels">
                                <span>Короткая история</span>
                                <span>Надолго</span>
                            </div>

                        </div>

                    </div>

                </section>

            </div>

            {/* =========================================================
                PAID REPORT

                Бесплатный результат заканчивается здесь.
                Ниже продаём полный разбор.
            ========================================================= */}

            <section className="paid-shell">

                <div className="paid-card">

                    <div className="paid-art-panel">

                        <img
                            className="paid-art"
                            src={PAID_IMAGE}
                            alt="Пара смотрит на закат"
                            draggable={false}
                        />

                    </div>

                    <div className="paid-panel">

                        <div className="paid-label">
                            ПЛАН НА 3 МЕСЯЦА
                        </div>

                        <h2 className="paid-title">
                            Как превратить {yearsForecast}{" "}
                            {getYearWord(yearsForecast)} в целую жизнь
                        </h2>

                        <p className="paid-description">
                            План на 3 месяца: конкретные шаги, чтобы стать ближе.
                        </p>

                        <button
                            type="button"
                            className="paid-cta"
                            onClick={pay}
                            disabled={paying}
                        >

                            <span className="cta-title">
                                {paying ? "Открываем оплату…" : "Получить наш план"}
                            </span>

                            <span className="cta-right">

                                <span className="price">
                                    {PLAN_PRICE_LABEL}
                                </span>

                                <span className="arrow">
                                    →
                                </span>

                            </span>

                        </button>
                        {paymentError && <p className="payment-error" role="alert">{paymentError}</p>}

                    </div>

                </div>

            </section>

            <style jsx>{`

                /* =====================================================
                   BASE
                ===================================================== */

                :global(*) {
                    box-sizing:
                        border-box;
                }

                :global(html) {
                    background:
                        #f8f4f1;
                }

                :global(body) {
                    margin: 0;

                    background:
                        #f8f4f1;

                    color:
                        #201c1e;
                }

                button {
                    font:
                        inherit;
                }

                .page {
                    width:
                        100%;

                    min-height:
                        100vh;

                    padding:
                        0
                        28px
                        72px;

                    overflow-x:
                        hidden;

                    background:
                        #f8f4f1;
                }

                .content-shell {
                    width:
                        min(
                            920px,
                            100%
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
                        24px;

                    border-bottom:
                        1px solid
                        #ddd5d2;
                }

                .brand {
                    flex-shrink:
                        0;

                    font-family: inherit;

                    font-size:
                        24px;

                    line-height:
                        1;

                    font-weight:
                        700;

                    letter-spacing:
                        -1.1px;
                }

                .couple-names {
                    min-width:
                        0;

                    display:
                        flex;

                    align-items:
                        center;

                    gap:
                        9px;

                    color:
                        #8f8588;

                    font-family: inherit;

                    font-size:
                        10px;

                    font-weight:
                        700;

                    letter-spacing:
                        1.2px;

                    text-transform:
                        uppercase;
                }

                .person-name {
                    overflow:
                        hidden;

                    text-overflow:
                        ellipsis;

                    white-space:
                        nowrap;
                }

                .couple-cross {
                    flex-shrink:
                        0;

                    color:
                        #c2215a;
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
                    margin-bottom:
                        13px;

                    color:
                        #c2215a;

                    font-family: inherit;

                    font-size:
                        10px;

                    line-height:
                        1;

                    font-weight:
                        800;

                    letter-spacing:
                        2.2px;
                }

                .results > .section-label { margin-bottom: 24px; }

                .category-list {
                    display:
                        flex;

                    flex-direction:
                        column;
                }

                /* =====================================================
                   FORECAST
                ===================================================== */

                .forecast {
                    padding:
                        38px
                        0
                        46px;

                    display:
                        grid;

                    grid-template-columns:
                        minmax(
                            0,
                            1.05fr
                        )
                        minmax(
                            340px,
                            .95fr
                        );

                    gap:
                        64px;

                    align-items:
                        center;

                    border-top:
                        1px solid
                        #dcd4d1;
                }

                .forecast-copy {
                    min-width:
                        0;
                }

                .forecast-title {
                    max-width:
                        520px;

                    margin:
                        0;

                    font-family: inherit;

                    font-size:
                        43px;

                    line-height:
                        1.01;

                    font-weight:
                        400;

                    letter-spacing:
                        -2.2px;
                }

                .forecast-description {
                    margin:
                        15px
                        0
                        0;

                    color:
                        #8d8587;

                    font-family: inherit;

                    font-weight:
                        500;
                }

                .forecast-result {
                    width:
                        min(
                            100%,
                            440px
                        );

                    min-width:
                        0;

                    justify-self:
                        end;
                }

                .years {
                    display:
                        flex;

                    align-items:
                        baseline;

                    color:
                        #c21856;

                    font-family: inherit;

                    white-space:
                        nowrap;
                }

                .years span {
                    margin-left:
                        9px;

                    line-height:
                        1;
                }

                .forecast-scale {
                    width:
                        100%;
                }

                .scale-track {
                    position:
                        relative;
                }

                .scale-dot {
                    position:
                        absolute;

                    z-index:
                        4;
                }

                /* =====================================================
                   PAID SHELL
                ===================================================== */

                .paid-shell {
                    width:
                        min(
                            920px,
                            100%
                        );

                    margin:
                        8px
                        auto
                        0;
                }

                .paid-card {
                    width:
                        100%;

                    min-height:
                        430px;

                    display:
                        grid;

                    grid-template-columns:
                        minmax(
                            0,
                            52%
                        )
                        minmax(
                            0,
                            48%
                        );

                    overflow:
                        hidden;

                    border-radius:
                        24px;

                    background:
                        #b10f50;

                    box-shadow:
                        0
                        12px
                        34px
                        rgba(
                            74,
                            42,
                            52,
                            .06
                        );
                }

                .paid-art-panel {
                    min-width:
                        0;

                    min-height:
                        430px;

                    overflow:
                        hidden;

                    background:
                        #79103a;
                }

                .paid-art {
                    width:
                        100%;

                    height:
                        100%;

                    display:
                        block;

                    object-fit:
                        cover;

                    object-position:
                        46%
                        center;

                    user-select:
                        none;
                }

                .paid-panel {
                    min-width:
                        0;

                    min-height:
                        430px;

                    display:
                        flex;

                    flex-direction:
                        column;

                    padding:
                        35px
                        34px
                        28px;

                    background:
                        linear-gradient(
                            145deg,
                            #b71155
                            0%,
                            #a70d49
                            100%
                        );
                }

                .paid-label {
                    margin-bottom:
                        12px;

                    color:
                        rgba(
                            255,
                            244,
                            247,
                            .82
                        );

                    font-family: inherit;

                    font-size:
                        9px;

                    line-height:
                        1;

                    font-weight:
                        800;

                    letter-spacing:
                        2px;
                }

                .paid-title {
                    margin:
                        0;

                    color:
                        #fff9f6;

                    font-family: inherit;

                    font-size:
                        clamp(
                            39px,
                            4vw,
                            49px
                        );

                    line-height:
                        .98;

                    font-weight:
                        400;

                    letter-spacing:
                        -2px;
                }

                .paid-cta {
                    width:
                        100%;

                    min-width:
                        0;

                    height:
                        64px;

                    margin-top:
                        auto;

                    padding:
                        0
                        20px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        space-between;

                    gap:
                        18px;

                    border:
                        0;

                    border-radius:
                        14px;

                    background:
                        #fffaf7;

                    color:
                        #201d1e;

                    cursor:
                        pointer;

                    box-shadow:
                        0
                        9px
                        24px
                        rgba(
                            65,
                            0,
                            27,
                            .11
                        );

                    transition:
                        transform
                        160ms
                        ease,
                        box-shadow
                        160ms
                        ease;
                }

                .paid-cta:hover {
                    transform:
                        translateY(
                            -2px
                        );

                    box-shadow:
                        0
                        13px
                        28px
                        rgba(
                            65,
                            0,
                            27,
                            .15
                        );
                }

                .paid-cta:active {
                    transform:
                        translateY(
                            0
                        );
                }

                .cta-title {
                    min-width:
                        0;

                    font-family: inherit;

                    font-size:
                        14px;

                    line-height:
                        1.15;

                    font-weight:
                        700;
                }

                .cta-right {
                    flex-shrink:
                        0;

                    display:
                        flex;

                    align-items:
                        center;

                    gap:
                        17px;

                    color:
                        #c51b58;
                }

                .price {
                    font-family: inherit;

                    font-size:
                        28px;

                    line-height:
                        1;

                    font-weight:
                        400;

                    white-space:
                        nowrap;
                }

                .arrow {
                    font-family: inherit;

                    font-size:
                        24px;

                    line-height:
                        1;

                    font-weight:
                        300;
                }

                /* =====================================================
                   TABLET
                ===================================================== */

                @media (
                    max-width:
                        1000px
                ) {

                    .content-shell {
                        width:
                            min(
                                820px,
                                100%
                            );
                    }

                    .forecast {
                        grid-template-columns:
                            minmax(
                                0,
                                1fr
                            )
                            minmax(
                                320px,
                                .9fr
                            );

                        gap:
                            42px;
                    }

                    .paid-shell {
                        width:
                            min(
                                820px,
                                100%
                            );
                    }

                    .paid-card {
                        grid-template-columns:
                            minmax(
                                0,
                                49%
                            )
                            minmax(
                                0,
                                51%
                            );
                    }

                    .paid-panel {
                        padding:
                            32px
                            28px
                            25px;
                    }

                    .paid-title {
                        font-size:
                            40px;
                    }

                    .paid-cta {
                        height:
                            60px;

                        padding:
                            0
                            18px;
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
                            0
                            12px
                            32px;
                    }

                    .content-shell {
                        width:
                            100%;
                    }

                    .header {
                        min-height:
                            64px;

                        gap:
                            12px;
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
                            .65px;
                    }

                    .results {
                        padding:
                            29px
                            0
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

                    .forecast {
                        padding:
                            29px
                            0
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
                        margin-top:
                            11px;

                        font-size:
                            12px;
                    }

                    .forecast-result {
                        width:
                            100%;

                        max-width:
                            430px;

                        margin-top:
                            27px;

                        justify-self:
                            auto;
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

                    .paid-shell {
                        width:
                            100%;

                        margin-top:
                            0;
                    }

                    .paid-card {
                        min-height:
                            0;

                        grid-template-columns:
                            1fr;

                        border-radius:
                            22px;
                    }

                    .paid-art-panel {
                        min-height:
                            0;

                        height:
                            300px;
                    }

                    .paid-art {
                        object-position:
                            46%
                            center;
                    }

                    .paid-panel {
                        min-height:
                            0;

                        padding:
                            27px
                            24px
                            24px;
                    }

                    .paid-label {
                        margin-bottom:
                            11px;

                        font-size:
                            8px;

                        letter-spacing:
                            1.8px;
                    }

                    .paid-title {
                        font-size:
                            38px;

                        letter-spacing:
                            -1.7px;
                    }

                    .paid-cta {
                        height:
                            58px;

                        margin-top:
                            28px;

                        padding:
                            0
                            17px;
                    }

                    .cta-title {
                        font-size:
                            13px;
                    }

                    .cta-right {
                        gap:
                            12px;
                    }

                    .price {
                        font-size:
                            24px;
                    }

                    .arrow {
                        font-size:
                            22px;
                    }
                }

                /* =====================================================
                   SMALL MOBILE
                ===================================================== */

                @media (
                    max-width:
                        390px
                ) {

                    .paid-art-panel {
                        height:
                            265px;
                    }

                    .paid-panel {
                        padding:
                            24px
                            20px
                            20px;
                    }

                    .paid-title {
                        font-size:
                            34px;
                    }

                    .paid-cta {
                        padding:
                            0
                            15px;
                    }

                    .cta-title {
                        max-width:
                            170px;

                        font-size:
                            12px;
                    }
                }

                @media (max-width: 640px) {
                    .paid-art-panel { height: 300px; min-height: 0; }
                    .paid-art { object-position: 46% center; }
                }
                .page { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
                .forecast-title, .paid-title { font-size: clamp(28px, 4vw, 38px); font-weight: 500; line-height: 1.15; letter-spacing: -1px; }
                .forecast-description { font-size: 14px; line-height: 1.5; }
                .section-label, .paid-label { font-size: 12px; letter-spacing: 1.4px; }
                .years strong { font-size: 56px; font-weight: 500; line-height: 1; letter-spacing: -2px; }
                .years span { font-size: 26px; letter-spacing: -0.6px; }
                .forecast-scale { margin-top: 24px; }
                .forecast-scale { padding: 0; }
                .scale-track { height: 32px; border-radius: 12px; background: linear-gradient(90deg, #ebd7df, #cb225c); }
                .scale-dot {
                    top: 5px; bottom: 5px; width: 3px; height: auto;
                    left: auto; border: 0; border-radius: 3px;
                    background: #f8f4f1; box-shadow: none; transform: translateX(-50%);
                }
                .ribbon-labels { display: flex; justify-content: space-between; gap: 16px; margin-top: 12px; color: #746b6e; font-size: 12px; line-height: 1.4; }
                .payment-error { color: #fff; font-size: 14px; line-height: 1.5; margin: 12px 0 0; }
                .paid-cta:disabled { cursor: wait; opacity: .7; }
                .paid-description { margin: 18px 0 0; color: #fff; opacity: .88; font-size: 16px; line-height: 1.6; }
                .paid-cta .cta-title { font-size: 14px; line-height: 1.4; max-width: 220px; }
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

                .category-row:last-child { border-bottom: 0; }

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
                    font-family: inherit;
                }

                .category-subtitle {
                    margin-top:
                        5px;

                    font-family: inherit;
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

                    font-family: inherit;
                }

                .category-score strong {
                    color:
                        #c21856;
                }

                .category-score span {
                    margin-left:
                        3px;
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

                @media (
                    max-width:
                        640px
                ) {

                    .category-row {
                        padding:
                            13px
                            0
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

                .category-title { font-size: 22px; font-weight: 500; line-height: 1.15; letter-spacing: -0.6px; }
                .category-subtitle { font-size: 14px; line-height: 1.5; font-weight: 400; color: #746b6e; }
                .category-score strong { font-size: 34px; font-weight: 500; line-height: 1; letter-spacing: -1px; }
                .category-score span { font-size: 14px; }
                @media (max-width: 380px) {
                    .category-title { font-size: 22px; }
                    .category-top { gap: 12px; }
                }
            `}</style>

        </div>
    );
}

/* ============================================================
   BENEFIT
============================================================ */

function getForecastScalePosition(value: number) {
    return Math.max(0, Math.min(100,
        (value - MIN_FORECAST_YEARS) /
        (MAX_FORECAST_YEARS - MIN_FORECAST_YEARS) * 100
    ));
}

/* ============================================================
   YEAR WORD
============================================================ */

function getYearWord(
    value: number
) {
    const mod100 =
        value %
        100;

    const mod10 =
        value %
        10;

    if (
        mod100 >=
        11 &&
        mod100 <=
        14
    ) {
        return "лет";
    }

    if (
        mod10 ===
        1
    ) {
        return "год";
    }

    if (
        mod10 >=
        2 &&
        mod10 <=
        4
    ) {
        return "года";
    }

    return "лет";
}
