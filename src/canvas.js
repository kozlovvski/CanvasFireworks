import { mouse,} from "./globalVariables";

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

canvas.addEventListener('mousemove', function (e) {
	mouse.x = e.pageX - canvas.offsetLeft;
	mouse.y = e.pageY - canvas.offsetTop;
});

canvas.addEventListener('mousedown', function () {
	mouse.isPressed = true;
});

canvas.addEventListener('mouseup', function () {
	mouse.isPressed = false;
});