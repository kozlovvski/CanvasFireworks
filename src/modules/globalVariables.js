// this values will be editable in menu
import "./controllerHandler";
import {
    canvas
} from "./canvas";
import { randomBetween } from "./utilityFunctions";

export const particleList = new Set();
export const particleCount = 200;
export const particleLength = 6;

export const fireworkList = new Set();

export const starList = new Set();
export const starCount = 100;

// sets interval for random fireworks generation and how many fireworks will be generated
export const fireworkTimer = {
    current: 40,
    random: 35,
    total: 40,
    batch: 1,
    reset: () => {
        fireworkTimer.current = randomBetween(0, fireworkTimer.random);
    }
};

// gravitational acceleration
// larger value == everything is pulled stronger towards ground
export const gravity = 0.05;

// defines time after which current coords are saved as previous 
// larger value == longer trail
export const trail = {
    length: 10,
    width: 2
}

// defines starting position for fireworks
export const launchPosition = {
    x: undefined,
    y: undefined,
    update: () => {
        launchPosition.x = canvas.width / 2;
        launchPosition.y = canvas.height;
    }
}

// defines area on canvas where fireworks will hit
export const targetRectangle = {
    x1: undefined,
    x2: undefined,
    y1: undefined,
    y2: undefined,
    update: () => {
        targetRectangle.x1 = canvas.width * 0.25;
        targetRectangle.x2 = canvas.width * 0.75;
        targetRectangle.y1 = canvas.height * 0.25;
        targetRectangle.y2 = canvas.height * 0.5;
    }
}