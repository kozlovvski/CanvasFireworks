import {
	randomBetween
} from "./utilityFunctions";
import {
	gravity,
	particleList,
	particleLength,
} from './globalVariables';
import {
	ctx
} from './canvas';

export class Particle {
	constructor(startX, startY, givenHue) {
		this.coords = {
			current: {
				x: startX,
				y: startY
			},
			previous: new Array(particleLength).fill({
				x: startX,
				y: startY
			}),
		};

		// set random launch angle and velocity
		this.angle = randomBetween(0, Math.PI * 2);
		this.velocity = randomBetween(0, 10);

		// set slightly different hue for all particles in the same firework
		this.hue = givenHue + randomBetween(-10, 10);

		this.brightness = randomBetween(65, 75);
		this.opacity = 1;

		// set how fast particle disappears
		this.fade = randomBetween(0.010, 0.03);
	}
	update() {
		// remove last coords and push new ones
		this.coords.previous.shift();
		this.coords.previous.push([this.coords.current.x, this.coords.current.y]);
		// slow down the particle
		this.velocity *= 0.95;
		// change coords
		this.coords.current.x += Math.cos(this.angle) * this.velocity;
		this.coords.current.y += Math.sin(this.angle) * this.velocity + gravity * 10;
		// change opacity
		this.opacity -= this.fade;
		// remove invisible particles to prevent performance issues
	}
	draw() {
		// move to the previous position and draw line to the current one
		ctx.beginPath();
		ctx.lineWidth = randomBetween(2, 4);
		ctx.moveTo(this.coords.previous[0][0], this.coords.previous[0][1]);
		ctx.lineTo(this.coords.current.x, this.coords.current.y);
		ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.opacity})`;
		ctx.stroke();
	}

	get disappeared() {
		return this.opacity < this.fade
	}
}