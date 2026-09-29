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

    comparisons: Comparison[];

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

    const router =
        useRouter();

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

    const comparedCount =
        comparisons.length;

    if (error) {
        return (
            <main className="result-page">

                <div className="state-screen">

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

                <style jsx>{styles}</style>

            </main>
        );
    }

    if (!data) {
        return (
            <main className="loading-page">

                <div className="loading-circles">

                    <span className="loading-circle loading-circle-a" />

                    <span className="loading-circle loading-circle-b" />

                </div>

                <div className="loading-text">
                    сравниваем ваши ответы...
                </div>

                <style jsx>{styles}</style>

            </main>
        );
    }

    const nameA =
        data.couple.partner_a_name;

    const nameB =
        data.couple.partner_b_name;

    return (
        <main className="result-page">

            <div className="result-shell">

                {/* =====================================================
            HERO
        ===================================================== */}

                <section className="hero">

                    <div className="brand">
                        между нами
                    </div>

                    <h1 className="couple-title">
                        {nameA}
                        <span> + </span>
                        {nameB}
                    </h1>

                    <p className="hero-copy">

                        Вы ответили одинаково на{' '}

                        <strong>
                            {sameCount}
                        </strong>{' '}

                        из{' '}

                        <strong>
                            {comparedCount}
                        </strong>{' '}

                        вопросов.

                        <br />

                        Но интереснее оказалось
                        не это.

                    </p>

                    <div className="scroll-hint">
                        ↓
                    </div>

                </section>

                {/* =====================================================
            ARCHETYPE
        ===================================================== */}

                <section className="archetype-section">

                    <div className="section-eyebrow">
                        КАКАЯ ВЫ ПАРА
                    </div>

                    <PixelCouple
                        emojiA={
                            archetype.emojiA
                        }
                        emojiB={
                            archetype.emojiB
                        }
                    />

                    <h2 className="archetype-title">
                        {archetype.title}
                    </h2>

                    <p className="archetype-description">
                        {archetype.description}
                    </p>

                    <div className="archetype-meta">

                        <div className="meta-item">

                            <strong>
                                {sameCount}
                            </strong>

                            <span>
                точных совпадений
              </span>

                        </div>

                        <div className="meta-divider" />

                        <div className="meta-item">

                            <strong>
                                {closeCount}
                            </strong>

                            <span>
                близких ответов
              </span>

                        </div>

                    </div>

                </section>

                {/* =====================================================
            INSIGHTS
        ===================================================== */}

                <section className="insights">

                    <InsightCard
                        icon="♥"
                        eyebrow="В ЧЁМ ВЫ СОВПАЛИ"
                        text={
                            insights.sameInsight
                        }
                    />

                    <InsightCard
                        icon="👀"
                        eyebrow="А ВОТ ТУТ ИНТЕРЕСНО"
                        text={
                            insights.differenceInsight
                        }
                    />

                    <InsightCard
                        icon="✦"
                        eyebrow="ВАША МАЛЕНЬКАЯ СУПЕРСИЛА"
                        text={
                            insights.superpower
                        }
                    />

                </section>

                {/* =====================================================
            QUESTION
        ===================================================== */}

                <section className="evening-section">

                    <div className="section-eyebrow light">
                        ОДИН ВОПРОС ВАМ НА ВЕЧЕР
                    </div>

                    <div className="quote-mark">
                        “
                    </div>

                    <h2 className="evening-question">
                        {
                            insights.eveningQuestion
                        }
                    </h2>

                    <p className="evening-caption">
                        Не обязательно отвечать
                        прямо сейчас.
                    </p>

                </section>

                {/* =====================================================
            PAYWALL
        ===================================================== */}

                <section className="paywall">

                    <div className="paywall-orbit">

                        <span className="paywall-circle paywall-circle-a" />

                        <span className="paywall-circle paywall-circle-b" />

                        <span className="lock">
              ✦
            </span>

                    </div>

                    <div className="section-eyebrow">
                        ЭТО ЕЩЁ НЕ ВСЁ
                    </div>

                    <h2 className="paywall-title">
                        Мы нашли ещё несколько
                        вещей между вами.
                    </h2>

                    <p className="paywall-copy">
                        В полном разборе покажем
                        не только совпадения, но и
                        то, что легко не заметить
                        друг в друге.
                    </p>

                    <div className="locked-list">

                        <LockedItem>
                            Чего каждому из вас
                            немного не хватает
                        </LockedItem>

                        <LockedItem>
                            Где вы по-разному
                            воспринимаете заботу
                        </LockedItem>

                        <LockedItem>
                            Что один может не
                            замечать о другом
                        </LockedItem>

                        <LockedItem>
                            Что каждый хочет
                            сохранить
                        </LockedItem>

                        <LockedItem>
                            5 вопросов именно для
                            вашей пары
                        </LockedItem>

                    </div>

                    <button
                        type="button"
                        className="paywall-button"
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

                    <p className="paywall-note">
                        Один разбор для вас двоих
                    </p>

                </section>

            </div>

            <style jsx>{styles}</style>

        </main>
    );
}

