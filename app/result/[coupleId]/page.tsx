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
                <main className="state-page">
                    <div className="brand">между нами.</div>
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
                <main className="state-page">
                    <div className="loader-circles">
                        <span />
                        <span />
                    </div>

                    <div className="brand">между нами.</div>
                    <p>собираем ваш результат</p>
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

    const dimensionItems: DimensionItem[] = [
        {
            kind: 'views',
            title: 'Взгляды',
            subtitle: 'Как вы смотрите на отношения',
            value: dimensions?.views ?? overall,
        },
        {
            kind: 'care',
            title: 'Забота',
            subtitle: 'Что для вас значит «я рядом»',
            value: dimensions?.care ?? overall,
        },
        {
            kind: 'communication',
            title: 'Общение',
            subtitle: 'Как вы проходите сложные разговоры',
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
            subtitle: 'Сколько своего пространства вам нужно',
            value: dimensions?.space ?? overall,
        },
    ];

    const nameA = data.couple.partner_a_name;
    const nameB = data.couple.partner_b_name;

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

    return (
        <>
            <main className="page">

                {/* HEADER */}

                <header className="header shell">
                    <div className="brand">
                        между нами.
                    </div>

                    <div className="names">
                        {nameA}
                        <span>×</span>
                        {nameB}
                    </div>
                </header>

                {/* RESULT */}

                <section className="hero shell">

                    <div className="eyebrow">
                        ваш результат
                    </div>

                    <div className="hero-result">

                        <div className="score">
                            {overall}
                            <sup>%</sup>
                        </div>

                        <div className="hero-copy">
                            <h1>
                                {getOverallTitle(overall)}
                            </h1>

                            <p>
                                {getOverallCopy(overall)}
                            </p>
                        </div>

                    </div>

                </section>

                {/* BREAKDOWN */}

                <section className="breakdown shell">

                    <div className="section-intro">
                        <h2>
                            А если
                            <br />
                            по частям?
                        </h2>

                        <p>
                            Пять вещей, в которых особенно
                            интересно сравнить ваши ответы.
                        </p>
                    </div>

                    <div className="dimensions">
                        {dimensionItems.map((item) => (
                            <DimensionRow
                                key={item.kind}
                                item={item}
                            />
                        ))}
                    </div>

                </section>

                {/* TYPE */}

                <section className="type-section shell">

                    <div className="type-heading">
                        <span>ваш тип пары</span>

                        <h2>
                            {getArchetypeDisplayTitle(
                                archetype.id,
                                archetype.title
                            )}
                        </h2>

                        <p>
                            {getArchetypeShortCopy(archetype.id)}
                        </p>
                    </div>

                    <div className="type-card">

                        <div className="type-number">
                            №{getTypeNumber(archetype.id)}
                        </div>

                        <CoupleArtwork
                            archetypeId={archetype.id}
                        />

                        <div className="type-caption">
                            {getArtTag(archetype.id)}
                        </div>

                    </div>

                </section>

                {/* PAYWALL */}

                <section className="paywall">

                    <div className="shell paywall-inner">

                        <div className="paywall-heading">
                            <span>а вот здесь интереснее</span>

                            <h2>
                                В процентах
                                <br />
                                видно не всё.
                            </h2>

                            <p>
                                Мы нашли несколько вещей,
                                которые легко пропустить
                                в обычном разговоре.
                            </p>
                        </div>

                        <div className="locked-list">

                            <LockedItem>
                                Где вы ждёте друг от друга
                                разного
                            </LockedItem>

                            <LockedItem>
                                Как каждый из вас понимает
                                заботу
                            </LockedItem>

                            <LockedItem>
                                Что вы можете не замечать
                                друг о друге
                            </LockedItem>

                            <LockedItem>
                                О чём вам действительно
                                стоит поговорить
                            </LockedItem>

                        </div>

                        <button
                            type="button"
                            className="buy-button"
                            onClick={() =>
                                router.push(`/report/${coupleId}`)
                            }
                        >
              <span>
                Открыть полный разбор
              </span>

                            <strong>
                                299 ₽
                            </strong>
                        </button>

                        <div className="buy-note">
                            один разбор · для вас двоих
                        </div>

                        {(differentCount > 0 ||
                            closeCount > 0) && (
                            <div className="personal-hook">
                                {getPersonalHook(
                                    differentCount,
                                    closeCount
                                )}
                            </div>
                        )}

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
        background: #f7f3f0 !important;
      }

      body {
        color: #191617;
        font-family:
          Arial,
          Helvetica,
          sans-serif;
      }

      * {
        box-sizing: border-box;
      }

      button {
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
                      }: {
    item: DimensionItem;
}) {
    return (
        <article className="dimension">

            <div className="dimension-top">

                <div className="dimension-text">
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                </div>

                <strong>
                    {item.value}
                    <sup>%</sup>
                </strong>

            </div>

            <div className="bar">
        <span
            style={{
                width: `${Math.max(
                    3,
                    Math.min(100, item.value)
                )}%`,
            }}
        />
            </div>

        </article>
    );
}

