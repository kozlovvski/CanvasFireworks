/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const canvas = document.querySelector('.canvas-fireworks');\r\nconst ctx = canvas.getContext('2d');\r\n\r\nconst setupCanvas = () => {\r\n\tcanvas.width = window.innerWidth;\r\n\tcanvas.height = window.innerHeight;\r\n}; setupCanvas();\r\n\r\n// change size on resize\r\nwindow.addEventListener('resize', () => {\r\n\tsetupCanvas();\r\n\tstarList = [];\r\n});\r\n\r\n// *** FIREWORKS ***\r\n\r\n// necessary variables\r\n// arrays for fireworks and its' particles\r\nvar particleList = [],\r\n\tfireworkList = [];\r\n// timer for loop\r\nvar timer = {\r\n\tcount: 70,\r\n\ttotal: 70\r\n};\r\n// limiter for mouse-clicked fireworks\r\nvar limiter = {\r\n\tcount: 0,\r\n\ttotal: 10\r\n};\r\n// gravitational acceleration\r\nconst gravity = 0.08;\r\n// mouse info for click event\r\nvar mouse = {\r\n\tx: 0,\r\n\ty: 0,\r\n\tisPressed: false\r\n};\r\n\r\n// necessary functions\r\n// calculate random value from range\r\nfunction random(from, to) {\r\n\treturn Math.random() * (to - from) + from;\r\n}\r\n\r\n// create the explosion\r\nfunction createParticles(startX, startY) {\r\n\tconst particleCount = 150,\r\n\t\tgivenHue = random(0, 360);\r\n\tfor (var i = 0; i < particleCount; i++) {\r\n\t\tparticleList.push(new Particle(startX, startY, givenHue));\r\n\t}\r\n}\r\n\r\n// create the firework\r\nfunction Firework(startX, startY, targetX, targetY) {\r\n\tthis.coords = {\r\n\t\tstart: {\r\n\t\t\tx: startX,\r\n\t\t\ty: startY\r\n\t\t},\r\n\t\tcurrent: {\r\n\t\t\tx: startX,\r\n\t\t\ty: startY\r\n\t\t},\r\n\t\tprevious: [],\r\n\t\tpreviousCount: Math.floor(random(3, 8)), // increase for longer trail\r\n\t\ttarget: {\r\n\t\t\tx: targetX,\r\n\t\t\ty: targetY\r\n\t\t}\r\n\t};\r\n\r\n\t// v0.2 - parabolic trajectory\r\n\t// by knowing gravitational acceleration, starting and target point,\r\n\t// we can calculate initial velocity and travel time for the projectile in the gravitational field\r\n\t// v0 = at\r\n\t// h = v0t - at^2/2\r\n\t// therefore v0 = sqrt(2ah) (as far as y-axis velocity is concerned)\r\n\t// projectile will reach target height when it's y-axis velocity reaches 0\r\n\t// then it also should reach it's x-axis destination - in the same time, so:\r\n\t// s = u0t => u0 = s / t (we know both distance to travel and time in which this must be done)\r\n\t// we will use these formulas to calculate initial velocity\r\n\tthis.launchVelocity = {\r\n\t\t// v0 = sqrt(2ah)\r\n\t\ty: Math.sqrt(2 * gravity * Math.abs(targetY - startY)),\r\n\t\t// time: t = v0 / a, so: u0 = s / (v0 / a)\r\n\t\tx: (targetX - startX) * gravity / Math.sqrt(2 * gravity * Math.abs(targetY - startY))\r\n\t};\r\n\tthis.time = {\r\n\t\ttraveling: 0,\r\n\t\tmax: this.launchVelocity.y / gravity\r\n\t};\r\n\tthis.ring = {\r\n\t\thue: 0,\r\n\t\tangle: 0\r\n\t}\r\n\r\n\t// fill previous coords array with starting coords\r\n\twhile (this.coords.previousCount--) {\r\n\t\tthis.coords.previous.push([this.coords.start.x, this.coords.start.y]);\r\n\t};\r\n}\r\n\r\nFirework.prototype.update = function (index) {\r\n\t// update previous coords array\r\n\tthis.coords.previous.shift();\r\n\tthis.coords.previous.push([this.coords.current.x, this.coords.current.y]);\r\n\tthis.time.traveling++;\r\n\r\n\t// check if destination has been reached\r\n\tif (this.time.traveling >= this.time.max) {\r\n\t\tcreateParticles(this.coords.target.x, this.coords.target.y);\r\n\r\n\t\t// delete this firework from the list\r\n\t\tfireworkList.splice(index, 1);\r\n\t} else {\r\n\t\t// update coords and velocity\r\n\t\t// y = y0 - v0t + at^2/2\r\n\t\t// it's difficult to understand where should be plus and where minus,\r\n\t\t// because, unlike in physics, the x axis is at the top - not at the bottom\r\n\t\tthis.coords.current.y = this.coords.start.y - this.launchVelocity.y * this.time.traveling + gravity * Math.pow(this.time.traveling, 2) / 2;\r\n\t\tthis.coords.current.x += this.launchVelocity.x;\r\n\r\n\t\tthis.ring.hue += 2;\r\n\t\tthis.ring.angle += 0.04;\r\n\t};\r\n}\r\n\r\nFirework.prototype.draw = function () {\r\n\t// move to the previous position and draw line to the current one\r\n\tctx.beginPath();\r\n\tctx.moveTo(this.coords.previous[0][0], this.coords.previous[0][1]);\r\n\tctx.lineTo(this.coords.current.x, this.coords.current.y);\r\n\tctx.strokeStyle = 'hsl(40, 100%, 70%)';\r\n\r\n\t// fireworks with longer trail should have also thicker trail\r\n\tctx.lineWidth = this.coords.previous.length / 5;\r\n\tctx.stroke();\r\n\r\n\t// make ring around the target\r\n\tctx.beginPath();\r\n\tctx.arc(this.coords.target.x, this.coords.target.y, 8, this.ring.angle, this.ring.angle + Math.PI * 4 / 3);\r\n\r\n\t// when firework is near target, ring should slowly disappear\r\n\tlet opacity = this.time.max - this.time.traveling > 40 ? 10 : (this.time.max - this.time.traveling) * 0.25;\r\n\tctx.strokeStyle = `hsl(${this.ring.hue}, 100%, ${opacity}%)`;\r\n\tctx.stroke();\r\n\r\n}\r\n\r\n// create the particle \r\nfunction Particle(startX, startY, givenHue) {\r\n\tthis.coords = {\r\n\t\tcurrent: {\r\n\t\t\tx: startX,\r\n\t\t\ty: startY\r\n\t\t},\r\n\t\tprevious: [], // for the trail effect\r\n\t\tpreviousCount: 5 // increase for stronger effect\r\n\t}\r\n\r\n\t// fill with starting values\r\n\twhile (this.coords.previousCount--) {\r\n\t\tthis.coords.previous.push({\r\n\t\t\tx: startX,\r\n\t\t\ty: startY\r\n\t\t});\r\n\t}\r\n\r\n\t// set random angle and velocity\r\n\tthis.angle = random(0, Math.PI * 2);\r\n\tthis.velocity = random(0, 10);\r\n\r\n\t// set slightly different hue for all particles in the same firework\r\n\tthis.hue = givenHue + random(-10, 10);\r\n\tthis.brightness = random(55, 65);\r\n\tthis.alpha = 1;\r\n\r\n\t// set how fast particle disappears\r\n\tthis.fade = random(0.015, 0.03);\r\n}\r\n\r\nParticle.prototype.update = function (index) {\r\n\t// remove last coords and push new ones\r\n\tthis.coords.previous.shift();\r\n\tthis.coords.previous.push([this.coords.current.x, this.coords.current.y]);\r\n\r\n\t// slow down the particle\r\n\tthis.velocity *= 0.95;\r\n\r\n\t// change coords\r\n\tthis.coords.current.x += Math.cos(this.angle) * this.velocity;\r\n\tthis.coords.current.y += Math.sin(this.angle) * this.velocity + gravity * 10;\r\n\r\n\t// change opacity\r\n\tthis.alpha -= this.fade;\r\n\r\n\t// remove invisible particles to prevent performance issues\r\n\tif (this.alpha < this.fade) {\r\n\t\tparticleList.splice(index, 1);\r\n\t}\r\n};\r\n\r\nParticle.prototype.draw = function () {\r\n\t// move to the previous position and draw line to the current one\r\n\tctx.beginPath();\r\n\tctx.lineWidth = random(1, 3);\r\n\tctx.moveTo(this.coords.previous[0][0], this.coords.previous[0][1])\r\n\tctx.lineTo(this.coords.current.x, this.coords.current.y);\r\n\tctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;\r\n\tctx.stroke();\r\n};\r\n\r\n\r\n// *** STARS ***\r\n\r\n// necessary variables\r\n// array for stars\r\nvar starList = [];\r\n// number of stars on screen at the same time\r\nvar starCount = 100;\r\n\r\nfunction Star(maxX, maxY) {\r\n\tthis.coords = {\r\n\t\tx: Math.floor(random(0, maxX)),\r\n\t\ty: Math.floor(random(0, maxY))\r\n\t};\r\n\tthis.size = Math.ceil(random(0, 2));\r\n\tthis.life = {\r\n\t\tcurrent: 0,\r\n\t\ttarget: Math.floor(random(150, 300))\r\n\t};\r\n\tthis.alpha = 0;\r\n}\r\n\r\nStar.prototype.update = function (index) {\r\n\t// v0.2.1 - smooth shining\r\n\t// star's opacity should slowly increase to 1 at the first half of it's lifespan and then decrease\r\n\t// we will create parabola formula for calculating opacity\r\n\t// zeros of it are at 0 and max lifespan, so from intercept form: y = a(x - x1)(x - x2):\r\n\t// opacity = at(t - max) where t is current time and max is maximum lifespan\r\n\t// at half of lifespan opacity should be 1 -> half of the lifespan is max / 2\r\n\t// 1 = a * max / 2 * (max / 2 - max)\r\n\t// 1 = - a * max / 2 * max / 2\r\n\t// 4 = - a * max ^ 2 \r\n\t// a = - 4 / max ^ 2 \r\n\t// so our opacity formula is: opacity = -4t(t - max) / max ^ 2\r\n\t// now for any maximum lifespan, maximum opacity is 1\r\n\tthis.alpha = -4 * this.life.current * (this.life.current - this.life.target) / Math.pow(this.life.target, 2);\r\n\r\n\t// if alpha is negative, remove star from the list\r\n\tthis.alpha < 0 ? starList.splice(index, 1) : this.life.current++;\r\n};\r\n\r\nStar.prototype.draw = function () {\r\n\t// draw stars as circles\r\n\tctx.beginPath();\r\n\tctx.arc(this.coords.x, this.coords.y, this.size, 0, 2 * Math.PI);\r\n\tctx.fillStyle = `hsla(60, 100%, 70%, ${this.alpha * 0.08}`;\r\n\tctx.fill();\r\n};\r\n\r\n// app loop\r\nfunction loop() {\r\n\twindow.requestAnimationFrame(loop);\r\n\r\n\t// clearing canvas at desired opacity\r\n\tctx.globalCompositeOperation = 'destination-out';\r\n\tctx.fillStyle = \"rgba(0, 0, 0, 0.3)\";\r\n\tctx.fillRect(0, 0, canvas.width, canvas.height);\r\n\r\n\t// make particles overlap each other\r\n\tctx.globalCompositeOperation = \"lighter\";\r\n\r\n\t// draw and update everything\r\n\tvar i = fireworkList.length;\r\n\twhile (i--) {\r\n\t\tfireworkList[i].draw();\r\n\t\tfireworkList[i].update(i);\r\n\t}\r\n\ti = particleList.length;\r\n\twhile (i--) {\r\n\t\tparticleList[i].draw();\r\n\t\tparticleList[i].update(i);\r\n\t}\r\n\ti = starList.length;\r\n\twhile (i--) {\r\n\t\tstarList[i].draw();\r\n\t\tstarList[i].update(i);\r\n\t}\r\n\r\n\t// create new stars if there are less of them than desired number\r\n\twhile (starList.length < starCount) {\r\n\t\tstarList.push(new Star(canvas.width, canvas.height));\r\n\t}\r\n\r\n\t// make random fireworks\r\n\tif (timer.count >= timer.total) {\r\n\t\t// set launch place\r\n\t\tvar startX = canvas.width / 2,\r\n\t\t\tstartY = canvas.height;\r\n\r\n\t\t// set boundaries for explosion place\r\n\t\tvar finishX = startX + random(-canvas.width / 4, canvas.width / 4),\r\n\t\t\tfinishY = random(canvas.height / 8, canvas.height / 3);\r\n\r\n\t\tfireworkList.push(new Firework(startX, startY, finishX, finishY));\r\n\t\ttimer.count = Math.floor(random(0, timer.total * 0.5)); // random time until next launch\r\n\t} else {\r\n\t\ttimer.count++;\r\n\t}\r\n\r\n\t// limit mouse-made fireworks number\r\n\tif (limiter.count >= limiter.total) {\r\n\t\tif (mouse.isPressed) {\r\n\t\t\tfireworkList.push(new Firework(canvas.width / 2, canvas.height, mouse.x, mouse.y));\r\n\t\t\tlimiter.count = 0;\r\n\t\t}\r\n\t} else {\r\n\t\tlimiter.count++;\r\n\t}\r\n}\r\n\r\n// mouse click events\r\ncanvas.addEventListener('mousemove', function (e) {\r\n\tmouse.x = e.pageX - canvas.offsetLeft;\r\n\tmouse.y = e.pageY - canvas.offsetTop;\r\n});\r\ncanvas.addEventListener('mousedown', () => mouse.isPressed = true);\r\ncanvas.addEventListener('mouseup', () => mouse.isPressed = false);\r\n\r\n// CSS linear gradient caused some banding - it isn't smooth,\r\n// so I've made same gradient in Photoshop with dithering\r\n// this function loads it in background and sets to body background when loaded\r\nfunction preload() {\r\n\tvar gradientImage = new Image();\r\n\tgradientImage.src = 'background.png';\r\n\tgradientImage.onload = function () {\r\n\t\tdocument.body.className = \"background-loaded\"\r\n\t}\r\n}\r\n\r\nwindow.onload = function () {\r\n\tpreload();\r\n\tloop();\r\n};\r\n\r\n\r\n// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel\r\n// https://gist.github.com/paulirish/1579671\r\n(function () {\r\n\tvar lastTime = 0;\r\n\tvar vendors = ['ms', 'moz', 'webkit', 'o'];\r\n\tfor (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {\r\n\t\twindow.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];\r\n\t\twindow.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||\r\n\t\t\twindow[vendors[x] + 'CancelRequestAnimationFrame'];\r\n\t}\r\n\r\n\tif (!window.requestAnimationFrame)\r\n\t\twindow.requestAnimationFrame = function (callback, element) {\r\n\t\t\tvar currTime = new Date().getTime();\r\n\t\t\tvar timeToCall = Math.max(0, 16 - (currTime - lastTime));\r\n\t\t\tvar id = window.setTimeout(function () {\r\n\t\t\t\t\tcallback(currTime + timeToCall);\r\n\t\t\t\t},\r\n\t\t\t\ttimeToCall);\r\n\t\t\tlastTime = currTime + timeToCall;\r\n\t\t\treturn id;\r\n\t\t};\r\n\r\n\tif (!window.cancelAnimationFrame)\r\n\t\twindow.cancelAnimationFrame = function (id) {\r\n\t\t\tclearTimeout(id);\r\n\t\t};\r\n}());\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });