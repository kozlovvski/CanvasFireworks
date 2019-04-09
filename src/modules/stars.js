import {
	randomBetween
} from "./utilityFunctions";
import {
	ctx,
	canvas
} from "./canvas";
import {
	starCount,
	starList
} from "./globalVariables";

export class Star {
	constructor() {
		this.coords = {
			x: Math.floor(randomBetween(0, canvas.width)),
			y: Math.floor(randomBetween(0, canvas.height))
		};
		this.size = Math.ceil(randomBetween(0, 2));
		this.life = {
			current: 0,
			target: Math.floor(randomBetween(150, 300))
		};
		this.opacity = 0;
	}
	update() {
		// WATCH OUT - MATHS AND PHYSICS AHEAD
		// Quadratic formula f
		// zeros of it are at 0 and max lifespan, so from intercept form: y = a(x - x1)(x - x2):
		// opacity = at(t - max) where t is current time and max is maximum lifespan
		// at half of lifespan opacity should be 1 -> half of the lifespan is max / 2
		// 1 = a * max / 2 * (max / 2 - max)
		// 1 = - a * max / 2 * max / 2
		// 4 = - a * max ^ 2 
		// a = - 4 / max ^ 2 
		// so our opacity formula is: opacity = -4t(t - max) / max ^ 2
		// now for any maximum lifespan, maximum opacity is 1
		this.opacity = -4 * this.life.current * (this.life.current - this.life.target) / Math.pow(this.life.target, 2);
		// if opacity is negative, remove star from the list
		this.life.current++;
	}

	draw() {
		// draw stars as circles
		ctx.beginPath();
		ctx.arc(this.coords.x, this.coords.y, this.size, 0, 2 * Math.PI);
		ctx.fillStyle = `hsla(60, 100%, 20%, ${this.opacity}`;
		ctx.fill();
	}

	get disappeared() {
		return this.opacity < 0
	}
}

export const createStars = () => {
	for (let i = 0; i < starCount; i++) {
		starList.add(new Star());
	}
}