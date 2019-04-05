import {
    gravity,
    trail,
    particleList,
    particleCount
} from './globalVariables';
import {
    randomBetween
} from './utilityFunctions';
import {
    ctx
} from './canvas';
import {
    Particle
} from './particle';

export class Firework {
    // a Firework is constructed with given start and target point on canvas
    constructor(startX, startY, targetX, targetY) {
        this.coords = {
            current: {
                x: startX,
                y: startY
            },

            // trail.length works as a delay for saving coords
            previous: new Array(trail.length).fill({
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
            y: Math.sqrt(2 * gravity * (startY - targetY)),

            // at the same time it should also reach it's x-axis destination:
            // u0 = s / t 

            // we already know y-axis velocity, so we can calculate time in air:
            // t = v0 / a, 

            // so: 
            // u0 = s / (v0 / a)
            // u0 = s * a / v0

            x: (targetX - startX) * gravity / Math.sqrt(2 * gravity * (startY - targetY))
        };

        // this property stores time that firework has traveled and is supposed to travel
        this.time = {
            inAir: 0,

            // t = v0 / a
            toTravel: this.velocity.y / gravity
        };

        // this property stores values for a ring indicating firework target
        this.ring = {
            hue: 0,
            angle: 0,
            sector: Math.PI * 4 / 3
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

        this.velocity.y -= gravity;
        // this.velocity.x doesn't change (we don't include drag in this calculations)

        // update target circle
        this.ring.hue += 2;
        this.ring.angle += 0.04;
    }

    draw() {
        // move to the previous position and draw line to the current one
        this.drawTrail();

        // make ring around the target
        ctx.beginPath();
        ctx.arc(this.coords.target.x, this.coords.target.y, 8, this.ring.angle, this.ring.angle + Math.PI * 4 / 3);

        // when firework is near the target, the ring should slowly disappear
        let opacity = this.time.toTravel - this.time.inAir > 40 ? 10 : (this.time.toTravel - this.time.inAir) * 0.25;
        ctx.strokeStyle = `hsl(${this.ring.hue}, 100%, ${opacity}%)`;
        ctx.stroke();
    }

    drawTrail() {
        ctx.beginPath();
        ctx.moveTo(this.coords.current.x, this.coords.current.y);

        for (let i = this.coords.previous.length - 1; i > 0; i--) {
            const position = this.coords.previous[i];

            ctx.lineTo(position.x, position.y);
            ctx.lineWidth = trail.width;

            const opacity = i / trail.length;

            ctx.strokeStyle = `hsla(40, 100%, 70%, ${opacity * 100}%)`
            ctx.stroke();

            // if this is not the last position in array, start drawing new line
            if (i != 1) {
                ctx.beginPath();
                ctx.moveTo(position.x, position.y);
            }
        }

    }

    explode() {
        // select random color for particles in the same firework
        const givenHue = randomBetween(0, 360);

        // create new particles in explosion location
        for (let i = 0; i < particleCount; i++) {
            particleList.add(new Particle(this.coords.target.x, this.coords.target.y, givenHue));
        }
    }

    get reachedTarget() {
        return this.time.inAir >= this.time.toTravel
    }
}