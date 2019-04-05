import {
	updateCanvas,
	clearCanvas
} from "./canvas";
import {
	Firework,
	makeRandomFireworks,
	makeMouseGeneratedFirework
} from './fireworks';
import {
	particleList,
	fireworkList,
	starList,
	launchPosition,
} from "./globalVariables";
import {
	mouse
} from "./mouse";
import {
	Star, createStars
} from "./star";

window.onload = function () {
	updateCanvas();
	createStars();
	loop();
};

window.addEventListener('resize', () => {
	updateCanvas();
	launchPosition.update();
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
			starList.delete(star);
			starList.add(new Star());
		} else {
			star.update();
			star.draw();
		}
	})

	if (mouse.isPressed) makeMouseGeneratedFirework();

	console.log(particleList.size,
		fireworkList.size,
		starList.size)
	window.requestAnimationFrame(loop);
}