(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,95801,e=>{"use strict";var t=e.i(43476),i=e.i(37902),n=e.i(71645),s=e.i(18566);let r=[{id:"knight_princess",title:"Рыцарь и принцесса",emojiA:"⚔️",emojiB:"👑",description:"У вас много заботы в мелочах. Для этой пары любовь чаще видна не в громких словах, а в ощущении: «я рядом и помню о тебе».",traits:["care_practical","attention","warmth","initiative","support_action","physical_closeness","support_physical"]},{id:"astronauts",title:"Два космонавта",emojiA:"🚀",emojiB:"🪐",description:"У каждого может быть своя орбита, но вам важно знать, что маршрут всё равно общий. Близость для вас не обязательно означает быть вместе каждую минуту.",traits:["independence","personal_space_high","space_high","space_balanced","autonomy","value_independence","planning","need_future_alignment"]},{id:"wizards",title:"Два волшебника",emojiA:"🔮",emojiB:"✨",description:"Ваш главный инструмент — разговор. Вам важно не просто быть рядом, а понимать, что происходит внутри другого человека.",traits:["communication","emotional_sharing","support_listening","conflict_verbal_resolution","need_communication","need_deep_communication","value_communication","listening"]},{id:"pirates",title:"Два пирата",emojiA:"🏴‍☠️",emojiB:"🗺️",description:"Вашей паре особенно идёт ощущение приключения. Планы хороши, но иногда лучший план — придумать всё по дороге.",traits:["spontaneity","shared_experience","activity","need_spontaneity","need_novelty","flexibility","money_experience","money_present"]},{id:"sun_moon",title:"Солнце и Луна",emojiA:"☀️",emojiB:"🌙",description:"Вы не обязаны одинаково реагировать на всё. В вашей паре особенно заметно, как разные способы чувствовать и действовать могут существовать рядом.",traits:["support_proactive","support_space","space_high","closeness_high","independence","direct_communication","quiet_closeness","emotional_sharing"]},{id:"dragon_keeper",title:"Дракон и хранитель",emojiA:"🐉",emojiB:"🛡️",description:"В вашей динамике есть энергия и спокойствие. Один момент может проживаться ярко, другой — через паузу, действие или присутствие рядом.",traits:["emotion_intensity","self_regulation","support_available","support_presence","conflict_time_repair","indirect_repair","repair_delayed"]},{id:"players",title:"Два игрока",emojiA:"🎮",emojiB:"👾",description:"У вас есть важная суперсила — лёгкость. Юмор, свои приколы и ощущение команды помогают вам снова находить друг друга.",traits:["humor","playfulness","support_humor","conflict_humor_repair","micro_connection","value_playfulness","need_lightness","message_team"]},{id:"homekeepers",title:"Хранители дома",emojiA:"🕯️",emojiB:"🏡",description:"Сила вашей пары прячется в обычной жизни: знакомых ритуалах, спокойных вечерах и ощущении места, куда хочется возвращаться.",traits:["home_comfort","quiet_closeness","ritual","stability","value_ritual","need_stability","shared_life","message_everyday_love"]}];function o(e){return({knight_princess:"01",wizards:"02",pirates:"03",astronauts:"04",sun_moon:"05",dragon_keeper:"06",players:"07",homekeepers:"08"})[e]??"00"}function a({index:e,label:i,value:n}){return(0,t.jsxs)("div",{className:"dimension",children:[(0,t.jsxs)("div",{className:"dimension-index",children:["0",e]}),(0,t.jsx)("div",{className:"dimension-name",children:i}),(0,t.jsx)("div",{className:"dimension-bar",children:(0,t.jsx)("div",{style:{width:`${n}%`}})}),(0,t.jsx)(l,{value:n}),(0,t.jsxs)("div",{className:"dimension-value",children:[n,"%"]})]})}function l({value:e,large:i=!1}){let n="sad";return e>=70?n="happy":e>=45&&(n="neutral"),(0,t.jsxs)("div",{className:`face ${n} ${i?"face-large":""}`,children:[(0,t.jsx)("span",{className:"eye eye-left"}),(0,t.jsx)("span",{className:"eye eye-right"}),(0,t.jsx)("span",{className:"mouth"})]})}function d({archetypeId:e}){return(0,t.jsxs)("div",{className:"pixel-art",children:[(0,t.jsxs)("div",{className:"pixel-space",children:[(0,t.jsx)("i",{className:"star star-1"}),(0,t.jsx)("i",{className:"star star-2"}),(0,t.jsx)("i",{className:"star star-3"}),(0,t.jsx)("i",{className:"star star-4"}),(0,t.jsx)("div",{className:"planet",children:(0,t.jsx)("span",{})})]}),(0,t.jsxs)("div",{className:"moon-ground",children:[(0,t.jsx)("i",{}),(0,t.jsx)("i",{}),(0,t.jsx)("i",{})]}),(0,t.jsx)(p,{side:"left"}),(0,t.jsx)("div",{className:"pixel-love",children:"♥"}),(0,t.jsx)(p,{side:"right"}),(0,t.jsx)("div",{className:"pixel-caption",children:function(e){switch(e){case"astronauts":return"на одной орбите";case"knight_princess":return"забота в деталях";case"wizards":return"магия разговора";case"pirates":return"куда-нибудь вместе";case"sun_moon":return"разные · рядом";case"dragon_keeper":return"огонь + спокойствие";case"players":return"одна команда";case"homekeepers":return"своё место";default:return"между вами"}}(e)})]})}function p({side:e}){return(0,t.jsxs)("div",{className:`astronaut ${e}`,children:[(0,t.jsx)("div",{className:"helmet",children:(0,t.jsx)("span",{})}),(0,t.jsx)("div",{className:"suit",children:(0,t.jsx)("span",{})}),(0,t.jsx)("div",{className:"boot boot-left"}),(0,t.jsx)("div",{className:"boot boot-right"})]})}let c=`

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;

    background:
      #F7F5F1;

    color:
      #272529;

    font-family:
      Arial,
      Helvetica,
      sans-serif;
  }

  .page {
    width: 100%;

    overflow: hidden;
  }

  /* ==========================================================
     HEADER
  ========================================================== */

  .header {
    width:
      min(
        calc(100% - 48px),
        1120px
      );

    height: 80px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin: auto;
  }

  .brand {
    font-family:
      Georgia,
      serif;

    font-size: 24px;
    font-weight: 700;

    letter-spacing:
      -0.05em;
  }

  .names {
    color:
      #8A8589;

    font-size: 11px;
    font-weight: 800;

    letter-spacing:
      0.1em;

    text-transform:
      uppercase;
  }

  .names span {
    margin:
      0 7px;

    color:
      #B3476D;
  }

  /* ==========================================================
     OVERALL
  ========================================================== */

  .overall {
    width:
      min(
        calc(100% - 48px),
        1120px
      );

    margin: auto;

    padding:
      55px
      0
      80px;
  }

  .section-label {
    color:
      #A29EA0;

    font-size: 10px;
    font-weight: 900;

    letter-spacing:
      0.24em;
  }

  .overall h1 {
    margin:
      5px
      0
      35px;

    font-family:
      Arial,
      sans-serif;

    font-size:
      clamp(
        58px,
        9vw,
        120px
      );

    font-weight: 900;

    line-height: 0.9;

    letter-spacing:
      -0.075em;

    text-transform:
      uppercase;
  }

  .overall-content {
    display: grid;

    grid-template-columns:
      0.8fr
      0.7fr
      1fr;

    align-items: center;

    gap: 50px;

    max-width: 850px;
  }

  .overall-number {
    color:
      #64616A;

    font-size:
      clamp(
        80px,
        9vw,
        125px
      );

    font-weight: 300;

    line-height: 1;
  }

  .overall-number span {
    font-size:
      0.55em;
  }

  .overall-copy strong {
    display: block;

    margin-bottom: 7px;

    font-size: 20px;
  }

  .overall-copy p {
    margin: 0;

    color:
      #979296;

    font-size: 13px;
    line-height: 1.4;
  }

  /* ==========================================================
     FACES
  ========================================================== */

  .face {
    position: relative;

    width: 54px;
    height: 54px;

    flex-shrink: 0;

    border-radius: 50%;

    background:
      #F5C328;
  }

  .face.happy {
    background:
      #93CF2A;
  }

  .face.sad {
    background:
      #F58B26;
  }

  .face-large {
    width: 105px;
    height: 105px;
  }

  .eye {
    position: absolute;

    top: 28%;

    width: 10%;
    height: 15%;

    border-radius: 50%;

    background:
      #171717;
  }

  .eye-left {
    left: 28%;
  }

  .eye-right {
    right: 28%;
  }

  .mouth {
    position: absolute;

    left: 25%;
    bottom: 22%;

    width: 50%;
    height: 25%;
  }

  .neutral
  .mouth {
    bottom: 27%;

    height: 4px;

    background:
      #171717;
  }

  .happy
  .mouth {
    border-bottom:
      4px solid #171717;

    border-radius:
      0 0 100px 100px;
  }

  .sad
  .mouth {
    bottom: 14%;

    border-top:
      4px solid #171717;

    border-radius:
      100px 100px 0 0;
  }

  .face-large
  .happy
  .mouth {
    border-width: 6px;
  }

  /* ==========================================================
     DIMENSIONS
  ========================================================== */

  .dimensions {
    padding:
      70px
      max(
        24px,
        calc(
          (
            100vw - 1120px
          ) / 2
        )
      );

    background:
      #FFFFFF;
  }

  .dimensions-heading {
    display: flex;
    align-items: center;

    gap: 12px;

    margin-bottom: 30px;

    color:
      #706B70;

    font-family:
      Georgia,
      serif;

    font-size: 20px;
  }

  .dimensions-heading b {
    color:
      #B3476D;
  }

  .dimension-list {
    border-top:
      1px solid
      #E5E1DF;
  }

  .dimension {
    min-height: 86px;

    display: grid;

    grid-template-columns:
      45px
      minmax(
        170px,
        0.8fr
      )
      minmax(
        160px,
        1.3fr
      )
      60px
      65px;

    align-items: center;

    gap: 24px;

    border-bottom:
      1px solid
      #E5E1DF;
  }

  .dimension-index {
    color:
      #C2BCBF;

    font-size: 10px;
    font-weight: 900;
  }

  .dimension-name {
    font-size: 17px;
    font-weight: 700;
  }

  .dimension-bar {
    height: 6px;

    overflow: hidden;

    background:
      #EEEAE7;
  }

  .dimension-bar div {
    height: 100%;

    background:
      #B3476D;
  }

  .dimension-value {
    color:
      #68636A;

    font-size: 24px;
    font-weight: 300;

    text-align: right;
  }

  /* ==========================================================
     TYPE
  ========================================================== */

  .type-section {
    width:
      min(
        calc(100% - 48px),
        1120px
      );

    margin: auto;

    padding:
      85px
      0;
  }

  .type-heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    margin-bottom: 30px;
  }

  .type-heading h2 {
    margin:
      7px
      0
      0;

    font-family:
      Georgia,
      serif;

    font-size:
      clamp(
        45px,
        6vw,
        72px
      );

    font-weight: 500;

    line-height: 1;
  }

  .type-number {
    color:
      #B3476D;

    font-family:
      Georgia,
      serif;

    font-size: 38px;
  }

  .type-card {
    display: grid;

    grid-template-columns:
      1.25fr
      0.75fr;

    border:
      1px solid
      #DAD4D1;

    background:
      #FFFFFF;
  }

  .type-art {
    padding: 25px;

    background:
      #E9E1E5;
  }

  .type-copy {
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding:
      45px;
  }

  .type-small {
    margin-bottom: 13px;

    color:
      #B3476D;

    font-size: 9px;
    font-weight: 900;

    letter-spacing:
      0.18em;
  }

  .type-copy h3 {
    margin: 0;

    font-family:
      Georgia,
      serif;

    font-size:
      clamp(
        40px,
        5vw,
        60px
      );

    font-weight: 500;

    line-height: 0.95;

    letter-spacing:
      -0.05em;
  }

  .type-copy p {
    max-width: 330px;

    margin:
      22px
      0
      0;

    color:
      #777075;

    font-size: 15px;
    line-height: 1.55;
  }

  /* ==========================================================
     PIXEL
  ========================================================== */

  .pixel-art {
    position: relative;

    min-height: 410px;

    overflow: hidden;

    border:
      4px solid
      #29252D;

    background:
      #3A3546;

    image-rendering:
      pixelated;
  }

  .pixel-space {
    position: absolute;

    inset: 0;

    background:
      linear-gradient(
        180deg,
        #373342,
        #51465D
      );
  }

  .star {
    position: absolute;

    width: 6px;
    height: 6px;

    background:
      #F5C68D;

    box-shadow:
      6px 0 #F5C68D,
      -6px 0 #F5C68D,
      0 6px #F5C68D,
      0 -6px #F5C68D;
  }

  .star-1 {
    top: 15%;
    left: 12%;
  }

  .star-2 {
    top: 25%;
    left: 45%;

    transform:
      scale(.6);
  }

  .star-3 {
    top: 17%;
    right: 13%;

    transform:
      scale(.7);
  }

  .star-4 {
    top: 42%;
    right: 7%;

    transform:
      scale(.5);
  }

  .planet {
    position: absolute;

    top: 13%;
    right: 18%;

    width: 72px;
    height: 72px;

    border:
      4px solid
      #29252D;

    border-radius: 50%;

    background:
      #9485AF;
  }

  .planet span {
    position: absolute;

    top: 28px;
    left: -15px;

    width: 95px;
    height: 15px;

    border:
      4px solid
      #E0AE70;

    border-radius: 50%;

    transform:
      rotate(-14deg);
  }

  .moon-ground {
    position: absolute;

    left: 7%;
    right: 7%;
    bottom: -15%;

    height: 48%;

    border:
      4px solid
      #29252D;

    border-radius:
      50% 50% 0 0;

    background:
      #857590;
  }

  .moon-ground i {
    position: absolute;

    width: 50px;
    height: 30px;

    border:
      4px solid
      #51485C;

    border-radius: 50%;

    background:
      #665A70;
  }

  .moon-ground i:first-child {
    top: 20%;
    left: 15%;
  }

  .moon-ground i:nth-child(2) {
    top: 45%;
    left: 45%;
  }

  .moon-ground i:nth-child(3) {
    top: 18%;
    right: 16%;
  }

  .astronaut {
    position: absolute;

    z-index: 4;

    bottom: 22%;

    width: 120px;
    height: 180px;
  }

  .astronaut.left {
    left: 24%;

    transform:
      rotate(3deg);
  }

  .astronaut.right {
    right: 23%;

    transform:
      rotate(-3deg);
  }

  .helmet {
    position: absolute;

    z-index: 4;

    top: 0;
    left: 50%;

    width: 82px;
    height: 78px;

    transform:
      translateX(-50%);

    border:
      4px solid
      #29252D;

    border-radius: 50%;

    background:
      #F3E9E1;
  }

  .helmet span {
    position: absolute;

    top: 15px;
    left: 15px;

    width: 45px;
    height: 38px;

    border:
      4px solid
      #29252D;

    border-radius: 50%;

    background:
      #595166;
  }

  .suit {
    position: absolute;

    top: 67px;
    left: 50%;

    width: 86px;
    height: 86px;

    transform:
      translateX(-50%);

    border:
      4px solid
      #29252D;

    border-radius:
      15px 15px 25px 25px;

    background:
      #F3E9E1;
  }

  .suit span {
    position: absolute;

    top: 22px;
    left: 25px;

    width: 30px;
    height: 21px;

    border:
      3px solid
      #29252D;

    background:
      #C96382;
  }

  .boot {
    position: absolute;

    bottom: 0;

    width: 38px;
    height: 55px;

    border:
      4px solid
      #29252D;

    border-radius:
      10px 10px 17px 17px;

    background:
      #F3E9E1;
  }

  .boot-left {
    left: 19px;

    transform:
      rotate(7deg);
  }

  .boot-right {
    right: 19px;

    transform:
      rotate(-7deg);
  }

  .pixel-love {
    position: absolute;

    z-index: 7;

    top: 40%;
    left: 50%;

    color:
      #D9567F;

    font-size: 32px;

    transform:
      translateX(-50%);
  }

  .pixel-caption {
    position: absolute;

    z-index: 10;

    right: 15px;
    bottom: 15px;

    padding:
      8px 11px;

    border:
      2px solid
      #29252D;

    background:
      #F7F5F1;

    font-size: 9px;
    font-weight: 900;
  }

  /* ==========================================================
     PAYWALL
  ========================================================== */

  .paywall {
    padding:
      75px
      24px;

    background:
      #29252D;

    color:
      #FFFFFF;
  }

  .paywall-inner {
    width:
      min(
        100%,
        1040px
      );

    display: grid;

    grid-template-columns:
      1fr
      0.9fr;

    align-items: center;

    gap: 80px;

    margin: auto;
  }

  .paywall-copy > span {
    color:
      #D9819E;

    font-size: 9px;
    font-weight: 900;

    letter-spacing:
      0.2em;
  }

  .paywall-copy h2 {
    margin:
      12px
      0
      15px;

    font-family:
      Georgia,
      serif;

    font-size:
      clamp(
        40px,
        5vw,
        58px
      );

    font-weight: 500;

    line-height: 1;

    letter-spacing:
      -0.04em;
  }

  .paywall-copy p {
    max-width: 430px;

    margin: 0;

    color:
      #BBB2B8;

    font-size: 14px;
    line-height: 1.5;
  }

  .paywall-box {
    display: grid;

    grid-template-columns:
      1fr 1fr;

    gap:
      16px
      20px;
  }

  .paywall-box > div {
    display: flex;

    gap: 8px;

    color:
      #D4CCD1;

    font-size: 11px;
    line-height: 1.35;
  }

  .paywall-box > div span {
    color:
      #D9819E;
  }

  .paywall-box button {
    grid-column:
      1 / -1;

    width: 100%;

    display: grid;

    grid-template-columns:
      1fr
      auto
      auto;

    align-items: center;

    gap: 15px;

    margin-top: 10px;

    padding:
      17px
      18px;

    border:
      1px solid
      #E489A6;

    background:
      #B3476D;

    color:
      #FFFFFF;

    cursor: pointer;

    text-align: left;
  }

  .paywall-box button strong {
    font-size: 15px;
  }

  .paywall-box button b {
    font-size: 20px;
  }

  /* ==========================================================
     STATE
  ========================================================== */

  .state {
    min-height: 100svh;

    display: flex;
    align-items: center;
    justify-content: center;

    background:
      #F7F5F1;

    color:
      #706A6E;
  }

  /* ==========================================================
     MOBILE
  ========================================================== */

  @media (
    max-width: 700px
  ) {

    .header {
      width:
        calc(
          100% - 32px
        );

      height: 65px;
    }

    .brand {
      font-size: 21px;
    }

    .names {
      font-size: 9px;
    }

    .overall {
      width:
        calc(
          100% - 32px
        );

      padding:
        40px
        0
        55px;
    }

    .overall h1 {
      margin-bottom: 30px;

      font-size:
        clamp(
          49px,
          15vw,
          72px
        );

      overflow-wrap:
        anywhere;
    }

    .overall-content {
      grid-template-columns:
        auto
        auto;

      gap:
        20px
        25px;
    }

    .overall-number {
      font-size: 83px;
    }

    .face-large {
      width: 85px;
      height: 85px;
    }

    .overall-copy {
      grid-column:
        1 / -1;
    }

    .dimensions {
      padding:
        45px
        16px;
    }

    .dimension {
      min-height: 92px;

      grid-template-columns:
        28px
        1fr
        50px
        55px;

      gap: 10px;
    }

    .dimension-name {
      font-size: 14px;
    }

    .dimension-bar {
      grid-column:
        2 / -1;

      grid-row: 2;

      width: 100%;

      margin-top: -20px;
    }

    .dimension-value {
      font-size: 19px;
    }

    .type-section {
      width:
        calc(
          100% - 32px
        );

      padding:
        60px
        0;
    }

    .type-heading {
      align-items: flex-start;
    }

    .type-heading h2 {
      font-size: 44px;
    }

    .type-number {
      font-size: 28px;
    }

    .type-card {
      grid-template-columns: 1fr;
    }

    .type-art {
      padding: 12px;
    }

    .pixel-art {
      min-height: 300px;
    }

    .astronaut {
      transform:
        scale(.72);
    }

    .astronaut.left {
      left: 13%;
    }

    .astronaut.right {
      right: 12%;
    }

    .type-copy {
      padding:
        30px
        24px
        34px;
    }

    .type-copy h3 {
      font-size: 45px;
    }

    .paywall {
      padding:
        55px
        16px;
    }

    .paywall-inner {
      grid-template-columns:
        1fr;

      gap: 35px;
    }

    .paywall-copy h2 {
      font-size: 42px;
    }

    .paywall-box {
      grid-template-columns: 1fr;
    }

    .paywall-box button {
      grid-column: auto;
    }

  }

`;e.s(["default",0,function(){var e;let p=(0,s.useParams)(),h=(0,s.useRouter)(),u=p.coupleId,[m,x]=(0,n.useState)(null),[f,g]=(0,n.useState)("");if((0,n.useEffect)(()=>{!async function(){try{let e=await fetch(`/api/report?id=${encodeURIComponent(u)}`,{cache:"no-store"});if(!e.ok)throw Error("Не удалось загрузить результат");let t=await e.json();if(t.waiting)return void h.replace(`/waiting/${u}`);x(t)}catch(e){console.error(e),g("Не получилось загрузить результат.")}}()},[u,h]),f)return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("main",{className:"state",children:f}),(0,t.jsx)(i.default,{id:c.__hash,children:c})]});if(!m)return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("main",{className:"state",children:"считаем, что у вас там..."}),(0,t.jsx)(i.default,{id:c.__hash,children:c})]});let y=m.comparisons??[],v=function(e){let t=new Map;for(let e of r)t.set(e.id,0);for(let i of e){let e="same"===i.similarity?2:"close"===i.similarity?1.35:.65,n=[...i.traitsA,...i.traitsB];for(let i of r)for(let s of n)i.traits.includes(s)&&t.set(i.id,(t.get(i.id)??0)+e)}let i=e.filter(e=>"different"===e.similarity).length,n=e.filter(e=>"same"===e.similarity).length;e.length>0&&i>n&&t.set("sun_moon",(t.get("sun_moon")??0)+4);let s=r[0],o=t.get(s.id)??0;for(let e of r){let i=t.get(e.id)??0;i>o&&(s=e,o=i)}return{id:s.id,title:s.title,emojiA:s.emojiA,emojiB:s.emojiB,description:s.description}}(y),_=m.couple.partner_a_name,b=m.couple.partner_b_name,j=m.scores?.overall??function(e){if(0===e.length)return 0;let t=0;for(let i of e)"same"===i.similarity&&(t+=1),"close"===i.similarity&&(t+=.5);return Math.round(t/e.length*100)}(y),w=m.scores?.dimensions,S=[{label:"Близость взглядов",value:w?.views??j,face:"happy"},{label:"Забота",value:w?.care??j,face:"happy"},{label:"Общение",value:w?.communication??j,face:"neutral"},{label:"Совместный ритм",value:w?.rhythm??j,face:"happy"},{label:"Личное пространство",value:w?.space??j,face:"neutral"}];return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("main",{className:"page",children:[(0,t.jsxs)("header",{className:"header",children:[(0,t.jsx)("div",{className:"brand",children:"между нами"}),(0,t.jsxs)("div",{className:"names",children:[_,(0,t.jsx)("span",{children:"+"}),b]})]}),(0,t.jsxs)("section",{className:"overall",children:[(0,t.jsx)("div",{className:"section-label",children:"ВАША ОБЩАЯ"}),(0,t.jsx)("h1",{children:"совместимость"}),(0,t.jsxs)("div",{className:"overall-content",children:[(0,t.jsxs)("div",{className:"overall-number",children:[j,(0,t.jsx)("span",{children:"%"})]}),(0,t.jsx)("div",{className:"overall-face",children:(0,t.jsx)(l,{value:j,large:!0})}),(0,t.jsxs)("div",{className:"overall-copy",children:[(0,t.jsx)("strong",{children:(e=j)>=85?"подозрительно похоже":e>=70?"очень близко":e>=55?"много общего":e>=40?"по-разному, но интересно":"два разных мира"}),(0,t.jsx)("p",{children:"по вашим ответам в этом тесте"})]})]})]}),(0,t.jsxs)("section",{className:"dimensions",children:[(0,t.jsxs)("div",{className:"dimensions-heading",children:[(0,t.jsx)("span",{children:"А если разобрать по частям"}),(0,t.jsx)("b",{children:"↓"})]}),(0,t.jsx)("div",{className:"dimension-list",children:S.map((e,i)=>(0,t.jsx)(a,{index:i+1,label:e.label,value:e.value},e.label))})]}),(0,t.jsxs)("section",{className:"type-section",children:[(0,t.jsxs)("div",{className:"type-heading",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"section-label",children:"А ТЕПЕРЬ ГЛАВНОЕ"}),(0,t.jsx)("h2",{children:"Ваш тип пары"})]}),(0,t.jsxs)("div",{className:"type-number",children:["№",o(v.id)]})]}),(0,t.jsxs)("div",{className:"type-card",children:[(0,t.jsx)("div",{className:"type-art",children:(0,t.jsx)(d,{archetypeId:v.id})}),(0,t.jsxs)("div",{className:"type-copy",children:[(0,t.jsxs)("div",{className:"type-small",children:["ТИП ПАРЫ №",o(v.id)]}),(0,t.jsx)("h3",{children:v.title}),(0,t.jsx)("p",{children:v.description})]})]})]}),(0,t.jsx)("section",{className:"paywall",children:(0,t.jsxs)("div",{className:"paywall-inner",children:[(0,t.jsxs)("div",{className:"paywall-copy",children:[(0,t.jsx)("span",{children:"А ЧТО МЕЖДУ СТРОК?"}),(0,t.jsx)("h2",{children:"Тут начинается самое интересное."}),(0,t.jsx)("p",{children:"Покажем, где вы можете не понимать друг друга — и что с этим делать."})]}),(0,t.jsxs)("div",{className:"paywall-box",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{children:"✦"}),"что одному не хватает"]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{children:"✦"}),"как каждый чувствует заботу"]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{children:"✦"}),"ваши слепые зоны"]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{children:"✦"}),"вопросы именно для вашей пары"]}),(0,t.jsxs)("button",{type:"button",onClick:()=>h.push(`/report/${u}`),children:[(0,t.jsx)("span",{children:"Открыть разбор"}),(0,t.jsx)("strong",{children:"299 ₽"}),(0,t.jsx)("b",{children:"→"})]})]})]})})]}),(0,t.jsx)(i.default,{id:c.__hash,children:c})]})}],95801)},16015,(e,t,i)=>{},18566,(e,t,i)=>{t.exports=e.r(76562)},98547,(e,t,i)=>{var n=e.i(47167);e.r(16015);var s=e.r(71645),r=s&&"object"==typeof s&&"default"in s?s:{default:s},o=void 0!==n.default&&n.default.env&&!0,a=function(e){return"[object String]"===Object.prototype.toString.call(e)},l=function(){function e(e){var t=void 0===e?{}:e,i=t.name,n=void 0===i?"stylesheet":i,s=t.optimizeForSpeed,r=void 0===s?o:s;d(a(n),"`name` must be a string"),this._name=n,this._deletedRulePlaceholder="#"+n+"-deleted-rule____{}",d("boolean"==typeof r,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=r,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0;var l="u">typeof window&&document.querySelector('meta[property="csp-nonce"]');this._nonce=l?l.getAttribute("content"):null}var t,i=e.prototype;return i.setOptimizeForSpeed=function(e){d("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),d(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},i.isOptimizeForSpeed=function(){return this._optimizeForSpeed},i.inject=function(){var e=this;if(d(!this._injected,"sheet already injected"),this._injected=!0,"u">typeof window&&this._optimizeForSpeed){this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),this._optimizeForSpeed||(o||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0);return}this._serverSheet={cssRules:[],insertRule:function(t,i){return"number"==typeof i?e._serverSheet.cssRules[i]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),i},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},i.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},i.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},i.insertRule=function(e,t){if(d(a(e),"`insertRule` accepts only strings"),"u"<typeof window)return"number"!=typeof t&&(t=this._serverSheet.cssRules.length),this._serverSheet.insertRule(e,t),this._rulesCount++;if(this._optimizeForSpeed){var i=this.getSheet();"number"!=typeof t&&(t=i.cssRules.length);try{i.insertRule(e,t)}catch(t){return o||console.warn("StyleSheet: illegal rule: \n\n"+e+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var n=this._tags[t];this._tags.push(this.makeStyleTag(this._name,e,n))}return this._rulesCount++},i.replaceRule=function(e,t){if(this._optimizeForSpeed||"u"<typeof window){var i="u">typeof window?this.getSheet():this._serverSheet;if(t.trim()||(t=this._deletedRulePlaceholder),!i.cssRules[e])return e;i.deleteRule(e);try{i.insertRule(t,e)}catch(n){o||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),i.insertRule(this._deletedRulePlaceholder,e)}}else{var n=this._tags[e];d(n,"old rule at index `"+e+"` not found"),n.textContent=t}return e},i.deleteRule=function(e){if("u"<typeof window)return void this._serverSheet.deleteRule(e);if(this._optimizeForSpeed)this.replaceRule(e,"");else{var t=this._tags[e];d(t,"rule at index `"+e+"` not found"),t.parentNode.removeChild(t),this._tags[e]=null}},i.flush=function(){this._injected=!1,this._rulesCount=0,"u">typeof window?(this._tags.forEach(function(e){return e&&e.parentNode.removeChild(e)}),this._tags=[]):this._serverSheet.cssRules=[]},i.cssRules=function(){var e=this;return"u"<typeof window?this._serverSheet.cssRules:this._tags.reduce(function(t,i){return i?t=t.concat(Array.prototype.map.call(e.getSheetForTag(i).cssRules,function(t){return t.cssText===e._deletedRulePlaceholder?null:t})):t.push(null),t},[])},i.makeStyleTag=function(e,t,i){t&&d(a(t),"makeStyleTag accepts only strings as second parameter");var n=document.createElement("style");this._nonce&&n.setAttribute("nonce",this._nonce),n.type="text/css",n.setAttribute("data-"+e,""),t&&n.appendChild(document.createTextNode(t));var s=document.head||document.getElementsByTagName("head")[0];return i?s.insertBefore(n,i):s.appendChild(n),n},t=[{key:"length",get:function(){return this._rulesCount}}],function(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}(e.prototype,t),e}();function d(e,t){if(!e)throw Error("StyleSheet: "+t+".")}var p=function(e){for(var t=5381,i=e.length;i;)t=33*t^e.charCodeAt(--i);return t>>>0},c={};function h(e,t){if(!t)return"jsx-"+e;var i=String(t),n=e+i;return c[n]||(c[n]="jsx-"+p(e+"-"+i)),c[n]}function u(e,t){"u"<typeof window&&(t=t.replace(/\/style/gi,"\\/style"));var i=e+t;return c[i]||(c[i]=t.replace(/__jsx-style-dynamic-selector/g,e)),c[i]}var m=function(){function e(e){var t=void 0===e?{}:e,i=t.styleSheet,n=void 0===i?null:i,s=t.optimizeForSpeed,r=void 0!==s&&s;this._sheet=n||new l({name:"styled-jsx",optimizeForSpeed:r}),this._sheet.inject(),n&&"boolean"==typeof r&&(this._sheet.setOptimizeForSpeed(r),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var t=e.prototype;return t.add=function(e){var t=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(e.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),"u">typeof window&&!this._fromServer&&(this._fromServer=this.selectFromServer(),this._instancesCounts=Object.keys(this._fromServer).reduce(function(e,t){return e[t]=0,e},{}));var i=this.getIdAndRules(e),n=i.styleId,s=i.rules;if(n in this._instancesCounts){this._instancesCounts[n]+=1;return}var r=s.map(function(e){return t._sheet.insertRule(e)}).filter(function(e){return -1!==e});this._indices[n]=r,this._instancesCounts[n]=1},t.remove=function(e){var t=this,i=this.getIdAndRules(e).styleId;if(function(e,t){if(!e)throw Error("StyleSheetRegistry: "+t+".")}(i in this._instancesCounts,"styleId: `"+i+"` not found"),this._instancesCounts[i]-=1,this._instancesCounts[i]<1){var n=this._fromServer&&this._fromServer[i];n?(n.parentNode.removeChild(n),delete this._fromServer[i]):(this._indices[i].forEach(function(e){return t._sheet.deleteRule(e)}),delete this._indices[i]),delete this._instancesCounts[i]}},t.update=function(e,t){this.add(t),this.remove(e)},t.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},t.cssRules=function(){var e=this,t=this._fromServer?Object.keys(this._fromServer).map(function(t){return[t,e._fromServer[t]]}):[],i=this._sheet.cssRules();return t.concat(Object.keys(this._indices).map(function(t){return[t,e._indices[t].map(function(e){return i[e].cssText}).join(e._optimizeForSpeed?"":"\n")]}).filter(function(e){return!!e[1]}))},t.styles=function(e){var t,i;return t=this.cssRules(),void 0===(i=e)&&(i={}),t.map(function(e){var t=e[0],n=e[1];return r.default.createElement("style",{id:"__"+t,key:"__"+t,nonce:i.nonce?i.nonce:void 0,dangerouslySetInnerHTML:{__html:n}})})},t.getIdAndRules=function(e){var t=e.children,i=e.dynamic,n=e.id;if(i){var s=h(n,i);return{styleId:s,rules:Array.isArray(t)?t.map(function(e){return u(s,e)}):[u(s,t)]}}return{styleId:h(n),rules:Array.isArray(t)?t:[t]}},t.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e,t){return e[t.id.slice(2)]=t,e},{})},e}(),x=s.createContext(null);function f(){return new m}function g(){return s.useContext(x)}x.displayName="StyleSheetContext";var y=r.default.useInsertionEffect||r.default.useLayoutEffect,v="u">typeof window?f():void 0;function _(e){var t=v||g();return t&&("u"<typeof window?t.add(e):y(function(){return t.add(e),function(){t.remove(e)}},[e.id,String(e.dynamic)])),null}_.dynamic=function(e){return e.map(function(e){return h(e[0],e[1])}).join(" ")},i.StyleRegistry=function(e){var t=e.registry,i=e.children,n=s.useContext(x),o=s.useState(function(){return n||t||f()})[0];return r.default.createElement(x.Provider,{value:o},i)},i.createStyleRegistry=f,i.style=_,i.useStyleRegistry=g},37902,(e,t,i)=>{t.exports=e.r(98547).style}]);