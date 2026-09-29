module.exports=[22279,a=>{"use strict";var b=a.i(87924),c=a.i(31626),d=a.i(72131),e=a.i(50944);let f=`

  .waiting-page {
    min-height: 100svh;
    box-sizing: border-box;

    background: #faf8f6;

    display: flex;
    justify-content: center;

    padding:
      max(48px, env(safe-area-inset-top))
      20px
      max(40px, env(safe-area-inset-bottom));
  }

  .waiting-container {
    width: 100%;
    max-width: 760px;

    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: center;
  }

  .couple-visual {
    position: relative;

    width: 250px;
    height: 145px;

    margin-top: 105px;
    margin-bottom: 34px;
  }

  .couple-circle {
    position: absolute;

    width: 145px;
    height: 145px;

    border-radius: 50%;
  }

  .couple-circle-left {
    left: 0;
    background: rgba(173, 75, 111, 0.42);
  }

  .couple-circle-right {
    right: 0;
    background: rgba(217, 166, 184, 0.38);
  }

  .waiting-status {
    margin-bottom: 22px;

    color: #a9476b;

    font-size: 15px;
    font-weight: 600;

    letter-spacing: 0.14em;
  }

  .waiting-title {
    margin: 0;

    color: #171515;

    font-family:
      Georgia,
      'Times New Roman',
      serif;

    font-size: clamp(48px, 6vw, 72px);
    line-height: 0.98;

    font-weight: 500;

    letter-spacing: -0.04em;
  }

  .waiting-description {
    max-width: 720px;

    margin: 30px auto;

    color: #81777a;

    font-size: 21px;
    line-height: 1.45;
  }

  .waiting-description strong {
    color: #171515;
    font-weight: 600;
  }

  .waiting-share-button {
    width: 100%;

    border: 0;
    border-radius: 20px;

    background: #171515;
    color: #ffffff;

    padding: 23px 24px;

    font-size: 19px;
    font-weight: 650;

    cursor: pointer;
  }

  .waiting-share-button:hover {
    opacity: 0.92;
  }

  .invite-link-section {
    width: 100%;

    margin-top: 28px;

    text-align: left;
  }

  .invite-link-label {
    margin: 0 0 10px 4px;

    color: #9a8f92;

    font-size: 11px;
    font-weight: 700;

    letter-spacing: 0.12em;
  }

  .invite-link-box {
    width: 100%;

    display: flex;
    align-items: center;

    gap: 14px;

    box-sizing: border-box;

    padding: 9px 9px 9px 18px;

    border: 1px solid #e6ddda;
    border-radius: 18px;

    background: #ffffff;
  }

  .invite-link-value {
    flex: 1;
    min-width: 0;

    overflow: hidden;

    color: #5f5759;

    font-size: 14px;

    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .invite-copy-button {
    flex-shrink: 0;

    border: 0;
    border-radius: 12px;

    background: #f1e6e9;
    color: #9f4667;

    padding: 12px 16px;

    font-size: 13px;
    font-weight: 650;

    cursor: pointer;
  }

  .invite-copy-button.copied {
    background: #e8efe9;
    color: #52705a;
  }

  .waiting-note {
    margin-top: 20px;

    color: #93898b;

    font-size: 14px;
    line-height: 1.5;
  }

  .loading-text {
    margin-top: 45vh;

    color: #81777a;

    font-size: 18px;
  }

  @media (max-width: 600px) {

    .waiting-page {
      padding-left: 18px;
      padding-right: 18px;
    }

    .couple-visual {
      width: 190px;
      height: 112px;

      margin-top: 55px;
      margin-bottom: 28px;
    }

    .couple-circle {
      width: 112px;
      height: 112px;
    }

    .waiting-status {
      font-size: 12px;
      margin-bottom: 18px;
    }

    .waiting-title {
      font-size: 48px;
    }

    .waiting-description {
      margin-top: 22px;
      margin-bottom: 26px;

      font-size: 17px;
    }

    .waiting-share-button {
      padding: 19px 20px;

      border-radius: 17px;

      font-size: 17px;
    }

    .invite-link-box {
      gap: 8px;
      padding-left: 14px;
    }

    .invite-link-value {
      font-size: 12px;
    }

    .invite-copy-button {
      padding: 11px 12px;

      font-size: 12px;
    }

  }

`;a.s(["default",0,function(){let a=(0,e.useParams)(),g=(0,e.useRouter)(),h=a.coupleId,[i,j]=(0,d.useState)(null),[k,l]=(0,d.useState)(!0),[m,n]=(0,d.useState)(!1),[o,p]=(0,d.useState)("");async function q(){try{let a=await fetch(`/api/couples?id=${encodeURIComponent(h)}`,{cache:"no-store"});if(!a.ok)throw Error("Не удалось загрузить пару");let b=await a.json();j(b),b.partner_a_completed&&b.partner_b_completed&&g.replace(`/result/${h}`)}catch(a){console.error(a),p("Не удалось загрузить данные пары.")}finally{l(!1)}}if((0,d.useEffect)(()=>{q();let a=window.setInterval(()=>{q()},5e3);return()=>{window.clearInterval(a)}},[h]),k)return(0,b.jsxs)("main",{className:`jsx-${f.__hash} waiting-page`,children:[(0,b.jsx)("div",{className:`jsx-${f.__hash} waiting-container`,children:(0,b.jsx)("div",{className:`jsx-${f.__hash} loading-text`,children:"Загружаем..."})}),(0,b.jsx)(c.default,{id:f.__hash,children:f})]});if(o||!i)return(0,b.jsxs)("main",{className:`jsx-${f.__hash} waiting-page`,children:[(0,b.jsxs)("div",{className:`jsx-${f.__hash} waiting-container`,children:[(0,b.jsx)("h1",{className:`jsx-${f.__hash} waiting-title`,children:"Не удалось найти пару"}),(0,b.jsx)("p",{className:`jsx-${f.__hash} waiting-description`,children:o||"Возможно, ссылка устарела или была открыта неправильно."})]}),(0,b.jsx)(c.default,{id:f.__hash,children:f})]});let r=process.env.NEXT_PUBLIC_SITE_URL||"",s=`${r}/invite/${i.invite_token}`;async function t(){try{await navigator.clipboard.writeText(s),n(!0),window.setTimeout(()=>{n(!1)},2e3)}catch(b){console.error(b);let a=document.createElement("textarea");a.value=s,a.style.position="fixed",a.style.opacity="0",document.body.appendChild(a),a.focus(),a.select(),document.execCommand("copy"),document.body.removeChild(a),n(!0),window.setTimeout(()=>{n(!1)},2e3)}}async function u(){try{if(navigator.share)return void await navigator.share({title:"между нами",text:"Я прошёл небольшой тест про наши отношения 👀\n\nТеперь твоя очередь. Ответь отдельно от меня — потом посмотрим, насколько одинаково мы воспринимаем наши отношения.",url:s});await t()}catch(a){if(a instanceof DOMException&&"AbortError"===a.name)return;console.error(a),await t()}}return(0,b.jsxs)("main",{className:`jsx-${f.__hash} waiting-page`,children:[(0,b.jsxs)("div",{className:`jsx-${f.__hash} waiting-container`,children:[(0,b.jsxs)("div",{className:`jsx-${f.__hash} couple-visual`,children:[(0,b.jsx)("div",{className:`jsx-${f.__hash} couple-circle couple-circle-left`}),(0,b.jsx)("div",{className:`jsx-${f.__hash} couple-circle couple-circle-right`})]}),(0,b.jsx)("div",{className:`jsx-${f.__hash} waiting-status`,children:"1 ИЗ 2 ГОТОВ"}),(0,b.jsx)("h1",{className:`jsx-${f.__hash} waiting-title`,children:"Твоя часть готова."}),(0,b.jsxs)("p",{className:`jsx-${f.__hash} waiting-description`,children:["Теперь очередь:"," ",(0,b.jsx)("strong",{className:`jsx-${f.__hash}`,children:i.partner_b_name}),".",(0,b.jsx)("br",{className:`jsx-${f.__hash}`}),"После второго ответа вы увидите картину целиком."]}),(0,b.jsx)("button",{type:"button",onClick:u,className:`jsx-${f.__hash} waiting-share-button`,children:"Отправить приглашение"}),(0,b.jsxs)("div",{className:`jsx-${f.__hash} invite-link-section`,children:[(0,b.jsx)("div",{className:`jsx-${f.__hash} invite-link-label`,children:"ССЫЛКА ДЛЯ ПАРТНЁРА"}),(0,b.jsxs)("div",{className:`jsx-${f.__hash} invite-link-box`,children:[(0,b.jsx)("div",{className:`jsx-${f.__hash} invite-link-value`,children:s}),(0,b.jsx)("button",{type:"button",onClick:t,className:`jsx-${f.__hash} `+((m?"invite-copy-button copied":"invite-copy-button")||""),children:m?"Скопировано ✓":"Копировать"})]})]}),(0,b.jsx)("p",{className:`jsx-${f.__hash} waiting-note`,children:"Результат откроется автоматически, когда вы оба закончите."})]}),(0,b.jsx)(c.default,{id:f.__hash,children:f})]})}])}];

//# sourceMappingURL=app_waiting_%5BcoupleId%5D_page_tsx_0vfd24n._.js.map