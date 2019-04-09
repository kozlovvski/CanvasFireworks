!function(t){var e={};function i(r){if(e[r])return e[r].exports;var n=e[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(r,n,function(e){return t[e]}.bind(null,n));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=1)}([function(t,e,i){},function(t,e,i){"use strict";i.r(e),document.getElementById("particle-count").addEventListener("input",function(){var t=document.getElementById("particle-count");!function(t){document.querySelector("output[for=".concat(t.id,"]")).value=t.value}(t),particleCount=t.value});var r=function(t,e){return Math.random()*(e-t)+t},n=new Set,o=6,a=new Set,s=new Set,c={current:40,random:35,total:40,batch:1,reset:function(){c.current=r(0,c.random)}},u=.05,h={length:10,width:2},l={x:void 0,y:void 0,update:function(){l.x=f.width/2,l.y=f.height}},d={x1:void 0,x2:void 0,y1:void 0,y2:void 0,update:function(){d.x1=.25*f.width,d.x2=.75*f.width,d.y1=.25*f.height,d.y2=.5*f.height}},f=document.querySelector(".canvas-fireworks"),y=f.getContext("2d"),v=function(){f.width=window.innerWidth,f.height=window.innerHeight,l.update(),d.update()},p=function(){y.clearRect(0,0,f.width,f.height),y.globalCompositeOperation="lighter"};function g(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var w=function(){function t(e,i,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.coords={current:{x:e,y:i},previous:new Array(o).fill({x:e,y:i})},this.angle=r(0,2*Math.PI),this.velocity=r(0,10),this.hue=n+r(-10,10),this.brightness=r(65,75),this.opacity=1,this.fade=r(.01,.03)}var e,i,n;return e=t,(i=[{key:"update",value:function(){this.coords.previous.shift(),this.coords.previous.push([this.coords.current.x,this.coords.current.y]),this.velocity*=.95,this.coords.current.x+=Math.cos(this.angle)*this.velocity,this.coords.current.y+=Math.sin(this.angle)*this.velocity+10*u,this.opacity-=this.fade}},{key:"draw",value:function(){y.beginPath(),y.lineWidth=r(2,4),y.moveTo(this.coords.previous[0][0],this.coords.previous[0][1]),y.lineTo(this.coords.current.x,this.coords.current.y),y.strokeStyle="hsla(".concat(this.hue,", 100%, ").concat(this.brightness,"%, ").concat(this.opacity,")"),y.stroke()}},{key:"disappeared",get:function(){return this.opacity<this.fade}}])&&g(e.prototype,i),n&&g(e,n),t}(),m={x:0,y:0,isPressed:!1,limiter:{current:10,target:10,reset:function(){m.limiter.current=0}}};function x(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}f.addEventListener("mousemove",function(t){m.x=t.pageX-f.offsetLeft,m.y=t.pageY-f.offsetTop}),f.addEventListener("mousedown",function(){m.isPressed=!0}),f.addEventListener("mouseup",function(){m.isPressed=!1,m.limiter.current=m.limiter.target});var b=function(){function t(e,i,r,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.coords={current:{x:e,y:i},previous:new Array(h.length).fill({x:e,y:i}),target:{x:r,y:n}},this.velocity={y:Math.sqrt(2*u*(i-n)),x:(r-e)*u/Math.sqrt(2*u*(i-n))},this.time={inAir:0,toTravel:this.velocity.y/u},this.ring={hue:0,angle:0,sector:4*Math.PI/3}}var e,i,o;return e=t,(i=[{key:"update",value:function(){this.time.inAir++,this.coords.previous.push({x:this.coords.current.x,y:this.coords.current.y}),this.coords.previous.splice(0,1),this.coords.current.x+=this.velocity.x,this.coords.current.y-=this.velocity.y,this.velocity.y-=u,this.ring.hue+=2,this.ring.angle+=.04}},{key:"draw",value:function(){this.drawTrail(),this.drawRing()}},{key:"drawTrail",value:function(){y.beginPath(),y.moveTo(this.coords.current.x,this.coords.current.y);for(var t=this.coords.previous.length-1;t>0;t--){var e=this.coords.previous[t];y.lineTo(e.x,e.y),y.lineWidth=h.width;var i=t/h.length;y.strokeStyle="hsla(40, 100%, 80%, ".concat(100*i,"%)"),y.stroke(),1!=t&&(y.beginPath(),y.moveTo(e.x,e.y))}}},{key:"drawRing",value:function(){y.beginPath(),y.arc(this.coords.target.x,this.coords.target.y,8,this.ring.angle,this.ring.angle+4*Math.PI/3);var t=1;this.time.toTravel-this.time.inAir<40&&(t=(this.time.toTravel-this.time.inAir)/40),y.strokeStyle="hsla(".concat(this.ring.hue,", 100%, 10%, ").concat(t,")"),y.stroke()}},{key:"explode",value:function(){for(var t=r(0,360),e=0;e<200;e++)n.add(new w(this.coords.target.x,this.coords.target.y,t));a.delete(this)}},{key:"reachedTarget",get:function(){return this.time.inAir>=this.time.toTravel}}])&&x(e.prototype,i),o&&x(e,o),t}(),k=function(){if(c.current++,c.current>=c.total){for(var t=0;t<c.batch;t++){var e={x:r(d.x1,d.x2),y:r(d.y1,d.y2)};a.add(new b(l.x,l.y,e.x,e.y))}c.reset()}},P=function(){m.limiter.current>=m.limiter.target?(a.add(new b(l.x,l.y,m.x,m.y)),m.limiter.reset()):m.limiter.current++};function T(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var M=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.coords={x:Math.floor(r(0,f.width)),y:Math.floor(r(0,f.height))},this.size=Math.ceil(r(0,2)),this.life={current:0,target:Math.floor(r(150,300))},this.opacity=0}var e,i,n;return e=t,(i=[{key:"update",value:function(){this.life.current++,this.life.current<50?this.opacity=this.life.current/50:this.life.current>this.life.target-50?this.opacity=(this.life.target-this.life.current)/50:this.opacity=1}},{key:"draw",value:function(){y.beginPath(),y.arc(this.coords.x,this.coords.y,this.size,0,2*Math.PI),y.fillStyle="hsla(60, 100%, 20%, ".concat(this.opacity),y.fill()}},{key:"disappeared",get:function(){return this.opacity<0}}])&&T(e.prototype,i),n&&T(e,n),t}();i(0);function S(){k(),p(),a.forEach(function(t){t.reachedTarget?t.explode():(t.update(),t.draw())}),n.forEach(function(t){t.disappeared?n.delete(t):(t.update(),t.draw())}),s.forEach(function(t){t.disappeared?(s.delete(t),s.add(new M)):(t.update(),t.draw())}),m.isPressed&&P(),window.requestAnimationFrame(S)}window.onload=function(){v(),function(){for(var t=0;t<100;t++)s.add(new M)}(),S()},window.addEventListener("resize",function(){v(),l.update()})}]);