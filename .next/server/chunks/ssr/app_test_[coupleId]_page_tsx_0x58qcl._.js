module.exports=[76341,a=>{"use strict";var b=a.i(87924),c=a.i(31626),d=a.i(72131),e=a.i(50944);let f=[{id:"fun",category:"closeness",text:"Как часто вам действительно весело вместе?",type:"scale"},{id:"joy",category:"understanding",text:"Насколько хорошо партнёр знает, что тебя радует?",type:"scale"},{id:"attention",category:"closeness",text:"Хватает ли тебе внимания партнёра?",type:"scale"},{id:"listen",category:"communication",text:"Чувствуешь ли ты, что партнёр действительно слушает тебя в серьёзных разговорах?",type:"scale"},{id:"talk",category:"communication",text:"Насколько легко тебе говорить с партнёром о том, что тебя задевает?",type:"scale"},{id:"repair",category:"conflict",text:"После ссоры насколько быстро между вами снова становится спокойно?",type:"scale"},{id:"first_step",category:"conflict",text:"Кто чаще делает первый шаг к примирению?",type:"choice",options:["Я","Партнёр","Оба примерно одинаково","Зависит от ситуации"]},{id:"money",category:"money",text:"Насколько комфортно тебе обсуждать с партнёром деньги?",type:"scale"},{id:"chores",category:"daily",text:"Насколько справедливо, по твоему ощущению, распределён быт?",type:"scale"},{id:"space",category:"space",text:"Насколько тебе хватает личного пространства в отношениях?",type:"scale"},{id:"support",category:"closeness",text:"Насколько ты чувствуешь поддержку партнёра, когда тебе тяжело?",type:"scale"},{id:"intimacy",category:"intimacy",text:"Насколько тебя устраивает уровень физической и эмоциональной близости?",type:"scale"},{id:"future",category:"future",text:"Насколько ваши представления о совместном будущем совпадают?",type:"scale"},{id:"family",category:"future",text:"Насколько легко вам обсуждать семью, детей и долгосрочные планы?",type:"scale"},{id:"priority_self",category:"understanding",text:"Что для тебя сейчас важнее всего в отношениях?",type:"choice",options:["Поддержка","Совместное время","Интимность","Доверие","Финансовая стабильность","Личное пространство","Общие планы"]},{id:"priority_partner",category:"understanding",text:"А что, как тебе кажется, сейчас важнее всего твоему партнёру?",type:"choice",options:["Поддержка","Совместное время","Интимность","Доверие","Финансовая стабильность","Личное пространство","Общие планы"]},{id:"missing",category:"open",text:"Чего тебе сейчас больше всего не хватает в ваших отношениях?",type:"text"},{id:"gratitude",category:"open",text:"Что партнёр делает такого, за что ты ему особенно благодарен?",type:"text"}];function g({question:a,onAnswer:d,disabled:e}){return Array.isArray(a.options)&&a.options.length>0?(0,b.jsxs)("div",{className:"jsx-e86b8c3eb99d7d5e answers",children:[a.options.map((c,f)=>{let g="string"==typeof c?c:c.label??String(c.value??""),h="string"==typeof c?c:c.value??c.label??f;return(0,b.jsx)("button",{type:"button",disabled:e,onClick:()=>d(h),className:"jsx-e86b8c3eb99d7d5e answer-button",children:g},`${a.id}-${f}`)}),(0,b.jsx)(c.default,{id:"e86b8c3eb99d7d5e",children:".answers.jsx-e86b8c3eb99d7d5e{flex-direction:column;gap:12px;width:100%;margin-top:34px;display:flex}.answer-button.jsx-e86b8c3eb99d7d5e{color:#171515;text-align:left;cursor:pointer;background:#fff;border:1px solid #e4d9d7;border-radius:18px;width:100%;padding:19px 22px;font-size:17px;line-height:1.35;transition:border-color .15s,background .15s,transform .15s}.answer-button.jsx-e86b8c3eb99d7d5e:hover{background:#fcf7f8;border-color:#b65c7c}.answer-button.jsx-e86b8c3eb99d7d5e:active{transform:scale(.99)}.answer-button.jsx-e86b8c3eb99d7d5e:disabled{opacity:.5;cursor:default}"})]}):(0,b.jsx)(h,{disabled:e,onAnswer:d})}function h({onAnswer:a,disabled:e}){let[f,g]=(0,d.useState)("");return(0,b.jsxs)("div",{className:"jsx-f5054044c6348c7b text-answer",children:[(0,b.jsx)("textarea",{value:f,disabled:e,placeholder:"Напиши свой ответ...",onChange:a=>{g(a.target.value)},className:"jsx-f5054044c6348c7b textarea"}),(0,b.jsx)("button",{type:"button",disabled:!f.trim()||e,onClick:function(){let b=f.trim();b&&!e&&a(b)},className:"jsx-f5054044c6348c7b continue-button",children:"Продолжить"}),(0,b.jsx)(c.default,{id:"f5054044c6348c7b",children:".text-answer.jsx-f5054044c6348c7b{flex-direction:column;gap:14px;width:100%;margin-top:34px;display:flex}.textarea.jsx-f5054044c6348c7b{box-sizing:border-box;resize:vertical;color:#171515;width:100%;min-height:140px;font:inherit;background:#fff;border:1px solid #e4d9d7;border-radius:18px;outline:none;padding:18px;font-size:17px;line-height:1.5}.textarea.jsx-f5054044c6348c7b:focus{border-color:#b65c7c}.continue-button.jsx-f5054044c6348c7b{color:#fff;cursor:pointer;background:#171515;border:0;border-radius:18px;width:100%;padding:19px 22px;font-size:17px;font-weight:650}.continue-button.jsx-f5054044c6348c7b:disabled{opacity:.35;cursor:default}"})]})}let i=`

  .test-page {
    min-height: 100svh;

    box-sizing: border-box;

    background: #faf8f6;

    padding:
      max(
        30px,
        env(safe-area-inset-top)
      )
      20px
      max(
        40px,
        env(safe-area-inset-bottom)
      );
  }

  .test-shell {
    width: 100%;
    max-width: 760px;

    margin: 0 auto;
  }

  .top {
    width: 100%;

    display: flex;
    align-items: center;

    gap: 18px;
  }

  .question-counter {
    flex-shrink: 0;

    color: #9a8f92;

    font-size: 12px;
    font-weight: 700;

    letter-spacing: 0.08em;
  }

  .progress-track {
    flex: 1;

    height: 4px;

    overflow: hidden;

    border-radius: 999px;

    background: #eadfe1;
  }

  .progress-value {
    height: 100%;

    border-radius: inherit;

    background: #b14e73;

    transition:
      width 250ms ease;
  }

  .question-area {
    width: 100%;

    margin-top: 120px;
  }

  .question-number {
    margin-bottom: 18px;

    color: #a9476b;

    font-size: 12px;
    font-weight: 700;

    letter-spacing: 0.13em;
  }

  .question-title {
    max-width: 720px;

    margin: 0;

    color: #171515;

    font-family:
      Georgia,
      'Times New Roman',
      serif;

    font-size:
      clamp(
        38px,
        5vw,
        58px
      );

    line-height: 1.02;

    font-weight: 500;

    letter-spacing: -0.035em;
  }

  .saving {
    margin-top: 18px;

    color: #93898b;

    font-size: 14px;

    text-align: center;
  }

  .error {
    margin-top: 18px;

    color: #a9476b;

    font-size: 14px;
    line-height: 1.45;

    text-align: center;
  }

  .loading {
    padding-top: 45vh;

    color: #81777a;

    font-size: 18px;

    text-align: center;
  }

  @media (max-width: 600px) {

    .test-page {
      padding-left: 18px;
      padding-right: 18px;
    }

    .question-area {
      margin-top: 70px;
    }

    .question-title {
      font-size: 40px;
    }

  }

`;a.s(["default",0,function(){let a=(0,e.useParams)(),h=(0,e.useSearchParams)(),j=(0,e.useRouter)(),k=a.coupleId,l="b"===h.get("role")?"b":"a",[m,n]=(0,d.useState)(0),[o,p]=(0,d.useState)({}),[q,r]=(0,d.useState)(!1),[s,t]=(0,d.useState)(!0),[u,v]=(0,d.useState)(""),w=f[m],x=(0,d.useMemo)(()=>f.length?(m+1)/f.length*100:0,[m]);async function y(a){if(!q){r(!0),v("");try{let b=await fetch("/api/answers",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({coupleId:k,role:l,answers:a})});if(!b.ok){let a=await b.text();throw console.error("Answers API:",b.status,a),Error("Не удалось сохранить ответы")}if("b"===l)return void j.replace(`/result/${k}`);j.replace(`/waiting/${k}`)}catch(a){console.error(a),v("Не получилось сохранить ответы. Попробуй ещё раз."),r(!1)}}}return(0,d.useEffect)(()=>{!async function(){try{let a=await fetch(`/api/couples?id=${encodeURIComponent(k)}`,{cache:"no-store"});if(!a.ok)throw Error("Не удалось загрузить пару");let b=await a.json();if(b.partner_a_completed&&b.partner_b_completed)return void j.replace(`/result/${k}`);if("a"===l&&b.partner_a_completed)return void j.replace(`/waiting/${k}`);if("b"===l&&b.partner_b_completed)return void(b.partner_a_completed?j.replace(`/result/${k}`):j.replace(`/waiting/${k}`))}catch(a){console.error(a)}finally{t(!1)}}()},[k,l,j]),s?(0,b.jsxs)("main",{className:`jsx-${i.__hash} test-page`,children:[(0,b.jsx)("div",{className:`jsx-${i.__hash} test-shell`,children:(0,b.jsx)("div",{className:`jsx-${i.__hash} loading`,children:"Загружаем..."})}),(0,b.jsx)(c.default,{id:i.__hash,children:i})]}):w?(0,b.jsxs)("main",{className:`jsx-${i.__hash} test-page`,children:[(0,b.jsxs)("div",{className:`jsx-${i.__hash} test-shell`,children:[(0,b.jsxs)("div",{className:`jsx-${i.__hash} top`,children:[(0,b.jsxs)("div",{className:`jsx-${i.__hash} question-counter`,children:[m+1," / ",f.length]}),(0,b.jsx)("div",{className:`jsx-${i.__hash} progress-track`,children:(0,b.jsx)("div",{style:{width:`${x}%`},className:`jsx-${i.__hash} progress-value`})})]}),(0,b.jsxs)("div",{className:`jsx-${i.__hash} question-area`,children:[(0,b.jsxs)("div",{className:`jsx-${i.__hash} question-number`,children:["ВОПРОС ",m+1]}),(0,b.jsx)("h1",{className:`jsx-${i.__hash} question-title`,children:String(w.text)}),(0,b.jsx)(g,{question:w,disabled:q,onAnswer:function(a){if(!w)return;let b={...o,[w.id]:a};(p(b),m<f.length-1)?n(a=>a+1):y(b)}}),q&&(0,b.jsx)("div",{className:`jsx-${i.__hash} saving`,children:"Сохраняем ответы..."}),u&&(0,b.jsx)("div",{className:`jsx-${i.__hash} error`,children:u})]})]}),(0,b.jsx)(c.default,{id:i.__hash,children:i})]}):(0,b.jsxs)("main",{className:`jsx-${i.__hash} test-page`,children:[(0,b.jsx)("div",{className:`jsx-${i.__hash} test-shell`,children:(0,b.jsx)("div",{className:`jsx-${i.__hash} loading`,children:"Вопросы не найдены."})}),(0,b.jsx)(c.default,{id:i.__hash,children:i})]})}],76341)}];

//# sourceMappingURL=app_test_%5BcoupleId%5D_page_tsx_0x58qcl._.js.map