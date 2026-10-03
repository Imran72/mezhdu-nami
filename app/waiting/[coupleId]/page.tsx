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
            } catch (err) {
                console.error(
                    "Waiting couple load error:",
                    err
                );

                if (!cancelled) {
                    setError(
                        "Не получилось загрузить приглашение."
                    );
                }
            } finally {
                if (!cancelled) {
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
                3000
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

    async function copyLink() {
        if (!inviteUrl) {
            return;
        }

        try {
            await navigator.clipboard.writeText(
                inviteUrl
            );

            setCopied(true);

            window.setTimeout(
                () => {
                    setCopied(
                        false
                    );
                },
                1800
            );
        } catch (err) {
            console.error(err);
        }
    }

    async function shareInvite() {
        if (!inviteUrl) {
            return;
        }

        const partnerName =
            couple?.partner_b_name ||
            "тебя";

        try {
            if (
                navigator.share
            ) {
                await navigator.share({
                    title:
                        "между нами.",
                    text:
                        `${partnerName}, теперь твоя очередь. Пройди свою часть — потом увидим общий результат.`,
                    url:
                    inviteUrl,
                });

                return;
            }

            await copyLink();
        } catch (err) {
            if (
                err instanceof DOMException &&
                err.name ===
                "AbortError"
            ) {
                return;
            }

            console.error(err);
        }
    }

    if (loading) {
        return (
            <StateScreen
                text="секунду..."
            />
        );
    }

    if (
        error ||
        !couple
    ) {
        return (
            <StateScreen
                text={
                    error ||
                    "Не получилось открыть приглашение."
                }
            />
        );
    }

    const partnerName =
        couple.partner_b_name ||
        "партнёра";

    return (
        <main className="page">

            <header className="header">

                <div className="brand">
                    между нами.
                </div>

            </header>

            <section className="content">

                <div className="done">
                    <span>
                        ✓
                    </span>

                    ТВОЯ ЧАСТЬ ГОТОВА
                </div>

                <h1>
                    Теперь очередь:
                    <br />

                    <em>
                        {partnerName}.
                    </em>
                </h1>

                <p className="lead">
                    После второго ответа
                    вы увидите картину целиком.
                </p>

                <div className="invite-card">

                    <div className="circles">
                        <span className="circle circle-a" />
                        <span className="circle circle-b" />
                    </div>

                    <div className="card-label">
                        ОСТАЛСЯ ОДИН ШАГ
                    </div>

                    <h2>
                        Передай ход
                    </h2>

                    <p className="card-description">
                        {partnerName} получит свою
                        часть теста. Твои ответы
                        останутся скрыты до общего
                        результата.
                    </p>

                    <button
                        type="button"
                        className="share"
                        disabled={
                            !inviteUrl
                        }
                        onClick={
                            shareInvite
                        }
                    >
                        <span>
                            Отправить приглашение
                        </span>

                        <span className="arrow">
                            →
                        </span>
                    </button>

                    <button
                        type="button"
                        className={
                            copied
                                ? "copy copied"
                                : "copy"
                        }
                        disabled={
                            !inviteUrl
                        }
                        onClick={
                            copyLink
                        }
                    >
                        {copied
                            ? "Ссылка скопирована ✓"
                            : "Скопировать ссылку"}
                    </button>

                </div>

                <div className="waiting">

                    <div className="waiting-title">

                        <span className="pulse" />

                        Ждём второй ответ

                    </div>

                    <p>
                        Ничего обновлять не нужно —
                        результат откроется здесь
                        автоматически.
                    </p>

                </div>

            </section>

            <style jsx>{`
                :global(*) {
                    box-sizing:
                        border-box;
                }

                :global(html),
                :global(body) {
                    margin: 0;

                    background:
                        #faf7f5;
                }

                button {
                    font: inherit;
                }

                .page {
                    min-height:
                        100svh;

                    padding:
                        0
                        28px
                        60px;

                    overflow-x:
                        hidden;

                    color:
                        #201c1e;

                    background:
                        radial-gradient(
                            circle
                            at 78% 12%,
                            rgba(
                                205,
                                92,
                                132,
                                .08
                            ),
                            transparent
                            29%
                        ),
                        #faf7f5;
                }

                .header {
                    width:
                        min(
                            920px,
                            100%
                        );

                    height: 78px;

                    display: flex;

                    align-items:
                        center;

                    margin:
                        0 auto;
                }

                .brand {
                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        24px;

                    line-height: 1;

                    font-weight:
                        700;

                    letter-spacing:
                        -1.1px;
                }

                .content {
                    width:
                        min(
                            920px,
                            100%
                        );

                    margin:
                        0 auto;

                    padding-top:
                        clamp(
                            46px,
                            7vh,
                            76px
                        );
                }

                .done {
                    display: flex;

                    align-items:
                        center;

                    gap: 9px;

                    margin-bottom:
                        19px;

                    color:
                        #c62059;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        10px;

                    line-height: 1;

                    font-weight:
                        800;

                    letter-spacing:
                        2px;
                }

                .done span {
                    width: 21px;
                    height: 21px;

                    display: grid;

                    place-items:
                        center;

                    border-radius:
                        50%;

                    color: #fff;

                    background:
                        #ca225c;

                    font-size:
                        11px;

                    letter-spacing:
                        0;
                }

                h1 {
                    max-width:
                        760px;

                    margin: 0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        clamp(
                            58px,
                            7vw,
                            86px
                        );

                    line-height:
                        .9;

                    font-weight:
                        400;

                    letter-spacing:
                        -4px;
                }

                h1 em {
                    color:
                        #ca205a;

                    font-style:
                        normal;
                }

                .lead {
                    max-width:
                        500px;

                    margin:
                        22px
                        0
                        0;

                    color:
                        #837a7d;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        14px;

                    line-height:
                        1.5;
                }

                .invite-card {
                    width:
                        min(
                            650px,
                            100%
                        );

                    margin-top:
                        40px;

                    padding:
                        28px;

                    border:
                        1px solid
                        #e3d9d7;

                    border-radius:
                        28px;

                    background:
                        rgba(
                            255,
                            252,
                            250,
                            .82
                        );

                    box-shadow:
                        0
                        20px
                        60px
                        rgba(
                            73,
                            37,
                            51,
                            .045
                        );
                }

                .circles {
                    position:
                        relative;

                    width: 67px;
                    height: 43px;

                    margin-bottom:
                        23px;
                }

                .circle {
                    position:
                        absolute;

                    top: 0;

                    width: 43px;
                    height: 43px;

                    border-radius:
                        50%;
                }

                .circle-a {
                    left: 0;

                    background:
                        #d5537f;
                }

                .circle-b {
                    left: 24px;

                    border:
                        1px solid
                        #d5537f;

                    background:
                        rgba(
                            250,
                            247,
                            245,
                            .74
                        );
                }

                .card-label {
                    margin-bottom:
                        9px;

                    color:
                        #b5a8ac;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        9px;

                    font-weight:
                        800;

                    letter-spacing:
                        1.8px;
                }

                h2 {
                    margin: 0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        33px;

                    line-height: 1;

                    font-weight:
                        400;

                    letter-spacing:
                        -1.3px;
                }

                .card-description {
                    max-width:
                        470px;

                    margin:
                        11px
                        0
                        0;

                    color:
                        #8c8185;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        12px;

                    line-height:
                        1.55;
                }

                .share {
                    width: 100%;
                    height: 62px;

                    display: flex;

                    align-items:
                        center;

                    justify-content:
                        space-between;

                    margin-top:
                        24px;

                    padding:
                        0
                        24px;

                    border: 0;

                    border-radius:
                        999px;

                    cursor:
                        pointer;

                    color: #fff;

                    background:
                        #cc205a;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        14px;

                    font-weight:
                        700;

                    transition:
                        transform
                        .18s ease,
                        background
                        .18s ease;
                }

                .share:hover:not(:disabled) {
                    transform:
                        translateY(-1px);

                    background:
                        #b91850;
                }

                .share:disabled,
                .copy:disabled {
                    opacity: .45;

                    cursor:
                        default;
                }

                .arrow {
                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        23px;

                    font-weight:
                        400;
                }

                .copy {
                    width: 100%;

                    margin-top:
                        7px;

                    padding: 11px;

                    border: 0;

                    cursor:
                        pointer;

                    color:
                        #8f8488;

                    background:
                        transparent;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        11px;

                    font-weight:
                        600;
                }

                .copy.copied {
                    color:
                        #bd285a;
                }

                .waiting {
                    margin-top:
                        25px;
                }

                .waiting-title {
                    display: flex;

                    align-items:
                        center;

                    gap: 8px;

                    color:
                        #5f5659;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        11px;

                    font-weight:
                        700;
                }

                .pulse {
                    width: 7px;
                    height: 7px;

                    border-radius:
                        50%;

                    background:
                        #cc205a;

                    animation:
                        pulse
                        1.8s
                        infinite;
                }

                .waiting p {
                    margin:
                        7px
                        0
                        0
                        15px;

                    color:
                        #a3979b;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        10px;

                    line-height:
                        1.5;
                }

                @keyframes pulse {
                    0% {
                        box-shadow:
                            0
                            0
                            0
                            0
                            rgba(
                                204,
                                32,
                                90,
                                .32
                            );
                    }

                    70% {
                        box-shadow:
                            0
                            0
                            0
                            8px
                            rgba(
                                204,
                                32,
                                90,
                                0
                            );
                    }

                    100% {
                        box-shadow:
                            0
                            0
                            0
                            0
                            rgba(
                                204,
                                32,
                                90,
                                0
                            );
                    }
                }

                @media (
                    max-width:
                        640px
                ) {
                    .page {
                        padding:
                            0
                            16px
                            40px;
                    }

                    .header {
                        height:
                            64px;
                    }

                    .brand {
                        font-size:
                            21px;
                    }

                    .content {
                        padding-top:
                            36px;
                    }

                    .done {
                        margin-bottom:
                            16px;

                        font-size:
                            9px;

                        letter-spacing:
                            1.6px;
                    }

                    h1 {
                        font-size:
                            52px;

                        line-height:
                            .91;

                        letter-spacing:
                            -2.8px;
                    }

                    .lead {
                        margin-top:
                            17px;

                        font-size:
                            13px;
                    }

                    .invite-card {
                        margin-top:
                            31px;

                        padding:
                            21px
                            19px
                            17px;

                        border-radius:
                            22px;
                    }

                    .circles {
                        margin-bottom:
                            18px;
                    }

                    h2 {
                        font-size:
                            28px;
                    }

                    .card-description {
                        font-size:
                            11px;
                    }

                    .share {
                        height:
                            58px;

                        margin-top:
                            20px;

                        padding:
                            0
                            20px;

                        font-size:
                            13px;
                    }

                    .waiting {
                        margin-top:
                            21px;
                    }
                }
            `}</style>

        </main>
    );
}

function StateScreen({
                         text,
                     }: {
    text: string;
}) {
    return (
        <main className="state">

            <div className="brand">
                между нами.
            </div>

            <p>
                {text}
            </p>

            <style jsx>{`
                :global(body) {
                    margin: 0;
                }

                .state {
                    min-height:
                        100svh;

                    display: grid;

                    place-items:
                        center;

                    align-content:
                        center;

                    gap: 12px;

                    background:
                        #faf7f5;

                    color:
                        #201c1e;
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