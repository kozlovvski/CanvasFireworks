import {
    canvas
} from "./canvas";

export const mouse = {
    x: 0,
    y: 0,
    isPressed: false,
    limiter: {
        current: 10,
        target: 10,
        reset: () => {
            mouse.limiter.current = 0;
        }
    }
};

canvas.addEventListener('mousemove', e => {
    mouse.x = e.pageX - canvas.offsetLeft;
    mouse.y = e.pageY - canvas.offsetTop;
});

canvas.addEventListener('mousedown', () => {
    mouse.isPressed = true;
});

canvas.addEventListener('mouseup', () => {
    mouse.isPressed = false;

    // make sure that on next click a firework is created
    mouse.limiter.current = mouse.limiter.target;
});