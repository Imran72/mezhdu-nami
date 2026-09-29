(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,92935,e=>{"use strict";var t=e.i(43476),a=e.i(37902),i=e.i(71645),s=e.i(18566);let r=[{id:1,title:"вы вдвоём",intro:"Начнём с простого.",subtitle:"Как выглядит ваш обычный кайф."},{id:2,title:"когда что-то идёт не так",intro:"Окей, с базой разобрались.",subtitle:"Теперь чуть интереснее 👀"},{id:3,title:"ваш маленький мир",intro:"А теперь обычная жизнь.",subtitle:"Она почему-то рассказывает больше всего."},{id:4,title:"куда всё это едет",intro:"Последняя глава.",subtitle:"Тут обычно находятся самые интересные совпадения."}],n=[{id:"free_saturday",chapter:1,eyebrow:"СВОБОДНАЯ СУББОТА",text:"У вас внезапно полностью свободная суббота. Идеальный сценарий?",visualType:"cards",options:[{value:"together_home",label:"🛋 Весь день вдвоём и вообще никуда",traits:["closeness_high","home_comfort","togetherness"]},{value:"go_somewhere",label:"🥐 Куда-нибудь выбраться вместе",traits:["closeness_high","shared_experience","activity"]},{value:"friends_together",label:"🫂 Увидеться с друзьями, но вместе",traits:["social","togetherness","shared_environment"]},{value:"separate_then_together",label:"🌿 Каждый занимается своим, вечером встречаемся",traits:["personal_space_high","independence","closeness_balanced"]},{value:"no_plan",label:"🎲 Ничего не планировать — разберёмся по ходу",traits:["spontaneity","flexibility"]}]},{id:"care_signal",chapter:1,eyebrow:"МЕЛОЧИ",text:"Какая мелочь от партнёра почему-то особенно радует?",visualType:"cards",options:[{value:"did_you_eat",label:"«Ты поел(а)?»",traits:["care_practical","attention"]},{value:"meme",label:"Скинуть мем именно мне",traits:["humor","micro_connection","attention"]},{value:"snack",label:"Принести что-нибудь вкусное без просьбы",traits:["care_practical","initiative"]},{value:"arrived",label:"Написать, когда добрался(-ась)",traits:["reassurance","attention","care_practical"]},{value:"silent_nearby",label:"Просто прилечь рядом и молчать",traits:["physical_presence","quiet_closeness"]}]},{id:"reunion",chapter:1,eyebrow:"ПОСЛЕ НЕДЕЛИ ВРОЗЬ",text:"Вы неделю почти не виделись. Наконец встретились. Чего хочется первым делом?",visualType:"cards",options:[{value:"hug",label:"🫂 Просто обнять",traits:["physical_closeness","warmth"]},{value:"tell_everything",label:"🗣 Рассказать вообще всё, что произошло",traits:["communication","emotional_sharing"]},{value:"go_out",label:"🚶 Куда-нибудь вместе пойти",traits:["shared_experience","activity"]},{value:"do_nothing",label:"🛋 Упасть рядом и ничего не делать",traits:["quiet_closeness","home_comfort"]},{value:"joke",label:"😄 Начать прикалываться, будто не виделись два часа",traits:["humor","playfulness"]}]},{id:"relationship_button",chapter:1,eyebrow:"ОДНА КНОПКА",text:"Если бы у ваших отношений была кнопка — какую бы ты нажал(а) прямо сейчас?",description:"Тут нет правильного ответа. Только тот, который первым пришёл в голову.",visualType:"big-buttons",options:[{value:"more_spontaneity",label:"БОЛЬШЕ СПОНТАННОСТИ",traits:["need_spontaneity"]},{value:"more_talking",label:"БОЛЬШЕ РАЗГОВОРОВ",traits:["need_communication"]},{value:"more_together",label:"БОЛЬШЕ ВРЕМЕНИ ВДВОЁМ",traits:["need_closeness"]},{value:"more_space",label:"БОЛЬШЕ СВОБОДЫ",traits:["need_space"]},{value:"keep_it",label:"НИЧЕГО НЕ ТРОГАТЬ",traits:["satisfaction","stability"]}]},{id:"everything_fine",chapter:2,eyebrow:"«ВСЁ НОРМАЛЬНО»",text:"Партнёр пишет: «всё нормально». Но ты понимаешь — вообще не нормально.",visualType:"cards",options:[{value:"ask_again",label:"👀 Спрошу ещё раз. Я же вижу",traits:["support_proactive","space_low"]},{value:"im_here",label:"🫶 Скажу: «я рядом, если захочешь поговорить»",traits:["support_available","space_balanced"]},{value:"give_space",label:"🌙 Дам немного пространства",traits:["support_space","space_high"]},{value:"make_evening_better",label:"☕ Попробую просто сделать вечер приятнее",traits:["care_practical","support_action"]},{value:"take_words_literally",label:"😶 Если говорит, что нормально — значит нормально",traits:["direct_communication","low_inference"]}]},{id:"conflict_finished",chapter:2,eyebrow:"ПОСЛЕ ССОРЫ",text:"В какой момент ты внутри понимаешь: «всё, мы помирились»?",visualType:"cards",options:[{value:"talked",label:"🗣 Мы нормально всё проговорили",traits:["conflict_verbal_resolution"]},{value:"first_step",label:"🤝 Кто-то сделал первый шаг",traits:["conflict_repair_action"]},{value:"hugged",label:"🫂 Обнялись — напряжение ушло",traits:["conflict_physical_repair","warmth"]},{value:"joking_again",label:"😂 Уже снова можем шутить друг с другом",traits:["conflict_humor_repair","playfulness"]},{value:"time",label:"⏳ Мне просто нужно немного времени",traits:["conflict_time_repair","space_high"]}]},{id:"wrong_in_argument",chapter:2,eyebrow:"НУ ДОПУСТИМ",text:"В споре ты вдруг понимаешь, что, кажется, неправ(а).",visualType:"cards",options:[{value:"say_immediately",label:"Скажу сразу",traits:["directness","repair_fast"]},{value:"argue_more",label:"Сначала ещё немного поспорю 😶",traits:["playful_stubbornness","repair_delayed"]},{value:"cool_down",label:"Мне нужно отойти и потом вернуться",traits:["space_high","self_regulation"]},{value:"show_action",label:"Скорее покажу поступком, чем скажу",traits:["care_action","indirect_repair"]},{value:"depends",label:"Зависит от того, насколько меня уже разнесло",traits:["emotion_intensity","flexible_repair"]}]},{id:"hard_day",chapter:2,eyebrow:"ТЯЖЁЛЫЙ ДЕНЬ",text:"После тяжёлого дня от партнёра больше всего хочется...",visualType:"cards",options:[{value:"listen",label:"Чтобы меня выслушали",traits:["support_listening","communication"]},{value:"hug",label:"Чтобы меня обняли",traits:["support_physical","warmth"]},{value:"leave_alone",label:"Чтобы меня немного оставили в покое",traits:["support_space","space_high"]},{value:"make_laugh",label:"Чтобы меня рассмешили",traits:["support_humor","playfulness"]},{value:"just_nearby",label:"Чтобы просто были рядом",traits:["support_presence","quiet_closeness"]}]},{id:"normal_evening",chapter:3,eyebrow:"ОБЫЧНЫЙ ВЕЧЕР",text:"Никаких планов. Вы дома. На что это больше похоже?",visualType:"cards",options:[{value:"watch_together",label:"🎬 Вместе смотрим что-нибудь",traits:["shared_activity","home_comfort"]},{value:"talk",label:"🗣 Зависаем и разговариваем",traits:["communication","emotional_sharing"]},{value:"phones_together",label:"📱 Сидим рядом, каждый в своём телефоне — и нам норм",traits:["parallel_closeness","comfort"]},{value:"do_something",label:"🍝 Что-нибудь делаем вместе",traits:["shared_activity","togetherness"]},{value:"own_things",label:"🌀 Каждый занимается своим и периодически пересекаемся",traits:["independence","space_balanced"]}]},{id:"extra_hour",chapter:3,eyebrow:"+1 ЧАС",text:"Вам подарили лишний свободный час только для вас двоих. Куда его потратить?",visualType:"cards",options:[{value:"walk",label:"Пойти гулять без цели",traits:["shared_experience","spontaneity"]},{value:"food",label:"Поесть что-нибудь вкусное",traits:["shared_pleasure","ritual"]},{value:"talk",label:"Полежать и поговорить",traits:["communication","quiet_closeness"]},{value:"episode",label:"Посмотреть одну серию",traits:["shared_activity","home_comfort"]},{value:"stay_home",label:"Никуда. Просто быть дома",traits:["home_comfort","quiet_closeness"]}]},{id:"worse_to_forget",chapter:3,eyebrow:"ЧТО ХУЖЕ?",text:"Что страшнее забыть?",visualType:"big-buttons",options:[{value:"important_date",label:"📅 ВАЖНУЮ ДАТУ",traits:["symbolic_attention","ritual"]},{value:"yesterday_story",label:"💬 ТО, ЧТО ПАРТНЁР РАССКАЗЫВАЛ ВЧЕРА",traits:["everyday_attention","listening"]}]},{id:"weekend_plan",chapter:3,eyebrow:"СЮРПРИЗ",text:"Партнёр придумал план на ваши выходные, вообще тебя не спросив. Первая реакция?",visualType:"cards",options:[{value:"cute",label:"🥹 Милота. Обо мне подумали",traits:["initiative_positive","trust"]},{value:"tell_me",label:"👀 Сначала расскажи, что за план",traits:["curiosity","balanced_control"]},{value:"good_plan",label:"😄 Если план хороший — я в деле",traits:["flexibility","spontaneity"]},{value:"ask_me",label:"😬 А меня спросить?",traits:["autonomy","planning_together"]},{value:"sofa_plan",label:"🌚 Мои планы на диван тоже вообще-то были планами",traits:["personal_space","home_comfort","humor"]}]},{id:"keep_in_year",chapter:4,eyebrow:"ЧЕРЕЗ ГОД",text:"Что из ваших отношений больше всего хочется сохранить ровно таким, как сейчас?",visualType:"cards",options:[{value:"talking",label:"Как мы разговариваем",traits:["value_communication"]},{value:"fun",label:"Как нам весело вместе",traits:["value_playfulness"]},{value:"care",label:"Как мы заботимся друг о друге",traits:["value_care"]},{value:"own_life",label:"Как у каждого остаётся своя жизнь",traits:["value_independence"]},{value:"rituals",label:"Наши маленькие привычки и ритуалы",traits:["value_ritual","stability"]}]},{id:"want_more",chapter:4,eyebrow:"А ЧУТЬ БОЛЬШЕ?",text:"А чего хотелось бы добавить совсем немного?",visualType:"cards",options:[{value:"adventures",label:"Приключений и новых впечатлений",traits:["need_novelty"]},{value:"stability",label:"Спокойствия и стабильности",traits:["need_stability"]},{value:"deep_talk",label:"Разговоров по-настоящему",traits:["need_deep_communication"]},{value:"plans",label:"Совместных планов",traits:["need_future_alignment"]},{value:"lightness",label:"Лёгкости — меньше всё усложнять",traits:["need_lightness"]}]},{id:"unexpected_money",chapter:4,eyebrow:"НЕОЖИДАННЫЙ БОНУС",text:"У вас появилась неожиданная крупная сумма денег. Первая мысль про «нас»?",visualType:"cards",options:[{value:"travel",label:"✈️ Поехать куда-нибудь",traits:["money_experience","shared_experience"]},{value:"useful",label:"🏠 Купить что-то полезное для нашей жизни",traits:["money_practical","shared_life"]},{value:"save",label:"🐷 Отложить на большую общую цель",traits:["money_future","planning"]},{value:"enjoy_now",label:"🎉 Потратить часть и кайфануть сейчас",traits:["money_present","spontaneity"]},{value:"separate",label:"🤷 У каждого свои деньги — пусть каждый решает сам",traits:["money_independence","autonomy"]}]},{id:"one_thing_to_know",chapter:4,eyebrow:"И ПОСЛЕДНЕЕ",text:"Партнёр увидит только один твой ответ из всего теста. Что тебе хотелось бы, чтобы он точно знал?",description:"Не думай слишком долго. Выбери то, что отзывается первым.",visualType:"cards",options:[{value:"ordinary_life",label:"Мне с тобой хорошо именно в обычной жизни",traits:["message_everyday_love"]},{value:"team",label:"Мне важно чувствовать, что мы команда",traits:["message_team"]},{value:"more_attention",label:"Иногда мне нужно больше внимания, чем я показываю",traits:["message_need_attention"]},{value:"more_space",label:"Иногда мне нужно больше пространства, чем кажется",traits:["message_need_space"]},{value:"future",label:"Я хочу, чтобы у нас впереди было ещё много всего",traits:["message_future"]}]}],o={2:"интересно 👀",6:"запомним это",10:"вот это потом сравним"};function l({text:e}){return(0,t.jsxs)("main",{className:`jsx-${u.__hash} loading-page`,children:[(0,t.jsxs)("div",{className:`jsx-${u.__hash} loading-orbit`,children:[(0,t.jsx)("div",{className:`jsx-${u.__hash} loading-circle loading-circle-a`}),(0,t.jsx)("div",{className:`jsx-${u.__hash} loading-circle loading-circle-b`})]}),(0,t.jsx)("div",{className:`jsx-${u.__hash} loading-copy`,children:e}),(0,t.jsx)(a.default,{id:u.__hash,children:u})]})}function c(e){return new Promise(t=>{window.setTimeout(t,e)})}let u=`

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

`;e.s(["default",0,function(){let e=(0,s.useParams)(),d=(0,s.useSearchParams)(),p=(0,s.useRouter)(),h=e.coupleId,m="b"===d.get("role")?"b":"a",[_,f]=(0,i.useState)(0),[b,g]=(0,i.useState)({}),[x,v]=(0,i.useState)(!0),[y,w]=(0,i.useState)(!1),[j,S]=(0,i.useState)(""),[k,N]=(0,i.useState)(null),[z,$]=(0,i.useState)("next"),[R,T]=(0,i.useState)(null),[C,q]=(0,i.useState)(null),F=n[_],I=(0,i.useMemo)(()=>n.length?_/n.length*100:0,[_]),A=(0,i.useMemo)(()=>{let e=_/n.length;return e<.2?"только начали":e<.45?"втянулись":e<.7?"уже больше половины":e<.9?"ещё совсем немного":"почти всё"},[_]);async function E(e){if(null!==k||y||C||R||!F)return;N(e);let t={...b,[F.id]:e};if(g(t),await c(260),_===n.length-1)return void await O(t);let a=_+1,i=n[a],s=o[_];if(s&&(q(s),await c(850),q(null)),i&&i.chapter!==F.chapter){var l;let e,t=(l=i.chapter,(e=r.find(e=>e.id===l))?{chapter:e.id,intro:e.intro,subtitle:e.subtitle}:null);if(t)return void T(t)}$("next"),f(a),N(null)}async function O(e){if(!y){w(!0),S("");try{let t=await fetch("/api/answers",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({coupleId:h,role:m,answers:e})});if(!t.ok){let e=await t.text();throw console.error("Answers API:",t.status,e),Error("Не удалось сохранить ответы")}if("b"===m)return void p.replace(`/result/${h}`);p.replace(`/waiting/${h}`)}catch(e){console.error(e),S("Не получилось сохранить ответы. Попробуй ещё раз."),w(!1),N(null)}}}return(0,i.useEffect)(()=>{!async function(){try{let e=await fetch(`/api/couples?id=${encodeURIComponent(h)}`,{cache:"no-store"});if(!e.ok)throw Error("Не удалось загрузить пару");let t=await e.json();if(t.partner_a_completed&&t.partner_b_completed)return void p.replace(`/result/${h}`);if("a"===m&&t.partner_a_completed)return void p.replace(`/waiting/${h}`);if("b"===m&&t.partner_b_completed)return void(t.partner_a_completed?p.replace(`/result/${h}`):p.replace(`/waiting/${h}`))}catch(e){console.error(e)}finally{v(!1)}}()},[h,m,p]),(0,i.useEffect)(()=>{F&&N(b[F.id]??null)},[_,F,b]),x?(0,t.jsx)(l,{text:"секунду..."}):F?C?(0,t.jsxs)("main",{className:`jsx-${u.__hash} reaction-page`,children:[(0,t.jsxs)("div",{className:`jsx-${u.__hash} reaction-orbit`,children:[(0,t.jsx)("div",{className:`jsx-${u.__hash} reaction-circle reaction-circle-a`}),(0,t.jsx)("div",{className:`jsx-${u.__hash} reaction-circle reaction-circle-b`})]}),(0,t.jsx)("div",{className:`jsx-${u.__hash} reaction-text`,children:C}),(0,t.jsx)(a.default,{id:u.__hash,children:u})]}):R?(0,t.jsxs)("main",{className:`jsx-${u.__hash} chapter-page`,children:[(0,t.jsxs)("div",{className:`jsx-${u.__hash} chapter-inner`,children:[(0,t.jsxs)("div",{className:`jsx-${u.__hash} chapter-number`,children:["0",R.chapter]}),(0,t.jsxs)("div",{className:`jsx-${u.__hash} chapter-orbit`,children:[(0,t.jsx)("div",{className:`jsx-${u.__hash} chapter-circle chapter-circle-a`}),(0,t.jsx)("div",{className:`jsx-${u.__hash} chapter-circle chapter-circle-b`})]}),(0,t.jsx)("h1",{className:`jsx-${u.__hash} chapter-title`,children:R.intro}),(0,t.jsx)("p",{className:`jsx-${u.__hash} chapter-subtitle`,children:R.subtitle}),(0,t.jsx)("button",{type:"button",onClick:function(){R&&(T(null),$("next"),f(e=>e+1),N(null))},className:`jsx-${u.__hash} chapter-button`,children:"продолжить →"})]}),(0,t.jsx)(a.default,{id:u.__hash,children:u})]}):(0,t.jsxs)("main",{className:`jsx-${u.__hash} test-page`,children:[(0,t.jsxs)("div",{className:`jsx-${u.__hash} test-shell`,children:[(0,t.jsxs)("header",{className:`jsx-${u.__hash} test-header`,children:[(0,t.jsx)("button",{type:"button",onClick:function(){0===_||y||($("back"),T(null),q(null),f(e=>e-1))},disabled:0===_||y,"aria-label":"Назад",className:`jsx-${u.__hash} back-button`,children:"←"}),(0,t.jsxs)("div",{className:`jsx-${u.__hash} progress-area`,children:[(0,t.jsx)("div",{className:`jsx-${u.__hash} progress-copy`,children:A}),(0,t.jsx)("div",{className:`jsx-${u.__hash} progress-track`,children:(0,t.jsx)("div",{style:{width:`${I}%`},className:`jsx-${u.__hash} progress-value`})})]}),(0,t.jsxs)("div",{className:`jsx-${u.__hash} question-position`,children:[_+1,(0,t.jsx)("span",{className:`jsx-${u.__hash}`,children:"/"}),n.length]})]}),(0,t.jsxs)("section",{className:`jsx-${u.__hash} `+(("next"===z?"question-screen question-screen-next":"question-screen question-screen-back")||""),children:[(0,t.jsxs)("div",{className:`jsx-${u.__hash} question-meta`,children:[(0,t.jsx)("span",{className:`jsx-${u.__hash} question-dot`}),F.eyebrow]}),(0,t.jsx)("h1",{className:`jsx-${u.__hash} question-title`,children:F.text}),F.description&&(0,t.jsx)("p",{className:`jsx-${u.__hash} question-description`,children:F.description}),(0,t.jsx)("div",{className:`jsx-${u.__hash} `+(("big-buttons"===F.visualType?"answers answers-big":"answers")||""),children:F.options.map((e,a)=>{let i=k===e.value;return(0,t.jsxs)("button",{type:"button",disabled:y||null!==k&&!i,style:{animationDelay:`${45*a}ms`},onClick:()=>E(e.value),className:`jsx-${u.__hash} `+((i?"answer-card answer-card-selected":"answer-card")||""),children:[(0,t.jsx)("span",{className:`jsx-${u.__hash} answer-text`,children:e.label}),(0,t.jsx)("span",{className:`jsx-${u.__hash} answer-arrow`,children:"→"})]},e.value)})}),y&&(0,t.jsxs)("div",{className:`jsx-${u.__hash} submitting`,children:[(0,t.jsxs)("div",{className:`jsx-${u.__hash} submitting-dots`,children:[(0,t.jsx)("span",{className:`jsx-${u.__hash}`}),(0,t.jsx)("span",{className:`jsx-${u.__hash}`}),(0,t.jsx)("span",{className:`jsx-${u.__hash}`})]}),(0,t.jsx)("div",{className:`jsx-${u.__hash}`,children:"собираем вашу картину..."})]}),j&&(0,t.jsx)("div",{className:`jsx-${u.__hash} error`,children:j})]},F.id)]}),(0,t.jsx)(a.default,{id:u.__hash,children:u})]}):(0,t.jsx)(l,{text:"что-то пошло не так"})}],92935)},16015,(e,t,a)=>{},18566,(e,t,a)=>{t.exports=e.r(76562)},98547,(e,t,a)=>{var i=e.i(47167);e.r(16015);var s=e.r(71645),r=s&&"object"==typeof s&&"default"in s?s:{default:s},n=void 0!==i.default&&i.default.env&&!0,o=function(e){return"[object String]"===Object.prototype.toString.call(e)},l=function(){function e(e){var t=void 0===e?{}:e,a=t.name,i=void 0===a?"stylesheet":a,s=t.optimizeForSpeed,r=void 0===s?n:s;c(o(i),"`name` must be a string"),this._name=i,this._deletedRulePlaceholder="#"+i+"-deleted-rule____{}",c("boolean"==typeof r,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=r,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0;var l="u">typeof window&&document.querySelector('meta[property="csp-nonce"]');this._nonce=l?l.getAttribute("content"):null}var t,a=e.prototype;return a.setOptimizeForSpeed=function(e){c("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),c(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},a.isOptimizeForSpeed=function(){return this._optimizeForSpeed},a.inject=function(){var e=this;if(c(!this._injected,"sheet already injected"),this._injected=!0,"u">typeof window&&this._optimizeForSpeed){this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),this._optimizeForSpeed||(n||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0);return}this._serverSheet={cssRules:[],insertRule:function(t,a){return"number"==typeof a?e._serverSheet.cssRules[a]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),a},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},a.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},a.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},a.insertRule=function(e,t){if(c(o(e),"`insertRule` accepts only strings"),"u"<typeof window)return"number"!=typeof t&&(t=this._serverSheet.cssRules.length),this._serverSheet.insertRule(e,t),this._rulesCount++;if(this._optimizeForSpeed){var a=this.getSheet();"number"!=typeof t&&(t=a.cssRules.length);try{a.insertRule(e,t)}catch(t){return n||console.warn("StyleSheet: illegal rule: \n\n"+e+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var i=this._tags[t];this._tags.push(this.makeStyleTag(this._name,e,i))}return this._rulesCount++},a.replaceRule=function(e,t){if(this._optimizeForSpeed||"u"<typeof window){var a="u">typeof window?this.getSheet():this._serverSheet;if(t.trim()||(t=this._deletedRulePlaceholder),!a.cssRules[e])return e;a.deleteRule(e);try{a.insertRule(t,e)}catch(i){n||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),a.insertRule(this._deletedRulePlaceholder,e)}}else{var i=this._tags[e];c(i,"old rule at index `"+e+"` not found"),i.textContent=t}return e},a.deleteRule=function(e){if("u"<typeof window)return void this._serverSheet.deleteRule(e);if(this._optimizeForSpeed)this.replaceRule(e,"");else{var t=this._tags[e];c(t,"rule at index `"+e+"` not found"),t.parentNode.removeChild(t),this._tags[e]=null}},a.flush=function(){this._injected=!1,this._rulesCount=0,"u">typeof window?(this._tags.forEach(function(e){return e&&e.parentNode.removeChild(e)}),this._tags=[]):this._serverSheet.cssRules=[]},a.cssRules=function(){var e=this;return"u"<typeof window?this._serverSheet.cssRules:this._tags.reduce(function(t,a){return a?t=t.concat(Array.prototype.map.call(e.getSheetForTag(a).cssRules,function(t){return t.cssText===e._deletedRulePlaceholder?null:t})):t.push(null),t},[])},a.makeStyleTag=function(e,t,a){t&&c(o(t),"makeStyleTag accepts only strings as second parameter");var i=document.createElement("style");this._nonce&&i.setAttribute("nonce",this._nonce),i.type="text/css",i.setAttribute("data-"+e,""),t&&i.appendChild(document.createTextNode(t));var s=document.head||document.getElementsByTagName("head")[0];return a?s.insertBefore(i,a):s.appendChild(i),i},t=[{key:"length",get:function(){return this._rulesCount}}],function(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}(e.prototype,t),e}();function c(e,t){if(!e)throw Error("StyleSheet: "+t+".")}var u=function(e){for(var t=5381,a=e.length;a;)t=33*t^e.charCodeAt(--a);return t>>>0},d={};function p(e,t){if(!t)return"jsx-"+e;var a=String(t),i=e+a;return d[i]||(d[i]="jsx-"+u(e+"-"+a)),d[i]}function h(e,t){"u"<typeof window&&(t=t.replace(/\/style/gi,"\\/style"));var a=e+t;return d[a]||(d[a]=t.replace(/__jsx-style-dynamic-selector/g,e)),d[a]}var m=function(){function e(e){var t=void 0===e?{}:e,a=t.styleSheet,i=void 0===a?null:a,s=t.optimizeForSpeed,r=void 0!==s&&s;this._sheet=i||new l({name:"styled-jsx",optimizeForSpeed:r}),this._sheet.inject(),i&&"boolean"==typeof r&&(this._sheet.setOptimizeForSpeed(r),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var t=e.prototype;return t.add=function(e){var t=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(e.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),"u">typeof window&&!this._fromServer&&(this._fromServer=this.selectFromServer(),this._instancesCounts=Object.keys(this._fromServer).reduce(function(e,t){return e[t]=0,e},{}));var a=this.getIdAndRules(e),i=a.styleId,s=a.rules;if(i in this._instancesCounts){this._instancesCounts[i]+=1;return}var r=s.map(function(e){return t._sheet.insertRule(e)}).filter(function(e){return -1!==e});this._indices[i]=r,this._instancesCounts[i]=1},t.remove=function(e){var t=this,a=this.getIdAndRules(e).styleId;if(function(e,t){if(!e)throw Error("StyleSheetRegistry: "+t+".")}(a in this._instancesCounts,"styleId: `"+a+"` not found"),this._instancesCounts[a]-=1,this._instancesCounts[a]<1){var i=this._fromServer&&this._fromServer[a];i?(i.parentNode.removeChild(i),delete this._fromServer[a]):(this._indices[a].forEach(function(e){return t._sheet.deleteRule(e)}),delete this._indices[a]),delete this._instancesCounts[a]}},t.update=function(e,t){this.add(t),this.remove(e)},t.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},t.cssRules=function(){var e=this,t=this._fromServer?Object.keys(this._fromServer).map(function(t){return[t,e._fromServer[t]]}):[],a=this._sheet.cssRules();return t.concat(Object.keys(this._indices).map(function(t){return[t,e._indices[t].map(function(e){return a[e].cssText}).join(e._optimizeForSpeed?"":"\n")]}).filter(function(e){return!!e[1]}))},t.styles=function(e){var t,a;return t=this.cssRules(),void 0===(a=e)&&(a={}),t.map(function(e){var t=e[0],i=e[1];return r.default.createElement("style",{id:"__"+t,key:"__"+t,nonce:a.nonce?a.nonce:void 0,dangerouslySetInnerHTML:{__html:i}})})},t.getIdAndRules=function(e){var t=e.children,a=e.dynamic,i=e.id;if(a){var s=p(i,a);return{styleId:s,rules:Array.isArray(t)?t.map(function(e){return h(s,e)}):[h(s,t)]}}return{styleId:p(i),rules:Array.isArray(t)?t:[t]}},t.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e,t){return e[t.id.slice(2)]=t,e},{})},e}(),_=s.createContext(null);function f(){return new m}function b(){return s.useContext(_)}_.displayName="StyleSheetContext";var g=r.default.useInsertionEffect||r.default.useLayoutEffect,x="u">typeof window?f():void 0;function v(e){var t=x||b();return t&&("u"<typeof window?t.add(e):g(function(){return t.add(e),function(){t.remove(e)}},[e.id,String(e.dynamic)])),null}v.dynamic=function(e){return e.map(function(e){return p(e[0],e[1])}).join(" ")},a.StyleRegistry=function(e){var t=e.registry,a=e.children,i=s.useContext(_),n=s.useState(function(){return i||t||f()})[0];return r.default.createElement(_.Provider,{value:n},a)},a.createStyleRegistry=f,a.style=v,a.useStyleRegistry=b},37902,(e,t,a)=>{t.exports=e.r(98547).style}]);