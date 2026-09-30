(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,95801,e=>{"use strict";var t=e.i(43476),i=e.i(37902),r=e.i(71645),s=e.i(18566);let n=[{id:"knight_princess",title:"Рыцарь и принцесса",emojiA:"⚔️",emojiB:"👑",description:"У вас много заботы в мелочах. Для этой пары любовь чаще видна не в громких словах, а в ощущении: «я рядом и помню о тебе».",traits:["care_practical","attention","warmth","initiative","support_action","physical_closeness","support_physical"]},{id:"astronauts",title:"Два космонавта",emojiA:"🚀",emojiB:"🪐",description:"У каждого может быть своя орбита, но вам важно знать, что маршрут всё равно общий. Близость для вас не обязательно означает быть вместе каждую минуту.",traits:["independence","personal_space_high","space_high","space_balanced","autonomy","value_independence","planning","need_future_alignment"]},{id:"wizards",title:"Два волшебника",emojiA:"🔮",emojiB:"✨",description:"Ваш главный инструмент — разговор. Вам важно не просто быть рядом, а понимать, что происходит внутри другого человека.",traits:["communication","emotional_sharing","support_listening","conflict_verbal_resolution","need_communication","need_deep_communication","value_communication","listening"]},{id:"pirates",title:"Два пирата",emojiA:"🏴‍☠️",emojiB:"🗺️",description:"Вашей паре особенно идёт ощущение приключения. Планы хороши, но иногда лучший план — придумать всё по дороге.",traits:["spontaneity","shared_experience","activity","need_spontaneity","need_novelty","flexibility","money_experience","money_present"]},{id:"sun_moon",title:"Солнце и Луна",emojiA:"☀️",emojiB:"🌙",description:"Вы не обязаны одинаково реагировать на всё. В вашей паре особенно заметно, как разные способы чувствовать и действовать могут существовать рядом.",traits:["support_proactive","support_space","space_high","closeness_high","independence","direct_communication","quiet_closeness","emotional_sharing"]},{id:"dragon_keeper",title:"Дракон и хранитель",emojiA:"🐉",emojiB:"🛡️",description:"В вашей динамике есть энергия и спокойствие. Один момент может проживаться ярко, другой — через паузу, действие или присутствие рядом.",traits:["emotion_intensity","self_regulation","support_available","support_presence","conflict_time_repair","indirect_repair","repair_delayed"]},{id:"players",title:"Два игрока",emojiA:"🎮",emojiB:"👾",description:"У вас есть важная суперсила — лёгкость. Юмор, свои приколы и ощущение команды помогают вам снова находить друг друга.",traits:["humor","playfulness","support_humor","conflict_humor_repair","micro_connection","value_playfulness","need_lightness","message_team"]},{id:"homekeepers",title:"Хранители дома",emojiA:"🕯️",emojiB:"🏡",description:"Сила вашей пары прячется в обычной жизни: знакомых ритуалах, спокойных вечерах и ощущении места, куда хочется возвращаться.",traits:["home_comfort","quiet_closeness","ritual","stability","value_ritual","need_stability","shared_life","message_everyday_love"]}];function o({item:e}){var i,r;return(0,t.jsxs)("article",{className:"dimension-card",children:[(0,t.jsx)("div",{className:"dimension-icon-wrap",children:(0,t.jsx)(l,{kind:e.kind})}),(0,t.jsxs)("div",{className:"dimension-content",children:[(0,t.jsxs)("div",{className:"dimension-top",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"dimension-eyebrow",children:e.eyebrow}),(0,t.jsx)("h3",{children:e.title})]}),(0,t.jsxs)("strong",{children:[e.value,(0,t.jsx)("sup",{children:"%"})]})]}),(0,t.jsx)(a,{value:e.value}),(0,t.jsx)("p",{children:(i=e.kind,r=e.value,"views"===i?r>=70?"Базовые ожидания от отношений у вас часто совпадают.":r>=40?"В главном есть пересечения, но некоторые ожидания различаются.":"Представление о том, как должны работать отношения, у вас заметно различается.":"care"===i?r>=70?"Вы хорошо угадываете, что для другого означает «я рядом».":r>=40?"Иногда вы ждёте друг от друга разных проявлений заботы.":"То, что один считает заботой, второй может почти не замечать.":"communication"===i?r>=70?"О важном вам обычно хочется разговаривать похожим способом.":r>=40?"Сложные темы вы можете проживать немного по-разному.":"В сложный момент одному может хотеться говорить, а другому — совсем другого.":"rhythm"===i?r>=70?"Ваше представление о хорошем времени вдвоём часто совпадает.":r>=40?"Часть совместных сценариев подходит обоим, но отдыхаете вы не всегда одинаково.":"Идеальный совместный вечер у каждого может выглядеть по-своему.":r>=70?"Вы похоже чувствуете границу между «мы» и временем для себя.":r>=40?"Одному иногда нужно чуть больше близости или свободы, чем другому.":"Потребность быть рядом и потребность побыть отдельно у вас заметно различаются.")})]})]})}function a({value:e}){let i=Math.round(e/10);return(0,t.jsx)("div",{className:"segments",children:Array.from({length:10}).map((e,r)=>(0,t.jsx)("span",{className:r<i?"active":""},r))})}function l({kind:e}){return"views"===e?(0,t.jsxs)("div",{className:"mini-art views-art",children:[(0,t.jsx)("span",{className:"eye-shape eye-one",children:(0,t.jsx)("i",{})}),(0,t.jsx)("span",{className:"eye-shape eye-two",children:(0,t.jsx)("i",{})})]}):"care"===e?(0,t.jsxs)("div",{className:"mini-art care-art",children:[(0,t.jsx)("span",{className:"hand hand-one"}),(0,t.jsx)("i",{children:"♥"}),(0,t.jsx)("span",{className:"hand hand-two"})]}):"communication"===e?(0,t.jsxs)("div",{className:"mini-art talk-art",children:[(0,t.jsx)("span",{}),(0,t.jsx)("span",{}),(0,t.jsx)("i",{children:"··"})]}):"rhythm"===e?(0,t.jsx)("div",{className:"mini-art rhythm-art",children:(0,t.jsxs)("svg",{viewBox:"0 0 90 60","aria-hidden":"true",children:[(0,t.jsx)("path",{d:"M5 35 C16 5 27 5 38 35 C49 65 60 65 71 35 C78 16 83 13 87 24",fill:"none",stroke:"currentColor",strokeWidth:"5",strokeLinecap:"round"}),(0,t.jsx)("circle",{cx:"5",cy:"35",r:"4",fill:"#B43D69"}),(0,t.jsx)("circle",{cx:"87",cy:"24",r:"4",fill:"#E4AE49"})]})}):(0,t.jsxs)("div",{className:"mini-art space-art",children:[(0,t.jsx)("span",{className:"planet-one"}),(0,t.jsx)("span",{className:"planet-two"}),(0,t.jsx)("i",{})]})}function p(e){return({knight_princess:"01",wizards:"02",pirates:"03",astronauts:"04",sun_moon:"05",dragon_keeper:"06",players:"07",homekeepers:"08"})[e]??"00"}function d({archetypeId:e}){return(0,t.jsxs)("div",{className:`couple-art art-${e}`,children:[(0,t.jsxs)("div",{className:"sky-decoration",children:[(0,t.jsx)("i",{className:"spark spark-one",children:"✦"}),(0,t.jsx)("i",{className:"spark spark-two",children:"✦"}),(0,t.jsx)("i",{className:"spark spark-three",children:"+"}),(0,t.jsx)("span",{className:"orbit-line orbit-line-one"}),(0,t.jsx)("span",{className:"orbit-line orbit-line-two"})]}),(0,t.jsxs)("div",{className:"big-planet",children:[(0,t.jsx)("i",{}),(0,t.jsx)("i",{}),(0,t.jsx)("i",{})]}),(0,t.jsxs)("div",{className:"ground",children:[(0,t.jsx)("i",{className:"crater crater-one"}),(0,t.jsx)("i",{className:"crater crater-two"}),(0,t.jsx)("i",{className:"crater crater-three"})]}),(0,t.jsx)(c,{side:"left"}),(0,t.jsx)(c,{side:"right"}),(0,t.jsx)("div",{className:"art-love",children:"♥"}),(0,t.jsx)("div",{className:"art-tag",children:{knight_princess:"своих не бросаем",wizards:"понимаем между строк",pirates:"одна команда",astronauts:"две орбиты · один маршрут",sun_moon:"разные стороны одного неба",dragon_keeper:"огонь + спокойствие",players:"играем вместе",homekeepers:"своё место"}[e]??"между вами"})]})}function c({side:e}){return(0,t.jsxs)("div",{className:`character ${e}`,children:[(0,t.jsx)("div",{className:"backpack"}),(0,t.jsx)("div",{className:"helmet",children:(0,t.jsxs)("div",{className:"visor",children:[(0,t.jsx)("i",{}),(0,t.jsx)("i",{}),(0,t.jsx)("span",{})]})}),(0,t.jsx)("div",{className:"body",children:(0,t.jsxs)("div",{className:"panel",children:[(0,t.jsx)("i",{}),(0,t.jsx)("i",{})]})}),(0,t.jsx)("div",{className:"arm arm-outside"}),(0,t.jsx)("div",{className:"arm arm-inside"}),(0,t.jsx)("div",{className:"leg leg-one"}),(0,t.jsx)("div",{className:"leg leg-two"})]})}function h({children:e}){return(0,t.jsxs)("div",{className:"locked-finding",children:[(0,t.jsx)("div",{className:"lock",children:"↗"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{children:"НАЙДЕНО В ВАШИХ ОТВЕТАХ"}),(0,t.jsx)("p",{children:e})]}),(0,t.jsx)("b",{children:"закрыто"})]})}let m=`

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: #F4EFE9;
  color: #292329;

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
}

.shell {
  width: min(
    calc(100% - 36px),
    760px
  );

  margin: 0 auto;
}

/* HEADER */

.header {
  height: 58px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom:
    1px solid #D8D0CD;
}

.brand {
  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 22px;
  font-style: italic;
  font-weight: 700;

  letter-spacing: -0.055em;
}

.header-couple {
  display: flex;
  align-items: center;

  gap: 8px;

  color: #857A80;

  font-size: 8px;
  font-weight: 900;

  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.header-couple b {
  color: #B43D69;
}

.kicker {
  color: #B43D69;

  font-size: 8px;
  font-weight: 900;

  letter-spacing: 0.22em;
  text-transform: uppercase;
}

/* INTRO */

.intro {
  padding:
    30px
    0
    19px;
}

.intro-grid {
  display: grid;

  grid-template-columns:
    1fr
    180px;

  align-items: end;

  gap: 28px;

  margin-top: 8px;
}

.intro h1 {
  margin: 0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size:
    clamp(
      43px,
      7vw,
      61px
    );

  font-style: italic;
  font-weight: 400;

  line-height: 0.89;

  letter-spacing: -0.065em;
}

.intro p {
  margin: 0 0 3px;

  color: #8D8388;

  font-family:
    Georgia,
    serif;

  font-size: 10px;
  font-style: italic;

  line-height: 1.4;
}

/* DIMENSIONS */

.dimensions {
  padding-bottom: 30px;
}

.dimension-card {
  display: grid;

  grid-template-columns:
    67px
    1fr;

  gap: 17px;

  padding:
    16px
    0;

  border-top:
    1px solid #D8D0CD;
}

.dimension-card:last-child {
  border-bottom:
    1px solid #D8D0CD;
}

.dimension-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.dimension-content {
  min-width: 0;
}

.dimension-top {
  display: grid;

  grid-template-columns:
    1fr
    auto;

  align-items: end;

  gap: 18px;
}

.dimension-eyebrow {
  display: block;

  margin-bottom: 3px;

  color: #A4999E;

  font-size: 6px;
  font-weight: 900;

  letter-spacing: 0.19em;
}

.dimension-top h3 {
  margin: 0;

  font-family:
    Georgia,
    serif;

  font-size: 19px;
  font-style: italic;
  font-weight: 400;

  line-height: 1;

  letter-spacing: -0.025em;
}

.dimension-top strong {
  color: #B43D69;

  font-family:
    Georgia,
    serif;

  font-size: 30px;
  font-style: italic;
  font-weight: 400;

  line-height: 0.8;
}

.dimension-top strong sup {
  margin-left: 1px;

  font-size: 0.48em;
}

.segments {
  display: grid;

  grid-template-columns:
    repeat(10, 1fr);

  gap: 4px;

  margin-top: 10px;
}

.segments span {
  height: 5px;

  border-radius: 20px;

  background: #DED7D4;
}

.segments span.active {
  background: #B43D69;
}

.dimension-content > p {
  max-width: 540px;

  margin:
    7px
    0
    0;

  color: #776D72;

  font-size: 10px;
  line-height: 1.35;
}

/* MINI ART */

.mini-art {
  position: relative;

  width: 58px;
  height: 45px;

  transform: scale(0.84);
}

.views-art {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 4px;
}

.eye-shape {
  position: relative;

  width: 30px;
  height: 19px;

  border:
    2px solid #332D33;

  border-radius:
    70% 30% 70% 30%;
}

.eye-two {
  border-radius:
    30% 70% 30% 70%;
}

.eye-shape i {
  position: absolute;

  top: 50%;
  left: 50%;

  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: #B43D69;

  transform:
    translate(-50%, -50%);
}

.care-art i {
  position: absolute;

  top: 2px;
  left: 50%;

  color: #B43D69;

  font-family: Georgia, serif;

  font-size: 24px;
  font-style: normal;

  transform: translateX(-50%);
}

.hand {
  position: absolute;

  bottom: 4px;

  width: 35px;
  height: 18px;

  border-bottom:
    2px solid #332D33;
}

.hand-one {
  left: -3px;

  border-radius:
    0 0 100% 0;

  transform: rotate(10deg);
}

.hand-two {
  right: -3px;

  border-radius:
    0 0 0 100%;

  transform: rotate(-10deg);
}

.talk-art span {
  position: absolute;

  width: 36px;
  height: 24px;

  border:
    2px solid #332D33;

  border-radius: 50%;
}

.talk-art span:first-child {
  top: 0;
  left: 0;
}

.talk-art span:nth-child(2) {
  right: 0;
  bottom: 0;

  border-color: #B43D69;
}

.talk-art i {
  position: absolute;

  top: 10px;
  left: 18px;

  z-index: 3;

  color: #332D33;

  font-family: Georgia, serif;

  font-size: 13px;
  font-style: normal;
}

.rhythm-art {
  display: flex;
  align-items: center;
}

.rhythm-art svg {
  width: 60px;
}

.space-art
.planet-one,
.space-art
.planet-two {
  position: absolute;

  top: 50%;

  width: 28px;
  height: 28px;

  border:
    2px solid #332D33;

  border-radius: 50%;

  transform:
    translateY(-50%);
}

.planet-one {
  left: 0;
  background: #E5AF49;
}

.planet-two {
  right: 0;
  background: #927DA1;
}

.space-art i {
  position: absolute;

  top: 50%;
  left: 50%;

  width: 6px;
  height: 6px;

  border-radius: 50%;

  background: #B43D69;

  transform:
    translate(-50%, -50%);
}

/* TYPE */

.type-section {
  padding:
    5px
    0
    35px;
}

.type-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 20px;

  margin-bottom: 12px;
}

.type-heading h2 {
  margin:
    5px
    0
    0;

  font-family:
    Georgia,
    serif;

  font-size:
    clamp(
      33px,
      5vw,
      45px
    );

  font-style: italic;
  font-weight: 400;

  line-height: 0.95;

  letter-spacing: -0.055em;
}

.type-number {
  flex-shrink: 0;

  color: #B43D69;

  font-family:
    Georgia,
    serif;

  font-size: 24px;
  font-style: italic;
}

.poster {
  overflow: hidden;

  border:
    1px solid #312B31;

  background: #F8F2EC;

  box-shadow:
    6px 6px 0 #DACBD0;
}

/* ART */

.couple-art {
  position: relative;

  height: 295px;

  overflow: hidden;

  background: #393440;
}

.sky-decoration {
  position: absolute;
  inset: 0;
}

.spark {
  position: absolute;

  color: #E5AF49;

  font-style: normal;
}

.spark-one {
  top: 12%;
  left: 13%;

  font-size: 23px;
}

.spark-two {
  top: 21%;
  right: 12%;

  color: #C36C8B;

  font-size: 17px;
}

.spark-three {
  top: 40%;
  left: 7%;

  color: #907C9E;

  font-size: 18px;
}

.orbit-line {
  position: absolute;

  left: 50%;

  border:
    1px solid
    rgba(241, 225, 211, 0.24);

  border-radius: 50%;
}

.orbit-line-one {
  top: 67px;

  width: 490px;
  height: 125px;

  transform:
    translateX(-50%)
    rotate(-13deg);
}

.orbit-line-two {
  top: 79px;

  width: 430px;
  height: 145px;

  transform:
    translateX(-50%)
    rotate(17deg);
}

.big-planet {
  position: absolute;

  top: 29px;
  left: 50%;

  width: 135px;
  height: 135px;

  border:
    4px solid #29242C;

  border-radius: 50%;

  background: #C2B0CF;

  box-shadow:
    7px 7px 0
    rgba(28, 24, 31, 0.22);

  transform:
    translateX(-50%);
}

.big-planet i {
  position: absolute;

  border:
    3px solid
    rgba(70, 57, 75, 0.28);

  border-radius: 50%;
}

.big-planet i:first-child {
  top: 24px;
  left: 21px;

  width: 33px;
  height: 18px;
}

.big-planet i:nth-child(2) {
  top: 65px;
  right: 18px;

  width: 23px;
  height: 30px;
}

.big-planet i:nth-child(3) {
  bottom: 19px;
  left: 51px;

  width: 22px;
  height: 15px;
}

.ground {
  position: absolute;

  left: -9%;
  right: -9%;
  bottom: -139px;

  height: 240px;

  border:
    4px solid #29242C;

  border-radius:
    50% 50% 0 0;

  background: #81718C;
}

.crater {
  position: absolute;

  border:
    3px solid #554A5E;

  border-radius: 50%;

  background: #695C73;
}

.crater-one {
  top: 28px;
  left: 17%;

  width: 55px;
  height: 30px;
}

.crater-two {
  top: 65px;
  left: 47%;

  width: 80px;
  height: 35px;
}

.crater-three {
  top: 27px;
  right: 16%;

  width: 45px;
  height: 25px;
}

/* CHARACTERS */

.character {
  position: absolute;

  z-index: 5;

  bottom: 28px;

  width: 135px;
  height: 205px;

  transform-origin:
    bottom center;
}

.character.left {
  left:
    calc(50% - 142px);

  transform:
    scale(0.82)
    rotate(2deg);
}

.character.right {
  right:
    calc(50% - 142px);

  transform:
    scale(0.82)
    rotate(-2deg);
}

.backpack {
  position: absolute;

  top: 75px;
  left: 4px;

  width: 48px;
  height: 84px;

  border:
    4px solid #29242C;

  border-radius: 17px;

  background: #B45B7A;
}

.helmet {
  position: absolute;

  z-index: 6;

  top: 0;
  left: 50%;

  width: 94px;
  height: 90px;

  border:
    4px solid #29242C;

  border-radius: 47%;

  background: #F0E7DD;

  transform:
    translateX(-50%);
}

.visor {
  position: absolute;

  top: 17px;
  left: 14px;

  width: 59px;
  height: 47px;

  border:
    4px solid #29242C;

  border-radius: 45%;

  background: #665B70;
}

.visor i {
  position: absolute;

  top: 17px;

  width: 5px;
  height: 5px;

  border-radius: 50%;

  background: #F2D4A5;
}

.visor i:first-child {
  left: 16px;
}

.visor i:nth-child(2) {
  right: 16px;
}

.visor span {
  position: absolute;

  left: 50%;
  bottom: 8px;

  width: 18px;
  height: 7px;

  border-bottom:
    2px solid #F2D4A5;

  border-radius:
    0 0 50% 50%;

  transform:
    translateX(-50%);
}

.body {
  position: absolute;

  z-index: 5;

  top: 76px;
  left: 50%;

  width: 88px;
  height: 88px;

  border:
    4px solid #29242C;

  border-radius:
    14px 14px 27px 27px;

  background: #F0E7DD;

  transform:
    translateX(-50%);
}

.panel {
  position: absolute;

  top: 25px;
  left: 50%;

  width: 38px;
  height: 26px;

  border:
    3px solid #29242C;

  background: #C35078;

  transform:
    translateX(-50%);
}

.panel i {
  position: absolute;

  top: 7px;

  width: 6px;
  height: 6px;
}

.panel i:first-child {
  left: 7px;
  background: #E5AF49;
}

.panel i:last-child {
  right: 7px;
  background: #7E6C91;
}

.arm {
  position: absolute;

  z-index: 4;

  top: 97px;

  width: 61px;
  height: 25px;

  border:
    4px solid #29242C;

  border-radius: 14px;

  background: #F0E7DD;
}

.character.left .arm-outside {
  left: -20px;
  transform: rotate(27deg);
}

.character.left .arm-inside {
  right: -34px;
  width: 76px;
  transform: rotate(-11deg);
}

.character.right .arm-outside {
  right: -20px;
  transform: rotate(-27deg);
}

.character.right .arm-inside {
  left: -34px;
  width: 76px;
  transform: rotate(11deg);
}

.leg {
  position: absolute;

  z-index: 3;

  bottom: 0;

  width: 39px;
  height: 64px;

  border:
    4px solid #29242C;

  border-radius:
    10px 10px 18px 18px;

  background: #F0E7DD;
}

.leg-one {
  left: 25px;
  transform: rotate(5deg);
}

.leg-two {
  right: 25px;
  transform: rotate(-5deg);
}

.art-love {
  position: absolute;

  z-index: 10;

  top: 141px;
  left: 50%;

  color: #D04F78;

  font-family: Georgia, serif;

  font-size: 27px;

  transform:
    translateX(-50%);
}

.art-tag {
  position: absolute;

  z-index: 15;

  right: 12px;
  bottom: 10px;

  padding:
    6px 9px;

  border:
    1px solid #302A30;

  background: #F6EEE7;

  font-family: Georgia, serif;

  font-size: 9px;
  font-style: italic;

  transform: rotate(-2deg);
}

.art-sun_moon .big-planet {
  background: #C4B1D1;
}

.art-pirates .big-planet {
  background: #D98E5E;
}

.art-wizards .big-planet {
  background: #9983AE;
}

.art-dragon_keeper .big-planet {
  background: #CB6968;
}

.art-homekeepers .big-planet {
  background: #CDA679;
}

/* POSTER BOTTOM */

.poster-info {
  padding:
    13px
    18px
    15px;
}

.poster-caption {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 24px;
}

.poster-caption span {
  flex-shrink: 0;

  color: #B43D69;

  font-size: 7px;
  font-weight: 900;

  letter-spacing: 0.16em;
}

.poster-caption p {
  max-width: 430px;

  margin: 0;

  color: #6F666B;

  font-family: Georgia, serif;

  font-size: 11px;
  font-style: italic;

  line-height: 1.3;

  text-align: right;
}

/* PAYWALL */

.paywall {
  padding:
    34px
    0
    38px;

  background: #2E2931;

  color: #F8F1EB;
}

.paywall-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-bottom: 11px;

  border-bottom:
    1px solid
    rgba(255,255,255,0.15);

  color: #DD829F;

  font-size: 7px;
  font-weight: 900;

  letter-spacing: 0.21em;
}

.paywall-topline b {
  color: #E8B54D;

  font-size: 17px;
  font-weight: 400;
}

.paywall-grid {
  display: grid;

  grid-template-columns:
    0.82fr
    1.18fr;

  gap: 35px;

  padding-top: 24px;
}

.paywall-copy h2 {
  margin: 0;

  font-family: Georgia, serif;

  font-size:
    clamp(
      39px,
      6vw,
      54px
    );

  font-style: italic;
  font-weight: 400;

  line-height: 0.88;

  letter-spacing: -0.06em;
}

.paywall-copy p {
  max-width: 220px;

  margin:
    14px
    0
    0;

  color: #ADA2A8;

  font-size: 9px;
  line-height: 1.45;
}

.finding-count {
  display: grid;

  grid-template-columns:
    auto
    1fr;

  grid-template-areas:
    "label label"
    "number copy";

  align-items: end;

  column-gap: 15px;

  margin-bottom: 7px;

  padding:
    12px
    15px;

  border:
    1px solid #D37A99;

  background: #3B323D;
}

.finding-count > span {
  grid-area: label;

  color: #D9829F;

  font-size: 6px;
  font-weight: 900;

  letter-spacing: 0.18em;
}

.finding-count strong {
  grid-area: number;

  color: #F4C05C;

  font-family: Georgia, serif;

  font-size: 48px;
  font-style: italic;
  font-weight: 400;

  line-height: 0.9;
}

.finding-count p {
  grid-area: copy;

  margin:
    0
    0
    3px;

  color: #E7DDE2;

  font-family: Georgia, serif;

  font-size: 12px;
  font-style: italic;

  line-height: 1.2;
}

.locked-finding {
  display: grid;

  grid-template-columns:
    24px
    1fr
    auto;

  align-items: center;

  gap: 9px;

  padding:
    9px
    0;

  border-bottom:
    1px solid
    rgba(255,255,255,0.11);
}

.lock {
  width: 19px;
  height: 19px;

  display: flex;
  align-items: center;
  justify-content: center;

  border:
    1px solid #D47A99;

  border-radius: 50%;

  color: #D47A99;

  font-size: 9px;

  transform: rotate(45deg);
}

.locked-finding span {
  color: #7F747D;

  font-size: 5px;
  font-weight: 900;

  letter-spacing: 0.12em;
}

.locked-finding p {
  margin:
    2px
    0
    0;

  color: #F0E7EC;

  font-family: Georgia, serif;

  font-size: 11px;
  font-style: italic;

  line-height: 1.2;
}

.locked-finding > b {
  color: #776C75;

  font-size: 6px;
  font-weight: 700;

  text-transform: uppercase;
}

/* CTA */

.teaser button {
  width: 100%;

  display: grid;

  grid-template-columns:
    1fr
    auto
    auto;

  align-items: center;

  gap: 12px;

  margin-top: 14px;

  padding:
    14px
    15px;

  border:
    1px solid #F0B1C7;

  background: #B43D69;

  color: #FFFFFF;

  cursor: pointer;

  text-align: left;

  transition:
    transform 160ms ease,
    background 160ms ease;
}

.teaser button:hover {
  background: #C84977;
  transform: translateY(-2px);
}

.teaser button span {
  font-family: Georgia, serif;

  font-size: 13px;
  font-style: italic;
}

.teaser button strong {
  white-space: nowrap;

  font-size: 13px;
}

.teaser button b {
  font-size: 18px;
}

.paywall-footnote {
  margin-top: 6px;

  color: #776D75;

  font-size: 6px;

  text-align: center;

  letter-spacing: 0.08em;
}

/* STATES */

.loading-page,
.state-page {
  min-height: 100svh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 30px;

  background: #F4EFE9;

  text-align: center;
}

.state-brand {
  font-family: Georgia, serif;

  font-size: 24px;
  font-style: italic;
  font-weight: 700;
}

.loading-page p,
.state-page p {
  color: #8D8288;

  font-family: Georgia, serif;

  font-size: 11px;
  font-style: italic;
}

.state-page h1 {
  margin:
    25px
    0
    10px;

  font-family: Georgia, serif;

  font-size: 43px;
  font-style: italic;
  font-weight: 400;

  line-height: 0.95;
}

.loading-symbol {
  display: flex;
  align-items: center;

  margin-bottom: 25px;
}

.loading-symbol span {
  width: 48px;
  height: 48px;

  border:
    2px solid #302A30;

  border-radius: 50%;
}

.loading-symbol span:last-child {
  margin-left: -12px;
}

.loading-symbol i {
  position: relative;

  z-index: 2;

  margin: 0 -7px;

  color: #B43D69;

  font-family: Georgia, serif;

  font-style: normal;
}

/* MOBILE */

@media (max-width: 650px) {

  .shell {
    width:
      calc(100% - 26px);
  }

  .header {
    height: 54px;
  }

  .brand {
    font-size: 19px;
  }

  .header-couple {
    max-width: 145px;

    overflow: hidden;

    font-size: 7px;

    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .intro {
    padding:
      25px
      0
      15px;
  }

  .intro-grid {
    grid-template-columns: 1fr;

    gap: 9px;

    margin-top: 7px;
  }

  .intro h1 {
    font-size:
      clamp(
        42px,
        13vw,
        55px
      );
  }

  .intro p {
    max-width: 270px;
  }

  .dimensions {
    padding-bottom: 22px;
  }

  .dimension-card {
    grid-template-columns:
      48px
      1fr;

    gap: 10px;

    padding:
      14px
      0;
  }

  .dimension-icon-wrap {
    justify-content: flex-start;
  }

  .mini-art {
    transform: scale(0.68);
    transform-origin: left center;
  }

  .dimension-top {
    gap: 10px;
  }

  .dimension-top h3 {
    max-width: 200px;

    font-size: 17px;
  }

  .dimension-top strong {
    font-size: 26px;
  }

  .segments {
    gap: 3px;

    margin-top: 8px;
  }

  .segments span {
    height: 4px;
  }

  .dimension-content > p {
    margin-top: 6px;

    font-size: 9px;
  }

  .type-section {
    padding:
      2px
      0
      27px;
  }

  .type-heading {
    margin-bottom: 10px;
  }

  .type-heading h2 {
    font-size: 34px;
  }

  .type-number {
    font-size: 20px;
  }

  .couple-art {
    height: 245px;
  }

  .big-planet {
    top: 25px;

    width: 108px;
    height: 108px;
  }

  .character {
    bottom: 16px;
  }

  .character.left {
    left:
      calc(50% - 110px);

    transform:
      scale(0.68)
      rotate(2deg);
  }

  .character.right {
    right:
      calc(50% - 110px);

    transform:
      scale(0.68)
      rotate(-2deg);
  }

  .art-love {
    top: 120px;

    font-size: 23px;
  }

  .art-tag {
    right: 7px;
    bottom: 7px;

    font-size: 7px;
  }

  .poster-info {
    padding:
      11px
      13px
      12px;
  }

  .poster-caption {
    gap: 12px;
  }

  .poster-caption p {
    font-size: 9px;
  }

  .paywall {
    padding:
      28px
      0
      31px;
  }

  .paywall-grid {
    grid-template-columns: 1fr;

    gap: 19px;

    padding-top: 19px;
  }

  .paywall-copy h2 {
    font-size: 43px;
  }

  .paywall-copy p {
    margin-top: 10px;
  }

  .finding-count strong {
    font-size: 42px;
  }

  .locked-finding {
    grid-template-columns:
      22px
      1fr;

    padding:
      8px
      0;
  }

  .locked-finding > b {
    display: none;
  }

  .teaser button {
    margin-top: 12px;

    padding:
      13px
      13px;
  }

}

`;e.s(["default",0,function(){var e,a,l,c,x,u,f,g;let y,b,v,j,_=(0,s.useParams)(),w=(0,s.useRouter)(),k=_.coupleId,[S,z]=(0,r.useState)(null),[N,C]=(0,r.useState)("");if((0,r.useEffect)(()=>{!async function(){try{let e=await fetch(`/api/report?id=${encodeURIComponent(k)}`,{cache:"no-store"});if(!e.ok)throw Error("Не удалось загрузить результат");let t=await e.json();if(t.waiting)return void w.replace(`/waiting/${k}`);z(t)}catch(e){console.error(e),C("Не получилось загрузить результат.")}}()},[k,w]),N)return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("main",{className:"state-page",children:[(0,t.jsx)("div",{className:"state-brand",children:"между нами"}),(0,t.jsxs)("h1",{children:["что-то пошло",(0,t.jsx)("br",{}),"не так"]}),(0,t.jsx)("p",{children:N})]}),(0,t.jsx)(i.default,{id:m.__hash,children:m})]});if(!S)return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("main",{className:"loading-page",children:[(0,t.jsxs)("div",{className:"loading-symbol",children:[(0,t.jsx)("span",{}),(0,t.jsx)("i",{children:"♥"}),(0,t.jsx)("span",{})]}),(0,t.jsx)("div",{className:"state-brand",children:"между нами"}),(0,t.jsx)("p",{children:"собираем вас двоих"})]}),(0,t.jsx)(i.default,{id:m.__hash,children:m})]});let F=S.comparisons??[],D=function(e){let t=new Map;for(let e of n)t.set(e.id,0);for(let i of e){let e="same"===i.similarity?2:"close"===i.similarity?1.35:.65,r=[...i.traitsA,...i.traitsB];for(let i of n)for(let s of r)i.traits.includes(s)&&t.set(i.id,(t.get(i.id)??0)+e)}let i=e.filter(e=>"different"===e.similarity).length,r=e.filter(e=>"same"===e.similarity).length;e.length>0&&i>r&&t.set("sun_moon",(t.get("sun_moon")??0)+4);let s=n[0],o=t.get(s.id)??0;for(let e of n){let i=t.get(e.id)??0;i>o&&(s=e,o=i)}return{id:s.id,title:s.title,emojiA:s.emojiA,emojiB:s.emojiB,description:s.description}}(F),A=S.scores?.overall??function(e){if(0===e.length)return 0;let t=0;for(let i of e)"same"===i.similarity&&(t+=1),"close"===i.similarity&&(t+=.5);return Math.round(t/e.length*100)}(F),R=S.scores?.dimensions,E=S.scores?.differentAnswers??F.filter(e=>"different"===e.similarity).length,B=S.scores?.closeAnswers??F.filter(e=>"close"===e.similarity).length,T=S.couple.partner_a_name,G=S.couple.partner_b_name,O=[{kind:"views",eyebrow:"ВЗГЛЯДЫ",title:"Как вы смотрите на отношения",value:R?.views??A},{kind:"care",eyebrow:"ЗАБОТА",title:"Как вы проявляете заботу",value:R?.care??A},{kind:"communication",eyebrow:"ОБЩЕНИЕ",title:"Как вы говорите о важном",value:R?.communication??A},{kind:"rhythm",eyebrow:"ВРЕМЯ ВМЕСТЕ",title:"Как вам нравится быть вместе",value:R?.rhythm??A},{kind:"space",eyebrow:"СВОБОДА",title:"Сколько пространства нужно каждому",value:R?.space??A}];return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("main",{className:"page",children:[(0,t.jsxs)("header",{className:"header shell",children:[(0,t.jsx)("div",{className:"brand",children:"между нами"}),(0,t.jsxs)("div",{className:"header-couple",children:[(0,t.jsx)("span",{children:T}),(0,t.jsx)("b",{children:"×"}),(0,t.jsx)("span",{children:G})]})]}),(0,t.jsxs)("section",{className:"intro shell",children:[(0,t.jsx)("div",{className:"kicker",children:"ВАШ РЕЗУЛЬТАТ"}),(0,t.jsxs)("div",{className:"intro-grid",children:[(0,t.jsxs)("h1",{children:["Вот как",(0,t.jsx)("br",{}),"вы совпали."]}),(0,t.jsx)("p",{children:"пять сторон ваших отношений — без оценок «хорошо» или «плохо»"})]})]}),(0,t.jsx)("section",{className:"dimensions shell",children:O.map(e=>(0,t.jsx)(o,{item:e},e.kind))}),(0,t.jsxs)("section",{className:"type-section shell",children:[(0,t.jsxs)("div",{className:"type-heading",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"kicker",children:"ВАШ ТИП ПАРЫ"}),(0,t.jsx)("h2",{children:(e=D.id,a=D.title,({knight_princess:"Рыцарь × Принцесса",wizards:"Волшебник × Волшебник",pirates:"Пират × Пират",astronauts:"Космонавт × Космонавт",sun_moon:"Солнце × Луна",dragon_keeper:"Дракон × Хранитель",players:"Игрок × Игрок",homekeepers:"Дом × Дом"})[e]??a)})]}),(0,t.jsxs)("span",{className:"type-number",children:["№",p(D.id)]})]}),(0,t.jsxs)("div",{className:"poster",children:[(0,t.jsx)(d,{archetypeId:D.id}),(0,t.jsx)("div",{className:"poster-info",children:(0,t.jsxs)("div",{className:"poster-caption",children:[(0,t.jsxs)("span",{children:["ПАРА №",p(D.id)]}),(0,t.jsx)("p",{children:{knight_princess:"Заботитесь по-разному, но своих не бросаете.",wizards:"Замечаете больше, чем успеваете сказать вслух.",pirates:"Маршрут меняется. Команда остаётся.",astronauts:"Две орбиты. Один маршрут.",sun_moon:"Чувствуете по-разному — дополняете друг друга.",dragon_keeper:"Один добавляет огня. Другой держит курс.",players:"Разный стиль игры. Одна команда.",homekeepers:"Своё место. Свой человек."}[D.id]??"Два человека. Одна история."})]})})]})]}),(0,t.jsx)("section",{className:"paywall",children:(0,t.jsxs)("div",{className:"paywall-inner shell",children:[(0,t.jsxs)("div",{className:"paywall-topline",children:[(0,t.jsx)("span",{children:"ЭТО ТОЛЬКО ПОВЕРХНОСТЬ"}),(0,t.jsx)("b",{children:"✦"})]}),(0,t.jsxs)("div",{className:"paywall-grid",children:[(0,t.jsxs)("div",{className:"paywall-copy",children:[(0,t.jsxs)("h2",{children:["А где вы",(0,t.jsx)("br",{}),"можете стать",(0,t.jsx)("br",{}),"ближе?"]}),(0,t.jsx)("p",{children:"Мы сравнили ваши ответы глубже и нашли то, чего не видно в процентах."})]}),(0,t.jsxs)("div",{className:"teaser",children:[(0,t.jsxs)("div",{className:"finding-count",children:[(0,t.jsx)("span",{children:"МЫ НАШЛИ"}),(0,t.jsx)("strong",{children:(l=E,c=B,l>0?l:c>0?c:3)}),(0,t.jsx)("p",{children:(x=E,u=B,x>0?(y=(f=x)%10,b=f%100,1===y&&11!==b?"место, где ваши ответы особенно расходятся":y>=2&&y<=4&&!(b>=12&&b<=14)?"места, где ваши ответы особенно расходятся":"мест, где ваши ответы особенно расходятся"):u>0?(v=(g=u)%10,j=g%100,1===v&&11!==j?"неочевидное различие между вашими ответами":v>=2&&v<=4&&!(j>=12&&j<=14)?"неочевидных различия между вашими ответами":"неочевидных различий между вашими ответами"):"важные детали, которые не видно на поверхности")})]}),(0,t.jsx)(h,{children:"Что партнёр может ждать от вас, но не говорить"}),(0,t.jsx)(h,{children:"Где вы по-разному понимаете заботу"}),(0,t.jsx)(h,{children:"Из-за чего один может чувствовать себя непонятым"}),(0,t.jsx)(h,{children:"Что у вашей пары уже работает особенно хорошо"}),(0,t.jsxs)("button",{type:"button",onClick:()=>w.push(`/report/${k}`),children:[(0,t.jsx)("span",{children:"открыть наш разбор"}),(0,t.jsx)("strong",{children:"299 ₽"}),(0,t.jsx)("b",{children:"→"})]}),(0,t.jsx)("div",{className:"paywall-footnote",children:"один разбор · для вас двоих"})]})]})]})})]}),(0,t.jsx)(i.default,{id:m.__hash,children:m})]})}],95801)},16015,(e,t,i)=>{},18566,(e,t,i)=>{t.exports=e.r(76562)},98547,(e,t,i)=>{var r=e.i(47167);e.r(16015);var s=e.r(71645),n=s&&"object"==typeof s&&"default"in s?s:{default:s},o=void 0!==r.default&&r.default.env&&!0,a=function(e){return"[object String]"===Object.prototype.toString.call(e)},l=function(){function e(e){var t=void 0===e?{}:e,i=t.name,r=void 0===i?"stylesheet":i,s=t.optimizeForSpeed,n=void 0===s?o:s;p(a(r),"`name` must be a string"),this._name=r,this._deletedRulePlaceholder="#"+r+"-deleted-rule____{}",p("boolean"==typeof n,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=n,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0;var l="u">typeof window&&document.querySelector('meta[property="csp-nonce"]');this._nonce=l?l.getAttribute("content"):null}var t,i=e.prototype;return i.setOptimizeForSpeed=function(e){p("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),p(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},i.isOptimizeForSpeed=function(){return this._optimizeForSpeed},i.inject=function(){var e=this;if(p(!this._injected,"sheet already injected"),this._injected=!0,"u">typeof window&&this._optimizeForSpeed){this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),this._optimizeForSpeed||(o||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0);return}this._serverSheet={cssRules:[],insertRule:function(t,i){return"number"==typeof i?e._serverSheet.cssRules[i]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),i},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},i.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},i.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},i.insertRule=function(e,t){if(p(a(e),"`insertRule` accepts only strings"),"u"<typeof window)return"number"!=typeof t&&(t=this._serverSheet.cssRules.length),this._serverSheet.insertRule(e,t),this._rulesCount++;if(this._optimizeForSpeed){var i=this.getSheet();"number"!=typeof t&&(t=i.cssRules.length);try{i.insertRule(e,t)}catch(t){return o||console.warn("StyleSheet: illegal rule: \n\n"+e+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var r=this._tags[t];this._tags.push(this.makeStyleTag(this._name,e,r))}return this._rulesCount++},i.replaceRule=function(e,t){if(this._optimizeForSpeed||"u"<typeof window){var i="u">typeof window?this.getSheet():this._serverSheet;if(t.trim()||(t=this._deletedRulePlaceholder),!i.cssRules[e])return e;i.deleteRule(e);try{i.insertRule(t,e)}catch(r){o||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),i.insertRule(this._deletedRulePlaceholder,e)}}else{var r=this._tags[e];p(r,"old rule at index `"+e+"` not found"),r.textContent=t}return e},i.deleteRule=function(e){if("u"<typeof window)return void this._serverSheet.deleteRule(e);if(this._optimizeForSpeed)this.replaceRule(e,"");else{var t=this._tags[e];p(t,"rule at index `"+e+"` not found"),t.parentNode.removeChild(t),this._tags[e]=null}},i.flush=function(){this._injected=!1,this._rulesCount=0,"u">typeof window?(this._tags.forEach(function(e){return e&&e.parentNode.removeChild(e)}),this._tags=[]):this._serverSheet.cssRules=[]},i.cssRules=function(){var e=this;return"u"<typeof window?this._serverSheet.cssRules:this._tags.reduce(function(t,i){return i?t=t.concat(Array.prototype.map.call(e.getSheetForTag(i).cssRules,function(t){return t.cssText===e._deletedRulePlaceholder?null:t})):t.push(null),t},[])},i.makeStyleTag=function(e,t,i){t&&p(a(t),"makeStyleTag accepts only strings as second parameter");var r=document.createElement("style");this._nonce&&r.setAttribute("nonce",this._nonce),r.type="text/css",r.setAttribute("data-"+e,""),t&&r.appendChild(document.createTextNode(t));var s=document.head||document.getElementsByTagName("head")[0];return i?s.insertBefore(r,i):s.appendChild(r),r},t=[{key:"length",get:function(){return this._rulesCount}}],function(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(e.prototype,t),e}();function p(e,t){if(!e)throw Error("StyleSheet: "+t+".")}var d=function(e){for(var t=5381,i=e.length;i;)t=33*t^e.charCodeAt(--i);return t>>>0},c={};function h(e,t){if(!t)return"jsx-"+e;var i=String(t),r=e+i;return c[r]||(c[r]="jsx-"+d(e+"-"+i)),c[r]}function m(e,t){"u"<typeof window&&(t=t.replace(/\/style/gi,"\\/style"));var i=e+t;return c[i]||(c[i]=t.replace(/__jsx-style-dynamic-selector/g,e)),c[i]}var x=function(){function e(e){var t=void 0===e?{}:e,i=t.styleSheet,r=void 0===i?null:i,s=t.optimizeForSpeed,n=void 0!==s&&s;this._sheet=r||new l({name:"styled-jsx",optimizeForSpeed:n}),this._sheet.inject(),r&&"boolean"==typeof n&&(this._sheet.setOptimizeForSpeed(n),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var t=e.prototype;return t.add=function(e){var t=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(e.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),"u">typeof window&&!this._fromServer&&(this._fromServer=this.selectFromServer(),this._instancesCounts=Object.keys(this._fromServer).reduce(function(e,t){return e[t]=0,e},{}));var i=this.getIdAndRules(e),r=i.styleId,s=i.rules;if(r in this._instancesCounts){this._instancesCounts[r]+=1;return}var n=s.map(function(e){return t._sheet.insertRule(e)}).filter(function(e){return -1!==e});this._indices[r]=n,this._instancesCounts[r]=1},t.remove=function(e){var t=this,i=this.getIdAndRules(e).styleId;if(function(e,t){if(!e)throw Error("StyleSheetRegistry: "+t+".")}(i in this._instancesCounts,"styleId: `"+i+"` not found"),this._instancesCounts[i]-=1,this._instancesCounts[i]<1){var r=this._fromServer&&this._fromServer[i];r?(r.parentNode.removeChild(r),delete this._fromServer[i]):(this._indices[i].forEach(function(e){return t._sheet.deleteRule(e)}),delete this._indices[i]),delete this._instancesCounts[i]}},t.update=function(e,t){this.add(t),this.remove(e)},t.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},t.cssRules=function(){var e=this,t=this._fromServer?Object.keys(this._fromServer).map(function(t){return[t,e._fromServer[t]]}):[],i=this._sheet.cssRules();return t.concat(Object.keys(this._indices).map(function(t){return[t,e._indices[t].map(function(e){return i[e].cssText}).join(e._optimizeForSpeed?"":"\n")]}).filter(function(e){return!!e[1]}))},t.styles=function(e){var t,i;return t=this.cssRules(),void 0===(i=e)&&(i={}),t.map(function(e){var t=e[0],r=e[1];return n.default.createElement("style",{id:"__"+t,key:"__"+t,nonce:i.nonce?i.nonce:void 0,dangerouslySetInnerHTML:{__html:r}})})},t.getIdAndRules=function(e){var t=e.children,i=e.dynamic,r=e.id;if(i){var s=h(r,i);return{styleId:s,rules:Array.isArray(t)?t.map(function(e){return m(s,e)}):[m(s,t)]}}return{styleId:h(r),rules:Array.isArray(t)?t:[t]}},t.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e,t){return e[t.id.slice(2)]=t,e},{})},e}(),u=s.createContext(null);function f(){return new x}function g(){return s.useContext(u)}u.displayName="StyleSheetContext";var y=n.default.useInsertionEffect||n.default.useLayoutEffect,b="u">typeof window?f():void 0;function v(e){var t=b||g();return t&&("u"<typeof window?t.add(e):y(function(){return t.add(e),function(){t.remove(e)}},[e.id,String(e.dynamic)])),null}v.dynamic=function(e){return e.map(function(e){return h(e[0],e[1])}).join(" ")},i.StyleRegistry=function(e){var t=e.registry,i=e.children,r=s.useContext(u),o=s.useState(function(){return r||t||f()})[0];return n.default.createElement(u.Provider,{value:o},i)},i.createStyleRegistry=f,i.style=v,i.useStyleRegistry=g},37902,(e,t,i)=>{t.exports=e.r(98547).style}]);