/*
 * ============================================================
 * PIXEL COUPLE
 *
 * Пока это стилизованная заглушка.
 * Потом заменим внутренности на
 * реальные pixel-art PNG/WebP.
 * ============================================================
 */

function PixelCouple({
                         emojiA,
                         emojiB,
                     }: {
    emojiA: string;
    emojiB: string;
}) {
    return (
        <div className="pixel-scene">

            <div className="pixel-spark pixel-spark-1">
                ✦
            </div>

            <div className="pixel-spark pixel-spark-2">
                ·
            </div>

            <div className="pixel-spark pixel-spark-3">
                ✦
            </div>

            <div className="pixel-person pixel-person-a">

                <div className="pixel-head">
                    {emojiA}
                </div>

                <div className="pixel-body" />

                <div className="pixel-leg pixel-leg-left" />

                <div className="pixel-leg pixel-leg-right" />

            </div>

            <div className="pixel-heart">
                ♥
            </div>

            <div className="pixel-person pixel-person-b">

                <div className="pixel-head">
                    {emojiB}
                </div>

                <div className="pixel-body" />

                <div className="pixel-leg pixel-leg-left" />

                <div className="pixel-leg pixel-leg-right" />

            </div>

            <div className="pixel-ground">

                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />

            </div>

            <style jsx>{`

        .pixel-scene {
          position: relative;

          width: min(
            100%,
            440px
          );

          height: 260px;

          overflow: hidden;

          margin:
            38px
            auto
            32px;

          border:
            1px solid
            rgba(
              162,
              73,
              106,
              0.12
            );

          border-radius: 28px;

          background:
            linear-gradient(
              180deg,
              #f7e8ed 0%,
              #f9eff1 70%,
              #ead6dd 100%
            );

          box-shadow:
            0 24px 70px
            rgba(
              88,
              47,
              62,
              0.08
            );
        }

        .pixel-person {
          position: absolute;

          bottom: 54px;

          width: 94px;
          height: 130px;
        }

        .pixel-person-a {
          left: 72px;
        }

        .pixel-person-b {
          right: 72px;
        }

        .pixel-head {
          position: absolute;

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
            4px solid #251e20;

          background: #f5d4c3;

          font-size: 36px;

          image-rendering:
            pixelated;

          box-shadow:
            7px 7px 0
            rgba(
              66,
              42,
              49,
              0.12
            );
        }

        .pixel-body {
          position: absolute;

          top: 67px;
          left: 50%;

          width: 70px;
          height: 50px;

          transform:
            translateX(-50%);

          border:
            4px solid #251e20;

          background: #ad4b70;

          box-shadow:
            7px 7px 0
            rgba(
              66,
              42,
              49,
              0.12
            );
        }

        .pixel-person-b
        .pixel-body {
          background: #d993ac;
        }

        .pixel-leg {
          position: absolute;

          bottom: 0;

          width: 20px;
          height: 25px;

          border:
            4px solid #251e20;

          background: #f3e6e3;
        }

        .pixel-leg-left {
          left: 18px;
        }

        .pixel-leg-right {
          right: 18px;
        }

        .pixel-heart {
          position: absolute;

          top: 76px;
          left: 50%;

          transform:
            translateX(-50%);

          color: #a94269;

          font-family:
            monospace;

          font-size: 28px;

          animation:
            heartFloat
            2s
            ease-in-out
            infinite
            alternate;
        }

        @keyframes heartFloat {

          from {
            transform:
              translateX(-50%)
              translateY(3px);
          }

          to {
            transform:
              translateX(-50%)
              translateY(-5px);
          }

        }

        .pixel-ground {
          position: absolute;

          left: 0;
          right: 0;
          bottom: 24px;

          display: flex;
          justify-content: center;

          gap: 5px;
        }

        .pixel-ground span {
          width: 34px;
          height: 7px;

          background: #cda7b4;
        }

        .pixel-ground
        span:nth-child(2n) {
          transform:
            translateY(5px);
        }

        .pixel-spark {
          position: absolute;

          color: #aa4b6e;

          font-family:
            monospace;

          font-weight: 900;
        }

        .pixel-spark-1 {
          top: 34px;
          left: 48px;

          font-size: 20px;
        }

        .pixel-spark-2 {
          top: 44px;
          right: 55px;

          font-size: 30px;
        }

        .pixel-spark-3 {
          top: 110px;
          right: 28px;

          font-size: 14px;
        }

        @media (
          max-width: 500px
        ) {

          .pixel-scene {
            height: 220px;

            border-radius: 22px;
          }

          .pixel-person {
            bottom: 44px;

            transform:
              scale(0.82);
          }

          .pixel-person-a {
            left: 36px;
          }

          .pixel-person-b {
            right: 36px;
          }

          .pixel-heart {
            top: 65px;
          }

        }

      `}</style>

        </div>
    );
}

