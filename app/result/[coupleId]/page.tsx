"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

// Положи нашу картинку сюда:
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

    /*
     * Пока оставляю ту же визуальную модель категорий.
     * Если у тебя уже есть реальные category scores из scoring.ts —
     * сюда потом просто подставим их.
     */
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
            </main>
        );
    }

    return (
        <main className="page">
            <div className="shell">
                {/* HEADER */}

                <header className="header">
                    <div className="brand">между нами.</div>

                    <div className="couple-names">
                        {nameA}
                        <span>×</span>
                        {nameB}
                    </div>
                </header>

                {/* CATEGORY RESULTS */}

                <section className="results">
                    <div className="section-label">ВАШ РЕЗУЛЬТАТ</div>

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
                            Ориентировочная длительность
                            <br />
                            ваших отношений
                        </h2>

                        <p className="forecast-description">
                            На основе ваших ответов мы оценили,
                            сколько времени ваши отношения могут
                            продлиться при текущем сценарии.
                        </p>
                    </div>

                    <div className="forecast-result">
                        <div className="years">
                            {yearsForecast}
                            <span>
                {yearsForecast === 1 ? "год" : "лет"}
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

                {/* PAID REPORT */}

                <section className="paid-card">
                    {/* КАРТИНКА НА ВСЮ КАРТОЧКУ */}

                    <div
                        className="paid-image"
                        style={{
                            backgroundImage: `url("${PAID_IMAGE}")`,
                        }}
                    />

                    {/* ГЛАВНЫЙ ПЛАВНЫЙ ПЕРЕХОД */}

                    <div className="paid-gradient" />

                    {/* лёгкая затемняющая дымка для текста */}

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

                    <button
                        className="paid-cta"
                        onClick={() =>
                            router.push(`/report/${coupleId}`)
                        }
                    >
            <span className="cta-title">
              Открыть полный разбор
            </span>

                        <span className="cta-right">
              <span className="price">299 ₽</span>
              <span className="arrow">→</span>
            </span>
                    </button>

                    <div className="paid-note">
                        один разбор · для вас двоих · сразу после оплаты
                    </div>
                </section>
            </div>

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
          background: #f8f4f1;
          min-height: 100vh;
          padding: 0 28px 80px;
        }

        .shell {
          width: min(1160px, 100%);
          margin: 0 auto;
        }

        /* =========================
           HEADER
        ========================= */

        .header {
          min-height: 88px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #ddd5d2;
        }

        .brand {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 27px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: -1.2px;
        }

        .couple-names {
          display: flex;
          align-items: center;
          gap: 11px;
          color: #8f8588;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .couple-names span {
          color: #c2215a;
        }

        /* =========================
           RESULTS
        ========================= */

        .results {
          padding: 54px 0 56px;
        }

        .section-label {
          margin-bottom: 18px;
          color: #c2215a;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 13px;
          line-height: 1;
          font-weight: 800;
          letter-spacing: 3px;
        }

        .results-title {
          margin: 0 0 44px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(46px, 5.2vw, 72px);
          line-height: 0.96;
          font-weight: 400;
          letter-spacing: -3.4px;
        }

        .category-list {
          display: flex;
          flex-direction: column;
        }

        /* =========================
           FORECAST
        ========================= */

        .forecast {
          border-top: 1px solid #dcd4d1;
          padding: 54px 0 64px;

          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
          gap: 80px;
          align-items: center;
        }

        .forecast-title {
          max-width: 610px;
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(40px, 4.2vw, 60px);
          line-height: 1.02;
          font-weight: 400;
          letter-spacing: -2.7px;
        }

        .forecast-description {
          max-width: 600px;
          margin: 22px 0 0;
          color: #8d8587;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 17px;
          line-height: 1.5;
          font-weight: 600;
        }

        .forecast-result {
          padding-top: 8px;
        }

        .years {
          color: #c21856;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(78px, 8vw, 112px);
          line-height: 0.9;
          letter-spacing: -5px;
          white-space: nowrap;
        }

        .years span {
          margin-left: 10px;
          font-size: 0.56em;
          letter-spacing: -2px;
        }

        .forecast-scale {
          margin-top: 28px;
        }

        .scale-track {
          position: relative;
          height: 12px;
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
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #c21856;
          transform: translate(-50%, -50%);
        }

        .scale-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 17px;
          color: #8d8587;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 13px;
          font-weight: 600;
        }

        /* =========================
           PAID CARD
        ========================= */

        .paid-card {
          position: relative;
          width: 100%;
          height: 620px;
          overflow: hidden;

          border-radius: 28px;
          background: #a80f48;
          color: #fff;
          isolation: isolate;
        }

        /*
         * ВАЖНО:
         * картинка физически занимает ВСЮ карточку.
         *
         * Поэтому вертикальной границы между
         * изображением и цветным блоком больше нет.
         */

        .paid-image {
          position: absolute;
          inset: 0;
          z-index: 0;

          background-repeat: no-repeat;
          background-size: cover;

          /*
           * Фокус немного левее центра:
           * пара остаётся заметной,
           * замок оказывается ближе к середине.
           */
          background-position: 42% center;
        }

        /*
         * Вот здесь происходит главное.
         *
         * Слева почти ничего.
         * После середины начинает появляться бордовый.
         * Справа картинка полностью растворяется.
         */

        .paid-gradient {
          position: absolute;
          inset: 0;
          z-index: 1;

          background:
            linear-gradient(
              90deg,
              rgba(156, 13, 64, 0) 0%,
              rgba(156, 13, 64, 0) 38%,
              rgba(156, 13, 64, 0.10) 46%,
              rgba(156, 13, 64, 0.28) 53%,
              rgba(156, 13, 64, 0.56) 61%,
              rgba(156, 13, 64, 0.82) 70%,
              rgba(156, 13, 64, 0.96) 80%,
              #9c0d40 91%,
              #9c0d40 100%
            );
        }

        /*
         * Лёгкая общая виньетка.
         * Она соединяет фотографию/арт и UI.
         */

        .paid-vignette {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;

          background:
            linear-gradient(
              180deg,
              rgba(57, 7, 31, 0.10) 0%,
              rgba(57, 7, 31, 0) 32%,
              rgba(57, 7, 31, 0.05) 70%,
              rgba(57, 7, 31, 0.24) 100%
            );
        }

        .paid-heading {
          position: absolute;
          z-index: 3;
          top: 56px;
          left: 62px;
        }

        .paid-label {
          margin-bottom: 18px;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 14px;
          line-height: 1;
          font-weight: 800;
          letter-spacing: 3px;
          color: rgba(255, 245, 247, 0.82);
        }

        .paid-heading h2 {
          margin: 0;

          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(52px, 5vw, 72px);
          line-height: 0.98;
          font-weight: 400;
          letter-spacing: -3px;

          color: #fff8f5;

          text-shadow:
            0 2px 20px rgba(65, 0, 27, 0.12);
        }

        /*
         * BENEFITS стоят не в отдельном блоке.
         * Они буквально лежат поверх градиента.
         */

        .paid-benefits {
          position: absolute;
          z-index: 3;

          top: 70px;
          right: 60px;

          width: 300px;

          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .paid-cta {
          position: absolute;
          z-index: 4;

          right: 44px;
          bottom: 66px;

          width: 56%;
          min-height: 92px;

          border: 0;
          border-radius: 22px;

          padding: 0 32px;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;

          background: #fffaf8;
          color: #211d1f;

          cursor: pointer;

          box-shadow:
            0 12px 36px rgba(69, 0, 28, 0.14);

          transition:
            transform 160ms ease,
            box-shadow 160ms ease;
        }

        .paid-cta:hover {
          transform: translateY(-2px);
          box-shadow:
            0 17px 42px rgba(69, 0, 28, 0.2);
        }

        .cta-title {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 18px;
          font-weight: 800;
        }

        .cta-right {
          display: flex;
          align-items: center;
          gap: 28px;
          color: #c21856;
        }

        .price {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 37px;
          line-height: 1;
          white-space: nowrap;
        }

        .arrow {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 35px;
          font-weight: 300;
        }

        .paid-note {
          position: absolute;
          z-index: 4;

          right: 68px;
          bottom: 27px;

          width: 50%;
          text-align: center;

          color: rgba(255, 240, 244, 0.64);
          font-family: Arial, Helvetica, sans-serif;
          font-size: 12px;
          font-weight: 500;
        }

        /* =========================
           TABLET
        ========================= */

        @media (max-width: 900px) {
          .forecast {
            grid-template-columns: 1fr;
            gap: 36px;
          }

          .forecast-result {
            max-width: 540px;
          }

          .paid-card {
            height: 600px;
          }

          .paid-heading {
            left: 42px;
            top: 44px;
          }

          .paid-benefits {
            right: 36px;
            width: 270px;
          }

          .paid-cta {
            left: 34px;
            right: 34px;
            width: auto;
          }

          .paid-note {
            left: 34px;
            right: 34px;
            width: auto;
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 640px) {
          .page {
            padding: 0 16px 40px;
          }

          .shell {
            width: 100%;
          }

          .header {
            min-height: 68px;
          }

          .brand {
            font-size: 23px;
          }

          .couple-names {
            font-size: 10px;
            letter-spacing: 1px;
          }

          .results {
            padding: 36px 0 42px;
          }

          .section-label {
            margin-bottom: 14px;
            font-size: 11px;
            letter-spacing: 2.4px;
          }

          .results-title {
            margin-bottom: 28px;
            font-size: 46px;
            letter-spacing: -2.5px;
          }

          .forecast {
            padding: 38px 0 46px;
            gap: 26px;
          }

          .forecast-title {
            font-size: 39px;
            letter-spacing: -2px;
          }

          .forecast-description {
            margin-top: 16px;
            font-size: 15px;
          }

          .years {
            font-size: 78px;
          }

          .forecast-scale {
            margin-top: 20px;
          }

          /*
           * MOBILE PAID CARD
           *
           * Здесь композиция полностью меняется.
           *
           * Картинка остаётся на всю карточку,
           * но сверху показываем её нормально,
           * а затем она растворяется ВНИЗ.
           */

          .paid-card {
            height: 760px;
            border-radius: 22px;
            background: #a40f48;
          }

          .paid-image {
            inset: 0;

            /*
             * cover всё ещё нужен,
             * но позиционируем фокус по паре.
             */
            background-size: auto 60%;
            background-position: 42% top;
            background-repeat: no-repeat;

            /*
             * Бордовый под изображением совпадает
             * с конечным цветом градиента.
             */
            background-color: #a40f48;
          }

          /*
           * На мобильном переход идёт сверху вниз.
           *
           * До ~36% изображение почти чистое.
           * Потом постепенно растворяется.
           * После ~60% остаётся чистый бордовый.
           */

          .paid-gradient {
            background:
              linear-gradient(
                180deg,
                rgba(164, 15, 72, 0) 0%,
                rgba(164, 15, 72, 0) 31%,
                rgba(164, 15, 72, 0.08) 36%,
                rgba(164, 15, 72, 0.30) 42%,
                rgba(164, 15, 72, 0.60) 49%,
                rgba(164, 15, 72, 0.88) 56%,
                #a40f48 64%,
                #a40f48 100%
              );
          }

          .paid-vignette {
            background:
              linear-gradient(
                180deg,
                rgba(53, 4, 28, 0.12) 0%,
                rgba(53, 4, 28, 0) 28%,
                rgba(53, 4, 28, 0) 55%,
                rgba(53, 4, 28, 0.14) 100%
              );
          }

          .paid-heading {
            top: 30px;
            left: 28px;
            right: 24px;
          }

          .paid-label {
            margin-bottom: 12px;
            font-size: 11px;
            letter-spacing: 2.3px;
          }

          .paid-heading h2 {
            font-size: 42px;
            line-height: 0.98;
            letter-spacing: -2px;
          }

          /*
           * Преимущества начинаются уже после
           * изображения, но всё ещё в зоне
           * плавного растворения.
           */

          .paid-benefits {
            top: 475px;
            left: 28px;
            right: 28px;

            width: auto;

            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 18px 18px;
          }

          .paid-cta {
            left: 18px;
            right: 18px;
            bottom: 52px;

            width: auto;
            min-height: 72px;

            padding: 0 20px;

            border-radius: 18px;
          }

          .cta-title {
            font-size: 14px;
          }

          .cta-right {
            gap: 12px;
          }

          .price {
            font-size: 27px;
          }

          .arrow {
            font-size: 26px;
          }

          .paid-note {
            left: 20px;
            right: 20px;
            bottom: 19px;

            width: auto;

            font-size: 10px;
          }
        }

        @media (max-width: 390px) {
          .paid-card {
            height: 735px;
          }

          .paid-image {
            background-size: auto 57%;
            background-position: 40% top;
          }

          .paid-heading h2 {
            font-size: 38px;
          }

          .paid-benefits {
            top: 450px;
          }

          .cta-title {
            max-width: 140px;
          }
        }
      `}</style>
        </main>
    );
}

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
          padding: 22px 0 24px;
          border-bottom: 1px solid #e0d9d6;
        }

        .category-row:first-child {
          padding-top: 0;
        }

        .category-top {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;
        }

        .category-title {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 34px;
          line-height: 1;
          letter-spacing: -1.4px;
        }

        .category-subtitle {
          margin-top: 7px;
          color: #8e8688;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 14px;
          line-height: 1.3;
          font-weight: 600;
        }

        .category-score {
          display: flex;
          align-items: baseline;
          flex-shrink: 0;
          color: #7f7679;
          font-family: Georgia, "Times New Roman", serif;
        }

        .category-score strong {
          color: #c21856;
          font-size: 48px;
          line-height: 0.8;
          font-weight: 400;
          letter-spacing: -2px;
        }

        .category-score span {
          margin-left: 3px;
          font-size: 20px;
        }

        .category-track {
          height: 8px;
          margin-top: 16px;
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
            padding: 18px 0 20px;
          }

          .category-title {
            font-size: 29px;
          }

          .category-subtitle {
            margin-top: 5px;
            padding-right: 10px;
            font-size: 12px;
          }

          .category-score strong {
            font-size: 40px;
          }

          .category-score span {
            font-size: 17px;
          }

          .category-track {
            margin-top: 13px;
            height: 7px;
          }
        }
      `}</style>
        </div>
    );
}

function Benefit({
                     icon,
                     text,
                 }: {
    icon: string;
    text: React.ReactNode;
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
          grid-template-columns: 28px 1fr;
          gap: 15px;
          align-items: start;

          color: #fff8f6;
        }

        .benefit-icon {
          padding-top: 2px;

          color: #ffd6df;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 22px;
          line-height: 1;
          font-weight: 800;
          text-align: center;
        }

        .benefit-text {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 17px;
          line-height: 1.28;
          font-weight: 600;

          text-shadow:
            0 1px 10px rgba(65, 0, 27, 0.1);
        }

        @media (max-width: 640px) {
          .benefit {
            grid-template-columns: 19px 1fr;
            gap: 8px;
          }

          .benefit-icon {
            font-size: 15px;
          }

          .benefit-text {
            font-size: 12px;
            line-height: 1.25;
          }
        }
      `}</style>
        </div>
    );
}