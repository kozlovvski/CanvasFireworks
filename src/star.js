import { randomBetween } from "./utilityFunctions";
import { ctx, canvas } from "./canvas";
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
		this.life.current++;
	}
	draw() {
		// draw stars as circles
		ctx.beginPath();
		ctx.arc(this.coords.x, this.coords.y, this.size, 0, 2 * Math.PI);
		ctx.fillStyle = `hsla(60, 100%, 70%, ${this.alpha * 0.08}`;
		ctx.fill();
	}

	get disappeared() {
		return this.alpha < 0
	}
}
