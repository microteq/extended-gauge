function e(e,t,i,n){var o,s=arguments.length,r=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,n);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(r=(s<3?o(r):s>3?o(t,i,r):o(t,i))||r);return s>3&&r&&Object.defineProperty(t,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const t=window,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),o=new WeakMap;class s{constructor(e,t,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(t,e))}return e}toString(){return this.cssText}}const r=(e,...t)=>{const i=1===e.length?e[0]:t.reduce(((t,i,n)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[n+1]),e[0]);return new s(i,e,n)},l=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,n))(t)})(e):e;var a;const d=window,c=d.trustedTypes,u=c?c.emptyScript:"",h=d.reactiveElementPolyfillSupport,m={toAttribute(e,t){switch(t){case Boolean:e=e?u:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},p=(e,t)=>t!==e&&(t==t||e==e),_={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:p},g="finalized";class v extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const n=this._$Ep(i,t);void 0!==n&&(this._$Ev.set(n,i),e.push(n))})),e}static createProperty(e,t=_){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,n=this.getPropertyDescriptor(e,i,t);void 0!==n&&Object.defineProperty(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(n){const o=this[e];this[t]=n,this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||_}static finalize(){if(this.hasOwnProperty(g))return!1;this[g]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(l(e))}else void 0!==e&&t.push(l(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const n=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,n)=>{i?e.adoptedStyleSheets=n.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):n.forEach((i=>{const n=document.createElement("style"),o=t.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=i.cssText,e.appendChild(n)}))})(n,this.constructor.elementStyles),n}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=_){var n;const o=this.constructor._$Ep(e,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==(null===(n=i.converter)||void 0===n?void 0:n.toAttribute)?i.converter:m).toAttribute(t,i.type);this._$El=e,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$El=null}}_$AK(e,t){var i;const n=this.constructor,o=n._$Ev.get(e);if(void 0!==o&&this._$El!==o){const e=n.getPropertyOptions(o),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:m;this._$El=o,this[o]=s.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let n=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||p)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}var f;v[g]=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:v}),(null!==(a=d.reactiveElementVersions)&&void 0!==a?a:d.reactiveElementVersions=[]).push("1.6.3");const y=window,b=y.trustedTypes,w=b?b.createPolicy("lit-html",{createHTML:e=>e}):void 0,$="$lit$",x=`lit$${(Math.random()+"").slice(9)}$`,S="?"+x,A=`<${S}>`,C=document,k=()=>C.createComment(""),E=e=>null===e||"object"!=typeof e&&"function"!=typeof e,P=Array.isArray,N=e=>P(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]),M="[ \t\n\f\r]",V=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,L=/>/g,T=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,O=/"/g,H=/^(?:script|style|textarea|title)$/i,U=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),R=U(1),j=U(2),D=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),B=new WeakMap,F=C.createTreeWalker(C,129,null,!1);function W(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==w?w.createHTML(t):t}const G=(e,t)=>{const i=e.length-1,n=[];let o,s=2===t?"<svg>":"",r=V;for(let t=0;t<i;t++){const i=e[t];let l,a,d=-1,c=0;for(;c<i.length&&(r.lastIndex=c,a=r.exec(i),null!==a);)c=r.lastIndex,r===V?"!--"===a[1]?r=I:void 0!==a[1]?r=L:void 0!==a[2]?(H.test(a[2])&&(o=RegExp("</"+a[2],"g")),r=T):void 0!==a[3]&&(r=T):r===T?">"===a[0]?(r=null!=o?o:V,d=-1):void 0===a[1]?d=-2:(d=r.lastIndex-a[2].length,l=a[1],r=void 0===a[3]?T:'"'===a[3]?O:z):r===O||r===z?r=T:r===I||r===L?r=V:(r=T,o=void 0);const u=r===T&&e[t+1].startsWith("/>")?" ":"";s+=r===V?i+A:d>=0?(n.push(l),i.slice(0,d)+$+i.slice(d)+x+u):i+x+(-2===d?(n.push(void 0),t):u)}return[W(e,s+(e[i]||"<?>")+(2===t?"</svg>":"")),n]};class K{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let o=0,s=0;const r=e.length-1,l=this.parts,[a,d]=G(e,t);if(this.el=K.createElement(a,i),F.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(n=F.nextNode())&&l.length<r;){if(1===n.nodeType){if(n.hasAttributes()){const e=[];for(const t of n.getAttributeNames())if(t.endsWith($)||t.startsWith(x)){const i=d[s++];if(e.push(t),void 0!==i){const e=n.getAttribute(i.toLowerCase()+$).split(x),t=/([.?@])?(.*)/.exec(i);l.push({type:1,index:o,name:t[2],strings:e,ctor:"."===t[1]?Y:"?"===t[1]?te:"@"===t[1]?ie:X})}else l.push({type:6,index:o})}for(const t of e)n.removeAttribute(t)}if(H.test(n.tagName)){const e=n.textContent.split(x),t=e.length-1;if(t>0){n.textContent=b?b.emptyScript:"";for(let i=0;i<t;i++)n.append(e[i],k()),F.nextNode(),l.push({type:2,index:++o});n.append(e[t],k())}}}else if(8===n.nodeType)if(n.data===S)l.push({type:2,index:o});else{let e=-1;for(;-1!==(e=n.data.indexOf(x,e+1));)l.push({type:7,index:o}),e+=x.length-1}o++}}static createElement(e,t){const i=C.createElement("template");return i.innerHTML=e,i}}function Z(e,t,i=e,n){var o,s,r,l;if(t===D)return t;let a=void 0!==n?null===(o=i._$Co)||void 0===o?void 0:o[n]:i._$Cl;const d=E(t)?void 0:t._$litDirective$;return(null==a?void 0:a.constructor)!==d&&(null===(s=null==a?void 0:a._$AO)||void 0===s||s.call(a,!1),void 0===d?a=void 0:(a=new d(e),a._$AT(e,i,n)),void 0!==n?(null!==(r=(l=i)._$Co)&&void 0!==r?r:l._$Co=[])[n]=a:i._$Cl=a),void 0!==a&&(t=Z(e,a._$AS(e,t.values),a,n)),t}class J{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:n}=this._$AD,o=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:C).importNode(i,!0);F.currentNode=o;let s=F.nextNode(),r=0,l=0,a=n[0];for(;void 0!==a;){if(r===a.index){let t;2===a.type?t=new Q(s,s.nextSibling,this,e):1===a.type?t=new a.ctor(s,a.name,a.strings,this,e):6===a.type&&(t=new ne(s,this,e)),this._$AV.push(t),a=n[++l]}r!==(null==a?void 0:a.index)&&(s=F.nextNode(),r++)}return F.currentNode=C,o}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Q{constructor(e,t,i,n){var o;this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cp=null===(o=null==n?void 0:n.isConnected)||void 0===o||o}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),E(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==D&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):N(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==q&&E(this._$AH)?this._$AA.nextSibling.data=e:this.$(C.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:n}=e,o="number"==typeof n?this._$AC(e):(void 0===n.el&&(n.el=K.createElement(W(n.h,n.h[0]),this.options)),n);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===o)this._$AH.v(i);else{const e=new J(o,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=B.get(e.strings);return void 0===t&&B.set(e.strings,t=new K(e)),t}T(e){P(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const o of e)n===t.length?t.push(i=new Q(this.k(k()),this.k(k()),this,this.options)):i=t[n],i._$AI(o),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class X{constructor(e,t,i,n,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,n){const o=this.strings;let s=!1;if(void 0===o)e=Z(this,e,t,0),s=!E(e)||e!==this._$AH&&e!==D,s&&(this._$AH=e);else{const n=e;let r,l;for(e=o[0],r=0;r<o.length-1;r++)l=Z(this,n[i+r],t,r),l===D&&(l=this._$AH[r]),s||(s=!E(l)||l!==this._$AH[r]),l===q?e=q:e!==q&&(e+=(null!=l?l:"")+o[r+1]),this._$AH[r]=l}s&&!n&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class Y extends X{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}const ee=b?b.emptyScript:"";class te extends X{constructor(){super(...arguments),this.type=4}j(e){e&&e!==q?this.element.setAttribute(this.name,ee):this.element.removeAttribute(this.name)}}class ie extends X{constructor(e,t,i,n,o){super(e,t,i,n,o),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=Z(this,e,t,0))&&void 0!==i?i:q)===D)return;const n=this._$AH,o=e===q&&n!==q||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,s=e!==q&&(n===q||o);o&&this.element.removeEventListener(this.name,this,n),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const oe={O:$,P:x,A:S,C:1,M:G,L:J,R:N,D:Z,I:Q,V:X,H:te,N:ie,U:Y,F:ne},se=y.litHtmlPolyfillSupport;var re,le;null==se||se(K,Q),(null!==(f=y.litHtmlVersions)&&void 0!==f?f:y.litHtmlVersions=[]).push("2.8.0");class ae extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var n,o;const s=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:t;let r=s._$litPart$;if(void 0===r){const e=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;s._$litPart$=r=new Q(t.insertBefore(k(),e),e,void 0,null!=i?i:{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return D}}ae.finalized=!0,ae._$litElement$=!0,null===(re=globalThis.litElementHydrateSupport)||void 0===re||re.call(globalThis,{LitElement:ae});const de=globalThis.litElementPolyfillSupport;null==de||de({LitElement:ae}),(null!==(le=globalThis.litElementVersions)&&void 0!==le?le:globalThis.litElementVersions=[]).push("3.3.3");const ce=e=>null!=e?e:q,ue=e=>t=>"function"==typeof t?((e,t)=>(customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:n}=t;return{kind:i,elements:n,finisher(t){customElements.define(e,t)}}})(e,t),he=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function me(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):he(e,t)}var pe;null===(pe=window.HTMLSlotElement)||void 0===pe||pe.prototype.assignedElements;const _e=r`
  :host {
    --mdc-icon-size: 24px;
    --clickable-cursor: default;
  }

  ha-card {
    height: 100%;
    overflow: hidden;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-sizing: border-box;
  }

  .card-content-container {
    width: 100%;
  }

  .card-header {
    line-height: normal;
    padding: 0;
  }
