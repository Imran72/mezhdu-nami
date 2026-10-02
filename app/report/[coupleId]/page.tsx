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

                if (
                    !response.ok
                ) {
                    throw new Error(
                        "Не удалось загрузить полный разбор"
                    );
                }

                const result =
                    (await response.json()) as ApiResponse;

                if (
                    cancelled
                ) {
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
            } catch (
                err
                ) {
                console.error(
                    err
                );

                if (
                    !cancelled
                ) {
                    setError(
                        "Не получилось загрузить разбор."
                    );
                }
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
                        close *
                        0.5
                    ) /
                    total *
                    10
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
                            base +
                            1
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
                        clamp(
                            base
                        ),
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
                            base +
                            2
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
                            base -
                            2
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
                            base +
                            1
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
                            base -
                            1
                        ),
                },
            ];
        }, [
            data,
        ]);

    const sortedCategories =
        useMemo(
            () =>
                [
                    ...categories,
                ].sort(
                    (
                        a,
                        b
                    ) =>
                        a.value -
                        b.value
                ),
            [
                categories,
            ]
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

    const differenceExamples =
        useMemo(() => {
            const direct =
                data
                    ?.highlights
                    ?.different ??
                [];

            if (
                direct.length
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
                    (
                        comparison
                    ) =>
                        comparison.similarity !==
                        "same"
                )
                .slice(
                    0,
                    3
                );
        }, [
            data,
        ]);

    const plan =
        useMemo<
            MonthPlan[]
        >(() => {
            const firstRisk =
                risks[0];

            const secondRisk =
                risks[1];

            const thirdRisk =
                risks[2];

            return [
                {
                    number: 1,

                    eyebrow:
                        "ПЕРВЫЙ МЕСЯЦ",

                    title:
                        "Ближе друг к другу",

                    description:
                        "Возвращаем больше тёплых моментов и внимания друг к другу.",

                    tasks: [
                        "Проведите 3 свидания подряд без телефонов",

                        "Каждый день задавайте друг другу один настоящий вопрос о прошедшем дне",

                        getActionForCategory(
                            firstRisk
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
                        "Не избегаем драконов — разбираем темы, которые могут копить напряжение.",

                    tasks: [
                        getActionForCategory(
                            secondRisk
                                ?.id ??
                            "sex"
                        ),

                        "Обсудите интимные предпочтения: что нравится, сколько близости хочется и как вам комфортно её инициировать",

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
                        "Собираем правила, которые будут работать уже после этих трёх месяцев.",

                    tasks: [
                        getActionForCategory(
                            thirdRisk
                                ?.id ??
                            "home"
                        ),

                        "Выберите 3 общие цели на ближайший год",

                        "Запланируйте одно новое совместное приключение: поездку, курс или проект",
                    ],
                },
            ];
        }, [
            risks,
        ]);

    const nameA =
        data?.couple
            ?.partner_a_name ||
        "Первый партнёр";

    const nameB =
        data?.couple
            ?.partner_b_name ||
        "Второй партнёр";

    if (loading) {
        return (
            <main className="state">

                <div className="state-brand">
                    между нами.
                </div>

                <p>
                    собираем ваш
                    разбор
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
                            14px;

                        background:
                            #f8f4f1;

                        color:
                            #201c1e;

                        font-family:
                            Arial,
                            sans-serif;
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

                    .state p {
                        margin:
                            0;

                        color:
                            #958b8e;

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
                            14px;

                        padding:
                            24px;

                        background:
                            #f8f4f1;

                        color:
                            #201c1e;

                        font-family:
                            Arial,
                            sans-serif;
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

                    .state p {
                        margin:
                            0;

                        color:
                            #958b8e;
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

                    <div>

                        <h1>
                            Подробный
                            <br />
                            разбор
                        </h1>

                        <p className="intro-lead">
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

                    <div className="intro-note">

                        <div className="intro-heart">
                            ♥
                        </div>

                        <p>
                            Сильнее всего
                            сейчас выглядит
                            <b>
                                {" "}
                                {strongest?.title.toLowerCase()}
                            </b>
                            .
                        </p>

                        <p>
                            Больше внимания
                            требуют
                            <b>
                                {" "}
                                {risks
                                    .slice(
                                        0,
                                        2
                                    )
                                    .map(
                                        (
                                            item
                                        ) =>
                                            item.title.toLowerCase()
                                    )
                                    .join(
                                        " и "
                                    )}
                            </b>
                            .
                        </p>

                    </div>

                </div>

            </section>

            {/* =================================================
                SIX AREAS
            ================================================= */}

            <section className="scores-section shell">

                <div className="section-heading">

                    <div className="section-label">
                        6 СФЕР
                    </div>

                    <h2>
                        Как устроены
                        ваши отношения
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

            {/* =================================================
                RISKS
            ================================================= */}

            <section className="risks-section shell">

                <div className="section-heading">

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
                        Просто именно
                        здесь ваши ответы
                        расходятся сильнее.
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

            {/* =================================================
                MISUNDERSTANDINGS
            ================================================= */}

            <section className="misunderstanding-section shell">

                <div className="misunderstanding-heading">

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
                        а насколько
                        по-разному вы
                        воспринимаете
                        одну и ту же ситуацию.
                    </p>

                </div>

                <div className="difference-list">

                    {differenceExamples.length >
                    0 ? (
                        differenceExamples.map(
                            (
                                item
                            ) => (
                                <DifferenceCard
                                    key={
                                        item.questionId
                                    }
                                    item={
                                        item
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
                        <div className="empty-difference">
                            По вашим ответам
                            здесь нет яркого
                            расхождения.
                        </div>
                    )}

                </div>

            </section>

            {/* =================================================
                ROADMAP
            ================================================= */}

            <section className="roadmap-section">

                <div className="roadmap-shell">

                    <div className="roadmap-copy">

                        <div className="section-label">
                            ВАШ ПУТЬ ВМЕСТЕ
                        </div>

                        <h2>
                            План
                            <br />
                            на 3 месяца
                        </h2>

                        <p>
                            Небольшие,
                            но реальные
                            действия.
                            Без «станьте
                            ближе друг к другу».
                            Только то,
                            что можно
                            поставить
                            в календарь
                            и сделать.
                        </p>

                    </div>

                    <div className="roadmap-map">

                        <img
                            src={
                                ROADMAP_IMAGE
                            }
                            alt=""
                            className="roadmap-image"
                        />

                        <div className="you-are-here">
                            <span>
                                сейчас
                            </span>

                            вы здесь
                        </div>

                        <div className="month-pin month-pin-1">
                            <strong>
                                1
                            </strong>

                            <span>
                                месяц
                            </span>
                        </div>

                        <div className="month-pin month-pin-2">
                            <strong>
                                2
                            </strong>

                            <span>
                                месяц
                            </span>
                        </div>

                        <div className="month-pin month-pin-3">
                            <strong>
                                3
                            </strong>

                            <span>
                                месяц
                            </span>
                        </div>

                        <div className="finish-sign">
                            ближе
                            <br />
                            к своему
                            <br />
                            «вместе»
                        </div>

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

                </div>

            </section>

            {/* =================================================
                TODAY
            ================================================= */}

            <section className="today-section shell">

                <div className="section-label">
                    НАЧНИТЕ СЕГОДНЯ
                </div>

                <div className="today-card">

                    <div>

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

                    <div className="questions">

                        <div>
                            01
                            <span>
                                Что сейчас
                                делает тебя
                                счастливее
                                в наших
                                отношениях?
                            </span>
                        </div>

                        <div>
                            02
                            <span>
                                Чего тебе
                                сейчас
                                не хватает
                                от меня?
                            </span>
                        </div>

                        <div>
                            03
                            <span>
                                Что мы можем
                                сделать уже
                                на этой неделе?
                            </span>
                        </div>

                    </div>

                </div>

            </section>

            <style jsx>{`

                :global(*) {
                    box-sizing:
                        border-box;
                }

                :global(body) {
                    margin: 0;

                    background:
                        #f8f4f1;

                    color:
                        #201c1e;
                }

                .page {
                    min-height:
                        100vh;

                    padding-bottom:
                        110px;

                    overflow-x:
                        hidden;

                    background:
                        #f8f4f1;
                }

                .shell {
                    width:
                        min(
                            1040px,
                            calc(
                                100% -
                                56px
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
                        82px;

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
                        #dfd7d4;
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
                        #8e8588;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        10px;

                    font-weight:
                        700;

                    letter-spacing:
                        1.1px;

                    text-transform:
                        uppercase;
                }

                .couple-names span {
                    color:
                        #c21f58;
                }

                /* =============================================
                   SHARED
                ============================================= */

                .section-label {
                    margin-bottom:
                        16px;

                    color:
                        #c21f58;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        10px;

                    font-weight:
                        800;

                    letter-spacing:
                        2.1px;
                }

                .section-heading {
                    max-width:
                        510px;

                    margin-bottom:
                        42px;
                }

                .section-heading h2,
                .misunderstanding-heading h2 {
                    margin:
                        0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        47px;

                    line-height:
                        .98;

                    font-weight:
                        400;

                    letter-spacing:
                        -2px;
                }

                .section-heading p,
                .misunderstanding-heading p {
                    max-width:
                        430px;

                    margin:
                        18px 0 0;

                    color:
                        #8d8487;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        13px;

                    line-height:
                        1.55;
                }

                /* =============================================
                   INTRO
                ============================================= */

                .intro {
                    padding:
                        70px 0
                        20px;
                }

                .intro-grid {
                    display:
                        grid;

                    grid-template-columns:
                        minmax(
                            0,
                            1.25fr
                        )
                        minmax(
                            290px,
                            .75fr
                        );

                    gap:
                        80px;

                    align-items:
                        end;
                }

                .intro h1 {
                    margin:
                        0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        clamp(
                            60px,
                            7vw,
                            90px
                        );

                    line-height:
                        .88;

                    font-weight:
                        400;

                    letter-spacing:
                        -4px;
                }

                .intro-lead {
                    max-width:
                        500px;

                    margin:
                        27px
                        0
                        0;

                    color:
                        #777073;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        15px;

                    line-height:
                        1.55;
                }

                .intro-note {
                    padding:
                        28px;

                    border-radius:
                        24px;

                    background:
                        #f2e0e5;
                }

                .intro-note p {
                    margin:
                        0;

                    color:
                        #625a5d;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        13px;

                    line-height:
                        1.5;
                }

                .intro-note p +
                p {
                    margin-top:
                        13px;
                }

                .intro-heart {
                    margin-bottom:
                        16px;

                    color:
                        #cb3568;

                    font-size:
                        28px;
                }

                /* =============================================
                   SCORES
                ============================================= */

                .scores-section {
                    margin-top:
                        115px;
                }

                .score-list {
                    border-top:
                        1px solid
                        #ded7d4;
                }

                /* =============================================
                   RISKS
                ============================================= */

                .risks-section {
                    margin-top:
                        130px;
                }

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
                        18px;
                }

                /* =============================================
                   DIFFERENCE
                ============================================= */

                .misunderstanding-section {
                    margin-top:
                        135px;

                    display:
                        grid;

                    grid-template-columns:
                        330px
                        minmax(
                            0,
                            1fr
                        );

                    gap:
                        72px;

                    align-items:
                        start;
                }

                .difference-list {
                    display:
                        grid;

                    gap:
                        14px;
                }

                .empty-difference {
                    padding:
                        28px;

                    border:
                        1px solid
                        #e8dfdc;

                    border-radius:
                        22px;

                    color:
                        #8c8386;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        13px;
                }

                /* =============================================
                   ROADMAP
                ============================================= */

                .roadmap-section {
                    width:
                        min(
                            1180px,
                            calc(
                                100% -
                                38px
                            )
                        );

                    margin:
                        145px
                        auto
                        0;
                }

                .roadmap-shell {
                    position:
                        relative;

                    overflow:
                        hidden;

                    padding:
                        52px
                        46px
                        38px;

                    border-radius:
                        32px;

                    background:
                        #f4dce2;

                    box-shadow:
                        0 20px
                        60px
                        rgba(
                            91,
                            45,
                            58,
                            .08
                        );
                }

                .roadmap-copy {
                    position:
                        relative;

                    z-index:
                        6;

                    max-width:
                        380px;

                    padding-bottom:
                        28px;
                }

                .roadmap-copy h2 {
                    margin:
                        0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        62px;

                    line-height:
                        .91;

                    font-weight:
                        400;

                    letter-spacing:
                        -3px;
                }

                .roadmap-copy p {
                    max-width:
                        330px;

                    margin:
                        20px
                        0
                        0;

                    color:
                        #76686d;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        13px;

                    line-height:
                        1.5;
                }

                .roadmap-map {
                    position:
                        relative;

                    width:
                        100%;

                    margin-top:
                        10px;

                    aspect-ratio:
                        1200 /
                        420;

                    overflow:
                        hidden;

                    border-radius:
                        25px;

                    background:
                        #f7cbd6;
                }

                .roadmap-image {
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

                    display:
                        block;
                }

                .you-are-here,
                .finish-sign {
                    position:
                        absolute;

                    z-index:
                        5;

                    padding:
                        10px
                        14px;

                    border:
                        3px solid
                        #4c2832;

                    background:
                        #f4cfae;

                    color:
                        #4c2832;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        10px;

                    line-height:
                        1.25;

                    font-weight:
                        800;

                    text-align:
                        center;

                    text-transform:
                        uppercase;

                    box-shadow:
                        4px
                        4px
                        0
                        rgba(
                            75,
                            37,
                            49,
                            .16
                        );
                }

                .you-are-here {
                    left:
                        2.5%;

                    bottom:
                        8%;
                }

                .you-are-here span {
                    display:
                        block;

                    color:
                        #c42059;

                    font-size:
                        8px;
                }

                .finish-sign {
                    top:
                        7%;

                    right:
                        2.5%;
                }

                .month-pin {
                    position:
                        absolute;

                    z-index:
                        6;

                    display:
                        grid;

                    justify-items:
                        center;
                }

                .month-pin strong {
                    width:
                        44px;

                    height:
                        44px;

                    display:
                        grid;

                    place-items:
                        center;

                    border:
                        4px solid
                        #fff0f2;

                    border-radius:
                        10px;

                    background:
                        #b92357;

                    color:
                        white;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        23px;

                    box-shadow:
                        0 6px
                        0
                        rgba(
                            90,
                            31,
                            51,
                            .2
                        );
                }

                .month-pin span {
                    margin-top:
                        7px;

                    padding:
                        5px
                        8px;

                    border-radius:
                        6px;

                    background:
                        #fff3eb;

                    color:
                        #70283f;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        8px;

                    font-weight:
                        800;

                    text-transform:
                        uppercase;
                }

                .month-pin-1 {
                    left:
                        39%;

                    bottom:
                        25%;
                }

                .month-pin-2 {
                    left:
                        61%;

                    bottom:
                        45%;
                }

                .month-pin-3 {
                    left:
                        80%;

                    bottom:
                        59%;
                }

                .month-grid {
                    position:
                        relative;

                    z-index:
                        7;

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

                    margin-top:
                        20px;
                }

                /* =============================================
                   TODAY
                ============================================= */

                .today-section {
                    margin-top:
                        120px;
                }

                .today-card {
                    display:
                        grid;

                    grid-template-columns:
                        320px
                        minmax(
                            0,
                            1fr
                        );

                    gap:
                        60px;

                    padding:
                        38px;

                    border:
                        1px solid
                        #e8dedb;

                    border-radius:
                        28px;

                    background:
                        #fffaf7;
                }

                .today-card h2 {
                    margin:
                        0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        38px;

                    line-height:
                        .98;

                    font-weight:
                        400;

                    letter-spacing:
                        -1.7px;
                }

                .today-card p {
                    margin:
                        16px 0 0;

                    color:
                        #81777a;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        12px;

                    line-height:
                        1.5;
                }

                .questions {
                    display:
                        grid;

                    gap:
                        10px;
                }

                .questions div {
                    display:
                        grid;

                    grid-template-columns:
                        34px
                        1fr;

                    gap:
                        13px;

                    align-items:
                        start;

                    padding:
                        15px
                        17px;

                    border-radius:
                        17px;

                    background:
                        #f5e7ea;

                    color:
                        #c21f58;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        17px;
                }

                .questions span {
                    color:
                        #393033;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        12px;

                    line-height:
                        1.4;
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
                            35px;
                    }

                    .intro-note {
                        max-width:
                            520px;
                    }

                    .risk-grid {
                        grid-template-columns:
                            1fr;
                    }

                    .misunderstanding-section {
                        grid-template-columns:
                            1fr;

                        gap:
                            38px;
                    }

                    .misunderstanding-heading {
                        max-width:
                            520px;
                    }

                    .month-grid {
                        grid-template-columns:
                            1fr;
                    }

                    .today-card {
                        grid-template-columns:
                            1fr;

                        gap:
                            30px;
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

                        text-overflow:
                            ellipsis;

                        white-space:
                            nowrap;

                        font-size:
                            8px;
                    }

                    .intro {
                        padding-top:
                            42px;
                    }

                    .intro h1 {
                        font-size:
                            54px;

                        letter-spacing:
                            -2.5px;
                    }

                    .intro-lead {
                        font-size:
                            13px;
                    }

                    .scores-section,
                    .risks-section,
                    .misunderstanding-section {
                        margin-top:
                            86px;
                    }

                    .section-heading h2,
                    .misunderstanding-heading h2 {
                        font-size:
                            37px;

                        letter-spacing:
                            -1.5px;
                    }

                    .roadmap-section {
                        width:
                            calc(
                                100% -
                                16px
                            );

                        margin-top:
                            92px;
                    }

                    .roadmap-shell {
                        padding:
                            31px
                            16px
                            18px;

                        border-radius:
                            24px;
                    }

                    .roadmap-copy {
                        padding:
                            0
                            8px
                            20px;
                    }

                    .roadmap-copy h2 {
                        font-size:
                            46px;

                        letter-spacing:
                            -2px;
                    }

                    .roadmap-map {
                        aspect-ratio:
                            1.15 /
                            1;

                        border-radius:
                            18px;
                    }

                    .roadmap-image {
                        object-fit:
                            cover;

                        object-position:
                            48%
                            50%;
                    }

                    .month-pin-1 {
                        left:
                            28%;

                        bottom:
                            21%;
                    }

                    .month-pin-2 {
                        left:
                            55%;

                        bottom:
                            42%;
                    }

                    .month-pin-3 {
                        left:
                            75%;

                        bottom:
                            60%;
                    }

                    .month-pin strong {
                        width:
                            36px;

                        height:
                            36px;

                        font-size:
                            19px;
                    }

                    .you-are-here,
                    .finish-sign {
                        font-size:
                            7px;

                        border-width:
                            2px;

                        padding:
                            7px
                            8px;
                    }

                    .today-section {
                        margin-top:
                            86px;
                    }

                    .today-card {
                        padding:
                            25px;

                        border-radius:
                            22px;
                    }

                    .today-card h2 {
                        font-size:
                            33px;
                    }
                }

            `}</style>

        </main>
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

            <div className="score-icon">
                {getCategoryIcon(
                    category.id
                )}
            </div>

            <div className="score-copy">

                <h3>
                    {category.title}
                </h3>

                <p>
                    {category.subtitle}
                </p>

                <div className="score-track">

                    <div
                        className="score-fill"
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

            <div className="score-number">

                <strong>
                    {category.value}
                </strong>

                <span>
                    /10
                </span>

            </div>

            <style jsx>{`

                .score-row {
                    display:
                        grid;

                    grid-template-columns:
                        44px
                        minmax(
                            0,
                            1fr
                        )
                        88px;

                    gap:
                        20px;

                    align-items:
                        center;

                    min-height:
                        112px;

                    border-bottom:
                        1px solid
                        #ded7d4;
                }

                .score-icon {
                    width:
                        40px;

                    height:
                        40px;

                    display:
                        grid;

                    place-items:
                        center;

                    border-radius:
                        50%;

                    background:
                        #f5e2e7;

                    color:
                        #c9215a;

                    font-size:
                        19px;
                }

                .score-copy h3 {
                    margin:
                        0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        31px;

                    line-height:
                        1;

                    font-weight:
                        400;

                    letter-spacing:
                        -1.2px;
                }

                .score-copy p {
                    margin:
                        6px
                        0
                        13px;

                    color:
                        #92898c;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        11px;
                }

                .score-track {
                    width:
                        100%;

                    height:
                        6px;

                    overflow:
                        hidden;

                    border-radius:
                        99px;

                    background:
                        #e5dfe0;
                }

                .score-fill {
                    height:
                        100%;

                    border-radius:
                        inherit;

                    background:
                        #cf356b;
                }

                .score-number {
                    display:
                        flex;

                    align-items:
                        baseline;

                    justify-content:
                        flex-end;

                    color:
                        #827a7c;

                    font-family:
                        Georgia,
                        serif;
                }

                .score-number strong {
                    color:
                        #c51f58;

                    font-size:
                        50px;

                    line-height:
                        1;

                    font-weight:
                        400;
                }

                .score-number span {
                    margin-left:
                        4px;

                    font-size:
                        20px;
                }

                @media (
                    max-width:
                        640px
                ) {

                    .score-row {
                        grid-template-columns:
                            34px
                            minmax(
                                0,
                                1fr
                            )
                            58px;

                        gap:
                            12px;

                        min-height:
                            100px;
                    }

                    .score-icon {
                        width:
                            32px;

                        height:
                            32px;

                        font-size:
                            15px;
                    }

                    .score-copy h3 {
                        font-size:
                            24px;
                    }

                    .score-copy p {
                        font-size:
                            9px;
                    }

                    .score-number strong {
                        font-size:
                            38px;
                    }

                    .score-number span {
                        font-size:
                            14px;
                    }
                }

            `}</style>

        </article>
    );
}

/* ============================================================
   RISK
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

                <span className="risk-number">
                    {number}
                </span>

                <span className="risk-icon">
                    {getCategoryIcon(
                        category.id
                    )}
                </span>

            </div>

            <h3>
                {category.title}
            </h3>

            <p>
                {getRiskText(
                    category.id
                )}
            </p>

            <div className="risk-score">
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
                        270px;

                    padding:
                        25px;

                    overflow:
                        hidden;

                    border:
                        1px solid
                        #eadfdd;

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

                .risk-number {
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
                        #f5e3e8;

                    color:
                        #c31f59;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        17px;
                }

                .risk-icon {
                    color:
                        #c31f59;

                    font-size:
                        22px;
                }

                h3 {
                    margin:
                        26px
                        0
                        10px;

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
                        250px;

                    margin:
                        0;

                    color:
                        #7d7376;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        12px;

                    line-height:
                        1.5;
                }

                .risk-score {
                    position:
                        absolute;

                    right:
                        22px;

                    bottom:
                        17px;

                    color:
                        #c31f59;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        28px;
                }

                .risk-score span {
                    margin-left:
                        2px;

                    color:
                        #8d8587;

                    font-size:
                        13px;
                }

            `}</style>

        </article>
    );
}

/* ============================================================
   DIFFERENCE
============================================================ */

function DifferenceCard({
                            item,
                            nameA,
                            nameB,
                        }: {
    item: Comparison;
    nameA: string;
    nameB: string;
}) {
    return (
        <article className="difference-card">

            <div className="difference-question">
                {item.question}
            </div>

            <div className="difference-grid">

                <div>

                    <span>
                        {nameA}
                    </span>

                    <strong>
                        {item.labelA}
                    </strong>

                </div>

                <div className="difference-arrow">
                    →
                </div>

                <div>

                    <span>
                        {nameB}
                    </span>

                    <strong>
                        {item.labelB}
                    </strong>

                </div>

            </div>

            <style jsx>{`

                .difference-card {
                    padding:
                        24px;

                    border:
                        1px solid
                        #e8dfdc;

                    border-radius:
                        22px;

                    background:
                        #fffaf8;
                }

                .difference-question {
                    margin-bottom:
                        20px;

                    color:
                        #2b2426;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        21px;

                    line-height:
                        1.1;
                }

                .difference-grid {
                    display:
                        grid;

                    grid-template-columns:
                        minmax(
                            0,
                            1fr
                        )
                        28px
                        minmax(
                            0,
                            1fr
                        );

                    gap:
                        12px;

                    align-items:
                        center;
                }

                .difference-grid > div:not(
                    .difference-arrow
                ) {
                    min-height:
                        96px;

                    padding:
                        15px;

                    border-radius:
                        15px;

                    background:
                        #f5e9e8;
                }

                span {
                    display:
                        block;

                    margin-bottom:
                        8px;

                    color:
                        #a08f94;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        9px;

                    font-weight:
                        700;

                    letter-spacing:
                        .5px;

                    text-transform:
                        uppercase;
                }

                strong {
                    color:
                        #332a2d;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        12px;

                    line-height:
                        1.4;

                    font-weight:
                        500;
                }

                .difference-arrow {
                    color:
                        #c4225a;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        24px;

                    text-align:
                        center;
                }

                @media (
                    max-width:
                        520px
                ) {

                    .difference-grid {
                        grid-template-columns:
                            1fr;
                    }

                    .difference-arrow {
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
   MONTH
============================================================ */

function MonthCard({
                       month,
                   }: {
    month: MonthPlan;
}) {
    return (
        <article className="month-card">

            <div className="month-head">

                <div className="month-number">
                    {month.number}
                </div>

                <div>

                    <div className="month-eyebrow">
                        {month.eyebrow}
                    </div>

                    <h3>
                        {month.title}
                    </h3>

                </div>

            </div>

            <p className="month-description">
                {month.description}
            </p>

            <div className="tasks">

                {month.tasks.map(
                    (
                        task
                    ) => (
                        <label
                            key={
                                task
                            }
                        >

                            <span className="checkbox" />

                            <span>
                                {task}
                            </span>

                        </label>
                    )
                )}

            </div>

            <style jsx>{`

                .month-card {
                    min-height:
                        300px;

                    padding:
                        24px;

                    border-radius:
                        22px;

                    background:
                        rgba(
                            255,
                            250,
                            248,
                            .95
                        );

                    box-shadow:
                        0 10px
                        30px
                        rgba(
                            96,
                            52,
                            65,
                            .07
                        );
                }

                .month-head {
                    display:
                        flex;

                    gap:
                        13px;

                    align-items:
                        flex-start;
                }

                .month-number {
                    flex-shrink:
                        0;

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
                        #c2235b;

                    color:
                        white;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        19px;
                }

                .month-eyebrow {
                    margin-bottom:
                        5px;

                    color:
                        #c2235b;

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
                        24px;

                    line-height:
                        1;

                    font-weight:
                        400;
                }

                .month-description {
                    margin:
                        18px
                        0;

                    color:
                        #837679;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        11px;

                    line-height:
                        1.45;
                }

                .tasks {
                    display:
                        grid;

                    gap:
                        13px;
                }

                label {
                    display:
                        grid;

                    grid-template-columns:
                        18px
                        minmax(
                            0,
                            1fr
                        );

                    gap:
                        9px;

                    align-items:
                        start;

                    color:
                        #514649;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        11px;

                    line-height:
                        1.35;
                }

                .checkbox {
                    width:
                        17px;

                    height:
                        17px;

                    border:
                        1.5px solid
                        #d6537e;

                    border-radius:
                        5px;
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
            return "🤝";

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
            return "Ожидания от близости могут различаться: частота, инициатива, внимание и то, что помогает чувствовать связь.";

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
            return "Поговорите о том, как каждый понимает комфортную близость, инициативу и частоту";

        case "money":
            return "Устройте финансовый вечер: обсудите траты, личные деньги, накопления и крупные покупки";

        case "care":
            return "Каждый назовите 3 действия партнёра, после которых вы особенно чувствуете заботу";

        case "home":
            return "Выпишите регулярные бытовые задачи и перераспределите хотя бы три из них";
    }
}