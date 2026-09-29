export type QuestionOption = {
    value: string;
    label: string;

    /*
     * Скрытые смысловые теги.
     * Пользователь их не видит.
     *
     * Позже они пригодятся для генерации
     * красивого парного отчёта.
     */
    traits: string[];
};

export type Question = {
    id: string;

    chapter: 1 | 2 | 3 | 4;

    eyebrow?: string;

    text: string;

    /*
     * Дополнительная короткая строка под вопросом.
     * Используем редко.
     */
    description?: string;

    /*
     * visualType позволяет делать некоторые
     * вопросы визуально отличающимися.
     */
    visualType?: 'cards' | 'big-buttons';

    options: QuestionOption[];
};

export const chapters = [
    {
        id: 1,
        title: 'вы вдвоём',
        intro: 'Начнём с простого.',
        subtitle: 'Как выглядит ваш обычный кайф.',
    },

    {
        id: 2,
        title: 'когда что-то идёт не так',
        intro: 'Окей, с базой разобрались.',
        subtitle: 'Теперь чуть интереснее 👀',
    },

    {
        id: 3,
        title: 'ваш маленький мир',
        intro: 'А теперь обычная жизнь.',
        subtitle: 'Она почему-то рассказывает больше всего.',
    },

    {
        id: 4,
        title: 'куда всё это едет',
        intro: 'Последняя глава.',
        subtitle: 'Тут обычно находятся самые интересные совпадения.',
    },
] as const;

