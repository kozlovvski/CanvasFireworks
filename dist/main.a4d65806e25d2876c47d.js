!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=61)}([function(t,e,r){"use strict";r.d(e,"a",function(){return o}),r.d(e,"c",function(){return i}),r.d(e,"d",function(){return a}),r.d(e,"b",function(){return c});var n=r(1);const o=document.querySelector(".canvas-fireworks"),i=o.getContext("2d"),a=()=>{o.width=window.innerWidth,o.height=window.innerHeight,n.a.launchPosition.update(),n.a.targetRectangle.update()},c=()=>{i.clearRect(0,0,o.width,o.height),i.globalCompositeOperation="lighter"}},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",function(){return controller}),__webpack_require__.d(__webpack_exports__,"b",function(){return initializeInputs});var _canvas__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),_utilityFunctions__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(2),lodash_set__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(14),lodash_set__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(lodash_set__WEBPACK_IMPORTED_MODULE_2__);const controller={particle:{list:new Set,count:200,length:6},firework:{list:new Set,timer:{current:40,random:35,total:40,batch:1,reset:()=>(controller.firework.timer.current=Object(_utilityFunctions__WEBPACK_IMPORTED_MODULE_1__.a)(0,controller.firework.timer.random),controller.firework.timer)}},star:{list:new Set,count:100},gravity:.05,trail:{length:10,width:2},launchPosition:{x:void 0,y:void 0,update:()=>(controller.launchPosition.x=_canvas__WEBPACK_IMPORTED_MODULE_0__.a.width/2,controller.launchPosition.y=_canvas__WEBPACK_IMPORTED_MODULE_0__.a.height,controller.launchPosition)},targetRectangle:{x1:void 0,x2:void 0,y1:void 0,y2:void 0,update:()=>(controller.targetRectangle.x1=.25*_canvas__WEBPACK_IMPORTED_MODULE_0__.a.width,controller.targetRectangle.x2=.75*_canvas__WEBPACK_IMPORTED_MODULE_0__.a.width,controller.targetRectangle.y1=.25*_canvas__WEBPACK_IMPORTED_MODULE_0__.a.height,controller.targetRectangle.y2=.5*_canvas__WEBPACK_IMPORTED_MODULE_0__.a.height,controller.targetRectangle)}};function updateOutput(t){document.querySelector(`output[for=${t.id}]`).value=t.value}function initializeInputs(){document.querySelectorAll(".controller__input").forEach(input=>{const variablePath=input.id.replace(/-/g,".");input.value=eval(`controller.${variablePath}`),updateOutput(input)})}document.querySelectorAll(".controller__input").forEach(t=>{t.addEventListener("input",()=>{const e=t.id.replace(/-/g,".");lodash_set__WEBPACK_IMPORTED_MODULE_2___default()(controller,e,parseFloat(t.value)),updateOutput(t)})})},function(t,e,r){"use strict";r.d(e,"a",function(){return n});const n=(t,e)=>Math.random()*(e-t)+t},function(t,e,r){var n=r(6)(Object,"create");t.exports=n},function(t,e,r){var n=r(13);t.exports=function(t,e){for(var r=t.length;r--;)if(n(t[r][0],e))return r;return-1}},function(t,e,r){var n=r(51);t.exports=function(t,e){var r=t.__data__;return n(e)?r["string"==typeof e?"string":"hash"]:r.map}},function(t,e,r){var n=r(19),o=r(28);t.exports=function(t,e){var r=o(t,e);return n(r)?r:void 0}},function(t,e,r){var n=r(8).Symbol;t.exports=n},function(t,e,r){var n=r(21),o="object"==typeof self&&self&&self.Object===Object&&self,i=n||o||Function("return this")();t.exports=i},function(t,e){t.exports=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}},function(t,e){var r=Array.isArray;t.exports=r},function(t,e,r){var n=r(12),o=r(31),i="[object Symbol]";t.exports=function(t){return"symbol"==typeof t||o(t)&&n(t)==i}},function(t,e,r){var n=r(7),o=r(23),i=r(24),a="[object Null]",c="[object Undefined]",s=n?n.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?c:a:s&&s in Object(t)?o(t):i(t)}},function(t,e){t.exports=function(t,e){return t===e||t!=t&&e!=e}},function(t,e,r){var n=r(15);t.exports=function(t,e,r){return null==t?t:n(t,e,r)}},function(t,e,r){var n=r(16),o=r(29),i=r(58),a=r(9),c=r(59);t.exports=function(t,e,r,s){if(!a(t))return t;for(var u=-1,l=(e=o(e,t)).length,h=l-1,p=t;null!=p&&++u<l;){var f=c(e[u]),_=r;if(u!=h){var d=p[f];void 0===(_=s?s(d,f,p):void 0)&&(_=a(d)?d:i(e[u+1])?[]:{})}n(p,f,_),p=p[f]}return t}},function(t,e,r){var n=r(17),o=r(13),i=Object.prototype.hasOwnProperty;t.exports=function(t,e,r){var a=t[e];i.call(t,e)&&o(a,r)&&(void 0!==r||e in t)||n(t,e,r)}},function(t,e,r){var n=r(18);t.exports=function(t,e,r){"__proto__"==e&&n?n(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}},function(t,e,r){var n=r(6),o=function(){try{var t=n(Object,"defineProperty");return t({},"",{}),t}catch(t){}}();t.exports=o},function(t,e,r){var n=r(20),o=r(25),i=r(9),a=r(27),c=/^\[object .+?Constructor\]$/,s=Function.prototype,u=Object.prototype,l=s.toString,h=u.hasOwnProperty,p=RegExp("^"+l.call(h).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");t.exports=function(t){return!(!i(t)||o(t))&&(n(t)?p:c).test(a(t))}},function(t,e,r){var n=r(12),o=r(9),i="[object AsyncFunction]",a="[object Function]",c="[object GeneratorFunction]",s="[object Proxy]";t.exports=function(t){if(!o(t))return!1;var e=n(t);return e==a||e==c||e==i||e==s}},function(t,e,r){(function(e){var r="object"==typeof e&&e&&e.Object===Object&&e;t.exports=r}).call(this,r(22))},function(t,e){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(t){"object"==typeof window&&(r=window)}t.exports=r},function(t,e,r){var n=r(7),o=Object.prototype,i=o.hasOwnProperty,a=o.toString,c=n?n.toStringTag:void 0;t.exports=function(t){var e=i.call(t,c),r=t[c];try{t[c]=void 0;var n=!0}catch(t){}var o=a.call(t);return n&&(e?t[c]=r:delete t[c]),o}},function(t,e){var r=Object.prototype.toString;t.exports=function(t){return r.call(t)}},function(t,e,r){var n,o=r(26),i=(n=/[^.]+$/.exec(o&&o.keys&&o.keys.IE_PROTO||""))?"Symbol(src)_1."+n:"";t.exports=function(t){return!!i&&i in t}},function(t,e,r){var n=r(8)["__core-js_shared__"];t.exports=n},function(t,e){var r=Function.prototype.toString;t.exports=function(t){if(null!=t){try{return r.call(t)}catch(t){}try{return t+""}catch(t){}}return""}},function(t,e){t.exports=function(t,e){return null==t?void 0:t[e]}},function(t,e,r){var n=r(10),o=r(30),i=r(32),a=r(55);t.exports=function(t,e){return n(t)?t:o(t,e)?[t]:i(a(t))}},function(t,e,r){var n=r(10),o=r(11),i=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,a=/^\w*$/;t.exports=function(t,e){if(n(t))return!1;var r=typeof t;return!("number"!=r&&"symbol"!=r&&"boolean"!=r&&null!=t&&!o(t))||a.test(t)||!i.test(t)||null!=e&&t in Object(e)}},function(t,e){t.exports=function(t){return null!=t&&"object"==typeof t}},function(t,e,r){var n=r(33),o=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,i=/\\(\\)?/g,a=n(function(t){var e=[];return 46===t.charCodeAt(0)&&e.push(""),t.replace(o,function(t,r,n,o){e.push(n?o.replace(i,"$1"):r||t)}),e});t.exports=a},function(t,e,r){var n=r(34),o=500;t.exports=function(t){var e=n(t,function(t){return r.size===o&&r.clear(),t}),r=e.cache;return e}},function(t,e,r){var n=r(35),o="Expected a function";function i(t,e){if("function"!=typeof t||null!=e&&"function"!=typeof e)throw new TypeError(o);var r=function(){var n=arguments,o=e?e.apply(this,n):n[0],i=r.cache;if(i.has(o))return i.get(o);var a=t.apply(this,n);return r.cache=i.set(o,a)||i,a};return r.cache=new(i.Cache||n),r}i.Cache=n,t.exports=i},function(t,e,r){var n=r(36),o=r(50),i=r(52),a=r(53),c=r(54);function s(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}s.prototype.clear=n,s.prototype.delete=o,s.prototype.get=i,s.prototype.has=a,s.prototype.set=c,t.exports=s},function(t,e,r){var n=r(37),o=r(43),i=r(49);t.exports=function(){this.size=0,this.__data__={hash:new n,map:new(i||o),string:new n}}},function(t,e,r){var n=r(38),o=r(39),i=r(40),a=r(41),c=r(42);function s(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}s.prototype.clear=n,s.prototype.delete=o,s.prototype.get=i,s.prototype.has=a,s.prototype.set=c,t.exports=s},function(t,e,r){var n=r(3);t.exports=function(){this.__data__=n?n(null):{},this.size=0}},function(t,e){t.exports=function(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}},function(t,e,r){var n=r(3),o="__lodash_hash_undefined__",i=Object.prototype.hasOwnProperty;t.exports=function(t){var e=this.__data__;if(n){var r=e[t];return r===o?void 0:r}return i.call(e,t)?e[t]:void 0}},function(t,e,r){var n=r(3),o=Object.prototype.hasOwnProperty;t.exports=function(t){var e=this.__data__;return n?void 0!==e[t]:o.call(e,t)}},function(t,e,r){var n=r(3),o="__lodash_hash_undefined__";t.exports=function(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=n&&void 0===e?o:e,this}},function(t,e,r){var n=r(44),o=r(45),i=r(46),a=r(47),c=r(48);function s(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}s.prototype.clear=n,s.prototype.delete=o,s.prototype.get=i,s.prototype.has=a,s.prototype.set=c,t.exports=s},function(t,e){t.exports=function(){this.__data__=[],this.size=0}},function(t,e,r){var n=r(4),o=Array.prototype.splice;t.exports=function(t){var e=this.__data__,r=n(e,t);return!(r<0||(r==e.length-1?e.pop():o.call(e,r,1),--this.size,0))}},function(t,e,r){var n=r(4);t.exports=function(t){var e=this.__data__,r=n(e,t);return r<0?void 0:e[r][1]}},function(t,e,r){var n=r(4);t.exports=function(t){return n(this.__data__,t)>-1}},function(t,e,r){var n=r(4);t.exports=function(t,e){var r=this.__data__,o=n(r,t);return o<0?(++this.size,r.push([t,e])):r[o][1]=e,this}},function(t,e,r){var n=r(6)(r(8),"Map");t.exports=n},function(t,e,r){var n=r(5);t.exports=function(t){var e=n(this,t).delete(t);return this.size-=e?1:0,e}},function(t,e){t.exports=function(t){var e=typeof t;return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t}},function(t,e,r){var n=r(5);t.exports=function(t){return n(this,t).get(t)}},function(t,e,r){var n=r(5);t.exports=function(t){return n(this,t).has(t)}},function(t,e,r){var n=r(5);t.exports=function(t,e){var r=n(this,t),o=r.size;return r.set(t,e),this.size+=r.size==o?0:1,this}},function(t,e,r){var n=r(56);t.exports=function(t){return null==t?"":n(t)}},function(t,e,r){var n=r(7),o=r(57),i=r(10),a=r(11),c=1/0,s=n?n.prototype:void 0,u=s?s.toString:void 0;t.exports=function t(e){if("string"==typeof e)return e;if(i(e))return o(e,t)+"";if(a(e))return u?u.call(e):"";var r=e+"";return"0"==r&&1/e==-c?"-0":r}},function(t,e){t.exports=function(t,e){for(var r=-1,n=null==t?0:t.length,o=Array(n);++r<n;)o[r]=e(t[r],r,t);return o}},function(t,e){var r=9007199254740991,n=/^(?:0|[1-9]\d*)$/;t.exports=function(t,e){var o=typeof t;return!!(e=null==e?r:e)&&("number"==o||"symbol"!=o&&n.test(t))&&t>-1&&t%1==0&&t<e}},function(t,e,r){var n=r(11),o=1/0;t.exports=function(t){if("string"==typeof t||n(t))return t;var e=t+"";return"0"==e&&1/t==-o?"-0":e}},function(t,e,r){},function(t,e,r){"use strict";r.r(e);var n=r(0),o=r(1),i=r(2);class a{constructor(t,e,r){this.coords={current:{x:t,y:e},previous:new Array(o.a.particle.length).fill({x:t,y:e})},this.angle=Object(i.a)(0,2*Math.PI),this.velocity=Object(i.a)(0,10),this.hue=r+Object(i.a)(-10,10),this.brightness=Object(i.a)(65,75),this.opacity=1,this.fade=Object(i.a)(.01,.03)}update(){return this.coords.previous.shift(),this.coords.previous.push([this.coords.current.x,this.coords.current.y]),this.velocity*=.95,this.coords.current.x+=Math.cos(this.angle)*this.velocity,this.coords.current.y+=Math.sin(this.angle)*this.velocity+10*o.a.gravity,this.opacity-=this.fade,this}draw(){return n.c.beginPath(),n.c.lineWidth=Object(i.a)(2,4),n.c.moveTo(this.coords.previous[0][0],this.coords.previous[0][1]),n.c.lineTo(this.coords.current.x,this.coords.current.y),n.c.strokeStyle=`hsla(${this.hue}, 100%, ${this.brightness}%, ${this.opacity})`,n.c.stroke(),this}get disappeared(){return this.opacity<this.fade}}const c={x:0,y:0,isPressed:!1,limiter:{current:10,target:10,reset:()=>{c.limiter.current=0}}};n.a.addEventListener("mousemove",t=>{c.x=t.pageX-n.a.offsetLeft,c.y=t.pageY-n.a.offsetTop}),n.a.addEventListener("mousedown",()=>{c.isPressed=!0}),n.a.addEventListener("mouseup",()=>{c.isPressed=!1,c.limiter.current=c.limiter.target}),n.a.addEventListener("click",function(t){console.log(t)});class s{constructor(t,e,r,n){this.coords={current:{x:t,y:e},previous:new Array(o.a.trail.length).fill({x:t,y:e}),target:{x:r,y:n}},this.velocity={y:Math.sqrt(2*o.a.gravity*(e-n)),x:(r-t)*o.a.gravity/Math.sqrt(2*o.a.gravity*(e-n))},this.time={inAir:0,toTravel:this.velocity.y/o.a.gravity},this.ring={hue:0,angle:0,sector:4*Math.PI/3},this.gravity=o.a.gravity}update(){return this.time.inAir++,this.coords.previous.push({x:this.coords.current.x,y:this.coords.current.y}),this.coords.previous.splice(0,1),this.coords.current.x+=this.velocity.x,this.coords.current.y-=this.velocity.y,this.velocity.y-=this.gravity,this.ring.hue+=2,this.ring.angle+=.04,this}draw(){return this.drawTrail(),this.drawRing(),this}drawTrail(){n.c.beginPath(),n.c.moveTo(this.coords.current.x,this.coords.current.y);for(let t=this.coords.previous.length-1;t>0;t--){const e=this.coords.previous[t];n.c.lineTo(e.x,e.y),n.c.lineWidth=o.a.trail.width;const r=t/o.a.trail.length;n.c.strokeStyle=`hsla(40, 100%, 80%, ${100*r}%)`,n.c.stroke(),1!=t&&(n.c.beginPath(),n.c.moveTo(e.x,e.y))}}drawRing(){n.c.beginPath(),n.c.arc(this.coords.target.x,this.coords.target.y,8,this.ring.angle,this.ring.angle+4*Math.PI/3);let t=1;this.time.toTravel-this.time.inAir<40&&(t=(this.time.toTravel-this.time.inAir)/40),n.c.strokeStyle=`hsla(${this.ring.hue}, 100%, 10%, ${t})`,n.c.lineWidth=2,n.c.stroke()}explode(){const t=Object(i.a)(0,360);for(let e=0;e<o.a.particle.count;e++)o.a.particle.list.add(new a(this.coords.target.x,this.coords.target.y,t));o.a.firework.list.delete(this)}get reachedTarget(){return this.time.inAir>=this.time.toTravel}}const u=()=>{if(o.a.firework.timer.current++,o.a.firework.timer.current>=o.a.firework.timer.total){for(let t=0;t<o.a.firework.timer.batch;t++){const t={x:Object(i.a)(o.a.targetRectangle.x1,o.a.targetRectangle.x2),y:Object(i.a)(o.a.targetRectangle.y1,o.a.targetRectangle.y2)};o.a.firework.list.add(new s(o.a.launchPosition.x,o.a.launchPosition.y,t.x,t.y))}o.a.firework.timer.reset()}},l=()=>{c.limiter.current>=c.limiter.target?(o.a.firework.list.add(new s(o.a.launchPosition.x,o.a.launchPosition.y,c.x,c.y)),c.limiter.reset()):c.limiter.current++};class h{constructor(){this.coords={x:Math.floor(Object(i.a)(0,n.a.width)),y:Math.floor(Object(i.a)(0,n.a.height))},this.size=Math.ceil(Object(i.a)(0,2)),this.life={current:0,target:Math.floor(Object(i.a)(150,300))},this.opacity=0}update(){return this.life.current++,this.life.current<50?this.opacity=this.life.current/50:this.life.current>this.life.target-50?this.opacity=(this.life.target-this.life.current)/50:this.opacity=1,this}draw(){return n.c.beginPath(),n.c.arc(this.coords.x,this.coords.y,this.size,0,2*Math.PI),n.c.fillStyle=`hsla(60, 100%, 20%, ${this.opacity}`,n.c.fill(),this}get disappeared(){return this.opacity<0}}const p=()=>{for(;o.a.star.list.size<o.a.star.count;)o.a.star.list.add(new h)};r(60);function f(){u(),Object(n.b)(),o.a.firework.list.forEach(t=>{t.reachedTarget?t.explode():t.update().draw()}),o.a.particle.list.forEach(t=>{t.disappeared?o.a.particle.list.delete(t):t.update().draw()}),o.a.star.list.forEach(t=>{t.disappeared?o.a.star.list.delete(t):t.update().draw()}),p(),c.isPressed&&l(),window.requestAnimationFrame(f)}window.onload=()=>{Object(n.d)(),p(),Object(o.b)(),f()},window.addEventListener("resize",()=>{Object(n.d)(),o.a.launchPosition.update()})}]);