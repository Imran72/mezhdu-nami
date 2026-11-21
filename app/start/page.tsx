"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { StoryArt, StoryHeader, StoryHeading } from "../story";

export default function Start() {
    const [a, setA] = useState("");
    const [b, setB] = useState("");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    async function start(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (busy) return;
        if (!a.trim() || !b.trim()) {
            setError("Введите оба имени");
            return;
        }

        setBusy(true);
        setError("");
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
        <main className="story">
            <StoryHeader back="/" />
            <StoryHeading scene="names" />
            <StoryArt scene="names" inset />
            <form className="story-form" onSubmit={start}>
                <h2>Как к вам обращаться?</h2>
                <label htmlFor="name-a">Твоё имя</label>
                <input id="name-a" autoComplete="given-name" required maxLength={80} value={a} onChange={event => setA(event.target.value)} placeholder="Например, Аня" />
                <label htmlFor="name-b">Имя партнёра</label>
                <input id="name-b" autoComplete="off" required maxLength={80} value={b} onChange={event => setB(event.target.value)} placeholder="Например, Саша" />
                <p className="story-note">Сначала ответишь ты. Потом отправишь ссылку партнёру.</p>
                {error && <p className="story-error" role="alert">{error}</p>}
                <button className="story-button" disabled={busy}>{busy ? "Создаём пару…" : "Начать тест →"}</button>
            </form>
        </main>
    );
}
