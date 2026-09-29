'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { questions } from '../../../lib/questions';

type AnswerValue = string | number;

type Answers = Record<string, AnswerValue>;

export default function TestPage() {
    const params = useParams<{ coupleId: string }>();
    const searchParams = useSearchParams();
    const router = useRouter();

    const coupleId = params.coupleId;

    // Первый участник приходит без role.
    // Второй — по ссылке /test/.../?role=b
    const role = searchParams.get('role') === 'b' ? 'b' : 'a';

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Answers>({});
    const [submitting, setSubmitting] = useState(false);
    const [checking, setChecking] = useState(true);
    const [error, setError] = useState('');

    const currentQuestion = questions[currentIndex];

    const progress = useMemo(() => {
        if (!questions.length) {
            return 0;
        }

        return ((currentIndex + 1) / questions.length) * 100;
    }, [currentIndex]);

    /*
     * При открытии теста проверяем состояние пары.
     *
     * Если оба уже прошли — сразу результат.
     * Если конкретный участник уже отвечал — не даём
     * ему проходить тест повторно.
     */
    useEffect(() => {
        async function checkCouple() {
            try {
                const response = await fetch(
                    `/api/couples?id=${encodeURIComponent(coupleId)}`,
                    {
                        cache: 'no-store',
                    }
                );

                if (!response.ok) {
                    throw new Error('Не удалось загрузить данные пары');
                }

                const couple = await response.json();

                if (
                    couple.partner_a_completed &&
                    couple.partner_b_completed
                ) {
                    router.replace(`/result/${coupleId}`);
                    return;
                }

                if (
                    role === 'a' &&
                    couple.partner_a_completed
                ) {
                    router.replace(`/waiting/${coupleId}`);
                    return;
                }

                if (
                    role === 'b' &&
                    couple.partner_b_completed
                ) {
                    if (couple.partner_a_completed) {
                        router.replace(`/result/${coupleId}`);
                    } else {
                        router.replace(`/waiting/${coupleId}`);
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
    }, [coupleId, role, router]);

    function saveAnswer(value: AnswerValue) {
        if (!currentQuestion) {
            return;
        }

        const newAnswers = {
            ...answers,
            [currentQuestion.id]: value,
        };

        setAnswers(newAnswers);

        if (currentIndex < questions.length - 1) {
            setCurrentIndex((index) => index + 1);
            return;
        }

        submitAnswers(newAnswers);
    }

    async function submitAnswers(finalAnswers: Answers) {
        if (submitting) {
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/answers', {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    coupleId,
                    role,
                    answers: finalAnswers,
                }),
            });

            if (!response.ok) {
                const responseText = await response.text();

                console.error(
                    'Answers API error:',
                    response.status,
                    responseText
                );

                throw new Error('Не удалось сохранить ответы');
            }

            /*
             * КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ:
             *
             * Первый участник:
             * test → waiting
             *
             * Второй участник:
             * test → result
             */
            if (role === 'b') {
                router.replace(`/result/${coupleId}`);
                return;
            }

            router.replace(`/waiting/${coupleId}`);
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
            <main className="test-page">
                <div className="test-shell">
                    <div className="loading">
                        Загружаем...
                    </div>
                </div>

                <style jsx>{styles}</style>
            </main>
        );
    }

    if (!currentQuestion) {
        return (
            <main className="test-page">
                <div className="test-shell">
                    <div className="loading">
                        Вопросы не найдены.
                    </div>
                </div>

                <style jsx>{styles}</style>
            </main>
        );
    }

    return (
        <main className="test-page">

            <div className="test-shell">

                <div className="top">

                    <div className="question-counter">
                        {currentIndex + 1} / {questions.length}
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

                <div className="question-area">

                    <div className="question-number">
                        ВОПРОС {currentIndex + 1}
                    </div>

                    <h1 className="question-title">
                        {currentQuestion.text}
                    </h1>

                    {'subtitle' in currentQuestion &&
                        currentQuestion.subtitle && (
                            <p className="question-subtitle">
                                {currentQuestion.subtitle}
                            </p>
                        )}

                    <QuestionInput
                        question={currentQuestion}
                        disabled={submitting}
                        onAnswer={saveAnswer}
                    />

                    {submitting && (
                        <div className="saving">
                            Сохраняем ответы...
                        </div>
                    )}

                    {error && (
                        <div className="error">
                            {error}
                        </div>
                    )}

                </div>

            </div>

            <style jsx>{styles}</style>

        </main>
    );
}

