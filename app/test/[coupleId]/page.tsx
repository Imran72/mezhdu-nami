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

    const [
        currentIndex,
        setCurrentIndex,
    ] = useState(0);

    const [
        answers,
        setAnswers,
    ] = useState<Answers>({});

    const [
        checking,
        setChecking,
    ] = useState(true);

    const [
        submitting,
        setSubmitting,
    ] = useState(false);

    const [
        moving,
        setMoving,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState('');

    const [
        selectedValue,
        setSelectedValue,
    ] = useState<string | null>(null);

    const [
        transitionDirection,
        setTransitionDirection,
    ] = useState<'next' | 'back'>('next');

    const [
        showChapterIntro,
        setShowChapterIntro,
    ] = useState<ChapterIntro | null>(null);

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
                ((currentIndex + 1) /
                    questions.length) *
                100
            );
        }, [currentIndex]);

    const progressText =
        useMemo(() => {
            const ratio =
                (currentIndex + 1) /
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

                if (
                    couple.partner_a_completed &&
                    couple.partner_b_completed
                ) {
                    router.replace(
                        `/result/${coupleId}`
                    );

                    return;
                }

                if (
                    role === 'a' &&
                    couple.partner_a_completed
                ) {
                    router.replace(
                        `/waiting/${coupleId}`
                    );

                    return;
                }

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
            moving ||
            submitting ||
            showReaction ||
            showChapterIntro ||
            !currentQuestion
        ) {
            return;
        }

        setMoving(true);
        setError('');
        setSelectedValue(value);

        const newAnswers: Answers = {
            ...answers,
            [currentQuestion.id]: value,
        };

        setAnswers(newAnswers);

        await sleep(220);

        const isLastQuestion =
            currentIndex ===
            questions.length - 1;

        if (isLastQuestion) {
            await submitAnswers(
                newAnswers
            );

            setMoving(false);

            return;
        }

        const nextIndex =
            currentIndex + 1;

        const nextQuestion =
            questions[nextIndex];

        const reaction =
            microReactions[currentIndex];

        if (reaction) {
            setShowReaction(
                reaction
            );

            await sleep(750);

            setShowReaction(null);
        }

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

                setMoving(false);

                return;
            }
        }

        setTransitionDirection(
            'next'
        );

        setCurrentIndex(
            nextIndex
        );

        setMoving(false);
    }

    function continueChapter() {
        if (
            !showChapterIntro ||
            moving ||
            submitting
        ) {
            return;
        }

        setShowChapterIntro(null);

        setTransitionDirection(
            'next'
        );

        setCurrentIndex(
            (index) =>
                Math.min(
                    index + 1,
                    questions.length - 1
                )
        );
    }

    function goBack() {
        if (
            currentIndex === 0 ||
            submitting ||
            moving
        ) {
            return;
        }

        setTransitionDirection(
            'back'
        );

        setShowChapterIntro(null);
        setShowReaction(null);
        setError('');

        setCurrentIndex(
            (index) =>
                Math.max(
                    index - 1,
                    0
                )
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

            if (role === 'b') {
                router.replace(
                    `/result/${coupleId}`
                );

                return;
            }

            router.replace(
                `/waiting/${coupleId}`
            );
        } catch (err) {
            console.error(err);

            setError(
                'Не получилось сохранить ответы. Попробуй ещё раз.'
            );

            setSubmitting(false);
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
                            submitting ||
                            moving
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
                                    width:
                                        `${progress}%`,
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
                    key={
                        currentQuestion.id
                    }
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
                                            moving
                                        }
                                        className={
                                            selected
                                                ? 'answer-card answer-card-selected'
                                                : 'answer-card'
                                        }
                                        style={{
                                            animationDelay:
                                                `${index * 45}ms`,
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
      max(28px, env(safe-area-inset-top))
      6vw
      56px;
  }

  .test-shell {
    width: min(1120px, 100%);
    margin: 0 auto;
  }

  .test-header {
    display: grid;
    grid-template-columns:
      64px
      minmax(0, 1fr)
      72px;

    gap: 26px;
    align-items: center;
  }

  .back-button {
    width: 56px;
    height: 56px;

    display: grid;
    place-items: center;

    padding: 0;

    border:
      1px solid
      #e4d9d6;

    border-radius: 50%;

    cursor: pointer;

    color: #4f4949;
    background:
      rgba(255,255,255,.55);

    font-size: 31px;
    font-weight: 300;

    transition:
      transform .16s ease,
      opacity .16s ease,
      background .16s ease;
  }

  .back-button:hover:not(:disabled) {
    transform: translateX(-2px);
    background: #fff;
  }

  .back-button:disabled {
    opacity: .25;
    cursor: default;
  }

  .progress-area {
    min-width: 0;
  }

  .progress-copy {
    margin-bottom: 12px;

    color: #9c9293;

    font-family:
      Arial,
      Helvetica,
      sans-serif;

    font-size: 12px;
    font-weight: 700;

    letter-spacing: 1.2px;

    text-align: center;
  }

  .progress-track {
    width: 100%;
    height: 6px;

    overflow: hidden;

    border-radius: 999px;

    background: #e9e1e0;
  }

  .progress-value {
    height: 100%;

    border-radius: inherit;

    background:
      linear-gradient(
        90deg,
        #ae315f,
        #db8ca8
      );

    transition:
      width .35s ease;
  }

  .question-position {
    color: #8e8586;

    font-family:
      Arial,
      Helvetica,
      sans-serif;

    font-size: 16px;
    font-weight: 700;

    text-align: right;
  }

  .question-position span {
    margin: 0 3px;
    color: #bbb1b2;
  }

  .question-screen {
    width: min(1040px, 100%);

    margin:
      clamp(92px, 13vh, 150px)
      auto
      0;
  }

  .question-screen-next {
    animation:
      questionInNext
      .34s
      cubic-bezier(.22,.8,.32,1)
      both;
  }

  .question-screen-back {
    animation:
      questionInBack
      .34s
      cubic-bezier(.22,.8,.32,1)
      both;
  }

  .question-meta {
    display: flex;
    align-items: center;

    gap: 10px;

    margin-bottom: 28px;

    color: #ad3561;

    font-family:
      Arial,
      Helvetica,
      sans-serif;

    font-size: 12px;
    line-height: 1;

    font-weight: 800;

    letter-spacing: 2.4px;

    text-transform: uppercase;
  }

  .question-dot {
    width: 8px;
    height: 8px;

    border-radius: 50%;

    background: #d16388;
  }

  .question-title {
    max-width: 930px;

    margin: 0;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        54px,
        6.1vw,
        86px
      );

    line-height: .93;

    font-weight: 400;

    letter-spacing: -4px;
  }

  .question-description {
    max-width: 660px;

    margin:
      24px
      0
      0;

    color: #8d8384;

    font-family:
      Arial,
      Helvetica,
      sans-serif;

    font-size: 15px;
    line-height: 1.55;
  }

  .answers {
    display: flex;
    flex-direction: column;

    gap: 14px;

    margin-top: 56px;
  }

  .answer-card {
    width: 100%;
    min-height: 86px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 24px;

    padding:
      0
      27px;

    border:
      1px solid
      #e8dfdd;

    border-radius: 24px;

    cursor: pointer;

    color: #aaa3a3;

    background:
      rgba(
        255,
        255,
        255,
        .34
      );

    font-family:
      Arial,
      Helvetica,
      sans-serif;

    font-size: 21px;
    line-height: 1.3;

    text-align: left;

    opacity: 0;

    animation:
      answerIn
      .35s
      ease
      forwards;

    transition:
      border-color .18s ease,
      color .18s ease,
      background .18s ease,
      transform .18s ease;
  }

  .answer-card:hover:not(:disabled) {
    transform:
      translateY(-1px);

    color: #4b4144;

    border-color: #d69aae;

    background:
      rgba(
        255,
        249,
        251,
        .82
      );
  }

  .answer-card-selected {
    color: #2b2325;

    border-color:
      #c93a6b;

    background:
      #f4e1e7;

    box-shadow:
      inset
      0
      0
      0
      1px
      rgba(
        201,
        58,
        107,
        .12
      );
  }

  .answer-card:disabled {
    cursor: default;
  }

  .answer-text {
    min-width: 0;
  }

  .answer-arrow {
    flex-shrink: 0;

    color: #d7cecc;

    font-family:
      Georgia,
      serif;

    font-size: 27px;
  }

  .answer-card-selected
  .answer-arrow {
    color: #b53664;
  }

  .answers-big {
    display: grid;

    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );

    gap: 16px;
  }

  .answers-big
  .answer-card {
    min-height: 124px;
  }

  .submitting {
    display: flex;
    align-items: center;

    gap: 12px;

    margin-top: 26px;

    color: #8e8586;

    font-family:
      Arial,
      Helvetica,
      sans-serif;

    font-size: 12px;
  }

  .submitting-dots {
    display: flex;
    gap: 4px;
  }

  .submitting-dots span {
    width: 5px;
    height: 5px;

    border-radius: 50%;

    background: #c63b6a;

    animation:
      loadingDot
      1s
      infinite;
  }

  .submitting-dots span:nth-child(2) {
    animation-delay: .12s;
  }

  .submitting-dots span:nth-child(3) {
    animation-delay: .24s;
  }

  .error {
    margin-top: 20px;

    color: #b72e55;

    font-family:
      Arial,
      Helvetica,
      sans-serif;

    font-size: 12px;
  }

  .reaction-page,
  .chapter-page,
  .loading-page {
    min-height: 100svh;

    display: grid;
    place-items: center;

    padding: 28px;

    color: #201c1e;

    background:
      radial-gradient(
        circle at 60% 35%,
        rgba(210, 101, 139, .12),
        transparent 28%
      ),
      #faf8f6;
  }

  .reaction-page {
    align-content: center;
    gap: 28px;
  }

  .reaction-orbit,
  .loading-orbit {
    position: relative;

    width: 86px;
    height: 58px;
  }

  .reaction-circle,
  .loading-circle {
    position: absolute;

    top: 0;

    width: 58px;
    height: 58px;

    border-radius: 50%;
  }

  .reaction-circle-a,
  .loading-circle-a {
    left: 0;

    background:
      rgba(
        202,
        50,
        103,
        .82
      );
  }

  .reaction-circle-b,
  .loading-circle-b {
    left: 28px;

    border:
      1px solid
      #c93267;

    background:
      rgba(
        250,
        248,
        246,
        .72
      );
  }

  .reaction-text,
  .loading-copy {
    color: #766c6e;

    font-family:
      Arial,
      Helvetica,
      sans-serif;

    font-size: 14px;
    font-weight: 700;

    letter-spacing: .3px;
  }

  .chapter-inner {
    width: min(720px, 100%);

    text-align: center;
  }

  .chapter-number {
    margin-bottom: 25px;

    color: #c02d60;

    font-family:
      Arial,
      Helvetica,
      sans-serif;

    font-size: 10px;
    font-weight: 800;

    letter-spacing: 2.5px;
  }

  .chapter-orbit {
    position: relative;

    width: 110px;
    height: 72px;

    margin:
      0
      auto
      36px;
  }

  .chapter-circle {
    position: absolute;

    top: 0;

    width: 72px;
    height: 72px;

    border-radius: 50%;
  }

  .chapter-circle-a {
    left: 0;

    background: #cc3c6e;
  }

  .chapter-circle-b {
    left: 38px;

    border:
      1px solid
      #cc3c6e;

    background:
      rgba(
        250,
        248,
        246,
        .72
      );
  }

  .chapter-title {
    margin: 0;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        47px,
        6vw,
        74px
      );

    line-height: .95;

    font-weight: 400;

    letter-spacing: -3px;
  }

  .chapter-subtitle {
    max-width: 520px;

    margin:
      21px
      auto
      0;

    color: #8b8183;

    font-family:
      Arial,
      Helvetica,
      sans-serif;

    font-size: 14px;
    line-height: 1.55;
  }

  .chapter-button {
    min-width: 190px;
    height: 58px;

    margin-top: 36px;

    padding: 0 26px;

    border: 0;
    border-radius: 999px;

    cursor: pointer;

    color: #fff;

    background: #c9265e;

    font-family:
      Arial,
      Helvetica,
      sans-serif;

    font-size: 13px;
    font-weight: 700;
  }

  @keyframes questionInNext {
    from {
      opacity: 0;
      transform:
        translateX(22px);
    }

    to {
      opacity: 1;
      transform:
        translateX(0);
    }
  }

  @keyframes questionInBack {
    from {
      opacity: 0;
      transform:
        translateX(-22px);
    }

    to {
      opacity: 1;
      transform:
        translateX(0);
    }
  }

  @keyframes answerIn {
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

  @keyframes loadingDot {
    0%,
    60%,
    100% {
      transform: translateY(0);
      opacity: .4;
    }

    30% {
      transform: translateY(-4px);
      opacity: 1;
    }
  }

  @media (max-width: 720px) {

    .test-page {
      padding:
        max(
          18px,
          env(safe-area-inset-top)
        )
        16px
        34px;
    }

    .test-header {
      grid-template-columns:
        46px
        minmax(0, 1fr)
        52px;

      gap: 12px;
    }

    .back-button {
      width: 44px;
      height: 44px;

      font-size: 25px;
    }

    .progress-copy {
      margin-bottom: 9px;

      font-size: 9px;

      letter-spacing: .8px;
    }

    .progress-track {
      height: 5px;
    }

    .question-position {
      font-size: 13px;
    }

    .question-screen {
      margin-top:
        clamp(
          60px,
          9vh,
          88px
        );
    }

    .question-meta {
      margin-bottom: 22px;

      font-size: 10px;

      letter-spacing: 1.9px;
    }

    .question-title {
      font-size:
        clamp(
          43px,
          12.5vw,
          62px
        );

      line-height: .94;

      letter-spacing: -2.6px;
    }

    .question-description {
      margin-top: 17px;

      font-size: 12px;
    }

    .answers {
      gap: 11px;

      margin-top: 38px;
    }

    .answer-card {
      min-height: 70px;

      padding:
        0
        18px;

      border-radius: 19px;

      font-size: 15px;
    }

    .answer-arrow {
      font-size: 22px;
    }

    .answers-big {
      grid-template-columns: 1fr;
    }

    .answers-big
    .answer-card {
      min-height: 78px;
    }

    .chapter-page {
      padding: 20px;
    }

    .chapter-title {
      font-size: 47px;

      letter-spacing: -2px;
    }

    .chapter-subtitle {
      font-size: 12px;
    }
  }
`;