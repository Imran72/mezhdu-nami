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

/*
 * ВАЖНО:
 * картинка должна лежать здесь:
 *
 * public/images/full-report-couple.png
 *
 * В самой картинке НЕ должно быть текста,
 * benefits и CTA.
 * Только pixel-art сцена.
 */
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

        const total = Math.max(
            same + close + different,
            1
        );

        const base = Math.round(
            ((same + close * 0.5) / total) * MAX_SCORE
        );

        const clamp = (value: number) =>
            Math.max(
                0,
                Math.min(MAX_SCORE, value)
            );

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
                subtitle:
                    "совпадает ли ваше представление о близости",
                value: clamp(base + 2),
            },
            {
                title: "Деньги",
                subtitle:
                    "одинаково ли вы смотрите на траты",
                value: clamp(base - 2),
            },
            {
                title: "Забота",
                subtitle:
                    "понимаете ли вы «я рядом» одинаково",
                value: clamp(base + 1),
            },
            {
                title: "Быт",
                subtitle:
                    "как вам живётся в обычный вторник",
                value: clamp(base - 1),
            },
        ];
    }, [data]);

    const yearsForecast = useMemo(() => {
        const overall =
            data?.scores?.overall ?? 50;

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
            Math.min(
                96,
                (yearsForecast / maxYears) * 100
            )
        );
    }, [yearsForecast]);

    const nameA =
        data?.couple?.partner_a_name || "Вы";

    const nameB =
        data?.couple?.partner_b_name ||
        "Партнёр";

    if (loading) {
        return (
            <main className="loading-screen">
                <div className="loading-brand">
                    между нами.
                </div>

                <style jsx>{`
          .loading-screen {
            min-height: 100vh;
            display: grid;
            place-items: center;
            background: #f8f4f1;
            color: #211d1f;
          }

          .loading-brand {
            font-family:
              Georgia,
              "Times New Roman",
              serif;
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
            font-family:
              Arial,
              Helvetica,
              sans-serif;
          }
        `}</style>
            </main>
        );
    }

    return (
        <main className="page">
            <div className="content-shell">
                {/* ==============================
            HEADER
        ============================== */}

                <header className="header">
                    <div className="brand">
                        между нами.
                    </div>

                    <div className="couple-names">
                        {nameA}

                        <span>×</span>

                        {nameB}
                    </div>
                </header>

                {/* ==============================
            RESULTS
        ============================== */}

                <section className="results">
                    <div className="section-label">
                        ВАШ РЕЗУЛЬТАТ
                    </div>

                    <h1 className="results-title">
                        Вот что получилось
                    </h1>

                    <div className="category-list">
                        {categories.map(
                            (category) => (
                                <CategoryRow
                                    key={category.title}
                                    {...category}
                                />
                            )
                        )}
                    </div>
                </section>

                {/* ==============================
            FORECAST
        ============================== */}

                <section className="forecast">
                    <div className="forecast-copy">
                        <div className="section-label">
                            ПРОГНОЗ
                        </div>

                        <h2 className="forecast-title">
                            Ориентировочная длительность
                            ваших отношений
                        </h2>

                        <p className="forecast-description">
                            На основе ваших ответов мы
                            оценили, сколько времени ваши
                            отношения могут продлиться при
                            текущем сценарии.
                        </p>
                    </div>

                    <div className="forecast-result">
                        <div className="years">
                            <strong>
                                {yearsForecast}
                            </strong>

                            <span>
                {getYearWord(
                    yearsForecast
                )}
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

            {/* =====================================================
          PAID REPORT

          Здесь принципиально другая архитектура:

          Внутри всегда существует одна сцена
          с пропорцией 1120 / 540.

          На меньшем экране она НЕ перестраивается,
          а просто масштабируется.
      ===================================================== */}

            <section className="paid-shell">
                <div className="paid-ratio">
                    <div className="paid-stage">

                        {/* ART */}

                        <div
                            className="paid-image"
                            style={{
                                backgroundImage:
                                    `url("${PAID_IMAGE}")`,
                            }}
                        />

                        {/* RIGHT FADE */}

                        <div className="paid-gradient" />

                        {/* SUBTLE DARKNESS */}

                        <div className="paid-vignette" />

                        {/* HEADLINE */}

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

                        <button
                            type="button"
                            className="paid-cta"
                            onClick={() =>
                                router.push(
                                    `/report/${coupleId}`
                                )
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
                            один разбор · для вас двоих ·
                            сразу после оплаты
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

          padding:
            0
            28px
            72px;

          overflow: hidden;

          background: #f8f4f1;
        }

        .content-shell {
          width: min(
            720px,
            100%
          );

          margin: 0 auto;
        }

        /* ==============================
           HEADER
        ============================== */

        .header {
          min-height: 78px;

          display: flex;
          align-items: center;
          justify-content:
            space-between;

          border-bottom:
            1px solid #ddd5d2;
        }

        .brand {
          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 24px;
          line-height: 1;
          font-weight: 700;

          letter-spacing:
            -1.1px;
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

          letter-spacing:
            1.2px;

          text-transform:
            uppercase;
        }

        .couple-names span {
          color: #c2215a;
        }

        /* ==============================
           RESULTS
        ============================== */

        .results {
          padding:
            42px 0
            45px;
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

          letter-spacing:
            2.2px;
        }

        .results-title {
          margin:
            0 0 32px;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 48px;
          line-height: 0.98;
          font-weight: 400;

          letter-spacing:
            -2.5px;
        }

        .category-list {
          display: flex;
          flex-direction: column;
        }

        /* ==============================
           FORECAST
        ============================== */

        .forecast {
          padding:
            38px 0
            46px;

          display: grid;

          grid-template-columns:
            minmax(0, 1.1fr)
            minmax(220px, 0.9fr);

          gap: 42px;

          align-items: center;

          border-top:
            1px solid #dcd4d1;
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

          letter-spacing:
            -1.8px;
        }

        .forecast-description {
          max-width: 390px;

          margin:
            12px 0 0;

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

          letter-spacing:
            -4px;
        }

        .years span {
          margin-left: 8px;

          font-size: 37px;

          letter-spacing:
            -1.5px;
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

          inset:
            0 auto
            0 0;

          border-radius:
            inherit;

          background: #e99ab5;
        }

        .scale-dot {
          position: absolute;

          top: 50%;

          width: 20px;
          height: 20px;

          border-radius: 50%;

          background: #c21856;

          transform:
            translate(
              -50%,
              -50%
            );
        }

        .scale-labels {
          display: flex;
          justify-content:
            space-between;

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
           PAID REPORT

           Базовая сцена = 1120 × 540.
        ===================================================== */

        .paid-shell {
          width: min(
            1120px,
            100%
          );

          margin:
            8px auto
            0;
        }

        /*
         * aspect-ratio держит
         * одинаковую композицию
         * на любой ширине.
         */

        .paid-ratio {
          position: relative;

          width: 100%;

          aspect-ratio:
            1120 / 540;

          min-height: 0;
        }

        .paid-stage {
          position: absolute;

          inset: 0;

          overflow: hidden;

          border-radius:
            clamp(
              10px,
              2.15vw,
              24px
            );

          background: #9f1248;

          color: #fff;

          isolation: isolate;
        }

        /* ==============================
           BACKGROUND ART
        ============================== */

        .paid-image {
          position: absolute;

          inset: 0;

          z-index: 0;

          background-repeat:
            no-repeat;

          background-size:
            cover;

          /*
           * Фокус на паре.
           * Замок остаётся ближе
           * к середине.
           */

          background-position:
            38% center;

          background-color:
            #9f1248;
        }

        /*
         * Плавный fade справа.
         *
         * Важно:
         * он не закрывает половину
         * картинки сплошным цветом.
         */

        .paid-gradient {
          position: absolute;

          inset: 0;

          z-index: 1;

          pointer-events: none;

          background:
            linear-gradient(
              90deg,

              rgba(
                157,
                18,
                72,
                0
              ) 0%,

              rgba(
                157,
                18,
                72,
                0
              ) 43%,

              rgba(
                157,
                18,
                72,
                0.06
              ) 49%,

              rgba(
                157,
                18,
                72,
                0.18
              ) 55%,

              rgba(
                157,
                18,
                72,
                0.38
              ) 61%,

              rgba(
                157,
                18,
                72,
                0.61
              ) 67%,

              rgba(
                157,
                18,
                72,
                0.79
              ) 73%,

              rgba(
                157,
                18,
                72,
                0.91
              ) 79%,

              #9d1248
                89%,

              #9d1248
                100%
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
              rgba(
                40,
                3,
                20,
                0.08
              ),
              rgba(
                40,
                3,
                20,
                0
              ) 48%,
              rgba(
                40,
                3,
                20,
                0.15
              )
            );
        }

        /* ==============================
           HEADING

           Всё через % —
           поэтому сохраняет позицию
           при любом размере.
        ============================== */

        .paid-heading {
          position: absolute;

          z-index: 3;

          top: 8.5%;
          left: 5.8%;

          width: 48%;
        }

        .paid-label {
          margin-bottom:
            2.1%;

          color:
            rgba(
              255,
              244,
              247,
              0.85
            );

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          /*
           * Размер относительно
           * ширины viewport,
           * но с ограничениями.
           */

          font-size:
            clamp(
              5px,
              0.95vw,
              11px
            );

          line-height: 1;

          font-weight: 800;

          letter-spacing:
            0.22em;
        }

        .paid-heading h2 {
          margin: 0;

          color: #fff8f5;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              17px,
              4.3vw,
              52px
            );

          line-height: 0.94;

          font-weight: 400;

          letter-spacing:
            -0.045em;

          text-shadow:
            0 2px 16px
            rgba(
              59,
              0,
              27,
              0.14
            );
        }

        /* ==============================
           BENEFITS
        ============================== */

        .paid-benefits {
          position: absolute;

          z-index: 4;

          top: 10%;
          right: 4.6%;

          width: 29%;

          display: flex;
          flex-direction: column;

          gap:
            clamp(
              5px,
              1.55vw,
              19px
            );
        }

        /* ==============================
           CTA
        ============================== */

        .paid-cta {
          position: absolute;

          z-index: 5;

          right: 3.2%;
          bottom: 9.5%;

          width: 57%;
          height: 15.5%;

          min-height: 0;

          padding:
            0 2.2%;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 2%;

          border: 0;

          border-radius:
            clamp(
              7px,
              1.4vw,
              17px
            );

          background: #fffaf8;

          color: #211d1f;

          cursor: pointer;

          box-shadow:
            0 10px 28px
            rgba(
              69,
              0,
              28,
              0.14
            );

          transition:
            transform
              150ms ease,
            box-shadow
              150ms ease;
        }

        .paid-cta:hover {
          transform:
            translateY(-2px);

          box-shadow:
            0 14px 34px
            rgba(
              69,
              0,
              28,
              0.2
            );
        }

        .cta-title {
          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size:
            clamp(
              6px,
              1.25vw,
              15px
            );

          font-weight: 800;

          white-space: nowrap;
        }

        .cta-right {
          display: flex;

          align-items: center;

          gap:
            clamp(
              5px,
              1.7vw,
              20px
            );

          color: #c21856;
        }

        .price {
          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              11px,
              2.4vw,
              29px
            );

          line-height: 1;

          white-space: nowrap;
        }

        .arrow {
          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size:
            clamp(
              10px,
              2.2vw,
              27px
            );

          line-height: 1;

          font-weight: 300;
        }

        .paid-note {
          position: absolute;

          z-index: 5;

          right: 3.2%;
          bottom: 4%;

          width: 57%;

          color:
            rgba(
              255,
              239,
              244,
              0.62
            );

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size:
            clamp(
              4px,
              0.72vw,
              9px
            );

          font-weight: 500;

          text-align: center;

          white-space: nowrap;
        }

        /* ==============================
           MOBILE

           ВАЖНО:
           paid-card НЕ перестраиваем.

           Она остаётся той же самой
           композицией и уменьшается.
        ============================== */

        @media (
          max-width: 640px
        ) {
          .page {
            padding:
              0
              12px
              32px;
          }

          .header {
            min-height: 64px;
          }

          .brand {
            font-size: 21px;
          }

          .couple-names {
            max-width: 50%;

            overflow: hidden;

            font-size: 8px;

            letter-spacing:
              0.7px;

            white-space: nowrap;
          }

          .results {
            padding:
              29px 0
              33px;
          }

          .results-title {
            margin-bottom:
              24px;

            font-size: 37px;

            letter-spacing:
              -1.8px;
          }

          /*
           * Forecast наоборот
           * перестраиваем.
           */

          .forecast {
            padding:
              29px 0
              37px;

            display: block;
          }

          .forecast-title {
            max-width: 340px;

            font-size: 31px;

            letter-spacing:
              -1.35px;
          }

          .forecast-description {
            max-width: 325px;

            margin-top: 12px;

            font-size: 12px;
          }

          .forecast-result {
            width: 100%;

            margin-top: 24px;
          }

          .years strong {
            font-size: 62px;
          }

          .years span {
            font-size: 33px;
          }

          /*
           * Самое главное:
           *
           * НЕТ отдельных mobile
           * layout rules для баннера.
           *
           * Сохраняется та же сцена.
           */

          .paid-shell {
            width: 100%;
            margin-top: 0;
          }

          .paid-heading h2 {
            /*
             * clamp сверху рассчитан
             * от viewport.
             */
            line-height: 0.94;
          }

          /*
           * На очень маленьком экране
           * чуть усиливаем читаемость.
           */

          .paid-vignette {
            background:
              linear-gradient(
                180deg,
                rgba(
                  40,
                  3,
                  20,
                  0.08
                ),
                rgba(
                  40,
                  3,
                  20,
                  0
                ) 45%,
                rgba(
                  40,
                  3,
                  20,
                  0.17
                )
              );
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
        Math.min(
            MAX_SCORE,
            value
        )
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
                    <strong>
                        {safeValue}
                    </strong>

                    <span>
            /10
          </span>
                </div>
            </div>

            <div className="category-track">
                <div
                    className="category-fill"
                    style={{
                        width:
                            `${safeValue * 10}%`,
                    }}
                />
            </div>

            <style jsx>{`
        .category-row {
          padding:
            16px 0
            18px;

          border-bottom:
            1px solid #e0d9d6;
        }

        .category-row:first-child {
          padding-top: 0;
        }

        .category-top {
          display: flex;

          align-items: flex-end;

          justify-content:
            space-between;

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

          letter-spacing:
            -1.1px;
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

          align-items:
            baseline;

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

          letter-spacing:
            -1.7px;
        }

        .category-score span {
          margin-left: 3px;

          font-size: 17px;
        }

        .category-track {
          height: 6px;

          margin-top: 11px;

          overflow: hidden;

          border-radius:
            999px;

          background:
            #e5dfdf;
        }

        .category-fill {
          height: 100%;

          border-radius:
            inherit;

          background:
            #cb3a6d;
        }

        @media (
          max-width: 640px
        ) {
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
            10%
            minmax(0, 1fr);

          gap: 5%;

          align-items: start;

          color: #fff8f6;
        }

        .benefit-icon {
          color: #ffd6df;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size:
            clamp(
              6px,
              1.45vw,
              18px
            );

          line-height: 1;

          font-weight: 800;

          text-align: center;
        }

        .benefit-text {
          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size:
            clamp(
              5px,
              1.13vw,
              14px
            );

          line-height: 1.28;

          font-weight: 600;

          text-shadow:
            0 1px 9px
            rgba(
              65,
              0,
              27,
              0.1
            );
        }
      `}</style>
        </div>
    );
}

/* ============================================================
   YEAR WORD
============================================================ */

function getYearWord(
    value: number
) {
    const mod100 =
        value % 100;

    const mod10 =
        value % 10;

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