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

    const firstName =
        couple.partner_a_name ||
        "Вы";

    const partnerName =
        couple.partner_b_name ||
        "партнёр";

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

                    <div className="couple">

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
                            Теперь очередь
                            <br />

                            <span>
                                {partnerName}.
                            </span>
                        </h1>

                        <p className="lead">
                            Когда второй человек
                            закончит тест,
                            <br className="desktop-break" />
                            здесь автоматически
                            откроется
                            <br className="desktop-break" />
                            ваш общий результат.
                        </p>

                    </div>

                    {/* =================================================
                        TWO CIRCLES
                    ================================================= */}

                    <div className="status">

                        <div className="circles">

                            <div className="circle completed">

                                <svg
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M13 24.5L20.5 32L36 16"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                            </div>

                            <div className="circle waiting">

                                <div className="waiting-dots">

                                    <span />

                                    <span />

                                    <span />

                                </div>

                            </div>

                        </div>

                        <div className="circle-labels">

                            <span className="ready-label">
                                ТЫ ГОТОВ
                            </span>

                            <span>
                                ЖДЁМ{" "}
                                {partnerName.toUpperCase()}
                            </span>

                        </div>

                    </div>

                </section>

                {/* =====================================================
                    INVITE CARD
                ===================================================== */}

                <section className="invite-card">

                    <div className="invite-label">
                        ССЫЛКА ДЛЯ ПАРТНЁРА
                    </div>

                    <div className="link-box">

                        <div className="link-text">
                            {inviteUrl}
                        </div>

                        <button
                            type="button"
                            className="link-copy"
                            aria-label="Скопировать ссылку"
                            onClick={
                                copyInvite
                            }
                        >

                            {copied ? (
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M5 12.5L9.2 16.7L19 7"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <rect
                                        x="8"
                                        y="3"
                                        width="12"
                                        height="14"
                                        rx="2"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    />

                                    <path
                                        d="M16 17V19C16 20.1 15.1 21 14 21H6C4.9 21 4 20.1 4 19V8C4 6.9 4.9 6 6 6H8"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            )}

                        </button>

                    </div>

                    <button
                        type="button"
                        className="share-button"
                        onClick={
                            shareInvite
                        }
                    >

                        <span>
                            Отправить приглашение
                        </span>

                        <span className="share-arrow">
                            →
                        </span>

                    </button>

                    <button
                        type="button"
                        className={
                            copied
                                ? "copy-button copied"
                                : "copy-button"
                        }
                        onClick={
                            copyInvite
                        }
                    >
                        {copied
                            ? "Ссылка скопирована ✓"
                            : "Скопировать ссылку"}
                    </button>

                </section>

                {/* =====================================================
                    FOOTER
                ===================================================== */}

                <footer className="footer">

                    <div className="heart">

                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                d="M12 20.2C10.9 19.2 5.3 14.6 3.2 11.7C1.1 8.8 2 5.1 5.1 3.8C7.5 2.8 10.1 3.7 12 5.8C13.9 3.7 16.5 2.8 18.9 3.8C22 5.1 22.9 8.8 20.8 11.7C18.7 14.6 13.1 19.2 12 20.2Z"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinejoin="round"
                            />
                        </svg>

                    </div>

                    <span>
                        Результат откроется
                        автоматически, когда вы
                        оба закончите.
                    </span>

                </footer>

            </div>

            <style jsx>{`

                /* =====================================================
                   GLOBAL
                ===================================================== */

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
                        46px;

                    background:
                        #f8f4f1;
                }

                .shell {
                    width:
                        min(
                            980px,
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
                        116px;

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
                        #ded7d4;
                }

                .brand {
                    flex-shrink:
                        0;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        29px;

                    line-height:
                        1;

                    font-weight:
                        700;

                    letter-spacing:
                        -1.4px;
                }

                .couple {
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
                        16px;

                    color:
                        #92888b;

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
                        1.7px;

                    text-transform:
                        uppercase;

                    white-space:
                        nowrap;
                }

                .couple span {
                    overflow:
                        hidden;

                    text-overflow:
                        ellipsis;
                }

                .couple b {
                    flex-shrink:
                        0;

                    color:
                        #cb225c;

                    font-size:
                        14px;

                    font-weight:
                        700;
                }

                /* =====================================================
                   HERO
                ===================================================== */

                .hero {
                    padding:
                        93px
                        0
                        66px;

                    display:
                        grid;

                    grid-template-columns:
                        minmax(
                            0,
                            1.35fr
                        )
                        minmax(
                            290px,
                            .65fr
                        );

                    gap:
                        54px;

                    align-items:
                        center;
                }

                .hero-copy {
                    min-width:
                        0;
                }

                .eyebrow {
                    margin-bottom:
                        22px;

                    color:
                        #cc225d;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        11px;

                    line-height:
                        1;

                    font-weight:
                        800;

                    letter-spacing:
                        2.7px;
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
                            6.5vw,
                            82px
                        );

                    line-height:
                        .9;

                    font-weight:
                        400;

                    letter-spacing:
                        -4.3px;
                }

                h1 span {
                    color:
                        #ca235d;
                }

                .lead {
                    margin:
                        31px
                        0
                        0;

                    color:
                        #8c8486;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        16px;

                    line-height:
                        1.45;

                    font-weight:
                        400;
                }

                /* =====================================================
                   STATUS CIRCLES
                ===================================================== */

                .status {
                    min-width:
                        0;
                }

                .circles {
                    position:
                        relative;

                    width:
                        268px;

                    height:
                        154px;

                    margin:
                        0 auto;
                }

                .circle {
                    position:
                        absolute;

                    top:
                        0;

                    width:
                        154px;

                    height:
                        154px;

                    display:
                        grid;

                    place-items:
                        center;

                    border-radius:
                        50%;
                }

                .circle.completed {
                    left:
                        0;

                    z-index:
                        2;

                    background:
                        rgba(
                            197,
                            50,
                            101,
                            .82
                        );

                    color:
                        white;
                }

                .circle.completed svg {
                    width:
                        48px;

                    height:
                        48px;
                }

                .circle.waiting {
                    right:
                        0;

                    z-index:
                        1;

                    background:
                        #f0d9df;
                }

                .waiting-dots {
                    display:
                        flex;

                    align-items:
                        center;

                    gap:
                        8px;

                    transform:
                        translateX(
                            18px
                        );
                }

                .waiting-dots span {
                    width:
                        9px;

                    height:
                        9px;

                    border-radius:
                        50%;

                    background:
                        #d15c84;

                    animation:
                        waitingDot
                        1.4s
                        ease-in-out
                        infinite;
                }

                .waiting-dots span:nth-child(
                    2
                ) {
                    animation-delay:
                        .15s;
                }

                .waiting-dots span:nth-child(
                    3
                ) {
                    animation-delay:
                        .3s;
                }

                @keyframes waitingDot {

                    0%,
                    60%,
                    100% {
                        opacity:
                            .4;

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

                .circle-labels {
                    width:
                        268px;

                    margin:
                        18px
                        auto
                        0;

                    display:
                        grid;

                    grid-template-columns:
                        1fr
                        1fr;

                    gap:
                        28px;

                    color:
                        #92888b;

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
                        1.3px;

                    text-align:
                        center;

                    text-transform:
                        uppercase;
                }

                .circle-labels span {
                    overflow:
                        hidden;

                    text-overflow:
                        ellipsis;

                    white-space:
                        nowrap;
                }

                .circle-labels
                .ready-label {
                    color:
                        #ce3267;
                }

                /* =====================================================
                   INVITE CARD
                ===================================================== */

                .invite-card {
                    padding:
                        34px
                        44px
                        28px;

                    border:
                        1px solid
                        #ddd4d1;

                    border-radius:
                        28px;

                    background:
                        rgba(
                            255,
                            250,
                            248,
                            .42
                        );
                }

                .invite-label {
                    margin-bottom:
                        17px;

                    color:
                        #9f9296;

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
                        1.8px;
                }

                .link-box {
                    width:
                        100%;

                    min-width:
                        0;

                    height:
                        58px;

                    padding:
                        0
                        13px
                        0
                        20px;

                    display:
                        flex;

                    align-items:
                        center;

                    gap:
                        12px;

                    border-radius:
                        15px;

                    background:
                        #f1e4e7;
                }

                .link-text {
                    min-width:
                        0;

                    flex:
                        1;

                    overflow:
                        hidden;

                    color:
                        #62595c;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        13px;

                    line-height:
                        1;

                    text-overflow:
                        ellipsis;

                    white-space:
                        nowrap;
                }

                .link-copy {
                    width:
                        40px;

                    height:
                        40px;

                    flex-shrink:
                        0;

                    display:
                        grid;

                    place-items:
                        center;

                    padding:
                        0;

                    border:
                        0;

                    border-radius:
                        50%;

                    background:
                        transparent;

                    color:
                        #887d80;

                    cursor:
                        pointer;

                    transition:
                        background
                        150ms
                        ease,
                        color
                        150ms
                        ease;
                }

                .link-copy:hover {
                    background:
                        rgba(
                            255,
                            255,
                            255,
                            .7
                        );

                    color:
                        #c9225b;
                }

                .link-copy svg {
                    width:
                        22px;

                    height:
                        22px;
                }

                /* =====================================================
                   SHARE
                ===================================================== */

                .share-button {
                    width:
                        100%;

                    height:
                        64px;

                    margin-top:
                        20px;

                    padding:
                        0
                        25px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    position:
                        relative;

                    border:
                        0;

                    border-radius:
                        999px;

                    background:
                        #cb225c;

                    color:
                        white;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        15px;

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
                        background
                        150ms
                        ease;
                }

                .share-button:hover {
                    background:
                        #bd1d54;

                    transform:
                        translateY(
                            -1px
                        );
                }

                .share-button:active {
                    transform:
                        translateY(
                            0
                        );
                }

                .share-arrow {
                    position:
                        absolute;

                    right:
                        28px;

                    top:
                        50%;

                    transform:
                        translateY(
                            -53%
                        );

                    font-size:
                        27px;

                    line-height:
                        1;

                    font-weight:
                        300;
                }

                .copy-button {
                    width:
                        100%;

                    min-height:
                        44px;

                    margin-top:
                        10px;

                    padding:
                        8px;

                    border:
                        0;

                    background:
                        transparent;

                    color:
                        #8d8386;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        12px;

                    line-height:
                        1;

                    cursor:
                        pointer;
                }

                .copy-button:hover {
                    color:
                        #c9225b;
                }

                .copy-button.copied {
                    color:
                        #c9225b;

                    font-weight:
                        700;
                }

                /* =====================================================
                   FOOTER
                ===================================================== */

                .footer {
                    margin-top:
                        68px;

                    padding-top:
                        27px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    gap:
                        12px;

                    border-top:
                        1px solid
                        #ded7d4;

                    color:
                        #948a8d;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        11px;

                    line-height:
                        1.4;

                    text-align:
                        center;
                }

                .heart {
                    width:
                        23px;

                    height:
                        23px;

                    flex-shrink:
                        0;

                    color:
                        #d02961;
                }

                .heart svg {
                    width:
                        100%;

                    height:
                        100%;
                }

                /* =====================================================
                   TABLET
                ===================================================== */

                @media (
                    max-width:
                        820px
                ) {

                    .hero {
                        grid-template-columns:
                            minmax(
                                0,
                                1fr
                            )
                            250px;

                        gap:
                            24px;
                    }

                    .circles {
                        width:
                            224px;

                        height:
                            130px;
                    }

                    .circle {
                        width:
                            130px;

                        height:
                            130px;
                    }

                    .circle-labels {
                        width:
                            224px;

                        gap:
                            20px;
                    }

                    h1 {
                        font-size:
                            58px;
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
                            30px;
                    }

                    .header {
                        min-height:
                            66px;

                        gap:
                            12px;
                    }

                    .brand {
                        font-size:
                            21px;

                        letter-spacing:
                            -1px;
                    }

                    .couple {
                        max-width:
                            48%;

                        gap:
                            6px;

                        font-size:
                            7px;

                        letter-spacing:
                            .7px;
                    }

                    .couple b {
                        font-size:
                            10px;
                    }

                    /* ---------------------------------------------
                       HERO
                    --------------------------------------------- */

                    .hero {
                        padding:
                            44px
                            0
                            38px;

                        display:
                            block;
                    }

                    .eyebrow {
                        margin-bottom:
                            17px;

                        font-size:
                            9px;

                        letter-spacing:
                            2px;
                    }

                    h1 {
                        font-size:
                            clamp(
                                44px,
                                13vw,
                                57px
                            );

                        line-height:
                            .92;

                        letter-spacing:
                            -2.8px;
                    }

                    .lead {
                        margin-top:
                            20px;

                        font-size:
                            12px;

                        line-height:
                            1.5;
                    }

                    .desktop-break {
                        display:
                            none;
                    }

                    /* ---------------------------------------------
                       CIRCLES
                    --------------------------------------------- */

                    .status {
                        margin-top:
                            39px;
                    }

                    .circles {
                        width:
                            218px;

                        height:
                            126px;
                    }

                    .circle {
                        width:
                            126px;

                        height:
                            126px;
                    }

                    .circle.completed svg {
                        width:
                            40px;

                        height:
                            40px;
                    }

                    .waiting-dots {
                        gap:
                            6px;

                        transform:
                            translateX(
                                14px
                            );
                    }

                    .waiting-dots span {
                        width:
                            7px;

                        height:
                            7px;
                    }

                    .circle-labels {
                        width:
                            218px;

                        margin-top:
                            15px;

                        gap:
                            17px;

                        font-size:
                            7px;

                        letter-spacing:
                            .8px;
                    }

                    /* ---------------------------------------------
                       INVITE
                    --------------------------------------------- */

                    .invite-card {
                        padding:
                            23px
                            18px
                            17px;

                        border-radius:
                            21px;
                    }

                    .invite-label {
                        margin-bottom:
                            13px;

                        font-size:
                            8px;

                        letter-spacing:
                            1.4px;
                    }

                    .link-box {
                        height:
                            54px;

                        padding-left:
                            15px;

                        border-radius:
                            13px;
                    }

                    .link-text {
                        font-size:
                            11px;
                    }

                    .link-copy {
                        width:
                            38px;

                        height:
                            38px;
                    }

                    .link-copy svg {
                        width:
                            20px;

                        height:
                            20px;
                    }

                    .share-button {
                        height:
                            56px;

                        margin-top:
                            15px;

                        padding:
                            0
                            50px
                            0
                            18px;

                        font-size:
                            13px;
                    }

                    .share-arrow {
                        right:
                            21px;

                        font-size:
                            23px;
                    }

                    .copy-button {
                        margin-top:
                            6px;

                        font-size:
                            11px;
                    }

                    /* ---------------------------------------------
                       FOOTER
                    --------------------------------------------- */

                    .footer {
                        margin-top:
                            39px;

                        padding:
                            22px
                            16px
                            0;

                        gap:
                            9px;

                        font-size:
                            9px;
                    }

                    .heart {
                        width:
                            19px;

                        height:
                            19px;
                    }
                }

                /* =====================================================
                   VERY SMALL MOBILE
                ===================================================== */

                @media (
                    max-width:
                        370px
                ) {

                    h1 {
                        font-size:
                            43px;
                    }

                    .circles {
                        width:
                            198px;

                        height:
                            114px;
                    }

                    .circle {
                        width:
                            114px;

                        height:
                            114px;
                    }

                    .circle-labels {
                        width:
                            198px;
                    }

                    .share-button {
                        font-size:
                            12px;
                    }
                }

                /* =====================================================
                   REDUCED MOTION
                ===================================================== */

                @media (
                    prefers-reduced-motion:
                        reduce
                ) {

                    .waiting-dots span {
                        animation:
                            none;
                    }

                    .share-button,
                    .link-copy {
                        transition:
                            none;
                    }
                }

            `}</style>

        </main>
    );
}

