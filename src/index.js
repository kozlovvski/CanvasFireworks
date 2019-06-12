import {
	updateCanvas,
	clearCanvas
} from "./modules/canvas";
import {
	makeRandomFireworks,
	makeMouseGeneratedFirework
} from './modules/fireworks';
import {controller} from "./modules/variableControl";
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
	controller.firework.list.forEach(firework => {
		if (firework.reachedTarget) {
			firework.explode();
		} else {
			firework.update();
			firework.draw();
		}
	})

	controller.particle.list.forEach(particle => {
		if (particle.disappeared) {
			controller.particle.list.delete(particle);
		} else {
			particle.update();
			particle.draw();
		}
	})

	controller.star.list.forEach(star => {
		if (star.disappeared) {
			controller.star.list.delete(star);
			controller.star.list.add(new Star());
		} else {
			star.update();
			star.draw();
		}
	})

	// onclick generate a firework that will reach mouse position
	if (mouse.isPressed) makeMouseGeneratedFirework();

	window.requestAnimationFrame(loop);
}

// everytime user resizes window, make canvas fill whole document
window.addEventListener('resize', () => {
	updateCanvas();
	controllerlaunchPosition.update();
});