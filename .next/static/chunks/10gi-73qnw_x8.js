(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,95801,e=>{"use strict";var t=e.i(43476),s=e.i(37902),i=e.i(71645),r=e.i(18566);let n={friendship:{title:"Дружба",subtitle:"хорошо ли вам просто вдвоём",keywords:["friend","fun","humor","laugh","together","free_saturday","normal_evening","weekend","weekend_plan","extra_hour"]},partnership:{title:"Партнёрство",subtitle:"вы команда или каждый сам за себя",keywords:["team","partner","support","decision","future","plan","responsibility","keep_in_year","relationship_button","want_more"]},sex:{title:"Секс",subtitle:"совпадает ли ваше представление о близости",keywords:["sex","sexual","intimacy","physical","touch","affection","closeness","romance"]},money:{title:"Деньги",subtitle:"одинаково ли вы смотрите на траты",keywords:["money","finance","spend","saving","budget","unexpected_money","purchase"]},care:{title:"Забота",subtitle:"понимаете ли вы «я рядом» одинаково",keywords:["care","support","help","hard_day","reunion","care_signal","emotion","attention","comfort"]},home:{title:"Быт",subtitle:"как вам живётся в обычный вторник",keywords:["home","house","routine","daily","chores","clean","food","sleep","normal_evening","weekend_plan"]}};function a({category:e}){return(0,t.jsxs)("article",{className:"score-row",children:[(0,t.jsxs)("div",{className:"score-header",children:[(0,t.jsxs)("div",{className:"score-copy",children:[(0,t.jsx)("h2",{children:e.title}),(0,t.jsx)("p",{children:e.subtitle})]}),(0,t.jsxs)("div",{className:"score-number",children:[(0,t.jsx)("strong",{children:e.score}),(0,t.jsx)("span",{children:"/10"})]})]}),(0,t.jsx)("div",{className:"score-track",children:(0,t.jsx)("div",{className:"score-fill",style:{width:`${10*e.score}%`}})})]})}function o({children:e}){return(0,t.jsxs)("div",{className:"benefit",children:[(0,t.jsx)("div",{className:"benefit-icon",children:"♥"}),(0,t.jsx)("div",{className:"benefit-text",children:e})]})}function l(){return(0,t.jsxs)("div",{className:"fairytale",children:[(0,t.jsx)("div",{className:"pixel-moon"}),(0,t.jsxs)("div",{className:"sky-stars",children:[(0,t.jsx)("i",{className:"s1",children:"✦"}),(0,t.jsx)("i",{className:"s2",children:"✦"}),(0,t.jsx)("i",{className:"s3",children:"·"}),(0,t.jsx)("i",{className:"s4",children:"♥"})]}),(0,t.jsxs)("div",{className:"mountains",children:[(0,t.jsx)("div",{className:"mountain mountain-one"}),(0,t.jsx)("div",{className:"mountain mountain-two"}),(0,t.jsx)("div",{className:"mountain mountain-three"})]}),(0,t.jsxs)("div",{className:"castle",children:[(0,t.jsx)("div",{className:"tower tower-left",children:(0,t.jsx)("span",{})}),(0,t.jsx)("div",{className:"tower tower-middle",children:(0,t.jsx)("span",{})}),(0,t.jsx)("div",{className:"tower tower-right",children:(0,t.jsx)("span",{})}),(0,t.jsxs)("div",{className:"castle-body",children:[(0,t.jsx)("i",{}),(0,t.jsx)("i",{}),(0,t.jsx)("i",{})]})]}),(0,t.jsx)("div",{className:"ground-shape"}),(0,t.jsxs)("div",{className:"characters",children:[(0,t.jsxs)("div",{className:"knight",children:[(0,t.jsx)("div",{className:"knight-head",children:(0,t.jsx)("div",{className:"knight-hair"})}),(0,t.jsxs)("div",{className:"knight-body",children:[(0,t.jsx)("div",{className:"knight-cape"}),(0,t.jsx)("div",{className:"knight-arm"})]})]}),(0,t.jsx)("div",{className:"pixel-heart",children:"♥"}),(0,t.jsxs)("div",{className:"princess",children:[(0,t.jsx)("div",{className:"crown",children:"♛"}),(0,t.jsx)("div",{className:"princess-head",children:(0,t.jsx)("div",{className:"princess-hair"})}),(0,t.jsx)("div",{className:"princess-body",children:(0,t.jsx)("div",{className:"princess-dress"})})]})]})]})}function d(e){return 4+92*Math.max(0,Math.min(1,e/55))}function h(){return(0,t.jsx)(s.default,{id:"df369a7dd53f1493",children:"html,body{background:#faf7f4!important;margin:0!important;padding:0!important}body{color:#171315;font-family:Arial,Helvetica,sans-serif}*{box-sizing:border-box}button{font:inherit}"})}let c=`

.page {
  width: 100%;
  min-height: 100vh;

  overflow: hidden;

  background:
    radial-gradient(
      circle at 50% 15%,
      #ffffff 0,
      #faf7f4 44%,
      #f8f4f1 100%
    );

  color: #171315;
}

/*
  ВАЖНО:
  НЕ называем этот класс .shell.

  В globals.css уже существует глобальный .shell
  с min-height: 100svh и display:flex.

  Именно он раньше растягивал каждую секцию
  результата на высоту целого экрана.
*/

.result-shell {
  width: min(calc(100% - 40px), 720px);
  margin-left: auto;
  margin-right: auto;

  min-height: 0;
  height: auto;

  display: block;
}

/* HEADER */

.header {
  height: 76px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0;
}

.brand {
  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 22px;
  font-weight: 700;

  letter-spacing: -0.055em;
}

.couple-names {
  display: flex;
  align-items: center;

  gap: 9px;

  color: #7f777b;

  font-size: 10px;
  font-weight: 700;

  letter-spacing: 0.08em;

  text-transform: uppercase;
}

.couple-names b {
  color: #c03968;
}

/* SCORES */

.scores {
  padding: 14px 0 28px;
}

.score-row {
  padding: 11px 0;
}

.score-header {
  display: grid;

  grid-template-columns: 1fr auto;

  gap: 20px;

  align-items: end;
}

.score-copy h2 {
  margin: 0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 28px;
  font-weight: 400;

  line-height: 0.95;

  letter-spacing: -0.045em;
}

.score-copy p {
  margin: 5px 0 0;

  color: #888084;

  font-size: 12px;
  line-height: 1.2;
}

.score-number {
  min-width: 75px;

  display: flex;
  align-items: baseline;
  justify-content: flex-end;
}

.score-number strong {
  color: #bb285b;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 43px;
  font-weight: 400;

  line-height: 0.8;

  letter-spacing: -0.06em;
}

.score-number span {
  margin-left: 4px;

  color: #797176;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 20px;
}

.score-track {
  width: 100%;
  height: 7px;

  margin-top: 10px;

  overflow: hidden;

  border-radius: 99px;

  background: #e8e3e3;
}

.score-fill {
  height: 100%;

  border-radius: inherit;

  background: linear-gradient(
    90deg,
    #c84170,
    #ca4774
  );
}

/* FORECAST */

.forecast {
  position: relative;

  padding: 28px 0 34px;

  border-top: 1px solid #ded8d6;
}

.forecast-label {
  margin-bottom: 10px;

  color: #c03a68;

  font-size: 10px;
  font-weight: 700;

  letter-spacing: 0.2em;

  text-transform: uppercase;
}

.forecast-grid {
  display: grid;

  grid-template-columns:
    minmax(0, 1.2fr)
    minmax(230px, 0.8fr);

  gap: 45px;

  align-items: center;
}

.forecast-copy h2 {
  margin: 0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 37px;
  font-weight: 400;

  line-height: 0.98;

  letter-spacing: -0.05em;
}

.forecast-copy p {
  max-width: 380px;

  margin: 11px 0 0;

  color: #898084;

  font-size: 12px;
  line-height: 1.4;
}

.forecast-result {
  padding-top: 4px;
}

.years {
  color: #b51f55;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 67px;

  line-height: 0.9;

  letter-spacing: -0.06em;

  white-space: nowrap;
}

.years span {
  margin-left: 9px;

  font-size: 42px;

  letter-spacing: -0.04em;
}

.forecast-scale {
  margin-top: 19px;
}

.forecast-line {
  position: relative;

  height: 8px;

  border-radius: 99px;

  background: #e5dfe1;
}

.forecast-progress {
  height: 100%;

  border-radius: inherit;

  background: #eca6bc;
}

.forecast-dot {
  position: absolute;

  top: 50%;

  width: 20px;
  height: 20px;

  border-radius: 50%;

  background: #ba2057;

  transform:
    translate(-50%, -50%);
}

.forecast-scale-labels {
  display: flex;
  justify-content: space-between;

  margin-top: 11px;

  color: #8c8488;

  font-size: 10px;
}

/* PAID */

.paid-section {
  padding: 8px 0 54px;
}

.paid-card {
  position: relative;

  overflow: hidden;

  min-height: 440px;

  border-radius: 18px;

  background:
    linear-gradient(
      135deg,
      #9f1f4d 0%,
      #b5295b 48%,
      #9d204e 100%
    );

  color: #fff8f4;
}

.paid-card::before {
  content: "";

  position: absolute;

  width: 340px;
  height: 340px;

  top: -160px;
  right: -80px;

  border-radius: 50%;

  background:
    rgba(255, 132, 170, 0.14);
}

.paid-top {
  position: relative;

  z-index: 5;

  display: grid;

  grid-template-columns: 1.25fr 0.75fr;

  gap: 40px;

  padding: 27px 36px 0;
}

.paid-label {
  margin-bottom: 11px;

  color: #efc4d2;

  font-size: 10px;
  font-weight: 700;

  letter-spacing: 0.18em;

  text-transform: uppercase;
}

.paid-title h2 {
  margin: 0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 43px;
  font-weight: 400;

  line-height: 0.94;

  letter-spacing: -0.055em;
}

.paid-benefits {
  display: flex;
  flex-direction: column;

  gap: 15px;

  padding-top: 9px;
}

.benefit {
  display: grid;

  grid-template-columns: 24px 1fr;

  gap: 10px;

  align-items: start;
}

.benefit-icon {
  color: #ffd0dc;

  font-size: 12px;

  padding-top: 2px;
}

.benefit-text {
  color: #fff8fa;

  font-size: 12px;
  line-height: 1.25;
}

/* FAIRYTALE */

.fairytale {
  position: absolute;

  z-index: 1;

  left: 0;
  bottom: 0;

  width: 63%;
  height: 285px;

  overflow: hidden;

  background:
    linear-gradient(
      180deg,
      rgba(135, 31, 70, 0) 0%,
      rgba(75, 27, 55, 0.45) 100%
    );
}

.pixel-moon {
  position: absolute;

  top: 35px;
  left: 49%;

  width: 83px;
  height: 83px;

  border-radius: 50%;

  background: #ffd0a9;

  box-shadow:
    0 0 0 7px rgba(255, 209, 170, 0.06),
    0 0 38px rgba(255, 213, 178, 0.35);
}

.sky-stars i {
  position: absolute;

  z-index: 3;

  color: #ffc56e;

  font-style: normal;
}

.s1 {
  top: 30px;
  left: 22%;
}

.s2 {
  top: 67px;
  left: 34%;
}

.s3 {
  top: 48px;
  left: 70%;
}

.s4 {
  top: 95px;
  left: 58%;
}

.s5 {
  top: 85px;
  left: 12%;
}

.mountain {
  position: absolute;

  bottom: 50px;

  width: 220px;
  height: 100px;

  background: #76264a;

  clip-path:
    polygon(
      0 100%,
      28% 35%,
      44% 68%,
      61% 20%,
      100% 100%
    );
}

.mountain-one {
  left: -20px;
}

.mountain-two {
  left: 160px;

  opacity: 0.8;
}

.mountain-three {
  left: 330px;

  opacity: 0.65;
}

/* CASTLE */

.castle {
  position: absolute;

  right: 17px;
  bottom: 58px;

  width: 90px;
  height: 115px;
}

.castle-body {
  position: absolute;

  bottom: 0;
  left: 17px;

  width: 60px;
  height: 65px;

  background: #302434;

  box-shadow:
    inset 0 0 0 3px #211a24;
}

.castle-body i {
  position: absolute;

  width: 6px;
  height: 10px;

  background: #ffc26c;
}

.castle-body i:nth-child(1) {
  top: 15px;
  left: 10px;
}

.castle-body i:nth-child(2) {
  top: 15px;
  right: 10px;
}

.castle-body i:nth-child(3) {
  bottom: 11px;
  left: 27px;
}

.tower {
  position: absolute;

  bottom: 0;

  width: 22px;

  background: #2c2130;
}

.tower::before {
  content: "";

  position: absolute;

  left: -5px;
  top: -21px;

  width: 0;
  height: 0;

  border-left: 16px solid transparent;
  border-right: 16px solid transparent;
  border-bottom: 24px solid #2c2130;
}

.tower-left {
  left: 0;

  height: 82px;
}

.tower-middle {
  left: 34px;

  height: 108px;
}

.tower-right {
  right: 0;

  height: 78px;
}

.tower span {
  position: absolute;

  top: 18px;
  left: 8px;

  width: 6px;
  height: 10px;

  background: #ffbe66;
}

/* GROUND */

.ground-shape {
  position: absolute;

  left: -5%;
  right: -5%;
  bottom: -58px;

  height: 140px;

  border-radius: 50% 50% 0 0;

  background: #392739;
}

/* CHARACTERS */

.characters {
  position: absolute;

  z-index: 6;

  left: 72px;
  bottom: 28px;

  width: 220px;
  height: 180px;
}

.knight,
.princess {
  position: absolute;

  bottom: 0;
}

.knight {
  left: 0;
}

.princess {
  right: 10px;
}

.knight-head,
.princess-head {
  position: absolute;

  width: 50px;
  height: 53px;

  border: 5px solid #2a2028;

  border-radius: 46% 46% 43% 43%;

  background: #e9b28d;
}

.knight-head {
  top: 10px;
  left: 40px;
}

.princess-head {
  top: 5px;
  right: 45px;
}

.knight-hair,
.princess-hair {
  position: absolute;

  top: -5px;
  left: -5px;

  width: 53px;
  height: 22px;

  border-radius: 50% 50% 20% 20%;

  background: #3b2727;
}

.princess-hair {
  height: 63px;

  background: #d39b43;

  z-index: -1;
}

.knight-body {
  position: absolute;

  top: 57px;
  left: 28px;

  width: 72px;
  height: 92px;

  border: 5px solid #292029;

  border-radius: 15px;

  background: #77727b;
}

.knight-cape {
  position: absolute;

  left: -30px;
  top: 3px;

  width: 50px;
  height: 95px;

  border: 5px solid #292029;

  border-radius: 40% 0 0 40%;

  background: #8d244d;

  z-index: -1;
}

.knight-arm {
  position: absolute;

  right: -40px;
  top: 31px;

  width: 48px;
  height: 18px;

  border: 5px solid #292029;

  border-radius: 10px;

  background: #77727b;

  transform: rotate(-8deg);
}

.princess-body {
  position: absolute;

  top: 52px;
  right: 22px;

  width: 80px;
  height: 104px;
}

.princess-dress {
  position: absolute;

  left: 50%;
  bottom: 0;

  width: 93px;
  height: 97px;

  border: 5px solid #2a2028;

  background: #d96d91;

  clip-path:
    polygon(
      34% 0,
      66% 0,
      100% 100%,
      0 100%
    );

  transform: translateX(-50%);
}

.crown {
  position: absolute;

  z-index: 10;

  top: -20px;
  right: 56px;

  color: #ffd25f;

  font-size: 27px;
}

.pixel-heart {
  position: absolute;

  z-index: 10;

  left: 49%;
  bottom: 124px;

  color: #ff7ca6;

  font-size: 18px;
}

/* BUTTON */

.paid-bottom {
  position: absolute;

  z-index: 20;

  right: 28px;
  bottom: 22px;

  width: 49%;
}

.buy-button {
  width: 100%;

  display: grid;

  grid-template-columns:
    1fr auto auto;

  gap: 15px;

  align-items: center;

  padding: 16px 18px;

  border: 0;
  border-radius: 12px;

  background: #fffaf7;

  color: #181316;

  cursor: pointer;

  transition:
    transform 0.15s ease,
    background 0.15s ease;
}

.buy-button:hover {
  transform: translateY(-2px);

  background: #ffffff;
}

.buy-button span {
  text-align: left;

  font-size: 12px;
  font-weight: 700;
}

.buy-button strong {
  color: #b52056;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 18px;
  font-weight: 400;

  white-space: nowrap;
}

.buy-button i {
  color: #bd285d;

  font-size: 21px;
  font-style: normal;
}

.paid-note {
  margin-top: 9px;

  color: #dda4b8;

  font-size: 9px;

  text-align: center;
}

/* STATE */

.state-page {
  min-height: 100svh;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  padding: 30px;

  background: #faf7f4;

  text-align: center;
}

.state-brand {
  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 23px;
  font-weight: 700;
}

.state-page h1 {
  max-width: 420px;

  margin: 25px 0 0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 38px;
  font-weight: 400;

  line-height: 1;
}

.state-page p {
  margin-top: 13px;

  color: #8a8285;

  font-size: 13px;
}

.loader {
  display: flex;

  margin-bottom: 25px;
}

.loader span {
  width: 52px;
  height: 52px;

  border-radius: 50%;

  background: #e2b4c4;
}

.loader span:last-child {
  margin-left: -14px;

  background: #b36380;
}

/* MOBILE */

@media (max-width: 650px) {
  .result-shell {
    width: calc(100% - 30px);
  }

  .header {
    height: 66px;
  }

  .brand {
    font-size: 20px;
  }

  .couple-names {
    font-size: 9px;
  }

  .scores {
    padding-top: 9px;
    padding-bottom: 25px;
  }

  .score-row {
    padding: 11px 0 10px;
  }

  .score-copy h2 {
    font-size: 24px;
  }

  .score-copy p {
    font-size: 10px;
  }

  .score-number {
    min-width: 62px;
  }

  .score-number strong {
    font-size: 37px;
  }

  .score-number span {
    font-size: 17px;
  }

  .score-track {
    height: 6px;
    margin-top: 9px;
  }

  .forecast {
    padding:
      27px 0
      30px;
  }

  .forecast-grid {
    grid-template-columns: 1fr;

    gap: 22px;
  }

  .forecast-copy h2 {
    font-size: 34px;
  }

  .forecast-copy p {
    font-size: 11px;
  }

  .years {
    font-size: 61px;
  }

  .years span {
    font-size: 37px;
  }

  .forecast-result {
    padding: 0;
  }

  .paid-section {
    padding-top: 5px;
    padding-bottom: 30px;
  }

  .paid-card {
    min-height: 630px;

    border-radius: 15px;
  }

  .paid-top {
    grid-template-columns: 1fr;

    gap: 20px;

    padding:
      25px 24px
      0;
  }

  .paid-title h2 {
    font-size: 40px;
  }

  .paid-benefits {
    display: grid;

    grid-template-columns:
      1fr 1fr;

    gap: 12px 15px;

    padding: 0;
  }

  .benefit-text {
    font-size: 10px;
  }

  .fairytale {
    width: 100%;
    height: 280px;

    bottom: 80px;
  }

  .characters {
    left: 26px;

    transform: scale(0.86);
    transform-origin: bottom left;
  }

  .castle {
    right: 14px;

    transform: scale(0.82);
    transform-origin: bottom right;
  }

  .paid-bottom {
    right: 18px;
    bottom: 17px;

    width: calc(100% - 36px);
  }

  .buy-button {
    padding: 15px 14px;
  }

  .buy-button span {
    font-size: 11px;
  }

  .buy-button strong {
    font-size: 17px;
  }
}

`;e.s(["default",0,function(){var e;let p,u,x=(0,r.useParams)(),f=(0,r.useRouter)(),m=x.coupleId,[g,b]=(0,i.useState)(null),[_,j]=(0,i.useState)("");(0,i.useEffect)(()=>{let e=!1;return async function(){try{let t=await fetch(`/api/report?id=${encodeURIComponent(m)}`,{cache:"no-store"});if(!t.ok)throw Error("Не удалось загрузить результат");let s=await t.json();if(e)return;if(s.waiting)return void f.replace(`/waiting/${m}`);b(s)}catch(t){console.error(t),e||j("Не получилось загрузить результат.")}}(),()=>{e=!0}},[m,f]);let y=(0,i.useMemo)(()=>g?.comparisons??[],[g]),v=(0,i.useMemo)(()=>{var e,t;return"number"==typeof g?.scores?.overall?Number.isFinite(e=g.scores.overall)?e>=0&&e<=1?Math.round(100*e):Math.round(Math.max(0,Math.min(100,e))):0:(t=y).length?Math.round(t.reduce((e,t)=>"same"===t.similarity?e+1:"close"===t.similarity?e+.55:e,0)/t.length*100):50},[g,y]),w=(0,i.useMemo)(()=>{var e,t;return e=y,t=v,["friendship","partnership","sex","money","care","home"].map(s=>{var i;let r=n[s],a=e.filter(e=>{var t,s;let i;return t=e,s=r.keywords,i=[t.questionId,t.question,...t.traitsA??[],...t.traitsB??[],...t.sharedTraits??[]].join(" ").toLowerCase(),s.some(e=>i.includes(e.toLowerCase()))}),o=a.length>0?a:e,l=o.length>0?(i=o).length?Math.round(i.reduce((e,t)=>"same"===t.similarity?e+1:"close"===t.similarity?e+.55:e,0)/i.length*100):50:t;return{id:s,title:r.title,subtitle:r.subtitle,score:Math.max(0,Math.min(10,Math.round(l/10)))}})},[y,v]),N=(0,i.useMemo)(()=>{var e,t;return e=w,t=v,e.length?Math.max(1,Math.min(55,Math.round(1+54*Math.pow((.6*(e.reduce((e,t)=>e+t.score,0)/e.length)+.2*Math.min(...e.map(e=>e.score))+.1*Math.max(...e.map(e=>e.score))+t/10*.1)/10,1.55)))):1},[w,v]);if(_)return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("main",{className:`jsx-${c.__hash} state-page`,children:[(0,t.jsx)("div",{className:`jsx-${c.__hash} state-brand`,children:"между нами."}),(0,t.jsx)("h1",{className:`jsx-${c.__hash}`,children:"не получилось открыть результат"}),(0,t.jsx)("p",{className:`jsx-${c.__hash}`,children:_})]}),(0,t.jsx)(h,{}),(0,t.jsx)(s.default,{id:c.__hash,children:c})]});if(!g)return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("main",{className:`jsx-${c.__hash} state-page`,children:[(0,t.jsxs)("div",{className:`jsx-${c.__hash} loader`,children:[(0,t.jsx)("span",{className:`jsx-${c.__hash}`}),(0,t.jsx)("span",{className:`jsx-${c.__hash}`})]}),(0,t.jsx)("div",{className:`jsx-${c.__hash} state-brand`,children:"между нами."}),(0,t.jsx)("p",{className:`jsx-${c.__hash}`,children:"собираем ваши ответы"})]}),(0,t.jsx)(h,{}),(0,t.jsx)(s.default,{id:c.__hash,children:c})]});let S=g.couple.partner_a_name,z=g.couple.partner_b_name;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("main",{className:`jsx-${c.__hash} page`,children:[(0,t.jsxs)("header",{className:`jsx-${c.__hash} header result-shell`,children:[(0,t.jsx)("div",{className:`jsx-${c.__hash} brand`,children:"между нами."}),(0,t.jsxs)("div",{className:`jsx-${c.__hash} couple-names`,children:[(0,t.jsx)("span",{className:`jsx-${c.__hash}`,children:S}),(0,t.jsx)("b",{className:`jsx-${c.__hash}`,children:"×"}),(0,t.jsx)("span",{className:`jsx-${c.__hash}`,children:z})]})]}),(0,t.jsx)("section",{className:`jsx-${c.__hash} scores result-shell`,children:w.map(e=>(0,t.jsx)(a,{category:e},e.id))}),(0,t.jsxs)("section",{className:`jsx-${c.__hash} forecast result-shell`,children:[(0,t.jsx)("div",{className:`jsx-${c.__hash} forecast-label`,children:"прогноз"}),(0,t.jsxs)("div",{className:`jsx-${c.__hash} forecast-grid`,children:[(0,t.jsxs)("div",{className:`jsx-${c.__hash} forecast-copy`,children:[(0,t.jsxs)("h2",{className:`jsx-${c.__hash}`,children:["Вы можете быть",(0,t.jsx)("br",{className:`jsx-${c.__hash}`}),"вместе очень долго"]}),(0,t.jsx)("p",{className:`jsx-${c.__hash}`,children:"На основе ваших ответов мы оценили, сколько лет вы можете быть вместе."})]}),(0,t.jsxs)("div",{className:`jsx-${c.__hash} forecast-result`,children:[(0,t.jsxs)("div",{className:`jsx-${c.__hash} years`,children:[N,(0,t.jsx)("span",{className:`jsx-${c.__hash}`,children:(p=(e=N)%100,u=e%10,p>=11&&p<=14?"лет":1===u?"год":u>=2&&u<=4?"года":"лет")})]}),(0,t.jsxs)("div",{className:`jsx-${c.__hash} forecast-scale`,children:[(0,t.jsxs)("div",{className:`jsx-${c.__hash} forecast-line`,children:[(0,t.jsx)("div",{style:{width:`${d(N)}%`},className:`jsx-${c.__hash} forecast-progress`}),(0,t.jsx)("div",{style:{left:`${d(N)}%`},className:`jsx-${c.__hash} forecast-dot`})]}),(0,t.jsxs)("div",{className:`jsx-${c.__hash} forecast-scale-labels`,children:[(0,t.jsx)("span",{className:`jsx-${c.__hash}`,children:"1 месяц"}),(0,t.jsx)("span",{className:`jsx-${c.__hash}`,children:"вся жизнь"})]})]})]})]})]}),(0,t.jsx)("section",{className:`jsx-${c.__hash} paid-section result-shell`,children:(0,t.jsxs)("div",{className:`jsx-${c.__hash} paid-card`,children:[(0,t.jsxs)("div",{className:`jsx-${c.__hash} paid-top`,children:[(0,t.jsxs)("div",{className:`jsx-${c.__hash} paid-title`,children:[(0,t.jsx)("div",{className:`jsx-${c.__hash} paid-label`,children:"полный разбор"}),(0,t.jsxs)("h2",{className:`jsx-${c.__hash}`,children:["Чтобы вместе —",(0,t.jsx)("br",{className:`jsx-${c.__hash}`}),"и надолго."]})]}),(0,t.jsxs)("div",{className:`jsx-${c.__hash} paid-benefits`,children:[(0,t.jsxs)(o,{children:["Где вы можете",(0,t.jsx)("br",{className:`jsx-${c.__hash}`}),"не понимать друг друга"]}),(0,t.jsxs)(o,{children:["Что каждый ждёт",(0,t.jsx)("br",{className:`jsx-${c.__hash}`}),"от отношений"]}),(0,t.jsxs)(o,{children:["Что может стать",(0,t.jsx)("br",{className:`jsx-${c.__hash}`}),"причиной ссор"]}),(0,t.jsxs)(o,{children:["Как сделать вашу",(0,t.jsx)("br",{className:`jsx-${c.__hash}`}),"пару крепче"]})]})]}),(0,t.jsx)(l,{}),(0,t.jsxs)("div",{className:`jsx-${c.__hash} paid-bottom`,children:[(0,t.jsxs)("button",{type:"button",onClick:()=>f.push(`/report/${m}`),className:`jsx-${c.__hash} buy-button`,children:[(0,t.jsx)("span",{className:`jsx-${c.__hash}`,children:"Открыть полный разбор"}),(0,t.jsx)("strong",{className:`jsx-${c.__hash}`,children:"299 ₽"}),(0,t.jsx)("i",{className:`jsx-${c.__hash}`,children:"→"})]}),(0,t.jsx)("div",{className:`jsx-${c.__hash} paid-note`,children:"один разбор · для вас двоих · сразу после оплаты"})]})]})})]}),(0,t.jsx)(h,{}),(0,t.jsx)(s.default,{id:c.__hash,children:c})]})}])},16015,(e,t,s)=>{},18566,(e,t,s)=>{t.exports=e.r(76562)},98547,(e,t,s)=>{var i=e.i(47167);e.r(16015);var r=e.r(71645),n=r&&"object"==typeof r&&"default"in r?r:{default:r},a=void 0!==i.default&&i.default.env&&!0,o=function(e){return"[object String]"===Object.prototype.toString.call(e)},l=function(){function e(e){var t=void 0===e?{}:e,s=t.name,i=void 0===s?"stylesheet":s,r=t.optimizeForSpeed,n=void 0===r?a:r;d(o(i),"`name` must be a string"),this._name=i,this._deletedRulePlaceholder="#"+i+"-deleted-rule____{}",d("boolean"==typeof n,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=n,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0;var l="u">typeof window&&document.querySelector('meta[property="csp-nonce"]');this._nonce=l?l.getAttribute("content"):null}var t,s=e.prototype;return s.setOptimizeForSpeed=function(e){d("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),d(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},s.isOptimizeForSpeed=function(){return this._optimizeForSpeed},s.inject=function(){var e=this;if(d(!this._injected,"sheet already injected"),this._injected=!0,"u">typeof window&&this._optimizeForSpeed){this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),this._optimizeForSpeed||(a||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0);return}this._serverSheet={cssRules:[],insertRule:function(t,s){return"number"==typeof s?e._serverSheet.cssRules[s]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),s},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},s.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},s.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},s.insertRule=function(e,t){if(d(o(e),"`insertRule` accepts only strings"),"u"<typeof window)return"number"!=typeof t&&(t=this._serverSheet.cssRules.length),this._serverSheet.insertRule(e,t),this._rulesCount++;if(this._optimizeForSpeed){var s=this.getSheet();"number"!=typeof t&&(t=s.cssRules.length);try{s.insertRule(e,t)}catch(t){return a||console.warn("StyleSheet: illegal rule: \n\n"+e+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var i=this._tags[t];this._tags.push(this.makeStyleTag(this._name,e,i))}return this._rulesCount++},s.replaceRule=function(e,t){if(this._optimizeForSpeed||"u"<typeof window){var s="u">typeof window?this.getSheet():this._serverSheet;if(t.trim()||(t=this._deletedRulePlaceholder),!s.cssRules[e])return e;s.deleteRule(e);try{s.insertRule(t,e)}catch(i){a||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),s.insertRule(this._deletedRulePlaceholder,e)}}else{var i=this._tags[e];d(i,"old rule at index `"+e+"` not found"),i.textContent=t}return e},s.deleteRule=function(e){if("u"<typeof window)return void this._serverSheet.deleteRule(e);if(this._optimizeForSpeed)this.replaceRule(e,"");else{var t=this._tags[e];d(t,"rule at index `"+e+"` not found"),t.parentNode.removeChild(t),this._tags[e]=null}},s.flush=function(){this._injected=!1,this._rulesCount=0,"u">typeof window?(this._tags.forEach(function(e){return e&&e.parentNode.removeChild(e)}),this._tags=[]):this._serverSheet.cssRules=[]},s.cssRules=function(){var e=this;return"u"<typeof window?this._serverSheet.cssRules:this._tags.reduce(function(t,s){return s?t=t.concat(Array.prototype.map.call(e.getSheetForTag(s).cssRules,function(t){return t.cssText===e._deletedRulePlaceholder?null:t})):t.push(null),t},[])},s.makeStyleTag=function(e,t,s){t&&d(o(t),"makeStyleTag accepts only strings as second parameter");var i=document.createElement("style");this._nonce&&i.setAttribute("nonce",this._nonce),i.type="text/css",i.setAttribute("data-"+e,""),t&&i.appendChild(document.createTextNode(t));var r=document.head||document.getElementsByTagName("head")[0];return s?r.insertBefore(i,s):r.appendChild(i),i},t=[{key:"length",get:function(){return this._rulesCount}}],function(e,t){for(var s=0;s<t.length;s++){var i=t[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}(e.prototype,t),e}();function d(e,t){if(!e)throw Error("StyleSheet: "+t+".")}var h=function(e){for(var t=5381,s=e.length;s;)t=33*t^e.charCodeAt(--s);return t>>>0},c={};function p(e,t){if(!t)return"jsx-"+e;var s=String(t),i=e+s;return c[i]||(c[i]="jsx-"+h(e+"-"+s)),c[i]}function u(e,t){"u"<typeof window&&(t=t.replace(/\/style/gi,"\\/style"));var s=e+t;return c[s]||(c[s]=t.replace(/__jsx-style-dynamic-selector/g,e)),c[s]}var x=function(){function e(e){var t=void 0===e?{}:e,s=t.styleSheet,i=void 0===s?null:s,r=t.optimizeForSpeed,n=void 0!==r&&r;this._sheet=i||new l({name:"styled-jsx",optimizeForSpeed:n}),this._sheet.inject(),i&&"boolean"==typeof n&&(this._sheet.setOptimizeForSpeed(n),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var t=e.prototype;return t.add=function(e){var t=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(e.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),"u">typeof window&&!this._fromServer&&(this._fromServer=this.selectFromServer(),this._instancesCounts=Object.keys(this._fromServer).reduce(function(e,t){return e[t]=0,e},{}));var s=this.getIdAndRules(e),i=s.styleId,r=s.rules;if(i in this._instancesCounts){this._instancesCounts[i]+=1;return}var n=r.map(function(e){return t._sheet.insertRule(e)}).filter(function(e){return -1!==e});this._indices[i]=n,this._instancesCounts[i]=1},t.remove=function(e){var t=this,s=this.getIdAndRules(e).styleId;if(function(e,t){if(!e)throw Error("StyleSheetRegistry: "+t+".")}(s in this._instancesCounts,"styleId: `"+s+"` not found"),this._instancesCounts[s]-=1,this._instancesCounts[s]<1){var i=this._fromServer&&this._fromServer[s];i?(i.parentNode.removeChild(i),delete this._fromServer[s]):(this._indices[s].forEach(function(e){return t._sheet.deleteRule(e)}),delete this._indices[s]),delete this._instancesCounts[s]}},t.update=function(e,t){this.add(t),this.remove(e)},t.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},t.cssRules=function(){var e=this,t=this._fromServer?Object.keys(this._fromServer).map(function(t){return[t,e._fromServer[t]]}):[],s=this._sheet.cssRules();return t.concat(Object.keys(this._indices).map(function(t){return[t,e._indices[t].map(function(e){return s[e].cssText}).join(e._optimizeForSpeed?"":"\n")]}).filter(function(e){return!!e[1]}))},t.styles=function(e){var t,s;return t=this.cssRules(),void 0===(s=e)&&(s={}),t.map(function(e){var t=e[0],i=e[1];return n.default.createElement("style",{id:"__"+t,key:"__"+t,nonce:s.nonce?s.nonce:void 0,dangerouslySetInnerHTML:{__html:i}})})},t.getIdAndRules=function(e){var t=e.children,s=e.dynamic,i=e.id;if(s){var r=p(i,s);return{styleId:r,rules:Array.isArray(t)?t.map(function(e){return u(r,e)}):[u(r,t)]}}return{styleId:p(i),rules:Array.isArray(t)?t:[t]}},t.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e,t){return e[t.id.slice(2)]=t,e},{})},e}(),f=r.createContext(null);function m(){return new x}function g(){return r.useContext(f)}f.displayName="StyleSheetContext";var b=n.default.useInsertionEffect||n.default.useLayoutEffect,_="u">typeof window?m():void 0;function j(e){var t=_||g();return t&&("u"<typeof window?t.add(e):b(function(){return t.add(e),function(){t.remove(e)}},[e.id,String(e.dynamic)])),null}j.dynamic=function(e){return e.map(function(e){return p(e[0],e[1])}).join(" ")},s.StyleRegistry=function(e){var t=e.registry,s=e.children,i=r.useContext(f),a=r.useState(function(){return i||t||m()})[0];return n.default.createElement(f.Provider,{value:a},s)},s.createStyleRegistry=m,s.style=j,s.useStyleRegistry=g},37902,(e,t,s)=>{t.exports=e.r(98547).style}]);