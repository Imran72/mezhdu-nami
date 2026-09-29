module.exports=[66248,a=>{"use strict";var b=a.i(87924),c=a.i(31626),d=a.i(72131),e=a.i(50944);let f=[{id:"knight_princess",title:"Рыцарь и принцесса",emojiA:"⚔️",emojiB:"👑",description:"У вас много заботы в мелочах. Для этой пары любовь чаще видна не в громких словах, а в ощущении: «я рядом и помню о тебе».",traits:["care_practical","attention","warmth","initiative","support_action","physical_closeness","support_physical"]},{id:"astronauts",title:"Два космонавта",emojiA:"🚀",emojiB:"🪐",description:"У каждого может быть своя орбита, но вам важно знать, что маршрут всё равно общий. Близость для вас не обязательно означает быть вместе каждую минуту.",traits:["independence","personal_space_high","space_high","space_balanced","autonomy","value_independence","planning","need_future_alignment"]},{id:"wizards",title:"Два волшебника",emojiA:"🔮",emojiB:"✨",description:"Ваш главный инструмент — разговор. Вам важно не просто быть рядом, а понимать, что происходит внутри другого человека.",traits:["communication","emotional_sharing","support_listening","conflict_verbal_resolution","need_communication","need_deep_communication","value_communication","listening"]},{id:"pirates",title:"Два пирата",emojiA:"🏴‍☠️",emojiB:"🗺️",description:"Вашей паре особенно идёт ощущение приключения. Планы хороши, но иногда лучший план — придумать всё по дороге.",traits:["spontaneity","shared_experience","activity","need_spontaneity","need_novelty","flexibility","money_experience","money_present"]},{id:"sun_moon",title:"Солнце и Луна",emojiA:"☀️",emojiB:"🌙",description:"Вы не обязаны одинаково реагировать на всё. В вашей паре особенно заметно, как разные способы чувствовать и действовать могут существовать рядом.",traits:["support_proactive","support_space","space_high","closeness_high","independence","direct_communication","quiet_closeness","emotional_sharing"]},{id:"dragon_keeper",title:"Дракон и хранитель",emojiA:"🐉",emojiB:"🛡️",description:"В вашей динамике есть энергия и спокойствие. Один момент может проживаться ярко, другой — через паузу, действие или присутствие рядом.",traits:["emotion_intensity","self_regulation","support_available","support_presence","conflict_time_repair","indirect_repair","repair_delayed"]},{id:"players",title:"Два игрока",emojiA:"🎮",emojiB:"👾",description:"У вас есть важная суперсила — лёгкость. Юмор, свои приколы и ощущение команды помогают вам снова находить друг друга.",traits:["humor","playfulness","support_humor","conflict_humor_repair","micro_connection","value_playfulness","need_lightness","message_team"]},{id:"homekeepers",title:"Хранители дома",emojiA:"🕯️",emojiB:"🏡",description:"Сила вашей пары прячется в обычной жизни: знакомых ритуалах, спокойных вечерах и ощущении места, куда хочется возвращаться.",traits:["home_comfort","quiet_closeness","ritual","stability","value_ritual","need_stability","shared_life","message_everyday_love"]}];function g(a){for(let b of["everything_fine","hard_day","conflict_finished","one_thing_to_know","want_more","weekend_plan","free_saturday","unexpected_money"]){let c=a.find(a=>a.questionId===b);if(c)return c}return a[0]}function h(a,b){return b.some(b=>a.includes(b))}function i({emojiA:a,emojiB:c,archetypeId:d}){return(0,b.jsxs)("div",{className:"couple-art",children:[(0,b.jsxs)("svg",{className:"blob",viewBox:"0 0 420 360","aria-hidden":"true",children:[(0,b.jsx)("path",{d:"\n            M74 103\n            C118 35 222 13 304 50\n            C379 84 414 167 383 244\n            C350 326 255 356 167 329\n            C78 302 21 238 37 166\n            C43 140 54 119 74 103Z\n          ",fill:"#E9D9E1"}),(0,b.jsx)("circle",{cx:"64",cy:"188",r:"6",fill:"#C49C47"}),(0,b.jsx)("circle",{cx:"360",cy:"105",r:"5",fill:"#A74769"}),(0,b.jsx)("path",{d:"\n            M335 56\n            L341 70\n            L356 76\n            L341 82\n            L335 97\n            L329 82\n            L314 76\n            L329 70Z\n          ",fill:"#C49C47"})]}),(0,b.jsxs)("div",{className:"people",children:[(0,b.jsxs)("div",{className:"person",children:[(0,b.jsx)("div",{className:"head",children:a}),(0,b.jsx)("div",{className:"body body-one"})]}),(0,b.jsx)("div",{className:"heart",children:"♥"}),(0,b.jsxs)("div",{className:"person person-two",children:[(0,b.jsx)("div",{className:"head",children:c}),(0,b.jsx)("div",{className:"body body-two"})]})]}),(0,b.jsx)("div",{className:"art-tag",children:function(a){switch(a){case"astronauts":return"на одной орбите";case"knight_princess":return"забота в деталях";case"wizards":return"магия разговора";case"pirates":return"куда-нибудь вместе";case"sun_moon":return"разные · рядом";case"dragon_keeper":return"огонь + спокойствие";case"players":return"одна команда";case"homekeepers":return"своё место";default:return"между вами"}}(d)})]})}function j({value:a,label:c}){return(0,b.jsxs)("div",{className:"summary-item",children:[(0,b.jsx)("strong",{children:a}),(0,b.jsx)("span",{children:c})]})}function k({symbol:a,title:c,text:d}){return(0,b.jsxs)("article",{className:"insight-card",children:[(0,b.jsxs)("div",{className:"insight-top",children:[(0,b.jsx)("div",{className:"insight-symbol",children:a}),(0,b.jsx)("div",{className:"insight-title",children:c})]}),(0,b.jsx)("p",{children:d})]})}function l({children:a}){return(0,b.jsxs)("div",{className:"paywall-item",children:[(0,b.jsx)("span",{children:"✓"}),(0,b.jsx)("div",{children:a})]})}let m=`

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;

    background: #ffffff;

    color: #282326;

    font-family:
      Inter,
      ui-sans-serif,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;
  }

  button {
    font: inherit;
  }

  .page {
    min-height: 100svh;

    overflow: hidden;
  }

  .shell {
    width:
      min(
        calc(100% - 48px),
        1180px
      );

    margin: 0 auto;
  }

  .brand {
    color: #292326;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size: 26px;
    font-weight: 600;

    letter-spacing:
      -0.04em;
  }

  .eyebrow {
    color: #A74669;

    font-size: 11px;
    font-weight: 850;

    letter-spacing: 0.18em;
  }

  /* ============================================================
     HERO
  ============================================================ */

  .hero {
    position: relative;

    overflow: hidden;

    background:
      radial-gradient(
        circle at 85% 10%,
        rgba(
          255,
          255,
          255,
          0.72
        ),
        transparent 30%
      ),
      #F7F1F4;

    padding-bottom: 58px;
  }

  .topbar {
    height: 82px;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .result-pill {
    padding:
      8px
      13px;

    border:
      1px solid
      rgba(
        122,
        83,
        98,
        0.15
      );

    border-radius: 999px;

    background:
      rgba(
        255,
        255,
        255,
        0.55
      );

    color: #8B7C81;

    font-size: 11px;
  }

  .hero-content {
    padding-top: 16px;
  }

  .names {
    text-align: center;

    color: #282326;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        50px,
        6vw,
        76px
      );

    font-weight: 500;

    line-height: 1;

    letter-spacing:
      -0.055em;
  }

  .names span {
    margin:
      0
      12px;

    color: #AF496E;
  }

  .hero-result {
    display: grid;

    grid-template-columns:
      0.72fr
      1.15fr
      1fr;

    align-items: center;

    gap: 30px;

    margin-top: 22px;
  }

  /* SCORE */

  .score-column {
    text-align: center;
  }

  .score {
    color: #A74669;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        76px,
        8vw,
        112px
      );

    line-height: 0.9;

    letter-spacing:
      -0.07em;
  }

  .score span {
    margin-left: 2px;

    font-size: 0.42em;
  }

  .score-label {
    margin-top: 12px;

    color: #A74669;

    font-size: 11px;
    font-weight: 900;

    letter-spacing: 0.17em;
  }

  .score-description {
    max-width: 170px;

    margin:
      9px
      auto
      0;

    color: #93868B;

    font-size: 11px;
    line-height: 1.45;
  }

  /* TYPE */

  .type-label {
    margin-bottom: 10px;

    color: #A74669;

    font-size: 10px;
    font-weight: 850;

    letter-spacing: 0.19em;
  }

  .type-column h1 {
    margin: 0;

    color: #282326;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        40px,
        4.3vw,
        59px
      );

    font-weight: 500;

    line-height: 0.98;

    letter-spacing:
      -0.045em;
  }

  .type-column p {
    max-width: 380px;

    margin:
      17px
      0
      0;

    color: #71666A;

    font-size: 15px;
    line-height: 1.55;
  }

  /* ART */

  .hero-art-column {
    display: flex;
    justify-content: center;
  }

  .couple-art {
    position: relative;

    width: 100%;
    max-width: 400px;

    aspect-ratio:
      420 / 360;
  }

  .blob {
    position: absolute;

    inset: 0;

    width: 100%;
    height: 100%;
  }

  .people {
    position: absolute;

    z-index: 2;

    left: 50%;
    bottom: 54px;

    display: flex;
    align-items: flex-end;

    gap: 6px;

    transform:
      translateX(-50%);
  }

  .person {
    position: relative;

    width: 96px;
    height: 162px;
  }

  .person-two {
    transform:
      translateY(-4px);
  }

  .head {
    position: absolute;

    z-index: 2;

    top: 0;
    left: 50%;

    width: 70px;
    height: 70px;

    display: flex;
    align-items: center;
    justify-content: center;

    transform:
      translateX(-50%);

    border:
      3px solid #493E42;

    border-radius: 50%;

    background: #EDC5B3;

    font-size: 34px;
  }

  .body {
    position: absolute;

    left: 50%;
    bottom: 0;

    width: 92px;
    height: 108px;

    transform:
      translateX(-50%);

    border:
      3px solid #493E42;

    border-radius:
      42px 42px 20px 20px;
  }

  .body-one {
    background: #A84A6D;
  }

  .body-two {
    background: #8C80A4;
  }

  .heart {
    align-self: center;

    margin-bottom: 60px;

    color: #A53E64;

    font-size: 22px;
  }

  .art-tag {
    position: absolute;

    z-index: 4;

    right: 16px;
    bottom: 36px;

    padding:
      8px
      12px;

    border-radius: 999px;

    background: #ffffff;

    box-shadow:
      0 8px 25px
      rgba(
        72,
        49,
        58,
        0.09
      );

    color: #7F6F75;

    font-size: 10px;
    font-weight: 700;
  }

  /* SUMMARY */

  .answer-summary {
    width: fit-content;

    display: flex;
    align-items: center;

    gap: 22px;

    margin:
      18px
      auto
      0;

    padding:
      12px
      22px;

    border:
      1px solid
      rgba(
        111,
        77,
        90,
        0.12
      );

    border-radius: 999px;

    background:
      rgba(
        255,
        255,
        255,
        0.58
      );
  }

  .summary-item {
    display: flex;
    align-items: baseline;

    gap: 6px;
  }

  .summary-item strong {
    color: #A74669;

    font-family:
      Georgia,
      serif;

    font-size: 22px;
    font-weight: 500;
  }

  .summary-item span {
    color: #82767A;

    font-size: 11px;
  }

  .summary-line {
    width: 1px;
    height: 24px;

    background:
      rgba(
        99,
        70,
        81,
        0.14
      );
  }

  .hero-decoration {
    position: absolute;

    color: #C3A04C;
  }

  .star-one {
    top: 150px;
    left: 5%;

    font-size: 20px;
  }

  .star-two {
    top: 105px;
    right: 5%;

    color: #B95D80;

    font-size: 25px;
  }

  .hero-bottom {
    position: absolute;

    left: -5%;
    right: -5%;
    bottom: -50px;

    height: 75px;

    border-radius: 50%;

    background: #ffffff;
  }

  /* ============================================================
     INSIGHTS
  ============================================================ */

  .insights-section {
    padding:
      65px
      0
      80px;

    background: #ffffff;
  }

  .section-heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    gap: 30px;

    margin-bottom: 30px;
  }

  .section-heading h2 {
    margin:
      8px
      0
      0;

    color: #292326;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        36px,
        4vw,
        50px
      );

    font-weight: 500;

    line-height: 1;

    letter-spacing:
      -0.04em;
  }

  .insight-grid {
    display: grid;

    grid-template-columns:
      repeat(
        3,
        minmax(0, 1fr)
      );

    gap: 14px;
  }

  .insight-card {
    min-height: 245px;

    display: flex;
    flex-direction: column;

    padding: 24px;

    border:
      1px solid #EBE3E0;

    border-radius: 22px;

    background: #FBF9F8;
  }

  .insight-top {
    display: flex;
    align-items: center;

    gap: 10px;
  }

  .insight-symbol {
    width: 36px;
    height: 36px;

    display: flex;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;

    border-radius: 12px;

    background: #F0DFE6;

    color: #A74669;

    font-size: 15px;
    font-weight: 800;
  }

  .insight-title {
    color: #A74669;

    font-size: 10px;
    font-weight: 850;

    letter-spacing: 0.09em;

    text-transform: uppercase;
  }

  .insight-card p {
    margin:
      auto
      0
      0;

    color: #554D50;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size: 20px;
    line-height: 1.42;
  }

  /* ============================================================
     QUESTION
  ============================================================ */

  .question-section {
    position: relative;

    overflow: hidden;

    padding:
      68px
      24px;

    background: #625770;
  }

  .question-shell {
    width:
      min(
        100%,
        1040px
      );

    display: grid;

    grid-template-columns:
      260px
      minmax(0, 1fr);

    align-items: center;

    gap: 50px;

    margin: 0 auto;
  }

  .question-visual {
    position: relative;

    height: 230px;
  }

  .moon {
    position: absolute;

    top: 0;
    left: 50%;

    width: 190px;
    height: 190px;

    display: flex;
    align-items: center;
    justify-content: center;

    transform:
      translateX(-50%);

    border-radius: 50%;

    background: #F1E5C9;

    color: #D1AA51;

    font-size: 75px;
  }

  .tiny-couple {
    position: absolute;

    z-index: 2;

    left: 50%;
    bottom: 0;

    display: flex;
    align-items: center;

    gap: 7px;

    transform:
      translateX(-50%);
  }

  .tiny-person {
    width: 68px;
    height: 82px;

    display: flex;
    align-items: center;
    justify-content: center;

    border:
      3px solid #433D49;

    border-radius:
      34px 34px 16px 16px;

    background: #B87891;

    font-size: 29px;
  }

  .tiny-person.second {
    background: #9185A6;
  }

  .tiny-couple span {
    color: #F0BDD0;

    font-size: 17px;
  }

  .question-label {
    color: #DDB9C7;

    font-size: 10px;
    font-weight: 850;

    letter-spacing: 0.17em;
  }

  .question-copy h2 {
    max-width: 680px;

    margin:
      13px
      0
      0;

    color: #ffffff;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        34px,
        4vw,
        49px
      );

    font-weight: 500;

    line-height: 1.08;

    letter-spacing:
      -0.035em;
  }

  .question-copy p {
    margin:
      18px
      0
      0;

    color: #D8D0DB;

    font-size: 13px;
  }

  .question-star {
    position: absolute;

    color:
      rgba(
        255,
        255,
        255,
        0.25
      );
  }

  .question-star-one {
    top: 30px;
    left: 7%;

    font-size: 25px;
  }

  .question-star-two {
    right: 8%;
    bottom: 35px;

    font-size: 16px;
  }

  /* ============================================================
     PAYWALL
  ============================================================ */

  .paywall-section {
    padding:
      75px
      24px
      90px;

    background: #F9F6F4;
  }

  .paywall-shell {
    width:
      min(
        100%,
        1040px
      );

    display: grid;

    grid-template-columns:
      1fr
      0.95fr;

    align-items: center;

    gap: 70px;

    margin: 0 auto;
  }

  .paywall-copy h2 {
    max-width: 520px;

    margin:
      12px
      0
      18px;

    color: #292326;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        38px,
        4.4vw,
        54px
      );

    font-weight: 500;

    line-height: 1.02;

    letter-spacing:
      -0.04em;
  }

  .paywall-copy p {
    max-width: 480px;

    margin: 0;

    color: #81767A;

    font-size: 15px;
    line-height: 1.55;
  }

  .paywall-card {
    padding: 26px;

    border:
      1px solid #E9DFDC;

    border-radius: 24px;

    background: #ffffff;

    box-shadow:
      0 20px 60px
      rgba(
        73,
        52,
        60,
        0.05
      );
  }

  .paywall-list {
    display: flex;
    flex-direction: column;

    gap: 14px;
  }

  .paywall-item {
    display: grid;

    grid-template-columns:
      24px
      1fr;

    align-items: start;

    gap: 10px;

    color: #554C50;

    font-size: 14px;
    line-height: 1.4;
  }

  .paywall-item > span {
    width: 22px;
    height: 22px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    background: #F1E0E7;

    color: #A74669;

    font-size: 10px;
    font-weight: 900;
  }

  .paywall-card button {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 15px;

    margin-top: 23px;

    padding:
      17px
      18px;

    border: 0;
    border-radius: 14px;

    background: #A74669;

    color: #ffffff;

    cursor: pointer;

    font-size: 14px;
    font-weight: 750;

    transition:
      transform 150ms ease,
      background 150ms ease;
  }

  .paywall-card button:hover {
    transform:
      translateY(-1px);

    background: #943C5D;
  }

  .paywall-card button strong {
    font-size: 15px;
  }

  .paywall-note {
    margin-top: 10px;

    color: #A3979B;

    font-size: 10px;

    text-align: center;
  }

  /* ============================================================
     LOADING
  ============================================================ */

  .loading-page,
  .state-page {
    min-height: 100svh;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #F7F1F4;
  }

  .loading-page {
    flex-direction: column;
  }

  .loading-circles {
    position: relative;

    width: 100px;
    height: 64px;

    margin-bottom: 20px;
  }

  .loading-circles span {
    position: absolute;

    width: 64px;
    height: 64px;

    border-radius: 50%;
  }

  .loading-circles span:first-child {
    left: 0;

    background:
      rgba(
        167,
        70,
        105,
        0.5
      );
  }

  .loading-circles span:nth-child(2) {
    right: 0;

    background:
      rgba(
        140,
        128,
        164,
        0.5
      );
  }

  .loading-circles b {
    position: absolute;

    top: 50%;
    left: 50%;

    color: #ffffff;

    transform:
      translate(
        -50%,
        -50%
      );
  }

  .loading-brand {
    font-family:
      Georgia,
      serif;

    font-size: 25px;
  }

  .loading-page p {
    margin-top: 8px;

    color: #93868B;

    font-size: 12px;
  }

  .state-shell {
    width:
      min(
        calc(100% - 40px),
        650px
      );
  }

  .state-shell h1 {
    margin-top: 50px;

    font-family:
      Georgia,
      serif;

    font-size: 48px;

    font-weight: 500;
  }

  .state-shell p {
    color: #82767A;
  }

  /* ============================================================
     TABLET
  ============================================================ */

  @media (
    max-width: 900px
  ) {

    .hero-result {
      grid-template-columns:
        0.7fr
        1fr;

      gap: 20px;
    }

    .type-column {
      grid-column:
        1 / -1;

      max-width: 650px;

      margin:
        -5px
        auto
        0;

      text-align: center;
    }

    .type-column p {
      margin:
        16px
        auto
        0;
    }

    .insight-grid {
      grid-template-columns: 1fr;
    }

    .insight-card {
      min-height: auto;
    }

    .insight-card p {
      margin-top: 25px;
    }

    .question-shell {
      grid-template-columns:
        200px
        1fr;

      gap: 30px;
    }

    .paywall-shell {
      gap: 35px;
    }

  }

  /* ============================================================
     MOBILE
  ============================================================ */

  @media (
    max-width: 600px
  ) {

    .shell {
      width:
        calc(100% - 32px);
    }

    .hero {
      padding-bottom: 45px;
    }

    .topbar {
      height: 68px;
    }

    .brand {
      font-size: 21px;
    }

    .result-pill {
      display: none;
    }

    .hero-content {
      padding-top: 7px;
    }

    .names {
      font-size:
        clamp(
          44px,
          14vw,
          60px
        );
    }

    .names span {
      margin:
        0
        6px;
    }

    .hero-result {
      display: flex;
      flex-direction: column;

      gap: 0;

      margin-top: 20px;
    }

    .score-column {
      order: 1;
    }

    .score {
      font-size: 86px;
    }

    .score-description {
      display: none;
    }

    .hero-art-column {
      order: 2;

      width: 100%;

      margin-top: -5px;
    }

    .couple-art {
      max-width: 330px;
    }

    .type-column {
      order: 3;

      margin-top: -18px;
    }

    .type-column h1 {
      font-size: 46px;
    }

    .type-column p {
      max-width: 340px;

      font-size: 14px;
    }

    .answer-summary {
      gap: 12px;

      margin-top: 23px;

      padding:
        10px
        15px;
    }

    .summary-item {
      gap: 4px;
    }

    .summary-item strong {
      font-size: 19px;
    }

    .summary-item span {
      font-size: 10px;
    }

    .summary-line {
      height: 20px;
    }

    .insights-section {
      padding:
        52px
        0
        58px;
    }

    .section-heading {
      margin-bottom: 22px;
    }

    .section-heading h2 {
      font-size: 39px;
    }

    .insight-grid {
      gap: 10px;
    }

    .insight-card {
      padding: 19px;

      border-radius: 18px;
    }

    .insight-card p {
      margin-top: 20px;

      font-size: 17px;
    }

    .question-section {
      padding:
        48px
        16px;
    }

    .question-shell {
      grid-template-columns: 1fr;

      gap: 25px;

      width: 100%;
    }

    .question-visual {
      height: 175px;
    }

    .moon {
      width: 145px;
      height: 145px;

      font-size: 58px;
    }

    .tiny-person {
      width: 53px;
      height: 64px;

      border-width: 2px;

      font-size: 23px;
    }

    .question-copy {
      text-align: center;
    }

    .question-copy h2 {
      max-width: 390px;

      margin:
        11px
        auto
        0;

      font-size: 32px;
    }

    .question-copy p {
      margin-top: 14px;
    }

    .paywall-section {
      padding:
        55px
        16px
        65px;
    }

    .paywall-shell {
      grid-template-columns: 1fr;

      gap: 27px;
    }

    .paywall-copy {
      text-align: center;
    }

    .paywall-copy h2 {
      margin:
        10px
        auto
        15px;

      font-size: 39px;
    }

    .paywall-copy p {
      margin:
        0
        auto;

      font-size: 14px;
    }

    .paywall-card {
      padding: 20px;

      border-radius: 20px;
    }

  }

  @media (
    prefers-reduced-motion:
    reduce
  ) {

    * {
      scroll-behavior: auto !important;

      animation-duration:
        0.01ms !important;

      transition-duration:
        0.01ms !important;
    }

  }

`;a.s(["default",0,function(){let a=(0,e.useParams)(),n=(0,e.useRouter)(),o=a.coupleId,[p,q]=(0,d.useState)(null),[r,s]=(0,d.useState)("");(0,d.useEffect)(()=>{!async function(){try{let a=await fetch(`/api/report?id=${encodeURIComponent(o)}`,{cache:"no-store"});if(!a.ok)throw Error("Не удалось загрузить результат");let b=await a.json();if(b.waiting)return void n.replace(`/waiting/${o}`);q(b)}catch(a){console.error(a),s("Не получилось загрузить результат.")}}()},[o,n]);let t=(0,d.useMemo)(()=>p?.comparisons??[],[p]),u=(0,d.useMemo)(()=>(function(a){let b=new Map;for(let a of f)b.set(a.id,0);for(let c of a){let a="same"===c.similarity?2:"close"===c.similarity?1.35:.65,d=[...c.traitsA,...c.traitsB];for(let c of f)for(let e of d)c.traits.includes(e)&&b.set(c.id,(b.get(c.id)??0)+a)}let c=a.filter(a=>"different"===a.similarity).length,d=a.filter(a=>"same"===a.similarity).length;a.length>0&&c>d&&b.set("sun_moon",(b.get("sun_moon")??0)+4);let e=f[0],g=b.get(e.id)??0;for(let a of f){let c=b.get(a.id)??0;c>g&&(e=a,g=c)}return{id:e.id,title:e.title,emojiA:e.emojiA,emojiB:e.emojiB,description:e.description}})(t),[t]),v=(0,d.useMemo)(()=>{let a,b,c,d;return a=t.filter(a=>"same"===a.similarity),b=t.filter(a=>"close"===a.similarity),c=t.filter(a=>"different"===a.similarity),{sameInsight:function(a){if(!a)return"Вы можете выбирать разные варианты, но в нескольких местах за ними всё равно стоит похожее отношение к близости.";switch(a.questionId){case"free_saturday":return"У вас довольно похожее представление о том, как выглядит хороший день вдвоём. Это одна из тех мелочей, которые делают совместную жизнь легче.";case"care_signal":return"Вы похоже считываете маленькие проявления заботы. То, что для одного выглядит вниманием, второй тоже с большой вероятностью замечает.";case"reunion":return"После времени врозь вы похожим способом возвращаете ощущение «мы снова вместе».";case"relationship_button":return"Если бы прямо сейчас можно было немного изменить ваши отношения, вы потянулись бы примерно к одной и той же кнопке.";case"everything_fine":return"У вас похожее представление о том, как быть рядом, когда другому непросто.";case"conflict_finished":return"Вы довольно похоже чувствуете момент, когда напряжение после ссоры действительно закончилось.";case"hard_day":return"После тяжёлого дня вам обоим помогает похожий тип поддержки. Это полезное совпадение.";case"normal_evening":return"Ваше представление об уютном обычном вечере оказалось очень близким.";case"extra_hour":return"Если появляется немного свободного времени только для вас двоих, потратить его хочется примерно одинаково.";case"keep_in_year":return"Вы хотите сохранить похожую часть ваших отношений. Похоже, именно она для вас обоих особенно ценна.";case"want_more":return"Вы оба чувствуете примерно одно и то же направление, которого хотелось бы добавить вашим отношениям.";case"one_thing_to_know":return"В самом личном вопросе теста вы выбрали очень похожую мысль. Иногда важные вещи уже понятны обоим — даже если редко произносятся вслух.";default:return`Здесь вы выбрали очень похожие ответы: \xab${a.labelA}\xbb.`}}(a[0]??b[0]),differenceInsight:function(a){if(!a)return"Яркого расхождения здесь не нашлось — ваши ответы чаще совпадают или оказываются близкими по смыслу.";switch(a.questionId){case"everything_fine":return`Когда что-то не так, ваши первые реакции отличаются: один выбрал \xab${a.labelA}\xbb, другой — \xab${a.labelB}\xbb. Оба варианта могут быть заботой, просто выглядят они по-разному.`;case"conflict_finished":return`Момент \xabвсё, мы помирились\xbb вы чувствуете по-разному: \xab${a.labelA}\xbb и \xab${a.labelB}\xbb. Возможно, иногда один уже отпустил ситуацию, пока другому ещё чего-то не хватает.`;case"hard_day":return`После тяжёлого дня вам нужны разные вещи: \xab${a.labelA}\xbb и \xab${a.labelB}\xbb. Это полезно знать заранее, а не угадывать в моменте.`;case"weekend_plan":return`На внезапную инициативу партнёра вы реагируете немного по-разному: \xab${a.labelA}\xbb и \xab${a.labelB}\xbb. Здесь может отличаться отношение к спонтанности и личному пространству.`;case"free_saturday":return`Идеальная свободная суббота у вас выглядит не совсем одинаково: \xab${a.labelA}\xbb и \xab${a.labelB}\xbb. Возможно, вам просто нужен разный баланс между \xabвместе\xbb и \xabкаждый своим\xbb.`;case"want_more":return`Сейчас вам немного не хватает разных вещей: \xab${a.labelA}\xbb и \xab${a.labelB}\xbb. Это не обязательно противоречие — скорее две разные подсказки о том, куда можно добавить внимания.`;case"unexpected_money":return`Даже воображаемый денежный бонус вы бы направили по-разному: \xab${a.labelA}\xbb и \xab${a.labelB}\xbb. Здесь интересно не кто прав, а что каждый считает ценным для \xabнас\xbb.`;case"one_thing_to_know":return`Если оставить партнёру только одну мысль, вы выбрали разное: \xab${a.labelA}\xbb и \xab${a.labelB}\xbb. Возможно, именно эти две фразы особенно стоит услышать друг от друга.`;default:return`Здесь ваши ответы разошлись: \xab${a.labelA}\xbb и \xab${a.labelB}\xbb. За разными вариантами могут стоять разные способы чувствовать одну и ту же ситуацию.`}}(g(c)),superpower:h(d=t.flatMap(a=>a.sharedTraits),["humor","playfulness","support_humor","conflict_humor_repair"])?"У вас работает лёгкость. Юмор и свои маленькие приколы могут быть способом быстро снова почувствовать себя одной командой.":h(d,["communication","emotional_sharing","support_listening","conflict_verbal_resolution"])?"Разговор — один из ваших сильных инструментов. Вам проще возвращаться друг к другу, когда происходящее можно назвать словами.":h(d,["care_practical","attention","initiative","support_action"])?"Вы умеете замечать заботу в небольших действиях. В вашей паре многое может говорить «я о тебе помню» без больших жестов.":h(d,["home_comfort","quiet_closeness","ritual","stability"])?"Вам хорошо удаётся обычная близость. Не каждому нужны события каждую минуту — иногда ваша сила именно в спокойном «мы рядом».":h(d,["independence","space_high","space_balanced","autonomy"])?"Вы умеете оставлять друг другу воздух. Возможность быть собой отдельно не обязательно мешает вашему ощущению «мы».":"У вас есть несколько мест, где разные ответы всё равно приводят к похожей потребности — быть замеченными и понятыми друг другом.",eveningQuestion:function(a){if(!a)return"Какая маленькая вещь в наших отношениях делает тебя счастливее, чем я, возможно, думаю?";switch(a.questionId){case"everything_fine":return"Как мне понять, когда тебя лучше разговорить, а когда просто дать тебе немного пространства?";case"conflict_finished":return"Что должно произойти после ссоры, чтобы ты действительно почувствовал(а): между нами снова всё хорошо?";case"hard_day":return"После какого дня тебе особенно важно, чтобы я был(а) рядом — и как именно?";case"weekend_plan":return"Какие сюрпризы от меня тебя радуют, а в каких ситуациях тебе важнее, чтобы мы сначала договорились?";case"free_saturday":return"Как выглядит идеальный выходной, после которого ты думаешь: «вот этого мне и не хватало»?";case"want_more":return"Если бы в ближайший месяц мы могли добавить в наши отношения только одну вещь — что бы ты выбрал(а)?";case"unexpected_money":return"На какую общую вещь или впечатление тебе было бы совсем не жалко потратить деньги?";case"one_thing_to_know":return"Есть ли что-то важное про нас, что ты чувствуешь часто, но редко говоришь вслух?";default:return"В чём мы, по-твоему, совсем разные — и почему тебе это во мне всё равно нравится?"}}(g(c))}},[t]),w=t.filter(a=>"same"===a.similarity).length,x=t.filter(a=>"close"===a.similarity).length,y=t.filter(a=>"different"===a.similarity).length,z=t.length,A=z>0?Math.round((w+.5*x)/z*100):0;if(r)return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("main",{className:"state-page",children:(0,b.jsxs)("div",{className:"state-shell",children:[(0,b.jsx)("div",{className:"brand",children:"между нами"}),(0,b.jsx)("h1",{children:"Что-то пошло не так."}),(0,b.jsx)("p",{children:r})]})}),(0,b.jsx)(c.default,{id:m.__hash,children:m})]});if(!p)return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("main",{className:"loading-page",children:[(0,b.jsxs)("div",{className:"loading-circles",children:[(0,b.jsx)("span",{}),(0,b.jsx)("span",{}),(0,b.jsx)("b",{children:"✦"})]}),(0,b.jsx)("div",{className:"loading-brand",children:"между нами"}),(0,b.jsx)("p",{children:"сравниваем ваши ответы..."})]}),(0,b.jsx)(c.default,{id:m.__hash,children:m})]});let B=p.couple.partner_a_name,C=p.couple.partner_b_name;return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("main",{className:"page",children:[(0,b.jsxs)("section",{className:"hero",children:[(0,b.jsx)("div",{className:"hero-decoration star-one",children:"✦"}),(0,b.jsx)("div",{className:"hero-decoration star-two",children:"+"}),(0,b.jsxs)("div",{className:"shell",children:[(0,b.jsxs)("header",{className:"topbar",children:[(0,b.jsx)("div",{className:"brand",children:"между нами"}),(0,b.jsx)("div",{className:"result-pill",children:"результат для двоих"})]}),(0,b.jsxs)("div",{className:"hero-content",children:[(0,b.jsxs)("div",{className:"names",children:[B,(0,b.jsx)("span",{children:"+"}),C]}),(0,b.jsxs)("div",{className:"hero-result",children:[(0,b.jsxs)("div",{className:"score-column",children:[(0,b.jsxs)("div",{className:"score",children:[A,(0,b.jsx)("span",{children:"%"})]}),(0,b.jsx)("div",{className:"score-label",children:"НА ОДНОЙ ВОЛНЕ"}),(0,b.jsx)("p",{className:"score-description",children:"Похожесть ваших ответов на ситуации из теста"})]}),(0,b.jsx)("div",{className:"hero-art-column",children:(0,b.jsx)(i,{emojiA:u.emojiA,emojiB:u.emojiB,archetypeId:u.id})}),(0,b.jsxs)("div",{className:"type-column",children:[(0,b.jsx)("div",{className:"type-label",children:"ВАШ ТИП ПАРЫ"}),(0,b.jsx)("h1",{children:u.title}),(0,b.jsx)("p",{children:u.description})]})]}),(0,b.jsxs)("div",{className:"answer-summary",children:[(0,b.jsx)(j,{value:w,label:"совпали"}),(0,b.jsx)("div",{className:"summary-line"}),(0,b.jsx)(j,{value:x,label:"близко"}),(0,b.jsx)("div",{className:"summary-line"}),(0,b.jsx)(j,{value:y,label:"по-разному"})]})]})]}),(0,b.jsx)("div",{className:"hero-bottom"})]}),(0,b.jsx)("section",{className:"insights-section",children:(0,b.jsxs)("div",{className:"shell",children:[(0,b.jsxs)("div",{className:"section-heading",children:[(0,b.jsx)("div",{className:"eyebrow",children:"ЧТО МЫ ЗАМЕТИЛИ"}),(0,b.jsx)("h2",{children:"Три вещи про вас."})]}),(0,b.jsxs)("div",{className:"insight-grid",children:[(0,b.jsx)(k,{symbol:"♥",title:"Вы совпали",text:v.sameInsight}),(0,b.jsx)(k,{symbol:"↔",title:"А вот тут интересно",text:v.differenceInsight}),(0,b.jsx)(k,{symbol:"✦",title:"Ваша суперсила",text:v.superpower})]})]})}),(0,b.jsxs)("section",{className:"question-section",children:[(0,b.jsx)("div",{className:"question-star question-star-one",children:"✦"}),(0,b.jsx)("div",{className:"question-star question-star-two",children:"✦"}),(0,b.jsxs)("div",{className:"question-shell",children:[(0,b.jsxs)("div",{className:"question-visual",children:[(0,b.jsx)("div",{className:"moon",children:"☾"}),(0,b.jsxs)("div",{className:"tiny-couple",children:[(0,b.jsx)("div",{className:"tiny-person",children:u.emojiA}),(0,b.jsx)("span",{children:"♥"}),(0,b.jsx)("div",{className:"tiny-person second",children:u.emojiB})]})]}),(0,b.jsxs)("div",{className:"question-copy",children:[(0,b.jsx)("div",{className:"question-label",children:"ВОПРОС ВАМ НА ВЕЧЕР"}),(0,b.jsxs)("h2",{children:["“",v.eveningQuestion,"”"]}),(0,b.jsx)("p",{children:"Без правильного ответа. Просто поговорите."})]})]})]}),(0,b.jsx)("section",{className:"paywall-section",children:(0,b.jsxs)("div",{className:"paywall-shell",children:[(0,b.jsxs)("div",{className:"paywall-copy",children:[(0,b.jsx)("div",{className:"eyebrow",children:"ХОТИТЕ КОПНУТЬ ГЛУБЖЕ?"}),(0,b.jsx)("h2",{children:"Между ответами осталось ещё кое-что."}),(0,b.jsx)("p",{children:"В полном разборе покажем паттерны, которые сложно увидеть по одному ответу."})]}),(0,b.jsxs)("div",{className:"paywall-card",children:[(0,b.jsxs)("div",{className:"paywall-list",children:[(0,b.jsx)(l,{children:"Чего каждому немного не хватает"}),(0,b.jsx)(l,{children:"Как вы по-разному воспринимаете заботу"}),(0,b.jsx)(l,{children:"Что один может не замечать о другом"}),(0,b.jsx)(l,{children:"Что каждый хочет сохранить"})]}),(0,b.jsxs)("button",{type:"button",onClick:()=>n.push(`/report/${o}`),children:[(0,b.jsx)("span",{children:"Полный разбор"}),(0,b.jsx)("strong",{children:"299 ₽"})]}),(0,b.jsx)("div",{className:"paywall-note",children:"один разбор · для вас двоих"})]})]})})]}),(0,b.jsx)(c.default,{id:m.__hash,children:m})]})}],66248)}];

//# sourceMappingURL=app_result_%5BcoupleId%5D_page_tsx_1boadhs._.js.map