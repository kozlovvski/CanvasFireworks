(function() {

// canvas setup
var canvasFireworks = document.querySelector('#canvas-fireworks'),
	canvasStars = document.querySelector('#canvas-stars');
	ctxFireworks = canvasFireworks.getContext('2d'),
	ctxStars = canvasStars.getContext('2d');

function setupCanvas() {
	canvasFireworks.width = window.innerWidth;
	canvasFireworks.height = window.innerHeight;
	canvasStars.width = window.innerWidth;
	canvasStars.height = window.innerHeight;
} setupCanvas();

// change size on resize
window.addEventListener('resize', setupCanvas);

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

// *** FIREWORKS ***

// necessary variables
	// arrays for fireworks and its' particles
	var particleList = [],
		fireworkList = [];
	// timer for loop
	var timer = {count: 40, total: 40};
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
		y: Math.sqrt(2 * gravity * Math.abs(targetY - startY)),
		// time: t = v0 / a, so: u0 = s / (v0 / a)
		x: (targetX - startX) / (Math.sqrt(2 * gravity * Math.abs(targetY - startY)) / gravity)
	};
	this.time = {
		traveling: 0,
		max: this.launchVelocity.y / gravity
	};

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
	};
}

Firework.prototype.draw = function() { 
	// move to the previous position and draw line to the current one
	ctxFireworks.beginPath();
	ctxFireworks.moveTo(this.coords.previous[0][0], this.coords.previous[0][1]);
	ctxFireworks.lineTo(this.coords.current.x, this.coords.current.y);
	ctxFireworks.strokeStyle = 'hsl(40, 100%, 70%)';

	// fireworks with longer trail should have also thicker trail
	ctxFireworks.lineWidth = this.coords.previous.length / 5;
	ctxFireworks.stroke();
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

	// stop tracking invisible particles to prevent performance issues
	if (this.alpha < this.fade) {
		particleList.splice(index, 1);
	}
};

Particle.prototype.draw = function() { 
	// move to the previous position and draw line to the current one
	ctxFireworks.beginPath();
	ctxFireworks.lineWidth = random(1, 3);
	ctxFireworks.moveTo(this.coords.previous[0][0], this.coords.previous[0][1])
	ctxFireworks.lineTo(this.coords.current.x, this.coords.current.y);
	ctxFireworks.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
	ctxFireworks.stroke();
};

// app loop
function loop() {
	window.requestAnimationFrame(loop);

	// clearing canvas at desired opacity
	ctxFireworks.globalCompositeOperation = 'destination-out';
	ctxFireworks.fillStyle = "rgba(0, 0, 0, 0.3)";
	ctxFireworks.fillRect(0, 0, canvasFireworks.width, canvasFireworks.height);

	// make particles overlap each other
	ctxFireworks.globalCompositeOperation = "lighter";

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

	// make random fireworks
	if(timer.count >= timer.total) {
		// set launch place
		var startX = canvasFireworks.width / 2,
			startY = canvasFireworks.height;

		// set boundaries for explosion place
		var	finishX = startX + random(-canvasFireworks.width / 4, canvasFireworks.width / 4),
			finishY = random(canvasFireworks.height / 8, canvasFireworks.height / 3);

		fireworkList.push(new Firework(startX, startY, finishX, finishY));
		timer.count = Math.floor(random(0, timer.total * 3 / 4)); // random time until next launch
	} else {
		timer.count++;
	}

	if (limiter.count >= limiter.total) {
		if (mouse.isPressed) {
			fireworkList.push(new Firework(canvasFireworks.width / 2, canvasFireworks.height, mouse.x, mouse.y));
			limiter.count = 0;
		}
	} else {
		limiter.count++;
	}
}

// mouse click events
canvasFireworks.addEventListener('mousemove', function(e) {
	mouse.x = e.pageX - canvasFireworks.offsetLeft;
	mouse.y = e.pageY - canvasFireworks.offsetTop;
});
canvasFireworks.addEventListener('mousedown', () => mouse.isPressed = true);
canvasFireworks.addEventListener( 'mouseup', () => mouse.isPressed = false);

window.onload = loop;
}());
