'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useParams, useRouter } from 'next/navigation';

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

export default function ResultPage() {
    const params = useParams<{ coupleId: string }>();
    const router = useRouter();

    const coupleId = params.coupleId;

    const [data, setData] = useState<ResultData | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        async function load() {
            try {
                const response = await fetch(
                    `/api/report?id=${encodeURIComponent(coupleId)}`,
                    {
                        cache: 'no-store',
                    }
                );

                if (!response.ok) {
                    throw new Error('Не удалось загрузить результат');
                }

                const result: ResultData = await response.json();

                if (result.waiting) {
                    router.replace(`/waiting/${coupleId}`);
                    return;
                }

                setData(result);
            } catch (err) {
                console.error(err);
                setError('Не получилось загрузить результат.');
            }
        }

        load();
    }, [coupleId, router]);

    if (error) {
        return (
            <>
                <main className="result-state">
                    <div className="result-state-brand">
                        между нами
                    </div>

                    <h1>
                        что-то пошло
                        <br />
                        не так
                    </h1>

                    <p>{error}</p>
                </main>

                <GlobalStyles />
                <style jsx>{styles}</style>
            </>
        );
    }

    if (!data) {
        return (
            <>
                <main className="result-state">
                    <div className="result-loader">
                        <span />
                        <i>♥</i>
                        <span />
                    </div>

                    <div className="result-state-brand">
                        между нами
                    </div>

                    <p>собираем вас двоих</p>
                </main>

                <GlobalStyles />
                <style jsx>{styles}</style>
            </>
        );
    }

    const comparisons = data.comparisons ?? [];
    const archetype = determineArchetype(comparisons);

    const overall =
        data.scores?.overall ??
        calculateFallback(comparisons);

    const dimensions = data.scores?.dimensions;

    const differentCount =
        data.scores?.differentAnswers ??
        comparisons.filter(
            (item) => item.similarity === 'different'
        ).length;

    const closeCount =
        data.scores?.closeAnswers ??
        comparisons.filter(
            (item) => item.similarity === 'close'
        ).length;

    const nameA = data.couple.partner_a_name;
    const nameB = data.couple.partner_b_name;

    const dimensionItems: DimensionItem[] = [
        {
            kind: 'views',
            eyebrow: 'ВЗГЛЯДЫ',
            title: 'Как вы смотрите на отношения',
            value: dimensions?.views ?? overall,
        },
        {
            kind: 'care',
            eyebrow: 'ЗАБОТА',
            title: 'Как вы проявляете заботу',
            value: dimensions?.care ?? overall,
        },
        {
            kind: 'communication',
            eyebrow: 'ОБЩЕНИЕ',
            title: 'Как вы говорите о важном',
            value: dimensions?.communication ?? overall,
        },
        {
            kind: 'rhythm',
            eyebrow: 'ВРЕМЯ ВМЕСТЕ',
            title: 'Как вам нравится быть вместе',
            value: dimensions?.rhythm ?? overall,
        },
        {
            kind: 'space',
            eyebrow: 'СВОБОДА',
            title: 'Сколько пространства нужно каждому',
            value: dimensions?.space ?? overall,
        },
    ];

    return (
        <>
            <main className="result-page">

                {/* HEADER */}

                <header className="result-header result-shell">
                    <div className="result-brand">
                        между нами
                    </div>

                    <div className="result-names">
                        <span>{nameA}</span>
                        <b>×</b>
                        <span>{nameB}</span>
                    </div>
                </header>

                {/* INTRO */}

                <section className="result-intro result-shell">
                    <div className="result-kicker">
                        ВАШ РЕЗУЛЬТАТ
                    </div>

                    <div className="result-intro-grid">
                        <h1>
                            Вот как
                            <br />
                            вы совпали.
                        </h1>

                        <p>
                            пять сторон ваших отношений —
                            без оценок «хорошо» или «плохо»
                        </p>
                    </div>
                </section>

                {/* DIMENSIONS */}

                <section className="result-dimensions result-shell">
                    {dimensionItems.map((item) => (
                        <DimensionCard
                            key={item.kind}
                            item={item}
                        />
                    ))}
                </section>

                {/* TYPE */}

                <section className="result-type result-shell">
                    <div className="result-type-heading">

                        <div>
              <span className="result-kicker">
                ВАШ ТИП ПАРЫ
              </span>

                            <h2>
                                {getArchetypeDisplayTitle(
                                    archetype.id,
                                    archetype.title
                                )}
                            </h2>
                        </div>

                        <span className="result-type-number">
              №{getTypeNumber(archetype.id)}
            </span>

                    </div>

                    <div className="result-poster">

                        <CoupleArtwork
                            archetypeId={archetype.id}
                        />

                        <div className="result-poster-footer">

              <span>
                ПАРА №{getTypeNumber(archetype.id)}
              </span>

                            <p>
                                {getArchetypeShortCopy(archetype.id)}
                            </p>

                        </div>

                    </div>
                </section>

                {/* PAYWALL */}

                <section className="result-paywall">

                    <div className="result-shell">

                        <div className="result-paywall-label">
              <span>
                ЭТО ТОЛЬКО ПОВЕРХНОСТЬ
              </span>

                            <b>✦</b>
                        </div>

                        <div className="result-paywall-grid">

                            <div className="result-paywall-title">
                                <h2>
                                    А где вы
                                    <br />
                                    можете стать
                                    <br />
                                    ближе?
                                </h2>

                                <p>
                                    Мы сравнили ваши ответы глубже
                                    и нашли то, чего не видно
                                    в процентах.
                                </p>
                            </div>

                            <div className="result-teaser">

                                <div className="result-found">
                                    <span>МЫ НАШЛИ</span>

                                    <strong>
                                        {getFindingCount(
                                            differentCount,
                                            closeCount
                                        )}
                                    </strong>

                                    <p>
                                        {getFindingText(
                                            differentCount,
                                            closeCount
                                        )}
                                    </p>
                                </div>

                                <LockedFinding>
                                    Что партнёр может ждать от вас,
                                    но не говорить
                                </LockedFinding>

                                <LockedFinding>
                                    Где вы по-разному понимаете заботу
                                </LockedFinding>

                                <LockedFinding>
                                    Из-за чего один может чувствовать
                                    себя непонятым
                                </LockedFinding>

                                <LockedFinding>
                                    Что у вашей пары уже работает
                                    особенно хорошо
                                </LockedFinding>

                                <button
                                    className="result-buy"
                                    type="button"
                                    onClick={() =>
                                        router.push(`/report/${coupleId}`)
                                    }
                                >
                  <span>
                    открыть наш разбор
                  </span>

                                    <strong>
                                        299 ₽
                                    </strong>

                                    <b>→</b>
                                </button>

                                <div className="result-footnote">
                                    один разбор · для вас двоих
                                </div>

                            </div>

                        </div>

                    </div>

                </section>

            </main>

            <GlobalStyles />

            <style jsx>{styles}</style>
        </>
    );
}

