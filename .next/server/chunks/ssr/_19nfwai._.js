module.exports=[22279,a=>{"use strict";var b=a.i(87924),c=a.i(31626),d=a.i(72131),e=a.i(50944),f=a.i(39866);function g({question:a,onAnswer:d,disabled:e}){return Array.isArray(a.options)&&a.options.length>0?(0,b.jsxs)("div",{className:"jsx-f60ff496bbb0ccbb answers",children:[a.options.map((c,f)=>{let g="string"==typeof c?c:c.label??String(c.value??""),h="string"==typeof c?c:c.value??c.label??f;return(0,b.jsx)("button",{type:"button",disabled:e,onClick:()=>d(h),className:"jsx-f60ff496bbb0ccbb answer-button",children:g},`${a.id}-${f}`)}),(0,b.jsx)(c.default,{id:"f60ff496bbb0ccbb",children:".answers.jsx-f60ff496bbb0ccbb{flex-direction:column;gap:12px;width:100%;margin-top:34px;display:flex}.answer-button.jsx-f60ff496bbb0ccbb{color:#171515;text-align:left;cursor:pointer;background:#fff;border:1px solid #e4d9d7;border-radius:18px;width:100%;padding:19px 22px;font-size:17px;line-height:1.35;transition:border-color .15s,background .15s,transform .15s}.answer-button.jsx-f60ff496bbb0ccbb:hover{background:#fcf7f8;border-color:#b65c7c}.answer-button.jsx-f60ff496bbb0ccbb:active{transform:scale(.99)}.answer-button.jsx-f60ff496bbb0ccbb:disabled{opacity:.5;cursor:default}"})]}):(0,b.jsx)(h,{disabled:e,onAnswer:d})}function h({onAnswer:a,disabled:e}){let[f,g]=(0,d.useState)("");return(0,b.jsxs)("div",{className:"jsx-95eb2e9bc30e6547 text-answer",children:[(0,b.jsx)("textarea",{value:f,disabled:e,placeholder:"Напиши свой ответ...",onChange:a=>{g(a.target.value)},className:"jsx-95eb2e9bc30e6547 textarea"}),(0,b.jsx)("button",{type:"button",disabled:!f.trim()||e,onClick:function(){let b=f.trim();b&&!e&&a(b)},className:"jsx-95eb2e9bc30e6547 continue-button",children:"Продолжить"}),(0,b.jsx)(c.default,{id:"95eb2e9bc30e6547",children:".text-answer.jsx-95eb2e9bc30e6547{flex-direction:column;gap:14px;width:100%;margin-top:34px;display:flex}.textarea.jsx-95eb2e9bc30e6547{box-sizing:border-box;resize:vertical;color:#171515;width:100%;min-height:140px;font:inherit;background:#fff;border:1px solid #e4d9d7;border-radius:18px;outline:none;padding:18px;font-size:17px;line-height:1.5;transition:border-color .15s}.textarea.jsx-95eb2e9bc30e6547:focus{border-color:#b65c7c}.continue-button.jsx-95eb2e9bc30e6547{color:#fff;cursor:pointer;background:#171515;border:0;border-radius:18px;width:100%;padding:19px 22px;font-size:17px;font-weight:650;transition:opacity .15s,transform .15s}.continue-button.jsx-95eb2e9bc30e6547:hover:not(:disabled){opacity:.92}.continue-button.jsx-95eb2e9bc30e6547:active:not(:disabled){transform:scale(.99)}.continue-button.jsx-95eb2e9bc30e6547:disabled{opacity:.35;cursor:default}"})]})}let i=`

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

`;a.s(["default",0,function(){let a=(0,e.useParams)(),h=(0,e.useSearchParams)(),j=(0,e.useRouter)(),k=a.coupleId,l="b"===h.get("role")?"b":"a",[m,n]=(0,d.useState)(0),[o,p]=(0,d.useState)({}),[q,r]=(0,d.useState)(!1),[s,t]=(0,d.useState)(!0),[u,v]=(0,d.useState)(""),w=f.questions[m],x=(0,d.useMemo)(()=>f.questions.length?(m+1)/f.questions.length*100:0,[m]);async function y(a){if(!q){r(!0),v("");try{let b=await fetch("/api/answers",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({coupleId:k,role:l,answers:a})});if(!b.ok){let a=await b.text();throw console.error("Answers API error:",b.status,a),Error("Не удалось сохранить ответы")}if("b"===l)return void j.replace(`/result/${k}`);j.replace(`/waiting/${k}`)}catch(a){console.error(a),v("Не получилось сохранить ответы. Попробуй ещё раз."),r(!1)}}}return(0,d.useEffect)(()=>{!async function(){try{let a=await fetch(`/api/couples?id=${encodeURIComponent(k)}`,{cache:"no-store"});if(!a.ok)throw Error("Не удалось загрузить данные пары");let b=await a.json();if(b.partner_a_completed&&b.partner_b_completed)return void j.replace(`/result/${k}`);if("a"===l&&b.partner_a_completed)return void j.replace(`/waiting/${k}`);if("b"===l&&b.partner_b_completed)return void(b.partner_a_completed?j.replace(`/result/${k}`):j.replace(`/waiting/${k}`))}catch(a){console.error(a)}finally{t(!1)}}()},[k,l,j]),s?(0,b.jsxs)("main",{className:`jsx-${i.__hash} test-page`,children:[(0,b.jsx)("div",{className:`jsx-${i.__hash} test-shell`,children:(0,b.jsx)("div",{className:`jsx-${i.__hash} loading`,children:"Загружаем..."})}),(0,b.jsx)(c.default,{id:i.__hash,children:i})]}):w?(0,b.jsxs)("main",{className:`jsx-${i.__hash} test-page`,children:[(0,b.jsxs)("div",{className:`jsx-${i.__hash} test-shell`,children:[(0,b.jsxs)("div",{className:`jsx-${i.__hash} top`,children:[(0,b.jsxs)("div",{className:`jsx-${i.__hash} question-counter`,children:[m+1," / ",f.questions.length]}),(0,b.jsx)("div",{className:`jsx-${i.__hash} progress-track`,children:(0,b.jsx)("div",{style:{width:`${x}%`},className:`jsx-${i.__hash} progress-value`})})]}),(0,b.jsxs)("div",{className:`jsx-${i.__hash} question-area`,children:[(0,b.jsxs)("div",{className:`jsx-${i.__hash} question-number`,children:["ВОПРОС ",m+1]}),(0,b.jsx)("h1",{className:`jsx-${i.__hash} question-title`,children:w.text}),"subtitle"in w&&w.subtitle&&(0,b.jsx)("p",{className:`jsx-${i.__hash} question-subtitle`,children:w.subtitle}),(0,b.jsx)(g,{question:w,disabled:q,onAnswer:function(a){if(!w)return;let b={...o,[w.id]:a};(p(b),m<f.questions.length-1)?n(a=>a+1):y(b)}}),q&&(0,b.jsx)("div",{className:`jsx-${i.__hash} saving`,children:"Сохраняем ответы..."}),u&&(0,b.jsx)("div",{className:`jsx-${i.__hash} error`,children:u})]})]}),(0,b.jsx)(c.default,{id:i.__hash,children:i})]}):(0,b.jsxs)("main",{className:`jsx-${i.__hash} test-page`,children:[(0,b.jsx)("div",{className:`jsx-${i.__hash} test-shell`,children:(0,b.jsx)("div",{className:`jsx-${i.__hash} loading`,children:"Вопросы не найдены."})}),(0,b.jsx)(c.default,{id:i.__hash,children:i})]})}])},39866,a=>{"use strict";a.s(["questions",0,[{id:"fun",category:"closeness",text:"Как часто вам действительно весело вместе?",type:"scale"},{id:"joy",category:"understanding",text:"Насколько хорошо партнёр знает, что тебя радует?",type:"scale"},{id:"attention",category:"closeness",text:"Хватает ли тебе внимания партнёра?",type:"scale"},{id:"listen",category:"communication",text:"Чувствуешь ли ты, что партнёр действительно слушает тебя в серьёзных разговорах?",type:"scale"},{id:"talk",category:"communication",text:"Насколько легко тебе говорить с партнёром о том, что тебя задевает?",type:"scale"},{id:"repair",category:"conflict",text:"После ссоры насколько быстро между вами снова становится спокойно?",type:"scale"},{id:"first_step",category:"conflict",text:"Кто чаще делает первый шаг к примирению?",type:"choice",options:["Я","Партнёр","Оба примерно одинаково","Зависит от ситуации"]},{id:"money",category:"money",text:"Насколько комфортно тебе обсуждать с партнёром деньги?",type:"scale"},{id:"chores",category:"daily",text:"Насколько справедливо, по твоему ощущению, распределён быт?",type:"scale"},{id:"space",category:"space",text:"Насколько тебе хватает личного пространства в отношениях?",type:"scale"},{id:"support",category:"closeness",text:"Насколько ты чувствуешь поддержку партнёра, когда тебе тяжело?",type:"scale"},{id:"intimacy",category:"intimacy",text:"Насколько тебя устраивает уровень физической и эмоциональной близости?",type:"scale"},{id:"future",category:"future",text:"Насколько ваши представления о совместном будущем совпадают?",type:"scale"},{id:"family",category:"future",text:"Насколько легко вам обсуждать семью, детей и долгосрочные планы?",type:"scale"},{id:"priority_self",category:"understanding",text:"Что для тебя сейчас важнее всего в отношениях?",type:"choice",options:["Поддержка","Совместное время","Интимность","Доверие","Финансовая стабильность","Личное пространство","Общие планы"]},{id:"priority_partner",category:"understanding",text:"А что, как тебе кажется, сейчас важнее всего твоему партнёру?",type:"choice",options:["Поддержка","Совместное время","Интимность","Доверие","Финансовая стабильность","Личное пространство","Общие планы"]},{id:"missing",category:"open",text:"Чего тебе сейчас больше всего не хватает в ваших отношениях?",type:"text"},{id:"gratitude",category:"open",text:"Что партнёр делает такого, за что ты ему особенно благодарен?",type:"text"}]])},46058,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},69789,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={actionAsyncStorage:function(){return f.actionAsyncStorage},workAsyncStorage:function(){return g.workAsyncStorage},workUnitAsyncStorage:function(){return h.workUnitAsyncStorage}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=a.r(20635),g=a.r(56704),h=a.r(32319);("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},54826,(a,b,c)=>{},14827,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={createLinkPrefetchPartialError:function(){return g},createUnrenderedSegmentError:function(){return f}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});function f(a,b){let c=`Route "${a}": Could not validate that a segment in your UI has instant navigation.`;if(b.length>0){let a=1===b.length?"Dropped segment":"Dropped segments";c+=`

This segment was dropped from rendering. Issues that would prevent instant navigation will go undetected.

${a}:
${b.map(a=>`  ${a}`).join("\n")}

Ways to fix this:
  - [render] Render the dropped segment
  - [ignore] Set \`export const instant = false\` to opt the dropped segment out of instant-navigation validation

Learn more: https://nextjs.org/docs/messages/instant-unrendered-segment`}return Object.defineProperty(Error(c),"__NEXT_ERROR_CODE",{value:"E1286",enumerable:!1,configurable:!0})}function g(a){return Object.defineProperty(Error(`Next.js encountered dynamic data during prefetching for "${a}".

This will lead to slower, more expensive prefetches.

Ways to fix this:
  - [upgrade] Opt into Partial Prefetching by exporting \`const prefetch = 'partial'\` from the page or layout, or by setting \`partialPrefetching: true\` in next.config to opt the whole app in
  - [disable] Remove \`prefetch={true}\` from the <Link> to use the default prefetch
  - [ignore] Set \`export const instant = false\` to opt the route out of instant-navigation validation

Learn more: https://nextjs.org/docs/messages/instant-link-prefetch-partial`),"__NEXT_ERROR_CODE",{value:"E1435",enumerable:!1,configurable:!0})}},88644,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"InvariantError",{enumerable:!0,get:function(){return d}});class d extends Error{constructor(a,b){super(`Invariant: ${a.endsWith(".")?a:a+"."} This is a bug in Next.js.`,b),Object.defineProperty(this,"__NEXT_ERROR_CODE",{value:"E1179",enumerable:!1,configurable:!0}),this.name="InvariantError"}}},54427,(a,b,c)=>{"use strict";function d(){let a,b,c=new Promise((c,d)=>{a=c,b=d});return{resolve:a,reject:b,promise:c}}Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"createPromiseWithResolvers",{enumerable:!0,get:function(){return d}})},39118,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={DEFAULT_SEGMENT_KEY:function(){return l},NOT_FOUND_SEGMENT_KEY:function(){return m},PAGE_SEGMENT_KEY:function(){return k},addSearchParamsIfPageSegment:function(){return i},computeSelectedLayoutSegment:function(){return j},getSegmentValue:function(){return f},getSelectedLayoutSegmentPath:function(){return function a(b,c,d=!0,e=[]){let g;if(d)g=b[1][c];else{let a=b[1];g=a.children??Object.values(a)[0]}if(!g)return e;let h=f(g[0]);return!h||h.startsWith(k)?e:(e.push(h),a(g,c,!1,e))}},isGroupSegment:function(){return g},isParallelRouteSegment:function(){return h}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});function f(a){return Array.isArray(a)?a[1]:a}function g(a){return"("===a[0]&&a.endsWith(")")}function h(a){return a.startsWith("@")&&"@children"!==a}function i(a,b){if(a.includes(k)){let a=JSON.stringify(b);return"{}"!==a?k+"?"+a:k}return a}function j(a,b){if(!a||0===a.length)return null;let c="children"===b?a[0]:a[a.length-1];return c===l?null:c}let k="__PAGE__",l="__DEFAULT__",m="/_not-found"},15299,(a,b,c)=>{a.r(54826);var d=a.r(72131),e=d&&"object"==typeof d&&"default"in d?d:{default:d},f="u">typeof process&&process.env&&!0,g=function(a){return"[object String]"===Object.prototype.toString.call(a)},h=function(){function a(a){var b=void 0===a?{}:a,c=b.name,d=void 0===c?"stylesheet":c,e=b.optimizeForSpeed,h=void 0===e?f:e;i(g(d),"`name` must be a string"),this._name=d,this._deletedRulePlaceholder="#"+d+"-deleted-rule____{}",i("boolean"==typeof h,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=h,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0,this._nonce=null}var b,c=a.prototype;return c.setOptimizeForSpeed=function(a){i("boolean"==typeof a,"`setOptimizeForSpeed` accepts a boolean"),i(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=a,this.inject()},c.isOptimizeForSpeed=function(){return this._optimizeForSpeed},c.inject=function(){var a=this;i(!this._injected,"sheet already injected"),this._injected=!0,this._serverSheet={cssRules:[],insertRule:function(b,c){return"number"==typeof c?a._serverSheet.cssRules[c]={cssText:b}:a._serverSheet.cssRules.push({cssText:b}),c},deleteRule:function(b){a._serverSheet.cssRules[b]=null}}},c.getSheetForTag=function(a){if(a.sheet)return a.sheet;for(var b=0;b<document.styleSheets.length;b++)if(document.styleSheets[b].ownerNode===a)return document.styleSheets[b]},c.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},c.insertRule=function(a,b){return i(g(a),"`insertRule` accepts only strings"),"number"!=typeof b&&(b=this._serverSheet.cssRules.length),this._serverSheet.insertRule(a,b),this._rulesCount++},c.replaceRule=function(a,b){this._optimizeForSpeed;var c=this._serverSheet;if(b.trim()||(b=this._deletedRulePlaceholder),!c.cssRules[a])return a;c.deleteRule(a);try{c.insertRule(b,a)}catch(d){f||console.warn("StyleSheet: illegal rule: \n\n"+b+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),c.insertRule(this._deletedRulePlaceholder,a)}return a},c.deleteRule=function(a){this._serverSheet.deleteRule(a)},c.flush=function(){this._injected=!1,this._rulesCount=0,this._serverSheet.cssRules=[]},c.cssRules=function(){return this._serverSheet.cssRules},c.makeStyleTag=function(a,b,c){b&&i(g(b),"makeStyleTag accepts only strings as second parameter");var d=document.createElement("style");this._nonce&&d.setAttribute("nonce",this._nonce),d.type="text/css",d.setAttribute("data-"+a,""),b&&d.appendChild(document.createTextNode(b));var e=document.head||document.getElementsByTagName("head")[0];return c?e.insertBefore(d,c):e.appendChild(d),d},b=[{key:"length",get:function(){return this._rulesCount}}],function(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}(a.prototype,b),a}();function i(a,b){if(!a)throw Error("StyleSheet: "+b+".")}var j=function(a){for(var b=5381,c=a.length;c;)b=33*b^a.charCodeAt(--c);return b>>>0},k={};function l(a,b){if(!b)return"jsx-"+a;var c=String(b),d=a+c;return k[d]||(k[d]="jsx-"+j(a+"-"+c)),k[d]}function m(a,b){var c=a+(b=b.replace(/\/style/gi,"\\/style"));return k[c]||(k[c]=b.replace(/__jsx-style-dynamic-selector/g,a)),k[c]}var n=function(){function a(a){var b=void 0===a?{}:a,c=b.styleSheet,d=void 0===c?null:c,e=b.optimizeForSpeed,f=void 0!==e&&e;this._sheet=d||new h({name:"styled-jsx",optimizeForSpeed:f}),this._sheet.inject(),d&&"boolean"==typeof f&&(this._sheet.setOptimizeForSpeed(f),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var b=a.prototype;return b.add=function(a){var b=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(a.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed());var c=this.getIdAndRules(a),d=c.styleId,e=c.rules;if(d in this._instancesCounts){this._instancesCounts[d]+=1;return}var f=e.map(function(a){return b._sheet.insertRule(a)}).filter(function(a){return -1!==a});this._indices[d]=f,this._instancesCounts[d]=1},b.remove=function(a){var b=this,c=this.getIdAndRules(a).styleId;if(function(a,b){if(!a)throw Error("StyleSheetRegistry: "+b+".")}(c in this._instancesCounts,"styleId: `"+c+"` not found"),this._instancesCounts[c]-=1,this._instancesCounts[c]<1){var d=this._fromServer&&this._fromServer[c];d?(d.parentNode.removeChild(d),delete this._fromServer[c]):(this._indices[c].forEach(function(a){return b._sheet.deleteRule(a)}),delete this._indices[c]),delete this._instancesCounts[c]}},b.update=function(a,b){this.add(b),this.remove(a)},b.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},b.cssRules=function(){var a=this,b=this._fromServer?Object.keys(this._fromServer).map(function(b){return[b,a._fromServer[b]]}):[],c=this._sheet.cssRules();return b.concat(Object.keys(this._indices).map(function(b){return[b,a._indices[b].map(function(a){return c[a].cssText}).join(a._optimizeForSpeed?"":"\n")]}).filter(function(a){return!!a[1]}))},b.styles=function(a){var b,c;return b=this.cssRules(),void 0===(c=a)&&(c={}),b.map(function(a){var b=a[0],d=a[1];return e.default.createElement("style",{id:"__"+b,key:"__"+b,nonce:c.nonce?c.nonce:void 0,dangerouslySetInnerHTML:{__html:d}})})},b.getIdAndRules=function(a){var b=a.children,c=a.dynamic,d=a.id;if(c){var e=l(d,c);return{styleId:e,rules:Array.isArray(b)?b.map(function(a){return m(e,a)}):[m(e,b)]}}return{styleId:l(d),rules:Array.isArray(b)?b:[b]}},b.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(a,b){return a[b.id.slice(2)]=b,a},{})},a}(),o=d.createContext(null);function p(){return new n}function q(){return d.useContext(o)}function r(a){var b=q();return b&&b.add(a),null}o.displayName="StyleSheetContext",e.default.useInsertionEffect||e.default.useLayoutEffect,r.dynamic=function(a){return a.map(function(a){return l(a[0],a[1])}).join(" ")},c.StyleRegistry=function(a){var b=a.registry,c=a.children,f=d.useContext(o),g=d.useState(function(){return f||b||p()})[0];return e.default.createElement(o.Provider,{value:g},c)},c.createStyleRegistry=p,c.style=r,c.useStyleRegistry=q},31626,(a,b,c)=>{b.exports=a.r(15299).style}];

//# sourceMappingURL=_19nfwai._.js.map