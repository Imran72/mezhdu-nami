(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,92935,e=>{"use strict";var t=e.i(43476),s=e.i(37902),r=e.i(71645),i=e.i(18566);let n=[{id:"fun",category:"closeness",text:"Как часто вам действительно весело вместе?",type:"scale"},{id:"joy",category:"understanding",text:"Насколько хорошо партнёр знает, что тебя радует?",type:"scale"},{id:"attention",category:"closeness",text:"Хватает ли тебе внимания партнёра?",type:"scale"},{id:"listen",category:"communication",text:"Чувствуешь ли ты, что партнёр действительно слушает тебя в серьёзных разговорах?",type:"scale"},{id:"talk",category:"communication",text:"Насколько легко тебе говорить с партнёром о том, что тебя задевает?",type:"scale"},{id:"repair",category:"conflict",text:"После ссоры насколько быстро между вами снова становится спокойно?",type:"scale"},{id:"first_step",category:"conflict",text:"Кто чаще делает первый шаг к примирению?",type:"choice",options:["Я","Партнёр","Оба примерно одинаково","Зависит от ситуации"]},{id:"money",category:"money",text:"Насколько комфортно тебе обсуждать с партнёром деньги?",type:"scale"},{id:"chores",category:"daily",text:"Насколько справедливо, по твоему ощущению, распределён быт?",type:"scale"},{id:"space",category:"space",text:"Насколько тебе хватает личного пространства в отношениях?",type:"scale"},{id:"support",category:"closeness",text:"Насколько ты чувствуешь поддержку партнёра, когда тебе тяжело?",type:"scale"},{id:"intimacy",category:"intimacy",text:"Насколько тебя устраивает уровень физической и эмоциональной близости?",type:"scale"},{id:"future",category:"future",text:"Насколько ваши представления о совместном будущем совпадают?",type:"scale"},{id:"family",category:"future",text:"Насколько легко вам обсуждать семью, детей и долгосрочные планы?",type:"scale"},{id:"priority_self",category:"understanding",text:"Что для тебя сейчас важнее всего в отношениях?",type:"choice",options:["Поддержка","Совместное время","Интимность","Доверие","Финансовая стабильность","Личное пространство","Общие планы"]},{id:"priority_partner",category:"understanding",text:"А что, как тебе кажется, сейчас важнее всего твоему партнёру?",type:"choice",options:["Поддержка","Совместное время","Интимность","Доверие","Финансовая стабильность","Личное пространство","Общие планы"]},{id:"missing",category:"open",text:"Чего тебе сейчас больше всего не хватает в ваших отношениях?",type:"text"},{id:"gratitude",category:"open",text:"Что партнёр делает такого, за что ты ему особенно благодарен?",type:"text"}];function o({question:e,onAnswer:r,disabled:i}){return Array.isArray(e.options)&&e.options.length>0?(0,t.jsxs)("div",{className:"jsx-e86b8c3eb99d7d5e answers",children:[e.options.map((s,n)=>{let o="string"==typeof s?s:s.label??String(s.value??""),a="string"==typeof s?s:s.value??s.label??n;return(0,t.jsx)("button",{type:"button",disabled:i,onClick:()=>r(a),className:"jsx-e86b8c3eb99d7d5e answer-button",children:o},`${e.id}-${n}`)}),(0,t.jsx)(s.default,{id:"e86b8c3eb99d7d5e",children:".answers.jsx-e86b8c3eb99d7d5e{flex-direction:column;gap:12px;width:100%;margin-top:34px;display:flex}.answer-button.jsx-e86b8c3eb99d7d5e{color:#171515;text-align:left;cursor:pointer;background:#fff;border:1px solid #e4d9d7;border-radius:18px;width:100%;padding:19px 22px;font-size:17px;line-height:1.35;transition:border-color .15s,background .15s,transform .15s}.answer-button.jsx-e86b8c3eb99d7d5e:hover{background:#fcf7f8;border-color:#b65c7c}.answer-button.jsx-e86b8c3eb99d7d5e:active{transform:scale(.99)}.answer-button.jsx-e86b8c3eb99d7d5e:disabled{opacity:.5;cursor:default}"})]}):(0,t.jsx)(a,{disabled:i,onAnswer:r})}function a({onAnswer:e,disabled:i}){let[n,o]=(0,r.useState)("");return(0,t.jsxs)("div",{className:"jsx-f5054044c6348c7b text-answer",children:[(0,t.jsx)("textarea",{value:n,disabled:i,placeholder:"Напиши свой ответ...",onChange:e=>{o(e.target.value)},className:"jsx-f5054044c6348c7b textarea"}),(0,t.jsx)("button",{type:"button",disabled:!n.trim()||i,onClick:function(){let t=n.trim();t&&!i&&e(t)},className:"jsx-f5054044c6348c7b continue-button",children:"Продолжить"}),(0,t.jsx)(s.default,{id:"f5054044c6348c7b",children:".text-answer.jsx-f5054044c6348c7b{flex-direction:column;gap:14px;width:100%;margin-top:34px;display:flex}.textarea.jsx-f5054044c6348c7b{box-sizing:border-box;resize:vertical;color:#171515;width:100%;min-height:140px;font:inherit;background:#fff;border:1px solid #e4d9d7;border-radius:18px;outline:none;padding:18px;font-size:17px;line-height:1.5}.textarea.jsx-f5054044c6348c7b:focus{border-color:#b65c7c}.continue-button.jsx-f5054044c6348c7b{color:#fff;cursor:pointer;background:#171515;border:0;border-radius:18px;width:100%;padding:19px 22px;font-size:17px;font-weight:650}.continue-button.jsx-f5054044c6348c7b:disabled{opacity:.35;cursor:default}"})]})}let c=`

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

`;e.s(["default",0,function(){let e=(0,i.useParams)(),a=(0,i.useSearchParams)(),l=(0,i.useRouter)(),d=e.coupleId,u="b"===a.get("role")?"b":"a",[h,p]=(0,r.useState)(0),[f,m]=(0,r.useState)({}),[x,g]=(0,r.useState)(!1),[_,y]=(0,r.useState)(!0),[v,b]=(0,r.useState)(""),S=n[h],j=(0,r.useMemo)(()=>n.length?(h+1)/n.length*100:0,[h]);async function w(e){if(!x){g(!0),b("");try{let t=await fetch("/api/answers",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({coupleId:d,role:u,answers:e})});if(!t.ok){let e=await t.text();throw console.error("Answers API:",t.status,e),Error("Не удалось сохранить ответы")}if("b"===u)return void l.replace(`/result/${d}`);l.replace(`/waiting/${d}`)}catch(e){console.error(e),b("Не получилось сохранить ответы. Попробуй ещё раз."),g(!1)}}}return(0,r.useEffect)(()=>{!async function(){try{let e=await fetch(`/api/couples?id=${encodeURIComponent(d)}`,{cache:"no-store"});if(!e.ok)throw Error("Не удалось загрузить пару");let t=await e.json();if(t.partner_a_completed&&t.partner_b_completed)return void l.replace(`/result/${d}`);if("a"===u&&t.partner_a_completed)return void l.replace(`/waiting/${d}`);if("b"===u&&t.partner_b_completed)return void(t.partner_a_completed?l.replace(`/result/${d}`):l.replace(`/waiting/${d}`))}catch(e){console.error(e)}finally{y(!1)}}()},[d,u,l]),_?(0,t.jsxs)("main",{className:`jsx-${c.__hash} test-page`,children:[(0,t.jsx)("div",{className:`jsx-${c.__hash} test-shell`,children:(0,t.jsx)("div",{className:`jsx-${c.__hash} loading`,children:"Загружаем..."})}),(0,t.jsx)(s.default,{id:c.__hash,children:c})]}):S?(0,t.jsxs)("main",{className:`jsx-${c.__hash} test-page`,children:[(0,t.jsxs)("div",{className:`jsx-${c.__hash} test-shell`,children:[(0,t.jsxs)("div",{className:`jsx-${c.__hash} top`,children:[(0,t.jsxs)("div",{className:`jsx-${c.__hash} question-counter`,children:[h+1," / ",n.length]}),(0,t.jsx)("div",{className:`jsx-${c.__hash} progress-track`,children:(0,t.jsx)("div",{style:{width:`${j}%`},className:`jsx-${c.__hash} progress-value`})})]}),(0,t.jsxs)("div",{className:`jsx-${c.__hash} question-area`,children:[(0,t.jsxs)("div",{className:`jsx-${c.__hash} question-number`,children:["ВОПРОС ",h+1]}),(0,t.jsx)("h1",{className:`jsx-${c.__hash} question-title`,children:String(S.text)}),(0,t.jsx)(o,{question:S,disabled:x,onAnswer:function(e){if(!S)return;let t={...f,[S.id]:e};(m(t),h<n.length-1)?p(e=>e+1):w(t)}}),x&&(0,t.jsx)("div",{className:`jsx-${c.__hash} saving`,children:"Сохраняем ответы..."}),v&&(0,t.jsx)("div",{className:`jsx-${c.__hash} error`,children:v})]})]}),(0,t.jsx)(s.default,{id:c.__hash,children:c})]}):(0,t.jsxs)("main",{className:`jsx-${c.__hash} test-page`,children:[(0,t.jsx)("div",{className:`jsx-${c.__hash} test-shell`,children:(0,t.jsx)("div",{className:`jsx-${c.__hash} loading`,children:"Вопросы не найдены."})}),(0,t.jsx)(s.default,{id:c.__hash,children:c})]})}],92935)},16015,(e,t,s)=>{},18566,(e,t,s)=>{t.exports=e.r(76562)},98547,(e,t,s)=>{var r=e.i(47167);e.r(16015);var i=e.r(71645),n=i&&"object"==typeof i&&"default"in i?i:{default:i},o=void 0!==r.default&&r.default.env&&!0,a=function(e){return"[object String]"===Object.prototype.toString.call(e)},c=function(){function e(e){var t=void 0===e?{}:e,s=t.name,r=void 0===s?"stylesheet":s,i=t.optimizeForSpeed,n=void 0===i?o:i;l(a(r),"`name` must be a string"),this._name=r,this._deletedRulePlaceholder="#"+r+"-deleted-rule____{}",l("boolean"==typeof n,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=n,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0;var c="u">typeof window&&document.querySelector('meta[property="csp-nonce"]');this._nonce=c?c.getAttribute("content"):null}var t,s=e.prototype;return s.setOptimizeForSpeed=function(e){l("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),l(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},s.isOptimizeForSpeed=function(){return this._optimizeForSpeed},s.inject=function(){var e=this;if(l(!this._injected,"sheet already injected"),this._injected=!0,"u">typeof window&&this._optimizeForSpeed){this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),this._optimizeForSpeed||(o||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0);return}this._serverSheet={cssRules:[],insertRule:function(t,s){return"number"==typeof s?e._serverSheet.cssRules[s]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),s},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},s.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},s.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},s.insertRule=function(e,t){if(l(a(e),"`insertRule` accepts only strings"),"u"<typeof window)return"number"!=typeof t&&(t=this._serverSheet.cssRules.length),this._serverSheet.insertRule(e,t),this._rulesCount++;if(this._optimizeForSpeed){var s=this.getSheet();"number"!=typeof t&&(t=s.cssRules.length);try{s.insertRule(e,t)}catch(t){return o||console.warn("StyleSheet: illegal rule: \n\n"+e+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var r=this._tags[t];this._tags.push(this.makeStyleTag(this._name,e,r))}return this._rulesCount++},s.replaceRule=function(e,t){if(this._optimizeForSpeed||"u"<typeof window){var s="u">typeof window?this.getSheet():this._serverSheet;if(t.trim()||(t=this._deletedRulePlaceholder),!s.cssRules[e])return e;s.deleteRule(e);try{s.insertRule(t,e)}catch(r){o||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),s.insertRule(this._deletedRulePlaceholder,e)}}else{var r=this._tags[e];l(r,"old rule at index `"+e+"` not found"),r.textContent=t}return e},s.deleteRule=function(e){if("u"<typeof window)return void this._serverSheet.deleteRule(e);if(this._optimizeForSpeed)this.replaceRule(e,"");else{var t=this._tags[e];l(t,"rule at index `"+e+"` not found"),t.parentNode.removeChild(t),this._tags[e]=null}},s.flush=function(){this._injected=!1,this._rulesCount=0,"u">typeof window?(this._tags.forEach(function(e){return e&&e.parentNode.removeChild(e)}),this._tags=[]):this._serverSheet.cssRules=[]},s.cssRules=function(){var e=this;return"u"<typeof window?this._serverSheet.cssRules:this._tags.reduce(function(t,s){return s?t=t.concat(Array.prototype.map.call(e.getSheetForTag(s).cssRules,function(t){return t.cssText===e._deletedRulePlaceholder?null:t})):t.push(null),t},[])},s.makeStyleTag=function(e,t,s){t&&l(a(t),"makeStyleTag accepts only strings as second parameter");var r=document.createElement("style");this._nonce&&r.setAttribute("nonce",this._nonce),r.type="text/css",r.setAttribute("data-"+e,""),t&&r.appendChild(document.createTextNode(t));var i=document.head||document.getElementsByTagName("head")[0];return s?i.insertBefore(r,s):i.appendChild(r),r},t=[{key:"length",get:function(){return this._rulesCount}}],function(e,t){for(var s=0;s<t.length;s++){var r=t[s];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(e.prototype,t),e}();function l(e,t){if(!e)throw Error("StyleSheet: "+t+".")}var d=function(e){for(var t=5381,s=e.length;s;)t=33*t^e.charCodeAt(--s);return t>>>0},u={};function h(e,t){if(!t)return"jsx-"+e;var s=String(t),r=e+s;return u[r]||(u[r]="jsx-"+d(e+"-"+s)),u[r]}function p(e,t){"u"<typeof window&&(t=t.replace(/\/style/gi,"\\/style"));var s=e+t;return u[s]||(u[s]=t.replace(/__jsx-style-dynamic-selector/g,e)),u[s]}var f=function(){function e(e){var t=void 0===e?{}:e,s=t.styleSheet,r=void 0===s?null:s,i=t.optimizeForSpeed,n=void 0!==i&&i;this._sheet=r||new c({name:"styled-jsx",optimizeForSpeed:n}),this._sheet.inject(),r&&"boolean"==typeof n&&(this._sheet.setOptimizeForSpeed(n),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var t=e.prototype;return t.add=function(e){var t=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(e.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),"u">typeof window&&!this._fromServer&&(this._fromServer=this.selectFromServer(),this._instancesCounts=Object.keys(this._fromServer).reduce(function(e,t){return e[t]=0,e},{}));var s=this.getIdAndRules(e),r=s.styleId,i=s.rules;if(r in this._instancesCounts){this._instancesCounts[r]+=1;return}var n=i.map(function(e){return t._sheet.insertRule(e)}).filter(function(e){return -1!==e});this._indices[r]=n,this._instancesCounts[r]=1},t.remove=function(e){var t=this,s=this.getIdAndRules(e).styleId;if(function(e,t){if(!e)throw Error("StyleSheetRegistry: "+t+".")}(s in this._instancesCounts,"styleId: `"+s+"` not found"),this._instancesCounts[s]-=1,this._instancesCounts[s]<1){var r=this._fromServer&&this._fromServer[s];r?(r.parentNode.removeChild(r),delete this._fromServer[s]):(this._indices[s].forEach(function(e){return t._sheet.deleteRule(e)}),delete this._indices[s]),delete this._instancesCounts[s]}},t.update=function(e,t){this.add(t),this.remove(e)},t.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},t.cssRules=function(){var e=this,t=this._fromServer?Object.keys(this._fromServer).map(function(t){return[t,e._fromServer[t]]}):[],s=this._sheet.cssRules();return t.concat(Object.keys(this._indices).map(function(t){return[t,e._indices[t].map(function(e){return s[e].cssText}).join(e._optimizeForSpeed?"":"\n")]}).filter(function(e){return!!e[1]}))},t.styles=function(e){var t,s;return t=this.cssRules(),void 0===(s=e)&&(s={}),t.map(function(e){var t=e[0],r=e[1];return n.default.createElement("style",{id:"__"+t,key:"__"+t,nonce:s.nonce?s.nonce:void 0,dangerouslySetInnerHTML:{__html:r}})})},t.getIdAndRules=function(e){var t=e.children,s=e.dynamic,r=e.id;if(s){var i=h(r,s);return{styleId:i,rules:Array.isArray(t)?t.map(function(e){return p(i,e)}):[p(i,t)]}}return{styleId:h(r),rules:Array.isArray(t)?t:[t]}},t.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e,t){return e[t.id.slice(2)]=t,e},{})},e}(),m=i.createContext(null);function x(){return new f}function g(){return i.useContext(m)}m.displayName="StyleSheetContext";var _=n.default.useInsertionEffect||n.default.useLayoutEffect,y="u">typeof window?x():void 0;function v(e){var t=y||g();return t&&("u"<typeof window?t.add(e):_(function(){return t.add(e),function(){t.remove(e)}},[e.id,String(e.dynamic)])),null}v.dynamic=function(e){return e.map(function(e){return h(e[0],e[1])}).join(" ")},s.StyleRegistry=function(e){var t=e.registry,s=e.children,r=i.useContext(m),o=i.useState(function(){return r||t||x()})[0];return n.default.createElement(m.Provider,{value:o},s)},s.createStyleRegistry=x,s.style=v,s.useStyleRegistry=g},37902,(e,t,s)=>{t.exports=e.r(98547).style}]);