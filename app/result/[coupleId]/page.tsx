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

type BenefitIcon =
    | "heart"
    | "message"
    | "lightning"
    | "chart";

const MAX_SCORE = 10;

/*
 * Картинка должна лежать:
 *
 * public/images/full-report-couple.png
 *
 * В ней должен быть только pixel-art:
 * пара + пейзаж + луна + замок.
 *
 * Текст, benefits и CTA рисуем HTML/CSS.
 */
const PAID_IMAGE = "/images/full-report-couple.png";

export default function ResultPage() {
    const params = useParams();
    const router = useRouter();

    const coupleId = String(
        params.coupleId ?? ""
    );

    const [data, setData] =
        useState<ApiResponse | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        if (!coupleId) return;

        let cancelled = false;

        async function loadResult() {
            try {
                const response = await fetch(
                    `/api/report?id=${encodeURIComponent(
                        coupleId
                    )}`,
                    {
                        cache: "no-store",
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        "Не удалось загрузить результат"
                    );
                }

                const result =
                    (await response.json()) as ApiResponse;

                if (cancelled) return;

                if (result.waiting) {
                    router.replace(
                        `/waiting/${coupleId}`
                    );

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

    const categories =
        useMemo<CategoryScore[]>(() => {
            const same =
                data?.scores?.sameAnswers ?? 0;

            const close =
                data?.scores?.closeAnswers ?? 0;

            const different =
                data?.scores?.differentAnswers ?? 0;

            const total = Math.max(
                same + close + different,
                1
            );

            const base = Math.round(
                ((same + close * 0.5) / total) *
                MAX_SCORE
            );

            const clamp = (value: number) =>
                Math.max(
                    0,
                    Math.min(MAX_SCORE, value)
                );

            return [
                {
                    title: "Дружба",
                    subtitle:
                        "хорошо ли вам просто вдвоём",
                    value: clamp(base + 1),
                },
                {
                    title: "Партнёрство",
                    subtitle:
                        "вы команда или каждый сам за себя",
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
        data?.couple?.partner_a_name ||
        "Вы";

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
            <main className="error-screen">
                Не получилось загрузить результат.

                <style jsx>{`
          .error-screen {
            min-height: 100vh;

            display: grid;
            place-items: center;

            padding: 24px;

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
                {/* ==========================================
            HEADER
        ========================================== */}

                <header className="header">
                    <div className="brand">
                        между нами.
                    </div>

                    <div className="couple-names">
            <span className="person-name">
              {nameA}
            </span>

                        <span className="couple-cross">
              ×
            </span>

                        <span className="person-name">
              {nameB}
            </span>
                    </div>
                </header>

                {/* ==========================================
            RESULTS
        ========================================== */}

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

                {/* ==========================================
            FORECAST
        ========================================== */}

                <section className="forecast">
                    <div className="forecast-copy">
                        <div className="section-label">
                            ПРОГНОЗ
                        </div>

                        <h2 className="forecast-title">
                            Ориентировочная
                            длительность ваших отношений
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
                                        width:
                                            `${forecastPosition}%`,
                                    }}
                                />

                                <div
                                    className="scale-dot"
                                    style={{
                                        left:
                                            `${forecastPosition}%`,
                                    }}
                                />
                            </div>

                            <div className="scale-labels">
                <span>
                  1 месяц
                </span>

                                <span>
                  вся жизнь
                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* ==========================================
          PAID REPORT
      ========================================== */}

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

                        {/* ПЛАВНЫЙ ПЕРЕХОД */}

                        <div className="paid-gradient" />

                        {/* ЛЁГКАЯ ДЫМКА */}

                        <div className="paid-vignette" />

                        {/* HEADING */}

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
                                icon="heart"
                                text={
                                    <>
                                        Где вы можете
                                        <br />
                                        не понимать друг друга
                                    </>
                                }
                            />

                            <Benefit
                                icon="message"
                                text={
                                    <>
                                        Что каждый ждёт
                                        <br />
                                        от отношений
                                    </>
                                }
                            />

                            <Benefit
                                icon="lightning"
                                text={
                                    <>
                                        Что может стать
                                        <br />
                                        причиной ссор
                                    </>
                                }
                            />

                            <Benefit
                                icon="chart"
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

          overflow-x: hidden;

          background: #f8f4f1;
        }

        .content-shell {
          width: min(
            720px,
            100%
          );

          margin: 0 auto;
        }

        /* ==========================================
           HEADER
        ========================================== */

        .header {
          min-height: 78px;

          display: flex;
          align-items: center;
          justify-content:
            space-between;

          gap: 24px;

          border-bottom:
            1px solid #ddd5d2;
        }

        .brand {
          flex-shrink: 0;

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
          min-width: 0;

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

        .person-name {
          overflow: hidden;

          text-overflow:
            ellipsis;

          white-space:
            nowrap;
        }

        .couple-cross {
          flex-shrink: 0;

          color: #c2215a;
        }

        /* ==========================================
           RESULTS
        ========================================== */

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

        /* ==========================================
           FORECAST
        ========================================== */

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

        .forecast-copy {
          min-width: 0;
        }

        .forecast-title {
          max-width: 360px;

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
          line-height: 1;

          letter-spacing:
            -1.5px;
        }

        .forecast-scale {
          width: 100%;

          margin-top: 20px;
        }

        .scale-track {
          position: relative;

          height: 8px;

          border-radius:
            999px;

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
           MASTER DESKTOP COMPOSITION

           Пропорция максимально близка
           к выбранному референсу.
        ===================================================== */

        .paid-shell {
          width: min(
            1180px,
            100%
          );

          margin:
            8px auto
            0;
        }

        .paid-ratio {
          position: relative;

          width: 100%;

          /*
           * Более широкий баннер,
           * чем предыдущие 1120/540.
           */

          aspect-ratio:
            1180 / 500;
        }

        .paid-stage {
          position: absolute;

          inset: 0;

          overflow: hidden;

          border-radius:
            clamp(
              12px,
              1.7vw,
              22px
            );

          background:
            #a40f49;

          color: #fff;

          isolation: isolate;
        }

        /* ==========================================
           ART

           Самая важная правка:
           больше не используем cover
           на весь контейнер.
        ========================================== */

        .paid-image {
          position: absolute;

          z-index: 0;

          top: 0;
          bottom: 0;
          left: 0;

          /*
           * Изображение продолжается
           * достаточно далеко вправо,
           * чтобы замок был виден.
           */

          width: 79%;

          background-repeat:
            no-repeat;

          /*
           * Высота изображения совпадает
           * с высотой карточки.
           *
           * Соотношение исходного арта
           * сохраняется.
           */

          background-size:
            auto 100%;

          background-position:
            left bottom;

          background-color:
            #a40f49;
        }

        /* ==========================================
           FADE

           Арт начинает растворяться
           только после центра.
        ========================================== */

        .paid-gradient {
          position: absolute;

          z-index: 1;

          inset: 0;

          pointer-events: none;

          background:
            linear-gradient(
              90deg,

              rgba(
                164,
                15,
                73,
                0
              ) 0%,

              rgba(
                164,
                15,
                73,
                0
              ) 45%,

              rgba(
                164,
                15,
                73,
                0.03
              ) 49%,

              rgba(
                164,
                15,
                73,
                0.08
              ) 53%,

              rgba(
                164,
                15,
                73,
                0.16
              ) 57%,

              rgba(
                164,
                15,
                73,
                0.28
              ) 61%,

              rgba(
                164,
                15,
                73,
                0.44
              ) 65%,

              rgba(
                164,
                15,
                73,
                0.62
              ) 69%,

              rgba(
                164,
                15,
                73,
                0.78
              ) 73%,

              rgba(
                164,
                15,
                73,
                0.89
              ) 77%,

              rgba(
                164,
                15,
                73,
                0.96
              ) 82%,

              #a40f49 88%,

              #a40f49 100%
            );
        }

        .paid-vignette {
          position: absolute;

          z-index: 2;

          inset: 0;

          pointer-events: none;

          background:
            linear-gradient(
              180deg,

              rgba(
                42,
                0,
                20,
                0.08
              ) 0%,

              rgba(
                42,
                0,
                20,
                0
              ) 30%,

              rgba(
                42,
                0,
                20,
                0
              ) 70%,

              rgba(
                42,
                0,
                20,
                0.12
              ) 100%
            );
        }

        /* ==========================================
           HEADING
        ========================================== */

        .paid-heading {
          position: absolute;

          z-index: 3;

          top: 6.7%;
          left: 6.1%;

          width: 43%;
        }

        .paid-label {
          margin-bottom:
            2.8%;

          color:
            rgba(
              255,
              245,
              247,
              0.9
            );

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size:
            clamp(
              6px,
              0.76vw,
              10px
            );

          line-height: 1;

          font-weight: 700;

          letter-spacing:
            0.18em;
        }

        .paid-heading h2 {
          margin: 0;

          color: #fff9f6;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              20px,
              3.55vw,
              47px
            );

          line-height: 0.97;

          font-weight: 400;

          letter-spacing:
            -0.04em;

          text-shadow:
            0 2px 15px
            rgba(
              59,
              0,
              27,
              0.1
            );
        }

        /* ==========================================
           BENEFITS
        ========================================== */

        .paid-benefits {
          position: absolute;

          z-index: 4;

          top: 10%;
          right: 5.1%;

          width: 27%;

          display: flex;
          flex-direction: column;

          gap:
            clamp(
              9px,
              1.55vw,
              21px
            );
        }

        /* ==========================================
           CTA
        ========================================== */

        .paid-cta {
          position: absolute;

          z-index: 5;

          right: 3.1%;
          bottom: 10.3%;

          width: 54%;
          height: 14.4%;

          min-height: 0;

          padding:
            0
            2.4%;

          display: flex;
          align-items: center;
          justify-content:
            space-between;

          gap: 2%;

          border: 0;

          border-radius:
            clamp(
              8px,
              1.25vw,
              15px
            );

          background:
            #fffaf7;

          color:
            #201d1e;

          cursor: pointer;

          box-shadow:
            0 9px 25px
            rgba(
              65,
              0,
              27,
              0.12
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
            0 13px 30px
            rgba(
              65,
              0,
              27,
              0.18
            );
        }

        .cta-title {
          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size:
            clamp(
              7px,
              1.05vw,
              14px
            );

          line-height: 1;

          font-weight: 600;

          letter-spacing:
            -0.01em;

          white-space:
            nowrap;
        }

        .cta-right {
          display: flex;
          align-items: center;

          gap:
            clamp(
              8px,
              1.45vw,
              19px
            );

          color:
            #c51b58;
        }

        .price {
          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              13px,
              2.05vw,
              27px
            );

          line-height: 1;

          font-weight: 400;

          white-space:
            nowrap;
        }

        .arrow {
          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size:
            clamp(
              12px,
              1.85vw,
              24px
            );

          line-height: 1;

          font-weight: 300;
        }

        .paid-note {
          position: absolute;

          z-index: 5;

          right: 3.1%;
          bottom: 4.4%;

          width: 54%;

          color:
            rgba(
              255,
              238,
              243,
              0.7
            );

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size:
            clamp(
              5px,
              0.64vw,
              8px
            );

          line-height: 1;

          font-weight: 400;

          text-align: center;

          white-space:
            nowrap;
        }

        /* ==========================================
           TABLET
        ========================================== */

        @media (
          max-width: 900px
        ) {
          .page {
            padding-left: 20px;
            padding-right: 20px;
          }
        }

        /* ==========================================
           MOBILE

           Основной контент перестраиваем.
           Paid-композицию сохраняем.
        ========================================== */

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

            gap: 12px;
          }

          .brand {
            font-size: 21px;
          }

          .couple-names {
            max-width: 52%;

            gap: 5px;

            font-size: 8px;

            letter-spacing:
              0.65px;
          }

          .results {
            padding:
              29px 0
              33px;
          }

          .section-label {
            margin-bottom:
              11px;

            font-size: 9px;

            letter-spacing:
              1.8px;
          }

          .results-title {
            margin-bottom:
              24px;

            font-size: 37px;
            line-height: 1;

            letter-spacing:
              -1.8px;
          }

          /*
           * Forecast на телефоне
           * вертикальный.
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
            line-height: 1.03;

            letter-spacing:
              -1.35px;
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

          .years strong {
            font-size: 62px;

            letter-spacing:
              -3px;
          }

          .years span {
            margin-left: 7px;

            font-size: 33px;

            letter-spacing:
              -1px;
          }

          .forecast-scale {
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

          /*
           * Paid баннер сохраняет
           * desktop-композицию.
           */

          .paid-shell {
            width: 100%;

            margin-top: 0;
          }

          .paid-stage {
            border-radius: 10px;
          }

          /*
           * На маленькой ширине
           * чуть усиливаем headline,
           * чтобы он не исчезал.
           */

          .paid-label {
            font-size:
              clamp(
                4px,
                1.25vw,
                6px
              );
          }

          .paid-heading h2 {
            font-size:
              clamp(
                14px,
                4.5vw,
                20px
              );
          }

          .cta-title {
            font-size:
              clamp(
                5px,
                1.7vw,
                7px
              );
          }

          .price {
            font-size:
              clamp(
                9px,
                3vw,
                13px
              );
          }

          .arrow {
            font-size:
              clamp(
                8px,
                2.7vw,
                12px
              );
          }

          .paid-note {
            font-size:
              clamp(
                3px,
                1vw,
                5px
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
    icon: BenefitIcon;
    text: ReactNode;
}) {
    return (
        <div className="benefit">
            <div className="benefit-icon">
                <BenefitSvg
                    type={icon}
                />
            </div>

            <div className="benefit-text">
                {text}
            </div>

            <style jsx>{`
        .benefit {
          display: grid;

          grid-template-columns:
            clamp(
              10px,
              1.65vw,
              22px
            )
            minmax(0, 1fr);

          gap:
            clamp(
              5px,
              0.85vw,
              10px
            );

          align-items: start;

          color: #fff8f6;
        }

        .benefit-icon {
          width: 100%;

          padding-top: 1px;

          color: #ffd8e1;
        }

        .benefit-text {
          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size:
            clamp(
              6px,
              0.98vw,
              13px
            );

          line-height: 1.27;

          font-weight: 500;

          letter-spacing:
            -0.01em;

          text-shadow:
            0 1px 8px
            rgba(
              65,
              0,
              27,
              0.08
            );
        }

        @media (
          max-width: 640px
        ) {
          .benefit {
            grid-template-columns:
              8px
              minmax(0, 1fr);

            gap: 4px;
          }

          .benefit-text {
            font-size:
              clamp(
                4px,
                1.45vw,
                6px
              );
          }
        }
      `}</style>
        </div>
    );
}

/* ============================================================
   BENEFIT SVG
============================================================ */

function BenefitSvg({
                        type,
                    }: {
    type: BenefitIcon;
}) {
    if (type === "heart") {
        return (
            <svg
                viewBox="0 0 24 24"
                width="100%"
                height="auto"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    d="
            M12 21
            C10.9 19.9 5.4 15.2 3.1 12.3
            C0.6 9.2 1.3 5.1 4.7 3.5
            C7.2 2.3 10.1 3.1 12 5.3
            C13.9 3.1 16.8 2.3 19.3 3.5
            C22.7 5.1 23.4 9.2 20.9 12.3
            C18.6 15.2 13.1 19.9 12 21
            Z
          "
                />
            </svg>
        );
    }

    if (type === "message") {
        return (
            <svg
                viewBox="0 0 24 24"
                width="100%"
                height="auto"
                fill="none"
                aria-hidden="true"
            >
                <rect
                    x="3"
                    y="4"
                    width="18"
                    height="13"
                    rx="4"
                    fill="currentColor"
                />

                <path
                    d="M8 17L7 21L12 17"
                    fill="currentColor"
                />

                <path
                    d="M7 9H17"
                    stroke="#a40f49"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                />

                <path
                    d="M7 12H14"
                    stroke="#a40f49"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                />
            </svg>
        );
    }

    if (type === "lightning") {
        return (
            <svg
                viewBox="0 0 24 24"
                width="100%"
                height="auto"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    d="
            M13.6 1.8
            L5.2 13
            H10.5
            L9.3 22.2
            L18.8 9.6
            H13.1
            Z
          "
                />
            </svg>
        );
    }

    return (
        <svg
            viewBox="0 0 24 24"
            width="100%"
            height="auto"
            fill="currentColor"
            aria-hidden="true"
        >
            <rect
                x="3"
                y="13"
                width="4"
                height="8"
                rx="1.2"
            />

            <rect
                x="10"
                y="8"
                width="4"
                height="13"
                rx="1.2"
            />

            <rect
                x="17"
                y="3"
                width="4"
                height="18"
                rx="1.2"
            />
        </svg>
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