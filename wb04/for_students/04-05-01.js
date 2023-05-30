/**
 * 04-05-01.js - a simple JavaScript file that gets loaded with
 * page 5 of Workbook 4 (CS559).
 *
 * written by Michael Gleicher, January 2019
 * modified January 2020, February 2021
 *
 */

// @ts-check
/* jshint -W069, esversion:6 */

/**
 * If you want to read up on JavaScript classes, 
 * see the tutorial on the class website:
 * 
 * https://graphics.cs.wisc.edu/Courses/559-sp2021/tutorials/oop-in-js-1/
 */
class Boid {
    /**
     * @param {number} x    - initial X position
     * @param {number} y    - initial Y position
     * @param {number} vx   - initial X velocity
     * @param {number} vy   - initial Y velocity
     */
    constructor(x, y, vx = 1, vy = 0, ax = 0, ay = 0, color = "Black", scaleX = 1, scaleY = 1) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.ax = ax;
        this.ay = ay;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        
        this.color = "Black";
        this.radius = 10;
        this.maxForce = 4;
        this.maxSpeed = 1;

        this.position = new Vector([x, y]);
        this.velocity = new Vector([vx, vy]);
        this.acceleration = new Vector([ax, ay]);
    }
    /**
     * Draw the Boid
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.fillStyle = this.color;

        context.beginPath();
        context.moveTo(-5, 0);
        context.lineTo(0, 10);
        context.lineTo(5,0);
        context.lineTo(0,4);
        context.closePath();
        context.fill();
        context.rotate(Math.cos(this.x));

        context.restore();
    }
    /**
     * Perform the "steering" behavior -
     * This function should update the velocity based on the other
     * members of the flock.
     * It is passed the entire flock (an array of Boids) - that includes
     * "this"!
     * Note: dealing with the boundaries does not need to be handled here
     * (in fact it can't be, since there is no awareness of the canvas)
     * *
     * And remember, (vx,vy) should always be a unit vector!
     * @param {Array<Boid>} flock 
     */
    steer(flock) {
        /*  
		// Note - this sample behavior is just to help you understand
		// what a steering function might  do
		// all this one does is have things go in circles, rather than
		// straight lines
		// Something this simple would not count for the advanced points:
		// a "real" steering behavior must consider other boids,
		// or at least obstacles.
		
        // a simple steering behavior: 
        // create a rotation matrix that turns by a small amount
        // 2 degrees per time step
        const angle = 2 * Math.PI / 180;
        const s = Math.sin(angle);
        const c = Math.cos(angle);

        let ovx = this.vx;
        let ovy = this.vy;

        this.vx =  ovx * c + ovy * s;
        this.vy = -ovx * s + ovy * c; */
    }

}

class Obstacle {
    constructor(x, y, xSize, ySize) {
        this.x = x;
        this.y = y;
        this.xSize = xSize;
        this.ySize = ySize;
    }

    draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.fillStyle = "Red";
    }
}

class Vector {
    
    constructor(x, y) {
        this.array = [x, y];
    }

    insert(vx, vy) {
        this.array = [vx, vy];
    }

    add(inputArr) {
        if (this.array.length == inputArr.array.length) {
            var result = [];
            for (let i = 0; i < this.array.length; i++) {
                result.push(this.array[i] + inputArr.array[i]);
            }
            return new Vector(result);
        } else {
            return console.error("Array sizes do not match.");
        }
    }

    sub(inputArr) {
        if (this.array.length == inputArr.array.length) {
            var result = [];
            for (let i = 0; i < this.array.length; i++) {
                result.push(this.array[i] - inputArr.array[i]);
            }
            return new Vector(result);
        } else {
            return console.error("Array sizes do not match.");
        }
    }

    divide(inputScalar) {
        var result = [];
        for (let i = 0; i < this.array.length; i++) {
            result.push(this.array[i] / inputScalar);
        }
        return result;
    }

    limit(inputLimit) {
        console.error("Function not implemented");
    }

    getMagnitude() {
        let vectorMag = Math.sqrt(Math.pow(this.array[0], 2) + Math.pow(this.array[1], 2));
        return vectorMag;
    }

    setMagnitude(vectorMag) {
        console.error("Function not implemented");
    }

}

/** the actual main program
 * this used to be inside of a function definition that window.onload
 * was set to - however, now we use defer for loading
 */

 /** @type Array<Boid> */
let theBoids = [];
let theObjects = [];

let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("flock"));
let context = canvas.getContext("2d");

let speedSlider = /** @type {HTMLInputElement} */ (document.getElementById("speed"));

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    theBoids.forEach(boid => boid.draw(context));

    context.fillStyle = "Red";
    context.fillRect(285, 285, 30, 30);
}

/**
 * 
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
function random (min, max) {
	return Math.random() * (max - min) + min;
}

/**
 * 
 * @param {*} x1 
 * @param {*} y1 
 * @param {*} x2 
 * @param {*} y2 
 * @returns 
 */
function getDistance(x1, y1, x2, y2) {
    var distance = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    return (distance);
}

/**
 * 
 * @param {*} number 
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
function limitNumber(number, min, max) {
    const MIN = min || 1;
    const MAX = max || 4;
    const parsed = parseInt(number);
    return Math.min(Math.max(parsed, MIN), MAX);
}

/**
 * 
 * @param {*} boid 
 */
