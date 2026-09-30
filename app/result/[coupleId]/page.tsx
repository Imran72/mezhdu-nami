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

type DimensionItem = {
    kind: DimensionKind;
    eyebrow: string;
    title: string;
    value: number;
};

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
                        что-то пошло
                        <br />
                        не так
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

                    <div className="loading-symbol">

                        <span />

                        <i>
                            ♥
                        </i>

                        <span />

                    </div>

                    <div className="state-brand">
                        между нами
                    </div>

                    <p>
                        собираем вас двоих
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

    const differentCount =
        data.scores
            ?.differentAnswers ??
        comparisons.filter(
            (item) =>
                item.similarity ===
                'different'
        ).length;

    const closeCount =
        data.scores
            ?.closeAnswers ??
        comparisons.filter(
            (item) =>
                item.similarity ===
                'close'
        ).length;

    const nameA =
        data.couple.partner_a_name;

    const nameB =
        data.couple.partner_b_name;

    const dimensionItems:
        DimensionItem[] = [
        {
            kind: 'views',

            eyebrow:
                'ВЗГЛЯДЫ',

            title:
                'Как вы смотрите на отношения',

            value:
                dimensions?.views ??
                overall,
        },

        {
            kind: 'care',

            eyebrow:
                'ЗАБОТА',

            title:
                'Как вы проявляете заботу',

            value:
                dimensions?.care ??
                overall,
        },

        {
            kind:
                'communication',

            eyebrow:
                'ОБЩЕНИЕ',

            title:
                'Как вы говорите о важном',

            value:
                dimensions
                    ?.communication ??
                overall,
        },

        {
            kind: 'rhythm',

            eyebrow:
                'ВРЕМЯ ВМЕСТЕ',

            title:
                'Как вам нравится быть вместе',

            value:
                dimensions?.rhythm ??
                overall,
        },

        {
            kind: 'space',

            eyebrow:
                'СВОБОДА',

            title:
                'Сколько пространства нужно каждому',

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

                <header className="header shell">

                    <div className="brand">
                        между нами
                    </div>

                    <div className="header-couple">

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

                </header>

                {/* =====================================================
            INTRO
        ===================================================== */}

                <section className="intro shell">

                    <div className="kicker">
                        ВАШ РЕЗУЛЬТАТ
                    </div>

                    <div className="intro-grid">

                        <h1>
                            А вот где
                            <br />
                            вы совпадаете.
                        </h1>

                        <div className="intro-note">

              <span>
                не оценка отношений
              </span>

                            <p>
                                просто пять вещей,
                                в которых особенно
                                интересно сравнить
                                ваши ответы
                            </p>

                        </div>

                    </div>

                </section>

                {/* =====================================================
            DIMENSIONS
        ===================================================== */}

                <section className="dimensions shell">

                    {
                        dimensionItems.map(
                            (item) => (
                                <DimensionCard
                                    key={
                                        item.kind
                                    }
                                    item={
                                        item
                                    }
                                />
                            )
                        )
                    }

                </section>

                {/* =====================================================
            BRIDGE
        ===================================================== */}

                <div className="bridge shell">

          <span>
            но проценты —
            только половина истории
          </span>

                    <b>
                        ↓
                    </b>

                </div>

                {/* =====================================================
            ARCHETYPE
        ===================================================== */}

                <section className="type-section shell">

                    <div className="type-heading">

                        <div className="kicker">
                            ВАШ ТИП ПАРЫ
                        </div>

                        <span>
              №
                            {
                                getTypeNumber(
                                    archetype.id
                                )
                            }
            </span>

                    </div>

                    <div className="poster">

                        <CoupleArtwork
                            archetypeId={
                                archetype.id
                            }
                        />

                        <div className="poster-info">

                            <div className="poster-type">

                                ПАРА №
                                {
                                    getTypeNumber(
                                        archetype.id
                                    )
                                }

                            </div>

                            <h2>
                                {
                                    getArchetypeDisplayTitle(
                                        archetype.id,
                                        archetype.title
                                    )
                                }
                            </h2>

                            <p>
                                {
                                    getArchetypeShortCopy(
                                        archetype.id
                                    )
                                }
                            </p>

                        </div>

                    </div>

                </section>

                {/* =====================================================
            PAYWALL
        ===================================================== */}

                <section className="paywall">

                    <div className="paywall-inner shell">

                        <div className="paywall-kicker">

              <span>
                ЭТО ТОЛЬКО ПОВЕРХНОСТЬ
              </span>

                            <b>
                                ✦
                            </b>

                        </div>

                        <div className="paywall-grid">

                            <div className="paywall-title">

                                <h2>
                                    А где вы
                                    <br />
                                    можете стать
                                    <br />
                                    ближе?
                                </h2>

                                <p>
                                    В ваших ответах есть
                                    вещи, которые простой
                                    процент не показывает.
                                </p>

                            </div>

                            <div className="teaser">

                                <div className="teaser-alert">

                  <span>
                    МЫ НАШЛИ
                  </span>

                                    <strong>
                                        {
                                            getFindingCount(
                                                differentCount,
                                                closeCount
                                            )
                                        }
                                    </strong>

                                    <p>
                                        {
                                            getFindingText(
                                                differentCount,
                                                closeCount
                                            )
                                        }
                                    </p>

                                </div>

                                <LockedFinding>
                                    Что партнёр может
                                    ждать от вас,
                                    но не говорить
                                </LockedFinding>

                                <LockedFinding>
                                    Где вы по-разному
                                    понимаете заботу
                                </LockedFinding>

                                <LockedFinding>
                                    Из-за чего один
                                    может чувствовать
                                    себя непонятым
                                </LockedFinding>

                                <LockedFinding>
                                    Что у вашей пары
                                    уже работает
                                    особенно хорошо
                                </LockedFinding>

                                <button
                                    type="button"
                                    onClick={() =>
                                        router.push(
                                            `/report/${coupleId}`
                                        )
                                    }
                                >

                  <span>
                    {
                        getButtonText(
                            differentCount,
                            closeCount
                        )
                    }
                  </span>

                                    <strong>
                                        299 ₽
                                    </strong>

                                    <b>
                                        →
                                    </b>

                                </button>

                                <div className="paywall-footnote">
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
   DIMENSION CARD
============================================================ */

function DimensionCard({
                           item,
                       }: {
    item: DimensionItem;
}) {
    return (
        <article className="dimension-card">

            <div className="dimension-icon-wrap">

                <DimensionIcon
                    kind={
                        item.kind
                    }
                />

            </div>

            <div className="dimension-content">

                <div className="dimension-top">

                    <div>

            <span className="dimension-eyebrow">
              {item.eyebrow}
            </span>

                        <h3>
                            {item.title}
                        </h3>

                    </div>

                    <strong>
                        {item.value}
                        <sup>
                            %
                        </sup>
                    </strong>

                </div>

                <SegmentBar
                    value={
                        item.value
                    }
                />

                <p>
                    {
                        getDimensionCopy(
                            item.kind,
                            item.value
                        )
                    }
                </p>

            </div>

        </article>
    );
}

/* ============================================================
   HUMAN COPY
============================================================ */

function getDimensionCopy(
    kind: DimensionKind,
    value: number
) {
    if (
        kind === 'views'
    ) {
        if (value >= 70) {
            return 'На отношения вы смотрите довольно похоже — базовые ожидания часто совпадают.';
        }

        if (value >= 40) {
            return 'В главном есть пересечения, но некоторые ожидания от отношений у вас разные.';
        }

        return 'Похоже, представление о том, как должны работать отношения, у вас заметно различается.';
    }

    if (
        kind === 'care'
    ) {
        if (value >= 70) {
            return 'Вы довольно хорошо угадываете, что для другого означает «я рядом».';
        }

        if (value >= 40) {
            return 'Заботу вы иногда понимаете одинаково, а иногда ждёте совсем разных вещей.';
        }

        return 'То, что один считает заботой, второй может просто не считать чем-то особенным.';
    }

    if (
        kind ===
        'communication'
    ) {
        if (value >= 70) {
            return 'Когда что-то важно, вам обычно хочется разговаривать об этом похожим способом.';
        }

        if (value >= 40) {
            return 'В обычном разговоре всё ок, но сложные темы вы можете проживать по-разному.';
        }

        return 'Когда становится сложно, одному может хотеться говорить, а другому — совсем другого.';
    }

    if (
        kind === 'rhythm'
    ) {
        if (value >= 70) {
            return 'Ваше представление о хорошем времени вдвоём часто совпадает.';
        }

        if (value >= 40) {
            return 'Часть совместных сценариев вам подходит обоим, но отдыхаете вы не всегда одинаково.';
        }

        return 'Идеальный совместный вечер у каждого из вас может выглядеть совсем по-своему.';
    }

    if (value >= 70) {
        return 'Вы примерно одинаково чувствуете границу между «мы» и временем для себя.';
    }

    if (value >= 40) {
        return 'Одному иногда нужно чуть больше близости или свободы, чем другому.';
    }

    return 'Потребность быть рядом и потребность побыть отдельно у вас могут сильно различаться.';
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
        <div className="segments">

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
            <div className="mini-art views-art">

        <span className="eye-shape eye-one">
          <i />
        </span>

                <span className="eye-shape eye-two">
          <i />
        </span>

            </div>
        );
    }

    if (
        kind === 'care'
    ) {
        return (
            <div className="mini-art care-art">

                <span className="hand hand-one" />

                <i>
                    ♥
                </i>

                <span className="hand hand-two" />

            </div>
        );
    }

    if (
        kind ===
        'communication'
    ) {
        return (
            <div className="mini-art talk-art">

                <span />

                <span />

                <i>
                    · ·
                </i>

            </div>
        );
    }

    if (
        kind === 'rhythm'
    ) {
        return (
            <div className="mini-art rhythm-art">

                <svg
                    viewBox="0 0 90 60"
                    aria-hidden="true"
                >
                    <path
                        d="M5 35 C16 5 27 5 38 35 C49 65 60 65 71 35 C78 16 83 13 87 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                        strokeLinecap="round"
                    />

                    <circle
                        cx="5"
                        cy="35"
                        r="4"
                        fill="#B43D69"
                    />

                    <circle
                        cx="87"
                        cy="24"
                        r="4"
                        fill="#E4AE49"
                    />
                </svg>

            </div>
        );
    }

    return (
        <div className="mini-art space-art">

            <span className="planet-one" />

            <span className="planet-two" />

            <i />

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

function getArchetypeDisplayTitle(
    id: string,
    fallback: string
) {
    const map:
        Record<string, string> = {
        knight_princess:
            'Рыцарь × Принцесса',

        wizards:
            'Волшебник × Волшебник',

        pirates:
            'Пират × Пират',

        astronauts:
            'Космонавт × Космонавт',

        sun_moon:
            'Солнце × Луна',

        dragon_keeper:
            'Дракон × Хранитель',

        players:
            'Игрок × Игрок',

        homekeepers:
            'Дом × Дом',
    };

    return (
        map[id] ??
        fallback
    );
}

function getArchetypeShortCopy(
    id: string
) {
    const map:
        Record<string, string> = {
        knight_princess:
            'Заботитесь по-разному, но своих не бросаете.',

        wizards:
            'Ваша сильная сторона — замечать больше, чем сказано вслух.',

        pirates:
            'Маршрут может меняться. Главное, что команда остаётся той же.',

        astronauts:
            'У каждого своя орбита, но возвращаетесь вы примерно в одно место.',

        sun_moon:
            'Часто чувствуете ситуацию по-разному — и именно это дополняет пару.',

        dragon_keeper:
            'Один добавляет огня, другой помогает не потерять направление.',

        players:
            'У каждого свой стиль игры, но выигрывать приятнее вместе.',

        homekeepers:
            'Для вас особенно важно ощущение своего места и своего человека.',
    };

    return (
        map[id] ??
        'Два разных человека, которые каким-то образом оказались в одной истории.'
    );
}

/* ============================================================
   ARTWORK
============================================================ */

function CoupleArtwork({
                           archetypeId,
                       }: {
    archetypeId: string;
}) {
    return (
        <div
            className={
                `couple-art art-${archetypeId}`
            }
        >

            <div className="sky-decoration">

                <i className="spark spark-one">
                    ✦
                </i>

                <i className="spark spark-two">
                    ✦
                </i>

                <i className="spark spark-three">
                    +
                </i>

                <span className="orbit-line orbit-line-one" />

                <span className="orbit-line orbit-line-two" />

            </div>

            <div className="big-planet">

                <i />

                <i />

                <i />

            </div>

            <div className="ground">

                <i className="crater crater-one" />

                <i className="crater crater-two" />

                <i className="crater crater-three" />

            </div>

            <Character
                side="left"
            />

            <Character
                side="right"
            />

            <div className="art-love">
                ♥
            </div>

            <div className="art-tag">
                {
                    getArtTag(
                        archetypeId
                    )
                }
            </div>

        </div>
    );
}

function Character({
                       side,
                   }: {
    side:
        | 'left'
        | 'right';
}) {
    return (
        <div
            className={
                `character ${side}`
            }
        >

            <div className="backpack" />

            <div className="helmet">

                <div className="visor">

                    <i />

                    <i />

                    <span />

                </div>

            </div>

            <div className="body">

                <div className="panel">

                    <i />

                    <i />

                </div>

            </div>

            <div className="arm arm-outside" />

            <div className="arm arm-inside" />

            <div className="leg leg-one" />

            <div className="leg leg-two" />

        </div>
    );
}

function getArtTag(
    id: string
) {
    const map:
        Record<string, string> = {
        knight_princess:
            'своих не бросаем',

        wizards:
            'понимаем между строк',

        pirates:
            'одна команда',

        astronauts:
            'две орбиты · один маршрут',

        sun_moon:
            'разные стороны одного неба',

        dragon_keeper:
            'огонь + спокойствие',

        players:
            'играем вместе',

        homekeepers:
            'своё место',
    };

    return (
        map[id] ??
        'между вами'
    );
}

/* ============================================================
   PAYWALL
============================================================ */

function getFindingCount(
    different: number,
    close: number
) {
    if (different > 0) {
        return different;
    }

    if (close > 0) {
        return close;
    }

    return 3;
}

function getFindingText(
    different: number,
    close: number
) {
    if (different > 0) {
        return pluralizeFinding(
            different
        );
    }

    if (close > 0) {
        return pluralizeNuance(
            close
        );
    }

    return 'важные детали, которые не видно на поверхности';
}

function pluralizeFinding(
    count: number
) {
    const mod10 =
        count % 10;

    const mod100 =
        count % 100;

    if (
        mod10 === 1 &&
        mod100 !== 11
    ) {
        return 'место, где ваши ответы особенно расходятся';
    }

    if (
        mod10 >= 2 &&
        mod10 <= 4 &&
        !(
            mod100 >= 12 &&
            mod100 <= 14
        )
    ) {
        return 'места, где ваши ответы особенно расходятся';
    }

    return 'мест, где ваши ответы особенно расходятся';
}

function pluralizeNuance(
    count: number
) {
    const mod10 =
        count % 10;

    const mod100 =
        count % 100;

    if (
        mod10 === 1 &&
        mod100 !== 11
    ) {
        return 'неочевидное различие между вашими ответами';
    }

    if (
        mod10 >= 2 &&
        mod10 <= 4 &&
        !(
            mod100 >= 12 &&
            mod100 <= 14
        )
    ) {
        return 'неочевидных различия между вашими ответами';
    }

    return 'неочевидных различий между вашими ответами';
}

function getButtonText(
    different: number,
    close: number
) {
    const count =
        getFindingCount(
            different,
            close
        );

    return (
        `показать наши ${count}`
    );
}

function LockedFinding({
                           children,
                       }: {
    children:
        React.ReactNode;
}) {
    return (
        <div className="locked-finding">

            <div className="lock">
                ↗
            </div>

            <div>

        <span>
          НАЙДЕНО В ВАШИХ ОТВЕТАХ
        </span>

                <p>
                    {children}
                </p>

            </div>

            <b>
                закрыто
            </b>

        </div>
    );
}

/* ============================================================
   CSS
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
      #F4EFE9;

    color:
      #292329;

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
  }

  /*
   * Намеренно узкая композиция.
   */

  .shell {
    width:
      min(
        calc(100% - 36px),
        760px
      );

    margin:
      0 auto;
  }

  /* ==========================================================
     HEADER
  ========================================================== */

  .header {
    height: 70px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-bottom:
      1px solid
      #D8D0CD;
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

  .header-couple {
    display: flex;
    align-items: center;

    gap: 8px;

    color:
      #857A80;

    font-size: 9px;
    font-weight: 900;

    letter-spacing:
      0.12em;

    text-transform:
      uppercase;
  }

  .header-couple b {
    color:
      #B43D69;
  }

  /* ==========================================================
     COMMON
  ========================================================== */

  .kicker {
    color:
      #B43D69;

    font-size: 9px;
    font-weight: 900;

    letter-spacing:
      0.22em;

    text-transform:
      uppercase;
  }

  /* ==========================================================
     INTRO
  ========================================================== */

  .intro {
    padding:
      64px
      0
      38px;
  }

  .intro-grid {
    display: grid;

    grid-template-columns:
      1fr
      190px;

    align-items: end;

    gap: 40px;

    margin-top:
      13px;
  }

  .intro h1 {
    margin: 0;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        50px,
        8vw,
        76px
      );

    font-style: italic;
    font-weight: 400;

    line-height: 0.91;

    letter-spacing:
      -0.065em;
  }

  .intro-note {
    padding-bottom:
      5px;
  }

  .intro-note span {
    color:
      #B43D69;

    font-family:
      Georgia,
      serif;

    font-size: 12px;
    font-style: italic;
  }

  .intro-note p {
    margin:
      8px
      0
      0;

    color:
      #8D8388;

    font-size: 10px;
    line-height: 1.45;
  }

  /* ==========================================================
     DIMENSIONS
  ========================================================== */

  .dimensions {
    padding-bottom:
      48px;
  }

  .dimension-card {
    display: grid;

    grid-template-columns:
      86px
      1fr;

    gap: 22px;

    padding:
      26px
      0;

    border-top:
      1px solid
      #D8D0CD;
  }

  .dimension-card:last-child {
    border-bottom:
      1px solid
      #D8D0CD;
  }

  .dimension-icon-wrap {
    display: flex;
    align-items: flex-start;
    justify-content: center;

    padding-top:
      9px;
  }

  .dimension-content {
    min-width: 0;
  }

  .dimension-top {
    display: grid;

    grid-template-columns:
      1fr
      auto;

    align-items: end;

    gap: 20px;
  }

  .dimension-eyebrow {
    display: block;

    margin-bottom:
      5px;

    color:
      #A4999E;

    font-size: 7px;
    font-weight: 900;

    letter-spacing:
      0.19em;
  }

  .dimension-top h3 {
    margin: 0;

    font-family:
      Georgia,
      serif;

    font-size: 22px;
    font-style: italic;
    font-weight: 400;

    line-height: 1.05;

    letter-spacing:
      -0.025em;
  }

  .dimension-top strong {
    color:
      #B43D69;

    font-family:
      Georgia,
      serif;

    font-size: 35px;
    font-style: italic;
    font-weight: 400;

    line-height: 0.8;
  }

  .dimension-top strong sup {
    margin-left:
      2px;

    font-size:
      0.5em;
  }

  .segments {
    display: grid;

    grid-template-columns:
      repeat(
        10,
        1fr
      );

    gap: 4px;

    margin-top:
      15px;
  }

  .segments span {
    height: 6px;

    border-radius:
      20px;

    background:
      #DED7D4;
  }

  .segments span.active {
    background:
      #B43D69;
  }

  .dimension-content > p {
    max-width:
      560px;

    margin:
      11px
      0
      0;

    color:
      #776D72;

    font-size: 11px;
    line-height: 1.45;
  }

  /* ==========================================================
     MINI ART
  ========================================================== */

  .mini-art {
    position: relative;

    width: 70px;
    height: 55px;
  }

  .views-art {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 5px;
  }

  .eye-shape {
    position: relative;

    width: 31px;
    height: 20px;

    border:
      2px solid
      #332D33;

    border-radius:
      70% 30% 70% 30%;
  }

  .eye-two {
    border-radius:
      30% 70% 30% 70%;
  }

  .eye-shape i {
    position: absolute;

    top: 50%;
    left: 50%;

    width: 7px;
    height: 7px;

    border-radius: 50%;

    background:
      #B43D69;

    transform:
      translate(
        -50%,
        -50%
      );
  }

  .care-art i {
    position: absolute;

    top: 8px;
    left: 50%;

    color:
      #B43D69;

    font-family:
      Georgia,
      serif;

    font-size: 25px;
    font-style: normal;

    transform:
      translateX(-50%);
  }

  .hand {
    position: absolute;

    bottom: 8px;

    width: 38px;
    height: 20px;

    border-bottom:
      2px solid
      #332D33;
  }

  .hand-one {
    left: 0;

    border-radius:
      0 0 100% 0;

    transform:
      rotate(10deg);
  }

  .hand-two {
    right: 0;

    border-radius:
      0 0 0 100%;

    transform:
      rotate(-10deg);
  }

  .talk-art span {
    position: absolute;

    width: 40px;
    height: 27px;

    border:
      2px solid
      #332D33;

    border-radius: 50%;
  }

  .talk-art span:first-child {
    top: 2px;
    left: 1px;
  }

  .talk-art span:nth-child(2) {
    right: 1px;
    bottom: 2px;

    border-color:
      #B43D69;
  }

  .talk-art i {
    position: absolute;

    top: 13px;
    left: 22px;

    z-index: 3;

    color:
      #332D33;

    font-family:
      Georgia,
      serif;

    font-size: 14px;
    font-style: normal;
  }

  .rhythm-art {
    display: flex;
    align-items: center;
  }

  .rhythm-art svg {
    width: 70px;
  }

  .space-art
  .planet-one,
  .space-art
  .planet-two {
    position: absolute;

    top: 50%;

    width: 32px;
    height: 32px;

    border:
      2px solid
      #332D33;

    border-radius: 50%;

    transform:
      translateY(-50%);
  }

  .planet-one {
    left: 1px;

    background:
      #E5AF49;
  }

  .planet-two {
    right: 1px;

    background:
      #927DA1;
  }

  .space-art i {
    position: absolute;

    top: 50%;
    left: 50%;

    width: 7px;
    height: 7px;

    border-radius: 50%;

    background:
      #B43D69;

    transform:
      translate(
        -50%,
        -50%
      );
  }

  /* ==========================================================
     BRIDGE
  ========================================================== */

  .bridge {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding:
      0
      0
      68px;

    color:
      #91868B;

    font-family:
      Georgia,
      serif;

    font-size: 12px;
    font-style: italic;
  }

  .bridge b {
    color:
      #B43D69;

    font-size: 22px;
    font-weight: 400;
  }

  /* ==========================================================
     TYPE
  ========================================================== */

  .type-section {
    padding-bottom:
      80px;
  }

  .type-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom:
      15px;
  }

  .type-heading > span {
    color:
      #B43D69;

    font-family:
      Georgia,
      serif;

    font-size: 22px;
    font-style: italic;
  }

  .poster {
    overflow: hidden;

    border:
      1px solid
      #312B31;

    background:
      #F8F2EC;

    box-shadow:
      7px 8px 0
      #DACBD0;
  }

  /* ==========================================================
     ART
  ========================================================== */

  .couple-art {
    position: relative;

    height:
      380px;

    overflow: hidden;

    background:
      #393440;
  }

  .sky-decoration {
    position: absolute;

    inset: 0;
  }

  .spark {
    position: absolute;

    color:
      #E5AF49;

    font-style: normal;
  }

  .spark-one {
    top: 15%;
    left: 13%;

    font-size: 27px;
  }

  .spark-two {
    top: 24%;
    right: 12%;

    color:
      #C36C8B;

    font-size: 19px;
  }

  .spark-three {
    top: 43%;
    left: 7%;

    color:
      #907C9E;

    font-size: 20px;
  }

  .orbit-line {
    position: absolute;

    left: 50%;

    border:
      1px solid
      rgba(
        241,
        225,
        211,
        0.24
      );

    border-radius: 50%;
  }

  .orbit-line-one {
    top: 90px;

    width: 510px;
    height: 155px;

    transform:
      translateX(-50%)
      rotate(-13deg);
  }

  .orbit-line-two {
    top: 105px;

    width: 450px;
    height: 175px;

    transform:
      translateX(-50%)
      rotate(17deg);
  }

  .big-planet {
    position: absolute;

    top: 45px;
    left: 50%;

    width: 165px;
    height: 165px;

    border:
      4px solid
      #29242C;

    border-radius: 50%;

    background:
      #C2B0CF;

    box-shadow:
      8px 8px 0
      rgba(
        28,
        24,
        31,
        0.22
      );

    transform:
      translateX(-50%);
  }

  .big-planet i {
    position: absolute;

    border:
      3px solid
      rgba(
        70,
        57,
        75,
        0.28
      );

    border-radius: 50%;
  }

  .big-planet i:first-child {
    top: 31px;
    left: 27px;

    width: 39px;
    height: 22px;
  }

  .big-planet i:nth-child(2) {
    top: 82px;
    right: 24px;

    width: 27px;
    height: 35px;
  }

  .big-planet i:nth-child(3) {
    bottom: 25px;
    left: 63px;

    width: 25px;
    height: 17px;
  }

  .ground {
    position: absolute;

    left: -9%;
    right: -9%;
    bottom: -120px;

    height: 255px;

    border:
      4px solid
      #29242C;

    border-radius:
      50% 50% 0 0;

    background:
      #81718C;
  }

  .crater {
    position: absolute;

    border:
      3px solid
      #554A5E;

    border-radius: 50%;

    background:
      #695C73;
  }

  .crater-one {
    top: 42px;
    left: 17%;

    width: 60px;
    height: 34px;
  }

  .crater-two {
    top: 84px;
    left: 47%;

    width: 88px;
    height: 40px;
  }

  .crater-three {
    top: 38px;
    right: 16%;

    width: 48px;
    height: 27px;
  }

  /* ==========================================================
     CHARACTERS
  ========================================================== */

  .character {
    position: absolute;

    z-index: 5;

    bottom: 47px;

    width: 135px;
    height: 205px;
  }

  .character.left {
    left:
      calc(
        50% - 154px
      );

    transform:
      rotate(2deg);
  }

  .character.right {
    right:
      calc(
        50% - 154px
      );

    transform:
      rotate(-2deg);
  }

  .backpack {
    position: absolute;

    top: 75px;
    left: 4px;

    width: 48px;
    height: 84px;

    border:
      4px solid
      #29242C;

    border-radius:
      17px;

    background:
      #B45B7A;
  }

  .helmet {
    position: absolute;

    z-index: 6;

    top: 0;
    left: 50%;

    width: 94px;
    height: 90px;

    border:
      4px solid
      #29242C;

    border-radius: 47%;

    background:
      #F0E7DD;

    transform:
      translateX(-50%);
  }

  .visor {
    position: absolute;

    top: 17px;
    left: 14px;

    width: 59px;
    height: 47px;

    border:
      4px solid
      #29242C;

    border-radius: 45%;

    background:
      #665B70;
  }

  .visor i {
    position: absolute;

    top: 17px;

    width: 5px;
    height: 5px;

    border-radius: 50%;

    background:
      #F2D4A5;
  }

  .visor i:first-child {
    left: 16px;
  }

  .visor i:nth-child(2) {
    right: 16px;
  }

  .visor span {
    position: absolute;

    left: 50%;
    bottom: 8px;

    width: 18px;
    height: 7px;

    border-bottom:
      2px solid
      #F2D4A5;

    border-radius:
      0 0 50% 50%;

    transform:
      translateX(-50%);
  }

  .body {
    position: absolute;

    z-index: 5;

    top: 76px;
    left: 50%;

    width: 88px;
    height: 88px;

    border:
      4px solid
      #29242C;

    border-radius:
      14px 14px 27px 27px;

    background:
      #F0E7DD;

    transform:
      translateX(-50%);
  }

  .panel {
    position: absolute;

    top: 25px;
    left: 50%;

    width: 38px;
    height: 26px;

    border:
      3px solid
      #29242C;

    background:
      #C35078;

    transform:
      translateX(-50%);
  }

  .panel i {
    position: absolute;

    top: 7px;

    width: 6px;
    height: 6px;
  }

  .panel i:first-child {
    left: 7px;

    background:
      #E5AF49;
  }

  .panel i:last-child {
    right: 7px;

    background:
      #7E6C91;
  }

  .arm {
    position: absolute;

    z-index: 4;

    top: 97px;

    width: 61px;
    height: 25px;

    border:
      4px solid
      #29242C;

    border-radius: 14px;

    background:
      #F0E7DD;
  }

  .character.left
  .arm-outside {
    left: -20px;

    transform:
      rotate(27deg);
  }

  .character.left
  .arm-inside {
    right: -34px;

    width: 76px;

    transform:
      rotate(-11deg);
  }

  .character.right
  .arm-outside {
    right: -20px;

    transform:
      rotate(-27deg);
  }

  .character.right
  .arm-inside {
    left: -34px;

    width: 76px;

    transform:
      rotate(11deg);
  }

  .leg {
    position: absolute;

    z-index: 3;

    bottom: 0;

    width: 39px;
    height: 64px;

    border:
      4px solid
      #29242C;

    border-radius:
      10px 10px 18px 18px;

    background:
      #F0E7DD;
  }

  .leg-one {
    left: 25px;

    transform:
      rotate(5deg);
  }

  .leg-two {
    right: 25px;

    transform:
      rotate(-5deg);
  }

  .art-love {
    position: absolute;

    z-index: 10;

    top: 185px;
    left: 50%;

    color:
      #D04F78;

    font-family:
      Georgia,
      serif;

    font-size: 32px;

    transform:
      translateX(-50%);
  }

  .art-tag {
    position: absolute;

    z-index: 15;

    right: 16px;
    bottom: 14px;

    padding:
      8px
      11px;

    border:
      1px solid
      #302A30;

    background:
      #F6EEE7;

    font-family:
      Georgia,
      serif;

    font-size: 10px;
    font-style: italic;

    transform:
      rotate(-2deg);
  }

  /*
   * Небольшие вариации палитры
   * по типу пары.
   */

  .art-sun_moon
  .big-planet {
    background:
      #C4B1D1;
  }

  .art-pirates
  .big-planet {
    background:
      #D98E5E;
  }

  .art-wizards
  .big-planet {
    background:
      #9983AE;
  }

  .art-dragon_keeper
  .big-planet {
    background:
      #CB6968;
  }

  .art-homekeepers
  .big-planet {
    background:
      #CDA679;
  }

  /* ==========================================================
     POSTER INFO
  ========================================================== */

  .poster-info {
    padding:
      25px
      29px
      29px;
  }

  .poster-type {
    margin-bottom:
      8px;

    color:
      #B43D69;

    font-size: 8px;
    font-weight: 900;

    letter-spacing:
      0.18em;
  }

  .poster-info h2 {
    margin: 0;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        43px,
        7vw,
        62px
      );

    font-style: italic;
    font-weight: 400;

    line-height: 0.95;

    letter-spacing:
      -0.06em;
  }

  .poster-info p {
    max-width:
      500px;

    margin:
      13px
      0
      0;

    color:
      #766C71;

    font-size: 12px;
    line-height: 1.45;
  }

  /* ==========================================================
     PAYWALL
  ========================================================== */

  .paywall {
    padding:
      65px
      0
      72px;

    background:
      #2E2931;

    color:
      #F8F1EB;
  }

  .paywall-kicker {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding-bottom:
      18px;

    border-bottom:
      1px solid
      rgba(
        255,
        255,
        255,
        0.15
      );

    color:
      #DD829F;

    font-size: 8px;
    font-weight: 900;

    letter-spacing:
      0.21em;
  }

  .paywall-kicker b {
    color:
      #E8B54D;

    font-size: 19px;
    font-weight: 400;
  }

  .paywall-grid {
    display: grid;

    grid-template-columns:
      0.8fr
      1.2fr;

    gap: 50px;

    padding-top:
      37px;
  }

  .paywall-title h2 {
    margin: 0;

    font-family:
      Georgia,
      serif;

    font-size:
      clamp(
        44px,
        7vw,
        63px
      );

    font-style: italic;
    font-weight: 400;

    line-height: 0.89;

    letter-spacing:
      -0.06em;
  }

  .paywall-title > p {
    max-width:
      230px;

    margin:
      20px
      0
      0;

    color:
      #ADA2A8;

    font-size: 10px;
    line-height: 1.5;
  }

  /* ==========================================================
     TEASER
  ========================================================== */

  .teaser-alert {
    position: relative;

    margin-bottom:
      15px;

    padding:
      18px
      20px;

    border:
      1px solid
      #D37A99;

    background:
      #3B323D;
  }

  .teaser-alert > span {
    display: block;

    color:
      #D9829F;

    font-size: 7px;
    font-weight: 900;

    letter-spacing:
      0.18em;
  }

  .teaser-alert strong {
    display: block;

    margin-top:
      4px;

    color:
      #F4C05C;

    font-family:
      Georgia,
      serif;

    font-size: 56px;
    font-style: italic;
    font-weight: 400;

    line-height: 0.95;
  }

  .teaser-alert p {
    max-width:
      300px;

    margin:
      4px
      0
      0;

    color:
      #E7DDE2;

    font-family:
      Georgia,
      serif;

    font-size: 14px;
    font-style: italic;

    line-height: 1.3;
  }

  .locked-finding {
    display: grid;

    grid-template-columns:
      27px
      1fr
      auto;

    align-items: center;

    gap: 10px;

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

  .lock {
    width: 22px;
    height: 22px;

    display: flex;
    align-items: center;
    justify-content: center;

    border:
      1px solid
      #D47A99;

    border-radius: 50%;

    color:
      #D47A99;

    font-size: 10px;

    transform:
      rotate(45deg);
  }

  .locked-finding span {
    color:
      #7F747D;

    font-size: 6px;
    font-weight: 900;

    letter-spacing:
      0.12em;
  }

  .locked-finding p {
    margin:
      3px
      0
      0;

    color:
      #F0E7EC;

    font-family:
      Georgia,
      serif;

    font-size: 13px;
    font-style: italic;

    line-height: 1.25;
  }

  .locked-finding > b {
    color:
      #776C75;

    font-size: 7px;
    font-weight: 700;

    text-transform:
      uppercase;
  }

  /* ==========================================================
     CTA
  ========================================================== */

  .teaser button {
    width: 100%;

    display: grid;

    grid-template-columns:
      1fr
      auto
      auto;

    align-items: center;

    gap: 13px;

    margin-top:
      22px;

    padding:
      17px
      18px;

    border:
      1px solid
      #F0B1C7;

    background:
      #B43D69;

    color:
      #FFFFFF;

    cursor: pointer;

    text-align: left;

    transition:
      transform
      160ms ease,
      background
      160ms ease;
  }

  .teaser button:hover {
    background:
      #C84977;

    transform:
      translateY(-2px);
  }

  .teaser button span {
    font-family:
      Georgia,
      serif;

    font-size: 14px;
    font-style: italic;
  }

  .teaser button strong {
    white-space: nowrap;

    font-size: 14px;
  }

  .teaser button b {
    font-size: 19px;
  }

  .paywall-footnote {
    margin-top:
      9px;

    color:
      #776D75;

    font-size: 7px;

    text-align: center;

    letter-spacing:
      0.08em;
  }

  /* ==========================================================
     STATES
  ========================================================== */

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
      #F4EFE9;

    text-align: center;
  }

  .state-brand {
    font-family:
      Georgia,
      serif;

    font-size: 24px;
    font-style: italic;
    font-weight: 700;
  }

  .loading-page p,
  .state-page p {
    color:
      #8D8288;

    font-family:
      Georgia,
      serif;

    font-size: 11px;
    font-style: italic;
  }

  .state-page h1 {
    margin:
      25px
      0
      10px;

    font-family:
      Georgia,
      serif;

    font-size: 43px;
    font-style: italic;
    font-weight: 400;

    line-height: 0.95;
  }

  .loading-symbol {
    display: flex;
    align-items: center;

    margin-bottom:
      25px;
  }

  .loading-symbol span {
    width: 48px;
    height: 48px;

    border:
      2px solid
      #302A30;

    border-radius: 50%;
  }

  .loading-symbol span:last-child {
    margin-left:
      -12px;
  }

  .loading-symbol i {
    position: relative;

    z-index: 2;

    margin:
      0 -7px;

    color:
      #B43D69;

    font-family:
      Georgia,
      serif;

    font-style: normal;
  }

  /* ==========================================================
     MOBILE
  ========================================================== */

  @media (
    max-width: 650px
  ) {

    .shell {
      width:
        calc(
          100% - 28px
        );
    }

    .header {
      height: 61px;
    }

    .brand {
      font-size: 20px;
    }

    .header-couple {
      max-width:
        150px;

      overflow: hidden;

      font-size: 7px;

      text-overflow:
        ellipsis;

      white-space: nowrap;
    }

    .intro {
      padding:
        46px
        0
        28px;
    }

    .intro-grid {
      grid-template-columns:
        1fr;

      gap: 17px;
    }

    .intro h1 {
      font-size:
        clamp(
          47px,
          14vw,
          61px
        );
    }

    .intro-note {
      max-width:
        250px;
    }

    .dimension-card {
      grid-template-columns:
        60px
        1fr;

      gap: 12px;

      padding:
        23px
        0;
    }

    .dimension-icon-wrap {
      justify-content:
        flex-start;

      padding-top:
        14px;
    }

    .mini-art {
      width: 55px;

      transform:
        scale(0.82);

      transform-origin:
        left center;
    }

    .dimension-top h3 {
      max-width:
        210px;

      font-size: 18px;
    }

    .dimension-top strong {
      font-size: 29px;
    }

    .dimension-content > p {
      font-size: 10px;
    }

    .segments {
      gap: 3px;
    }

    .segments span {
      height: 5px;
    }

    .bridge {
      padding-bottom:
        48px;
    }

    .type-section {
      padding-bottom:
        60px;
    }

    .couple-art {
      height: 310px;
    }

    .big-planet {
      width: 125px;
      height: 125px;
    }

    .character {
      bottom: 34px;

      transform-origin:
        bottom center;
    }

    .character.left {
      left:
        calc(
          50% - 124px
        );

      transform:
        scale(0.78)
        rotate(2deg);
    }

    .character.right {
      right:
        calc(
          50% - 124px
        );

      transform:
        scale(0.78)
        rotate(-2deg);
    }

    .art-love {
      top: 150px;
    }

    .art-tag {
      right: 9px;
      bottom: 9px;

      font-size: 8px;
    }

    .poster-info {
      padding:
        22px
        21px
        25px;
    }

    .poster-info h2 {
      font-size:
        43px;
    }

    .paywall {
      padding:
        50px
        0
        57px;
    }

    .paywall-grid {
      grid-template-columns:
        1fr;

      gap: 30px;

      padding-top:
        28px;
    }

    .paywall-title h2 {
      font-size:
        48px;
    }

    .paywall-title > p {
      margin-top:
        15px;
    }

    .teaser-alert strong {
      font-size: 49px;
    }

    .locked-finding {
      grid-template-columns:
        25px
        1fr;
    }

    .locked-finding > b {
      display: none;
    }

    .teaser button {
      padding:
        16px
        15px;
    }

    .teaser button span {
      font-size: 13px;
    }

  }

`;