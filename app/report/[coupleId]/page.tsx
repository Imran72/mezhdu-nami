"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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
        useState<ApiResponse | null>(null);

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
                [...categories].sort(
                    (a, b) =>
                        a.value -
                        b.value
                ),
            [categories]
        );

    const risks =
        sortedCategories.slice(
            0,
            3
        );

    const strongest =
        [...categories].sort(
            (a, b) =>
                b.value -
                a.value
        )[0];

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
                            risks[0]
                                ?.id ??
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
                            risks[1]
                                ?.id ??
                            "money"
                        ),

                        "Обсудите интим: что нравится, сколько близости хочется и как вам комфортно проявлять инициативу",

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
                        "Собираем несколько правил, которые останутся с вами и после этих трёх месяцев.",

                    tasks: [
                        getActionForCategory(
                            risks[2]
                                ?.id ??
                            "home"
                        ),

                        "Выберите 3 общие цели на ближайший год",

                        "Запланируйте одно новое совместное приключение: поездку, курс или проект",
                    ],
                },
            ];
        }, [risks]);

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
                <div className="brand">
                    между нами.
                </div>

                <p>
                    собираем ваш разбор
                </p>

                <style jsx>{`
                    .state {
                        min-height: 100vh;

                        display: grid;
                        place-items: center;
                        align-content: center;

                        gap: 12px;

                        background: #f8f4f1;
                    }

                    .brand {
                        font-family:
                            Georgia,
                            "Times New Roman",
                            serif;

                        font-size: 24px;
                        font-weight: 700;
                    }

                    p {
                        margin: 0;

                        color: #958b8e;

                        font-family:
                            Arial,
                            sans-serif;

                        font-size: 12px;
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
                <div className="brand">
                    между нами.
                </div>

                <p>
                    {error ||
                        "Не получилось загрузить разбор."}
                </p>

                <style jsx>{`
                    .state {
                        min-height: 100vh;

                        display: grid;
                        place-items: center;
                        align-content: center;

                        gap: 12px;

                        padding: 24px;

                        background: #f8f4f1;
                    }

                    .brand {
                        font-family:
                            Georgia,
                            "Times New Roman",
                            serif;

                        font-size: 24px;
                        font-weight: 700;
                    }

                    p {
                        margin: 0;

                        color: #958b8e;

                        font-family:
                            Arial,
                            sans-serif;

                        font-size: 13px;
                    }
                `}</style>
            </main>
        );
    }

    return (
        <main className="page">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <header className="header shell">

                <div className="brand">
                    между нами.
                </div>

                <div className="couple-names">
                    {nameA}

                    <span>
                        ×
                    </span>

                    {nameB}
                </div>

            </header>

            {/* =====================================================
                INTRO
            ===================================================== */}

            <section className="intro shell">

                <div className="section-label">
                    ВАШ ПОЛНЫЙ РАЗБОР
                </div>

                <div className="intro-grid">

                    <div className="intro-main">

                        <h1>
                            Подробный
                            <br />
                            разбор
                        </h1>

                        <p>
                            Здесь — не оценка
                            ваших отношений,
                            а карта того,
                            где вам легко,
                            где вы смотрите
                            на вещи по-разному
                            и что можно
                            попробовать изменить.
                        </p>

                    </div>

                    <aside className="intro-insight">

                        <div className="heart">
                            ♥
                        </div>

                        <p>
                            Сильнее всего
                            сейчас выглядит{" "}

                            <strong>
                                {strongest.title.toLowerCase()}
                            </strong>
                            .
                        </p>

                        <p>
                            Больше внимания
                            требуют{" "}

                            <strong>
                                {risks
                                    .slice(
                                        0,
                                        2
                                    )
                                    .map(
                                        (item) =>
                                            item.title.toLowerCase()
                                    )
                                    .join(
                                        " и "
                                    )}
                            </strong>
                            .
                        </p>

                    </aside>

                </div>

            </section>

            {/* =====================================================
                6 AREAS
            ===================================================== */}

            <section className="section shell">

                <div className="section-head">

                    <div className="section-label">
                        6 СФЕР
                    </div>

                    <h2>
                        Как устроены ваши
                        <br />
                        отношения
                    </h2>

                    <p>
                        Те же показатели,
                        которые вы увидели
                        в результате —
                        теперь как основа
                        для полного разбора.
                    </p>

                </div>

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

            {/* =====================================================
                RISKS
            ===================================================== */}

            <section className="section shell">

                <div className="section-head">

                    <div className="section-label">
                        ГДЕ СЕЙЧАС СЛОЖНЕЕ
                    </div>

                    <h2>
                        Три точки,
                        которые стоит
                        пройти вместе
                    </h2>

                    <p>
                        Это не «плохие»
                        части отношений.
                        Просто именно здесь
                        ваши ответы расходятся
                        сильнее всего.
                    </p>

                </div>

                <div className="risk-grid">

                    {risks.map(
                        (
                            risk,
                            index
                        ) => (
                            <RiskCard
                                key={
                                    risk.id
                                }
                                category={
                                    risk
                                }
                                number={
                                    index +
                                    1
                                }
                            />
                        )
                    )}

                </div>

            </section>

            {/* =====================================================
                BLIND SPOTS
            ===================================================== */}

            <section className="section shell">

                <div className="section-head blind-head">

                    <div className="section-label">
                        СЛЕПЫЕ ЗОНЫ
                    </div>

                    <h2>
                        Где вы можете
                        неправильно
                        понимать друг друга
                    </h2>

                    <p>
                        Здесь особенно
                        интересно не то,
                        кто «прав»,
                        а насколько по-разному
                        вы воспринимаете
                        одну и ту же ситуацию.
                    </p>

                </div>

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
                            Здесь ваши ответы
                            оказались довольно
                            близкими.
                        </div>
                    )}

                </div>

            </section>

            {/* =====================================================
                ROADMAP
            ===================================================== */}

            <section className="roadmap-section shell">

                <div className="section-head">

                    <div className="section-label">
                        ВАШ ПУТЬ ВМЕСТЕ
                    </div>

                    <h2>
                        План на 3 месяца
                    </h2>

                    <p>
                        Не «больше разговаривайте».
                        Только конкретные вещи,
                        которые можно поставить
                        в календарь и сделать.
                    </p>

                </div>

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

            {/* =====================================================
                START TODAY
            ===================================================== */}

            <section className="today shell">

                <div className="section-label">
                    НАЧНИТЕ СЕГОДНЯ
                </div>

                <div className="today-card">

                    <div className="today-copy">

                        <h2>
                            Первый вечер:
                            <br />
                            без угадываний
                        </h2>

                        <p>
                            Сядьте рядом
                            на 20 минут
                            и ответьте
                            по очереди.
                            Не спорьте
                            с ответом партнёра.
                        </p>

                    </div>

                    <div className="today-questions">

                        <QuestionCard
                            number="01"
                            text="Что сейчас делает тебя счастливее в наших отношениях?"
                        />

                        <QuestionCard
                            number="02"
                            text="Чего тебе сейчас не хватает от меня?"
                        />

                        <QuestionCard
                            number="03"
                            text="Что мы можем сделать уже на этой неделе?"
                        />

                    </div>

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

                .page {
                    min-height:
                        100vh;

                    padding-bottom:
                        100px;
                }

                .shell {
                    width:
                        min(
                            1000px,
                            calc(
                                100% -
                                48px
                            )
                        );

                    margin:
                        0 auto;
                }

                /* =================================================
                   HEADER
                ================================================= */

                .header {
                    min-height:
                        82px;

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

                    align-items:
                        center;

                    gap:
                        8px;

                    color:
                        #91878a;

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

                .couple-names span {
                    color:
                        #c51f59;
                }

                /* =================================================
                   COMMON
                ================================================= */

                .section {
                    margin-top:
                        108px;
                }

                .section-label {
                    margin-bottom:
                        16px;

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

                .section-head {
                    max-width:
                        610px;

                    margin-bottom:
                        42px;
                }

                .section-head h2 {
                    margin: 0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        clamp(
                            43px,
                            5vw,
                            60px
                        );

                    line-height:
                        .95;

                    font-weight:
                        400;

                    letter-spacing:
                        -2.4px;
                }

                .section-head p {
                    max-width:
                        530px;

                    margin:
                        18px
                        0
                        0;

                    color:
                        #8b8285;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        13px;

                    line-height:
                        1.55;
                }

                /* =================================================
                   INTRO
                ================================================= */

                .intro {
                    padding-top:
                        62px;
                }

                .intro-grid {
                    display:
                        grid;

                    grid-template-columns:
                        minmax(
                            0,
                            1.3fr
                        )
                        minmax(
                            280px,
                            .7fr
                        );

                    gap:
                        64px;

                    align-items:
                        end;
                }

                .intro-main h1 {
                    margin: 0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        clamp(
                            62px,
                            8vw,
                            92px
                        );

                    line-height:
                        .86;

                    font-weight:
                        400;

                    letter-spacing:
                        -4px;
                }

                .intro-main p {
                    max-width:
                        500px;

                    margin:
                        27px
                        0
                        0;

                    color:
                        #7d7477;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        14px;

                    line-height:
                        1.55;
                }

                .intro-insight {
                    padding:
                        27px;

                    border-radius:
                        24px;

                    background:
                        #f1dee4;
                }

                .heart {
                    margin-bottom:
                        18px;

                    color:
                        #cf3168;

                    font-size:
                        30px;
                }

                .intro-insight p {
                    margin: 0;

                    color:
                        #655b5e;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        13px;

                    line-height:
                        1.55;
                }

                .intro-insight p + p {
                    margin-top:
                        14px;
                }

                /* =================================================
                   SCORES
                ================================================= */

                .score-list {
                    border-top:
                        1px solid
                        #ded7d4;
                }

                /* =================================================
                   RISKS
                ================================================= */

                .risk-grid {
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
                        16px;
                }

                /* =================================================
                   BLIND SPOTS
                ================================================= */

                .blind-head {
                    max-width:
                        660px;
                }

                .blind-list {
                    display:
                        grid;

                    gap:
                        16px;
                }

                .empty {
                    padding:
                        28px;

                    border:
                        1px solid
                        #e5dcda;

                    border-radius:
                        22px;

                    color:
                        #81777a;

                    font-family:
                        Arial,
                        sans-serif;
                }

                /* =================================================
                   ROADMAP
                ================================================= */

                .roadmap-section {
                    margin-top:
                        112px;
                }

                .map {
                    width:
                        100%;

                    overflow:
                        hidden;

                    border-radius:
                        26px;

                    background:
                        #ecd9de;

                    box-shadow:
                        0 14px
                        40px
                        rgba(
                            74,
                            42,
                            52,
                            .08
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
                        16px;

                    margin-top:
                        22px;
                }

                /* =================================================
                   TODAY
                ================================================= */

                .today {
                    margin-top:
                        112px;
                }

                .today-card {
                    padding:
                        34px;

                    border:
                        1px solid
                        #e4dad8;

                    border-radius:
                        28px;

                    background:
                        #fffaf8;
                }

                .today-copy {
                    display:
                        flex;

                    align-items:
                        flex-end;

                    justify-content:
                        space-between;

                    gap:
                        40px;

                    margin-bottom:
                        30px;
                }

                .today-copy h2 {
                    margin:
                        0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        44px;

                    line-height:
                        .95;

                    font-weight:
                        400;

                    letter-spacing:
                        -2px;
                }

                .today-copy p {
                    max-width:
                        330px;

                    margin:
                        0;

                    color:
                        #82797c;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        12px;

                    line-height:
                        1.5;
                }

                .today-questions {
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
                        12px;
                }

                /* =================================================
                   TABLET
                ================================================= */

                @media (
                    max-width:
                        860px
                ) {

                    .intro-grid {
                        grid-template-columns:
                            1fr;

                        gap:
                            30px;
                    }

                    .intro-insight {
                        max-width:
                            500px;
                    }

                    .risk-grid,
                    .month-grid {
                        grid-template-columns:
                            1fr;
                    }

                    .today-copy {
                        display:
                            block;
                    }

                    .today-copy p {
                        margin-top:
                            17px;
                    }

                    .today-questions {
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

                    .page {
                        padding-bottom:
                            60px;
                    }

                    .shell {
                        width:
                            calc(
                                100% -
                                28px
                            );
                    }

                    .header {
                        min-height:
                            66px;
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

                        text-overflow:
                            ellipsis;

                        font-size:
                            8px;
                    }

                    .intro {
                        padding-top:
                            42px;
                    }

                    .intro-main h1 {
                        font-size:
                            55px;

                        letter-spacing:
                            -2.7px;
                    }

                    .intro-main p {
                        font-size:
                            12px;
                    }

                    .section,
                    .roadmap-section,
                    .today {
                        margin-top:
                            82px;
                    }

                    .section-head {
                        margin-bottom:
                            30px;
                    }

                    .section-head h2 {
                        font-size:
                            38px;

                        letter-spacing:
                            -1.6px;
                    }

                    .section-head p {
                        font-size:
                            11px;
                    }

                    .map {
                        border-radius:
                            19px;
                    }

                    .month-grid {
                        margin-top:
                            14px;
                    }

                    .today-card {
                        padding:
                            23px;

                        border-radius:
                            22px;
                    }

                    .today-copy h2 {
                        font-size:
                            34px;
                    }
                }

            `}</style>

        </main>
    );
}

