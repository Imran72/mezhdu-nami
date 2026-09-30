module.exports=[66248,a=>{"use strict";var b=a.i(87924),c=a.i(31626),d=a.i(72131),e=a.i(50944);let f={friendship:{title:"Дружба",subtitle:"хорошо ли вам просто вдвоём",keywords:["friend","fun","humor","laugh","together","free_saturday","normal_evening","weekend","weekend_plan","extra_hour"]},partnership:{title:"Партнёрство",subtitle:"вы команда или каждый сам за себя",keywords:["team","partner","support","decision","future","plan","responsibility","keep_in_year","relationship_button","want_more"]},sex:{title:"Секс",subtitle:"совпадает ли ваше представление о близости",keywords:["sex","sexual","intimacy","physical","touch","affection","closeness","romance"]},money:{title:"Деньги",subtitle:"одинаково ли вы смотрите на траты",keywords:["money","finance","spend","saving","budget","unexpected_money","purchase"]},care:{title:"Забота",subtitle:"понимаете ли вы «я рядом» одинаково",keywords:["care","support","help","hard_day","reunion","care_signal","emotion","attention","comfort"]},home:{title:"Быт",subtitle:"как вам живётся в обычный вторник",keywords:["home","house","routine","daily","chores","clean","food","sleep","normal_evening","weekend_plan"]}};function g({category:a}){return(0,b.jsxs)("article",{className:"score-row",children:[(0,b.jsxs)("div",{className:"score-header",children:[(0,b.jsxs)("div",{className:"score-copy",children:[(0,b.jsx)("h2",{children:a.title}),(0,b.jsx)("p",{children:a.subtitle})]}),(0,b.jsxs)("div",{className:"score-number",children:[(0,b.jsx)("strong",{children:a.score}),(0,b.jsx)("span",{children:"/10"})]})]}),(0,b.jsx)("div",{className:"score-track",children:(0,b.jsx)("div",{className:"score-fill",style:{width:`${10*a.score}%`}})})]})}function h({icon:a,children:c}){return(0,b.jsxs)("div",{className:"benefit",children:[(0,b.jsx)("div",{className:"benefit-icon",children:a}),(0,b.jsx)("div",{className:"benefit-text",children:c})]})}function i(a){return 4+92*Math.max(0,Math.min(1,a/55))}function j(){return(0,b.jsx)(c.default,{id:"a50a9a1ef888398b",children:"html,body{background:#faf7f4!important;margin:0!important;padding:0!important}body{color:#171315;font-family:Arial,Helvetica,sans-serif}*{box-sizing:border-box}button{font:inherit}"})}let k=`

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
  Основной контент специально остаётся узким.
*/

.result-shell {
  width: min(calc(100% - 40px), 720px);

  margin-left: auto;
  margin-right: auto;
}

/*
  Только рекламный блок шире.

  Это даёт нам горизонтальную композицию
  и не ломает остальную страницу.
*/

.paid-shell {
  width: min(calc(100% - 40px), 1120px);

  margin-left: auto;
  margin-right: auto;
}

/* ============================================================
   HEADER
============================================================ */

.header {
  height: 76px;

  display: flex;
  align-items: center;
  justify-content: space-between;
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

/* ============================================================
   SCORES
============================================================ */

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

  background: #c84170;
}

/* ============================================================
   FORECAST
============================================================ */

.forecast {
  padding: 32px 0 42px;

  border-top: 1px solid #ded8d6;
}

.forecast-label {
  margin-bottom: 12px;

  color: #c03a68;

  font-size: 10px;
  font-weight: 700;

  letter-spacing: 0.2em;

  text-transform: uppercase;
}

.forecast-grid {
  display: grid;

  grid-template-columns:
    minmax(0, 1.35fr)
    minmax(230px, 0.65fr);

  gap: 38px;

  align-items: center;
}

.forecast-copy h2 {
  max-width: 470px;

  margin: 0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 35px;
  font-weight: 400;

  line-height: 1.02;

  letter-spacing: -0.045em;
}

.forecast-copy p {
  max-width: 445px;

  margin: 14px 0 0;

  color: #898084;

  font-size: 12px;
  line-height: 1.5;
}

.forecast-result {
  min-width: 0;
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

/* ============================================================
   PAID CARD
============================================================ */

.paid-section {
  padding: 10px 0 58px;
}

.paid-card {
  position: relative;

  width: 100%;
  height: 540px;

  overflow: hidden;

  border-radius: 24px;

  background: #9f1749;

  color: white;

  isolation: isolate;
}

/* ============================================================
   IMAGE

   Картинка занимает большую часть карточки.

   Главное изменение:
   она НЕ заканчивается ровно там, где начинается правая часть.

   Правая часть накладывается поверх неё широким градиентом.
============================================================ */

.paid-scene {
  position: absolute;

  z-index: 1;

  inset: 0;

  width: 78%;
  height: 100%;

  overflow: hidden;
}

.paid-image {
  position: absolute;

  inset: 0;

  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;
  object-position: 47% center;
}

/*
  Затемняем левую верхнюю область под заголовок
  и начинаем растворять изображение справа.
*/

.scene-overlay {
  position: absolute;

  z-index: 2;

  inset: 0;

  pointer-events: none;

  background:
    linear-gradient(
      180deg,
      rgba(68, 7, 29, 0.25) 0%,
      rgba(68, 7, 29, 0.05) 45%,
      rgba(68, 7, 29, 0.08) 100%
    ),
    linear-gradient(
      90deg,
      rgba(108, 11, 47, 0.04) 0%,
      rgba(108, 11, 47, 0.02) 50%,
      rgba(155, 20, 70, 0.12) 67%,
      rgba(158, 22, 72, 0.45) 82%,
      rgba(158, 22, 72, 0.92) 100%
    );
}

/* ============================================================
   RIGHT BACKGROUND

   Вместо жёстких 32% теперь правая панель
   начинается гораздо левее, но первые ~200px прозрачные.

   Именно это убирает вертикальный стык.
============================================================ */

.paid-right-bg {
  position: absolute;

  z-index: 2;

  top: 0;
  right: 0;
  bottom: 0;

  width: 52%;

  pointer-events: none;

  background:
    radial-gradient(
      circle at 88% 0%,
      rgba(255, 255, 255, 0.07) 0%,
      rgba(255, 255, 255, 0) 48%
    ),
    linear-gradient(
      90deg,
      rgba(157, 22, 71, 0) 0%,
      rgba(157, 22, 71, 0.18) 14%,
      rgba(157, 22, 71, 0.55) 30%,
      rgba(157, 22, 71, 0.88) 46%,
      #9d1647 63%,
      #991443 100%
    );
}

/* ============================================================
   TITLE
============================================================ */

.paid-heading {
  position: absolute;

  z-index: 10;

  top: 43px;
  left: 54px;

  width: 455px;
}

.paid-label {
  margin-bottom: 16px;

  color: rgba(255, 232, 239, 0.88);

  font-size: 12px;
  font-weight: 700;

  letter-spacing: 0.19em;

  text-transform: uppercase;

  text-shadow:
    0 1px 8px rgba(55, 6, 25, 0.25);
}

.paid-heading h2 {
  margin: 0;

  color: #fff9f6;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 55px;
  font-weight: 400;

  line-height: 0.94;

  letter-spacing: -0.055em;

  text-shadow:
    0 2px 18px rgba(65, 9, 32, 0.25);
}

/* ============================================================
   BENEFITS
============================================================ */

.paid-benefits {
  position: absolute;

  z-index: 10;

  top: 51px;
  right: 52px;

  width: 300px;

  display: flex;
  flex-direction: column;

  gap: 24px;
}

.benefit {
  display: grid;

  grid-template-columns:
    27px
    minmax(0, 1fr);

  gap: 13px;

  align-items: start;
}

.benefit-icon {
  color: #ffd2df;

  font-size: 18px;
  font-weight: 700;

  line-height: 1.15;

  text-align: center;
}

.benefit-text {
  color: #fff9fb;

  font-size: 17px;
  line-height: 1.28;

  text-shadow:
    0 1px 9px rgba(75, 9, 34, 0.18);
}

/* ============================================================
   CTA
============================================================ */

.paid-bottom {
  position: absolute;

  z-index: 20;

  left: 54px;
  right: 54px;
  bottom: 25px;
}

.buy-button {
  width: 100%;

  display: grid;

  grid-template-columns:
    1fr
    auto
    34px;

  gap: 28px;

  align-items: center;

  min-height: 82px;

  padding:
    18px
    29px;

  border: 0;

  border-radius: 18px;

  background: #fffaf7;

  color: #181316;

  cursor: pointer;

  box-shadow:
    0 12px 34px rgba(72, 16, 39, 0.22);

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

  font-size: 17px;
  font-weight: 700;
}

.buy-button strong {
  color: #b52056;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 31px;
  font-weight: 400;

  white-space: nowrap;
}

.buy-button i {
  color: #bd285d;

  font-size: 31px;

  font-style: normal;

  text-align: right;
}

.paid-note {
  margin-top: 10px;

  color:
    rgba(255, 232, 239, 0.75);

  font-size: 11px;

  text-align: center;

  text-shadow:
    0 1px 5px rgba(73, 9, 33, 0.28);
}

/* ============================================================
   STATE
============================================================ */

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

/* ============================================================
   TABLET
============================================================ */

@media (max-width: 900px) and (min-width: 651px) {

  .paid-shell {
    width: min(calc(100% - 40px), 820px);
  }

  .paid-card {
    height: 480px;
  }

  .paid-heading {
    top: 35px;
    left: 35px;

    width: 350px;
  }

  .paid-heading h2 {
    font-size: 45px;
  }

  .paid-benefits {
    top: 40px;
    right: 28px;

    width: 230px;

    gap: 18px;
  }

  .benefit-text {
    font-size: 14px;
  }

  .paid-bottom {
    left: 35px;
    right: 35px;
  }
}

/* ============================================================
   MOBILE
============================================================ */

@media (max-width: 650px) {

  .result-shell,
  .paid-shell {
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
    padding:
      9px 0
      25px;
  }

  .score-row {
    padding:
      11px 0
      10px;
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
  }

  /* FORECAST */

  .forecast {
    padding:
      27px 0
      32px;
  }

  .forecast-grid {
    grid-template-columns: 1fr;

    gap: 24px;
  }

  .forecast-copy h2 {
    max-width: 330px;

    font-size: 31px;

    line-height: 1.02;
  }

  .forecast-copy p {
    max-width: 330px;

    font-size: 11px;
  }

  .years {
    font-size: 61px;
  }

  .years span {
    font-size: 37px;
  }

  /* ============================================================
     PAID MOBILE
  ============================================================ */

  .paid-section {
    padding:
      5px 0
      30px;
  }

  .paid-card {
    height: 570px;

    border-radius: 18px;

    background: #9e1748;
  }

  /*
    На мобильном картинка занимает верх.
    Внизу она плавно растворяется в бордовый.
  */

  .paid-scene {
    top: 0;
    left: 0;
    right: 0;
    bottom: auto;

    width: 100%;
    height: 66%;
  }

  .paid-image {
    object-position: 42% center;
  }

  .scene-overlay {
    background:
      linear-gradient(
        180deg,
        rgba(69, 8, 32, 0.12) 0%,
        rgba(69, 8, 32, 0.02) 40%,
        rgba(120, 14, 52, 0.10) 57%,
        rgba(151, 21, 68, 0.55) 78%,
        #9e1748 100%
      );
  }

  .paid-right-bg {
    z-index: 2;

    top: 48%;
    right: 0;
    bottom: 0;

    width: 100%;

    background:
      linear-gradient(
        180deg,
        rgba(158, 23, 72, 0) 0%,
        rgba(158, 23, 72, 0.7) 30%,
        #9e1748 58%,
        #941340 100%
      );
  }

  /* TITLE */

  .paid-heading {
    top: 22px;
    left: 20px;

    width: calc(100% - 40px);
  }

  .paid-label {
    margin-bottom: 9px;

    font-size: 9px;
  }

  .paid-heading h2 {
    max-width: 310px;

    font-size: 35px;

    line-height: 0.96;
  }

  /* BENEFITS */

  .paid-benefits {
    top: auto;

    left: 19px;
    right: 19px;
    bottom: 105px;

    width: auto;

    display: grid;

    grid-template-columns:
      1fr
      1fr;

    gap:
      11px
      15px;
  }

  .benefit {
    grid-template-columns:
      15px
      minmax(0, 1fr);

    gap: 6px;
  }

  .benefit-icon {
    font-size: 11px;
  }

  .benefit-text {
    font-size: 9px;

    line-height: 1.28;
  }

  /* CTA */

  .paid-bottom {
    left: 12px;
    right: 12px;

    bottom: 10px;
  }

  .buy-button {
    min-height: 56px;

    grid-template-columns:
      1fr
      auto
      auto;

    gap: 9px;

    padding:
      13px
      15px;

    border-radius: 13px;
  }

  .buy-button span {
    font-size: 10px;
  }

  .buy-button strong {
    font-size: 18px;
  }

  .buy-button i {
    font-size: 20px;
  }

  .paid-note {
    margin-top: 6px;

    font-size: 8px;
  }
}

`;a.s(["default",0,function(){var a;let l,m,n=(0,e.useParams)(),o=(0,e.useRouter)(),p=n.coupleId,[q,r]=(0,d.useState)(null),[s,t]=(0,d.useState)("");(0,d.useEffect)(()=>{let a=!1;return async function(){try{let b=await fetch(`/api/report?id=${encodeURIComponent(p)}`,{cache:"no-store"});if(!b.ok)throw Error("Не удалось загрузить результат");let c=await b.json();if(a)return;if(c.waiting)return void o.replace(`/waiting/${p}`);r(c)}catch(b){console.error(b),a||t("Не получилось загрузить результат.")}}(),()=>{a=!0}},[p,o]);let u=(0,d.useMemo)(()=>q?.comparisons??[],[q]),v=(0,d.useMemo)(()=>{var a,b;return"number"==typeof q?.scores?.overall?Number.isFinite(a=q.scores.overall)?a>=0&&a<=1?Math.round(100*a):Math.round(Math.max(0,Math.min(100,a))):0:(b=u).length?Math.round(b.reduce((a,b)=>"same"===b.similarity?a+1:"close"===b.similarity?a+.55:a,0)/b.length*100):50},[q,u]),w=(0,d.useMemo)(()=>{var a,b;return a=u,b=v,["friendship","partnership","sex","money","care","home"].map(c=>{var d;let e=f[c],g=a.filter(a=>{var b,c;let d;return b=a,c=e.keywords,d=[b.questionId,b.question,...b.traitsA??[],...b.traitsB??[],...b.sharedTraits??[]].join(" ").toLowerCase(),c.some(a=>d.includes(a.toLowerCase()))}),h=g.length>0?g:a,i=h.length>0?(d=h).length?Math.round(d.reduce((a,b)=>"same"===b.similarity?a+1:"close"===b.similarity?a+.55:a,0)/d.length*100):50:b;return{id:c,title:e.title,subtitle:e.subtitle,score:Math.max(0,Math.min(10,Math.round(i/10)))}})},[u,v]),x=(0,d.useMemo)(()=>{var a,b;return a=w,b=v,a.length?Math.max(1,Math.min(55,Math.round(1+54*Math.pow((.6*(a.reduce((a,b)=>a+b.score,0)/a.length)+.2*Math.min(...a.map(a=>a.score))+.1*Math.max(...a.map(a=>a.score))+b/10*.1)/10,1.55)))):1},[w,v]);if(s)return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("main",{className:`jsx-${k.__hash} state-page`,children:[(0,b.jsx)("div",{className:`jsx-${k.__hash} state-brand`,children:"между нами."}),(0,b.jsx)("h1",{className:`jsx-${k.__hash}`,children:"не получилось открыть результат"}),(0,b.jsx)("p",{className:`jsx-${k.__hash}`,children:s})]}),(0,b.jsx)(j,{}),(0,b.jsx)(c.default,{id:k.__hash,children:k})]});if(!q)return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("main",{className:`jsx-${k.__hash} state-page`,children:[(0,b.jsxs)("div",{className:`jsx-${k.__hash} loader`,children:[(0,b.jsx)("span",{className:`jsx-${k.__hash}`}),(0,b.jsx)("span",{className:`jsx-${k.__hash}`})]}),(0,b.jsx)("div",{className:`jsx-${k.__hash} state-brand`,children:"между нами."}),(0,b.jsx)("p",{className:`jsx-${k.__hash}`,children:"собираем ваши ответы"})]}),(0,b.jsx)(j,{}),(0,b.jsx)(c.default,{id:k.__hash,children:k})]});let y=q.couple.partner_a_name,z=q.couple.partner_b_name;return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("main",{className:`jsx-${k.__hash} page`,children:[(0,b.jsxs)("header",{className:`jsx-${k.__hash} header result-shell`,children:[(0,b.jsx)("div",{className:`jsx-${k.__hash} brand`,children:"между нами."}),(0,b.jsxs)("div",{className:`jsx-${k.__hash} couple-names`,children:[(0,b.jsx)("span",{className:`jsx-${k.__hash}`,children:y}),(0,b.jsx)("b",{className:`jsx-${k.__hash}`,children:"×"}),(0,b.jsx)("span",{className:`jsx-${k.__hash}`,children:z})]})]}),(0,b.jsx)("section",{className:`jsx-${k.__hash} scores result-shell`,children:w.map(a=>(0,b.jsx)(g,{category:a},a.id))}),(0,b.jsxs)("section",{className:`jsx-${k.__hash} forecast result-shell`,children:[(0,b.jsx)("div",{className:`jsx-${k.__hash} forecast-label`,children:"прогноз"}),(0,b.jsxs)("div",{className:`jsx-${k.__hash} forecast-grid`,children:[(0,b.jsxs)("div",{className:`jsx-${k.__hash} forecast-copy`,children:[(0,b.jsxs)("h2",{className:`jsx-${k.__hash}`,children:["Ориентировочный прогноз",(0,b.jsx)("br",{className:`jsx-${k.__hash}`}),"длительности отношений"]}),(0,b.jsx)("p",{className:`jsx-${k.__hash}`,children:"На основе того, насколько совпадают ваши ответы в ключевых сферах отношений."})]}),(0,b.jsxs)("div",{className:`jsx-${k.__hash} forecast-result`,children:[(0,b.jsxs)("div",{className:`jsx-${k.__hash} years`,children:[x,(0,b.jsx)("span",{className:`jsx-${k.__hash}`,children:(l=(a=x)%100,m=a%10,l>=11&&l<=14?"лет":1===m?"год":m>=2&&m<=4?"года":"лет")})]}),(0,b.jsxs)("div",{className:`jsx-${k.__hash} forecast-scale`,children:[(0,b.jsxs)("div",{className:`jsx-${k.__hash} forecast-line`,children:[(0,b.jsx)("div",{style:{width:`${i(x)}%`},className:`jsx-${k.__hash} forecast-progress`}),(0,b.jsx)("div",{style:{left:`${i(x)}%`},className:`jsx-${k.__hash} forecast-dot`})]}),(0,b.jsxs)("div",{className:`jsx-${k.__hash} forecast-scale-labels`,children:[(0,b.jsx)("span",{className:`jsx-${k.__hash}`,children:"1 месяц"}),(0,b.jsx)("span",{className:`jsx-${k.__hash}`,children:"вся жизнь"})]})]})]})]})]}),(0,b.jsx)("section",{className:`jsx-${k.__hash} paid-section paid-shell`,children:(0,b.jsxs)("div",{className:`jsx-${k.__hash} paid-card`,children:[(0,b.jsxs)("div",{className:`jsx-${k.__hash} paid-scene`,children:[(0,b.jsx)("img",{src:"/images/full-report-scene.png",alt:"",className:`jsx-${k.__hash} paid-image`}),(0,b.jsx)("div",{className:`jsx-${k.__hash} scene-overlay`})]}),(0,b.jsx)("div",{className:`jsx-${k.__hash} paid-right-bg`}),(0,b.jsxs)("div",{className:`jsx-${k.__hash} paid-heading`,children:[(0,b.jsx)("div",{className:`jsx-${k.__hash} paid-label`,children:"полный разбор"}),(0,b.jsxs)("h2",{className:`jsx-${k.__hash}`,children:["Чтобы вместе —",(0,b.jsx)("br",{className:`jsx-${k.__hash}`}),"и надолго."]})]}),(0,b.jsxs)("div",{className:`jsx-${k.__hash} paid-benefits`,children:[(0,b.jsxs)(h,{icon:"♥",children:["Где вы можете",(0,b.jsx)("br",{className:`jsx-${k.__hash}`}),"не понимать друг друга"]}),(0,b.jsxs)(h,{icon:"▰",children:["Что каждый ждёт",(0,b.jsx)("br",{className:`jsx-${k.__hash}`}),"от отношений"]}),(0,b.jsxs)(h,{icon:"ϟ",children:["Что может стать",(0,b.jsx)("br",{className:`jsx-${k.__hash}`}),"причиной ссор"]}),(0,b.jsxs)(h,{icon:"▥",children:["Как сделать вашу",(0,b.jsx)("br",{className:`jsx-${k.__hash}`}),"пару крепче"]})]}),(0,b.jsxs)("div",{className:`jsx-${k.__hash} paid-bottom`,children:[(0,b.jsxs)("button",{type:"button",onClick:()=>o.push(`/report/${p}`),className:`jsx-${k.__hash} buy-button`,children:[(0,b.jsx)("span",{className:`jsx-${k.__hash}`,children:"Открыть полный разбор"}),(0,b.jsx)("strong",{className:`jsx-${k.__hash}`,children:"299 ₽"}),(0,b.jsx)("i",{className:`jsx-${k.__hash}`,children:"→"})]}),(0,b.jsx)("div",{className:`jsx-${k.__hash} paid-note`,children:"один разбор · для вас двоих · сразу после оплаты"})]})]})})]}),(0,b.jsx)(j,{}),(0,b.jsx)(c.default,{id:k.__hash,children:k})]})}])}];

//# sourceMappingURL=app_result_%5BcoupleId%5D_page_tsx_1boadhs._.js.map