'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

import type { Comparison } from '../../../lib/archetypes';

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
    scores?: {
        overall?: number;
        sameAnswers?: number;
        closeAnswers?: number;
        differentAnswers?: number;
    };
};

type CategoryId =
    | 'friendship'
    | 'partnership'
    | 'sex'
    | 'money'
    | 'care'
    | 'home';

type Category = {
    id: CategoryId;
    title: string;
    subtitle: string;
    score: number;
};

const CATEGORY_META: Record<
    CategoryId,
    {
        title: string;
        subtitle: string;
        keywords: string[];
    }
> = {
    friendship: {
        title: 'Дружба',
        subtitle: 'хорошо ли вам просто вдвоём',
        keywords: [
            'friend',
            'fun',
            'humor',
            'laugh',
            'together',
            'free_saturday',
            'normal_evening',
            'weekend',
            'weekend_plan',
            'extra_hour',
        ],
    },

    partnership: {
        title: 'Партнёрство',
        subtitle: 'вы команда или каждый сам за себя',
        keywords: [
            'team',
            'partner',
            'support',
            'decision',
            'future',
            'plan',
            'responsibility',
            'keep_in_year',
            'relationship_button',
            'want_more',
        ],
    },

    sex: {
        title: 'Секс',
        subtitle: 'совпадает ли ваше представление о близости',
        keywords: [
            'sex',
            'sexual',
            'intimacy',
            'physical',
            'touch',
            'affection',
            'closeness',
            'romance',
        ],
    },

    money: {
        title: 'Деньги',
        subtitle: 'одинаково ли вы смотрите на траты',
        keywords: [
            'money',
            'finance',
            'spend',
            'saving',
            'budget',
            'unexpected_money',
            'purchase',
        ],
    },

    care: {
        title: 'Забота',
        subtitle: 'понимаете ли вы «я рядом» одинаково',
        keywords: [
            'care',
            'support',
            'help',
            'hard_day',
            'reunion',
            'care_signal',
            'emotion',
            'attention',
            'comfort',
        ],
    },

    home: {
        title: 'Быт',
        subtitle: 'как вам живётся в обычный вторник',
        keywords: [
            'home',
            'house',
            'routine',
            'daily',
            'chores',
            'clean',
            'food',
            'sleep',
            'normal_evening',
            'weekend_plan',
        ],
    },
};