export const questions: Question[] = [
    // ============================================================
    // ГЛАВА 1
    // ============================================================

    {
        id: 'free_saturday',
        chapter: 1,

        eyebrow: 'СВОБОДНАЯ СУББОТА',

        text:
            'У вас внезапно полностью свободная суббота. Идеальный сценарий?',

        visualType: 'cards',

        options: [
            {
                value: 'together_home',
                label: '🛋 Весь день вдвоём и вообще никуда',
                traits: [
                    'closeness_high',
                    'home_comfort',
                    'togetherness',
                ],
            },

            {
                value: 'go_somewhere',
                label: '🥐 Куда-нибудь выбраться вместе',
                traits: [
                    'closeness_high',
                    'shared_experience',
                    'activity',
                ],
            },

            {
                value: 'friends_together',
                label: '🫂 Увидеться с друзьями, но вместе',
                traits: [
                    'social',
                    'togetherness',
                    'shared_environment',
                ],
            },

            {
                value: 'separate_then_together',
                label: '🌿 Каждый занимается своим, вечером встречаемся',
                traits: [
                    'personal_space_high',
                    'independence',
                    'closeness_balanced',
                ],
            },

            {
                value: 'no_plan',
                label: '🎲 Ничего не планировать — разберёмся по ходу',
                traits: [
                    'spontaneity',
                    'flexibility',
                ],
            },
        ],
    },

    {
        id: 'care_signal',
        chapter: 1,

        eyebrow: 'МЕЛОЧИ',

        text:
            'Какая мелочь от партнёра почему-то особенно радует?',

        visualType: 'cards',

        options: [
            {
                value: 'did_you_eat',
                label: '«Ты поел(а)?»',
                traits: [
                    'care_practical',
                    'attention',
                ],
            },

            {
                value: 'meme',
                label: 'Скинуть мем именно мне',
                traits: [
                    'humor',
                    'micro_connection',
                    'attention',
                ],
            },

            {
                value: 'snack',
                label: 'Принести что-нибудь вкусное без просьбы',
                traits: [
                    'care_practical',
                    'initiative',
                ],
            },

            {
                value: 'arrived',
                label: 'Написать, когда добрался(-ась)',
                traits: [
                    'reassurance',
                    'attention',
                    'care_practical',
                ],
            },

            {
                value: 'silent_nearby',
                label: 'Просто прилечь рядом и молчать',
                traits: [
                    'physical_presence',
                    'quiet_closeness',
                ],
            },
        ],
    },

    {
        id: 'reunion',
        chapter: 1,

        eyebrow: 'ПОСЛЕ НЕДЕЛИ ВРОЗЬ',

        text:
            'Вы неделю почти не виделись. Наконец встретились. Чего хочется первым делом?',

        visualType: 'cards',

        options: [
            {
                value: 'hug',
                label: '🫂 Просто обнять',
                traits: [
                    'physical_closeness',
                    'warmth',
                ],
            },

            {
                value: 'tell_everything',
                label: '🗣 Рассказать вообще всё, что произошло',
                traits: [
                    'communication',
                    'emotional_sharing',
                ],
            },

            {
                value: 'go_out',
                label: '🚶 Куда-нибудь вместе пойти',
                traits: [
                    'shared_experience',
                    'activity',
                ],
            },

            {
                value: 'do_nothing',
                label: '🛋 Упасть рядом и ничего не делать',
                traits: [
                    'quiet_closeness',
                    'home_comfort',
                ],
            },

            {
                value: 'joke',
                label: '😄 Начать прикалываться, будто не виделись два часа',
                traits: [
                    'humor',
                    'playfulness',
                ],
            },
        ],
    },

    {
        id: 'relationship_button',
        chapter: 1,

        eyebrow: 'ОДНА КНОПКА',

        text:
            'Если бы у ваших отношений была кнопка — какую бы ты нажал(а) прямо сейчас?',

        description:
            'Тут нет правильного ответа. Только тот, который первым пришёл в голову.',

        visualType: 'big-buttons',

        options: [
            {
                value: 'more_spontaneity',
                label: 'БОЛЬШЕ СПОНТАННОСТИ',
                traits: [
                    'need_spontaneity',
                ],
            },

            {
                value: 'more_talking',
                label: 'БОЛЬШЕ РАЗГОВОРОВ',
                traits: [
                    'need_communication',
                ],
            },

            {
                value: 'more_together',
                label: 'БОЛЬШЕ ВРЕМЕНИ ВДВОЁМ',
                traits: [
                    'need_closeness',
                ],
            },

            {
                value: 'more_space',
                label: 'БОЛЬШЕ СВОБОДЫ',
                traits: [
                    'need_space',
                ],
            },

            {
                value: 'keep_it',
                label: 'НИЧЕГО НЕ ТРОГАТЬ',
                traits: [
                    'satisfaction',
                    'stability',
                ],
            },
        ],
    },

    // ============================================================
    // ГЛАВА 2
    // ============================================================

    {
        id: 'everything_fine',
        chapter: 2,

        eyebrow: '«ВСЁ НОРМАЛЬНО»',

        text:
            'Партнёр пишет: «всё нормально». Но ты понимаешь — вообще не нормально.',

        visualType: 'cards',

        options: [
            {
                value: 'ask_again',
                label: '👀 Спрошу ещё раз. Я же вижу',
                traits: [
                    'support_proactive',
                    'space_low',
                ],
            },

            {
                value: 'im_here',
                label: '🫶 Скажу: «я рядом, если захочешь поговорить»',
                traits: [
                    'support_available',
                    'space_balanced',
                ],
            },

            {
                value: 'give_space',
                label: '🌙 Дам немного пространства',
                traits: [
                    'support_space',
                    'space_high',
                ],
            },

            {
                value: 'make_evening_better',
                label: '☕ Попробую просто сделать вечер приятнее',
                traits: [
                    'care_practical',
                    'support_action',
                ],
            },

            {
                value: 'take_words_literally',
                label: '😶 Если говорит, что нормально — значит нормально',
                traits: [
                    'direct_communication',
                    'low_inference',
                ],
            },
        ],
    },

    {
        id: 'conflict_finished',
        chapter: 2,

        eyebrow: 'ПОСЛЕ ССОРЫ',

        text:
            'В какой момент ты внутри понимаешь: «всё, мы помирились»?',

        visualType: 'cards',

        options: [
            {
                value: 'talked',
                label: '🗣 Мы нормально всё проговорили',
                traits: [
                    'conflict_verbal_resolution',
                ],
            },

            {
                value: 'first_step',
                label: '🤝 Кто-то сделал первый шаг',
                traits: [
                    'conflict_repair_action',
                ],
            },

            {
                value: 'hugged',
                label: '🫂 Обнялись — напряжение ушло',
                traits: [
                    'conflict_physical_repair',
                    'warmth',
                ],
            },

            {
                value: 'joking_again',
                label: '😂 Уже снова можем шутить друг с другом',
                traits: [
                    'conflict_humor_repair',
                    'playfulness',
                ],
            },

            {
                value: 'time',
                label: '⏳ Мне просто нужно немного времени',
                traits: [
                    'conflict_time_repair',
                    'space_high',
                ],
            },
        ],
    },

    {
        id: 'wrong_in_argument',
        chapter: 2,

        eyebrow: 'НУ ДОПУСТИМ',

        text:
            'В споре ты вдруг понимаешь, что, кажется, неправ(а).',

        visualType: 'cards',

        options: [
            {
                value: 'say_immediately',
                label: 'Скажу сразу',
                traits: [
                    'directness',
                    'repair_fast',
                ],
            },

            {
                value: 'argue_more',
                label: 'Сначала ещё немного поспорю 😶',
                traits: [
                    'playful_stubbornness',
                    'repair_delayed',
                ],
            },

            {
                value: 'cool_down',
                label: 'Мне нужно отойти и потом вернуться',
                traits: [
                    'space_high',
                    'self_regulation',
                ],
            },

            {
                value: 'show_action',
                label: 'Скорее покажу поступком, чем скажу',
                traits: [
                    'care_action',
                    'indirect_repair',
                ],
            },

            {
                value: 'depends',
                label: 'Зависит от того, насколько меня уже разнесло',
                traits: [
                    'emotion_intensity',
                    'flexible_repair',
                ],
            },
        ],
    },

    {
        id: 'hard_day',
        chapter: 2,

        eyebrow: 'ТЯЖЁЛЫЙ ДЕНЬ',

        text:
            'После тяжёлого дня от партнёра больше всего хочется...',

        visualType: 'cards',

        options: [
            {
                value: 'listen',
                label: 'Чтобы меня выслушали',
                traits: [
                    'support_listening',
                    'communication',
                ],
            },

            {
                value: 'hug',
                label: 'Чтобы меня обняли',
                traits: [
                    'support_physical',
                    'warmth',
                ],
            },

            {
                value: 'leave_alone',
                label: 'Чтобы меня немного оставили в покое',
                traits: [
                    'support_space',
                    'space_high',
                ],
            },

            {
                value: 'make_laugh',
                label: 'Чтобы меня рассмешили',
                traits: [
                    'support_humor',
                    'playfulness',
                ],
            },

            {
                value: 'just_nearby',
                label: 'Чтобы просто были рядом',
                traits: [
                    'support_presence',
                    'quiet_closeness',
                ],
            },
        ],
    },

    // ============================================================
    // ГЛАВА 3
    // ============================================================

    {
        id: 'normal_evening',
        chapter: 3,

        eyebrow: 'ОБЫЧНЫЙ ВЕЧЕР',

        text:
            'Никаких планов. Вы дома. На что это больше похоже?',

        visualType: 'cards',

        options: [
            {
                value: 'watch_together',
                label: '🎬 Вместе смотрим что-нибудь',
                traits: [
                    'shared_activity',
                    'home_comfort',
                ],
            },

            {
                value: 'talk',
                label: '🗣 Зависаем и разговариваем',
                traits: [
                    'communication',
                    'emotional_sharing',
                ],
            },

            {
                value: 'phones_together',
                label: '📱 Сидим рядом, каждый в своём телефоне — и нам норм',
                traits: [
                    'parallel_closeness',
                    'comfort',
                ],
            },

            {
                value: 'do_something',
                label: '🍝 Что-нибудь делаем вместе',
                traits: [
                    'shared_activity',
                    'togetherness',
                ],
            },

            {
                value: 'own_things',
                label: '🌀 Каждый занимается своим и периодически пересекаемся',
                traits: [
                    'independence',
                    'space_balanced',
                ],
            },
        ],
    },

    {
        id: 'extra_hour',
        chapter: 3,

        eyebrow: '+1 ЧАС',

        text:
            'Вам подарили лишний свободный час только для вас двоих. Куда его потратить?',

        visualType: 'cards',

        options: [
            {
                value: 'walk',
                label: 'Пойти гулять без цели',
                traits: [
                    'shared_experience',
                    'spontaneity',
                ],
            },

            {
                value: 'food',
                label: 'Поесть что-нибудь вкусное',
                traits: [
                    'shared_pleasure',
                    'ritual',
                ],
            },

            {
                value: 'talk',
                label: 'Полежать и поговорить',
                traits: [
                    'communication',
                    'quiet_closeness',
                ],
            },

            {
                value: 'episode',
                label: 'Посмотреть одну серию',
                traits: [
                    'shared_activity',
                    'home_comfort',
                ],
            },

            {
                value: 'stay_home',
                label: 'Никуда. Просто быть дома',
                traits: [
                    'home_comfort',
                    'quiet_closeness',
                ],
            },
        ],
    },

    {
        id: 'worse_to_forget',
        chapter: 3,

        eyebrow: 'ЧТО ХУЖЕ?',

        text:
            'Что страшнее забыть?',

        visualType: 'big-buttons',

        options: [
            {
                value: 'important_date',
                label: '📅 ВАЖНУЮ ДАТУ',
                traits: [
                    'symbolic_attention',
                    'ritual',
                ],
            },

            {
                value: 'yesterday_story',
                label: '💬 ТО, ЧТО ПАРТНЁР РАССКАЗЫВАЛ ВЧЕРА',
                traits: [
                    'everyday_attention',
                    'listening',
                ],
            },
        ],
    },

    {
        id: 'weekend_plan',
        chapter: 3,

        eyebrow: 'СЮРПРИЗ',

        text:
            'Партнёр придумал план на ваши выходные, вообще тебя не спросив. Первая реакция?',

        visualType: 'cards',

        options: [
            {
                value: 'cute',
                label: '🥹 Милота. Обо мне подумали',
                traits: [
                    'initiative_positive',
                    'trust',
                ],
            },

            {
                value: 'tell_me',
                label: '👀 Сначала расскажи, что за план',
                traits: [
                    'curiosity',
                    'balanced_control',
                ],
            },

            {
                value: 'good_plan',
                label: '😄 Если план хороший — я в деле',
                traits: [
                    'flexibility',
                    'spontaneity',
                ],
            },

            {
                value: 'ask_me',
                label: '😬 А меня спросить?',
                traits: [
                    'autonomy',
                    'planning_together',
                ],
            },

            {
                value: 'sofa_plan',
                label: '🌚 Мои планы на диван тоже вообще-то были планами',
                traits: [
                    'personal_space',
                    'home_comfort',
                    'humor',
                ],
            },
        ],
    },

    // ============================================================
    // ГЛАВА 4
    // ============================================================

    {
        id: 'keep_in_year',
        chapter: 4,

        eyebrow: 'ЧЕРЕЗ ГОД',

        text:
            'Что из ваших отношений больше всего хочется сохранить ровно таким, как сейчас?',

        visualType: 'cards',

        options: [
            {
                value: 'talking',
                label: 'Как мы разговариваем',
                traits: [
                    'value_communication',
                ],
            },

            {
                value: 'fun',
                label: 'Как нам весело вместе',
                traits: [
                    'value_playfulness',
                ],
            },

            {
                value: 'care',
                label: 'Как мы заботимся друг о друге',
                traits: [
                    'value_care',
                ],
            },

            {
                value: 'own_life',
                label: 'Как у каждого остаётся своя жизнь',
                traits: [
                    'value_independence',
                ],
            },

            {
                value: 'rituals',
                label: 'Наши маленькие привычки и ритуалы',
                traits: [
                    'value_ritual',
                    'stability',
                ],
            },
        ],
    },

    {
        id: 'want_more',
        chapter: 4,

        eyebrow: 'А ЧУТЬ БОЛЬШЕ?',

        text:
            'А чего хотелось бы добавить совсем немного?',

        visualType: 'cards',

        options: [
            {
                value: 'adventures',
                label: 'Приключений и новых впечатлений',
                traits: [
                    'need_novelty',
                ],
            },

            {
                value: 'stability',
                label: 'Спокойствия и стабильности',
                traits: [
                    'need_stability',
                ],
            },

            {
                value: 'deep_talk',
                label: 'Разговоров по-настоящему',
                traits: [
                    'need_deep_communication',
                ],
            },

            {
                value: 'plans',
                label: 'Совместных планов',
                traits: [
                    'need_future_alignment',
                ],
            },

            {
                value: 'lightness',
                label: 'Лёгкости — меньше всё усложнять',
                traits: [
                    'need_lightness',
                ],
            },
        ],
    },

    {
        id: 'unexpected_money',
        chapter: 4,

        eyebrow: 'НЕОЖИДАННЫЙ БОНУС',

        text:
            'У вас появилась неожиданная крупная сумма денег. Первая мысль про «нас»?',

        visualType: 'cards',

        options: [
            {
                value: 'travel',
                label: '✈️ Поехать куда-нибудь',
                traits: [
                    'money_experience',
                    'shared_experience',
                ],
            },

            {
                value: 'useful',
                label: '🏠 Купить что-то полезное для нашей жизни',
                traits: [
                    'money_practical',
                    'shared_life',
                ],
            },

            {
                value: 'save',
                label: '🐷 Отложить на большую общую цель',
                traits: [
                    'money_future',
                    'planning',
                ],
            },

            {
                value: 'enjoy_now',
                label: '🎉 Потратить часть и кайфануть сейчас',
                traits: [
                    'money_present',
                    'spontaneity',
                ],
            },

            {
                value: 'separate',
                label: '🤷 У каждого свои деньги — пусть каждый решает сам',
                traits: [
                    'money_independence',
                    'autonomy',
                ],
            },
        ],
    },

    {
        id: 'one_thing_to_know',
        chapter: 4,

        eyebrow: 'И ПОСЛЕДНЕЕ',

        text:
            'Партнёр увидит только один твой ответ из всего теста. Что тебе хотелось бы, чтобы он точно знал?',

        description:
            'Не думай слишком долго. Выбери то, что отзывается первым.',

        visualType: 'cards',

        options: [
            {
                value: 'ordinary_life',
                label: 'Мне с тобой хорошо именно в обычной жизни',
                traits: [
                    'message_everyday_love',
                ],
            },

            {
                value: 'team',
                label: 'Мне важно чувствовать, что мы команда',
                traits: [
                    'message_team',
                ],
            },

            {
                value: 'more_attention',
                label: 'Иногда мне нужно больше внимания, чем я показываю',
                traits: [
                    'message_need_attention',
                ],
            },

            {
                value: 'more_space',
                label: 'Иногда мне нужно больше пространства, чем кажется',
                traits: [
                    'message_need_space',
                ],
            },

            {
                value: 'future',
                label: 'Я хочу, чтобы у нас впереди было ещё много всего',
                traits: [
                    'message_future',
                ],
            },
        ],
    },
];

export function getQuestionById(
    id: string
): Question | undefined {
    return questions.find(
        (question) => question.id === id
    );
}

export function getOptionByValue(
    questionId: string,
    value: string
): QuestionOption | undefined {
    const question =
        getQuestionById(questionId);

    return question?.options.find(
        (option) => option.value === value
    );
}