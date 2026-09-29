'use client';

import {
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    useParams,
    useRouter,
} from 'next/navigation';

import {
    determineArchetype,
    getFreeInsights,
    Comparison,
} from '../../../lib/archetypes';

type Couple = {
    id: string;
    partner_a_name: string;
    partner_b_name: string;
    partner_a_completed: boolean;
    partner_b_completed: boolean;
    paid?: boolean;
};

type ResultData = {
    waiting?: boolean;
    couple: Couple;
    comparisons?: Comparison[];

    highlights?: {
        same?: Comparison[];
        close?: Comparison[];
        different?: Comparison[];
    };
};

export default function ResultPage() {
    const params =
        useParams<{
            coupleId: string;
        }>();

    const router = useRouter();

    const coupleId =
        params.coupleId;

    const [data, setData] =
        useState<ResultData | null>(
            null
        );

    const [error, setError] =
        useState('');

    useEffect(() => {
        async function loadResult() {
            try {
                const response =
                    await fetch(
                        `/api/report?id=${encodeURIComponent(
                            coupleId
                        )}`,
                        {
                            cache: 'no-store',
                        }
                    );

                if (!response.ok) {
                    throw new Error(
                        'Не удалось загрузить результат'
                    );
                }

                const result: ResultData =
                    await response.json();

                if (result.waiting) {
                    router.replace(
                        `/waiting/${coupleId}`
                    );

                    return;
                }

                setData(result);
            } catch (err) {
                console.error(err);

                setError(
                    'Не получилось загрузить результат.'
                );
            }
        }

        loadResult();
    }, [
        coupleId,
        router,
    ]);

    const comparisons =
        useMemo(
            () =>
                data?.comparisons ?? [],
            [data]
        );

    const archetype =
        useMemo(
            () =>
                determineArchetype(
                    comparisons
                ),
            [comparisons]
        );

    const insights =
        useMemo(
            () =>
                getFreeInsights(
                    comparisons
                ),
            [comparisons]
        );

    const sameCount =
        comparisons.filter(
            (item) =>
                item.similarity ===
                'same'
        ).length;

    const closeCount =
        comparisons.filter(
            (item) =>
                item.similarity ===
                'close'
        ).length;

    const differentCount =
        comparisons.filter(
            (item) =>
                item.similarity ===
                'different'
        ).length;

    const totalCount =
        comparisons.length;

    const wavePercent =
        totalCount > 0
            ? Math.round(
                (
                    sameCount +
                    closeCount * 0.5
                ) /
                totalCount *
                100
            )
            : 0;

    if (error) {
        return (
            <>
                <main className="state-page">

                    <div className="state-shell">

                        <div className="brand">
                            между нами
                        </div>

                        <h1>
                            Что-то пошло не так.
                        </h1>

                        <p>
                            {error}
                        </p>

                    </div>

                </main>

                <style jsx global>
                    {styles}
                </style>
            </>
        );
    }

    if (!data) {
        return (
            <>
                <main className="loading-page">

                    <div className="loading-circles">

                        <span />
                        <span />

                        <b>
                            ✦
                        </b>

                    </div>

                    <div className="loading-brand">
                        между нами
                    </div>

                    <p>
                        сравниваем ваши ответы...
                    </p>

                </main>

                <style jsx global>
                    {styles}
                </style>
            </>
        );
    }

    const nameA =
        data.couple.partner_a_name;

    const nameB =
        data.couple.partner_b_name;

    return (
        <>
            <main className="page">

                {/* =====================================================
            HERO
        ===================================================== */}

                <section className="hero">

                    <div className="hero-decoration star-one">
                        ✦
                    </div>

                    <div className="hero-decoration star-two">
                        +
                    </div>

                    <div className="shell">

                        <header className="topbar">

                            <div className="brand">
                                между нами
                            </div>

                            <div className="result-pill">
                                результат для двоих
                            </div>

                        </header>

                        <div className="hero-content">

                            <div className="names">
                                {nameA}
                                <span>
                  +
                </span>
                                {nameB}
                            </div>

                            <div className="hero-result">

                                <div className="score-column">

                                    <div className="score">
                                        {wavePercent}
                                        <span>
                      %
                    </span>
                                    </div>

                                    <div className="score-label">
                                        НА ОДНОЙ ВОЛНЕ
                                    </div>

                                    <p className="score-description">
                                        Похожесть ваших ответов
                                        на ситуации из теста
                                    </p>

                                </div>

                                <div className="hero-art-column">

                                    <CoupleArt
                                        emojiA={
                                            archetype.emojiA
                                        }
                                        emojiB={
                                            archetype.emojiB
                                        }
                                        archetypeId={
                                            archetype.id
                                        }
                                    />

                                </div>

                                <div className="type-column">

                                    <div className="type-label">
                                        ВАШ ТИП ПАРЫ
                                    </div>

                                    <h1>
                                        {archetype.title}
                                    </h1>

                                    <p>
                                        {
                                            archetype.description
                                        }
                                    </p>

                                </div>

                            </div>

                            <div className="answer-summary">

                                <SummaryItem
                                    value={sameCount}
                                    label="совпали"
                                />

                                <div className="summary-line" />

                                <SummaryItem
                                    value={closeCount}
                                    label="близко"
                                />

                                <div className="summary-line" />

                                <SummaryItem
                                    value={differentCount}
                                    label="по-разному"
                                />

                            </div>

                        </div>

                    </div>

                    <div className="hero-bottom" />

                </section>

                {/* =====================================================
            INSIGHTS
        ===================================================== */}

                <section className="insights-section">

                    <div className="shell">

                        <div className="section-heading">

                            <div className="eyebrow">
                                ЧТО МЫ ЗАМЕТИЛИ
                            </div>

                            <h2>
                                Три вещи про вас.
                            </h2>

                        </div>

                        <div className="insight-grid">

                            <InsightCard
                                symbol="♥"
                                title="Вы совпали"
                                text={
                                    insights.sameInsight
                                }
                            />

                            <InsightCard
                                symbol="↔"
                                title="А вот тут интересно"
                                text={
                                    insights.differenceInsight
                                }
                            />

                            <InsightCard
                                symbol="✦"
                                title="Ваша суперсила"
                                text={
                                    insights.superpower
                                }
                            />

                        </div>

                    </div>

                </section>

                {/* =====================================================
            QUESTION
        ===================================================== */}

                <section className="question-section">

                    <div className="question-star question-star-one">
                        ✦
                    </div>

                    <div className="question-star question-star-two">
                        ✦
                    </div>

                    <div className="question-shell">

                        <div className="question-visual">

                            <div className="moon">
                                ☾
                            </div>

                            <div className="tiny-couple">

                                <div className="tiny-person">
                                    {
                                        archetype.emojiA
                                    }
                                </div>

                                <span>
                  ♥
                </span>

                                <div className="tiny-person second">
                                    {
                                        archetype.emojiB
                                    }
                                </div>

                            </div>

                        </div>

                        <div className="question-copy">

                            <div className="question-label">
                                ВОПРОС ВАМ НА ВЕЧЕР
                            </div>

                            <h2>
                                “{
                                insights.eveningQuestion
                            }”
                            </h2>

                            <p>
                                Без правильного ответа.
                                Просто поговорите.
                            </p>

                        </div>

                    </div>

                </section>

                {/* =====================================================
            PAYWALL
        ===================================================== */}

                <section className="paywall-section">

                    <div className="paywall-shell">

                        <div className="paywall-copy">

                            <div className="eyebrow">
                                ХОТИТЕ КОПНУТЬ ГЛУБЖЕ?
                            </div>

                            <h2>
                                Между ответами
                                осталось ещё кое-что.
                            </h2>

                            <p>
                                В полном разборе покажем
                                паттерны, которые сложно
                                увидеть по одному ответу.
                            </p>

                        </div>

                        <div className="paywall-card">

                            <div className="paywall-list">

                                <PaywallItem>
                                    Чего каждому немного
                                    не хватает
                                </PaywallItem>

                                <PaywallItem>
                                    Как вы по-разному
                                    воспринимаете заботу
                                </PaywallItem>

                                <PaywallItem>
                                    Что один может
                                    не замечать о другом
                                </PaywallItem>

                                <PaywallItem>
                                    Что каждый хочет
                                    сохранить
                                </PaywallItem>

                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    router.push(
                                        `/report/${coupleId}`
                                    )
                                }
                            >

                <span>
                  Полный разбор
                </span>

                                <strong>
                                    299 ₽
                                </strong>

                            </button>

                            <div className="paywall-note">
                                один разбор · для вас двоих
                            </div>

                        </div>

                    </div>

                </section>

            </main>

            <style jsx global>
                {styles}
            </style>
        </>
    );
}

