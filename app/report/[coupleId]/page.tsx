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
        useMemo(
            () =>
                [...categories].sort(
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
                            13px;
                    }
                `}</style>

            </main>
        );
    }

    return (
        <main className="page">

            {/* =================================================
                HEADER
            ================================================= */}

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

            {/* =================================================
                INTRO
            ================================================= */}

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
                            Здесь — не оценка ваших
                            отношений, а карта того,
                            где вам легко, где вы
                            смотрите на вещи по-разному
                            и что можно попробовать
                            изменить.
                        </p>

                    </div>

                    <aside className="intro-insight">

                        <div className="heart">
                            ♥
                        </div>

                        <p>
                            Сильнее всего сейчас
                            выглядит{" "}

                            <strong>
                                {strongest.title.toLowerCase()}
                            </strong>
                            .
                        </p>

                        <p>
                            Больше внимания требуют{" "}

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

            {/* =================================================
                6 AREAS
            ================================================= */}

            <section className="section shell">

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
                RISKS
            ================================================= */}

            <section className="section shell">

                <SectionHeading
                    label="ГДЕ СЕЙЧАС СЛОЖНЕЕ"
                    title={
                        <>
                            Три точки, которые
                            <br />
                            стоит пройти вместе
                        </>
                    }
                    description="Это не «плохие» части отношений. Просто именно здесь ваши ответы расходятся сильнее всего."
                />

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

            {/* =================================================
                BLIND SPOTS
            ================================================= */}

            <section className="section shell">

                <SectionHeading
                    label="СЛЕПЫЕ ЗОНЫ"
                    title={
                        <>
                            Где вы можете
                            <br />
                            неправильно понимать
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
                            Здесь ваши ответы
                            оказались довольно
                            близкими.
                        </div>
                    )}

                </div>

            </section>

            {/* =================================================
                ROADMAP
            ================================================= */}

            <section className="section roadmap-section shell">

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

            {/* =================================================
                TODAY
            ================================================= */}

            <section className="section today shell">

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
                        72px;
                }

                /*
                 * ЧУТЬ ШИРЕ.
                 *
                 * Из-за этого карточки
                 * перестают быть узкими.
                 */
                .shell {
                    width:
                        min(
                            1140px,
                            calc(
                                100% -
                                48px
                            )
                        );

                    margin:
                        0 auto;
                }

                /* =============================================
                   HEADER
                ============================================= */

                .header {
                    min-height:
                        76px;

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
                    min-width: 0;

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

                /* =============================================
                   COMMON
                ============================================= */

                /*
                 * БЫЛО 108px+
                 * ТЕПЕРЬ 72px
                 */
                .section {
                    margin-top:
                        72px;
                }

                .section-label {
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

                /*
                 * Заголовок и сам контент
                 * ближе друг к другу.
                 */
                :global(.section-heading) {
                    max-width:
                        650px;

                    margin-bottom:
                        30px;
                }

                /* =============================================
                   INTRO
                ============================================= */

                .intro {
                    padding-top:
                        46px;
                }

                .intro-grid {
                    display:
                        grid;

                    grid-template-columns:
                        minmax(
                            0,
                            1.35fr
                        )
                        minmax(
                            300px,
                            .65fr
                        );

                    gap:
                        54px;

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
                            60px,
                            7vw,
                            88px
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
                        530px;

                    margin:
                        22px
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
                        25px;

                    border-radius:
                        23px;

                    background:
                        #f1dee4;
                }

                .heart {
                    margin-bottom:
                        15px;

                    color:
                        #cf3168;

                    font-size:
                        28px;
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
                        1.5;
                }

                .intro-insight p + p {
                    margin-top:
                        12px;
                }

                /* =============================================
                   SCORE
                ============================================= */

                .score-list {
                    border-top:
                        1px solid
                        #ded7d4;
                }

                /* =============================================
                   RISK
                ============================================= */

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
                        14px;

                    /*
                     * Не растягиваем
                     * все карточки по самой высокой.
                     */
                    align-items:
                        start;
                }

                /* =============================================
                   BLIND
                ============================================= */

                .blind-list {
                    display:
                        grid;

                    gap:
                        13px;
                }

                .empty {
                    padding:
                        26px;

                    border:
                        1px solid
                        #e5dcda;

                    border-radius:
                        21px;

                    color:
                        #81777a;

                    font-family:
                        Arial,
                        sans-serif;
                }

                /* =============================================
                   ROADMAP
                ============================================= */

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
                        24px;

                    background:
                        #ecd9de;

                    box-shadow:
                        0 12px
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

                /*
                 * Карточки максимально близко
                 * к самой карте.
                 */
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
                        12px;

                    margin-top:
                        14px;

                    align-items:
                        start;
                }

                /* =============================================
                   TODAY
                ============================================= */

                .today {
                    margin-top:
                        76px;
                }

                .today-card {
                    padding:
                        30px;

                    border:
                        1px solid
                        #e4dad8;

                    border-radius:
                        26px;

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
                        36px;

                    margin-bottom:
                        24px;
                }

                .today-copy h2 {
                    margin: 0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        42px;

                    line-height:
                        .95;

                    font-weight:
                        400;

                    letter-spacing:
                        -1.9px;
                }

                .today-copy p {
                    max-width:
                        340px;

                    margin: 0;

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
                        10px;
                }

                /* =============================================
                   TABLET
                ============================================= */

                @media (
                    max-width:
                        900px
                ) {

                    .intro-grid {
                        grid-template-columns:
                            1fr;

                        gap:
                            25px;
                    }

                    .intro-insight {
                        max-width:
                            500px;
                    }

                    .risk-grid {
                        grid-template-columns:
                            1fr;
                    }

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
                            15px;
                    }

                    .today-questions {
                        grid-template-columns:
                            1fr;
                    }
                }

                /* =============================================
                   MOBILE
                ============================================= */

                @media (
                    max-width:
                        640px
                ) {

                    .page {
                        padding-bottom:
                            50px;
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
                            64px;
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
                            34px;
                    }

                    .intro-main h1 {
                        font-size:
                            53px;

                        letter-spacing:
                            -2.6px;
                    }

                    .intro-main p {
                        font-size:
                            12px;
                    }

                    /*
                     * На мобиле ещё плотнее.
                     */
                    .section,
                    .roadmap-section,
                    .today {
                        margin-top:
                            56px;
                    }

                    :global(.section-heading) {
                        margin-bottom:
                            23px;
                    }

                    .map {
                        border-radius:
                            18px;
                    }

                    .month-grid {
                        margin-top:
                            10px;
                    }

                    .today-card {
                        padding:
                            21px;

                        border-radius:
                            21px;
                    }

                    .today-copy h2 {
                        font-size:
                            33px;
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
    title: React.ReactNode;
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
                        650px;

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
                            42px,
                            4.7vw,
                            56px
                        );

                    line-height:
                        .96;

                    font-weight:
                        400;

                    letter-spacing:
                        -2.2px;
                }

                p {
                    max-width:
                        520px;

                    margin:
                        15px
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
                        1.5;
                }

                @media (
                    max-width:
                        640px
                ) {

                    .section-heading {
                        margin-bottom:
                            23px;
                    }

                    h2 {
                        font-size:
                            36px;

                        letter-spacing:
                            -1.5px;
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
                        98px;

                    display:
                        grid;

                    grid-template-columns:
                        40px
                        minmax(
                            0,
                            1fr
                        )
                        80px;

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
                        28px;

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
                        45px;

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
                            88px;

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
                        250px;

                    padding:
                        23px;

                    border:
                        1px solid
                        #e5dcda;

                    border-radius:
                        22px;

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
                        34px;

                    height:
                        34px;

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
                        16px;
                }

                .icon {
                    color:
                        #c51f59;

                    font-size:
                        19px;
                }

                h3 {
                    margin:
                        24px
                        0
                        11px;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        28px;

                    line-height:
                        1;

                    font-weight:
                        400;
                }

                p {
                    max-width:
                        270px;

                    margin:
                        0
                        0
                        40px;

                    color:
                        #756d70;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        12px;

                    line-height:
                        1.5;
                }

                .score {
                    position:
                        absolute;

                    right:
                        21px;

                    bottom:
                        18px;

                    color:
                        #c51f59;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        28px;
                }

                .score span {
                    margin-left:
                        2px;

                    color:
                        #8a8284;

                    font-size:
                        12px;
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
                    width:
                        100%;

                    min-width:
                        0;

                    display:
                        grid;

                    grid-template-columns:
                        42px
                        minmax(
                            0,
                            1fr
                        );

                    gap:
                        20px;

                    padding:
                        25px;

                    overflow:
                        hidden;

                    border:
                        1px solid
                        #e5dcda;

                    border-radius:
                        22px;

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
                        19px;
                }

                .blind-content {
                    min-width:
                        0;
                }

                h3 {
                    max-width:
                        780px;

                    margin:
                        0
                        0
                        18px;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        27px;

                    line-height:
                        1.08;

                    font-weight:
                        400;
                }

                .answers {
                    min-width:
                        0;

                    display:
                        grid;

                    grid-template-columns:
                        minmax(
                            0,
                            1fr
                        )
                        34px
                        minmax(
                            0,
                            1fr
                        );

                    gap:
                        10px;

                    align-items:
                        center;
                }

                .answer {
                    min-width:
                        0;

                    min-height:
                        86px;

                    padding:
                        15px;

                    border-radius:
                        15px;

                    background:
                        #f3e5e7;
                }

                .person {
                    display:
                        block;

                    margin-bottom:
                        7px;

                    overflow:
                        hidden;

                    text-overflow:
                        ellipsis;

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

                    white-space:
                        nowrap;
                }

                strong {
                    display:
                        block;

                    max-width:
                        100%;

                    color:
                        #352e30;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        12px;

                    line-height:
                        1.4;

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
                        25px;

                    text-align:
                        center;
                }

                .insight {
                    margin:
                        14px
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
                            10px;

                        padding:
                            19px;
                    }

                    h3 {
                        font-size:
                            22px;
                    }

                    .answers {
                        grid-template-columns:
                            1fr;
                    }

                    .arrow {
                        height:
                            20px;

                        line-height:
                            20px;

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

            {/*
                НОМЕР И ЛЕЙБЛ СВЕРХУ.

                Они больше не отнимают
                ширину у заголовка.
            */}

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
                        23px;

                    border:
                        1px solid
                        #e5dcda;

                    border-radius:
                        22px;

                    background:
                        #fffaf8;
                }

                .month-top {
                    min-height:
                        40px;

                    display:
                        flex;

                    align-items:
                        center;

                    gap:
                        12px;

                    margin-bottom:
                        16px;
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

                /*
                 * Теперь заголовок
                 * имеет ВСЮ ширину карточки.
                 */
                h3 {
                    max-width:
                        100%;

                    margin:
                        0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        29px;

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
                        #82787b;

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
                    min-width:
                        0;

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
                    min-width:
                        0;

                    color:
                        #51484a;

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

                @media (
                    max-width:
                        900px
                ) {

                    .month-card {
                        padding:
                            22px;
                    }

                    h3 {
                        font-size:
                            28px;
                    }
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
                        112px;

                    padding:
                        17px;

                    border-radius:
                        17px;

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
                        17px;
                }

                p {
                    margin:
                        13px
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
                        1.42;
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