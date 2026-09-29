import {
    getOptionByValue,
    getQuestionById,
} from './questions';

type Role = 'a' | 'b';

type AnswerRow = {
    role: Role;
    question_id: string;
    answer_value: string | number;
};

type AnswersByRole = {
    a: Record<string, string>;
    b: Record<string, string>;
};

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

    similarity:
        | 'same'
        | 'close'
        | 'different';
};

export type ScoreResult = {
    /*
     * Оставляем scores для совместимости
     * со старым result/API-кодом.
     *
     * Но теперь это НЕ "процент совместимости".
     */
    scores: {
        overall: number;
        sameAnswers: number;
        closeAnswers: number;
        differentAnswers: number;
    };

    by: AnswersByRole;

    comparisons: QuestionComparison[];

    highlights: {
        same: QuestionComparison[];
        close: QuestionComparison[];
        different: QuestionComparison[];
    };
};

/*
 * Главная функция.
 *
 * Получает строки ответов из Supabase
 * и сравнивает ответы двух людей.
 */
export function score(
    rows: AnswerRow[]
): ScoreResult {
    const by: AnswersByRole = {
        a: {},
        b: {},
    };

    /*
     * Собираем:
     *
     * by.a.free_saturday = "go_somewhere"
     * by.b.free_saturday = "no_plan"
     */
    for (const row of rows) {
        if (
            row.role !== 'a' &&
            row.role !== 'b'
        ) {
            continue;
        }

        by[row.role][row.question_id] =
            String(row.answer_value);
    }

    const allQuestionIds =
        new Set([
            ...Object.keys(by.a),
            ...Object.keys(by.b),
        ]);

    const comparisons: QuestionComparison[] =
        [];

    for (const questionId of allQuestionIds) {
        const answerA =
            by.a[questionId];

        const answerB =
            by.b[questionId];

        /*
         * Сравниваем только те вопросы,
         * на которые ответили оба.
         */
        if (
            answerA === undefined ||
            answerB === undefined
        ) {
            continue;
        }

        const question =
            getQuestionById(questionId);

        if (!question) {
            continue;
        }

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

        /*
         * Если ответ почему-то не найден
         * среди новых options — просто
         * пропускаем вопрос.
         *
         * Это особенно полезно для старых
         * тестовых пар из БД.
         */
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
                    traitsB.includes(trait)
            );

        let similarity:
            | 'same'
            | 'close'
            | 'different';

        /*
         * Выбрали буквально один
         * и тот же вариант.
         */
        if (answerA === answerB) {
            similarity = 'same';
        }

        /*
         * Ответы разные, но имеют
         * хотя бы один общий смысловой тег.
         */
        else if (
            sharedTraits.length > 0
        ) {
            similarity = 'close';
        }

        /*
         * Ответы показывают разные
         * предпочтения.
         */
        else {
            similarity = 'different';
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

    /*
     * Этот overall нужен пока только
     * для обратной совместимости.
     *
     * Мы НЕ будем показывать его
     * пользователю как:
     *
     * "ваша совместимость — 78%"
     *
     * Логика:
     *
     * same      = 1
     * close     = 0.5
     * different = 0
     */
    let overall = 0;

    if (comparisons.length > 0) {
        const points =
            same.length +
            close.length * 0.5;

        overall =
            Math.round(
                (points /
                    comparisons.length) *
                100
            );
    }

    return {
        scores: {
            overall,

            sameAnswers:
            same.length,

            closeAnswers:
            close.length,

            differentAnswers:
            different.length,
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