/* ============================================================
   HERO ART
============================================================ */

function CoupleArt({
                       emojiA,
                       emojiB,
                       archetypeId,
                   }: {
    emojiA: string;
    emojiB: string;
    archetypeId: string;
}) {
    return (
        <div className="couple-art">

            <svg
                className="blob"
                viewBox="0 0 420 360"
                aria-hidden="true"
            >
                <path
                    d="
            M74 103
            C118 35 222 13 304 50
            C379 84 414 167 383 244
            C350 326 255 356 167 329
            C78 302 21 238 37 166
            C43 140 54 119 74 103Z
          "
                    fill="#E9D9E1"
                />

                <circle
                    cx="64"
                    cy="188"
                    r="6"
                    fill="#C49C47"
                />

                <circle
                    cx="360"
                    cy="105"
                    r="5"
                    fill="#A74769"
                />

                <path
                    d="
            M335 56
            L341 70
            L356 76
            L341 82
            L335 97
            L329 82
            L314 76
            L329 70Z
          "
                    fill="#C49C47"
                />
            </svg>

            <div className="people">

                <div className="person">

                    <div className="head">
                        {emojiA}
                    </div>

                    <div className="body body-one" />

                </div>

                <div className="heart">
                    ♥
                </div>

                <div className="person person-two">

                    <div className="head">
                        {emojiB}
                    </div>

                    <div className="body body-two" />

                </div>

            </div>

            <div className="art-tag">
                {
                    getArchetypeTag(
                        archetypeId
                    )
                }
            </div>

        </div>
    );
}

