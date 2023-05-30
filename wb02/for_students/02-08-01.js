/**
 * Starter file for 02-08-01.js - the only exercise of page 8 of Workbook 2
 */

// @ts-check

// Find the canvas and start!
/* jshint -W069, esversion:6 */

// Setup the canvas and get the context params:
let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("box2canvas"));
let context = canvas.getContext('2d');

// Set basic parameters for the fireworks, initialize arrays for objects:
var	canvasWidth = canvas.width,
    canvasHeight = canvas.height,
    
    // Arrays used to hold firework and particle objects:
    fireworkArray = [],
    particleArray = [],
    color = 120,

    // Params used to limit the frequency and amount of fireworks launched:
    limiterTotal = 5,
    limiterTick = 0,
    timerTotal = 120,
    timerTick = 0,
    
    // Initialize mouse parameters:
    mouseDown = false,
    mouseX,
    mouseY;

/**
 * @brief Basic helper function, used to randomly generate integers.
 * @param {*} min Lower threshold of integers to be generated.
 * @param {*} max Upper threshold of integers to be generated.
 * @returns Returns a randomly generated integer for usage in other functions.
 */
function random (min, max) {
	return Math.random() * (max - min) + min;
}

/**
 * @brief Helper function used to calculate euclidean distance between two points.
 * @param {*} p1x Starting x-coordinate.
 * @param {*} p1y Starting y-coordinate.
 * @param {*} p2x Target x-coordinate.
 * @param {*} p2y Target Y-coordinate.
 * @returns 
 */
function calcDist (p1x, p1y, p2x, p2y) {
	var displacementX = p1x - p2x, displacementY = p1y - p2y;
	return Math.sqrt(Math.pow(displacementX, 2) + Math.pow(displacementY, 2));
}

/**
 * @brief Function used to create a firework object.
 * @param {*} originX Firework starting x-coordinate.
 * @param {*} originY Firework starting y-coordinate.
 * @param {*} targetX Firework target x-coordinate.
 * @param {*} targetY Firework target y-coordinate.
 * @returns Function does not return anything.
 */
function Firework (originX, originY, targetX, targetY) {

	this.x = originX;
	this.y = originY;

	this.originX = originX;
	this.originY = originY;

	this.targetX = targetX;
	this.targetY = targetY;

    // Calculate distance from a random origin, to the random target dest:
	this.targetDistance = calcDist(originX, originY, targetX, targetY);
	this.distanceTraveled = 0;

	this.fireworkCoordinates = [];
    this.coordinateCount = 3;

	this.friction = 0.95;
	this.gravity = 1;

	while (this.coordinateCount--) {
		this.fireworkCoordinates.push([this.x, this.y]);
	}
	this.angle = Math.atan2(targetY - originY, targetX - originX);
	this.speed = 2;
	this.acceleration = 1.05;
	this.brightness = random(50, 70);
}

/**
 * @brief Function used to update the movements of the fireworks.
 * @param {*} index Index of the firework to be updated. 
 */
Firework.prototype.update = function (index) {

	this.fireworkCoordinates.pop();
	this.fireworkCoordinates.unshift([this.x, this.y]);
	
	this.speed *= this.acceleration;
	
	var velocityX = Math.cos(this.angle) * this.speed, velocityY = Math.sin(this.angle) * this.speed;
	this.distanceTraveled = calcDist(this.originX, this.originY, this.x + velocityX, this.y + velocityY);
	
	if (this.distanceTraveled >= this.targetDistance) {
		spawnParticles(this.targetX, this.targetY);
		fireworkArray.splice(index, 1);
	} else {
		this.x += velocityX;
		this.y += velocityY;
	}
};

/**
 * @brief Function used to draw the fireworks.
 */
Firework.prototype.draw = function () {
	context.beginPath();
	context.moveTo(this.fireworkCoordinates[this.fireworkCoordinates.length - 1][0], 
        this.fireworkCoordinates[this.fireworkCoordinates.length - 1][1]);

	context.lineTo(this.x, this.y);
	context.strokeStyle = 'hsl(' + color + ', 100%, ' + this.brightness + '%)';
	context.stroke();
};

