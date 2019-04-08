import {
	updateCanvas,
	clearCanvas
} from "./canvas";
import {
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
	Star,
	createStars
} from "./stars";
import './style.scss';

window.onload = () => {
	updateCanvas();
	createStars();
	loop();
};

// app loop
function loop() {

	// once in a while fire a random firework to prevent canvas being empty
	makeRandomFireworks();

	// clear everything drawn in previous loop
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
		if (particle.disappeared) {
			particleList.delete(particle);
		} else {
			particle.update();
			particle.draw();
		}
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

	// onclick generate a firework that will reach mouse position
	if (mouse.isPressed) makeMouseGeneratedFirework();

	window.requestAnimationFrame(loop);
}

window.addEventListener('resize', () => {
	updateCanvas();
	launchPosition.update();
});