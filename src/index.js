// 
// imports
// 

import {
	updateCanvas,
	clearCanvas
} from "./modules/canvas";
import {
	makeRandomFireworks,
	makeMouseGeneratedFirework
} from './modules/fireworks';
import {
	controller,
	initializeInputs
} from "./modules/variableControl";
import {
	mouse
} from "./modules/mouse";
import {
	createNewStars
} from "./modules/stars";
import './style.scss';

// 
// MAIN
// 

window.onload = () => {
	updateCanvas();
	createNewStars();
	initializeInputs();
	loop();
};

// everytime user resizes window, make canvas fill whole document
window.addEventListener('resize', () => {
	updateCanvas();
	controller.launchPosition.update();
});

// 
// app loop
// 

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
			firework.update().draw();
		}
	})

	controller.particle.list.forEach(particle => {
		if (particle.disappeared) {
			controller.particle.list.delete(particle);
		} else {
			particle.update().draw();
		}
	})

	controller.star.list.forEach(star => {
		if (star.disappeared) {
			controller.star.list.delete(star);
		} else {
			star.update().draw();
		}
	}); createNewStars();

	// onclick generate a firework that will reach mouse position
	if (mouse.isPressed) makeMouseGeneratedFirework();

	window.requestAnimationFrame(loop);
}