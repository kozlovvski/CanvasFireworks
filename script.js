var canvasFireworks = document.querySelector('#canvas-fireworks'),
	canvasStars = document.querySelector('#canvas-stars');
	ctxFireworks = canvasFireworks.getContext('2d');

function setupCanvas() {
	canvasFireworks.width = window.innerWidth;
	canvasFireworks.height = window.innerHeight;
	canvasStars.width = window.innerWidth;
	canvasStars.height = window.innerHeight;
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
	var timer = {count: 40, total: 40};
	// gravitational acceleration
	const gravity = 0.08;

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
}

window.onload = loop;
