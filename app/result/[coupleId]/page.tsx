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

    scores?: {
        overall?: number;
        sameAnswers?: number;
        closeAnswers?: number;
        differentAnswers?: number;
    };
};

export default function ResultPage() {
    const params =
        useParams<{
            coupleId: string;
        }>();

    const router = useRouter();

    const coupleId = params.coupleId;

    const [data, setData] =
        useState<ResultData | null>(null);

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

    const comparedCount =
        comparisons.length;

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
                    {globalStyles}
                </style>
            </>
        );
    }

    if (!data) {
        return (
            <>
                <main className="loading-page">

                    <div className="loading-art">

                        <span className="loading-orbit orbit-a" />
                        <span className="loading-orbit orbit-b" />

                        <span className="loading-star">
              ✦
            </span>

                    </div>

                    <div className="loading-title">
                        между нами
                    </div>

                    <div className="loading-copy">
                        собираем вашу историю...
                    </div>

                </main>

                <style jsx global>
                    {globalStyles}
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
            HERO + RESULT
        ===================================================== */}

                <section className="hero">

                    <Decoration
                        className="hero-star hero-star-one"
                    >
                        ✦
                    </Decoration>

                    <Decoration
                        className="hero-star hero-star-two"
                    >
                        +
                    </Decoration>

                    <Decoration
                        className="hero-dot hero-dot-one"
                    >
                        ·
                    </Decoration>

                    <div className="hero-shell">

                        <header className="topbar">

                            <div className="brand">
                                между нами
                            </div>

                            <div className="topbar-pill">
                                результат для двоих
                            </div>

                        </header>

                        <div className="hero-grid">

                            <div className="hero-copy">

                                <div className="names">
                                    {nameA}
                                    <span>
                    +
                  </span>
                                    {nameB}
                                </div>

                                <p className="intro">

                                    Вы одинаково ответили на{' '}

                                    <strong>
                                        {sameCount}
                                    </strong>{' '}

                                    из{' '}

                                    <strong>
                                        {comparedCount}
                                    </strong>{' '}

                                    вопросов.

                                    <br />

                                    Но ваш результат —
                                    не про количество
                                    совпадений.

                                </p>

                                <div className="type-label">
                                    ВАШ ТИП ПАРЫ
                                </div>

                                <h1 className="type-title">
                                    {archetype.title}
                                </h1>

                                <p className="type-description">
                                    {archetype.description}
                                </p>

                                <div className="stats">

                                    <div className="stat">

                                        <strong>
                                            {sameCount}
                                        </strong>

                                        <span>
                      точных
                      <br />
                      совпадения
                    </span>

                                    </div>

                                    <div className="stat-line" />

                                    <div className="stat">

                                        <strong>
                                            {closeCount}
                                        </strong>

                                        <span>
                      близких
                      <br />
                      ответов
                    </span>

                                    </div>

                                </div>

                            </div>

                            <div className="hero-visual">

                                <CoupleIllustration
                                    archetypeId={
                                        archetype.id
                                    }
                                    emojiA={
                                        archetype.emojiA
                                    }
                                    emojiB={
                                        archetype.emojiB
                                    }
                                />

                            </div>

                        </div>

                    </div>

                    <div className="hero-wave">
                        <svg
                            viewBox="0 0 1440 110"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <path
                                d="
                  M0,55
                  C230,110 400,5 650,45
                  C890,85 1080,110 1440,30
                  L1440,110
                  L0,110
                  Z
                "
                                fill="#ffffff"
                            />
                        </svg>
                    </div>

                </section>

                {/* =====================================================
            INTRO TO INSIGHTS
        ===================================================== */}

                <section className="story-section">

                    <div className="content-shell">

                        <div className="story-heading">

                            <div className="eyebrow">
                                ЧТО МЫ ЗАМЕТИЛИ
                            </div>

                            <h2>
                                У вас есть свой способ
                                быть вместе.
                            </h2>

                            <p>
                                Не диагноз и не оценка
                                совместимости. Просто
                                несколько вещей, которые
                                особенно заметны в ваших
                                ответах.
                            </p>

                        </div>

                        {/* =================================================
                MATCH
            ================================================= */}

                        <article className="story-row">

                            <div className="story-art">

                                <MiniScene
                                    variant="heart"
                                />

                            </div>

                            <div className="story-copy">

                                <div className="story-number">
                                    01
                                </div>

                                <div className="story-label">
                                    В ЧЁМ ВЫ СОВПАЛИ
                                </div>

                                <h3>
                                    Здесь вы смотрите
                                    примерно в одну сторону.
                                </h3>

                                <p>
                                    {insights.sameInsight}
                                </p>

                            </div>

                        </article>

                        {/* =================================================
                DIFFERENCE
            ================================================= */}

                        <article className="story-row reverse">

                            <div className="story-art">

                                <MiniScene
                                    variant="different"
                                />

                            </div>

                            <div className="story-copy">

                                <div className="story-number">
                                    02
                                </div>

                                <div className="story-label">
                                    А ВОТ ТУТ ИНТЕРЕСНО
                                </div>

                                <h3>
                                    Разные ответы —
                                    не обязательно
                                    разные стороны.
                                </h3>

                                <p>
                                    {
                                        insights.differenceInsight
                                    }
                                </p>

                            </div>

                        </article>

                        {/* =================================================
                SUPERPOWER
            ================================================= */}

                        <article className="story-row">

                            <div className="story-art">

                                <MiniScene
                                    variant="power"
                                />

                            </div>

                            <div className="story-copy">

                                <div className="story-number">
                                    03
                                </div>

                                <div className="story-label">
                                    ВАША СУПЕРСИЛА
                                </div>

                                <h3>
                                    То, что у вас уже
                                    получается естественно.
                                </h3>

                                <p>
                                    {insights.superpower}
                                </p>

                            </div>

                        </article>

                    </div>

                </section>

                {/* =====================================================
            QUESTION FOR TWO
        ===================================================== */}

                <section className="question-section">

                    <div className="question-decoration question-decoration-one">
                        ✦
                    </div>

                    <div className="question-decoration question-decoration-two">
                        ✦
                    </div>

                    <div className="question-shell">

                        <div className="question-art">

                            <div className="moon">
                <span>
                  ☾
                </span>
                            </div>

                            <div className="question-people">

                                <div className="question-person">
                                    {archetype.emojiA}
                                </div>

                                <div className="question-heart">
                                    ♥
                                </div>

                                <div className="question-person">
                                    {archetype.emojiB}
                                </div>

                            </div>

                        </div>

                        <div className="question-content">

                            <div className="question-label">
                                ОДИН ВОПРОС ВАМ НА ВЕЧЕР
                            </div>

                            <div className="big-quote">
                                “
                            </div>

                            <h2>
                                {
                                    insights.eveningQuestion
                                }
                            </h2>

                            <p>
                                Иногда один хороший
                                разговор даёт больше,
                                чем ещё десять вопросов
                                теста.
                            </p>

                        </div>

                    </div>

                </section>

                {/* =====================================================
            PAID REPORT
        ===================================================== */}

                <section className="report-section">

                    <div className="content-shell">

                        <div className="report-heading">

                            <div className="eyebrow">
                                ГЛУБЖЕ
                            </div>

                            <h2>
                                Это только верхний слой.
                            </h2>

                            <p>
                                Мы нашли ещё несколько
                                паттернов, которые не
                                хочется превращать в
                                короткую подпись.
                            </p>

                        </div>

                        <div className="report-card">

                            <div className="report-card-art">

                                <div className="report-orbits">

                                    <div className="report-orbit orbit-left" />
                                    <div className="report-orbit orbit-right" />

                                    <div className="report-symbol">
                                        ✦
                                    </div>

                                </div>

                                <div className="report-card-caption">
                                    полный разбор
                                </div>

                            </div>

                            <div className="report-card-content">

                                <div className="report-small">
                                    ВНУТРИ
                                </div>

                                <h3>
                                    То, что легко
                                    не заметить друг
                                    в друге.
                                </h3>

                                <div className="report-list">

                                    <ReportItem
                                        number="01"
                                        title="Чего каждому немного не хватает"
                                    />

                                    <ReportItem
                                        number="02"
                                        title="Как вы по-разному воспринимаете заботу"
                                    />

                                    <ReportItem
                                        number="03"
                                        title="Что один может не замечать о другом"
                                    />

                                    <ReportItem
                                        number="04"
                                        title="Что каждый хочет сохранить"
                                    />

                                    <ReportItem
                                        number="05"
                                        title="5 вопросов именно для вашей пары"
                                    />

                                </div>

                                <button
                                    type="button"
                                    className="report-button"
                                    onClick={() =>
                                        router.push(
                                            `/report/${coupleId}`
                                        )
                                    }
                                >

                  <span>
                    Открыть полный разбор
                  </span>

                                    <strong>
                                        299 ₽
                                    </strong>

                                </button>

                                <div className="report-note">
                                    один разбор · доступ для вас двоих
                                </div>

                            </div>

                        </div>

                    </div>

                </section>

            </main>

            <style jsx global>
                {globalStyles}
            </style>
        </>
    );
}

