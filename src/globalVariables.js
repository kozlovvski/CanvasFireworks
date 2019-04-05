import { canvas } from "./canvas";

export const particleList = new Set();
export const particleCount = 150;

export const fireworkList = new Set();

export const starList = new Set();
export const starCount = 100;

// sets interval for random fireworks generation
export const timer = {
    current: 30,
    total: 30,
    reset: () => {timer.current = 0}
};

// gravitational acceleration
// larger value == fireworks are pulled to ground stronger
export const gravity = 0.05;

// defines time after which current coords are saved as previous 
// larger value == longer trail
export const trail = {
    length: 8,
    width: 2
}

// defines starting position for fireworks
export const launchPosition = {
    x: canvas.width,
    y: canvas.height
}

// defines area on canvas where fireworks will hit
export const targetRectangle = {
    x1: canvas.width * 0.25,
    x2: canvas.width * 0.75,
    y1: canvas.height * 0.25,
    y2: canvas.height * 0.75,
}