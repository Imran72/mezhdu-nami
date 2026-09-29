(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,47988,e=>{"use strict";var t=e.i(47167),i=e.i(43476),n=e.i(37902),s=e.i(71645),r=e.i(18566);let o=`

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

`;e.s(["default",0,function(){let e=(0,r.useParams)(),a=(0,r.useRouter)(),l=e.coupleId,[c,u]=(0,s.useState)(null),[h,d]=(0,s.useState)(!0),[p,f]=(0,s.useState)(!1),[m,_]=(0,s.useState)("");async function x(){try{let e=await fetch(`/api/couples?id=${encodeURIComponent(l)}`,{cache:"no-store"});if(!e.ok)throw Error("Не удалось загрузить пару");let t=await e.json();u(t),t.partner_a_completed&&t.partner_b_completed&&a.replace(`/result/${l}`)}catch(e){console.error(e),_("Не удалось загрузить данные пары.")}finally{d(!1)}}if((0,s.useEffect)(()=>{x();let e=window.setInterval(()=>{x()},5e3);return()=>{window.clearInterval(e)}},[l]),h)return(0,i.jsxs)("main",{className:`jsx-${o.__hash} waiting-page`,children:[(0,i.jsx)("div",{className:`jsx-${o.__hash} waiting-container`,children:(0,i.jsx)("div",{className:`jsx-${o.__hash} loading-text`,children:"Загружаем..."})}),(0,i.jsx)(n.default,{id:o.__hash,children:o})]});if(m||!c)return(0,i.jsxs)("main",{className:`jsx-${o.__hash} waiting-page`,children:[(0,i.jsxs)("div",{className:`jsx-${o.__hash} waiting-container`,children:[(0,i.jsx)("h1",{className:`jsx-${o.__hash} waiting-title`,children:"Не удалось найти пару"}),(0,i.jsx)("p",{className:`jsx-${o.__hash} waiting-description`,children:m||"Возможно, ссылка устарела или была открыта неправильно."})]}),(0,i.jsx)(n.default,{id:o.__hash,children:o})]});let g=t.default.env.NEXT_PUBLIC_SITE_URL||window.location.origin,v=`${g}/invite/${c.invite_token}`;async function y(){try{await navigator.clipboard.writeText(v),f(!0),window.setTimeout(()=>{f(!1)},2e3)}catch(t){console.error(t);let e=document.createElement("textarea");e.value=v,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.focus(),e.select(),document.execCommand("copy"),document.body.removeChild(e),f(!0),window.setTimeout(()=>{f(!1)},2e3)}}async function w(){try{if(navigator.share)return void await navigator.share({title:"между нами",text:"Я прошёл небольшой тест про наши отношения 👀\n\nТеперь твоя очередь. Ответь отдельно от меня — потом посмотрим, насколько одинаково мы воспринимаем наши отношения.",url:v});await y()}catch(e){if(e instanceof DOMException&&"AbortError"===e.name)return;console.error(e),await y()}}return(0,i.jsxs)("main",{className:`jsx-${o.__hash} waiting-page`,children:[(0,i.jsxs)("div",{className:`jsx-${o.__hash} waiting-container`,children:[(0,i.jsxs)("div",{className:`jsx-${o.__hash} couple-visual`,children:[(0,i.jsx)("div",{className:`jsx-${o.__hash} couple-circle couple-circle-left`}),(0,i.jsx)("div",{className:`jsx-${o.__hash} couple-circle couple-circle-right`})]}),(0,i.jsx)("div",{className:`jsx-${o.__hash} waiting-status`,children:"1 ИЗ 2 ГОТОВ"}),(0,i.jsx)("h1",{className:`jsx-${o.__hash} waiting-title`,children:"Твоя часть готова."}),(0,i.jsxs)("p",{className:`jsx-${o.__hash} waiting-description`,children:["Теперь очередь:"," ",(0,i.jsx)("strong",{className:`jsx-${o.__hash}`,children:c.partner_b_name}),".",(0,i.jsx)("br",{className:`jsx-${o.__hash}`}),"После второго ответа вы увидите картину целиком."]}),(0,i.jsx)("button",{type:"button",onClick:w,className:`jsx-${o.__hash} waiting-share-button`,children:"Отправить приглашение"}),(0,i.jsxs)("div",{className:`jsx-${o.__hash} invite-link-section`,children:[(0,i.jsx)("div",{className:`jsx-${o.__hash} invite-link-label`,children:"ССЫЛКА ДЛЯ ПАРТНЁРА"}),(0,i.jsxs)("div",{className:`jsx-${o.__hash} invite-link-box`,children:[(0,i.jsx)("div",{className:`jsx-${o.__hash} invite-link-value`,children:v}),(0,i.jsx)("button",{type:"button",onClick:y,className:`jsx-${o.__hash} `+((p?"invite-copy-button copied":"invite-copy-button")||""),children:p?"Скопировано ✓":"Копировать"})]})]}),(0,i.jsx)("p",{className:`jsx-${o.__hash} waiting-note`,children:"Результат откроется автоматически, когда вы оба закончите."})]}),(0,i.jsx)(n.default,{id:o.__hash,children:o})]})}])},16015,(e,t,i)=>{},18566,(e,t,i)=>{t.exports=e.r(76562)},98547,(e,t,i)=>{var n=e.i(47167);e.r(16015);var s=e.r(71645),r=s&&"object"==typeof s&&"default"in s?s:{default:s},o=void 0!==n.default&&n.default.env&&!0,a=function(e){return"[object String]"===Object.prototype.toString.call(e)},l=function(){function e(e){var t=void 0===e?{}:e,i=t.name,n=void 0===i?"stylesheet":i,s=t.optimizeForSpeed,r=void 0===s?o:s;c(a(n),"`name` must be a string"),this._name=n,this._deletedRulePlaceholder="#"+n+"-deleted-rule____{}",c("boolean"==typeof r,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=r,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0;var l="u">typeof window&&document.querySelector('meta[property="csp-nonce"]');this._nonce=l?l.getAttribute("content"):null}var t,i=e.prototype;return i.setOptimizeForSpeed=function(e){c("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),c(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},i.isOptimizeForSpeed=function(){return this._optimizeForSpeed},i.inject=function(){var e=this;if(c(!this._injected,"sheet already injected"),this._injected=!0,"u">typeof window&&this._optimizeForSpeed){this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),this._optimizeForSpeed||(o||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0);return}this._serverSheet={cssRules:[],insertRule:function(t,i){return"number"==typeof i?e._serverSheet.cssRules[i]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),i},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},i.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},i.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},i.insertRule=function(e,t){if(c(a(e),"`insertRule` accepts only strings"),"u"<typeof window)return"number"!=typeof t&&(t=this._serverSheet.cssRules.length),this._serverSheet.insertRule(e,t),this._rulesCount++;if(this._optimizeForSpeed){var i=this.getSheet();"number"!=typeof t&&(t=i.cssRules.length);try{i.insertRule(e,t)}catch(t){return o||console.warn("StyleSheet: illegal rule: \n\n"+e+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var n=this._tags[t];this._tags.push(this.makeStyleTag(this._name,e,n))}return this._rulesCount++},i.replaceRule=function(e,t){if(this._optimizeForSpeed||"u"<typeof window){var i="u">typeof window?this.getSheet():this._serverSheet;if(t.trim()||(t=this._deletedRulePlaceholder),!i.cssRules[e])return e;i.deleteRule(e);try{i.insertRule(t,e)}catch(n){o||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),i.insertRule(this._deletedRulePlaceholder,e)}}else{var n=this._tags[e];c(n,"old rule at index `"+e+"` not found"),n.textContent=t}return e},i.deleteRule=function(e){if("u"<typeof window)return void this._serverSheet.deleteRule(e);if(this._optimizeForSpeed)this.replaceRule(e,"");else{var t=this._tags[e];c(t,"rule at index `"+e+"` not found"),t.parentNode.removeChild(t),this._tags[e]=null}},i.flush=function(){this._injected=!1,this._rulesCount=0,"u">typeof window?(this._tags.forEach(function(e){return e&&e.parentNode.removeChild(e)}),this._tags=[]):this._serverSheet.cssRules=[]},i.cssRules=function(){var e=this;return"u"<typeof window?this._serverSheet.cssRules:this._tags.reduce(function(t,i){return i?t=t.concat(Array.prototype.map.call(e.getSheetForTag(i).cssRules,function(t){return t.cssText===e._deletedRulePlaceholder?null:t})):t.push(null),t},[])},i.makeStyleTag=function(e,t,i){t&&c(a(t),"makeStyleTag accepts only strings as second parameter");var n=document.createElement("style");this._nonce&&n.setAttribute("nonce",this._nonce),n.type="text/css",n.setAttribute("data-"+e,""),t&&n.appendChild(document.createTextNode(t));var s=document.head||document.getElementsByTagName("head")[0];return i?s.insertBefore(n,i):s.appendChild(n),n},t=[{key:"length",get:function(){return this._rulesCount}}],function(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}(e.prototype,t),e}();function c(e,t){if(!e)throw Error("StyleSheet: "+t+".")}var u=function(e){for(var t=5381,i=e.length;i;)t=33*t^e.charCodeAt(--i);return t>>>0},h={};function d(e,t){if(!t)return"jsx-"+e;var i=String(t),n=e+i;return h[n]||(h[n]="jsx-"+u(e+"-"+i)),h[n]}function p(e,t){"u"<typeof window&&(t=t.replace(/\/style/gi,"\\/style"));var i=e+t;return h[i]||(h[i]=t.replace(/__jsx-style-dynamic-selector/g,e)),h[i]}var f=function(){function e(e){var t=void 0===e?{}:e,i=t.styleSheet,n=void 0===i?null:i,s=t.optimizeForSpeed,r=void 0!==s&&s;this._sheet=n||new l({name:"styled-jsx",optimizeForSpeed:r}),this._sheet.inject(),n&&"boolean"==typeof r&&(this._sheet.setOptimizeForSpeed(r),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var t=e.prototype;return t.add=function(e){var t=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(e.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),"u">typeof window&&!this._fromServer&&(this._fromServer=this.selectFromServer(),this._instancesCounts=Object.keys(this._fromServer).reduce(function(e,t){return e[t]=0,e},{}));var i=this.getIdAndRules(e),n=i.styleId,s=i.rules;if(n in this._instancesCounts){this._instancesCounts[n]+=1;return}var r=s.map(function(e){return t._sheet.insertRule(e)}).filter(function(e){return -1!==e});this._indices[n]=r,this._instancesCounts[n]=1},t.remove=function(e){var t=this,i=this.getIdAndRules(e).styleId;if(function(e,t){if(!e)throw Error("StyleSheetRegistry: "+t+".")}(i in this._instancesCounts,"styleId: `"+i+"` not found"),this._instancesCounts[i]-=1,this._instancesCounts[i]<1){var n=this._fromServer&&this._fromServer[i];n?(n.parentNode.removeChild(n),delete this._fromServer[i]):(this._indices[i].forEach(function(e){return t._sheet.deleteRule(e)}),delete this._indices[i]),delete this._instancesCounts[i]}},t.update=function(e,t){this.add(t),this.remove(e)},t.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},t.cssRules=function(){var e=this,t=this._fromServer?Object.keys(this._fromServer).map(function(t){return[t,e._fromServer[t]]}):[],i=this._sheet.cssRules();return t.concat(Object.keys(this._indices).map(function(t){return[t,e._indices[t].map(function(e){return i[e].cssText}).join(e._optimizeForSpeed?"":"\n")]}).filter(function(e){return!!e[1]}))},t.styles=function(e){var t,i;return t=this.cssRules(),void 0===(i=e)&&(i={}),t.map(function(e){var t=e[0],n=e[1];return r.default.createElement("style",{id:"__"+t,key:"__"+t,nonce:i.nonce?i.nonce:void 0,dangerouslySetInnerHTML:{__html:n}})})},t.getIdAndRules=function(e){var t=e.children,i=e.dynamic,n=e.id;if(i){var s=d(n,i);return{styleId:s,rules:Array.isArray(t)?t.map(function(e){return p(s,e)}):[p(s,t)]}}return{styleId:d(n),rules:Array.isArray(t)?t:[t]}},t.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e,t){return e[t.id.slice(2)]=t,e},{})},e}(),m=s.createContext(null);function _(){return new f}function x(){return s.useContext(m)}m.displayName="StyleSheetContext";var g=r.default.useInsertionEffect||r.default.useLayoutEffect,v="u">typeof window?_():void 0;function y(e){var t=v||x();return t&&("u"<typeof window?t.add(e):g(function(){return t.add(e),function(){t.remove(e)}},[e.id,String(e.dynamic)])),null}y.dynamic=function(e){return e.map(function(e){return d(e[0],e[1])}).join(" ")},i.StyleRegistry=function(e){var t=e.registry,i=e.children,n=s.useContext(m),o=s.useState(function(){return n||t||_()})[0];return r.default.createElement(m.Provider,{value:o},i)},i.createStyleRegistry=_,i.style=y,i.useStyleRegistry=x},37902,(e,t,i)=>{t.exports=e.r(98547).style}]);