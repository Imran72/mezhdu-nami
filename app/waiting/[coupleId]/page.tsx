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

    /*
     * Ссылка для партнёра
     * строится только через invite_token.
     */
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

    /*
     * Проверяем,
     * закончил ли второй человек.
     */
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

                if (
                    !response.ok
                ) {
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

                /*
                 * Когда оба закончили —
                 * открываем бесплатный результат.
                 */
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

    async function copyInvite() {
        if (!inviteUrl) {
            return;
        }

        try {
            await navigator
                .clipboard
                .writeText(
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
        } catch (
            clipboardError
            ) {
            console.error(
                "Clipboard error:",
                clipboardError
            );

            const textarea =
                document.createElement(
                    "textarea"
                );

            textarea.value =
                inviteUrl;

            textarea.style.position =
                "fixed";

            textarea.style.opacity =
                "0";

            document.body.appendChild(
                textarea
            );

            textarea.select();

            document.execCommand(
                "copy"
            );

            document.body.removeChild(
                textarea
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
        }
    }

    async function shareInvite() {
        if (!inviteUrl) {
            return;
        }

        if (
            navigator.share
        ) {
            try {
                await navigator.share({
                    title:
                        "между нами.",

                    text:
                        "Пройди свою часть — потом увидим общий результат.",

                    url:
                    inviteUrl,
                });

                return;
            } catch (
                shareError
                ) {
                console.log(
                    "Share cancelled:",
                    shareError
                );
            }
        }

        await copyInvite();
    }

    if (loading) {
        return (
            <StateScreen
                text="готовим приглашение"
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
                    "Пара не найдена."
                }
            />
        );
    }

    if (
        !couple.invite_token
    ) {
        return (
            <StateScreen
                text="Не удалось создать ссылку для партнёра."
            />
        );
    }

    const partnerName =
        couple.partner_b_name ||
        "партнёр";

    const firstName =
        couple.partner_a_name ||
        "Вы";

    return (
        <main className="page">

            <div className="shell">

                {/* =====================================================
                    HEADER
                ===================================================== */}

                <header className="header">

                    <div className="brand">
                        между нами.
                    </div>

                    <div className="names">

                        <span>
                            {firstName}
                        </span>

                        <b>
                            ×
                        </b>

                        <span>
                            {partnerName}
                        </span>

                    </div>

                </header>

                {/* =====================================================
                    HERO
                ===================================================== */}

                <section className="hero">

                    <div className="hero-copy">

                        <div className="eyebrow">
                            ТВОЯ ЧАСТЬ ГОТОВА
                        </div>

                        <h1>
                            Осталось
                            <br />
                            совсем немного.
                        </h1>

                        <p className="lead">
                            Теперь очередь{" "}
                            <strong>
                                {partnerName}
                            </strong>
                            . Когда второй человек
                            закончит тест, здесь
                            автоматически откроется
                            ваш общий результат.
                        </p>

                    </div>

                    <div className="status-art">

                        <div className="circles">

                            <div className="circle circle-a">

                                <span className="check">
                                    ✓
                                </span>

                            </div>

                            <div className="circle circle-b">

                                <span className="dots">
                                    <i />
                                    <i />
                                    <i />
                                </span>

                            </div>

                        </div>

                        <div className="status-labels">

                            <span>
                                ты готов
                            </span>

                            <span>
                                ждём партнёра
                            </span>

                        </div>

                    </div>

                </section>

                {/* =====================================================
                    INVITE
                ===================================================== */}

                <section className="invite-section">

                    <div className="invite-copy">

                        <div className="section-label">
                            ПРИГЛАШЕНИЕ
                        </div>

                        <h2>
                            Отправь ссылку
                            <br />
                            партнёру
                        </h2>

                        <p>
                            По ней откроется его часть
                            теста. После завершения
                            результат будет один
                            для вас двоих.
                        </p>

                    </div>

                    <div className="invite-card">

                        <div className="url-label">
                            ССЫЛКА ДЛЯ ПАРТНЁРА
                        </div>

                        <div className="url-box">
                            {inviteUrl}
                        </div>

                        <button
                            type="button"
                            className="primary"
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
                            onClick={
                                copyInvite
                            }
                        >
                            {copied
                                ? "Ссылка скопирована ✓"
                                : "Скопировать ссылку"}
                        </button>

                    </div>

                </section>

                {/* =====================================================
                    FOOTER STATUS
                ===================================================== */}

                <div className="bottom-status">

                    <span className="pulse" />

                    <span>
                        ждём завершения второй части
                    </span>

                </div>

            </div>

            <style jsx>{`

                :global(*) {
                    box-sizing:
                        border-box;
                }

                :global(html) {
                    background:
                        #f8f4f1;
                }

                :global(body) {
                    margin:
                        0;

                    background:
                        #f8f4f1;

                    color:
                        #211d1f;
                }

                button {
                    font:
                        inherit;
                }

                .page {
                    min-height:
                        100vh;

                    padding:
                        0
                        28px
                        60px;

                    background:
                        #f8f4f1;
                }

                .shell {
                    width:
                        min(
                            920px,
                            100%
                        );

                    margin:
                        0 auto;
                }

                /* =====================================================
                   HEADER
                ===================================================== */

                .header {
                    min-height:
                        78px;

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
                        #ddd5d2;
                }

                .brand {
                    flex-shrink:
                        0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        24px;

                    line-height:
                        1;

                    font-weight:
                        700;

                    letter-spacing:
                        -1.1px;
                }

                .names {
                    min-width:
                        0;

                    max-width:
                        50%;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        flex-end;

                    gap:
                        8px;

                    overflow:
                        hidden;

                    color:
                        #91878a;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        10px;

                    line-height:
                        1;

                    font-weight:
                        700;

                    letter-spacing:
                        1.1px;

                    text-transform:
                        uppercase;

                    white-space:
                        nowrap;
                }

                .names span {
                    overflow:
                        hidden;

                    text-overflow:
                        ellipsis;
                }

                .names b {
                    flex-shrink:
                        0;

                    color:
                        #c51f59;

                    font-size:
                        12px;
                }

                /* =====================================================
                   HERO
                ===================================================== */

                .hero {
                    padding:
                        66px
                        0
                        72px;

                    display:
                        grid;

                    grid-template-columns:
                        minmax(
                            0,
                            1.15fr
                        )
                        minmax(
                            280px,
                            .85fr
                        );

                    gap:
                        70px;

                    align-items:
                        center;
                }

                .eyebrow,
                .section-label {
                    margin-bottom:
                        14px;

                    color:
                        #c51f59;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        10px;

                    line-height:
                        1;

                    font-weight:
                        800;

                    letter-spacing:
                        2.2px;
                }

                h1 {
                    margin:
                        0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        clamp(
                            56px,
                            7vw,
                            78px
                        );

                    line-height:
                        .91;

                    font-weight:
                        400;

                    letter-spacing:
                        -3.6px;
                }

                .lead {
                    max-width:
                        560px;

                    margin:
                        24px
                        0
                        0;

                    color:
                        #81777a;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        14px;

                    line-height:
                        1.55;
                }

                .lead strong {
                    color:
                        #c51f59;

                    font-weight:
                        700;
                }

                /* =====================================================
                   STATUS ART
                ===================================================== */

                .status-art {
                    padding:
                        34px;

                    border-radius:
                        28px;

                    background:
                        #f0dfe4;
                }

                .circles {
                    position:
                        relative;

                    width:
                        224px;

                    height:
                        132px;

                    margin:
                        0 auto;
                }

                .circle {
                    position:
                        absolute;

                    top:
                        0;

                    width:
                        132px;

                    height:
                        132px;

                    display:
                        grid;

                    place-items:
                        center;

                    border-radius:
                        50%;
                }

                .circle-a {
                    left:
                        0;

                    z-index:
                        2;

                    background:
                        #b84b73;
                }

                .circle-b {
                    right:
                        0;

                    z-index:
                        1;

                    background:
                        #dfa7ba;
                }

                .check {
                    color:
                        white;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        31px;

                    line-height:
                        1;

                    font-weight:
                        500;
                }

                .dots {
                    display:
                        flex;

                    gap:
                        5px;

                    transform:
                        translateX(
                            15px
                        );
                }

                .dots i {
                    width:
                        6px;

                    height:
                        6px;

                    display:
                        block;

                    border-radius:
                        50%;

                    background:
                        rgba(
                            255,
                            255,
                            255,
                            .8
                        );

                    animation:
                        dotPulse
                        1.2s
                        infinite
                        ease-in-out;
                }

                .dots i:nth-child(2) {
                    animation-delay:
                        150ms;
                }

                .dots i:nth-child(3) {
                    animation-delay:
                        300ms;
                }

                @keyframes dotPulse {
                    0%,
                    60%,
                    100% {
                        opacity:
                            .35;

                        transform:
                            translateY(
                                0
                            );
                    }

                    30% {
                        opacity:
                            1;

                        transform:
                            translateY(
                                -3px
                            );
                    }
                }

                .status-labels {
                    display:
                        flex;

                    justify-content:
                        space-between;

                    gap:
                        15px;

                    margin-top:
                        24px;

                    color:
                        #85797d;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        9px;

                    line-height:
                        1;

                    font-weight:
                        800;

                    letter-spacing:
                        1.2px;

                    text-transform:
                        uppercase;
                }

                /* =====================================================
                   INVITE
                ===================================================== */

                .invite-section {
                    padding:
                        50px
                        0;

                    display:
                        grid;

                    grid-template-columns:
                        minmax(
                            0,
                            .85fr
                        )
                        minmax(
                            360px,
                            1.15fr
                        );

                    gap:
                        65px;

                    align-items:
                        center;

                    border-top:
                        1px solid
                        #ddd5d2;
                }

                .invite-copy h2 {
                    margin:
                        0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        44px;

                    line-height:
                        .96;

                    font-weight:
                        400;

                    letter-spacing:
                        -2px;
                }

                .invite-copy p {
                    max-width:
                        330px;

                    margin:
                        17px
                        0
                        0;

                    color:
                        #8a8083;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        12px;

                    line-height:
                        1.5;
                }

                .invite-card {
                    padding:
                        26px;

                    border:
                        1px solid
                        #e2d8d6;

                    border-radius:
                        23px;

                    background:
                        #fffaf8;
                }

                .url-label {
                    margin-bottom:
                        10px;

                    color:
                        #a09095;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        9px;

                    line-height:
                        1;

                    font-weight:
                        800;

                    letter-spacing:
                        1.4px;
                }

                .url-box {
                    width:
                        100%;

                    padding:
                        15px
                        16px;

                    overflow:
                        hidden;

                    border-radius:
                        13px;

                    background:
                        #f2e4e7;

                    color:
                        #665b5f;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        12px;

                    line-height:
                        1.4;

                    text-overflow:
                        ellipsis;

                    white-space:
                        nowrap;
                }

                .primary {
                    width:
                        100%;

                    min-height:
                        56px;

                    margin-top:
                        17px;

                    padding:
                        0
                        22px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        space-between;

                    gap:
                        20px;

                    border:
                        0;

                    border-radius:
                        999px;

                    background:
                        #c7245c;

                    color:
                        white;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        14px;

                    line-height:
                        1;

                    font-weight:
                        700;

                    cursor:
                        pointer;

                    transition:
                        transform
                        150ms
                        ease,
                        opacity
                        150ms
                        ease;
                }

                .primary:hover {
                    transform:
                        translateY(
                            -1px
                        );
                }

                .primary:active {
                    transform:
                        translateY(
                            0
                        );
                }

                .arrow {
                    font-size:
                        22px;

                    font-weight:
                        400;
                }

                .copy {
                    width:
                        100%;

                    margin-top:
                        8px;

                    padding:
                        12px;

                    border:
                        0;

                    background:
                        transparent;

                    color:
                        #8d8084;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        11px;

                    cursor:
                        pointer;

                    transition:
                        color
                        150ms
                        ease;
                }

                .copy:hover {
                    color:
                        #c51f59;
                }

                .copy.copied {
                    color:
                        #a13d63;

                    font-weight:
                        700;
                }

                /* =====================================================
                   BOTTOM
                ===================================================== */

                .bottom-status {
                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    gap:
                        8px;

                    padding:
                        9px
                        0
                        0;

                    color:
                        #a09397;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        10px;

                    line-height:
                        1;

                    letter-spacing:
                        .3px;
                }

                .pulse {
                    width:
                        6px;

                    height:
                        6px;

                    border-radius:
                        50%;

                    background:
                        #c7245c;

                    animation:
                        pulse
                        1.6s
                        ease-in-out
                        infinite;
                }

                @keyframes pulse {
                    0%,
                    100% {
                        opacity:
                            .3;
                    }

                    50% {
                        opacity:
                            1;
                    }
                }

                /* =====================================================
                   TABLET
                ===================================================== */

                @media (
                    max-width:
                        800px
                ) {

                    .hero {
                        grid-template-columns:
                            1fr;

                        gap:
                            38px;
                    }

                    .status-art {
                        max-width:
                            420px;
                    }

                    .invite-section {
                        grid-template-columns:
                            1fr;

                        gap:
                            28px;
                    }

                    .invite-copy p {
                        max-width:
                            460px;
                    }
                }

                /* =====================================================
                   MOBILE
                ===================================================== */

                @media (
                    max-width:
                        640px
                ) {

                    .page {
                        padding:
                            0
                            14px
                            38px;
                    }

                    .header {
                        min-height:
                            64px;

                        gap:
                            12px;
                    }

                    .brand {
                        font-size:
                            21px;
                    }

                    .names {
                        max-width:
                            48%;

                        gap:
                            5px;

                        font-size:
                            8px;

                        letter-spacing:
                            .6px;
                    }

                    .hero {
                        padding:
                            42px
                            0
                            46px;

                        gap:
                            32px;
                    }

                    .eyebrow,
                    .section-label {
                        font-size:
                            9px;

                        letter-spacing:
                            1.8px;
                    }

                    h1 {
                        font-size:
                            48px;

                        line-height:
                            .94;

                        letter-spacing:
                            -2.5px;
                    }

                    .lead {
                        margin-top:
                            18px;

                        font-size:
                            12px;
                    }

                    .status-art {
                        width:
                            100%;

                        padding:
                            25px
                            20px;

                        border-radius:
                            22px;
                    }

                    .circles {
                        width:
                            184px;

                        height:
                            108px;
                    }

                    .circle {
                        width:
                            108px;

                        height:
                            108px;
                    }

                    .check {
                        font-size:
                            27px;
                    }

                    .status-labels {
                        margin-top:
                            20px;

                        font-size:
                            8px;
                    }

                    .invite-section {
                        padding:
                            38px
                            0;

                        gap:
                            24px;
                    }

                    .invite-copy h2 {
                        font-size:
                            36px;

                        letter-spacing:
                            -1.6px;
                    }

                    .invite-copy p {
                        font-size:
                            11px;
                    }

                    .invite-card {
                        padding:
                            20px;

                        border-radius:
                            20px;
                    }

                    .url-box {
                        font-size:
                            10px;
                    }

                    .primary {
                        min-height:
                            52px;

                        padding:
                            0
                            18px;

                        font-size:
                            13px;
                    }

                    .bottom-status {
                        font-size:
                            9px;
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
                        11px;

                    padding:
                        24px;

                    text-align:
                        center;

                    background:
                        #f8f4f1;

                    color:
                        #211d1f;
                }

                .brand {
                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        26px;

                    line-height:
                        1;

                    font-weight:
                        700;

                    letter-spacing:
                        -1px;
                }

                p {
                    margin:
                        0;

                    color:
                        #91878a;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        12px;
                }

            `}</style>

        </main>
    );
}