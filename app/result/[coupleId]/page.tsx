'use client';

import {
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react';

import {
    useParams,
    useRouter,
} from 'next/navigation';

import {
    determineArchetype,
    getFreeInsights,
    type Comparison,
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
                    <div className="state-box">

                        <div className="brand">
                            между нами
                        </div>

                        <h1>
                            Упс.
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

                    <div className="loading-mark">
                        <span />
                        <span />
                        <b>
                            ♥
                        </b>
                    </div>

                    <div className="brand">
                        между нами
                    </div>

                    <p>
                        смотрим, что у вас там...
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

    const scorePhrase =
        getScorePhrase(
            wavePercent
        );

    return (
        <>
            <main className="page">

                {/* =====================================================
            HERO
        ===================================================== */}

                <section className="hero">

                    <div className="hero-star hero-star-a">
                        ✦
                    </div>

                    <div className="hero-star hero-star-b">
                        ✦
                    </div>

                    <div className="hero-plus">
                        +
                    </div>

                    <div className="shell">

                        <header className="topbar">

                            <div className="brand">
                                между нами
                            </div>

                            <div className="top-note">
                                РЕЗУЛЬТАТ ДЛЯ ДВОИХ
                                <span>
                  ♥
                </span>
                            </div>

                        </header>

                        <div className="hero-names">

              <span>
                {nameA}
              </span>

                            <b>
                                ×
                            </b>

                            <span>
                {nameB}
              </span>

                        </div>

                        <div className="hero-stage">

                            {/* SCORE */}

                            <div className="score-block">

                                <div className="score-number">
                                    {wavePercent}
                                    <sup>
                                        %
                                    </sup>
                                </div>

                                <div className="score-title">
                                    НА ОДНОЙ ВОЛНЕ
                                </div>

                                <div className="score-line">

                                    <div
                                        className="score-line-fill"
                                        style={{
                                            width:
                                                `${wavePercent}%`,
                                        }}
                                    />

                                    <span
                                        style={{
                                            left:
                                                `${wavePercent}%`,
                                        }}
                                    />

                                </div>

                                <p>
                                    «{scorePhrase}»
                                </p>

                            </div>

                            {/* ART */}

                            <div className="art-wrap">

                                <PixelScene
                                    archetypeId={
                                        archetype.id
                                    }
                                />

                                <div className="art-sticker">
                  <span>
                    ВАШ ТИП ПАРЫ
                  </span>

                                    №
                                    {
                                        getArchetypeNumber(
                                            archetype.id
                                        )
                                    }
                                </div>

                            </div>

                            {/* ARCHETYPE */}

                            <div className="archetype-block">

                                <div className="archetype-kicker">
                                    ТАК. ЭТО ВЫ.
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

                        <div className="chaos-stats">

                            <div className="chaos-stat stat-a">

                                <strong>
                                    {sameCount}
                                </strong>

                                <span>
                  один
                  <br />
                  в один
                </span>

                            </div>

                            <div className="chaos-stat stat-b">

                                <strong>
                                    {closeCount}
                                </strong>

                                <span>
                  ну
                  <br />
                  почти
                </span>

                            </div>

                            <div className="chaos-stat stat-c">

                                <strong>
                                    {differentCount}
                                </strong>

                                <span>
                  тут начинается
                  <br />
                  сюжет
                </span>

                            </div>

                        </div>

                    </div>

                </section>

                {/* =====================================================
            INSIGHTS
        ===================================================== */}

                <section className="insights">

                    <div className="shell">

                        <div className="insights-intro">

              <span>
                ↓
              </span>

                            <p>
                                ладно.
                                <br />
                                теперь интересное.
                            </p>

                        </div>

                        <div className="insight-layout">

                            <Insight
                                number="01"
                                kicker="ВЫ ВОТ ТУТ"
                                title="прям одинаковые"
                                symbol="♥"
                                text={
                                    insights.sameInsight
                                }
                                variant="pink"
                            />

                            <Insight
                                number="02"
                                kicker="А ТУТ УЖЕ"
                                title="интереснее"
                                symbol="↯"
                                text={
                                    insights.differenceInsight
                                }
                                variant="purple"
                                offset
                            />

                            <Insight
                                number="03"
                                kicker="А ЭТО ВООБЩЕ"
                                title="ваша суперсила"
                                symbol="✦"
                                text={
                                    insights.superpower
                                }
                                variant="yellow"
                            />

                        </div>

                    </div>

                </section>

                {/* =====================================================
            QUESTION
        ===================================================== */}

                <section className="question">

                    <div className="question-stars">
                        ✦　·　✦
                    </div>

                    <div className="question-shell">

                        <div className="question-art">

                            <div className="pixel-moon" />

                            <div className="sitting-pair">

                                <span className="sitter sitter-a" />

                                <span className="sitter sitter-b" />

                            </div>

                        </div>

                        <div className="question-copy">

                            <div className="question-kicker">
                                ВОПРОС ВАМ НА ВЕЧЕР
                            </div>

                            <h2>
                                «{
                                insights.eveningQuestion
                            }»
                            </h2>

                            <p>
                                без правильного ответа.
                                просто поговорите.
                            </p>

                        </div>

                    </div>

                </section>

                {/* =====================================================
            PAYWALL
        ===================================================== */}

                <section className="paywall">

                    <div className="shell paywall-layout">

                        <div className="paywall-copy">

                            <div className="paywall-note">
                                ещё столько
                                <br />
                                интересного
                                <span>
                  ↘
                </span>
                            </div>

                            <div className="eyebrow">
                                ХОТИТЕ КОПНУТЬ ГЛУБЖЕ?
                            </div>

                            <h2>
                                Между ответами
                                <br />
                                осталось кое-что.
                            </h2>

                        </div>

                        <div className="paywall-action">

                            <div className="paywall-items">

                                <PayItem>
                                    чего каждому немного
                                    не хватает
                                </PayItem>

                                <PayItem>
                                    как вы воспринимаете
                                    заботу
                                </PayItem>

                                <PayItem>
                                    что можете не замечать
                                    друг о друге
                                </PayItem>

                                <PayItem>
                                    что каждый хочет
                                    сохранить
                                </PayItem>

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

                                <b>
                                    299 ₽
                                </b>

                                <strong>
                                    →
                                </strong>

                            </button>

                            <div className="paywall-small">
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
   SCORE COPY
============================================================ */

function getScorePhrase(
    score: number
) {
    if (score >= 86) {
        return 'так. кто из вас подглядывал?';
    }

    if (score >= 71) {
        return 'вы точно не списывали?';
    }

    if (score >= 51) {
        return 'не телепатия, но уже подозрительно';
    }

    if (score >= 31) {
        return 'два разных мира. и это уже интересно';
    }

    return 'как вы вообще нашли друг друга?';
}

/* ============================================================
   ARCHETYPE NUMBER
============================================================ */

function getArchetypeNumber(
    id: string
) {
    const numbers:
        Record<string, string> = {
        knight_princess: '01',
        wizards: '02',
        pirates: '03',
        astronauts: '04',
        sun_moon: '05',
        dragon_keeper: '06',
        players: '07',
        homekeepers: '08',
    };

    return numbers[id] ?? '00';
}

/* ============================================================
   PIXEL HERO SCENE
============================================================ */

function PixelScene({
                        archetypeId,
                    }: {
    archetypeId: string;
}) {
    return (
        <div className="pixel-scene">

            <div className="space-bg">

                <span className="pixel-star ps-1" />
                <span className="pixel-star ps-2" />
                <span className="pixel-star ps-3" />
                <span className="pixel-star ps-4" />
                <span className="pixel-star ps-5" />

                <span className="big-pixel-star">
          ✦
        </span>

                <div className="pixel-planet">

                    <span className="planet-ring" />

                </div>

            </div>

            <div className="asteroid">

                <span className="crater crater-a" />
                <span className="crater crater-b" />
                <span className="crater crater-c" />

            </div>

            <div className="astronaut astro-a">

                <div className="helmet">
                    <span />
                </div>

                <div className="astro-body">

                    <span className="panel" />

                </div>

                <div className="leg leg-left" />
                <div className="leg leg-right" />

                <div className="astro-arm arm-cup">

                    <span className="cup" />

                </div>

            </div>

            <div className="astronaut astro-b">

                <div className="helmet">
                    <span />
                </div>

                <div className="astro-body">

                    <span className="panel" />

                </div>

                <div className="leg leg-left" />
                <div className="leg leg-right" />

                <div className="astro-arm arm-reach" />

            </div>

            <div className="pixel-heart">
                ♥
            </div>

            <div className="scene-caption">
                {
                    getSceneCaption(
                        archetypeId
                    )
                }
            </div>

        </div>
    );
}

function getSceneCaption(
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
   INSIGHT
============================================================ */

function Insight({
                     number,
                     kicker,
                     title,
                     symbol,
                     text,
                     variant,
                     offset = false,
                 }: {
    number: string;
    kicker: string;
    title: string;
    symbol: string;
    text: string;
    variant:
        | 'pink'
        | 'purple'
        | 'yellow';
    offset?: boolean;
}) {
    return (
        <article
            className={
                `insight-card ${variant} ${
                    offset
                        ? 'offset'
                        : ''
                }`
            }
        >

            <div className="insight-number">
                {number}
            </div>

            <div className="insight-symbol">
                {symbol}
            </div>

            <div className="insight-kicker">
                {kicker}
            </div>

            <h3>
                {title}
            </h3>

            <p>
                {text}
            </p>

        </article>
    );
}

/* ============================================================
   PAY ITEM
============================================================ */

function PayItem({
                     children,
                 }: {
    children: ReactNode;
}) {
    return (
        <div className="pay-item">

      <span>
        ✦
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

    background: #F6F0EA;

    color: #211D20;

    font-family:
      Arial,
      Helvetica,
      sans-serif;
  }

  button {
    font: inherit;
  }

  .page {
    min-height: 100svh;

    overflow: hidden;

    background: #F6F0EA;
  }

  .shell {
    width:
      min(
        calc(100% - 48px),
        1160px
      );

    margin: 0 auto;
  }

  .brand {
    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size: 25px;
    font-weight: 700;

    letter-spacing:
      -0.05em;
  }

  /* ============================================================
     HERO
  ============================================================ */

  .hero {
    position: relative;

    min-height: 720px;

    overflow: hidden;

    background: #F6F0EA;
  }

  .topbar {
    height: 76px;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .top-note {
    display: flex;
    align-items: center;

    gap: 9px;

    color: #8F7E84;

    font-size: 9px;
    font-weight: 800;

    letter-spacing: 0.25em;
  }

  .top-note span {
    color: #B8446D;

    font-size: 14px;
  }

  .hero-names {
    position: relative;

    z-index: 4;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 18px;

    margin-top: 6px;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        56px,
        7.5vw,
        100px
      );

    font-weight: 500;

    line-height: 0.9;

    letter-spacing:
      -0.07em;
  }

  .hero-names b {
    color: #B7466E;

    font-family:
      Arial,
      sans-serif;

    font-size: 0.62em;
    font-weight: 300;
  }

  .hero-stage {
    position: relative;

    display: grid;

    grid-template-columns:
      0.72fr
      1.55fr
      0.9fr;

    align-items: center;

    gap: 14px;

    margin-top: 2px;
  }

  /* SCORE */

  .score-block {
    position: relative;

    z-index: 4;

    transform:
      translateY(-6px)
      rotate(-1.5deg);
  }

  .score-number {
    color: #B5446D;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        82px,
        9vw,
        126px
      );

    line-height: 0.8;

    letter-spacing:
      -0.09em;
  }

  .score-number sup {
    position: relative;

    top: -0.55em;

    margin-left: 5px;

    font-size: 0.34em;

    letter-spacing: -0.04em;
  }

  .score-title {
    margin-top: 14px;

    color: #B5446D;

    font-size: 10px;
    font-weight: 900;

    letter-spacing: 0.21em;
  }

  .score-line {
    position: relative;

    width: 190px;
    height: 4px;

    margin-top: 17px;

    background: #D9CED1;
  }

  .score-line-fill {
    position: absolute;

    top: 0;
    left: 0;

    height: 100%;

    background: #B5446D;
  }

  .score-line > span {
    position: absolute;

    top: 50%;

    width: 13px;
    height: 13px;

    transform:
      translate(
        -50%,
        -50%
      );

    border:
      3px solid #F6F0EA;

    border-radius: 50%;

    background: #B5446D;

    box-shadow:
      0 0 0 1px
      #B5446D;
  }

  .score-block p {
    max-width: 230px;

    margin:
      15px
      0
      0;

    color: #655B60;

    font-family:
      Georgia,
      serif;

    font-size: 14px;
    font-style: italic;

    line-height: 1.4;
  }

  /* ============================================================
     ART
  ============================================================ */

  .art-wrap {
    position: relative;

    z-index: 2;

    width: 100%;

    transform:
      translateY(5px);
  }

  .pixel-scene {
    position: relative;

    width: 100%;
    max-width: 510px;

    aspect-ratio:
      1.18 / 1;

    margin: 0 auto;

    overflow: hidden;

    border:
      4px solid #28222B;

    background: #393344;

    box-shadow:
      10px 12px 0 #D7C2CD;

    image-rendering:
      pixelated;
  }

  .space-bg {
    position: absolute;

    inset: 0;

    background:
      linear-gradient(
        180deg,
        #393344 0%,
        #4B4055 100%
      );
  }

  .pixel-star {
    position: absolute;

    width: 6px;
    height: 6px;

    background: #F6C48C;

    box-shadow:
      6px 0 0 #F6C48C,
      -6px 0 0 #F6C48C,
      0 6px 0 #F6C48C,
      0 -6px 0 #F6C48C;
  }

  .ps-1 {
    top: 18%;
    left: 12%;
  }

  .ps-2 {
    top: 27%;
    right: 17%;

    transform:
      scale(0.6);
  }

  .ps-3 {
    top: 47%;
    left: 7%;

    transform:
      scale(0.55);
  }

  .ps-4 {
    top: 14%;
    left: 55%;

    transform:
      scale(0.45);
  }

  .ps-5 {
    top: 39%;
    right: 8%;

    transform:
      scale(0.45);
  }

  .big-pixel-star {
    position: absolute;

    top: 12%;
    right: 32%;

    color: #C6587C;

    font-size: 30px;
  }

  .pixel-planet {
    position: absolute;

    top: 12%;
    right: 10%;

    width: 67px;
    height: 67px;

    border:
      4px solid #28222B;

    border-radius: 50%;

    background: #9284AE;
  }

  .planet-ring {
    position: absolute;

    top: 26px;
    left: -14px;

    width: 90px;
    height: 16px;

    border:
      4px solid #E2B37E;

    border-radius: 50%;

    transform:
      rotate(-13deg);
  }

  .asteroid {
    position: absolute;

    left: 8%;
    right: 8%;
    bottom: -11%;

    height: 42%;

    border:
      4px solid #28222B;

    border-radius:
      48% 52% 0 0;

    background: #81718F;
  }

  .crater {
    position: absolute;

    border:
      4px solid #4B4155;

    border-radius: 50%;

    background: #62566F;
  }

  .crater-a {
    top: 25%;
    left: 15%;

    width: 44px;
    height: 29px;
  }

  .crater-b {
    top: 14%;
    right: 20%;

    width: 33px;
    height: 24px;
  }

  .crater-c {
    top: 55%;
    left: 49%;

    width: 55px;
    height: 36px;
  }

  /* ASTRONAUTS */

  .astronaut {
    position: absolute;

    z-index: 5;

    width: 115px;
    height: 165px;
  }

  .astro-a {
    left: 22%;
    bottom: 24%;

    transform:
      rotate(3deg);
  }

  .astro-b {
    right: 19%;
    bottom: 20%;

    transform:
      rotate(-3deg);
  }

  .helmet {
    position: absolute;

    z-index: 4;

    top: 0;
    left: 50%;

    width: 77px;
    height: 72px;

    transform:
      translateX(-50%);

    border:
      4px solid #28222B;

    border-radius:
      46% 46% 43% 43%;

    background: #F4E9E1;
  }

  .helmet span {
    position: absolute;

    top: 13px;
    left: 13px;

    width: 45px;
    height: 35px;

    border:
      4px solid #28222B;

    border-radius:
      46%;

    background: #5B526B;

    box-shadow:
      inset
      8px 6px 0
      #8D7895;
  }

  .astro-body {
    position: absolute;

    z-index: 3;

    top: 61px;
    left: 50%;

    width: 82px;
    height: 78px;

    transform:
      translateX(-50%);

    border:
      4px solid #28222B;

    border-radius:
      15px 15px 25px 25px;

    background: #F4E9E1;
  }

  .panel {
    position: absolute;

    top: 20px;
    left: 23px;

    width: 32px;
    height: 22px;

    border:
      3px solid #28222B;

    background: #D68494;

    box-shadow:
      inset
      7px 0 0
      #E6B066;
  }

  .leg {
    position: absolute;

    z-index: 2;

    bottom: 0;

    width: 36px;
    height: 54px;

    border:
      4px solid #28222B;

    border-radius:
      10px 10px 17px 17px;

    background: #F4E9E1;
  }

  .leg-left {
    left: 20px;

    transform:
      rotate(8deg);
  }

  .leg-right {
    right: 20px;

    transform:
      rotate(-8deg);
  }

  .astro-arm {
    position: absolute;

    z-index: 6;

    top: 79px;

    width: 63px;
    height: 25px;

    border:
      4px solid #28222B;

    border-radius: 10px;

    background: #F4E9E1;
  }

  .arm-cup {
    right: -25px;

    transform:
      rotate(-7deg);
  }

  .arm-reach {
    left: -25px;

    transform:
      rotate(7deg);
  }

  .cup {
    position: absolute;

    top: -15px;
    right: -10px;

    width: 18px;
    height: 23px;

    border:
      3px solid #28222B;

    background: #E6B066;
  }

  .pixel-heart {
    position: absolute;

    z-index: 8;

    top: 39%;
    left: 50%;

    color: #D9567F;

    font-size: 28px;

    transform:
      translateX(-50%);
  }

  .scene-caption {
    position: absolute;

    z-index: 10;

    right: 13px;
    bottom: 12px;

    padding:
      7px 9px;

    border:
      2px solid #28222B;

    background: #F6F0EA;

    color: #28222B;

    font-size: 9px;
    font-weight: 900;

    letter-spacing: 0.08em;

    transform:
      rotate(-2deg);
  }

  .art-sticker {
    position: absolute;

    z-index: 10;

    left: -14px;
    bottom: -17px;

    padding:
      10px 15px;

    border:
      2px solid #28222B;

    background: #F6E4B7;

    box-shadow:
      4px 4px 0 #28222B;

    color: #28222B;

    font-size: 12px;
    font-weight: 900;

    transform:
      rotate(-2deg);
  }

  .art-sticker span {
    margin-right: 8px;

    font-size: 8px;

    letter-spacing: 0.16em;
  }

  /* ============================================================
     ARCHETYPE
  ============================================================ */

  .archetype-block {
    position: relative;

    z-index: 4;

    transform:
      translateY(30px);
  }

  .archetype-kicker {
    margin-bottom: 10px;

    color: #B5446D;

    font-size: 9px;
    font-weight: 900;

    letter-spacing: 0.19em;
  }

  .archetype-block h1 {
    margin: 0;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        43px,
        5vw,
        66px
      );

    font-weight: 500;

    line-height: 0.91;

    letter-spacing:
      -0.06em;
  }

  .archetype-block p {
    max-width: 280px;

    margin:
      19px
      0
      0;

    color: #655B60;

    font-size: 14px;
    line-height: 1.5;
  }

  /* ============================================================
     CHAOS STATS
  ============================================================ */

  .chaos-stats {
    position: relative;

    z-index: 10;

    width: 520px;
    height: 80px;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 48px;

    margin:
      -2px
      auto
      0;
  }

  .chaos-stat {
    display: flex;
    align-items: center;

    gap: 8px;
  }

  .chaos-stat strong {
    color: #B5446D;

    font-family:
      Georgia,
      serif;

    font-size: 34px;
    font-weight: 500;
  }

  .chaos-stat span {
    color: #5E5559;

    font-size: 10px;
    line-height: 1.25;
  }

  .stat-a {
    transform:
      rotate(-2deg);
  }

  .stat-b {
    transform:
      translateY(8px)
      rotate(1deg);
  }

  .stat-c {
    transform:
      translateY(-5px)
      rotate(-1deg);
  }

  .hero-star,
  .hero-plus {
    position: absolute;

    z-index: 1;
  }

  .hero-star-a {
    top: 155px;
    left: 4%;

    color: #D09D3C;

    font-size: 27px;
  }

  .hero-star-b {
    right: 5%;
    bottom: 80px;

    color: #B5446D;

    font-size: 19px;
  }

  .hero-plus {
    top: 250px;
    right: 3%;

    color: #8C7AA1;

    font-size: 28px;

    transform:
      rotate(13deg);
  }

  /* ============================================================
     INSIGHTS
  ============================================================ */

  .insights {
    padding:
      55px
      0
      100px;

    background: #FCFAF7;
  }

  .insights-intro {
    display: flex;
    align-items: flex-start;

    gap: 13px;

    margin-bottom: 35px;

    color: #B5446D;
  }

  .insights-intro span {
    font-size: 29px;
  }

  .insights-intro p {
    margin: 4px 0 0;

    font-size: 11px;
    font-weight: 900;

    line-height: 1.4;

    letter-spacing: 0.12em;

    text-transform: uppercase;

    transform:
      rotate(-3deg);
  }

  .insight-layout {
    display: grid;

    grid-template-columns:
      repeat(
        3,
        minmax(0, 1fr)
      );

    gap: 18px;

    align-items: start;
  }

  .insight-card {
    position: relative;

    min-height: 285px;

    padding:
      27px
      26px;

    border:
      2px solid #2B2529;

    background: #FFFFFF;

    box-shadow:
      7px 8px 0
      #D8CDD0;
  }

  .insight-card.offset {
    margin-top: 35px;

    transform:
      rotate(1deg);
  }

  .insight-card.pink {
    transform:
      rotate(-0.7deg);
  }

  .insight-card.yellow {
    transform:
      rotate(0.5deg);
  }

  .insight-number {
    color: #B5446D;

    font-family:
      Georgia,
      serif;

    font-size: 48px;

    line-height: 1;
  }

  .purple
  .insight-number {
    color: #82719C;
  }

  .yellow
  .insight-number {
    color: #C58C2E;
  }

  .insight-symbol {
    position: absolute;

    top: 24px;
    right: 24px;

    color: #B5446D;

    font-size: 29px;
  }

  .purple
  .insight-symbol {
    color: #82719C;
  }

  .yellow
  .insight-symbol {
    color: #C58C2E;
  }

  .insight-kicker {
    margin-top: 25px;

    color: #71666A;

    font-size: 9px;
    font-weight: 900;

    letter-spacing: 0.14em;
  }

  .insight-card h3 {
    margin:
      3px
      0
      17px;

    font-family:
      Georgia,
      serif;

    font-size: 30px;
    font-weight: 500;

    line-height: 1;

    letter-spacing:
      -0.04em;
  }

  .insight-card p {
    margin: 0;

    color: #62595D;

    font-size: 14px;
    line-height: 1.55;
  }

  /* ============================================================
     QUESTION
  ============================================================ */

  .question {
    position: relative;

    overflow: hidden;

    background: #332E3D;

    color: #FFFFFF;
  }

  .question-shell {
    width:
      min(
        calc(100% - 48px),
        1040px
      );

    min-height: 350px;

    display: grid;

    grid-template-columns:
      310px
      1fr;

    align-items: center;

    gap: 55px;

    margin: 0 auto;
  }

  .question-art {
    position: relative;

    height: 260px;
  }

  .pixel-moon {
    position: absolute;

    top: 15px;
    left: 40px;

    width: 180px;
    height: 180px;

    border:
      5px solid #201D25;

    border-radius: 50%;

    background: #F0D59A;

    box-shadow:
      12px 0 0 #D2A955;
  }

  .pixel-moon::after {
    content: '';

    position: absolute;

    top: -8px;
    right: -35px;

    width: 145px;
    height: 195px;

    border-radius: 50%;

    background: #332E3D;
  }

  .sitting-pair {
    position: absolute;

    z-index: 5;

    left: 65px;
    bottom: 12px;

    display: flex;

    gap: 7px;
  }

  .sitter {
    width: 54px;
    height: 76px;

    border:
      4px solid #201D25;

    border-radius:
      25px 25px 10px 10px;

    background: #B34D70;
  }

  .sitter-b {
    background: #88779E;
  }

  .question-kicker {
    color: #D886A2;

    font-size: 9px;
    font-weight: 900;

    letter-spacing: 0.21em;
  }

  .question-copy h2 {
    max-width: 660px;

    margin:
      14px
      0
      0;

    font-family:
      Georgia,
      serif;

    font-size:
      clamp(
        35px,
        4.2vw,
        51px
      );

    font-weight: 500;

    line-height: 1.08;

    letter-spacing:
      -0.035em;
  }

  .question-copy p {
    margin:
      20px
      0
      0;

    color: #BBB2BE;

    font-size: 12px;
  }

  .question-stars {
    position: absolute;

    top: 35px;
    right: 8%;

    color: #DDAA73;

    font-size: 18px;
  }

  /* ============================================================
     PAYWALL
  ============================================================ */

  .paywall {
    padding:
      75px
      0
      85px;

    background: #F0E5E8;
  }

  .paywall-layout {
    display: grid;

    grid-template-columns:
      1fr
      0.85fr;

    align-items: center;

    gap: 75px;
  }

  .paywall-copy {
    position: relative;
  }

  .paywall-note {
    position: absolute;

    top: -27px;
    left: -40px;

    color: #B5446D;

    font-family:
      Georgia,
      serif;

    font-size: 15px;
    font-style: italic;

    line-height: 1.15;

    transform:
      rotate(-7deg);
  }

  .paywall-note span {
    display: inline-block;

    margin-left: 7px;

    font-size: 25px;
  }

  .eyebrow {
    margin-left: 100px;

    color: #B5446D;

    font-size: 9px;
    font-weight: 900;

    letter-spacing: 0.2em;
  }

  .paywall-copy h2 {
    margin:
      13px
      0
      0;

    font-family:
      Georgia,
      serif;

    font-size:
      clamp(
        42px,
        5vw,
        62px
      );

    font-weight: 500;

    line-height: 0.96;

    letter-spacing:
      -0.05em;
  }

  .paywall-action {
    padding:
      24px;

    border:
      2px solid #292329;

    background: #F8F3EF;

    box-shadow:
      8px 8px 0
      #CDB6BE;

    transform:
      rotate(0.5deg);
  }

  .paywall-items {
    display: grid;

    grid-template-columns:
      1fr
      1fr;

    gap:
      15px
      20px;
  }

  .pay-item {
    display: grid;

    grid-template-columns:
      17px
      1fr;

    gap: 7px;

    color: #61565A;

    font-size: 11px;
    line-height: 1.35;
  }

  .pay-item span {
    color: #B5446D;
  }

  .paywall-action button {
    width: 100%;

    display: grid;

    grid-template-columns:
      1fr
      auto
      auto;

    align-items: center;

    gap: 13px;

    margin-top: 23px;

    padding:
      16px
      17px;

    border:
      2px solid #292329;

    background: #B5446D;

    box-shadow:
      4px 4px 0
      #292329;

    color: #FFFFFF;

    cursor: pointer;

    font-size: 13px;
    font-weight: 800;

    text-align: left;
  }

  .paywall-action button:hover {
    transform:
      translate(
        2px,
        2px
      );

    box-shadow:
      2px 2px 0
      #292329;
  }

  .paywall-action button b {
    font-size: 15px;
  }

  .paywall-action button strong {
    font-size: 20px;
  }

  .paywall-small {
    margin-top: 11px;

    color: #9A8D91;

    font-size: 9px;

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

    background: #F6F0EA;
  }

  .loading-page {
    flex-direction: column;
  }

  .loading-mark {
    position: relative;

    width: 100px;
    height: 65px;

    margin-bottom: 23px;
  }

  .loading-mark span {
    position: absolute;

    width: 65px;
    height: 65px;

    border:
      3px solid #28222B;

    border-radius: 50%;
  }

  .loading-mark span:first-child {
    left: 0;

    background: #D17B99;
  }

  .loading-mark span:nth-child(2) {
    right: 0;

    background: #9180A7;
  }

  .loading-mark b {
    position: absolute;

    z-index: 2;

    top: 50%;
    left: 50%;

    color: #F6F0EA;

    transform:
      translate(
        -50%,
        -50%
      );
  }

  .loading-page p {
    margin:
      10px
      0
      0;

    color: #8C7E83;

    font-size: 11px;
  }

  .state-box {
    width:
      min(
        calc(100% - 40px),
        650px
      );
  }

  .state-box h1 {
    margin:
      45px
      0
      10px;

    font-family:
      Georgia,
      serif;

    font-size: 70px;

    font-weight: 500;
  }

  .state-box p {
    color: #766A6F;
  }

  /* ============================================================
     TABLET
  ============================================================ */

  @media (
    max-width: 900px
  ) {

    .hero-stage {
      grid-template-columns:
        0.7fr
        1.3fr;

      margin-top: 25px;
    }

    .archetype-block {
      grid-column:
        1 / -1;

      max-width: 600px;

      margin:
        15px
        auto
        0;

      text-align: center;

      transform: none;
    }

    .archetype-block p {
      margin:
        15px
        auto
        0;
    }

    .chaos-stats {
      margin-top: 30px;
    }

    .insight-layout {
      grid-template-columns: 1fr;
    }

    .insight-card {
      min-height: auto;
    }

    .insight-card.offset {
      margin-top: 0;
    }

    .question-shell {
      grid-template-columns:
        230px
        1fr;

      gap: 30px;
    }

    .paywall-layout {
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
        calc(100% - 30px);
    }

    .hero {
      min-height: auto;

      padding-bottom: 45px;
    }

    .topbar {
      height: 64px;
    }

    .brand {
      font-size: 21px;
    }

    .top-note {
      display: none;
    }

    .hero-names {
      gap: 8px;

      margin-top: 9px;

      font-size:
        clamp(
          44px,
          14vw,
          60px
        );
    }

    .hero-stage {
      display: flex;
      flex-direction: column;

      gap: 0;

      margin-top: 22px;
    }

    .score-block {
      order: 1;

      width: 100%;

      display: grid;

      grid-template-columns:
        auto
        1fr;

      align-items: center;

      column-gap: 17px;

      transform: none;
    }

    .score-number {
      grid-row:
        1 / 4;

      font-size: 82px;
    }

    .score-title {
      margin-top: 0;
    }

    .score-line {
      width: 100%;
      max-width: 190px;

      margin-top: 10px;
    }

    .score-block p {
      margin-top: 9px;

      font-size: 12px;
    }

    .art-wrap {
      order: 2;

      margin-top: 27px;

      transform: none;
    }

    .pixel-scene {
      max-width: 390px;

      border-width: 3px;

      box-shadow:
        7px 8px 0
        #D7C2CD;
    }

    .astronaut {
      transform:
        scale(0.8);
    }

    .astro-a {
      left: 17%;
    }

    .astro-b {
      right: 14%;
    }

    .art-sticker {
      left: 5px;
      bottom: -16px;
    }

    .archetype-block {
      order: 3;

      margin-top: 43px;
    }

    .archetype-block h1 {
      font-size: 48px;
    }

    .archetype-block p {
      max-width: 330px;

      font-size: 13px;
    }

    .chaos-stats {
      width: 100%;
      height: auto;

      gap: 20px;

      margin-top: 32px;
    }

    .chaos-stat {
      gap: 5px;
    }

    .chaos-stat strong {
      font-size: 28px;
    }

    .chaos-stat span {
      font-size: 9px;
    }

    .insights {
      padding:
        47px
        0
        65px;
    }

    .insights-intro {
      margin-bottom: 25px;
    }

    .insight-layout {
      gap: 13px;
    }

    .insight-card,
    .insight-card.offset {
      padding: 22px;

      box-shadow:
        5px 5px 0
        #D8CDD0;
    }

    .insight-number {
      font-size: 40px;
    }

    .insight-kicker {
      margin-top: 18px;
    }

    .insight-card h3 {
      font-size: 28px;
    }

    .insight-card p {
      font-size: 13px;
    }

    .question-shell {
      width:
        calc(100% - 30px);

      min-height: auto;

      grid-template-columns: 1fr;

      gap: 10px;

      padding:
        40px
        0
        50px;
    }

    .question-art {
      height: 180px;
    }

    .pixel-moon {
      left: 50%;

      width: 140px;
      height: 140px;

      transform:
        translateX(-50%);
    }

    .pixel-moon::after {
      width: 110px;
      height: 155px;
    }

    .sitting-pair {
      left: 50%;

      transform:
        translateX(-50%);
    }

    .sitter {
      width: 44px;
      height: 62px;
    }

    .question-copy {
      text-align: center;
    }

    .question-copy h2 {
      margin:
        11px
        auto
        0;

      font-size: 31px;
    }

    .paywall {
      padding:
        58px
        0
        65px;
    }

    .paywall-layout {
      grid-template-columns: 1fr;

      gap: 30px;
    }

    .paywall-note {
      position: static;

      margin-bottom: 25px;

      transform:
        rotate(-4deg);
    }

    .eyebrow {
      margin-left: 0;
    }

    .paywall-copy h2 {
      font-size: 43px;
    }

    .paywall-action {
      padding: 20px;

      box-shadow:
        6px 6px 0
        #CDB6BE;
    }

    .paywall-items {
      grid-template-columns: 1fr;

      gap: 12px;
    }

  }

  @media (
    prefers-reduced-motion:
    reduce
  ) {

    * {
      scroll-behavior:
        auto !important;

      animation-duration:
        0.01ms !important;

      transition-duration:
        0.01ms !important;
    }

  }

`;