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
    title: string;
    subtitle: string;
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
                    { cache: 'no-store' }
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
                    <div className="state-brand">между нами.</div>
                    <h1>что-то пошло не так</h1>
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
                    <div className="state-mark">
                        <span />
                        <span />
                    </div>

                    <div className="state-brand">между нами.</div>
                    <p>собираем результат</p>
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

    const sameCount =
        data.scores?.sameAnswers ??
        comparisons.filter(
            (item) => item.similarity === 'same'
        ).length;

    const nameA = data.couple.partner_a_name;
    const nameB = data.couple.partner_b_name;

    const dimensionItems: DimensionItem[] = [
        {
            kind: 'views',
            title: 'Взгляды',
            subtitle: 'Как вы представляете отношения',
            value: dimensions?.views ?? overall,
        },
        {
            kind: 'care',
            title: 'Забота',
            subtitle: 'Что для каждого значит «я рядом»',
            value: dimensions?.care ?? overall,
        },
        {
            kind: 'communication',
            title: 'Общение',
            subtitle: 'Что происходит, когда надо поговорить',
            value: dimensions?.communication ?? overall,
        },
        {
            kind: 'rhythm',
            title: 'Время вместе',
            subtitle: 'Как выглядит хороший день вдвоём',
            value: dimensions?.rhythm ?? overall,
        },
        {
            kind: 'space',
            title: 'Свобода',
            subtitle: 'Сколько своего пространства нужно каждому',
            value: dimensions?.space ?? overall,
        },
    ];

    const findingCount = getFindingCount(
        differentCount,
        closeCount
    );

    return (
        <>
            <main className="result-page">

                {/* HEADER */}

                <header className="result-header result-shell">
                    <div className="result-brand">
                        между нами.
                    </div>

                    <div className="result-names">
                        {nameA}
                        <b>×</b>
                        {nameB}
                    </div>
                </header>

                {/* HERO */}

                <section className="result-hero result-shell">
                    <div className="result-index">
                        РЕЗУЛЬТАТ / 01
                    </div>

                    <div className="result-hero-grid">
                        <h1>
                            ВОТ КАК
                            <br />
                            ВЫ СОВПАЛИ
                        </h1>

                        <div className="result-score">
                            <span>ОБЩАЯ</span>

                            <strong>
                                {overall}
                                <sup>%</sup>
                            </strong>

                            <p>
                                не оценка отношений.
                                <br />
                                просто насколько похожи
                                <br />
                                ваши ответы.
                            </p>
                        </div>
                    </div>

                    <div className="result-quick">
                        <div>
                            <strong>{sameCount}</strong>
                            <span>ответов совпали</span>
                        </div>

                        <div>
                            <strong>{closeCount}</strong>
                            <span>оказались близкими</span>
                        </div>

                        <div>
                            <strong>{differentCount}</strong>
                            <span>заметно разошлись</span>
                        </div>
                    </div>
                </section>

                {/* DIMENSIONS */}

                <section className="result-breakdown result-shell">

                    <div className="section-head">
                        <span>РАЗБИРАЕМ ПО ЧАСТЯМ</span>
                        <b>02</b>
                    </div>

                    <div className="dimension-list">
                        {dimensionItems.map((item, index) => (
                            <DimensionRow
                                key={item.kind}
                                item={item}
                                index={index + 1}
                            />
                        ))}
                    </div>

                </section>

                {/* TYPE */}

                <section className="result-type result-shell">

                    <div className="section-head">
                        <span>ТИП ВАШЕЙ ПАРЫ</span>
                        <b>03</b>
                    </div>

                    <div className="type-title-row">
                        <div>
              <span>
                ПАРА №{getTypeNumber(archetype.id)}
              </span>

                            <h2>
                                {getArchetypeDisplayTitle(
                                    archetype.id,
                                    archetype.title
                                )}
                            </h2>
                        </div>

                        <p>
                            {getArchetypeShortCopy(archetype.id)}
                        </p>
                    </div>

                    <div className="type-poster">
                        <CoupleArtwork archetypeId={archetype.id} />

                        <div className="poster-strip">
              <span>
                МЕЖДУ НАМИ / TYPE {getTypeNumber(archetype.id)}
              </span>

                            <strong>
                                {getArtTag(archetype.id)}
                            </strong>
                        </div>
                    </div>

                </section>

                {/* PAYWALL */}

                <section className="result-paywall">
                    <div className="result-shell">

                        <div className="paywall-top">
                            <span>ДАЛЬШЕ — ИНТЕРЕСНЕЕ</span>
                            <b>04</b>
                        </div>

                        <div className="paywall-grid">

                            <div className="paywall-left">
                                <div className="paywall-sticker">
                                    НАЙДЕНО
                                    <strong>{findingCount}</strong>
                                </div>

                                <h2>
                                    В ПРОЦЕНТАХ
                                    <br />
                                    НЕ ВСЁ.
                                </h2>

                                <p>
                                    В ваших ответах есть вещи,
                                    которые легко пропустить —
                                    но именно они часто решают,
                                    насколько вы понимаете друг друга.
                                </p>
                            </div>

                            <div className="paywall-right">

                                <div className="paywall-hook">
                  <span>
                    В ВАШИХ ОТВЕТАХ
                  </span>

                                    <strong>
                                        {getPaywallHook(
                                            differentCount,
                                            closeCount
                                        )}
                                    </strong>
                                </div>

                                <LockedFinding number="01">
                                    Что один из вас ждёт от другого,
                                    но может не говорить прямо
                                </LockedFinding>

                                <LockedFinding number="02">
                                    Где заботу одного второй
                                    может просто не замечать
                                </LockedFinding>

                                <LockedFinding number="03">
                                    Из-за чего вы можете спорить
                                    вообще о разных вещах
                                </LockedFinding>

                                <LockedFinding number="04">
                                    Что уже делает вашу пару
                                    сильнее — и как это использовать
                                </LockedFinding>

                                <button
                                    type="button"
                                    className="result-buy"
                                    onClick={() =>
                                        router.push(`/report/${coupleId}`)
                                    }
                                >
                  <span>
                    ПОКАЗАТЬ, ЧТО МЕЖДУ ВАМИ
                  </span>

                                    <strong>
                                        299 ₽
                                    </strong>

                                    <b>→</b>
                                </button>

                                <div className="buy-note">
                                    один разбор · открывается для вас двоих
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
        background: #f2eee8 !important;
      }

      body {
        color: #211f20;
        font-family:
          Arial,
          Helvetica,
          "Helvetica Neue",
          sans-serif;
      }

      * {
        box-sizing: border-box;
      }

      button,
      input {
        font: inherit;
      }
    `}</style>
    );
}

/* ============================================================
   DIMENSION
============================================================ */

function DimensionRow({
                          item,
                          index,
                      }: {
    item: DimensionItem;
    index: number;
}) {
    return (
        <article className="dimension-row">

      <span className="dimension-number">
        {String(index).padStart(2, '0')}
      </span>

            <DimensionMark kind={item.kind} />

            <div className="dimension-content">

                <div className="dimension-main">
                    <div>
                        <h3>{item.title}</h3>
                        <p>{item.subtitle}</p>
                    </div>

                    <strong className="dimension-value">
                        {item.value}
                        <sup>%</sup>
                    </strong>
                </div>

                <SegmentBar value={item.value} />

                <div className="dimension-comment">
                    {getDimensionCopy(
                        item.kind,
                        item.value
                    )}
                </div>

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
        <div className="segments">
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

function DimensionMark({
                           kind,
                       }: {
    kind: DimensionKind;
}) {
    if (kind === 'views') {
        return (
            <div className="dimension-mark mark-views">
                <span />
                <span />
            </div>
        );
    }

    if (kind === 'care') {
        return (
            <div className="dimension-mark mark-care">
                <b>+</b>
            </div>
        );
    }

    if (kind === 'communication') {
        return (
            <div className="dimension-mark mark-talk">
                <span />
                <span />
            </div>
        );
    }

    if (kind === 'rhythm') {
        return (
            <div className="dimension-mark mark-rhythm">
                <span>~</span>
            </div>
        );
    }

    return (
        <div className="dimension-mark mark-space">
            <span />
            <span />
        </div>
    );
}

/* ============================================================
   ART
============================================================ */

function CoupleArtwork({
                           archetypeId,
                       }: {
    archetypeId: string;
}) {
    return (
        <div className="art">

            <div className="art-label">
                {getArtTag(archetypeId)}
            </div>

            <span className="star star-a">✦</span>
            <span className="star star-b">+</span>
            <span className="star star-c">✦</span>

            <div className="orbit orbit-a" />
            <div className="orbit orbit-b" />

            <div className="planet">
                <span />
                <span />
                <span />
            </div>

            <div className="ground">
                <span />
                <span />
                <span />
            </div>

            <Astronaut side="left" />
            <Astronaut side="right" />

            <div className="art-heart">♥</div>

        </div>
    );
}

function Astronaut({
                       side,
                   }: {
    side: 'left' | 'right';
}) {
    return (
        <div className={`astronaut ${side}`}>

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

            <div className="arm outside" />
            <div className="arm inside" />

            <div className="leg leg-a" />
            <div className="leg leg-b" />

        </div>
    );
}

/* ============================================================
   LOCKED
============================================================ */

function LockedFinding({
                           number,
                           children,
                       }: {
    number: string;
    children: ReactNode;
}) {
    return (
        <div className="locked-row">

      <span className="locked-number">
        {number}
      </span>

            <p>{children}</p>

            <span className="locked-status">
        ЗАКРЫТО
      </span>

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
            return 'В главном вы примерно об одном.';
        }

        if (value >= 40) {
            return 'Основа похожа, детали — уже нет.';
        }

        return 'От отношений вы можете ждать довольно разных вещей.';
    }

    if (kind === 'care') {
        if (value >= 70) {
            return 'Вы хорошо считываете заботу друг друга.';
        }

        if (value >= 40) {
            return 'Заботитесь оба, но показываете это по-разному.';
        }

        return 'Один может стараться, а второй этого не замечать.';
    }

    if (kind === 'communication') {
        if (value >= 70) {
            return 'Разговаривать о сложном вам обычно удобно похожим способом.';
        }

        if (value >= 40) {
            return 'В сложном разговоре вам иногда нужны разные вещи.';
        }

        return 'Когда становится сложно, ваши реакции заметно расходятся.';
    }

    if (kind === 'rhythm') {
        if (value >= 70) {
            return 'Ваш хороший день вдвоём выглядит довольно похоже.';
        }

        if (value >= 40) {
            return 'Вместе вам хорошо, но сценарии отдыха совпадают не всегда.';
        }

        return 'То, что для одного отдых, для другого может быть вообще не отдыхом.';
    }

    if (value >= 70) {
        return 'Вы похоже чувствуете, когда быть вместе, а когда разойтись по своим делам.';
    }

    if (value >= 40) {
        return 'Иногда одному нужно больше близости, а другому — больше воздуха.';
    }

    return 'Количество нужного личного пространства у вас заметно различается.';
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
        wizards: 'Два волшебника',
        pirates: 'Два пирата',
        astronauts: 'Два космонавта',
        sun_moon: 'Солнце × Луна',
        dragon_keeper: 'Дракон × Хранитель',
        players: 'Два игрока',
        homekeepers: 'Хранители дома',
    };

    return map[id] ?? fallback;
}

function getArchetypeShortCopy(id: string) {
    const map: Record<string, string> = {
        knight_princess:
            'По-разному показываете чувства. Одинаково держитесь за своих.',

        wizards:
            'Многое понимаете без длинных объяснений.',

        pirates:
            'Планы могут меняться. Команда — нет.',

        astronauts:
            'Каждый на своей орбите, но летите в одну сторону.',

        sun_moon:
            'По-разному реагируете на мир — и в этом ваша механика.',

        dragon_keeper:
            'Один добавляет огня. Второй не даёт всему сгореть.',

        players:
            'Разные стратегии. Одна команда.',

        homekeepers:
            'Вам важно своё место и свой человек.',
    };

    return map[id] ?? 'Два человека. Одна история.';
}

function getArtTag(id: string) {
    const map: Record<string, string> = {
        knight_princess: 'СВОИХ НЕ БРОСАЕМ',
        wizards: 'МЕЖДУ СТРОК',
        pirates: 'ОДНА КОМАНДА',
        astronauts: 'ДВЕ ОРБИТЫ / ОДИН МАРШРУТ',
        sun_moon: 'РАЗНЫЕ СТОРОНЫ ОДНОГО НЕБА',
        dragon_keeper: 'ОГОНЬ + СПОКОЙСТВИЕ',
        players: 'CO-OP MODE',
        homekeepers: 'СВОЁ МЕСТО',
    };

    return map[id] ?? 'МЕЖДУ ВАМИ';
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

function getPaywallHook(
    different: number,
    close: number
) {
    if (different >= 4) {
        return `${different} мест, где вы можете понимать друг друга совсем по-разному`;
    }

    if (different > 0) {
        return `${different} места, где ваши ожидания заметно расходятся`;
    }

    if (close > 0) {
        return `${close} ответов, которые выглядят похожими — но означают не одно и то же`;
    }

    return 'несколько вещей, которые не видно по одному проценту';
}

/* ============================================================
   CSS
============================================================ */

const styles = `

