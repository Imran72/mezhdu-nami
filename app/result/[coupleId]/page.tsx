"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { ReactNode } from "react";

type Couple = {
    id: string;
    partner_a_name?: string | null;
    partner_b_name?: string | null;
    partner_a_completed?: boolean;
    partner_b_completed?: boolean;
};

type ApiResponse = {
    waiting?: boolean;
    couple?: Couple;
    comparisons?: unknown[];
    scores?: {
        overall?: number;
        sameAnswers?: number;
        closeAnswers?: number;
        differentAnswers?: number;
    };
};

type CategoryScore = {
    title: string;
    subtitle: string;
    value: number;
};

const MAX_SCORE = 10;

// Картинка:
// public/images/full-report-couple.png
const PAID_IMAGE = "/images/full-report-couple.png";

export default function ResultPage() {
    const params = useParams();
    const router = useRouter();

    const coupleId = String(params.coupleId ?? "");

    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!coupleId) return;

        let cancelled = false;

        async function loadResult() {
            try {
                const response = await fetch(
                    `/api/report?id=${encodeURIComponent(coupleId)}`,
                    {
                        cache: "no-store",
                    }
                );

                if (!response.ok) {
                    throw new Error("Не удалось загрузить результат");
                }

                const result = (await response.json()) as ApiResponse;

                if (cancelled) return;

                if (result.waiting) {
                    router.replace(`/waiting/${coupleId}`);
                    return;
                }

                setData(result);
            } catch (error) {
                console.error(error);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadResult();

        return () => {
            cancelled = true;
        };
    }, [coupleId, router]);

    const categories = useMemo<CategoryScore[]>(() => {
        const same = data?.scores?.sameAnswers ?? 0;
        const close = data?.scores?.closeAnswers ?? 0;
        const different = data?.scores?.differentAnswers ?? 0;

        const total = Math.max(same + close + different, 1);

        const base = Math.round(
            ((same + close * 0.5) / total) * MAX_SCORE
        );

        const clamp = (value: number) =>
            Math.max(0, Math.min(MAX_SCORE, value));

        return [
            {
                title: "Дружба",
                subtitle: "хорошо ли вам просто вдвоём",
                value: clamp(base + 1),
            },
            {
                title: "Партнёрство",
                subtitle: "вы команда или каждый сам за себя",
                value: clamp(base),
            },
            {
                title: "Секс",
                subtitle: "совпадает ли ваше представление о близости",
                value: clamp(base + 2),
            },
            {
                title: "Деньги",
                subtitle: "одинаково ли вы смотрите на траты",
                value: clamp(base - 2),
            },
            {
                title: "Забота",
                subtitle: "понимаете ли вы «я рядом» одинаково",
                value: clamp(base + 1),
            },
            {
                title: "Быт",
                subtitle: "как вам живётся в обычный вторник",
                value: clamp(base - 1),
            },
        ];
    }, [data]);

    const yearsForecast = useMemo(() => {
        const overall = data?.scores?.overall ?? 50;

        if (overall >= 85) return 45;
        if (overall >= 75) return 28;
        if (overall >= 65) return 16;
        if (overall >= 55) return 10;
        if (overall >= 45) return 6;
        if (overall >= 35) return 3;

        return 1;
    }, [data]);

    const forecastPosition = useMemo(() => {
        const maxYears = 60;

        return Math.max(
            4,
            Math.min(96, (yearsForecast / maxYears) * 100)
        );
    }, [yearsForecast]);

    const nameA = data?.couple?.partner_a_name || "Вы";
    const nameB = data?.couple?.partner_b_name || "Партнёр";

    if (loading) {
        return (
            <main className="loading-screen">
                <div className="loading-brand">между нами.</div>

                <style jsx>{`
          .loading-screen {
            min-height: 100vh;
            display: grid;
            place-items: center;
            background: #f8f4f1;
            color: #211d1f;
          }

          .loading-brand {
            font-family: Georgia, "Times New Roman", serif;
            font-size: 30px;
            font-weight: 700;
          }
        `}</style>
            </main>
        );
    }

    if (!data) {
        return (
            <main className="loading-screen">
                Не получилось загрузить результат.

                <style jsx>{`
          .loading-screen {
            min-height: 100vh;
            display: grid;
            place-items: center;
            background: #f8f4f1;
            color: #211d1f;
            font-family: Arial, Helvetica, sans-serif;
          }
        `}</style>
            </main>
        );
    }

    return (
        <main className="page">
            <div className="content-shell">
                {/* HEADER */}

                <header className="header">
                    <div className="brand">между нами.</div>

                    <div className="couple-names">
                        {nameA}
                        <span>×</span>
                        {nameB}
                    </div>
                </header>

                {/* RESULTS */}

                <section className="results">
                    <div className="section-label">
                        ВАШ РЕЗУЛЬТАТ
                    </div>

                    <h1 className="results-title">
                        Вот что получилось
                    </h1>

                    <div className="category-list">
                        {categories.map((category) => (
                            <CategoryRow
                                key={category.title}
                                {...category}
                            />
                        ))}
                    </div>
                </section>

                {/* FORECAST */}

                <section className="forecast">
                    <div className="forecast-copy">
                        <div className="section-label">
                            ПРОГНОЗ
                        </div>

                        <h2 className="forecast-title">
                            Ориентировочная
                            <br className="desktop-break" />
                            {" "}длительность
                            <br className="desktop-break" />
                            {" "}ваших отношений
                        </h2>

                        <p className="forecast-description">
                            На основе ваших ответов мы оценили
                            ориентировочный сценарий длительности
                            ваших отношений.
                        </p>
                    </div>

                    <div className="forecast-result">
                        <div className="years">
                            <strong>{yearsForecast}</strong>

                            <span>
                {getYearWord(yearsForecast)}
              </span>
                        </div>

                        <div className="forecast-scale">
                            <div className="scale-track">
                                <div
                                    className="scale-fill"
                                    style={{
                                        width: `${forecastPosition}%`,
                                    }}
                                />

                                <div
                                    className="scale-dot"
                                    style={{
                                        left: `${forecastPosition}%`,
                                    }}
                                />
                            </div>

                            <div className="scale-labels">
                                <span>1 месяц</span>
                                <span>вся жизнь</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* ======================================================
          PAID BLOCK

          Специально шире основной части.
      ====================================================== */}

            <section className="paid-shell">
                <div className="paid-card">
                    {/* IMAGE */}

                    <div
                        className="paid-image"
                        style={{
                            backgroundImage: `url("${PAID_IMAGE}")`,
                        }}
                    />

                    {/* Плавное растворение картинки */}

                    <div className="paid-gradient" />

                    {/* Дымка для читаемости */}

                    <div className="paid-vignette" />

                    {/* TITLE */}

                    <div className="paid-heading">
                        <div className="paid-label">
                            ПОЛНЫЙ РАЗБОР
                        </div>

                        <h2>
                            Чтобы вместе —
                            <br />
                            и надолго.
                        </h2>
                    </div>

                    {/* BENEFITS */}

                    <div className="paid-benefits">
                        <Benefit
                            icon="♥"
                            text={
                                <>
                                    Где вы можете
                                    <br />
                                    не понимать друг друга
                                </>
                            }
                        />

                        <Benefit
                            icon="▰"
                            text={
                                <>
                                    Что каждый ждёт
                                    <br />
                                    от отношений
                                </>
                            }
                        />

                        <Benefit
                            icon="ϟ"
                            text={
                                <>
                                    Что может стать
                                    <br />
                                    причиной ссор
                                </>
                            }
                        />

                        <Benefit
                            icon="▥"
                            text={
                                <>
                                    Как сделать вашу
                                    <br />
                                    пару крепче
                                </>
                            }
                        />
                    </div>

                    {/* CTA */}

                    <div className="paid-bottom">
                        <button
                            type="button"
                            className="paid-cta"
                            onClick={() =>
                                router.push(`/report/${coupleId}`)
                            }
                        >
              <span className="cta-title">
                Открыть полный разбор
              </span>

                            <span className="cta-right">
                <span className="price">
                  299 ₽
                </span>

                <span className="arrow">
                  →
                </span>
              </span>
                        </button>

                        <div className="paid-note">
                            один разбор · для вас двоих · сразу после оплаты
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
        :global(*) {
          box-sizing: border-box;
        }

        :global(html) {
          background: #f8f4f1;
        }

        :global(body) {
          margin: 0;
          background: #f8f4f1;
          color: #201c1e;
        }

        button {
          font: inherit;
        }

        .page {
          width: 100%;
          min-height: 100vh;

          padding: 0 28px 72px;

          overflow: hidden;

          background: #f8f4f1;
        }

        /*
         * Результаты специально узкие.
         */

        .content-shell {
          width: min(720px, 100%);
          margin: 0 auto;
        }

        /*
         * Paid блок шире.
         */

        .paid-shell {
          width: min(1120px, 100%);
          margin: 8px auto 0;
        }

        /* =====================================================
           HEADER
        ===================================================== */

        .header {
          min-height: 78px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          border-bottom: 1px solid #ddd5d2;
        }

        .brand {
          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 24px;
          line-height: 1;
          font-weight: 700;

          letter-spacing: -1.1px;
        }

        .couple-names {
          display: flex;
          align-items: center;

          gap: 9px;

          color: #8f8588;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 10px;
          font-weight: 700;

          letter-spacing: 1.2px;

          text-transform: uppercase;
        }

        .couple-names span {
          color: #c2215a;
        }

        /* =====================================================
           RESULTS
        ===================================================== */

        .results {
          padding: 42px 0 45px;
        }

        .section-label {
          margin-bottom: 13px;

          color: #c2215a;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 10px;
          line-height: 1;
          font-weight: 800;

          letter-spacing: 2.2px;
        }

        .results-title {
          margin: 0 0 32px;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 48px;
          line-height: 0.98;
          font-weight: 400;

          letter-spacing: -2.5px;
        }

        .category-list {
          display: flex;
          flex-direction: column;
        }

        /* =====================================================
           FORECAST
        ===================================================== */

        .forecast {
          padding: 38px 0 46px;

          display: grid;

          grid-template-columns:
            minmax(0, 1.12fr)
            minmax(225px, 0.88fr);

          gap: 42px;

          align-items: center;

          border-top: 1px solid #dcd4d1;
        }

        .forecast-title {
          margin: 0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 35px;
          line-height: 1.02;
          font-weight: 400;

          letter-spacing: -1.8px;
        }

        .forecast-description {
          max-width: 390px;

          margin: 12px 0 0;

          color: #8d8587;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 12px;
          line-height: 1.45;
          font-weight: 500;
        }

        .forecast-result {
          min-width: 0;
        }

        .years {
          display: flex;
          align-items: baseline;

          color: #c21856;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          white-space: nowrap;
        }

        .years strong {
          font-size: 68px;
          line-height: 0.88;
          font-weight: 400;

          letter-spacing: -4px;
        }

        .years span {
          margin-left: 8px;

          font-size: 37px;
          line-height: 1;

          letter-spacing: -1.5px;
        }

        .forecast-scale {
          margin-top: 20px;
        }

        .scale-track {
          position: relative;

          height: 8px;

          border-radius: 999px;

          background: #e5dfe0;
        }

        .scale-fill {
          position: absolute;

          inset: 0 auto 0 0;

          border-radius: inherit;

          background: #e99ab5;
        }

        .scale-dot {
          position: absolute;

          top: 50%;

          width: 20px;
          height: 20px;

          border-radius: 50%;

          background: #c21856;

          transform: translate(-50%, -50%);
        }

        .scale-labels {
          display: flex;
          justify-content: space-between;

          margin-top: 11px;

          color: #8d8587;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 10px;
          font-weight: 600;
        }

        /* =====================================================
           PAID
        ===================================================== */

        .paid-card {
          position: relative;

          width: 100%;
          height: 540px;

          overflow: hidden;

          border-radius: 24px;

          background: #9f1248;

          color: #fff;

          isolation: isolate;
        }

        /*
         * DESKTOP:
         *
         * Картинка занимает ВСЮ карточку.
         * Никакой физической границы image/background.
         */

        .paid-image {
          position: absolute;

          inset: 0;

          z-index: 0;

          background-repeat: no-repeat;
          background-size: cover;
          background-position: 39% center;

          background-color: #9f1248;
        }

        /*
         * Длинный переход.
         *
         * Картинка начинает исчезать примерно
         * после середины и полностью уходит
         * только в правой части.
         */

        .paid-gradient {
          position: absolute;

          inset: 0;

          z-index: 1;

          pointer-events: none;

          background:
            linear-gradient(
              90deg,
              rgba(157, 18, 72, 0) 0%,
              rgba(157, 18, 72, 0) 35%,
              rgba(157, 18, 72, 0.05) 42%,
              rgba(157, 18, 72, 0.14) 48%,
              rgba(157, 18, 72, 0.28) 54%,
              rgba(157, 18, 72, 0.48) 60%,
              rgba(157, 18, 72, 0.68) 66%,
              rgba(157, 18, 72, 0.84) 72%,
              rgba(157, 18, 72, 0.94) 79%,
              #9d1248 88%,
              #9d1248 100%
            );
        }

        .paid-vignette {
          position: absolute;

          inset: 0;

          z-index: 2;

          pointer-events: none;

          background:
            linear-gradient(
              180deg,
              rgba(49, 4, 24, 0.12) 0%,
              rgba(49, 4, 24, 0.02) 35%,
              rgba(49, 4, 24, 0.04) 67%,
              rgba(49, 4, 24, 0.22) 100%
            );
        }

        /* TITLE */

        .paid-heading {
          position: absolute;

          z-index: 3;

          top: 42px;
          left: 50px;

          width: 440px;
        }

        .paid-label {
          margin-bottom: 13px;

          color: rgba(255, 242, 246, 0.84);

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 11px;
          line-height: 1;
          font-weight: 800;

          letter-spacing: 2.4px;
        }

        .paid-heading h2 {
          margin: 0;

          color: #fff9f6;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 55px;
          line-height: 0.95;
          font-weight: 400;

          letter-spacing: -2.8px;

          text-shadow:
            0 2px 20px rgba(59, 2, 26, 0.15);
        }

        /* BENEFITS */

        .paid-benefits {
          position: absolute;

          z-index: 4;

          top: 48px;
          right: 46px;

          width: 285px;

          display: flex;
          flex-direction: column;

          gap: 24px;
        }

        /* BOTTOM */

        .paid-bottom {
          position: absolute;

          z-index: 5;

          right: 42px;
          bottom: 23px;

          width: 58%;
        }

        .paid-cta {
          width: 100%;
          min-height: 76px;

          padding: 0 25px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 20px;

          border: 0;
          border-radius: 17px;

          background: #fffaf8;

          color: #211d1f;

          cursor: pointer;

          box-shadow:
            0 11px 30px rgba(69, 0, 28, 0.16);

          transition:
            transform 150ms ease,
            box-shadow 150ms ease;
        }

        .paid-cta:hover {
          transform: translateY(-2px);

          box-shadow:
            0 15px 36px rgba(69, 0, 28, 0.22);
        }

        .cta-title {
          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 15px;
          font-weight: 800;
        }

        .cta-right {
          display: flex;
          align-items: center;

          gap: 19px;

          color: #c21856;
        }

        .price {
          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 29px;
          line-height: 1;

          white-space: nowrap;
        }

        .arrow {
          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 28px;
          font-weight: 300;
        }

        .paid-note {
          margin-top: 8px;

          color: rgba(255, 239, 244, 0.67);

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 9px;
          font-weight: 500;

          text-align: center;
        }

        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 900px) {
          .page {
            padding-left: 20px;
            padding-right: 20px;
          }

          .paid-card {
            height: 520px;
          }

          .paid-heading {
            left: 36px;
            top: 36px;

            width: 360px;
          }

          .paid-heading h2 {
            font-size: 48px;
          }

          .paid-benefits {
            top: 42px;
            right: 30px;

            width: 245px;

            gap: 20px;
          }

          .paid-bottom {
            left: 34px;
            right: 34px;

            width: auto;
          }
        }

        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 640px) {
          .page {
            padding:
              0
              15px
              32px;
          }

          .content-shell,
          .paid-shell {
            width: 100%;
          }

          /* HEADER */

          .header {
            min-height: 64px;
          }

          .brand {
            font-size: 21px;
          }

          .couple-names {
            max-width: 52%;

            gap: 6px;

            overflow: hidden;

            font-size: 8px;
            letter-spacing: 0.8px;

            white-space: nowrap;
          }

          /* RESULTS */

          .results {
            padding:
              29px 0
              33px;
          }

          .section-label {
            margin-bottom: 11px;

            font-size: 9px;

            letter-spacing: 1.8px;
          }

          .results-title {
            margin-bottom: 24px;

            font-size: 37px;
            line-height: 1;

            letter-spacing: -1.8px;
          }

          /* ============================
             FORECAST MOBILE

             ВАЖНО:
             всё теперь обычным потоком.
             Никаких двух колонок.
          ============================ */

          .forecast {
            padding:
              29px 0
              37px;

            display: block;
          }

          .forecast-copy {
            width: 100%;
          }

          .forecast-title {
            max-width: 340px;

            font-size: 31px;
            line-height: 1.03;

            letter-spacing: -1.35px;
          }

          .desktop-break {
            display: none;
          }

          .forecast-description {
            max-width: 325px;

            margin-top: 12px;

            font-size: 12px;
            line-height: 1.45;
          }

          .forecast-result {
            width: 100%;

            margin-top: 24px;
          }

          .years {
            width: 100%;

            display: flex;
            align-items: baseline;

            white-space: nowrap;
          }

          .years strong {
            font-size: 62px;
            line-height: 0.85;

            letter-spacing: -3px;
          }

          .years span {
            margin-left: 7px;

            font-size: 33px;

            letter-spacing: -1px;
          }

          .forecast-scale {
            width: 100%;

            margin-top: 19px;
          }

          .scale-track {
            height: 7px;
          }

          .scale-dot {
            width: 19px;
            height: 19px;
          }

          .scale-labels {
            margin-top: 10px;

            font-size: 9px;
          }

          /* ============================
             PAID MOBILE

             Картинка сверху.
             Вся пара остаётся рядом.
             Потом изображение растворяется вниз.
          ============================ */

          .paid-shell {
            margin-top: 0;
          }

          .paid-card {
            height: 670px;

            border-radius: 19px;

            background: #9d1248;
          }

          /*
           * Картинка занимает верхнюю часть.
           *
           * contain здесь важнее cover:
           * нам нужно сохранить обоих персонажей
           * в кадре, а не заполнить экран любой ценой.
           */

          .paid-image {
            top: 0;
            right: 0;
            bottom: auto;
            left: 0;

            height: 405px;

            background-size: cover;

            /*
             * Смещаем фокус ближе к центру пары.
             */
            background-position: 37% center;

            background-color: #9d1248;
          }

          /*
           * Верхняя картинка постепенно
           * растворяется ВНИЗ.
           *
           * Переход длинный — без резкой полосы.
           */

          .paid-gradient {
            background:
              linear-gradient(
                180deg,
                rgba(157, 18, 72, 0) 0%,
                rgba(157, 18, 72, 0) 31%,
                rgba(157, 18, 72, 0.04) 37%,
                rgba(157, 18, 72, 0.12) 42%,
                rgba(157, 18, 72, 0.26) 47%,
                rgba(157, 18, 72, 0.46) 52%,
                rgba(157, 18, 72, 0.68) 57%,
                rgba(157, 18, 72, 0.84) 62%,
                rgba(157, 18, 72, 0.95) 67%,
                #9d1248 73%,
                #9d1248 100%
              );
          }

          .paid-vignette {
            background:
              linear-gradient(
                180deg,
                rgba(51, 3, 25, 0.12) 0%,
                rgba(51, 3, 25, 0.01) 27%,
                rgba(51, 3, 25, 0) 48%,
                rgba(51, 3, 25, 0.06) 62%,
                rgba(51, 3, 25, 0.14) 100%
              );
          }

          /* TITLE */

          .paid-heading {
            top: 24px;
            left: 22px;
            right: 22px;

            width: auto;
          }

          .paid-label {
            margin-bottom: 9px;

            font-size: 8px;

            letter-spacing: 1.8px;
          }

          .paid-heading h2 {
            max-width: 290px;

            font-size: 38px;
            line-height: 0.96;

            letter-spacing: -1.8px;
          }

          /*
           * Benefits уже находятся
           * в чистой бордовой части.
           *
           * Никаких пересечений с заголовком.
           */

          .paid-benefits {
            top: 415px;
            left: 22px;
            right: 22px;

            width: auto;

            display: grid;

            grid-template-columns:
              minmax(0, 1fr)
              minmax(0, 1fr);

            gap:
              15px
              17px;
          }

          /*
           * CTA теперь отдельным нижним слоем,
           * не может залезть на benefits.
           */

          .paid-bottom {
            left: 13px;
            right: 13px;
            bottom: 10px;

            width: auto;
          }

          .paid-cta {
            min-height: 59px;

            padding:
              0
              16px;

            gap: 8px;

            border-radius: 14px;
          }

          .cta-title {
            font-size: 11px;

            text-align: left;
          }

          .cta-right {
            gap: 9px;
          }

          .price {
            font-size: 21px;
          }

          .arrow {
            font-size: 21px;
          }

          .paid-note {
            margin-top: 6px;

            font-size: 7px;
          }
        }

        /* =====================================================
           SMALL PHONE
        ===================================================== */

        @media (max-width: 390px) {
          .results-title {
            font-size: 35px;
          }

          .forecast-title {
            max-width: 310px;

            font-size: 29px;
          }

          .years strong {
            font-size: 58px;
          }

          .years span {
            font-size: 30px;
          }

          .paid-card {
            height: 650px;
          }

          .paid-image {
            height: 390px;

            /*
             * На совсем узких экранах
             * чуть двигаем сцену вправо,
             * чтобы персонажи держались вместе.
             */
            background-position: 35% center;
          }

          .paid-heading h2 {
            font-size: 35px;
          }

          .paid-benefits {
            top: 395px;

            gap:
              13px
              12px;
          }

          .paid-cta {
            min-height: 57px;
          }

          .cta-title {
            max-width: 125px;

            font-size: 10px;
          }

          .price {
            font-size: 20px;
          }
        }
      `}</style>
        </main>
    );
}

/* ============================================================
   CATEGORY
============================================================ */

function CategoryRow({
                         title,
                         subtitle,
                         value,
                     }: CategoryScore) {
    const safeValue = Math.max(
        0,
        Math.min(MAX_SCORE, value)
    );

    return (
        <div className="category-row">
            <div className="category-top">
                <div className="category-copy">
                    <div className="category-title">
                        {title}
                    </div>

                    <div className="category-subtitle">
                        {subtitle}
                    </div>
                </div>

                <div className="category-score">
                    <strong>{safeValue}</strong>
                    <span>/10</span>
                </div>
            </div>

            <div className="category-track">
                <div
                    className="category-fill"
                    style={{
                        width: `${safeValue * 10}%`,
                    }}
                />
            </div>

            <style jsx>{`
        .category-row {
          padding: 16px 0 18px;

          border-bottom:
            1px solid #e0d9d6;
        }

        .category-row:first-child {
          padding-top: 0;
        }

        .category-top {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;

          gap: 24px;
        }

        .category-copy {
          min-width: 0;
        }

        .category-title {
          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 27px;
          line-height: 1;

          letter-spacing: -1.1px;
        }

        .category-subtitle {
          margin-top: 5px;

          color: #8e8688;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 11px;
          line-height: 1.3;

          font-weight: 500;
        }

        .category-score {
          display: flex;
          align-items: baseline;

          flex-shrink: 0;

          color: #7f7679;

          font-family:
            Georgia,
            "Times New Roman",
            serif;
        }

        .category-score strong {
          color: #c21856;

          font-size: 40px;
          line-height: 0.8;
          font-weight: 400;

          letter-spacing: -1.7px;
        }

        .category-score span {
          margin-left: 3px;

          font-size: 17px;
        }

        .category-track {
          height: 6px;

          margin-top: 11px;

          overflow: hidden;

          border-radius: 999px;

          background: #e5dfdf;
        }

        .category-fill {
          height: 100%;

          border-radius: inherit;

          background: #cb3a6d;
        }

        @media (max-width: 640px) {
          .category-row {
            padding:
              13px 0
              15px;
          }

          .category-top {
            gap: 15px;
          }

          .category-title {
            font-size: 24px;
          }

          .category-subtitle {
            max-width: 235px;

            margin-top: 4px;

            font-size: 10px;
          }

          .category-score strong {
            font-size: 34px;
          }

          .category-score span {
            font-size: 14px;
          }

          .category-track {
            height: 5px;

            margin-top: 10px;
          }
        }
      `}</style>
        </div>
    );
}

/* ============================================================
   BENEFIT
============================================================ */

function Benefit({
                     icon,
                     text,
                 }: {
    icon: string;
    text: ReactNode;
}) {
    return (
        <div className="benefit">
            <div className="benefit-icon">
                {icon}
            </div>

            <div className="benefit-text">
                {text}
            </div>

            <style jsx>{`
        .benefit {
          display: grid;

          grid-template-columns:
            24px
            minmax(0, 1fr);

          gap: 11px;

          align-items: start;

          color: #fff8f6;
        }

        .benefit-icon {
          padding-top: 1px;

          color: #ffd6df;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 18px;
          line-height: 1;

          font-weight: 800;

          text-align: center;
        }

        .benefit-text {
          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 14px;
          line-height: 1.28;

          font-weight: 600;

          text-shadow:
            0 1px 9px rgba(65, 0, 27, 0.1);
        }

        @media (max-width: 640px) {
          .benefit {
            grid-template-columns:
              16px
              minmax(0, 1fr);

            gap: 6px;
          }

          .benefit-icon {
            font-size: 12px;
          }

          .benefit-text {
            font-size: 10px;
            line-height: 1.25;
          }
        }

        @media (max-width: 390px) {
          .benefit-text {
            font-size: 9px;
          }
        }
      `}</style>
        </div>
    );
}

/* ============================================================
   YEAR WORD
============================================================ */

function getYearWord(value: number) {
    const mod100 = value % 100;
    const mod10 = value % 10;

    if (
        mod100 >= 11 &&
        mod100 <= 14
    ) {
        return "лет";
    }

    if (mod10 === 1) {
        return "год";
    }

    if (
        mod10 >= 2 &&
        mod10 <= 4
    ) {
        return "года";
    }

    return "лет";
}