/* ============================================================
   STATE SCREEN
============================================================ */

function StateScreen({
                         text,
                     }: {
    text: string;
}) {
    return (
        <main className="state">

            <div className="state-brand">
                между нами.
            </div>

            <div className="state-dots">

                <span />

                <span />

                <span />

            </div>

            <p>
                {text}
            </p>

            <style jsx>{`

                :global(body) {
                    margin:
                        0;

                    background:
                        #f8f4f1;
                }

                .state {
                    min-height:
                        100vh;

                    display:
                        flex;

                    flex-direction:
                        column;

                    align-items:
                        center;

                    justify-content:
                        center;

                    gap:
                        16px;

                    padding:
                        24px;

                    background:
                        #f8f4f1;

                    color:
                        #211d1f;

                    text-align:
                        center;
                }

                .state-brand {
                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size:
                        28px;

                    line-height:
                        1;

                    font-weight:
                        700;

                    letter-spacing:
                        -1.2px;
                }

                .state-dots {
                    display:
                        flex;

                    gap:
                        5px;

                    margin-top:
                        6px;
                }

                .state-dots span {
                    width:
                        6px;

                    height:
                        6px;

                    border-radius:
                        50%;

                    background:
                        #c9255e;

                    animation:
                        stateDot
                        1.2s
                        ease-in-out
                        infinite;
                }

                .state-dots span:nth-child(
                    2
                ) {
                    animation-delay:
                        .15s;
                }

                .state-dots span:nth-child(
                    3
                ) {
                    animation-delay:
                        .3s;
                }

                p {
                    margin:
                        0;

                    color:
                        #92888b;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size:
                        12px;
                }

                @keyframes stateDot {

                    0%,
                    60%,
                    100% {
                        opacity:
                            .3;

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
                                -2px
                            );
                    }
                }

                @media (
                    prefers-reduced-motion:
                        reduce
                ) {

                    .state-dots span {
                        animation:
                            none;
                    }
                }

            `}</style>

        </main>
    );
}