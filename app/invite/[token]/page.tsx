"use client";

import {
    useEffect,
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
};

export default function InvitePage() {
    const params =
        useParams<{
            token: string;
        }>();

    const router =
        useRouter();

    const token =
        params.token;

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

    useEffect(() => {
        if (!token) {
            setError(
                "Ссылка недействительна."
            );

            setLoading(
                false
            );

            return;
        }

        let cancelled =
            false;

        async function loadInvite() {
            try {
                const response =
                    await fetch(
                        `/api/couples?token=${encodeURIComponent(
                            token
                        )}`,
                        {
                            cache:
                                "no-store",
                        }
                    );

                const result =
                    await response.json();

                if (
                    !response.ok
                ) {
                    throw new Error(
                        result?.error ||
                        "Приглашение не найдено"
                    );
                }

                if (
                    cancelled
                ) {
                    return;
                }

                const currentCouple =
                    result as Couple;

                /*
                 * Результат открываем ТОЛЬКО
                 * когда оба уже прошли тест.
                 */
                if (
                    currentCouple
                        .partner_a_completed &&
                    currentCouple
                        .partner_b_completed
                ) {
                    router.replace(
                        `/result/${currentCouple.id}`
                    );

                    return;
                }

                setCouple(
                    currentCouple
                );
            } catch (
                err
                ) {
                console.error(
                    "Invite load error:",
                    err
                );

                if (
                    !cancelled
                ) {
                    setError(
                        "Эта ссылка больше не работает."
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

        loadInvite();

        return () => {
            cancelled =
                true;
        };
    }, [
        token,
        router,
    ]);

    function start() {
        if (!couple) {
            return;
        }

        /*
         * Второй человек всегда
         * начинает тест именно как role=b.
         */
        router.push(
            `/test/${couple.id}?role=b`
        );
    }

    if (loading) return <StoryState>Открываем приглашение…</StoryState>;
    if (error || !couple) return <StoryState>{error || "Приглашение не найдено."}</StoryState>;

    const nameA = couple.partner_a_name || "Твой партнёр";
    const nameB = couple.partner_b_name;
    return (
        <main className="story story-invite">
            <StoryHeader coral />
            <h1 className="story-title story-rays">{nameB ? `${nameB}, тебя` : "Тебя"}<br />зовёт {nameA}</h1>
            <StoryArt scene="invite" />
            <h2 className="story-subtitle">Узнайте, как каждый из вас видит ваши отношения</h2>
            {couple.partner_a_completed && <p className="story-pill story-status">✓ {nameA} · ответы готовы</p>}
            <button className="story-button" type="button" onClick={start}>Пройти свою часть →</button>
            <p className="story-note">Без регистрации · 16 вопросов</p>
        </main>
    );
}
