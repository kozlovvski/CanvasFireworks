export const particleList = new Set();
export const particleCount = 150;

export const fireworkList = new Set();

export const starList = new Set();

// timer for loop
export const timer = {
    count: 30,
    total: 30
};

// gravitational acceleration
// larger value == fireworks are pulled to ground stronger
export const gravity = 0.05;

// this defines time after which current coords are saved as previous 
// larger value == longer trail
export const trail = {
    length: 8,
    width: 2
}