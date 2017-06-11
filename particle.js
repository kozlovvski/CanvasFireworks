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
	for(var i = 0; i < this.coords.previousCount; i++) {
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

	// remove the particle when is it invisible - prevent fps drop
	if (this.alpha < this.fade) {
		particleList.splice(index, 1);
	}
};

Particle.prototype.draw = function() { 
	// move to previous position and draw line to current one
	ctxFireworks.beginPath();
	ctxFireworks.lineWidth = random(1, 3);
	ctxFireworks.moveTo(this.coords.previous[0][0], this.coords.previous[0][1])
	ctxFireworks.lineTo(this.coords.current.x, this.coords.current.y);
	ctxFireworks.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
	ctxFireworks.stroke();
};