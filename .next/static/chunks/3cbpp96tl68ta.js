(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,95801,e=>{"use strict";var t=e.i(43476),i=e.i(37902),s=e.i(71645),r=e.i(18566);let n=[{id:"knight_princess",title:"Рыцарь и принцесса",emojiA:"⚔️",emojiB:"👑",description:"У вас много заботы в мелочах. Для этой пары любовь чаще видна не в громких словах, а в ощущении: «я рядом и помню о тебе».",traits:["care_practical","attention","warmth","initiative","support_action","physical_closeness","support_physical"]},{id:"astronauts",title:"Два космонавта",emojiA:"🚀",emojiB:"🪐",description:"У каждого может быть своя орбита, но вам важно знать, что маршрут всё равно общий. Близость для вас не обязательно означает быть вместе каждую минуту.",traits:["independence","personal_space_high","space_high","space_balanced","autonomy","value_independence","planning","need_future_alignment"]},{id:"wizards",title:"Два волшебника",emojiA:"🔮",emojiB:"✨",description:"Ваш главный инструмент — разговор. Вам важно не просто быть рядом, а понимать, что происходит внутри другого человека.",traits:["communication","emotional_sharing","support_listening","conflict_verbal_resolution","need_communication","need_deep_communication","value_communication","listening"]},{id:"pirates",title:"Два пирата",emojiA:"🏴‍☠️",emojiB:"🗺️",description:"Вашей паре особенно идёт ощущение приключения. Планы хороши, но иногда лучший план — придумать всё по дороге.",traits:["spontaneity","shared_experience","activity","need_spontaneity","need_novelty","flexibility","money_experience","money_present"]},{id:"sun_moon",title:"Солнце и Луна",emojiA:"☀️",emojiB:"🌙",description:"Вы не обязаны одинаково реагировать на всё. В вашей паре особенно заметно, как разные способы чувствовать и действовать могут существовать рядом.",traits:["support_proactive","support_space","space_high","closeness_high","independence","direct_communication","quiet_closeness","emotional_sharing"]},{id:"dragon_keeper",title:"Дракон и хранитель",emojiA:"🐉",emojiB:"🛡️",description:"В вашей динамике есть энергия и спокойствие. Один момент может проживаться ярко, другой — через паузу, действие или присутствие рядом.",traits:["emotion_intensity","self_regulation","support_available","support_presence","conflict_time_repair","indirect_repair","repair_delayed"]},{id:"players",title:"Два игрока",emojiA:"🎮",emojiB:"👾",description:"У вас есть важная суперсила — лёгкость. Юмор, свои приколы и ощущение команды помогают вам снова находить друг друга.",traits:["humor","playfulness","support_humor","conflict_humor_repair","micro_connection","value_playfulness","need_lightness","message_team"]},{id:"homekeepers",title:"Хранители дома",emojiA:"🕯️",emojiB:"🏡",description:"Сила вашей пары прячется в обычной жизни: знакомых ритуалах, спокойных вечерах и ощущении места, куда хочется возвращаться.",traits:["home_comfort","quiet_closeness","ritual","stability","value_ritual","need_stability","shared_life","message_everyday_love"]}];function a(e){for(let t of["everything_fine","hard_day","conflict_finished","one_thing_to_know","want_more","weekend_plan","free_saturday","unexpected_money"]){let i=e.find(e=>e.questionId===t);if(i)return i}return e[0]}function o(e,t){return t.some(t=>e.includes(t))}function l({archetypeId:e}){return(0,t.jsxs)("div",{className:"pixel-scene",children:[(0,t.jsxs)("div",{className:"space-bg",children:[(0,t.jsx)("span",{className:"pixel-star ps-1"}),(0,t.jsx)("span",{className:"pixel-star ps-2"}),(0,t.jsx)("span",{className:"pixel-star ps-3"}),(0,t.jsx)("span",{className:"pixel-star ps-4"}),(0,t.jsx)("span",{className:"pixel-star ps-5"}),(0,t.jsx)("span",{className:"big-pixel-star",children:"✦"}),(0,t.jsx)("div",{className:"pixel-planet",children:(0,t.jsx)("span",{className:"planet-ring"})})]}),(0,t.jsxs)("div",{className:"asteroid",children:[(0,t.jsx)("span",{className:"crater crater-a"}),(0,t.jsx)("span",{className:"crater crater-b"}),(0,t.jsx)("span",{className:"crater crater-c"})]}),(0,t.jsxs)("div",{className:"astronaut astro-a",children:[(0,t.jsx)("div",{className:"helmet",children:(0,t.jsx)("span",{})}),(0,t.jsx)("div",{className:"astro-body",children:(0,t.jsx)("span",{className:"panel"})}),(0,t.jsx)("div",{className:"leg leg-left"}),(0,t.jsx)("div",{className:"leg leg-right"}),(0,t.jsx)("div",{className:"astro-arm arm-cup",children:(0,t.jsx)("span",{className:"cup"})})]}),(0,t.jsxs)("div",{className:"astronaut astro-b",children:[(0,t.jsx)("div",{className:"helmet",children:(0,t.jsx)("span",{})}),(0,t.jsx)("div",{className:"astro-body",children:(0,t.jsx)("span",{className:"panel"})}),(0,t.jsx)("div",{className:"leg leg-left"}),(0,t.jsx)("div",{className:"leg leg-right"}),(0,t.jsx)("div",{className:"astro-arm arm-reach"})]}),(0,t.jsx)("div",{className:"pixel-heart",children:"♥"}),(0,t.jsx)("div",{className:"scene-caption",children:function(e){switch(e){case"astronauts":return"на одной орбите";case"knight_princess":return"забота в деталях";case"wizards":return"магия разговора";case"pirates":return"куда-нибудь вместе";case"sun_moon":return"разные · рядом";case"dragon_keeper":return"огонь + спокойствие";case"players":return"одна команда";case"homekeepers":return"своё место";default:return"между вами"}}(e)})]})}function p({number:e,kicker:i,title:s,symbol:r,text:n,variant:a,offset:o=!1}){return(0,t.jsxs)("article",{className:`insight-card ${a} ${o?"offset":""}`,children:[(0,t.jsx)("div",{className:"insight-number",children:e}),(0,t.jsx)("div",{className:"insight-symbol",children:r}),(0,t.jsx)("div",{className:"insight-kicker",children:i}),(0,t.jsx)("h3",{children:s}),(0,t.jsx)("p",{children:n})]})}function c({children:e}){return(0,t.jsxs)("div",{className:"pay-item",children:[(0,t.jsx)("span",{children:"✦"}),(0,t.jsx)("div",{children:e})]})}let d=`

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;

    background: #F6F0EA;

    color: #211D20;

    font-family:
      Arial,
      Helvetica,
      sans-serif;
  }

  button {
    font: inherit;
  }

  .page {
    min-height: 100svh;

    overflow: hidden;

    background: #F6F0EA;
  }

  .shell {
    width:
      min(
        calc(100% - 48px),
        1160px
      );

    margin: 0 auto;
  }

  .brand {
    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size: 25px;
    font-weight: 700;

    letter-spacing:
      -0.05em;
  }

  /* ============================================================
     HERO
  ============================================================ */

  .hero {
    position: relative;

    min-height: 720px;

    overflow: hidden;

    background: #F6F0EA;
  }

  .topbar {
    height: 76px;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .top-note {
    display: flex;
    align-items: center;

    gap: 9px;

    color: #8F7E84;

    font-size: 9px;
    font-weight: 800;

    letter-spacing: 0.25em;
  }

  .top-note span {
    color: #B8446D;

    font-size: 14px;
  }

  .hero-names {
    position: relative;

    z-index: 4;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 18px;

    margin-top: 6px;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        56px,
        7.5vw,
        100px
      );

    font-weight: 500;

    line-height: 0.9;

    letter-spacing:
      -0.07em;
  }

  .hero-names b {
    color: #B7466E;

    font-family:
      Arial,
      sans-serif;

    font-size: 0.62em;
    font-weight: 300;
  }

  .hero-stage {
    position: relative;

    display: grid;

    grid-template-columns:
      0.72fr
      1.55fr
      0.9fr;

    align-items: center;

    gap: 14px;

    margin-top: 2px;
  }

  /* SCORE */

  .score-block {
    position: relative;

    z-index: 4;

    transform:
      translateY(-6px)
      rotate(-1.5deg);
  }

  .score-number {
    color: #B5446D;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        82px,
        9vw,
        126px
      );

    line-height: 0.8;

    letter-spacing:
      -0.09em;
  }

  .score-number sup {
    position: relative;

    top: -0.55em;

    margin-left: 5px;

    font-size: 0.34em;

    letter-spacing: -0.04em;
  }

  .score-title {
    margin-top: 14px;

    color: #B5446D;

    font-size: 10px;
    font-weight: 900;

    letter-spacing: 0.21em;
  }

  .score-line {
    position: relative;

    width: 190px;
    height: 4px;

    margin-top: 17px;

    background: #D9CED1;
  }

  .score-line-fill {
    position: absolute;

    top: 0;
    left: 0;

    height: 100%;

    background: #B5446D;
  }

  .score-line > span {
    position: absolute;

    top: 50%;

    width: 13px;
    height: 13px;

    transform:
      translate(
        -50%,
        -50%
      );

    border:
      3px solid #F6F0EA;

    border-radius: 50%;

    background: #B5446D;

    box-shadow:
      0 0 0 1px
      #B5446D;
  }

  .score-block p {
    max-width: 230px;

    margin:
      15px
      0
      0;

    color: #655B60;

    font-family:
      Georgia,
      serif;

    font-size: 14px;
    font-style: italic;

    line-height: 1.4;
  }

  /* ============================================================
     ART
  ============================================================ */

  .art-wrap {
    position: relative;

    z-index: 2;

    width: 100%;

    transform:
      translateY(5px);
  }

  .pixel-scene {
    position: relative;

    width: 100%;
    max-width: 510px;

    aspect-ratio:
      1.18 / 1;

    margin: 0 auto;

    overflow: hidden;

    border:
      4px solid #28222B;

    background: #393344;

    box-shadow:
      10px 12px 0 #D7C2CD;

    image-rendering:
      pixelated;
  }

  .space-bg {
    position: absolute;

    inset: 0;

    background:
      linear-gradient(
        180deg,
        #393344 0%,
        #4B4055 100%
      );
  }

  .pixel-star {
    position: absolute;

    width: 6px;
    height: 6px;

    background: #F6C48C;

    box-shadow:
      6px 0 0 #F6C48C,
      -6px 0 0 #F6C48C,
      0 6px 0 #F6C48C,
      0 -6px 0 #F6C48C;
  }

  .ps-1 {
    top: 18%;
    left: 12%;
  }

  .ps-2 {
    top: 27%;
    right: 17%;

    transform:
      scale(0.6);
  }

  .ps-3 {
    top: 47%;
    left: 7%;

    transform:
      scale(0.55);
  }

  .ps-4 {
    top: 14%;
    left: 55%;

    transform:
      scale(0.45);
  }

  .ps-5 {
    top: 39%;
    right: 8%;

    transform:
      scale(0.45);
  }

  .big-pixel-star {
    position: absolute;

    top: 12%;
    right: 32%;

    color: #C6587C;

    font-size: 30px;
  }

  .pixel-planet {
    position: absolute;

    top: 12%;
    right: 10%;

    width: 67px;
    height: 67px;

    border:
      4px solid #28222B;

    border-radius: 50%;

    background: #9284AE;
  }

  .planet-ring {
    position: absolute;

    top: 26px;
    left: -14px;

    width: 90px;
    height: 16px;

    border:
      4px solid #E2B37E;

    border-radius: 50%;

    transform:
      rotate(-13deg);
  }

  .asteroid {
    position: absolute;

    left: 8%;
    right: 8%;
    bottom: -11%;

    height: 42%;

    border:
      4px solid #28222B;

    border-radius:
      48% 52% 0 0;

    background: #81718F;
  }

  .crater {
    position: absolute;

    border:
      4px solid #4B4155;

    border-radius: 50%;

    background: #62566F;
  }

  .crater-a {
    top: 25%;
    left: 15%;

    width: 44px;
    height: 29px;
  }

  .crater-b {
    top: 14%;
    right: 20%;

    width: 33px;
    height: 24px;
  }

  .crater-c {
    top: 55%;
    left: 49%;

    width: 55px;
    height: 36px;
  }

  /* ASTRONAUTS */

  .astronaut {
    position: absolute;

    z-index: 5;

    width: 115px;
    height: 165px;
  }

  .astro-a {
    left: 22%;
    bottom: 24%;

    transform:
      rotate(3deg);
  }

  .astro-b {
    right: 19%;
    bottom: 20%;

    transform:
      rotate(-3deg);
  }

  .helmet {
    position: absolute;

    z-index: 4;

    top: 0;
    left: 50%;

    width: 77px;
    height: 72px;

    transform:
      translateX(-50%);

    border:
      4px solid #28222B;

    border-radius:
      46% 46% 43% 43%;

    background: #F4E9E1;
  }

  .helmet span {
    position: absolute;

    top: 13px;
    left: 13px;

    width: 45px;
    height: 35px;

    border:
      4px solid #28222B;

    border-radius:
      46%;

    background: #5B526B;

    box-shadow:
      inset
      8px 6px 0
      #8D7895;
  }

  .astro-body {
    position: absolute;

    z-index: 3;

    top: 61px;
    left: 50%;

    width: 82px;
    height: 78px;

    transform:
      translateX(-50%);

    border:
      4px solid #28222B;

    border-radius:
      15px 15px 25px 25px;

    background: #F4E9E1;
  }

  .panel {
    position: absolute;

    top: 20px;
    left: 23px;

    width: 32px;
    height: 22px;

    border:
      3px solid #28222B;

    background: #D68494;

    box-shadow:
      inset
      7px 0 0
      #E6B066;
  }

  .leg {
    position: absolute;

    z-index: 2;

    bottom: 0;

    width: 36px;
    height: 54px;

    border:
      4px solid #28222B;

    border-radius:
      10px 10px 17px 17px;

    background: #F4E9E1;
  }

  .leg-left {
    left: 20px;

    transform:
      rotate(8deg);
  }

  .leg-right {
    right: 20px;

    transform:
      rotate(-8deg);
  }

  .astro-arm {
    position: absolute;

    z-index: 6;

    top: 79px;

    width: 63px;
    height: 25px;

    border:
      4px solid #28222B;

    border-radius: 10px;

    background: #F4E9E1;
  }

  .arm-cup {
    right: -25px;

    transform:
      rotate(-7deg);
  }

  .arm-reach {
    left: -25px;

    transform:
      rotate(7deg);
  }

  .cup {
    position: absolute;

    top: -15px;
    right: -10px;

    width: 18px;
    height: 23px;

    border:
      3px solid #28222B;

    background: #E6B066;
  }

  .pixel-heart {
    position: absolute;

    z-index: 8;

    top: 39%;
    left: 50%;

    color: #D9567F;

    font-size: 28px;

    transform:
      translateX(-50%);
  }

  .scene-caption {
    position: absolute;

    z-index: 10;

    right: 13px;
    bottom: 12px;

    padding:
      7px 9px;

    border:
      2px solid #28222B;

    background: #F6F0EA;

    color: #28222B;

    font-size: 9px;
    font-weight: 900;

    letter-spacing: 0.08em;

    transform:
      rotate(-2deg);
  }

  .art-sticker {
    position: absolute;

    z-index: 10;

    left: -14px;
    bottom: -17px;

    padding:
      10px 15px;

    border:
      2px solid #28222B;

    background: #F6E4B7;

    box-shadow:
      4px 4px 0 #28222B;

    color: #28222B;

    font-size: 12px;
    font-weight: 900;

    transform:
      rotate(-2deg);
  }

  .art-sticker span {
    margin-right: 8px;

    font-size: 8px;

    letter-spacing: 0.16em;
  }

  /* ============================================================
     ARCHETYPE
  ============================================================ */

  .archetype-block {
    position: relative;

    z-index: 4;

    transform:
      translateY(30px);
  }

  .archetype-kicker {
    margin-bottom: 10px;

    color: #B5446D;

    font-size: 9px;
    font-weight: 900;

    letter-spacing: 0.19em;
  }

  .archetype-block h1 {
    margin: 0;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        43px,
        5vw,
        66px
      );

    font-weight: 500;

    line-height: 0.91;

    letter-spacing:
      -0.06em;
  }

  .archetype-block p {
    max-width: 280px;

    margin:
      19px
      0
      0;

    color: #655B60;

    font-size: 14px;
    line-height: 1.5;
  }

  /* ============================================================
     CHAOS STATS
  ============================================================ */

  .chaos-stats {
    position: relative;

    z-index: 10;

    width: 520px;
    height: 80px;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 48px;

    margin:
      -2px
      auto
      0;
  }

  .chaos-stat {
    display: flex;
    align-items: center;

    gap: 8px;
  }

  .chaos-stat strong {
    color: #B5446D;

    font-family:
      Georgia,
      serif;

    font-size: 34px;
    font-weight: 500;
  }

  .chaos-stat span {
    color: #5E5559;

    font-size: 10px;
    line-height: 1.25;
  }

  .stat-a {
    transform:
      rotate(-2deg);
  }

  .stat-b {
    transform:
      translateY(8px)
      rotate(1deg);
  }

  .stat-c {
    transform:
      translateY(-5px)
      rotate(-1deg);
  }

  .hero-star,
  .hero-plus {
    position: absolute;

    z-index: 1;
  }

  .hero-star-a {
    top: 155px;
    left: 4%;

    color: #D09D3C;

    font-size: 27px;
  }

  .hero-star-b {
    right: 5%;
    bottom: 80px;

    color: #B5446D;

    font-size: 19px;
  }

  .hero-plus {
    top: 250px;
    right: 3%;

    color: #8C7AA1;

    font-size: 28px;

    transform:
      rotate(13deg);
  }

  /* ============================================================
     INSIGHTS
  ============================================================ */

  .insights {
    padding:
      55px
      0
      100px;

    background: #FCFAF7;
  }

  .insights-intro {
    display: flex;
    align-items: flex-start;

    gap: 13px;

    margin-bottom: 35px;

    color: #B5446D;
  }

  .insights-intro span {
    font-size: 29px;
  }

  .insights-intro p {
    margin: 4px 0 0;

    font-size: 11px;
    font-weight: 900;

    line-height: 1.4;

    letter-spacing: 0.12em;

    text-transform: uppercase;

    transform:
      rotate(-3deg);
  }

  .insight-layout {
    display: grid;

    grid-template-columns:
      repeat(
        3,
        minmax(0, 1fr)
      );

    gap: 18px;

    align-items: start;
  }

  .insight-card {
    position: relative;

    min-height: 285px;

    padding:
      27px
      26px;

    border:
      2px solid #2B2529;

    background: #FFFFFF;

    box-shadow:
      7px 8px 0
      #D8CDD0;
  }

  .insight-card.offset {
    margin-top: 35px;

    transform:
      rotate(1deg);
  }

  .insight-card.pink {
    transform:
      rotate(-0.7deg);
  }

  .insight-card.yellow {
    transform:
      rotate(0.5deg);
  }

  .insight-number {
    color: #B5446D;

    font-family:
      Georgia,
      serif;

    font-size: 48px;

    line-height: 1;
  }

  .purple
  .insight-number {
    color: #82719C;
  }

  .yellow
  .insight-number {
    color: #C58C2E;
  }

  .insight-symbol {
    position: absolute;

    top: 24px;
    right: 24px;

    color: #B5446D;

    font-size: 29px;
  }

  .purple
  .insight-symbol {
    color: #82719C;
  }

  .yellow
  .insight-symbol {
    color: #C58C2E;
  }

  .insight-kicker {
    margin-top: 25px;

    color: #71666A;

    font-size: 9px;
    font-weight: 900;

    letter-spacing: 0.14em;
  }

  .insight-card h3 {
    margin:
      3px
      0
      17px;

    font-family:
      Georgia,
      serif;

    font-size: 30px;
    font-weight: 500;

    line-height: 1;

    letter-spacing:
      -0.04em;
  }

  .insight-card p {
    margin: 0;

    color: #62595D;

    font-size: 14px;
    line-height: 1.55;
  }

  /* ============================================================
     QUESTION
  ============================================================ */

  .question {
    position: relative;

    overflow: hidden;

    background: #332E3D;

    color: #FFFFFF;
  }

  .question-shell {
    width:
      min(
        calc(100% - 48px),
        1040px
      );

    min-height: 350px;

    display: grid;

    grid-template-columns:
      310px
      1fr;

    align-items: center;

    gap: 55px;

    margin: 0 auto;
  }

  .question-art {
    position: relative;

    height: 260px;
  }

  .pixel-moon {
    position: absolute;

    top: 15px;
    left: 40px;

    width: 180px;
    height: 180px;

    border:
      5px solid #201D25;

    border-radius: 50%;

    background: #F0D59A;

    box-shadow:
      12px 0 0 #D2A955;
  }

  .pixel-moon::after {
    content: '';

    position: absolute;

    top: -8px;
    right: -35px;

    width: 145px;
    height: 195px;

    border-radius: 50%;

    background: #332E3D;
  }

  .sitting-pair {
    position: absolute;

    z-index: 5;

    left: 65px;
    bottom: 12px;

    display: flex;

    gap: 7px;
  }

  .sitter {
    width: 54px;
    height: 76px;

    border:
      4px solid #201D25;

    border-radius:
      25px 25px 10px 10px;

    background: #B34D70;
  }

  .sitter-b {
    background: #88779E;
  }

  .question-kicker {
    color: #D886A2;

    font-size: 9px;
    font-weight: 900;

    letter-spacing: 0.21em;
  }

  .question-copy h2 {
    max-width: 660px;

    margin:
      14px
      0
      0;

    font-family:
      Georgia,
      serif;

    font-size:
      clamp(
        35px,
        4.2vw,
        51px
      );

    font-weight: 500;

    line-height: 1.08;

    letter-spacing:
      -0.035em;
  }

  .question-copy p {
    margin:
      20px
      0
      0;

    color: #BBB2BE;

    font-size: 12px;
  }

  .question-stars {
    position: absolute;

    top: 35px;
    right: 8%;

    color: #DDAA73;

    font-size: 18px;
  }

  /* ============================================================
     PAYWALL
  ============================================================ */

  .paywall {
    padding:
      75px
      0
      85px;

    background: #F0E5E8;
  }

  .paywall-layout {
    display: grid;

    grid-template-columns:
      1fr
      0.85fr;

    align-items: center;

    gap: 75px;
  }

  .paywall-copy {
    position: relative;
  }

  .paywall-note {
    position: absolute;

    top: -27px;
    left: -40px;

    color: #B5446D;

    font-family:
      Georgia,
      serif;

    font-size: 15px;
    font-style: italic;

    line-height: 1.15;

    transform:
      rotate(-7deg);
  }

  .paywall-note span {
    display: inline-block;

    margin-left: 7px;

    font-size: 25px;
  }

  .eyebrow {
    margin-left: 100px;

    color: #B5446D;

    font-size: 9px;
    font-weight: 900;

    letter-spacing: 0.2em;
  }

  .paywall-copy h2 {
    margin:
      13px
      0
      0;

    font-family:
      Georgia,
      serif;

    font-size:
      clamp(
        42px,
        5vw,
        62px
      );

    font-weight: 500;

    line-height: 0.96;

    letter-spacing:
      -0.05em;
  }

  .paywall-action {
    padding:
      24px;

    border:
      2px solid #292329;

    background: #F8F3EF;

    box-shadow:
      8px 8px 0
      #CDB6BE;

    transform:
      rotate(0.5deg);
  }

  .paywall-items {
    display: grid;

    grid-template-columns:
      1fr
      1fr;

    gap:
      15px
      20px;
  }

  .pay-item {
    display: grid;

    grid-template-columns:
      17px
      1fr;

    gap: 7px;

    color: #61565A;

    font-size: 11px;
    line-height: 1.35;
  }

  .pay-item span {
    color: #B5446D;
  }

  .paywall-action button {
    width: 100%;

    display: grid;

    grid-template-columns:
      1fr
      auto
      auto;

    align-items: center;

    gap: 13px;

    margin-top: 23px;

    padding:
      16px
      17px;

    border:
      2px solid #292329;

    background: #B5446D;

    box-shadow:
      4px 4px 0
      #292329;

    color: #FFFFFF;

    cursor: pointer;

    font-size: 13px;
    font-weight: 800;

    text-align: left;
  }

  .paywall-action button:hover {
    transform:
      translate(
        2px,
        2px
      );

    box-shadow:
      2px 2px 0
      #292329;
  }

  .paywall-action button b {
    font-size: 15px;
  }

  .paywall-action button strong {
    font-size: 20px;
  }

  .paywall-small {
    margin-top: 11px;

    color: #9A8D91;

    font-size: 9px;

    text-align: center;
  }

  /* ============================================================
     LOADING / ERROR
  ============================================================ */

  .loading-page,
  .state-page {
    min-height: 100svh;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #F6F0EA;
  }

  .loading-page {
    flex-direction: column;
  }

  .loading-mark {
    position: relative;

    width: 100px;
    height: 65px;

    margin-bottom: 23px;
  }

  .loading-mark span {
    position: absolute;

    width: 65px;
    height: 65px;

    border:
      3px solid #28222B;

    border-radius: 50%;
  }

  .loading-mark span:first-child {
    left: 0;

    background: #D17B99;
  }

  .loading-mark span:nth-child(2) {
    right: 0;

    background: #9180A7;
  }

  .loading-mark b {
    position: absolute;

    z-index: 2;

    top: 50%;
    left: 50%;

    color: #F6F0EA;

    transform:
      translate(
        -50%,
        -50%
      );
  }

  .loading-page p {
    margin:
      10px
      0
      0;

    color: #8C7E83;

    font-size: 11px;
  }

  .state-box {
    width:
      min(
        calc(100% - 40px),
        650px
      );
  }

  .state-box h1 {
    margin:
      45px
      0
      10px;

    font-family:
      Georgia,
      serif;

    font-size: 70px;

    font-weight: 500;
  }

  .state-box p {
    color: #766A6F;
  }

  /* ============================================================
     TABLET
  ============================================================ */

  @media (
    max-width: 900px
  ) {

    .hero-stage {
      grid-template-columns:
        0.7fr
        1.3fr;

      margin-top: 25px;
    }

    .archetype-block {
      grid-column:
        1 / -1;

      max-width: 600px;

      margin:
        15px
        auto
        0;

      text-align: center;

      transform: none;
    }

    .archetype-block p {
      margin:
        15px
        auto
        0;
    }

    .chaos-stats {
      margin-top: 30px;
    }

    .insight-layout {
      grid-template-columns: 1fr;
    }

    .insight-card {
      min-height: auto;
    }

    .insight-card.offset {
      margin-top: 0;
    }

    .question-shell {
      grid-template-columns:
        230px
        1fr;

      gap: 30px;
    }

    .paywall-layout {
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
        calc(100% - 30px);
    }

    .hero {
      min-height: auto;

      padding-bottom: 45px;
    }

    .topbar {
      height: 64px;
    }

    .brand {
      font-size: 21px;
    }

    .top-note {
      display: none;
    }

    .hero-names {
      gap: 8px;

      margin-top: 9px;

      font-size:
        clamp(
          44px,
          14vw,
          60px
        );
    }

    .hero-stage {
      display: flex;
      flex-direction: column;

      gap: 0;

      margin-top: 22px;
    }

    .score-block {
      order: 1;

      width: 100%;

      display: grid;

      grid-template-columns:
        auto
        1fr;

      align-items: center;

      column-gap: 17px;

      transform: none;
    }

    .score-number {
      grid-row:
        1 / 4;

      font-size: 82px;
    }

    .score-title {
      margin-top: 0;
    }

    .score-line {
      width: 100%;
      max-width: 190px;

      margin-top: 10px;
    }

    .score-block p {
      margin-top: 9px;

      font-size: 12px;
    }

    .art-wrap {
      order: 2;

      margin-top: 27px;

      transform: none;
    }

    .pixel-scene {
      max-width: 390px;

      border-width: 3px;

      box-shadow:
        7px 8px 0
        #D7C2CD;
    }

    .astronaut {
      transform:
        scale(0.8);
    }

    .astro-a {
      left: 17%;
    }

    .astro-b {
      right: 14%;
    }

    .art-sticker {
      left: 5px;
      bottom: -16px;
    }

    .archetype-block {
      order: 3;

      margin-top: 43px;
    }

    .archetype-block h1 {
      font-size: 48px;
    }

    .archetype-block p {
      max-width: 330px;

      font-size: 13px;
    }

    .chaos-stats {
      width: 100%;
      height: auto;

      gap: 20px;

      margin-top: 32px;
    }

    .chaos-stat {
      gap: 5px;
    }

    .chaos-stat strong {
      font-size: 28px;
    }

    .chaos-stat span {
      font-size: 9px;
    }

    .insights {
      padding:
        47px
        0
        65px;
    }

    .insights-intro {
      margin-bottom: 25px;
    }

    .insight-layout {
      gap: 13px;
    }

    .insight-card,
    .insight-card.offset {
      padding: 22px;

      box-shadow:
        5px 5px 0
        #D8CDD0;
    }

    .insight-number {
      font-size: 40px;
    }

    .insight-kicker {
      margin-top: 18px;
    }

    .insight-card h3 {
      font-size: 28px;
    }

    .insight-card p {
      font-size: 13px;
    }

    .question-shell {
      width:
        calc(100% - 30px);

      min-height: auto;

      grid-template-columns: 1fr;

      gap: 10px;

      padding:
        40px
        0
        50px;
    }

    .question-art {
      height: 180px;
    }

    .pixel-moon {
      left: 50%;

      width: 140px;
      height: 140px;

      transform:
        translateX(-50%);
    }

    .pixel-moon::after {
      width: 110px;
      height: 155px;
    }

    .sitting-pair {
      left: 50%;

      transform:
        translateX(-50%);
    }

    .sitter {
      width: 44px;
      height: 62px;
    }

    .question-copy {
      text-align: center;
    }

    .question-copy h2 {
      margin:
        11px
        auto
        0;

      font-size: 31px;
    }

    .paywall {
      padding:
        58px
        0
        65px;
    }

    .paywall-layout {
      grid-template-columns: 1fr;

      gap: 30px;
    }

    .paywall-note {
      position: static;

      margin-bottom: 25px;

      transform:
        rotate(-4deg);
    }

    .eyebrow {
      margin-left: 0;
    }

    .paywall-copy h2 {
      font-size: 43px;
    }

    .paywall-action {
      padding: 20px;

      box-shadow:
        6px 6px 0
        #CDB6BE;
    }

    .paywall-items {
      grid-template-columns: 1fr;

      gap: 12px;
    }

  }

  @media (
    prefers-reduced-motion:
    reduce
  ) {

    * {
      scroll-behavior:
        auto !important;

      animation-duration:
        0.01ms !important;

      transition-duration:
        0.01ms !important;
    }

  }

`;e.s(["default",0,function(){var e;let h=(0,r.useParams)(),x=(0,r.useRouter)(),u=h.coupleId,[m,g]=(0,s.useState)(null),[f,b]=(0,s.useState)("");(0,s.useEffect)(()=>{!async function(){try{let e=await fetch(`/api/report?id=${encodeURIComponent(u)}`,{cache:"no-store"});if(!e.ok)throw Error("Не удалось загрузить результат");let t=await e.json();if(t.waiting)return void x.replace(`/waiting/${u}`);g(t)}catch(e){console.error(e),b("Не получилось загрузить результат.")}}()},[u,x]);let y=(0,s.useMemo)(()=>m?.comparisons??[],[m]),_=(0,s.useMemo)(()=>(function(e){let t=new Map;for(let e of n)t.set(e.id,0);for(let i of e){let e="same"===i.similarity?2:"close"===i.similarity?1.35:.65,s=[...i.traitsA,...i.traitsB];for(let i of n)for(let r of s)i.traits.includes(r)&&t.set(i.id,(t.get(i.id)??0)+e)}let i=e.filter(e=>"different"===e.similarity).length,s=e.filter(e=>"same"===e.similarity).length;e.length>0&&i>s&&t.set("sun_moon",(t.get("sun_moon")??0)+4);let r=n[0],a=t.get(r.id)??0;for(let e of n){let i=t.get(e.id)??0;i>a&&(r=e,a=i)}return{id:r.id,title:r.title,emojiA:r.emojiA,emojiB:r.emojiB,description:r.description}})(y),[y]),v=(0,s.useMemo)(()=>{let e,t,i,s;return e=y.filter(e=>"same"===e.similarity),t=y.filter(e=>"close"===e.similarity),i=y.filter(e=>"different"===e.similarity),{sameInsight:function(e){if(!e)return"Вы можете выбирать разные варианты, но в нескольких местах за ними всё равно стоит похожее отношение к близости.";switch(e.questionId){case"free_saturday":return"У вас довольно похожее представление о том, как выглядит хороший день вдвоём. Это одна из тех мелочей, которые делают совместную жизнь легче.";case"care_signal":return"Вы похоже считываете маленькие проявления заботы. То, что для одного выглядит вниманием, второй тоже с большой вероятностью замечает.";case"reunion":return"После времени врозь вы похожим способом возвращаете ощущение «мы снова вместе».";case"relationship_button":return"Если бы прямо сейчас можно было немного изменить ваши отношения, вы потянулись бы примерно к одной и той же кнопке.";case"everything_fine":return"У вас похожее представление о том, как быть рядом, когда другому непросто.";case"conflict_finished":return"Вы довольно похоже чувствуете момент, когда напряжение после ссоры действительно закончилось.";case"hard_day":return"После тяжёлого дня вам обоим помогает похожий тип поддержки. Это полезное совпадение.";case"normal_evening":return"Ваше представление об уютном обычном вечере оказалось очень близким.";case"extra_hour":return"Если появляется немного свободного времени только для вас двоих, потратить его хочется примерно одинаково.";case"keep_in_year":return"Вы хотите сохранить похожую часть ваших отношений. Похоже, именно она для вас обоих особенно ценна.";case"want_more":return"Вы оба чувствуете примерно одно и то же направление, которого хотелось бы добавить вашим отношениям.";case"one_thing_to_know":return"В самом личном вопросе теста вы выбрали очень похожую мысль. Иногда важные вещи уже понятны обоим — даже если редко произносятся вслух.";default:return`Здесь вы выбрали очень похожие ответы: \xab${e.labelA}\xbb.`}}(e[0]??t[0]),differenceInsight:function(e){if(!e)return"Яркого расхождения здесь не нашлось — ваши ответы чаще совпадают или оказываются близкими по смыслу.";switch(e.questionId){case"everything_fine":return`Когда что-то не так, ваши первые реакции отличаются: один выбрал \xab${e.labelA}\xbb, другой — \xab${e.labelB}\xbb. Оба варианта могут быть заботой, просто выглядят они по-разному.`;case"conflict_finished":return`Момент \xabвсё, мы помирились\xbb вы чувствуете по-разному: \xab${e.labelA}\xbb и \xab${e.labelB}\xbb. Возможно, иногда один уже отпустил ситуацию, пока другому ещё чего-то не хватает.`;case"hard_day":return`После тяжёлого дня вам нужны разные вещи: \xab${e.labelA}\xbb и \xab${e.labelB}\xbb. Это полезно знать заранее, а не угадывать в моменте.`;case"weekend_plan":return`На внезапную инициативу партнёра вы реагируете немного по-разному: \xab${e.labelA}\xbb и \xab${e.labelB}\xbb. Здесь может отличаться отношение к спонтанности и личному пространству.`;case"free_saturday":return`Идеальная свободная суббота у вас выглядит не совсем одинаково: \xab${e.labelA}\xbb и \xab${e.labelB}\xbb. Возможно, вам просто нужен разный баланс между \xabвместе\xbb и \xabкаждый своим\xbb.`;case"want_more":return`Сейчас вам немного не хватает разных вещей: \xab${e.labelA}\xbb и \xab${e.labelB}\xbb. Это не обязательно противоречие — скорее две разные подсказки о том, куда можно добавить внимания.`;case"unexpected_money":return`Даже воображаемый денежный бонус вы бы направили по-разному: \xab${e.labelA}\xbb и \xab${e.labelB}\xbb. Здесь интересно не кто прав, а что каждый считает ценным для \xabнас\xbb.`;case"one_thing_to_know":return`Если оставить партнёру только одну мысль, вы выбрали разное: \xab${e.labelA}\xbb и \xab${e.labelB}\xbb. Возможно, именно эти две фразы особенно стоит услышать друг от друга.`;default:return`Здесь ваши ответы разошлись: \xab${e.labelA}\xbb и \xab${e.labelB}\xbb. За разными вариантами могут стоять разные способы чувствовать одну и ту же ситуацию.`}}(a(i)),superpower:o(s=y.flatMap(e=>e.sharedTraits),["humor","playfulness","support_humor","conflict_humor_repair"])?"У вас работает лёгкость. Юмор и свои маленькие приколы могут быть способом быстро снова почувствовать себя одной командой.":o(s,["communication","emotional_sharing","support_listening","conflict_verbal_resolution"])?"Разговор — один из ваших сильных инструментов. Вам проще возвращаться друг к другу, когда происходящее можно назвать словами.":o(s,["care_practical","attention","initiative","support_action"])?"Вы умеете замечать заботу в небольших действиях. В вашей паре многое может говорить «я о тебе помню» без больших жестов.":o(s,["home_comfort","quiet_closeness","ritual","stability"])?"Вам хорошо удаётся обычная близость. Не каждому нужны события каждую минуту — иногда ваша сила именно в спокойном «мы рядом».":o(s,["independence","space_high","space_balanced","autonomy"])?"Вы умеете оставлять друг другу воздух. Возможность быть собой отдельно не обязательно мешает вашему ощущению «мы».":"У вас есть несколько мест, где разные ответы всё равно приводят к похожей потребности — быть замеченными и понятыми друг другом.",eveningQuestion:function(e){if(!e)return"Какая маленькая вещь в наших отношениях делает тебя счастливее, чем я, возможно, думаю?";switch(e.questionId){case"everything_fine":return"Как мне понять, когда тебя лучше разговорить, а когда просто дать тебе немного пространства?";case"conflict_finished":return"Что должно произойти после ссоры, чтобы ты действительно почувствовал(а): между нами снова всё хорошо?";case"hard_day":return"После какого дня тебе особенно важно, чтобы я был(а) рядом — и как именно?";case"weekend_plan":return"Какие сюрпризы от меня тебя радуют, а в каких ситуациях тебе важнее, чтобы мы сначала договорились?";case"free_saturday":return"Как выглядит идеальный выходной, после которого ты думаешь: «вот этого мне и не хватало»?";case"want_more":return"Если бы в ближайший месяц мы могли добавить в наши отношения только одну вещь — что бы ты выбрал(а)?";case"unexpected_money":return"На какую общую вещь или впечатление тебе было бы совсем не жалко потратить деньги?";case"one_thing_to_know":return"Есть ли что-то важное про нас, что ты чувствуешь часто, но редко говоришь вслух?";default:return"В чём мы, по-твоему, совсем разные — и почему тебе это во мне всё равно нравится?"}}(a(i))}},[y]),w=y.filter(e=>"same"===e.similarity).length,j=y.filter(e=>"close"===e.similarity).length,k=y.filter(e=>"different"===e.similarity).length,z=y.length,S=z>0?Math.round((w+.5*j)/z*100):0;if(f)return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("main",{className:"state-page",children:(0,t.jsxs)("div",{className:"state-box",children:[(0,t.jsx)("div",{className:"brand",children:"между нами"}),(0,t.jsx)("h1",{children:"Упс."}),(0,t.jsx)("p",{children:f})]})}),(0,t.jsx)(i.default,{id:d.__hash,children:d})]});if(!m)return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("main",{className:"loading-page",children:[(0,t.jsxs)("div",{className:"loading-mark",children:[(0,t.jsx)("span",{}),(0,t.jsx)("span",{}),(0,t.jsx)("b",{children:"♥"})]}),(0,t.jsx)("div",{className:"brand",children:"между нами"}),(0,t.jsx)("p",{children:"смотрим, что у вас там..."})]}),(0,t.jsx)(i.default,{id:d.__hash,children:d})]});let N=m.couple.partner_a_name,F=m.couple.partner_b_name,B=(e=S)>=86?"так. кто из вас подглядывал?":e>=71?"вы точно не списывали?":e>=51?"не телепатия, но уже подозрительно":e>=31?"два разных мира. и это уже интересно":"как вы вообще нашли друг друга?";return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("main",{className:"page",children:[(0,t.jsxs)("section",{className:"hero",children:[(0,t.jsx)("div",{className:"hero-star hero-star-a",children:"✦"}),(0,t.jsx)("div",{className:"hero-star hero-star-b",children:"✦"}),(0,t.jsx)("div",{className:"hero-plus",children:"+"}),(0,t.jsxs)("div",{className:"shell",children:[(0,t.jsxs)("header",{className:"topbar",children:[(0,t.jsx)("div",{className:"brand",children:"между нами"}),(0,t.jsxs)("div",{className:"top-note",children:["РЕЗУЛЬТАТ ДЛЯ ДВОИХ",(0,t.jsx)("span",{children:"♥"})]})]}),(0,t.jsxs)("div",{className:"hero-names",children:[(0,t.jsx)("span",{children:N}),(0,t.jsx)("b",{children:"×"}),(0,t.jsx)("span",{children:F})]}),(0,t.jsxs)("div",{className:"hero-stage",children:[(0,t.jsxs)("div",{className:"score-block",children:[(0,t.jsxs)("div",{className:"score-number",children:[S,(0,t.jsx)("sup",{children:"%"})]}),(0,t.jsx)("div",{className:"score-title",children:"НА ОДНОЙ ВОЛНЕ"}),(0,t.jsxs)("div",{className:"score-line",children:[(0,t.jsx)("div",{style:{width:`${S}%`},className:"score-line-fill"}),(0,t.jsx)("span",{style:{left:`${S}%`}})]}),(0,t.jsxs)("p",{children:["«",B,"»"]})]}),(0,t.jsxs)("div",{className:"art-wrap",children:[(0,t.jsx)(l,{archetypeId:_.id}),(0,t.jsxs)("div",{className:"art-sticker",children:[(0,t.jsx)("span",{children:"ВАШ ТИП ПАРЫ"}),"№",{knight_princess:"01",wizards:"02",pirates:"03",astronauts:"04",sun_moon:"05",dragon_keeper:"06",players:"07",homekeepers:"08"}[_.id]??"00"]})]}),(0,t.jsxs)("div",{className:"archetype-block",children:[(0,t.jsx)("div",{className:"archetype-kicker",children:"ТАК. ЭТО ВЫ."}),(0,t.jsx)("h1",{children:_.title}),(0,t.jsx)("p",{children:_.description})]})]}),(0,t.jsxs)("div",{className:"chaos-stats",children:[(0,t.jsxs)("div",{className:"chaos-stat stat-a",children:[(0,t.jsx)("strong",{children:w}),(0,t.jsxs)("span",{children:["один",(0,t.jsx)("br",{}),"в один"]})]}),(0,t.jsxs)("div",{className:"chaos-stat stat-b",children:[(0,t.jsx)("strong",{children:j}),(0,t.jsxs)("span",{children:["ну",(0,t.jsx)("br",{}),"почти"]})]}),(0,t.jsxs)("div",{className:"chaos-stat stat-c",children:[(0,t.jsx)("strong",{children:k}),(0,t.jsxs)("span",{children:["тут начинается",(0,t.jsx)("br",{}),"сюжет"]})]})]})]})]}),(0,t.jsx)("section",{className:"insights",children:(0,t.jsxs)("div",{className:"shell",children:[(0,t.jsxs)("div",{className:"insights-intro",children:[(0,t.jsx)("span",{children:"↓"}),(0,t.jsxs)("p",{children:["ладно.",(0,t.jsx)("br",{}),"теперь интересное."]})]}),(0,t.jsxs)("div",{className:"insight-layout",children:[(0,t.jsx)(p,{number:"01",kicker:"ВЫ ВОТ ТУТ",title:"прям одинаковые",symbol:"♥",text:v.sameInsight,variant:"pink"}),(0,t.jsx)(p,{number:"02",kicker:"А ТУТ УЖЕ",title:"интереснее",symbol:"↯",text:v.differenceInsight,variant:"purple",offset:!0}),(0,t.jsx)(p,{number:"03",kicker:"А ЭТО ВООБЩЕ",title:"ваша суперсила",symbol:"✦",text:v.superpower,variant:"yellow"})]})]})}),(0,t.jsxs)("section",{className:"question",children:[(0,t.jsx)("div",{className:"question-stars",children:"✦　·　✦"}),(0,t.jsxs)("div",{className:"question-shell",children:[(0,t.jsxs)("div",{className:"question-art",children:[(0,t.jsx)("div",{className:"pixel-moon"}),(0,t.jsxs)("div",{className:"sitting-pair",children:[(0,t.jsx)("span",{className:"sitter sitter-a"}),(0,t.jsx)("span",{className:"sitter sitter-b"})]})]}),(0,t.jsxs)("div",{className:"question-copy",children:[(0,t.jsx)("div",{className:"question-kicker",children:"ВОПРОС ВАМ НА ВЕЧЕР"}),(0,t.jsxs)("h2",{children:["«",v.eveningQuestion,"»"]}),(0,t.jsx)("p",{children:"без правильного ответа. просто поговорите."})]})]})]}),(0,t.jsx)("section",{className:"paywall",children:(0,t.jsxs)("div",{className:"shell paywall-layout",children:[(0,t.jsxs)("div",{className:"paywall-copy",children:[(0,t.jsxs)("div",{className:"paywall-note",children:["ещё столько",(0,t.jsx)("br",{}),"интересного",(0,t.jsx)("span",{children:"↘"})]}),(0,t.jsx)("div",{className:"eyebrow",children:"ХОТИТЕ КОПНУТЬ ГЛУБЖЕ?"}),(0,t.jsxs)("h2",{children:["Между ответами",(0,t.jsx)("br",{}),"осталось кое-что."]})]}),(0,t.jsxs)("div",{className:"paywall-action",children:[(0,t.jsxs)("div",{className:"paywall-items",children:[(0,t.jsx)(c,{children:"чего каждому немного не хватает"}),(0,t.jsx)(c,{children:"как вы воспринимаете заботу"}),(0,t.jsx)(c,{children:"что можете не замечать друг о друге"}),(0,t.jsx)(c,{children:"что каждый хочет сохранить"})]}),(0,t.jsxs)("button",{type:"button",onClick:()=>x.push(`/report/${u}`),children:[(0,t.jsx)("span",{children:"Полный разбор"}),(0,t.jsx)("b",{children:"299 ₽"}),(0,t.jsx)("strong",{children:"→"})]}),(0,t.jsx)("div",{className:"paywall-small",children:"один разбор · для вас двоих"})]})]})})]}),(0,t.jsx)(i.default,{id:d.__hash,children:d})]})}],95801)},16015,(e,t,i)=>{},18566,(e,t,i)=>{t.exports=e.r(76562)},98547,(e,t,i)=>{var s=e.i(47167);e.r(16015);var r=e.r(71645),n=r&&"object"==typeof r&&"default"in r?r:{default:r},a=void 0!==s.default&&s.default.env&&!0,o=function(e){return"[object String]"===Object.prototype.toString.call(e)},l=function(){function e(e){var t=void 0===e?{}:e,i=t.name,s=void 0===i?"stylesheet":i,r=t.optimizeForSpeed,n=void 0===r?a:r;p(o(s),"`name` must be a string"),this._name=s,this._deletedRulePlaceholder="#"+s+"-deleted-rule____{}",p("boolean"==typeof n,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=n,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0;var l="u">typeof window&&document.querySelector('meta[property="csp-nonce"]');this._nonce=l?l.getAttribute("content"):null}var t,i=e.prototype;return i.setOptimizeForSpeed=function(e){p("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),p(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},i.isOptimizeForSpeed=function(){return this._optimizeForSpeed},i.inject=function(){var e=this;if(p(!this._injected,"sheet already injected"),this._injected=!0,"u">typeof window&&this._optimizeForSpeed){this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),this._optimizeForSpeed||(a||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0);return}this._serverSheet={cssRules:[],insertRule:function(t,i){return"number"==typeof i?e._serverSheet.cssRules[i]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),i},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},i.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},i.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},i.insertRule=function(e,t){if(p(o(e),"`insertRule` accepts only strings"),"u"<typeof window)return"number"!=typeof t&&(t=this._serverSheet.cssRules.length),this._serverSheet.insertRule(e,t),this._rulesCount++;if(this._optimizeForSpeed){var i=this.getSheet();"number"!=typeof t&&(t=i.cssRules.length);try{i.insertRule(e,t)}catch(t){return a||console.warn("StyleSheet: illegal rule: \n\n"+e+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var s=this._tags[t];this._tags.push(this.makeStyleTag(this._name,e,s))}return this._rulesCount++},i.replaceRule=function(e,t){if(this._optimizeForSpeed||"u"<typeof window){var i="u">typeof window?this.getSheet():this._serverSheet;if(t.trim()||(t=this._deletedRulePlaceholder),!i.cssRules[e])return e;i.deleteRule(e);try{i.insertRule(t,e)}catch(s){a||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),i.insertRule(this._deletedRulePlaceholder,e)}}else{var s=this._tags[e];p(s,"old rule at index `"+e+"` not found"),s.textContent=t}return e},i.deleteRule=function(e){if("u"<typeof window)return void this._serverSheet.deleteRule(e);if(this._optimizeForSpeed)this.replaceRule(e,"");else{var t=this._tags[e];p(t,"rule at index `"+e+"` not found"),t.parentNode.removeChild(t),this._tags[e]=null}},i.flush=function(){this._injected=!1,this._rulesCount=0,"u">typeof window?(this._tags.forEach(function(e){return e&&e.parentNode.removeChild(e)}),this._tags=[]):this._serverSheet.cssRules=[]},i.cssRules=function(){var e=this;return"u"<typeof window?this._serverSheet.cssRules:this._tags.reduce(function(t,i){return i?t=t.concat(Array.prototype.map.call(e.getSheetForTag(i).cssRules,function(t){return t.cssText===e._deletedRulePlaceholder?null:t})):t.push(null),t},[])},i.makeStyleTag=function(e,t,i){t&&p(o(t),"makeStyleTag accepts only strings as second parameter");var s=document.createElement("style");this._nonce&&s.setAttribute("nonce",this._nonce),s.type="text/css",s.setAttribute("data-"+e,""),t&&s.appendChild(document.createTextNode(t));var r=document.head||document.getElementsByTagName("head")[0];return i?r.insertBefore(s,i):r.appendChild(s),s},t=[{key:"length",get:function(){return this._rulesCount}}],function(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}(e.prototype,t),e}();function p(e,t){if(!e)throw Error("StyleSheet: "+t+".")}var c=function(e){for(var t=5381,i=e.length;i;)t=33*t^e.charCodeAt(--i);return t>>>0},d={};function h(e,t){if(!t)return"jsx-"+e;var i=String(t),s=e+i;return d[s]||(d[s]="jsx-"+c(e+"-"+i)),d[s]}function x(e,t){"u"<typeof window&&(t=t.replace(/\/style/gi,"\\/style"));var i=e+t;return d[i]||(d[i]=t.replace(/__jsx-style-dynamic-selector/g,e)),d[i]}var u=function(){function e(e){var t=void 0===e?{}:e,i=t.styleSheet,s=void 0===i?null:i,r=t.optimizeForSpeed,n=void 0!==r&&r;this._sheet=s||new l({name:"styled-jsx",optimizeForSpeed:n}),this._sheet.inject(),s&&"boolean"==typeof n&&(this._sheet.setOptimizeForSpeed(n),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var t=e.prototype;return t.add=function(e){var t=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(e.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),"u">typeof window&&!this._fromServer&&(this._fromServer=this.selectFromServer(),this._instancesCounts=Object.keys(this._fromServer).reduce(function(e,t){return e[t]=0,e},{}));var i=this.getIdAndRules(e),s=i.styleId,r=i.rules;if(s in this._instancesCounts){this._instancesCounts[s]+=1;return}var n=r.map(function(e){return t._sheet.insertRule(e)}).filter(function(e){return -1!==e});this._indices[s]=n,this._instancesCounts[s]=1},t.remove=function(e){var t=this,i=this.getIdAndRules(e).styleId;if(function(e,t){if(!e)throw Error("StyleSheetRegistry: "+t+".")}(i in this._instancesCounts,"styleId: `"+i+"` not found"),this._instancesCounts[i]-=1,this._instancesCounts[i]<1){var s=this._fromServer&&this._fromServer[i];s?(s.parentNode.removeChild(s),delete this._fromServer[i]):(this._indices[i].forEach(function(e){return t._sheet.deleteRule(e)}),delete this._indices[i]),delete this._instancesCounts[i]}},t.update=function(e,t){this.add(t),this.remove(e)},t.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},t.cssRules=function(){var e=this,t=this._fromServer?Object.keys(this._fromServer).map(function(t){return[t,e._fromServer[t]]}):[],i=this._sheet.cssRules();return t.concat(Object.keys(this._indices).map(function(t){return[t,e._indices[t].map(function(e){return i[e].cssText}).join(e._optimizeForSpeed?"":"\n")]}).filter(function(e){return!!e[1]}))},t.styles=function(e){var t,i;return t=this.cssRules(),void 0===(i=e)&&(i={}),t.map(function(e){var t=e[0],s=e[1];return n.default.createElement("style",{id:"__"+t,key:"__"+t,nonce:i.nonce?i.nonce:void 0,dangerouslySetInnerHTML:{__html:s}})})},t.getIdAndRules=function(e){var t=e.children,i=e.dynamic,s=e.id;if(i){var r=h(s,i);return{styleId:r,rules:Array.isArray(t)?t.map(function(e){return x(r,e)}):[x(r,t)]}}return{styleId:h(s),rules:Array.isArray(t)?t:[t]}},t.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e,t){return e[t.id.slice(2)]=t,e},{})},e}(),m=r.createContext(null);function g(){return new u}function f(){return r.useContext(m)}m.displayName="StyleSheetContext";var b=n.default.useInsertionEffect||n.default.useLayoutEffect,y="u">typeof window?g():void 0;function _(e){var t=y||f();return t&&("u"<typeof window?t.add(e):b(function(){return t.add(e),function(){t.remove(e)}},[e.id,String(e.dynamic)])),null}_.dynamic=function(e){return e.map(function(e){return h(e[0],e[1])}).join(" ")},i.StyleRegistry=function(e){var t=e.registry,i=e.children,s=r.useContext(m),a=r.useState(function(){return s||t||g()})[0];return n.default.createElement(m.Provider,{value:a},i)},i.createStyleRegistry=g,i.style=_,i.useStyleRegistry=f},37902,(e,t,i)=>{t.exports=e.r(98547).style}]);