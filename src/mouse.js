import { canvas } from "./canvas";

export const mouse = {
    x: 0,
    y: 0,
    isPressed: false,
    limiter: {
        current: 0,
        target: 10
    }
};

canvas.addEventListener('mousemove', function (e) {
	mouse.x = e.pageX - canvas.offsetLeft;
	mouse.y = e.pageY - canvas.offsetTop;
});

canvas.addEventListener('mousedown', function () {
	mouse.isPressed = true;
});

canvas.addEventListener('mouseup', function () {
    mouse.isPressed = false;
    mouse.limiter.current = 0;
});