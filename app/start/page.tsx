"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { StoryArt, StoryHeader, StoryHeading } from "../story";

export default function Start() {
    const [a, setA] = useState("");
    const [b, setB] = useState("");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const [attempted, setAttempted] = useState(false);
    const missingA = attempted && !a.trim();
    const missingB = attempted && !b.trim();
    const router = useRouter();

    async function start(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (busy) return;
        setAttempted(true);
        setError("");
        if (!a.trim() || !b.trim()) {
            event.currentTarget.querySelector<HTMLInputElement>(!a.trim() ? "#name-a" : "#name-b")
                ?.focus({ preventScroll: true });
            return;
        }

        setBusy(true);
        try {
            const response = await fetch("/api/couples", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ a, b }),
            });
            const result = await response.json();
            if (!response.ok || !result.id) throw new Error(result.error || "Не удалось создать пару");
            router.push(`/test/${result.id}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Не удалось создать пару. Попробуйте ещё раз");
            setBusy(false);
        }
    }

    return (
        <main className="story story-start">
            <StoryHeader back="/" />
            <StoryHeading scene="names" />
            <StoryArt scene="names" inset />
            <form className="story-form" onSubmit={start} noValidate>
                <h2>Как к вам обращаться?</h2>
                <div className="story-field">
                    <label htmlFor="name-a">Твоё имя</label>
                    <input
                        id="name-a" autoComplete="given-name" required maxLength={80}
                        value={a} onChange={event => setA(event.target.value)} placeholder="Например, Аня"
                        aria-invalid={missingA} aria-describedby={missingA ? "name-a-error" : undefined}
                    />
                    {missingA && <p id="name-a-error" className="story-field-error" role="alert">Введи своё имя.</p>}
                </div>
                <div className="story-field">
                    <label htmlFor="name-b">Имя партнёра</label>
                    <input
                        id="name-b" autoComplete="off" required maxLength={80}
                        value={b} onChange={event => setB(event.target.value)} placeholder="Например, Саша"
                        aria-invalid={missingB} aria-describedby={missingB ? "name-b-error" : undefined}
                    />
                    {missingB && <p id="name-b-error" className="story-field-error" role="alert">Введи имя партнёра.</p>}
                </div>
                <p className="story-note">Сначала ответишь ты. Потом отправишь ссылку партнёру.</p>
                {error && <p className="story-error" role="alert">{error}</p>}
                <button className="story-button" disabled={busy}>{busy ? "Создаём пару…" : "Начать тест →"}</button>
            </form>
        </main>
    );
}