`,ge=e=>e?"#".concat(e.map((e=>e.toString(16).padStart(2,"0"))).join("")):"",ve=e=>{if((e=e.trim()).startsWith("rgb")){const t=e.match(/rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)/);if(t)return[parseInt(t[1],10),parseInt(t[2],10),parseInt(t[3],10)]}else if(e.startsWith("#")){if(7===e.length)return[parseInt(e.substr(1,2),16),parseInt(e.substr(3,2),16),parseInt(e.substr(5,2),16)];if(4===e.length)return[parseInt(e.charAt(1)+e.charAt(1),16),parseInt(e.charAt(2)+e.charAt(2),16),parseInt(e.charAt(3)+e.charAt(3),16)]}return null},fe=e=>(...t)=>({_$litDirective$:e,values:t});class ye{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const be="important",we=" !"+be,$e=fe(class extends ye{constructor(e){var t;if(super(e),1!==e.type||"style"!==e.name||(null===(t=e.strings)||void 0===t?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,i)=>{const n=e[i];return null==n?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`}),"")}update(e,[t]){const{style:i}=e.element;if(void 0===this.ht){this.ht=new Set;for(const e in t)this.ht.add(e);return this.render(t)}this.ht.forEach((e=>{null==t[e]&&(this.ht.delete(e),e.includes("-")?i.removeProperty(e):i[e]="")}));for(const e in t){const n=t[e];if(null!=n){this.ht.add(e);const t="string"==typeof n&&n.endsWith(we);e.includes("-")||t?i.setProperty(e,t?n.slice(0,-11):n,t?be:""):i[e]=n}}return D}}),xe=(e,t,i={})=>{var n;if("string"==typeof e)return"";const o=void 0!==i.decimalPlaces?i.decimalPlaces:0;let s=i.decimalSeparator;null==s&&(s=new Intl.NumberFormat(t.language).format(1.1).charAt(1));const r=void 0!==i.thousandSeparator?i.thousandSeparator:"",l=e.toFixed(o).split(".");let a=l[0];const d=null!==(n=l[1])&&void 0!==n?n:"";if(void 0!==r){const e=a.startsWith("-");e&&(a=a.substring(1));const t=/\B(?=(\d{3})+(?!\d))/g;a=a.replace(t,r),e&&(a="-"+a)}return o>0?`${a}${s}${d}`:a},Se="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,Ae=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},Ce=`{{lit-${String(Math.random()).slice(2)}}}`,ke=`\x3c!--${Ce}--\x3e`,Ee=new RegExp(`${Ce}|${ke}`),Pe="$lit$";class Ne{constructor(e,t){this.parts=[],this.element=t;const i=[],n=[],o=document.createTreeWalker(t.content,133,null,!1);let s=0,r=-1,l=0;const{strings:a,values:{length:d}}=e;for(;l<d;){const e=o.nextNode();if(null!==e){if(r++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let n=0;for(let e=0;e<i;e++)Me(t[e].name,Pe)&&n++;for(;n-- >0;){const t=a[l],i=Le.exec(t)[2],n=i.toLowerCase()+Pe,o=e.getAttribute(n);e.removeAttribute(n);const s=o.split(Ee);this.parts.push({type:"attribute",index:r,name:i,strings:s}),l+=s.length-1}}"TEMPLATE"===e.tagName&&(n.push(e),o.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(Ce)>=0){const n=e.parentNode,o=t.split(Ee),s=o.length-1;for(let t=0;t<s;t++){let i,s=o[t];if(""===s)i=Ie();else{const e=Le.exec(s);null!==e&&Me(e[2],Pe)&&(s=s.slice(0,e.index)+e[1]+e[2].slice(0,-5)+e[3]),i=document.createTextNode(s)}n.insertBefore(i,e),this.parts.push({type:"node",index:++r})}""===o[s]?(n.insertBefore(Ie(),e),i.push(e)):e.data=o[s],l+=s}}else if(8===e.nodeType)if(e.data===Ce){const t=e.parentNode;null!==e.previousSibling&&r!==s||(r++,t.insertBefore(Ie(),e)),s=r,this.parts.push({type:"node",index:r}),null===e.nextSibling?e.data="":(i.push(e),r--),l++}else{let t=-1;for(;-1!==(t=e.data.indexOf(Ce,t+1));)this.parts.push({type:"node",index:-1}),l++}}else o.currentNode=n.pop()}for(const e of i)e.parentNode.removeChild(e)}}const Me=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},Ve=e=>-1!==e.index,Ie=()=>document.createComment(""),Le=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function Te(e,t){const{element:{content:i},parts:n}=e,o=document.createTreeWalker(i,133,null,!1);let s=Oe(n),r=n[s],l=-1,a=0;const d=[];let c=null;for(;o.nextNode();){l++;const e=o.currentNode;for(e.previousSibling===c&&(c=null),t.has(e)&&(d.push(e),null===c&&(c=e)),null!==c&&a++;void 0!==r&&r.index===l;)r.index=null!==c?-1:r.index-a,s=Oe(n,s),r=n[s]}d.forEach((e=>e.parentNode.removeChild(e)))}const ze=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,133,null,!1);for(;i.nextNode();)t++;return t},Oe=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(Ve(t))return i}return-1},He=new WeakMap,Ue=e=>"function"==typeof e&&He.has(e),Re={},je={};class De{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=Se?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],i=this.template.parts,n=document.createTreeWalker(e,133,null,!1);let o,s=0,r=0,l=n.nextNode();for(;s<i.length;)if(o=i[s],Ve(o)){for(;r<o.index;)r++,"TEMPLATE"===l.nodeName&&(t.push(l),n.currentNode=l.content),null===(l=n.nextNode())&&(n.currentNode=t.pop(),l=n.nextNode());if("node"===o.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(l.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,o.name,o.strings,this.options));s++}else this.__parts.push(void 0),s++;return Se&&(document.adoptNode(e),customElements.upgrade(e)),e}}const qe=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),Be=` ${Ce} `;class Fe{constructor(e,t,i,n){this.strings=e,this.values=t,this.type=i,this.processor=n}getHTML(){const e=this.strings.length-1;let t="",i=!1;for(let n=0;n<e;n++){const e=this.strings[n],o=e.lastIndexOf("\x3c!--");i=(o>-1||i)&&-1===e.indexOf("--\x3e",o+1);const s=Le.exec(e);t+=null===s?e+(i?Be:ke):e.substr(0,s.index)+s[1]+s[2]+Pe+s[3]+Ce}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==qe&&(t=qe.createHTML(t)),e.innerHTML=t,e}}class We{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(Ie()),this.endNode=e.appendChild(Ie())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=Ie()),e.__insert(this.endNode=Ie())}insertAfterPart(e){e.__insert(this.startNode=Ie()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;Ue(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=Re,e(this)}const e=this.__pendingValue;e!==Re&&((e=>null===e||!("object"==typeof e||"function"==typeof e))(e)?e!==this.value&&this.__commitText(e):e instanceof Fe?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):(e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]))(e)?this.__commitIterable(e):e===je?(this.value=je,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof De&&this.value.template===t)this.value.update(e.values);else{const i=new De(t,e.processor,this.options),n=i._clone();i.update(e.values),this.__commitNode(n),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,n=0;for(const o of e)i=t[n],void 0===i&&(i=new We(this.options),t.push(i),0===n?i.appendIntoPart(this):i.insertAfterPart(t[n-1])),i.setValue(o),i.commit(),n++;n<t.length&&(t.length=n,this.clear(i&&i.endNode))}clear(e=this.startNode){Ae(this.startNode.parentNode,e.nextSibling,this.endNode)}}let Ge=!1;function Ke(e){let t=Ze.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},Ze.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const n=e.strings.join(Ce);return i=t.keyString.get(n),void 0===i&&(i=new Ne(e,e.getTemplateElement()),t.keyString.set(n,i)),t.stringsArray.set(e.strings,i),i}(()=>{try{const e={get capture(){return Ge=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();const Ze=new Map,Je=new WeakMap;"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const Qe=(e,t)=>`${e}--${t}`;let Xe=!0;void 0===window.ShadyCSS?Xe=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),Xe=!1);const Ye=e=>t=>{const i=Qe(t.type,e);let n=Ze.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},Ze.set(i,n));let o=n.stringsArray.get(t.strings);if(void 0!==o)return o;const s=t.strings.join(Ce);if(o=n.keyString.get(s),void 0===o){const i=t.getTemplateElement();Xe&&window.ShadyCSS.prepareTemplateDom(i,e),o=new Ne(t,i),n.keyString.set(s,o)}return n.stringsArray.set(t.strings,o),o},et=["html","svg"],tt=new Set;window.JSCompiler_renameProperty=(e,t)=>e;const it={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},nt=(e,t)=>t!==e&&(t==t||e==e),ot={attribute:!0,type:String,converter:it,reflect:!1,hasChanged:nt},st="finalized";class rt extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,i)=>{const n=this._attributeNameForProperty(i,t);void 0!==n&&(this._attributeToPropertyMap.set(n,i),e.push(n))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=ot){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():`__${e}`,n=this.getPropertyDescriptor(e,i,t);void 0!==n&&Object.defineProperty(this.prototype,e,n)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(n){const o=this[e];this[t]=n,this.requestUpdateInternal(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||ot}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(st)||e.finalize(),this[st]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=nt){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,n=t.converter||it,o="function"==typeof n?n:n.fromAttribute;return o?o(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,n=t.converter;return(n&&n.toAttribute||it.toAttribute)(e,i)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=ot){const n=this.constructor,o=n._attributeNameForProperty(e,i);if(void 0!==o){const e=n._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(o):this.setAttribute(o,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const i=this.constructor,n=i._attributeToPropertyMap.get(e);if(void 0!==n){const e=i.getPropertyOptions(n);this._updateState=16|this._updateState,this[n]=i._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,i){let n=!0;if(void 0!==e){const o=this.constructor;i=i||o.getPropertyOptions(e),o._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):n=!1}!this._hasRequestedUpdate&&n&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}rt[st]=!0;const lt=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(i){i.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function at(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):lt(e,t)}const dt=e=>function(e){return at({attribute:!1,hasChanged:null==e?void 0:e.hasChanged})}(e),ct=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ut=Symbol();class ht{constructor(e,t){if(t!==ut)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(ct?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const mt={};class pt extends rt{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,i)=>e.reduceRight(((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e)),i),i=t(e,new Set),n=[];i.forEach((e=>n.unshift(e))),this._styles=n}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!ct){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new ht(String(t),ut)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?ct?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==mt&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return mt}}function _t(e,t,i){return isNaN(e)||isNaN(t)||isNaN(i)?0:e>i?i:e<t?t:e}function gt(e,t,i){return 100*(e-t)/(i-t)}pt.finalized=!0,pt.render=(e,t,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const n=i.scopeName,o=Je.has(t),s=Xe&&11===t.nodeType&&!!t.host,r=s&&!tt.has(n),l=r?document.createDocumentFragment():t;if(((e,t,i)=>{let n=Je.get(t);void 0===n&&(Ae(t,t.firstChild),Je.set(t,n=new We(Object.assign({templateFactory:Ke},i))),n.appendInto(t)),n.setValue(e),n.commit()})(e,l,Object.assign({templateFactory:Ye(n)},i)),r){const e=Je.get(l);Je.delete(l);((e,t,i)=>{tt.add(e);const n=i?i.element:document.createElement("template"),o=t.querySelectorAll("style"),{length:s}=o;if(0===s)return void window.ShadyCSS.prepareTemplateStyles(n,e);const r=document.createElement("style");for(let e=0;e<s;e++){const t=o[e];t.parentNode.removeChild(t),r.textContent+=t.textContent}(e=>{et.forEach((t=>{const i=Ze.get(Qe(t,e));void 0!==i&&i.keyString.forEach((e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach((e=>{i.add(e)})),Te(e,i)}))}))})(e);const l=n.content;i?function(e,t,i=null){const{element:{content:n},parts:o}=e;if(null==i)return void n.appendChild(t);const s=document.createTreeWalker(n,133,null,!1);let r=Oe(o),l=0,a=-1;for(;s.nextNode();)for(a++,s.currentNode===i&&(l=ze(t),i.parentNode.insertBefore(t,i));-1!==r&&o[r].index===a;){if(l>0){for(;-1!==r;)o[r].index+=l,r=Oe(o,r);return}r=Oe(o,r)}}(i,r,l.firstChild):l.insertBefore(r,l.firstChild),window.ShadyCSS.prepareTemplateStyles(n,e);const a=l.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==a)t.insertBefore(a.cloneNode(!0),t.firstChild);else if(i){l.insertBefore(r,l.firstChild);const e=new Set;e.add(r),Te(i,e)}})(n,l,e.value instanceof De?e.value.template:void 0),Ae(t,t.firstChild),t.appendChild(l),Je.set(t,e)}!o&&s&&window.ShadyCSS.styleElement(t.host)},pt.shadowRootOptions={mode:"open"};const vt=new Map;async function ft(e){var t;if(vt.has(e))return null!==(t=vt.get(e))&&void 0!==t?t:null;try{const t=e.indexOf(":");if(-1!==t){const i=e.slice(0,t),n=e.slice(t+1),o=window.customIconsets;if(o){const t=o[i];if("function"==typeof t){const i=await t(n);if(null==i?void 0:i.path)return vt.set(e,i.path),i.path}}const s=window.customIcons;if(s){const t=s[i];if(t&&"function"==typeof t.getIcon){const i=await t.getIcon(n);if(null==i?void 0:i.path)return vt.set(e,i.path),i.path}}}const i=await async function(e){var t,i,n,o,s,r,l,a;if("undefined"==typeof customElements)return null;if(!customElements.get("ha-icon"))return null;const d=document.createElement("ha-icon");d.icon=e,d.style.cssText="position:absolute;visibility:hidden;pointer-events:none;",document.body.appendChild(d);try{"object"==typeof d.updateComplete&&d.updateComplete?await d.updateComplete:await new Promise((e=>requestAnimationFrame((()=>e()))));const e=d.shadowRoot;if(!e)return null;let c=e.querySelector("path");if(null==c?void 0:c.getAttribute("d"))return c.getAttribute("d");const u=e.querySelector("ha-svg-icon");if(u&&(c=null!==(i=null===(t=u.shadowRoot)||void 0===t?void 0:t.querySelector("path"))&&void 0!==i?i:null,null==c?void 0:c.getAttribute("d")))return c.getAttribute("d");const h=e.querySelector("ha-icon");return h&&("object"==typeof h.updateComplete&&h.updateComplete&&await h.updateComplete,c=null!==(a=null!==(o=null===(n=h.shadowRoot)||void 0===n?void 0:n.querySelector("path"))&&void 0!==o?o:null===(l=null===(r=null===(s=h.shadowRoot)||void 0===s?void 0:s.querySelector("ha-svg-icon"))||void 0===r?void 0:r.shadowRoot)||void 0===l?void 0:l.querySelector("path"))&&void 0!==a?a:null,null==c?void 0:c.getAttribute("d"))?c.getAttribute("d"):null}finally{document.body.removeChild(d)}}(e);return null!==i&&vt.set(e,i),i}catch(e){return null}}function yt(e){const t=e.animate?"animation":"";return j`
    <path
      class="needle ${t}"
      d="M -25 -2.5 L -47.5 0 L -25 2.5 z"
      style=${$e({transform:`rotate(${e.valueAngle}deg)`})}>
    </path>
  `}const bt={timerId:null,demoValue:50,callbacks:new Set,startTimer(){null===this.timerId&&(this.timerId=window.setInterval((()=>{this.callbacks.forEach((e=>e()))}),5e3))},stopTimer(){null!==this.timerId&&(window.clearInterval(this.timerId),this.timerId=null)},registerCallback(e){this.callbacks.has(e)||(this.callbacks.add(e),this.startTimer())},unregisterCallback(e){this.callbacks.has(e)&&this.callbacks.delete(e),0===this.callbacks.size&&this.stopTimer()}};class wt extends ae{constructor(){super(...arguments),this.min=0,this.max=100,this.showMinMax=!0,this.value=0,this.unitOfMeasure="",this.gaugeBackgroundColor="var(--primary-background-color)",this.gaugeInfoColor="var(--secondary-text-color)",this.showNeedle=!1,this.showDial=!1,this.showSegments=!1,this.needleStyle="default",this.needleIconKeepVertical=!1,this.needleIconSize=1,this.animation=!0,this.showSegmentLabels=!0,this._valueAngle=0,this._updated=!1,this._segment_value_replacement="",this._needleIconPath=null,this._normalizeValue=(e,t,i)=>_t(e,t,i),this._getValueInPercentage=(e,t,i)=>gt(e,t,i),this._getAngle=(e,t,i)=>function(e,t,i){return 180*gt(_t(e,t,i),t,i)/100}(e,t,i),this._getLowerAngle=(e,t,i)=>(isNaN(e)&&(e=t),this._getAngle(e,t,i)),this._getUpperAngle=(e,t,i)=>(isNaN(e)&&(e=i),this._getAngle(e,t,i))}connectedCallback(){super.connectedCallback(),this._valueAngle=this._getAngle(this.value,this.min,this.max),this.needleIcon&&ft(this.needleIcon).then((e=>{this._needleIconPath=e}))}_normalizeSegments(){this.segments&&function(e,t,i){for(const n of e)isNaN(n.lower)&&(n.lower=t),isNaN(n.upper)&&(n.upper=i),n.lower>n.upper&&(n.lower=n.upper)}(this.segments,this.min,this.max)}updated(e){super.updated(e),(e.has("value")||e.has("valueText")||e.has("unit_of_measure")||e.has("_segment_value_replacement")||e.has("needleIcon"))&&(this._valueAngle=this._getAngle(this.value,this.min,this.max),this._segment_value_replacement=this._getSegmentValueReplacement(),this._rescaleSvgText("text"),e.has("needleIcon")&&this.needleIcon&&(this._needleIconPath=null,ft(this.needleIcon).then((e=>{this._needleIconPath=e}))))}_rescaleSvgText(e){const t=this.shadowRoot.querySelector(`.${e}`),i=t.querySelector("text").getBBox();t.setAttribute("viewBox",`${i.x} ${i.y} ${i.width} ${i.height}`)}_getSegmentValueReplacement(){if(this.segments)for(let e=this.segments.length-1;e>=0;e--){if(this.value>=this.segments[e].lower&&this.value<=this.segments[e].upper&&null!=this.segments[e].valueReplacement)return this.segments[e].valueReplacement;if((this.value<this.segments[e].lower||this.value>this.segments[e].upper)&&null!=this.segments[e].valueReplacementOutOfRange)return this.segments[e].valueReplacementOutOfRange}return""}_renderNeedle(){return function(e){switch(e.needleStyle){case"classic":return function(e){const t=e.animate?"animation":"";return j`
    <path
      class="needle needle-classic ${t}"
      d="M -34,-3 L -40,-1 A 1,1,0,0,0,-40,1 L -34,3 A 2,2,0,0,0,-34,-3 Z"
      style=${$e({transform:`rotate(${e.valueAngle}deg)`})}>
    </path>
  `}(e);case"icon":return function(e){const{needleIcon:t,needleIconPath:i,needleIconKeepVertical:n,needleIconSize:o,needleIconColor:s,needleIconBackgroundColor:r,valueAngle:l,animate:a}=e;if(!t||!i)return yt({valueAngle:l,animate:a});const d=7*o,c=d/24,u=null!=s?s:"var(--primary-text-color)",h=.5*d,m=a?"animation":"";if(n){const e=l*Math.PI/180,t=-40*Math.cos(e),n=-40*Math.sin(e);return j`
      <g class="needle needle-icon ${m}">
        ${r?j`<circle cx=${t} cy=${n} r=${h} fill=${r} class="needle-icon-bg"/>`:""}
        <path
          class="needle-icon-path"
          d=${i}
          transform="translate(${t-d/2} ${n-d/2}) scale(${c})"
          style=${$e({fill:u,"pointer-events":"none"})}>
        </path>
      </g>
    `}{const e=-40-d/2,t=-d/2;return j`
      <g
        class="needle needle-icon ${m}"
        style=${$e({transform:`rotate(${l}deg)`})}>
        ${r?j`<circle cx=${-40} cy=${0} r=${h} fill=${r} class="needle-icon-bg"/>`:""}
        <path
          class="needle-icon-path"
          d=${i}
          transform="translate(${e} ${t}) scale(${c})"
          style=${$e({fill:u,"pointer-events":"none"})}>
        </path>
      </g>
    `}}(e);default:return yt(e)}}({needleStyle:this.needleStyle,needleIcon:this.needleIcon,needleIconPath:this._needleIconPath,needleIconKeepVertical:this.needleIconKeepVertical,needleIconSize:this.needleIconSize,needleIconColor:this.needleIconColor,needleIconBackgroundColor:this.needleIconBackgroundColor,valueAngle:this._valueAngle,animate:this._updated&&this.animation})}render(){this._normalizeSegments();const e=Object.assign({},this.formatOptions);e.thousandSeparator="";let t=this.gaugeInfoColor;this.segments&&!this.showSegments&&this.segments.slice().sort(((e,t)=>e.lower-t.lower)).forEach((e=>{this.value>=e.lower&&this.value<=e.upper&&(t=e.color)}));const i=this.showDial,n=125.664,o=n-n*this._valueAngle/180;return R`
      <div class="gauge-container">
      <svg viewBox="-50 -50 130 55" class="gauge" style="overflow:visible;">
      <g transform="translate(15 5)">
        <path
          style =${$e({stroke:`${this.segments&&this.showSegments?this.gaugeInfoColor:this.gaugeBackgroundColor}`})}
          class="dial"
          d="M -40 0 A 40 40 0 0 1 40 0">
        </path>
        ${this.segments&&this.showSegments?this.segments.slice().sort(((e,t)=>e.lower-t.lower)).map((e=>{const t=this._getLowerAngle(e.lower,this.min,this.max),i=this._getUpperAngle(e.upper,this.min,this.max);return j`
                  <path
                      stroke="${e.color}"
                      class="segment"
                      d="M
                        ${0-40*Math.cos(t*Math.PI/180)}
                        ${0-40*Math.sin(t*Math.PI/180)}
                       A 40 40 0 0 1
                        ${0-40*Math.cos(i*Math.PI/180)}
                        ${0-40*Math.sin(i*Math.PI/180)}
                       ">
                  </path>
                  `})):""}
          ${i?j`<path
                class="dial ${this._updated&&this.animation?"animation":""}"
                style =${$e({stroke:`${t}`,strokeDasharray:"125.664",strokeDashoffset:`${o}`})}
                d="M -40 0 A 40 40 0 0 1 40 0">
            </path>
            `:""}
          ${this.showNeedle?this._renderNeedle():""}
      ${this._updated=!0}
      </g>
      </svg>
      <svg class="text">
        <text class="center">
          <tspan class="value-text">
            ${this._segment_value_replacement?this._segment_value_replacement:this.valueText||xe(this.value,this.locale,this.formatOptions)}
          </tspan>
          <tspan class="unit-text">
          ${this._segment_value_replacement?"":` ${this.unitOfMeasure}`}
          </tspan>
      </svg>
      ${this.showMinMax?j`
          <svg class="min-container">
            <text x="50%" class="center top">
              <tspan class="min-max-text">
                ${xe(this.min,this.locale,e)}
                </tapsn>
            </text>
          </svg>
          <svg class="max-container">
            <text x="50%" class="center top">
              <tspan class="min-max-text">
                ${xe(this.max,this.locale,e)}
                </tapsn>
            </text>
          </svg>
        `:""}
        ${this.segments&&this.showSegmentLabels?this.segments.map((t=>{const i=this._getLowerAngle(t.lower,this.min,this.max),n=this._getUpperAngle(t.upper,this.min,this.max);return R`
                  ${null!=t.lower?R` <div
                        class="segment-label"
                        style=${$e({color:`${t.color}`,left:50-39*Math.cos(i*Math.PI/180)+"%",top:`calc(${100-92*Math.sin(i*Math.PI/180)}% - 0.8rem)`,transform:`translateX(${100*(i-180)/180}%)`})}
                      >
                        ${xe(t.lower,this.locale,e)}
                      </div>`:""}
                  ${null!=t.upper?R` <div
                        class="segment-label"
                        style=${$e({color:`${t.color}`,left:50-39*Math.cos(n*Math.PI/180)+"%",top:`calc(${100-92*Math.sin(n*Math.PI/180)}% - 0.8rem)`,transform:`translateX(${100*(n-180)/180}%)`})}
                      >
                        ${xe(t.upper,this.locale,e)}
                      </div>`:""}
                `})):""}
  </div>
  <div class="label-container">
      <div class="label">
            ${this.valueLabel||""}
      </div>
  </div>
`}}function $t(e){return e&&e.length?ge(e):void 0}wt.styles=r`
    :host {
      position: relative;
    }

    .dial {
      fill: none;
      stroke-width: 14.7;
    }

    .needle {
      fill: var(--primary-text-color);
    }

    .needle-classic {
      fill: var(--primary-text-color);
      stroke: var(--card-background-color);
      stroke-width: 1;
      stroke-linecap: round;
    }

    .needle-pivot {
      fill: var(--primary-text-color);
    }

    .needle-icon-path {
      fill: var(--primary-text-color);
    }

    .needle.animation,
    .dial.animation {
      transition: all 1s ease 0s;
    }

    .segment {
      fill: none;
      stroke-width: 15;
      opacity: 0.8;
    }

    .gauge-container {
      position: relative;
    }

    .gauge {
      display: block;
    }

    .text {
      position: absolute;
      max-height: 25%;
      max-width: 55%;
      left: 50%;
      bottom: -6%;
      transform: translate(-50%, 0%);
    }

    .center {
      text-anchor: middle;
      direction: ltr;
    }

    .top {
      dominant-baseline: hanging;
    }

    .text .value-text {
      font-size: 45px;
      fill: var(--primary-text-color);
    }

    .text .unit-text {
      font-size: 30px;
      fill: var(--secondary-text-color);
    }

    .label-container {
      display: flex;
      align-items: center;
      position: relative;
      padding-top: 10px;
    }

    .label {
      font-size: 0.9rem;
      color: var(--primary-text-color);
      margin: auto;
    }

    .min-container {
      position: absolute;
      max-height: 15%;
      max-width: 11%;
      left: 19.5%;
      bottom: -18%;
      transform: translate(-50%, 0%);
      overflow: visible;
    }

    .max-container {
      position: absolute;
      max-height: 15%;
      max-width: 11%;
      right: 19.5%;
      bottom: -18%;
      transform: translate(50%, 0%);
      overflow: visible;
    }

    .min-max-text {
      font-size: 0.8rem;
      fill: var(--primary-text-color);
    }

    .segment-label {
      position: absolute;
      font-size: 0.8rem;
      fill: var(--primary-text-color);
    }
  `,e([at({type:Number})],wt.prototype,"min",void 0),e([at({type:Number})],wt.prototype,"max",void 0),e([at({type:Boolean})],wt.prototype,"showMinMax",void 0),e([at({type:Number})],wt.prototype,"value",void 0),e([at()],wt.prototype,"unitOfMeasure",void 0),e([at({type:String})],wt.prototype,"valueLabel",void 0),e([at({type:String})],wt.prototype,"gaugeBackgroundColor",void 0),e([at({type:String})],wt.prototype,"gaugeInfoColor",void 0),e([at({attribute:!1})],wt.prototype,"formatOptions",void 0),e([at({attribute:!1,type:String})],wt.prototype,"valueText",void 0),e([at({attribute:!1})],wt.prototype,"locale",void 0),e([at({type:Boolean})],wt.prototype,"showNeedle",void 0),e([at({type:Boolean})],wt.prototype,"showDial",void 0),e([at({type:Boolean})],wt.prototype,"showSegments",void 0),e([at({type:String})],wt.prototype,"needleStyle",void 0),e([at({type:String})],wt.prototype,"needleIcon",void 0),e([at({type:Boolean})],wt.prototype,"needleIconKeepVertical",void 0),e([at({type:Number})],wt.prototype,"needleIconSize",void 0),e([at({type:String})],wt.prototype,"needleIconColor",void 0),e([at({type:String})],wt.prototype,"needleIconBackgroundColor",void 0),e([at({type:Boolean})],wt.prototype,"animation",void 0),e([at({type:Array})],wt.prototype,"segments",void 0),e([at({type:Boolean})],wt.prototype,"showSegmentLabels",void 0),e([dt()],wt.prototype,"_valueAngle",void 0),e([dt()],wt.prototype,"_updated",void 0),e([dt()],wt.prototype,"_segment_value_replacement",void 0),e([dt()],wt.prototype,"_needleIconPath",void 0),customElements.get("microteq-extended-gauge")||customElements.define("microteq-extended-gauge",wt),function(){const e=window;e.customCards=e.customCards||[],e.customCards.push(Object.assign(Object.assign({},{type:"extended-gauge-card",name:"Extended Gauge",description:"Extended Gauge Card with multiple segments."}),{preview:!0,documentationURL:"https://github.com/microteq/extended-gauge"}))}();let xt=class extends ae{constructor(){super(...arguments),this._config={type:"custom:extended-gauge-card"},this._minValue=0,this._maxValue=0,this._updateDemoValue=()=>{bt.demoValue=this._minValue+Math.round((this._maxValue-this._minValue)*Math.random()),this.requestUpdate()}}connectedCallback(){var e;super.connectedCallback();const t=this._getValue();null!=this._getValue()?(this._minValue=1/0,this._maxValue=-1/0):(this._setMinValue(t),this._setMaxValue(t)),null==(null===(e=this._config.entity)||void 0===e?void 0:e.entity)&&bt.registerCallback(this._updateDemoValue)}disconnectedCallback(){super.disconnectedCallback(),bt.unregisterCallback(this._updateDemoValue)}getGridOptions(){return{max_columns:33}}getCardSize(){return 3}setConfig(e){this._config=Object.assign({},e)}static async getConfigElement(){return await Promise.resolve().then((function(){return wi})),document.createElement("extended-gauge-ui-editor")}static getStubConfig(e){return function(){const e=getComputedStyle(document.documentElement),t=ve(e.getPropertyValue("--secondary-text-color")),i=ve(e.getPropertyValue("--primary-background-color")),n={type:"custom:extended-gauge-card"};return n.main={color_value:t,color_background:i,display_mode:"gauge_and_needle",show_entity_name:!0,show_min_max_values:!0,show_segment_labels:!0},n}()}updated(e){super.updated(e),this._config&&this.hass}shouldUpdate(){return!0}_setMinValue(e){var t,i;null==(null===(t=this._config.main)||void 0===t?void 0:t.min_value)?e&&(this._minValue=Math.min(e,this._minValue)):this._minValue=null===(i=this._config.main)||void 0===i?void 0:i.min_value}_setMaxValue(e){var t,i;null==(null===(t=this._config.main)||void 0===t?void 0:t.max_value)?e&&(this._maxValue=Math.max(e+1e-6,this._maxValue)):this._maxValue=null===(i=this._config.main)||void 0===i?void 0:i.max_value}_getValue(){var e,t,i,n,o,s,r,l,a;let d;if((null===(e=this._config.entity)||void 0===e?void 0:e.entity)&&(null===(t=this.hass)||void 0===t?void 0:t.states[null===(i=this._config.entity)||void 0===i?void 0:i.entity])&&(d=null===(n=this.hass)||void 0===n?void 0:n.states[null===(o=this._config.entity)||void 0===o?void 0:o.entity]),!d)return;const c=d.state;return"unavailable"!=c&&"timestamp"!==d.attributes.device_class?null==(null===(r=null===(s=this._config.entity)||void 0===s?void 0:s.settings)||void 0===r?void 0:r.conversion_factor)?parseFloat(c):parseFloat(c)/(null===(a=null===(l=this._config.entity)||void 0===l?void 0:l.settings)||void 0===a?void 0:a.conversion_factor):void 0}_convertSegments(e){var t,i,n,o;const s=[];if(e.segment_list)for(const r of e.segment_list)s.push({lower:null===(t=r.settings)||void 0===t?void 0:t.segment_lower,upper:null===(i=r.settings)||void 0===i?void 0:i.segment_upper,color:ge(null===(n=r.settings)||void 0===n?void 0:n.segment_color),valueReplacement:null===(o=r.settings)||void 0===o?void 0:o.segment_value_replacement});return s}_getDemoData(){var e,t,i,n,o,s,r,l,a,d,c,u,h,m,p,_,g,v,f,y,b,w,$,x,S,A,C,k,E,P,N,M,V,I,L,T,z,O,H,U,R,j,D,q,B,F,W,G,K,Z,J,Q,X,Y,ee,te,ie,ne,oe,se,re,le,ae,de,ce,ue,he,me,pe,_e,ge,fe,ye,be,we,$e,xe,Se,Ae,Ce,ke,Ee,Pe,Ne,Me,Ve;const Ie=Object.assign({},this._config);null!=(null===(e=this._config.main)||void 0===e?void 0:e.min_value)?this._minValue=null===(t=this._config.main)||void 0===t?void 0:t.min_value:this._minValue=0,null!=(null===(i=this._config.main)||void 0===i?void 0:i.max_value)?this._maxValue=null===(n=this._config.main)||void 0===n?void 0:n.max_value:this._maxValue=null==(null===(s=null===(o=this._config.entity)||void 0===o?void 0:o.settings)||void 0===s?void 0:s.conversion_factor)?100:100/(null===(l=null===(r=this._config.entity)||void 0===r?void 0:r.settings)||void 0===l?void 0:l.conversion_factor),this._maxValue<=this._minValue&&(this._maxValue=this._minValue+(null==(null===(d=null===(a=this._config.entity)||void 0===a?void 0:a.settings)||void 0===d?void 0:d.conversion_factor)?100:100/(null===(u=null===(c=this._config.entity)||void 0===c?void 0:c.settings)||void 0===u?void 0:u.conversion_factor)));const Le=getComputedStyle(document.documentElement),Te=[],ze={segment_lower:(null===(_=null===(p=null===(m=null===(h=this._config)||void 0===h?void 0:h.segment_list)||void 0===m?void 0:m[0])||void 0===p?void 0:p.settings)||void 0===_?void 0:_.segment_lower)||(null===(y=null===(f=null===(v=null===(g=this._config)||void 0===g?void 0:g.segment_list)||void 0===v?void 0:v[0])||void 0===f?void 0:f.settings)||void 0===y?void 0:y.segment_upper)?null===(x=null===($=null===(w=null===(b=this._config)||void 0===b?void 0:b.segment_list)||void 0===w?void 0:w[0])||void 0===$?void 0:$.settings)||void 0===x?void 0:x.segment_lower:this._minValue,segment_upper:(null===(k=null===(C=null===(A=null===(S=this._config)||void 0===S?void 0:S.segment_list)||void 0===A?void 0:A[0])||void 0===C?void 0:C.settings)||void 0===k?void 0:k.segment_lower)||(null===(M=null===(N=null===(P=null===(E=this._config)||void 0===E?void 0:E.segment_list)||void 0===P?void 0:P[0])||void 0===N?void 0:N.settings)||void 0===M?void 0:M.segment_upper)?null===(T=null===(L=null===(I=null===(V=this._config)||void 0===V?void 0:V.segment_list)||void 0===I?void 0:I[0])||void 0===L?void 0:L.settings)||void 0===T?void 0:T.segment_upper:this._minValue+(this._maxValue-this._minValue)/3,segment_color:(null===(U=null===(H=null===(O=null===(z=this._config)||void 0===z?void 0:z.segment_list)||void 0===O?void 0:O[0])||void 0===H?void 0:H.settings)||void 0===U?void 0:U.segment_color)?null===(R=this._config.segment_list[0].settings)||void 0===R?void 0:R.segment_color:ve(Le.getPropertyValue("--primary-color")),segment_value_replacement:(null===(B=null===(q=null===(D=null===(j=this._config)||void 0===j?void 0:j.segment_list)||void 0===D?void 0:D[0])||void 0===q?void 0:q.settings)||void 0===B?void 0:B.segment_value_replacement)?null===(K=null===(G=null===(W=null===(F=this._config)||void 0===F?void 0:F.segment_list)||void 0===W?void 0:W[0])||void 0===G?void 0:G.settings)||void 0===K?void 0:K.segment_value_replacement:void 0};Te.push({id:0,settings:ze});const Oe={segment_lower:(null===(X=null===(Q=null===(J=null===(Z=this._config)||void 0===Z?void 0:Z.segment_list)||void 0===J?void 0:J[1])||void 0===Q?void 0:Q.settings)||void 0===X?void 0:X.segment_lower)||(null===(ie=null===(te=null===(ee=null===(Y=this._config)||void 0===Y?void 0:Y.segment_list)||void 0===ee?void 0:ee[1])||void 0===te?void 0:te.settings)||void 0===ie?void 0:ie.segment_upper)?null===(re=null===(se=null===(oe=null===(ne=this._config)||void 0===ne?void 0:ne.segment_list)||void 0===oe?void 0:oe[1])||void 0===se?void 0:se.settings)||void 0===re?void 0:re.segment_lower:this._minValue+.7*(this._maxValue-this._minValue),segment_upper:(null===(ce=null===(de=null===(ae=null===(le=this._config)||void 0===le?void 0:le.segment_list)||void 0===ae?void 0:ae[1])||void 0===de?void 0:de.settings)||void 0===ce?void 0:ce.segment_lower)||(null===(pe=null===(me=null===(he=null===(ue=this._config)||void 0===ue?void 0:ue.segment_list)||void 0===he?void 0:he[1])||void 0===me?void 0:me.settings)||void 0===pe?void 0:pe.segment_upper)?null===(ye=null===(fe=null===(ge=null===(_e=this._config)||void 0===_e?void 0:_e.segment_list)||void 0===ge?void 0:ge[1])||void 0===fe?void 0:fe.settings)||void 0===ye?void 0:ye.segment_upper:this._minValue+.85*(this._maxValue-this._minValue),segment_color:(null===(xe=null===($e=null===(we=null===(be=this._config)||void 0===be?void 0:be.segment_list)||void 0===we?void 0:we[1])||void 0===$e?void 0:$e.settings)||void 0===xe?void 0:xe.segment_color)?null===(Se=this._config.segment_list[1].settings)||void 0===Se?void 0:Se.segment_color:ve(Le.getPropertyValue("--accent-color")),segment_value_replacement:(null===(Ee=null===(ke=null===(Ce=null===(Ae=this._config)||void 0===Ae?void 0:Ae.segment_list)||void 0===Ce?void 0:Ce[1])||void 0===ke?void 0:ke.settings)||void 0===Ee?void 0:Ee.segment_value_replacement)?null===(Ve=null===(Me=null===(Ne=null===(Pe=this._config)||void 0===Pe?void 0:Pe.segment_list)||void 0===Ne?void 0:Ne[1])||void 0===Me?void 0:Me.settings)||void 0===Ve?void 0:Ve.segment_value_replacement:void 0};return Te.push({id:1,settings:Oe}),Ie.segment_list=Te,Ie}render(){var e,t,i,n,o,s,r,l,a,d,c,u,h,m,p,_,g,v,f,y,b,w,$,x,S,A,C,k,E,P,N,M,V,I,L,T,z,O;if(!this._config||!this.hass)return R``;let H,U;this.style.setProperty("--clickable-cursor",this._config.manual_control?"pointer":"default"),null==(null===(e=this._config.entity)||void 0===e?void 0:e.entity)||null==this.hass.states[null===(t=this._config.entity)||void 0===t?void 0:t.entity]?(H=this._getDemoData(),U=bt.demoValue):(H=this._config,U=this._getValue(),this._setMinValue(U),this._setMaxValue(U));const j=function(e){var t;if(void 0!==(null==e?void 0:e.show_needle))return e.show_needle?{showNeedle:!0,showDial:!1,showSegments:!0}:{showNeedle:!1,showDial:!0,showSegments:!1};switch(null!==(t=null==e?void 0:e.display_mode)&&void 0!==t?t:"gauge_and_needle"){case"dial_only":return{showNeedle:!1,showDial:!0,showSegments:!1};case"dial_and_needle":return{showNeedle:!0,showDial:!0,showSegments:!1};default:return{showNeedle:!0,showDial:!1,showSegments:!0}}}(H.main);return R`
      <ha-card style="text-align: center !important;">
        <h1 class="card-header">${null===(i=H.title)||void 0===i?void 0:i.title}</h1>
        <div class="card-content-container">
          <microteq-extended-gauge
            .locale=${this.hass.locale}
            min=${this._minValue==1/0?-999999999:this._minValue}
            max=${this._maxValue==-1/0?999999999:this._maxValue}
            .value=${null==U?"":U}
            .valueLabel="${(null===(n=H.main)||void 0===n?void 0:n.show_entity_name)?(null===(o=H.entity)||void 0===o?void 0:o.settings)&&(null===(r=null===(s=H.entity)||void 0===s?void 0:s.settings)||void 0===r?void 0:r.name)?null===(a=null===(l=H.entity)||void 0===l?void 0:l.settings)||void 0===a?void 0:a.name:null===(d=H.entity)||void 0===d?void 0:d.entity:void 0}"
            .unitOfMeasure=${null!==(h=null===(u=null===(c=H.entity)||void 0===c?void 0:c.settings)||void 0===u?void 0:u.unit_of_measurement)&&void 0!==h?h:""}
            .showNeedle=${j.showNeedle}
            .showDial=${j.showDial}
            .showSegments=${j.showSegments}
            .needleStyle=${null!==(_=null===(p=null===(m=H.main)||void 0===m?void 0:m.needle)||void 0===p?void 0:p.needle_style)&&void 0!==_?_:"default"}
            .needleIcon=${null===(v=null===(g=H.main)||void 0===g?void 0:g.needle)||void 0===v?void 0:v.needle_icon}
            .needleIconKeepVertical=${null!==(b=null===(y=null===(f=H.main)||void 0===f?void 0:f.needle)||void 0===y?void 0:y.needle_icon_keep_vertical)&&void 0!==b&&b}
            .needleIconSize=${null!==(x=null===($=null===(w=H.main)||void 0===w?void 0:w.needle)||void 0===$?void 0:$.needle_icon_size)&&void 0!==x?x:1}
            .needleIconColor=${(null===(A=null===(S=H.main)||void 0===S?void 0:S.needle)||void 0===A?void 0:A.needle_icon_color)?ge(H.main.needle.needle_icon_color):void 0}
            .needleIconBackgroundColor=${(null===(k=null===(C=H.main)||void 0===C?void 0:C.needle)||void 0===k?void 0:k.needle_icon_background_color)?ge(H.main.needle.needle_icon_background_color):void 0}
            .gaugeInfoColor=${ce($t(null===(E=H.main)||void 0===E?void 0:E.color_value))}
            .gaugeBackgroundColor=${ce($t(null===(P=H.main)||void 0===P?void 0:P.color_background))}
            .segments=${this._convertSegments(H)}
            .showSegmentLabels=${null===(N=H.main)||void 0===N?void 0:N.show_segment_labels}
            .showMinMax=${null===(M=H.main)||void 0===M?void 0:M.show_min_max_values}
            .formatOptions=${{decimalPlaces:null===(I=null===(V=H.entity)||void 0===V?void 0:V.settings)||void 0===I?void 0:I.decimals,decimalSeparator:null===(T=null===(L=null==H?void 0:H.entity)||void 0===L?void 0:L.settings)||void 0===T?void 0:T.decimal_separator,thousandSeparator:null===(O=null===(z=null==H?void 0:H.entity)||void 0===z?void 0:z.settings)||void 0===O?void 0:O.thousand_separator}}
          >
          </microteq-extended-gauge>
        </div>
      </ha-card>
    `}};var St,At;xt.styles=r`
    ${_e}
  `,e([me({attribute:!1})],xt.prototype,"hass",void 0),e([me({state:!0})],xt.prototype,"_config",void 0),xt=e([ue("extended-gauge-card")],xt),function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(St||(St={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(At||(At={}));var Ct=function(e,t,i,n){n=n||{},i=null==i?{}:i;var o=new Event(t,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return o.detail=i,e.dispatchEvent(o),o},kt="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";class Et extends ae{constructor(){super(...arguments),this.outlined=!1,this.icon="mdi:format-list-bulleted-type"}render(){return R`
      <div
        class="menu-entry"
        @click=${this._menuClicked}
        @keydown=${this._menuClicked}
        @focus=${this._focusChanged}
        @blur=${this._focusChanged}
        role="button"
      >
        <ha-icon icon=${this.icon} class="summary-icon"> </ha-icon>
        <slot name="header">
          <div class="header">
            ${this.header}
            <slot class="secondary" name="secondary">${this.secondary}</slot>
          </div>
        </slot>
        <ha-icon-button
          style="pointer-events: none;"
          .path=${"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"}
          class="summary-icon-right"
        >
        </ha-icon-button>
      </div>
    `}_focusChanged(e){this.shadowRoot.querySelector(".top").classList.toggle("focused","focus"===e.type)}_menuClicked(){Ct(this,"microteq-menu-click")}static get styles(){return r`
      :host {
        display: block;
      }

      :host([outlined]) {
        box-shadow: none;
        border-width: 1px;
        border-style: solid;
        border-color: var(
          --ha-card-border-color,
          var(--divider-color, #e0e0e0)
        );
        border-radius: var(--ha-card-border-radius, 12px);
      }

      .menu-entry {
        width: 100%;
        display: flex;
        gap: 1rem;
        padding: var(--expansion-panel-summary-padding, 0 8px);
        min-height: 48px;
        align-items: center;
        cursor: pointer;
        overflow: hidden;
        font-weight: 500;
        outline: none;
        user-select: none;
      }

      .summary-icon {
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
        direction: var(--direction);
        color: var(--secondary-text-color);
      }

      .header,
      ::slotted([slot="header"]) {
        flex: 1;
      }

      .secondary {
        display: block;
        color: var(--secondary-text-color);
        font-size: 12px;
      }
    `}}e([at({type:String})],Et.prototype,"path",void 0),e([at({type:Boolean,reflect:!0})],Et.prototype,"outlined",void 0),e([at({type:String})],Et.prototype,"icon",void 0),e([at()],Et.prototype,"header",void 0),e([at()],Et.prototype,"secondary",void 0),customElements.get("microteq-menu-entry")||customElements.define("microteq-menu-entry",Et);class Pt extends ae{_goBack(){Ct(this,"microteq-go-back")}render(){return R`
      <div class="header">
        <div class="back-title">
          <ha-icon-button
            .label=${"Go Back"}
            .path=${"M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"}
            @click=${this._goBack}
          >
          </ha-icon-button>
          <span>${this.pageTitle}</span>
        </div>
      </div>
    `}static get styles(){return r`
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        user-select: none;
      }

      .back-title {
        display: flex;
        align-items: center;
        font-size: 18px;
      }
    `}}e([at({type:String})],Pt.prototype,"pageTitle",void 0),customElements.get("microteq-page-header")||customElements.define("microteq-page-header",Pt);const{I:Nt}=oe,Mt=()=>document.createComment(""),Vt=(e,t,i)=>{var n;const o=e._$AA.parentNode,s=void 0===t?e._$AB:t._$AA;if(void 0===i){const t=o.insertBefore(Mt(),s),n=o.insertBefore(Mt(),s);i=new Nt(t,n,e,e.options)}else{const t=i._$AB.nextSibling,r=i._$AM,l=r!==e;if(l){let t;null===(n=i._$AQ)||void 0===n||n.call(i,e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==r._$AU&&i._$AP(t)}if(t!==s||l){let e=i._$AA;for(;e!==t;){const t=e.nextSibling;o.insertBefore(e,s),e=t}}}return i},It=(e,t,i=e)=>(e._$AI(t,i),e),Lt={},Tt=e=>{var t;null===(t=e._$AP)||void 0===t||t.call(e,!1,!0);let i=e._$AA;const n=e._$AB.nextSibling;for(;i!==n;){const e=i.nextSibling;i.remove(),i=e}},zt=(e,t,i)=>{const n=new Map;for(let o=t;o<=i;o++)n.set(e[o],o);return n},Ot=fe(class extends ye{constructor(e){if(super(e),2!==e.type)throw Error("repeat() can only be used in text expressions")}ct(e,t,i){let n;void 0===i?i=t:void 0!==t&&(n=t);const o=[],s=[];let r=0;for(const t of e)o[r]=n?n(t,r):r,s[r]=i(t,r),r++;return{values:s,keys:o}}render(e,t,i){return this.ct(e,t,i).values}update(e,[t,i,n]){var o;const s=(e=>e._$AH)(e),{values:r,keys:l}=this.ct(t,i,n);if(!Array.isArray(s))return this.ut=l,r;const a=null!==(o=this.ut)&&void 0!==o?o:this.ut=[],d=[];let c,u,h=0,m=s.length-1,p=0,_=r.length-1;for(;h<=m&&p<=_;)if(null===s[h])h++;else if(null===s[m])m--;else if(a[h]===l[p])d[p]=It(s[h],r[p]),h++,p++;else if(a[m]===l[_])d[_]=It(s[m],r[_]),m--,_--;else if(a[h]===l[_])d[_]=It(s[h],r[_]),Vt(e,d[_+1],s[h]),h++,_--;else if(a[m]===l[p])d[p]=It(s[m],r[p]),Vt(e,s[h],s[m]),m--,p++;else if(void 0===c&&(c=zt(l,p,_),u=zt(a,h,m)),c.has(a[h]))if(c.has(a[m])){const t=u.get(l[p]),i=void 0!==t?s[t]:null;if(null===i){const t=Vt(e,s[h]);It(t,r[p]),d[p]=t}else d[p]=It(i,r[p]),Vt(e,s[h],i),s[t]=null;p++}else Tt(s[m]),m--;else Tt(s[h]),h++;for(;p<=_;){const t=Vt(e,d[_+1]);It(t,r[p]),d[p++]=t}for(;h<=m;){const e=s[h++];null!==e&&Tt(e)}return this.ut=l,((e,t=Lt)=>{e._$AH=t})(e,d),D}});class Ht extends ae{constructor(){super(...arguments),this.sortable=!1}_elementListChanged(e,t,i){Ct(this,"microteq-element-list-changed",{elementList:e,index:t,change:i})}_findNewElementId(e){if(0==e.length)return 0;const t=[...e].sort(((e,t)=>e.id-t.id)),i=t.find(((e,t,i)=>t>0&&e.id!==i[t-1].id+1));return i?i.id-1:t[t.length-1].id+1}async _addRow(){this.elementList||(this.elementList=[]);const e={id:this._findNewElementId(this.elementList)},t=this.elementList.concat(e);this._elementListChanged(t,t.length-1,"add")}async _editRow(e){this._elementListChanged(this.elementList,e,"edit")}_removeRow(e){if(!this.elementList)return;const t=this.elementList.concat();t.splice(e,1),this._elementListChanged(t,e,"remove")}_rowMoved(e){if(e.detail.oldIndex===e.detail.newIndex)return;const t=this.elementList.concat();t.splice(e.detail.newIndex,0,t.splice(e.detail.oldIndex,1)[0]),this._elementListChanged(t,0,"move")}render(){var e,t;let i=!1;return this.elementList&&this.elementList.length>1&&(i=this.sortable),R`
      <div class="title">
        ${this.elementList&&this.elementList.length>0?this.listTitle:this.listEmptyText}
      </div>
      <ha-sortable
        .hass="${this.hass}"
        @item-moved=${this._rowMoved}
        draggable-selector=".draggable"
        handle-selector="ha-svg-icon"
      >
        <mwc-list>
          ${Ot(this.elementList,(e=>null==e?void 0:e.id),((e,t)=>{var n;return R`
              <div class="${i?"draggable":""} row-container row">
                ${i?R`
                      <ha-svg-icon
                        class="handle"
                        .path=${"M7,19V17H9V19H7M11,19V17H13V19H11M15,19V17H17V19H15M7,15V13H9V15H7M11,15V13H13V15H11M15,15V13H17V15H15M7,11V9H9V11H7M11,11V9H13V11H11M15,11V9H17V11H15M7,7V5H9V7H7M11,7V5H13V7H11M15,7V5H17V7H15Z"}
                        slot="graphic"
                      >
                      </ha-svg-icon>
                    `:""}
                <div class="row-text">${null===(n=null==e?void 0:e.title)||void 0===n?void 0:n.title}</div>
                <ha-icon-button
                  .label=${this.hass.localize("ui.components.entity.entity-picker.clear")}
                  .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                  class="remove-icon"
                  .index=${t}
                  @click=${()=>this._removeRow(t)}
                >
                </ha-icon-button>
                <ha-icon-button
                  .label=${this.hass.localize("ui.components.entity.entity-picker.edit")}
                  .path=${kt}
                  class="edit-icon"
                  .index=${t}
                  @click=${()=>this._editRow(t)}
                >
                </ha-icon-button>
              </div>
            `}))}
          ${this.elementList.length>0&&""==(null!==(t=null===(e=this.elementList[this.elementList.length-1].title)||void 0===e?void 0:e.title)&&void 0!==t?t:"").trim()?R``:R`
            <div class="row-container">
              <div class="new-row"
                @click=${this._addRow}>
                ${this.addNewText}
              </div>
              <ha-icon-button
                .label=${this.hass.localize("ui.components.entity.entity-picker.add")}
                .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}
                class="add-icon"
                @click=${this._addRow}>
                </ha-icon-button>
              </div>
            </div>
            `}
        </mwc-list>
      </ha-sortable>
    `}static get styles(){return r`
      .title {
        color: var(--mdc-theme-primary, #6200ee);
        pointer-events: none;
        user-select: none;
      }

      .row-container {
        display: flex;
        align-items: center;
        user-select: none;
      }

      .row-container.row {
        padding-top: 5px;
        padding-bottom: 5px;
      }

      .row-container.row .row-text {
        flex-grow: 1;
        display: flex;
        align-items: center;
        color: var(--primary-text-color);
        padding: var(--text-field-padding, 0px 16px);
        background-color: var(--mdc-text-field-fill-color, #f5f5f5);
        height: 56px;
        pointer-events: none;
      }

      .row-container .new-row {
        flex-grow: 1;
        cursor: pointer;
      }

      .remove-icon,
      .edit-icon,
      .add-icon {
        --mdc-icon-button-size: 36px;
        color: var(--secondary-text-color);
      }

      .handle {
        cursor: move; /* fallback if grab cursor is unsupported */
        cursor: grab;
      }

      ha-list-item {
        --mdc-list-side-padding: 12px;
        overflow: visible;
      }
    `}}e([at({attribute:!1})],Ht.prototype,"elementList",void 0),e([at({type:Boolean,reflect:!0})],Ht.prototype,"sortable",void 0),e([at({type:String})],Ht.prototype,"listTitle",void 0),e([at({type:String})],Ht.prototype,"listEmptyText",void 0),e([at({type:String})],Ht.prototype,"addNewText",void 0),customElements.get("microteq-element-list")||customElements.define("microteq-element-list",Ht);class Ut extends ae{constructor(e){super(),this._siteHistory=[],this._previousSectionConfigData=void 0,this.computeLabelCallback=e=>(null==e?void 0:e.label)?null==e?void 0:e.label:this.hass.localize(`ui.panel.lovelace.editor.card.generic.${null==e?void 0:e.name}`)||this.localizeText(null==e?void 0:e.name),this.computeErrorCallback=e=>this.localizeError(e),this._mainPage=e}async connectedCallback(){super.connectedCallback();try{this._eventSubscription&&this._eventSubscription.unsubscribe(),this._eventSubscription=await this.hass.connection.subscribeEvents((async e=>{"lovelace_updated"===e.event_type&&await this.configSaved()}),"lovelace_updated")}catch(e){console.error("Error while subscribing to the lovelace_updated event:",e)}}disconnectedCallback(){super.disconnectedCallback(),this._eventSubscription&&this._eventSubscription()}async setConfig(e){0==this._siteHistory.length&&this._mainPage&&(this._mainPage._configData=e,this._siteHistory=[this._mainPage]),this.requestUpdate()}async configSaved(){}valueChanged(e,t,i,n,o){}listElementAdded(e,t){}listElementRemoving(e,t){return!0}validateForm(e,t,i){return!1}renderCustom(e,t){}setCurrentPage(e,t=void 0,i=void 0){const n=this._getCurrentPage();n._sectionName=e.name;const o=e.link;o._isAdd=void 0===t?void 0:i,null!=n._rowIndex?o._configData=n._configData[n._rowIndex][e.name]:o._configData=n._configData[e.name],o._rowIndex=t,this._siteHistory.push(o),this.requestUpdate()}updateFormValues(e,t,i){var n;if(!(null===(n=this._mainPage)||void 0===n?void 0:n._configData)||!this.hass)return;const o=i.detail.value;let s,r;const l=this._getCurrentPage();null!=l._rowIndex?(r=[...l._configData],s=Object.assign({},r[l._rowIndex])):(r=Object.assign({},l._configData),s=r),s[t.name]||(s[t.name]={}),this._previousSectionConfigData=s[t.name],s[t.name]=Object.assign({},o),this.validateForm(e,t,o)&&(s=this.valueChanged(e,s,t.name,o,this._previousSectionConfigData)),null!=l._rowIndex?r[l._rowIndex]=s:r=s,l._configData=r;const a=this._updateSectionConfigData(void 0,r);Ct(this,"config-changed",{config:a})}localizeText(e){}localizeError(e){}_goBack(){this._siteHistory.pop(),this.requestUpdate()}_getCurrentPage(){return this._siteHistory[this._siteHistory.length-1]}_updateSectionConfigData(e,t){let i=t,n=this._siteHistory.length-1;null==e&&(n-=1);for(let t=n;t>=0;t--){let n,o;const s=this._siteHistory[t],r=s._configData,l=t==this._siteHistory.length-1?e:s._sectionName;null!=s._rowIndex?(n=[...r],o=Object.assign({},n[s._rowIndex]),o[l]=i,n[s._rowIndex]=o):(n=Object.assign({},r),n[l]=i),i=n,s._configData=n}return i}_getSectionConfigData(e){const t=this._getCurrentPage();if(t._configData)return null!=t._rowIndex?t._configData[t._rowIndex][e.name]:t._configData[e.name]}_elementListChanged(e,t){const i=e.detail.elementList,n=e.detail.index;let o;switch(e.detail.change){case"add":i[n]=this.listElementAdded(t.name,i[n]),o=this._updateSectionConfigData(t.name,i),Ct(this,"config-changed",{config:o}),this.setCurrentPage(t,n,!0);break;case"edit":this.setCurrentPage(t,n,!1);break;case"remove":this.listElementRemoving(t.name,i[n])&&(o=this._updateSectionConfigData(t.name,i),Ct(this,"config-changed",{config:o}));break;case"move":o=this._updateSectionConfigData(t.name,i),Ct(this,"config-changed",{config:o})}}_renderPageHeader(e){return null!=e&&null!=e.title&&""!=e.title.trim()?R`
          <microteq-page-header
            @microteq-go-back=${this._goBack}
            pageTitle=${this.localizeText(`${null!=e._isAdd&&e._isAdd?e.alternative_title:e.title}`)}
          >
          </microteq-page-header>
        `:R``}_renderMenuEntry(e){var t;const i=null!==(t=e.icon)&&void 0!==t?t:"mdi:dots-horizontal-circle-outline",n=e.title?e.title:e.name;return R`
      <microteq-menu-entry
        path=${e.title}
        header="${this.localizeText(`${n}`)}"
        @microteq-menu-click=${()=>this.setCurrentPage(e)}
        icon=${i}
      >
      </microteq-menu-entry>
    `}_renderEditableEntity(e,t){const i=this._getSectionConfigData(t);return R`
      <div style="display: flex;">
        <ha-form
          .hass=${this.hass}
          .schema=${t.conditionalSchemaField?t.schema(i):t.schema}
          .data=${i}
          .computeLabel=${this.computeLabelCallback}
          .error=${t._errors}
          .computeError=${this.computeErrorCallback}
          @value-changed=${i=>this.updateFormValues(e,t,i)}
        >
        </ha-form>
        <ha-icon-button
          .label=${this.hass.localize("ui.components.entity.entity-picker.edit")}
          .path=${kt}
          class="edit-icon"
          @click=${()=>this.setCurrentPage(t)}
        >
        </ha-icon-button>
      </div>
    `}_renderForm(e,t){const i=this._getSectionConfigData(t);return this.validateForm(e,t,i),R`
      <ha-form
        .hass=${this.hass}
        .schema=${t.conditionalSchemaField?t.schema(i):t.schema}
        .data=${i}
        .computeLabel=${this.computeLabelCallback}
        .error=${t._errors}
        .computeError=${this.computeErrorCallback}
        @value-changed=${i=>this.updateFormValues(e,t,i)}
      >
      </ha-form>
    `}_renderElementList(e){var t;const i=this._getSectionConfigData(e)||[],n=e.title?e.title:e.name;return R`
      <microteq-element-list
        .hass=${this.hass}
        .elementList=${i}
        .sortable=${e.sortable}
        .listTitle=${this.localizeText(`${null!=n?n:""}`)}
        .listEmptyText=${this.localizeText(`${null!==(t=e.alternative_title)&&void 0!==t?t:""}`)}
        .addNewText=${this.localizeText(`${e.link.alternative_title}`)}
        @microteq-element-list-changed=${t=>this._elementListChanged(t,e)}
      >
      </microteq-element-list>
    `}_renderCustom(e,t){const i=this._getSectionConfigData(t);return this.validateForm(e,t,i),this.renderCustom(t,i)}_renderSection(e){var t;let i;switch(i=1==this._siteHistory.length?"":null!==(t=this._siteHistory[this._siteHistory.length-2]._sectionName)&&void 0!==t?t:"",e.type){case"menu":return this._renderMenuEntry(e);case"entity":return this._renderEditableEntity(i,e);case"form":return this._renderForm(i,e);case"element_list":return this._renderElementList(e);case"custom":return this._renderCustom(i,e)}return R``}render(){var e;const t=this._getCurrentPage();return this.hass&&(null===(e=this._mainPage)||void 0===e?void 0:e._configData)&&t?R`
      <div class="card-config">
        ${this._renderPageHeader(t)}
        ${t.sections.map((e=>this._renderSection(e)))}
      </div>
    `:q}static get styles(){return r`
      ha-form {
        width: 100%;
      }

      ha-icon-button {
        align-self: end;
        padding-bottom: 6px;
      }

      .card-config {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-bottom: 10px;
      }
    `}}e([at({attribute:!1})],Ut.prototype,"hass",void 0);var Rt={entity_settings:"Edit entity settings",needle_settings:"Edit needle settings",name:"Name",unit_of_measurement:"Unit of measurement",conversion_factor:"Conversion factor",decimals:"Number of decimals",thousand_separator:"Thousands separator",decimal_separator:"Decimal separator",min_value:"Minimum displayed value",max_value:"Maximum displayed value",color_value:"Color for value display",color_background:"Background color (no value)",display_mode:"Display mode",display_mode_gauge_and_needle:"Full gauge with needle",display_mode_dial_only:"Dial only",display_mode_dial_and_needle:"Dial with needle",show_entity_name:"Show entity name",show_min_max_values:"Show min / max values",show_segment_labels:"Show segment thresholds",needle_style:"Needle style",needle_icon:"Needle icon",needle_icon_keep_vertical:"Keep icon vertical",needle_icon_size:"Icon size multiplier",needle_icon_color:"Icon color",needle_icon_background_color_enabled:"Show icon background color",needle_icon_background_color:"Icon background color",add_segment:"Add segment",edit_segment:"Edit segment",segment_list:"Segments",segment_list_empty:"No segments defined",segment_lower:"Lower bound",segment_upper:"Upper bound",segment_color:"Segment color",segment_value_replacement:"Override value"},jt={range_lower_greater_than_upper:"Lower range bound is greater than the upper bound.",value_lower_greater_than_upper:"Minimum displayed value is greater than the maximum value."},Dt={editor:Rt,error:jt},qt={entity_settings:"Einstellungen der Entität bearbeiten",needle_settings:"Nadeleinstellungen bearbeiten",name:"Name",unit_of_measurement:"Masseinheit",conversion_factor:"Umrechnungsfaktor",decimals:"Anzahl Kommastellen",thousand_separator:"Tausendertrennzeichen",decimal_separator:"Dezimaltrennzeichen",min_value:"Minimaler angezeigter Wert",max_value:"Maximaler angezeigter Wert",color_value:"Farbe für die Anzeige des Wertes",color_background:"Hintergrundfarbe (kein Wert)",display_mode:"Anzeigemodus",display_mode_gauge_and_needle:"Vollständige Anzeige mit Nadel",display_mode_dial_only:"Nur Zeiger",display_mode_dial_and_needle:"Zeiger mit Nadel",show_entity_name:"Name der Entität anzeigen",show_min_max_values:"Min. / Max. Werte anzeigen",show_segment_labels:"Segmentgrenzwerte anzeigen",needle_style:"Nadelstil",needle_icon:"Nadel-Symbol",needle_icon_keep_vertical:"Symbol vertikal halten",needle_icon_size:"Symbol-Grössenmultiplikator",needle_icon_color:"Symbol-Farbe",needle_icon_background_color_enabled:"Symbol-Hintergrundfarbe anzeigen",needle_icon_background_color:"Symbol-Hintergrundfarbe",add_segment:"Segment hinzufügen",edit_segment:"Segment bearbeiten",segment_list:"Segmente",segment_list_empty:"Keine Segmente definiert",segment_lower:"Untere Grenze",segment_upper:"Obere Grenze",segment_color:"Farbe de Segments",segment_value_replacement:"Wert überschreiben"},Bt={range_lower_greater_than_upper:"Die untere Bereichsgrenze ist grösser als die obere.",value_lower_greater_than_upper:"Der angezeigte Minimalwert ist grösser als der Maximalwert."},Ft={editor:qt,error:Bt},Wt={entity_settings:"Modifier les paramètres de l'entité",needle_settings:"Modifier les paramètres de l'aiguille",name:"Nom",unit_of_measurement:"Unité de mesure",conversion_factor:"Facteur de conversion",decimals:"Nombre de décimales",thousand_separator:"Séparateur de milliers",decimal_separator:"Séparateur décimal",min_value:"Valeur minimale affichée",max_value:"Valeur maximale affichée",color_value:"Couleur de la valeur",color_background:"Couleur de fond (pas de valeur)",display_mode:"Mode d'affichage",display_mode_gauge_and_needle:"Jauge complète avec aiguille",display_mode_dial_only:"Cadran seulement",display_mode_dial_and_needle:"Cadran avec aiguille",show_entity_name:"Afficher le nom de l'entité",show_min_max_values:"Afficher les valeurs min / max",show_segment_labels:"Afficher les limites des segments",needle_style:"Style de l'aiguille",needle_icon:"Icône de l'aiguille",needle_icon_keep_vertical:"Garder l'icône verticale",needle_icon_size:"Multiplicateur de taille de l'icône",needle_icon_color:"Couleur de l'icône",needle_icon_background_color_enabled:"Afficher la couleur de fond de l'icône",needle_icon_background_color:"Couleur de fond de l'icône",add_segment:"Ajouter un segment",edit_segment:"Modifier le segment",segment_list:"Segments",segment_list_empty:"Aucun segment défini",segment_lower:"Limite inférieure",segment_upper:"Limite supérieure",segment_color:"Couleur du segment",segment_value_replacement:"Remplacer la valeur"},Gt={range_lower_greater_than_upper:"La limite inférieure est supérieure à la limite supérieure.",value_lower_greater_than_upper:"La valeur minimale affichée est supérieure à la valeur maximale."},Kt={editor:Wt,error:Gt},Zt={entity_settings:"Modifica impostazioni entità",needle_settings:"Modifica impostazioni indicatore",name:"Nome",unit_of_measurement:"Unità di misura",conversion_factor:"Fattore di conversione",decimals:"Numero di decimali",thousand_separator:"Separatore delle migliaia",decimal_separator:"Separatore decimale",min_value:"Valore minimo visualizzato",max_value:"Valore massimo visualizzato",color_value:"Colore del valore",color_background:"Colore di sfondo (nessun valore)",display_mode:"Modalità di visualizzazione",display_mode_gauge_and_needle:"Gauge completo con indicatore",display_mode_dial_only:"Solo quadrante",display_mode_dial_and_needle:"Quadrante con indicatore",show_entity_name:"Mostra il nome dell'entità",show_min_max_values:"Mostra valori min / max",show_segment_labels:"Mostra i limiti dei segmenti",needle_style:"Stile dell'indicatore",needle_icon:"Icona dell'indicatore",needle_icon_keep_vertical:"Mantieni icona verticale",needle_icon_size:"Moltiplicatore dimensione icona",needle_icon_color:"Colore dell'icona",needle_icon_background_color_enabled:"Mostra colore di sfondo dell'icona",needle_icon_background_color:"Colore di sfondo dell'icona",add_segment:"Aggiungi segmento",edit_segment:"Modifica segmento",segment_list:"Segmenti",segment_list_empty:"Nessun segmento definito",segment_lower:"Limite inferiore",segment_upper:"Limite superiore",segment_color:"Colore del segmento",segment_value_replacement:"Sostituisci valore"},Jt={range_lower_greater_than_upper:"Il limite inferiore è maggiore del limite superiore.",value_lower_greater_than_upper:"Il valore minimo visualizzato è maggiore del valore massimo."},Qt={editor:Zt,error:Jt},Xt={entity_settings:"Editar configuración de la entidad",needle_settings:"Editar configuración de la aguja",name:"Nombre",unit_of_measurement:"Unidad de medida",conversion_factor:"Factor de conversión",decimals:"Número de decimales",thousand_separator:"Separador de miles",decimal_separator:"Separador decimal",min_value:"Valor mínimo mostrado",max_value:"Valor máximo mostrado",color_value:"Color para mostrar el valor",color_background:"Color de fondo (sin valor)",display_mode:"Modo de visualización",display_mode_gauge_and_needle:"Gauge completo con aguja",display_mode_dial_only:"Solo esfera",display_mode_dial_and_needle:"Esfera con aguja",show_entity_name:"Mostrar nombre de la entidad",show_min_max_values:"Mostrar valores mín. / máx.",show_segment_labels:"Mostrar límites de segmentos",needle_style:"Estilo de la aguja",needle_icon:"Ícono de la aguja",needle_icon_keep_vertical:"Mantener ícono vertical",needle_icon_size:"Multiplicador de tamaño del ícono",needle_icon_color:"Color del ícono",needle_icon_background_color_enabled:"Mostrar color de fondo del ícono",needle_icon_background_color:"Color de fondo del ícono",add_segment:"Agregar segmento",edit_segment:"Editar segmento",segment_list:"Segmentos",segment_list_empty:"No hay segmentos definidos",segment_lower:"Límite inferior",segment_upper:"Límite superior",segment_color:"Color del segmento",segment_value_replacement:"Sobrescribir valor"},Yt={range_lower_greater_than_upper:"El límite inferior es mayor que el límite superior.",value_lower_greater_than_upper:"El valor mínimo mostrado es mayor que el valor máximo."},ei={editor:Xt,error:Yt};const ti={en:Object.freeze({__proto__:null,editor:Rt,error:jt,default:Dt}),de:Object.freeze({__proto__:null,editor:qt,error:Bt,default:Ft}),fr:Object.freeze({__proto__:null,editor:Wt,error:Gt,default:Kt}),it:Object.freeze({__proto__:null,editor:Zt,error:Jt,default:Qt}),es:Object.freeze({__proto__:null,editor:Xt,error:Yt,default:ei})};function ii(e,t){try{return e.split(".").reduce(((e,t)=>e[t]),ti[t])}catch(e){return}}function ni(e){let t=ii(e,(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_"));return t||(t=ii(e,"en")),null!=t?t:e}class oi extends TypeError{constructor(e,t){let i;const{message:n,explanation:o,...s}=e,{path:r}=e,l=0===r.length?n:`At path: ${r.join(".")} -- ${n}`;super(o??l),null!=o&&(this.cause=l),Object.assign(this,s),this.name=this.constructor.name,this.failures=()=>i??(i=[e,...t()])}}function si(e){return"object"==typeof e&&null!=e}function ri(e){return"symbol"==typeof e?e.toString():"string"==typeof e?JSON.stringify(e):`${e}`}function li(e,t,i,n){if(!0===e)return;!1===e?e={}:"string"==typeof e&&(e={message:e});const{path:o,branch:s}=t,{type:r}=i,{refinement:l,message:a=`Expected a value of type \`${r}\`${l?` with refinement \`${l}\``:""}, but received: \`${ri(n)}\``}=e;return{value:n,type:r,refinement:l,key:o[o.length-1],path:o,branch:s,...e,message:a}}function*ai(e,t,i,n){(function(e){return si(e)&&"function"==typeof e[Symbol.iterator]})(e)||(e=[e]);for(const o of e){const e=li(o,t,i,n);e&&(yield e)}}function*di(e,t,i={}){const{path:n=[],branch:o=[e],coerce:s=!1,mask:r=!1}=i,l={path:n,branch:o};if(s&&(e=t.coercer(e,l),r&&"type"!==t.type&&si(t.schema)&&si(e)&&!Array.isArray(e)))for(const i in e)void 0===t.schema[i]&&delete e[i];let a="valid";for(const n of t.validator(e,l))n.explanation=i.message,a="not_valid",yield[n,void 0];for(let[d,c,u]of t.entries(e,l)){const t=di(c,u,{path:void 0===d?n:[...n,d],branch:void 0===d?o:[...o,c],coerce:s,mask:r,message:i.message});for(const i of t)i[0]?(a=null!=i[0].refinement?"not_refined":"not_valid",yield[i[0],void 0]):s&&(c=i[1],void 0===d?e=c:e instanceof Map?e.set(d,c):e instanceof Set?e.add(c):si(e)&&(void 0!==c||d in e)&&(e[d]=c))}if("not_valid"!==a)for(const n of t.refiner(e,l))n.explanation=i.message,a="not_refined",yield[n,void 0];"valid"===a&&(yield[void 0,e])}class ci{constructor(e){const{type:t,schema:i,validator:n,refiner:o,coercer:s=e=>e,entries:r=function*(){}}=e;this.type=t,this.schema=i,this.entries=r,this.coercer=s,this.validator=n?(e,t)=>ai(n(e,t),t,this,e):()=>[],this.refiner=o?(e,t)=>ai(o(e,t),t,this,e):()=>[]}assert(e,t){return function(e,t,i){const n=ui(e,t,{message:i});if(n[0])throw n[0]}(e,this,t)}create(e,t){return function(e,t,i){const n=ui(e,t,{coerce:!0,message:i});if(n[0])throw n[0];return n[1]}(e,this,t)}is(e){return function(e,t){return!ui(e,t)[0]}(e,this)}mask(e,t){return function(e,t,i){const n=ui(e,t,{coerce:!0,mask:!0,message:i});if(n[0])throw n[0];return n[1]}(e,this,t)}validate(e,t={}){return ui(e,this,t)}}function ui(e,t,i={}){const n=di(e,t,i),o=function(e){const{done:t,value:i}=e.next();return t?void 0:i}(n);if(o[0]){return[new oi(o[0],(function*(){for(const e of n)e[0]&&(yield e[0])})),void 0]}return[void 0,o[1]]}function hi(e,t){return new ci({type:e,schema:null,validator:t})}function mi(){return hi("any",(()=>!0))}function pi(){return hi("number",(e=>"number"==typeof e&&!isNaN(e)||`Expected a number, but received: ${ri(e)}`))}function _i(e){const t=e?Object.keys(e):[],i=hi("never",(()=>!1));return new ci({type:"object",schema:e||null,*entries(n){if(e&&si(n)){const o=new Set(Object.keys(n));for(const i of t)o.delete(i),yield[i,n[i],e[i]];for(const e of o)yield[e,n[e],i]}},validator:e=>si(e)||`Expected an object, but received: ${ri(e)}`,coercer:e=>si(e)?{...e}:e})}function gi(e){return new ci({...e,validator:(t,i)=>void 0===t||e.validator(t,i),refiner:(t,i)=>void 0===t||e.refiner(t,i)})}function vi(){return hi("string",(e=>"string"==typeof e||`Expected a string, but received: ${ri(e)}`))}!function(...e){const t="type"===e[0].type,i=e.map((e=>e.schema)),n=Object.assign({},...i);t?function(e){const t=Object.keys(e);new ci({type:"type",schema:e,*entries(i){if(si(i))for(const n of t)yield[n,i[n],e[n]]},validator:e=>si(e)||`Expected an object, but received: ${ri(e)}`,coercer:e=>si(e)?{...e}:e})}(n):_i(n)}(_i({type:vi(),view_layout:mi()}),_i({main:_i({title:gi(vi()),sensor:gi(vi()),min_value:gi(pi()),max_value:gi(pi()),segment_list:gi(mi())})}));const fi=[{name:"title",selector:{text:{}}}],yi={sections:[{name:"title",type:"form",schema:fi},{name:"entity",type:"entity",schema:[{name:"entity",selector:{entity:{filter:{domain:["sensor","number","input_number"]}}}}],link:{title:"entity_settings",sections:[{name:"settings",type:"form",schema:[{type:"grid",column_min_width:"200px",schema:[{name:"name",selector:{text:{}}},{name:"unit_of_measurement",selector:{text:{}}},{name:"conversion_factor",selector:{number:{mode:"box",min:-1e6,max:1e6,step:.01}}},{name:"decimals",selector:{number:{mode:"box",min:-1e6,max:1e6,step:.01}}},{name:"thousand_separator",selector:{text:{}}},{name:"decimal_separator",selector:{text:{}}}]}]}]}},{name:"main",type:"form",schema:[{type:"grid",column_min_width:"200px",schema:[{name:"min_value",selector:{number:{mode:"box",min:-1e6,max:1e6,step:.01}}},{name:"max_value",selector:{number:{mode:"box",min:-1e6,max:1e6,step:.01}}},{name:"color_value",selector:{color_rgb:{}}},{name:"color_background",selector:{color_rgb:{}}},{name:"display_mode",selector:{select:{options:[{value:"gauge_and_needle",label:"Full gauge with needle"},{value:"dial_only",label:"Dial only"},{value:"dial_and_needle",label:"Dial with needle"}],mode:"dropdown"}}},{name:"show_entity_name",selector:{boolean:{}}},{name:"show_min_max_values",selector:{boolean:{}}},{name:"show_segment_labels",selector:{boolean:{}}}]}]},{name:"main",type:"menu",title:"needle_settings",icon:"mdi:arrow-up-circle-outline",link:{title:"needle_settings",sections:[{name:"needle",type:"form",schema:e=>{const t=null==e?void 0:e.needle_style,i=null==e?void 0:e.needle_icon_background_color_enabled;return[{type:"grid",column_min_width:"200px",schema:[{name:"needle_style",selector:{select:{options:["default","classic","icon"],mode:"dropdown"}}},..."icon"===t?[{name:"needle_icon",selector:{icon:{}}},{name:"needle_icon_keep_vertical",selector:{boolean:{}}},{name:"needle_icon_size",selector:{number:{mode:"box",min:.1,max:10,step:.1}}},{name:"needle_icon_color",selector:{color_rgb:{}}},{name:"needle_icon_background_color_enabled",selector:{boolean:{}}},...i?[{name:"needle_icon_background_color",selector:{color_rgb:{}}}]:[]]:[]]}]},conditionalSchemaField:"needle_style"}]}},{name:"segment_list",type:"element_list",title:"segment_list",alternative_title:"segment_list_empty",sortable:!0,link:{title:"edit_segment",alternative_title:"add_segment",sections:[{name:"title",type:"form",schema:fi},{name:"settings",type:"form",schema:[{type:"grid",column_min_width:"200px",schema:[{name:"segment_lower",selector:{number:{mode:"box",min:-1e6,max:1e6,step:.01}}},{name:"segment_upper",selector:{number:{mode:"box",min:-1e6,max:1e6,step:.01}}},{name:"segment_color",selector:{color_rgb:{}}},{name:"segment_value_replacement",selector:{text:{}}}]}]}]}}]};let bi=class extends Ut{constructor(){super(yi),this.localizeText=e=>ni(`editor.${e}`),this.localizeError=e=>ni(`error.${e}`)}valueChanged(e,t,i,n){var o;switch(e){case"":switch(i){case"entity":{const e=null==n?void 0:n.entity;if(e){const t=this.hass.states[e];if(t){const e=t.attributes.unit_of_measurement;n.settings?n.settings=Object.assign({},n.settings):n.settings={},e?n.settings.unit_of_measurement=e:delete n.settings.unit_of_measurement}}else null!=(null===(o=null==n?void 0:n.settings)||void 0===o?void 0:o.unit_of_measurement)&&(n.settings=Object.assign({},n.settings),delete n.settings.unit_of_measurement);t[i]=n;break}case"main":void 0!==n.display_mode&&void 0!==n.show_needle&&(delete(n=Object.assign({},n)).show_needle,t[i]=n)}break;case"main":"needle"===i&&((null==n?void 0:n.needle_icon_background_color_enabled)||delete(n=Object.assign({},n)).needle_icon_background_color,t[i]=n)}return t}listElementAdded(e,t){let i=t;if("segment_list"===e&&(null==t.settings||null==t.segment_color)){const e=getComputedStyle(this).getPropertyValue("--accent-color").trim();i=Object.assign({},t),i.settings?i.settings=Object.assign({},i.settings):i.settings={},i.settings.segment_color=ve(e)}return i}validateForm(e,t,i){switch(t._errors={},e){case"":if("main"===t.name&&(null==i?void 0:i.min_value)>(null==i?void 0:i.max_value))return t._errors={base:"value_lower_greater_than_upper"},!1;break;case"segment_list":if("settings"===t.name&&(null==i?void 0:i.segment_lower)>(null==i?void 0:i.segment_upper))return t._errors={base:"range_lower_greater_than_upper"},!1}return!0}};bi=e([ue("extended-gauge-ui-editor")],bi);var wi=Object.freeze({__proto__:null,get ExtendedGaugeUiEditor(){return bi}});export{xt as ExtendedGaugeCard};
//# sourceMappingURL=extended-gauge.js.map
