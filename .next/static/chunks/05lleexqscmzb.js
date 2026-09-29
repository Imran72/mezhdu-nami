(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,40433,e=>{"use strict";var t=e.i(43476),i=e.i(37902),s=e.i(71645),n=e.i(18566);let r=`

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

`;e.s(["default",0,function(){let e=(0,n.useParams)(),o=(0,n.useRouter)(),a=e.token,[l,c]=(0,s.useState)(null),[h,u]=(0,s.useState)(!0),[d,p]=(0,s.useState)(!1);return((0,s.useEffect)(()=>{!async function(){try{let e=await fetch(`/api/couples?token=${encodeURIComponent(a)}`,{cache:"no-store"});if(!e.ok)throw Error("Invite not found");let t=await e.json();c(t),t.partner_a_completed&&t.partner_b_completed&&o.replace(`/result/${t.id}`)}catch(e){console.error(e),p(!0)}finally{u(!1)}}()},[a,o]),h)?(0,t.jsx)("main",{className:"invite-page",children:(0,t.jsx)("div",{className:"invite-container",children:(0,t.jsx)("div",{className:"loading-text",children:"Загружаем приглашение..."})})}):d||!l?(0,t.jsxs)("main",{className:`jsx-${r.__hash} invite-page`,children:[(0,t.jsxs)("div",{className:`jsx-${r.__hash} invite-container`,children:[(0,t.jsxs)("div",{className:`jsx-${r.__hash} couple-visual`,children:[(0,t.jsx)("div",{className:`jsx-${r.__hash} couple-circle couple-circle-left`}),(0,t.jsx)("div",{className:`jsx-${r.__hash} couple-circle couple-circle-right`})]}),(0,t.jsx)("h1",{className:`jsx-${r.__hash} invite-title`,children:"Ссылка не найдена."}),(0,t.jsx)("p",{className:`jsx-${r.__hash} invite-description`,children:"Возможно, приглашение устарело или ссылка была скопирована не полностью."}),(0,t.jsx)("button",{type:"button",onClick:()=>o.push("/"),className:`jsx-${r.__hash} invite-button`,children:"На главную"})]}),(0,t.jsx)(i.default,{id:r.__hash,children:r})]}):(0,t.jsxs)("main",{className:`jsx-${r.__hash} invite-page`,children:[(0,t.jsxs)("div",{className:`jsx-${r.__hash} invite-container`,children:[(0,t.jsxs)("div",{className:`jsx-${r.__hash} couple-visual`,children:[(0,t.jsx)("div",{className:`jsx-${r.__hash} couple-circle couple-circle-left`}),(0,t.jsx)("div",{className:`jsx-${r.__hash} couple-circle couple-circle-right`})]}),(0,t.jsx)("div",{className:`jsx-${r.__hash} invite-eyebrow`,children:"ВАША ПАРА"}),(0,t.jsx)("h1",{className:`jsx-${r.__hash} invite-title`,children:"Первый ответ уже готов."}),(0,t.jsxs)("p",{className:`jsx-${r.__hash} invite-description`,children:["Теперь твоя очередь.",(0,t.jsx)("br",{className:`jsx-${r.__hash}`}),"Ответы первого человека тебе не показываются."]}),(0,t.jsxs)("div",{className:`jsx-${r.__hash} names-card`,children:[(0,t.jsxs)("div",{className:`jsx-${r.__hash} person`,children:[(0,t.jsx)("div",{className:`jsx-${r.__hash} person-dot person-dot-ready`,children:"✓"}),(0,t.jsx)("div",{className:`jsx-${r.__hash} person-name`,children:l.partner_a_name}),(0,t.jsx)("div",{className:`jsx-${r.__hash} person-status`,children:"готово"})]}),(0,t.jsx)("div",{className:`jsx-${r.__hash} names-line`}),(0,t.jsxs)("div",{className:`jsx-${r.__hash} person`,children:[(0,t.jsx)("div",{className:`jsx-${r.__hash} person-dot`,children:"2"}),(0,t.jsx)("div",{className:`jsx-${r.__hash} person-name`,children:l.partner_b_name}),(0,t.jsx)("div",{className:`jsx-${r.__hash} person-status`,children:"твоя очередь"})]})]}),(0,t.jsx)("button",{type:"button",onClick:function(){l&&o.push(`/test/${l.id}?role=b`)},className:`jsx-${r.__hash} invite-button`,children:"Начать свою часть"}),(0,t.jsx)("p",{className:`jsx-${r.__hash} invite-note`,children:"Прохождение займёт около 7 минут. Ваши ответы будут сравнены только после завершения теста."})]}),(0,t.jsx)(i.default,{id:r.__hash,children:r})]})}])},16015,(e,t,i)=>{},18566,(e,t,i)=>{t.exports=e.r(76562)},98547,(e,t,i)=>{var s=e.i(47167);e.r(16015);var n=e.r(71645),r=n&&"object"==typeof n&&"default"in n?n:{default:n},o=void 0!==s.default&&s.default.env&&!0,a=function(e){return"[object String]"===Object.prototype.toString.call(e)},l=function(){function e(e){var t=void 0===e?{}:e,i=t.name,s=void 0===i?"stylesheet":i,n=t.optimizeForSpeed,r=void 0===n?o:n;c(a(s),"`name` must be a string"),this._name=s,this._deletedRulePlaceholder="#"+s+"-deleted-rule____{}",c("boolean"==typeof r,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=r,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0;var l="u">typeof window&&document.querySelector('meta[property="csp-nonce"]');this._nonce=l?l.getAttribute("content"):null}var t,i=e.prototype;return i.setOptimizeForSpeed=function(e){c("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),c(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},i.isOptimizeForSpeed=function(){return this._optimizeForSpeed},i.inject=function(){var e=this;if(c(!this._injected,"sheet already injected"),this._injected=!0,"u">typeof window&&this._optimizeForSpeed){this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),this._optimizeForSpeed||(o||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0);return}this._serverSheet={cssRules:[],insertRule:function(t,i){return"number"==typeof i?e._serverSheet.cssRules[i]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),i},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},i.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},i.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},i.insertRule=function(e,t){if(c(a(e),"`insertRule` accepts only strings"),"u"<typeof window)return"number"!=typeof t&&(t=this._serverSheet.cssRules.length),this._serverSheet.insertRule(e,t),this._rulesCount++;if(this._optimizeForSpeed){var i=this.getSheet();"number"!=typeof t&&(t=i.cssRules.length);try{i.insertRule(e,t)}catch(t){return o||console.warn("StyleSheet: illegal rule: \n\n"+e+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var s=this._tags[t];this._tags.push(this.makeStyleTag(this._name,e,s))}return this._rulesCount++},i.replaceRule=function(e,t){if(this._optimizeForSpeed||"u"<typeof window){var i="u">typeof window?this.getSheet():this._serverSheet;if(t.trim()||(t=this._deletedRulePlaceholder),!i.cssRules[e])return e;i.deleteRule(e);try{i.insertRule(t,e)}catch(s){o||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),i.insertRule(this._deletedRulePlaceholder,e)}}else{var s=this._tags[e];c(s,"old rule at index `"+e+"` not found"),s.textContent=t}return e},i.deleteRule=function(e){if("u"<typeof window)return void this._serverSheet.deleteRule(e);if(this._optimizeForSpeed)this.replaceRule(e,"");else{var t=this._tags[e];c(t,"rule at index `"+e+"` not found"),t.parentNode.removeChild(t),this._tags[e]=null}},i.flush=function(){this._injected=!1,this._rulesCount=0,"u">typeof window?(this._tags.forEach(function(e){return e&&e.parentNode.removeChild(e)}),this._tags=[]):this._serverSheet.cssRules=[]},i.cssRules=function(){var e=this;return"u"<typeof window?this._serverSheet.cssRules:this._tags.reduce(function(t,i){return i?t=t.concat(Array.prototype.map.call(e.getSheetForTag(i).cssRules,function(t){return t.cssText===e._deletedRulePlaceholder?null:t})):t.push(null),t},[])},i.makeStyleTag=function(e,t,i){t&&c(a(t),"makeStyleTag accepts only strings as second parameter");var s=document.createElement("style");this._nonce&&s.setAttribute("nonce",this._nonce),s.type="text/css",s.setAttribute("data-"+e,""),t&&s.appendChild(document.createTextNode(t));var n=document.head||document.getElementsByTagName("head")[0];return i?n.insertBefore(s,i):n.appendChild(s),s},t=[{key:"length",get:function(){return this._rulesCount}}],function(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}(e.prototype,t),e}();function c(e,t){if(!e)throw Error("StyleSheet: "+t+".")}var h=function(e){for(var t=5381,i=e.length;i;)t=33*t^e.charCodeAt(--i);return t>>>0},u={};function d(e,t){if(!t)return"jsx-"+e;var i=String(t),s=e+i;return u[s]||(u[s]="jsx-"+h(e+"-"+i)),u[s]}function p(e,t){"u"<typeof window&&(t=t.replace(/\/style/gi,"\\/style"));var i=e+t;return u[i]||(u[i]=t.replace(/__jsx-style-dynamic-selector/g,e)),u[i]}var f=function(){function e(e){var t=void 0===e?{}:e,i=t.styleSheet,s=void 0===i?null:i,n=t.optimizeForSpeed,r=void 0!==n&&n;this._sheet=s||new l({name:"styled-jsx",optimizeForSpeed:r}),this._sheet.inject(),s&&"boolean"==typeof r&&(this._sheet.setOptimizeForSpeed(r),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var t=e.prototype;return t.add=function(e){var t=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(e.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),"u">typeof window&&!this._fromServer&&(this._fromServer=this.selectFromServer(),this._instancesCounts=Object.keys(this._fromServer).reduce(function(e,t){return e[t]=0,e},{}));var i=this.getIdAndRules(e),s=i.styleId,n=i.rules;if(s in this._instancesCounts){this._instancesCounts[s]+=1;return}var r=n.map(function(e){return t._sheet.insertRule(e)}).filter(function(e){return -1!==e});this._indices[s]=r,this._instancesCounts[s]=1},t.remove=function(e){var t=this,i=this.getIdAndRules(e).styleId;if(function(e,t){if(!e)throw Error("StyleSheetRegistry: "+t+".")}(i in this._instancesCounts,"styleId: `"+i+"` not found"),this._instancesCounts[i]-=1,this._instancesCounts[i]<1){var s=this._fromServer&&this._fromServer[i];s?(s.parentNode.removeChild(s),delete this._fromServer[i]):(this._indices[i].forEach(function(e){return t._sheet.deleteRule(e)}),delete this._indices[i]),delete this._instancesCounts[i]}},t.update=function(e,t){this.add(t),this.remove(e)},t.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},t.cssRules=function(){var e=this,t=this._fromServer?Object.keys(this._fromServer).map(function(t){return[t,e._fromServer[t]]}):[],i=this._sheet.cssRules();return t.concat(Object.keys(this._indices).map(function(t){return[t,e._indices[t].map(function(e){return i[e].cssText}).join(e._optimizeForSpeed?"":"\n")]}).filter(function(e){return!!e[1]}))},t.styles=function(e){var t,i;return t=this.cssRules(),void 0===(i=e)&&(i={}),t.map(function(e){var t=e[0],s=e[1];return r.default.createElement("style",{id:"__"+t,key:"__"+t,nonce:i.nonce?i.nonce:void 0,dangerouslySetInnerHTML:{__html:s}})})},t.getIdAndRules=function(e){var t=e.children,i=e.dynamic,s=e.id;if(i){var n=d(s,i);return{styleId:n,rules:Array.isArray(t)?t.map(function(e){return p(n,e)}):[p(n,t)]}}return{styleId:d(s),rules:Array.isArray(t)?t:[t]}},t.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e,t){return e[t.id.slice(2)]=t,e},{})},e}(),m=n.createContext(null);function _(){return new f}function x(){return n.useContext(m)}m.displayName="StyleSheetContext";var v=r.default.useInsertionEffect||r.default.useLayoutEffect,g="u">typeof window?_():void 0;function y(e){var t=g||x();return t&&("u"<typeof window?t.add(e):v(function(){return t.add(e),function(){t.remove(e)}},[e.id,String(e.dynamic)])),null}y.dynamic=function(e){return e.map(function(e){return d(e[0],e[1])}).join(" ")},i.StyleRegistry=function(e){var t=e.registry,i=e.children,s=n.useContext(m),o=n.useState(function(){return s||t||_()})[0];return r.default.createElement(m.Provider,{value:o},i)},i.createStyleRegistry=_,i.style=y,i.useStyleRegistry=x},37902,(e,t,i)=>{t.exports=e.r(98547).style}]);