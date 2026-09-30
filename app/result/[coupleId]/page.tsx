'use client';

import {
    useEffect,
    useState,
    type ReactNode,
} from 'react';

import {
    useParams,
    useRouter,
} from 'next/navigation';

import {
    determineArchetype,
    type Comparison,
} from '../../../lib/archetypes';

/* ============================================================
   TYPES
============================================================ */

type Couple = {
    id: string;
    partner_a_name: string;
    partner_b_name: string;
    partner_a_completed: boolean;
    partner_b_completed: boolean;
    paid?: boolean;
};

type Dimensions = {
    views?: number;
    care?: number;
    communication?: number;
    rhythm?: number;
    space?: number;
};

type ResultData = {
    waiting?: boolean;

    couple: Couple;

    comparisons?: Comparison[];

    scores?: {
        overall?: number;
        sameAnswers?: number;
        closeAnswers?: number;
        differentAnswers?: number;

        dimensions?: Dimensions;
    };
};

type DimensionKind =
    | 'views'
    | 'care'
    | 'communication'
    | 'rhythm'
    | 'space';

/* ============================================================
   PAGE
============================================================ */

export default function ResultPage() {
    const params =
        useParams<{
            coupleId: string;
        }>();

    const router =
        useRouter();

    const coupleId =
        params.coupleId;

    const [
        data,
        setData,
    ] =
        useState<ResultData | null>(
            null
        );

    const [
        error,
        setError,
    ] =
        useState('');

    useEffect(() => {
        async function load() {
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

                const result:
                    ResultData =
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

        load();
    }, [
        coupleId,
        router,
    ]);

    if (error) {
        return (
            <>
                <main className="state-page">

                    <div className="state-brand">
                        между нами
                    </div>

                    <h1>
                        что-то пошло не так
                    </h1>

                    <p>
                        {error}
                    </p>

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

                    <div className="loading-orbits">

                        <span />

                        <span />

                        <i>
                            ♥
                        </i>

                    </div>

                    <div className="state-brand">
                        между нами
                    </div>

                    <p>
                        соединяем ваши ответы
                    </p>

                </main>

                <style jsx global>
                    {styles}
                </style>
            </>
        );
    }

    const comparisons =
        data.comparisons ?? [];

    const archetype =
        determineArchetype(
            comparisons
        );

    const overall =
        data.scores?.overall ??
        calculateFallback(
            comparisons
        );

    const dimensions =
        data.scores?.dimensions;

    const nameA =
        data.couple.partner_a_name;

    const nameB =
        data.couple.partner_b_name;

    const dimensionItems: {
        kind: DimensionKind;
        label: string;
        value: number;
    }[] = [
        {
            kind: 'views',
            label: 'Близость взглядов',
            value:
                dimensions?.views ??
                overall,
        },

        {
            kind: 'care',
            label: 'Забота',
            value:
                dimensions?.care ??
                overall,
        },

        {
            kind:
                'communication',
            label: 'Общение',
            value:
                dimensions
                    ?.communication ??
                overall,
        },

        {
            kind: 'rhythm',
            label:
                'Совместный ритм',
            value:
                dimensions?.rhythm ??
                overall,
        },

        {
            kind: 'space',
            label:
                'Личное пространство',
            value:
                dimensions?.space ??
                overall,
        },
    ];

    return (
        <>
            <main className="page">

                {/* =====================================================
            HEADER
        ===================================================== */}

                <header className="header narrow">

                    <div className="brand">
                        между нами
                    </div>

                    <div className="header-names">
                        {nameA}
                        <span>
              ×
            </span>
                        {nameB}
                    </div>

                </header>

                {/* =====================================================
            SCORE
        ===================================================== */}

                <section className="score-section narrow">

                    <div className="tiny-label">
                        РЕЗУЛЬТАТ ВАШЕЙ ПАРЫ
                    </div>

                    <h1>
                        насколько
                        <br />
                        вы совпали
                    </h1>

                    <div className="score-main">

                        <div className="score-number">

                            {overall}

                            <sup>
                                %
                            </sup>

                        </div>

                        <div className="score-side">

                            <div className="score-orbit">

                                <div className="orbit orbit-one" />

                                <div className="orbit orbit-two" />

                                <div className="orbit-dot dot-a" />

                                <div className="orbit-dot dot-b" />

                                <div className="orbit-heart">
                                    ♥
                                </div>

                            </div>

                            <div className="score-copy">

                                <strong>
                                    {
                                        getOverallTitle(
                                            overall
                                        )
                                    }
                                </strong>

                                <span>
                  {
                      getOverallSubtitle(
                          overall
                      )
                  }
                </span>

                            </div>

                        </div>

                    </div>

                    <div className="score-rule">

            <span>
              0
            </span>

                        <div>

                            <i
                                style={{
                                    width:
                                        `${overall}%`,
                                }}
                            />

                            <b
                                style={{
                                    left:
                                        `${overall}%`,
                                }}
                            />

                        </div>

                        <span>
              100
            </span>

                    </div>

                </section>

                {/* =====================================================
            DIMENSIONS
        ===================================================== */}

                <section className="dimensions-section">

                    <div className="narrow">

                        <div className="section-heading">

                            <div>

                                <div className="tiny-label">
                                    А ТЕПЕРЬ ПО ЧАСТЯМ
                                </div>

                                <h2>
                                    Где именно
                                    <br />
                                    вы совпали
                                </h2>

                            </div>

                            <div className="heading-note">
                                пять сторон
                                <br />
                                ваших отношений
                                <span>
                  ↙
                </span>
                            </div>

                        </div>

                        <div className="dimensions-list">

                            {
                                dimensionItems.map(
                                    (
                                        item,
                                        index
                                    ) => (
                                        <DimensionRow
                                            key={
                                                item.kind
                                            }
                                            number={
                                                index + 1
                                            }
                                            kind={
                                                item.kind
                                            }
                                            label={
                                                item.label
                                            }
                                            value={
                                                item.value
                                            }
                                        />
                                    )
                                )
                            }

                        </div>

                    </div>

                </section>

                {/* =====================================================
            ARCHETYPE
        ===================================================== */}

                <section className="archetype-section">

                    <div className="narrow">

                        <div className="archetype-intro">

                            <div className="tiny-label">
                                И ЕЩЁ КОЕ-ЧТО
                            </div>

                            <h2>
                                какая вы
                                <br />
                                пара?
                            </h2>

                        </div>

                        <div className="archetype-poster">

                            <div className="poster-top">

                <span>
                  ТИП ПАРЫ
                </span>

                                <strong>
                                    №
                                    {
                                        getTypeNumber(
                                            archetype.id
                                        )
                                    }
                                </strong>

                            </div>

                            <CoupleArtwork
                                archetypeId={
                                    archetype.id
                                }
                            />

                            <div className="poster-copy">

                                <div className="poster-number">
                                    №
                                    {
                                        getTypeNumber(
                                            archetype.id
                                        )
                                    }
                                </div>

                                <div>

                                    <h3>
                                        {
                                            archetype.title
                                        }
                                    </h3>

                                    <p>
                                        {
                                            archetype.description
                                        }
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                {/* =====================================================
            PAYWALL
        ===================================================== */}

                <section className="paywall">

                    <div className="narrow">

                        <div className="paywall-top">

              <span>
                ЛЁГКАЯ ВЕРСИЯ ЗАКОНЧИЛАСЬ
              </span>

                            <i>
                                ✦
                            </i>

                        </div>

                        <div className="paywall-grid">

                            <div className="paywall-title">

                                <h2>
                                    А что
                                    <br />
                                    между строк?
                                </h2>

                                <p>
                                    Разберём ваши ответы
                                    глубже — без диагнозов
                                    и банальностей.
                                </p>

                            </div>

                            <div className="paywall-content">

                                <PayItem
                                    number="01"
                                >
                                    Что каждый из вас
                                    считает заботой
                                </PayItem>

                                <PayItem
                                    number="02"
                                >
                                    Где один ждёт одного,
                                    а второй — другого
                                </PayItem>

                                <PayItem
                                    number="03"
                                >
                                    Что вы можете
                                    не замечать друг о друге
                                </PayItem>

                                <PayItem
                                    number="04"
                                >
                                    О чём вам действительно
                                    стоит поговорить
                                </PayItem>

                                <button
                                    type="button"
                                    onClick={() =>
                                        router.push(
                                            `/report/${coupleId}`
                                        )
                                    }
                                >

                  <span>
                    открыть полный разбор
                  </span>

                                    <strong>
                                        299 ₽
                                    </strong>

                                    <b>
                                        →
                                    </b>

                                </button>

                                <div className="paywall-caption">
                                    один разбор · для вас двоих
                                </div>

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
   FALLBACK SCORE
============================================================ */

function calculateFallback(
    comparisons:
    Comparison[]
) {
    if (
        comparisons.length === 0
    ) {
        return 0;
    }

    let points = 0;

    for (
        const item
        of comparisons
        ) {
        if (
            item.similarity ===
            'same'
        ) {
            points += 1;
        }

        if (
            item.similarity ===
            'close'
        ) {
            points += 0.5;
        }
    }

    return Math.round(
        (
            points /
            comparisons.length
        ) *
        100
    );
}

/* ============================================================
   SCORE COPY
============================================================ */

function getOverallTitle(
    score: number
) {
    if (score >= 86) {
        return 'почти одна голова';
    }

    if (score >= 71) {
        return 'очень близко';
    }

    if (score >= 56) {
        return 'много общего';
    }

    if (score >= 41) {
        return 'есть где поспорить';
    }

    return 'два разных мира';
}

function getOverallSubtitle(
    score: number
) {
    if (score >= 86) {
        return 'либо любовь, либо вы списывали';
    }

    if (score >= 71) {
        return 'различия есть, но база очень похожа';
    }

    if (score >= 56) {
        return 'понимаете друг друга чаще, чем не понимаете';
    }

    if (score >= 41) {
        return 'совпадения есть, различий тоже хватает';
    }

    return 'зато вам точно есть что узнавать друг о друге';
}

/* ============================================================
   DIMENSION
============================================================ */

function DimensionRow({
                          number,
                          kind,
                          label,
                          value,
                      }: {
    number: number;
    kind: DimensionKind;
    label: string;
    value: number;
}) {
    return (
        <div className="dimension-row">

            <div className="dimension-number">
                0{number}
            </div>

            <DimensionIcon
                kind={
                    kind
                }
            />

            <div className="dimension-main">

                <div className="dimension-head">

          <span>
            {label}
          </span>

                    <strong>
                        {value}%
                    </strong>

                </div>

                <SegmentBar
                    value={
                        value
                    }
                />

            </div>

        </div>
    );
}

/* ============================================================
   SEGMENT BAR
============================================================ */

function SegmentBar({
                        value,
                    }: {
    value: number;
}) {
    const active =
        Math.round(
            value / 10
        );

    return (
        <div className="segment-bar">

            {
                Array.from({
                    length: 10,
                }).map(
                    (
                        _,
                        index
                    ) => (
                        <span
                            key={
                                index
                            }
                            className={
                                index < active
                                    ? 'active'
                                    : ''
                            }
                        />
                    )
                )
            }

        </div>
    );
}

/* ============================================================
   DIMENSION ICONS
============================================================ */

function DimensionIcon({
                           kind,
                       }: {
    kind: DimensionKind;
}) {
    if (
        kind === 'views'
    ) {
        return (
            <div className="dimension-icon icon-eyes">

                <span />

                <span />

            </div>
        );
    }

    if (
        kind === 'care'
    ) {
        return (
            <div className="dimension-icon icon-care">

        <span>
          ♥
        </span>

            </div>
        );
    }

    if (
        kind ===
        'communication'
    ) {
        return (
            <div className="dimension-icon icon-talk">

                <span />

                <span />

            </div>
        );
    }

    if (
        kind === 'rhythm'
    ) {
        return (
            <div className="dimension-icon icon-wave">

                <svg
                    viewBox="0 0 64 40"
                    aria-hidden="true"
                >
                    <path
                        d="M2 22 C10 4 17 4 24 22 C31 40 38 40 45 22 C52 4 58 4 62 17"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                </svg>

            </div>
        );
    }

    return (
        <div className="dimension-icon icon-space">

            <span />

            <span />

        </div>
    );
}

/* ============================================================
   ARCHETYPE
============================================================ */

function getTypeNumber(
    id: string
) {
    const map:
        Record<string, string> = {
        knight_princess:
            '01',

        wizards:
            '02',

        pirates:
            '03',

        astronauts:
            '04',

        sun_moon:
            '05',

        dragon_keeper:
            '06',

        players:
            '07',

        homekeepers:
            '08',
    };

    return (
        map[id] ??
        '00'
    );
}

/* ============================================================
   COUPLE ARTWORK

   Это уже не "два CSS-человечка".
   Делаем постерную сцену:
   большая луна + две фигуры + орбиты.
============================================================ */

function CoupleArtwork({
                           archetypeId,
                       }: {
    archetypeId: string;
}) {
    const theme =
        getArtworkTheme(
            archetypeId
        );

    return (
        <div
            className={
                `couple-art ${theme}`
            }
        >

            <div className="art-stars">

                <i className="art-star star-a">
                    ✦
                </i>

                <i className="art-star star-b">
                    ✦
                </i>

                <i className="art-star star-c">
                    ·
                </i>

                <i className="art-star star-d">
                    +
                </i>

            </div>

            <div className="art-orbit orbit-a" />

            <div className="art-orbit orbit-b" />

            <div className="art-sun">

                <span />

                <span />

                <span />

            </div>

            <div className="art-ground">

                <span className="ground-hole hole-a" />

                <span className="ground-hole hole-b" />

                <span className="ground-hole hole-c" />

            </div>

            <PosterCharacter
                side="left"
            />

            <PosterCharacter
                side="right"
            />

            <div className="art-heart">
                ♥
            </div>

            <div className="art-caption">
                {
                    getArtworkCaption(
                        archetypeId
                    )
                }
            </div>

        </div>
    );
}

/* ============================================================
   POSTER CHARACTER
============================================================ */

function PosterCharacter({
                             side,
                         }: {
    side:
        | 'left'
        | 'right';
}) {
    return (
        <div
            className={
                `poster-character ${side}`
            }
        >

            <div className="character-pack" />

            <div className="character-head">

                <div className="character-face">

                    <span className="face-eye eye-a" />

                    <span className="face-eye eye-b" />

                    <span className="face-smile" />

                </div>

            </div>

            <div className="character-body">

        <span className="body-panel">

          <i />

          <i />

        </span>

            </div>

            <div className="character-arm arm-a" />

            <div className="character-arm arm-b" />

            <div className="character-leg leg-a" />

            <div className="character-leg leg-b" />

        </div>
    );
}

function getArtworkTheme(
    id: string
) {
    switch (id) {
        case 'sun_moon':
            return 'theme-moon';

        case 'pirates':
            return 'theme-pirates';

        case 'wizards':
            return 'theme-wizards';

        case 'dragon_keeper':
            return 'theme-dragon';

        default:
            return 'theme-space';
    }
}

function getArtworkCaption(
    id: string
) {
    switch (id) {
        case 'astronauts':
            return 'две орбиты · один маршрут';

        case 'knight_princess':
            return 'своих не бросаем';

        case 'wizards':
            return 'понимаем магию по-разному';

        case 'pirates':
            return 'курс может меняться · команда нет';

        case 'sun_moon':
            return 'разные стороны одного неба';

        case 'dragon_keeper':
            return 'один зажигает · другой держит курс';

        case 'players':
            return 'играете по-разному · команда одна';

        case 'homekeepers':
            return 'главное место — своё';

        default:
            return 'между вами что-то есть';
    }
}

/* ============================================================
   PAY ITEM
============================================================ */

function PayItem({
                     number,
                     children,
                 }: {
    number: string;
    children: ReactNode;
}) {
    return (
        <div className="pay-item">

      <span>
        {number}
      </span>

            <p>
                {children}
            </p>

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

    background:
      #F5F0EA;

    color:
      #262126;

    font-family:
      "Trebuchet MS",
      "Helvetica Neue",
      Arial,
      sans-serif;
  }

  button {
    font: inherit;
  }

  .page {
    min-height: 100svh;

    overflow: hidden;

    background:
      #F5F0EA;
  }

  /*
   * Главное изменение:
   * весь основной контент теперь
   * сидит в узкой колонке.
   */

  .narrow {
    width:
      min(
        calc(100% - 40px),
        820px
      );

    margin:
      0 auto;
  }

  /* ============================================================
     HEADER
  ============================================================ */

  .header {
    height: 74px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-bottom:
      1px solid
      rgba(
        38,
        33,
        38,
        0.12
      );
  }

  .brand {
    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size: 23px;
    font-style: italic;
    font-weight: 700;

    letter-spacing:
      -0.055em;
  }

  .header-names {
    color:
      #8B7F85;

    font-size: 9px;
    font-weight: 800;

    letter-spacing:
      0.13em;

    text-transform:
      uppercase;
  }

  .header-names span {
    margin:
      0 8px;

    color:
      #A93E67;
  }

  /* ============================================================
     TYPOGRAPHY
  ============================================================ */

  .tiny-label {
    color:
      #A93E67;

    font-size: 9px;
    font-weight: 900;

    letter-spacing:
      0.22em;

    text-transform:
      uppercase;
  }

  /* ============================================================
     SCORE
  ============================================================ */

  .score-section {
    padding:
      74px
      0
      78px;
  }

  .score-section > h1 {
    max-width:
      680px;

    margin:
      13px
      0
      43px;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        54px,
        8vw,
        86px
      );

    font-style:
      italic;

    font-weight: 400;

    line-height: 0.87;

    letter-spacing:
      -0.07em;
  }

  .score-main {
    display: grid;

    grid-template-columns:
      minmax(
        260px,
        0.9fr
      )
      1fr;

    align-items: center;

    gap: 55px;
  }

  .score-number {
    color:
      #A93E67;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        120px,
        18vw,
        178px
      );

    font-style:
      italic;

    font-weight: 400;

    line-height: 0.75;

    letter-spacing:
      -0.09em;
  }

  .score-number sup {
    position: relative;

    top: -1.05em;

    margin-left:
      4px;

    font-size:
      0.27em;

    font-style:
      normal;

    letter-spacing:
      -0.05em;
  }

  .score-side {
    display: flex;
    align-items: center;

    gap: 24px;
  }

  /* ============================================================
     SCORE ORBIT
  ============================================================ */

  .score-orbit {
    position: relative;

    width: 130px;
    height: 130px;

    flex:
      0 0 130px;
  }

  .orbit {
    position: absolute;

    border:
      1.5px solid
      #BEB0B6;

    border-radius: 50%;
  }

  .orbit-one {
    inset:
      11px
      23px;

    transform:
      rotate(31deg);
  }

  .orbit-two {
    inset:
      23px
      11px;

    transform:
      rotate(-31deg);
  }

  .orbit-dot {
    position: absolute;

    width: 26px;
    height: 26px;

    border:
      3px solid
      #F5F0EA;

    border-radius: 50%;

    box-shadow:
      0 0 0 1px
      #302930;
  }

  .dot-a {
    top: 17px;
    left: 31px;

    background:
      #E4B24D;
  }

  .dot-b {
    right: 25px;
    bottom: 20px;

    background:
      #756487;
  }

  .orbit-heart {
    position: absolute;

    top: 50%;
    left: 50%;

    color:
      #A93E67;

    font-family:
      Georgia,
      serif;

    font-size: 25px;

    transform:
      translate(
        -50%,
        -50%
      );
  }

  .score-copy {
    max-width:
      190px;
  }

  .score-copy strong {
    display: block;

    font-family:
      Georgia,
      serif;

    font-size: 22px;
    font-style: italic;
    font-weight: 400;

    line-height: 1.05;
  }

  .score-copy span {
    display: block;

    margin-top:
      9px;

    color:
      #8D8187;

    font-size: 11px;
    line-height: 1.45;
  }

  /* ============================================================
     SCORE RULE
  ============================================================ */

  .score-rule {
    display: grid;

    grid-template-columns:
      auto
      1fr
      auto;

    align-items: center;

    gap: 12px;

    margin-top:
      49px;

    color:
      #9B9095;

    font-family:
      Georgia,
      serif;

    font-size: 10px;
    font-style: italic;
  }

  .score-rule > div {
    position: relative;

    height: 3px;

    background:
      #DDD3D5;
  }

  .score-rule i {
    position: absolute;

    top: 0;
    left: 0;

    height: 100%;

    background:
      #A93E67;
  }

  .score-rule b {
    position: absolute;

    top: 50%;

    width: 13px;
    height: 13px;

    border:
      3px solid
      #F5F0EA;

    border-radius: 50%;

    background:
      #A93E67;

    box-shadow:
      0 0 0 1px
      #A93E67;

    transform:
      translate(
        -50%,
        -50%
      );
  }

  /* ============================================================
     DIMENSIONS
  ============================================================ */

  .dimensions-section {
    padding:
      74px
      0
      80px;

    background:
      #FCFAF7;

    border-top:
      1px solid
      #E5DDDA;

    border-bottom:
      1px solid
      #E5DDDA;
  }

  .section-heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    gap: 30px;

    margin-bottom:
      38px;
  }

  .section-heading h2,
  .archetype-intro h2 {
    margin:
      10px
      0
      0;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        45px,
        7vw,
        68px
      );

    font-style:
      italic;

    font-weight: 400;

    line-height: 0.9;

    letter-spacing:
      -0.065em;
  }

  .heading-note {
    position: relative;

    margin-bottom:
      7px;

    color:
      #9B8F94;

    font-family:
      Georgia,
      serif;

    font-size: 12px;
    font-style: italic;

    line-height: 1.25;

    transform:
      rotate(-3deg);
  }

  .heading-note span {
    position: absolute;

    right: -20px;
    bottom: -15px;

    color:
      #A93E67;

    font-size: 23px;
  }

  .dimensions-list {
    border-top:
      1px solid
      #DCD3D0;
  }

  .dimension-row {
    min-height:
      105px;

    display: grid;

    grid-template-columns:
      34px
      72px
      1fr;

    align-items: center;

    gap: 20px;

    border-bottom:
      1px solid
      #DCD3D0;
  }

  .dimension-number {
    align-self:
      start;

    padding-top:
      24px;

    color:
      #B7ACB0;

    font-family:
      Georgia,
      serif;

    font-size: 11px;
    font-style: italic;
  }

  .dimension-main {
    min-width: 0;
  }

  .dimension-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;

    gap: 20px;

    margin-bottom:
      15px;
  }

  .dimension-head span {
    font-family:
      Georgia,
      serif;

    font-size: 20px;
    font-style: italic;
  }

  .dimension-head strong {
    color:
      #A93E67;

    font-family:
      Georgia,
      serif;

    font-size: 26px;
    font-style: italic;
    font-weight: 400;
  }

  /* ============================================================
     SEGMENT BAR
  ============================================================ */

  .segment-bar {
    display: grid;

    grid-template-columns:
      repeat(
        10,
        1fr
      );

    gap: 5px;
  }

  .segment-bar span {
    height: 7px;

    border-radius:
      20px;

    background:
      #E6DFDC;
  }

  .segment-bar span.active {
    background:
      #A93E67;
  }

  /* ============================================================
     DIMENSION ICONS
  ============================================================ */

  .dimension-icon {
    position: relative;

    width: 60px;
    height: 60px;

    color:
      #302A30;
  }

  .icon-eyes {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 5px;
  }

  .icon-eyes span {
    position: relative;

    width: 27px;
    height: 18px;

    border:
      2px solid
      #302A30;

    border-radius:
      70% 30% 70% 30%;
  }

  .icon-eyes span:last-child {
    border-radius:
      30% 70% 30% 70%;
  }

  .icon-eyes span::after {
    content: '';

    position: absolute;

    top: 50%;
    left: 50%;

    width: 6px;
    height: 6px;

    border-radius: 50%;

    background:
      #A93E67;

    transform:
      translate(
        -50%,
        -50%
      );
  }

  .icon-care {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-care::before,
  .icon-care::after {
    content: '';

    position: absolute;

    bottom: 12px;

    width: 30px;
    height: 16px;

    border-bottom:
      2px solid
      #302A30;
  }

  .icon-care::before {
    left: 2px;

    border-radius:
      0 0 100% 0;

    transform:
      rotate(13deg);
  }

  .icon-care::after {
    right: 2px;

    border-radius:
      0 0 0 100%;

    transform:
      rotate(-13deg);
  }

  .icon-care span {
    color:
      #A93E67;

    font-family:
      Georgia,
      serif;

    font-size: 25px;
  }

  .icon-talk span {
    position: absolute;

    width: 34px;
    height: 25px;

    border:
      2px solid
      #302A30;

    border-radius:
      50%;
  }

  .icon-talk span:first-child {
    top: 7px;
    left: 1px;
  }

  .icon-talk span:last-child {
    right: 1px;
    bottom: 7px;

    border-color:
      #A93E67;
  }

  .icon-talk span::after {
    content: '';

    position: absolute;

    bottom: -5px;
    left: 7px;

    width: 8px;
    height: 8px;

    border-left:
      2px solid
      currentColor;

    transform:
      rotate(-25deg);
  }

  .icon-wave {
    display: flex;
    align-items: center;
  }

  .icon-wave svg {
    width: 60px;
  }

  .icon-space span {
    position: absolute;

    top: 50%;

    width: 28px;
    height: 28px;

    border:
      2px solid
      #302A30;

    border-radius: 50%;

    transform:
      translateY(-50%);
  }

  .icon-space span:first-child {
    left: 0;

    background:
      #E3B34E;
  }

  .icon-space span:last-child {
    right: 0;

    background:
      #8C799E;
  }

  /* ============================================================
     ARCHETYPE
  ============================================================ */

  .archetype-section {
    padding:
      82px
      0
      95px;
  }

  .archetype-intro {
    margin-bottom:
      35px;
  }

  .archetype-poster {
    overflow: hidden;

    border:
      1px solid
      #332C32;

    background:
      #F9F4EE;

    box-shadow:
      9px 10px 0
      #D9C9CE;
  }

  .poster-top {
    height: 49px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding:
      0 19px;

    border-bottom:
      1px solid
      #332C32;

    color:
      #6D6267;

    font-size: 8px;
    font-weight: 900;

    letter-spacing:
      0.2em;
  }

  .poster-top strong {
    color:
      #A93E67;

    font-family:
      Georgia,
      serif;

    font-size: 19px;
    font-style: italic;
    font-weight: 400;

    letter-spacing: 0;
  }

  /* ============================================================
     ART
  ============================================================ */

  .couple-art {
    position: relative;

    height:
      430px;

    overflow: hidden;

    background:
      #393340;
  }

  .art-stars {
    position: absolute;

    inset: 0;

    color:
      #E3B057;
  }

  .art-star {
    position: absolute;

    font-style: normal;
  }

  .star-a {
    top: 12%;
    left: 12%;

    font-size: 25px;
  }

  .star-b {
    top: 23%;
    right: 11%;

    color:
      #BD6E8A;

    font-size: 18px;
  }

  .star-c {
    top: 8%;
    left: 54%;

    color:
      #F4E9DC;

    font-size: 30px;
  }

  .star-d {
    top: 39%;
    left: 7%;

    color:
      #857395;

    font-size: 22px;
  }

  .art-orbit {
    position: absolute;

    border:
      1px solid
      rgba(
        242,
        225,
        209,
        0.22
      );

    border-radius: 50%;
  }

  .orbit-a {
    width: 520px;
    height: 200px;

    top: 80px;
    left: 50%;

    transform:
      translateX(-50%)
      rotate(-13deg);
  }

  .orbit-b {
    width: 450px;
    height: 160px;

    top: 115px;
    left: 50%;

    transform:
      translateX(-50%)
      rotate(15deg);
  }

  .art-sun {
    position: absolute;

    top: 52px;
    left: 50%;

    width: 176px;
    height: 176px;

    border:
      4px solid
      #2B2630;

    border-radius: 50%;

    background:
      #E7B75B;

    box-shadow:
      10px 9px 0
      rgba(
        24,
        20,
        27,
        0.22
      );

    transform:
      translateX(-50%);
  }

  .art-sun span {
    position: absolute;

    border:
      3px solid
      rgba(
        75,
        57,
        45,
        0.3
      );

    border-radius: 50%;
  }

  .art-sun span:first-child {
    top: 30px;
    left: 30px;

    width: 37px;
    height: 23px;
  }

  .art-sun span:nth-child(2) {
    top: 78px;
    right: 25px;

    width: 30px;
    height: 34px;
  }

  .art-sun span:nth-child(3) {
    bottom: 24px;
    left: 55px;

    width: 25px;
    height: 17px;
  }

  .art-ground {
    position: absolute;

    left: -8%;
    right: -8%;
    bottom: -120px;

    height: 280px;

    border:
      4px solid
      #2B2630;

    border-radius:
      50% 50% 0 0;

    background:
      #7D6C88;
  }

  .ground-hole {
    position: absolute;

    border:
      3px solid
      #50465A;

    border-radius: 50%;

    background:
      #665971;
  }

  .hole-a {
    top: 45px;
    left: 18%;

    width: 62px;
    height: 35px;
  }

  .hole-b {
    top: 85px;
    left: 48%;

    width: 90px;
    height: 42px;
  }

  .hole-c {
    top: 35px;
    right: 16%;

    width: 48px;
    height: 28px;
  }

  /* ============================================================
     POSTER CHARACTERS
  ============================================================ */

  .poster-character {
    position: absolute;

    z-index: 6;

    bottom: 54px;

    width: 145px;
    height: 220px;
  }

  .poster-character.left {
    left:
      calc(
        50% - 165px
      );

    transform:
      rotate(3deg);
  }

  .poster-character.right {
    right:
      calc(
        50% - 165px
      );

    transform:
      rotate(-3deg);
  }

  .character-pack {
    position: absolute;

    z-index: 1;

    top: 80px;
    left: 7px;

    width: 52px;
    height: 90px;

    border:
      4px solid
      #29242C;

    border-radius:
      17px;

    background:
      #A8617C;
  }

  .character-head {
    position: absolute;

    z-index: 5;

    top: 0;
    left: 50%;

    width: 100px;
    height: 94px;

    border:
      4px solid
      #29242C;

    border-radius:
      46% 46% 43% 43%;

    background:
      #EEE4DA;

    transform:
      translateX(-50%);
  }

  .character-face {
    position: absolute;

    top: 17px;
    left: 15px;

    width: 63px;
    height: 49px;

    border:
      4px solid
      #29242C;

    border-radius:
      45%;

    background:
      #665B70;
  }

  .face-eye {
    position: absolute;

    top: 17px;

    width: 5px;
    height: 5px;

    border-radius: 50%;

    background:
      #F3D8B0;
  }

  .eye-a {
    left: 17px;
  }

  .eye-b {
    right: 17px;
  }

  .face-smile {
    position: absolute;

    left: 50%;
    bottom: 8px;

    width: 18px;
    height: 8px;

    border-bottom:
      2px solid
      #F3D8B0;

    border-radius:
      0 0 50% 50%;

    transform:
      translateX(-50%);
  }

  .character-body {
    position: absolute;

    z-index: 4;

    top: 80px;
    left: 50%;

    width: 94px;
    height: 94px;

    border:
      4px solid
      #29242C;

    border-radius:
      16px 16px 29px 29px;

    background:
      #EEE4DA;

    transform:
      translateX(-50%);
  }

  .body-panel {
    position: absolute;

    top: 25px;
    left: 50%;

    width: 40px;
    height: 28px;

    border:
      3px solid
      #29242C;

    background:
      #B95A7B;

    transform:
      translateX(-50%);
  }

  .body-panel i {
    position: absolute;

    top: 7px;

    width: 6px;
    height: 6px;

    background:
      #E8B653;
  }

  .body-panel i:first-child {
    left: 7px;
  }

  .body-panel i:last-child {
    right: 7px;

    background:
      #746589;
  }

  .character-arm {
    position: absolute;

    z-index: 3;

    top: 99px;

    width: 66px;
    height: 27px;

    border:
      4px solid
      #29242C;

    border-radius:
      13px;

    background:
      #EEE4DA;
  }

  .arm-a {
    left: -23px;

    transform:
      rotate(23deg);
  }

  .arm-b {
    right: -23px;

    transform:
      rotate(-23deg);
  }

  .character-leg {
    position: absolute;

    z-index: 2;

    bottom: 0;

    width: 42px;
    height: 69px;

    border:
      4px solid
      #29242C;

    border-radius:
      10px 10px 20px 20px;

    background:
      #EEE4DA;
  }

  .leg-a {
    left: 27px;

    transform:
      rotate(6deg);
  }

  .leg-b {
    right: 27px;

    transform:
      rotate(-6deg);
  }

  .poster-character.left
  .arm-b {
    width: 80px;

    right: -40px;

    transform:
      rotate(-12deg);
  }

  .poster-character.right
  .arm-a {
    width: 80px;

    left: -40px;

    transform:
      rotate(12deg);
  }

  .art-heart {
    position: absolute;

    z-index: 10;

    top: 190px;
    left: 50%;

    color:
      #C64F76;

    font-family:
      Georgia,
      serif;

    font-size: 34px;

    transform:
      translateX(-50%);
  }

  .art-caption {
    position: absolute;

    z-index: 20;

    right: 20px;
    bottom: 18px;

    padding:
      9px
      13px;

    border:
      1px solid
      #332C32;

    background:
      #F6EFE8;

    color:
      #332C32;

    font-family:
      Georgia,
      serif;

    font-size: 11px;
    font-style: italic;

    transform:
      rotate(-2deg);
  }

  /* different subtle palettes */

  .theme-moon
  .art-sun {
    background:
      #C9B8D3;
  }

  .theme-pirates
  .art-sun {
    background:
      #D68B58;
  }

  .theme-wizards
  .art-sun {
    background:
      #8F7BA8;
  }

  .theme-dragon
  .art-sun {
    background:
      #C96163;
  }

  /* ============================================================
     POSTER COPY
  ============================================================ */

  .poster-copy {
    display: grid;

    grid-template-columns:
      120px
      1fr;

    gap: 25px;

    padding:
      31px
      34px
      36px;

    border-top:
      1px solid
      #332C32;
  }

  .poster-number {
    color:
      #A93E67;

    font-family:
      Georgia,
      serif;

    font-size: 36px;
    font-style: italic;
  }

  .poster-copy h3 {
    margin: 0;

    font-family:
      Georgia,
      serif;

    font-size:
      clamp(
        42px,
        7vw,
        67px
      );

    font-style: italic;
    font-weight: 400;

    line-height: 0.9;

    letter-spacing:
      -0.06em;
  }

  .poster-copy p {
    max-width:
      430px;

    margin:
      17px
      0
      0;

    color:
      #786D72;

    font-size: 13px;
    line-height: 1.55;
  }

  /* ============================================================
     PAYWALL
  ============================================================ */

  .paywall {
    padding:
      72px
      0
      80px;

    background:
      #2E2931;

    color:
      #F6EFE9;
  }

  .paywall-top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding-bottom:
      20px;

    border-bottom:
      1px solid
      rgba(
        255,
        255,
        255,
        0.15
      );

    color:
      #D47B9A;

    font-size: 8px;
    font-weight: 900;

    letter-spacing:
      0.22em;
  }

  .paywall-top i {
    color:
      #E5B65A;

    font-size: 20px;
    font-style: normal;
  }

  .paywall-grid {
    display: grid;

    grid-template-columns:
      0.9fr
      1.1fr;

    gap: 60px;

    padding-top:
      40px;
  }

  .paywall-title h2 {
    margin: 0;

    font-family:
      Georgia,
      serif;

    font-size:
      clamp(
        43px,
        7vw,
        66px
      );

    font-style: italic;
    font-weight: 400;

    line-height: 0.9;

    letter-spacing:
      -0.055em;
  }

  .paywall-title > p {
    max-width:
      260px;

    margin:
      22px
      0
      0;

    color:
      #AFA4AB;

    font-size: 11px;
    line-height: 1.5;
  }

  .pay-item {
    display: grid;

    grid-template-columns:
      28px
      1fr;

    gap: 12px;

    padding:
      13px
      0;

    border-bottom:
      1px solid
      rgba(
        255,
        255,
        255,
        0.11
      );
  }

  .pay-item span {
    color:
      #D47B9A;

    font-family:
      Georgia,
      serif;

    font-size: 10px;
    font-style: italic;
  }

  .pay-item p {
    margin: 0;

    color:
      #DDD5DA;

    font-family:
      Georgia,
      serif;

    font-size: 15px;
    font-style: italic;

    line-height: 1.25;
  }

  .paywall-content button {
    width: 100%;

    display: grid;

    grid-template-columns:
      1fr
      auto
      auto;

    align-items: center;

    gap: 14px;

    margin-top:
      24px;

    padding:
      17px
      18px;

    border:
      1px solid
      #E4A0B8;

    border-radius: 0;

    background:
      #A93E67;

    color:
      #FFFFFF;

    cursor: pointer;

    text-align: left;
  }

  .paywall-content button span {
    font-family:
      Georgia,
      serif;

    font-size: 15px;
    font-style: italic;
  }

  .paywall-content button strong {
    font-size: 14px;
  }

  .paywall-content button b {
    font-size: 19px;
  }

  .paywall-content button:hover {
    background:
      #BB4B75;
  }

  .paywall-caption {
    margin-top:
      10px;

    color:
      #817780;

    font-size: 8px;

    text-align: center;

    letter-spacing:
      0.07em;
  }

  /* ============================================================
     STATES
  ============================================================ */

  .loading-page,
  .state-page {
    min-height:
      100svh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 30px;

    background:
      #F5F0EA;

    text-align: center;
  }

  .state-brand {
    font-family:
      Georgia,
      serif;

    font-size: 25px;
    font-style: italic;
    font-weight: 700;
  }

  .loading-page p,
  .state-page p {
    color:
      #8F8389;

    font-family:
      Georgia,
      serif;

    font-size: 12px;
    font-style: italic;
  }

  .state-page h1 {
    margin:
      30px
      0
      10px;

    font-family:
      Georgia,
      serif;

    font-size: 45px;
    font-style: italic;
    font-weight: 400;
  }

  .loading-orbits {
    position: relative;

    width: 100px;
    height: 75px;

    margin-bottom:
      28px;
  }

  .loading-orbits span {
    position: absolute;

    top: 50%;

    width: 58px;
    height: 58px;

    border:
      2px solid
      #302A30;

    border-radius: 50%;

    transform:
      translateY(-50%);
  }

  .loading-orbits span:first-child {
    left: 3px;
  }

  .loading-orbits span:nth-child(2) {
    right: 3px;
  }

  .loading-orbits i {
    position: absolute;

    top: 50%;
    left: 50%;

    color:
      #A93E67;

    font-family:
      Georgia,
      serif;

    font-style: normal;

    transform:
      translate(
        -50%,
        -50%
      );
  }

  /* ============================================================
     MOBILE
  ============================================================ */

  @media (
    max-width: 650px
  ) {

    .narrow {
      width:
        calc(
          100% - 30px
        );
    }

    .header {
      height: 62px;
    }

    .brand {
      font-size: 20px;
    }

    .header-names {
      max-width:
        150px;

      overflow: hidden;

      font-size: 8px;

      text-overflow:
        ellipsis;

      white-space:
        nowrap;
    }

    .score-section {
      padding:
        50px
        0
        55px;
    }

    .score-section > h1 {
      margin-bottom:
        34px;

      font-size:
        clamp(
          49px,
          15vw,
          67px
        );
    }

    .score-main {
      grid-template-columns:
        1fr;

      gap: 32px;
    }

    .score-number {
      font-size:
        clamp(
          118px,
          38vw,
          155px
        );
    }

    .score-side {
      gap: 17px;
    }

    .score-orbit {
      width: 105px;
      height: 105px;

      flex-basis:
        105px;
    }

    .score-copy {
      max-width:
        190px;
    }

    .score-rule {
      margin-top:
        36px;
    }

    .dimensions-section {
      padding:
        54px
        0
        58px;
    }

    .section-heading {
      align-items:
        flex-start;

      margin-bottom:
        28px;
    }

    .section-heading h2,
    .archetype-intro h2 {
      font-size:
        48px;
    }

    .heading-note {
      display: none;
    }

    .dimension-row {
      min-height:
        98px;

      grid-template-columns:
        25px
        55px
        1fr;

      gap: 12px;
    }

    .dimension-icon {
      width: 50px;
      height: 50px;

      transform:
        scale(0.84);
    }

    .dimension-head {
      margin-bottom:
        12px;
    }

    .dimension-head span {
      font-size: 16px;
    }

    .dimension-head strong {
      font-size: 20px;
    }

    .segment-bar {
      gap: 3px;
    }

    .segment-bar span {
      height: 6px;
    }

    .archetype-section {
      padding:
        57px
        0
        70px;
    }

    .archetype-intro {
      margin-bottom:
        27px;
    }

    .archetype-poster {
      box-shadow:
        6px 7px 0
        #D9C9CE;
    }

    .couple-art {
      height:
        330px;
    }

    .art-sun {
      width: 130px;
      height: 130px;
    }

    .poster-character {
      bottom: 37px;

      transform-origin:
        bottom center;
    }

    .poster-character.left {
      left:
        calc(
          50% - 137px
        );

      transform:
        scale(0.78)
        rotate(3deg);
    }

    .poster-character.right {
      right:
        calc(
          50% - 137px
        );

      transform:
        scale(0.78)
        rotate(-3deg);
    }

    .art-heart {
      top: 155px;
    }

    .poster-copy {
      grid-template-columns:
        1fr;

      gap: 5px;

      padding:
        25px
        22px
        29px;
    }

    .poster-number {
      font-size: 22px;
    }

    .poster-copy h3 {
      font-size:
        47px;
    }

    .poster-copy p {
      margin-top:
        13px;
    }

    .art-caption {
      right: 10px;
      bottom: 10px;

      font-size: 9px;
    }

    .paywall {
      padding:
        52px
        0
        60px;
    }

    .paywall-grid {
      grid-template-columns:
        1fr;

      gap: 33px;

      padding-top:
        30px;
    }

    .paywall-title h2 {
      font-size: 49px;
    }

    .paywall-title > p {
      margin-top:
        16px;
    }

  }

`;