/**
 * @brief Function used to create particle objects.
 * @param {*} x Starting x-coordinate of particle.
 * @param {*} y Starting y-coordinate of particle.
 */
function Particle (x, y) {
	this.x = x;
	this.y = y;
	
    // Array used to store coordinates of particle objects:
	this.particleCoordinates = [];
	this.coordinateCount = 5;
	while (this.coordinateCount--) {
		this.particleCoordinates.push([this.x, this.y]);
	}
	
    // Randomly generated speed and angle of particle object:
	this.angle = random(0, Math.PI * 2);
	this.speed = random(1, 10);
	
    // Friction and gravity modifiers used to 
	this.friction = 0.95;
	this.gravity = 1;
	
    // Randomly generate color choice and brightness:
	this.color = random(color - 50, color + 50);
	this.brightness = random(50, 80);
	this.alpha = 1;
	
    // Decay modifier, used to change particle longevity:
	this.decay = random(0.015, 0.03);
}

/**
 * @brief Function used to update the movement of the particle objects.
 * @param {*} index Index of the particle to be updated.
 */
Particle.prototype.update = function (index) {

	this.particleCoordinates.pop();
	this.particleCoordinates.unshift([this.x, this.y]);

	this.speed *= this.friction;

	this.x += Math.cos(this.angle) * this.speed;
	this.y += Math.sin(this.angle) * this.speed + this.gravity;
	this.alpha -= this.decay;
	
	if (this.alpha <= this.decay) {
		particleArray.splice(index, 1);
	}
};

/**
 * @brief Function used to draw the particle objects.
 */
Particle.prototype.draw = function () {
	context.beginPath();
	context.moveTo(this.particleCoordinates[this.particleCoordinates.length - 1][0], 
        this.particleCoordinates[this.particleCoordinates.length - 1][1]);

	context.lineTo(this.x, this.y);
	context.strokeStyle = 'hsla(' + this.color + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
	context.stroke();
};

/**
 * @brief Function used to spawn particles, when the firework reaches its target.
 * @param {*} x Particle starting x-coordinate.
 * @param {*} y Particle starting y-coordinate.
 */
function spawnParticles (x, y) {
	var particleCount = 30;
	while (particleCount--) {
		particleArray.push(new Particle(x, y));
	}
}

/**
 * @brief Function used to loop the animation frames:
 */
function loop () {

	requestAnimFrame (loop);
  
    color = random(0, 360);

    context.fillStyle = 'rgba(0, 0, 0, 0.5)';
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	var numFireworks = fireworkArray.length;
	while (numFireworks--) {
		fireworkArray[numFireworks].draw();
		fireworkArray[numFireworks].update(numFireworks);
	}
	
	var numParticles = particleArray.length;
	while (numParticles--) {
		particleArray[numParticles].draw();
		particleArray[numParticles].update(numParticles);
	}
	
	if (timerTick >= timerTotal) {
		if (!mouseDown) {
			fireworkArray.push(new Firework(random(0, canvas.width), canvas.height, 
            random(0, canvas.width), random(0, canvas.height / 2)));
			timerTick = 0;
		}
	} else {
		timerTick++;
	}
	
	if (limiterTick >= limiterTotal) {
		if (mouseDown) {
			fireworkArray.push(new Firework(random(0, canvas.width), canvas.height, mouseX, mouseY));
			limiterTick = 0;
		}
	} else {
		limiterTick++;
	}
}

// Update the mouse coordinates whenever it is moved:
canvas.addEventListener('mousemove', function (event) {
	mouseX = event.pageX - canvas.offsetLeft;
	mouseY = event.pageY - canvas.offsetTop;
});


// Toggle on for mouse click, hold mouse down to launch more fireworks:
canvas.addEventListener('mousedown', function (event) {
	event.preventDefault();
	mouseDown = true;
});

// Toggle off for mouse click:
canvas.addEventListener('mouseup', function (event) {
	event.preventDefault();
	mouseDown = false;
});

window.requestAnimFrame = (function () {
	return window.requestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
}) ();

window.onload = loop;