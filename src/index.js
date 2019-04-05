import {
	randomBetween
} from "./utilityFunctions";
import {
	canvas,
	setupCanvas,
	clearCanvas
} from "./canvas";
import {
	Firework, makeRandomFireworks, makeMouseGeneratedFirework
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
import { Star } from "./star";

window.onload = function () {
	setupCanvas();
	loop();
};

window.addEventListener('resize', () => {
	setupCanvas();
});

// app loop
function loop() {

	makeRandomFireworks();
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
		if (star.disappeared) {
			starList.remove(star)
			starList.add(new Star());
		} else {
			star.update();
			star.draw();
		}
	})

	if (mouse.isPressed) makeMouseGeneratedFirework;


	window.requestAnimationFrame(loop);
}