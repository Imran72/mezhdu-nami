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
     * ВАЖНО:
     *
     * Ссылка для партнёра строится ТОЛЬКО
     * через /invite/<invite_token>.
     *
     * Не используем текущий URL страницы.
     * Не используем /result/.
     * Не используем coupleId вместо token.
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
                 * отправляем первого участника
                 * на общий результат.
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

        /*
         * Первый человек ждёт.
         * Проверяем, закончил ли второй.
         */
        timer =
            setInterval(
                loadCouple,
                4000
            );

        return () => {
            cancelled = true;

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
        } catch (
            error
            ) {
            console.error(
                "Clipboard error:",
                error
            );

            /*
             * Fallback для браузеров,
             * где clipboard API недоступен.
             */
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

        /*
         * ВАЖНО:
         *
         * navigator.share получает именно inviteUrl.
         * Никогда не window.location.href.
         */
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
                error
                ) {
                /*
                 * Если человек просто закрыл
                 * системное окно share —
                 * ничего страшного.
                 */
                console.log(
                    "Share cancelled:",
                    error
                );
            }
        }

        await copyInvite();
    }

    if (loading) {
        return (
            <main className="state">

                <div className="brand">
                    между нами.
                </div>

                <p>
                    готовим ссылку
                </p>

                <style jsx>{`
                    .state {
                        min-height: 100vh;

                        display: grid;
                        place-items: center;
                        align-content: center;

                        gap: 12px;

                        background: #f8f4f1;

                        color: #211d1f;
                    }

                    .brand {
                        font-family:
                            Georgia,
                            "Times New Roman",
                            serif;

                        font-size: 26px;
                        font-weight: 700;
                    }

                    p {
                        margin: 0;

                        color: #91878a;

                        font-family:
                            Arial,
                            sans-serif;

                        font-size: 12px;
                    }
                `}</style>

            </main>
        );
    }

    if (
        error ||
        !couple
    ) {
        return (
            <main className="state">

                <div className="brand">
                    между нами.
                </div>

                <p>
                    {error ||
                        "Пара не найдена."}
                </p>

                <style jsx>{`
                    .state {
                        min-height: 100vh;

                        display: grid;
                        place-items: center;
                        align-content: center;

                        gap: 12px;

                        padding: 24px;

                        text-align: center;

                        background: #f8f4f1;

                        color: #211d1f;
                    }

                    .brand {
                        font-family:
                            Georgia,
                            "Times New Roman",
                            serif;

                        font-size: 26px;
                        font-weight: 700;
                    }

                    p {
                        margin: 0;

                        color: #91878a;

                        font-family:
                            Arial,
                            sans-serif;
                    }
                `}</style>

            </main>
        );
    }

    /*
     * invite_token обязателен.
     *
     * Лучше явно показать ошибку,
     * чем случайно отправить человеку
     * неправильный URL.
     */
    if (
        !couple.invite_token
    ) {
        return (
            <main className="state">

                <div className="brand">
                    между нами.
                </div>

                <p>
                    Не удалось создать
                    ссылку для партнёра.
                </p>

                <style jsx>{`
                    .state {
                        min-height: 100vh;

                        display: grid;
                        place-items: center;
                        align-content: center;

                        gap: 12px;

                        padding: 24px;

                        text-align: center;

                        background: #f8f4f1;
                    }

                    .brand {
                        font-family:
                            Georgia,
                            "Times New Roman",
                            serif;

                        font-size: 26px;
                        font-weight: 700;
                    }

                    p {
                        font-family:
                            Arial,
                            sans-serif;

                        color: #91878a;
                    }
                `}</style>

            </main>
        );
    }

    const partnerName =
        couple.partner_b_name ||
        "партнёра";

    return (
        <main className="page">

            <div className="shell">

                <header className="header">

                    <div className="brand">
                        между нами.
                    </div>

                </header>

                <section className="hero">

                    <div className="eyebrow">
                        ТВОЯ ЧАСТЬ ГОТОВА
                    </div>

                    <h1>
                        Теперь очередь:
                        <br />

                        <span>
                            {partnerName}
                        </span>
                        .
                    </h1>

                    <p className="lead">
                        После второго ответа
                        вы увидите картину целиком.
                    </p>

                </section>

                <section className="invite-card">

                    <div className="invite-label">
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
                        Отправить приглашение
                    </button>

                    <button
                        type="button"
                        className="copy"
                        onClick={
                            copyInvite
                        }
                    >
                        {copied
                            ? "Ссылка скопирована"
                            : "Скопировать ссылку"}
                    </button>

                </section>

                <div className="bottom-note">
                    Результат откроется
                    автоматически, когда
                    вы оба закончите.
                </div>

            </div>

            <style jsx>{`

                :global(*) {
                    box-sizing:
                        border-box;
                }

                :global(body) {
                    margin: 0;

                    background:
                        #f8f4f1;

                    color:
                        #211d1f;
                }

                .page {
                    min-height:
                        100vh;

                    padding:
                        0 22px
                        50px;

                    background:
                        #f8f4f1;
                }

                .shell {
                    width:
                        min(
                            620px,
                            100%
                        );

                    margin:
                        0 auto;
                }

                .header {
                    min-height:
                        72px;

                    display:
                        flex;

                    align-items:
                        center;
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

                    letter-spacing:
                        -1px;
                }

                .hero {
                    padding:
                        62px
                        0
                        38px;
                }

                .eyebrow {
                    margin-bottom:
                        15px;

                    color:
                        #c51f59;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        10px;

                    font-weight:
                        800;

                    letter-spacing:
                        2px;
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
                            45px,
                            8vw,
                            64px
                        );

                    line-height:
                        .95;

                    font-weight:
                        400;

                    letter-spacing:
                        -2.3px;
                }

                h1 span {
                    color:
                        #c51f59;
                }

                .lead {
                    max-width:
                        470px;

                    margin:
                        22px
                        0
                        0;

                    color:
                        #7f7679;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        14px;

                    line-height:
                        1.55;
                }

                .invite-card {
                    padding:
                        25px;

                    border:
                        1px solid
                        #e3d9d7;

                    border-radius:
                        23px;

                    background:
                        #fffaf8;
                }

                .invite-label {
                    margin-bottom:
                        10px;

                    color:
                        #a29398;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        9px;

                    font-weight:
                        800;

                    letter-spacing:
                        1.4px;
                }

                .url-box {
                    width:
                        100%;

                    margin-bottom:
                        18px;

                    padding:
                        15px;

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

                button {
                    width:
                        100%;

                    border: 0;

                    cursor:
                        pointer;
                }

                .primary {
                    min-height:
                        54px;

                    border-radius:
                        999px;

                    background:
                        #c7245c;

                    color:
                        white;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        14px;

                    font-weight:
                        700;
                }

                .copy {
                    margin-top:
                        10px;

                    padding:
                        12px;

                    background:
                        transparent;

                    color:
                        #8d8084;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        11px;
                }

                .bottom-note {
                    padding:
                        23px
                        5px;

                    color:
                        #a09397;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        11px;

                    line-height:
                        1.45;

                    text-align:
                        center;
                }

                @media (
                    max-width:
                        640px
                ) {

                    .page {
                        padding:
                            0 14px
                            34px;
                    }

                    .header {
                        min-height:
                            64px;
                    }

                    .brand {
                        font-size:
                            21px;
                    }

                    .hero {
                        padding-top:
                            44px;
                    }

                    .invite-card {
                        padding:
                            20px;
                    }
                }

            `}</style>

        </main>
    );
}