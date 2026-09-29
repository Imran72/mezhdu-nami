module.exports=[66248,a=>{"use strict";var b=a.i(87924),c=a.i(31626),d=a.i(72131),e=a.i(50944);let f=[{id:"knight_princess",title:"Рыцарь и принцесса",emojiA:"⚔️",emojiB:"👑",description:"У вас много заботы в мелочах. Для этой пары любовь чаще видна не в громких словах, а в ощущении: «я рядом и помню о тебе».",traits:["care_practical","attention","warmth","initiative","support_action","physical_closeness","support_physical"]},{id:"astronauts",title:"Два космонавта",emojiA:"🚀",emojiB:"🪐",description:"У каждого может быть своя орбита, но вам важно знать, что маршрут всё равно общий. Близость для вас не обязательно означает быть вместе каждую минуту.",traits:["independence","personal_space_high","space_high","space_balanced","autonomy","value_independence","planning","need_future_alignment"]},{id:"wizards",title:"Два волшебника",emojiA:"🔮",emojiB:"✨",description:"Ваш главный инструмент — разговор. Вам важно не просто быть рядом, а понимать, что происходит внутри другого человека.",traits:["communication","emotional_sharing","support_listening","conflict_verbal_resolution","need_communication","need_deep_communication","value_communication","listening"]},{id:"pirates",title:"Два пирата",emojiA:"🏴‍☠️",emojiB:"🗺️",description:"Вашей паре особенно идёт ощущение приключения. Планы хороши, но иногда лучший план — придумать всё по дороге.",traits:["spontaneity","shared_experience","activity","need_spontaneity","need_novelty","flexibility","money_experience","money_present"]},{id:"sun_moon",title:"Солнце и Луна",emojiA:"☀️",emojiB:"🌙",description:"Вы не обязаны одинаково реагировать на всё. В вашей паре особенно заметно, как разные способы чувствовать и действовать могут существовать рядом.",traits:["support_proactive","support_space","space_high","closeness_high","independence","direct_communication","quiet_closeness","emotional_sharing"]},{id:"dragon_keeper",title:"Дракон и хранитель",emojiA:"🐉",emojiB:"🛡️",description:"В вашей динамике есть энергия и спокойствие. Один момент может проживаться ярко, другой — через паузу, действие или присутствие рядом.",traits:["emotion_intensity","self_regulation","support_available","support_presence","conflict_time_repair","indirect_repair","repair_delayed"]},{id:"players",title:"Два игрока",emojiA:"🎮",emojiB:"👾",description:"У вас есть важная суперсила — лёгкость. Юмор, свои приколы и ощущение команды помогают вам снова находить друг друга.",traits:["humor","playfulness","support_humor","conflict_humor_repair","micro_connection","value_playfulness","need_lightness","message_team"]},{id:"homekeepers",title:"Хранители дома",emojiA:"🕯️",emojiB:"🏡",description:"Сила вашей пары прячется в обычной жизни: знакомых ритуалах, спокойных вечерах и ощущении места, куда хочется возвращаться.",traits:["home_comfort","quiet_closeness","ritual","stability","value_ritual","need_stability","shared_life","message_everyday_love"]}];function g(a){return({knight_princess:"01",wizards:"02",pirates:"03",astronauts:"04",sun_moon:"05",dragon_keeper:"06",players:"07",homekeepers:"08"})[a]??"00"}function h({index:a,label:c,value:d}){return(0,b.jsxs)("div",{className:"dimension",children:[(0,b.jsxs)("div",{className:"dimension-index",children:["0",a]}),(0,b.jsx)("div",{className:"dimension-name",children:c}),(0,b.jsx)("div",{className:"dimension-bar",children:(0,b.jsx)("div",{style:{width:`${d}%`}})}),(0,b.jsx)(i,{value:d}),(0,b.jsxs)("div",{className:"dimension-value",children:[d,"%"]})]})}function i({value:a,large:c=!1}){let d="sad";return a>=70?d="happy":a>=45&&(d="neutral"),(0,b.jsxs)("div",{className:`face ${d} ${c?"face-large":""}`,children:[(0,b.jsx)("span",{className:"eye eye-left"}),(0,b.jsx)("span",{className:"eye eye-right"}),(0,b.jsx)("span",{className:"mouth"})]})}function j({archetypeId:a}){return(0,b.jsxs)("div",{className:"pixel-art",children:[(0,b.jsxs)("div",{className:"pixel-space",children:[(0,b.jsx)("i",{className:"star star-1"}),(0,b.jsx)("i",{className:"star star-2"}),(0,b.jsx)("i",{className:"star star-3"}),(0,b.jsx)("i",{className:"star star-4"}),(0,b.jsx)("div",{className:"planet",children:(0,b.jsx)("span",{})})]}),(0,b.jsxs)("div",{className:"moon-ground",children:[(0,b.jsx)("i",{}),(0,b.jsx)("i",{}),(0,b.jsx)("i",{})]}),(0,b.jsx)(k,{side:"left"}),(0,b.jsx)("div",{className:"pixel-love",children:"♥"}),(0,b.jsx)(k,{side:"right"}),(0,b.jsx)("div",{className:"pixel-caption",children:function(a){switch(a){case"astronauts":return"на одной орбите";case"knight_princess":return"забота в деталях";case"wizards":return"магия разговора";case"pirates":return"куда-нибудь вместе";case"sun_moon":return"разные · рядом";case"dragon_keeper":return"огонь + спокойствие";case"players":return"одна команда";case"homekeepers":return"своё место";default:return"между вами"}}(a)})]})}function k({side:a}){return(0,b.jsxs)("div",{className:`astronaut ${a}`,children:[(0,b.jsx)("div",{className:"helmet",children:(0,b.jsx)("span",{})}),(0,b.jsx)("div",{className:"suit",children:(0,b.jsx)("span",{})}),(0,b.jsx)("div",{className:"boot boot-left"}),(0,b.jsx)("div",{className:"boot boot-right"})]})}let l=`

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

`;a.s(["default",0,function(){var a;let k=(0,e.useParams)(),m=(0,e.useRouter)(),n=k.coupleId,[o,p]=(0,d.useState)(null),[q,r]=(0,d.useState)("");if((0,d.useEffect)(()=>{!async function(){try{let a=await fetch(`/api/report?id=${encodeURIComponent(n)}`,{cache:"no-store"});if(!a.ok)throw Error("Не удалось загрузить результат");let b=await a.json();if(b.waiting)return void m.replace(`/waiting/${n}`);p(b)}catch(a){console.error(a),r("Не получилось загрузить результат.")}}()},[n,m]),q)return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("main",{className:"state",children:q}),(0,b.jsx)(c.default,{id:l.__hash,children:l})]});if(!o)return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("main",{className:"state",children:"считаем, что у вас там..."}),(0,b.jsx)(c.default,{id:l.__hash,children:l})]});let s=o.comparisons??[],t=function(a){let b=new Map;for(let a of f)b.set(a.id,0);for(let c of a){let a="same"===c.similarity?2:"close"===c.similarity?1.35:.65,d=[...c.traitsA,...c.traitsB];for(let c of f)for(let e of d)c.traits.includes(e)&&b.set(c.id,(b.get(c.id)??0)+a)}let c=a.filter(a=>"different"===a.similarity).length,d=a.filter(a=>"same"===a.similarity).length;a.length>0&&c>d&&b.set("sun_moon",(b.get("sun_moon")??0)+4);let e=f[0],g=b.get(e.id)??0;for(let a of f){let c=b.get(a.id)??0;c>g&&(e=a,g=c)}return{id:e.id,title:e.title,emojiA:e.emojiA,emojiB:e.emojiB,description:e.description}}(s),u=o.couple.partner_a_name,v=o.couple.partner_b_name,w=o.scores?.overall??function(a){if(0===a.length)return 0;let b=0;for(let c of a)"same"===c.similarity&&(b+=1),"close"===c.similarity&&(b+=.5);return Math.round(b/a.length*100)}(s),x=o.scores?.dimensions,y=[{label:"Близость взглядов",value:x?.views??w,face:"happy"},{label:"Забота",value:x?.care??w,face:"happy"},{label:"Общение",value:x?.communication??w,face:"neutral"},{label:"Совместный ритм",value:x?.rhythm??w,face:"happy"},{label:"Личное пространство",value:x?.space??w,face:"neutral"}];return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("main",{className:"page",children:[(0,b.jsxs)("header",{className:"header",children:[(0,b.jsx)("div",{className:"brand",children:"между нами"}),(0,b.jsxs)("div",{className:"names",children:[u,(0,b.jsx)("span",{children:"+"}),v]})]}),(0,b.jsxs)("section",{className:"overall",children:[(0,b.jsx)("div",{className:"section-label",children:"ВАША ОБЩАЯ"}),(0,b.jsx)("h1",{children:"совместимость"}),(0,b.jsxs)("div",{className:"overall-content",children:[(0,b.jsxs)("div",{className:"overall-number",children:[w,(0,b.jsx)("span",{children:"%"})]}),(0,b.jsx)("div",{className:"overall-face",children:(0,b.jsx)(i,{value:w,large:!0})}),(0,b.jsxs)("div",{className:"overall-copy",children:[(0,b.jsx)("strong",{children:(a=w)>=85?"подозрительно похоже":a>=70?"очень близко":a>=55?"много общего":a>=40?"по-разному, но интересно":"два разных мира"}),(0,b.jsx)("p",{children:"по вашим ответам в этом тесте"})]})]})]}),(0,b.jsxs)("section",{className:"dimensions",children:[(0,b.jsxs)("div",{className:"dimensions-heading",children:[(0,b.jsx)("span",{children:"А если разобрать по частям"}),(0,b.jsx)("b",{children:"↓"})]}),(0,b.jsx)("div",{className:"dimension-list",children:y.map((a,c)=>(0,b.jsx)(h,{index:c+1,label:a.label,value:a.value},a.label))})]}),(0,b.jsxs)("section",{className:"type-section",children:[(0,b.jsxs)("div",{className:"type-heading",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"section-label",children:"А ТЕПЕРЬ ГЛАВНОЕ"}),(0,b.jsx)("h2",{children:"Ваш тип пары"})]}),(0,b.jsxs)("div",{className:"type-number",children:["№",g(t.id)]})]}),(0,b.jsxs)("div",{className:"type-card",children:[(0,b.jsx)("div",{className:"type-art",children:(0,b.jsx)(j,{archetypeId:t.id})}),(0,b.jsxs)("div",{className:"type-copy",children:[(0,b.jsxs)("div",{className:"type-small",children:["ТИП ПАРЫ №",g(t.id)]}),(0,b.jsx)("h3",{children:t.title}),(0,b.jsx)("p",{children:t.description})]})]})]}),(0,b.jsx)("section",{className:"paywall",children:(0,b.jsxs)("div",{className:"paywall-inner",children:[(0,b.jsxs)("div",{className:"paywall-copy",children:[(0,b.jsx)("span",{children:"А ЧТО МЕЖДУ СТРОК?"}),(0,b.jsx)("h2",{children:"Тут начинается самое интересное."}),(0,b.jsx)("p",{children:"Покажем, где вы можете не понимать друг друга — и что с этим делать."})]}),(0,b.jsxs)("div",{className:"paywall-box",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("span",{children:"✦"}),"что одному не хватает"]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("span",{children:"✦"}),"как каждый чувствует заботу"]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("span",{children:"✦"}),"ваши слепые зоны"]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("span",{children:"✦"}),"вопросы именно для вашей пары"]}),(0,b.jsxs)("button",{type:"button",onClick:()=>m.push(`/report/${n}`),children:[(0,b.jsx)("span",{children:"Открыть разбор"}),(0,b.jsx)("strong",{children:"299 ₽"}),(0,b.jsx)("b",{children:"→"})]})]})]})})]}),(0,b.jsx)(c.default,{id:l.__hash,children:l})]})}],66248)}];

//# sourceMappingURL=app_result_%5BcoupleId%5D_page_tsx_1boadhs._.js.map