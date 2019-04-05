export const particleList = new Set();
export const particleCount = 150;

export const fireworkList = new Set();

export const starList = new Set();

// timer for loop
export const timer = {
    count: 70,
    total: 70
};


// gravitational acceleration
// larger value == fireworks are pulled to ground stronger
export const gravity = 0.08;

// this defines time after which current coords are saved as previous 
// larger value == longer trail
export const trail = {
    length: 5,
    width: 2
}

// mouse info for click event
export const mouse = {
    x: 0,
    y: 0,
    isPressed: false,
    limiter: {
        current: 0,
        target: 10
    }
};