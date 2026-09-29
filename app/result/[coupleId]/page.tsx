'use client';

import {
    useEffect,
    useState,
} from 'react';

import {
    useParams,
    useRouter,
} from 'next/navigation';

import {
    determineArchetype,
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
                            cache:
                                'no-store',
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

                if (
                    result.waiting
                ) {
                    router.replace(
                        `/waiting/${coupleId}`
                    );

                    return;
                }

                setData(
                    result
                );
            } catch (err) {
                console.error(
                    err
                );

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
                <main className="state">
                    {error}
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
                <main className="state">
                    считаем, что у вас там...
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

    const nameA =
        data.couple
            .partner_a_name;

    const nameB =
        data.couple
            .partner_b_name;

    const overall =
        data.scores
            ?.overall ??
        calculateFallback(
            comparisons
        );

    const dimensions =
        data.scores
            ?.dimensions;

    const dimensionItems = [
        {
            label:
                'Близость взглядов',
            value:
                dimensions
                    ?.views ??
                overall,
            face: 'happy',
        },

        {
            label:
                'Забота',
            value:
                dimensions
                    ?.care ??
                overall,
            face: 'happy',
        },

        {
            label:
                'Общение',
            value:
                dimensions
                    ?.communication ??
                overall,
            face: 'neutral',
        },

        {
            label:
                'Совместный ритм',
            value:
                dimensions
                    ?.rhythm ??
                overall,
            face: 'happy',
        },

        {
            label:
                'Личное пространство',
            value:
                dimensions
                    ?.space ??
                overall,
            face: 'neutral',
        },
    ];

    return (
        <>
            <main className="page">

                {/* ===============================================
            HEADER
        =============================================== */}

                <header className="header">

                    <div className="brand">
                        между нами
                    </div>

                    <div className="names">
                        {nameA}
                        <span>
              +
            </span>
                        {nameB}
                    </div>

                </header>

                {/* ===============================================
            OVERALL
        =============================================== */}

                <section className="overall">

                    <div className="section-label">
                        ВАША ОБЩАЯ
                    </div>

                    <h1>
                        совместимость
                    </h1>

                    <div className="overall-content">

                        <div className="overall-number">
                            {overall}
                            <span>
                %
              </span>
                        </div>

                        <div className="overall-face">

                            <Face
                                value={
                                    overall
                                }
                                large
                            />

                        </div>

                        <div className="overall-copy">

                            <strong>
                                {
                                    getOverallTitle(
                                        overall
                                    )
                                }
                            </strong>

                            <p>
                                по вашим ответам
                                в этом тесте
                            </p>

                        </div>

                    </div>

                </section>

                {/* ===============================================
            DIMENSIONS
        =============================================== */}

                <section className="dimensions">

                    <div className="dimensions-heading">

            <span>
              А если разобрать
              по частям
            </span>

                        <b>
                            ↓
                        </b>

                    </div>

                    <div className="dimension-list">

                        {
                            dimensionItems.map(
                                (
                                    item,
                                    index
                                ) => (
                                    <Dimension
                                        key={
                                            item.label
                                        }
                                        index={
                                            index + 1
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

                </section>

                {/* ===============================================
            TYPE
        =============================================== */}

                <section className="type-section">

                    <div className="type-heading">

                        <div>

                            <div className="section-label">
                                А ТЕПЕРЬ ГЛАВНОЕ
                            </div>

                            <h2>
                                Ваш тип пары
                            </h2>

                        </div>

                        <div className="type-number">
                            №
                            {
                                getTypeNumber(
                                    archetype.id
                                )
                            }
                        </div>

                    </div>

                    <div className="type-card">

                        <div className="type-art">

                            <PixelCouple
                                archetypeId={
                                    archetype.id
                                }
                            />

                        </div>

                        <div className="type-copy">

                            <div className="type-small">
                                ТИП ПАРЫ №
                                {
                                    getTypeNumber(
                                        archetype.id
                                    )
                                }
                            </div>

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

                </section>

                {/* ===============================================
            PAYWALL
        =============================================== */}

                <section className="paywall">

                    <div className="paywall-inner">

                        <div className="paywall-copy">

              <span>
                А ЧТО МЕЖДУ СТРОК?
              </span>

                            <h2>
                                Тут начинается
                                самое интересное.
                            </h2>

                            <p>
                                Покажем, где вы
                                можете не понимать
                                друг друга — и что
                                с этим делать.
                            </p>

                        </div>

                        <div className="paywall-box">

                            <div>
                <span>
                  ✦
                </span>

                                что одному
                                не хватает
                            </div>

                            <div>
                <span>
                  ✦
                </span>

                                как каждый
                                чувствует заботу
                            </div>

                            <div>
                <span>
                  ✦
                </span>

                                ваши слепые
                                зоны
                            </div>

                            <div>
                <span>
                  ✦
                </span>

                                вопросы именно
                                для вашей пары
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
                  Открыть разбор
                </span>

                                <strong>
                                    299 ₽
                                </strong>

                                <b>
                                    →
                                </b>

                            </button>

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
   FALLBACK
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

    let score = 0;

    for (
        const comparison
        of comparisons
        ) {
        if (
            comparison.similarity ===
            'same'
        ) {
            score += 1;
        }

        if (
            comparison.similarity ===
            'close'
        ) {
            score += 0.5;
        }
    }

    return Math.round(
        score /
        comparisons.length *
        100
    );
}

/* ============================================================
   COPY
============================================================ */

function getOverallTitle(
    value: number
) {
    if (value >= 85) {
        return 'подозрительно похоже';
    }

    if (value >= 70) {
        return 'очень близко';
    }

    if (value >= 55) {
        return 'много общего';
    }

    if (value >= 40) {
        return 'по-разному, но интересно';
    }

    return 'два разных мира';
}

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
   DIMENSION
============================================================ */

function Dimension({
                       index,
                       label,
                       value,
                   }: {
    index: number;
    label: string;
    value: number;
}) {
    return (
        <div className="dimension">

            <div className="dimension-index">
                0{index}
            </div>

            <div className="dimension-name">
                {label}
            </div>

            <div className="dimension-bar">

                <div
                    style={{
                        width:
                            `${value}%`,
                    }}
                />

            </div>

            <Face
                value={
                    value
                }
            />

            <div className="dimension-value">
                {value}%
            </div>

        </div>
    );
}

/* ============================================================
   FACE
============================================================ */

function Face({
                  value,
                  large = false,
              }: {
    value: number;
    large?: boolean;
}) {
    let mood =
        'sad';

    if (
        value >= 70
    ) {
        mood =
            'happy';
    } else if (
        value >= 45
    ) {
        mood =
            'neutral';
    }

    return (
        <div
            className={
                `face ${mood} ${
                    large
                        ? 'face-large'
                        : ''
                }`
            }
        >

            <span className="eye eye-left" />
            <span className="eye eye-right" />

            <span className="mouth" />

        </div>
    );
}

/* ============================================================
   PIXEL ART
============================================================ */

function PixelCouple({
                         archetypeId,
                     }: {
    archetypeId: string;
}) {
    return (
        <div className="pixel-art">

            <div className="pixel-space">

                <i className="star star-1" />
                <i className="star star-2" />
                <i className="star star-3" />
                <i className="star star-4" />

                <div className="planet">
                    <span />
                </div>

            </div>

            <div className="moon-ground">

                <i />
                <i />
                <i />

            </div>

            <Astronaut
                side="left"
            />

            <div className="pixel-love">
                ♥
            </div>

            <Astronaut
                side="right"
            />

            <div className="pixel-caption">
                {
                    getPixelCaption(
                        archetypeId
                    )
                }
            </div>

        </div>
    );
}

function Astronaut({
                       side,
                   }: {
    side:
        | 'left'
        | 'right';
}) {
    return (
        <div
            className={
                `astronaut ${side}`
            }
        >

            <div className="helmet">
                <span />
            </div>

            <div className="suit">
                <span />
            </div>

            <div className="boot boot-left" />
            <div className="boot boot-right" />

        </div>
    );
}

function getPixelCaption(
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
   CSS
============================================================ */

const styles = `

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;

    background:
      #F7F5F1;

    color:
      #272529;

    font-family:
      Arial,
      Helvetica,
      sans-serif;
  }

  .page {
    width: 100%;

    overflow: hidden;
  }

  /* ==========================================================
     HEADER
  ========================================================== */

  .header {
    width:
      min(
        calc(100% - 48px),
        1120px
      );

    height: 80px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin: auto;
  }

  .brand {
    font-family:
      Georgia,
      serif;

    font-size: 24px;
    font-weight: 700;

    letter-spacing:
      -0.05em;
  }

  .names {
    color:
      #8A8589;

    font-size: 11px;
    font-weight: 800;

    letter-spacing:
      0.1em;

    text-transform:
      uppercase;
  }

  .names span {
    margin:
      0 7px;

    color:
      #B3476D;
  }

  /* ==========================================================
     OVERALL
  ========================================================== */

  .overall {
    width:
      min(
        calc(100% - 48px),
        1120px
      );

    margin: auto;

    padding:
      55px
      0
      80px;
  }

  .section-label {
    color:
      #A29EA0;

    font-size: 10px;
    font-weight: 900;

    letter-spacing:
      0.24em;
  }

  .overall h1 {
    margin:
      5px
      0
      35px;

    font-family:
      Arial,
      sans-serif;

    font-size:
      clamp(
        58px,
        9vw,
        120px
      );

    font-weight: 900;

    line-height: 0.9;

    letter-spacing:
      -0.075em;

    text-transform:
      uppercase;
  }

  .overall-content {
    display: grid;

    grid-template-columns:
      0.8fr
      0.7fr
      1fr;

    align-items: center;

    gap: 50px;

    max-width: 850px;
  }

  .overall-number {
    color:
      #64616A;

    font-size:
      clamp(
        80px,
        9vw,
        125px
      );

    font-weight: 300;

    line-height: 1;
  }

  .overall-number span {
    font-size:
      0.55em;
  }

  .overall-copy strong {
    display: block;

    margin-bottom: 7px;

    font-size: 20px;
  }

  .overall-copy p {
    margin: 0;

    color:
      #979296;

    font-size: 13px;
    line-height: 1.4;
  }

  /* ==========================================================
     FACES
  ========================================================== */

  .face {
    position: relative;

    width: 54px;
    height: 54px;

    flex-shrink: 0;

    border-radius: 50%;

    background:
      #F5C328;
  }

  .face.happy {
    background:
      #93CF2A;
  }

  .face.sad {
    background:
      #F58B26;
  }

  .face-large {
    width: 105px;
    height: 105px;
  }

  .eye {
    position: absolute;

    top: 28%;

    width: 10%;
    height: 15%;

    border-radius: 50%;

    background:
      #171717;
  }

  .eye-left {
    left: 28%;
  }

  .eye-right {
    right: 28%;
  }

  .mouth {
    position: absolute;

    left: 25%;
    bottom: 22%;

    width: 50%;
    height: 25%;
  }

  .neutral
  .mouth {
    bottom: 27%;

    height: 4px;

    background:
      #171717;
  }

  .happy
  .mouth {
    border-bottom:
      4px solid #171717;

    border-radius:
      0 0 100px 100px;
  }

  .sad
  .mouth {
    bottom: 14%;

    border-top:
      4px solid #171717;

    border-radius:
      100px 100px 0 0;
  }

  .face-large
  .happy
  .mouth {
    border-width: 6px;
  }

  /* ==========================================================
     DIMENSIONS
  ========================================================== */

  .dimensions {
    padding:
      70px
      max(
        24px,
        calc(
          (
            100vw - 1120px
          ) / 2
        )
      );

    background:
      #FFFFFF;
  }

  .dimensions-heading {
    display: flex;
    align-items: center;

    gap: 12px;

    margin-bottom: 30px;

    color:
      #706B70;

    font-family:
      Georgia,
      serif;

    font-size: 20px;
  }

  .dimensions-heading b {
    color:
      #B3476D;
  }

  .dimension-list {
    border-top:
      1px solid
      #E5E1DF;
  }

  .dimension {
    min-height: 86px;

    display: grid;

    grid-template-columns:
      45px
      minmax(
        170px,
        0.8fr
      )
      minmax(
        160px,
        1.3fr
      )
      60px
      65px;

    align-items: center;

    gap: 24px;

    border-bottom:
      1px solid
      #E5E1DF;
  }

  .dimension-index {
    color:
      #C2BCBF;

    font-size: 10px;
    font-weight: 900;
  }

  .dimension-name {
    font-size: 17px;
    font-weight: 700;
  }

  .dimension-bar {
    height: 6px;

    overflow: hidden;

    background:
      #EEEAE7;
  }

  .dimension-bar div {
    height: 100%;

    background:
      #B3476D;
  }

  .dimension-value {
    color:
      #68636A;

    font-size: 24px;
    font-weight: 300;

    text-align: right;
  }

  /* ==========================================================
     TYPE
  ========================================================== */

  .type-section {
    width:
      min(
        calc(100% - 48px),
        1120px
      );

    margin: auto;

    padding:
      85px
      0;
  }

  .type-heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    margin-bottom: 30px;
  }

  .type-heading h2 {
    margin:
      7px
      0
      0;

    font-family:
      Georgia,
      serif;

    font-size:
      clamp(
        45px,
        6vw,
        72px
      );

    font-weight: 500;

    line-height: 1;
  }

  .type-number {
    color:
      #B3476D;

    font-family:
      Georgia,
      serif;

    font-size: 38px;
  }

  .type-card {
    display: grid;

    grid-template-columns:
      1.25fr
      0.75fr;

    border:
      1px solid
      #DAD4D1;

    background:
      #FFFFFF;
  }

  .type-art {
    padding: 25px;

    background:
      #E9E1E5;
  }

  .type-copy {
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding:
      45px;
  }

  .type-small {
    margin-bottom: 13px;

    color:
      #B3476D;

    font-size: 9px;
    font-weight: 900;

    letter-spacing:
      0.18em;
  }

  .type-copy h3 {
    margin: 0;

    font-family:
      Georgia,
      serif;

    font-size:
      clamp(
        40px,
        5vw,
        60px
      );

    font-weight: 500;

    line-height: 0.95;

    letter-spacing:
      -0.05em;
  }

  .type-copy p {
    max-width: 330px;

    margin:
      22px
      0
      0;

    color:
      #777075;

    font-size: 15px;
    line-height: 1.55;
  }

  /* ==========================================================
     PIXEL
  ========================================================== */

  .pixel-art {
    position: relative;

    min-height: 410px;

    overflow: hidden;

    border:
      4px solid
      #29252D;

    background:
      #3A3546;

    image-rendering:
      pixelated;
  }

  .pixel-space {
    position: absolute;

    inset: 0;

    background:
      linear-gradient(
        180deg,
        #373342,
        #51465D
      );
  }

  .star {
    position: absolute;

    width: 6px;
    height: 6px;

    background:
      #F5C68D;

    box-shadow:
      6px 0 #F5C68D,
      -6px 0 #F5C68D,
      0 6px #F5C68D,
      0 -6px #F5C68D;
  }

  .star-1 {
    top: 15%;
    left: 12%;
  }

  .star-2 {
    top: 25%;
    left: 45%;

    transform:
      scale(.6);
  }

  .star-3 {
    top: 17%;
    right: 13%;

    transform:
      scale(.7);
  }

  .star-4 {
    top: 42%;
    right: 7%;

    transform:
      scale(.5);
  }

  .planet {
    position: absolute;

    top: 13%;
    right: 18%;

    width: 72px;
    height: 72px;

    border:
      4px solid
      #29252D;

    border-radius: 50%;

    background:
      #9485AF;
  }

  .planet span {
    position: absolute;

    top: 28px;
    left: -15px;

    width: 95px;
    height: 15px;

    border:
      4px solid
      #E0AE70;

    border-radius: 50%;

    transform:
      rotate(-14deg);
  }

  .moon-ground {
    position: absolute;

    left: 7%;
    right: 7%;
    bottom: -15%;

    height: 48%;

    border:
      4px solid
      #29252D;

    border-radius:
      50% 50% 0 0;

    background:
      #857590;
  }

  .moon-ground i {
    position: absolute;

    width: 50px;
    height: 30px;

    border:
      4px solid
      #51485C;

    border-radius: 50%;

    background:
      #665A70;
  }

  .moon-ground i:first-child {
    top: 20%;
    left: 15%;
  }

  .moon-ground i:nth-child(2) {
    top: 45%;
    left: 45%;
  }

  .moon-ground i:nth-child(3) {
    top: 18%;
    right: 16%;
  }

  .astronaut {
    position: absolute;

    z-index: 4;

    bottom: 22%;

    width: 120px;
    height: 180px;
  }

  .astronaut.left {
    left: 24%;

    transform:
      rotate(3deg);
  }

  .astronaut.right {
    right: 23%;

    transform:
      rotate(-3deg);
  }

  .helmet {
    position: absolute;

    z-index: 4;

    top: 0;
    left: 50%;

    width: 82px;
    height: 78px;

    transform:
      translateX(-50%);

    border:
      4px solid
      #29252D;

    border-radius: 50%;

    background:
      #F3E9E1;
  }

  .helmet span {
    position: absolute;

    top: 15px;
    left: 15px;

    width: 45px;
    height: 38px;

    border:
      4px solid
      #29252D;

    border-radius: 50%;

    background:
      #595166;
  }

  .suit {
    position: absolute;

    top: 67px;
    left: 50%;

    width: 86px;
    height: 86px;

    transform:
      translateX(-50%);

    border:
      4px solid
      #29252D;

    border-radius:
      15px 15px 25px 25px;

    background:
      #F3E9E1;
  }

  .suit span {
    position: absolute;

    top: 22px;
    left: 25px;

    width: 30px;
    height: 21px;

    border:
      3px solid
      #29252D;

    background:
      #C96382;
  }

  .boot {
    position: absolute;

    bottom: 0;

    width: 38px;
    height: 55px;

    border:
      4px solid
      #29252D;

    border-radius:
      10px 10px 17px 17px;

    background:
      #F3E9E1;
  }

  .boot-left {
    left: 19px;

    transform:
      rotate(7deg);
  }

  .boot-right {
    right: 19px;

    transform:
      rotate(-7deg);
  }

  .pixel-love {
    position: absolute;

    z-index: 7;

    top: 40%;
    left: 50%;

    color:
      #D9567F;

    font-size: 32px;

    transform:
      translateX(-50%);
  }

  .pixel-caption {
    position: absolute;

    z-index: 10;

    right: 15px;
    bottom: 15px;

    padding:
      8px 11px;

    border:
      2px solid
      #29252D;

    background:
      #F7F5F1;

    font-size: 9px;
    font-weight: 900;
  }

  /* ==========================================================
     PAYWALL
  ========================================================== */

  .paywall {
    padding:
      75px
      24px;

    background:
      #29252D;

    color:
      #FFFFFF;
  }

  .paywall-inner {
    width:
      min(
        100%,
        1040px
      );

    display: grid;

    grid-template-columns:
      1fr
      0.9fr;

    align-items: center;

    gap: 80px;

    margin: auto;
  }

  .paywall-copy > span {
    color:
      #D9819E;

    font-size: 9px;
    font-weight: 900;

    letter-spacing:
      0.2em;
  }

  .paywall-copy h2 {
    margin:
      12px
      0
      15px;

    font-family:
      Georgia,
      serif;

    font-size:
      clamp(
        40px,
        5vw,
        58px
      );

    font-weight: 500;

    line-height: 1;

    letter-spacing:
      -0.04em;
  }

  .paywall-copy p {
    max-width: 430px;

    margin: 0;

    color:
      #BBB2B8;

    font-size: 14px;
    line-height: 1.5;
  }

  .paywall-box {
    display: grid;

    grid-template-columns:
      1fr 1fr;

    gap:
      16px
      20px;
  }

  .paywall-box > div {
    display: flex;

    gap: 8px;

    color:
      #D4CCD1;

    font-size: 11px;
    line-height: 1.35;
  }

  .paywall-box > div span {
    color:
      #D9819E;
  }

  .paywall-box button {
    grid-column:
      1 / -1;

    width: 100%;

    display: grid;

    grid-template-columns:
      1fr
      auto
      auto;

    align-items: center;

    gap: 15px;

    margin-top: 10px;

    padding:
      17px
      18px;

    border:
      1px solid
      #E489A6;

    background:
      #B3476D;

    color:
      #FFFFFF;

    cursor: pointer;

    text-align: left;
  }

  .paywall-box button strong {
    font-size: 15px;
  }

  .paywall-box button b {
    font-size: 20px;
  }

  /* ==========================================================
     STATE
  ========================================================== */

  .state {
    min-height: 100svh;

    display: flex;
    align-items: center;
    justify-content: center;

    background:
      #F7F5F1;

    color:
      #706A6E;
  }

  /* ==========================================================
     MOBILE
  ========================================================== */

  @media (
    max-width: 700px
  ) {

    .header {
      width:
        calc(
          100% - 32px
        );

      height: 65px;
    }

    .brand {
      font-size: 21px;
    }

    .names {
      font-size: 9px;
    }

    .overall {
      width:
        calc(
          100% - 32px
        );

      padding:
        40px
        0
        55px;
    }

    .overall h1 {
      margin-bottom: 30px;

      font-size:
        clamp(
          49px,
          15vw,
          72px
        );

      overflow-wrap:
        anywhere;
    }

    .overall-content {
      grid-template-columns:
        auto
        auto;

      gap:
        20px
        25px;
    }

    .overall-number {
      font-size: 83px;
    }

    .face-large {
      width: 85px;
      height: 85px;
    }

    .overall-copy {
      grid-column:
        1 / -1;
    }

    .dimensions {
      padding:
        45px
        16px;
    }

    .dimension {
      min-height: 92px;

      grid-template-columns:
        28px
        1fr
        50px
        55px;

      gap: 10px;
    }

    .dimension-name {
      font-size: 14px;
    }

    .dimension-bar {
      grid-column:
        2 / -1;

      grid-row: 2;

      width: 100%;

      margin-top: -20px;
    }

    .dimension-value {
      font-size: 19px;
    }

    .type-section {
      width:
        calc(
          100% - 32px
        );

      padding:
        60px
        0;
    }

    .type-heading {
      align-items: flex-start;
    }

    .type-heading h2 {
      font-size: 44px;
    }

    .type-number {
      font-size: 28px;
    }

    .type-card {
      grid-template-columns: 1fr;
    }

    .type-art {
      padding: 12px;
    }

    .pixel-art {
      min-height: 300px;
    }

    .astronaut {
      transform:
        scale(.72);
    }

    .astronaut.left {
      left: 13%;
    }

    .astronaut.right {
      right: 12%;
    }

    .type-copy {
      padding:
        30px
        24px
        34px;
    }

    .type-copy h3 {
      font-size: 45px;
    }

    .paywall {
      padding:
        55px
        16px;
    }

    .paywall-inner {
      grid-template-columns:
        1fr;

      gap: 35px;
    }

    .paywall-copy h2 {
      font-size: 42px;
    }

    .paywall-box {
      grid-template-columns: 1fr;
    }

    .paywall-box button {
      grid-column: auto;
    }

  }

`;