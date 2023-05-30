// @ts-check
/* jshint -W069, -W141, esversion:6 */
export {};

// somewhere in your program you'll want a line
// that looks like:
const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
let context = canvas.getContext('2d');

// and you will want to make an animation loop with something like:
/**
 * the animation loop gets a timestamp from requestAnimationFrame
 * 
 * @param {DOMHighResTimeStamp} timestamp 
 */

const height = canvas.height / 2;
const width = canvas.width / 2;
const bladeLength = 10;
const bladeThin = 4;

let mouseDown = false,
    mouseX,
    mouseY;

let centerX = canvas.width / 4,
    centerY = canvas.height / 4;

function calcDist (p1x, p1y, p2x, p2y) {
    var displacementX = p1x - p2x, displacementY = p1y - p2y;
    return Math.sqrt(Math.pow(displacementX, 2) + Math.pow(displacementY, 2));
}

function drawQuadcopterBlack(angle, propSpeed) {
    context.save();
    
    context.translate(width, height);
    context.rotate(propSpeed);

    function drawcopter(color) {
        // Draw the main "cockpit".
        context.beginPath();
        context.fillStyle = color.toString();
        context.arc(0, 0, 15, 2 * Math.PI, 0);
        context.fill();
        context.closePath();
        // Draw the tail.
        context.beginPath();
        context.moveTo(-15, 0);
        context.lineTo(0,-35);
        context.lineTo(15,0);
        context.fill();
        context.closePath();
        // Draw the tail rotor.
        context.fillStyle = "Grey";
        context.rotate(90 * Math.PI / 180);
        context.fillRect(-45, 0, 15, 4);

        // Draw main rotor hub.
        context.beginPath();
        context.fillStyle = "White";
        context.arc(0, 0, 2, 2 * Math.PI, 0);
        context.fill();
        context.closePath();

        // Draw the 4 arms.
        context.fillStyle = "Grey";
        context.rotate(45 * Math.PI / 180);
        context.fillRect(2, -2, 30, 4);
        context.fillRect(-32, -2, 30, 4);

        context.rotate(90 * Math.PI / 180);
        context.fillRect(2, -2, 30, 4);

        context.rotate(180 * Math.PI / 180);
        context.fillRect(2, -2, 30, 4);
        
        // Draw the 4 attached rotors.
        context.save();
        context.translate(30,0);
        drawBlades();
        context.restore();

        context.save();
        context.translate(-30,0);
        drawBlades();
        context.restore();

        context.save();
        context.translate(0,30);
        drawBlades();
        context.restore();

        context.save();
        context.translate(0,-30);
        drawBlades();
        context.restore();
    }

    context.translate(250,0);
    drawcopter("Blue");

    /* context.restore();
    context.translate(canvas.width/2,canvas.height/2);

    drawcopter("Red"); */
    
    
    function drawBlades() {
        context.rotate(-angle); // Spin the props.
        // Draw the props, with main hub.
        for (let blades = 0; blades < 4; blades++) {
            context.fillStyle = "black";
            context.fillRect(0, -bladeThin / 2, bladeLength, bladeThin);
            context.beginPath();
            context.fillStyle = "White";
            context.arc(0, 0, 2, 2 * Math.PI, 0);
            context.fill();
            context.closePath();
            context.rotate(Math.PI / 2);
        }
    }
}

function drawQuadcopterRed(angle, propSpeed) {
    context.save();

    context.translate(width, height);
    context.rotate(propSpeed);

    //this.x = width;
    //this.y = height;

    function drawcopter(color) {
        // Draw the main "cockpit".
        context.beginPath();
        context.fillStyle = color.toString();
        context.arc(0, 0, 15, 2 * Math.PI, 0);
        context.fill();
        context.closePath();
        // Draw the tail.
        context.beginPath();
        context.moveTo(-15, 0);
        context.lineTo(0,-35);
        context.lineTo(15,0);
        context.fill();
        context.closePath();
        // Draw the tail rotor.
        context.fillStyle = "Grey";
        context.rotate(90 * Math.PI / 180);
        context.fillRect(-45, 0, 15, 4);

        // Draw main rotor hub.
        context.beginPath();
        context.fillStyle = "White";
        context.arc(0, 0, 2, 2 * Math.PI, 0);
        context.fill();
        context.closePath();

        // Draw the 4 arms.
        context.fillStyle = "Grey";
        context.rotate(45 * Math.PI / 180);
        context.fillRect(2, -2, 30, 4);
        context.fillRect(-32, -2, 30, 4);

        context.rotate(90 * Math.PI / 180);
        context.fillRect(2, -2, 30, 4);

        context.rotate(180 * Math.PI / 180);
        context.fillRect(2, -2, 30, 4);
        
        // Draw the 4 attached rotors.
        context.save();
        context.translate(30,0);
        drawBlades();
        context.restore();

        context.save();
        context.translate(-30,0);
        drawBlades();
        context.restore();

        context.save();
        context.translate(0,30);
        drawBlades();
        context.restore();

        context.save();
        context.translate(0,-30);
        drawBlades();
        context.restore();
    }

    drawcopter("Red");
    
    function drawBlades() {
        context.rotate(angle); // Spin the props.
        // Draw the props, with main hub.
        for (let blades = 0; blades < 4; blades++) {
            context.fillStyle = "black";
            context.fillRect(0, -bladeThin / 2, bladeLength, bladeThin);
            context.beginPath();
            context.fillStyle = "White";
            context.arc(0, 0, 2, 2 * Math.PI, 0);
            context.fill();
            context.closePath();
            context.rotate(Math.PI / 2);
        }
    }
}

function drawScene() {
    let a = performance.now() / 50;
    let b = performance.now() / 2000;
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    context.save();
    drawQuadcopterBlack(a, b);
    context.restore();

    a = performance.now() / 200;
    b = performance.now() / -2000;
    context.save();
    drawQuadcopterRed(a, b);
    context.restore();

    window.requestAnimationFrame(drawScene);
}

canvas.addEventListener('mouseup', function (event) {
	event.preventDefault();
	mouseDown = false;
});

drawScene();