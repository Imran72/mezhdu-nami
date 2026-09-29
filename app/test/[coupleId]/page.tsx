'use client';

import {
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    useParams,
    useRouter,
    useSearchParams,
} from 'next/navigation';

import {
    chapters,
    questions,
    Question,
} from '../../../lib/questions';

type Answers = Record<string, string>;

type Couple = {
    id: string;
    partner_a_name?: string;
    partner_b_name?: string;
    partner_a_completed?: boolean;
    partner_b_completed?: boolean;
};

type ChapterIntro = {
    chapter: number;
    intro: string;
    subtitle: string;
};

const microReactions: Record<number, string> = {
    2: 'интересно 👀',
    6: 'запомним это',
    10: 'вот это потом сравним',
};

export default function TestPage() {
    const params =
        useParams<{ coupleId: string }>();

    const searchParams =
        useSearchParams();

    const router =
        useRouter();

    const coupleId =
        params.coupleId;

    const role =
        searchParams.get('role') === 'b'
            ? 'b'
            : 'a';

    const [currentIndex, setCurrentIndex] =
        useState(0);

    const [answers, setAnswers] =
        useState<Answers>({});

    const [checking, setChecking] =
        useState(true);

    const [submitting, setSubmitting] =
        useState(false);

    const [error, setError] =
        useState('');

    const [
        selectedValue,
        setSelectedValue,
    ] = useState<string | null>(null);

    const [
        transitionDirection,
        setTransitionDirection,
    ] = useState<'next' | 'back'>(
        'next'
    );

    const [
        showChapterIntro,
        setShowChapterIntro,
    ] = useState<ChapterIntro | null>(
        null
    );

    const [
        showReaction,
        setShowReaction,
    ] = useState<string | null>(null);

    const currentQuestion =
        questions[currentIndex];

    const progress =
        useMemo(() => {
            if (!questions.length) {
                return 0;
            }

            return (
                (currentIndex /
                    questions.length) *
                100
            );
        }, [currentIndex]);

    const progressText =
        useMemo(() => {
            const ratio =
                currentIndex /
                questions.length;

            if (ratio < 0.2) {
                return 'только начали';
            }

            if (ratio < 0.45) {
                return 'втянулись';
            }

            if (ratio < 0.7) {
                return 'уже больше половины';
            }

            if (ratio < 0.9) {
                return 'ещё совсем немного';
            }

            return 'почти всё';
        }, [currentIndex]);

    /*
     * Проверяем состояние пары.
     */
    useEffect(() => {
        async function checkCouple() {
            try {
                const response =
                    await fetch(
                        `/api/couples?id=${encodeURIComponent(
                            coupleId
                        )}`,
                        {
                            cache: 'no-store',
                        }
                    );

                if (!response.ok) {
                    throw new Error(
                        'Не удалось загрузить пару'
                    );
                }

                const couple: Couple =
                    await response.json();

                /*
                 * Оба уже прошли.
                 */
                if (
                    couple.partner_a_completed &&
                    couple.partner_b_completed
                ) {
                    router.replace(
                        `/result/${coupleId}`
                    );

                    return;
                }

                /*
                 * Первый уже проходил.
                 */
                if (
                    role === 'a' &&
                    couple.partner_a_completed
                ) {
                    router.replace(
                        `/waiting/${coupleId}`
                    );

                    return;
                }

                /*
                 * Второй уже проходил.
                 */
                if (
                    role === 'b' &&
                    couple.partner_b_completed
                ) {
                    if (
                        couple.partner_a_completed
                    ) {
                        router.replace(
                            `/result/${coupleId}`
                        );
                    } else {
                        router.replace(
                            `/waiting/${coupleId}`
                        );
                    }

                    return;
                }
            } catch (err) {
                console.error(err);
            } finally {
                setChecking(false);
            }
        }

        checkCouple();
    }, [
        coupleId,
        role,
        router,
    ]);

    /*
     * Если пользователь возвращается назад,
     * подсвечиваем его предыдущий ответ.
     */
    useEffect(() => {
        if (!currentQuestion) {
            return;
        }

        const existing =
            answers[currentQuestion.id];

        setSelectedValue(
            existing ?? null
        );
    }, [
        currentIndex,
        currentQuestion,
        answers,
    ]);

    function getChapterIntro(
        chapterNumber: number
    ): ChapterIntro | null {
        const chapter =
            chapters.find(
                (item) =>
                    item.id === chapterNumber
            );

        if (!chapter) {
            return null;
        }

        return {
            chapter: chapter.id,
            intro: chapter.intro,
            subtitle: chapter.subtitle,
        };
    }

    async function chooseAnswer(
        value: string
    ) {
        if (
            selectedValue !== null ||
            submitting ||
            showReaction ||
            showChapterIntro
        ) {
            return;
        }

        if (!currentQuestion) {
            return;
        }

        setSelectedValue(value);

        const newAnswers: Answers = {
            ...answers,
            [currentQuestion.id]: value,
        };

        setAnswers(newAnswers);

        /*
         * Маленькая задержка,
         * чтобы пользователь увидел выбор.
         */
        await sleep(260);

        const isLastQuestion =
            currentIndex ===
            questions.length - 1;

        if (isLastQuestion) {
            await submitAnswers(
                newAnswers
            );

            return;
        }

        const nextIndex =
            currentIndex + 1;

        const nextQuestion =
            questions[nextIndex];

        /*
         * Иногда показываем короткую
         * реакцию между вопросами.
         */
        const reaction =
            microReactions[
                currentIndex
                ];

        if (reaction) {
            setShowReaction(
                reaction
            );

            await sleep(850);

            setShowReaction(null);
        }

        /*
         * Если начинается новая глава —
         * показываем перебивку.
         */
        if (
            nextQuestion &&
            nextQuestion.chapter !==
            currentQuestion.chapter
        ) {
            const intro =
                getChapterIntro(
                    nextQuestion.chapter
                );

            if (intro) {
                setShowChapterIntro(
                    intro
                );

                return;
            }
        }

        setTransitionDirection(
            'next'
        );

        setCurrentIndex(
            nextIndex
        );

        setSelectedValue(null);
    }

    function continueChapter() {
        if (!showChapterIntro) {
            return;
        }

        setShowChapterIntro(null);

        setTransitionDirection(
            'next'
        );

        setCurrentIndex(
            (index) => index + 1
        );

        setSelectedValue(null);
    }

    function goBack() {
        if (
            currentIndex === 0 ||
            submitting
        ) {
            return;
        }

        setTransitionDirection(
            'back'
        );

        setShowChapterIntro(null);
        setShowReaction(null);

        setCurrentIndex(
            (index) => index - 1
        );
    }

    async function submitAnswers(
        finalAnswers: Answers
    ) {
        if (submitting) {
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const response =
                await fetch(
                    '/api/answers',
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type':
                                'application/json',
                        },

                        body: JSON.stringify({
                            coupleId,
                            role,
                            answers:
                            finalAnswers,
                        }),
                    }
                );

            if (!response.ok) {
                const body =
                    await response.text();

                console.error(
                    'Answers API:',
                    response.status,
                    body
                );

                throw new Error(
                    'Не удалось сохранить ответы'
                );
            }

            /*
             * Второй человек завершил тест —
             * сразу показываем результат.
             */
            if (role === 'b') {
                router.replace(
                    `/result/${coupleId}`
                );

                return;
            }

            /*
             * Первый человек ждёт партнёра.
             */
            router.replace(
                `/waiting/${coupleId}`
            );
        } catch (err) {
            console.error(err);

            setError(
                'Не получилось сохранить ответы. Попробуй ещё раз.'
            );

            setSubmitting(false);
            setSelectedValue(null);
        }
    }

    if (checking) {
        return (
            <LoadingScreen
                text="секунду..."
            />
        );
    }

    if (!currentQuestion) {
        return (
            <LoadingScreen
                text="что-то пошло не так"
            />
        );
    }

    /*
     * Короткая реакция между вопросами.
     */
    if (showReaction) {
        return (
            <main className="reaction-page">

                <div className="reaction-orbit">
                    <div className="reaction-circle reaction-circle-a" />
                    <div className="reaction-circle reaction-circle-b" />
                </div>

                <div className="reaction-text">
                    {showReaction}
                </div>

                <style jsx>{styles}</style>
            </main>
        );
    }

    /*
     * Перебивка между главами.
     */
    if (showChapterIntro) {
        return (
            <main className="chapter-page">

                <div className="chapter-inner">

                    <div className="chapter-number">
                        0{showChapterIntro.chapter}
                    </div>

                    <div className="chapter-orbit">
                        <div className="chapter-circle chapter-circle-a" />
                        <div className="chapter-circle chapter-circle-b" />
                    </div>

                    <h1 className="chapter-title">
                        {showChapterIntro.intro}
                    </h1>

                    <p className="chapter-subtitle">
                        {showChapterIntro.subtitle}
                    </p>

                    <button
                        type="button"
                        className="chapter-button"
                        onClick={
                            continueChapter
                        }
                    >
                        продолжить →
                    </button>

                </div>

                <style jsx>{styles}</style>

            </main>
        );
    }

    return (
        <main className="test-page">

            <div className="test-shell">

                <header className="test-header">

                    <button
                        type="button"
                        className="back-button"
                        onClick={goBack}
                        disabled={
                            currentIndex === 0 ||
                            submitting
                        }
                        aria-label="Назад"
                    >
                        ←
                    </button>

                    <div className="progress-area">

                        <div className="progress-copy">
                            {progressText}
                        </div>

                        <div className="progress-track">
                            <div
                                className="progress-value"
                                style={{
                                    width: `${progress}%`,
                                }}
                            />
                        </div>

                    </div>

                    <div className="question-position">
                        {currentIndex + 1}
                        <span>/</span>
                        {questions.length}
                    </div>

                </header>

                <section
                    key={currentQuestion.id}
                    className={
                        transitionDirection ===
                        'next'
                            ? 'question-screen question-screen-next'
                            : 'question-screen question-screen-back'
                    }
                >

                    <div className="question-meta">

                        <span className="question-dot" />

                        {currentQuestion.eyebrow}

                    </div>

                    <h1 className="question-title">
                        {currentQuestion.text}
                    </h1>

                    {currentQuestion.description && (
                        <p className="question-description">
                            {
                                currentQuestion.description
                            }
                        </p>
                    )}

                    <div
                        className={
                            currentQuestion.visualType ===
                            'big-buttons'
                                ? 'answers answers-big'
                                : 'answers'
                        }
                    >

                        {currentQuestion.options.map(
                            (
                                option,
                                index
                            ) => {
                                const selected =
                                    selectedValue ===
                                    option.value;

                                return (
                                    <button
                                        key={
                                            option.value
                                        }
                                        type="button"
                                        disabled={
                                            submitting ||
                                            (selectedValue !==
                                                null &&
                                                !selected)
                                        }
                                        className={
                                            selected
                                                ? 'answer-card answer-card-selected'
                                                : 'answer-card'
                                        }
                                        style={{
                                            animationDelay:
                                                `${
                                                    index * 45
                                                }ms`,
                                        }}
                                        onClick={() =>
                                            chooseAnswer(
                                                option.value
                                            )
                                        }
                                    >

                    <span className="answer-text">
                      {option.label}
                    </span>

                                        <span className="answer-arrow">
                      →
                    </span>

                                    </button>
                                );
                            }
                        )}

                    </div>

                    {submitting && (
                        <div className="submitting">

                            <div className="submitting-dots">
                                <span />
                                <span />
                                <span />
                            </div>

                            <div>
                                собираем вашу картину...
                            </div>

                        </div>
                    )}

                    {error && (
                        <div className="error">
                            {error}
                        </div>
                    )}

                </section>

            </div>

            <style jsx>{styles}</style>

        </main>
    );
}

