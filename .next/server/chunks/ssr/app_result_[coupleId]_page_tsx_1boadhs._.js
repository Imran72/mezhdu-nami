module.exports=[66248,a=>{"use strict";var b=a.i(87924),c=a.i(31626),d=a.i(72131),e=a.i(50944);let f={friendship:{title:"Дружба",subtitle:"хорошо ли вам просто вдвоём",keywords:["friend","fun","humor","laugh","together","free_saturday","normal_evening","weekend","weekend_plan","extra_hour"]},partnership:{title:"Партнёрство",subtitle:"вы команда или каждый сам за себя",keywords:["team","partner","support","decision","future","plan","responsibility","keep_in_year","relationship_button","want_more"]},sex:{title:"Секс",subtitle:"совпадает ли ваше представление о близости",keywords:["sex","sexual","intimacy","physical","touch","affection","closeness","romance"]},money:{title:"Деньги",subtitle:"одинаково ли вы смотрите на траты",keywords:["money","finance","spend","saving","budget","unexpected_money","purchase"]},care:{title:"Забота",subtitle:"понимаете ли вы «я рядом» одинаково",keywords:["care","support","help","hard_day","reunion","care_signal","emotion","attention","comfort"]},home:{title:"Быт",subtitle:"как вам живётся в обычный вторник",keywords:["home","house","routine","daily","chores","clean","food","sleep","normal_evening","weekend_plan"]}};function g({category:a}){return(0,b.jsxs)("article",{className:"score-row",children:[(0,b.jsxs)("div",{className:"score-header",children:[(0,b.jsxs)("div",{className:"score-copy",children:[(0,b.jsx)("h2",{children:a.title}),(0,b.jsx)("p",{children:a.subtitle})]}),(0,b.jsxs)("div",{className:"score-number",children:[(0,b.jsx)("strong",{children:a.score}),(0,b.jsx)("span",{children:"/10"})]})]}),(0,b.jsx)("div",{className:"score-track",children:(0,b.jsx)("div",{className:"score-fill",style:{width:`${10*a.score}%`}})})]})}function h({icon:a,children:c}){return(0,b.jsxs)("div",{className:"benefit",children:[(0,b.jsx)("div",{className:"benefit-icon",children:a}),(0,b.jsx)("div",{className:"benefit-text",children:c})]})}function i(a){return 4+92*Math.max(0,Math.min(1,a/55))}function j(){return(0,b.jsx)(c.default,{id:"fb97b29ba7163c84",children:"html,body{background:#faf7f4!important;margin:0!important;padding:0!important}body{color:#171315;font-family:Arial,Helvetica,sans-serif}*{box-sizing:border-box}button{font:inherit}"})}let k=`

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

`;a.s(["default",0,function(){var a;let l,m,n=(0,e.useParams)(),o=(0,e.useRouter)(),p=n.coupleId,[q,r]=(0,d.useState)(null),[s,t]=(0,d.useState)("");(0,d.useEffect)(()=>{let a=!1;return async function(){try{let b=await fetch(`/api/report?id=${encodeURIComponent(p)}`,{cache:"no-store"});if(!b.ok)throw Error("Не удалось загрузить результат");let c=await b.json();if(a)return;if(c.waiting)return void o.replace(`/waiting/${p}`);r(c)}catch(b){console.error(b),a||t("Не получилось загрузить результат.")}}(),()=>{a=!0}},[p,o]);let u=(0,d.useMemo)(()=>q?.comparisons??[],[q]),v=(0,d.useMemo)(()=>{var a,b;return"number"==typeof q?.scores?.overall?Number.isFinite(a=q.scores.overall)?a>=0&&a<=1?Math.round(100*a):Math.round(Math.max(0,Math.min(100,a))):0:(b=u).length?Math.round(b.reduce((a,b)=>"same"===b.similarity?a+1:"close"===b.similarity?a+.55:a,0)/b.length*100):50},[q,u]),w=(0,d.useMemo)(()=>{var a,b;return a=u,b=v,["friendship","partnership","sex","money","care","home"].map(c=>{var d;let e=f[c],g=a.filter(a=>{var b,c;let d;return b=a,c=e.keywords,d=[b.questionId,b.question,...b.traitsA??[],...b.traitsB??[],...b.sharedTraits??[]].join(" ").toLowerCase(),c.some(a=>d.includes(a.toLowerCase()))}),h=g.length>0?g:a,i=h.length>0?(d=h).length?Math.round(d.reduce((a,b)=>"same"===b.similarity?a+1:"close"===b.similarity?a+.55:a,0)/d.length*100):50:b;return{id:c,title:e.title,subtitle:e.subtitle,score:Math.max(0,Math.min(10,Math.round(i/10)))}})},[u,v]),x=(0,d.useMemo)(()=>{var a,b;return a=w,b=v,a.length?Math.max(1,Math.min(55,Math.round(1+54*Math.pow((.6*(a.reduce((a,b)=>a+b.score,0)/a.length)+.2*Math.min(...a.map(a=>a.score))+.1*Math.max(...a.map(a=>a.score))+b/10*.1)/10,1.55)))):1},[w,v]);if(s)return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("main",{className:`jsx-${k.__hash} state-page`,children:[(0,b.jsx)("div",{className:`jsx-${k.__hash} state-brand`,children:"между нами."}),(0,b.jsx)("h1",{className:`jsx-${k.__hash}`,children:"не получилось открыть результат"}),(0,b.jsx)("p",{className:`jsx-${k.__hash}`,children:s})]}),(0,b.jsx)(j,{}),(0,b.jsx)(c.default,{id:k.__hash,children:k})]});if(!q)return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("main",{className:`jsx-${k.__hash} state-page`,children:[(0,b.jsxs)("div",{className:`jsx-${k.__hash} loader`,children:[(0,b.jsx)("span",{className:`jsx-${k.__hash}`}),(0,b.jsx)("span",{className:`jsx-${k.__hash}`})]}),(0,b.jsx)("div",{className:`jsx-${k.__hash} state-brand`,children:"между нами."}),(0,b.jsx)("p",{className:`jsx-${k.__hash}`,children:"собираем ваши ответы"})]}),(0,b.jsx)(j,{}),(0,b.jsx)(c.default,{id:k.__hash,children:k})]});let y=q.couple.partner_a_name,z=q.couple.partner_b_name;return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("main",{className:`jsx-${k.__hash} page`,children:[(0,b.jsxs)("header",{className:`jsx-${k.__hash} header result-shell`,children:[(0,b.jsx)("div",{className:`jsx-${k.__hash} brand`,children:"между нами."}),(0,b.jsxs)("div",{className:`jsx-${k.__hash} couple-names`,children:[(0,b.jsx)("span",{className:`jsx-${k.__hash}`,children:y}),(0,b.jsx)("b",{className:`jsx-${k.__hash}`,children:"×"}),(0,b.jsx)("span",{className:`jsx-${k.__hash}`,children:z})]})]}),(0,b.jsx)("section",{className:`jsx-${k.__hash} scores result-shell`,children:w.map(a=>(0,b.jsx)(g,{category:a},a.id))}),(0,b.jsxs)("section",{className:`jsx-${k.__hash} forecast result-shell`,children:[(0,b.jsx)("div",{className:`jsx-${k.__hash} forecast-label`,children:"прогноз"}),(0,b.jsxs)("div",{className:`jsx-${k.__hash} forecast-grid`,children:[(0,b.jsxs)("div",{className:`jsx-${k.__hash} forecast-copy`,children:[(0,b.jsxs)("h2",{className:`jsx-${k.__hash}`,children:["Вы можете быть",(0,b.jsx)("br",{className:`jsx-${k.__hash}`}),"вместе очень долго"]}),(0,b.jsx)("p",{className:`jsx-${k.__hash}`,children:"На основе ваших ответов мы оценили, сколько лет вы можете быть вместе."})]}),(0,b.jsxs)("div",{className:`jsx-${k.__hash} forecast-result`,children:[(0,b.jsxs)("div",{className:`jsx-${k.__hash} years`,children:[x,(0,b.jsx)("span",{className:`jsx-${k.__hash}`,children:(l=(a=x)%100,m=a%10,l>=11&&l<=14?"лет":1===m?"год":m>=2&&m<=4?"года":"лет")})]}),(0,b.jsxs)("div",{className:`jsx-${k.__hash} forecast-scale`,children:[(0,b.jsxs)("div",{className:`jsx-${k.__hash} forecast-line`,children:[(0,b.jsx)("div",{style:{width:`${i(x)}%`},className:`jsx-${k.__hash} forecast-progress`}),(0,b.jsx)("div",{style:{left:`${i(x)}%`},className:`jsx-${k.__hash} forecast-dot`})]}),(0,b.jsxs)("div",{className:`jsx-${k.__hash} forecast-scale-labels`,children:[(0,b.jsx)("span",{className:`jsx-${k.__hash}`,children:"1 месяц"}),(0,b.jsx)("span",{className:`jsx-${k.__hash}`,children:"вся жизнь"})]})]})]})]})]}),(0,b.jsx)("section",{className:`jsx-${k.__hash} paid-section result-shell`,children:(0,b.jsxs)("div",{className:`jsx-${k.__hash} paid-card`,children:[(0,b.jsx)("img",{src:"/images/full-report-scene.png",alt:"",className:`jsx-${k.__hash} paid-image`}),(0,b.jsx)("div",{className:`jsx-${k.__hash} paid-overlay`}),(0,b.jsxs)("div",{className:`jsx-${k.__hash} paid-content`,children:[(0,b.jsxs)("div",{className:`jsx-${k.__hash} paid-heading`,children:[(0,b.jsx)("div",{className:`jsx-${k.__hash} paid-label`,children:"полный разбор"}),(0,b.jsxs)("h2",{className:`jsx-${k.__hash}`,children:["Чтобы вместе —",(0,b.jsx)("br",{className:`jsx-${k.__hash}`}),"и надолго."]})]}),(0,b.jsxs)("div",{className:`jsx-${k.__hash} paid-benefits`,children:[(0,b.jsxs)(h,{icon:"♥",children:["Где вы можете",(0,b.jsx)("br",{className:`jsx-${k.__hash}`}),"не понимать друг друга"]}),(0,b.jsxs)(h,{icon:"▰",children:["Что каждый ждёт",(0,b.jsx)("br",{className:`jsx-${k.__hash}`}),"от отношений"]}),(0,b.jsxs)(h,{icon:"ϟ",children:["Что может стать",(0,b.jsx)("br",{className:`jsx-${k.__hash}`}),"причиной ссор"]}),(0,b.jsxs)(h,{icon:"▥",children:["Как сделать вашу",(0,b.jsx)("br",{className:`jsx-${k.__hash}`}),"пару крепче"]})]})]}),(0,b.jsxs)("div",{className:`jsx-${k.__hash} paid-bottom`,children:[(0,b.jsxs)("button",{type:"button",onClick:()=>o.push(`/report/${p}`),className:`jsx-${k.__hash} buy-button`,children:[(0,b.jsx)("span",{className:`jsx-${k.__hash}`,children:"Открыть полный разбор"}),(0,b.jsx)("strong",{className:`jsx-${k.__hash}`,children:"299 ₽"}),(0,b.jsx)("i",{className:`jsx-${k.__hash}`,children:"→"})]}),(0,b.jsx)("div",{className:`jsx-${k.__hash} paid-note`,children:"один разбор · для вас двоих · сразу после оплаты"})]})]})})]}),(0,b.jsx)(j,{}),(0,b.jsx)(c.default,{id:k.__hash,children:k})]})}])}];

//# sourceMappingURL=app_result_%5BcoupleId%5D_page_tsx_1boadhs._.js.map