/*
 * ============================================================
 * INSIGHT CARD
 * ============================================================
 */

function InsightCard({
                         icon,
                         eyebrow,
                         text,
                     }: {
    icon: string;
    eyebrow: string;
    text: string;
}) {
    return (
        <article className="insight-card">

            <div className="insight-icon">
                {icon}
            </div>

            <div className="insight-content">

                <div className="insight-eyebrow">
                    {eyebrow}
                </div>

                <p>
                    {text}
                </p>

            </div>

            <style jsx>{`

        .insight-card {
          display: grid;

          grid-template-columns:
            54px
            minmax(0, 1fr);

          gap: 20px;

          padding: 30px;

          border:
            1px solid #ece4e1;

          border-radius: 26px;

          background:
            rgba(
              255,
              255,
              255,
              0.86
            );

          box-shadow:
            0 16px 50px
            rgba(
              70,
              46,
              54,
              0.04
            );
        }

        .insight-icon {
          width: 54px;
          height: 54px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 18px;

          background: #f5e6eb;

          color: #a74468;

          font-size: 22px;
        }

        .insight-eyebrow {
          margin:
            2px
            0
            11px;

          color: #a5486b;

          font-size: 11px;
          font-weight: 750;

          letter-spacing: 0.12em;
        }

        p {
          margin: 0;

          color: #302a2c;

          font-size: 18px;
          line-height: 1.55;
        }

        @media (
          max-width: 600px
        ) {

          .insight-card {
            grid-template-columns:
              42px
              minmax(0, 1fr);

            gap: 14px;

            padding: 22px 18px;

            border-radius: 21px;
          }

          .insight-icon {
            width: 42px;
            height: 42px;

            border-radius: 14px;

            font-size: 18px;
          }

          .insight-eyebrow {
            font-size: 9px;
          }

          p {
            font-size: 16px;
          }

        }

      `}</style>

        </article>
    );
}

function LockedItem({
                        children,
                    }: {
    children:
        React.ReactNode;
}) {
    return (
        <div className="locked-item">

      <span className="locked-icon">
        ✓
      </span>

            <span>
        {children}
      </span>

            <style jsx>{`

        .locked-item {
          display: flex;
          align-items: flex-start;

          gap: 12px;

          color: #51484b;

          font-size: 16px;
          line-height: 1.45;
        }

        .locked-icon {
          width: 22px;
          height: 22px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-top: 1px;

          border-radius: 50%;

          background: #f2dfe6;

          color: #a8476a;

          font-size: 11px;
          font-weight: 900;
        }

      `}</style>

        </div>
    );
}

