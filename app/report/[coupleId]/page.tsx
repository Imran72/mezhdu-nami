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

        let retryTimer: ReturnType<typeof setTimeout> | undefined;
        let attempts = 0;
        async function load() {
            retryTimer = undefined;
            try {
                const response =
                    await fetch(
                        `/api/report?id=${encodeURIComponent(
                            coupleId
                        )}&full=1`,
                        {
                            cache:
                                "no-store",
                        }
                    );

                if (response.status === 402) {
                    const reason = await response.json();
                    if (!cancelled && reason.error === "payment_pending" && attempts++ < 10) {
                        retryTimer = setTimeout(load, 3000);
                        return;
                    }
                    if (!cancelled) { setError("Оплата ещё не подтверждена. Если вы уже оплатили, попробуйте проверить снова через несколько секунд."); setLoading(false); }
                    return;
                }
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
                if (!cancelled && !retryTimer) {
                    setLoading(false);
                }
            }
        }

        load();

        return () => {
            cancelled = true;
            clearTimeout(retryTimer);
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
                        min-height: 100vh;

                        display: grid;
                        place-items: center;
                        align-content: center;

                        gap: 12px;

                        background: #f8f4f1;
                    }

                    .state-brand {
                        font-family: inherit;

                        font-size: 24px;

                        font-weight: 700;
                    }

                    p {
                        margin: 0;

                        color: #958b8e;

                        font-family: inherit;

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

                <div className="state-brand">
                    между нами.
                </div>

                <p>
                    {error ||
                        "Не получилось загрузить разбор."}
                </p>

                <button type="button" onClick={() => window.location.reload()}>Проверить снова</button>
                <a href={`/result/${coupleId}`}>Вернуться к результату и оплате</a>

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

                    .state-brand {
                        font-family: inherit;

                        font-size: 24px;

                        font-weight: 700;
                    }

                    p {
                        margin: 0;

                        color: #958b8e;

                        font-family: inherit;

                        font-size: 13px;
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

            <header className="report-header result-header-shell">

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
                INTRO
            ================================================= */}

            <section className="intro report-shell">

                <div className="intro-grid">

                    <div className="intro-main">

                        <h1>
                            Ваш план на 3 месяца
                        </h1>

                        <p>
                            Три месяца. Девять шагов. В вашем темпе.
                        </p>

                    </div>

                    <aside className="intro-insight" aria-label="Главное про вас">
                        <div className="insight-item">
                            <span>ВАША ОПОРА</span>
                            <strong>{strongest.title}</strong>
                        </div>
                        <div className="insight-item">
                            <span>ЗОНА ВНИМАНИЯ</span>
                            <strong>{weakest.map(item => item.title).join(" и ")}</strong>
                        </div>
                    </aside>

                </div>

            </section>

            {/* =================================================
                ПЛАН
            ================================================= */}

            <section className="report-section roadmap-section report-shell">

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
                            coupleId={coupleId}
                            />
                        )
                    )}

                </div>

            </section>

            <style jsx>{`

                :global(*) {
                    box-sizing: border-box;
                }

                :global(html) {
                    background: #f8f4f1;
                }

                :global(body) {
                    margin: 0;

                    background: #f8f4f1;

                    color: #211d1f;
                }

                .report-page {
                    width: 100%;

                    min-height: 100vh;

                    padding-bottom: 72px;

                    background: #f8f4f1;
                }

                /* =================================================
                   ОСНОВНОЙ КОНТЕНТ ПЛАТНОГО ОТЧЁТА
                ================================================= */

                .report-shell {
                    width:
                        min(
                            920px,
                            calc(
                                100% -
                                56px
                            )
                        );

                    max-width: 920px;

                    min-height: 0;

                    height: auto;

                    margin:
                        0 auto;

                    padding: 0;
                }

                /* =================================================
                   HEADER

                   ВАЖНО:
                   геометрия такая же, как на странице результатов.
                ================================================= */

                .result-header-shell {
                    width:
                        min(
                            920px,
                            calc(
                                100% -
                                56px
                            )
                        );

                    max-width: none;

                    min-height: 0;

                    height: auto;

                    margin:
                        0 auto;

                    padding: 0;
                }

                .report-header {
                    min-height: 78px;

                    display: flex;

                    align-items: center;

                    justify-content: space-between;

                    gap: 24px;

                    /*
                     * Полоску специально убрали.
                     */
                    border-bottom: 0;
                }

                .brand {
                    flex-shrink: 0;

                    font-family: inherit;

                    font-size: 24px;

                    line-height: 1;

                    font-weight: 700;

                    letter-spacing: -1.1px;
                }

                .couple-names {
                    min-width: 0;

                    display: flex;

                    align-items: center;

                    justify-content: flex-end;

                    gap: 9px;

                    color: #8f8588;

                    font-family: inherit;

                    font-size: 10px;

                    font-weight: 700;

                    letter-spacing: 1.2px;

                    text-transform: uppercase;
                }

                .person-name {
                    min-width: 0;

                    overflow: hidden;

                    text-overflow: ellipsis;

                    white-space: nowrap;
                }

                .couple-cross {
                    flex-shrink: 0;

                    color: #c51f59;

                    font-size: 12px;

                    font-weight: 700;
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
                    display: grid;

                    grid-template-columns:
                        minmax(
                            0,
                            1.15fr
                        )
                        minmax(
                            340px,
                            .85fr
                        );

                    gap: 72px;

                    align-items: center;
                }

                .intro-main h1 {
                    margin: 0;

                    font-family: inherit;

                    font-size:
                        clamp(
                            58px,
                            6.2vw,
                            76px
                        );

                    line-height: .96;

                    font-weight: 400;

                    letter-spacing: -2.6px;
                }

                .intro-main p {
                    max-width: 590px;

                    margin:
                        25px
                        0
                        0;

                    color: #7b7275;

                    font-family: inherit;
                }

                .intro-insight h2 {
                    margin:
                        0
                        0
                        21px;

                    color: #322a2d;

                    font-family: inherit;

                    line-height: 1;

                    letter-spacing: -.8px;
                }

                /* =================================================
                   ОБЩИЕ СЕКЦИИ
                ================================================= */

                .report-section {
                    min-height: 0;

                    height: auto;

                    margin-top: 70px;

                    padding: 0;
                }

                /* =================================================
                   СЛЕПЫЕ ЗОНЫ
                ================================================= */

                /* =================================================
                   ROADMAP
                ================================================= */

                .map {
                    width: 100%;

                    overflow: hidden;

                    border-radius: 25px;

                    background: #ecd9de;

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
                    width: 100%;

                    height: auto;

                    display: block;
                }

                .month-grid {

                    grid-template-columns:
                        repeat(
                            3,
                            minmax(
                                0,
                                1fr
                            )
                        );

                    margin-top: 14px;

                    align-items: start;
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

                        gap: 28px;
                    }

                    .intro-insight {
                        max-width: 620px;
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
                        padding-bottom: 44px;
                    }

                    .report-shell {
                        width:
                            calc(
                                100% -
                                24px
                            );
                    }

                    /*
                     * Совпадает с mobile header
                     * страницы результата.
                     */
                    .result-header-shell {
                        width:
                            calc(
                                100% -
                                24px
                            );
                    }

                    .report-header {
                        min-height: 64px;

                        gap: 12px;
                    }

                    .brand {
                        font-size: 21px;
                    }

                    .couple-names {
                        max-width: 52%;

                        gap: 5px;

                        font-size: 8px;

                        letter-spacing: .65px;
                    }

                    .intro {
                        padding-top: 30px;
                    }

                    .intro-main h1 {
                        font-size: 46px;

                        line-height: .98;

                        letter-spacing: -1.8px;
                    }

                    .intro-main p {
                        margin-top: 18px;

                        font-size: 12px;
                    }

                    .intro-insight {
                        padding: 23px;

                        border-radius: 22px;
                    }

                    .intro-insight h2 {
                        font-size: 23px;
                    }

                    .report-section, .roadmap-section {
                        margin-top: 52px;
                    }

                    .map {
                        border-radius: 18px;
                    }

                    .month-grid {
                        margin-top: 10px;
                    }
                }

                .report-page { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
                .intro h1 { font-size: clamp(32px, 5vw, 46px); font-weight: 500; line-height: 1.15; letter-spacing: -1.2px; }
                .intro-main p { font-size: 15px; line-height: 1.6; }
                .intro-insight h2 { font-size: 22px; font-weight: 500; }
                .month-grid { display: flex; flex-direction: column; gap: 16px; }
                .intro-insight { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 20px; border-radius: 16px; background: #eee7e4; }
                .insight-item { min-width: 0; display: flex; flex-direction: column; gap: 8px; }
                .insight-item span { color: #81777a; font-size: 11px; letter-spacing: 1px; }
                .insight-item strong { font-size: 19px; font-weight: 500; line-height: 1.3; }
                .roadmap-section { padding-top: 0; margin-top: 24px; }
            `}</style>

        </main>
    );
}

