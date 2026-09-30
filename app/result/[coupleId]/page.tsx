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

                        <img
                            className="paid-image"
                            src="/images/full-report-scene.png"
                            alt=""
                        />

                        <div className="paid-overlay" />

                        <div className="paid-content">

                            <div className="paid-heading">
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
                                <Benefit icon="♥">
                                    Где вы можете
                                    <br />
                                    не понимать друг друга
                                </Benefit>

                                <Benefit icon="▰">
                                    Что каждый ждёт
                                    <br />
                                    от отношений
                                </Benefit>

                                <Benefit icon="ϟ">
                                    Что может стать
                                    <br />
                                    причиной ссор
                                </Benefit>

                                <Benefit icon="▥">
                                    Как сделать вашу
                                    <br />
                                    пару крепче
                                </Benefit>
                            </div>

                        </div>

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
   SCORE
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
                     icon,
                     children,
                 }: {
    icon: string;
    children: ReactNode;
}) {
    return (
        <div className="benefit">
            <div className="benefit-icon">
                {icon}
            </div>

            <div className="benefit-text">
                {children}
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
}

/* ============================================================
   HEADER
============================================================ */

.header {
  height: 76px;

  display: flex;
  align-items: center;
  justify-content: space-between;
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

  background: #c84170;
}

/* ============================================================
   FORECAST
============================================================ */

.forecast {
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
   PAID CARD
============================================================ */

.paid-section {
  padding: 8px 0 54px;
}

.paid-card {
  position: relative;

  width: 100%;
  height: 420px;

  overflow: hidden;

  border-radius: 20px;

  background: #a71f50;

  color: white;

  isolation: isolate;
}

/* IMAGE */

.paid-image {
  position: absolute;

  z-index: 1;

  inset: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;

  object-position: center;

  display: block;
}

/*
  Небольшой градиент нужен только для читаемости текста.
  Сама картинка остаётся хорошо видимой.
*/

.paid-overlay {
  position: absolute;

  z-index: 2;

  inset: 0;

  background:
    linear-gradient(
      90deg,
      rgba(79, 17, 45, 0.10) 0%,
      rgba(79, 17, 45, 0.03) 45%,
      rgba(91, 17, 50, 0.30) 66%,
      rgba(91, 17, 50, 0.48) 100%
    );

  pointer-events: none;
}

/* CONTENT */

.paid-content {
  position: relative;

  z-index: 5;

  display: grid;

  grid-template-columns:
    minmax(0, 1.05fr)
    minmax(230px, 0.95fr);

  gap: 55px;

  height: 100%;

  padding:
    28px
    36px
    105px;
}

.paid-label {
  margin-bottom: 12px;

  color: #f1cad6;

  font-size: 10px;
  font-weight: 700;

  letter-spacing: 0.18em;

  text-transform: uppercase;
}

.paid-heading h2 {
  margin: 0;

  color: #fff8f5;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 41px;
  font-weight: 400;

  line-height: 0.94;

  letter-spacing: -0.055em;

  text-shadow:
    0 2px 14px rgba(65, 9, 32, 0.12);
}

/* BENEFITS */

.paid-benefits {
  display: flex;
  flex-direction: column;

  gap: 15px;

  padding-top: 4px;
}

.benefit {
  display: grid;

  grid-template-columns: 23px 1fr;

  gap: 8px;

  align-items: start;
}

.benefit-icon {
  color: #ffd1df;

  font-size: 15px;
  font-weight: 700;

  line-height: 1;
}

.benefit-text {
  color: #fff8fa;

  font-size: 12px;
  line-height: 1.25;

  text-shadow:
    0 1px 8px rgba(75, 9, 34, 0.25);
}

/* CTA */

.paid-bottom {
  position: absolute;

  z-index: 20;

  left: 36px;
  right: 36px;
  bottom: 18px;
}

.buy-button {
  width: 100%;

  display: grid;

  grid-template-columns:
    1fr auto auto;

  gap: 20px;

  align-items: center;

  min-height: 60px;

  padding: 14px 20px;

  border: 0;
  border-radius: 13px;

  background: #fffaf7;

  color: #181316;

  cursor: pointer;

  box-shadow:
    0 10px 28px rgba(72, 16, 39, 0.18);

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
  margin-top: 7px;

  color: rgba(255, 232, 239, 0.76);

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
    padding:
      9px 0
      25px;
  }

  .score-row {
    padding:
      11px 0
      10px;
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
  }

  /* FORECAST */

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

  /* PAID */

  .paid-section {
    padding:
      5px 0
      30px;
  }

  .paid-card {
    height: 570px;

    border-radius: 17px;
  }

  /*
    На телефоне картинка немного смещается влево:
    персонажи остаются в кадре,
    а справа появляется место под текст.
  */

  .paid-image {
    object-position: 39% center;
  }

  .paid-overlay {
    background:
      linear-gradient(
        180deg,
        rgba(83, 13, 43, 0.12) 0%,
        rgba(83, 13, 43, 0.08) 40%,
        rgba(83, 13, 43, 0.26) 68%,
        rgba(83, 13, 43, 0.58) 100%
      );
  }

  .paid-content {
    display: block;

    padding:
      23px
      20px
      110px;
  }

  .paid-label {
    margin-bottom: 9px;

    font-size: 9px;
  }

  .paid-heading h2 {
    max-width: 290px;

    font-size: 36px;
  }

  /*
    На мобиле преимущества делаем компактной
    сеткой внизу картинки, чтобы они не закрывали
    персонажей и замок.
  */

  .paid-benefits {
    position: absolute;

    left: 20px;
    right: 20px;

    bottom: 110px;

    display: grid;

    grid-template-columns:
      1fr 1fr;

    gap:
      9px
      14px;

    padding: 12px;

    border-radius: 12px;

    background:
      rgba(82, 18, 46, 0.54);

    backdrop-filter:
      blur(5px);
  }

  .benefit {
    grid-template-columns:
      15px 1fr;

    gap: 6px;
  }

  .benefit-icon {
    font-size: 11px;
  }

  .benefit-text {
    font-size: 9px;

    line-height: 1.25;
  }

  .paid-bottom {
    left: 12px;
    right: 12px;
    bottom: 11px;
  }

  .buy-button {
    min-height: 55px;

    gap: 8px;

    padding:
      13px
      14px;
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
    margin-top: 6px;

    font-size: 8px;
  }
}

`;