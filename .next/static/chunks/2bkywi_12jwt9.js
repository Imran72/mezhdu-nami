(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,47988,e=>{"use strict";var t=e.i(43476),s=e.i(37902),i=e.i(71645),r=e.i(18566),n=e.i(32177);function o({question:e,onAnswer:i,disabled:r}){return Array.isArray(e.options)&&e.options.length>0?(0,t.jsxs)("div",{className:"jsx-f60ff496bbb0ccbb answers",children:[e.options.map((s,n)=>{let o="string"==typeof s?s:s.label??String(s.value??""),a="string"==typeof s?s:s.value??s.label??n;return(0,t.jsx)("button",{type:"button",disabled:r,onClick:()=>i(a),className:"jsx-f60ff496bbb0ccbb answer-button",children:o},`${e.id}-${n}`)}),(0,t.jsx)(s.default,{id:"f60ff496bbb0ccbb",children:".answers.jsx-f60ff496bbb0ccbb{flex-direction:column;gap:12px;width:100%;margin-top:34px;display:flex}.answer-button.jsx-f60ff496bbb0ccbb{color:#171515;text-align:left;cursor:pointer;background:#fff;border:1px solid #e4d9d7;border-radius:18px;width:100%;padding:19px 22px;font-size:17px;line-height:1.35;transition:border-color .15s,background .15s,transform .15s}.answer-button.jsx-f60ff496bbb0ccbb:hover{background:#fcf7f8;border-color:#b65c7c}.answer-button.jsx-f60ff496bbb0ccbb:active{transform:scale(.99)}.answer-button.jsx-f60ff496bbb0ccbb:disabled{opacity:.5;cursor:default}"})]}):(0,t.jsx)(a,{disabled:r,onAnswer:i})}function a({onAnswer:e,disabled:r}){let[n,o]=(0,i.useState)("");return(0,t.jsxs)("div",{className:"jsx-95eb2e9bc30e6547 text-answer",children:[(0,t.jsx)("textarea",{value:n,disabled:r,placeholder:"Напиши свой ответ...",onChange:e=>{o(e.target.value)},className:"jsx-95eb2e9bc30e6547 textarea"}),(0,t.jsx)("button",{type:"button",disabled:!n.trim()||r,onClick:function(){let t=n.trim();t&&!r&&e(t)},className:"jsx-95eb2e9bc30e6547 continue-button",children:"Продолжить"}),(0,t.jsx)(s.default,{id:"95eb2e9bc30e6547",children:".text-answer.jsx-95eb2e9bc30e6547{flex-direction:column;gap:14px;width:100%;margin-top:34px;display:flex}.textarea.jsx-95eb2e9bc30e6547{box-sizing:border-box;resize:vertical;color:#171515;width:100%;min-height:140px;font:inherit;background:#fff;border:1px solid #e4d9d7;border-radius:18px;outline:none;padding:18px;font-size:17px;line-height:1.5;transition:border-color .15s}.textarea.jsx-95eb2e9bc30e6547:focus{border-color:#b65c7c}.continue-button.jsx-95eb2e9bc30e6547{color:#fff;cursor:pointer;background:#171515;border:0;border-radius:18px;width:100%;padding:19px 22px;font-size:17px;font-weight:650;transition:opacity .15s,transform .15s}.continue-button.jsx-95eb2e9bc30e6547:hover:not(:disabled){opacity:.92}.continue-button.jsx-95eb2e9bc30e6547:active:not(:disabled){transform:scale(.99)}.continue-button.jsx-95eb2e9bc30e6547:disabled{opacity:.35;cursor:default}"})]})}let c=`

  .test-page {
    min-height: 100svh;

    box-sizing: border-box;

    background: #faf8f6;

    padding:
      max(30px, env(safe-area-inset-top))
      20px
      max(40px, env(safe-area-inset-bottom));
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

    transition: width 250ms ease;
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

    font-size: clamp(38px, 5vw, 58px);
    line-height: 1.02;

    font-weight: 500;

    letter-spacing: -0.035em;
  }

  .question-subtitle {
    max-width: 650px;

    margin:
      20px
      0
      0;

    color: #81777a;

    font-size: 17px;
    line-height: 1.5;
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

    .question-subtitle {
      font-size: 16px;
    }

  }

`;e.s(["default",0,function(){let e=(0,r.useParams)(),a=(0,r.useSearchParams)(),l=(0,r.useRouter)(),u=e.coupleId,d="b"===a.get("role")?"b":"a",[h,p]=(0,i.useState)(0),[f,m]=(0,i.useState)({}),[x,_]=(0,i.useState)(!1),[b,g]=(0,i.useState)(!0),[y,v]=(0,i.useState)(""),S=n.questions[h],j=(0,i.useMemo)(()=>n.questions.length?(h+1)/n.questions.length*100:0,[h]);async function w(e){if(!x){_(!0),v("");try{let t=await fetch("/api/answers",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({coupleId:u,role:d,answers:e})});if(!t.ok){let e=await t.text();throw console.error("Answers API error:",t.status,e),Error("Не удалось сохранить ответы")}if("b"===d)return void l.replace(`/result/${u}`);l.replace(`/waiting/${u}`)}catch(e){console.error(e),v("Не получилось сохранить ответы. Попробуй ещё раз."),_(!1)}}}return(0,i.useEffect)(()=>{!async function(){try{let e=await fetch(`/api/couples?id=${encodeURIComponent(u)}`,{cache:"no-store"});if(!e.ok)throw Error("Не удалось загрузить данные пары");let t=await e.json();if(t.partner_a_completed&&t.partner_b_completed)return void l.replace(`/result/${u}`);if("a"===d&&t.partner_a_completed)return void l.replace(`/waiting/${u}`);if("b"===d&&t.partner_b_completed)return void(t.partner_a_completed?l.replace(`/result/${u}`):l.replace(`/waiting/${u}`))}catch(e){console.error(e)}finally{g(!1)}}()},[u,d,l]),b?(0,t.jsxs)("main",{className:`jsx-${c.__hash} test-page`,children:[(0,t.jsx)("div",{className:`jsx-${c.__hash} test-shell`,children:(0,t.jsx)("div",{className:`jsx-${c.__hash} loading`,children:"Загружаем..."})}),(0,t.jsx)(s.default,{id:c.__hash,children:c})]}):S?(0,t.jsxs)("main",{className:`jsx-${c.__hash} test-page`,children:[(0,t.jsxs)("div",{className:`jsx-${c.__hash} test-shell`,children:[(0,t.jsxs)("div",{className:`jsx-${c.__hash} top`,children:[(0,t.jsxs)("div",{className:`jsx-${c.__hash} question-counter`,children:[h+1," / ",n.questions.length]}),(0,t.jsx)("div",{className:`jsx-${c.__hash} progress-track`,children:(0,t.jsx)("div",{style:{width:`${j}%`},className:`jsx-${c.__hash} progress-value`})})]}),(0,t.jsxs)("div",{className:`jsx-${c.__hash} question-area`,children:[(0,t.jsxs)("div",{className:`jsx-${c.__hash} question-number`,children:["ВОПРОС ",h+1]}),(0,t.jsx)("h1",{className:`jsx-${c.__hash} question-title`,children:S.text}),"subtitle"in S&&S.subtitle&&(0,t.jsx)("p",{className:`jsx-${c.__hash} question-subtitle`,children:S.subtitle}),(0,t.jsx)(o,{question:S,disabled:x,onAnswer:function(e){if(!S)return;let t={...f,[S.id]:e};(m(t),h<n.questions.length-1)?p(e=>e+1):w(t)}}),x&&(0,t.jsx)("div",{className:`jsx-${c.__hash} saving`,children:"Сохраняем ответы..."}),y&&(0,t.jsx)("div",{className:`jsx-${c.__hash} error`,children:y})]})]}),(0,t.jsx)(s.default,{id:c.__hash,children:c})]}):(0,t.jsxs)("main",{className:`jsx-${c.__hash} test-page`,children:[(0,t.jsx)("div",{className:`jsx-${c.__hash} test-shell`,children:(0,t.jsx)("div",{className:`jsx-${c.__hash} loading`,children:"Вопросы не найдены."})}),(0,t.jsx)(s.default,{id:c.__hash,children:c})]})}])},32177,e=>{"use strict";e.s(["questions",0,[{id:"fun",category:"closeness",text:"Как часто вам действительно весело вместе?",type:"scale"},{id:"joy",category:"understanding",text:"Насколько хорошо партнёр знает, что тебя радует?",type:"scale"},{id:"attention",category:"closeness",text:"Хватает ли тебе внимания партнёра?",type:"scale"},{id:"listen",category:"communication",text:"Чувствуешь ли ты, что партнёр действительно слушает тебя в серьёзных разговорах?",type:"scale"},{id:"talk",category:"communication",text:"Насколько легко тебе говорить с партнёром о том, что тебя задевает?",type:"scale"},{id:"repair",category:"conflict",text:"После ссоры насколько быстро между вами снова становится спокойно?",type:"scale"},{id:"first_step",category:"conflict",text:"Кто чаще делает первый шаг к примирению?",type:"choice",options:["Я","Партнёр","Оба примерно одинаково","Зависит от ситуации"]},{id:"money",category:"money",text:"Насколько комфортно тебе обсуждать с партнёром деньги?",type:"scale"},{id:"chores",category:"daily",text:"Насколько справедливо, по твоему ощущению, распределён быт?",type:"scale"},{id:"space",category:"space",text:"Насколько тебе хватает личного пространства в отношениях?",type:"scale"},{id:"support",category:"closeness",text:"Насколько ты чувствуешь поддержку партнёра, когда тебе тяжело?",type:"scale"},{id:"intimacy",category:"intimacy",text:"Насколько тебя устраивает уровень физической и эмоциональной близости?",type:"scale"},{id:"future",category:"future",text:"Насколько ваши представления о совместном будущем совпадают?",type:"scale"},{id:"family",category:"future",text:"Насколько легко вам обсуждать семью, детей и долгосрочные планы?",type:"scale"},{id:"priority_self",category:"understanding",text:"Что для тебя сейчас важнее всего в отношениях?",type:"choice",options:["Поддержка","Совместное время","Интимность","Доверие","Финансовая стабильность","Личное пространство","Общие планы"]},{id:"priority_partner",category:"understanding",text:"А что, как тебе кажется, сейчас важнее всего твоему партнёру?",type:"choice",options:["Поддержка","Совместное время","Интимность","Доверие","Финансовая стабильность","Личное пространство","Общие планы"]},{id:"missing",category:"open",text:"Чего тебе сейчас больше всего не хватает в ваших отношениях?",type:"text"},{id:"gratitude",category:"open",text:"Что партнёр делает такого, за что ты ему особенно благодарен?",type:"text"}]])},16015,(e,t,s)=>{},18566,(e,t,s)=>{t.exports=e.r(76562)},98547,(e,t,s)=>{var i=e.i(47167);e.r(16015);var r=e.r(71645),n=r&&"object"==typeof r&&"default"in r?r:{default:r},o=void 0!==i.default&&i.default.env&&!0,a=function(e){return"[object String]"===Object.prototype.toString.call(e)},c=function(){function e(e){var t=void 0===e?{}:e,s=t.name,i=void 0===s?"stylesheet":s,r=t.optimizeForSpeed,n=void 0===r?o:r;l(a(i),"`name` must be a string"),this._name=i,this._deletedRulePlaceholder="#"+i+"-deleted-rule____{}",l("boolean"==typeof n,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=n,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0;var c="u">typeof window&&document.querySelector('meta[property="csp-nonce"]');this._nonce=c?c.getAttribute("content"):null}var t,s=e.prototype;return s.setOptimizeForSpeed=function(e){l("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),l(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},s.isOptimizeForSpeed=function(){return this._optimizeForSpeed},s.inject=function(){var e=this;if(l(!this._injected,"sheet already injected"),this._injected=!0,"u">typeof window&&this._optimizeForSpeed){this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),this._optimizeForSpeed||(o||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0);return}this._serverSheet={cssRules:[],insertRule:function(t,s){return"number"==typeof s?e._serverSheet.cssRules[s]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),s},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},s.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},s.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},s.insertRule=function(e,t){if(l(a(e),"`insertRule` accepts only strings"),"u"<typeof window)return"number"!=typeof t&&(t=this._serverSheet.cssRules.length),this._serverSheet.insertRule(e,t),this._rulesCount++;if(this._optimizeForSpeed){var s=this.getSheet();"number"!=typeof t&&(t=s.cssRules.length);try{s.insertRule(e,t)}catch(t){return o||console.warn("StyleSheet: illegal rule: \n\n"+e+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var i=this._tags[t];this._tags.push(this.makeStyleTag(this._name,e,i))}return this._rulesCount++},s.replaceRule=function(e,t){if(this._optimizeForSpeed||"u"<typeof window){var s="u">typeof window?this.getSheet():this._serverSheet;if(t.trim()||(t=this._deletedRulePlaceholder),!s.cssRules[e])return e;s.deleteRule(e);try{s.insertRule(t,e)}catch(i){o||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),s.insertRule(this._deletedRulePlaceholder,e)}}else{var i=this._tags[e];l(i,"old rule at index `"+e+"` not found"),i.textContent=t}return e},s.deleteRule=function(e){if("u"<typeof window)return void this._serverSheet.deleteRule(e);if(this._optimizeForSpeed)this.replaceRule(e,"");else{var t=this._tags[e];l(t,"rule at index `"+e+"` not found"),t.parentNode.removeChild(t),this._tags[e]=null}},s.flush=function(){this._injected=!1,this._rulesCount=0,"u">typeof window?(this._tags.forEach(function(e){return e&&e.parentNode.removeChild(e)}),this._tags=[]):this._serverSheet.cssRules=[]},s.cssRules=function(){var e=this;return"u"<typeof window?this._serverSheet.cssRules:this._tags.reduce(function(t,s){return s?t=t.concat(Array.prototype.map.call(e.getSheetForTag(s).cssRules,function(t){return t.cssText===e._deletedRulePlaceholder?null:t})):t.push(null),t},[])},s.makeStyleTag=function(e,t,s){t&&l(a(t),"makeStyleTag accepts only strings as second parameter");var i=document.createElement("style");this._nonce&&i.setAttribute("nonce",this._nonce),i.type="text/css",i.setAttribute("data-"+e,""),t&&i.appendChild(document.createTextNode(t));var r=document.head||document.getElementsByTagName("head")[0];return s?r.insertBefore(i,s):r.appendChild(i),i},t=[{key:"length",get:function(){return this._rulesCount}}],function(e,t){for(var s=0;s<t.length;s++){var i=t[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}(e.prototype,t),e}();function l(e,t){if(!e)throw Error("StyleSheet: "+t+".")}var u=function(e){for(var t=5381,s=e.length;s;)t=33*t^e.charCodeAt(--s);return t>>>0},d={};function h(e,t){if(!t)return"jsx-"+e;var s=String(t),i=e+s;return d[i]||(d[i]="jsx-"+u(e+"-"+s)),d[i]}function p(e,t){"u"<typeof window&&(t=t.replace(/\/style/gi,"\\/style"));var s=e+t;return d[s]||(d[s]=t.replace(/__jsx-style-dynamic-selector/g,e)),d[s]}var f=function(){function e(e){var t=void 0===e?{}:e,s=t.styleSheet,i=void 0===s?null:s,r=t.optimizeForSpeed,n=void 0!==r&&r;this._sheet=i||new c({name:"styled-jsx",optimizeForSpeed:n}),this._sheet.inject(),i&&"boolean"==typeof n&&(this._sheet.setOptimizeForSpeed(n),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var t=e.prototype;return t.add=function(e){var t=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(e.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),"u">typeof window&&!this._fromServer&&(this._fromServer=this.selectFromServer(),this._instancesCounts=Object.keys(this._fromServer).reduce(function(e,t){return e[t]=0,e},{}));var s=this.getIdAndRules(e),i=s.styleId,r=s.rules;if(i in this._instancesCounts){this._instancesCounts[i]+=1;return}var n=r.map(function(e){return t._sheet.insertRule(e)}).filter(function(e){return -1!==e});this._indices[i]=n,this._instancesCounts[i]=1},t.remove=function(e){var t=this,s=this.getIdAndRules(e).styleId;if(function(e,t){if(!e)throw Error("StyleSheetRegistry: "+t+".")}(s in this._instancesCounts,"styleId: `"+s+"` not found"),this._instancesCounts[s]-=1,this._instancesCounts[s]<1){var i=this._fromServer&&this._fromServer[s];i?(i.parentNode.removeChild(i),delete this._fromServer[s]):(this._indices[s].forEach(function(e){return t._sheet.deleteRule(e)}),delete this._indices[s]),delete this._instancesCounts[s]}},t.update=function(e,t){this.add(t),this.remove(e)},t.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},t.cssRules=function(){var e=this,t=this._fromServer?Object.keys(this._fromServer).map(function(t){return[t,e._fromServer[t]]}):[],s=this._sheet.cssRules();return t.concat(Object.keys(this._indices).map(function(t){return[t,e._indices[t].map(function(e){return s[e].cssText}).join(e._optimizeForSpeed?"":"\n")]}).filter(function(e){return!!e[1]}))},t.styles=function(e){var t,s;return t=this.cssRules(),void 0===(s=e)&&(s={}),t.map(function(e){var t=e[0],i=e[1];return n.default.createElement("style",{id:"__"+t,key:"__"+t,nonce:s.nonce?s.nonce:void 0,dangerouslySetInnerHTML:{__html:i}})})},t.getIdAndRules=function(e){var t=e.children,s=e.dynamic,i=e.id;if(s){var r=h(i,s);return{styleId:r,rules:Array.isArray(t)?t.map(function(e){return p(r,e)}):[p(r,t)]}}return{styleId:h(i),rules:Array.isArray(t)?t:[t]}},t.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e,t){return e[t.id.slice(2)]=t,e},{})},e}(),m=r.createContext(null);function x(){return new f}function _(){return r.useContext(m)}m.displayName="StyleSheetContext";var b=n.default.useInsertionEffect||n.default.useLayoutEffect,g="u">typeof window?x():void 0;function y(e){var t=g||_();return t&&("u"<typeof window?t.add(e):b(function(){return t.add(e),function(){t.remove(e)}},[e.id,String(e.dynamic)])),null}y.dynamic=function(e){return e.map(function(e){return h(e[0],e[1])}).join(" ")},s.StyleRegistry=function(e){var t=e.registry,s=e.children,i=r.useContext(m),o=r.useState(function(){return i||t||x()})[0];return n.default.createElement(m.Provider,{value:o},s)},s.createStyleRegistry=x,s.style=y,s.useStyleRegistry=_},37902,(e,t,s)=>{t.exports=e.r(98547).style}]);