/* ============================================================
   SECTION HEADING
============================================================ */

function MonthCard({
                       month, coupleId,
                   }: {
    month: MonthPlan;
    coupleId: string;
}) {
    const storageKey = `plan-tasks:${coupleId}:${month.number}`;
    const [done, setDone] = useState<string[]>([]);
    useEffect(() => {
        try { const saved = JSON.parse(localStorage.getItem(storageKey) || "[]"); setDone(Array.isArray(saved) ? saved.filter(task => month.tasks.includes(task)) : []); } catch { setDone([]); }
    }, [storageKey, month.tasks]);
    function toggle(task: string) {
        const next = done.includes(task) ? done.filter(t => t !== task) : [...done, task];
        setDone(next);
        try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
    }
    return (
        <details className="month-card" open={month.number === 1}>
            <summary>

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

            </summary>

            <div className="tasks">

                {month.tasks.map(
                    (
                        task
                    ) => (
                        <label
                            className="task"
                            key={
                                task
                            }
                        >

                            <input type="checkbox" className="checkbox" checked={done.includes(task)} onChange={() => toggle(task)} />

                            <span className="task-text">
                                {task}
                            </span>

                        </label>
                    )
                )}

            </div>

            <style jsx>{`

                .month-card {
                    min-width: 0;

                    padding: 24px;

                    border:
                        1px solid
                        #e3d9d7;

                    border-radius: 23px;

                    background: #fffaf8;
                }

                .month-top {
                    display: flex;

                    align-items: center;

                    gap: 12px;

                    margin-bottom: 17px;
                }

                .number {
                    flex:
                        0 0 auto;

                    width: 38px;

                    height: 38px;

                    display: grid;

                    place-items: center;

                    border-radius: 50%;

                    background: #c8245c;

                    color: white;

                    font-family: inherit;

                    font-size: 19px;
                }

                .eyebrow {
                    color: #c8245c;

                    font-family: inherit;

                    font-size: 9px;

                    line-height: 1.2;

                    font-weight: 800;

                    letter-spacing: 1.3px;
                }

                h3 {
                    margin: 0;

                    font-family: inherit;

                    font-size: 30px;

                    line-height: .98;

                    font-weight: 400;

                    letter-spacing: -1px;
                }

                .tasks {
                    display: grid;

                    gap: 13px;
                }

                .task {
                    display: grid;

                    grid-template-columns:
                        18px
                        minmax(
                            0,
                            1fr
                        );

                    gap: 10px;

                    align-items: start;
                }

                .checkbox {
                    width: 18px;

                    height: 18px;

                    margin-top: 1px;

                    border:
                        1.5px solid
                        #d44573;

                    border-radius: 5px;
                }

                .task-text {
                    color: #4e4548;

                    font-family: inherit;

                    overflow-wrap: break-word;
                }

                .checkbox { margin: 3px 0 0; accent-color: #cb225c; appearance: auto; cursor: pointer; }
                .task { cursor: pointer; }
                .task:has(input:checked) .task-text { text-decoration: line-through; color: #81777a; }
                .month-card { width: 100%; }
                .month-card .tasks { margin-top: 20px; }
                summary { cursor: pointer; list-style: none; }
                summary::-webkit-details-marker { display: none; }
                summary::after { content: "Показать задания +"; display: block; margin-top: 14px; color: #a02b54; font-size: 14px; }
                .month-card[open] summary::after { content: "Свернуть −"; }
                .month-card h3 { font-size: 25px; font-weight: 500; line-height: 1.2; letter-spacing: -.6px; }
                .task-text { font-size: 15px; line-height: 1.6; }
            `}</style>

        </details>
    );
}

/* ============================================================
   HELPERS
============================================================ */

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
