"use client";

import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    useParams,
    useRouter,
} from "next/navigation";

import { StoryArt, StoryHeader, StoryState } from "../../story";

type Couple = {
    id: string;

    partner_a_name?: string | null;
    partner_b_name?: string | null;

    partner_a_completed?: boolean;
    partner_b_completed?: boolean;

    invite_token?: string | null;
};

export default function WaitingPage() {
    const params =
        useParams<{
            coupleId: string;
        }>();

    const router =
        useRouter();

    const coupleId =
        params.coupleId;

    const [
        couple,
        setCouple,
    ] =
        useState<Couple | null>(
            null
        );

    const [
        loading,
        setLoading,
    ] =
        useState(true);

    const [
        error,
        setError,
    ] =
        useState("");

    const [
        copied,
        setCopied,
    ] =
        useState(false);

    const [
        origin,
        setOrigin,
    ] =
        useState("");

    useEffect(() => {
        setOrigin(
            window.location.origin
        );
    }, []);

    const inviteUrl =
        useMemo(() => {
            if (
                !origin ||
                !couple?.invite_token
            ) {
                return "";
            }

            return `${origin}/invite/${encodeURIComponent(
                couple.invite_token
            )}`;
        }, [
            origin,
            couple?.invite_token,
        ]);

    useEffect(() => {
        if (!coupleId) {
            return;
        }

        let cancelled =
            false;

        let timer:
            | ReturnType<
            typeof setInterval
        >
            | null =
            null;

        async function loadCouple() {
            try {
                const response =
                    await fetch(
                        `/api/couples?id=${encodeURIComponent(
                            coupleId
                        )}`,
                        {
                            cache:
                                "no-store",
                        }
                    );

                const result =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        result?.error ||
                        "Не удалось загрузить пару"
                    );
                }

                if (cancelled) {
                    return;
                }

                const currentCouple =
                    result as Couple;

                if (
                    currentCouple
                        .partner_a_completed &&
                    currentCouple
                        .partner_b_completed
                ) {
                    router.replace(
                        `/result/${coupleId}`
                    );

                    return;
                }

                setCouple(
                    currentCouple
                );

                setError("");
            } catch (
                err
                ) {
                console.error(
                    "Waiting couple load error:",
                    err
                );

                if (
                    !cancelled
                ) {
                    setError(
                        "Не получилось загрузить приглашение."
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

        loadCouple();

        timer =
            setInterval(
                loadCouple,
                4000
            );

        return () => {
            cancelled =
                true;

            if (timer) {
                clearInterval(
                    timer
                );
            }
        };
    }, [
        coupleId,
        router,
    ]);

    const inviteField = useRef<HTMLInputElement>(null);
    const inviteDetails = useRef<HTMLDetailsElement>(null);

    async function copyInvite() {
        if (!inviteUrl) return;
        try {
            await navigator.clipboard.writeText(inviteUrl);
            setCopied(true);
        } catch {
            if (inviteDetails.current) inviteDetails.current.open = true;
            inviteField.current?.focus();
            inviteField.current?.select();
        }
    }

    async function shareInvite() {
        if (!inviteUrl) return;
        if (navigator.share) {
            try {
                await navigator.share({ title: "между нами.", url: inviteUrl });
                return;
            } catch (error) {
                if (error instanceof DOMException && error.name === "AbortError") return;
            }
        }
        await copyInvite();
    }

    if (loading) return <StoryState>Готовим приглашение…</StoryState>;
    if (!couple) return <StoryState>{error || "Пара не найдена."}</StoryState>;
    if (!couple.invite_token) return <StoryState>Не удалось создать ссылку для партнёра.</StoryState>;

    const participants = [
        { role: "a", name: couple.partner_a_name || "Первый участник", done: couple.partner_a_completed },
        { role: "b", name: couple.partner_b_name || "Второй участник", done: couple.partner_b_completed },
    ];

    return (
        <main className="story">
            <StoryHeader />
            <h1 className="story-title story-rays">Твоя часть<br />готова!</h1>
            <StoryArt scene="waiting" />
            <ul className="story-status-list">
                {participants.map(person => (
                    <li key={person.role} className={`story-status${person.done ? " story-status-done" : ""}`}>
                        {person.name} — {person.done ? "готово" : "ждём ответы"}
                        <span aria-hidden="true">{person.done ? "✓" : "◌"}</span>
                    </li>
                ))}
            </ul>
            <p className="story-lead">Отправь приглашение партнёру. Когда вы оба закончите, здесь появится результат.</p>
            <button className="story-button" type="button" disabled={!inviteUrl} onClick={shareInvite}>Отправить приглашение ↗</button>
            <button className="story-button story-button-outline" type="button" disabled={!inviteUrl} onClick={copyInvite}>
                Скопировать ссылку
            </button>
            <p className="story-note" aria-live="polite">{copied ? "Ссылка скопирована ✓" : "Результат обновится автоматически"}</p>
            <details className="story-details" ref={inviteDetails}>
                <summary>Показать ссылку</summary>
                <input className="story-link-field" ref={inviteField} aria-label="Ссылка для партнёра" value={inviteUrl} readOnly />
            </details>
            {error && <p className="story-error" role="status">{error}</p>}
        </main>
    );
}
