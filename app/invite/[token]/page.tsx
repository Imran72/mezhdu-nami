"use client";

import {
    useEffect,
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

    if (loading) {
        return (
            <main className="state">

                <div className="brand">
                    между нами.
                </div>

                <p>
                    открываем приглашение
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
                            12px;

                        background:
                            #f8f4f1;
                    }

                    .brand {
                        font-family:
                            Georgia,
                            "Times New Roman",
                            serif;

                        font-size:
                            25px;

                        font-weight:
                            700;
                    }

                    p {
                        color:
                            #92878b;

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
                        "Приглашение не найдено."}
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
                            14px;

                        padding:
                            24px;

                        text-align:
                            center;

                        background:
                            #f8f4f1;
                    }

                    .brand {
                        font-family:
                            Georgia,
                            "Times New Roman",
                            serif;

                        font-size:
                            25px;

                        font-weight:
                            700;
                    }

                    p {
                        color:
                            #92878b;

                        font-family:
                            Arial,
                            sans-serif;
                    }
                `}</style>

            </main>
        );
    }

    const nameA =
        couple.partner_a_name ||
        "Первый человек";

    const nameB =
        couple.partner_b_name ||
        "Ты";

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
                        ПРИГЛАШЕНИЕ
                    </div>

                    <h1>
                        <span className="inviter-name">{nameA}</span>{" "}приглашает тебя пройти тест
                    </h1>

                    <p>
                        Ответь на вопросы об отношениях — и вы вместе узнаете,
                        где ваши взгляды совпадают.
                    </p>

                </section>

                <div className="test-details">
                    <span>16 вопросов · около 7 минут</span>
                    <span>Без правильных и неправильных ответов</span>
                </div>

                <button
                    type="button"
                    className="start"
                    onClick={
                        start
                    }
                >
                    Начать свою часть
                </button>

                <div className="note">
                    Ваши ответы скрыты друг от друга до завершения теста
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
                        0 20px
                        40px;

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
                        64px
                        0
                        38px;
                }

                .eyebrow {
                    margin-bottom:
                        14px;

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
                            48px,
                            8vw,
                            66px
                        );

                    line-height:
                        .93;

                    font-weight:
                        400;

                    letter-spacing:
                        -2.5px;
                }

                .hero p {
                    max-width:
                        450px;

                    margin:
                        23px
                        0
                        0;

                    color:
                        #81777a;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        14px;

                    line-height:
                        1.55;
                }

                .couple-card {
                    display:
                        grid;

                    grid-template-columns:
                        minmax(
                            0,
                            1fr
                        )
                        30px
                        minmax(
                            0,
                            1fr
                        );

                    gap:
                        12px;

                    align-items:
                        center;

                    padding:
                        18px;

                    border:
                        1px solid
                        #e4d9d7;

                    border-radius:
                        22px;

                    background:
                        #fffaf8;
                }

                .person {
                    min-height:
                        100px;

                    display:
                        flex;

                    flex-direction:
                        column;

                    justify-content:
                        center;

                    padding:
                        17px;

                    border-radius:
                        17px;

                    background:
                        #f3e7e8;
                }

                .person.active {
                    background:
                        #f0dce2;
                }

                .person span {
                    overflow:
                        hidden;

                    color:
                        #322a2d;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        21px;

                    text-overflow:
                        ellipsis;

                    white-space:
                        nowrap;
                }

                .person strong {
                    margin-top:
                        7px;

                    color:
                        #a08f94;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        9px;

                    letter-spacing:
                        1px;

                    text-transform:
                        uppercase;
                }

                .person.active strong {
                    color:
                        #c51f59;
                }

                .cross {
                    color:
                        #c51f59;

                    font-family:
                        Georgia,
                        serif;

                    font-size:
                        22px;

                    text-align:
                        center;
                }

                .start {
                    width:
                        100%;

                    min-height:
                        56px;

                    margin-top:
                        18px;

                    border: 0;

                    border-radius:
                        999px;

                    background:
                        #c51f59;

                    color:
                        white;

                    cursor:
                        pointer;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        14px;

                    font-weight:
                        700;
                }

                .note {
                    padding:
                        17px;

                    color:
                        #a09598;

                    font-family:
                        Arial,
                        sans-serif;

                    font-size:
                        10px;

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
                            32px;
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

                    .couple-card {
                        gap:
                            7px;

                        padding:
                            12px;
                    }

                    .person {
                        min-height:
                            90px;

                        padding:
                            13px;
                    }

                    .person span {
                        font-size:
                            18px;
                    }
                }

                .page { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
                .hero { margin: 0; padding: 40px 0 0; }
                .hero h1 { font-family: inherit; font-size: clamp(38px, 6vw, 56px); font-weight: 600; line-height: 1.08; letter-spacing: -1.8px; overflow-wrap: anywhere; }
                .hero p { font-family: inherit; font-size: 17px; line-height: 1.6; color: #746b6e; }
                .eyebrow, .start, .note { font-family: inherit; }
                .start { margin-top: 0; background: #cb225c; font-size: 15px; }
                .inviter-name { color: #cb225c; }
                .test-details { display: flex; flex-direction: column; gap: 5px; margin: 28px 0 24px; color: #746b6e; font-size: 13px; line-height: 1.6; }
                .test-details span:first-child { color: #211d1f; font-weight: 500; }
                .note { color: #74686d; font-size: 12px; line-height: 1.6; }
                @media (max-width: 640px) {
                    .hero { padding: 28px 0 0; }
                    .hero h1 { font-size: 40px; letter-spacing: -1.4px; }
                    .hero p { font-size: 16px; }
                }
            `}</style>

        </main>
    );
}