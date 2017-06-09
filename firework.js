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
	// v0.1 - straight line trajectory
	// this.distance = {
	// 	traveled: 0,
	// 	toTarget: calcDistance(startX, startY, targetX, targetY)
	// }
	// this.angle = Math.atan2(targetY - startY, targetX - startX);
	// this.velocity = 5;
	// this.acceleration = 0.00;

	// v0.2 - parabolic trajectory
		// by knowing gravitational acceleration, starting and target point,
		// we can calculate initial velocity and travel time for the projectile in gravitational field
		// v0 = at
		// h = v0t - at ^ 2 / 2
		// therefore v0 = sqrt(2ah) (as far as y-axis velocity is considered)
		// projectile will reach target height when it's y-axis velocity reaches 0
		// then it also should reach it's x-axis destination - in the same time, so:
		// s = u0t => u0 = s / t (we know both distance to travel and time in which this must be done)
		// we will use these formulas to calculate initial velocity
	this.velocity = {
		y: Math.sqrt(2 * gravity * Math.abs(targetY - startY)),
		// time: t = v0 / a, so: u0 = s / (v0 / a)
		x: (targetX - startX) / (Math.sqrt(2 * gravity * Math.abs(targetY - startY)) / gravity),
		startY: Math.sqrt(2 * gravity * Math.abs(targetY - startY))
	};
	this.time = {
		traveling: 0,
		max: this.velocity.startY / gravity
	}
	// fill previous coords array with starting coords
	while(this.coords.previousCount--) {
		this.coords.previous.push([this.coords.start.x, this.coords.start.y]);
	};
}

Firework.prototype.update = function(index) {
	// update previous coords array
	// this.coords.previous.pop();
	// this.coords.previous.unshift([this.coords.current.x, this.coords.current.y]);
	this.coords.previous.shift();
	this.coords.previous.push([this.coords.current.x, this.coords.current.y]);
	this.time.traveling++;
	// v0.1 - straight line trajectory
		// calculate coords based on velocity and angle
		// var vx = Math.cos(this.angle) * this.velocity,
		// 	vy = Math.sin(this.angle) * this.velocity;
		// calculate traveled distance to check if destination has been reached
		// this.distance.traveled = calcDistance(this.coords.start.x, this.coords.start.y, this.coords.current.x + vx, this.coords.current.y + vy);
		// if(this.distance.traveled >= this.distance.toTarget) {
		// 	createParticles(this.coords.target.x, this.coords.target.y);
		// 	// delete this firework from list
		// 	fireworkList.splice(index, 1);
		// } else {
		// 	//update coords
		// 	this.coords.current.x += vx;
		// 	this.coords.current.y += vy;
		// }

	// v0.2 - parabolic trajectory
	// check if y-axis velocity is 0 in order to check if destination has been reached
	if(this.time.traveling >= this.time.max) {
		createParticles(this.coords.target.x, this.coords.target.y);
		// delete this firework from list
		fireworkList.splice(index, 1);
	} else {
		//update coords and velocity
		// y = y0 + v0t - at^2/2
		this.velocity.y -= gravity;
		this.coords.current.y = this.coords.start.y - this.velocity.startY * this.time.traveling + gravity * Math.pow(this.time.traveling, 2) / 2;
		this.coords.current.x += this.velocity.x;
	};

}

Firework.prototype.draw = function() { 
	// move to previous position and draw line to current one
	ctx.beginPath();
	ctx.moveTo(this.coords.previous[0][0], this.coords.previous[0][1]);
	ctx.lineTo(this.coords.current.x, this.coords.current.y);
	ctx.strokeStyle = 'hsl(' + "40" + ', 100%, ' + "70" + '%)';
	ctx.lineWidth = 1;
	ctx.stroke();
}