/* ============================================================
   GLOBAL
============================================================ */

function GlobalStyles() {
    return (
        <style jsx global>{`
      html,
      body {
        margin: 0 !important;
        padding: 0 !important;
        background: #f4efe9 !important;
      }

      body {
        color: #292329;
        font-family:
          "Trebuchet MS",
          "Helvetica Neue",
          Arial,
          sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
    );
}

/* ============================================================
   DIMENSION
============================================================ */

function DimensionCard({
                           item,
                       }: {
    item: DimensionItem;
}) {
    return (
        <article className="result-dimension">

            <div className="result-dimension-icon">
                <DimensionIcon kind={item.kind} />
            </div>

            <div className="result-dimension-body">

                <div className="result-dimension-top">

                    <div>
            <span className="result-dimension-label">
              {item.eyebrow}
            </span>

                        <h3>
                            {item.title}
                        </h3>
                    </div>

                    <strong>
                        {item.value}
                        <sup>%</sup>
                    </strong>

                </div>

                <SegmentBar value={item.value} />

                <p>
                    {getDimensionCopy(
                        item.kind,
                        item.value
                    )}
                </p>

            </div>

        </article>
    );
}

function SegmentBar({
                        value,
                    }: {
    value: number;
}) {
    const active = Math.round(value / 10);

    return (
        <div className="result-segments">
            {Array.from({ length: 10 }).map(
                (_, index) => (
                    <span
                        key={index}
                        className={
                            index < active
                                ? 'active'
                                : ''
                        }
                    />
                )
            )}
        </div>
    );
}

/* ============================================================
   ICONS
============================================================ */

function DimensionIcon({
                           kind,
                       }: {
    kind: DimensionKind;
}) {
    if (kind === 'views') {
        return (
            <div className="result-mini-art result-views-art">
        <span className="result-eye">
          <i />
        </span>

                <span className="result-eye result-eye-second">
          <i />
        </span>
            </div>
        );
    }

    if (kind === 'care') {
        return (
            <div className="result-mini-art result-care-art">
                <span className="result-hand result-hand-left" />
                <i>♥</i>
                <span className="result-hand result-hand-right" />
            </div>
        );
    }

    if (kind === 'communication') {
        return (
            <div className="result-mini-art result-talk-art">
                <span />
                <span />
                <i>··</i>
            </div>
        );
    }

    if (kind === 'rhythm') {
        return (
            <div className="result-mini-art result-rhythm-art">
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
        <div className="result-mini-art result-space-art">
            <span className="result-planet result-planet-one" />
            <span className="result-planet result-planet-two" />
            <i />
        </div>
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
        <div className="result-art">

            <i className="result-spark result-spark-one">
                ✦
            </i>

            <i className="result-spark result-spark-two">
                ✦
            </i>

            <i className="result-spark result-spark-three">
                +
            </i>

            <span className="result-orbit result-orbit-one" />
            <span className="result-orbit result-orbit-two" />

            <div className="result-big-planet">
                <i />
                <i />
                <i />
            </div>

            <div className="result-ground">
                <i />
                <i />
                <i />
            </div>

            <Character side="left" />
            <Character side="right" />

            <div className="result-heart">
                ♥
            </div>

            <div className="result-art-tag">
                {getArtTag(archetypeId)}
            </div>

        </div>
    );
}

function Character({
                       side,
                   }: {
    side: 'left' | 'right';
}) {
    return (
        <div className={`result-character ${side}`}>

            <div className="result-backpack" />

            <div className="result-helmet">
                <div className="result-visor">
                    <i />
                    <i />
                    <span />
                </div>
            </div>

            <div className="result-body">
                <div className="result-panel">
                    <i />
                    <i />
                </div>
            </div>

            <div className="result-arm result-arm-outside" />
            <div className="result-arm result-arm-inside" />

            <div className="result-leg result-leg-one" />
            <div className="result-leg result-leg-two" />

        </div>
    );
}

/* ============================================================
   PAYWALL
============================================================ */

function LockedFinding({
                           children,
                       }: {
    children: ReactNode;
}) {
    return (
        <div className="result-locked">

            <div className="result-lock">
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
   HELPERS
============================================================ */

function calculateFallback(
    comparisons: Comparison[]
) {
    if (!comparisons.length) {
        return 0;
    }

    let points = 0;

    for (const item of comparisons) {
        if (item.similarity === 'same') {
            points += 1;
        }

        if (item.similarity === 'close') {
            points += 0.5;
        }
    }

    return Math.round(
        (points / comparisons.length) * 100
    );
}

function getDimensionCopy(
    kind: DimensionKind,
    value: number
) {
    if (kind === 'views') {
        if (value >= 70) {
            return 'Базовые ожидания от отношений у вас часто совпадают.';
        }

        if (value >= 40) {
            return 'В главном есть пересечения, но некоторые ожидания различаются.';
        }

        return 'Представление о том, как должны работать отношения, у вас заметно различается.';
    }

    if (kind === 'care') {
        if (value >= 70) {
            return 'Вы хорошо угадываете, что для другого означает «я рядом».';
        }

        if (value >= 40) {
            return 'Иногда вы ждёте друг от друга разных проявлений заботы.';
        }

        return 'То, что один считает заботой, второй может почти не замечать.';
    }

    if (kind === 'communication') {
        if (value >= 70) {
            return 'О важном вам обычно хочется разговаривать похожим способом.';
        }

        if (value >= 40) {
            return 'Сложные темы вы можете проживать немного по-разному.';
        }

        return 'В сложный момент одному может хотеться говорить, а другому — совсем другого.';
    }

    if (kind === 'rhythm') {
        if (value >= 70) {
            return 'Ваше представление о хорошем времени вдвоём часто совпадает.';
        }

        if (value >= 40) {
            return 'Часть совместных сценариев подходит обоим, но отдыхаете вы не всегда одинаково.';
        }

        return 'Идеальный совместный вечер у каждого может выглядеть по-своему.';
    }

    if (value >= 70) {
        return 'Вы похоже чувствуете границу между «мы» и временем для себя.';
    }

    if (value >= 40) {
        return 'Одному иногда нужно чуть больше близости или свободы, чем другому.';
    }

    return 'Потребность быть рядом и потребность побыть отдельно у вас заметно различаются.';
}

function getTypeNumber(id: string) {
    const map: Record<string, string> = {
        knight_princess: '01',
        wizards: '02',
        pirates: '03',
        astronauts: '04',
        sun_moon: '05',
        dragon_keeper: '06',
        players: '07',
        homekeepers: '08',
    };

    return map[id] ?? '00';
}

function getArchetypeDisplayTitle(
    id: string,
    fallback: string
) {
    const map: Record<string, string> = {
        knight_princess: 'Рыцарь × Принцесса',
        wizards: 'Волшебник × Волшебник',
        pirates: 'Пират × Пират',
        astronauts: 'Космонавт × Космонавт',
        sun_moon: 'Солнце × Луна',
        dragon_keeper: 'Дракон × Хранитель',
        players: 'Игрок × Игрок',
        homekeepers: 'Дом × Дом',
    };

    return map[id] ?? fallback;
}

function getArchetypeShortCopy(id: string) {
    const map: Record<string, string> = {
        knight_princess:
            'Заботитесь по-разному, но своих не бросаете.',

        wizards:
            'Замечаете больше, чем успеваете сказать вслух.',

        pirates:
            'Маршрут меняется. Команда остаётся.',

        astronauts:
            'Две орбиты. Один маршрут.',

        sun_moon:
            'Чувствуете по-разному — дополняете друг друга.',

        dragon_keeper:
            'Один добавляет огня. Другой держит курс.',

        players:
            'Разный стиль игры. Одна команда.',

        homekeepers:
            'Своё место. Свой человек.',
    };

    return map[id] ?? 'Два человека. Одна история.';
}

function getArtTag(id: string) {
    const map: Record<string, string> = {
        knight_princess: 'своих не бросаем',
        wizards: 'понимаем между строк',
        pirates: 'одна команда',
        astronauts: 'две орбиты · один маршрут',
        sun_moon: 'разные стороны одного неба',
        dragon_keeper: 'огонь + спокойствие',
        players: 'играем вместе',
        homekeepers: 'своё место',
    };

    return map[id] ?? 'между вами';
}

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
        return different === 1
            ? 'место, где ваши ответы особенно расходятся'
            : 'места, где ваши ответы особенно расходятся';
    }

    if (close > 0) {
        return 'неочевидных различия в ваших ответах';
    }

    return 'важные детали, которых не видно на поверхности';
}

/* ============================================================
   STYLES
============================================================ */

const styles = `

.result-page {
  display: block !important;
  width: 100% !important;
  min-height: 100vh !important;
  margin: 0 !important;
  padding: 0 !important;
  background: #F4EFE9;
  overflow: hidden;
}

.result-shell {
  display: block;
  width: min(calc(100% - 36px), 760px);
  margin-left: auto;
  margin-right: auto;
}

/* HEADER */

.result-header {
  position: relative !important;
  inset: auto !important;

  width: min(calc(100% - 36px), 760px) !important;

  height: 58px !important;
  min-height: 58px !important;
  max-height: 58px !important;

  margin: 0 auto !important;
  padding: 0 !important;

  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: space-between !important;

  border-bottom: 1px solid #D8D0CD;

  background: transparent !important;

  transform: none !important;
}

.result-brand {
  margin: 0 !important;
  padding: 0 !important;

  font-family: Georgia, "Times New Roman", serif;
  font-size: 22px;
  font-style: italic;
  font-weight: 700;
  line-height: 1;

  letter-spacing: -0.055em;
}

.result-names {
  display: flex;
  align-items: center;
  gap: 8px;

  margin: 0;
  padding: 0;

  color: #857A80;

  font-size: 8px;
  font-weight: 900;
  line-height: 1;

  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.result-names b {
  color: #B43D69;
}

/* INTRO */

.result-intro {
  padding: 28px 0 18px;
}

.result-kicker {
  color: #B43D69;

  font-size: 8px;
  font-weight: 900;

  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.result-intro-grid {
  display: grid;

  grid-template-columns: 1fr 180px;

  align-items: end;

  gap: 28px;

  margin-top: 8px;
}

.result-intro h1 {
  margin: 0;
  padding: 0;

  font-family: Georgia, "Times New Roman", serif;

  font-size: clamp(43px, 7vw, 61px);

  font-style: italic;
  font-weight: 400;

  line-height: 0.89;

  letter-spacing: -0.065em;
}

.result-intro p {
  margin: 0 0 3px;
  padding: 0;

  color: #8D8388;

  font-family: Georgia, serif;

  font-size: 10px;
  font-style: italic;

  line-height: 1.4;
}

/* DIMENSIONS */

.result-dimensions {
  padding: 0 0 26px;
}

.result-dimension {
  display: grid;

  grid-template-columns: 67px 1fr;

  gap: 17px;

  margin: 0;
  padding: 15px 0;

  border-top: 1px solid #D8D0CD;
}

.result-dimension:last-child {
  border-bottom: 1px solid #D8D0CD;
}

.result-dimension-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.result-dimension-body {
  min-width: 0;
}

.result-dimension-top {
  display: grid;

  grid-template-columns: 1fr auto;

  align-items: end;

  gap: 18px;
}

.result-dimension-label {
  display: block;

  margin-bottom: 3px;

  color: #A4999E;

  font-size: 6px;
  font-weight: 900;

  letter-spacing: 0.19em;
}

.result-dimension-top h3 {
  margin: 0;
  padding: 0;

  font-family: Georgia, serif;

  font-size: 19px;
  font-style: italic;
  font-weight: 400;

  line-height: 1;

  letter-spacing: -0.025em;
}

.result-dimension-top strong {
  color: #B43D69;

  font-family: Georgia, serif;

  font-size: 30px;
  font-style: italic;
  font-weight: 400;

  line-height: 0.8;
}

.result-dimension-top sup {
  font-size: 0.48em;
}

.result-segments {
  display: grid;

  grid-template-columns: repeat(10, 1fr);

  gap: 4px;

  margin-top: 10px;
}

.result-segments span {
  height: 5px;

  border-radius: 30px;

  background: #DED7D4;
}

.result-segments span.active {
  background: #B43D69;
}

.result-dimension-body > p {
  margin: 7px 0 0;

  color: #776D72;

  font-size: 10px;
  line-height: 1.35;
}

/* MINI ART */

.result-mini-art {
  position: relative;

  width: 58px;
  height: 45px;

  transform: scale(0.84);
}

.result-views-art {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 4px;
}

.result-eye {
  position: relative;

  width: 30px;
  height: 19px;

  border: 2px solid #332D33;

  border-radius: 70% 30% 70% 30%;
}

.result-eye-second {
  border-radius: 30% 70% 30% 70%;
}

.result-eye i {
  position: absolute;

  top: 50%;
  left: 50%;

  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: #B43D69;

  transform: translate(-50%, -50%);
}

.result-care-art > i {
  position: absolute;

  top: 2px;
  left: 50%;

  color: #B43D69;

  font-family: Georgia, serif;
  font-size: 24px;
  font-style: normal;

  transform: translateX(-50%);
}

.result-hand {
  position: absolute;

  bottom: 4px;

  width: 35px;
  height: 18px;

  border-bottom: 2px solid #332D33;
}

.result-hand-left {
  left: -3px;

  border-radius: 0 0 100% 0;

  transform: rotate(10deg);
}

.result-hand-right {
  right: -3px;

  border-radius: 0 0 0 100%;

  transform: rotate(-10deg);
}

.result-talk-art span {
  position: absolute;

  width: 36px;
  height: 24px;

  border: 2px solid #332D33;

  border-radius: 50%;
}

.result-talk-art span:first-child {
  top: 0;
  left: 0;
}

.result-talk-art span:nth-child(2) {
  right: 0;
  bottom: 0;

  border-color: #B43D69;
}

.result-talk-art i {
  position: absolute;

  top: 10px;
  left: 18px;

  color: #332D33;

  font-family: Georgia, serif;
  font-size: 13px;
  font-style: normal;
}

.result-rhythm-art {
  display: flex;
  align-items: center;
}

.result-rhythm-art svg {
  width: 60px;
}

.result-planet {
  position: absolute;

  top: 50%;

  width: 28px;
  height: 28px;

  border: 2px solid #332D33;

  border-radius: 50%;

  transform: translateY(-50%);
}

.result-planet-one {
  left: 0;
  background: #E5AF49;
}

.result-planet-two {
  right: 0;
  background: #927DA1;
}

.result-space-art > i {
  position: absolute;

  top: 50%;
  left: 50%;

  width: 6px;
  height: 6px;

  border-radius: 50%;

  background: #B43D69;

  transform: translate(-50%, -50%);
}

/* TYPE */

.result-type {
  padding: 0 0 32px;
}

.result-type-heading {
  display: flex;

  align-items: flex-end;
  justify-content: space-between;

  gap: 20px;

  margin: 0 0 12px;
}

.result-type-heading h2 {
  margin: 5px 0 0;
  padding: 0;

  font-family: Georgia, serif;

  font-size: clamp(33px, 5vw, 45px);

  font-style: italic;
  font-weight: 400;

  line-height: 0.95;

  letter-spacing: -0.055em;
}

.result-type-number {
  flex-shrink: 0;

  color: #B43D69;

  font-family: Georgia, serif;

  font-size: 24px;
  font-style: italic;
}

.result-poster {
  overflow: hidden;

  border: 1px solid #312B31;

  background: #F8F2EC;

  box-shadow: 6px 6px 0 #DACBD0;
}

.result-poster-footer {
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 24px;

  padding: 12px 17px;
}

.result-poster-footer span {
  flex-shrink: 0;

  color: #B43D69;

  font-size: 7px;
  font-weight: 900;

  letter-spacing: 0.16em;
}

.result-poster-footer p {
  margin: 0;

  color: #6F666B;

  font-family: Georgia, serif;

  font-size: 11px;
  font-style: italic;

  line-height: 1.3;

  text-align: right;
}

/* ART */

.result-art {
  position: relative;

  height: 290px;

  overflow: hidden;

  background: #393440;
}

.result-spark {
  position: absolute;

  z-index: 2;

  color: #E5AF49;

  font-style: normal;
}

.result-spark-one {
  top: 12%;
  left: 13%;

  font-size: 23px;
}

.result-spark-two {
  top: 21%;
  right: 12%;

  color: #C36C8B;

  font-size: 17px;
}

.result-spark-three {
  top: 40%;
  left: 7%;

  color: #907C9E;

  font-size: 18px;
}

.result-orbit {
  position: absolute;

  left: 50%;

  border: 1px solid rgba(241,225,211,0.24);

  border-radius: 50%;
}

.result-orbit-one {
  top: 67px;

  width: 490px;
  height: 125px;

  transform: translateX(-50%) rotate(-13deg);
}

.result-orbit-two {
  top: 79px;

  width: 430px;
  height: 145px;

  transform: translateX(-50%) rotate(17deg);
}

.result-big-planet {
  position: absolute;

  top: 29px;
  left: 50%;

  width: 135px;
  height: 135px;

  border: 4px solid #29242C;

  border-radius: 50%;

  background: #C2B0CF;

  box-shadow: 7px 7px 0 rgba(28,24,31,0.22);

  transform: translateX(-50%);
}

.result-big-planet i {
  position: absolute;

  border: 3px solid rgba(70,57,75,0.28);

  border-radius: 50%;
}

.result-big-planet i:first-child {
  top: 24px;
  left: 21px;

  width: 33px;
  height: 18px;
}

.result-big-planet i:nth-child(2) {
  top: 65px;
  right: 18px;

  width: 23px;
  height: 30px;
}

.result-big-planet i:nth-child(3) {
  bottom: 19px;
  left: 51px;

  width: 22px;
  height: 15px;
}

.result-ground {
  position: absolute;

  left: -9%;
  right: -9%;
  bottom: -139px;

  height: 240px;

  border: 4px solid #29242C;

  border-radius: 50% 50% 0 0;

  background: #81718C;
}

.result-ground i {
  position: absolute;

  border: 3px solid #554A5E;

  border-radius: 50%;

  background: #695C73;
}

.result-ground i:first-child {
  top: 28px;
  left: 17%;

  width: 55px;
  height: 30px;
}

.result-ground i:nth-child(2) {
  top: 65px;
  left: 47%;

  width: 80px;
  height: 35px;
}

.result-ground i:nth-child(3) {
  top: 27px;
  right: 16%;

  width: 45px;
  height: 25px;
}

/* CHARACTERS */

.result-character {
  position: absolute;

  z-index: 5;

  bottom: 25px;

  width: 135px;
  height: 205px;

  transform-origin: bottom center;
}

.result-character.left {
  left: calc(50% - 142px);

  transform: scale(0.82) rotate(2deg);
}

.result-character.right {
  right: calc(50% - 142px);

  transform: scale(0.82) rotate(-2deg);
}

.result-backpack {
  position: absolute;

  top: 75px;
  left: 4px;

  width: 48px;
  height: 84px;

  border: 4px solid #29242C;

  border-radius: 17px;

  background: #B45B7A;
}

.result-helmet {
  position: absolute;

  z-index: 6;

  top: 0;
  left: 50%;

  width: 94px;
  height: 90px;

  border: 4px solid #29242C;

  border-radius: 47%;

  background: #F0E7DD;

  transform: translateX(-50%);
}

.result-visor {
  position: absolute;

  top: 17px;
  left: 14px;

  width: 59px;
  height: 47px;

  border: 4px solid #29242C;

  border-radius: 45%;

  background: #665B70;
}

.result-visor i {
  position: absolute;

  top: 17px;

  width: 5px;
  height: 5px;

  border-radius: 50%;

  background: #F2D4A5;
}

.result-visor i:first-child {
  left: 16px;
}

.result-visor i:nth-child(2) {
  right: 16px;
}

.result-visor span {
  position: absolute;

  left: 50%;
  bottom: 8px;

  width: 18px;
  height: 7px;

  border-bottom: 2px solid #F2D4A5;

  border-radius: 0 0 50% 50%;

  transform: translateX(-50%);
}

.result-body {
  position: absolute;

  z-index: 5;

  top: 76px;
  left: 50%;

  width: 88px;
  height: 88px;

  border: 4px solid #29242C;

  border-radius: 14px 14px 27px 27px;

  background: #F0E7DD;

  transform: translateX(-50%);
}

.result-panel {
  position: absolute;

  top: 25px;
  left: 50%;

  width: 38px;
  height: 26px;

  border: 3px solid #29242C;

  background: #C35078;

  transform: translateX(-50%);
}

.result-panel i {
  position: absolute;

  top: 7px;

  width: 6px;
  height: 6px;
}

.result-panel i:first-child {
  left: 7px;
  background: #E5AF49;
}

.result-panel i:last-child {
  right: 7px;
  background: #7E6C91;
}

.result-arm {
  position: absolute;

  z-index: 4;

  top: 97px;

  width: 61px;
  height: 25px;

  border: 4px solid #29242C;

  border-radius: 14px;

  background: #F0E7DD;
}

.result-character.left .result-arm-outside {
  left: -20px;
  transform: rotate(27deg);
}

.result-character.left .result-arm-inside {
  right: -34px;
  width: 76px;
  transform: rotate(-11deg);
}

.result-character.right .result-arm-outside {
  right: -20px;
  transform: rotate(-27deg);
}

.result-character.right .result-arm-inside {
  left: -34px;
  width: 76px;
  transform: rotate(11deg);
}

.result-leg {
  position: absolute;

  z-index: 3;

  bottom: 0;

  width: 39px;
  height: 64px;

  border: 4px solid #29242C;

  border-radius: 10px 10px 18px 18px;

  background: #F0E7DD;
}

.result-leg-one {
  left: 25px;
  transform: rotate(5deg);
}

.result-leg-two {
  right: 25px;
  transform: rotate(-5deg);
}

.result-heart {
  position: absolute;

  z-index: 10;

  top: 141px;
  left: 50%;

  color: #D04F78;

  font-family: Georgia, serif;

  font-size: 27px;

  transform: translateX(-50%);
}

.result-art-tag {
  position: absolute;

  z-index: 15;

  right: 12px;
  bottom: 10px;

  padding: 6px 9px;

  border: 1px solid #302A30;

  background: #F6EEE7;

  font-family: Georgia, serif;

  font-size: 9px;
  font-style: italic;

  transform: rotate(-2deg);
}

/* PAYWALL */

.result-paywall {
  margin: 0 !important;

  padding: 31px 0 35px !important;

  background: #2E2931;

  color: #F8F1EB;
}

.result-paywall-label {
  display: flex;

  align-items: center;
  justify-content: space-between;

  padding-bottom: 10px;

  border-bottom: 1px solid rgba(255,255,255,0.15);

  color: #DD829F;

  font-size: 7px;
  font-weight: 900;

  letter-spacing: 0.21em;
}

.result-paywall-label b {
  color: #E8B54D;

  font-size: 17px;
  font-weight: 400;
}

.result-paywall-grid {
  display: grid;

  grid-template-columns: 0.82fr 1.18fr;

  gap: 35px;

  padding-top: 22px;
}

.result-paywall-title h2 {
  margin: 0;

  font-family: Georgia, serif;

  font-size: clamp(39px, 6vw, 54px);

  font-style: italic;
  font-weight: 400;

  line-height: 0.88;

  letter-spacing: -0.06em;
}

.result-paywall-title p {
  max-width: 220px;

  margin: 13px 0 0;

  color: #ADA2A8;

  font-size: 9px;
  line-height: 1.45;
}

.result-found {
  display: grid;

  grid-template-columns: auto 1fr;

  grid-template-areas:
    "label label"
    "number copy";

  align-items: end;

  column-gap: 15px;

  margin-bottom: 6px;

  padding: 11px 14px;

  border: 1px solid #D37A99;

  background: #3B323D;
}

.result-found > span {
  grid-area: label;

  color: #D9829F;

  font-size: 6px;
  font-weight: 900;

  letter-spacing: 0.18em;
}

.result-found strong {
  grid-area: number;

  color: #F4C05C;

  font-family: Georgia, serif;

  font-size: 46px;
  font-style: italic;
  font-weight: 400;

  line-height: 0.9;
}

.result-found p {
  grid-area: copy;

  margin: 0 0 3px;

  color: #E7DDE2;

  font-family: Georgia, serif;

  font-size: 12px;
  font-style: italic;

  line-height: 1.2;
}

.result-locked {
  display: grid;

  grid-template-columns: 24px 1fr auto;

  align-items: center;

  gap: 9px;

  padding: 8px 0;

  border-bottom: 1px solid rgba(255,255,255,0.11);
}

.result-lock {
  width: 19px;
  height: 19px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #D47A99;

  border-radius: 50%;

  color: #D47A99;

  font-size: 9px;

  transform: rotate(45deg);
}

.result-locked span {
  color: #7F747D;

  font-size: 5px;
  font-weight: 900;

  letter-spacing: 0.12em;
}

.result-locked p {
  margin: 2px 0 0;

  color: #F0E7EC;

  font-family: Georgia, serif;

  font-size: 11px;
  font-style: italic;

  line-height: 1.2;
}

.result-locked > b {
  color: #776C75;

  font-size: 6px;
  font-weight: 700;

  text-transform: uppercase;
}

.result-buy {
  width: 100%;

  display: grid;

  grid-template-columns: 1fr auto auto;

  align-items: center;

  gap: 12px;

  margin: 13px 0 0;

  padding: 14px 15px;

  border: 1px solid #F0B1C7;

  background: #B43D69;

  color: #FFFFFF;

  cursor: pointer;

  text-align: left;
}

.result-buy span {
  font-family: Georgia, serif;

  font-size: 13px;
  font-style: italic;
}

.result-buy strong {
  white-space: nowrap;

  font-size: 13px;
}

.result-buy b {
  font-size: 18px;
}

.result-footnote {
  margin-top: 6px;

  color: #776D75;

  font-size: 6px;

  text-align: center;

  letter-spacing: 0.08em;
}

/* STATES */

.result-state {
  width: 100%;
  min-height: 100svh;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  margin: 0;
  padding: 30px;

  background: #F4EFE9;

  text-align: center;
}

.result-state-brand {
  font-family: Georgia, serif;

  font-size: 24px;
  font-style: italic;
  font-weight: 700;
}

.result-state h1 {
  margin: 25px 0 10px;

  font-family: Georgia, serif;

  font-size: 43px;
  font-style: italic;
  font-weight: 400;

  line-height: 0.95;
}

.result-state p {
  color: #8D8288;

  font-family: Georgia, serif;

  font-size: 11px;
  font-style: italic;
}

.result-loader {
  display: flex;

  align-items: center;

  margin-bottom: 25px;
}

.result-loader span {
  width: 48px;
  height: 48px;

  border: 2px solid #302A30;

  border-radius: 50%;
}

.result-loader span:last-child {
  margin-left: -12px;
}

.result-loader i {
  position: relative;

  z-index: 2;

  margin: 0 -7px;

  color: #B43D69;

  font-family: Georgia, serif;

  font-style: normal;
}

/* MOBILE */

@media (max-width: 650px) {

  .result-shell {
    width: calc(100% - 26px);
  }

  .result-header {
    width: calc(100% - 26px) !important;

    height: 52px !important;
    min-height: 52px !important;
    max-height: 52px !important;
  }

  .result-brand {
    font-size: 19px;
  }

  .result-names {
    max-width: 150px;

    overflow: hidden;

    font-size: 7px;

    white-space: nowrap;
  }

  .result-intro {
    padding: 22px 0 14px;
  }

  .result-intro-grid {
    grid-template-columns: 1fr;

    gap: 7px;

    margin-top: 7px;
  }

  .result-intro h1 {
    font-size: clamp(42px, 13vw, 55px);
  }

  .result-intro p {
    max-width: 260px;
  }

  .result-dimensions {
    padding-bottom: 20px;
  }

  .result-dimension {
    grid-template-columns: 48px 1fr;

    gap: 9px;

    padding: 13px 0;
  }

  .result-dimension-icon {
    justify-content: flex-start;
  }

  .result-mini-art {
    transform: scale(0.68);
    transform-origin: left center;
  }

  .result-dimension-top {
    gap: 8px;
  }

  .result-dimension-top h3 {
    max-width: 205px;

    font-size: 17px;
  }

  .result-dimension-top strong {
    font-size: 26px;
  }

  .result-segments {
    gap: 3px;

    margin-top: 8px;
  }

  .result-segments span {
    height: 4px;
  }

  .result-dimension-body > p {
    margin-top: 5px;

    font-size: 9px;
  }

  .result-type {
    padding-bottom: 25px;
  }

  .result-type-heading {
    margin-bottom: 9px;
  }

  .result-type-heading h2 {
    font-size: 33px;
  }

  .result-type-number {
    font-size: 20px;
  }

  .result-art {
    height: 235px;
  }

  .result-big-planet {
    top: 23px;

    width: 108px;
    height: 108px;
  }

  .result-character {
    bottom: 13px;
  }

  .result-character.left {
    left: calc(50% - 110px);

    transform: scale(0.68) rotate(2deg);
  }

  .result-character.right {
    right: calc(50% - 110px);

    transform: scale(0.68) rotate(-2deg);
  }

  .result-heart {
    top: 116px;

    font-size: 23px;
  }

  .result-art-tag {
    right: 7px;
    bottom: 7px;

    font-size: 7px;
  }

  .result-poster-footer {
    gap: 10px;

    padding: 10px 12px;
  }

  .result-poster-footer p {
    font-size: 9px;
  }

  .result-paywall {
    padding: 25px 0 28px !important;
  }

  .result-paywall-grid {
    grid-template-columns: 1fr;

    gap: 17px;

    padding-top: 17px;
  }

  .result-paywall-title h2 {
    font-size: 42px;
  }

  .result-paywall-title p {
    margin-top: 9px;
  }

  .result-found strong {
    font-size: 41px;
  }

  .result-locked {
    grid-template-columns: 22px 1fr;

    padding: 8px 0;
  }

  .result-locked > b {
    display: none;
  }

  .result-buy {
    margin-top: 11px;

    padding: 13px;
  }

}

`;