/* ============================================================
   SCORE ROW
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
                        110px;

                    display:
                        grid;

                    grid-template-columns:
                        42px
                        minmax(
                            0,
                            1fr
                        )
                        82px;

                    gap:
                        20px;

                    align-items:
                        center;

                    border-bottom:
                        1px solid
                        #ded7d4;
                }

                .score-symbol {
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
                        #f2dfe4;

                    color:
                        #c9255c;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        19px;
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
                        1;

                    font-weight:
                        400;

                    letter-spacing:
                        -1.2px;
                }

                p {
                    margin:
                        6px
                        0
                        12px;

                    color:
                        #91888b;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        11px;
                }

                .track {
                    height:
                        6px;

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
                        48px;

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
                        18px;
                }

                @media (
                    max-width:
                        640px
                ) {

                    .score-row {
                        min-height:
                            94px;

                        grid-template-columns:
                            32px
                            minmax(
                                0,
                                1fr
                            )
                            58px;

                        gap:
                            11px;
                    }

                    .score-symbol {
                        width:
                            30px;

                        height:
                            30px;

                        font-size:
                            15px;
                    }

                    h3 {
                        font-size:
                            23px;
                    }

                    p {
                        font-size:
                            9px;
                    }

                    .score strong {
                        font-size:
                            36px;
                    }

                    .score span {
                        font-size:
                            13px;
                    }
                }

            `}</style>

        </article>
    );
}

/* ============================================================
   RISK CARD
============================================================ */

