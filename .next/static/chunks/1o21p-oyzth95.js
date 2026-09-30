(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,95801,e=>{"use strict";var s=e.i(43476),t=e.i(37902),i=e.i(71645),a=e.i(18566);let r=[{id:"knight_princess",title:"Рыцарь и принцесса",emojiA:"⚔️",emojiB:"👑",description:"У вас много заботы в мелочах. Для этой пары любовь чаще видна не в громких словах, а в ощущении: «я рядом и помню о тебе».",traits:["care_practical","attention","warmth","initiative","support_action","physical_closeness","support_physical"]},{id:"astronauts",title:"Два космонавта",emojiA:"🚀",emojiB:"🪐",description:"У каждого может быть своя орбита, но вам важно знать, что маршрут всё равно общий. Близость для вас не обязательно означает быть вместе каждую минуту.",traits:["independence","personal_space_high","space_high","space_balanced","autonomy","value_independence","planning","need_future_alignment"]},{id:"wizards",title:"Два волшебника",emojiA:"🔮",emojiB:"✨",description:"Ваш главный инструмент — разговор. Вам важно не просто быть рядом, а понимать, что происходит внутри другого человека.",traits:["communication","emotional_sharing","support_listening","conflict_verbal_resolution","need_communication","need_deep_communication","value_communication","listening"]},{id:"pirates",title:"Два пирата",emojiA:"🏴‍☠️",emojiB:"🗺️",description:"Вашей паре особенно идёт ощущение приключения. Планы хороши, но иногда лучший план — придумать всё по дороге.",traits:["spontaneity","shared_experience","activity","need_spontaneity","need_novelty","flexibility","money_experience","money_present"]},{id:"sun_moon",title:"Солнце и Луна",emojiA:"☀️",emojiB:"🌙",description:"Вы не обязаны одинаково реагировать на всё. В вашей паре особенно заметно, как разные способы чувствовать и действовать могут существовать рядом.",traits:["support_proactive","support_space","space_high","closeness_high","independence","direct_communication","quiet_closeness","emotional_sharing"]},{id:"dragon_keeper",title:"Дракон и хранитель",emojiA:"🐉",emojiB:"🛡️",description:"В вашей динамике есть энергия и спокойствие. Один момент может проживаться ярко, другой — через паузу, действие или присутствие рядом.",traits:["emotion_intensity","self_regulation","support_available","support_presence","conflict_time_repair","indirect_repair","repair_delayed"]},{id:"players",title:"Два игрока",emojiA:"🎮",emojiB:"👾",description:"У вас есть важная суперсила — лёгкость. Юмор, свои приколы и ощущение команды помогают вам снова находить друг друга.",traits:["humor","playfulness","support_humor","conflict_humor_repair","micro_connection","value_playfulness","need_lightness","message_team"]},{id:"homekeepers",title:"Хранители дома",emojiA:"🕯️",emojiB:"🏡",description:"Сила вашей пары прячется в обычной жизни: знакомых ритуалах, спокойных вечерах и ощущении места, куда хочется возвращаться.",traits:["home_comfort","quiet_closeness","ritual","stability","value_ritual","need_stability","shared_life","message_everyday_love"]}];function n(){return(0,s.jsx)(t.default,{id:"e6ce027b4ee37d01",children:"html,body{background:#f2eee8!important;margin:0!important;padding:0!important}body{color:#211f20;font-family:Arial,Helvetica,Helvetica Neue,sans-serif}*{box-sizing:border-box}button,input{font:inherit}"})}function o({item:e,index:t}){var i,a;return(0,s.jsxs)("article",{className:"dimension-row",children:[(0,s.jsx)("span",{className:"dimension-number",children:String(t).padStart(2,"0")}),(0,s.jsx)(p,{kind:e.kind}),(0,s.jsxs)("div",{className:"dimension-content",children:[(0,s.jsxs)("div",{className:"dimension-main",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{children:e.title}),(0,s.jsx)("p",{children:e.subtitle})]}),(0,s.jsxs)("strong",{className:"dimension-value",children:[e.value,(0,s.jsx)("sup",{children:"%"})]})]}),(0,s.jsx)(l,{value:e.value}),(0,s.jsx)("div",{className:"dimension-comment",children:(i=e.kind,a=e.value,"views"===i?a>=70?"В главном вы примерно об одном.":a>=40?"Основа похожа, детали — уже нет.":"От отношений вы можете ждать довольно разных вещей.":"care"===i?a>=70?"Вы хорошо считываете заботу друг друга.":a>=40?"Заботитесь оба, но показываете это по-разному.":"Один может стараться, а второй этого не замечать.":"communication"===i?a>=70?"Разговаривать о сложном вам обычно удобно похожим способом.":a>=40?"В сложном разговоре вам иногда нужны разные вещи.":"Когда становится сложно, ваши реакции заметно расходятся.":"rhythm"===i?a>=70?"Ваш хороший день вдвоём выглядит довольно похоже.":a>=40?"Вместе вам хорошо, но сценарии отдыха совпадают не всегда.":"То, что для одного отдых, для другого может быть вообще не отдыхом.":a>=70?"Вы похоже чувствуете, когда быть вместе, а когда разойтись по своим делам.":a>=40?"Иногда одному нужно больше близости, а другому — больше воздуха.":"Количество нужного личного пространства у вас заметно различается.")})]})]})}function l({value:e}){let t=Math.round(e/10);return(0,s.jsx)("div",{className:"segments",children:Array.from({length:10}).map((e,i)=>(0,s.jsx)("span",{className:i<t?"active":""},i))})}function p({kind:e}){return"views"===e?(0,s.jsxs)("div",{className:"dimension-mark mark-views",children:[(0,s.jsx)("span",{}),(0,s.jsx)("span",{})]}):"care"===e?(0,s.jsx)("div",{className:"dimension-mark mark-care",children:(0,s.jsx)("b",{children:"+"})}):"communication"===e?(0,s.jsxs)("div",{className:"dimension-mark mark-talk",children:[(0,s.jsx)("span",{}),(0,s.jsx)("span",{})]}):"rhythm"===e?(0,s.jsx)("div",{className:"dimension-mark mark-rhythm",children:(0,s.jsx)("span",{children:"~"})}):(0,s.jsxs)("div",{className:"dimension-mark mark-space",children:[(0,s.jsx)("span",{}),(0,s.jsx)("span",{})]})}function d({archetypeId:e}){return(0,s.jsxs)("div",{className:"art",children:[(0,s.jsx)("div",{className:"art-label",children:m(e)}),(0,s.jsx)("span",{className:"star star-a",children:"✦"}),(0,s.jsx)("span",{className:"star star-b",children:"+"}),(0,s.jsx)("span",{className:"star star-c",children:"✦"}),(0,s.jsx)("div",{className:"orbit orbit-a"}),(0,s.jsx)("div",{className:"orbit orbit-b"}),(0,s.jsxs)("div",{className:"planet",children:[(0,s.jsx)("span",{}),(0,s.jsx)("span",{}),(0,s.jsx)("span",{})]}),(0,s.jsxs)("div",{className:"ground",children:[(0,s.jsx)("span",{}),(0,s.jsx)("span",{}),(0,s.jsx)("span",{})]}),(0,s.jsx)(h,{side:"left"}),(0,s.jsx)(h,{side:"right"}),(0,s.jsx)("div",{className:"art-heart",children:"♥"})]})}function h({side:e}){return(0,s.jsxs)("div",{className:`astronaut ${e}`,children:[(0,s.jsx)("div",{className:"backpack"}),(0,s.jsx)("div",{className:"helmet",children:(0,s.jsxs)("div",{className:"visor",children:[(0,s.jsx)("i",{}),(0,s.jsx)("i",{}),(0,s.jsx)("span",{})]})}),(0,s.jsx)("div",{className:"body",children:(0,s.jsxs)("div",{className:"panel",children:[(0,s.jsx)("i",{}),(0,s.jsx)("i",{})]})}),(0,s.jsx)("div",{className:"arm outside"}),(0,s.jsx)("div",{className:"arm inside"}),(0,s.jsx)("div",{className:"leg leg-a"}),(0,s.jsx)("div",{className:"leg leg-b"})]})}function c({number:e,children:t}){return(0,s.jsxs)("div",{className:"locked-row",children:[(0,s.jsx)("span",{className:"locked-number",children:e}),(0,s.jsx)("p",{children:t}),(0,s.jsx)("span",{className:"locked-status",children:"ЗАКРЫТО"})]})}function x(e){return({knight_princess:"01",wizards:"02",pirates:"03",astronauts:"04",sun_moon:"05",dragon_keeper:"06",players:"07",homekeepers:"08"})[e]??"00"}function m(e){return({knight_princess:"СВОИХ НЕ БРОСАЕМ",wizards:"МЕЖДУ СТРОК",pirates:"ОДНА КОМАНДА",astronauts:"ДВЕ ОРБИТЫ / ОДИН МАРШРУТ",sun_moon:"РАЗНЫЕ СТОРОНЫ ОДНОГО НЕБА",dragon_keeper:"ОГОНЬ + СПОКОЙСТВИЕ",players:"CO-OP MODE",homekeepers:"СВОЁ МЕСТО"})[e]??"МЕЖДУ ВАМИ"}let g=`

.result-page {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  background: #F2EEE8;
  overflow: hidden;
}

.result-shell {
  width: min(calc(100% - 36px), 760px);
  margin: 0 auto;
}

/* HEADER */

.result-header {
  height: 58px !important;
  min-height: 58px !important;
  max-height: 58px !important;

  padding: 0 !important;
  margin: 0 auto !important;

  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;

  border-bottom: 1px solid #BEB8B4;

  background: transparent !important;
}

.result-brand {
  font-size: 20px;
  font-weight: 900;
  line-height: 1;

  letter-spacing: -0.07em;
}

.result-names {
  display: flex;
  align-items: center;
  gap: 8px;

  color: #686164;

  font-size: 8px;
  font-weight: 800;

  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.result-names b {
  color: #B13A63;
}

/* HERO */

.result-hero {
  padding: 27px 0 25px;
}

.result-index,
.section-head {
  font-size: 7px;
  font-weight: 900;

  letter-spacing: 0.18em;
}

.result-index {
  color: #B13A63;
}

.result-hero-grid {
  display: grid;

  grid-template-columns: 1fr 175px;

  gap: 30px;

  align-items: end;

  margin-top: 14px;
}

.result-hero h1 {
  margin: 0;

  font-size: clamp(45px, 8vw, 67px);
  font-weight: 900;

  line-height: 0.83;

  letter-spacing: -0.075em;
}

.result-score {
  padding-left: 18px;

  border-left: 1px solid #BEB8B4;
}

.result-score > span {
  display: block;

  margin-bottom: 3px;

  color: #777074;

  font-size: 7px;
  font-weight: 900;

  letter-spacing: 0.18em;
}

.result-score strong {
  display: block;

  color: #B13A63;

  font-size: 59px;
  font-weight: 900;

  line-height: 0.9;

  letter-spacing: -0.075em;
}

.result-score sup {
  font-size: 0.4em;
}

.result-score p {
  margin: 7px 0 0;

  color: #7E777A;

  font-size: 8px;
  font-weight: 600;

  line-height: 1.35;
}

.result-quick {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  margin-top: 22px;

  border-top: 1px solid #BEB8B4;
  border-bottom: 1px solid #BEB8B4;
}

.result-quick > div {
  display: flex;

  align-items: center;

  gap: 9px;

  min-height: 54px;

  padding: 8px 13px;
}

.result-quick > div + div {
  border-left: 1px solid #BEB8B4;
}

.result-quick strong {
  color: #B13A63;

  font-size: 25px;
  font-weight: 900;

  letter-spacing: -0.06em;
}

.result-quick span {
  max-width: 80px;

  color: #6E676A;

  font-size: 7px;
  font-weight: 700;

  line-height: 1.25;
}

/* SECTION */

.section-head {
  display: flex;

  align-items: center;
  justify-content: space-between;

  padding-bottom: 8px;

  border-bottom: 2px solid #242123;

  color: #242123;
}

.section-head b {
  color: #B13A63;

  font-size: 8px;
}

/* BREAKDOWN */

.result-breakdown {
  padding-bottom: 27px;
}

.dimension-row {
  display: grid;

  grid-template-columns: 25px 45px 1fr;

  gap: 12px;

  align-items: center;

  padding: 14px 0;

  border-bottom: 1px solid #C8C1BD;
}

.dimension-number {
  align-self: start;

  padding-top: 3px;

  color: #AAA2A4;

  font-size: 7px;
  font-weight: 800;
}

.dimension-mark {
  position: relative;

  width: 38px;
  height: 38px;
}

.mark-views span {
  position: absolute;

  top: 11px;

  width: 23px;
  height: 14px;

  border: 2px solid #252225;

  border-radius: 50%;
}

.mark-views span:first-child {
  left: 0;
}

.mark-views span:last-child {
  right: 0;

  border-color: #B13A63;
}

.mark-care {
  display: flex;

  align-items: center;
  justify-content: center;

  border: 2px solid #252225;

  border-radius: 50%;
}

.mark-care b {
  color: #B13A63;

  font-size: 25px;
  font-weight: 500;
}

.mark-talk span {
  position: absolute;

  width: 26px;
  height: 18px;

  border: 2px solid #252225;
}

.mark-talk span:first-child {
  top: 3px;
  left: 0;
}

.mark-talk span:last-child {
  right: 0;
  bottom: 3px;

  border-color: #B13A63;
}

.mark-rhythm {
  display: flex;

  align-items: center;
  justify-content: center;
}

.mark-rhythm span {
  font-size: 49px;
  font-weight: 300;

  line-height: 1;

  transform: rotate(-8deg);
}

.mark-space span {
  position: absolute;

  top: 7px;

  width: 25px;
  height: 25px;

  border: 2px solid #252225;

  border-radius: 50%;
}

.mark-space span:first-child {
  left: 0;

  background: #E2AE45;
}

.mark-space span:last-child {
  right: 0;

  background: #8E789D;
}

.dimension-content {
  min-width: 0;
}

.dimension-main {
  display: grid;

  grid-template-columns: 1fr auto;

  gap: 16px;

  align-items: end;
}

.dimension-main h3 {
  margin: 0;

  font-size: 17px;
  font-weight: 900;

  line-height: 1;

  letter-spacing: -0.045em;
}

.dimension-main p {
  margin: 3px 0 0;

  color: #777074;

  font-size: 8px;
  font-weight: 600;
}

.dimension-value {
  color: #B13A63;

  font-size: 28px;
  font-weight: 900;

  line-height: 0.9;

  letter-spacing: -0.06em;
}

.dimension-value sup {
  font-size: 0.45em;
}

.segments {
  display: grid;

  grid-template-columns: repeat(10, 1fr);

  gap: 4px;

  margin-top: 9px;
}

.segments span {
  height: 5px;

  background: #DAD3CF;
}

.segments span.active {
  background: #B13A63;
}

.dimension-comment {
  margin-top: 6px;

  color: #514B4E;

  font-size: 8px;
  font-weight: 700;

  line-height: 1.3;
}

/* TYPE */

.result-type {
  padding-bottom: 30px;
}

.type-title-row {
  display: grid;

  grid-template-columns: 1fr 220px;

  gap: 25px;

  align-items: end;

  padding: 17px 0 13px;
}

.type-title-row > div > span {
  color: #B13A63;

  font-size: 7px;
  font-weight: 900;

  letter-spacing: 0.16em;
}

.type-title-row h2 {
  margin: 4px 0 0;

  font-size: clamp(34px, 6vw, 48px);
  font-weight: 900;

  line-height: 0.88;

  letter-spacing: -0.065em;
}

.type-title-row > p {
  margin: 0 0 2px;

  color: #5F585B;

  font-size: 10px;
  font-weight: 700;

  line-height: 1.35;
}

.type-poster {
  overflow: hidden;

  border: 2px solid #242124;

  background: #F7F1EB;

  box-shadow: 6px 6px 0 #CDBDC3;
}

.poster-strip {
  min-height: 41px;

  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 20px;

  padding: 8px 13px;

  border-top: 2px solid #242124;
}

.poster-strip span {
  color: #777074;

  font-size: 6px;
  font-weight: 900;

  letter-spacing: 0.13em;
}

.poster-strip strong {
  color: #B13A63;

  font-size: 8px;
  font-weight: 900;

  letter-spacing: 0.04em;

  text-align: right;
}

/* ART */

.art {
  position: relative;

  height: 290px;

  overflow: hidden;

  background: #393440;
}

.art-label {
  position: absolute;

  z-index: 20;

  top: 12px;
  left: 12px;

  padding: 6px 8px;

  background: #F2EEE8;

  color: #282428;

  font-size: 7px;
  font-weight: 900;

  letter-spacing: 0.06em;
}

.star {
  position: absolute;

  z-index: 3;

  font-style: normal;
}

.star-a {
  top: 18%;
  left: 15%;

  color: #E7B246;

  font-size: 25px;
}

.star-b {
  top: 39%;
  left: 8%;

  color: #907B9D;

  font-size: 20px;
}

.star-c {
  top: 22%;
  right: 13%;

  color: #CC6B8D;

  font-size: 19px;
}

.orbit {
  position: absolute;

  left: 50%;

  border: 1px solid rgba(245, 234, 224, 0.25);

  border-radius: 50%;
}

.orbit-a {
  top: 68px;

  width: 490px;
  height: 125px;

  transform: translateX(-50%) rotate(-13deg);
}

.orbit-b {
  top: 78px;

  width: 430px;
  height: 145px;

  transform: translateX(-50%) rotate(17deg);
}

.planet {
  position: absolute;

  top: 28px;
  left: 50%;

  width: 137px;
  height: 137px;

  border: 4px solid #27232B;

  border-radius: 50%;

  background: #C2B0CF;

  box-shadow: 7px 7px 0 rgba(25, 21, 28, 0.24);

  transform: translateX(-50%);
}

.planet span {
  position: absolute;

  border: 3px solid rgba(72, 58, 77, 0.28);

  border-radius: 50%;
}

.planet span:first-child {
  top: 23px;
  left: 20px;

  width: 34px;
  height: 19px;
}

.planet span:nth-child(2) {
  top: 65px;
  right: 18px;

  width: 24px;
  height: 31px;
}

.planet span:last-child {
  bottom: 18px;
  left: 52px;

  width: 23px;
  height: 16px;
}

.ground {
  position: absolute;

  left: -9%;
  right: -9%;
  bottom: -139px;

  height: 240px;

  border: 4px solid #27232B;

  border-radius: 50% 50% 0 0;

  background: #81718C;
}

.ground span {
  position: absolute;

  border: 3px solid #554A5E;

  border-radius: 50%;

  background: #695C73;
}

.ground span:first-child {
  top: 28px;
  left: 17%;

  width: 55px;
  height: 30px;
}

.ground span:nth-child(2) {
  top: 65px;
  left: 47%;

  width: 80px;
  height: 35px;
}

.ground span:last-child {
  top: 27px;
  right: 16%;

  width: 45px;
  height: 25px;
}

/* ASTRONAUT */

.astronaut {
  position: absolute;

  z-index: 5;

  bottom: 25px;

  width: 135px;
  height: 205px;

  transform-origin: bottom center;
}

.astronaut.left {
  left: calc(50% - 142px);

  transform: scale(0.82) rotate(2deg);
}

.astronaut.right {
  right: calc(50% - 142px);

  transform: scale(0.82) rotate(-2deg);
}

.backpack {
  position: absolute;

  top: 75px;
  left: 4px;

  width: 48px;
  height: 84px;

  border: 4px solid #29242C;

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

  border: 4px solid #29242C;

  border-radius: 47%;

  background: #F0E7DD;

  transform: translateX(-50%);
}

.visor {
  position: absolute;

  top: 17px;
  left: 14px;

  width: 59px;
  height: 47px;

  border: 4px solid #29242C;

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

  border-bottom: 2px solid #F2D4A5;

  border-radius: 0 0 50% 50%;

  transform: translateX(-50%);
}

.body {
  position: absolute;

  z-index: 5;

  top: 76px;
  left: 50%;

  width: 88px;
  height: 88px;

  border: 4px solid #29242C;

  border-radius: 14px 14px 27px 27px;

  background: #F0E7DD;

  transform: translateX(-50%);
}

.panel {
  position: absolute;

  top: 25px;
  left: 50%;

  width: 38px;
  height: 26px;

  border: 3px solid #29242C;

  background: #C35078;

  transform: translateX(-50%);
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

  border: 4px solid #29242C;

  border-radius: 14px;

  background: #F0E7DD;
}

.astronaut.left .outside {
  left: -20px;

  transform: rotate(27deg);
}

.astronaut.left .inside {
  right: -34px;

  width: 76px;

  transform: rotate(-11deg);
}

.astronaut.right .outside {
  right: -20px;

  transform: rotate(-27deg);
}

.astronaut.right .inside {
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

  border: 4px solid #29242C;

  border-radius: 10px 10px 18px 18px;

  background: #F0E7DD;
}

.leg-a {
  left: 25px;

  transform: rotate(5deg);
}

.leg-b {
  right: 25px;

  transform: rotate(-5deg);
}

.art-heart {
  position: absolute;

  z-index: 10;

  top: 141px;
  left: 50%;

  color: #D04F78;

  font-size: 27px;

  transform: translateX(-50%);
}

/* PAYWALL */

.result-paywall {
  padding: 29px 0 32px;

  background: #272328;

  color: #F7F0EA;
}

.paywall-top {
  display: flex;

  align-items: center;
  justify-content: space-between;

  padding-bottom: 9px;

  border-bottom: 2px solid #F7F0EA;

  color: #E17C9E;

  font-size: 7px;
  font-weight: 900;

  letter-spacing: 0.18em;
}

.paywall-top b {
  color: #E7B246;
}

.paywall-grid {
  display: grid;

  grid-template-columns: 0.88fr 1.12fr;

  gap: 35px;

  padding-top: 22px;
}

.paywall-left {
  position: relative;
}

.paywall-sticker {
  width: 82px;
  height: 82px;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  margin-bottom: 15px;

  border-radius: 50%;

  background: #E7B246;

  color: #272328;

  font-size: 6px;
  font-weight: 900;

  letter-spacing: 0.1em;

  transform: rotate(-7deg);
}

.paywall-sticker strong {
  display: block;

  font-size: 34px;
  font-weight: 900;

  line-height: 0.9;

  letter-spacing: -0.07em;
}

.paywall-left h2 {
  margin: 0;

  font-size: clamp(39px, 6vw, 52px);
  font-weight: 900;

  line-height: 0.84;

  letter-spacing: -0.07em;
}

.paywall-left > p {
  max-width: 225px;

  margin: 14px 0 0;

  color: #B9AEB4;

  font-size: 9px;
  font-weight: 600;

  line-height: 1.45;
}

.paywall-hook {
  margin-bottom: 5px;

  padding: 13px;

  border: 1px solid #D86E92;

  background: #342D35;
}

.paywall-hook span {
  display: block;

  margin-bottom: 5px;

  color: #D86E92;

  font-size: 6px;
  font-weight: 900;

  letter-spacing: 0.15em;
}

.paywall-hook strong {
  display: block;

  font-size: 15px;
  font-weight: 800;

  line-height: 1.15;

  letter-spacing: -0.025em;
}

.locked-row {
  display: grid;

  grid-template-columns: 23px 1fr auto;

  gap: 10px;

  align-items: center;

  min-height: 48px;

  border-bottom: 1px solid rgba(255,255,255,0.13);
}

.locked-number {
  color: #E17C9E;

  font-size: 7px;
  font-weight: 900;
}

.locked-row p {
  margin: 0;

  color: #F3EBEF;

  font-size: 9px;
  font-weight: 700;

  line-height: 1.25;
}

.locked-status {
  color: #716971;

  font-size: 6px;
  font-weight: 900;

  letter-spacing: 0.1em;
}

.result-buy {
  width: 100%;

  display: grid;

  grid-template-columns: 1fr auto auto;

  gap: 13px;

  align-items: center;

  margin-top: 13px;

  padding: 15px;

  border: 0;

  background: #B63B67;

  color: white;

  cursor: pointer;

  text-align: left;
}

.result-buy:hover {
  background: #C84372;
}

.result-buy span {
  font-size: 9px;
  font-weight: 900;

  letter-spacing: -0.01em;
}

.result-buy strong {
  white-space: nowrap;

  font-size: 13px;
  font-weight: 900;
}

.result-buy b {
  font-size: 20px;
}

.buy-note {
  margin-top: 7px;

  color: #766D75;

  font-size: 6px;
  font-weight: 700;

  letter-spacing: 0.06em;

  text-align: center;
}

/* STATE */

.result-state {
  width: 100%;
  min-height: 100svh;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  padding: 30px;

  background: #F2EEE8;

  text-align: center;
}

.state-brand {
  font-size: 23px;
  font-weight: 900;

  letter-spacing: -0.07em;
}

.result-state h1 {
  max-width: 400px;

  margin: 22px 0 8px;

  font-size: 43px;
  font-weight: 900;

  line-height: 0.9;

  letter-spacing: -0.065em;
}

.result-state p {
  color: #777074;

  font-size: 9px;
  font-weight: 700;
}

.state-mark {
  display: flex;

  margin-bottom: 20px;
}

.state-mark span {
  width: 44px;
  height: 44px;

  border: 3px solid #272328;

  border-radius: 50%;
}

.state-mark span:last-child {
  margin-left: -12px;

  border-color: #B13A63;
}

/* MOBILE */

@media (max-width: 650px) {

  .result-shell {
    width: calc(100% - 26px);
  }

  .result-header {
    width: calc(100% - 26px);

    height: 52px !important;
    min-height: 52px !important;
    max-height: 52px !important;
  }

  .result-brand {
    font-size: 18px;
  }

  .result-names {
    font-size: 7px;
  }

  .result-hero {
    padding: 21px 0 20px;
  }

  .result-hero-grid {
    grid-template-columns: 1fr 105px;

    gap: 14px;

    margin-top: 10px;
  }

  .result-hero h1 {
    font-size: clamp(39px, 12vw, 53px);
  }

  .result-score {
    padding-left: 10px;
  }

  .result-score strong {
    font-size: 44px;
  }

  .result-score p {
    font-size: 6px;
  }

  .result-quick {
    margin-top: 17px;
  }

  .result-quick > div {
    display: block;

    min-height: 53px;

    padding: 8px;
  }

  .result-quick strong {
    display: block;

    margin-bottom: 3px;

    font-size: 22px;
  }

  .result-quick span {
    display: block;

    font-size: 6px;
  }

  .dimension-row {
    grid-template-columns: 17px 35px 1fr;

    gap: 7px;

    padding: 12px 0;
  }

  .dimension-mark {
    width: 31px;
    height: 31px;

    transform: scale(0.8);
    transform-origin: left center;
  }

  .dimension-main h3 {
    font-size: 15px;
  }

  .dimension-main p {
    max-width: 180px;

    font-size: 7px;
  }

  .dimension-value {
    font-size: 23px;
  }

  .segments {
    gap: 2px;

    margin-top: 7px;
  }

  .segments span {
    height: 4px;
  }

  .dimension-comment {
    font-size: 7px;
  }

  .type-title-row {
    grid-template-columns: 1fr;

    gap: 7px;

    padding: 14px 0 10px;
  }

  .type-title-row h2 {
    font-size: 34px;
  }

  .type-title-row > p {
    max-width: 310px;

    font-size: 8px;
  }

  .art {
    height: 235px;
  }

  .planet {
    top: 23px;

    width: 108px;
    height: 108px;
  }

  .astronaut {
    bottom: 13px;
  }

  .astronaut.left {
    left: calc(50% - 110px);

    transform: scale(0.68) rotate(2deg);
  }

  .astronaut.right {
    right: calc(50% - 110px);

    transform: scale(0.68) rotate(-2deg);
  }

  .art-heart {
    top: 116px;

    font-size: 23px;
  }

  .poster-strip {
    padding: 8px 10px;
  }

  .poster-strip strong {
    max-width: 155px;
  }

  .result-paywall {
    padding: 24px 0 27px;
  }

  .paywall-grid {
    grid-template-columns: 1fr;

    gap: 17px;

    padding-top: 17px;
  }

  .paywall-left {
    display: grid;

    grid-template-columns: 64px 1fr;

    column-gap: 13px;

    align-items: center;
  }

  .paywall-sticker {
    grid-row: 1 / 3;

    width: 62px;
    height: 62px;

    margin: 0;
  }

  .paywall-sticker strong {
    font-size: 27px;
  }

  .paywall-left h2 {
    font-size: 37px;
  }

  .paywall-left > p {
    margin: 7px 0 0;

    font-size: 8px;
  }

  .locked-row {
    grid-template-columns: 20px 1fr;

    min-height: 45px;
  }

  .locked-status {
    display: none;
  }

  .result-buy {
    padding: 14px 12px;
  }

  .result-buy span {
    font-size: 8px;
  }

}

`;e.s(["default",0,function(){var e,l,p,h,u,f;let j=(0,a.useParams)(),_=(0,a.useRouter)(),b=j.coupleId,[w,y]=(0,i.useState)(null),[k,v]=(0,i.useState)("");if((0,i.useEffect)(()=>{!async function(){try{let e=await fetch(`/api/report?id=${encodeURIComponent(b)}`,{cache:"no-store"});if(!e.ok)throw Error("Не удалось загрузить результат");let s=await e.json();if(s.waiting)return void _.replace(`/waiting/${b}`);y(s)}catch(e){console.error(e),v("Не получилось загрузить результат.")}}()},[b,_]),k)return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("main",{className:`jsx-${g.__hash} result-state`,children:[(0,s.jsx)("div",{className:`jsx-${g.__hash} state-brand`,children:"между нами."}),(0,s.jsx)("h1",{className:`jsx-${g.__hash}`,children:"что-то пошло не так"}),(0,s.jsx)("p",{className:`jsx-${g.__hash}`,children:k})]}),(0,s.jsx)(n,{}),(0,s.jsx)(t.default,{id:g.__hash,children:g})]});if(!w)return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("main",{className:`jsx-${g.__hash} result-state`,children:[(0,s.jsxs)("div",{className:`jsx-${g.__hash} state-mark`,children:[(0,s.jsx)("span",{className:`jsx-${g.__hash}`}),(0,s.jsx)("span",{className:`jsx-${g.__hash}`})]}),(0,s.jsx)("div",{className:`jsx-${g.__hash} state-brand`,children:"между нами."}),(0,s.jsx)("p",{className:`jsx-${g.__hash}`,children:"собираем результат"})]}),(0,s.jsx)(n,{}),(0,s.jsx)(t.default,{id:g.__hash,children:g})]});let N=w.comparisons??[],$=function(e){let s=new Map;for(let e of r)s.set(e.id,0);for(let t of e){let e="same"===t.similarity?2:"close"===t.similarity?1.35:.65,i=[...t.traitsA,...t.traitsB];for(let t of r)for(let a of i)t.traits.includes(a)&&s.set(t.id,(s.get(t.id)??0)+e)}let t=e.filter(e=>"different"===e.similarity).length,i=e.filter(e=>"same"===e.similarity).length;e.length>0&&t>i&&s.set("sun_moon",(s.get("sun_moon")??0)+4);let a=r[0],n=s.get(a.id)??0;for(let e of r){let t=s.get(e.id)??0;t>n&&(a=e,n=t)}return{id:a.id,title:a.title,emojiA:a.emojiA,emojiB:a.emojiB,description:a.description}}(N),z=w.scores?.overall??function(e){if(!e.length)return 0;let s=0;for(let t of e)"same"===t.similarity&&(s+=1),"close"===t.similarity&&(s+=.5);return Math.round(s/e.length*100)}(N),B=w.scores?.dimensions,A=w.scores?.differentAnswers??N.filter(e=>"different"===e.similarity).length,E=w.scores?.closeAnswers??N.filter(e=>"close"===e.similarity).length,C=w.scores?.sameAnswers??N.filter(e=>"same"===e.similarity).length,D=w.couple.partner_a_name,F=w.couple.partner_b_name,q=[{kind:"views",title:"Взгляды",subtitle:"Как вы представляете отношения",value:B?.views??z},{kind:"care",title:"Забота",subtitle:"Что для каждого значит «я рядом»",value:B?.care??z},{kind:"communication",title:"Общение",subtitle:"Что происходит, когда надо поговорить",value:B?.communication??z},{kind:"rhythm",title:"Время вместе",subtitle:"Как выглядит хороший день вдвоём",value:B?.rhythm??z},{kind:"space",title:"Свобода",subtitle:"Сколько своего пространства нужно каждому",value:B?.space??z}],T=(e=A,l=E,e>0?e:l>0?l:3);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("main",{className:`jsx-${g.__hash} result-page`,children:[(0,s.jsxs)("header",{className:`jsx-${g.__hash} result-header result-shell`,children:[(0,s.jsx)("div",{className:`jsx-${g.__hash} result-brand`,children:"между нами."}),(0,s.jsxs)("div",{className:`jsx-${g.__hash} result-names`,children:[D,(0,s.jsx)("b",{className:`jsx-${g.__hash}`,children:"×"}),F]})]}),(0,s.jsxs)("section",{className:`jsx-${g.__hash} result-hero result-shell`,children:[(0,s.jsx)("div",{className:`jsx-${g.__hash} result-index`,children:"РЕЗУЛЬТАТ / 01"}),(0,s.jsxs)("div",{className:`jsx-${g.__hash} result-hero-grid`,children:[(0,s.jsxs)("h1",{className:`jsx-${g.__hash}`,children:["ВОТ КАК",(0,s.jsx)("br",{className:`jsx-${g.__hash}`}),"ВЫ СОВПАЛИ"]}),(0,s.jsxs)("div",{className:`jsx-${g.__hash} result-score`,children:[(0,s.jsx)("span",{className:`jsx-${g.__hash}`,children:"ОБЩАЯ"}),(0,s.jsxs)("strong",{className:`jsx-${g.__hash}`,children:[z,(0,s.jsx)("sup",{className:`jsx-${g.__hash}`,children:"%"})]}),(0,s.jsxs)("p",{className:`jsx-${g.__hash}`,children:["не оценка отношений.",(0,s.jsx)("br",{className:`jsx-${g.__hash}`}),"просто насколько похожи",(0,s.jsx)("br",{className:`jsx-${g.__hash}`}),"ваши ответы."]})]})]}),(0,s.jsxs)("div",{className:`jsx-${g.__hash} result-quick`,children:[(0,s.jsxs)("div",{className:`jsx-${g.__hash}`,children:[(0,s.jsx)("strong",{className:`jsx-${g.__hash}`,children:C}),(0,s.jsx)("span",{className:`jsx-${g.__hash}`,children:"ответов совпали"})]}),(0,s.jsxs)("div",{className:`jsx-${g.__hash}`,children:[(0,s.jsx)("strong",{className:`jsx-${g.__hash}`,children:E}),(0,s.jsx)("span",{className:`jsx-${g.__hash}`,children:"оказались близкими"})]}),(0,s.jsxs)("div",{className:`jsx-${g.__hash}`,children:[(0,s.jsx)("strong",{className:`jsx-${g.__hash}`,children:A}),(0,s.jsx)("span",{className:`jsx-${g.__hash}`,children:"заметно разошлись"})]})]})]}),(0,s.jsxs)("section",{className:`jsx-${g.__hash} result-breakdown result-shell`,children:[(0,s.jsxs)("div",{className:`jsx-${g.__hash} section-head`,children:[(0,s.jsx)("span",{className:`jsx-${g.__hash}`,children:"РАЗБИРАЕМ ПО ЧАСТЯМ"}),(0,s.jsx)("b",{className:`jsx-${g.__hash}`,children:"02"})]}),(0,s.jsx)("div",{className:`jsx-${g.__hash} dimension-list`,children:q.map((e,t)=>(0,s.jsx)(o,{item:e,index:t+1},e.kind))})]}),(0,s.jsxs)("section",{className:`jsx-${g.__hash} result-type result-shell`,children:[(0,s.jsxs)("div",{className:`jsx-${g.__hash} section-head`,children:[(0,s.jsx)("span",{className:`jsx-${g.__hash}`,children:"ТИП ВАШЕЙ ПАРЫ"}),(0,s.jsx)("b",{className:`jsx-${g.__hash}`,children:"03"})]}),(0,s.jsxs)("div",{className:`jsx-${g.__hash} type-title-row`,children:[(0,s.jsxs)("div",{className:`jsx-${g.__hash}`,children:[(0,s.jsxs)("span",{className:`jsx-${g.__hash}`,children:["ПАРА №",x($.id)]}),(0,s.jsx)("h2",{className:`jsx-${g.__hash}`,children:(p=$.id,h=$.title,({knight_princess:"Рыцарь × Принцесса",wizards:"Два волшебника",pirates:"Два пирата",astronauts:"Два космонавта",sun_moon:"Солнце × Луна",dragon_keeper:"Дракон × Хранитель",players:"Два игрока",homekeepers:"Хранители дома"})[p]??h)})]}),(0,s.jsx)("p",{className:`jsx-${g.__hash}`,children:{knight_princess:"По-разному показываете чувства. Одинаково держитесь за своих.",wizards:"Многое понимаете без длинных объяснений.",pirates:"Планы могут меняться. Команда — нет.",astronauts:"Каждый на своей орбите, но летите в одну сторону.",sun_moon:"По-разному реагируете на мир — и в этом ваша механика.",dragon_keeper:"Один добавляет огня. Второй не даёт всему сгореть.",players:"Разные стратегии. Одна команда.",homekeepers:"Вам важно своё место и свой человек."}[$.id]??"Два человека. Одна история."})]}),(0,s.jsxs)("div",{className:`jsx-${g.__hash} type-poster`,children:[(0,s.jsx)(d,{archetypeId:$.id}),(0,s.jsxs)("div",{className:`jsx-${g.__hash} poster-strip`,children:[(0,s.jsxs)("span",{className:`jsx-${g.__hash}`,children:["МЕЖДУ НАМИ / TYPE ",x($.id)]}),(0,s.jsx)("strong",{className:`jsx-${g.__hash}`,children:m($.id)})]})]})]}),(0,s.jsx)("section",{className:`jsx-${g.__hash} result-paywall`,children:(0,s.jsxs)("div",{className:`jsx-${g.__hash} result-shell`,children:[(0,s.jsxs)("div",{className:`jsx-${g.__hash} paywall-top`,children:[(0,s.jsx)("span",{className:`jsx-${g.__hash}`,children:"ДАЛЬШЕ — ИНТЕРЕСНЕЕ"}),(0,s.jsx)("b",{className:`jsx-${g.__hash}`,children:"04"})]}),(0,s.jsxs)("div",{className:`jsx-${g.__hash} paywall-grid`,children:[(0,s.jsxs)("div",{className:`jsx-${g.__hash} paywall-left`,children:[(0,s.jsxs)("div",{className:`jsx-${g.__hash} paywall-sticker`,children:["НАЙДЕНО",(0,s.jsx)("strong",{className:`jsx-${g.__hash}`,children:T})]}),(0,s.jsxs)("h2",{className:`jsx-${g.__hash}`,children:["В ПРОЦЕНТАХ",(0,s.jsx)("br",{className:`jsx-${g.__hash}`}),"НЕ ВСЁ."]}),(0,s.jsx)("p",{className:`jsx-${g.__hash}`,children:"В ваших ответах есть вещи, которые легко пропустить — но именно они часто решают, насколько вы понимаете друг друга."})]}),(0,s.jsxs)("div",{className:`jsx-${g.__hash} paywall-right`,children:[(0,s.jsxs)("div",{className:`jsx-${g.__hash} paywall-hook`,children:[(0,s.jsx)("span",{className:`jsx-${g.__hash}`,children:"В ВАШИХ ОТВЕТАХ"}),(0,s.jsx)("strong",{className:`jsx-${g.__hash}`,children:(u=A,f=E,u>=4?`${u} мест, где вы можете понимать друг друга совсем по-разному`:u>0?`${u} места, где ваши ожидания заметно расходятся`:f>0?`${f} ответов, которые выглядят похожими — но означают не одно и то же`:"несколько вещей, которые не видно по одному проценту")})]}),(0,s.jsx)(c,{number:"01",children:"Что один из вас ждёт от другого, но может не говорить прямо"}),(0,s.jsx)(c,{number:"02",children:"Где заботу одного второй может просто не замечать"}),(0,s.jsx)(c,{number:"03",children:"Из-за чего вы можете спорить вообще о разных вещах"}),(0,s.jsx)(c,{number:"04",children:"Что уже делает вашу пару сильнее — и как это использовать"}),(0,s.jsxs)("button",{type:"button",onClick:()=>_.push(`/report/${b}`),className:`jsx-${g.__hash} result-buy`,children:[(0,s.jsx)("span",{className:`jsx-${g.__hash}`,children:"ПОКАЗАТЬ, ЧТО МЕЖДУ ВАМИ"}),(0,s.jsx)("strong",{className:`jsx-${g.__hash}`,children:"299 ₽"}),(0,s.jsx)("b",{className:`jsx-${g.__hash}`,children:"→"})]}),(0,s.jsx)("div",{className:`jsx-${g.__hash} buy-note`,children:"один разбор · открывается для вас двоих"})]})]})]})})]}),(0,s.jsx)(n,{}),(0,s.jsx)(t.default,{id:g.__hash,children:g})]})}],95801)}]);