var canvas = document.querySelector('#canvas'),
	ctx = canvas.getContext('2d');

function setupCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.target = {x: canvas.width / 2, y: canvas.height / 4};
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
} setupCanvas();

// change size on resize
window.addEventListener('resize', setupCanvas);

// setup arrays for fireworks and its' particles
var particleList = [],
	fireworkList = [];

// setup timer for loop
var timer = {count: 0, total: 40};

// setup needed functions
function random(from, to) {
	return Math.random() * (to - from) + from;
}
function calcDistance(firstX, firstY, secondX, secondY) {
	//calculate from Pythagorean Theorem
	return Math.sqrt(Math.pow(secondX - firstX, 2) + Math.pow(secondY - firstY, 2));
}
function createParticles(startX, startY) {
	const particleCount = 150,
		givenHue = random(0, 360);
	for (var i = 0; i < particleCount; i++) {
		particleList.push(new Particle(startX, startY, givenHue));
	}
}
function loop() {
	window.requestAnimationFrame(loop);

	// clearing canvas at desired opacity
	ctx.globalCompositeOperation = 'destination-out';
	ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// make particles overlap eachother
	ctx.globalCompositeOperation = "lighter";

	// draw and update everything
	var i = fireworkList.length;
	while(i--) {
		fireworkList[i].draw();
		fireworkList[i].update(i);
	}
	var i = particleList.length;
	while(i--) {
		particleList[i].draw();
		particleList[i].update(i);
	}
	// make random fireworks
	if(timer.count >= timer.total) {
		fireworkList.push(new Firework(canvas.width / 2 + random(-canvas.width / 16, canvas.width / 16), canvas.height, canvas.target.x + random(-canvas.width / 8, canvas.width / 8), canvas.target.y + random(-canvas.height / 8, canvas.height / 4)));
		timer.count = 0;
	} else {
		timer.count++;
	}
}

window.onload = loop;