export const canvas = document.querySelector('.canvas-fireworks');
export const ctx = canvas.getContext('2d');

export const setupCanvas = () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
};

export const clearCanvas = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.globalCompositeOperation = "lighter";
}
