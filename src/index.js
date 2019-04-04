const canvas = document.querySelector('.canvas-fireworks');
export const ctx = canvas.getContext('2d');

const setupCanvas = () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}; setupCanvas();

// change size on resize
window.addEventListener('resize', () => {
	setupCanvas();
	starList.clear();
});

import {Firework} from './fireworks';

// *** STARS ***

// necessary variables
// array for stars
// number of stars on screen at the same time
var starCount = 100;

class Star {
	constructor(maxX, maxY) {
		this.coords = {
			x: Math.floor(randomBetween(0, maxX)),
			y: Math.floor(randomBetween(0, maxY))
		};
		this.size = Math.ceil(randomBetween(0, 2));
		this.life = {
			current: 0,
			target: Math.floor(randomBetween(150, 300))
		};
		this.alpha = 0;
	}
	update() {
		// v0.2.1 - smooth shining
		// star's opacity should slowly increase to 1 at the first half of it's lifespan and then decrease
		// we will create parabola formula for calculating opacity
		// zeros of it are at 0 and max lifespan, so from intercept form: y = a(x - x1)(x - x2):
		// opacity = at(t - max) where t is current time and max is maximum lifespan
		// at half of lifespan opacity should be 1 -> half of the lifespan is max / 2
		// 1 = a * max / 2 * (max / 2 - max)
		// 1 = - a * max / 2 * max / 2
		// 4 = - a * max ^ 2 
		// a = - 4 / max ^ 2 
		// so our opacity formula is: opacity = -4t(t - max) / max ^ 2
		// now for any maximum lifespan, maximum opacity is 1
		this.alpha = -4 * this.life.current * (this.life.current - this.life.target) / Math.pow(this.life.target, 2);
		// if alpha is negative, remove star from the list
		this.alpha < 0 ? starList.delete(this) : this.life.current++;
	}
	draw() {
		// draw stars as circles
		ctx.beginPath();
		ctx.arc(this.coords.x, this.coords.y, this.size, 0, 2 * Math.PI);
		ctx.fillStyle = `hsla(60, 100%, 70%, ${this.alpha * 0.08}`;
		ctx.fill();
	}
}

import {particleList, fireworkList, starList, timer, limiter, mouse} from "./globalVariables";
import {randomBetween} from './utilityFunctions';

// app loop
function loop() {
	window.requestAnimationFrame(loop);

	// clearing canvas at desired opacity
	ctx.globalCompositeOperation = 'destination-out';
	ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// make particles overlap each other
	ctx.globalCompositeOperation = "lighter";

	// draw and update everything
	fireworkList.forEach(firework => {
		if (firework.reachedTarget) {
			firework.explode();
			fireworkList.delete(firework);
		} else {
			firework.update();
			firework.draw();
		}
	})

	particleList.forEach(particle => {
		particle.update();
		particle.draw();
	})

	starList.forEach(star => {
		star.update();
		star.draw();
	})

	// create new stars if there are less of them than desired number
	while(starList.size < starCount) {
		starList.add(new Star(canvas.width, canvas.height));
	}

	// make random fireworks
	if(timer.count >= timer.total) {
		// set launch place
		var startX = canvas.width / 2,
			startY = canvas.height;

		// set boundaries for explosion place
		var	finishX = startX + randomBetween(-canvas.width / 4, canvas.width / 4),
			finishY = randomBetween(canvas.height / 8, canvas.height / 3);

		fireworkList.add(new Firework(startX, startY, finishX, finishY));
		timer.count = Math.floor(randomBetween(0, timer.total * 0.5)); // random time until next launch
	} else {
		timer.count++;
	}

	// limit mouse-made fireworks number
	if (limiter.count >= limiter.total) {
		if (mouse.isPressed) {
			fireworkList.add(new Firework(canvas.width / 2, canvas.height, mouse.x, mouse.y));
			limiter.count = 0;
		}
	} else {
		limiter.count++;
	}
}

// mouse click events
canvas.addEventListener('mousemove', function(e) {
	mouse.x = e.pageX - canvas.offsetLeft;
	mouse.y = e.pageY - canvas.offsetTop;
});
canvas.addEventListener('mousedown', () => mouse.isPressed = true);
canvas.addEventListener('mouseup', () => mouse.isPressed = false);

// CSS linear gradient caused some banding - it isn't smooth,
// so I've made same gradient in Photoshop with dithering
// this function loads it in background and sets to body background when loaded
function preload() {
	var gradientImage = new Image();
	gradientImage.src = 'background.png';
	gradientImage.onload = function() {
		document.body.className = "background-loaded"
	}
}

window.onload = function() {
	preload();
	loop();
};

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// https://gist.github.com/paulirish/1579671
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());