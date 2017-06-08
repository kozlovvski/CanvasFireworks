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
	this.hue = givenHue + random(-20, 20);
	this.brightness = random(50, 70);
	this.alpha = 1;

	// set how fast particle disappears
	this.fade = random(0.015, 0.03);
}

Particle.prototype.update = function(index) {
	// remove last coords and push new ones
	this.coords.previous.pop();
	this.coords.previous.unshift( [ this.coords.current.x, this.coords.current.y ] );

	// slow down the particle
	this.velocity *= 0.95;

	// canvas.heightange coords
	this.coords.current.x += Math.cos(this.angle) * this.velocity;
	this.coords.current.y += Math.sin(this.angle) * this.velocity + 0.8;

	// canvas.heightange opacity
	this.alpha -= this.fade;

	// remove the particle when is it invisible - prevent fps drop
	if (this.alpha < this.fade) {
		particleList.splice(index, 1);
	}
};

Particle.prototype.draw = function() { // move to previous position and draw line to current one
	const lastX = this.coords.previous[2].x,
		lastY = this.coords.previous[2].y;
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.moveTo( this.coords.previous[ this.coords.previous.length - 1 ][ 0 ], this.coords.previous[ this.coords.previous.length - 1 ][ 1 ] )
	ctx.lineTo(this.coords.current.x, this.coords.current.y);
	ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
	ctx.stroke();
};