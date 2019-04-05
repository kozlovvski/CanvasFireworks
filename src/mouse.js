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
            mouse.limiter.current = 0
        }
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

    // make sure that everytime on click firework is generated
    mouse.limiter.current = mouse.limiter.target;
});