import {
	randomBetween
} from "./utilityFunctions";
import {
	canvas,
	ctx,
	setupCanvas,
	clearCanvas
} from "./canvas";
import {
	Firework
} from './fireworks';
import {
	particleList,
	fireworkList,
	starList,
	timer,
} from "./globalVariables";
import {
	mouse
} from "./mouse";

// change size on resize
window.addEventListener('resize', () => {
	setupCanvas();
});



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



// app loop
function loop() {
	clearCanvas();

	// draw and update everything
	fireworkList.forEach(firework => {
		if (firework.reachedTarget) {
			firework.explode();
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
	while (starList.size < starCount) {
		starList.add(new Star(canvas.width, canvas.height));
	}

	// make random fireworks
	if (timer.count >= timer.total) {
		// set launch place
		var startX = canvas.width / 2,
			startY = canvas.height;

		// set boundaries for explosion place
		var finishX = startX + randomBetween(-canvas.width / 4, canvas.width / 4),
			finishY = randomBetween(canvas.height / 8, canvas.height / 3);

		fireworkList.add(new Firework(startX, startY, finishX, finishY));
		timer.count = Math.floor(randomBetween(0, timer.total * 0.5)); // random time until next launch
	} else {
		timer.count++;
	}

	if (mouse.limiter.current >= mouse.limiter.target) {
		if (mouse.isPressed) {
			fireworkList.add(new Firework(canvas.width / 2, canvas.height, mouse.x, mouse.y));
			mouse.limiter.current = 0;
		}
	} else {
		mouse.limiter.current++;
	}

	window.requestAnimationFrame(loop);
}

window.onload = function () {
	setupCanvas();
	loop();
};