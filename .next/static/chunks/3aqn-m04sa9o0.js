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
`;e.s(["default",0,function(){let e=(0,s.useParams)(),p=(0,s.useSearchParams)(),h=(0,s.useRouter)(),d=e.coupleId,_="b"===p.get("role")?"b":"a",[m,f]=(0,i.useState)(0),[g,x]=(0,i.useState)({}),[b,v]=(0,i.useState)(!0),[y,w]=(0,i.useState)(!1),[j,S]=(0,i.useState)(!1),[k,N]=(0,i.useState)(""),[z,$]=(0,i.useState)(null),[R,T]=(0,i.useState)("next"),[q,C]=(0,i.useState)(null),[F,A]=(0,i.useState)(null),I=n[m],O=(0,i.useMemo)(()=>n.length?(m+1)/n.length*100:0,[m]),E=(0,i.useMemo)(()=>{let e=(m+1)/n.length;return e<.2?"только начали":e<.45?"втянулись":e<.7?"уже больше половины":e<.9?"ещё совсем немного":"почти всё"},[m]);async function P(e){if(j||y||F||q||!I)return;S(!0),N(""),$(e);let t={...g,[I.id]:e};if(x(t),await c(220),m===n.length-1){await H(t),S(!1);return}let a=m+1,i=n[a],s=o[m];if(s&&(A(s),await c(750),A(null)),i&&i.chapter!==I.chapter){var l;let e,t=(l=i.chapter,(e=r.find(e=>e.id===l))?{chapter:e.id,intro:e.intro,subtitle:e.subtitle}:null);if(t){C(t),S(!1);return}}T("next"),f(a),S(!1)}async function H(e){if(!y){w(!0),N("");try{let t=await fetch("/api/answers",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({coupleId:d,role:_,answers:e})});if(!t.ok){let e=await t.text();throw console.error("Answers API:",t.status,e),Error("Не удалось сохранить ответы")}if("b"===_)return void h.replace(`/result/${d}`);h.replace(`/waiting/${d}`)}catch(e){console.error(e),N("Не получилось сохранить ответы. Попробуй ещё раз."),w(!1)}}}return(0,i.useEffect)(()=>{!async function(){try{let e=await fetch(`/api/couples?id=${encodeURIComponent(d)}`,{cache:"no-store"});if(!e.ok)throw Error("Не удалось загрузить пару");let t=await e.json();if(t.partner_a_completed&&t.partner_b_completed)return void h.replace(`/result/${d}`);if("a"===_&&t.partner_a_completed)return void h.replace(`/waiting/${d}`);if("b"===_&&t.partner_b_completed)return void(t.partner_a_completed?h.replace(`/result/${d}`):h.replace(`/waiting/${d}`))}catch(e){console.error(e)}finally{v(!1)}}()},[d,_,h]),(0,i.useEffect)(()=>{I&&$(g[I.id]??null)},[m,I,g]),b?(0,t.jsx)(l,{text:"секунду..."}):I?F?(0,t.jsxs)("main",{className:`jsx-${u.__hash} reaction-page`,children:[(0,t.jsxs)("div",{className:`jsx-${u.__hash} reaction-orbit`,children:[(0,t.jsx)("div",{className:`jsx-${u.__hash} reaction-circle reaction-circle-a`}),(0,t.jsx)("div",{className:`jsx-${u.__hash} reaction-circle reaction-circle-b`})]}),(0,t.jsx)("div",{className:`jsx-${u.__hash} reaction-text`,children:F}),(0,t.jsx)(a.default,{id:u.__hash,children:u})]}):q?(0,t.jsxs)("main",{className:`jsx-${u.__hash} chapter-page`,children:[(0,t.jsxs)("div",{className:`jsx-${u.__hash} chapter-inner`,children:[(0,t.jsxs)("div",{className:`jsx-${u.__hash} chapter-number`,children:["0",q.chapter]}),(0,t.jsxs)("div",{className:`jsx-${u.__hash} chapter-orbit`,children:[(0,t.jsx)("div",{className:`jsx-${u.__hash} chapter-circle chapter-circle-a`}),(0,t.jsx)("div",{className:`jsx-${u.__hash} chapter-circle chapter-circle-b`})]}),(0,t.jsx)("h1",{className:`jsx-${u.__hash} chapter-title`,children:q.intro}),(0,t.jsx)("p",{className:`jsx-${u.__hash} chapter-subtitle`,children:q.subtitle}),(0,t.jsx)("button",{type:"button",onClick:function(){!q||j||y||(C(null),T("next"),f(e=>Math.min(e+1,n.length-1)))},className:`jsx-${u.__hash} chapter-button`,children:"продолжить →"})]}),(0,t.jsx)(a.default,{id:u.__hash,children:u})]}):(0,t.jsxs)("main",{className:`jsx-${u.__hash} test-page`,children:[(0,t.jsxs)("div",{className:`jsx-${u.__hash} test-shell`,children:[(0,t.jsxs)("header",{className:`jsx-${u.__hash} test-header`,children:[(0,t.jsx)("button",{type:"button",onClick:function(){0===m||y||j||(T("back"),C(null),A(null),N(""),f(e=>Math.max(e-1,0)))},disabled:0===m||y||j,"aria-label":"Назад",className:`jsx-${u.__hash} back-button`,children:"←"}),(0,t.jsxs)("div",{className:`jsx-${u.__hash} progress-area`,children:[(0,t.jsx)("div",{className:`jsx-${u.__hash} progress-copy`,children:E}),(0,t.jsx)("div",{className:`jsx-${u.__hash} progress-track`,children:(0,t.jsx)("div",{style:{width:`${O}%`},className:`jsx-${u.__hash} progress-value`})})]}),(0,t.jsxs)("div",{className:`jsx-${u.__hash} question-position`,children:[m+1,(0,t.jsx)("span",{className:`jsx-${u.__hash}`,children:"/"}),n.length]})]}),(0,t.jsxs)("section",{className:`jsx-${u.__hash} `+(("next"===R?"question-screen question-screen-next":"question-screen question-screen-back")||""),children:[(0,t.jsxs)("div",{className:`jsx-${u.__hash} question-meta`,children:[(0,t.jsx)("span",{className:`jsx-${u.__hash} question-dot`}),I.eyebrow]}),(0,t.jsx)("h1",{className:`jsx-${u.__hash} question-title`,children:I.text}),I.description&&(0,t.jsx)("p",{className:`jsx-${u.__hash} question-description`,children:I.description}),(0,t.jsx)("div",{className:`jsx-${u.__hash} `+(("big-buttons"===I.visualType?"answers answers-big":"answers")||""),children:I.options.map((e,a)=>{let i=z===e.value;return(0,t.jsxs)("button",{type:"button",disabled:y||j,style:{animationDelay:`${45*a}ms`},onClick:()=>P(e.value),className:`jsx-${u.__hash} `+((i?"answer-card answer-card-selected":"answer-card")||""),children:[(0,t.jsx)("span",{className:`jsx-${u.__hash} answer-text`,children:e.label}),(0,t.jsx)("span",{className:`jsx-${u.__hash} answer-arrow`,children:"→"})]},e.value)})}),y&&(0,t.jsxs)("div",{className:`jsx-${u.__hash} submitting`,children:[(0,t.jsxs)("div",{className:`jsx-${u.__hash} submitting-dots`,children:[(0,t.jsx)("span",{className:`jsx-${u.__hash}`}),(0,t.jsx)("span",{className:`jsx-${u.__hash}`}),(0,t.jsx)("span",{className:`jsx-${u.__hash}`})]}),(0,t.jsx)("div",{className:`jsx-${u.__hash}`,children:"собираем вашу картину..."})]}),k&&(0,t.jsx)("div",{className:`jsx-${u.__hash} error`,children:k})]},I.id)]}),(0,t.jsx)(a.default,{id:u.__hash,children:u})]}):(0,t.jsx)(l,{text:"что-то пошло не так"})}],92935)},16015,(e,t,a)=>{},18566,(e,t,a)=>{t.exports=e.r(76562)},98547,(e,t,a)=>{var i=e.i(47167);e.r(16015);var s=e.r(71645),r=s&&"object"==typeof s&&"default"in s?s:{default:s},n=void 0!==i.default&&i.default.env&&!0,o=function(e){return"[object String]"===Object.prototype.toString.call(e)},l=function(){function e(e){var t=void 0===e?{}:e,a=t.name,i=void 0===a?"stylesheet":a,s=t.optimizeForSpeed,r=void 0===s?n:s;c(o(i),"`name` must be a string"),this._name=i,this._deletedRulePlaceholder="#"+i+"-deleted-rule____{}",c("boolean"==typeof r,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=r,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0;var l="u">typeof window&&document.querySelector('meta[property="csp-nonce"]');this._nonce=l?l.getAttribute("content"):null}var t,a=e.prototype;return a.setOptimizeForSpeed=function(e){c("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),c(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},a.isOptimizeForSpeed=function(){return this._optimizeForSpeed},a.inject=function(){var e=this;if(c(!this._injected,"sheet already injected"),this._injected=!0,"u">typeof window&&this._optimizeForSpeed){this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),this._optimizeForSpeed||(n||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0);return}this._serverSheet={cssRules:[],insertRule:function(t,a){return"number"==typeof a?e._serverSheet.cssRules[a]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),a},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},a.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},a.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},a.insertRule=function(e,t){if(c(o(e),"`insertRule` accepts only strings"),"u"<typeof window)return"number"!=typeof t&&(t=this._serverSheet.cssRules.length),this._serverSheet.insertRule(e,t),this._rulesCount++;if(this._optimizeForSpeed){var a=this.getSheet();"number"!=typeof t&&(t=a.cssRules.length);try{a.insertRule(e,t)}catch(t){return n||console.warn("StyleSheet: illegal rule: \n\n"+e+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var i=this._tags[t];this._tags.push(this.makeStyleTag(this._name,e,i))}return this._rulesCount++},a.replaceRule=function(e,t){if(this._optimizeForSpeed||"u"<typeof window){var a="u">typeof window?this.getSheet():this._serverSheet;if(t.trim()||(t=this._deletedRulePlaceholder),!a.cssRules[e])return e;a.deleteRule(e);try{a.insertRule(t,e)}catch(i){n||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),a.insertRule(this._deletedRulePlaceholder,e)}}else{var i=this._tags[e];c(i,"old rule at index `"+e+"` not found"),i.textContent=t}return e},a.deleteRule=function(e){if("u"<typeof window)return void this._serverSheet.deleteRule(e);if(this._optimizeForSpeed)this.replaceRule(e,"");else{var t=this._tags[e];c(t,"rule at index `"+e+"` not found"),t.parentNode.removeChild(t),this._tags[e]=null}},a.flush=function(){this._injected=!1,this._rulesCount=0,"u">typeof window?(this._tags.forEach(function(e){return e&&e.parentNode.removeChild(e)}),this._tags=[]):this._serverSheet.cssRules=[]},a.cssRules=function(){var e=this;return"u"<typeof window?this._serverSheet.cssRules:this._tags.reduce(function(t,a){return a?t=t.concat(Array.prototype.map.call(e.getSheetForTag(a).cssRules,function(t){return t.cssText===e._deletedRulePlaceholder?null:t})):t.push(null),t},[])},a.makeStyleTag=function(e,t,a){t&&c(o(t),"makeStyleTag accepts only strings as second parameter");var i=document.createElement("style");this._nonce&&i.setAttribute("nonce",this._nonce),i.type="text/css",i.setAttribute("data-"+e,""),t&&i.appendChild(document.createTextNode(t));var s=document.head||document.getElementsByTagName("head")[0];return a?s.insertBefore(i,a):s.appendChild(i),i},t=[{key:"length",get:function(){return this._rulesCount}}],function(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}(e.prototype,t),e}();function c(e,t){if(!e)throw Error("StyleSheet: "+t+".")}var u=function(e){for(var t=5381,a=e.length;a;)t=33*t^e.charCodeAt(--a);return t>>>0},p={};function h(e,t){if(!t)return"jsx-"+e;var a=String(t),i=e+a;return p[i]||(p[i]="jsx-"+u(e+"-"+a)),p[i]}function d(e,t){"u"<typeof window&&(t=t.replace(/\/style/gi,"\\/style"));var a=e+t;return p[a]||(p[a]=t.replace(/__jsx-style-dynamic-selector/g,e)),p[a]}var _=function(){function e(e){var t=void 0===e?{}:e,a=t.styleSheet,i=void 0===a?null:a,s=t.optimizeForSpeed,r=void 0!==s&&s;this._sheet=i||new l({name:"styled-jsx",optimizeForSpeed:r}),this._sheet.inject(),i&&"boolean"==typeof r&&(this._sheet.setOptimizeForSpeed(r),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var t=e.prototype;return t.add=function(e){var t=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(e.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),"u">typeof window&&!this._fromServer&&(this._fromServer=this.selectFromServer(),this._instancesCounts=Object.keys(this._fromServer).reduce(function(e,t){return e[t]=0,e},{}));var a=this.getIdAndRules(e),i=a.styleId,s=a.rules;if(i in this._instancesCounts){this._instancesCounts[i]+=1;return}var r=s.map(function(e){return t._sheet.insertRule(e)}).filter(function(e){return -1!==e});this._indices[i]=r,this._instancesCounts[i]=1},t.remove=function(e){var t=this,a=this.getIdAndRules(e).styleId;if(function(e,t){if(!e)throw Error("StyleSheetRegistry: "+t+".")}(a in this._instancesCounts,"styleId: `"+a+"` not found"),this._instancesCounts[a]-=1,this._instancesCounts[a]<1){var i=this._fromServer&&this._fromServer[a];i?(i.parentNode.removeChild(i),delete this._fromServer[a]):(this._indices[a].forEach(function(e){return t._sheet.deleteRule(e)}),delete this._indices[a]),delete this._instancesCounts[a]}},t.update=function(e,t){this.add(t),this.remove(e)},t.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},t.cssRules=function(){var e=this,t=this._fromServer?Object.keys(this._fromServer).map(function(t){return[t,e._fromServer[t]]}):[],a=this._sheet.cssRules();return t.concat(Object.keys(this._indices).map(function(t){return[t,e._indices[t].map(function(e){return a[e].cssText}).join(e._optimizeForSpeed?"":"\n")]}).filter(function(e){return!!e[1]}))},t.styles=function(e){var t,a;return t=this.cssRules(),void 0===(a=e)&&(a={}),t.map(function(e){var t=e[0],i=e[1];return r.default.createElement("style",{id:"__"+t,key:"__"+t,nonce:a.nonce?a.nonce:void 0,dangerouslySetInnerHTML:{__html:i}})})},t.getIdAndRules=function(e){var t=e.children,a=e.dynamic,i=e.id;if(a){var s=h(i,a);return{styleId:s,rules:Array.isArray(t)?t.map(function(e){return d(s,e)}):[d(s,t)]}}return{styleId:h(i),rules:Array.isArray(t)?t:[t]}},t.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e,t){return e[t.id.slice(2)]=t,e},{})},e}(),m=s.createContext(null);function f(){return new _}function g(){return s.useContext(m)}m.displayName="StyleSheetContext";var x=r.default.useInsertionEffect||r.default.useLayoutEffect,b="u">typeof window?f():void 0;function v(e){var t=b||g();return t&&("u"<typeof window?t.add(e):x(function(){return t.add(e),function(){t.remove(e)}},[e.id,String(e.dynamic)])),null}v.dynamic=function(e){return e.map(function(e){return h(e[0],e[1])}).join(" ")},a.StyleRegistry=function(e){var t=e.registry,a=e.children,i=s.useContext(m),n=s.useState(function(){return i||t||f()})[0];return r.default.createElement(m.Provider,{value:n},a)},a.createStyleRegistry=f,a.style=v,a.useStyleRegistry=g},37902,(e,t,a)=>{t.exports=e.r(98547).style}]);