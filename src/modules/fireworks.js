// 
// imports
// 

import {
    controller
} from './variableControl';
import {
    randomBetween
} from './utilityFunctions';
import {
    ctx
} from './canvas';
import {
    Particle
} from './particles';
import {
    mouse
} from './mouse';

// 
// MAIN
// 
export class Firework {
    // a Firework is constructed with given start and target point on canvas
    constructor(startX, startY, targetX, targetY) {
        this.coords = {
            current: {
                x: startX,
                y: startY
            },
            previous: new Array(controller.trail.length).fill({
                x: startX,
                y: startY
            }),
            target: {
                x: targetX,
                y: targetY
            }
        };

        // WATCH OUT - MATHS AND PHYSICS AHEAD
        // https://en.wikipedia.org/wiki/Projectile_motion

        // by knowing gravitational acceleration, starting and target point, we can calculate initial velocity and travel time for the projectile in the gravitational field

        // a -> gravitational acceleration (const gravity)
        // v0 -> initial y-axis velocity
        // u0 -> initial x-axis velocity
        // t -> time in air
        // h -> height to travel along y-axis (startY - targetY) -> in canvas points that we would consider "higher" have lower y value, because values increase from top to bottom)
        // s -> distance to travel along x-axis (targetX - startX)

        this.velocity = {
            // we want y-axis speed to gradually decrease and reach 0 when projectile reaches it's target

            // y-axis projectile motion equations:
            // v0 = at
            // h = v0t - at^2/2

            // therefore v0 = sqrt(2ah)
            y: Math.sqrt(2 * controller.gravity * (startY - targetY)),

            // at the same time it should also reach it's x-axis destination:
            // u0 = s / t 

            // we already know y-axis velocity, so we can calculate time in air:
            // t = v0 / a, 

            // so: 
            // u0 = s / (v0 / a)
            // u0 = s * a / v0

            x: (targetX - startX) * controller.gravity / Math.sqrt(2 * controller.gravity * (startY - targetY))
        };

        // this property stores time that firework has traveled and is supposed to travel
        this.time = {
            inAir: 0,

            // t = v0 / a
            toTravel: this.velocity.y / controller.gravity
        };

        // this property stores values for a ring indicating firework target
        this.ring = {
            hue: 0,
            angle: 0,
            sector: Math.PI * 4 / 3 // 0.66 of a full circle
        };
    }

    update() {
        // update time in air
        this.time.inAir++;

        // save current coords as previous
        this.coords.previous.push({
            x: this.coords.current.x,
            y: this.coords.current.y
        });
        this.coords.previous.splice(0, 1);

        // update coords
        this.coords.current.x += this.velocity.x;
        this.coords.current.y -= this.velocity.y;

        // update velocity
        this.velocity.y -= controller.gravity;
        // this.velocity.x doesn't change (we don't include drag in this calculations)

        // update target circle
        this.ring.hue += 2;
        this.ring.angle += 0.04;

        return this;
    }

    draw() {
        this.drawTrail();
        this.drawRing();

        return this;
    }

    drawTrail() {
        ctx.beginPath();
        ctx.moveTo(this.coords.current.x, this.coords.current.y);

        for (let i = this.coords.previous.length - 1; i > 0; i--) {
            const position = this.coords.previous[i];

            ctx.lineTo(position.x, position.y);
            ctx.lineWidth = controller.trail.width;

            const opacity = i / controller.trail.length;

            ctx.strokeStyle = `hsla(40, 100%, 80%, ${opacity * 100}%)`
            ctx.stroke();

            // if this is not the last position in array, start drawing new line
            if (i != 1) {
                ctx.beginPath();
                ctx.moveTo(position.x, position.y);
            }
        }
    }

    drawRing() {
        ctx.beginPath();
        ctx.arc(this.coords.target.x, this.coords.target.y, 8, this.ring.angle, this.ring.angle + Math.PI * 4 / 3);

        let opacity = 1;
        // when a firework is near target, the ring should slowly disappear
        if (this.time.toTravel - this.time.inAir < 40) {
            opacity = (this.time.toTravel - this.time.inAir) / 40 // returns fraction from 0 to 1
        }
        ctx.strokeStyle = `hsla(${this.ring.hue}, 100%, 10%, ${opacity})`;
        ctx.stroke();
    }

    explode() {
        // select a random color for particles in the same firework
        const givenHue = randomBetween(0, 360);

        // create new particles in explosion location
        for (let i = 0; i < controller.particle.count; i++) {
            controller.particle.list.add(new Particle(this.coords.target.x, this.coords.target.y, givenHue));
        }

        // after creating particles, remove firework from set
        controller.firework.list.delete(this);
    }

    get reachedTarget() {
        return this.time.inAir >= this.time.toTravel
    }
}

export const makeRandomFireworks = () => {

    // controller.firework.timer.total sets interval for random firework generation
    controller.firework.timer.current++;

    if (controller.firework.timer.current >= controller.firework.timer.total) {
        for (let i = 0; i < controller.firework.timer.batch; i++) {
            // choose random point inside target area   
            const randomCoords = {
                x: randomBetween(controller.targetRectangle.x1, controller.targetRectangle.x2),
                y: randomBetween(controller.targetRectangle.y1, controller.targetRectangle.y2)
            }
            controller.firework.list.add(new Firework(controller.launchPosition.x, controller.launchPosition.y, randomCoords.x, randomCoords.y));
        }
        controller.firework.timer.reset();
    }
}

export const makeMouseGeneratedFirework = () => {
    if (mouse.limiter.current >= mouse.limiter.target) {
        controller.firework.list.add(new Firework(controller.launchPosition.x, controller.launchPosition.y, mouse.x, mouse.y));
        mouse.limiter.reset();
    } else {
        mouse.limiter.current++;
    }
}