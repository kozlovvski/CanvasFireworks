import { canvas } from "./canvas";
import { makeFirework } from "./fireworks";

export const mouse = {
    x: 0,
    y: 0,
    isPressed: false,
    limiter: {
        current: 10,
        target: 10,
        reset: () => {mouse.limiter.current = 0}
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

canvas.addEventListener('click', makeFirework);