(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,95801,e=>{"use strict";var t=e.i(43476),s=e.i(37902),i=e.i(71645),r=e.i(18566);let n={friendship:{title:"Дружба",subtitle:"хорошо ли вам просто вдвоём",keywords:["friend","fun","humor","laugh","together","free_saturday","normal_evening","weekend","weekend_plan","extra_hour"]},partnership:{title:"Партнёрство",subtitle:"вы команда или каждый сам за себя",keywords:["team","partner","support","decision","future","plan","responsibility","keep_in_year","relationship_button","want_more"]},sex:{title:"Секс",subtitle:"совпадает ли ваше представление о близости",keywords:["sex","sexual","intimacy","physical","touch","affection","closeness","romance"]},money:{title:"Деньги",subtitle:"одинаково ли вы смотрите на траты",keywords:["money","finance","spend","saving","budget","unexpected_money","purchase"]},care:{title:"Забота",subtitle:"понимаете ли вы «я рядом» одинаково",keywords:["care","support","help","hard_day","reunion","care_signal","emotion","attention","comfort"]},home:{title:"Быт",subtitle:"как вам живётся в обычный вторник",keywords:["home","house","routine","daily","chores","clean","food","sleep","normal_evening","weekend_plan"]}};function a({category:e}){return(0,t.jsxs)("article",{className:"score-row",children:[(0,t.jsxs)("div",{className:"score-header",children:[(0,t.jsxs)("div",{className:"score-copy",children:[(0,t.jsx)("h2",{children:e.title}),(0,t.jsx)("p",{children:e.subtitle})]}),(0,t.jsxs)("div",{className:"score-number",children:[(0,t.jsx)("strong",{children:e.score}),(0,t.jsx)("span",{children:"/10"})]})]}),(0,t.jsx)("div",{className:"score-track",children:(0,t.jsx)("div",{className:"score-fill",style:{width:`${10*e.score}%`}})})]})}function o({icon:e,children:s}){return(0,t.jsxs)("div",{className:"benefit",children:[(0,t.jsx)("div",{className:"benefit-icon",children:e}),(0,t.jsx)("div",{className:"benefit-text",children:s})]})}function l(e){return 4+92*Math.max(0,Math.min(1,e/55))}function c(){return(0,t.jsx)(s.default,{id:"fb97b29ba7163c84",children:"html,body{background:#faf7f4!important;margin:0!important;padding:0!important}body{color:#171315;font-family:Arial,Helvetica,sans-serif}*{box-sizing:border-box}button{font:inherit}"})}let h=`

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

.result-shell {
  width: min(calc(100% - 40px), 720px);

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
  padding: 8px 0 54px;
}

.paid-card {
  position: relative;

  width: 100%;
  height: 420px;

  overflow: hidden;

  border-radius: 20px;

  background: #a71f50;

  color: white;

  isolation: isolate;
}

/* IMAGE */

.paid-image {
  position: absolute;

  z-index: 1;

  inset: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;

  object-position: center;

  display: block;
}

/*
  Небольшой градиент нужен только для читаемости текста.
  Сама картинка остаётся хорошо видимой.
*/

.paid-overlay {
  position: absolute;

  z-index: 2;

  inset: 0;

  background:
    linear-gradient(
      90deg,
      rgba(79, 17, 45, 0.10) 0%,
      rgba(79, 17, 45, 0.03) 45%,
      rgba(91, 17, 50, 0.30) 66%,
      rgba(91, 17, 50, 0.48) 100%
    );

  pointer-events: none;
}

/* CONTENT */

.paid-content {
  position: relative;

  z-index: 5;

  display: grid;

  grid-template-columns:
    minmax(0, 1.05fr)
    minmax(230px, 0.95fr);

  gap: 55px;

  height: 100%;

  padding:
    28px
    36px
    105px;
}

.paid-label {
  margin-bottom: 12px;

  color: #f1cad6;

  font-size: 10px;
  font-weight: 700;

  letter-spacing: 0.18em;

  text-transform: uppercase;
}

.paid-heading h2 {
  margin: 0;

  color: #fff8f5;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 41px;
  font-weight: 400;

  line-height: 0.94;

  letter-spacing: -0.055em;

  text-shadow:
    0 2px 14px rgba(65, 9, 32, 0.12);
}

/* BENEFITS */

.paid-benefits {
  display: flex;
  flex-direction: column;

  gap: 15px;

  padding-top: 4px;
}

.benefit {
  display: grid;

  grid-template-columns: 23px 1fr;

  gap: 8px;

  align-items: start;
}

.benefit-icon {
  color: #ffd1df;

  font-size: 15px;
  font-weight: 700;

  line-height: 1;
}

.benefit-text {
  color: #fff8fa;

  font-size: 12px;
  line-height: 1.25;

  text-shadow:
    0 1px 8px rgba(75, 9, 34, 0.25);
}

/* CTA */

.paid-bottom {
  position: absolute;

  z-index: 20;

  left: 36px;
  right: 36px;
  bottom: 18px;
}

.buy-button {
  width: 100%;

  display: grid;

  grid-template-columns:
    1fr auto auto;

  gap: 20px;

  align-items: center;

  min-height: 60px;

  padding: 14px 20px;

  border: 0;
  border-radius: 13px;

  background: #fffaf7;

  color: #181316;

  cursor: pointer;

  box-shadow:
    0 10px 28px rgba(72, 16, 39, 0.18);

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

  font-size: 13px;
  font-weight: 700;
}

.buy-button strong {
  color: #b52056;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 21px;
  font-weight: 400;

  white-space: nowrap;
}

.buy-button i {
  color: #bd285d;

  font-size: 23px;
  font-style: normal;
}

.paid-note {
  margin-top: 7px;

  color: rgba(255, 232, 239, 0.76);

  font-size: 9px;

  text-align: center;
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
   MOBILE
============================================================ */

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

  /* PAID */

  .paid-section {
    padding:
      5px 0
      30px;
  }

  .paid-card {
    height: 570px;

    border-radius: 17px;
  }

  /*
    На телефоне картинка немного смещается влево:
    персонажи остаются в кадре,
    а справа появляется место под текст.
  */

  .paid-image {
    object-position: 39% center;
  }

  .paid-overlay {
    background:
      linear-gradient(
        180deg,
        rgba(83, 13, 43, 0.12) 0%,
        rgba(83, 13, 43, 0.08) 40%,
        rgba(83, 13, 43, 0.26) 68%,
        rgba(83, 13, 43, 0.58) 100%
      );
  }

  .paid-content {
    display: block;

    padding:
      23px
      20px
      110px;
  }

  .paid-label {
    margin-bottom: 9px;

    font-size: 9px;
  }

  .paid-heading h2 {
    max-width: 290px;

    font-size: 36px;
  }

  /*
    На мобиле преимущества делаем компактной
    сеткой внизу картинки, чтобы они не закрывали
    персонажей и замок.
  */

  .paid-benefits {
    position: absolute;

    left: 20px;
    right: 20px;

    bottom: 110px;

    display: grid;

    grid-template-columns:
      1fr 1fr;

    gap:
      9px
      14px;

    padding: 12px;

    border-radius: 12px;

    background:
      rgba(82, 18, 46, 0.54);

    backdrop-filter:
      blur(5px);
  }

  .benefit {
    grid-template-columns:
      15px 1fr;

    gap: 6px;
  }

  .benefit-icon {
    font-size: 11px;
  }

  .benefit-text {
    font-size: 9px;

    line-height: 1.25;
  }

  .paid-bottom {
    left: 12px;
    right: 12px;
    bottom: 11px;
  }

  .buy-button {
    min-height: 55px;

    gap: 8px;

    padding:
      13px
      14px;
  }

  .buy-button span {
    font-size: 10px;
  }

  .buy-button strong {
    font-size: 17px;
  }

  .buy-button i {
    font-size: 19px;
  }

  .paid-note {
    margin-top: 6px;

    font-size: 8px;
  }
}

`;e.s(["default",0,function(){var e;let d,p,u=(0,r.useParams)(),f=(0,r.useRouter)(),m=u.coupleId,[x,g]=(0,i.useState)(null),[_,b]=(0,i.useState)("");(0,i.useEffect)(()=>{let e=!1;return async function(){try{let t=await fetch(`/api/report?id=${encodeURIComponent(m)}`,{cache:"no-store"});if(!t.ok)throw Error("Не удалось загрузить результат");let s=await t.json();if(e)return;if(s.waiting)return void f.replace(`/waiting/${m}`);g(s)}catch(t){console.error(t),e||b("Не получилось загрузить результат.")}}(),()=>{e=!0}},[m,f]);let y=(0,i.useMemo)(()=>x?.comparisons??[],[x]),j=(0,i.useMemo)(()=>{var e,t;return"number"==typeof x?.scores?.overall?Number.isFinite(e=x.scores.overall)?e>=0&&e<=1?Math.round(100*e):Math.round(Math.max(0,Math.min(100,e))):0:(t=y).length?Math.round(t.reduce((e,t)=>"same"===t.similarity?e+1:"close"===t.similarity?e+.55:e,0)/t.length*100):50},[x,y]),v=(0,i.useMemo)(()=>{var e,t;return e=y,t=j,["friendship","partnership","sex","money","care","home"].map(s=>{var i;let r=n[s],a=e.filter(e=>{var t,s;let i;return t=e,s=r.keywords,i=[t.questionId,t.question,...t.traitsA??[],...t.traitsB??[],...t.sharedTraits??[]].join(" ").toLowerCase(),s.some(e=>i.includes(e.toLowerCase()))}),o=a.length>0?a:e,l=o.length>0?(i=o).length?Math.round(i.reduce((e,t)=>"same"===t.similarity?e+1:"close"===t.similarity?e+.55:e,0)/i.length*100):50:t;return{id:s,title:r.title,subtitle:r.subtitle,score:Math.max(0,Math.min(10,Math.round(l/10)))}})},[y,j]),w=(0,i.useMemo)(()=>{var e,t;return e=v,t=j,e.length?Math.max(1,Math.min(55,Math.round(1+54*Math.pow((.6*(e.reduce((e,t)=>e+t.score,0)/e.length)+.2*Math.min(...e.map(e=>e.score))+.1*Math.max(...e.map(e=>e.score))+t/10*.1)/10,1.55)))):1},[v,j]);if(_)return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("main",{className:`jsx-${h.__hash} state-page`,children:[(0,t.jsx)("div",{className:`jsx-${h.__hash} state-brand`,children:"между нами."}),(0,t.jsx)("h1",{className:`jsx-${h.__hash}`,children:"не получилось открыть результат"}),(0,t.jsx)("p",{className:`jsx-${h.__hash}`,children:_})]}),(0,t.jsx)(c,{}),(0,t.jsx)(s.default,{id:h.__hash,children:h})]});if(!x)return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("main",{className:`jsx-${h.__hash} state-page`,children:[(0,t.jsxs)("div",{className:`jsx-${h.__hash} loader`,children:[(0,t.jsx)("span",{className:`jsx-${h.__hash}`}),(0,t.jsx)("span",{className:`jsx-${h.__hash}`})]}),(0,t.jsx)("div",{className:`jsx-${h.__hash} state-brand`,children:"между нами."}),(0,t.jsx)("p",{className:`jsx-${h.__hash}`,children:"собираем ваши ответы"})]}),(0,t.jsx)(c,{}),(0,t.jsx)(s.default,{id:h.__hash,children:h})]});let S=x.couple.partner_a_name,N=x.couple.partner_b_name;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("main",{className:`jsx-${h.__hash} page`,children:[(0,t.jsxs)("header",{className:`jsx-${h.__hash} header result-shell`,children:[(0,t.jsx)("div",{className:`jsx-${h.__hash} brand`,children:"между нами."}),(0,t.jsxs)("div",{className:`jsx-${h.__hash} couple-names`,children:[(0,t.jsx)("span",{className:`jsx-${h.__hash}`,children:S}),(0,t.jsx)("b",{className:`jsx-${h.__hash}`,children:"×"}),(0,t.jsx)("span",{className:`jsx-${h.__hash}`,children:N})]})]}),(0,t.jsx)("section",{className:`jsx-${h.__hash} scores result-shell`,children:v.map(e=>(0,t.jsx)(a,{category:e},e.id))}),(0,t.jsxs)("section",{className:`jsx-${h.__hash} forecast result-shell`,children:[(0,t.jsx)("div",{className:`jsx-${h.__hash} forecast-label`,children:"прогноз"}),(0,t.jsxs)("div",{className:`jsx-${h.__hash} forecast-grid`,children:[(0,t.jsxs)("div",{className:`jsx-${h.__hash} forecast-copy`,children:[(0,t.jsxs)("h2",{className:`jsx-${h.__hash}`,children:["Вы можете быть",(0,t.jsx)("br",{className:`jsx-${h.__hash}`}),"вместе очень долго"]}),(0,t.jsx)("p",{className:`jsx-${h.__hash}`,children:"На основе ваших ответов мы оценили, сколько лет вы можете быть вместе."})]}),(0,t.jsxs)("div",{className:`jsx-${h.__hash} forecast-result`,children:[(0,t.jsxs)("div",{className:`jsx-${h.__hash} years`,children:[w,(0,t.jsx)("span",{className:`jsx-${h.__hash}`,children:(d=(e=w)%100,p=e%10,d>=11&&d<=14?"лет":1===p?"год":p>=2&&p<=4?"года":"лет")})]}),(0,t.jsxs)("div",{className:`jsx-${h.__hash} forecast-scale`,children:[(0,t.jsxs)("div",{className:`jsx-${h.__hash} forecast-line`,children:[(0,t.jsx)("div",{style:{width:`${l(w)}%`},className:`jsx-${h.__hash} forecast-progress`}),(0,t.jsx)("div",{style:{left:`${l(w)}%`},className:`jsx-${h.__hash} forecast-dot`})]}),(0,t.jsxs)("div",{className:`jsx-${h.__hash} forecast-scale-labels`,children:[(0,t.jsx)("span",{className:`jsx-${h.__hash}`,children:"1 месяц"}),(0,t.jsx)("span",{className:`jsx-${h.__hash}`,children:"вся жизнь"})]})]})]})]})]}),(0,t.jsx)("section",{className:`jsx-${h.__hash} paid-section result-shell`,children:(0,t.jsxs)("div",{className:`jsx-${h.__hash} paid-card`,children:[(0,t.jsx)("img",{src:"/images/full-report-scene.png",alt:"",className:`jsx-${h.__hash} paid-image`}),(0,t.jsx)("div",{className:`jsx-${h.__hash} paid-overlay`}),(0,t.jsxs)("div",{className:`jsx-${h.__hash} paid-content`,children:[(0,t.jsxs)("div",{className:`jsx-${h.__hash} paid-heading`,children:[(0,t.jsx)("div",{className:`jsx-${h.__hash} paid-label`,children:"полный разбор"}),(0,t.jsxs)("h2",{className:`jsx-${h.__hash}`,children:["Чтобы вместе —",(0,t.jsx)("br",{className:`jsx-${h.__hash}`}),"и надолго."]})]}),(0,t.jsxs)("div",{className:`jsx-${h.__hash} paid-benefits`,children:[(0,t.jsxs)(o,{icon:"♥",children:["Где вы можете",(0,t.jsx)("br",{className:`jsx-${h.__hash}`}),"не понимать друг друга"]}),(0,t.jsxs)(o,{icon:"▰",children:["Что каждый ждёт",(0,t.jsx)("br",{className:`jsx-${h.__hash}`}),"от отношений"]}),(0,t.jsxs)(o,{icon:"ϟ",children:["Что может стать",(0,t.jsx)("br",{className:`jsx-${h.__hash}`}),"причиной ссор"]}),(0,t.jsxs)(o,{icon:"▥",children:["Как сделать вашу",(0,t.jsx)("br",{className:`jsx-${h.__hash}`}),"пару крепче"]})]})]}),(0,t.jsxs)("div",{className:`jsx-${h.__hash} paid-bottom`,children:[(0,t.jsxs)("button",{type:"button",onClick:()=>f.push(`/report/${m}`),className:`jsx-${h.__hash} buy-button`,children:[(0,t.jsx)("span",{className:`jsx-${h.__hash}`,children:"Открыть полный разбор"}),(0,t.jsx)("strong",{className:`jsx-${h.__hash}`,children:"299 ₽"}),(0,t.jsx)("i",{className:`jsx-${h.__hash}`,children:"→"})]}),(0,t.jsx)("div",{className:`jsx-${h.__hash} paid-note`,children:"один разбор · для вас двоих · сразу после оплаты"})]})]})})]}),(0,t.jsx)(c,{}),(0,t.jsx)(s.default,{id:h.__hash,children:h})]})}])},16015,(e,t,s)=>{},18566,(e,t,s)=>{t.exports=e.r(76562)},98547,(e,t,s)=>{var i=e.i(47167);e.r(16015);var r=e.r(71645),n=r&&"object"==typeof r&&"default"in r?r:{default:r},a=void 0!==i.default&&i.default.env&&!0,o=function(e){return"[object String]"===Object.prototype.toString.call(e)},l=function(){function e(e){var t=void 0===e?{}:e,s=t.name,i=void 0===s?"stylesheet":s,r=t.optimizeForSpeed,n=void 0===r?a:r;c(o(i),"`name` must be a string"),this._name=i,this._deletedRulePlaceholder="#"+i+"-deleted-rule____{}",c("boolean"==typeof n,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=n,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0;var l="u">typeof window&&document.querySelector('meta[property="csp-nonce"]');this._nonce=l?l.getAttribute("content"):null}var t,s=e.prototype;return s.setOptimizeForSpeed=function(e){c("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),c(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},s.isOptimizeForSpeed=function(){return this._optimizeForSpeed},s.inject=function(){var e=this;if(c(!this._injected,"sheet already injected"),this._injected=!0,"u">typeof window&&this._optimizeForSpeed){this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),this._optimizeForSpeed||(a||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0);return}this._serverSheet={cssRules:[],insertRule:function(t,s){return"number"==typeof s?e._serverSheet.cssRules[s]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),s},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},s.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},s.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},s.insertRule=function(e,t){if(c(o(e),"`insertRule` accepts only strings"),"u"<typeof window)return"number"!=typeof t&&(t=this._serverSheet.cssRules.length),this._serverSheet.insertRule(e,t),this._rulesCount++;if(this._optimizeForSpeed){var s=this.getSheet();"number"!=typeof t&&(t=s.cssRules.length);try{s.insertRule(e,t)}catch(t){return a||console.warn("StyleSheet: illegal rule: \n\n"+e+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var i=this._tags[t];this._tags.push(this.makeStyleTag(this._name,e,i))}return this._rulesCount++},s.replaceRule=function(e,t){if(this._optimizeForSpeed||"u"<typeof window){var s="u">typeof window?this.getSheet():this._serverSheet;if(t.trim()||(t=this._deletedRulePlaceholder),!s.cssRules[e])return e;s.deleteRule(e);try{s.insertRule(t,e)}catch(i){a||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),s.insertRule(this._deletedRulePlaceholder,e)}}else{var i=this._tags[e];c(i,"old rule at index `"+e+"` not found"),i.textContent=t}return e},s.deleteRule=function(e){if("u"<typeof window)return void this._serverSheet.deleteRule(e);if(this._optimizeForSpeed)this.replaceRule(e,"");else{var t=this._tags[e];c(t,"rule at index `"+e+"` not found"),t.parentNode.removeChild(t),this._tags[e]=null}},s.flush=function(){this._injected=!1,this._rulesCount=0,"u">typeof window?(this._tags.forEach(function(e){return e&&e.parentNode.removeChild(e)}),this._tags=[]):this._serverSheet.cssRules=[]},s.cssRules=function(){var e=this;return"u"<typeof window?this._serverSheet.cssRules:this._tags.reduce(function(t,s){return s?t=t.concat(Array.prototype.map.call(e.getSheetForTag(s).cssRules,function(t){return t.cssText===e._deletedRulePlaceholder?null:t})):t.push(null),t},[])},s.makeStyleTag=function(e,t,s){t&&c(o(t),"makeStyleTag accepts only strings as second parameter");var i=document.createElement("style");this._nonce&&i.setAttribute("nonce",this._nonce),i.type="text/css",i.setAttribute("data-"+e,""),t&&i.appendChild(document.createTextNode(t));var r=document.head||document.getElementsByTagName("head")[0];return s?r.insertBefore(i,s):r.appendChild(i),i},t=[{key:"length",get:function(){return this._rulesCount}}],function(e,t){for(var s=0;s<t.length;s++){var i=t[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}(e.prototype,t),e}();function c(e,t){if(!e)throw Error("StyleSheet: "+t+".")}var h=function(e){for(var t=5381,s=e.length;s;)t=33*t^e.charCodeAt(--s);return t>>>0},d={};function p(e,t){if(!t)return"jsx-"+e;var s=String(t),i=e+s;return d[i]||(d[i]="jsx-"+h(e+"-"+s)),d[i]}function u(e,t){"u"<typeof window&&(t=t.replace(/\/style/gi,"\\/style"));var s=e+t;return d[s]||(d[s]=t.replace(/__jsx-style-dynamic-selector/g,e)),d[s]}var f=function(){function e(e){var t=void 0===e?{}:e,s=t.styleSheet,i=void 0===s?null:s,r=t.optimizeForSpeed,n=void 0!==r&&r;this._sheet=i||new l({name:"styled-jsx",optimizeForSpeed:n}),this._sheet.inject(),i&&"boolean"==typeof n&&(this._sheet.setOptimizeForSpeed(n),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var t=e.prototype;return t.add=function(e){var t=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(e.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),"u">typeof window&&!this._fromServer&&(this._fromServer=this.selectFromServer(),this._instancesCounts=Object.keys(this._fromServer).reduce(function(e,t){return e[t]=0,e},{}));var s=this.getIdAndRules(e),i=s.styleId,r=s.rules;if(i in this._instancesCounts){this._instancesCounts[i]+=1;return}var n=r.map(function(e){return t._sheet.insertRule(e)}).filter(function(e){return -1!==e});this._indices[i]=n,this._instancesCounts[i]=1},t.remove=function(e){var t=this,s=this.getIdAndRules(e).styleId;if(function(e,t){if(!e)throw Error("StyleSheetRegistry: "+t+".")}(s in this._instancesCounts,"styleId: `"+s+"` not found"),this._instancesCounts[s]-=1,this._instancesCounts[s]<1){var i=this._fromServer&&this._fromServer[s];i?(i.parentNode.removeChild(i),delete this._fromServer[s]):(this._indices[s].forEach(function(e){return t._sheet.deleteRule(e)}),delete this._indices[s]),delete this._instancesCounts[s]}},t.update=function(e,t){this.add(t),this.remove(e)},t.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},t.cssRules=function(){var e=this,t=this._fromServer?Object.keys(this._fromServer).map(function(t){return[t,e._fromServer[t]]}):[],s=this._sheet.cssRules();return t.concat(Object.keys(this._indices).map(function(t){return[t,e._indices[t].map(function(e){return s[e].cssText}).join(e._optimizeForSpeed?"":"\n")]}).filter(function(e){return!!e[1]}))},t.styles=function(e){var t,s;return t=this.cssRules(),void 0===(s=e)&&(s={}),t.map(function(e){var t=e[0],i=e[1];return n.default.createElement("style",{id:"__"+t,key:"__"+t,nonce:s.nonce?s.nonce:void 0,dangerouslySetInnerHTML:{__html:i}})})},t.getIdAndRules=function(e){var t=e.children,s=e.dynamic,i=e.id;if(s){var r=p(i,s);return{styleId:r,rules:Array.isArray(t)?t.map(function(e){return u(r,e)}):[u(r,t)]}}return{styleId:p(i),rules:Array.isArray(t)?t:[t]}},t.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e,t){return e[t.id.slice(2)]=t,e},{})},e}(),m=r.createContext(null);function x(){return new f}function g(){return r.useContext(m)}m.displayName="StyleSheetContext";var _=n.default.useInsertionEffect||n.default.useLayoutEffect,b="u">typeof window?x():void 0;function y(e){var t=b||g();return t&&("u"<typeof window?t.add(e):_(function(){return t.add(e),function(){t.remove(e)}},[e.id,String(e.dynamic)])),null}y.dynamic=function(e){return e.map(function(e){return p(e[0],e[1])}).join(" ")},s.StyleRegistry=function(e){var t=e.registry,s=e.children,i=r.useContext(m),a=r.useState(function(){return i||t||x()})[0];return n.default.createElement(m.Provider,{value:a},s)},s.createStyleRegistry=x,s.style=y,s.useStyleRegistry=g},37902,(e,t,s)=>{t.exports=e.r(98547).style}]);