/* ============================================================
   MAIN ILLUSTRATION

   Пока это SVG/CSS-like vector scene.
   Потом сюда подключим настоящие PNG/WebP
   для каждого архетипа без изменения layout.
============================================================ */

function CoupleIllustration({
                                archetypeId,
                                emojiA,
                                emojiB,
                            }: {
    archetypeId: string;
    emojiA: string;
    emojiB: string;
}) {
    return (
        <div className="couple-illustration">

            <svg
                className="illustration-bg"
                viewBox="0 0 600 560"
                aria-hidden="true"
            >
                <path
                    d="
            M92 138
            C148 42 296 20 408 72
            C524 126 570 244 528 354
            C486 464 356 532 232 492
            C104 452 24 364 46 252
            C54 208 70 172 92 138Z
          "
                    fill="#E8D7E1"
                />

                <path
                    d="
            M134 112
            C198 48 304 36 392 74
            C456 102 504 154 518 216
          "
                    fill="none"
                    stroke="#C58AA3"
                    strokeWidth="3"
                    strokeDasharray="6 12"
                />

                <circle
                    cx="98"
                    cy="185"
                    r="8"
                    fill="#D1A64D"
                />

                <circle
                    cx="496"
                    cy="156"
                    r="5"
                    fill="#A8496C"
                />

                <path
                    d="M455 102 L462 119 L480 126 L462 133 L455 151 L448 133 L430 126 L448 119Z"
                    fill="#D1A64D"
                />

                <path
                    d="M120 356 L126 370 L141 376 L126 382 L120 397 L114 382 L99 376 L114 370Z"
                    fill="#A8496C"
                />
            </svg>

            <div className="character-stage">

                <div className="character character-a">

                    <div className="character-head">
                        <div className="character-face">
                            {emojiA}
                        </div>
                    </div>

                    <div className="character-body body-a" />

                    <div className="character-arm arm-a" />

                </div>

                <div className="center-heart">
                    ♥
                </div>

                <div className="character character-b">

                    <div className="character-head">
                        <div className="character-face">
                            {emojiB}
                        </div>
                    </div>

                    <div className="character-body body-b" />

                    <div className="character-arm arm-b" />

                </div>

            </div>

            <div className="illustration-platform">

                <span />
                <span />
                <span />

            </div>

            <div className="illustration-tag">
                {getShortArchetypeTag(
                    archetypeId
                )}
            </div>

        </div>
    );
}

