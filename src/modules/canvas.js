import {
	launchPosition,
	targetRectangle
} from "./globalVariables";

export const canvas = document.querySelector('.canvas-fireworks');
export const ctx = canvas.getContext('2d');

export const updateCanvas = () => {
	// make canvas fill whole document
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// update launch place and target place based on new canvas dimensions
	launchPosition.update();
	targetRectangle.update();
};

export const clearCanvas = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// makes particles overlap eachother 
	ctx.globalCompositeOperation = "lighter";
}