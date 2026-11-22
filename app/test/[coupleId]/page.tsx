"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getQuizQuestions, type QuizVersion } from "../../../lib/questions";
import { StoryArt, StoryHeader, StoryHeading, StoryState } from "../../story";

type Answers = Record<string, string>;
type Couple = {
    quizVersion?: QuizVersion;
    partner_a_completed?: boolean;
    partner_b_completed?: boolean;
};

export default function TestPage() {
    const { coupleId } = useParams<{ coupleId: string }>();
    const role = useSearchParams().get("role") === "b" ? "b" : "a";
    return <Questionnaire key={`${coupleId}:${role}`} coupleId={coupleId} role={role} />;
}

function Questionnaire({ coupleId, role }: { coupleId: string; role: "a" | "b" }) {
    const router = useRouter();
    const draftKey = `test-draft:${coupleId}:${role}`;
    const [version, setVersion] = useState<QuizVersion>();
    const [loadError, setLoadError] = useState(false);
    const [loadAttempt, setLoadAttempt] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Answers>({});
    const [selection, setSelection] = useState<string>();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const questions = getQuizQuestions(version);
    const currentQuestion = questions[currentIndex];
    const selectedValue = selection ?? answers[currentQuestion.id];

    useLayoutEffect(() => {
        if (version) window.scrollTo({ top: 0, behavior: "instant" });
    }, [currentIndex, error, version]);

    useEffect(() => {
        const controller = new AbortController();

        async function load() {
            try {
                const response = await fetch(`/api/couples?id=${encodeURIComponent(coupleId)}`, {
                    cache: "no-store",
                    signal: controller.signal,
                });
                if (!response.ok) throw new Error("Couple unavailable");
                const couple: Couple = await response.json();
                if (controller.signal.aborted) return;

                if (couple.partner_a_completed && couple.partner_b_completed) {
                    router.replace(`/result/${coupleId}`);
                    return;
                }
                if (role === "a" ? couple.partner_a_completed : couple.partner_b_completed) {
                    router.replace(`/waiting/${coupleId}`);
                    return;
                }

                const selectedVersion = couple.quizVersion ?? 1;
                const quiz = getQuizQuestions(selectedVersion);
                const restored: Answers = {};
                try {
                    const saved = JSON.parse(localStorage.getItem(draftKey) || "null");
                    for (const question of quiz) {
                        const value = saved?.answers?.[question.id];
                        if (question.options.some(option => option.value === value)) restored[question.id] = value;
                    }
                } catch { /* Unavailable storage does not block the quiz. */ }
                const firstMissing = quiz.findIndex(question => !restored[question.id]);
                setAnswers(restored);
                setCurrentIndex(firstMissing < 0 ? quiz.length - 1 : firstMissing);
                setVersion(selectedVersion);
            } catch {
                if (!controller.signal.aborted) setLoadError(true);
            }
        }

        load();
        return () => controller.abort();
    }, [coupleId, draftKey, role, router, loadAttempt]);

    async function nextQuestion() {
        if (!selectedValue || submitting) return;
        const updated = { ...answers, [currentQuestion.id]: selectedValue };
        setAnswers(updated);
        setSelection(undefined);
        try { localStorage.setItem(draftKey, JSON.stringify({ answers: updated })); } catch {}
        if (currentIndex === questions.length - 1) {
            await submitAnswers(updated);
            return;
        }
        setCurrentIndex(currentIndex + 1);
    }

    function goBack() {
        if (!currentIndex || submitting) return;
        setSelection(undefined);
        setCurrentIndex(currentIndex - 1);
    }

    async function submitAnswers(finalAnswers: Answers) {
        if (submitting) return;
        setSubmitting(true);
        setError("");
        try {
            const response = await fetch("/api/answers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ coupleId, role, answers: finalAnswers }),
            });
            if (!response.ok) throw new Error("Answers unavailable");
            try { localStorage.removeItem(draftKey); } catch {}
            router.replace(role === "b" ? `/result/${coupleId}` : `/waiting/${coupleId}`);
        } catch {
            setError("Ответы готовы к повторной отправке.");
            setSubmitting(false);
        }
    }

    if (loadError) {
        return (
            <StoryState action={<button className="story-button" onClick={() => {
                setLoadError(false);
                setLoadAttempt(attempt => attempt + 1);
            }}>Попробовать снова</button>}>
                Не удалось загрузить вопросы.
            </StoryState>
        );
    }
    if (!version) return <StoryState>Загружаем вопросы…</StoryState>;
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
                                checked={selectedValue === option.value} onChange={() => setSelection(option.value)} />
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