export default function ResultPage() {
    const params = useParams<{ coupleId: string }>();
    const router = useRouter();

    const coupleId = params.coupleId;

    const [data, setData] = useState<ResultData | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;

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

                if (cancelled) {
                    return;
                }

                if (result.waiting) {
                    router.replace(`/waiting/${coupleId}`);
                    return;
                }

                setData(result);
            } catch (err) {
                console.error(err);

                if (!cancelled) {
                    setError('Не получилось загрузить результат.');
                }
            }
        }

        load();

        return () => {
            cancelled = true;
        };
    }, [coupleId, router]);

    const comparisons = useMemo(
        () => data?.comparisons ?? [],
        [data]
    );

    const overallScore = useMemo(() => {
        if (typeof data?.scores?.overall === 'number') {
            return normalizePercent(data.scores.overall);
        }

        return calculateOverallScore(comparisons);
    }, [data, comparisons]);

    const categories = useMemo(
        () => buildCategories(comparisons, overallScore),
        [comparisons, overallScore]
    );

    const yearsTogether = useMemo(
        () => calculateYearsTogether(categories, overallScore),
        [categories, overallScore]
    );

    if (error) {
        return (
            <>
                <main className="state-page">
                    <div className="state-brand">между нами.</div>

                    <h1>не получилось открыть результат</h1>

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
                    <div className="loader">
                        <span />
                        <span />
                    </div>

                    <div className="state-brand">между нами.</div>

                    <p>собираем ваши ответы</p>
                </main>

                <GlobalStyles />

                <style jsx>{styles}</style>
            </>
        );
    }

    const nameA = data.couple.partner_a_name;
    const nameB = data.couple.partner_b_name;

    return (
        <>
            <main className="page">
                {/* HEADER */}

                <header className="header result-shell">
                    <div className="brand">
                        между нами.
                    </div>

                    <div className="couple-names">
                        <span>{nameA}</span>
                        <b>×</b>
                        <span>{nameB}</span>
                    </div>
                </header>

                {/* SCORES */}

                <section className="scores result-shell">
                    {categories.map((category) => (
                        <ScoreRow
                            key={category.id}
                            category={category}
                        />
                    ))}
                </section>

                {/* FORECAST */}

                <section className="forecast result-shell">
                    <div className="forecast-label">
                        прогноз
                    </div>

                    <div className="forecast-grid">
                        <div className="forecast-copy">
                            <h2>
                                Вы можете быть
                                <br />
                                вместе очень долго
                            </h2>

                            <p>
                                На основе ваших ответов мы оценили,
                                сколько лет вы можете быть вместе.
                            </p>
                        </div>

                        <div className="forecast-result">
                            <div className="years">
                                {yearsTogether}

                                <span>
                  {getYearWord(yearsTogether)}
                </span>
                            </div>

                            <div className="forecast-scale">
                                <div className="forecast-line">
                                    <div
                                        className="forecast-progress"
                                        style={{
                                            width: `${getForecastPosition(
                                                yearsTogether
                                            )}%`,
                                        }}
                                    />

                                    <div
                                        className="forecast-dot"
                                        style={{
                                            left: `${getForecastPosition(
                                                yearsTogether
                                            )}%`,
                                        }}
                                    />
                                </div>

                                <div className="forecast-scale-labels">
                                    <span>1 месяц</span>
                                    <span>вся жизнь</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PAID REPORT */}

                <section className="paid-section result-shell">
                    <div className="paid-card">
                        <div className="paid-top">
                            <div className="paid-title">
                                <div className="paid-label">
                                    полный разбор
                                </div>

                                <h2>
                                    Чтобы вместе —
                                    <br />
                                    и надолго.
                                </h2>
                            </div>

                            <div className="paid-benefits">
                                <Benefit>
                                    Где вы можете
                                    <br />
                                    не понимать друг друга
                                </Benefit>

                                <Benefit>
                                    Что каждый ждёт
                                    <br />
                                    от отношений
                                </Benefit>

                                <Benefit>
                                    Что может стать
                                    <br />
                                    причиной ссор
                                </Benefit>

                                <Benefit>
                                    Как сделать вашу
                                    <br />
                                    пару крепче
                                </Benefit>
                            </div>
                        </div>

                        <PixelFairytale />

                        <div className="paid-bottom">
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

                                <i>→</i>
                            </button>

                            <div className="paid-note">
                                один разбор · для вас двоих · сразу после оплаты
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
   SCORE ROW
============================================================ */

function ScoreRow({
                      category,
                  }: {
    category: Category;
}) {
    return (
        <article className="score-row">
            <div className="score-header">
                <div className="score-copy">
                    <h2>{category.title}</h2>

                    <p>{category.subtitle}</p>
                </div>

                <div className="score-number">
                    <strong>{category.score}</strong>
                    <span>/10</span>
                </div>
            </div>

            <div className="score-track">
                <div
                    className="score-fill"
                    style={{
                        width: `${category.score * 10}%`,
                    }}
                />
            </div>
        </article>
    );
}

/* ============================================================
   BENEFIT
============================================================ */

function Benefit({
                     children,
                 }: {
    children: ReactNode;
}) {
    return (
        <div className="benefit">
            <div className="benefit-icon">
                ♥
            </div>

            <div className="benefit-text">
                {children}
            </div>
        </div>
    );
}

/* ============================================================
   PIXEL FAIRYTALE
============================================================ */

