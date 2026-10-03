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

import type {
    ReactNode,
} from "react";

type Couple = {
    id: string;
    partner_a_name?: string | null;
    partner_b_name?: string | null;
};

type Comparison = {
    questionId: string;
    question: string;

    answerA: string;
    answerB: string;

    labelA: string;
    labelB: string;

    traitsA: string[];
    traitsB: string[];

    sharedTraits: string[];

    similarity:
        | "same"
        | "close"
        | "different";
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

    comparisons?: Comparison[];

    highlights?: {
        same?: Comparison[];
        close?: Comparison[];
        different?: Comparison[];
    };
};

type CategoryId =
    | "friendship"
    | "partnership"
    | "sex"
    | "money"
    | "care"
    | "home";

type CategoryScore = {
    id: CategoryId;
    title: string;
    subtitle: string;
    value: number;
};

type MonthPlan = {
    number: number;
    eyebrow: string;
    title: string;
    description: string;
    tasks: string[];
};

const MAX_SCORE = 10;

const ROADMAP_IMAGE =
    "/images/relationship-roadmap.png";

export default function ReportPage() {
    const params =
        useParams<{
            coupleId: string;
        }>();

    const router =
        useRouter();

    const coupleId =
        params.coupleId;

    const [data, setData] =
        useState<ApiResponse | null>(
            null
        );

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
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
                        "Не удалось загрузить полный разбор"
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

                setData(result);
            } catch (err) {
                console.error(err);

                if (!cancelled) {
                    setError(
                        "Не получилось загрузить разбор."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        load();

        return () => {
            cancelled = true;
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
                    id:
                        "friendship",

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
                    id:
                        "partnership",

                    title:
                        "Партнёрство",

                    subtitle:
                        "вы команда или каждый сам за себя",

                    value:
                        clamp(base),
                },

                {
                    id:
                        "sex",

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
                    id:
                        "money",

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
                    id:
                        "care",

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
                    id:
                        "home",

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
        }, [data]);

    const sortedCategories =
        useMemo(
            () =>
                [
                    ...categories,
                ].sort(
                    (a, b) =>
                        a.value -
                        b.value
                ),
            [categories]
        );

    const weakest =
        sortedCategories.slice(
            0,
            2
        );

    const strongest =
        useMemo(
            () =>
                [
                    ...categories,
                ].sort(
                    (a, b) =>
                        b.value -
                        a.value
                )[0],
            [categories]
        );

    const differences =
        useMemo(() => {
            const direct =
                data
                    ?.highlights
                    ?.different ??
                [];

            if (
                direct.length >= 3
            ) {
                return direct.slice(
                    0,
                    3
                );
            }

            return (
                data?.comparisons ??
                []
            )
                .filter(
                    (item) =>
                        item.similarity !==
                        "same"
                )
                .slice(
                    0,
                    3
                );
        }, [data]);

    const plan =
        useMemo<
            MonthPlan[]
        >(() => {
            const first =
                sortedCategories[0];

            const second =
                sortedCategories[1];

            const third =
                sortedCategories[2];

            return [
                {
                    number: 1,

                    eyebrow:
                        "ПЕРВЫЙ МЕСЯЦ",

                    title:
                        "Ближе друг к другу",

                    description:
                        "Возвращаем больше лёгкости, внимания и времени только для вас двоих.",

                    tasks: [
                        "Проведите 3 свидания подряд без телефонов",

                        "Каждый день задавайте друг другу один настоящий вопрос о прошедшем дне",

                        getActionForCategory(
                            first?.id ??
                            "friendship"
                        ),
                    ],
                },

                {
                    number: 2,

                    eyebrow:
                        "ВТОРОЙ МЕСЯЦ",

                    title:
                        "Пройти сложные темы",

                    description:
                        "Не избегаем драконов — спокойно разбираем то, что может копить напряжение.",

                    tasks: [
                        getActionForCategory(
                            second?.id ??
                            "money"
                        ),

                        "Обсудите интим: что нравится, сколько близости хочется и как комфортно проявлять инициативу",

                        "Договоритесь о правиле ссоры: как брать паузу и когда обязательно возвращаться к разговору",
                    ],
                },

                {
                    number: 3,

                    eyebrow:
                        "ТРЕТИЙ МЕСЯЦ",

                    title:
                        "Общий ритм",

                    description:
                        "Собираем правила, которые останутся с вами и после этих трёх месяцев.",

                    tasks: [
                        getActionForCategory(
                            third?.id ??
                            "home"
                        ),

                        "Выберите 3 общие цели на ближайший год",

                        "Запланируйте одно новое совместное приключение: поездку, курс или проект",
                    ],
                },
            ];
        }, [
            sortedCategories,
        ]);

    const nameA =
        data?.couple
            ?.partner_a_name ||
        "Первый";

    const nameB =
        data?.couple
            ?.partner_b_name ||
        "Второй";

    if (loading) {
        return (
            <main className="state">

                <div className="state-brand">
                    между нами.
                </div>

                <p>
                    собираем ваш разбор
                </p>

                <style jsx>{`
                    .state {
                        min-height:
                            100vh;

                        display:
                            grid;

                        place-items:
                            center;

                        align-content:
                            center;

                        gap:
                            12px;

                        background:
                            #f8f4f1;
                    }

                    .state-brand {
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

    if (
        error ||
        !data
    ) {
        return (
            <main className="state">

                <div className="state-brand">
                    между нами.
                </div>

                <p>
                    {error ||
                        "Не получилось загрузить разбор."}
                </p>

                <style jsx>{`
                    .state {
                        min-height:
                            100vh;

                        display:
                            grid;

                        place-items:
                            center;

                        align-content:
                            center;

                        gap:
                            12px;

                        padding:
                            24px;

                        background:
                            #f8f4f1;
                    }

                    .state-brand {
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
                            13px;
                    }
                `}</style>

            </main>
        );
    }

    return (
        <main className="report-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <header className="report-header report-shell">

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

            {/* =================================================
                INTRO
            ================================================= */}

            <section className="intro report-shell">

                <div className="intro-grid">

                    <div className="intro-main">

                        <h1>
                            Подробный
                            <br />
                            разбор
                        </h1>

                        <p>
                            Здесь — не оценка ваших отношений,
                            а карта того, где вам легко,
                            где вы смотрите на вещи по-разному
                            и что можно попробовать изменить.
                        </p>

                    </div>

                    <aside className="intro-insight">

                        <h2>
                            Главное про вас
                        </h2>

                        <div className="intro-point">

                            <span>
                                —
                            </span>

                            <p>
                                Сильнее всего сейчас выглядит{" "}

                                <strong>
                                    {strongest.title.toLowerCase()}
                                </strong>
                                .
                            </p>

                        </div>

                        <div className="intro-point">

                            <span>
                                —
                            </span>

                            <p>
                                Больше внимания требуют{" "}

                                <strong>
                                    {weakest
                                        .map(
                                            (
                                                item
                                            ) =>
                                                item.title.toLowerCase()
                                        )
                                        .join(
                                            " и "
                                        )}
                                </strong>
                                .
                            </p>

                        </div>

                    </aside>

                </div>

            </section>

            {/* =================================================
                6 СФЕР
            ================================================= */}

            <section className="report-section report-shell">

                <SectionHeading
                    label="6 СФЕР"
                    title={
                        <>
                            Как устроены ваши
                            <br />
                            отношения
                        </>
                    }
                    description="Те же показатели, которые вы увидели в результате — теперь как основа для полного разбора."
                />

                <div className="score-list">

                    {categories.map(
                        (
                            category
                        ) => (
                            <ScoreRow
                                key={
                                    category.id
                                }
                                category={
                                    category
                                }
                            />
                        )
                    )}

                </div>

            </section>

            {/* =================================================
                СЛЕПЫЕ ЗОНЫ
            ================================================= */}

            <section className="report-section report-shell">

                <SectionHeading
                    label="СЛЕПЫЕ ЗОНЫ"
                    title={
                        <>
                            Где вы можете
                            <br />
                            неправильно понимать
                            <br className="desktop-only" />
                            друг друга
                        </>
                    }
                    description="Здесь интересно не то, кто «прав», а насколько по-разному вы воспринимаете одну и ту же ситуацию."
                />

                <div className="blind-list">

                    {differences.length >
                    0 ? (
                        differences.map(
                            (
                                item,
                                index
                            ) => (
                                <BlindSpot
                                    key={
                                        item.questionId
                                    }
                                    item={
                                        item
                                    }
                                    index={
                                        index
                                    }
                                    nameA={
                                        nameA
                                    }
                                    nameB={
                                        nameB
                                    }
                                />
                            )
                        )
                    ) : (
                        <div className="empty">
                            Здесь ваши ответы оказались довольно близкими.
                        </div>
                    )}

                </div>

            </section>

            {/* =================================================
                ПЛАН
            ================================================= */}

            <section className="report-section roadmap-section report-shell">

                <SectionHeading
                    label="ВАШ ПУТЬ ВМЕСТЕ"
                    title="План на 3 месяца"
                    description="Не «больше разговаривайте». Только конкретные вещи, которые можно поставить в календарь и сделать."
                />

                <div className="map">

                    <img
                        src={
                            ROADMAP_IMAGE
                        }
                        alt="Путь пары на три месяца"
                    />

                </div>

                <div className="month-grid">

                    {plan.map(
                        (
                            month
                        ) => (
                            <MonthCard
                                key={
                                    month.number
                                }
                                month={
                                    month
                                }
                            />
                        )
                    )}

                </div>

            </section>

            <style jsx>{`

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
                        #211d1f;
                }

                .report-page {
                    width:
                        100%;

                    min-height:
                        100vh;

                    padding-bottom:
                        72px;

                    background:
                        #f8f4f1;
                }

                .report-shell {
                    width:
                        min(
                            1140px,
                            calc(
                                100% -
                                48px
                            )
                        );

                    max-width:
                        1140px;

                    min-height:
                        0;

                    height:
                        auto;

                    margin:
                        0 auto;

                    padding:
                        0;
                }

                /* =================================================
                   HEADER
                ================================================= */

                .report-header {
                    height:
                        76px;

                    min-height:
                        0;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        space-between;

                    gap:
                        24px;
                }

                .brand {
                    flex:
                        0 0 auto;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        25px;

                    line-height:
                        1;

                    font-weight:
                        700;

                    letter-spacing:
                        -1.2px;
                }

                .couple-names {
                    min-width:
                        0;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        flex-end;

                    gap:
                        10px;

                    color:
                        #93888c;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        10px;

                    font-weight:
                        800;

                    letter-spacing:
                        1.15px;

                    text-transform:
                        uppercase;
                }

                .couple-names b {
                    color:
                        #c8235b;

                    font-size:
                        13px;
                }

                /* =================================================
                   INTRO
                ================================================= */

                .intro {
                    padding:
                        43px
                        0
                        12px;
                }

                .intro-grid {
                    display:
                        grid;

                    grid-template-columns:
                        minmax(
                            0,
                            1.15fr
                        )
                        minmax(
                            340px,
                            .85fr
                        );

                    gap:
                        72px;

                    align-items:
                        center;
                }

                .intro-main h1 {
                    margin:
                        0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        clamp(
                            64px,
                            7.6vw,
                            92px
                        );

                    line-height:
                        .87;

                    font-weight:
                        400;

                    letter-spacing:
                        -4px;
                }

                .intro-main p {
                    max-width:
                        590px;

                    margin:
                        25px
                        0
                        0;

                    color:
                        #7b7275;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        15px;

                    line-height:
                        1.55;
                }

                .intro-insight {
                    padding:
                        30px
                        34px;

                    border-radius:
                        27px;

                    background:
                        #f0dce2;
                }

                .intro-insight h2 {
                    margin:
                        0
                        0
                        21px;

                    color:
                        #322a2d;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        27px;

                    line-height:
                        1;

                    font-weight:
                        400;

                    letter-spacing:
                        -.8px;
                }

                .intro-point {
                    display:
                        grid;

                    grid-template-columns:
                        18px
                        minmax(
                            0,
                            1fr
                        );

                    gap:
                        7px;

                    align-items:
                        start;
                }

                .intro-point +
                .intro-point {
                    margin-top:
                        13px;
                }

                .intro-point > span {
                    color:
                        #cb255d;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        18px;

                    line-height:
                        1.4;
                }

                .intro-point p {
                    margin:
                        0;

                    color:
                        #5e5458;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        15px;

                    line-height:
                        1.48;
                }

                /* =================================================
                   COMMON SECTIONS
                ================================================= */

                .report-section {
                    min-height:
                        0;

                    height:
                        auto;

                    margin-top:
                        70px;

                    padding:
                        0;
                }

                .score-list {
                    border-top:
                        1px solid
                        #ded7d4;
                }

                .desktop-only {
                    display:
                        inline;
                }

                /* =================================================
                   BLIND
                ================================================= */

                .blind-list {
                    display:
                        grid;

                    gap:
                        13px;
                }

                .empty {
                    padding:
                        25px;

                    border:
                        1px solid
                        #e3d9d7;

                    border-radius:
                        22px;

                    color:
                        #7e7478;

                    background:
                        #fffaf8;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        14px;
                }

                /* =================================================
                   ROADMAP
                ================================================= */

                .roadmap-section {
                    margin-top:
                        76px;
                }

                .map {
                    width:
                        100%;

                    overflow:
                        hidden;

                    border-radius:
                        25px;

                    background:
                        #ecd9de;

                    box-shadow:
                        0
                        12px
                        34px
                        rgba(
                            74,
                            42,
                            52,
                            .07
                        );
                }

                .map img {
                    width:
                        100%;

                    height:
                        auto;

                    display:
                        block;
                }

                .month-grid {
                    display:
                        grid;

                    grid-template-columns:
                        repeat(
                            3,
                            minmax(
                                0,
                                1fr
                            )
                        );

                    gap:
                        13px;

                    margin-top:
                        14px;

                    align-items:
                        start;
                }

                /* =================================================
                   TABLET
                ================================================= */

                @media (
                    max-width:
                        900px
                ) {

                    .intro-grid {
                        grid-template-columns:
                            1fr;

                        gap:
                            28px;
                    }

                    .intro-insight {
                        max-width:
                            620px;
                    }

                    .month-grid {
                        grid-template-columns:
                            1fr;
                    }
                }

                /* =================================================
                   MOBILE
                ================================================= */

                @media (
                    max-width:
                        640px
                ) {

                    .report-page {
                        padding-bottom:
                            44px;
                    }

                    .report-shell {
                        width:
                            calc(
                                100% -
                                28px
                            );
                    }

                    .report-header {
                        height:
                            63px;

                        gap:
                            12px;
                    }

                    .brand {
                        font-size:
                            21px;
                    }

                    .couple-names {
                        max-width:
                            48%;

                        overflow:
                            hidden;

                        white-space:
                            nowrap;

                        font-size:
                            8px;
                    }

                    .couple-names span {
                        overflow:
                            hidden;

                        text-overflow:
                            ellipsis;
                    }

                    .intro {
                        padding-top:
                            30px;
                    }

                    .intro-main h1 {
                        font-size:
                            54px;

                        letter-spacing:
                            -2.8px;
                    }

                    .intro-main p {
                        margin-top:
                            18px;

                        font-size:
                            12px;
                    }

                    .intro-insight {
                        padding:
                            23px;

                        border-radius:
                            22px;
                    }

                    .intro-insight h2 {
                        font-size:
                            23px;
                    }

                    .intro-point p {
                        font-size:
                            13px;
                    }

                    .report-section,
                    .roadmap-section {
                        margin-top:
                            52px;
                    }

                    .desktop-only {
                        display:
                            none;
                    }

                    .map {
                        border-radius:
                            18px;
                    }

                    .month-grid {
                        margin-top:
                            10px;
                    }
                }

            `}</style>

        </main>
    );
}

/* ============================================================
   SECTION HEADING
============================================================ */

function SectionHeading({
                            label,
                            title,
                            description,
                        }: {
    label: string;
    title: ReactNode;
    description: string;
}) {
    return (
        <div className="section-heading">

            <div className="label">
                {label}
            </div>

            <h2>
                {title}
            </h2>

            <p>
                {description}
            </p>

            <style jsx>{`

                .section-heading {
                    max-width:
                        780px;

                    margin-bottom:
                        30px;
                }

                .label {
                    margin-bottom:
                        13px;

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

                h2 {
                    margin: 0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        clamp(
                            43px,
                            4.8vw,
                            58px
                        );

                    line-height:
                        .95;

                    font-weight:
                        400;

                    letter-spacing:
                        -2.3px;
                }

                p {
                    max-width:
                        630px;

                    margin:
                        16px
                        0
                        0;

                    color:
                        #898083;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        13px;

                    line-height:
                        1.5;
                }

                @media (
                    max-width:
                        640px
                ) {

                    .section-heading {
                        margin-bottom:
                            22px;
                    }

                    h2 {
                        font-size:
                            37px;

                        letter-spacing:
                            -1.6px;
                    }

                    p {
                        font-size:
                            11px;
                    }
                }

            `}</style>

        </div>
    );
}

/* ============================================================
   SCORE
============================================================ */

function ScoreRow({
                      category,
                  }: {
    category: CategoryScore;
}) {
    return (
        <article className="score-row">

            <div className="score-symbol">
                {getCategoryIcon(
                    category.id
                )}
            </div>

            <div className="score-main">

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

                .score-row {
                    min-height:
                        98px;

                    display:
                        grid;

                    grid-template-columns:
                        40px
                        minmax(
                            0,
                            1fr
                        )
                        84px;

                    gap:
                        18px;

                    align-items:
                        center;

                    border-bottom:
                        1px solid
                        #ded7d4;
                }

                .score-symbol {
                    width:
                        36px;

                    height:
                        36px;

                    display:
                        grid;

                    place-items:
                        center;

                    border-radius:
                        50%;

                    background:
                        #f2dfe4;

                    color:
                        #c9255c;

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

                    line-height:
                        1;

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
                    height:
                        5px;

                    overflow:
                        hidden;

                    border-radius:
                        999px;

                    background:
                        #e5dfe0;
                }

                .fill {
                    height:
                        100%;

                    border-radius:
                        inherit;

                    background:
                        #ce3269;
                }

                .score {
                    display:
                        flex;

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

                    line-height:
                        1;

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

                    .score-row {
                        min-height:
                            87px;

                        grid-template-columns:
                            30px
                            minmax(
                                0,
                                1fr
                            )
                            55px;

                        gap:
                            10px;
                    }

                    .score-symbol {
                        width:
                            29px;

                        height:
                            29px;

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

/* ============================================================
   BLIND SPOT
============================================================ */

function BlindSpot({
                       item,
                       index,
                       nameA,
                       nameB,
                   }: {
    item: Comparison;
    index: number;
    nameA: string;
    nameB: string;
}) {
    return (
        <article className="blind-card">

            <div className="blind-top">

                <div className="blind-number">
                    0{index + 1}
                </div>

                <h3>
                    {item.question}
                </h3>

            </div>

            <div className="answers">

                <div className="answer">

                    <span className="person">
                        {nameA}
                    </span>

                    <strong>
                        {item.labelA}
                    </strong>

                </div>

                <div className="arrow">
                    →
                </div>

                <div className="answer">

                    <span className="person">
                        {nameB}
                    </span>

                    <strong>
                        {item.labelB}
                    </strong>

                </div>

            </div>

            <div className="meaning">

                <span>
                    ЧТО ЭТО ЗНАЧИТ
                </span>

                <p>
                    {getBlindInsight(
                        item
                    )}
                </p>

            </div>

            <style jsx>{`

                .blind-card {
                    width:
                        100%;

                    min-width:
                        0;

                    padding:
                        25px
                        28px;

                    overflow:
                        hidden;

                    border:
                        1px solid
                        #e2d8d6;

                    border-radius:
                        23px;

                    background:
                        #fffaf8;
                }

                .blind-top {
                    display:
                        grid;

                    grid-template-columns:
                        52px
                        minmax(
                            0,
                            1fr
                        );

                    gap:
                        16px;

                    align-items:
                        start;
                }

                .blind-number {
                    padding-top:
                        4px;

                    color:
                        #ca275f;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        20px;

                    line-height:
                        1;
                }

                h3 {
                    max-width:
                        850px;

                    margin: 0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        30px;

                    line-height:
                        1.08;

                    font-weight:
                        400;

                    letter-spacing:
                        -.8px;
                }

                .answers {
                    display:
                        grid;

                    grid-template-columns:
                        minmax(
                            0,
                            1fr
                        )
                        46px
                        minmax(
                            0,
                            1fr
                        );

                    gap:
                        13px;

                    align-items:
                        center;

                    margin:
                        23px
                        0
                        0
                        68px;
                }

                .answer {
                    min-width:
                        0;

                    min-height:
                        108px;

                    display:
                        flex;

                    flex-direction:
                        column;

                    justify-content:
                        center;

                    padding:
                        19px
                        21px;

                    border-radius:
                        18px;

                    background:
                        #f1e1e4;
                }

                .person {
                    display:
                        block;

                    margin-bottom:
                        10px;

                    overflow:
                        hidden;

                    color:
                        #9d8c91;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        10px;

                    line-height:
                        1;

                    font-weight:
                        800;

                    letter-spacing:
                        .8px;

                    text-overflow:
                        ellipsis;

                    text-transform:
                        uppercase;

                    white-space:
                        nowrap;
                }

                .answer strong {
                    display:
                        block;

                    color:
                        #30282b;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        17px;

                    line-height:
                        1.38;

                    font-weight:
                        500;

                    overflow-wrap:
                        break-word;
                }

                .arrow {
                    color:
                        #cc275f;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        29px;

                    text-align:
                        center;
                }

                .meaning {
                    margin:
                        19px
                        0
                        0
                        68px;

                    padding-top:
                        17px;

                    border-top:
                        1px solid
                        #e9dfdd;
                }

                .meaning span {
                    display:
                        block;

                    margin-bottom:
                        6px;

                    color:
                        #c2275c;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        9px;

                    font-weight:
                        800;

                    letter-spacing:
                        1.4px;
                }

                .meaning p {
                    max-width:
                        850px;

                    margin: 0;

                    color:
                        #655b5e;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        14px;

                    line-height:
                        1.5;
                }

                @media (
                    max-width:
                        640px
                ) {

                    .blind-card {
                        padding:
                            20px;
                    }

                    .blind-top {
                        grid-template-columns:
                            1fr;

                        gap:
                            8px;
                    }

                    .blind-number {
                        font-size:
                            17px;
                    }

                    h3 {
                        font-size:
                            24px;
                    }

                    .answers {
                        grid-template-columns:
                            1fr;

                        gap:
                            8px;

                        margin:
                            18px
                            0
                            0;
                    }

                    .answer {
                        min-height:
                            0;

                        padding:
                            16px;
                    }

                    .answer strong {
                        font-size:
                            15px;
                    }

                    .arrow {
                        height:
                            21px;

                        line-height:
                            21px;

                        transform:
                            rotate(
                                90deg
                            );
                    }

                    .meaning {
                        margin:
                            16px
                            0
                            0;

                        padding-top:
                            14px;
                    }

                    .meaning p {
                        font-size:
                            12px;
                    }
                }

            `}</style>

        </article>
    );
}

/* ============================================================
   MONTH CARD
============================================================ */

function MonthCard({
                       month,
                   }: {
    month: MonthPlan;
}) {
    return (
        <article className="month-card">

            <div className="month-top">

                <div className="number">
                    {month.number}
                </div>

                <div className="eyebrow">
                    {month.eyebrow}
                </div>

            </div>

            <h3>
                {month.title}
            </h3>

            <p className="description">
                {month.description}
            </p>

            <div className="tasks">

                {month.tasks.map(
                    (
                        task
                    ) => (
                        <div
                            className="task"
                            key={
                                task
                            }
                        >

                            <span className="checkbox" />

                            <span className="task-text">
                                {task}
                            </span>

                        </div>
                    )
                )}

            </div>

            <style jsx>{`

                .month-card {
                    min-width:
                        0;

                    padding:
                        24px;

                    border:
                        1px solid
                        #e3d9d7;

                    border-radius:
                        23px;

                    background:
                        #fffaf8;
                }

                .month-top {
                    display:
                        flex;

                    align-items:
                        center;

                    gap:
                        12px;

                    margin-bottom:
                        17px;
                }

                .number {
                    flex:
                        0 0 auto;

                    width:
                        38px;

                    height:
                        38px;

                    display:
                        grid;

                    place-items:
                        center;

                    border-radius:
                        50%;

                    background:
                        #c8245c;

                    color:
                        white;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        19px;
                }

                .eyebrow {
                    color:
                        #c8245c;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        9px;

                    line-height:
                        1.2;

                    font-weight:
                        800;

                    letter-spacing:
                        1.3px;
                }

                h3 {
                    margin: 0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        30px;

                    line-height:
                        .98;

                    font-weight:
                        400;

                    letter-spacing:
                        -1px;
                }

                .description {
                    margin:
                        17px
                        0
                        21px;

                    color:
                        #807679;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        12px;

                    line-height:
                        1.45;
                }

                .tasks {
                    display:
                        grid;

                    gap:
                        13px;
                }

                .task {
                    display:
                        grid;

                    grid-template-columns:
                        18px
                        minmax(
                            0,
                            1fr
                        );

                    gap:
                        10px;

                    align-items:
                        start;
                }

                .checkbox {
                    width:
                        18px;

                    height:
                        18px;

                    margin-top:
                        1px;

                    border:
                        1.5px solid
                        #d44573;

                    border-radius:
                        5px;
                }

                .task-text {
                    color:
                        #4e4548;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        12px;

                    line-height:
                        1.42;

                    overflow-wrap:
                        break-word;
                }

            `}</style>

        </article>
    );
}

/* ============================================================
   HELPERS
============================================================ */

function getCategoryIcon(
    id: CategoryId
) {
    switch (id) {
        case "friendship":
            return "♥";

        case "partnership":
            return "×";

        case "sex":
            return "♡";

        case "money":
            return "₽";

        case "care":
            return "❦";

        case "home":
            return "⌂";
    }
}

function getActionForCategory(
    id: CategoryId
) {
    switch (id) {
        case "friendship":
            return "Выберите одно новое занятие и впервые попробуйте его вместе";

        case "partnership":
            return "Возьмите одну общую задачу и заранее договоритесь, кто за что отвечает";

        case "sex":
            return "Поговорите о комфортной близости: частоте, инициативе и том, что каждому нравится";

        case "money":
            return "Устройте финансовый вечер: обсудите траты, личные деньги, накопления и крупные покупки";

        case "care":
            return "Каждый назовите 3 действия партнёра, после которых вы особенно чувствуете заботу";

        case "home":
            return "Выпишите регулярные бытовые задачи и перераспределите хотя бы три из них";
    }
}

function getBlindInsight(
    item: Comparison
) {
    if (
        item.similarity ===
        "different"
    ) {
        return "Здесь вы смотрите на одну ситуацию заметно по-разному. Один из вас может считать свою реакцию очевидной, а второй в этот же момент ждать совсем другого сигнала.";
    }

    if (
        item.similarity ===
        "close"
    ) {
        return "В целом вы рядом, но детали различаются. Такие небольшие расхождения часто остаются незаметными, пока не возникает реальная ситуация.";
    }

    return "В этой ситуации вы воспринимаете происходящее довольно похоже.";
}