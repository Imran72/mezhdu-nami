export type Similarity =
    | 'same'
    | 'close'
    | 'different';

export type Comparison = {
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

export type ArchetypeId =
    | 'astronauts'
    | 'knight_princess'
    | 'wizards'
    | 'pirates'
    | 'sun_moon'
    | 'dragon_keeper'
    | 'players'
    | 'homekeepers';

export type Archetype = {
    id: ArchetypeId;

    title: string;

    emojiA: string;
    emojiB: string;

    description: string;
};

type ArchetypeDefinition =
    Archetype & {
    traits: string[];
};

const archetypes: ArchetypeDefinition[] = [
    {
        id: 'knight_princess',

        title: 'Рыцарь и принцесса',

        emojiA: '⚔️',
        emojiB: '👑',

        description:
            'У вас много заботы в мелочах. Для этой пары любовь чаще видна не в громких словах, а в ощущении: «я рядом и помню о тебе».',

        traits: [
            'care_practical',
            'attention',
            'warmth',
            'initiative',
            'support_action',
            'physical_closeness',
            'support_physical',
        ],
    },

    {
        id: 'astronauts',

        title: 'Два космонавта',

        emojiA: '🚀',
        emojiB: '🪐',

        description:
            'У каждого может быть своя орбита, но вам важно знать, что маршрут всё равно общий. Близость для вас не обязательно означает быть вместе каждую минуту.',

        traits: [
            'independence',
            'personal_space_high',
            'space_high',
            'space_balanced',
            'autonomy',
            'value_independence',
            'planning',
            'need_future_alignment',
        ],
    },

    {
        id: 'wizards',

        title: 'Два волшебника',

        emojiA: '🔮',
        emojiB: '✨',

        description:
            'Ваш главный инструмент — разговор. Вам важно не просто быть рядом, а понимать, что происходит внутри другого человека.',

        traits: [
            'communication',
            'emotional_sharing',
            'support_listening',
            'conflict_verbal_resolution',
            'need_communication',
            'need_deep_communication',
            'value_communication',
            'listening',
        ],
    },

    {
        id: 'pirates',

        title: 'Два пирата',

        emojiA: '🏴‍☠️',
        emojiB: '🗺️',

        description:
            'Вашей паре особенно идёт ощущение приключения. Планы хороши, но иногда лучший план — придумать всё по дороге.',

        traits: [
            'spontaneity',
            'shared_experience',
            'activity',
            'need_spontaneity',
            'need_novelty',
            'flexibility',
            'money_experience',
            'money_present',
        ],
    },

    {
        id: 'sun_moon',

        title: 'Солнце и Луна',

        emojiA: '☀️',
        emojiB: '🌙',

        description:
            'Вы не обязаны одинаково реагировать на всё. В вашей паре особенно заметно, как разные способы чувствовать и действовать могут существовать рядом.',

        traits: [
            'support_proactive',
            'support_space',
            'space_high',
            'closeness_high',
            'independence',
            'direct_communication',
            'quiet_closeness',
            'emotional_sharing',
        ],
    },

    {
        id: 'dragon_keeper',

        title: 'Дракон и хранитель',

        emojiA: '🐉',
        emojiB: '🛡️',

        description:
            'В вашей динамике есть энергия и спокойствие. Один момент может проживаться ярко, другой — через паузу, действие или присутствие рядом.',

        traits: [
            'emotion_intensity',
            'self_regulation',
            'support_available',
            'support_presence',
            'conflict_time_repair',
            'indirect_repair',
            'repair_delayed',
        ],
    },

    {
        id: 'players',

        title: 'Два игрока',

        emojiA: '🎮',
        emojiB: '👾',

        description:
            'У вас есть важная суперсила — лёгкость. Юмор, свои приколы и ощущение команды помогают вам снова находить друг друга.',

        traits: [
            'humor',
            'playfulness',
            'support_humor',
            'conflict_humor_repair',
            'micro_connection',
            'value_playfulness',
            'need_lightness',
            'message_team',
        ],
    },

    {
        id: 'homekeepers',

        title: 'Хранители дома',

        emojiA: '🕯️',
        emojiB: '🏡',

        description:
            'Сила вашей пары прячется в обычной жизни: знакомых ритуалах, спокойных вечерах и ощущении места, куда хочется возвращаться.',

        traits: [
            'home_comfort',
            'quiet_closeness',
            'ritual',
            'stability',
            'value_ritual',
            'need_stability',
            'shared_life',
            'message_everyday_love',
        ],
    },
];

/*
 * ============================================================
 * ОПРЕДЕЛЕНИЕ АРХЕТИПА
 * ============================================================
 */

export function determineArchetype(
    comparisons: Comparison[]
): Archetype {
    const scores =
        new Map<ArchetypeId, number>();

    for (const archetype of archetypes) {
        scores.set(
            archetype.id,
            0
        );
    }

    for (const comparison of comparisons) {
        /*
         * Один и тот же ответ обоих людей
         * весит сильнее всего.
         */
        const similarityWeight =
            comparison.similarity === 'same'
                ? 2
                : comparison.similarity === 'close'
                    ? 1.35
                    : 0.65;

        const allTraits = [
            ...comparison.traitsA,
            ...comparison.traitsB,
        ];

        for (const archetype of archetypes) {
            for (const trait of allTraits) {
                if (
                    archetype.traits.includes(
                        trait
                    )
                ) {
                    scores.set(
                        archetype.id,
                        (scores.get(
                            archetype.id
                        ) ?? 0) +
                        similarityWeight
                    );
                }
            }
        }
    }

    /*
     * Дополнительный бонус "Солнцу и Луне",
     * если у пары реально много разных ответов.
     */
    const differentCount =
        comparisons.filter(
            (comparison) =>
                comparison.similarity ===
                'different'
        ).length;

    const sameCount =
        comparisons.filter(
            (comparison) =>
                comparison.similarity ===
                'same'
        ).length;

    if (
        comparisons.length > 0 &&
        differentCount >
        sameCount
    ) {
        scores.set(
            'sun_moon',
            (scores.get(
                'sun_moon'
            ) ?? 0) + 4
        );
    }

    let winner =
        archetypes[0];

    let winnerScore =
        scores.get(
            winner.id
        ) ?? 0;

    for (const archetype of archetypes) {
        const currentScore =
            scores.get(
                archetype.id
            ) ?? 0;

        if (
            currentScore >
            winnerScore
        ) {
            winner =
                archetype;

            winnerScore =
                currentScore;
        }
    }

    return {
        id: winner.id,

        title:
        winner.title,

        emojiA:
        winner.emojiA,

        emojiB:
        winner.emojiB,

        description:
        winner.description,
    };
}

/*
 * ============================================================
 * БЕСПЛАТНЫЕ ИНСАЙТЫ
 * ============================================================
 */

export function getFreeInsights(
    comparisons: Comparison[]
) {
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

    return {
        sameInsight:
            buildSameInsight(
                same[0] ??
                close[0]
            ),

        differenceInsight:
            buildDifferenceInsight(
                chooseInterestingDifference(
                    different
                )
            ),

        superpower:
            buildSuperpower(
                comparisons
            ),

        eveningQuestion:
            buildEveningQuestion(
                chooseInterestingDifference(
                    different
                )
            ),
    };
}

/*
 * ============================================================
 * СОВПАДЕНИЕ
 * ============================================================
 */

function buildSameInsight(
    comparison:
        | Comparison
        | undefined
): string {
    if (!comparison) {
        return 'Вы можете выбирать разные варианты, но в нескольких местах за ними всё равно стоит похожее отношение к близости.';
    }

    switch (
        comparison.questionId
        ) {
        case 'free_saturday':
            return 'У вас довольно похожее представление о том, как выглядит хороший день вдвоём. Это одна из тех мелочей, которые делают совместную жизнь легче.';

        case 'care_signal':
            return 'Вы похоже считываете маленькие проявления заботы. То, что для одного выглядит вниманием, второй тоже с большой вероятностью замечает.';

        case 'reunion':
            return 'После времени врозь вы похожим способом возвращаете ощущение «мы снова вместе».';

        case 'relationship_button':
            return 'Если бы прямо сейчас можно было немного изменить ваши отношения, вы потянулись бы примерно к одной и той же кнопке.';

        case 'everything_fine':
            return 'У вас похожее представление о том, как быть рядом, когда другому непросто.';

        case 'conflict_finished':
            return 'Вы довольно похоже чувствуете момент, когда напряжение после ссоры действительно закончилось.';

        case 'hard_day':
            return 'После тяжёлого дня вам обоим помогает похожий тип поддержки. Это полезное совпадение.';

        case 'normal_evening':
            return 'Ваше представление об уютном обычном вечере оказалось очень близким.';

        case 'extra_hour':
            return 'Если появляется немного свободного времени только для вас двоих, потратить его хочется примерно одинаково.';

        case 'keep_in_year':
            return 'Вы хотите сохранить похожую часть ваших отношений. Похоже, именно она для вас обоих особенно ценна.';

        case 'want_more':
            return 'Вы оба чувствуете примерно одно и то же направление, которого хотелось бы добавить вашим отношениям.';

        case 'one_thing_to_know':
            return 'В самом личном вопросе теста вы выбрали очень похожую мысль. Иногда важные вещи уже понятны обоим — даже если редко произносятся вслух.';

        default:
            return `Здесь вы выбрали очень похожие ответы: «${comparison.labelA}».`;
    }
}

/*
 * ============================================================
 * РАЗЛИЧИЕ
 * ============================================================
 */

function buildDifferenceInsight(
    comparison:
        | Comparison
        | undefined
): string {
    if (!comparison) {
        return 'Яркого расхождения здесь не нашлось — ваши ответы чаще совпадают или оказываются близкими по смыслу.';
    }

    switch (
        comparison.questionId
        ) {
        case 'everything_fine':
            return `Когда что-то не так, ваши первые реакции отличаются: один выбрал «${comparison.labelA}», другой — «${comparison.labelB}». Оба варианта могут быть заботой, просто выглядят они по-разному.`;

        case 'conflict_finished':
            return `Момент «всё, мы помирились» вы чувствуете по-разному: «${comparison.labelA}» и «${comparison.labelB}». Возможно, иногда один уже отпустил ситуацию, пока другому ещё чего-то не хватает.`;

        case 'hard_day':
            return `После тяжёлого дня вам нужны разные вещи: «${comparison.labelA}» и «${comparison.labelB}». Это полезно знать заранее, а не угадывать в моменте.`;

        case 'weekend_plan':
            return `На внезапную инициативу партнёра вы реагируете немного по-разному: «${comparison.labelA}» и «${comparison.labelB}». Здесь может отличаться отношение к спонтанности и личному пространству.`;

        case 'free_saturday':
            return `Идеальная свободная суббота у вас выглядит не совсем одинаково: «${comparison.labelA}» и «${comparison.labelB}». Возможно, вам просто нужен разный баланс между «вместе» и «каждый своим».`;

        case 'want_more':
            return `Сейчас вам немного не хватает разных вещей: «${comparison.labelA}» и «${comparison.labelB}». Это не обязательно противоречие — скорее две разные подсказки о том, куда можно добавить внимания.`;

        case 'unexpected_money':
            return `Даже воображаемый денежный бонус вы бы направили по-разному: «${comparison.labelA}» и «${comparison.labelB}». Здесь интересно не кто прав, а что каждый считает ценным для «нас».`;

        case 'one_thing_to_know':
            return `Если оставить партнёру только одну мысль, вы выбрали разное: «${comparison.labelA}» и «${comparison.labelB}». Возможно, именно эти две фразы особенно стоит услышать друг от друга.`;

        default:
            return `Здесь ваши ответы разошлись: «${comparison.labelA}» и «${comparison.labelB}». За разными вариантами могут стоять разные способы чувствовать одну и ту же ситуацию.`;
    }
}

/*
 * ============================================================
 * СУПЕРСИЛА
 * ============================================================
 */

function buildSuperpower(
    comparisons: Comparison[]
): string {
    const sharedTraits =
        comparisons.flatMap(
            (comparison) =>
                comparison.sharedTraits
        );

    if (
        hasAny(
            sharedTraits,
            [
                'humor',
                'playfulness',
                'support_humor',
                'conflict_humor_repair',
            ]
        )
    ) {
        return 'У вас работает лёгкость. Юмор и свои маленькие приколы могут быть способом быстро снова почувствовать себя одной командой.';
    }

    if (
        hasAny(
            sharedTraits,
            [
                'communication',
                'emotional_sharing',
                'support_listening',
                'conflict_verbal_resolution',
            ]
        )
    ) {
        return 'Разговор — один из ваших сильных инструментов. Вам проще возвращаться друг к другу, когда происходящее можно назвать словами.';
    }

    if (
        hasAny(
            sharedTraits,
            [
                'care_practical',
                'attention',
                'initiative',
                'support_action',
            ]
        )
    ) {
        return 'Вы умеете замечать заботу в небольших действиях. В вашей паре многое может говорить «я о тебе помню» без больших жестов.';
    }

    if (
        hasAny(
            sharedTraits,
            [
                'home_comfort',
                'quiet_closeness',
                'ritual',
                'stability',
            ]
        )
    ) {
        return 'Вам хорошо удаётся обычная близость. Не каждому нужны события каждую минуту — иногда ваша сила именно в спокойном «мы рядом».';
    }

    if (
        hasAny(
            sharedTraits,
            [
                'independence',
                'space_high',
                'space_balanced',
                'autonomy',
            ]
        )
    ) {
        return 'Вы умеете оставлять друг другу воздух. Возможность быть собой отдельно не обязательно мешает вашему ощущению «мы».';
    }

    return 'У вас есть несколько мест, где разные ответы всё равно приводят к похожей потребности — быть замеченными и понятыми друг другом.';
}

/*
 * ============================================================
 * ВОПРОС НА ВЕЧЕР
 * ============================================================
 */

function buildEveningQuestion(
    comparison:
        | Comparison
        | undefined
): string {
    if (!comparison) {
        return 'Какая маленькая вещь в наших отношениях делает тебя счастливее, чем я, возможно, думаю?';
    }

    switch (
        comparison.questionId
        ) {
        case 'everything_fine':
            return 'Как мне понять, когда тебя лучше разговорить, а когда просто дать тебе немного пространства?';

        case 'conflict_finished':
            return 'Что должно произойти после ссоры, чтобы ты действительно почувствовал(а): между нами снова всё хорошо?';

        case 'hard_day':
            return 'После какого дня тебе особенно важно, чтобы я был(а) рядом — и как именно?';

        case 'weekend_plan':
            return 'Какие сюрпризы от меня тебя радуют, а в каких ситуациях тебе важнее, чтобы мы сначала договорились?';

        case 'free_saturday':
            return 'Как выглядит идеальный выходной, после которого ты думаешь: «вот этого мне и не хватало»?';

        case 'want_more':
            return 'Если бы в ближайший месяц мы могли добавить в наши отношения только одну вещь — что бы ты выбрал(а)?';

        case 'unexpected_money':
            return 'На какую общую вещь или впечатление тебе было бы совсем не жалко потратить деньги?';

        case 'one_thing_to_know':
            return 'Есть ли что-то важное про нас, что ты чувствуешь часто, но редко говоришь вслух?';

        default:
            return 'В чём мы, по-твоему, совсем разные — и почему тебе это во мне всё равно нравится?';
    }
}

function chooseInterestingDifference(
    comparisons: Comparison[]
): Comparison | undefined {
    const priority = [
        'everything_fine',
        'hard_day',
        'conflict_finished',
        'one_thing_to_know',
        'want_more',
        'weekend_plan',
        'free_saturday',
        'unexpected_money',
    ];

    for (const questionId of priority) {
        const found =
            comparisons.find(
                (comparison) =>
                    comparison.questionId ===
                    questionId
            );

        if (found) {
            return found;
        }
    }

    return comparisons[0];
}

function hasAny(
    source: string[],
    candidates: string[]
): boolean {
    return candidates.some(
        (candidate) =>
            source.includes(candidate)
    );
}