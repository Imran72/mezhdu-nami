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



import Link from "next/link";
import type { QuestionComparison } from "../../../lib/scoring";
import { StoryArt, StoryCard, StoryHeader, StoryHeading, StoryState } from "../../story";

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

    comparisons?: QuestionComparison[];

    highlights?: {
        same?: QuestionComparison[];
        close?: QuestionComparison[];
        different?: QuestionComparison[];
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

    const [paymentPending, setPaymentPending] = useState(false);
    const [attempt, setAttempt] = useState(0);

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
                    if (cancelled) return;
                    if (reason.error === "payment_pending") {
                        setPaymentPending(true);
                        if (attempts++ < 10) retryTimer = setTimeout(load, 3000);
                        return;
                    }
                    setPaymentPending(false);
                    setError("Полный разбор открывается после оплаты.");
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

                setPaymentPending(false);
                setData(result);
            } catch (err) {
                console.error(err);

                if (!cancelled) {
                    setPaymentPending(false);
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
        attempt,
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

    if (paymentPending) {
        return (
            <main className="story story-report">
                <StoryHeader coral />
                <span className="story-payment-status" aria-hidden="true">◷</span>
                <StoryHeading scene="pending" />
                <p className="story-lead" role="status">Это может занять несколько секунд</p>
                <StoryArt scene="pending" />
                <button type="button" className="story-button" onClick={() => setAttempt(value => value + 1)}>
                    Проверить снова
                </button>
                <Link className="story-utility-link" href={`/result/${coupleId}`}>Вернуться к результату</Link>
            </main>
        );
    }
    if (loading && !data && !error) return <StoryState>Готовим ваш разбор…</StoryState>;
    if (error || !data) {
        return (
            <StoryState action={<Link className="story-button" href={`/result/${coupleId}`}>К результату →</Link>}>
                {error || "Не получилось загрузить разбор."}
            </StoryState>
        );
    }

    const match = data.highlights?.same?.[0];
    const difference = data.highlights?.different?.[0] ?? data.highlights?.close?.[0];
    const prompts = [
        "Как мне понять, что тебе сейчас нужна поддержка?",
        "Какой момент вдвоём тебе хочется повторить?",
        "Когда тебе лучше дать немного времени на себя?",
        "Как нам вернуться к разговору после паузы?",
        "Какую маленькую привычку мы хотим попробовать вместе?",
    ];

    return (
        <main className="story story-report">
            <StoryHeader coral />
            <p className="story-pill story-names">{nameA} + {nameB}</p>
            <StoryHeading scene="report" />
            <StoryArt scene="report" />
            <StoryCard icon="♡" title="Ваша сильная сторона">
                {match ? (
                    <>
                        <p>{match.question}</p>
                        <p>Оба выбрали «{match.labelA}».</p>
                    </>
                ) : <p>Вы уже сделали первый шаг — каждый поделился своим взглядом на отношения.</p>}
            </StoryCard>
            <StoryCard icon="♧" title="Различия в ожиданиях">
                {difference ? (
                    <>
                        <p>{difference.question}</p>
                        <p>{nameA} — «{difference.labelA}».</p>
                        <p>{nameB} — «{difference.labelB}».</p>
                    </>
                ) : <p>Ваши ответы совпали. Спросите друг друга, как этот выбор выглядит в повседневной жизни.</p>}
            </StoryCard>
            <StoryCard icon="☏" title="Попробуйте спросить"><p>«{prompts[0]}»</p></StoryCard>
            <StoryCard icon="✧" title="Эксперимент на неделю">
                <p>Вечером спрашивайте друг друга, чего сейчас хочется: поговорить, обняться или немного побыть в тишине.</p>
            </StoryCard>
            <a className="story-pill story-jump" href="#conversation">↓ Разбор продолжается ниже</a>
            <section id="conversation" className="story-report-section">
                <h2>5 вопросов для разговора</h2>
                <ol>{prompts.map(prompt => <li key={prompt}>{prompt}</li>)}</ol>
            </section>
            {data.comparisons && data.comparisons.length > 0 && (
                <section className="story-report-section">
                    <h2>Ваши ответы по вопросам</h2>
                    {data.comparisons.map(item => (
                        <details className="story-month story-comparison" key={item.questionId}>
                            <summary>{item.question}</summary>
                            <p><strong>{nameA}</strong> — {item.labelA}</p>
                            <p><strong>{nameB}</strong> — {item.labelB}</p>
                        </details>
                    ))}
                </section>
            )}
            <section className="story-report-section">
                <h2>Ваш план на 3 месяца</h2>
                <p>Девять шагов в вашем темпе. Отмечайте выполненные задания.</p>
                {plan.map(month => <MonthCard key={month.number} month={month} coupleId={coupleId} />)}
            </section>
        </main>
    );
}

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
        <details className="story-month" open={month.number === 1}>
            <summary>{month.number}. {month.title}</summary>
            {month.tasks.map(task => (
                <label key={task}>
                    <input type="checkbox" checked={done.includes(task)} onChange={() => toggle(task)} />
                    <span>{task}</span>
                </label>
            ))}
        </details>
    );
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