function getArchetypeTag(
    id: string
) {
    switch (id) {
        case 'astronauts':
            return 'на одной орбите';

        case 'knight_princess':
            return 'забота в деталях';

        case 'wizards':
            return 'магия разговора';

        case 'pirates':
            return 'куда-нибудь вместе';

        case 'sun_moon':
            return 'разные · рядом';

        case 'dragon_keeper':
            return 'огонь + спокойствие';

        case 'players':
            return 'одна команда';

        case 'homekeepers':
            return 'своё место';

        default:
            return 'между вами';
    }
}

/* ============================================================
   SUMMARY
============================================================ */

function SummaryItem({
                         value,
                         label,
                     }: {
    value: number;
    label: string;
}) {
    return (
        <div className="summary-item">

            <strong>
                {value}
            </strong>

            <span>
        {label}
      </span>

        </div>
    );
}

/* ============================================================
   INSIGHT
============================================================ */

function InsightCard({
                         symbol,
                         title,
                         text,
                     }: {
    symbol: string;
    title: string;
    text: string;
}) {
    return (
        <article className="insight-card">

            <div className="insight-top">

                <div className="insight-symbol">
                    {symbol}
                </div>

                <div className="insight-title">
                    {title}
                </div>

            </div>

            <p>
                {text}
            </p>

        </article>
    );
}

/* ============================================================
   PAYWALL ITEM
============================================================ */

function PaywallItem({
                         children,
                     }: {
    children:
        React.ReactNode;
}) {
    return (
        <div className="paywall-item">

      <span>
        ✓
      </span>

            <div>
                {children}
            </div>

        </div>
    );
}

/* ============================================================
   STYLES
============================================================ */