function RiskCard({
                      category,
                      number,
                  }: {
    category: CategoryScore;
    number: number;
}) {
    return (
        <article className="risk-card">

            <div className="risk-top">

                <div className="number">
                    {number}
                </div>

                <div className="icon">
                    {getCategoryIcon(
                        category.id
                    )}
                </div>

            </div>

            <h3>
                {category.title}
            </h3>

            <p>
                {getRiskText(
                    category.id
                )}
            </p>

            <div className="score">
                {category.value}
                <span>
                    /10
                </span>
            </div>

            <style jsx>{`

                .risk-card {
                    position:
                        relative;

                    min-height:
                        285px;

                    padding:
                        25px;

                    border:
                        1px solid
                        #e5dcda;

                    border-radius:
                        24px;

                    background:
                        #fffaf8;
                }

                .risk-top {
                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        space-between;
                }

                .number {
                    width:
                        35px;

                    height:
                        35px;

                    display:
                        grid;

                    place-items:
                        center;

                    border-radius:
                        50%;

                    background:
                        #f2dfe4;

                    color:
                        #c51f59;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        17px;
                }

                .icon {
                    color:
                        #c51f59;

                    font-size:
                        20px;
                }

                h3 {
                    margin:
                        28px
                        0
                        13px;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        30px;

                    line-height:
                        1;

                    font-weight:
                        400;
                }

                p {
                    max-width:
                        250px;

                    margin: 0;

                    color:
                        #756d70;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        12px;

                    line-height:
                        1.55;
                }

                .score {
                    position:
                        absolute;

                    right:
                        23px;

                    bottom:
                        20px;

                    color:
                        #c51f59;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        30px;
                }

                .score span {
                    margin-left:
                        2px;

                    color:
                        #8a8284;

                    font-size:
                        13px;
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

            <div className="blind-number">
                0{index + 1}
            </div>

            <div className="blind-content">

                <h3>
                    {item.question}
                </h3>

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

                <p className="insight">
                    {getBlindInsight(
                        item
                    )}
                </p>

            </div>

            <style jsx>{`

                .blind-card {
                    display:
                        grid;

                    grid-template-columns:
                        48px
                        minmax(
                            0,
                            1fr
                        );

                    gap:
                        24px;

                    padding:
                        28px;

                    border:
                        1px solid
                        #e5dcda;

                    border-radius:
                        24px;

                    background:
                        #fffaf8;
                }

                .blind-number {
                    color:
                        #ca275f;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        20px;
                }

                h3 {
                    max-width:
                        700px;

                    margin:
                        0
                        0
                        21px;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        28px;

                    line-height:
                        1.08;

                    font-weight:
                        400;
                }

                .answers {
                    display:
                        grid;

                    grid-template-columns:
                        minmax(
                            0,
                            1fr
                        )
                        42px
                        minmax(
                            0,
                            1fr
                        );

                    gap:
                        12px;

                    align-items:
                        center;
                }

                .answer {
                    min-height:
                        94px;

                    padding:
                        17px;

                    border-radius:
                        17px;

                    background:
                        #f3e5e7;
                }

                .person {
                    display:
                        block;

                    margin-bottom:
                        9px;

                    color:
                        #a08f94;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        9px;

                    font-weight:
                        800;

                    letter-spacing:
                        .8px;

                    text-transform:
                        uppercase;
                }

                strong {
                    color:
                        #352e30;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        13px;

                    line-height:
                        1.45;

                    font-weight:
                        500;
                }

                .arrow {
                    color:
                        #cc275f;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        27px;

                    text-align:
                        center;
                }

                .insight {
                    margin:
                        17px
                        0
                        0;

                    color:
                        #81777a;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        11px;

                    line-height:
                        1.5;
                }

                @media (
                    max-width:
                        620px
                ) {

                    .blind-card {
                        grid-template-columns:
                            1fr;

                        gap:
                            13px;

                        padding:
                            21px;
                    }

                    h3 {
                        font-size:
                            23px;
                    }

                    .answers {
                        grid-template-columns:
                            1fr;
                    }

                    .arrow {
                        transform:
                            rotate(
                                90deg
                            );
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

            <div className="month-head">

                <div className="number">
                    {month.number}
                </div>

                <div>

                    <div className="eyebrow">
                        {month.eyebrow}
                    </div>

                    <h3>
                        {month.title}
                    </h3>

                </div>

            </div>

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

                            <span>
                                {task}
                            </span>

                        </div>
                    )
                )}

            </div>

            <style jsx>{`

                .month-card {
                    padding:
                        25px;

                    border:
                        1px solid
                        #e5dcda;

                    border-radius:
                        24px;

                    background:
                        #fffaf8;
                }

                .month-head {
                    display:
                        flex;

                    gap:
                        13px;

                    align-items:
                        flex-start;
                }

                .number {
                    flex-shrink:
                        0;

                    width:
                        39px;

                    height:
                        39px;

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
                    margin-bottom:
                        5px;

                    color:
                        #c8245c;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        8px;

                    font-weight:
                        800;

                    letter-spacing:
                        1.3px;
                }

                h3 {
                    margin:
                        0;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        25px;

                    line-height:
                        1;

                    font-weight:
                        400;
                }

                .description {
                    min-height:
                        55px;

                    margin:
                        20px
                        0;

                    color:
                        #82787b;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        11px;

                    line-height:
                        1.5;
                }

                .tasks {
                    display:
                        grid;

                    gap:
                        15px;
                }

                .task {
                    display:
                        grid;

                    grid-template-columns:
                        19px
                        minmax(
                            0,
                            1fr
                        );

                    gap:
                        10px;

                    align-items:
                        start;

                    color:
                        #51484a;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        11px;

                    line-height:
                        1.4;
                }

                .checkbox {
                    width:
                        18px;

                    height:
                        18px;

                    border:
                        1.5px solid
                        #d44573;

                    border-radius:
                        5px;
                }

            `}</style>

        </article>
    );
}

