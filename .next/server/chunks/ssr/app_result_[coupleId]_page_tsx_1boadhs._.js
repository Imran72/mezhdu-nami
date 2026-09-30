module.exports=[66248,a=>{"use strict";var b=a.i(87924),c=a.i(31626),d=a.i(72131),e=a.i(50944);let f={friendship:{title:"Дружба",subtitle:"хорошо ли вам просто вдвоём",keywords:["friend","fun","humor","laugh","together","free_saturday","normal_evening","weekend","weekend_plan","extra_hour"]},partnership:{title:"Партнёрство",subtitle:"вы команда или каждый сам за себя",keywords:["team","partner","support","decision","future","plan","responsibility","keep_in_year","relationship_button","want_more"]},sex:{title:"Секс",subtitle:"совпадает ли ваше представление о близости",keywords:["sex","sexual","intimacy","physical","touch","affection","closeness","romance"]},money:{title:"Деньги",subtitle:"одинаково ли вы смотрите на траты",keywords:["money","finance","spend","saving","budget","unexpected_money","purchase"]},care:{title:"Забота",subtitle:"понимаете ли вы «я рядом» одинаково",keywords:["care","support","help","hard_day","reunion","care_signal","emotion","attention","comfort"]},home:{title:"Быт",subtitle:"как вам живётся в обычный вторник",keywords:["home","house","routine","daily","chores","clean","food","sleep","normal_evening","weekend_plan"]}};function g({category:a}){return(0,b.jsxs)("article",{className:"score-row",children:[(0,b.jsxs)("div",{className:"score-header",children:[(0,b.jsxs)("div",{className:"score-copy",children:[(0,b.jsx)("h2",{children:a.title}),(0,b.jsx)("p",{children:a.subtitle})]}),(0,b.jsxs)("div",{className:"score-number",children:[(0,b.jsx)("strong",{children:a.score}),(0,b.jsx)("span",{children:"/10"})]})]}),(0,b.jsx)("div",{className:"score-track",children:(0,b.jsx)("div",{className:"score-fill",style:{width:`${10*a.score}%`}})})]})}function h({children:a}){return(0,b.jsxs)("div",{className:"benefit",children:[(0,b.jsx)("div",{className:"benefit-icon",children:"♥"}),(0,b.jsx)("div",{className:"benefit-text",children:a})]})}function i(){return(0,b.jsxs)("div",{className:"fairytale",children:[(0,b.jsxs)("div",{className:"sky-stars",children:[(0,b.jsx)("i",{className:"s1",children:"✦"}),(0,b.jsx)("i",{className:"s2",children:"·"}),(0,b.jsx)("i",{className:"s3",children:"✦"}),(0,b.jsx)("i",{className:"s4",children:"·"}),(0,b.jsx)("i",{className:"s5",children:"✦"})]}),(0,b.jsx)("div",{className:"pixel-moon"}),(0,b.jsx)("div",{className:"mountain mountain-one"}),(0,b.jsx)("div",{className:"mountain mountain-two"}),(0,b.jsx)("div",{className:"mountain mountain-three"}),(0,b.jsxs)("div",{className:"castle",children:[(0,b.jsx)("div",{className:"tower tower-left",children:(0,b.jsx)("span",{})}),(0,b.jsx)("div",{className:"tower tower-middle",children:(0,b.jsx)("span",{})}),(0,b.jsx)("div",{className:"tower tower-right",children:(0,b.jsx)("span",{})}),(0,b.jsxs)("div",{className:"castle-body",children:[(0,b.jsx)("i",{}),(0,b.jsx)("i",{}),(0,b.jsx)("i",{})]})]}),(0,b.jsx)("div",{className:"ground-shape"}),(0,b.jsxs)("div",{className:"characters",children:[(0,b.jsxs)("div",{className:"knight",children:[(0,b.jsx)("div",{className:"knight-head",children:(0,b.jsx)("div",{className:"knight-hair"})}),(0,b.jsxs)("div",{className:"knight-body",children:[(0,b.jsx)("div",{className:"knight-cape"}),(0,b.jsx)("div",{className:"knight-arm"})]})]}),(0,b.jsxs)("div",{className:"princess",children:[(0,b.jsx)("div",{className:"crown",children:"♛"}),(0,b.jsx)("div",{className:"princess-head",children:(0,b.jsx)("div",{className:"princess-hair"})}),(0,b.jsx)("div",{className:"princess-body",children:(0,b.jsx)("div",{className:"princess-dress"})})]})]}),(0,b.jsx)("div",{className:"pixel-heart",children:"♥"})]})}function j(a){return 4+92*Math.max(0,Math.min(1,a/55))}function k(){return(0,b.jsx)(c.default,{id:"df369a7dd53f1493",children:"html,body{background:#faf7f4!important;margin:0!important;padding:0!important}body{color:#171315;font-family:Arial,Helvetica,sans-serif}*{box-sizing:border-box}button{font:inherit}"})}let l=`

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

`;a.s(["default",0,function(){var a;let m,n,o=(0,e.useParams)(),p=(0,e.useRouter)(),q=o.coupleId,[r,s]=(0,d.useState)(null),[t,u]=(0,d.useState)("");(0,d.useEffect)(()=>{let a=!1;return async function(){try{let b=await fetch(`/api/report?id=${encodeURIComponent(q)}`,{cache:"no-store"});if(!b.ok)throw Error("Не удалось загрузить результат");let c=await b.json();if(a)return;if(c.waiting)return void p.replace(`/waiting/${q}`);s(c)}catch(b){console.error(b),a||u("Не получилось загрузить результат.")}}(),()=>{a=!0}},[q,p]);let v=(0,d.useMemo)(()=>r?.comparisons??[],[r]),w=(0,d.useMemo)(()=>{var a,b;return"number"==typeof r?.scores?.overall?Number.isFinite(a=r.scores.overall)?a>=0&&a<=1?Math.round(100*a):Math.round(Math.max(0,Math.min(100,a))):0:(b=v).length?Math.round(b.reduce((a,b)=>"same"===b.similarity?a+1:"close"===b.similarity?a+.55:a,0)/b.length*100):50},[r,v]),x=(0,d.useMemo)(()=>{var a,b;return a=v,b=w,["friendship","partnership","sex","money","care","home"].map(c=>{var d;let e=f[c],g=a.filter(a=>{var b,c;let d;return b=a,c=e.keywords,d=[b.questionId,b.question,...b.traitsA??[],...b.traitsB??[],...b.sharedTraits??[]].join(" ").toLowerCase(),c.some(a=>d.includes(a.toLowerCase()))}),h=g.length>0?g:a,i=h.length>0?(d=h).length?Math.round(d.reduce((a,b)=>"same"===b.similarity?a+1:"close"===b.similarity?a+.55:a,0)/d.length*100):50:b;return{id:c,title:e.title,subtitle:e.subtitle,score:Math.max(0,Math.min(10,Math.round(i/10)))}})},[v,w]),y=(0,d.useMemo)(()=>{var a,b;return a=x,b=w,a.length?Math.max(1,Math.min(55,Math.round(1+54*Math.pow((.6*(a.reduce((a,b)=>a+b.score,0)/a.length)+.2*Math.min(...a.map(a=>a.score))+.1*Math.max(...a.map(a=>a.score))+b/10*.1)/10,1.55)))):1},[x,w]);if(t)return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("main",{className:`jsx-${l.__hash} state-page`,children:[(0,b.jsx)("div",{className:`jsx-${l.__hash} state-brand`,children:"между нами."}),(0,b.jsx)("h1",{className:`jsx-${l.__hash}`,children:"не получилось открыть результат"}),(0,b.jsx)("p",{className:`jsx-${l.__hash}`,children:t})]}),(0,b.jsx)(k,{}),(0,b.jsx)(c.default,{id:l.__hash,children:l})]});if(!r)return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("main",{className:`jsx-${l.__hash} state-page`,children:[(0,b.jsxs)("div",{className:`jsx-${l.__hash} loader`,children:[(0,b.jsx)("span",{className:`jsx-${l.__hash}`}),(0,b.jsx)("span",{className:`jsx-${l.__hash}`})]}),(0,b.jsx)("div",{className:`jsx-${l.__hash} state-brand`,children:"между нами."}),(0,b.jsx)("p",{className:`jsx-${l.__hash}`,children:"собираем ваши ответы"})]}),(0,b.jsx)(k,{}),(0,b.jsx)(c.default,{id:l.__hash,children:l})]});let z=r.couple.partner_a_name,A=r.couple.partner_b_name;return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("main",{className:`jsx-${l.__hash} page`,children:[(0,b.jsxs)("header",{className:`jsx-${l.__hash} header result-shell`,children:[(0,b.jsx)("div",{className:`jsx-${l.__hash} brand`,children:"между нами."}),(0,b.jsxs)("div",{className:`jsx-${l.__hash} couple-names`,children:[(0,b.jsx)("span",{className:`jsx-${l.__hash}`,children:z}),(0,b.jsx)("b",{className:`jsx-${l.__hash}`,children:"×"}),(0,b.jsx)("span",{className:`jsx-${l.__hash}`,children:A})]})]}),(0,b.jsx)("section",{className:`jsx-${l.__hash} scores result-shell`,children:x.map(a=>(0,b.jsx)(g,{category:a},a.id))}),(0,b.jsxs)("section",{className:`jsx-${l.__hash} forecast result-shell`,children:[(0,b.jsx)("div",{className:`jsx-${l.__hash} forecast-label`,children:"прогноз"}),(0,b.jsxs)("div",{className:`jsx-${l.__hash} forecast-grid`,children:[(0,b.jsxs)("div",{className:`jsx-${l.__hash} forecast-copy`,children:[(0,b.jsxs)("h2",{className:`jsx-${l.__hash}`,children:["Вы можете быть",(0,b.jsx)("br",{className:`jsx-${l.__hash}`}),"вместе очень долго"]}),(0,b.jsx)("p",{className:`jsx-${l.__hash}`,children:"На основе ваших ответов мы оценили, сколько лет вы можете быть вместе."})]}),(0,b.jsxs)("div",{className:`jsx-${l.__hash} forecast-result`,children:[(0,b.jsxs)("div",{className:`jsx-${l.__hash} years`,children:[y,(0,b.jsx)("span",{className:`jsx-${l.__hash}`,children:(m=(a=y)%100,n=a%10,m>=11&&m<=14?"лет":1===n?"год":n>=2&&n<=4?"года":"лет")})]}),(0,b.jsxs)("div",{className:`jsx-${l.__hash} forecast-scale`,children:[(0,b.jsxs)("div",{className:`jsx-${l.__hash} forecast-line`,children:[(0,b.jsx)("div",{style:{width:`${j(y)}%`},className:`jsx-${l.__hash} forecast-progress`}),(0,b.jsx)("div",{style:{left:`${j(y)}%`},className:`jsx-${l.__hash} forecast-dot`})]}),(0,b.jsxs)("div",{className:`jsx-${l.__hash} forecast-scale-labels`,children:[(0,b.jsx)("span",{className:`jsx-${l.__hash}`,children:"1 месяц"}),(0,b.jsx)("span",{className:`jsx-${l.__hash}`,children:"вся жизнь"})]})]})]})]})]}),(0,b.jsx)("section",{className:`jsx-${l.__hash} paid-section result-shell`,children:(0,b.jsxs)("div",{className:`jsx-${l.__hash} paid-card`,children:[(0,b.jsxs)("div",{className:`jsx-${l.__hash} paid-top`,children:[(0,b.jsxs)("div",{className:`jsx-${l.__hash} paid-title`,children:[(0,b.jsx)("div",{className:`jsx-${l.__hash} paid-label`,children:"полный разбор"}),(0,b.jsxs)("h2",{className:`jsx-${l.__hash}`,children:["Чтобы вместе —",(0,b.jsx)("br",{className:`jsx-${l.__hash}`}),"и надолго."]})]}),(0,b.jsxs)("div",{className:`jsx-${l.__hash} paid-benefits`,children:[(0,b.jsxs)(h,{children:["Где вы можете",(0,b.jsx)("br",{className:`jsx-${l.__hash}`}),"не понимать друг друга"]}),(0,b.jsxs)(h,{children:["Что каждый ждёт",(0,b.jsx)("br",{className:`jsx-${l.__hash}`}),"от отношений"]}),(0,b.jsxs)(h,{children:["Что может стать",(0,b.jsx)("br",{className:`jsx-${l.__hash}`}),"причиной ссор"]}),(0,b.jsxs)(h,{children:["Как сделать вашу",(0,b.jsx)("br",{className:`jsx-${l.__hash}`}),"пару крепче"]})]})]}),(0,b.jsx)(i,{}),(0,b.jsxs)("div",{className:`jsx-${l.__hash} paid-bottom`,children:[(0,b.jsxs)("button",{type:"button",onClick:()=>p.push(`/report/${q}`),className:`jsx-${l.__hash} buy-button`,children:[(0,b.jsx)("span",{className:`jsx-${l.__hash}`,children:"Открыть полный разбор"}),(0,b.jsx)("strong",{className:`jsx-${l.__hash}`,children:"299 ₽"}),(0,b.jsx)("i",{className:`jsx-${l.__hash}`,children:"→"})]}),(0,b.jsx)("div",{className:`jsx-${l.__hash} paid-note`,children:"один разбор · для вас двоих · сразу после оплаты"})]})]})})]}),(0,b.jsx)(k,{}),(0,b.jsx)(c.default,{id:l.__hash,children:l})]})}])}];

//# sourceMappingURL=app_result_%5BcoupleId%5D_page_tsx_1boadhs._.js.map