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


// requestAnimationFrame polyfill
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
// necessary variables
	// setup arrays for fireworks and its' particles
	var particleList = [],
		fireworkList = [];
	// setup timer for loop
	var timer = {count: 0, total: 40};
	// gravitational acceleration
	const gravity = 0.1;

// necessary functions
	// calculate random value from range
	function random(from, to) {
		return Math.random() * (to - from) + from;
	}
	// v0.1 - straight line trajectory
	// function calcDistance(firstX, firstY, secondX, secondY) {
	// 	//calculate from Pythagorean Theorem
	// 	return Math.sqrt(Math.pow(secondX - firstX, 2) + Math.pow(secondY - firstY, 2));
	// }

	// create the explosion
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
	// make random fireworks
	if(timer.count >= timer.total) {
		var startX = canvas.width / 2,
			startY = canvas.height,
			finishX = startX + random(-canvas.width / 4, canvas.width / 4),
			finishY = canvas.target.y + random(-canvas.height / 8, canvas.height / 4);
		fireworkList.push(new Firework(startX, startY, finishX, finishY));
		timer.count = Math.floor(random(0, 30));
	} else {
		timer.count++;
	}
}

window.onload = loop;
