import {randomBetween} from './utilityFunctions';
import {gravity, particleList, fireworkList} from './globalVariables';
import {ctx} from './index';
import {Particle} from './particle';

export class Firework {
    constructor(startX, startY, targetX, targetY) {
        this.coords = {
            start: {
                x: startX,
                y: startY
            },
            current: {
                x: startX,
                y: startY
            },
            previous: [],
            previousCount: Math.floor(randomBetween(3, 8)),
            target: {
                x: targetX,
                y: targetY
            }
        };
        // v0.2 - parabolic trajectory
        // by knowing gravitational acceleration, starting and target point,
        // we can calculate initial velocity and travel time for the projectile in the gravitational field
        // v0 = at
        // h = v0t - at^2/2
        // therefore v0 = sqrt(2ah) (as far as y-axis velocity is concerned)
        // projectile will reach target height when it's y-axis velocity reaches 0
        // then it also should reach it's x-axis destination - in the same time, so:
        // s = u0t => u0 = s / t (we know both distance to travel and time in which this must be done)
        // we will use these formulas to calculate initial velocity
        this.launchVelocity = {
            // v0 = sqrt(2ah)
            y: Math.sqrt(2 * gravity * Math.abs(targetY - startY)),
            // time: t = v0 / a, so: u0 = s / (v0 / a)
            x: (targetX - startX) * gravity / Math.sqrt(2 * gravity * Math.abs(targetY - startY))
        };
        this.time = {
            traveling: 0,
            max: this.launchVelocity.y / gravity
        };
        this.ring = {
            hue: 0,
            angle: 0
        };
        // fill previous coords array with starting coords
        while (this.coords.previousCount--) {
            this.coords.previous.push([this.coords.start.x, this.coords.start.y]);
        }
        ;
    }
    update(index) {
        // update previous coords array
        this.coords.previous.shift();
        this.coords.previous.push([this.coords.current.x, this.coords.current.y]);
        this.time.traveling++;
        // check if destination has been reached
        if (this.time.traveling >= this.time.max) {
            this.explode(this.coords.target.x, this.coords.target.y);
            // delete this firework from the list
            fireworkList.splice(index, 1);
        }
        else {
            // update coords and velocity
            // y = y0 - v0t + at^2/2
            // it's difficult to understand where should be plus and where minus,
            // because, unlike in physics, the x axis is at the top - not at the bottom
            this.coords.current.y = this.coords.start.y - this.launchVelocity.y * this.time.traveling + gravity * Math.pow(this.time.traveling, 2) / 2;
            this.coords.current.x += this.launchVelocity.x;
            this.ring.hue += 2;
            this.ring.angle += 0.04;
        }
        ;
    }
    draw() {
        // move to the previous position and draw line to the current one
        ctx.beginPath();
        ctx.moveTo(this.coords.previous[0][0], this.coords.previous[0][1]);
        ctx.lineTo(this.coords.current.x, this.coords.current.y);
        ctx.strokeStyle = 'hsl(40, 100%, 70%)';
        // fireworks with longer trail should have also thicker trail
        ctx.lineWidth = this.coords.previous.length / 5;
        ctx.stroke();
        // make ring around the target
        ctx.beginPath();
        ctx.arc(this.coords.target.x, this.coords.target.y, 8, this.ring.angle, this.ring.angle + Math.PI * 4 / 3);
        // when firework is near target, ring should slowly disappear
        let opacity = this.time.max - this.time.traveling > 40 ? 10 : (this.time.max - this.time.traveling) * 0.25;
        ctx.strokeStyle = `hsl(${this.ring.hue}, 100%, ${opacity}%)`;
        ctx.stroke();
    }
    explode(startX, startY) {
        const particleCount = 150;
        const givenHue = randomBetween(0, 360);
        for (var i = 0; i < particleCount; i++) {
            particleList.push(new Particle(startX, startY, givenHue));
        }
    }
}