.result-page {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  background: #F2EEE8;
  overflow: hidden;
}

.result-shell {
  width: min(calc(100% - 36px), 760px);
  margin: 0 auto;
}

/* HEADER */

.result-header {
  height: 58px !important;
  min-height: 58px !important;
  max-height: 58px !important;

  padding: 0 !important;
  margin: 0 auto !important;

  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;

  border-bottom: 1px solid #BEB8B4;

  background: transparent !important;
}

.result-brand {
  font-size: 20px;
  font-weight: 900;
  line-height: 1;

  letter-spacing: -0.07em;
}

.result-names {
  display: flex;
  align-items: center;
  gap: 8px;

  color: #686164;

  font-size: 8px;
  font-weight: 800;

  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.result-names b {
  color: #B13A63;
}

/* HERO */

.result-hero {
  padding: 27px 0 25px;
}

.result-index,
.section-head {
  font-size: 7px;
  font-weight: 900;

  letter-spacing: 0.18em;
}

.result-index {
  color: #B13A63;
}

.result-hero-grid {
  display: grid;

  grid-template-columns: 1fr 175px;

  gap: 30px;

  align-items: end;

  margin-top: 14px;
}

.result-hero h1 {
  margin: 0;

  font-size: clamp(45px, 8vw, 67px);
  font-weight: 900;

  line-height: 0.83;

  letter-spacing: -0.075em;
}

.result-score {
  padding-left: 18px;

  border-left: 1px solid #BEB8B4;
}

.result-score > span {
  display: block;

  margin-bottom: 3px;

  color: #777074;

  font-size: 7px;
  font-weight: 900;

  letter-spacing: 0.18em;
}

.result-score strong {
  display: block;

  color: #B13A63;

  font-size: 59px;
  font-weight: 900;

  line-height: 0.9;

  letter-spacing: -0.075em;
}

.result-score sup {
  font-size: 0.4em;
}

.result-score p {
  margin: 7px 0 0;

  color: #7E777A;

  font-size: 8px;
  font-weight: 600;

  line-height: 1.35;
}

.result-quick {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  margin-top: 22px;

  border-top: 1px solid #BEB8B4;
  border-bottom: 1px solid #BEB8B4;
}

.result-quick > div {
  display: flex;

  align-items: center;

  gap: 9px;

  min-height: 54px;

  padding: 8px 13px;
}

.result-quick > div + div {
  border-left: 1px solid #BEB8B4;
}

.result-quick strong {
  color: #B13A63;

  font-size: 25px;
  font-weight: 900;

  letter-spacing: -0.06em;
}

.result-quick span {
  max-width: 80px;

  color: #6E676A;

  font-size: 7px;
  font-weight: 700;

  line-height: 1.25;
}

/* SECTION */

.section-head {
  display: flex;

  align-items: center;
  justify-content: space-between;

  padding-bottom: 8px;

  border-bottom: 2px solid #242123;

  color: #242123;
}

.section-head b {
  color: #B13A63;

  font-size: 8px;
}

/* BREAKDOWN */

.result-breakdown {
  padding-bottom: 27px;
}

.dimension-row {
  display: grid;

  grid-template-columns: 25px 45px 1fr;

  gap: 12px;

  align-items: center;

  padding: 14px 0;

  border-bottom: 1px solid #C8C1BD;
}

.dimension-number {
  align-self: start;

  padding-top: 3px;

  color: #AAA2A4;

  font-size: 7px;
  font-weight: 800;
}

.dimension-mark {
  position: relative;

  width: 38px;
  height: 38px;
}

.mark-views span {
  position: absolute;

  top: 11px;

  width: 23px;
  height: 14px;

  border: 2px solid #252225;

  border-radius: 50%;
}

.mark-views span:first-child {
  left: 0;
}

.mark-views span:last-child {
  right: 0;

  border-color: #B13A63;
}

.mark-care {
  display: flex;

  align-items: center;
  justify-content: center;

  border: 2px solid #252225;

  border-radius: 50%;
}

.mark-care b {
  color: #B13A63;

  font-size: 25px;
  font-weight: 500;
}

.mark-talk span {
  position: absolute;

  width: 26px;
  height: 18px;

  border: 2px solid #252225;
}

.mark-talk span:first-child {
  top: 3px;
  left: 0;
}

.mark-talk span:last-child {
  right: 0;
  bottom: 3px;

  border-color: #B13A63;
}

.mark-rhythm {
  display: flex;

  align-items: center;
  justify-content: center;
}

.mark-rhythm span {
  font-size: 49px;
  font-weight: 300;

  line-height: 1;

  transform: rotate(-8deg);
}

.mark-space span {
  position: absolute;

  top: 7px;

  width: 25px;
  height: 25px;

  border: 2px solid #252225;

  border-radius: 50%;
}

.mark-space span:first-child {
  left: 0;

  background: #E2AE45;
}

.mark-space span:last-child {
  right: 0;

  background: #8E789D;
}

.dimension-content {
  min-width: 0;
}

.dimension-main {
  display: grid;

  grid-template-columns: 1fr auto;

  gap: 16px;

  align-items: end;
}

.dimension-main h3 {
  margin: 0;

  font-size: 17px;
  font-weight: 900;

  line-height: 1;

  letter-spacing: -0.045em;
}

.dimension-main p {
  margin: 3px 0 0;

  color: #777074;

  font-size: 8px;
  font-weight: 600;
}

.dimension-value {
  color: #B13A63;

  font-size: 28px;
  font-weight: 900;

  line-height: 0.9;

  letter-spacing: -0.06em;
}

.dimension-value sup {
  font-size: 0.45em;
}

.segments {
  display: grid;

  grid-template-columns: repeat(10, 1fr);

  gap: 4px;

  margin-top: 9px;
}

.segments span {
  height: 5px;

  background: #DAD3CF;
}

.segments span.active {
  background: #B13A63;
}

.dimension-comment {
  margin-top: 6px;

  color: #514B4E;

  font-size: 8px;
  font-weight: 700;

  line-height: 1.3;
}

/* TYPE */

.result-type {
  padding-bottom: 30px;
}

.type-title-row {
  display: grid;

  grid-template-columns: 1fr 220px;

  gap: 25px;

  align-items: end;

  padding: 17px 0 13px;
}

.type-title-row > div > span {
  color: #B13A63;

  font-size: 7px;
  font-weight: 900;

  letter-spacing: 0.16em;
}

.type-title-row h2 {
  margin: 4px 0 0;

  font-size: clamp(34px, 6vw, 48px);
  font-weight: 900;

  line-height: 0.88;

  letter-spacing: -0.065em;
}

.type-title-row > p {
  margin: 0 0 2px;

  color: #5F585B;

  font-size: 10px;
  font-weight: 700;

  line-height: 1.35;
}

.type-poster {
  overflow: hidden;

  border: 2px solid #242124;

  background: #F7F1EB;

  box-shadow: 6px 6px 0 #CDBDC3;
}

.poster-strip {
  min-height: 41px;

  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 20px;

  padding: 8px 13px;

  border-top: 2px solid #242124;
}

.poster-strip span {
  color: #777074;

  font-size: 6px;
  font-weight: 900;

  letter-spacing: 0.13em;
}

.poster-strip strong {
  color: #B13A63;

  font-size: 8px;
  font-weight: 900;

  letter-spacing: 0.04em;

  text-align: right;
}

/* ART */

.art {
  position: relative;

  height: 290px;

  overflow: hidden;

  background: #393440;
}

.art-label {
  position: absolute;

  z-index: 20;

  top: 12px;
  left: 12px;

  padding: 6px 8px;

  background: #F2EEE8;

  color: #282428;

  font-size: 7px;
  font-weight: 900;

  letter-spacing: 0.06em;
}

.star {
  position: absolute;

  z-index: 3;

  font-style: normal;
}

.star-a {
  top: 18%;
  left: 15%;

  color: #E7B246;

  font-size: 25px;
}

.star-b {
  top: 39%;
  left: 8%;

  color: #907B9D;

  font-size: 20px;
}

.star-c {
  top: 22%;
  right: 13%;

  color: #CC6B8D;

  font-size: 19px;
}

.orbit {
  position: absolute;

  left: 50%;

  border: 1px solid rgba(245, 234, 224, 0.25);

  border-radius: 50%;
}

.orbit-a {
  top: 68px;

  width: 490px;
  height: 125px;

  transform: translateX(-50%) rotate(-13deg);
}

.orbit-b {
  top: 78px;

  width: 430px;
  height: 145px;

  transform: translateX(-50%) rotate(17deg);
}

.planet {
  position: absolute;

  top: 28px;
  left: 50%;

  width: 137px;
  height: 137px;

  border: 4px solid #27232B;

  border-radius: 50%;

  background: #C2B0CF;

  box-shadow: 7px 7px 0 rgba(25, 21, 28, 0.24);

  transform: translateX(-50%);
}

.planet span {
  position: absolute;

  border: 3px solid rgba(72, 58, 77, 0.28);

  border-radius: 50%;
}

.planet span:first-child {
  top: 23px;
  left: 20px;

  width: 34px;
  height: 19px;
}

.planet span:nth-child(2) {
  top: 65px;
  right: 18px;

  width: 24px;
  height: 31px;
}

.planet span:last-child {
  bottom: 18px;
  left: 52px;

  width: 23px;
  height: 16px;
}

.ground {
  position: absolute;

  left: -9%;
  right: -9%;
  bottom: -139px;

  height: 240px;

  border: 4px solid #27232B;

  border-radius: 50% 50% 0 0;

  background: #81718C;
}

.ground span {
  position: absolute;

  border: 3px solid #554A5E;

  border-radius: 50%;

  background: #695C73;
}

.ground span:first-child {
  top: 28px;
  left: 17%;

  width: 55px;
  height: 30px;
}

.ground span:nth-child(2) {
  top: 65px;
  left: 47%;

  width: 80px;
  height: 35px;
}

.ground span:last-child {
  top: 27px;
  right: 16%;

  width: 45px;
  height: 25px;
}

/* ASTRONAUT */

.astronaut {
  position: absolute;

  z-index: 5;

  bottom: 25px;

  width: 135px;
  height: 205px;

  transform-origin: bottom center;
}

.astronaut.left {
  left: calc(50% - 142px);

  transform: scale(0.82) rotate(2deg);
}

.astronaut.right {
  right: calc(50% - 142px);

  transform: scale(0.82) rotate(-2deg);
}

.backpack {
  position: absolute;

  top: 75px;
  left: 4px;

  width: 48px;
  height: 84px;

  border: 4px solid #29242C;

  border-radius: 17px;

  background: #B45B7A;
}

.helmet {
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

.visor {
  position: absolute;

  top: 17px;
  left: 14px;

  width: 59px;
  height: 47px;

  border: 4px solid #29242C;

  border-radius: 45%;

  background: #665B70;
}

.visor i {
  position: absolute;

  top: 17px;

  width: 5px;
  height: 5px;

  border-radius: 50%;

  background: #F2D4A5;
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

  border-bottom: 2px solid #F2D4A5;

  border-radius: 0 0 50% 50%;

  transform: translateX(-50%);
}

.body {
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

.panel {
  position: absolute;

  top: 25px;
  left: 50%;

  width: 38px;
  height: 26px;

  border: 3px solid #29242C;

  background: #C35078;

  transform: translateX(-50%);
}

.panel i {
  position: absolute;

  top: 7px;

  width: 6px;
  height: 6px;
}

.panel i:first-child {
  left: 7px;

  background: #E5AF49;
}

.panel i:last-child {
  right: 7px;

  background: #7E6C91;
}

.arm {
  position: absolute;

  z-index: 4;

  top: 97px;

  width: 61px;
  height: 25px;

  border: 4px solid #29242C;

  border-radius: 14px;

  background: #F0E7DD;
}

.astronaut.left .outside {
  left: -20px;

  transform: rotate(27deg);
}

.astronaut.left .inside {
  right: -34px;

  width: 76px;

  transform: rotate(-11deg);
}

.astronaut.right .outside {
  right: -20px;

  transform: rotate(-27deg);
}

.astronaut.right .inside {
  left: -34px;

  width: 76px;

  transform: rotate(11deg);
}

.leg {
  position: absolute;

  z-index: 3;

  bottom: 0;

  width: 39px;
  height: 64px;

  border: 4px solid #29242C;

  border-radius: 10px 10px 18px 18px;

  background: #F0E7DD;
}

.leg-a {
  left: 25px;

  transform: rotate(5deg);
}

.leg-b {
  right: 25px;

  transform: rotate(-5deg);
}

.art-heart {
  position: absolute;

  z-index: 10;

  top: 141px;
  left: 50%;

  color: #D04F78;

  font-size: 27px;

  transform: translateX(-50%);
}

/* PAYWALL */

.result-paywall {
  padding: 29px 0 32px;

  background: #272328;

  color: #F7F0EA;
}

.paywall-top {
  display: flex;

  align-items: center;
  justify-content: space-between;

  padding-bottom: 9px;

  border-bottom: 2px solid #F7F0EA;

  color: #E17C9E;

  font-size: 7px;
  font-weight: 900;

  letter-spacing: 0.18em;
}

.paywall-top b {
  color: #E7B246;
}

.paywall-grid {
  display: grid;

  grid-template-columns: 0.88fr 1.12fr;

  gap: 35px;

  padding-top: 22px;
}

.paywall-left {
  position: relative;
}

.paywall-sticker {
  width: 82px;
  height: 82px;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  margin-bottom: 15px;

  border-radius: 50%;

  background: #E7B246;

  color: #272328;

  font-size: 6px;
  font-weight: 900;

  letter-spacing: 0.1em;

  transform: rotate(-7deg);
}

.paywall-sticker strong {
  display: block;

  font-size: 34px;
  font-weight: 900;

  line-height: 0.9;

  letter-spacing: -0.07em;
}

.paywall-left h2 {
  margin: 0;

  font-size: clamp(39px, 6vw, 52px);
  font-weight: 900;

  line-height: 0.84;

  letter-spacing: -0.07em;
}

.paywall-left > p {
  max-width: 225px;

  margin: 14px 0 0;

  color: #B9AEB4;

  font-size: 9px;
  font-weight: 600;

  line-height: 1.45;
}

.paywall-hook {
  margin-bottom: 5px;

  padding: 13px;

  border: 1px solid #D86E92;

  background: #342D35;
}

.paywall-hook span {
  display: block;

  margin-bottom: 5px;

  color: #D86E92;

  font-size: 6px;
  font-weight: 900;

  letter-spacing: 0.15em;
}

.paywall-hook strong {
  display: block;

  font-size: 15px;
  font-weight: 800;

  line-height: 1.15;

  letter-spacing: -0.025em;
}

.locked-row {
  display: grid;

  grid-template-columns: 23px 1fr auto;

  gap: 10px;

  align-items: center;

  min-height: 48px;

  border-bottom: 1px solid rgba(255,255,255,0.13);
}

.locked-number {
  color: #E17C9E;

  font-size: 7px;
  font-weight: 900;
}

.locked-row p {
  margin: 0;

  color: #F3EBEF;

  font-size: 9px;
  font-weight: 700;

  line-height: 1.25;
}

.locked-status {
  color: #716971;

  font-size: 6px;
  font-weight: 900;

  letter-spacing: 0.1em;
}

.result-buy {
  width: 100%;

  display: grid;

  grid-template-columns: 1fr auto auto;

  gap: 13px;

  align-items: center;

  margin-top: 13px;

  padding: 15px;

  border: 0;

  background: #B63B67;

  color: white;

  cursor: pointer;

  text-align: left;
}

.result-buy:hover {
  background: #C84372;
}

.result-buy span {
  font-size: 9px;
  font-weight: 900;

  letter-spacing: -0.01em;
}

.result-buy strong {
  white-space: nowrap;

  font-size: 13px;
  font-weight: 900;
}

.result-buy b {
  font-size: 20px;
}

.buy-note {
  margin-top: 7px;

  color: #766D75;

  font-size: 6px;
  font-weight: 700;

  letter-spacing: 0.06em;

  text-align: center;
}

/* STATE */

.result-state {
  width: 100%;
  min-height: 100svh;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  padding: 30px;

  background: #F2EEE8;

  text-align: center;
}

.state-brand {
  font-size: 23px;
  font-weight: 900;

  letter-spacing: -0.07em;
}

.result-state h1 {
  max-width: 400px;

  margin: 22px 0 8px;

  font-size: 43px;
  font-weight: 900;

  line-height: 0.9;

  letter-spacing: -0.065em;
}

.result-state p {
  color: #777074;

  font-size: 9px;
  font-weight: 700;
}

.state-mark {
  display: flex;

  margin-bottom: 20px;
}

.state-mark span {
  width: 44px;
  height: 44px;

  border: 3px solid #272328;

  border-radius: 50%;
}

.state-mark span:last-child {
  margin-left: -12px;

  border-color: #B13A63;
}

/* MOBILE */

@media (max-width: 650px) {

  .result-shell {
    width: calc(100% - 26px);
  }

  .result-header {
    width: calc(100% - 26px);

    height: 52px !important;
    min-height: 52px !important;
    max-height: 52px !important;
  }

  .result-brand {
    font-size: 18px;
  }

  .result-names {
    font-size: 7px;
  }

  .result-hero {
    padding: 21px 0 20px;
  }

  .result-hero-grid {
    grid-template-columns: 1fr 105px;

    gap: 14px;

    margin-top: 10px;
  }

  .result-hero h1 {
    font-size: clamp(39px, 12vw, 53px);
  }

  .result-score {
    padding-left: 10px;
  }

  .result-score strong {
    font-size: 44px;
  }

  .result-score p {
    font-size: 6px;
  }

  .result-quick {
    margin-top: 17px;
  }

  .result-quick > div {
    display: block;

    min-height: 53px;

    padding: 8px;
  }

  .result-quick strong {
    display: block;

    margin-bottom: 3px;

    font-size: 22px;
  }

  .result-quick span {
    display: block;

    font-size: 6px;
  }

  .dimension-row {
    grid-template-columns: 17px 35px 1fr;

    gap: 7px;

    padding: 12px 0;
  }

  .dimension-mark {
    width: 31px;
    height: 31px;

    transform: scale(0.8);
    transform-origin: left center;
  }

  .dimension-main h3 {
    font-size: 15px;
  }

  .dimension-main p {
    max-width: 180px;

    font-size: 7px;
  }

  .dimension-value {
    font-size: 23px;
  }

  .segments {
    gap: 2px;

    margin-top: 7px;
  }

  .segments span {
    height: 4px;
  }

  .dimension-comment {
    font-size: 7px;
  }

  .type-title-row {
    grid-template-columns: 1fr;

    gap: 7px;

    padding: 14px 0 10px;
  }

  .type-title-row h2 {
    font-size: 34px;
  }

  .type-title-row > p {
    max-width: 310px;

    font-size: 8px;
  }

  .art {
    height: 235px;
  }

  .planet {
    top: 23px;

    width: 108px;
    height: 108px;
  }

  .astronaut {
    bottom: 13px;
  }

  .astronaut.left {
    left: calc(50% - 110px);

    transform: scale(0.68) rotate(2deg);
  }

  .astronaut.right {
    right: calc(50% - 110px);

    transform: scale(0.68) rotate(-2deg);
  }

  .art-heart {
    top: 116px;

    font-size: 23px;
  }

  .poster-strip {
    padding: 8px 10px;
  }

  .poster-strip strong {
    max-width: 155px;
  }

  .result-paywall {
    padding: 24px 0 27px;
  }

  .paywall-grid {
    grid-template-columns: 1fr;

    gap: 17px;

    padding-top: 17px;
  }

  .paywall-left {
    display: grid;

    grid-template-columns: 64px 1fr;

    column-gap: 13px;

    align-items: center;
  }

  .paywall-sticker {
    grid-row: 1 / 3;

    width: 62px;
    height: 62px;

    margin: 0;
  }

  .paywall-sticker strong {
    font-size: 27px;
  }

  .paywall-left h2 {
    font-size: 37px;
  }

  .paywall-left > p {
    margin: 7px 0 0;

    font-size: 8px;
  }

  .locked-row {
    grid-template-columns: 20px 1fr;

    min-height: 45px;
  }

  .locked-status {
    display: none;
  }

  .result-buy {
    padding: 14px 12px;
  }

  .result-buy span {
    font-size: 8px;
  }

}

`;