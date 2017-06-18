(function() {

// canvas setup
var canvas = document.querySelector('#canvas-fireworks'),
	ctx = canvas.getContext('2d');

function setupCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
} setupCanvas();

// change size on resize
window.addEventListener('resize', () => {
	setupCanvas();
	starList = [];
});

// *** FIREWORKS ***

// necessary variables
	// arrays for fireworks and its' particles
	var particleList = [],
		fireworkList = [];
	// timer for loop
	var timer = {count: 70, total: 70};
	// limiter for mouse-clicked fireworks
	var limiter = {count: 0, total: 10};
	// gravitational acceleration
	const gravity = 0.08;
	// mouse info for click event
	var mouse = {
		x: 0,
		y: 0,
		isPressed: false
	};

// necessary functions
	// calculate random value from range
	function random(from, to) {
		return Math.random() * (to - from) + from;
	}

	// create the explosion
	function createParticles(startX, startY) {
		const particleCount = 150,
		      givenHue = random(0, 360);
		for (var i = 0; i < particleCount; i++) {
			particleList.push(new Particle(startX, startY, givenHue));
		}
	}

// create the firework
function Firework(startX, startY, targetX, targetY) {
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
		previousCount: Math.floor(random(3, 8)), // increase for longer trail
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
	}

	// fill previous coords array with starting coords
	while(this.coords.previousCount--) {
		this.coords.previous.push([this.coords.start.x, this.coords.start.y]);
	};
}

Firework.prototype.update = function(index) {
	// update previous coords array
	this.coords.previous.shift();
	this.coords.previous.push([this.coords.current.x, this.coords.current.y]);
	this.time.traveling++;

	// check if destination has been reached
	if(this.time.traveling >= this.time.max) {
		createParticles(this.coords.target.x, this.coords.target.y);

		// delete this firework from the list
		fireworkList.splice(index, 1);
	} else {
		// update coords and velocity
		// y = y0 - v0t + at^2/2
		// it's difficult to understand where should be plus and where minus,
		// because, unlike in physics, the x axis is at the top - not at the bottom
		this.coords.current.y = this.coords.start.y - this.launchVelocity.y * this.time.traveling + gravity * Math.pow(this.time.traveling, 2) / 2;
		this.coords.current.x += this.launchVelocity.x;

		this.ring.hue += 2;
		this.ring.angle += 0.04;
	};
}

