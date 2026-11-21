'use client';

import {
    useEffect,
    useState,
} from 'react';

import {
    useParams,
    useRouter,
    useSearchParams,
} from 'next/navigation';

import {
    chapters,
    questions,
} from '../../../lib/questions';

import { StoryArt, StoryHeader, StoryHeading, StoryState } from "../../story";

type Answers = Record<string, string>;

type Couple = {
    id: string;
    partner_a_name?: string;
    partner_b_name?: string;
    partner_a_completed?: boolean;
    partner_b_completed?: boolean;
};

type ChapterIntro = {
    chapter: number;
    intro: string;
    subtitle: string;
};

const microReactions: Record<number, string> = {
    2: 'интересно 👀',
    6: 'запомним это',
    10: 'вот это потом сравним',
};

export default function TestPage() {
    const params =
        useParams<{ coupleId: string }>();

    const searchParams =
        useSearchParams();

    const router =
        useRouter();

    const coupleId =
        params.coupleId;

    const role =
        searchParams.get('role') === 'b'
            ? 'b'
            : 'a';

    const [currentIndex, setCurrentIndex] =
        useState(0);

    const [answers, setAnswers] =
        useState<Answers>({});

    const draftKey = `test-draft:${coupleId}:${role}`;
    const [loadedDraftKey, setLoadedDraftKey] = useState("");
    useEffect(() => {
        setAnswers({});
        setSelection(null);
        setCurrentIndex(0);
        try {
            const saved = JSON.parse(localStorage.getItem(draftKey) || "null");
            if (saved && typeof saved.answers === "object") {
                const restored: Answers = {};
                for (const q of questions) if (q.options.some(o => o.value === saved.answers[q.id])) restored[q.id] = saved.answers[q.id];
                setAnswers(restored);
                const firstMissing = questions.findIndex(q => !restored[q.id]);
                setCurrentIndex(firstMissing < 0 ? questions.length - 1 : firstMissing);
            }
        } catch { /* Unavailable or invalid storage must not block the test. */ }
        setLoadedDraftKey(draftKey);
    }, [draftKey]);
    useEffect(() => {
        if (loadedDraftKey !== draftKey) return;
        try { localStorage.setItem(draftKey, JSON.stringify({ answers })); } catch {}
    }, [answers, draftKey, loadedDraftKey]);

    const [checking, setChecking] =
        useState(true);

    const [submitting, setSubmitting] =
        useState(false);

    const [error, setError] =
        useState('');

    const [selection, setSelection] = useState<{ questionId: string; value: string } | null>(null);

    const [
        showChapterIntro,
        setShowChapterIntro,
    ] = useState<ChapterIntro | null>(
        null
    );

    const [
        showReaction,
        setShowReaction,
    ] = useState<string | null>(null);

    const currentQuestion =
        questions[currentIndex];

    /*
     * Проверяем состояние пары.
     */
    useEffect(() => {
        async function checkCouple() {
            try {
                const response =
                    await fetch(
                        `/api/couples?id=${encodeURIComponent(
                            coupleId
                        )}`,
                        {
                            cache: 'no-store',
                        }
                    );

                if (!response.ok) {
                    throw new Error(
                        'Не удалось загрузить пару'
                    );
                }

                const couple: Couple =
                    await response.json();

                /*
                 * Оба уже прошли.
                 */
                if (
                    couple.partner_a_completed &&
                    couple.partner_b_completed
                ) {
                    router.replace(
                        `/result/${coupleId}`
                    );

                    return;
                }

                /*
                 * Первый уже проходил.
                 */
                if (
                    role === 'a' &&
                    couple.partner_a_completed
                ) {
                    router.replace(
                        `/waiting/${coupleId}`
                    );

                    return;
                }

                /*
                 * Второй уже проходил.
                 */
                if (
                    role === 'b' &&
                    couple.partner_b_completed
                ) {
                    if (
                        couple.partner_a_completed
                    ) {
                        router.replace(
                            `/result/${coupleId}`
                        );
                    } else {
                        router.replace(
                            `/waiting/${coupleId}`
                        );
                    }

                    return;
                }
            } catch (err) {
                console.error(err);
            } finally {
                setChecking(false);
            }
        }

        checkCouple();
    }, [
        coupleId,
        role,
        router,
    ]);

    const selectedValue = currentQuestion && (
        selection?.questionId === currentQuestion.id ? selection.value : answers[currentQuestion.id]
    );

    function getChapterIntro(
        chapterNumber: number
    ): ChapterIntro | null {
        const chapter =
            chapters.find(
                (item) =>
                    item.id === chapterNumber
            );

        if (!chapter) {
            return null;
        }

        return {
            chapter: chapter.id,
            intro: chapter.intro,
            subtitle: chapter.subtitle,
        };
    }

    async function nextQuestion() {
        if (!selectedValue || submitting) return;

        const updated = { ...answers, [currentQuestion.id]: selectedValue };
        setAnswers(updated);
        setSelection(null);
        if (currentIndex === questions.length - 1) {
            await submitAnswers(updated);
            return;
        }

        const next = questions[currentIndex + 1];
        const intro = next.chapter !== currentQuestion.chapter ? getChapterIntro(next.chapter) : null;
        const reaction = microReactions[currentIndex];
        if (reaction) {
            setShowReaction(reaction);
            await sleep(650);
            setShowReaction(null);
        }

        if (intro) {
            setShowChapterIntro(intro);
            return;
        }

        setError("");
        setCurrentIndex(currentIndex + 1);
    }

    function continueChapter() {
        setShowChapterIntro(null);
        setError("");
        setCurrentIndex(currentIndex + 1);
    }

    function goBack() {
        if (currentIndex === 0 || submitting) return;
        setSelection(null);
        setError("");
        setCurrentIndex(currentIndex - 1);
    }

    async function submitAnswers(
        finalAnswers: Answers
    ) {
        if (submitting) {
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const response =
                await fetch(
                    '/api/answers',
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type':
                                'application/json',
                        },

                        body: JSON.stringify({
                            coupleId,
                            role,
                            answers:
                            finalAnswers,
                        }),
                    }
                );

            if (!response.ok) {
                const body =
                    await response.text();

                console.error(
                    'Answers API:',
                    response.status,
                    body
                );

                throw new Error(
                    'Не удалось сохранить ответы'
                );
            }

            try { localStorage.removeItem(draftKey); } catch {}

            /*
             * Второй человек завершил тест —
             * сразу показываем результат.
             */
            if (role === 'b') {
                router.replace(
                    `/result/${coupleId}`
                );

                return;
            }

            /*
             * Первый человек ждёт партнёра.
             */
            router.replace(
                `/waiting/${coupleId}`
            );
        } catch (err) {
            console.error(err);

            setError(
                'Ответы готовы к повторной отправке.'
            );

            setSubmitting(false);
        }
    }

    if (checking || loadedDraftKey !== draftKey) return <StoryState>Загружаем вопросы…</StoryState>;
    if (!currentQuestion) return <StoryState>Не удалось открыть вопрос.</StoryState>;
    if (error) {
        return (
            <main className="story story-test-retry">
                <StoryHeader back={() => setError("")} />
                <p className="story-pill story-names">{questions.length} / {questions.length}</p>
                <StoryHeading scene="retry" />
                <StoryArt scene="retry" inset />
                <p className="story-help" role="alert">{error}</p>
                <button className="story-button" type="button" onClick={() => submitAnswers(answers)}>
                    Попробовать снова
                </button>
            </main>
        );
    }
    if (showReaction) return <StoryState>{showReaction}</StoryState>;
    if (showChapterIntro) {
        return (
            <main className="story">
                <StoryHeader back={() => setShowChapterIntro(null)} />
                <h1 className="story-title story-rays">{showChapterIntro.intro}</h1>
                <StoryArt scene="question" inset />
                <p className="story-lead">{showChapterIntro.subtitle}</p>
                <button className="story-button" type="button" onClick={continueChapter}>Продолжить →</button>
            </main>
        );
    }

    return (
        <main className="story story-test">
            <StoryHeader back={currentIndex > 0 && !submitting ? goBack : undefined} />
            <div className="story-progress">
                <span>{currentIndex + 1} / {questions.length}</span>
                <progress aria-label="Прогресс теста" max={questions.length} value={currentIndex + 1} />
            </div>
            <section key={currentQuestion.id} aria-labelledby="question-title">
                <p className="story-pill story-topic">{currentQuestion.eyebrow}</p>
                <h1 id="question-title" className="story-title story-question-title">{currentQuestion.text}</h1>
                {currentQuestion.description && <p className="story-question-note">{currentQuestion.description}</p>}
                <fieldset className="story-options" aria-labelledby="question-title" disabled={submitting}>
                    {currentQuestion.options.map(option => (
                        <label key={option.value}>
                            <input name={currentQuestion.id} type="radio" value={option.value}
                                checked={selectedValue === option.value} onChange={() => setSelection({ questionId: currentQuestion.id, value: option.value })} />
                            {option.label}
                        </label>
                    ))}
                </fieldset>
            </section>
            <StoryArt scene="question" inset />
            <p className="story-note">Отвечай за себя — здесь нет правильных ответов</p>
            <button className="story-button" type="button" disabled={!selectedValue || submitting} onClick={nextQuestion}>
                {submitting ? "Сохраняем ответы…" : currentIndex === questions.length - 1 ? "Завершить тест →" : "Дальше →"}
            </button>
        </main>
    );
}

function sleep(ms: number) {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
}