/* ============================================================
   LOCKED ITEM
============================================================ */

function LockedItem({
                        children,
                    }: {
    children: ReactNode;
}) {
    return (
        <div className="locked-item">

            <div className="lock-dot">
                <span />
            </div>

            <p>{children}</p>

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

            <div className="moon">
                <span />
                <span />
            </div>

            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />

            <span className="star star-one">✦</span>
            <span className="star star-two">·</span>
            <span className="star star-three">✦</span>

            <Astronaut side="left" />
            <Astronaut side="right" />

            <div className="heart">
                ♥
            </div>

            <div className="ground" />

            <div className="art-note">
                {getArtTag(archetypeId)}
            </div>

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

            <div className="astronaut-body">
                <div className="panel">
                    <i />
                    <i />
                </div>
            </div>

            <div className="arm arm-out" />
            <div className="arm arm-in" />

            <div className="leg leg-left" />
            <div className="leg leg-right" />

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

    comparisons.forEach((item) => {
        if (item.similarity === 'same') {
            points += 1;
        }

        if (item.similarity === 'close') {
            points += 0.5;
        }
    });

    return Math.round(
        (points / comparisons.length) * 100
    );
}

function getOverallTitle(value: number) {
    if (value >= 75) {
        return 'Вы часто смотрите в одну сторону';
    }

    if (value >= 55) {
        return 'Во многом вы друг друга понимаете';
    }

    if (value >= 35) {
        return 'Вы похожи меньше, чем кажется';
    }

    return 'Вы правда довольно разные';
}

function getOverallCopy(value: number) {
    if (value >= 75) {
        return 'Во многих ситуациях ваши ожидания и реакции оказываются похожими.';
    }

    if (value >= 55) {
        return 'Есть заметная общая база, но некоторые вещи каждый видит по-своему.';
    }

    if (value >= 35) {
        return 'В чём-то вы совпадаете, а в чём-то смотрите на отношения совсем по-разному.';
    }

    return 'Это не плохо и не хорошо. Просто у вас особенно много вещей, которые интересно обсудить.';
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
        knight_princess: 'Рыцарь и принцесса',
        wizards: 'Два волшебника',
        pirates: 'Два пирата',
        astronauts: 'Два космонавта',
        sun_moon: 'Солнце и Луна',
        dragon_keeper: 'Дракон и хранитель',
        players: 'Два игрока',
        homekeepers: 'Хранители дома',
    };

    return map[id] ?? fallback;
}

function getArchetypeShortCopy(id: string) {
    const map: Record<string, string> = {
        knight_princess:
            'По-разному показываете чувства, но одинаково держитесь за своих.',

        wizards:
            'Многое понимаете без длинных объяснений.',

        pirates:
            'Планы могут меняться. Команда — нет.',

        astronauts:
            'Каждый на своей орбите, но летите в одну сторону.',

        sun_moon:
            'По-разному реагируете на мир и хорошо дополняете друг друга.',

        dragon_keeper:
            'Один добавляет огня, второй не даёт всему сгореть.',

        players:
            'Разные стратегии. Одна команда.',

        homekeepers:
            'Вам важно своё место и свой человек.',
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
        players: 'играем вдвоём',
        homekeepers: 'своё место',
    };

    return map[id] ?? 'между вами';
}

