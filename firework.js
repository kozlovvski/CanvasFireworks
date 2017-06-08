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
	}
	this.distance = {
		traveled: 0,
		toTarget: calcDistance(startX, startY, targetX, targetY)
	}
	this.angle = Math.atan2(targetY - startY, targetX - startX);
	this.velocity = 5;
	this.acceleration = 0.00;

	// fill previous coords array with starting coords
	while (this.coords.previousCount--){
		this.coords.previous.push([this.coords.start.x, this.coords.start.y]);
	}
}

Firework.prototype.update = function(index) {
	// update previous coords array
	this.coords.previous.pop();
	this.coords.previous.unshift([this.coords.current.x, this.coords.current.y]);

	// increase velocity 
	this.velocity += this.acceleration;

	// calculate coords based on velocity and angle
	var vx = Math.cos(this.angle) * this.velocity,
		vy = Math.sin(this.angle) * this.velocity;

	// calculate traveled distance to check if destination has been reached
	this.distance.traveled = calcDistance(this.coords.start.x, this.coords.start.y, this.coords.current.x + vx, this.coords.current.y + vy);
	if(this.distance.traveled >= this.distance.toTarget) {
		createParticles(this.coords.target.x, this.coords.target.y);
		// delete this firework from list
		fireworkList.splice(index, 1);
	} else {
		//update coords
		this.coords.current.x += vx;
		this.coords.current.y += vy;
	}
}

Firework.prototype.draw = function() { 
	// move to previous position and draw line to current one
	ctx.beginPath();
	ctx.moveTo(this.coords.previous[this.coords.previous.length - 1][0], this.coords.previous[this.coords.previous.length - 1][1]);
	ctx.lineTo(this.coords.current.x, this.coords.current.y);
	ctx.strokeStyle = 'hsl(' + "60" + ', 100%, ' + "3" + '%)';
	ctx.stroke();
}