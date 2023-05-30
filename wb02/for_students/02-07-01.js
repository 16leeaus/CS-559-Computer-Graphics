/**
 * Starter file for 02-07-01.js - the only exercise of page 7 of Workbook 2
 */

// @ts-check

// Find the canvas and start!

/* jshint -W069, -W141, esversion:6 */
/** @type {HTMLCanvasElement} */
let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("box1canvas"));
let context = canvas.getContext('2d');

let dotsArr = [];

let mouseX = -10;
let mouseY = -10;

canvas.onmousemove = function(event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;

    let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
    mouseX -= box.left;
    mouseY -= box.top;

    context.clearRect(0, 0, canvas.width, canvas.height);

    dotsArr.forEach(function(dot){
        context.fillStyle = dot.color;
        context.beginPath();
        context.arc(dot.x, dot.y, 10, 0, 2 *Math.PI);
        context.fill();
        context.closePath();

    // If mouse is over circle, change to yellow.
    if (context.isPointInPath(mouseX, mouseY)){
        dot.color = "Yellow";
    }
    // Otherwise green.
    else {
        dot.color = "Green";
    }

    });
};

canvas.onclick = function(dotEvent) {
    let mouseX = dotEvent.clientX;
    let mouseY = dotEvent.clientY;

    let box = /** @type {HTMLCanvasElement} */(dotEvent.target).getBoundingClientRect();
    mouseX -= box.left;
    mouseY -= box.top;

    dotsArr.push({"x":mouseX,"y":mouseY, color:"Green"});
    console.log(dotsArr);
};