const styles = `

  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
  }

  .result-page {
    min-height: 100svh;

    background:
      radial-gradient(
        circle at 80% 7%,
        rgba(
          205,
          136,
          161,
          0.10
        ),
        transparent 25%
      ),
      #faf8f6;

    color: #171515;

    padding:
      34px
      20px
      80px;
  }

  .result-shell {
    width: 100%;
    max-width: 820px;

    margin: 0 auto;
  }

  .brand {
    color: #201b1c;

    font-family:
      Georgia,
      'Times New Roman',
      serif;

    font-size: 25px;
    font-weight: 600;
  }

  /* ============================================================
     HERO
  ============================================================ */

  .hero {
    min-height: 610px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding-top: 4px;
  }

  .couple-title {
    margin:
      68px
      0
      0;

    color: #171515;

    font-family:
      Georgia,
      'Times New Roman',
      serif;

    font-size:
      clamp(
        56px,
        9vw,
        92px
      );

    line-height: 0.95;

    font-weight: 500;

    letter-spacing:
      -0.055em;
  }

  .couple-title span {
    color: #ad4b70;
  }

  .hero-copy {
    max-width: 650px;

    margin:
      42px
      0
      0;

    color: #857b7e;

    font-size: 22px;
    line-height: 1.5;
  }

  .hero-copy strong {
    color: #302a2c;
    font-weight: 650;
  }

  .scroll-hint {
    margin-top: auto;

    color: #b55b7d;

    font-size: 25px;

    animation:
      scrollHint
      1.4s
      ease-in-out
      infinite
      alternate;
  }

  @keyframes scrollHint {

    from {
      transform:
        translateY(-3px);
    }

    to {
      transform:
        translateY(5px);
    }

  }

  /* ============================================================
     ARCHETYPE
  ============================================================ */

  .archetype-section {
    padding:
      90px
      0
      100px;

    text-align: center;
  }

  .section-eyebrow {
    color: #a5486b;

    font-size: 11px;
    font-weight: 750;

    letter-spacing: 0.16em;
  }

  .archetype-title {
    margin:
      0
      auto;

    color: #171515;

    font-family:
      Georgia,
      'Times New Roman',
      serif;

    font-size:
      clamp(
        46px,
        7vw,
        72px
      );

    line-height: 1;

    font-weight: 500;

    letter-spacing:
      -0.045em;
  }

  .archetype-description {
    max-width: 620px;

    margin:
      25px
      auto
      0;

    color: #71676a;

    font-size: 19px;
    line-height: 1.6;
  }

  .archetype-meta {
    width: fit-content;

    display: flex;
    align-items: center;

    gap: 26px;

    margin:
      40px
      auto
      0;

    padding:
      18px
      24px;

    border:
      1px solid #e9dfdc;

    border-radius: 20px;

    background:
      rgba(
        255,
        255,
        255,
        0.62
      );
  }

  .meta-item {
    display: flex;
    flex-direction: column;

    gap: 4px;
  }

  .meta-item strong {
    color: #a74669;

    font-family:
      Georgia,
      'Times New Roman',
      serif;

    font-size: 28px;
    font-weight: 500;
  }

  .meta-item span {
    color: #93898b;

    font-size: 11px;
  }

  .meta-divider {
    width: 1px;
    height: 42px;

    background: #e5d9d7;
  }

  /* ============================================================
     INSIGHTS
  ============================================================ */

  .insights {
    display: flex;
    flex-direction: column;

    gap: 14px;

    padding:
      20px
      0
      100px;
  }

  /* ============================================================
     EVENING
  ============================================================ */

  .evening-section {
    position: relative;

    overflow: hidden;

    padding:
      70px
      58px;

    border-radius: 34px;

    background: #251d20;

    color: #ffffff;

    text-align: center;
  }

  .evening-section::before {
    content: '';

    position: absolute;

    width: 270px;
    height: 270px;

    top: -160px;
    right: -100px;

    border-radius: 50%;

    background:
      rgba(
        190,
        90,
        126,
        0.20
      );
  }

  .section-eyebrow.light {
    color: #d98daa;
  }

  .quote-mark {
    height: 65px;

    margin-top: 30px;

    color: #d07b9a;

    font-family:
      Georgia,
      'Times New Roman',
      serif;

    font-size: 90px;
    line-height: 1;
  }

  .evening-question {
    position: relative;

    max-width: 650px;

    margin:
      10px
      auto
      0;

    font-family:
      Georgia,
      'Times New Roman',
      serif;

    font-size:
      clamp(
        32px,
        5vw,
        48px
      );

    line-height: 1.12;

    font-weight: 500;

    letter-spacing:
      -0.035em;
  }

  .evening-caption {
    margin:
      28px
      0
      0;

    color: #ad9fa3;

    font-size: 13px;
  }

  /* ============================================================
     PAYWALL
  ============================================================ */

  .paywall {
    padding:
      120px
      0
      40px;

    text-align: center;
  }

  .paywall-orbit {
    position: relative;

    width: 115px;
    height: 70px;

    margin:
      0
      auto
      28px;
  }

  .paywall-circle {
    position: absolute;

    width: 70px;
    height: 70px;

    border-radius: 50%;
  }

  .paywall-circle-a {
    left: 0;

    background:
      rgba(
        166,
        68,
        104,
        0.42
      );
  }

  .paywall-circle-b {
    right: 0;

    background:
      rgba(
        218,
        151,
        175,
        0.42
      );
  }

  .lock {
    position: absolute;

    top: 50%;
    left: 50%;

    transform:
      translate(
        -50%,
        -50%
      );

    color: #ffffff;

    font-size: 20px;
  }

  .paywall-title {
    max-width: 650px;

    margin:
      18px
      auto
      0;

    color: #171515;

    font-family:
      Georgia,
      'Times New Roman',
      serif;

    font-size:
      clamp(
        40px,
        6vw,
        60px
      );

    line-height: 1.02;

    font-weight: 500;

    letter-spacing:
      -0.04em;
  }

  .paywall-copy {
    max-width: 580px;

    margin:
      24px
      auto
      0;

    color: #81777a;

    font-size: 17px;
    line-height: 1.55;
  }

  .locked-list {
    width: 100%;
    max-width: 540px;

    display: flex;
    flex-direction: column;

    gap: 15px;

    margin:
      38px
      auto
      0;

    padding: 28px;

    border:
      1px solid #e8dfdc;

    border-radius: 24px;

    background: #ffffff;

    text-align: left;
  }

  .paywall-button {
    width: 100%;
    max-width: 540px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 20px;

    margin:
      16px
      auto
      0;

    border: 0;
    border-radius: 19px;

    background: #171515;
    color: #ffffff;

    padding:
      20px
      22px;

    font-size: 16px;
    font-weight: 650;

    cursor: pointer;

    transition:
      transform 150ms ease,
      opacity 150ms ease;
  }

  .paywall-button:hover {
    opacity: 0.92;

    transform:
      translateY(-1px);
  }

  .paywall-button strong {
    color: #e4a3ba;

    font-size: 17px;
  }

  .paywall-note {
    margin:
      13px
      0
      0;

    color: #a09799;

    font-size: 12px;
  }

  /* ============================================================
     LOADING
  ============================================================ */

  .loading-page {
    min-height: 100svh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background: #faf8f6;
  }

  .loading-circles {
    position: relative;

    width: 105px;
    height: 64px;

    margin-bottom: 25px;
  }

  .loading-circle {
    position: absolute;

    width: 64px;
    height: 64px;

    border-radius: 50%;

    animation:
      loadingMove
      1.2s
      ease-in-out
      infinite
      alternate;
  }

  .loading-circle-a {
    left: 0;

    background:
      rgba(
        166,
        68,
        104,
        0.42
      );
  }

  .loading-circle-b {
    right: 0;

    background:
      rgba(
        218,
        151,
        175,
        0.42
      );

    animation-delay:
      150ms;
  }

  @keyframes loadingMove {

    from {
      transform:
        translateX(-2px);
    }

    to {
      transform:
        translateX(4px);
    }

  }

  .loading-text {
    color: #8e8386;

    font-size: 14px;
  }

  .state-screen {
    width: 100%;
    max-width: 700px;

    margin: 0 auto;

    padding-top: 40px;
  }

  .state-screen h1 {
    margin-top: 80px;

    font-family:
      Georgia,
      'Times New Roman',
      serif;

    font-size: 52px;

    font-weight: 500;
  }

  .state-screen p {
    color: #82777a;

    font-size: 18px;
  }

  /* ============================================================
     MOBILE
  ============================================================ */

  @media (
    max-width: 600px
  ) {

    .result-page {
      padding:
        24px
        16px
        60px;
    }

    .brand {
      font-size: 21px;
    }

    .hero {
      min-height: 520px;
    }

    .couple-title {
      margin-top: 60px;

      font-size: 54px;
    }

    .hero-copy {
      margin-top: 30px;

      font-size: 18px;
    }

    .archetype-section {
      padding:
        65px
        0
        75px;
    }

    .archetype-title {
      font-size: 44px;
    }

    .archetype-description {
      font-size: 16px;
    }

    .archetype-meta {
      gap: 18px;

      padding:
        15px
        18px;
    }

    .meta-item strong {
      font-size: 24px;
    }

    .insights {
      padding-bottom: 70px;
    }

    .evening-section {
      padding:
        54px
        22px;

      border-radius: 26px;
    }

    .evening-question {
      font-size: 32px;
    }

    .paywall {
      padding-top: 90px;
    }

    .paywall-title {
      font-size: 42px;
    }

    .locked-list {
      padding: 22px 18px;
    }

  }

  @media (
    prefers-reduced-motion:
    reduce
  ) {

    *,
    *::before,
    *::after {
      animation-duration:
        0.01ms !important;

      animation-iteration-count:
        1 !important;

      transition-duration:
        0.01ms !important;
    }

  }

`;