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
		this.life.current++;

		// increase star opacity in the beginning and fade it in the end
		if (this.life.current < 50) {
			this.opacity = this.life.current / 50 // increases from 0 to 1
		} else if (this.life.current > this.life.target - 50) {
			this.opacity = (this.life.target - this.life.current) / 50 // decreases from 1 to 0
		} else this.opacity = 1;
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