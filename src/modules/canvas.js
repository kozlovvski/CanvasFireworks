import {
	launchPosition,
	targetRectangle
} from "./globalVariables";

export const canvas = document.querySelector('.canvas-fireworks');
export const ctx = canvas.getContext('2d');

export const updateCanvas = () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	launchPosition.update();
	targetRectangle.update();
};

export const clearCanvas = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// makes particles overlap eachother 
	ctx.globalCompositeOperation = "lighter";
}