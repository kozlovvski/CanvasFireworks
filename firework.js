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
		// we can calculate initial velocity and travel time for the projectile in gravitational field
		// v0 = at
		// h = v0t - at^2/2
		// therefore v0 = sqrt(2ah) (as far as y-axis velocity is considered)
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
		// because, unlike in the physics, the x axis is at the top - not at the bottom
		this.coords.current.y = this.coords.start.y - this.launchVelocity.y * this.time.traveling + gravity * Math.pow(this.time.traveling, 2) / 2;
		this.coords.current.x += this.launchVelocity.x;
	};
}

Firework.prototype.draw = function() { 
	// move to previous position and draw line to the current one
	ctxFireworks.beginPath();
	ctxFireworks.moveTo(this.coords.previous[0][0], this.coords.previous[0][1]);
	ctxFireworks.lineTo(this.coords.current.x, this.coords.current.y);
	ctxFireworks.strokeStyle = 'hsl(40, 100%, 70%)';

	// fireworks with longer trail should have also thicker trail
	ctxFireworks.lineWidth = this.coords.previous.length / 5;
	ctxFireworks.stroke();
}