function getShortArchetypeTag(
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
   SMALL EDITORIAL ILLUSTRATIONS
============================================================ */

function MiniScene({
                       variant,
                   }: {
    variant:
        | 'heart'
        | 'different'
        | 'power';
}) {
    if (variant === 'heart') {
        return (
            <div className="mini-scene mini-heart">

                <div className="mini-blob" />

                <div className="mini-person mini-person-left">
                    ◡
                </div>

                <div className="mini-heart-symbol">
                    ♥
                </div>

                <div className="mini-person mini-person-right">
                    ◡
                </div>

                <div className="mini-star">
                    ✦
                </div>

            </div>
        );
    }

    if (variant === 'different') {
        return (
            <div className="mini-scene mini-different">

                <div className="mini-blob blob-yellow" />

                <div className="different-circle circle-one">
                    →
                </div>

                <div className="different-circle circle-two">
                    ←
                </div>

                <div className="different-center">
                    ♥
                </div>

            </div>
        );
    }

    return (
        <div className="mini-scene mini-power">

            <div className="mini-blob blob-purple" />

            <div className="power-star power-star-main">
                ✦
            </div>

            <div className="power-star power-star-small-one">
                ✦
            </div>

            <div className="power-star power-star-small-two">
                ✦
            </div>

            <div className="power-heart">
                ♥
            </div>

        </div>
    );
}

/* ============================================================
   REPORT ITEM
============================================================ */

function ReportItem({
                        number,
                        title,
                    }: {
    number: string;
    title: string;
}) {
    return (
        <div className="report-item">

            <div className="report-item-number">
                {number}
            </div>

            <div className="report-item-title">
                {title}
            </div>

            <div className="report-item-lock">
                ·
            </div>

        </div>
    );
}

/* ============================================================
   DECORATION
============================================================ */

function Decoration({
                        children,
                        className,
                    }: {
    children:
        React.ReactNode;
    className: string;
}) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}

/* ============================================================
   GLOBAL STYLES
============================================================ */

