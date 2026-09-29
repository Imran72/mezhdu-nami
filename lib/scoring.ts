import {
    getOptionByValue,
    getQuestionById,
} from './questions';

type Role =
    | 'a'
    | 'b';

type AnswerRow = {
    role: Role;
    question_id: string;
    answer_value:
        | string
        | number;
};

type AnswersByRole = {
    a: Record<string, string>;
    b: Record<string, string>;
};

export type Similarity =
    | 'same'
    | 'close'
    | 'different';

export type QuestionComparison = {
    questionId: string;
    question: string;

    answerA: string;
    answerB: string;

    labelA: string;
    labelB: string;

    traitsA: string[];
    traitsB: string[];

    sharedTraits: string[];

    similarity: Similarity;
};

export type DimensionScores = {
    views: number;
    care: number;
    communication: number;
    rhythm: number;
    space: number;
};

export type ScoreResult = {
    scores: {
        overall: number;

        sameAnswers: number;
        closeAnswers: number;
        differentAnswers: number;

        dimensions: DimensionScores;
    };

    by: AnswersByRole;

    comparisons:
        QuestionComparison[];

    highlights: {
        same:
            QuestionComparison[];

        close:
            QuestionComparison[];

        different:
            QuestionComparison[];
    };
};

/* ============================================================
   DIMENSIONS
============================================================ */

const DIMENSION_TRAITS = {
    views: [
        'values',
        'future',
        'stability',
        'adventure',
        'home',
        'family',
        'growth',
        'spontaneity',
    ],

    care: [
        'care',
        'support',
        'warmth',
        'attention',
        'affection',
        'help',
        'presence',
    ],

    communication: [
        'communication',
        'talk',
        'honesty',
        'openness',
        'humor',
        'discussion',
        'directness',
    ],

    rhythm: [
        'energy',
        'activity',
        'rest',
        'routine',
        'spontaneity',
        'planning',
        'social',
        'home',
    ],

    space: [
        'independence',
        'space',
        'freedom',
        'privacy',
        'togetherness',
        'closeness',
    ],
} as const;

/* ============================================================
   MAIN SCORE
============================================================ */

export function score(
    answers: AnswerRow[]
): ScoreResult {
    const by: AnswersByRole = {
        a: {},
        b: {},
    };

    for (
        const answer
        of answers
        ) {
        if (
            answer.role !== 'a' &&
            answer.role !== 'b'
        ) {
            continue;
        }

        by[
            answer.role
            ][
            answer.question_id
            ] =
            String(
                answer.answer_value
            );
    }

    const questionIds =
        Array.from(
            new Set([
                ...Object.keys(
                    by.a
                ),
                ...Object.keys(
                    by.b
                ),
            ])
        );

    const comparisons:
        QuestionComparison[] = [];

    for (
        const questionId
        of questionIds
        ) {
        const answerA =
            by.a[questionId];

        const answerB =
            by.b[questionId];

        if (
            answerA === undefined ||
            answerB === undefined
        ) {
            continue;
        }

        const question =
            getQuestionById(
                questionId
            );

        if (!question) {
            continue;
        }

        /*
         * ВАЖНО:
         * getOptionByValue принимает
         * questionId, а не объект question.
         */

        const optionA =
            getOptionByValue(
                questionId,
                answerA
            );

        const optionB =
            getOptionByValue(
                questionId,
                answerB
            );

        if (
            !optionA ||
            !optionB
        ) {
            continue;
        }

        const traitsA =
            optionA.traits ?? [];

        const traitsB =
            optionB.traits ?? [];

        const sharedTraits =
            traitsA.filter(
                (trait) =>
                    traitsB.includes(
                        trait
                    )
            );

        let similarity:
            Similarity;

        if (
            answerA === answerB
        ) {
            similarity =
                'same';
        } else if (
            sharedTraits.length > 0
        ) {
            similarity =
                'close';
        } else {
            similarity =
                'different';
        }

        comparisons.push({
            questionId,

            question:
            question.text,

            answerA,
            answerB,

            labelA:
            optionA.label,

            labelB:
            optionB.label,

            traitsA,
            traitsB,

            sharedTraits,

            similarity,
        });
    }

    const same =
        comparisons.filter(
            (item) =>
                item.similarity ===
                'same'
        );

    const close =
        comparisons.filter(
            (item) =>
                item.similarity ===
                'close'
        );

    const different =
        comparisons.filter(
            (item) =>
                item.similarity ===
                'different'
        );

    const overall =
        calculateSimilarity(
            comparisons
        );

    const dimensions:
        DimensionScores = {
        views:
            calculateDimension(
                comparisons,
                DIMENSION_TRAITS.views
            ),

        care:
            calculateDimension(
                comparisons,
                DIMENSION_TRAITS.care
            ),

        communication:
            calculateDimension(
                comparisons,
                DIMENSION_TRAITS.communication
            ),

        rhythm:
            calculateDimension(
                comparisons,
                DIMENSION_TRAITS.rhythm
            ),

        space:
            calculateDimension(
                comparisons,
                DIMENSION_TRAITS.space
            ),
    };

    return {
        scores: {
            overall,

            sameAnswers:
            same.length,

            closeAnswers:
            close.length,

            differentAnswers:
            different.length,

            dimensions,
        },

        by,

        comparisons,

        highlights: {
            same,
            close,
            different,
        },
    };
}

/* ============================================================
   OVERALL SCORE
============================================================ */

function calculateSimilarity(
    comparisons:
    QuestionComparison[]
): number {
    if (
        comparisons.length === 0
    ) {
        return 0;
    }

    const points =
        comparisons.reduce(
            (
                total,
                comparison
            ) => {
                if (
                    comparison.similarity ===
                    'same'
                ) {
                    return (
                        total + 1
                    );
                }

                if (
                    comparison.similarity ===
                    'close'
                ) {
                    return (
                        total + 0.5
                    );
                }

                return total;
            },
            0
        );

    return Math.round(
        (
            points /
            comparisons.length
        ) *
        100
    );
}

/* ============================================================
   DIMENSION SCORE
============================================================ */

function calculateDimension(
    comparisons:
    QuestionComparison[],
    dimensionTraits:
    readonly string[]
): number {
    const relevant =
        comparisons.filter(
            (
                comparison
            ) => {
                const allTraits = [
                    ...comparison.traitsA,
                    ...comparison.traitsB,
                ];

                return (
                    allTraits.some(
                        (trait) =>
                            dimensionTraits.includes(
                                trait
                            )
                    )
                );
            }
        );

    /*
     * Если по этой оси пока недостаточно
     * вопросов, используем общий score.
     *
     * Это временный fallback, пока не
     * привяжем наши 16 вопросов к пяти
     * осям напрямую.
     */

    const source =
        relevant.length >= 2
            ? relevant
            : comparisons;

    return (
        calculateSimilarity(
            source
        )
    );
}