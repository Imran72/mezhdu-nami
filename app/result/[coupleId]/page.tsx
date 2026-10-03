"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    useParams,
    useRouter,
} from "next/navigation";

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
    symbol: string;
};

const MAX_SCORE = 10;

const PAID_IMAGE =
    "/images/full-report-couple.png";

export default function ResultPage() {
    const params =
        useParams<{
            coupleId: string;
        }>();

    const router =
        useRouter();

    const coupleId =
        params.coupleId;

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

    const [
        error,
        setError,
    ] =
        useState("");

    useEffect(() => {
        let cancelled =
            false;

        async function load() {
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
            } catch (err) {
                console.error(err);

                if (!cancelled) {
                    setError(
                        "Не получилось загрузить результат."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(
                        false
                    );
                }
            }
        }

        load();

        return () => {
            cancelled =
                true;
        };
    }, [
        coupleId,
        router,
    ]);

    const categories =
        useMemo<
            CategoryScore[]
        >(() => {
            const same =
                data?.scores
                    ?.sameAnswers ??
                0;

            const close =
                data?.scores
                    ?.closeAnswers ??
                0;

            const different =
                data?.scores
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
                        close * .5
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

                    symbol:
                        "♥",
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

                    symbol:
                        "×",
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

                    symbol:
                        "♡",
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

                    symbol:
                        "₽",
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

                    symbol:
                        "❦",
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

                    symbol:
                        "⌂",
                },
            ];
        }, [data]);

    const forecastYears =
        useMemo(() => {
            const overall =
                data?.scores
                    ?.overall ??
                0;

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
        Math.max(
            4,
            Math.min(
                96,
                forecastYears /
                60 *
                100
            )
        );

    if (loading) {
        return (
            <StateScreen
                text="собираем ваши ответы"
            />
        );
    }

    if (
        error ||
        !data
    ) {
        return (
            <StateScreen
                text={
                    error ||
                    "Не получилось загрузить результат."
                }
            />
        );
    }

    const nameA =
        data.couple
            ?.partner_a_name ||
        "Первый";

    const nameB =
        data.couple
            ?.partner_b_name ||
        "Второй";

    return (
        <main className="page">

            <header className="header shell">

                <div className="brand">
                    между нами.
                </div>

                <div className="names">

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

            <section className="results shell">

                <div className="eyebrow">
                    ВАША КАРТИНА
                </div>

                <h1>
                    Как вы совпали
                    <br />
                    в главном
                </h1>

                <p className="intro">
                    Не оценка ваших отношений —
                    а шесть сторон совместной жизни,
                    которые видно по вашим ответам.
                </p>

                <div className="scores">

                    {categories.map(
                        (
                            category
                        ) => (
                            <ScoreRow
                                key={
                                    category.title
                                }
                                category={
                                    category
                                }
                            />
                        )
                    )}

                </div>

            </section>

            <section className="forecast shell">

                <div className="forecast-copy">

                    <div className="eyebrow">
                        ПРОГНОЗ
                    </div>

                    <h2>
                        Ориентировочная
                        <br />
                        длительность отношений
                    </h2>

                    <p>
                        На основе ваших ответов
                        мы оценили, сколько времени
                        ваши отношения могут
                        продлиться при текущем
                        сценарии.
                    </p>

                </div>

                <div className="forecast-result">

                    <div className="years">

                        <strong>
                            {forecastYears}
                        </strong>

                        <span>
                            {yearWord(
                                forecastYears
                            )}
                        </span>

                    </div>

                    <div className="scale">

                        <div className="track">

                            <div
                                className="fill"
                                style={{
                                    width:
                                        `${forecastPosition}%`,
                                }}
                            />

                            <div
                                className="dot"
                                style={{
                                    left:
                                        `${forecastPosition}%`,
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

            <section className="paid-wrap">

                <div className="paid-card">

                    <div className="art">

                        <img
                            src={
                                PAID_IMAGE
                            }
                            alt=""
                            draggable={
                                false
                            }
                        />

                        <div className="art-fade" />

                    </div>

                    <div className="paid-content">

                        <div className="paid-label">
                            ПОЛНЫЙ РАЗБОР
                        </div>

                        <h2>
                            Чтобы вместе —
                            <br />
                            и надолго.
                        </h2>

                        <div className="benefits">

                            <Benefit
                                symbol="♥"
                                text="Где вы можете не понимать друг друга"
                            />

                            <Benefit
                                symbol="○"
                                text="Что каждый ждёт от отношений"
                            />

                            <Benefit
                                symbol="↯"
                                text="Что может стать причиной ссор"
                            />

                            <Benefit
                                symbol="↗"
                                text="Как сделать вашу пару крепче"
                            />

                        </div>

                        <button
                            type="button"
                            className="paid-button"
                            onClick={() =>
                                router.push(
                                    `/report/${coupleId}`
                                )
                            }
                        >

                            <span>
                                Открыть полный разбор
                            </span>

                            <span className="button-right">

                                <b>
                                    299 ₽
                                </b>

                                <i>
                                    →
                                </i>

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
                :global(*) {
                    box-sizing:
                        border-box;
                }

                :global(html),
                :global(body) {
                    margin: 0;

                    background:
                        #f8f4f1;
                }

                button {
                    font: inherit;
                }

                .page {
                    min-height:
                        100vh;

                    padding:
                        0
                        28px
                        72px;

                    overflow-x:
                        hidden;

                    color:
                        #201c1e;

                    background:
                        #f8f4f1;
                }

                .shell {
                    width:
                        min(
                            920px,
                            100%
                        );

                    margin:
                        0 auto;
                }

                .header {
                    min-height:
                        78px;

                    display: flex;

                    align-items:
                        center;

                    justify-content:
                        space-between;

                    gap: 24px;
                }

                .brand {
                    flex-shrink: 0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        24px;

                    line-height: 1;

                    font-weight:
                        700;

                    letter-spacing:
                        -1.1px;
                }

                .names {
                    min-width: 0;

                    display: flex;

                    align-items:
                        center;

                    gap: 9px;

                    color:
                        #8f8588;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        10px;

                    font-weight:
                        700;

                    letter-spacing:
                        1.2px;

                    text-transform:
                        uppercase;
                }

                .names span {
                    overflow:
                        hidden;

                    text-overflow:
                        ellipsis;

                    white-space:
                        nowrap;
                }

                .names b {
                    color:
                        #c51f59;
                }

                .results {
                    padding:
                        62px
                        0
                        55px;
                }

                .eyebrow {
                    margin-bottom:
                        15px;

                    color:
                        #c51f59;

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
                    margin: 0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        clamp(
                            56px,
                            7vw,
                            78px
                        );

                    line-height:
                        .9;

                    font-weight:
                        400;

                    letter-spacing:
                        -3.7px;
                }

                .intro {
                    max-width:
                        520px;

                    margin:
                        23px
                        0
                        45px;

                    color:
                        #81777a;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        14px;

                    line-height:
                        1.55;
                }

                .scores {
                    border-top:
                        1px solid
                        #ded7d4;
                }

                .forecast {
                    display: grid;

                    grid-template-columns:
                        minmax(
                            0,
                            1.15fr
                        )
                        minmax(
                            280px,
                            .85fr
                        );

                    gap: 55px;

                    align-items:
                        center;

                    padding:
                        48px
                        0
                        54px;

                    border-top:
                        1px solid
                        #dcd4d1;
                }

                .forecast h2 {
                    margin: 0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        43px;

                    line-height: 1;

                    font-weight:
                        400;

                    letter-spacing:
                        -2px;
                }

                .forecast-copy p {
                    max-width:
                        500px;

                    margin:
                        16px
                        0
                        0;

                    color:
                        #8d8587;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        13px;

                    line-height:
                        1.55;
                }

                .years {
                    display: flex;

                    align-items:
                        baseline;

                    color:
                        #c21856;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    white-space:
                        nowrap;
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
                        36px;

                    letter-spacing:
                        -1.4px;
                }

                .scale {
                    margin-top:
                        25px;
                }

                .track {
                    position:
                        relative;

                    height: 8px;

                    border-radius:
                        999px;

                    background:
                        #e5dfe0;
                }

                .fill {
                    position:
                        absolute;

                    inset:
                        0
                        auto
                        0
                        0;

                    border-radius:
                        inherit;

                    background:
                        #e99ab5;
                }

                .dot {
                    position:
                        absolute;

                    top: 50%;

                    width: 20px;
                    height: 20px;

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

                    margin-top:
                        12px;

                    color:
                        #8d8587;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        10px;

                    font-weight:
                        600;
                }

                .paid-wrap {
                    width:
                        min(
                            1180px,
                            100%
                        );

                    margin:
                        12px
                        auto
                        0;
                }

                .paid-card {
                    position:
                        relative;

                    min-height:
                        640px;

                    overflow:
                        hidden;

                    border-radius:
                        28px;

                    color: #fff;

                    background:
                        #ad194a;

                    isolation:
                        isolate;
                }

                .art {
                    position:
                        absolute;

                    inset: 0;

                    z-index: 0;

                    overflow:
                        hidden;
                }

                .art img {
                    position:
                        absolute;

                    left: 0;
                    top: 0;

                    width: 69%;
                    height: 100%;

                    object-fit:
                        cover;

                    object-position:
                        44% center;
                }

                .art-fade {
                    position:
                        absolute;

                    inset:
                        0
                        24%
                        0
                        34%;

                    background:
                        linear-gradient(
                            90deg,
                            rgba(
                                173,
                                25,
                                74,
                                0
                            ),
                            rgba(
                                173,
                                25,
                                74,
                                .18
                            )
                            20%,
                            rgba(
                                173,
                                25,
                                74,
                                .6
                            )
                            58%,
                            #ad194a
                            100%
                        );
                }

                .paid-content {
                    position:
                        relative;

                    z-index: 2;

                    width: 47%;

                    min-height:
                        640px;

                    margin-left:
                        auto;

                    display: flex;

                    flex-direction:
                        column;

                    justify-content:
                        center;

                    padding:
                        48px
                        55px
                        42px
                        20px;
                }

                .paid-label {
                    margin-bottom:
                        13px;

                    color:
                        rgba(
                            255,
                            255,
                            255,
                            .72
                        );

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        9px;

                    font-weight:
                        800;

                    letter-spacing:
                        2px;
                }

                .paid-content h2 {
                    margin: 0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        clamp(
                            46px,
                            4.5vw,
                            62px
                        );

                    line-height:
                        .92;

                    font-weight:
                        400;

                    letter-spacing:
                        -2.7px;
                }

                .benefits {
                    display: grid;

                    grid-template-columns:
                        1fr
                        1fr;

                    gap:
                        19px
                        24px;

                    margin-top:
                        37px;
                }

                .paid-button {
                    width: 100%;

                    min-height:
                        65px;

                    display: flex;

                    align-items:
                        center;

                    justify-content:
                        space-between;

                    gap: 20px;

                    margin-top:
                        36px;

                    padding:
                        0
                        24px;

                    border: 0;

                    border-radius:
                        999px;

                    cursor:
                        pointer;

                    color:
                        #8f123c;

                    background:
                        #fff8f4;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        13px;

                    font-weight:
                        800;

                    transition:
                        transform
                        .18s ease;
                }

                .paid-button:hover {
                    transform:
                        translateY(-2px);
                }

                .button-right {
                    display: flex;

                    align-items:
                        center;

                    gap: 13px;

                    flex-shrink: 0;
                }

                .button-right b {
                    font-size:
                        15px;
                }

                .button-right i {
                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        22px;

                    font-style:
                        normal;

                    font-weight:
                        400;
                }

                .paid-note {
                    margin-top:
                        13px;

                    color:
                        rgba(
                            255,
                            255,
                            255,
                            .63
                        );

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        9px;

                    line-height:
                        1.4;

                    text-align:
                        center;
                }

                @media (
                    max-width:
                        760px
                ) {
                    .forecast {
                        grid-template-columns:
                            1fr;

                        gap: 34px;
                    }

                    .paid-card {
                        min-height:
                            760px;
                    }

                    .art {
                        height:
                            430px;
                    }

                    .art img {
                        width: 100%;
                        height: 100%;

                        object-position:
                            center;
                    }

                    .art-fade {
                        inset:
                            auto
                            0
                            0
                            0;

                        height: 60%;

                        background:
                            linear-gradient(
                                180deg,
                                rgba(
                                    173,
                                    25,
                                    74,
                                    0
                                ),
                                #ad194a
                                92%
                            );
                    }

                    .paid-content {
                        width: 100%;

                        min-height:
                            760px;

                        justify-content:
                            flex-end;

                        padding:
                            300px
                            26px
                            28px;

                        margin: 0;
                    }
                }

                @media (
                    max-width:
                        640px
                ) {
                    .page {
                        padding:
                            0
                            14px
                            42px;
                    }

                    .header {
                        min-height:
                            64px;
                    }

                    .brand {
                        font-size:
                            21px;
                    }

                    .names {
                        max-width:
                            52%;

                        gap: 5px;

                        font-size:
                            8px;

                        letter-spacing:
                            .65px;
                    }

                    .results {
                        padding:
                            43px
                            0
                            40px;
                    }

                    .results h1 {
                        font-size:
                            52px;

                        letter-spacing:
                            -2.8px;
                    }

                    .intro {
                        margin:
                            18px
                            0
                            31px;

                        font-size:
                            12px;
                    }

                    .forecast {
                        padding:
                            37px
                            0
                            43px;
                    }

                    .forecast h2 {
                        font-size:
                            37px;

                        letter-spacing:
                            -1.6px;
                    }

                    .years strong {
                        font-size:
                            68px;
                    }

                    .years span {
                        font-size:
                            30px;
                    }

                    .paid-wrap {
                        margin-top: 0;
                    }

                    .paid-card {
                        min-height:
                            720px;

                        border-radius:
                            23px;
                    }

                    .art {
                        height:
                            390px;
                    }

                    .paid-content {
                        min-height:
                            720px;

                        padding:
                            280px
                            20px
                            23px;
                    }

                    .paid-content h2 {
                        font-size:
                            45px;

                        letter-spacing:
                            -2px;
                    }

                    .benefits {
                        gap:
                            16px
                            13px;

                        margin-top:
                            28px;
                    }

                    .paid-button {
                        min-height:
                            59px;

                        margin-top:
                            27px;

                        padding:
                            0
                            18px;

                        font-size:
                            11px;
                    }

                    .button-right {
                        gap: 8px;
                    }
                }
            `}</style>

        </main>
    );
}

function ScoreRow({
                      category,
                  }: {
    category:
        CategoryScore;
}) {
    return (
        <article className="row">

            <div className="symbol">
                {category.symbol}
            </div>

            <div className="main">

                <h3>
                    {category.title}
                </h3>

                <p>
                    {category.subtitle}
                </p>

                <div className="track">

                    <div
                        className="fill"
                        style={{
                            width:
                                `${
                                    category.value *
                                    10
                                }%`,
                        }}
                    />

                </div>

            </div>

            <div className="score">

                <strong>
                    {category.value}
                </strong>

                <span>
                    /10
                </span>

            </div>

            <style jsx>{`
                .row {
                    min-height:
                        98px;

                    display: grid;

                    grid-template-columns:
                        40px
                        minmax(
                            0,
                            1fr
                        )
                        84px;

                    gap: 18px;

                    align-items:
                        center;

                    border-bottom:
                        1px solid
                        #ded7d4;
                }

                .symbol {
                    width: 36px;
                    height: 36px;

                    display: grid;

                    place-items:
                        center;

                    border-radius:
                        50%;

                    color:
                        #c9255c;

                    background:
                        #f2dfe4;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        18px;
                }

                h3 {
                    margin: 0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        29px;

                    line-height: 1;

                    font-weight:
                        400;

                    letter-spacing:
                        -1.1px;
                }

                p {
                    margin:
                        5px
                        0
                        10px;

                    color:
                        #91888b;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        10px;
                }

                .track {
                    height: 5px;

                    overflow:
                        hidden;

                    border-radius:
                        999px;

                    background:
                        #e5dfe0;
                }

                .fill {
                    height: 100%;

                    border-radius:
                        inherit;

                    background:
                        #ce3269;
                }

                .score {
                    display: flex;

                    justify-content:
                        flex-end;

                    align-items:
                        baseline;

                    font-family:
                        Georgia,
                        serif;
                }

                .score strong {
                    color:
                        #c51f59;

                    font-size:
                        46px;

                    line-height: 1;

                    font-weight:
                        400;
                }

                .score span {
                    margin-left:
                        3px;

                    color:
                        #847c7e;

                    font-size:
                        17px;
                }

                @media (
                    max-width:
                        640px
                ) {
                    .row {
                        min-height:
                            87px;

                        grid-template-columns:
                            30px
                            minmax(
                                0,
                                1fr
                            )
                            55px;

                        gap: 10px;
                    }

                    .symbol {
                        width: 29px;
                        height: 29px;

                        font-size:
                            14px;
                    }

                    h3 {
                        font-size:
                            22px;
                    }

                    p {
                        font-size:
                            9px;
                    }

                    .score strong {
                        font-size:
                            34px;
                    }

                    .score span {
                        font-size:
                            12px;
                    }
                }
            `}</style>

        </article>
    );
}

function Benefit({
                     symbol,
                     text,
                 }: {
    symbol: string;
    text: string;
}) {
    return (
        <div className="benefit">

            <div className="symbol">
                {symbol}
            </div>

            <div className="text">
                {text}
            </div>

            <style jsx>{`
                .benefit {
                    display: grid;

                    grid-template-columns:
                        28px
                        minmax(
                            0,
                            1fr
                        );

                    gap: 9px;

                    align-items:
                        start;
                }

                .symbol {
                    width: 28px;
                    height: 28px;

                    display: grid;

                    place-items:
                        center;

                    border:
                        1px solid
                        rgba(
                            255,
                            255,
                            255,
                            .4
                        );

                    border-radius:
                        50%;

                    color: #fff;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        13px;
                }

                .text {
                    padding-top:
                        3px;

                    color:
                        rgba(
                            255,
                            255,
                            255,
                            .91
                        );

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        11px;

                    line-height:
                        1.4;
                }

                @media (
                    max-width:
                        640px
                ) {
                    .benefit {
                        grid-template-columns:
                            24px
                            minmax(
                                0,
                                1fr
                            );

                        gap: 7px;
                    }

                    .symbol {
                        width: 24px;
                        height: 24px;

                        font-size:
                            11px;
                    }

                    .text {
                        font-size:
                            10px;
                    }
                }
            `}</style>

        </div>
    );
}

function StateScreen({
                         text,
                     }: {
    text: string;
}) {
    return (
        <main className="state">

            <div className="brand">
                между нами.
            </div>

            <p>
                {text}
            </p>

            <style jsx>{`
                :global(body) {
                    margin: 0;
                }

                .state {
                    min-height:
                        100vh;

                    display: grid;

                    place-items:
                        center;

                    align-content:
                        center;

                    gap: 12px;

                    background:
                        #f8f4f1;

                    color:
                        #201c1e;
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
                }

                p {
                    margin: 0;

                    color:
                        #958b8e;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        12px;
                }
            `}</style>

        </main>
    );
}

function yearWord(
    years: number
) {
    const mod100 =
        years % 100;

    const mod10 =
        years % 10;

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