module.exports=[33688,a=>{"use strict";var b=a.i(87924),c=a.i(31626),d=a.i(72131),e=a.i(50944);let f=`

  .invite-page {
    min-height: 100svh;

    background: #faf8f6;

    display: flex;
    justify-content: center;

    padding:
      max(48px, env(safe-area-inset-top))
      20px
      max(40px, env(safe-area-inset-bottom));

    box-sizing: border-box;
  }

  .invite-container {
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
    margin-bottom: 32px;
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

  .invite-eyebrow {
    margin-bottom: 20px;

    color: #a9476b;

    font-size: 13px;
    font-weight: 700;

    letter-spacing: 0.14em;
  }

  .invite-title {
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

  .invite-description {
    max-width: 680px;

    margin:
      30px
      auto
      28px;

    color: #81777a;

    font-size: 21px;
    line-height: 1.45;
  }

  .names-card {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    box-sizing: border-box;

    margin-bottom: 24px;
    padding: 22px 28px;

    border: 1px solid #e8dfdc;
    border-radius: 22px;

    background: rgba(255, 255, 255, 0.7);
  }

  .person {
    flex: 1;

    min-width: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .person-dot {
    width: 42px;
    height: 42px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 10px;

    border-radius: 50%;

    background: #f0e3e7;
    color: #a9476b;

    font-size: 14px;
    font-weight: 700;
  }

  .person-dot-ready {
    background: #a9476b;
    color: #ffffff;
  }

  .person-name {
    max-width: 100%;

    overflow: hidden;

    color: #171515;

    font-size: 17px;
    font-weight: 650;

    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .person-status {
    margin-top: 4px;

    color: #93898b;

    font-size: 12px;
  }

  .names-line {
    width: 60px;
    height: 1px;

    flex-shrink: 0;

    margin: 0 14px;

    background: #dfd2d5;
  }

  .invite-button {
    width: 100%;

    border: 0;
    border-radius: 20px;

    background: #171515;
    color: #ffffff;

    padding: 23px 24px;

    font-size: 19px;
    font-weight: 650;

    cursor: pointer;

    transition:
      transform 160ms ease,
      opacity 160ms ease;
  }

  .invite-button:hover {
    opacity: 0.92;
  }

  .invite-button:active {
    transform: scale(0.985);
  }

  .invite-note {
    max-width: 600px;

    margin:
      20px
      auto
      0;

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

    .invite-page {
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

    .invite-eyebrow {
      margin-bottom: 16px;

      font-size: 11px;
    }

    .invite-title {
      font-size: 46px;
    }

    .invite-description {
      margin-top: 22px;
      margin-bottom: 24px;

      font-size: 17px;
    }

    .names-card {
      padding: 18px 14px;

      border-radius: 18px;
    }

    .names-line {
      width: 32px;

      margin-left: 8px;
      margin-right: 8px;
    }

    .person-name {
      font-size: 15px;
    }

    .person-status {
      font-size: 11px;
    }

    .invite-button {
      padding: 19px 20px;

      border-radius: 17px;

      font-size: 17px;
    }

  }

`;a.s(["default",0,function(){let a=(0,e.useParams)(),g=(0,e.useRouter)(),h=a.token,[i,j]=(0,d.useState)(null),[k,l]=(0,d.useState)(!0),[m,n]=(0,d.useState)(!1);return((0,d.useEffect)(()=>{!async function(){try{let a=await fetch(`/api/couples?token=${encodeURIComponent(h)}`,{cache:"no-store"});if(!a.ok)throw Error("Invite not found");let b=await a.json();j(b),b.partner_a_completed&&b.partner_b_completed&&g.replace(`/result/${b.id}`)}catch(a){console.error(a),n(!0)}finally{l(!1)}}()},[h,g]),k)?(0,b.jsx)("main",{className:"invite-page",children:(0,b.jsx)("div",{className:"invite-container",children:(0,b.jsx)("div",{className:"loading-text",children:"Загружаем приглашение..."})})}):m||!i?(0,b.jsxs)("main",{className:`jsx-${f.__hash} invite-page`,children:[(0,b.jsxs)("div",{className:`jsx-${f.__hash} invite-container`,children:[(0,b.jsxs)("div",{className:`jsx-${f.__hash} couple-visual`,children:[(0,b.jsx)("div",{className:`jsx-${f.__hash} couple-circle couple-circle-left`}),(0,b.jsx)("div",{className:`jsx-${f.__hash} couple-circle couple-circle-right`})]}),(0,b.jsx)("h1",{className:`jsx-${f.__hash} invite-title`,children:"Ссылка не найдена."}),(0,b.jsx)("p",{className:`jsx-${f.__hash} invite-description`,children:"Возможно, приглашение устарело или ссылка была скопирована не полностью."}),(0,b.jsx)("button",{type:"button",onClick:()=>g.push("/"),className:`jsx-${f.__hash} invite-button`,children:"На главную"})]}),(0,b.jsx)(c.default,{id:f.__hash,children:f})]}):(0,b.jsxs)("main",{className:`jsx-${f.__hash} invite-page`,children:[(0,b.jsxs)("div",{className:`jsx-${f.__hash} invite-container`,children:[(0,b.jsxs)("div",{className:`jsx-${f.__hash} couple-visual`,children:[(0,b.jsx)("div",{className:`jsx-${f.__hash} couple-circle couple-circle-left`}),(0,b.jsx)("div",{className:`jsx-${f.__hash} couple-circle couple-circle-right`})]}),(0,b.jsx)("div",{className:`jsx-${f.__hash} invite-eyebrow`,children:"ВАША ПАРА"}),(0,b.jsx)("h1",{className:`jsx-${f.__hash} invite-title`,children:"Первый ответ уже готов."}),(0,b.jsxs)("p",{className:`jsx-${f.__hash} invite-description`,children:["Теперь твоя очередь.",(0,b.jsx)("br",{className:`jsx-${f.__hash}`}),"Ответы первого человека тебе не показываются."]}),(0,b.jsxs)("div",{className:`jsx-${f.__hash} names-card`,children:[(0,b.jsxs)("div",{className:`jsx-${f.__hash} person`,children:[(0,b.jsx)("div",{className:`jsx-${f.__hash} person-dot person-dot-ready`,children:"✓"}),(0,b.jsx)("div",{className:`jsx-${f.__hash} person-name`,children:i.partner_a_name}),(0,b.jsx)("div",{className:`jsx-${f.__hash} person-status`,children:"готово"})]}),(0,b.jsx)("div",{className:`jsx-${f.__hash} names-line`}),(0,b.jsxs)("div",{className:`jsx-${f.__hash} person`,children:[(0,b.jsx)("div",{className:`jsx-${f.__hash} person-dot`,children:"2"}),(0,b.jsx)("div",{className:`jsx-${f.__hash} person-name`,children:i.partner_b_name}),(0,b.jsx)("div",{className:`jsx-${f.__hash} person-status`,children:"твоя очередь"})]})]}),(0,b.jsx)("button",{type:"button",onClick:function(){i&&g.push(`/test/${i.id}?role=b`)},className:`jsx-${f.__hash} invite-button`,children:"Начать свою часть"}),(0,b.jsx)("p",{className:`jsx-${f.__hash} invite-note`,children:"Прохождение займёт около 7 минут. Ваши ответы будут сравнены только после завершения теста."})]}),(0,b.jsx)(c.default,{id:f.__hash,children:f})]})}])}];

//# sourceMappingURL=app_invite_%5Btoken%5D_page_tsx_0h5ndgm._.js.map