Firework.prototype.draw = function() { 
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

// create the particle 
function Particle(startX, startY, givenHue) {
	this.coords = {
		current: {
			x: startX,
			y: startY
		},
		previous: [], // for the trail effect
		previousCount: 5 // increase for stronger effect
	}

	// fill with starting values
	while(this.coords.previousCount--) {
		this.coords.previous.push({x: startX, y: startY});
	}

	// set random angle and velocity
	this.angle = random(0, Math.PI * 2);
	this.velocity = random(0, 10);

	// set slightly different hue for all particles in the same firework
	this.hue = givenHue + random(-10, 10);
	this.brightness = random(55, 65);
	this.alpha = 1;

	// set how fast particle disappears
	this.fade = random(0.015, 0.03);
}

Particle.prototype.update = function(index) {
	// remove last coords and push new ones
	this.coords.previous.shift();
	this.coords.previous.push([this.coords.current.x, this.coords.current.y]);

	// slow down the particle
	this.velocity *= 0.95;

	// change coords
	this.coords.current.x += Math.cos(this.angle) * this.velocity;
	this.coords.current.y += Math.sin(this.angle) * this.velocity + gravity * 10;

	// change opacity
	this.alpha -= this.fade;

	// remove invisible particles to prevent performance issues
	if (this.alpha < this.fade) {
		particleList.splice(index, 1);
	}
};

Particle.prototype.draw = function() { 
	// move to the previous position and draw line to the current one
	ctx.beginPath();
	ctx.lineWidth = random(1, 3);
	ctx.moveTo(this.coords.previous[0][0], this.coords.previous[0][1])
	ctx.lineTo(this.coords.current.x, this.coords.current.y);
	ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
	ctx.stroke();
};


// *** STARS ***

// necessary variables
	// array for stars
	var starList = [];
	// number of stars on screen at the same time
	var starCount = 100;

function Star(maxX, maxY) {
	this.coords = {
		x: Math.floor(random(0, maxX)),
		y: Math.floor(random(0, maxY))
	};
	this.size = Math.ceil(random(0, 2));
	this.life = {
		current: 0,
		target: Math.floor(random(150, 300))
	};
	this.alpha = 0;
}

Star.prototype.update = function(index) {
	// v0.2.1 - smooth shining
	// star's opacity should slowly increase to 1 at the first half of it's lifespan and then decrease
	// we will create parabola formula for calculating opacity
	// zeros of it are at 0 and max lifespan, so from intercept form: y = a(x - x1)(x - x2):
	// opacity = at(t - max) where t is current time and max is maximum lifespan
	// at half of lifespan opacity should be 1 -> half of the lifespan is max / 2
	// 1 = a * max / 2 * (max / 2 - max)
	// 1 = - a * max / 2 * max / 2
	// 4 = - a * max ^ 2 
	// a = - 4 / max ^ 2 
	// so our opacity formula is: opacity = -4t(t - max) / max ^ 2
	// now for any maximum lifespan, maximum opacity is 1
	this.alpha = -4 * this.life.current * (this.life.current - this.life.target) / Math.pow(this.life.target, 2);

	// if alpha is negative, remove star from the list
	this.alpha < 0 ? starList.splice(index, 1) : this.life.current++;
};

Star.prototype.draw = function() {
	// draw stars as circles
	ctx.beginPath();
	ctx.arc(this.coords.x, this.coords.y, this.size, 0, 2 * Math.PI);
	ctx.fillStyle = `hsla(60, 100%, 70%, ${this.alpha * 0.08}`;
	ctx.fill();
};

// app loop
function loop() {
	window.requestAnimationFrame(loop);

	// clearing canvas at desired opacity
	ctx.globalCompositeOperation = 'destination-out';
	ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// make particles overlap each other
	ctx.globalCompositeOperation = "lighter";

	// draw and update everything
	var i = fireworkList.length;
	while(i--) {
		fireworkList[i].draw();
		fireworkList[i].update(i);
	}
	i = particleList.length;
	while(i--) {
		particleList[i].draw();
		particleList[i].update(i);
	}
	i = starList.length;
	while(i--) {
		starList[i].draw();
		starList[i].update(i);
	}

	// create new stars if there are less of them than desired number
	while(starList.length < starCount) {
		starList.push(new Star(canvas.width, canvas.height));
	}

	// make random fireworks
	if(timer.count >= timer.total) {
		// set launch place
		var startX = canvas.width / 2,
			startY = canvas.height;

		// set boundaries for explosion place
		var	finishX = startX + random(-canvas.width / 4, canvas.width / 4),
			finishY = random(canvas.height / 8, canvas.height / 3);

		fireworkList.push(new Firework(startX, startY, finishX, finishY));
		timer.count = Math.floor(random(0, timer.total * 0.5)); // random time until next launch
	} else {
		timer.count++;
	}

	// limit mouse-made fireworks number
	if (limiter.count >= limiter.total) {
		if (mouse.isPressed) {
			fireworkList.push(new Firework(canvas.width / 2, canvas.height, mouse.x, mouse.y));
			limiter.count = 0;
		}
	} else {
		limiter.count++;
	}
}

// mouse click events
canvas.addEventListener('mousemove', function(e) {
	mouse.x = e.pageX - canvas.offsetLeft;
	mouse.y = e.pageY - canvas.offsetTop;
});
canvas.addEventListener('mousedown', () => mouse.isPressed = true);
canvas.addEventListener('mouseup', () => mouse.isPressed = false);

window.onload = loop;
}());

// CSS linear gradient caused some banding - it isn't smooth,
// so I've made same gradient in Photoshop with dithering
// this function loads it in background and sets to body background when loaded
(function() {
	var gradientImage = new Image();
	gradientImage.src = 'background.png';
	gradientImage.onload = function() {
		document.body.className = "background-loaded"
	}
}());

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// https://gist.github.com/paulirish/1579671
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());