/* ============================================================
   QUESTION
============================================================ */

function QuestionCard({
                          number,
                          text,
                      }: {
    number: string;
    text: string;
}) {
    return (
        <div className="question">

            <span>
                {number}
            </span>

            <p>
                {text}
            </p>

            <style jsx>{`

                .question {
                    min-height:
                        126px;

                    padding:
                        18px;

                    border-radius:
                        18px;

                    background:
                        #f2e3e7;
                }

                span {
                    color:
                        #c9245c;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        18px;
                }

                p {
                    margin:
                        16px
                        0
                        0;

                    color:
                        #393234;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        12px;

                    line-height:
                        1.45;
                }

            `}</style>

        </div>
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

function getRiskText(
    id: CategoryId
) {
    switch (id) {
        case "friendship":
            return "Вам может не хватать лёгкости, совместных впечатлений или ощущения, что вместе интересно даже без большой программы.";

        case "partnership":
            return "В некоторых ситуациях вы можете по-разному понимать, что значит быть командой и как принимать решения вдвоём.";

        case "sex":
            return "Ожидания от близости могут различаться: частота, инициатива и то, что помогает каждому чувствовать связь.";

        case "money":
            return "Ваш подход к тратам, безопасности и крупным решениям может создавать напряжение даже тогда, когда сумма сама по себе не главная.";

        case "care":
            return "Вы можете оба стараться заботиться, но показывать это способами, которые партнёр не всегда считывает как поддержку.";

        case "home":
            return "Повседневные обязанности, привычки и ожидания от быта могут незаметно накапливать раздражение.";
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
        return "Здесь вы отвечаете заметно по-разному. В реальной ситуации каждый может считать свою реакцию очевидной — и не понимать, почему партнёр реагирует иначе.";
    }

    if (
        item.similarity ===
        "close"
    ) {
        return "Ваши ответы близки, но не полностью совпадают. Обычно именно такие небольшие различия сложнее всего заметить заранее.";
    }

    return "Здесь вы смотрите на ситуацию довольно похоже.";
}