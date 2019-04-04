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

eval("// canvas setup\nvar canvas = document.querySelector('.canvas-fireworks'),\n    ctx = canvas.getContext('2d');\n\nfunction setupCanvas() {\n  canvas.width = window.innerWidth;\n  canvas.height = window.innerHeight;\n}\n\nsetupCanvas(); // change size on resize\n\nwindow.addEventListener('resize', function () {\n  setupCanvas();\n  starList = [];\n}); // *** FIREWORKS ***\n// necessary variables\n// arrays for fireworks and its' particles\n\nvar particleList = [],\n    fireworkList = []; // timer for loop\n\nvar timer = {\n  count: 70,\n  total: 70\n}; // limiter for mouse-clicked fireworks\n\nvar limiter = {\n  count: 0,\n  total: 10\n}; // gravitational acceleration\n\nvar gravity = 0.08; // mouse info for click event\n\nvar mouse = {\n  x: 0,\n  y: 0,\n  isPressed: false\n}; // necessary functions\n// calculate random value from range\n\nfunction random(from, to) {\n  return Math.random() * (to - from) + from;\n} // create the explosion\n\n\nfunction createParticles(startX, startY) {\n  var particleCount = 150,\n      givenHue = random(0, 360);\n\n  for (var i = 0; i < particleCount; i++) {\n    particleList.push(new Particle(startX, startY, givenHue));\n  }\n} // create the firework\n\n\nfunction Firework(startX, startY, targetX, targetY) {\n  this.coords = {\n    start: {\n      x: startX,\n      y: startY\n    },\n    current: {\n      x: startX,\n      y: startY\n    },\n    previous: [],\n    previousCount: Math.floor(random(3, 8)),\n    // increase for longer trail\n    target: {\n      x: targetX,\n      y: targetY\n    }\n  }; // v0.2 - parabolic trajectory\n  // by knowing gravitational acceleration, starting and target point,\n  // we can calculate initial velocity and travel time for the projectile in the gravitational field\n  // v0 = at\n  // h = v0t - at^2/2\n  // therefore v0 = sqrt(2ah) (as far as y-axis velocity is concerned)\n  // projectile will reach target height when it's y-axis velocity reaches 0\n  // then it also should reach it's x-axis destination - in the same time, so:\n  // s = u0t => u0 = s / t (we know both distance to travel and time in which this must be done)\n  // we will use these formulas to calculate initial velocity\n\n  this.launchVelocity = {\n    // v0 = sqrt(2ah)\n    y: Math.sqrt(2 * gravity * Math.abs(targetY - startY)),\n    // time: t = v0 / a, so: u0 = s / (v0 / a)\n    x: (targetX - startX) * gravity / Math.sqrt(2 * gravity * Math.abs(targetY - startY))\n  };\n  this.time = {\n    traveling: 0,\n    max: this.launchVelocity.y / gravity\n  };\n  this.ring = {\n    hue: 0,\n    angle: 0 // fill previous coords array with starting coords\n\n  };\n\n  while (this.coords.previousCount--) {\n    this.coords.previous.push([this.coords.start.x, this.coords.start.y]);\n  }\n\n  ;\n}\n\nFirework.prototype.update = function (index) {\n  // update previous coords array\n  this.coords.previous.shift();\n  this.coords.previous.push([this.coords.current.x, this.coords.current.y]);\n  this.time.traveling++; // check if destination has been reached\n\n  if (this.time.traveling >= this.time.max) {\n    createParticles(this.coords.target.x, this.coords.target.y); // delete this firework from the list\n\n    fireworkList.splice(index, 1);\n  } else {\n    // update coords and velocity\n    // y = y0 - v0t + at^2/2\n    // it's difficult to understand where should be plus and where minus,\n    // because, unlike in physics, the x axis is at the top - not at the bottom\n    this.coords.current.y = this.coords.start.y - this.launchVelocity.y * this.time.traveling + gravity * Math.pow(this.time.traveling, 2) / 2;\n    this.coords.current.x += this.launchVelocity.x;\n    this.ring.hue += 2;\n    this.ring.angle += 0.04;\n  }\n\n  ;\n};\n\nFirework.prototype.draw = function () {\n  // move to the previous position and draw line to the current one\n  ctx.beginPath();\n  ctx.moveTo(this.coords.previous[0][0], this.coords.previous[0][1]);\n  ctx.lineTo(this.coords.current.x, this.coords.current.y);\n  ctx.strokeStyle = 'hsl(40, 100%, 70%)'; // fireworks with longer trail should have also thicker trail\n\n  ctx.lineWidth = this.coords.previous.length / 5;\n  ctx.stroke(); // make ring around the target\n\n  ctx.beginPath();\n  ctx.arc(this.coords.target.x, this.coords.target.y, 8, this.ring.angle, this.ring.angle + Math.PI * 4 / 3); // when firework is near target, ring should slowly disappear\n\n  var opacity = this.time.max - this.time.traveling > 40 ? 10 : (this.time.max - this.time.traveling) * 0.25;\n  ctx.strokeStyle = \"hsl(\".concat(this.ring.hue, \", 100%, \").concat(opacity, \"%)\");\n  ctx.stroke();\n}; // create the particle \n\n\nfunction Particle(startX, startY, givenHue) {\n  this.coords = {\n    current: {\n      x: startX,\n      y: startY\n    },\n    previous: [],\n    // for the trail effect\n    previousCount: 5 // increase for stronger effect\n    // fill with starting values\n\n  };\n\n  while (this.coords.previousCount--) {\n    this.coords.previous.push({\n      x: startX,\n      y: startY\n    });\n  } // set random angle and velocity\n\n\n  this.angle = random(0, Math.PI * 2);\n  this.velocity = random(0, 10); // set slightly different hue for all particles in the same firework\n\n  this.hue = givenHue + random(-10, 10);\n  this.brightness = random(55, 65);\n  this.alpha = 1; // set how fast particle disappears\n\n  this.fade = random(0.015, 0.03);\n}\n\nParticle.prototype.update = function (index) {\n  // remove last coords and push new ones\n  this.coords.previous.shift();\n  this.coords.previous.push([this.coords.current.x, this.coords.current.y]); // slow down the particle\n\n  this.velocity *= 0.95; // change coords\n\n  this.coords.current.x += Math.cos(this.angle) * this.velocity;\n  this.coords.current.y += Math.sin(this.angle) * this.velocity + gravity * 10; // change opacity\n\n  this.alpha -= this.fade; // remove invisible particles to prevent performance issues\n\n  if (this.alpha < this.fade) {\n    particleList.splice(index, 1);\n  }\n};\n\nParticle.prototype.draw = function () {\n  // move to the previous position and draw line to the current one\n  ctx.beginPath();\n  ctx.lineWidth = random(1, 3);\n  ctx.moveTo(this.coords.previous[0][0], this.coords.previous[0][1]);\n  ctx.lineTo(this.coords.current.x, this.coords.current.y);\n  ctx.strokeStyle = \"hsla(\".concat(this.hue, \", 100%, \").concat(this.brightness, \"%, \").concat(this.alpha, \")\");\n  ctx.stroke();\n}; // *** STARS ***\n// necessary variables\n// array for stars\n\n\nvar starList = []; // number of stars on screen at the same time\n\nvar starCount = 100;\n\nfunction Star(maxX, maxY) {\n  this.coords = {\n    x: Math.floor(random(0, maxX)),\n    y: Math.floor(random(0, maxY))\n  };\n  this.size = Math.ceil(random(0, 2));\n  this.life = {\n    current: 0,\n    target: Math.floor(random(150, 300))\n  };\n  this.alpha = 0;\n}\n\nStar.prototype.update = function (index) {\n  // v0.2.1 - smooth shining\n  // star's opacity should slowly increase to 1 at the first half of it's lifespan and then decrease\n  // we will create parabola formula for calculating opacity\n  // zeros of it are at 0 and max lifespan, so from intercept form: y = a(x - x1)(x - x2):\n  // opacity = at(t - max) where t is current time and max is maximum lifespan\n  // at half of lifespan opacity should be 1 -> half of the lifespan is max / 2\n  // 1 = a * max / 2 * (max / 2 - max)\n  // 1 = - a * max / 2 * max / 2\n  // 4 = - a * max ^ 2 \n  // a = - 4 / max ^ 2 \n  // so our opacity formula is: opacity = -4t(t - max) / max ^ 2\n  // now for any maximum lifespan, maximum opacity is 1\n  this.alpha = -4 * this.life.current * (this.life.current - this.life.target) / Math.pow(this.life.target, 2); // if alpha is negative, remove star from the list\n\n  this.alpha < 0 ? starList.splice(index, 1) : this.life.current++;\n};\n\nStar.prototype.draw = function () {\n  // draw stars as circles\n  ctx.beginPath();\n  ctx.arc(this.coords.x, this.coords.y, this.size, 0, 2 * Math.PI);\n  ctx.fillStyle = \"hsla(60, 100%, 70%, \".concat(this.alpha * 0.08);\n  ctx.fill();\n}; // app loop\n\n\nfunction loop() {\n  window.requestAnimationFrame(loop); // clearing canvas at desired opacity\n\n  ctx.globalCompositeOperation = 'destination-out';\n  ctx.fillStyle = \"rgba(0, 0, 0, 0.3)\";\n  ctx.fillRect(0, 0, canvas.width, canvas.height); // make particles overlap each other\n\n  ctx.globalCompositeOperation = \"lighter\"; // draw and update everything\n\n  var i = fireworkList.length;\n\n  while (i--) {\n    fireworkList[i].draw();\n    fireworkList[i].update(i);\n  }\n\n  i = particleList.length;\n\n  while (i--) {\n    particleList[i].draw();\n    particleList[i].update(i);\n  }\n\n  i = starList.length;\n\n  while (i--) {\n    starList[i].draw();\n    starList[i].update(i);\n  } // create new stars if there are less of them than desired number\n\n\n  while (starList.length < starCount) {\n    starList.push(new Star(canvas.width, canvas.height));\n  } // make random fireworks\n\n\n  if (timer.count >= timer.total) {\n    // set launch place\n    var startX = canvas.width / 2,\n        startY = canvas.height; // set boundaries for explosion place\n\n    var finishX = startX + random(-canvas.width / 4, canvas.width / 4),\n        finishY = random(canvas.height / 8, canvas.height / 3);\n    fireworkList.push(new Firework(startX, startY, finishX, finishY));\n    timer.count = Math.floor(random(0, timer.total * 0.5)); // random time until next launch\n  } else {\n    timer.count++;\n  } // limit mouse-made fireworks number\n\n\n  if (limiter.count >= limiter.total) {\n    if (mouse.isPressed) {\n      fireworkList.push(new Firework(canvas.width / 2, canvas.height, mouse.x, mouse.y));\n      limiter.count = 0;\n    }\n  } else {\n    limiter.count++;\n  }\n} // mouse click events\n\n\ncanvas.addEventListener('mousemove', function (e) {\n  mouse.x = e.pageX - canvas.offsetLeft;\n  mouse.y = e.pageY - canvas.offsetTop;\n});\ncanvas.addEventListener('mousedown', function () {\n  return mouse.isPressed = true;\n});\ncanvas.addEventListener('mouseup', function () {\n  return mouse.isPressed = false;\n}); // CSS linear gradient caused some banding - it isn't smooth,\n// so I've made same gradient in Photoshop with dithering\n// this function loads it in background and sets to body background when loaded\n\nfunction preload() {\n  var gradientImage = new Image();\n  gradientImage.src = 'background.png';\n\n  gradientImage.onload = function () {\n    document.body.className = \"background-loaded\";\n  };\n}\n\n;\n\nwindow.onload = function () {\n  preload();\n  loop();\n}; // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel\n// https://gist.github.com/paulirish/1579671\n\n\n(function () {\n  var lastTime = 0;\n  var vendors = ['ms', 'moz', 'webkit', 'o'];\n\n  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {\n    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];\n    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];\n  }\n\n  if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {\n    var currTime = new Date().getTime();\n    var timeToCall = Math.max(0, 16 - (currTime - lastTime));\n    var id = window.setTimeout(function () {\n      callback(currTime + timeToCall);\n    }, timeToCall);\n    lastTime = currTime + timeToCall;\n    return id;\n  };\n  if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {\n    clearTimeout(id);\n  };\n})();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });