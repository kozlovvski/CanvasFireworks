import {
	updateCanvas,
	clearCanvas
} from "./modules/canvas";
import {
	makeRandomFireworks,
	makeMouseGeneratedFirework
} from './modules/fireworks';
import {
	particleList,
	fireworkList,
	starList,
	launchPosition,
} from "./modules/globalVariables";
import {
	mouse
} from "./modules/mouse";
import {
	Star,
	createStars
} from "./modules/stars";
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