function PixelFairytale() {
    return (
        <div className="fairytale">
            <div className="pixel-moon" />

            <div className="sky-stars">
                <i className="s1">✦</i>
                <i className="s2">✦</i>
                <i className="s3">·</i>
                <i className="s4">♥</i>
            </div>

            <div className="mountains">
                <div className="mountain mountain-one" />
                <div className="mountain mountain-two" />
                <div className="mountain mountain-three" />
            </div>

            <div className="castle">
                <div className="tower tower-left">
                    <span />
                </div>

                <div className="tower tower-middle">
                    <span />
                </div>

                <div className="tower tower-right">
                    <span />
                </div>

                <div className="castle-body">
                    <i />
                    <i />
                    <i />
                </div>
            </div>

            <div className="ground-shape" />

            <div className="characters">
                <div className="knight">
                    <div className="knight-head">
                        <div className="knight-hair" />
                    </div>

                    <div className="knight-body">
                        <div className="knight-cape" />
                        <div className="knight-arm" />
                    </div>
                </div>

                <div className="pixel-heart">
                    ♥
                </div>

                <div className="princess">
                    <div className="crown">
                        ♛
                    </div>

                    <div className="princess-head">
                        <div className="princess-hair" />
                    </div>

                    <div className="princess-body">
                        <div className="princess-dress" />
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ============================================================
   CALCULATIONS
============================================================ */

function normalizePercent(value: number) {
    if (!Number.isFinite(value)) {
        return 0;
    }

    if (value >= 0 && value <= 1) {
        return Math.round(value * 100);
    }

    return Math.round(
        Math.max(0, Math.min(100, value))
    );
}

function calculateOverallScore(
    comparisons: Comparison[]
) {
    if (!comparisons.length) {
        return 50;
    }

    const points = comparisons.reduce(
        (sum, comparison) => {
            if (comparison.similarity === 'same') {
                return sum + 1;
            }

            if (comparison.similarity === 'close') {
                return sum + 0.55;
            }

            return sum;
        },
        0
    );

    return Math.round(
        (points / comparisons.length) * 100
    );
}

function buildCategories(
    comparisons: Comparison[],
    overallPercent: number
): Category[] {
    const ids: CategoryId[] = [
        'friendship',
        'partnership',
        'sex',
        'money',
        'care',
        'home',
    ];

    return ids.map((id) => {
        const meta = CATEGORY_META[id];

        const relevant = comparisons.filter(
            (comparison) =>
                comparisonBelongsToCategory(
                    comparison,
                    meta.keywords
                )
        );

        const source =
            relevant.length > 0
                ? relevant
                : comparisons;

        const scorePercent =
            source.length > 0
                ? calculateComparisonPercent(source)
                : overallPercent;

        return {
            id,
            title: meta.title,
            subtitle: meta.subtitle,
            score: percentToTen(scorePercent),
        };
    });
}

function comparisonBelongsToCategory(
    comparison: Comparison,
    keywords: string[]
) {
    const haystack = [
        comparison.questionId,
        comparison.question,
        ...(comparison.traitsA ?? []),
        ...(comparison.traitsB ?? []),
        ...(comparison.sharedTraits ?? []),
    ]
        .join(' ')
        .toLowerCase();

    return keywords.some((keyword) =>
        haystack.includes(keyword.toLowerCase())
    );
}

function calculateComparisonPercent(
    comparisons: Comparison[]
) {
    if (!comparisons.length) {
        return 50;
    }

    const points = comparisons.reduce(
        (sum, comparison) => {
            if (comparison.similarity === 'same') {
                return sum + 1;
            }

            if (comparison.similarity === 'close') {
                return sum + 0.55;
            }

            return sum;
        },
        0
    );

    return Math.round(
        (points / comparisons.length) * 100
    );
}

function percentToTen(percent: number) {
    return Math.max(
        0,
        Math.min(
            10,
            Math.round(percent / 10)
        )
    );
}

function calculateYearsTogether(
    categories: Category[],
    overallPercent: number
) {
    if (!categories.length) {
        return 1;
    }

    const average =
        categories.reduce(
            (sum, category) => sum + category.score,
            0
        ) / categories.length;

    const weakest = Math.min(
        ...categories.map((category) => category.score)
    );

    const strongest = Math.max(
        ...categories.map((category) => category.score)
    );

    const normalized =
        average * 0.6 +
        weakest * 0.2 +
        strongest * 0.1 +
        (overallPercent / 10) * 0.1;

    const years = Math.round(
        1 + Math.pow(normalized / 10, 1.55) * 54
    );

    return Math.max(
        1,
        Math.min(55, years)
    );
}

function getForecastPosition(years: number) {
    const normalized = Math.max(
        0,
        Math.min(1, years / 55)
    );

    return 4 + normalized * 92;
}

function getYearWord(years: number) {
    const lastTwo = years % 100;
    const last = years % 10;

    if (
        lastTwo >= 11 &&
        lastTwo <= 14
    ) {
        return 'лет';
    }

    if (last === 1) {
        return 'год';
    }

    if (
        last >= 2 &&
        last <= 4
    ) {
        return 'года';
    }

    return 'лет';
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
        background: #faf7f4 !important;
      }

      body {
        color: #171315;

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
   STYLES
============================================================ */

const styles = `

.page {
  width: 100%;
  min-height: 100vh;

  overflow: hidden;

  background:
    radial-gradient(
      circle at 50% 15%,
      #ffffff 0,
      #faf7f4 44%,
      #f8f4f1 100%
    );

  color: #171315;
}

.result-shell {
  width: min(calc(100% - 40px), 720px);

  margin-left: auto;
  margin-right: auto;

  min-height: 0;
  height: auto;

  display: block;
}

/* ============================================================
   HEADER
============================================================ */

.header {
  height: 76px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0;
}

.brand {
  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 22px;
  font-weight: 700;

  letter-spacing: -0.055em;
}

.couple-names {
  display: flex;
  align-items: center;

  gap: 9px;

  color: #7f777b;

  font-size: 10px;
  font-weight: 700;

  letter-spacing: 0.08em;

  text-transform: uppercase;
}

.couple-names b {
  color: #c03968;
}

/* ============================================================
   SCORES
============================================================ */

.scores {
  padding: 14px 0 28px;
}

.score-row {
  padding: 11px 0;
}

.score-header {
  display: grid;

  grid-template-columns: 1fr auto;

  gap: 20px;

  align-items: end;
}

.score-copy h2 {
  margin: 0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 28px;
  font-weight: 400;

  line-height: 0.95;

  letter-spacing: -0.045em;
}

.score-copy p {
  margin: 5px 0 0;

  color: #888084;

  font-size: 12px;
  line-height: 1.2;
}

.score-number {
  min-width: 75px;

  display: flex;
  align-items: baseline;
  justify-content: flex-end;
}

.score-number strong {
  color: #bb285b;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 43px;
  font-weight: 400;

  line-height: 0.8;

  letter-spacing: -0.06em;
}

.score-number span {
  margin-left: 4px;

  color: #797176;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 20px;
}

.score-track {
  width: 100%;
  height: 7px;

  margin-top: 10px;

  overflow: hidden;

  border-radius: 99px;

  background: #e8e3e3;
}

.score-fill {
  height: 100%;

  border-radius: inherit;

  background:
    linear-gradient(
      90deg,
      #c84170,
      #ca4774
    );
}

/* ============================================================
   FORECAST
============================================================ */

.forecast {
  position: relative;

  padding: 28px 0 34px;

  border-top: 1px solid #ded8d6;
}

.forecast-label {
  margin-bottom: 10px;

  color: #c03a68;

  font-size: 10px;
  font-weight: 700;

  letter-spacing: 0.2em;

  text-transform: uppercase;
}

.forecast-grid {
  display: grid;

  grid-template-columns:
    minmax(0, 1.2fr)
    minmax(230px, 0.8fr);

  gap: 45px;

  align-items: center;
}

.forecast-copy h2 {
  margin: 0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 37px;
  font-weight: 400;

  line-height: 0.98;

  letter-spacing: -0.05em;
}

.forecast-copy p {
  max-width: 380px;

  margin: 11px 0 0;

  color: #898084;

  font-size: 12px;
  line-height: 1.4;
}

.forecast-result {
  padding-top: 4px;
}

.years {
  color: #b51f55;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 67px;

  line-height: 0.9;

  letter-spacing: -0.06em;

  white-space: nowrap;
}

.years span {
  margin-left: 9px;

  font-size: 42px;

  letter-spacing: -0.04em;
}

.forecast-scale {
  margin-top: 19px;
}

.forecast-line {
  position: relative;

  height: 8px;

  border-radius: 99px;

  background: #e5dfe1;
}

.forecast-progress {
  height: 100%;

  border-radius: inherit;

  background: #eca6bc;
}

.forecast-dot {
  position: absolute;

  top: 50%;

  width: 20px;
  height: 20px;

  border-radius: 50%;

  background: #ba2057;

  transform:
    translate(-50%, -50%);
}

.forecast-scale-labels {
  display: flex;
  justify-content: space-between;

  margin-top: 11px;

  color: #8c8488;

  font-size: 10px;
}

/* ============================================================
   PAID
============================================================ */

.paid-section {
  padding: 8px 0 54px;
}

.paid-card {
  position: relative;

  overflow: hidden;

  height: 540px;

  border-radius: 20px;

  background:
    linear-gradient(
      135deg,
      #9f1f4d 0%,
      #b8295d 52%,
      #a62050 100%
    );

  color: #fff8f4;
}

.paid-card::before {
  content: "";

  position: absolute;

  z-index: 0;

  width: 360px;
  height: 360px;

  top: -185px;
  right: -65px;

  border-radius: 50%;

  background: rgba(255, 138, 174, 0.13);
}

/* PAID TOP */

.paid-top {
  position: relative;

  z-index: 10;

  display: grid;

  grid-template-columns: 1.18fr 0.82fr;

  gap: 52px;

  padding: 30px 40px 0;
}

.paid-label {
  margin-bottom: 12px;

  color: #efc5d3;

  font-size: 10px;
  font-weight: 700;

  letter-spacing: 0.18em;

  text-transform: uppercase;
}

.paid-title h2 {
  margin: 0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 44px;
  font-weight: 400;

  line-height: 0.93;

  letter-spacing: -0.055em;
}

.paid-benefits {
  display: flex;
  flex-direction: column;

  gap: 14px;

  padding-top: 8px;
}

.benefit {
  display: grid;

  grid-template-columns: 18px 1fr;

  gap: 9px;

  align-items: start;
}

.benefit-icon {
  color: #ffd0dc;

  font-size: 11px;

  padding-top: 2px;
}

.benefit-text {
  color: #fff8fa;

  font-size: 12px;
  line-height: 1.25;
}

/* ============================================================
   FAIRYTALE
============================================================ */

.fairytale {
  position: absolute;

  z-index: 1;

  left: 0;
  right: 0;

  bottom: 86px;

  height: 275px;

  overflow: hidden;

  pointer-events: none;
}

/* MOON */

.pixel-moon {
  position: absolute;

  z-index: 2;

  top: 26px;
  left: 31%;

  width: 86px;
  height: 86px;

  border-radius: 50%;

  background: #ffd0a9;

  box-shadow:
    0 0 0 8px rgba(255, 209, 170, 0.06),
    0 0 42px rgba(255, 213, 178, 0.25);
}

/* STARS */

.sky-stars i {
  position: absolute;

  z-index: 5;

  color: #ffc96f;

  font-style: normal;
}

.s1 {
  top: 36px;
  left: 15%;

  font-size: 18px;
}

.s2 {
  top: 55px;
  left: 39%;

  font-size: 15px;
}

.s3 {
  top: 76px;
  left: 22%;

  font-size: 15px;
}

.s4 {
  top: 118px;
  left: 36%;

  color: #ff83a8 !important;

  font-size: 15px;
}

/* MOUNTAINS */

.mountains {
  position: absolute;

  z-index: 1;

  left: 0;
  right: 0;
  bottom: 0;

  height: 150px;
}

.mountain {
  position: absolute;

  bottom: 35px;

  width: 240px;
  height: 120px;

  background: #79264b;

  clip-path:
    polygon(
      0 100%,
      28% 38%,
      44% 68%,
      63% 18%,
      100% 100%
    );
}

.mountain-one {
  left: -35px;
}

.mountain-two {
  left: 130px;

  opacity: 0.82;
}

.mountain-three {
  left: 320px;

  opacity: 0.6;
}

/* GROUND */

.ground-shape {
  position: absolute;

  z-index: 3;

  left: -6%;
  right: -6%;

  bottom: -72px;

  height: 155px;

  border-radius: 50% 50% 0 0;

  background: #392739;
}

/* ============================================================
   CASTLE
============================================================ */

.castle {
  position: absolute;

  z-index: 4;

  left: 51%;
  bottom: 42px;

  width: 94px;
  height: 126px;

  transform: translateX(-50%);
}

.castle-body {
  position: absolute;

  bottom: 0;
  left: 17px;

  width: 62px;
  height: 66px;

  background: #302434;

  box-shadow:
    inset 0 0 0 3px #211a24;
}

.castle-body i {
  position: absolute;

  width: 6px;
  height: 10px;

  background: #ffc26c;
}

.castle-body i:nth-child(1) {
  top: 15px;
  left: 10px;
}

.castle-body i:nth-child(2) {
  top: 15px;
  right: 10px;
}

.castle-body i:nth-child(3) {
  bottom: 11px;
  left: 28px;
}

.tower {
  position: absolute;

  bottom: 0;

  width: 23px;

  background: #2c2130;
}

.tower::before {
  content: "";

  position: absolute;

  left: -5px;
  top: -21px;

  width: 0;
  height: 0;

  border-left: 16px solid transparent;
  border-right: 16px solid transparent;
  border-bottom: 24px solid #2c2130;
}

.tower-left {
  left: 0;

  height: 82px;
}

.tower-middle {
  left: 35px;

  height: 110px;
}

.tower-right {
  right: 0;

  height: 78px;
}

.tower span {
  position: absolute;

  top: 18px;
  left: 8px;

  width: 6px;
  height: 10px;

  background: #ffbe66;
}

/* ============================================================
   CHARACTERS
============================================================ */

.characters {
  position: absolute;

  z-index: 8;

  left: 50%;
  bottom: 15px;

  width: 250px;
  height: 165px;

  transform: translateX(-50%);
}

.knight,
.princess {
  position: absolute;

  bottom: 0;

  width: 100px;
  height: 160px;
}

.knight {
  left: 15px;
}

.princess {
  right: 15px;
}

/* KNIGHT */

.knight-head {
  position: absolute;

  z-index: 5;

  top: 6px;
  left: 25px;

  width: 52px;
  height: 54px;

  border: 5px solid #292029;

  border-radius: 46%;

  background: #e9b28d;
}

.knight-hair {
  position: absolute;

  top: -5px;
  left: -5px;

  width: 52px;
  height: 23px;

  border-radius: 50% 50% 20% 20%;

  background: #3b2727;
}

.knight-body {
  position: absolute;

  z-index: 4;

  top: 56px;
  left: 16px;

  width: 70px;
  height: 88px;

  border: 5px solid #292029;

  border-radius: 14px;

  background: #77727b;
}

.knight-cape {
  position: absolute;

  z-index: -1;

  left: -25px;
  top: 1px;

  width: 44px;
  height: 92px;

  border: 5px solid #292029;

  border-radius: 40% 0 0 40%;

  background: #8d244d;
}

.knight-arm {
  position: absolute;

  right: -33px;
  top: 28px;

  width: 42px;
  height: 18px;

  border: 5px solid #292029;

  border-radius: 10px;

  background: #77727b;

  transform: rotate(-8deg);
}

/* PRINCESS */

.princess-head {
  position: absolute;

  z-index: 6;

  top: 6px;
  right: 25px;

  width: 52px;
  height: 54px;

  border: 5px solid #2a2028;

  border-radius: 46%;

  background: #e9b28d;
}

.princess-hair {
  position: absolute;

  z-index: -1;

  top: -5px;
  left: -5px;

  width: 52px;
  height: 64px;

  border-radius: 50% 50% 25% 25%;

  background: #d39b43;
}

.crown {
  position: absolute;

  z-index: 10;

  top: -20px;
  right: 35px;

  color: #ffd25f;

  font-size: 27px;
}

.princess-body {
  position: absolute;

  z-index: 4;

  top: 56px;
  right: 10px;

  width: 82px;
  height: 100px;
}

.princess-dress {
  position: absolute;

  left: 50%;
  bottom: 0;

  width: 92px;
  height: 96px;

  border: 5px solid #2a2028;

  background: #d96d91;

  clip-path:
    polygon(
      34% 0,
      66% 0,
      100% 100%,
      0 100%
    );

  transform: translateX(-50%);
}

.pixel-heart {
  position: absolute;

  z-index: 12;

  left: 50%;
  top: 74px;

  color: #ff7ca6;

  font-size: 20px;

  transform: translateX(-50%);
}

/* ============================================================
   CTA
============================================================ */

.paid-bottom {
  position: absolute;

  z-index: 30;

  left: 28px;
  right: 28px;
  bottom: 18px;

  width: auto;
}

.buy-button {
  width: 100%;

  display: grid;

  grid-template-columns:
    1fr auto auto;

  gap: 18px;

  align-items: center;

  padding: 17px 22px;

  border: 0;
  border-radius: 13px;

  background: #fffaf7;

  color: #181316;

  cursor: pointer;

  box-shadow:
    0 10px 28px rgba(72, 16, 39, 0.13);

  transition:
    transform 0.15s ease,
    background 0.15s ease;
}

.buy-button:hover {
  transform: translateY(-2px);

  background: #ffffff;
}

.buy-button span {
  text-align: left;

  font-size: 13px;
  font-weight: 700;
}

.buy-button strong {
  color: #b52056;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 21px;
  font-weight: 400;

  white-space: nowrap;
}

.buy-button i {
  color: #bd285d;

  font-size: 23px;
  font-style: normal;
}

.paid-note {
  margin-top: 8px;

  color: #edbdcd;

  font-size: 9px;

  text-align: center;
}

/* ============================================================
   STATE
============================================================ */

.state-page {
  min-height: 100svh;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  padding: 30px;

  background: #faf7f4;

  text-align: center;
}

.state-brand {
  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 23px;
  font-weight: 700;
}

.state-page h1 {
  max-width: 420px;

  margin: 25px 0 0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 38px;
  font-weight: 400;

  line-height: 1;
}

.state-page p {
  margin-top: 13px;

  color: #8a8285;

  font-size: 13px;
}

.loader {
  display: flex;

  margin-bottom: 25px;
}

.loader span {
  width: 52px;
  height: 52px;

  border-radius: 50%;

  background: #e2b4c4;
}

.loader span:last-child {
  margin-left: -14px;

  background: #b36380;
}

/* ============================================================
   MOBILE
============================================================ */

@media (max-width: 650px) {
  .result-shell {
    width: calc(100% - 30px);
  }

  .header {
    height: 66px;
  }

  .brand {
    font-size: 20px;
  }

  .couple-names {
    font-size: 9px;
  }

  .scores {
    padding-top: 9px;
    padding-bottom: 25px;
  }

  .score-row {
    padding: 11px 0 10px;
  }

  .score-copy h2 {
    font-size: 24px;
  }

  .score-copy p {
    font-size: 10px;
  }

  .score-number {
    min-width: 62px;
  }

  .score-number strong {
    font-size: 37px;
  }

  .score-number span {
    font-size: 17px;
  }

  .score-track {
    height: 6px;

    margin-top: 9px;
  }

  .forecast {
    padding:
      27px 0
      30px;
  }

  .forecast-grid {
    grid-template-columns: 1fr;

    gap: 22px;
  }

  .forecast-copy h2 {
    font-size: 34px;
  }

  .forecast-copy p {
    font-size: 11px;
  }

  .years {
    font-size: 61px;
  }

  .years span {
    font-size: 37px;
  }

  .forecast-result {
    padding: 0;
  }

  .paid-section {
    padding-top: 5px;
    padding-bottom: 30px;
  }

  .paid-card {
    height: 650px;

    border-radius: 16px;
  }

  .paid-top {
    grid-template-columns: 1fr;

    gap: 18px;

    padding:
      24px 22px
      0;
  }

  .paid-title h2 {
    font-size: 39px;
  }

  .paid-benefits {
    display: grid;

    grid-template-columns:
      1fr 1fr;

    gap: 11px 13px;

    padding: 0;
  }

  .benefit {
    grid-template-columns:
      14px 1fr;

    gap: 6px;
  }

  .benefit-text {
    font-size: 10px;
  }

  .fairytale {
    bottom: 81px;

    height: 285px;
  }

  .pixel-moon {
    left: 20%;

    width: 72px;
    height: 72px;
  }

  .mountain-one {
    left: -75px;
  }

  .mountain-two {
    left: 70px;
  }

  .mountain-three {
    left: 210px;
  }

  .castle {
    left: 68%;
    bottom: 40px;

    transform:
      translateX(-50%)
      scale(0.82);

    transform-origin:
      bottom center;
  }

  .characters {
    left: 39%;
    bottom: 11px;

    transform:
      translateX(-50%)
      scale(0.82);

    transform-origin:
      bottom center;
  }

  .paid-bottom {
    left: 15px;
    right: 15px;
    bottom: 14px;
  }

  .buy-button {
    gap: 9px;

    padding: 15px 14px;
  }

  .buy-button span {
    font-size: 10px;
  }

  .buy-button strong {
    font-size: 17px;
  }

  .buy-button i {
    font-size: 19px;
  }

  .paid-note {
    font-size: 8px;
  }
}

`;