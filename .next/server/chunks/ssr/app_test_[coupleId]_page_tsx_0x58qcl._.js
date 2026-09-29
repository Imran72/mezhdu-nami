module.exports=[76341,a=>{"use strict";var b=a.i(87924),c=a.i(31626),d=a.i(72131),e=a.i(50944);let f=[{id:1,title:"вы вдвоём",intro:"Начнём с простого.",subtitle:"Как выглядит ваш обычный кайф."},{id:2,title:"когда что-то идёт не так",intro:"Окей, с базой разобрались.",subtitle:"Теперь чуть интереснее 👀"},{id:3,title:"ваш маленький мир",intro:"А теперь обычная жизнь.",subtitle:"Она почему-то рассказывает больше всего."},{id:4,title:"куда всё это едет",intro:"Последняя глава.",subtitle:"Тут обычно находятся самые интересные совпадения."}],g=[{id:"free_saturday",chapter:1,eyebrow:"СВОБОДНАЯ СУББОТА",text:"У вас внезапно полностью свободная суббота. Идеальный сценарий?",visualType:"cards",options:[{value:"together_home",label:"🛋 Весь день вдвоём и вообще никуда",traits:["closeness_high","home_comfort","togetherness"]},{value:"go_somewhere",label:"🥐 Куда-нибудь выбраться вместе",traits:["closeness_high","shared_experience","activity"]},{value:"friends_together",label:"🫂 Увидеться с друзьями, но вместе",traits:["social","togetherness","shared_environment"]},{value:"separate_then_together",label:"🌿 Каждый занимается своим, вечером встречаемся",traits:["personal_space_high","independence","closeness_balanced"]},{value:"no_plan",label:"🎲 Ничего не планировать — разберёмся по ходу",traits:["spontaneity","flexibility"]}]},{id:"care_signal",chapter:1,eyebrow:"МЕЛОЧИ",text:"Какая мелочь от партнёра почему-то особенно радует?",visualType:"cards",options:[{value:"did_you_eat",label:"«Ты поел(а)?»",traits:["care_practical","attention"]},{value:"meme",label:"Скинуть мем именно мне",traits:["humor","micro_connection","attention"]},{value:"snack",label:"Принести что-нибудь вкусное без просьбы",traits:["care_practical","initiative"]},{value:"arrived",label:"Написать, когда добрался(-ась)",traits:["reassurance","attention","care_practical"]},{value:"silent_nearby",label:"Просто прилечь рядом и молчать",traits:["physical_presence","quiet_closeness"]}]},{id:"reunion",chapter:1,eyebrow:"ПОСЛЕ НЕДЕЛИ ВРОЗЬ",text:"Вы неделю почти не виделись. Наконец встретились. Чего хочется первым делом?",visualType:"cards",options:[{value:"hug",label:"🫂 Просто обнять",traits:["physical_closeness","warmth"]},{value:"tell_everything",label:"🗣 Рассказать вообще всё, что произошло",traits:["communication","emotional_sharing"]},{value:"go_out",label:"🚶 Куда-нибудь вместе пойти",traits:["shared_experience","activity"]},{value:"do_nothing",label:"🛋 Упасть рядом и ничего не делать",traits:["quiet_closeness","home_comfort"]},{value:"joke",label:"😄 Начать прикалываться, будто не виделись два часа",traits:["humor","playfulness"]}]},{id:"relationship_button",chapter:1,eyebrow:"ОДНА КНОПКА",text:"Если бы у ваших отношений была кнопка — какую бы ты нажал(а) прямо сейчас?",description:"Тут нет правильного ответа. Только тот, который первым пришёл в голову.",visualType:"big-buttons",options:[{value:"more_spontaneity",label:"БОЛЬШЕ СПОНТАННОСТИ",traits:["need_spontaneity"]},{value:"more_talking",label:"БОЛЬШЕ РАЗГОВОРОВ",traits:["need_communication"]},{value:"more_together",label:"БОЛЬШЕ ВРЕМЕНИ ВДВОЁМ",traits:["need_closeness"]},{value:"more_space",label:"БОЛЬШЕ СВОБОДЫ",traits:["need_space"]},{value:"keep_it",label:"НИЧЕГО НЕ ТРОГАТЬ",traits:["satisfaction","stability"]}]},{id:"everything_fine",chapter:2,eyebrow:"«ВСЁ НОРМАЛЬНО»",text:"Партнёр пишет: «всё нормально». Но ты понимаешь — вообще не нормально.",visualType:"cards",options:[{value:"ask_again",label:"👀 Спрошу ещё раз. Я же вижу",traits:["support_proactive","space_low"]},{value:"im_here",label:"🫶 Скажу: «я рядом, если захочешь поговорить»",traits:["support_available","space_balanced"]},{value:"give_space",label:"🌙 Дам немного пространства",traits:["support_space","space_high"]},{value:"make_evening_better",label:"☕ Попробую просто сделать вечер приятнее",traits:["care_practical","support_action"]},{value:"take_words_literally",label:"😶 Если говорит, что нормально — значит нормально",traits:["direct_communication","low_inference"]}]},{id:"conflict_finished",chapter:2,eyebrow:"ПОСЛЕ ССОРЫ",text:"В какой момент ты внутри понимаешь: «всё, мы помирились»?",visualType:"cards",options:[{value:"talked",label:"🗣 Мы нормально всё проговорили",traits:["conflict_verbal_resolution"]},{value:"first_step",label:"🤝 Кто-то сделал первый шаг",traits:["conflict_repair_action"]},{value:"hugged",label:"🫂 Обнялись — напряжение ушло",traits:["conflict_physical_repair","warmth"]},{value:"joking_again",label:"😂 Уже снова можем шутить друг с другом",traits:["conflict_humor_repair","playfulness"]},{value:"time",label:"⏳ Мне просто нужно немного времени",traits:["conflict_time_repair","space_high"]}]},{id:"wrong_in_argument",chapter:2,eyebrow:"НУ ДОПУСТИМ",text:"В споре ты вдруг понимаешь, что, кажется, неправ(а).",visualType:"cards",options:[{value:"say_immediately",label:"Скажу сразу",traits:["directness","repair_fast"]},{value:"argue_more",label:"Сначала ещё немного поспорю 😶",traits:["playful_stubbornness","repair_delayed"]},{value:"cool_down",label:"Мне нужно отойти и потом вернуться",traits:["space_high","self_regulation"]},{value:"show_action",label:"Скорее покажу поступком, чем скажу",traits:["care_action","indirect_repair"]},{value:"depends",label:"Зависит от того, насколько меня уже разнесло",traits:["emotion_intensity","flexible_repair"]}]},{id:"hard_day",chapter:2,eyebrow:"ТЯЖЁЛЫЙ ДЕНЬ",text:"После тяжёлого дня от партнёра больше всего хочется...",visualType:"cards",options:[{value:"listen",label:"Чтобы меня выслушали",traits:["support_listening","communication"]},{value:"hug",label:"Чтобы меня обняли",traits:["support_physical","warmth"]},{value:"leave_alone",label:"Чтобы меня немного оставили в покое",traits:["support_space","space_high"]},{value:"make_laugh",label:"Чтобы меня рассмешили",traits:["support_humor","playfulness"]},{value:"just_nearby",label:"Чтобы просто были рядом",traits:["support_presence","quiet_closeness"]}]},{id:"normal_evening",chapter:3,eyebrow:"ОБЫЧНЫЙ ВЕЧЕР",text:"Никаких планов. Вы дома. На что это больше похоже?",visualType:"cards",options:[{value:"watch_together",label:"🎬 Вместе смотрим что-нибудь",traits:["shared_activity","home_comfort"]},{value:"talk",label:"🗣 Зависаем и разговариваем",traits:["communication","emotional_sharing"]},{value:"phones_together",label:"📱 Сидим рядом, каждый в своём телефоне — и нам норм",traits:["parallel_closeness","comfort"]},{value:"do_something",label:"🍝 Что-нибудь делаем вместе",traits:["shared_activity","togetherness"]},{value:"own_things",label:"🌀 Каждый занимается своим и периодически пересекаемся",traits:["independence","space_balanced"]}]},{id:"extra_hour",chapter:3,eyebrow:"+1 ЧАС",text:"Вам подарили лишний свободный час только для вас двоих. Куда его потратить?",visualType:"cards",options:[{value:"walk",label:"Пойти гулять без цели",traits:["shared_experience","spontaneity"]},{value:"food",label:"Поесть что-нибудь вкусное",traits:["shared_pleasure","ritual"]},{value:"talk",label:"Полежать и поговорить",traits:["communication","quiet_closeness"]},{value:"episode",label:"Посмотреть одну серию",traits:["shared_activity","home_comfort"]},{value:"stay_home",label:"Никуда. Просто быть дома",traits:["home_comfort","quiet_closeness"]}]},{id:"worse_to_forget",chapter:3,eyebrow:"ЧТО ХУЖЕ?",text:"Что страшнее забыть?",visualType:"big-buttons",options:[{value:"important_date",label:"📅 ВАЖНУЮ ДАТУ",traits:["symbolic_attention","ritual"]},{value:"yesterday_story",label:"💬 ТО, ЧТО ПАРТНЁР РАССКАЗЫВАЛ ВЧЕРА",traits:["everyday_attention","listening"]}]},{id:"weekend_plan",chapter:3,eyebrow:"СЮРПРИЗ",text:"Партнёр придумал план на ваши выходные, вообще тебя не спросив. Первая реакция?",visualType:"cards",options:[{value:"cute",label:"🥹 Милота. Обо мне подумали",traits:["initiative_positive","trust"]},{value:"tell_me",label:"👀 Сначала расскажи, что за план",traits:["curiosity","balanced_control"]},{value:"good_plan",label:"😄 Если план хороший — я в деле",traits:["flexibility","spontaneity"]},{value:"ask_me",label:"😬 А меня спросить?",traits:["autonomy","planning_together"]},{value:"sofa_plan",label:"🌚 Мои планы на диван тоже вообще-то были планами",traits:["personal_space","home_comfort","humor"]}]},{id:"keep_in_year",chapter:4,eyebrow:"ЧЕРЕЗ ГОД",text:"Что из ваших отношений больше всего хочется сохранить ровно таким, как сейчас?",visualType:"cards",options:[{value:"talking",label:"Как мы разговариваем",traits:["value_communication"]},{value:"fun",label:"Как нам весело вместе",traits:["value_playfulness"]},{value:"care",label:"Как мы заботимся друг о друге",traits:["value_care"]},{value:"own_life",label:"Как у каждого остаётся своя жизнь",traits:["value_independence"]},{value:"rituals",label:"Наши маленькие привычки и ритуалы",traits:["value_ritual","stability"]}]},{id:"want_more",chapter:4,eyebrow:"А ЧУТЬ БОЛЬШЕ?",text:"А чего хотелось бы добавить совсем немного?",visualType:"cards",options:[{value:"adventures",label:"Приключений и новых впечатлений",traits:["need_novelty"]},{value:"stability",label:"Спокойствия и стабильности",traits:["need_stability"]},{value:"deep_talk",label:"Разговоров по-настоящему",traits:["need_deep_communication"]},{value:"plans",label:"Совместных планов",traits:["need_future_alignment"]},{value:"lightness",label:"Лёгкости — меньше всё усложнять",traits:["need_lightness"]}]},{id:"unexpected_money",chapter:4,eyebrow:"НЕОЖИДАННЫЙ БОНУС",text:"У вас появилась неожиданная крупная сумма денег. Первая мысль про «нас»?",visualType:"cards",options:[{value:"travel",label:"✈️ Поехать куда-нибудь",traits:["money_experience","shared_experience"]},{value:"useful",label:"🏠 Купить что-то полезное для нашей жизни",traits:["money_practical","shared_life"]},{value:"save",label:"🐷 Отложить на большую общую цель",traits:["money_future","planning"]},{value:"enjoy_now",label:"🎉 Потратить часть и кайфануть сейчас",traits:["money_present","spontaneity"]},{value:"separate",label:"🤷 У каждого свои деньги — пусть каждый решает сам",traits:["money_independence","autonomy"]}]},{id:"one_thing_to_know",chapter:4,eyebrow:"И ПОСЛЕДНЕЕ",text:"Партнёр увидит только один твой ответ из всего теста. Что тебе хотелось бы, чтобы он точно знал?",description:"Не думай слишком долго. Выбери то, что отзывается первым.",visualType:"cards",options:[{value:"ordinary_life",label:"Мне с тобой хорошо именно в обычной жизни",traits:["message_everyday_love"]},{value:"team",label:"Мне важно чувствовать, что мы команда",traits:["message_team"]},{value:"more_attention",label:"Иногда мне нужно больше внимания, чем я показываю",traits:["message_need_attention"]},{value:"more_space",label:"Иногда мне нужно больше пространства, чем кажется",traits:["message_need_space"]},{value:"future",label:"Я хочу, чтобы у нас впереди было ещё много всего",traits:["message_future"]}]}],h={2:"интересно 👀",6:"запомним это",10:"вот это потом сравним"};function i({text:a}){return(0,b.jsxs)("main",{className:`jsx-${k.__hash} loading-page`,children:[(0,b.jsxs)("div",{className:`jsx-${k.__hash} loading-orbit`,children:[(0,b.jsx)("div",{className:`jsx-${k.__hash} loading-circle loading-circle-a`}),(0,b.jsx)("div",{className:`jsx-${k.__hash} loading-circle loading-circle-b`})]}),(0,b.jsx)("div",{className:`jsx-${k.__hash} loading-copy`,children:a}),(0,b.jsx)(c.default,{id:k.__hash,children:k})]})}function j(a){return new Promise(b=>{window.setTimeout(b,a)})}let k=`

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

`;a.s(["default",0,function(){let a=(0,e.useParams)(),l=(0,e.useSearchParams)(),m=(0,e.useRouter)(),n=a.coupleId,o="b"===l.get("role")?"b":"a",[p,q]=(0,d.useState)(0),[r,s]=(0,d.useState)({}),[t,u]=(0,d.useState)(!0),[v,w]=(0,d.useState)(!1),[x,y]=(0,d.useState)(""),[z,A]=(0,d.useState)(null),[B,C]=(0,d.useState)("next"),[D,E]=(0,d.useState)(null),[F,G]=(0,d.useState)(null),H=g[p],I=(0,d.useMemo)(()=>g.length?p/g.length*100:0,[p]),J=(0,d.useMemo)(()=>{let a=p/g.length;return a<.2?"только начали":a<.45?"втянулись":a<.7?"уже больше половины":a<.9?"ещё совсем немного":"почти всё"},[p]);async function K(a){if(null!==z||v||F||D||!H)return;A(a);let b={...r,[H.id]:a};if(s(b),await j(260),p===g.length-1)return void await L(b);let c=p+1,d=g[c],e=h[p];if(e&&(G(e),await j(850),G(null)),d&&d.chapter!==H.chapter){var i;let a,b=(i=d.chapter,(a=f.find(a=>a.id===i))?{chapter:a.id,intro:a.intro,subtitle:a.subtitle}:null);if(b)return void E(b)}C("next"),q(c),A(null)}async function L(a){if(!v){w(!0),y("");try{let b=await fetch("/api/answers",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({coupleId:n,role:o,answers:a})});if(!b.ok){let a=await b.text();throw console.error("Answers API:",b.status,a),Error("Не удалось сохранить ответы")}if("b"===o)return void m.replace(`/result/${n}`);m.replace(`/waiting/${n}`)}catch(a){console.error(a),y("Не получилось сохранить ответы. Попробуй ещё раз."),w(!1),A(null)}}}return(0,d.useEffect)(()=>{!async function(){try{let a=await fetch(`/api/couples?id=${encodeURIComponent(n)}`,{cache:"no-store"});if(!a.ok)throw Error("Не удалось загрузить пару");let b=await a.json();if(b.partner_a_completed&&b.partner_b_completed)return void m.replace(`/result/${n}`);if("a"===o&&b.partner_a_completed)return void m.replace(`/waiting/${n}`);if("b"===o&&b.partner_b_completed)return void(b.partner_a_completed?m.replace(`/result/${n}`):m.replace(`/waiting/${n}`))}catch(a){console.error(a)}finally{u(!1)}}()},[n,o,m]),(0,d.useEffect)(()=>{H&&A(r[H.id]??null)},[p,H,r]),t?(0,b.jsx)(i,{text:"секунду..."}):H?F?(0,b.jsxs)("main",{className:`jsx-${k.__hash} reaction-page`,children:[(0,b.jsxs)("div",{className:`jsx-${k.__hash} reaction-orbit`,children:[(0,b.jsx)("div",{className:`jsx-${k.__hash} reaction-circle reaction-circle-a`}),(0,b.jsx)("div",{className:`jsx-${k.__hash} reaction-circle reaction-circle-b`})]}),(0,b.jsx)("div",{className:`jsx-${k.__hash} reaction-text`,children:F}),(0,b.jsx)(c.default,{id:k.__hash,children:k})]}):D?(0,b.jsxs)("main",{className:`jsx-${k.__hash} chapter-page`,children:[(0,b.jsxs)("div",{className:`jsx-${k.__hash} chapter-inner`,children:[(0,b.jsxs)("div",{className:`jsx-${k.__hash} chapter-number`,children:["0",D.chapter]}),(0,b.jsxs)("div",{className:`jsx-${k.__hash} chapter-orbit`,children:[(0,b.jsx)("div",{className:`jsx-${k.__hash} chapter-circle chapter-circle-a`}),(0,b.jsx)("div",{className:`jsx-${k.__hash} chapter-circle chapter-circle-b`})]}),(0,b.jsx)("h1",{className:`jsx-${k.__hash} chapter-title`,children:D.intro}),(0,b.jsx)("p",{className:`jsx-${k.__hash} chapter-subtitle`,children:D.subtitle}),(0,b.jsx)("button",{type:"button",onClick:function(){D&&(E(null),C("next"),q(a=>a+1),A(null))},className:`jsx-${k.__hash} chapter-button`,children:"продолжить →"})]}),(0,b.jsx)(c.default,{id:k.__hash,children:k})]}):(0,b.jsxs)("main",{className:`jsx-${k.__hash} test-page`,children:[(0,b.jsxs)("div",{className:`jsx-${k.__hash} test-shell`,children:[(0,b.jsxs)("header",{className:`jsx-${k.__hash} test-header`,children:[(0,b.jsx)("button",{type:"button",onClick:function(){0===p||v||(C("back"),E(null),G(null),q(a=>a-1))},disabled:0===p||v,"aria-label":"Назад",className:`jsx-${k.__hash} back-button`,children:"←"}),(0,b.jsxs)("div",{className:`jsx-${k.__hash} progress-area`,children:[(0,b.jsx)("div",{className:`jsx-${k.__hash} progress-copy`,children:J}),(0,b.jsx)("div",{className:`jsx-${k.__hash} progress-track`,children:(0,b.jsx)("div",{style:{width:`${I}%`},className:`jsx-${k.__hash} progress-value`})})]}),(0,b.jsxs)("div",{className:`jsx-${k.__hash} question-position`,children:[p+1,(0,b.jsx)("span",{className:`jsx-${k.__hash}`,children:"/"}),g.length]})]}),(0,b.jsxs)("section",{className:`jsx-${k.__hash} `+(("next"===B?"question-screen question-screen-next":"question-screen question-screen-back")||""),children:[(0,b.jsxs)("div",{className:`jsx-${k.__hash} question-meta`,children:[(0,b.jsx)("span",{className:`jsx-${k.__hash} question-dot`}),H.eyebrow]}),(0,b.jsx)("h1",{className:`jsx-${k.__hash} question-title`,children:H.text}),H.description&&(0,b.jsx)("p",{className:`jsx-${k.__hash} question-description`,children:H.description}),(0,b.jsx)("div",{className:`jsx-${k.__hash} `+(("big-buttons"===H.visualType?"answers answers-big":"answers")||""),children:H.options.map((a,c)=>{let d=z===a.value;return(0,b.jsxs)("button",{type:"button",disabled:v||null!==z&&!d,style:{animationDelay:`${45*c}ms`},onClick:()=>K(a.value),className:`jsx-${k.__hash} `+((d?"answer-card answer-card-selected":"answer-card")||""),children:[(0,b.jsx)("span",{className:`jsx-${k.__hash} answer-text`,children:a.label}),(0,b.jsx)("span",{className:`jsx-${k.__hash} answer-arrow`,children:"→"})]},a.value)})}),v&&(0,b.jsxs)("div",{className:`jsx-${k.__hash} submitting`,children:[(0,b.jsxs)("div",{className:`jsx-${k.__hash} submitting-dots`,children:[(0,b.jsx)("span",{className:`jsx-${k.__hash}`}),(0,b.jsx)("span",{className:`jsx-${k.__hash}`}),(0,b.jsx)("span",{className:`jsx-${k.__hash}`})]}),(0,b.jsx)("div",{className:`jsx-${k.__hash}`,children:"собираем вашу картину..."})]}),x&&(0,b.jsx)("div",{className:`jsx-${k.__hash} error`,children:x})]},H.id)]}),(0,b.jsx)(c.default,{id:k.__hash,children:k})]}):(0,b.jsx)(i,{text:"что-то пошло не так"})}],76341)}];

//# sourceMappingURL=app_test_%5BcoupleId%5D_page_tsx_0x58qcl._.js.map