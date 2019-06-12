// 
// imports
// 

import {
    canvas
} from "./canvas";
import {
    randomBetween
} from "./utilityFunctions";

// 
// MAIN
// 

export const controller = {

    particle: {
        list: new Set(),
        count: 200,
        length: 6
    },

    firework: {
        list: new Set(),

        // sets interval for random fireworks generation and how many fireworks will be generated
        timer: {
            current: 40,
            random: 35,
            total: 40,
            batch: 1,
            reset() {
                controller.firework.timer.current = randomBetween(0, controller.firework.timer.random);
                return controller.firework.timer;
            }
        }
    },

    star: {
        list: new Set(),
        count: 100
    },

    // gravitational acceleration
    // larger value == everything is pulled stronger towards ground
    gravity: 0.05,

    // defines time after which current coords are saved as previous 
    // larger value == longer trail
    trail: {
        length: 10,
        width: 2
    },

    // defines starting position for fireworks
    launchPosition: {
        x: undefined,
        y: undefined,
        update() {
            controller.launchPosition.x = canvas.width / 2;
            controller.launchPosition.y = canvas.height;

            return controller.launchPosition;
        }
    },

    // defines area on canvas where fireworks will hit
    targetRectangle: {
        x1: undefined,
        x2: undefined,
        y1: undefined,
        y2: undefined,
        update() {
            controller.targetRectangle.x1 = canvas.width * 0.25;
            controller.targetRectangle.x2 = canvas.width * 0.75;
            controller.targetRectangle.y1 = canvas.height * 0.25;
            controller.targetRectangle.y2 = canvas.height * 0.5;

            return controller.targetRectangle;
        }
    }
}

document.getElementById("particle-count").addEventListener('input', () => {
    const input = document.getElementById("particle-count");
    updateOutput(input);
    controller.particle.count = input.value;
});

function updateOutput(input) {
    const output = document.querySelector(`output[for=${input.id}]`);
    output.value = input.value;
}