const styles = `

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;

    background: #ffffff;

    color: #282326;

    font-family:
      Inter,
      ui-sans-serif,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;
  }

  button {
    font: inherit;
  }

  .page {
    min-height: 100svh;

    overflow: hidden;
  }

  .shell {
    width:
      min(
        calc(100% - 48px),
        1180px
      );

    margin: 0 auto;
  }

  .brand {
    color: #292326;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size: 26px;
    font-weight: 600;

    letter-spacing:
      -0.04em;
  }

  .eyebrow {
    color: #A74669;

    font-size: 11px;
    font-weight: 850;

    letter-spacing: 0.18em;
  }

  /* ============================================================
     HERO
  ============================================================ */

  .hero {
    position: relative;

    overflow: hidden;

    background:
      radial-gradient(
        circle at 85% 10%,
        rgba(
          255,
          255,
          255,
          0.72
        ),
        transparent 30%
      ),
      #F7F1F4;

    padding-bottom: 58px;
  }

  .topbar {
    height: 82px;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .result-pill {
    padding:
      8px
      13px;

    border:
      1px solid
      rgba(
        122,
        83,
        98,
        0.15
      );

    border-radius: 999px;

    background:
      rgba(
        255,
        255,
        255,
        0.55
      );

    color: #8B7C81;

    font-size: 11px;
  }

  .hero-content {
    padding-top: 16px;
  }

  .names {
    text-align: center;

    color: #282326;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        50px,
        6vw,
        76px
      );

    font-weight: 500;

    line-height: 1;

    letter-spacing:
      -0.055em;
  }

  .names span {
    margin:
      0
      12px;

    color: #AF496E;
  }

  .hero-result {
    display: grid;

    grid-template-columns:
      0.72fr
      1.15fr
      1fr;

    align-items: center;

    gap: 30px;

    margin-top: 22px;
  }

  /* SCORE */

  .score-column {
    text-align: center;
  }

  .score {
    color: #A74669;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        76px,
        8vw,
        112px
      );

    line-height: 0.9;

    letter-spacing:
      -0.07em;
  }

  .score span {
    margin-left: 2px;

    font-size: 0.42em;
  }

  .score-label {
    margin-top: 12px;

    color: #A74669;

    font-size: 11px;
    font-weight: 900;

    letter-spacing: 0.17em;
  }

  .score-description {
    max-width: 170px;

    margin:
      9px
      auto
      0;

    color: #93868B;

    font-size: 11px;
    line-height: 1.45;
  }

  /* TYPE */

  .type-label {
    margin-bottom: 10px;

    color: #A74669;

    font-size: 10px;
    font-weight: 850;

    letter-spacing: 0.19em;
  }

  .type-column h1 {
    margin: 0;

    color: #282326;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        40px,
        4.3vw,
        59px
      );

    font-weight: 500;

    line-height: 0.98;

    letter-spacing:
      -0.045em;
  }

  .type-column p {
    max-width: 380px;

    margin:
      17px
      0
      0;

    color: #71666A;

    font-size: 15px;
    line-height: 1.55;
  }

  /* ART */

  .hero-art-column {
    display: flex;
    justify-content: center;
  }

  .couple-art {
    position: relative;

    width: 100%;
    max-width: 400px;

    aspect-ratio:
      420 / 360;
  }

  .blob {
    position: absolute;

    inset: 0;

    width: 100%;
    height: 100%;
  }

  .people {
    position: absolute;

    z-index: 2;

    left: 50%;
    bottom: 54px;

    display: flex;
    align-items: flex-end;

    gap: 6px;

    transform:
      translateX(-50%);
  }

  .person {
    position: relative;

    width: 96px;
    height: 162px;
  }

  .person-two {
    transform:
      translateY(-4px);
  }

  .head {
    position: absolute;

    z-index: 2;

    top: 0;
    left: 50%;

    width: 70px;
    height: 70px;

    display: flex;
    align-items: center;
    justify-content: center;

    transform:
      translateX(-50%);

    border:
      3px solid #493E42;

    border-radius: 50%;

    background: #EDC5B3;

    font-size: 34px;
  }

  .body {
    position: absolute;

    left: 50%;
    bottom: 0;

    width: 92px;
    height: 108px;

    transform:
      translateX(-50%);

    border:
      3px solid #493E42;

    border-radius:
      42px 42px 20px 20px;
  }

  .body-one {
    background: #A84A6D;
  }

  .body-two {
    background: #8C80A4;
  }

  .heart {
    align-self: center;

    margin-bottom: 60px;

    color: #A53E64;

    font-size: 22px;
  }

  .art-tag {
    position: absolute;

    z-index: 4;

    right: 16px;
    bottom: 36px;

    padding:
      8px
      12px;

    border-radius: 999px;

    background: #ffffff;

    box-shadow:
      0 8px 25px
      rgba(
        72,
        49,
        58,
        0.09
      );

    color: #7F6F75;

    font-size: 10px;
    font-weight: 700;
  }

  /* SUMMARY */

  .answer-summary {
    width: fit-content;

    display: flex;
    align-items: center;

    gap: 22px;

    margin:
      18px
      auto
      0;

    padding:
      12px
      22px;

    border:
      1px solid
      rgba(
        111,
        77,
        90,
        0.12
      );

    border-radius: 999px;

    background:
      rgba(
        255,
        255,
        255,
        0.58
      );
  }

  .summary-item {
    display: flex;
    align-items: baseline;

    gap: 6px;
  }

  .summary-item strong {
    color: #A74669;

    font-family:
      Georgia,
      serif;

    font-size: 22px;
    font-weight: 500;
  }

  .summary-item span {
    color: #82767A;

    font-size: 11px;
  }

  .summary-line {
    width: 1px;
    height: 24px;

    background:
      rgba(
        99,
        70,
        81,
        0.14
      );
  }

  .hero-decoration {
    position: absolute;

    color: #C3A04C;
  }

  .star-one {
    top: 150px;
    left: 5%;

    font-size: 20px;
  }

  .star-two {
    top: 105px;
    right: 5%;

    color: #B95D80;

    font-size: 25px;
  }

  .hero-bottom {
    position: absolute;

    left: -5%;
    right: -5%;
    bottom: -50px;

    height: 75px;

    border-radius: 50%;

    background: #ffffff;
  }

  /* ============================================================
     INSIGHTS
  ============================================================ */

  .insights-section {
    padding:
      65px
      0
      80px;

    background: #ffffff;
  }

  .section-heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    gap: 30px;

    margin-bottom: 30px;
  }

  .section-heading h2 {
    margin:
      8px
      0
      0;

    color: #292326;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        36px,
        4vw,
        50px
      );

    font-weight: 500;

    line-height: 1;

    letter-spacing:
      -0.04em;
  }

  .insight-grid {
    display: grid;

    grid-template-columns:
      repeat(
        3,
        minmax(0, 1fr)
      );

    gap: 14px;
  }

  .insight-card {
    min-height: 245px;

    display: flex;
    flex-direction: column;

    padding: 24px;

    border:
      1px solid #EBE3E0;

    border-radius: 22px;

    background: #FBF9F8;
  }

  .insight-top {
    display: flex;
    align-items: center;

    gap: 10px;
  }

  .insight-symbol {
    width: 36px;
    height: 36px;

    display: flex;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;

    border-radius: 12px;

    background: #F0DFE6;

    color: #A74669;

    font-size: 15px;
    font-weight: 800;
  }

  .insight-title {
    color: #A74669;

    font-size: 10px;
    font-weight: 850;

    letter-spacing: 0.09em;

    text-transform: uppercase;
  }

  .insight-card p {
    margin:
      auto
      0
      0;

    color: #554D50;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size: 20px;
    line-height: 1.42;
  }

  /* ============================================================
     QUESTION
  ============================================================ */

  .question-section {
    position: relative;

    overflow: hidden;

    padding:
      68px
      24px;

    background: #625770;
  }

  .question-shell {
    width:
      min(
        100%,
        1040px
      );

    display: grid;

    grid-template-columns:
      260px
      minmax(0, 1fr);

    align-items: center;

    gap: 50px;

    margin: 0 auto;
  }

  .question-visual {
    position: relative;

    height: 230px;
  }

  .moon {
    position: absolute;

    top: 0;
    left: 50%;

    width: 190px;
    height: 190px;

    display: flex;
    align-items: center;
    justify-content: center;

    transform:
      translateX(-50%);

    border-radius: 50%;

    background: #F1E5C9;

    color: #D1AA51;

    font-size: 75px;
  }

  .tiny-couple {
    position: absolute;

    z-index: 2;

    left: 50%;
    bottom: 0;

    display: flex;
    align-items: center;

    gap: 7px;

    transform:
      translateX(-50%);
  }

  .tiny-person {
    width: 68px;
    height: 82px;

    display: flex;
    align-items: center;
    justify-content: center;

    border:
      3px solid #433D49;

    border-radius:
      34px 34px 16px 16px;

    background: #B87891;

    font-size: 29px;
  }

  .tiny-person.second {
    background: #9185A6;
  }

  .tiny-couple span {
    color: #F0BDD0;

    font-size: 17px;
  }

  .question-label {
    color: #DDB9C7;

    font-size: 10px;
    font-weight: 850;

    letter-spacing: 0.17em;
  }

  .question-copy h2 {
    max-width: 680px;

    margin:
      13px
      0
      0;

    color: #ffffff;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        34px,
        4vw,
        49px
      );

    font-weight: 500;

    line-height: 1.08;

    letter-spacing:
      -0.035em;
  }

  .question-copy p {
    margin:
      18px
      0
      0;

    color: #D8D0DB;

    font-size: 13px;
  }

  .question-star {
    position: absolute;

    color:
      rgba(
        255,
        255,
        255,
        0.25
      );
  }

  .question-star-one {
    top: 30px;
    left: 7%;

    font-size: 25px;
  }

  .question-star-two {
    right: 8%;
    bottom: 35px;

    font-size: 16px;
  }

  /* ============================================================
     PAYWALL
  ============================================================ */

  .paywall-section {
    padding:
      75px
      24px
      90px;

    background: #F9F6F4;
  }

  .paywall-shell {
    width:
      min(
        100%,
        1040px
      );

    display: grid;

    grid-template-columns:
      1fr
      0.95fr;

    align-items: center;

    gap: 70px;

    margin: 0 auto;
  }

  .paywall-copy h2 {
    max-width: 520px;

    margin:
      12px
      0
      18px;

    color: #292326;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        38px,
        4.4vw,
        54px
      );

    font-weight: 500;

    line-height: 1.02;

    letter-spacing:
      -0.04em;
  }

  .paywall-copy p {
    max-width: 480px;

    margin: 0;

    color: #81767A;

    font-size: 15px;
    line-height: 1.55;
  }

  .paywall-card {
    padding: 26px;

    border:
      1px solid #E9DFDC;

    border-radius: 24px;

    background: #ffffff;

    box-shadow:
      0 20px 60px
      rgba(
        73,
        52,
        60,
        0.05
      );
  }

  .paywall-list {
    display: flex;
    flex-direction: column;

    gap: 14px;
  }

  .paywall-item {
    display: grid;

    grid-template-columns:
      24px
      1fr;

    align-items: start;

    gap: 10px;

    color: #554C50;

    font-size: 14px;
    line-height: 1.4;
  }

  .paywall-item > span {
    width: 22px;
    height: 22px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    background: #F1E0E7;

    color: #A74669;

    font-size: 10px;
    font-weight: 900;
  }

  .paywall-card button {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 15px;

    margin-top: 23px;

    padding:
      17px
      18px;

    border: 0;
    border-radius: 14px;

    background: #A74669;

    color: #ffffff;

    cursor: pointer;

    font-size: 14px;
    font-weight: 750;

    transition:
      transform 150ms ease,
      background 150ms ease;
  }

  .paywall-card button:hover {
    transform:
      translateY(-1px);

    background: #943C5D;
  }

  .paywall-card button strong {
    font-size: 15px;
  }

  .paywall-note {
    margin-top: 10px;

    color: #A3979B;

    font-size: 10px;

    text-align: center;
  }

  /* ============================================================
     LOADING
  ============================================================ */

  .loading-page,
  .state-page {
    min-height: 100svh;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #F7F1F4;
  }

  .loading-page {
    flex-direction: column;
  }

  .loading-circles {
    position: relative;

    width: 100px;
    height: 64px;

    margin-bottom: 20px;
  }

  .loading-circles span {
    position: absolute;

    width: 64px;
    height: 64px;

    border-radius: 50%;
  }

  .loading-circles span:first-child {
    left: 0;

    background:
      rgba(
        167,
        70,
        105,
        0.5
      );
  }

  .loading-circles span:nth-child(2) {
    right: 0;

    background:
      rgba(
        140,
        128,
        164,
        0.5
      );
  }

  .loading-circles b {
    position: absolute;

    top: 50%;
    left: 50%;

    color: #ffffff;

    transform:
      translate(
        -50%,
        -50%
      );
  }

  .loading-brand {
    font-family:
      Georgia,
      serif;

    font-size: 25px;
  }

  .loading-page p {
    margin-top: 8px;

    color: #93868B;

    font-size: 12px;
  }

  .state-shell {
    width:
      min(
        calc(100% - 40px),
        650px
      );
  }

  .state-shell h1 {
    margin-top: 50px;

    font-family:
      Georgia,
      serif;

    font-size: 48px;

    font-weight: 500;
  }

  .state-shell p {
    color: #82767A;
  }

  /* ============================================================
     TABLET
  ============================================================ */

  @media (
    max-width: 900px
  ) {

    .hero-result {
      grid-template-columns:
        0.7fr
        1fr;

      gap: 20px;
    }

    .type-column {
      grid-column:
        1 / -1;

      max-width: 650px;

      margin:
        -5px
        auto
        0;

      text-align: center;
    }

    .type-column p {
      margin:
        16px
        auto
        0;
    }

    .insight-grid {
      grid-template-columns: 1fr;
    }

    .insight-card {
      min-height: auto;
    }

    .insight-card p {
      margin-top: 25px;
    }

    .question-shell {
      grid-template-columns:
        200px
        1fr;

      gap: 30px;
    }

    .paywall-shell {
      gap: 35px;
    }

  }

  /* ============================================================
     MOBILE
  ============================================================ */

  @media (
    max-width: 600px
  ) {

    .shell {
      width:
        calc(100% - 32px);
    }

    .hero {
      padding-bottom: 45px;
    }

    .topbar {
      height: 68px;
    }

    .brand {
      font-size: 21px;
    }

    .result-pill {
      display: none;
    }

    .hero-content {
      padding-top: 7px;
    }

    .names {
      font-size:
        clamp(
          44px,
          14vw,
          60px
        );
    }

    .names span {
      margin:
        0
        6px;
    }

    .hero-result {
      display: flex;
      flex-direction: column;

      gap: 0;

      margin-top: 20px;
    }

    .score-column {
      order: 1;
    }

    .score {
      font-size: 86px;
    }

    .score-description {
      display: none;
    }

    .hero-art-column {
      order: 2;

      width: 100%;

      margin-top: -5px;
    }

    .couple-art {
      max-width: 330px;
    }

    .type-column {
      order: 3;

      margin-top: -18px;
    }

    .type-column h1 {
      font-size: 46px;
    }

    .type-column p {
      max-width: 340px;

      font-size: 14px;
    }

    .answer-summary {
      gap: 12px;

      margin-top: 23px;

      padding:
        10px
        15px;
    }

    .summary-item {
      gap: 4px;
    }

    .summary-item strong {
      font-size: 19px;
    }

    .summary-item span {
      font-size: 10px;
    }

    .summary-line {
      height: 20px;
    }

    .insights-section {
      padding:
        52px
        0
        58px;
    }

    .section-heading {
      margin-bottom: 22px;
    }

    .section-heading h2 {
      font-size: 39px;
    }

    .insight-grid {
      gap: 10px;
    }

    .insight-card {
      padding: 19px;

      border-radius: 18px;
    }

    .insight-card p {
      margin-top: 20px;

      font-size: 17px;
    }

    .question-section {
      padding:
        48px
        16px;
    }

    .question-shell {
      grid-template-columns: 1fr;

      gap: 25px;

      width: 100%;
    }

    .question-visual {
      height: 175px;
    }

    .moon {
      width: 145px;
      height: 145px;

      font-size: 58px;
    }

    .tiny-person {
      width: 53px;
      height: 64px;

      border-width: 2px;

      font-size: 23px;
    }

    .question-copy {
      text-align: center;
    }

    .question-copy h2 {
      max-width: 390px;

      margin:
        11px
        auto
        0;

      font-size: 32px;
    }

    .question-copy p {
      margin-top: 14px;
    }

    .paywall-section {
      padding:
        55px
        16px
        65px;
    }

    .paywall-shell {
      grid-template-columns: 1fr;

      gap: 27px;
    }

    .paywall-copy {
      text-align: center;
    }

    .paywall-copy h2 {
      margin:
        10px
        auto
        15px;

      font-size: 39px;
    }

    .paywall-copy p {
      margin:
        0
        auto;

      font-size: 14px;
    }

    .paywall-card {
      padding: 20px;

      border-radius: 20px;
    }

  }

  @media (
    prefers-reduced-motion:
    reduce
  ) {

    * {
      scroll-behavior: auto !important;

      animation-duration:
        0.01ms !important;

      transition-duration:
        0.01ms !important;
    }

  }

`;