const globalStyles = `

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;

    background: #ffffff;

    color: #272326;

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

    background: #ffffff;
  }

  .content-shell,
  .hero-shell {
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

    font-size: 27px;
    font-weight: 600;

    letter-spacing:
      -0.035em;
  }

  .eyebrow {
    color: #A74769;

    font-size: 12px;
    font-weight: 800;

    letter-spacing: 0.19em;
  }

  /* ============================================================
     HERO
  ============================================================ */

  .hero {
    position: relative;

    min-height: 760px;

    overflow: hidden;

    background:
      radial-gradient(
        circle at 15% 12%,
        rgba(
          255,
          255,
          255,
          0.85
        ),
        transparent 30%
      ),
      #F7F1F4;
  }

  .hero-shell {
    position: relative;

    z-index: 2;
  }

  .topbar {
    height: 100px;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .topbar-pill {
    padding:
      9px
      14px;

    border:
      1px solid
      rgba(
        123,
        84,
        101,
        0.15
      );

    border-radius: 999px;

    background:
      rgba(
        255,
        255,
        255,
        0.52
      );

    color: #8E7B83;

    font-size: 11px;
    font-weight: 650;

    letter-spacing: 0.04em;
  }

  .hero-grid {
    min-height: 610px;

    display: grid;

    grid-template-columns:
      minmax(0, 1.02fr)
      minmax(440px, 0.98fr);

    align-items: center;

    gap: 42px;

    padding:
      20px
      0
      100px;
  }

  .names {
    color: #292326;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        54px,
        6.2vw,
        88px
      );

    font-weight: 500;

    line-height: 0.96;

    letter-spacing:
      -0.055em;
  }

  .names span {
    color: #AF496E;
  }

  .intro {
    max-width: 580px;

    margin:
      25px
      0
      44px;

    color: #81767A;

    font-size: 18px;
    line-height: 1.55;
  }

  .intro strong {
    color: #393235;

    font-weight: 750;
  }

  .type-label {
    margin-bottom: 11px;

    color: #A74669;

    font-size: 11px;
    font-weight: 850;

    letter-spacing: 0.2em;
  }

  .type-title {
    max-width: 620px;

    margin: 0;

    color: #272326;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        48px,
        5vw,
        72px
      );

    font-weight: 500;

    line-height: 0.98;

    letter-spacing:
      -0.045em;
  }

  .type-description {
    max-width: 570px;

    margin:
      20px
      0
      0;

    color: #675D61;

    font-size: 17px;
    line-height: 1.58;
  }

  .stats {
    display: flex;
    align-items: center;

    gap: 20px;

    margin-top: 30px;
  }

  .stat {
    display: flex;
    align-items: center;

    gap: 10px;
  }

  .stat strong {
    color: #A64669;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size: 32px;
    font-weight: 500;
  }

  .stat span {
    color: #8E8186;

    font-size: 11px;
    line-height: 1.25;
  }

  .stat-line {
    width: 1px;
    height: 38px;

    background:
      rgba(
        108,
        76,
        89,
        0.17
      );
  }

  .hero-visual {
    display: flex;
    justify-content: center;
  }

  .hero-wave {
    position: absolute;

    left: 0;
    right: 0;
    bottom: -1px;

    z-index: 1;

    height: 100px;
  }

  .hero-wave svg {
    width: 100%;
    height: 100%;

    display: block;
  }

  .hero-star,
  .hero-dot {
    position: absolute;

    z-index: 1;

    color: #BD6A88;
  }

  .hero-star-one {
    top: 130px;
    left: 4%;

    font-size: 20px;
  }

  .hero-star-two {
    top: 85px;
    right: 5%;

    color: #C6A050;

    font-size: 30px;

    transform:
      rotate(18deg);
  }

  .hero-dot-one {
    bottom: 160px;
    left: 3%;

    font-size: 50px;
  }

  /* ============================================================
     COUPLE ILLUSTRATION
  ============================================================ */

  .couple-illustration {
    position: relative;

    width: 100%;
    max-width: 540px;

    aspect-ratio: 1 / 1;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .illustration-bg {
    position: absolute;

    inset: 0;

    width: 100%;
    height: 100%;
  }

  .character-stage {
    position: relative;

    z-index: 2;

    width: 76%;
    height: 52%;

    display: flex;
    align-items: flex-end;
    justify-content: center;

    gap: 18px;

    margin-top: 35px;
  }

  .character {
    position: relative;

    width: 135px;
    height: 235px;
  }

  .character-a {
    transform:
      rotate(-2deg)
      translateY(6px);
  }

  .character-b {
    transform:
      rotate(2deg)
      translateY(-2px);
  }

  .character-head {
    position: absolute;

    top: 0;
    left: 50%;

    width: 100px;
    height: 100px;

    display: flex;
    align-items: center;
    justify-content: center;

    transform:
      translateX(-50%);

    border:
      4px solid #473D41;

    border-radius:
      48% 52% 46% 54%;

    background: #F0C9B7;
  }

  .character-face {
    font-size: 49px;

    line-height: 1;
  }

  .character-body {
    position: absolute;

    left: 50%;
    bottom: 0;

    width: 125px;
    height: 150px;

    transform:
      translateX(-50%);

    border:
      4px solid #473D41;

    border-radius:
      54px 54px 26px 26px;
  }

  .body-a {
    background: #A84A6D;
  }

  .body-b {
    background: #D39AB0;
  }

  .character-arm {
    position: absolute;

    top: 118px;

    width: 65px;
    height: 24px;

    border:
      4px solid #473D41;

    border-radius: 999px;

    background: #E8B9A5;
  }

  .arm-a {
    right: -22px;

    transform:
      rotate(18deg);
  }

  .arm-b {
    left: -22px;

    transform:
      rotate(-18deg);
  }

  .center-heart {
    position: relative;

    z-index: 5;

    align-self: center;

    margin:
      0
      -6px
      70px;

    color: #A83E65;

    font-size: 29px;

    animation:
      heartFloat
      1.8s
      ease-in-out
      infinite
      alternate;
  }

  @keyframes heartFloat {
    from {
      transform:
        translateY(3px);
    }

    to {
      transform:
        translateY(-5px);
    }
  }

  .illustration-platform {
    position: absolute;

    z-index: 3;

    left: 50%;
    bottom: 79px;

    display: flex;

    gap: 6px;

    transform:
      translateX(-50%);
  }

  .illustration-platform span {
    width: 65px;
    height: 8px;

    border-radius: 10px;

    background: #B17B91;
  }

  .illustration-platform
  span:nth-child(2) {
    transform:
      translateY(5px);
  }

  .illustration-tag {
    position: absolute;

    z-index: 4;

    right: 10px;
    bottom: 72px;

    padding:
      10px
      15px;

    border-radius: 999px;

    background: #ffffff;

    box-shadow:
      0 8px 30px
      rgba(
        83,
        53,
        65,
        0.10
      );

    color: #7C6870;

    font-size: 11px;
    font-weight: 700;
  }

  /* ============================================================
     STORY INTRO
  ============================================================ */

  .story-section {
    padding:
      95px
      0
      135px;

    background: #ffffff;
  }

  .story-heading {
    max-width: 750px;

    margin-bottom: 90px;
  }

  .story-heading h2,
  .report-heading h2 {
    margin:
      14px
      0
      20px;

    color: #292326;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        45px,
        5vw,
        68px
      );

    font-weight: 500;

    line-height: 1;

    letter-spacing:
      -0.045em;
  }

  .story-heading p,
  .report-heading p {
    max-width: 600px;

    margin: 0;

    color: #82777B;

    font-size: 17px;
    line-height: 1.6;
  }

  /* ============================================================
     STORY ROWS
  ============================================================ */

  .story-row {
    min-height: 410px;

    display: grid;

    grid-template-columns:
      minmax(340px, 0.9fr)
      minmax(0, 1.1fr);

    align-items: center;

    gap: 90px;

    padding:
      40px
      0;
  }

  .story-row.reverse {
    grid-template-columns:
      minmax(0, 1.1fr)
      minmax(340px, 0.9fr);
  }

  .story-row.reverse
  .story-art {
    order: 2;
  }

  .story-row.reverse
  .story-copy {
    order: 1;
  }

  .story-number {
    margin-bottom: 18px;

    color: #D0C5C8;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size: 17px;
  }

  .story-label {
    margin-bottom: 15px;

    color: #A64769;

    font-size: 11px;
    font-weight: 850;

    letter-spacing: 0.17em;
  }

  .story-copy h3 {
    max-width: 580px;

    margin: 0;

    color: #2B2628;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        35px,
        3.7vw,
        51px
      );

    font-weight: 500;

    line-height: 1.04;

    letter-spacing:
      -0.035em;
  }

  .story-copy p {
    max-width: 590px;

    margin:
      23px
      0
      0;

    color: #756B6F;

    font-size: 17px;
    line-height: 1.65;
  }

  .story-art {
    display: flex;
    justify-content: center;
  }

  /* ============================================================
     MINI SCENES
  ============================================================ */

  .mini-scene {
    position: relative;

    width: 340px;
    height: 300px;
  }

  .mini-blob {
    position: absolute;

    inset: 25px;

    border-radius:
      45% 55% 60% 40%
      / 54% 40% 60% 46%;

    background: #F0DCE5;

    transform:
      rotate(-7deg);
  }

  .mini-person {
    position: absolute;

    z-index: 2;

    top: 100px;

    width: 86px;
    height: 105px;

    display: flex;
    align-items: center;
    justify-content: center;

    border:
      4px solid #4A3D42;

    border-radius:
      48% 52% 43% 57%;

    background: #E9BBA8;

    color: #4A3D42;

    font-family:
      Georgia,
      serif;

    font-size: 42px;
  }

  .mini-person-left {
    left: 65px;

    transform:
      rotate(-6deg);
  }

  .mini-person-right {
    right: 65px;

    transform:
      rotate(6deg);
  }

  .mini-heart-symbol {
    position: absolute;

    z-index: 4;

    top: 78px;
    left: 50%;

    color: #A64267;

    font-size: 25px;

    transform:
      translateX(-50%);
  }

  .mini-star {
    position: absolute;

    z-index: 4;

    top: 40px;
    right: 45px;

    color: #C39D49;

    font-size: 27px;
  }

  .blob-yellow {
    background: #F2E6C9;

    transform:
      rotate(8deg);
  }

  .different-circle {
    position: absolute;

    z-index: 2;

    top: 95px;

    width: 105px;
    height: 105px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    color: #ffffff;

    font-size: 32px;
  }

  .circle-one {
    left: 60px;

    background: #A84A6D;
  }

  .circle-two {
    right: 60px;

    background: #8A7EAA;
  }

  .different-center {
    position: absolute;

    z-index: 4;

    top: 133px;
    left: 50%;

    color: #E7C25F;

    font-size: 25px;

    transform:
      translateX(-50%);
  }

  .blob-purple {
    background: #E4DFEF;

    transform:
      rotate(-2deg);
  }

  .power-star {
    position: absolute;

    z-index: 3;

    color: #8C78A5;
  }

  .power-star-main {
    top: 87px;
    left: 50%;

    font-size: 105px;

    transform:
      translateX(-50%);
  }

  .power-star-small-one {
    top: 60px;
    left: 70px;

    color: #C39D49;

    font-size: 24px;
  }

  .power-star-small-two {
    right: 72px;
    bottom: 70px;

    color: #A74769;

    font-size: 21px;
  }

  .power-heart {
    position: absolute;

    z-index: 5;

    top: 125px;
    left: 50%;

    color: #ffffff;

    font-size: 25px;

    transform:
      translateX(-50%);
  }

  /* ============================================================
     QUESTION
  ============================================================ */

  .question-section {
    position: relative;

    overflow: hidden;

    background: #5E536F;

    color: #ffffff;

    padding:
      110px
      0;
  }

  .question-shell {
    width:
      min(
        calc(100% - 48px),
        1080px
      );

    display: grid;

    grid-template-columns:
      0.8fr
      1.2fr;

    align-items: center;

    gap: 80px;

    margin: 0 auto;
  }

  .question-art {
    position: relative;

    min-height: 360px;
  }

  .moon {
    position: absolute;

    top: 0;
    left: 50%;

    width: 260px;
    height: 260px;

    display: flex;
    align-items: center;
    justify-content: center;

    transform:
      translateX(-50%);

    border-radius: 50%;

    background: #F0E3C7;

    color: #D2AE57;

    font-size: 105px;
  }

  .question-people {
    position: absolute;

    z-index: 2;

    left: 50%;
    bottom: 0;

    display: flex;
    align-items: center;

    gap: 12px;

    transform:
      translateX(-50%);
  }

  .question-person {
    width: 100px;
    height: 125px;

    display: flex;
    align-items: center;
    justify-content: center;

    border:
      4px solid #403A49;

    border-radius:
      50px 50px 24px 24px;

    background: #B87891;

    font-size: 45px;
  }

  .question-person:last-child {
    background: #8F83A6;
  }

  .question-heart {
    color: #E5B0C3;

    font-size: 24px;
  }

  .question-label {
    color: #D8B7C5;

    font-size: 11px;
    font-weight: 800;

    letter-spacing: 0.18em;
  }

  .big-quote {
    height: 70px;

    margin-top: 20px;

    color: #DAB3C2;

    font-family:
      Georgia,
      serif;

    font-size: 92px;

    line-height: 1;
  }

  .question-content h2 {
    max-width: 650px;

    margin: 0;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        37px,
        4.5vw,
        57px
      );

    font-weight: 500;

    line-height: 1.08;

    letter-spacing:
      -0.035em;
  }

  .question-content p {
    max-width: 480px;

    margin:
      25px
      0
      0;

    color: #D5CDD8;

    font-size: 15px;
    line-height: 1.55;
  }

  .question-decoration {
    position: absolute;

    color:
      rgba(
        238,
        213,
        221,
        0.34
      );
  }

  .question-decoration-one {
    top: 60px;
    left: 7%;

    font-size: 30px;
  }

  .question-decoration-two {
    right: 7%;
    bottom: 70px;

    font-size: 19px;
  }

  /* ============================================================
     REPORT
  ============================================================ */

  .report-section {
    padding:
      130px
      0
      110px;

    background: #F9F6F4;
  }

  .report-heading {
    max-width: 730px;

    margin-bottom: 60px;
  }

  .report-card {
    overflow: hidden;

    display: grid;

    grid-template-columns:
      0.8fr
      1.2fr;

    border:
      1px solid #E8DFDC;

    border-radius: 32px;

    background: #ffffff;

    box-shadow:
      0 30px 90px
      rgba(
        79,
        56,
        64,
        0.07
      );
  }

  .report-card-art {
    min-height: 600px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background: #EEDDE5;
  }

  .report-orbits {
    position: relative;

    width: 260px;
    height: 180px;
  }

  .report-orbit {
    position: absolute;

    top: 20px;

    width: 160px;
    height: 160px;

    border-radius: 50%;
  }

  .orbit-left {
    left: 0;

    background:
      rgba(
        166,
        68,
        104,
        0.55
      );
  }

  .orbit-right {
    right: 0;

    background:
      rgba(
        125,
        109,
        157,
        0.50
      );
  }

  .report-symbol {
    position: absolute;

    top: 50%;
    left: 50%;

    z-index: 3;

    color: #ffffff;

    font-size: 42px;

    transform:
      translate(
        -50%,
        -50%
      );
  }

  .report-card-caption {
    margin-top: 28px;

    color: #8E6575;

    font-family:
      Georgia,
      serif;

    font-size: 28px;
  }

  .report-card-content {
    padding:
      65px
      60px;
  }

  .report-small {
    color: #A74769;

    font-size: 11px;
    font-weight: 800;

    letter-spacing: 0.18em;
  }

  .report-card-content h3 {
    max-width: 520px;

    margin:
      14px
      0
      35px;

    color: #2C2729;

    font-family:
      Georgia,
      serif;

    font-size:
      clamp(
        35px,
        4vw,
        50px
      );

    font-weight: 500;

    line-height: 1.03;

    letter-spacing:
      -0.035em;
  }

  .report-list {
    border-top:
      1px solid #EEE7E4;
  }

  .report-item {
    display: grid;

    grid-template-columns:
      38px
      1fr
      20px;

    align-items: center;

    gap: 14px;

    padding:
      17px
      0;

    border-bottom:
      1px solid #EEE7E4;
  }

  .report-item-number {
    color: #C6B9BD;

    font-family:
      Georgia,
      serif;

    font-size: 13px;
  }

  .report-item-title {
    color: #574E51;

    font-size: 14px;
    line-height: 1.4;
  }

  .report-item-lock {
    color: #B04C70;

    font-size: 24px;
  }

  .report-button {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 20px;

    margin-top: 30px;

    padding:
      19px
      21px;

    border: 0;
    border-radius: 14px;

    background: #A74669;

    color: #ffffff;

    cursor: pointer;

    font-size: 15px;
    font-weight: 700;

    transition:
      transform 150ms ease,
      background 150ms ease;
  }

  .report-button:hover {
    transform:
      translateY(-2px);

    background: #943C5D;
  }

  .report-button strong {
    font-size: 16px;
  }

  .report-note {
    margin-top: 12px;

    color: #A09599;

    font-size: 11px;

    text-align: center;
  }

  /* ============================================================
     LOADING / ERROR
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

  .loading-art {
    position: relative;

    width: 120px;
    height: 80px;

    margin-bottom: 28px;
  }

  .loading-orbit {
    position: absolute;

    width: 80px;
    height: 80px;

    border-radius: 50%;
  }

  .orbit-a {
    left: 0;

    background:
      rgba(
        166,
        68,
        104,
        0.45
      );
  }

  .orbit-b {
    right: 0;

    background:
      rgba(
        139,
        122,
        166,
        0.45
      );
  }

  .loading-star {
    position: absolute;

    z-index: 2;

    top: 50%;
    left: 50%;

    color: #ffffff;

    font-size: 25px;

    transform:
      translate(
        -50%,
        -50%
      );
  }

  .loading-title {
    color: #2C2729;

    font-family:
      Georgia,
      serif;

    font-size: 28px;
  }

  .loading-copy {
    margin-top: 8px;

    color: #96898E;

    font-size: 13px;
  }

  .state-shell {
    width:
      min(
        calc(100% - 40px),
        700px
      );
  }

  .state-shell h1 {
    margin:
      60px
      0
      15px;

    font-family:
      Georgia,
      serif;

    font-size: 50px;

    font-weight: 500;
  }

  .state-shell p {
    color: #81767A;

    font-size: 17px;
  }

  /* ============================================================
     TABLET
  ============================================================ */

  @media (
    max-width: 900px
  ) {

    .hero {
      min-height: auto;
    }

    .hero-grid {
      grid-template-columns: 1fr;

      gap: 25px;

      padding:
        35px
        0
        130px;
    }

    .hero-copy {
      max-width: 700px;
    }

    .hero-visual {
      margin-top: -20px;
    }

    .couple-illustration {
      max-width: 500px;
    }

    .story-row,
    .story-row.reverse {
      grid-template-columns: 1fr;

      gap: 25px;

      padding:
        65px
        0;
    }

    .story-row.reverse
    .story-art,
    .story-row.reverse
    .story-copy {
      order: initial;
    }

    .story-art {
      justify-content: flex-start;
    }

    .question-shell {
      grid-template-columns: 1fr;

      gap: 35px;
    }

    .question-art {
      max-width: 430px;

      width: 100%;

      margin: 0 auto;
    }

    .report-card {
      grid-template-columns: 1fr;
    }

    .report-card-art {
      min-height: 370px;
    }

  }

  /* ============================================================
     MOBILE
  ============================================================ */

  @media (
    max-width: 600px
  ) {

    .content-shell,
    .hero-shell,
    .question-shell {
      width:
        calc(100% - 32px);
    }

    .topbar {
      height: 76px;
    }

    .brand {
      font-size: 22px;
    }

    .topbar-pill {
      display: none;
    }

    .hero-grid {
      gap: 15px;

      padding:
        24px
        0
        95px;
    }

    .names {
      font-size:
        clamp(
          48px,
          15vw,
          66px
        );

      line-height: 0.98;
    }

    .intro {
      margin:
        20px
        0
        36px;

      font-size: 16px;
    }

    .type-title {
      font-size:
        clamp(
          43px,
          13vw,
          58px
        );
    }

    .type-description {
      font-size: 16px;
    }

    .stats {
      margin-top: 25px;
    }

    .hero-visual {
      margin:
        5px
        0
        -25px;
    }

    .couple-illustration {
      max-width: 390px;
    }

    .character {
      width: 100px;
      height: 185px;
    }

    .character-head {
      width: 78px;
      height: 78px;

      border-width: 3px;
    }

    .character-face {
      font-size: 37px;
    }

    .character-body {
      width: 95px;
      height: 120px;

      border-width: 3px;

      border-radius:
        42px 42px 20px 20px;
    }

    .character-arm {
      top: 93px;

      width: 50px;
      height: 20px;

      border-width: 3px;
    }

    .illustration-platform {
      bottom: 54px;
    }

    .illustration-platform span {
      width: 45px;
    }

    .illustration-tag {
      right: 4px;
      bottom: 42px;
    }

    .story-section {
      padding:
        75px
        0
        90px;
    }

    .story-heading {
      margin-bottom: 30px;
    }

    .story-heading h2,
    .report-heading h2 {
      font-size: 43px;
    }

    .story-heading p {
      font-size: 16px;
    }

    .story-row,
    .story-row.reverse {
      min-height: auto;

      padding:
        50px
        0;
    }

    .mini-scene {
      width: 280px;
      height: 245px;

      transform-origin:
        left center;
    }

    .mini-person {
      top: 80px;

      width: 70px;
      height: 88px;

      font-size: 34px;
    }

    .mini-person-left {
      left: 55px;
    }

    .mini-person-right {
      right: 55px;
    }

    .mini-heart-symbol {
      top: 65px;
    }

    .different-circle {
      top: 75px;

      width: 88px;
      height: 88px;
    }

    .circle-one {
      left: 48px;
    }

    .circle-two {
      right: 48px;
    }

    .different-center {
      top: 106px;
    }

    .power-star-main {
      top: 65px;

      font-size: 90px;
    }

    .power-heart {
      top: 98px;
    }

    .story-copy h3 {
      font-size: 37px;
    }

    .story-copy p {
      margin-top: 18px;

      font-size: 16px;
    }

    .question-section {
      padding:
        80px
        0;
    }

    .question-art {
      min-height: 285px;
    }

    .moon {
      width: 210px;
      height: 210px;

      font-size: 85px;
    }

    .question-person {
      width: 80px;
      height: 100px;

      border-width: 3px;

      font-size: 36px;
    }

    .question-content h2 {
      font-size: 38px;
    }

    .report-section {
      padding:
        90px
        0
        70px;
    }

    .report-heading {
      margin-bottom: 40px;
    }

    .report-card {
      border-radius: 24px;
    }

    .report-card-art {
      min-height: 310px;
    }

    .report-orbits {
      transform:
        scale(0.8);
    }

    .report-card-content {
      padding:
        38px
        20px
        28px;
    }

    .report-card-content h3 {
      font-size: 38px;
    }

  }

  @media (
    prefers-reduced-motion:
    reduce
  ) {

    *,
    *::before,
    *::after {
      scroll-behavior: auto !important;

      animation-duration:
        0.01ms !important;

      animation-iteration-count:
        1 !important;

      transition-duration:
        0.01ms !important;
    }

  }

`;