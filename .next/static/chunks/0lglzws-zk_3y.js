(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,95801,e=>{"use strict";var t=e.i(43476),i=e.i(37902),s=e.i(71645),a=e.i(18566);let r=[{id:"knight_princess",title:"Рыцарь и принцесса",emojiA:"⚔️",emojiB:"👑",description:"У вас много заботы в мелочах. Для этой пары любовь чаще видна не в громких словах, а в ощущении: «я рядом и помню о тебе».",traits:["care_practical","attention","warmth","initiative","support_action","physical_closeness","support_physical"]},{id:"astronauts",title:"Два космонавта",emojiA:"🚀",emojiB:"🪐",description:"У каждого может быть своя орбита, но вам важно знать, что маршрут всё равно общий. Близость для вас не обязательно означает быть вместе каждую минуту.",traits:["independence","personal_space_high","space_high","space_balanced","autonomy","value_independence","planning","need_future_alignment"]},{id:"wizards",title:"Два волшебника",emojiA:"🔮",emojiB:"✨",description:"Ваш главный инструмент — разговор. Вам важно не просто быть рядом, а понимать, что происходит внутри другого человека.",traits:["communication","emotional_sharing","support_listening","conflict_verbal_resolution","need_communication","need_deep_communication","value_communication","listening"]},{id:"pirates",title:"Два пирата",emojiA:"🏴‍☠️",emojiB:"🗺️",description:"Вашей паре особенно идёт ощущение приключения. Планы хороши, но иногда лучший план — придумать всё по дороге.",traits:["spontaneity","shared_experience","activity","need_spontaneity","need_novelty","flexibility","money_experience","money_present"]},{id:"sun_moon",title:"Солнце и Луна",emojiA:"☀️",emojiB:"🌙",description:"Вы не обязаны одинаково реагировать на всё. В вашей паре особенно заметно, как разные способы чувствовать и действовать могут существовать рядом.",traits:["support_proactive","support_space","space_high","closeness_high","independence","direct_communication","quiet_closeness","emotional_sharing"]},{id:"dragon_keeper",title:"Дракон и хранитель",emojiA:"🐉",emojiB:"🛡️",description:"В вашей динамике есть энергия и спокойствие. Один момент может проживаться ярко, другой — через паузу, действие или присутствие рядом.",traits:["emotion_intensity","self_regulation","support_available","support_presence","conflict_time_repair","indirect_repair","repair_delayed"]},{id:"players",title:"Два игрока",emojiA:"🎮",emojiB:"👾",description:"У вас есть важная суперсила — лёгкость. Юмор, свои приколы и ощущение команды помогают вам снова находить друг друга.",traits:["humor","playfulness","support_humor","conflict_humor_repair","micro_connection","value_playfulness","need_lightness","message_team"]},{id:"homekeepers",title:"Хранители дома",emojiA:"🕯️",emojiB:"🏡",description:"Сила вашей пары прячется в обычной жизни: знакомых ритуалах, спокойных вечерах и ощущении места, куда хочется возвращаться.",traits:["home_comfort","quiet_closeness","ritual","stability","value_ritual","need_stability","shared_life","message_everyday_love"]}];function o({number:e,kind:i,label:s,value:a}){return(0,t.jsxs)("div",{className:"dimension-row",children:[(0,t.jsxs)("div",{className:"dimension-number",children:["0",e]}),(0,t.jsx)(l,{kind:i}),(0,t.jsxs)("div",{className:"dimension-main",children:[(0,t.jsxs)("div",{className:"dimension-head",children:[(0,t.jsx)("span",{children:s}),(0,t.jsxs)("strong",{children:[a,"%"]})]}),(0,t.jsx)(n,{value:a})]})]})}function n({value:e}){let i=Math.round(e/10);return(0,t.jsx)("div",{className:"segment-bar",children:Array.from({length:10}).map((e,s)=>(0,t.jsx)("span",{className:s<i?"active":""},s))})}function l({kind:e}){return"views"===e?(0,t.jsxs)("div",{className:"dimension-icon icon-eyes",children:[(0,t.jsx)("span",{}),(0,t.jsx)("span",{})]}):"care"===e?(0,t.jsx)("div",{className:"dimension-icon icon-care",children:(0,t.jsx)("span",{children:"♥"})}):"communication"===e?(0,t.jsxs)("div",{className:"dimension-icon icon-talk",children:[(0,t.jsx)("span",{}),(0,t.jsx)("span",{})]}):"rhythm"===e?(0,t.jsx)("div",{className:"dimension-icon icon-wave",children:(0,t.jsx)("svg",{viewBox:"0 0 64 40","aria-hidden":"true",children:(0,t.jsx)("path",{d:"M2 22 C10 4 17 4 24 22 C31 40 38 40 45 22 C52 4 58 4 62 17",fill:"none",stroke:"currentColor",strokeWidth:"4"})})}):(0,t.jsxs)("div",{className:"dimension-icon icon-space",children:[(0,t.jsx)("span",{}),(0,t.jsx)("span",{})]})}function p(e){return({knight_princess:"01",wizards:"02",pirates:"03",astronauts:"04",sun_moon:"05",dragon_keeper:"06",players:"07",homekeepers:"08"})[e]??"00"}function d({archetypeId:e}){let i=function(e){switch(e){case"sun_moon":return"theme-moon";case"pirates":return"theme-pirates";case"wizards":return"theme-wizards";case"dragon_keeper":return"theme-dragon";default:return"theme-space"}}(e);return(0,t.jsxs)("div",{className:`couple-art ${i}`,children:[(0,t.jsxs)("div",{className:"art-stars",children:[(0,t.jsx)("i",{className:"art-star star-a",children:"✦"}),(0,t.jsx)("i",{className:"art-star star-b",children:"✦"}),(0,t.jsx)("i",{className:"art-star star-c",children:"·"}),(0,t.jsx)("i",{className:"art-star star-d",children:"+"})]}),(0,t.jsx)("div",{className:"art-orbit orbit-a"}),(0,t.jsx)("div",{className:"art-orbit orbit-b"}),(0,t.jsxs)("div",{className:"art-sun",children:[(0,t.jsx)("span",{}),(0,t.jsx)("span",{}),(0,t.jsx)("span",{})]}),(0,t.jsxs)("div",{className:"art-ground",children:[(0,t.jsx)("span",{className:"ground-hole hole-a"}),(0,t.jsx)("span",{className:"ground-hole hole-b"}),(0,t.jsx)("span",{className:"ground-hole hole-c"})]}),(0,t.jsx)(c,{side:"left"}),(0,t.jsx)(c,{side:"right"}),(0,t.jsx)("div",{className:"art-heart",children:"♥"}),(0,t.jsx)("div",{className:"art-caption",children:function(e){switch(e){case"astronauts":return"две орбиты · один маршрут";case"knight_princess":return"своих не бросаем";case"wizards":return"понимаем магию по-разному";case"pirates":return"курс может меняться · команда нет";case"sun_moon":return"разные стороны одного неба";case"dragon_keeper":return"один зажигает · другой держит курс";case"players":return"играете по-разному · команда одна";case"homekeepers":return"главное место — своё";default:return"между вами что-то есть"}}(e)})]})}function c({side:e}){return(0,t.jsxs)("div",{className:`poster-character ${e}`,children:[(0,t.jsx)("div",{className:"character-pack"}),(0,t.jsx)("div",{className:"character-head",children:(0,t.jsxs)("div",{className:"character-face",children:[(0,t.jsx)("span",{className:"face-eye eye-a"}),(0,t.jsx)("span",{className:"face-eye eye-b"}),(0,t.jsx)("span",{className:"face-smile"})]})}),(0,t.jsx)("div",{className:"character-body",children:(0,t.jsxs)("span",{className:"body-panel",children:[(0,t.jsx)("i",{}),(0,t.jsx)("i",{})]})}),(0,t.jsx)("div",{className:"character-arm arm-a"}),(0,t.jsx)("div",{className:"character-arm arm-b"}),(0,t.jsx)("div",{className:"character-leg leg-a"}),(0,t.jsx)("div",{className:"character-leg leg-b"})]})}function x({number:e,children:i}){return(0,t.jsxs)("div",{className:"pay-item",children:[(0,t.jsx)("span",{children:e}),(0,t.jsx)("p",{children:i})]})}let h=`

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;

    background:
      #F5F0EA;

    color:
      #262126;

    font-family:
      "Trebuchet MS",
      "Helvetica Neue",
      Arial,
      sans-serif;
  }

  button {
    font: inherit;
  }

  .page {
    min-height: 100svh;

    overflow: hidden;

    background:
      #F5F0EA;
  }

  /*
   * Главное изменение:
   * весь основной контент теперь
   * сидит в узкой колонке.
   */

  .narrow {
    width:
      min(
        calc(100% - 40px),
        820px
      );

    margin:
      0 auto;
  }

  /* ============================================================
     HEADER
  ============================================================ */

  .header {
    height: 74px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-bottom:
      1px solid
      rgba(
        38,
        33,
        38,
        0.12
      );
  }

  .brand {
    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size: 23px;
    font-style: italic;
    font-weight: 700;

    letter-spacing:
      -0.055em;
  }

  .header-names {
    color:
      #8B7F85;

    font-size: 9px;
    font-weight: 800;

    letter-spacing:
      0.13em;

    text-transform:
      uppercase;
  }

  .header-names span {
    margin:
      0 8px;

    color:
      #A93E67;
  }

  /* ============================================================
     TYPOGRAPHY
  ============================================================ */

  .tiny-label {
    color:
      #A93E67;

    font-size: 9px;
    font-weight: 900;

    letter-spacing:
      0.22em;

    text-transform:
      uppercase;
  }

  /* ============================================================
     SCORE
  ============================================================ */

  .score-section {
    padding:
      74px
      0
      78px;
  }

  .score-section > h1 {
    max-width:
      680px;

    margin:
      13px
      0
      43px;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        54px,
        8vw,
        86px
      );

    font-style:
      italic;

    font-weight: 400;

    line-height: 0.87;

    letter-spacing:
      -0.07em;
  }

  .score-main {
    display: grid;

    grid-template-columns:
      minmax(
        260px,
        0.9fr
      )
      1fr;

    align-items: center;

    gap: 55px;
  }

  .score-number {
    color:
      #A93E67;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        120px,
        18vw,
        178px
      );

    font-style:
      italic;

    font-weight: 400;

    line-height: 0.75;

    letter-spacing:
      -0.09em;
  }

  .score-number sup {
    position: relative;

    top: -1.05em;

    margin-left:
      4px;

    font-size:
      0.27em;

    font-style:
      normal;

    letter-spacing:
      -0.05em;
  }

  .score-side {
    display: flex;
    align-items: center;

    gap: 24px;
  }

  /* ============================================================
     SCORE ORBIT
  ============================================================ */

  .score-orbit {
    position: relative;

    width: 130px;
    height: 130px;

    flex:
      0 0 130px;
  }

  .orbit {
    position: absolute;

    border:
      1.5px solid
      #BEB0B6;

    border-radius: 50%;
  }

  .orbit-one {
    inset:
      11px
      23px;

    transform:
      rotate(31deg);
  }

  .orbit-two {
    inset:
      23px
      11px;

    transform:
      rotate(-31deg);
  }

  .orbit-dot {
    position: absolute;

    width: 26px;
    height: 26px;

    border:
      3px solid
      #F5F0EA;

    border-radius: 50%;

    box-shadow:
      0 0 0 1px
      #302930;
  }

  .dot-a {
    top: 17px;
    left: 31px;

    background:
      #E4B24D;
  }

  .dot-b {
    right: 25px;
    bottom: 20px;

    background:
      #756487;
  }

  .orbit-heart {
    position: absolute;

    top: 50%;
    left: 50%;

    color:
      #A93E67;

    font-family:
      Georgia,
      serif;

    font-size: 25px;

    transform:
      translate(
        -50%,
        -50%
      );
  }

  .score-copy {
    max-width:
      190px;
  }

  .score-copy strong {
    display: block;

    font-family:
      Georgia,
      serif;

    font-size: 22px;
    font-style: italic;
    font-weight: 400;

    line-height: 1.05;
  }

  .score-copy span {
    display: block;

    margin-top:
      9px;

    color:
      #8D8187;

    font-size: 11px;
    line-height: 1.45;
  }

  /* ============================================================
     SCORE RULE
  ============================================================ */

  .score-rule {
    display: grid;

    grid-template-columns:
      auto
      1fr
      auto;

    align-items: center;

    gap: 12px;

    margin-top:
      49px;

    color:
      #9B9095;

    font-family:
      Georgia,
      serif;

    font-size: 10px;
    font-style: italic;
  }

  .score-rule > div {
    position: relative;

    height: 3px;

    background:
      #DDD3D5;
  }

  .score-rule i {
    position: absolute;

    top: 0;
    left: 0;

    height: 100%;

    background:
      #A93E67;
  }

  .score-rule b {
    position: absolute;

    top: 50%;

    width: 13px;
    height: 13px;

    border:
      3px solid
      #F5F0EA;

    border-radius: 50%;

    background:
      #A93E67;

    box-shadow:
      0 0 0 1px
      #A93E67;

    transform:
      translate(
        -50%,
        -50%
      );
  }

  /* ============================================================
     DIMENSIONS
  ============================================================ */

  .dimensions-section {
    padding:
      74px
      0
      80px;

    background:
      #FCFAF7;

    border-top:
      1px solid
      #E5DDDA;

    border-bottom:
      1px solid
      #E5DDDA;
  }

  .section-heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    gap: 30px;

    margin-bottom:
      38px;
  }

  .section-heading h2,
  .archetype-intro h2 {
    margin:
      10px
      0
      0;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      clamp(
        45px,
        7vw,
        68px
      );

    font-style:
      italic;

    font-weight: 400;

    line-height: 0.9;

    letter-spacing:
      -0.065em;
  }

  .heading-note {
    position: relative;

    margin-bottom:
      7px;

    color:
      #9B8F94;

    font-family:
      Georgia,
      serif;

    font-size: 12px;
    font-style: italic;

    line-height: 1.25;

    transform:
      rotate(-3deg);
  }

  .heading-note span {
    position: absolute;

    right: -20px;
    bottom: -15px;

    color:
      #A93E67;

    font-size: 23px;
  }

  .dimensions-list {
    border-top:
      1px solid
      #DCD3D0;
  }

  .dimension-row {
    min-height:
      105px;

    display: grid;

    grid-template-columns:
      34px
      72px
      1fr;

    align-items: center;

    gap: 20px;

    border-bottom:
      1px solid
      #DCD3D0;
  }

  .dimension-number {
    align-self:
      start;

    padding-top:
      24px;

    color:
      #B7ACB0;

    font-family:
      Georgia,
      serif;

    font-size: 11px;
    font-style: italic;
  }

  .dimension-main {
    min-width: 0;
  }

  .dimension-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;

    gap: 20px;

    margin-bottom:
      15px;
  }

  .dimension-head span {
    font-family:
      Georgia,
      serif;

    font-size: 20px;
    font-style: italic;
  }

  .dimension-head strong {
    color:
      #A93E67;

    font-family:
      Georgia,
      serif;

    font-size: 26px;
    font-style: italic;
    font-weight: 400;
  }

  /* ============================================================
     SEGMENT BAR
  ============================================================ */

  .segment-bar {
    display: grid;

    grid-template-columns:
      repeat(
        10,
        1fr
      );

    gap: 5px;
  }

  .segment-bar span {
    height: 7px;

    border-radius:
      20px;

    background:
      #E6DFDC;
  }

  .segment-bar span.active {
    background:
      #A93E67;
  }

  /* ============================================================
     DIMENSION ICONS
  ============================================================ */

  .dimension-icon {
    position: relative;

    width: 60px;
    height: 60px;

    color:
      #302A30;
  }

  .icon-eyes {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 5px;
  }

  .icon-eyes span {
    position: relative;

    width: 27px;
    height: 18px;

    border:
      2px solid
      #302A30;

    border-radius:
      70% 30% 70% 30%;
  }

  .icon-eyes span:last-child {
    border-radius:
      30% 70% 30% 70%;
  }

  .icon-eyes span::after {
    content: '';

    position: absolute;

    top: 50%;
    left: 50%;

    width: 6px;
    height: 6px;

    border-radius: 50%;

    background:
      #A93E67;

    transform:
      translate(
        -50%,
        -50%
      );
  }

  .icon-care {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-care::before,
  .icon-care::after {
    content: '';

    position: absolute;

    bottom: 12px;

    width: 30px;
    height: 16px;

    border-bottom:
      2px solid
      #302A30;
  }

  .icon-care::before {
    left: 2px;

    border-radius:
      0 0 100% 0;

    transform:
      rotate(13deg);
  }

  .icon-care::after {
    right: 2px;

    border-radius:
      0 0 0 100%;

    transform:
      rotate(-13deg);
  }

  .icon-care span {
    color:
      #A93E67;

    font-family:
      Georgia,
      serif;

    font-size: 25px;
  }

  .icon-talk span {
    position: absolute;

    width: 34px;
    height: 25px;

    border:
      2px solid
      #302A30;

    border-radius:
      50%;
  }

  .icon-talk span:first-child {
    top: 7px;
    left: 1px;
  }

  .icon-talk span:last-child {
    right: 1px;
    bottom: 7px;

    border-color:
      #A93E67;
  }

  .icon-talk span::after {
    content: '';

    position: absolute;

    bottom: -5px;
    left: 7px;

    width: 8px;
    height: 8px;

    border-left:
      2px solid
      currentColor;

    transform:
      rotate(-25deg);
  }

  .icon-wave {
    display: flex;
    align-items: center;
  }

  .icon-wave svg {
    width: 60px;
  }

  .icon-space span {
    position: absolute;

    top: 50%;

    width: 28px;
    height: 28px;

    border:
      2px solid
      #302A30;

    border-radius: 50%;

    transform:
      translateY(-50%);
  }

  .icon-space span:first-child {
    left: 0;

    background:
      #E3B34E;
  }

  .icon-space span:last-child {
    right: 0;

    background:
      #8C799E;
  }

  /* ============================================================
     ARCHETYPE
  ============================================================ */

  .archetype-section {
    padding:
      82px
      0
      95px;
  }

  .archetype-intro {
    margin-bottom:
      35px;
  }

  .archetype-poster {
    overflow: hidden;

    border:
      1px solid
      #332C32;

    background:
      #F9F4EE;

    box-shadow:
      9px 10px 0
      #D9C9CE;
  }

  .poster-top {
    height: 49px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding:
      0 19px;

    border-bottom:
      1px solid
      #332C32;

    color:
      #6D6267;

    font-size: 8px;
    font-weight: 900;

    letter-spacing:
      0.2em;
  }

  .poster-top strong {
    color:
      #A93E67;

    font-family:
      Georgia,
      serif;

    font-size: 19px;
    font-style: italic;
    font-weight: 400;

    letter-spacing: 0;
  }

  /* ============================================================
     ART
  ============================================================ */

  .couple-art {
    position: relative;

    height:
      430px;

    overflow: hidden;

    background:
      #393340;
  }

  .art-stars {
    position: absolute;

    inset: 0;

    color:
      #E3B057;
  }

  .art-star {
    position: absolute;

    font-style: normal;
  }

  .star-a {
    top: 12%;
    left: 12%;

    font-size: 25px;
  }

  .star-b {
    top: 23%;
    right: 11%;

    color:
      #BD6E8A;

    font-size: 18px;
  }

  .star-c {
    top: 8%;
    left: 54%;

    color:
      #F4E9DC;

    font-size: 30px;
  }

  .star-d {
    top: 39%;
    left: 7%;

    color:
      #857395;

    font-size: 22px;
  }

  .art-orbit {
    position: absolute;

    border:
      1px solid
      rgba(
        242,
        225,
        209,
        0.22
      );

    border-radius: 50%;
  }

  .orbit-a {
    width: 520px;
    height: 200px;

    top: 80px;
    left: 50%;

    transform:
      translateX(-50%)
      rotate(-13deg);
  }

  .orbit-b {
    width: 450px;
    height: 160px;

    top: 115px;
    left: 50%;

    transform:
      translateX(-50%)
      rotate(15deg);
  }

  .art-sun {
    position: absolute;

    top: 52px;
    left: 50%;

    width: 176px;
    height: 176px;

    border:
      4px solid
      #2B2630;

    border-radius: 50%;

    background:
      #E7B75B;

    box-shadow:
      10px 9px 0
      rgba(
        24,
        20,
        27,
        0.22
      );

    transform:
      translateX(-50%);
  }

  .art-sun span {
    position: absolute;

    border:
      3px solid
      rgba(
        75,
        57,
        45,
        0.3
      );

    border-radius: 50%;
  }

  .art-sun span:first-child {
    top: 30px;
    left: 30px;

    width: 37px;
    height: 23px;
  }

  .art-sun span:nth-child(2) {
    top: 78px;
    right: 25px;

    width: 30px;
    height: 34px;
  }

  .art-sun span:nth-child(3) {
    bottom: 24px;
    left: 55px;

    width: 25px;
    height: 17px;
  }

  .art-ground {
    position: absolute;

    left: -8%;
    right: -8%;
    bottom: -120px;

    height: 280px;

    border:
      4px solid
      #2B2630;

    border-radius:
      50% 50% 0 0;

    background:
      #7D6C88;
  }

  .ground-hole {
    position: absolute;

    border:
      3px solid
      #50465A;

    border-radius: 50%;

    background:
      #665971;
  }

  .hole-a {
    top: 45px;
    left: 18%;

    width: 62px;
    height: 35px;
  }

  .hole-b {
    top: 85px;
    left: 48%;

    width: 90px;
    height: 42px;
  }

  .hole-c {
    top: 35px;
    right: 16%;

    width: 48px;
    height: 28px;
  }

  /* ============================================================
     POSTER CHARACTERS
  ============================================================ */

  .poster-character {
    position: absolute;

    z-index: 6;

    bottom: 54px;

    width: 145px;
    height: 220px;
  }

  .poster-character.left {
    left:
      calc(
        50% - 165px
      );

    transform:
      rotate(3deg);
  }

  .poster-character.right {
    right:
      calc(
        50% - 165px
      );

    transform:
      rotate(-3deg);
  }

  .character-pack {
    position: absolute;

    z-index: 1;

    top: 80px;
    left: 7px;

    width: 52px;
    height: 90px;

    border:
      4px solid
      #29242C;

    border-radius:
      17px;

    background:
      #A8617C;
  }

  .character-head {
    position: absolute;

    z-index: 5;

    top: 0;
    left: 50%;

    width: 100px;
    height: 94px;

    border:
      4px solid
      #29242C;

    border-radius:
      46% 46% 43% 43%;

    background:
      #EEE4DA;

    transform:
      translateX(-50%);
  }

  .character-face {
    position: absolute;

    top: 17px;
    left: 15px;

    width: 63px;
    height: 49px;

    border:
      4px solid
      #29242C;

    border-radius:
      45%;

    background:
      #665B70;
  }

  .face-eye {
    position: absolute;

    top: 17px;

    width: 5px;
    height: 5px;

    border-radius: 50%;

    background:
      #F3D8B0;
  }

  .eye-a {
    left: 17px;
  }

  .eye-b {
    right: 17px;
  }

  .face-smile {
    position: absolute;

    left: 50%;
    bottom: 8px;

    width: 18px;
    height: 8px;

    border-bottom:
      2px solid
      #F3D8B0;

    border-radius:
      0 0 50% 50%;

    transform:
      translateX(-50%);
  }

  .character-body {
    position: absolute;

    z-index: 4;

    top: 80px;
    left: 50%;

    width: 94px;
    height: 94px;

    border:
      4px solid
      #29242C;

    border-radius:
      16px 16px 29px 29px;

    background:
      #EEE4DA;

    transform:
      translateX(-50%);
  }

  .body-panel {
    position: absolute;

    top: 25px;
    left: 50%;

    width: 40px;
    height: 28px;

    border:
      3px solid
      #29242C;

    background:
      #B95A7B;

    transform:
      translateX(-50%);
  }

  .body-panel i {
    position: absolute;

    top: 7px;

    width: 6px;
    height: 6px;

    background:
      #E8B653;
  }

  .body-panel i:first-child {
    left: 7px;
  }

  .body-panel i:last-child {
    right: 7px;

    background:
      #746589;
  }

  .character-arm {
    position: absolute;

    z-index: 3;

    top: 99px;

    width: 66px;
    height: 27px;

    border:
      4px solid
      #29242C;

    border-radius:
      13px;

    background:
      #EEE4DA;
  }

  .arm-a {
    left: -23px;

    transform:
      rotate(23deg);
  }

  .arm-b {
    right: -23px;

    transform:
      rotate(-23deg);
  }

  .character-leg {
    position: absolute;

    z-index: 2;

    bottom: 0;

    width: 42px;
    height: 69px;

    border:
      4px solid
      #29242C;

    border-radius:
      10px 10px 20px 20px;

    background:
      #EEE4DA;
  }

  .leg-a {
    left: 27px;

    transform:
      rotate(6deg);
  }

  .leg-b {
    right: 27px;

    transform:
      rotate(-6deg);
  }

  .poster-character.left
  .arm-b {
    width: 80px;

    right: -40px;

    transform:
      rotate(-12deg);
  }

  .poster-character.right
  .arm-a {
    width: 80px;

    left: -40px;

    transform:
      rotate(12deg);
  }

  .art-heart {
    position: absolute;

    z-index: 10;

    top: 190px;
    left: 50%;

    color:
      #C64F76;

    font-family:
      Georgia,
      serif;

    font-size: 34px;

    transform:
      translateX(-50%);
  }

  .art-caption {
    position: absolute;

    z-index: 20;

    right: 20px;
    bottom: 18px;

    padding:
      9px
      13px;

    border:
      1px solid
      #332C32;

    background:
      #F6EFE8;

    color:
      #332C32;

    font-family:
      Georgia,
      serif;

    font-size: 11px;
    font-style: italic;

    transform:
      rotate(-2deg);
  }

  /* different subtle palettes */

  .theme-moon
  .art-sun {
    background:
      #C9B8D3;
  }

  .theme-pirates
  .art-sun {
    background:
      #D68B58;
  }

  .theme-wizards
  .art-sun {
    background:
      #8F7BA8;
  }

  .theme-dragon
  .art-sun {
    background:
      #C96163;
  }

  /* ============================================================
     POSTER COPY
  ============================================================ */

  .poster-copy {
    display: grid;

    grid-template-columns:
      120px
      1fr;

    gap: 25px;

    padding:
      31px
      34px
      36px;

    border-top:
      1px solid
      #332C32;
  }

  .poster-number {
    color:
      #A93E67;

    font-family:
      Georgia,
      serif;

    font-size: 36px;
    font-style: italic;
  }

  .poster-copy h3 {
    margin: 0;

    font-family:
      Georgia,
      serif;

    font-size:
      clamp(
        42px,
        7vw,
        67px
      );

    font-style: italic;
    font-weight: 400;

    line-height: 0.9;

    letter-spacing:
      -0.06em;
  }

  .poster-copy p {
    max-width:
      430px;

    margin:
      17px
      0
      0;

    color:
      #786D72;

    font-size: 13px;
    line-height: 1.55;
  }

  /* ============================================================
     PAYWALL
  ============================================================ */

  .paywall {
    padding:
      72px
      0
      80px;

    background:
      #2E2931;

    color:
      #F6EFE9;
  }

  .paywall-top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding-bottom:
      20px;

    border-bottom:
      1px solid
      rgba(
        255,
        255,
        255,
        0.15
      );

    color:
      #D47B9A;

    font-size: 8px;
    font-weight: 900;

    letter-spacing:
      0.22em;
  }

  .paywall-top i {
    color:
      #E5B65A;

    font-size: 20px;
    font-style: normal;
  }

  .paywall-grid {
    display: grid;

    grid-template-columns:
      0.9fr
      1.1fr;

    gap: 60px;

    padding-top:
      40px;
  }

  .paywall-title h2 {
    margin: 0;

    font-family:
      Georgia,
      serif;

    font-size:
      clamp(
        43px,
        7vw,
        66px
      );

    font-style: italic;
    font-weight: 400;

    line-height: 0.9;

    letter-spacing:
      -0.055em;
  }

  .paywall-title > p {
    max-width:
      260px;

    margin:
      22px
      0
      0;

    color:
      #AFA4AB;

    font-size: 11px;
    line-height: 1.5;
  }

  .pay-item {
    display: grid;

    grid-template-columns:
      28px
      1fr;

    gap: 12px;

    padding:
      13px
      0;

    border-bottom:
      1px solid
      rgba(
        255,
        255,
        255,
        0.11
      );
  }

  .pay-item span {
    color:
      #D47B9A;

    font-family:
      Georgia,
      serif;

    font-size: 10px;
    font-style: italic;
  }

  .pay-item p {
    margin: 0;

    color:
      #DDD5DA;

    font-family:
      Georgia,
      serif;

    font-size: 15px;
    font-style: italic;

    line-height: 1.25;
  }

  .paywall-content button {
    width: 100%;

    display: grid;

    grid-template-columns:
      1fr
      auto
      auto;

    align-items: center;

    gap: 14px;

    margin-top:
      24px;

    padding:
      17px
      18px;

    border:
      1px solid
      #E4A0B8;

    border-radius: 0;

    background:
      #A93E67;

    color:
      #FFFFFF;

    cursor: pointer;

    text-align: left;
  }

  .paywall-content button span {
    font-family:
      Georgia,
      serif;

    font-size: 15px;
    font-style: italic;
  }

  .paywall-content button strong {
    font-size: 14px;
  }

  .paywall-content button b {
    font-size: 19px;
  }

  .paywall-content button:hover {
    background:
      #BB4B75;
  }

  .paywall-caption {
    margin-top:
      10px;

    color:
      #817780;

    font-size: 8px;

    text-align: center;

    letter-spacing:
      0.07em;
  }

  /* ============================================================
     STATES
  ============================================================ */

  .loading-page,
  .state-page {
    min-height:
      100svh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 30px;

    background:
      #F5F0EA;

    text-align: center;
  }

  .state-brand {
    font-family:
      Georgia,
      serif;

    font-size: 25px;
    font-style: italic;
    font-weight: 700;
  }

  .loading-page p,
  .state-page p {
    color:
      #8F8389;

    font-family:
      Georgia,
      serif;

    font-size: 12px;
    font-style: italic;
  }

  .state-page h1 {
    margin:
      30px
      0
      10px;

    font-family:
      Georgia,
      serif;

    font-size: 45px;
    font-style: italic;
    font-weight: 400;
  }

  .loading-orbits {
    position: relative;

    width: 100px;
    height: 75px;

    margin-bottom:
      28px;
  }

  .loading-orbits span {
    position: absolute;

    top: 50%;

    width: 58px;
    height: 58px;

    border:
      2px solid
      #302A30;

    border-radius: 50%;

    transform:
      translateY(-50%);
  }

  .loading-orbits span:first-child {
    left: 3px;
  }

  .loading-orbits span:nth-child(2) {
    right: 3px;
  }

  .loading-orbits i {
    position: absolute;

    top: 50%;
    left: 50%;

    color:
      #A93E67;

    font-family:
      Georgia,
      serif;

    font-style: normal;

    transform:
      translate(
        -50%,
        -50%
      );
  }

  /* ============================================================
     MOBILE
  ============================================================ */

  @media (
    max-width: 650px
  ) {

    .narrow {
      width:
        calc(
          100% - 30px
        );
    }

    .header {
      height: 62px;
    }

    .brand {
      font-size: 20px;
    }

    .header-names {
      max-width:
        150px;

      overflow: hidden;

      font-size: 8px;

      text-overflow:
        ellipsis;

      white-space:
        nowrap;
    }

    .score-section {
      padding:
        50px
        0
        55px;
    }

    .score-section > h1 {
      margin-bottom:
        34px;

      font-size:
        clamp(
          49px,
          15vw,
          67px
        );
    }

    .score-main {
      grid-template-columns:
        1fr;

      gap: 32px;
    }

    .score-number {
      font-size:
        clamp(
          118px,
          38vw,
          155px
        );
    }

    .score-side {
      gap: 17px;
    }

    .score-orbit {
      width: 105px;
      height: 105px;

      flex-basis:
        105px;
    }

    .score-copy {
      max-width:
        190px;
    }

    .score-rule {
      margin-top:
        36px;
    }

    .dimensions-section {
      padding:
        54px
        0
        58px;
    }

    .section-heading {
      align-items:
        flex-start;

      margin-bottom:
        28px;
    }

    .section-heading h2,
    .archetype-intro h2 {
      font-size:
        48px;
    }

    .heading-note {
      display: none;
    }

    .dimension-row {
      min-height:
        98px;

      grid-template-columns:
        25px
        55px
        1fr;

      gap: 12px;
    }

    .dimension-icon {
      width: 50px;
      height: 50px;

      transform:
        scale(0.84);
    }

    .dimension-head {
      margin-bottom:
        12px;
    }

    .dimension-head span {
      font-size: 16px;
    }

    .dimension-head strong {
      font-size: 20px;
    }

    .segment-bar {
      gap: 3px;
    }

    .segment-bar span {
      height: 6px;
    }

    .archetype-section {
      padding:
        57px
        0
        70px;
    }

    .archetype-intro {
      margin-bottom:
        27px;
    }

    .archetype-poster {
      box-shadow:
        6px 7px 0
        #D9C9CE;
    }

    .couple-art {
      height:
        330px;
    }

    .art-sun {
      width: 130px;
      height: 130px;
    }

    .poster-character {
      bottom: 37px;

      transform-origin:
        bottom center;
    }

    .poster-character.left {
      left:
        calc(
          50% - 137px
        );

      transform:
        scale(0.78)
        rotate(3deg);
    }

    .poster-character.right {
      right:
        calc(
          50% - 137px
        );

      transform:
        scale(0.78)
        rotate(-3deg);
    }

    .art-heart {
      top: 155px;
    }

    .poster-copy {
      grid-template-columns:
        1fr;

      gap: 5px;

      padding:
        25px
        22px
        29px;
    }

    .poster-number {
      font-size: 22px;
    }

    .poster-copy h3 {
      font-size:
        47px;
    }

    .poster-copy p {
      margin-top:
        13px;
    }

    .art-caption {
      right: 10px;
      bottom: 10px;

      font-size: 9px;
    }

    .paywall {
      padding:
        52px
        0
        60px;
    }

    .paywall-grid {
      grid-template-columns:
        1fr;

      gap: 33px;

      padding-top:
        30px;
    }

    .paywall-title h2 {
      font-size: 49px;
    }

    .paywall-title > p {
      margin-top:
        16px;
    }

  }

`;e.s(["default",0,function(){var e,n;let l=(0,a.useParams)(),c=(0,a.useRouter)(),m=l.coupleId,[g,f]=(0,s.useState)(null),[b,u]=(0,s.useState)("");if((0,s.useEffect)(()=>{!async function(){try{let e=await fetch(`/api/report?id=${encodeURIComponent(m)}`,{cache:"no-store"});if(!e.ok)throw Error("Не удалось загрузить результат");let t=await e.json();if(t.waiting)return void c.replace(`/waiting/${m}`);f(t)}catch(e){console.error(e),u("Не получилось загрузить результат.")}}()},[m,c]),b)return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("main",{className:"state-page",children:[(0,t.jsx)("div",{className:"state-brand",children:"между нами"}),(0,t.jsx)("h1",{children:"что-то пошло не так"}),(0,t.jsx)("p",{children:b})]}),(0,t.jsx)(i.default,{id:h.__hash,children:h})]});if(!g)return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("main",{className:"loading-page",children:[(0,t.jsxs)("div",{className:"loading-orbits",children:[(0,t.jsx)("span",{}),(0,t.jsx)("span",{}),(0,t.jsx)("i",{children:"♥"})]}),(0,t.jsx)("div",{className:"state-brand",children:"между нами"}),(0,t.jsx)("p",{children:"соединяем ваши ответы"})]}),(0,t.jsx)(i.default,{id:h.__hash,children:h})]});let y=g.comparisons??[],j=function(e){let t=new Map;for(let e of r)t.set(e.id,0);for(let i of e){let e="same"===i.similarity?2:"close"===i.similarity?1.35:.65,s=[...i.traitsA,...i.traitsB];for(let i of r)for(let a of s)i.traits.includes(a)&&t.set(i.id,(t.get(i.id)??0)+e)}let i=e.filter(e=>"different"===e.similarity).length,s=e.filter(e=>"same"===e.similarity).length;e.length>0&&i>s&&t.set("sun_moon",(t.get("sun_moon")??0)+4);let a=r[0],o=t.get(a.id)??0;for(let e of r){let i=t.get(e.id)??0;i>o&&(a=e,o=i)}return{id:a.id,title:a.title,emojiA:a.emojiA,emojiB:a.emojiB,description:a.description}}(y),w=g.scores?.overall??function(e){if(0===e.length)return 0;let t=0;for(let i of e)"same"===i.similarity&&(t+=1),"close"===i.similarity&&(t+=.5);return Math.round(t/e.length*100)}(y),v=g.scores?.dimensions,N=g.couple.partner_a_name,E=g.couple.partner_b_name,_=[{kind:"views",label:"Близость взглядов",value:v?.views??w},{kind:"care",label:"Забота",value:v?.care??w},{kind:"communication",label:"Общение",value:v?.communication??w},{kind:"rhythm",label:"Совместный ритм",value:v?.rhythm??w},{kind:"space",label:"Личное пространство",value:v?.space??w}];return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("main",{className:"page",children:[(0,t.jsxs)("header",{className:"header narrow",children:[(0,t.jsx)("div",{className:"brand",children:"между нами"}),(0,t.jsxs)("div",{className:"header-names",children:[N,(0,t.jsx)("span",{children:"×"}),E]})]}),(0,t.jsxs)("section",{className:"score-section narrow",children:[(0,t.jsx)("div",{className:"tiny-label",children:"РЕЗУЛЬТАТ ВАШЕЙ ПАРЫ"}),(0,t.jsxs)("h1",{children:["насколько",(0,t.jsx)("br",{}),"вы совпали"]}),(0,t.jsxs)("div",{className:"score-main",children:[(0,t.jsxs)("div",{className:"score-number",children:[w,(0,t.jsx)("sup",{children:"%"})]}),(0,t.jsxs)("div",{className:"score-side",children:[(0,t.jsxs)("div",{className:"score-orbit",children:[(0,t.jsx)("div",{className:"orbit orbit-one"}),(0,t.jsx)("div",{className:"orbit orbit-two"}),(0,t.jsx)("div",{className:"orbit-dot dot-a"}),(0,t.jsx)("div",{className:"orbit-dot dot-b"}),(0,t.jsx)("div",{className:"orbit-heart",children:"♥"})]}),(0,t.jsxs)("div",{className:"score-copy",children:[(0,t.jsx)("strong",{children:(e=w)>=86?"почти одна голова":e>=71?"очень близко":e>=56?"много общего":e>=41?"есть где поспорить":"два разных мира"}),(0,t.jsx)("span",{children:(n=w)>=86?"либо любовь, либо вы списывали":n>=71?"различия есть, но база очень похожа":n>=56?"понимаете друг друга чаще, чем не понимаете":n>=41?"совпадения есть, различий тоже хватает":"зато вам точно есть что узнавать друг о друге"})]})]})]}),(0,t.jsxs)("div",{className:"score-rule",children:[(0,t.jsx)("span",{children:"0"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("i",{style:{width:`${w}%`}}),(0,t.jsx)("b",{style:{left:`${w}%`}})]}),(0,t.jsx)("span",{children:"100"})]})]}),(0,t.jsx)("section",{className:"dimensions-section",children:(0,t.jsxs)("div",{className:"narrow",children:[(0,t.jsxs)("div",{className:"section-heading",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"tiny-label",children:"А ТЕПЕРЬ ПО ЧАСТЯМ"}),(0,t.jsxs)("h2",{children:["Где именно",(0,t.jsx)("br",{}),"вы совпали"]})]}),(0,t.jsxs)("div",{className:"heading-note",children:["пять сторон",(0,t.jsx)("br",{}),"ваших отношений",(0,t.jsx)("span",{children:"↙"})]})]}),(0,t.jsx)("div",{className:"dimensions-list",children:_.map((e,i)=>(0,t.jsx)(o,{number:i+1,kind:e.kind,label:e.label,value:e.value},e.kind))})]})}),(0,t.jsx)("section",{className:"archetype-section",children:(0,t.jsxs)("div",{className:"narrow",children:[(0,t.jsxs)("div",{className:"archetype-intro",children:[(0,t.jsx)("div",{className:"tiny-label",children:"И ЕЩЁ КОЕ-ЧТО"}),(0,t.jsxs)("h2",{children:["какая вы",(0,t.jsx)("br",{}),"пара?"]})]}),(0,t.jsxs)("div",{className:"archetype-poster",children:[(0,t.jsxs)("div",{className:"poster-top",children:[(0,t.jsx)("span",{children:"ТИП ПАРЫ"}),(0,t.jsxs)("strong",{children:["№",p(j.id)]})]}),(0,t.jsx)(d,{archetypeId:j.id}),(0,t.jsxs)("div",{className:"poster-copy",children:[(0,t.jsxs)("div",{className:"poster-number",children:["№",p(j.id)]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{children:j.title}),(0,t.jsx)("p",{children:j.description})]})]})]})]})}),(0,t.jsx)("section",{className:"paywall",children:(0,t.jsxs)("div",{className:"narrow",children:[(0,t.jsxs)("div",{className:"paywall-top",children:[(0,t.jsx)("span",{children:"ЛЁГКАЯ ВЕРСИЯ ЗАКОНЧИЛАСЬ"}),(0,t.jsx)("i",{children:"✦"})]}),(0,t.jsxs)("div",{className:"paywall-grid",children:[(0,t.jsxs)("div",{className:"paywall-title",children:[(0,t.jsxs)("h2",{children:["А что",(0,t.jsx)("br",{}),"между строк?"]}),(0,t.jsx)("p",{children:"Разберём ваши ответы глубже — без диагнозов и банальностей."})]}),(0,t.jsxs)("div",{className:"paywall-content",children:[(0,t.jsx)(x,{number:"01",children:"Что каждый из вас считает заботой"}),(0,t.jsx)(x,{number:"02",children:"Где один ждёт одного, а второй — другого"}),(0,t.jsx)(x,{number:"03",children:"Что вы можете не замечать друг о друге"}),(0,t.jsx)(x,{number:"04",children:"О чём вам действительно стоит поговорить"}),(0,t.jsxs)("button",{type:"button",onClick:()=>c.push(`/report/${m}`),children:[(0,t.jsx)("span",{children:"открыть полный разбор"}),(0,t.jsx)("strong",{children:"299 ₽"}),(0,t.jsx)("b",{children:"→"})]}),(0,t.jsx)("div",{className:"paywall-caption",children:"один разбор · для вас двоих"})]})]})]})})]}),(0,t.jsx)(i.default,{id:h.__hash,children:h})]})}],95801)}]);