function QuestionInput({
                           question,
                           onAnswer,
                           disabled,
                       }: {
    question: any;
    onAnswer: (value: AnswerValue) => void;
    disabled: boolean;
}) {
    /*
     * Если в questions.ts есть options,
     * показываем варианты ответа.
     */
    if (
        Array.isArray(question.options) &&
        question.options.length > 0
    ) {
        return (
            <div className="answers">
                {question.options.map(
                    (
                        option:
                            | string
                            | {
                            label?: string;
                            value?: string | number;
                        },
                        index: number
                    ) => {
                        const label =
                            typeof option === 'string'
                                ? option
                                : option.label ??
                                String(option.value ?? '');

                        const value =
                            typeof option === 'string'
                                ? option
                                : option.value ?? option.label ?? index;

                        return (
                            <button
                                key={`${question.id}-${index}`}
                                type="button"
                                className="answer-button"
                                disabled={disabled}
                                onClick={() => onAnswer(value)}
                            >
                                {label}
                            </button>
                        );
                    }
                )}

                <style jsx>{`
          .answers {
            width: 100%;

            display: flex;
            flex-direction: column;

            gap: 12px;

            margin-top: 34px;
          }

          .answer-button {
            width: 100%;

            border: 1px solid #e4d9d7;
            border-radius: 18px;

            background: #ffffff;
            color: #171515;

            padding: 19px 22px;

            text-align: left;

            font-size: 17px;
            line-height: 1.35;

            cursor: pointer;

            transition:
              border-color 150ms ease,
              background 150ms ease,
              transform 150ms ease;
          }

          .answer-button:hover {
            border-color: #b65c7c;
            background: #fcf7f8;
          }

          .answer-button:active {
            transform: scale(0.99);
          }

          .answer-button:disabled {
            opacity: 0.5;
            cursor: default;
          }
        `}</style>
            </div>
        );
    }

    /*
     * Fallback для текстового вопроса.
     */
    return (
        <TextAnswer
            disabled={disabled}
            onAnswer={onAnswer}
        />
    );
}

function TextAnswer({
                        onAnswer,
                        disabled,
                    }: {
    onAnswer: (value: string) => void;
    disabled: boolean;
}) {
    const [value, setValue] = useState('');

    function submit() {
        const cleanValue = value.trim();

        if (!cleanValue || disabled) {
            return;
        }

        onAnswer(cleanValue);
    }

    return (
        <div className="text-answer">

      <textarea
          className="textarea"
          value={value}
          disabled={disabled}
          placeholder="Напиши свой ответ..."
          onChange={(event) => {
              setValue(event.target.value);
          }}
      />

            <button
                type="button"
                className="continue-button"
                disabled={!value.trim() || disabled}
                onClick={submit}
            >
                Продолжить
            </button>

            <style jsx>{`

        .text-answer {
          width: 100%;

          display: flex;
          flex-direction: column;

          gap: 14px;

          margin-top: 34px;
        }

        .textarea {
          width: 100%;
          min-height: 140px;

          box-sizing: border-box;

          resize: vertical;

          border: 1px solid #e4d9d7;
          border-radius: 18px;

          outline: none;

          background: #ffffff;
          color: #171515;

          padding: 18px;

          font: inherit;
          font-size: 17px;
          line-height: 1.5;

          transition: border-color 150ms ease;
        }

        .textarea:focus {
          border-color: #b65c7c;
        }

        .continue-button {
          width: 100%;

          border: 0;
          border-radius: 18px;

          background: #171515;
          color: #ffffff;

          padding: 19px 22px;

          font-size: 17px;
          font-weight: 650;

          cursor: pointer;

          transition:
            opacity 150ms ease,
            transform 150ms ease;
        }

        .continue-button:hover:not(:disabled) {
          opacity: 0.92;
        }

        .continue-button:active:not(:disabled) {
          transform: scale(0.99);
        }

        .continue-button:disabled {
          opacity: 0.35;
          cursor: default;
        }

      `}</style>
        </div>
    );
}

const styles = `

  .test-page {
    min-height: 100svh;

    box-sizing: border-box;

    background: #faf8f6;

    padding:
      max(30px, env(safe-area-inset-top))
      20px
      max(40px, env(safe-area-inset-bottom));
  }

  .test-shell {
    width: 100%;
    max-width: 760px;

    margin: 0 auto;
  }

  .top {
    width: 100%;

    display: flex;
    align-items: center;

    gap: 18px;
  }

  .question-counter {
    flex-shrink: 0;

    color: #9a8f92;

    font-size: 12px;
    font-weight: 700;

    letter-spacing: 0.08em;
  }

  .progress-track {
    flex: 1;

    height: 4px;

    overflow: hidden;

    border-radius: 999px;

    background: #eadfe1;
  }

  .progress-value {
    height: 100%;

    border-radius: inherit;

    background: #b14e73;

    transition: width 250ms ease;
  }

  .question-area {
    width: 100%;

    margin-top: 120px;
  }

  .question-number {
    margin-bottom: 18px;

    color: #a9476b;

    font-size: 12px;
    font-weight: 700;

    letter-spacing: 0.13em;
  }

  .question-title {
    max-width: 720px;

    margin: 0;

    color: #171515;

    font-family:
      Georgia,
      'Times New Roman',
      serif;

    font-size: clamp(38px, 5vw, 58px);
    line-height: 1.02;

    font-weight: 500;

    letter-spacing: -0.035em;
  }

  .question-subtitle {
    max-width: 650px;

    margin:
      20px
      0
      0;

    color: #81777a;

    font-size: 17px;
    line-height: 1.5;
  }

  .saving {
    margin-top: 18px;

    color: #93898b;

    font-size: 14px;

    text-align: center;
  }

  .error {
    margin-top: 18px;

    color: #a9476b;

    font-size: 14px;
    line-height: 1.45;

    text-align: center;
  }

  .loading {
    padding-top: 45vh;

    color: #81777a;

    font-size: 18px;

    text-align: center;
  }

  @media (max-width: 600px) {

    .test-page {
      padding-left: 18px;
      padding-right: 18px;
    }

    .question-area {
      margin-top: 70px;
    }

    .question-title {
      font-size: 40px;
    }

    .question-subtitle {
      font-size: 16px;
    }

  }

`;