function LoadingScreen({
                           text,
                       }: {
    text: string;
}) {
    return (
        <main className="loading-page">

            <div className="loading-orbit">
                <div className="loading-circle loading-circle-a" />
                <div className="loading-circle loading-circle-b" />
            </div>

            <div className="loading-copy">
                {text}
            </div>

            <style jsx>{styles}</style>

        </main>
    );
}

function sleep(
    milliseconds: number
) {
    return new Promise<void>(
        (resolve) => {
            window.setTimeout(
                resolve,
                milliseconds
            );
        }
    );
}

const styles = `

  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
  }

  button {
    font-family: inherit;
  }

  /* ============================================================
     TEST
  ============================================================ */

  .test-page {
    min-height: 100svh;

    background:
      radial-gradient(
        circle at 85% 10%,
        rgba(207, 143, 166, 0.12),
        transparent 30%
      ),
      #faf8f6;

    color: #171515;

    padding:
      max(
        26px,
        env(safe-area-inset-top)
      )
      20px
      max(
        42px,
        env(safe-area-inset-bottom)
      );
  }

  .test-shell {
    width: 100%;
    max-width: 760px;

    margin: 0 auto;
  }

  /* ============================================================
     HEADER
  ============================================================ */

  .test-header {
    display: grid;

    grid-template-columns:
      46px
      minmax(0, 1fr)
      46px;

    align-items: center;

    gap: 14px;
  }

  .back-button {
    width: 42px;
    height: 42px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid #e9dfdc;
    border-radius: 50%;

    background:
      rgba(
        255,
        255,
        255,
        0.72
      );

    color: #554d4f;

    font-size: 20px;

    cursor: pointer;

    transition:
      transform 150ms ease,
      opacity 150ms ease,
      background 150ms ease;
  }

  .back-button:hover:not(:disabled) {
    background: #ffffff;

    transform:
      translateX(-2px);
  }

  .back-button:disabled {
    opacity: 0;
    pointer-events: none;
  }

  .progress-area {
    min-width: 0;
  }

  .progress-copy {
    margin-bottom: 8px;

    color: #9c9193;

    font-size: 11px;
    font-weight: 650;

    letter-spacing: 0.04em;

    text-align: center;
  }

  .progress-track {
    width: 100%;
    height: 4px;

    overflow: hidden;

    border-radius: 999px;

    background: #ebe2e2;
  }

  .progress-value {
    height: 100%;

    border-radius: inherit;

    background:
      linear-gradient(
        90deg,
        #9e3f64,
        #d28ba5
      );

    transition:
      width 420ms
      cubic-bezier(
        0.22,
        1,
        0.36,
        1
      );
  }

  .question-position {
    color: #8f8587;

    font-size: 12px;
    font-weight: 650;

    text-align: right;
  }

  .question-position span {
    margin: 0 2px;

    color: #c5babc;
  }

  /* ============================================================
     QUESTION
  ============================================================ */

  .question-screen {
    width: 100%;

    padding-top: 84px;
  }

  .question-screen-next {
    animation:
      questionInNext
      480ms
      cubic-bezier(
        0.22,
        1,
        0.36,
        1
      )
      both;
  }

  .question-screen-back {
    animation:
      questionInBack
      420ms
      cubic-bezier(
        0.22,
        1,
        0.36,
        1
      )
      both;
  }

  @keyframes questionInNext {
    from {
      opacity: 0;
      transform:
        translateY(14px);
    }

    to {
      opacity: 1;
      transform:
        translateY(0);
    }
  }

  @keyframes questionInBack {
    from {
      opacity: 0;
      transform:
        translateY(-10px);
    }

    to {
      opacity: 1;
      transform:
        translateY(0);
    }
  }

  .question-meta {
    display: flex;
    align-items: center;

    gap: 8px;

    margin-bottom: 20px;

    color: #a5486b;

    font-size: 11px;
    font-weight: 750;

    letter-spacing: 0.13em;
  }

  .question-dot {
    width: 6px;
    height: 6px;

    border-radius: 50%;

    background: #c76f90;
  }

  .question-title {
    max-width: 720px;

    margin: 0;

    color: #171515;

    font-family:
      Georgia,
      'Times New Roman',
      serif;

    font-size:
      clamp(
        40px,
        5.4vw,
        62px
      );

    line-height: 1.02;

    font-weight: 500;

    letter-spacing: -0.04em;

    text-wrap: balance;
  }

  .question-description {
    max-width: 610px;

    margin:
      20px
      0
      0;

    color: #8b8183;

    font-size: 16px;
    line-height: 1.5;
  }

  /* ============================================================
     ANSWERS
  ============================================================ */

  .answers {
    width: 100%;

    display: flex;
    flex-direction: column;

    gap: 11px;

    margin-top: 38px;
  }

  .answer-card {
    width: 100%;
    min-height: 68px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 20px;

    border:
      1px solid #e7ddda;

    border-radius: 19px;

    background:
      rgba(
        255,
        255,
        255,
        0.78
      );

    color: #262122;

    padding: 18px 20px;

    text-align: left;

    font-size: 17px;
    line-height: 1.35;

    cursor: pointer;

    opacity: 0;

    animation:
      cardIn
      430ms
      cubic-bezier(
        0.22,
        1,
        0.36,
        1
      )
      forwards;

    transition:
      border-color 160ms ease,
      background 160ms ease,
      transform 160ms ease,
      box-shadow 160ms ease,
      opacity 160ms ease;
  }

  @keyframes cardIn {
    from {
      opacity: 0;

      transform:
        translateY(8px);
    }

    to {
      opacity: 1;

      transform:
        translateY(0);
    }
  }

  .answer-card:hover:not(:disabled) {
    border-color:
      rgba(
        171,
        73,
        109,
        0.48
      );

    background: #ffffff;

    transform:
      translateY(-2px);

    box-shadow:
      0 10px 28px
      rgba(
        75,
        44,
        55,
        0.06
      );
  }

  .answer-card:active:not(:disabled) {
    transform:
      scale(0.992);
  }

  .answer-card:disabled {
    cursor: default;
  }

  .answer-card:disabled:not(
    .answer-card-selected
  ) {
    opacity: 0.38 !important;
  }

  .answer-card-selected {
    border-color: #aa4b6e;

    background: #f4e4ea;

    transform:
      scale(0.992);

    box-shadow:
      0 0 0 2px
      rgba(
        170,
        75,
        110,
        0.08
      );
  }

  .answer-text {
    flex: 1;
  }

  .answer-arrow {
    flex-shrink: 0;

    color: #b9abad;

    font-size: 17px;

    transition:
      transform 160ms ease,
      color 160ms ease;
  }

  .answer-card:hover
  .answer-arrow {
    color: #a5486b;

    transform:
      translateX(3px);
  }

  .answer-card-selected
  .answer-arrow {
    color: #a5486b;

    transform:
      translateX(4px);
  }

  /* ============================================================
     BIG BUTTON QUESTION
  ============================================================ */

  .answers-big {
    display: grid;

    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );

    gap: 12px;
  }

  .answers-big
  .answer-card {
    min-height: 112px;

    justify-content: center;

    padding: 22px;

    text-align: center;

    font-size: 14px;
    font-weight: 750;

    letter-spacing: 0.04em;
  }

  .answers-big
  .answer-arrow {
    display: none;
  }

  /* ============================================================
     SUBMIT
  ============================================================ */

  .submitting {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 10px;

    margin-top: 24px;

    color: #8d8284;

    font-size: 13px;
  }

  .submitting-dots {
    display: flex;

    gap: 3px;
  }

  .submitting-dots span {
    width: 5px;
    height: 5px;

    border-radius: 50%;

    background: #b45778;

    animation:
      loadingDot
      900ms
      infinite
      alternate;
  }

  .submitting-dots span:nth-child(2) {
    animation-delay: 150ms;
  }

  .submitting-dots span:nth-child(3) {
    animation-delay: 300ms;
  }

  @keyframes loadingDot {
    from {
      opacity: 0.25;
      transform:
        translateY(1px);
    }

    to {
      opacity: 1;
      transform:
        translateY(-2px);
    }
  }

  .error {
    margin-top: 20px;

    color: #a5486b;

    font-size: 14px;
    line-height: 1.45;

    text-align: center;
  }

  /* ============================================================
     CHAPTER
  ============================================================ */

  .chapter-page {
    min-height: 100svh;

    display: flex;
    align-items: center;
    justify-content: center;

    box-sizing: border-box;

    background:
      radial-gradient(
        circle at 50% 35%,
        rgba(
          198,
          111,
          144,
          0.14
        ),
        transparent 34%
      ),
      #faf8f6;

    padding: 24px;
  }

  .chapter-inner {
    width: 100%;
    max-width: 680px;

    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: center;

    animation:
      chapterIn
      600ms
      cubic-bezier(
        0.22,
        1,
        0.36,
        1
      )
      both;
  }

  @keyframes chapterIn {
    from {
      opacity: 0;

      transform:
        translateY(16px);
    }

    to {
      opacity: 1;

      transform:
        translateY(0);
    }
  }

  .chapter-number {
    margin-bottom: 28px;

    color: #b85b7d;

    font-size: 11px;
    font-weight: 750;

    letter-spacing: 0.15em;
  }

  .chapter-orbit {
    position: relative;

    width: 156px;
    height: 90px;

    margin-bottom: 34px;
  }

  .chapter-circle {
    position: absolute;

    width: 90px;
    height: 90px;

    border-radius: 50%;
  }

  .chapter-circle-a {
    left: 0;

    background:
      rgba(
        163,
        66,
        102,
        0.45
      );
  }

  .chapter-circle-b {
    right: 0;

    background:
      rgba(
        221,
        159,
        181,
        0.42
      );
  }

  .chapter-title {
    margin: 0;

    color: #171515;

    font-family:
      Georgia,
      'Times New Roman',
      serif;

    font-size:
      clamp(
        42px,
        6vw,
        66px
      );

    line-height: 1;

    font-weight: 500;

    letter-spacing: -0.045em;

    text-wrap: balance;
  }

  .chapter-subtitle {
    max-width: 520px;

    margin:
      22px
      auto
      0;

    color: #8c8184;

    font-size: 18px;
    line-height: 1.5;
  }

  .chapter-button {
    margin-top: 38px;

    border: 0;

    background: transparent;
    color: #9f4567;

    padding: 12px;

    font-size: 15px;
    font-weight: 700;

    cursor: pointer;
  }

  .chapter-button:hover {
    opacity: 0.7;
  }

  /* ============================================================
     REACTION
  ============================================================ */

  .reaction-page {
    min-height: 100svh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background: #faf8f6;

    padding: 24px;
  }

  .reaction-orbit {
    position: relative;

    width: 110px;
    height: 64px;

    margin-bottom: 28px;
  }

  .reaction-circle {
    position: absolute;

    width: 64px;
    height: 64px;

    border-radius: 50%;

    animation:
      reactionPulse
      850ms
      ease
      both;
  }

  .reaction-circle-a {
    left: 0;

    background:
      rgba(
        164,
        65,
        101,
        0.42
      );
  }

  .reaction-circle-b {
    right: 0;

    background:
      rgba(
        221,
        158,
        180,
        0.4
      );
  }

  @keyframes reactionPulse {
    0% {
      transform:
        scale(0.92);
    }

    50% {
      transform:
        scale(1.04);
    }

    100% {
      transform:
        scale(1);
    }
  }

  .reaction-text {
    color: #211d1e;

    font-family:
      Georgia,
      'Times New Roman',
      serif;

    font-size: 30px;

    animation:
      reactionText
      450ms
      ease
      both;
  }

  @keyframes reactionText {
    from {
      opacity: 0;

      transform:
        translateY(6px);
    }

    to {
      opacity: 1;

      transform:
        translateY(0);
    }
  }

  /* ============================================================
     LOADING
  ============================================================ */

  .loading-page {
    min-height: 100svh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background: #faf8f6;

    padding: 24px;
  }

  .loading-orbit {
    position: relative;

    width: 110px;
    height: 64px;

    margin-bottom: 24px;
  }

  .loading-circle {
    position: absolute;

    width: 64px;
    height: 64px;

    border-radius: 50%;

    animation:
      loadingPulse
      1.2s
      ease-in-out
      infinite
      alternate;
  }

  .loading-circle-a {
    left: 0;

    background:
      rgba(
        164,
        65,
        101,
        0.42
      );
  }

  .loading-circle-b {
    right: 0;

    background:
      rgba(
        221,
        158,
        180,
        0.4
      );

    animation-delay:
      180ms;
  }

  @keyframes loadingPulse {
    from {
      transform:
        translateX(-2px);
    }

    to {
      transform:
        translateX(4px);
    }
  }

  .loading-copy {
    color: #8d8284;

    font-size: 14px;
  }

  /* ============================================================
     MOBILE
  ============================================================ */

  @media (
    max-width: 600px
  ) {

    .test-page {
      padding-left: 16px;
      padding-right: 16px;
    }

    .test-header {
      grid-template-columns:
        40px
        minmax(0, 1fr)
        40px;

      gap: 10px;
    }

    .back-button {
      width: 38px;
      height: 38px;

      font-size: 18px;
    }

    .question-screen {
      padding-top: 54px;
    }

    .question-meta {
      margin-bottom: 15px;

      font-size: 10px;
    }

    .question-title {
      font-size: 38px;

      line-height: 1.03;
    }

    .question-description {
      margin-top: 15px;

      font-size: 14px;
    }

    .answers {
      gap: 9px;

      margin-top: 28px;
    }

    .answer-card {
      min-height: 61px;

      padding: 15px 16px;

      border-radius: 16px;

      font-size: 15px;
    }

    .answers-big {
      grid-template-columns: 1fr;

      gap: 9px;
    }

    .answers-big
    .answer-card {
      min-height: 70px;

      font-size: 13px;
    }

    .chapter-title {
      font-size: 44px;
    }

    .chapter-subtitle {
      font-size: 16px;
    }

  }

  /* ============================================================
     REDUCED MOTION
  ============================================================ */

  @media (
    prefers-reduced-motion:
    reduce
  ) {

    *,
    *::before,
    *::after {
      animation-duration:
        0.01ms !important;

      animation-iteration-count:
        1 !important;

      transition-duration:
        0.01ms !important;
    }

  }

`;