function getPersonalHook(
    different: number,
    close: number
) {
    if (different >= 4) {
        return `Особенно интересно: в ${different} ответах вы заметно разошлись.`;
    }

    if (different > 0) {
        return `Есть ${different} ответа, где вы смотрите на ситуацию по-разному.`;
    }

    if (close > 0) {
        return `${close} ответов оказались близкими, но не одинаковыми.`;
    }

    return '';
}

/* ============================================================
   CSS
============================================================ */

const styles = `

.page {
  width: 100%;
  min-height: 100vh;

  background: #F7F3F0;
  color: #191617;

  overflow: hidden;
}

.shell {
  width: min(calc(100% - 40px), 630px);
  margin: 0 auto;
}

/* HEADER */

.header {
  height: 72px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 20px;
  font-weight: 700;

  letter-spacing: -0.045em;
}

.names {
  display: flex;
  align-items: center;

  gap: 8px;

  color: #8A8184;

  font-size: 10px;
  font-weight: 700;

  letter-spacing: 0.09em;

  text-transform: uppercase;
}

.names span {
  color: #B0476C;
}

/* HERO */

.hero {
  padding: 48px 0 58px;
}

.eyebrow,
.type-heading > span,
.paywall-heading > span {
  display: block;

  margin-bottom: 17px;

  color: #B0476C;

  font-size: 11px;
  font-weight: 700;

  letter-spacing: 0.13em;

  text-transform: uppercase;
}

.hero-result {
  display: grid;

  grid-template-columns: 185px 1fr;

  gap: 40px;

  align-items: center;
}

.score {
  color: #B0476C;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 104px;
  font-weight: 400;

  line-height: 0.85;

  letter-spacing: -0.08em;
}

.score sup {
  position: relative;

  top: -0.7em;

  margin-left: 4px;

  font-size: 0.3em;
}

.hero-copy h1,
.section-intro h2,
.type-heading h2,
.paywall-heading h2,
.state-page h1 {
  margin: 0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-weight: 400;

  letter-spacing: -0.045em;
}

.hero-copy h1 {
  max-width: 330px;

  font-size: 39px;
  line-height: 0.98;
}

.hero-copy p {
  max-width: 310px;

  margin: 14px 0 0;

  color: #777073;

  font-size: 14px;
  line-height: 1.45;
}

/* BREAKDOWN */

.breakdown {
  padding: 24px 0 66px;
}

.section-intro {
  display: grid;

  grid-template-columns: 220px 1fr;

  gap: 42px;

  align-items: end;

  margin-bottom: 31px;
}

.section-intro h2 {
  font-size: 48px;
  line-height: 0.93;
}

.section-intro p {
  max-width: 245px;

  margin: 0 0 4px;

  color: #777073;

  font-size: 14px;
  line-height: 1.45;
}

.dimensions {
  display: flex;
  flex-direction: column;

  gap: 27px;
}

.dimension-top {
  display: grid;

  grid-template-columns: 1fr auto;

  gap: 20px;

  align-items: end;
}

.dimension-text h3 {
  margin: 0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 22px;
  font-weight: 400;

  line-height: 1;
}

.dimension-text p {
  margin: 5px 0 0;

  color: #898184;

  font-size: 12px;
  line-height: 1.3;
}

.dimension-top strong {
  color: #B0476C;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 24px;
  font-weight: 400;

  line-height: 1;
}

.dimension-top sup {
  font-size: 0.55em;
}

.bar {
  width: 100%;
  height: 5px;

  margin-top: 11px;

  overflow: hidden;

  border-radius: 99px;

  background: #E5DEDC;
}

.bar span {
  display: block;

  height: 100%;

  border-radius: inherit;

  background: #B0476C;
}

/* TYPE */

.type-section {
  padding: 10px 0 72px;
}

.type-heading {
  max-width: 520px;

  margin-bottom: 27px;
}

.type-heading h2 {
  font-size: 52px;
  line-height: 0.95;
}

.type-heading p {
  max-width: 420px;

  margin: 15px 0 0;

  color: #777073;

  font-size: 14px;
  line-height: 1.45;
}

.type-card {
  position: relative;
}

.type-number {
  position: absolute;

  z-index: 20;

  top: 17px;
  right: 18px;

  color: #F7F3F0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 19px;
}

.type-caption {
  margin-top: 11px;

  color: #8B8385;

  font-size: 11px;
  line-height: 1.3;

  text-align: right;
}

/* ART */

.art {
  position: relative;

  height: 355px;

  overflow: hidden;

  border-radius: 3px;

  background: #39333F;
}

.moon {
  position: absolute;

  top: 35px;
  left: 50%;

  width: 155px;
  height: 155px;

  border: 4px solid #272229;

  border-radius: 50%;

  background: #C4B2CF;

  transform: translateX(-50%);
}

.moon span {
  position: absolute;

  border: 3px solid rgba(72, 58, 77, 0.25);

  border-radius: 50%;
}

.moon span:first-child {
  top: 30px;
  left: 27px;

  width: 39px;
  height: 21px;
}

.moon span:last-child {
  right: 25px;
  bottom: 36px;

  width: 27px;
  height: 36px;
}

.orbit {
  position: absolute;

  left: 50%;

  border: 1px solid rgba(247, 243, 240, 0.22);

  border-radius: 50%;
}

.orbit-one {
  top: 85px;

  width: 470px;
  height: 135px;

  transform: translateX(-50%) rotate(-12deg);
}

.orbit-two {
  top: 92px;

  width: 430px;
  height: 145px;

  transform: translateX(-50%) rotate(16deg);
}

.star {
  position: absolute;

  color: #E5B14B;

  font-size: 22px;
}

.star-one {
  top: 55px;
  left: 16%;
}

.star-two {
  top: 72px;
  right: 20%;

  color: #F7F3F0;

  font-size: 27px;
}

.star-three {
  top: 145px;
  right: 10%;

  color: #CB6E8D;

  font-size: 17px;
}

.ground {
  position: absolute;

  left: -12%;
  right: -12%;
  bottom: -165px;

  height: 275px;

  border-radius: 50% 50% 0 0;

  background: #81718D;
}

.heart {
  position: absolute;

  z-index: 12;

  top: 177px;
  left: 50%;

  color: #D04F79;

  font-size: 28px;

  transform: translateX(-50%);
}

.art-note {
  position: absolute;

  z-index: 20;

  right: 18px;
  bottom: 16px;

  padding: 8px 11px;

  background: #F7F3F0;

  color: #373036;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 12px;
}

/* ASTRONAUT */

.astronaut {
  position: absolute;

  z-index: 10;

  bottom: 36px;

  width: 135px;
  height: 205px;
}

.astronaut.left {
  left: calc(50% - 145px);

  transform: scale(0.86) rotate(2deg);
}

.astronaut.right {
  right: calc(50% - 145px);

  transform: scale(0.86) rotate(-2deg);
}

.backpack {
  position: absolute;

  top: 75px;
  left: 3px;

  width: 48px;
  height: 83px;

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

.astronaut-body {
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

.astronaut.left .arm-out {
  left: -20px;

  transform: rotate(27deg);
}

.astronaut.left .arm-in {
  right: -34px;

  width: 76px;

  transform: rotate(-11deg);
}

.astronaut.right .arm-out {
  right: -20px;

  transform: rotate(-27deg);
}

.astronaut.right .arm-in {
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

.leg-left {
  left: 25px;

  transform: rotate(5deg);
}

.leg-right {
  right: 25px;

  transform: rotate(-5deg);
}

/* PAYWALL */

.paywall {
  padding: 68px 0 62px;

  background: #2D282E;

  color: #F7F3F0;
}

.paywall-inner {
  position: relative;
}

.paywall-heading {
  max-width: 500px;
}

.paywall-heading > span {
  color: #D67294;
}

.paywall-heading h2 {
  color: #F7F3F0;

  font-size: 51px;
  line-height: 0.96;
}

.paywall-heading p {
  max-width: 390px;

  margin: 17px 0 0;

  color: #BDB4B9;

  font-size: 14px;
  line-height: 1.5;
}

.locked-list {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 10px 28px;

  margin-top: 32px;
}

.locked-item {
  display: grid;

  grid-template-columns: 17px 1fr;

  gap: 11px;

  align-items: start;

  padding: 10px 0;
}

.lock-dot {
  position: relative;

  width: 16px;
  height: 16px;

  margin-top: 1px;

  border: 1px solid #716971;

  border-radius: 50%;
}

.lock-dot span {
  position: absolute;

  top: 50%;
  left: 50%;

  width: 4px;
  height: 4px;

  border-radius: 50%;

  background: #D67294;

  transform: translate(-50%, -50%);
}

.locked-item p {
  margin: 0;

  color: #EEE7EA;

  font-size: 13px;
  line-height: 1.35;
}

.buy-button {
  width: 100%;

  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 20px;

  margin-top: 30px;

  padding: 19px 22px;

  border: 0;
  border-radius: 2px;

  background: #B0476C;

  color: #FFFFFF;

  cursor: pointer;
}

.buy-button:hover {
  background: #BC5075;
}

.buy-button span {
  font-size: 15px;
  font-weight: 700;
}

.buy-button strong {
  white-space: nowrap;

  font-size: 16px;
}

.buy-note {
  margin-top: 9px;

  color: #8D858B;

  font-size: 11px;

  text-align: center;
}

.personal-hook {
  margin-top: 25px;

  color: #D7CDD2;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 17px;

  text-align: center;
}

/* STATES */

.state-page {
  min-height: 100svh;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  padding: 30px;

  background: #F7F3F0;

  text-align: center;
}

.state-page h1 {
  margin-top: 24px;

  font-size: 42px;
}

.state-page p {
  color: #837A7E;

  font-size: 14px;
}

.loader-circles {
  display: flex;

  margin-bottom: 25px;
}

.loader-circles span {
  width: 55px;
  height: 55px;

  border-radius: 50%;

  background: #DDB1C1;
}

.loader-circles span:last-child {
  margin-left: -14px;

  background: #AE627E;
}

/* MOBILE */

@media (max-width: 600px) {

  .shell {
    width: calc(100% - 32px);
  }

  .header {
    height: 64px;
  }

  .brand {
    font-size: 19px;
  }

  .names {
    font-size: 9px;
  }

  .hero {
    padding: 36px 0 47px;
  }

  .eyebrow,
  .type-heading > span,
  .paywall-heading > span {
    margin-bottom: 13px;

    font-size: 9px;
  }

  .hero-result {
    grid-template-columns: 1fr;

    gap: 17px;
  }

  .score {
    font-size: 91px;
  }

  .hero-copy h1 {
    max-width: 330px;

    font-size: 35px;
  }

  .hero-copy p {
    margin-top: 11px;

    font-size: 13px;
  }

  .breakdown {
    padding: 14px 0 54px;
  }

  .section-intro {
    grid-template-columns: 1fr;

    gap: 11px;

    margin-bottom: 29px;
  }

  .section-intro h2 {
    font-size: 41px;
  }

  .section-intro p {
    font-size: 13px;
  }

  .dimensions {
    gap: 24px;
  }

  .dimension-text h3 {
    font-size: 20px;
  }

  .dimension-text p {
    max-width: 240px;

    font-size: 11px;
  }

  .dimension-top strong {
    font-size: 22px;
  }

  .type-section {
    padding-bottom: 55px;
  }

  .type-heading h2 {
    font-size: 43px;
  }

  .type-heading p {
    font-size: 13px;
  }

  .art {
    height: 280px;
  }

  .moon {
    width: 125px;
    height: 125px;
  }

  .astronaut {
    bottom: 20px;
  }

  .astronaut.left {
    left: calc(50% - 116px);

    transform: scale(0.7) rotate(2deg);
  }

  .astronaut.right {
    right: calc(50% - 116px);

    transform: scale(0.7) rotate(-2deg);
  }

  .heart {
    top: 143px;
  }

  .art-note {
    right: 11px;
    bottom: 11px;

    font-size: 10px;
  }

  .paywall {
    padding: 52px 0 47px;
  }

  .paywall-heading h2 {
    font-size: 43px;
  }

  .paywall-heading p {
    font-size: 13px;
  }

  .locked-list {
    grid-template-columns: 1fr;

    gap: 2px;

    margin-top: 24px;
  }

  .locked-item {
    padding: 8px 0;
  }

  .buy-button {
    margin-top: 23px;

    padding: 17px;
  }

  .buy-button span {
    font-size: 13px;
  }

  .buy-button strong {
    font-size: 14px;
  }

  .personal-hook {
    margin-top: 20px;

    font-size: 15px;
  }

}

`;