function stayInBounds(boid) {
    if ((boid.x + boid.vx) > canvas.width) {
        boid.vx = -boid.vx;
        boid.scaleX = -boid.scaleX;
    }

    if ((boid.x + boid.vx) < 0) {
        boid.vx = -boid.vx;
        boid.scaleX = -boid.scaleX;
    }

    if ((boid.y + boid.vy) > canvas.height) {
        boid.vy = -boid.vy;
        boid.scaleY = - boid.scaleY;
    }

    if ((boid.y + boid.vy) < 0) {
        boid.vy = -boid.vy;
        boid.scaleY = -boid.scaleY;
    }

    if (((boid.x + boid.vx) > 285 && (boid.x + boid.vx) < 315) && ((boid.y + boid.vy) > 285 && (boid.y + boid.vy) < 315)) {
        boid.vx = -boid.vx;
        boid.color = "Green";
    }

    if (((boid.x + boid.vx) > 285 && (boid.x + boid.vx) < 315) && ((boid.y + boid.vy) > 285 && (boid.y + boid.vy) < 315)) {
        boid.vy = -boid.vy;
        boid.color = "Green";
    }
    
}

/**
 * 
 * @param {*} boid 
 */
function colorChange(boid) {
    if ((boid.x < 20 ) || (boid.y < 20) || (boid.x > (canvas.width - 20)) || (boid.y > (canvas.height - 20))){
        boid.color = "Green";
    }
    
    else {
        boid.color = "Black";
    }
}

/**
 * 
 * @param {*} boid 
 */
function detectCollision(boid) {
    for (let i  = 0; i < theBoids.length; i++) {
        if (boid === theBoids[i]) { 
            continue;
        }

        if (getDistance(boid.x, boid.y, theBoids[i].x, theBoids[i].y) - (boid.radius + theBoids[i].radius) < 0) {
            boid.color = "Green";
            theBoids[i].color = "Green";
        }
    }
}

function detectCollisionBounce(boid) {
    for (let i  = 0; i < theBoids.length; i++) {
        if (boid === theBoids[i]) { 
            continue;
        }

        if((Math.abs(boid.x - theBoids[i].x) < (boid.radius + boid.radius)) && (Math.abs(boid.y - theBoids[i].y) < (boid.radius + boid.radius))) {
            //reverse ball one
            boid.vx = -boid.vx;
            boid.vy = -boid.vy;

            //reverse ball two
            theBoids[i].vx = -theBoids[i].vx;
            theBoids[i].vy = -theBoids[i].vy;
        }
    }
}

function detectCollisionObjects(boid) {
    for (let i = 0; i < theObjects.length; i++) {
        if ((boid.x + boid.vx) > (theObjects[i].x + theObjects[i].xSize)) {
            boid.vx = -boid.vx;
        }

        if ((boid.x + boid.vx) > (theObjects[i].x + theObjects[i].xSize)) {
            boid.vx = -boid.vx;
        }

        if ((boid.x + boid.vx) > (theObjects[i].x + theObjects[i].xSize)) {
            boid.vx = -boid.vx;
        }

        if ((boid.x + boid.vx) > (theObjects[i].x + theObjects[i].xSize)) {
            boid.vx = -boid.vx;
        }
    }
}

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    console.log("Coordinate x: " + x, 
                "Coordinate y: " + y);

    return {x: event.clientX - rect.left, y: event.clientY - rect.top}
}

function drawObstacles(event) {
    var pos = getMousePosition(canvas, event);
    let posx = pos.x;
    let posy = pos.y;
    context.fillStyle = "Red";
    context.arc(posx, posy, 50, 0, 2 * Math.PI);
}

let canvasElem = document.querySelector("canvas");
  
canvasElem.addEventListener("mousedown", function(e) {
    getMousePosition(canvasElem, e);
});

/**
 * Create some initial boids
 * STUDENT: may want to replace this
 */
theBoids.push(new Boid(100, 100));
theBoids.push(new Boid(200, 200, -1, 0));
theBoids.push(new Boid(300, 300, 0, -1));
theBoids.push(new Boid(400, 400, 0, 1));

/**
 * Handle the buttons
 */
document.getElementById("add").onclick = function () {
    for (let i = 0; i < 10; i ++) {
        theBoids.push(new Boid(0, 0, random(1, 2), random(1, 2)));
    }
};
document.getElementById("clear").onclick = function () {
    theBoids = [];
};

let lastTime; // will be undefined by default
/**
 * The Actual Execution
 */
function loop(timestamp) {
    // time step - convert to 1/60th of a second frames
    // 1000ms / 60fps
    const delta = (lastTime ? timestamp-lastTime : 0) * 1000.0/60.0;

    // change directions
    theBoids.forEach(boid => boid.steer(theBoids));
    // move forward
    let speed = Number(speedSlider.value);
    theBoids.forEach(function (boid) {
        boid.x += boid.vx * speed;
        boid.y += boid.vy * speed;
    });
    // make sure that we stay on the screen
    theBoids.forEach(function (boid) {
        stayInBounds(boid);
        colorChange(boid);
        detectCollision(boid);
        detectCollisionBounce(boid);
        detectCollisionObjects(boid);
    });
    // now we can draw
    draw();
    // and loop
    window.requestAnimationFrame(loop);

}
// start the loop with the first iteration
window.requestAnimationFrame(loop);
