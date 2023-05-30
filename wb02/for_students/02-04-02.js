// JavaScript file to be filled in by the student for Box 4-2
// we'll give you something to get started...

// you should start by getting the canvas
// then draw whatever you want!

/* jshint -W069, esversion:6 */

// Setup the canvas and get the context params:
let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("canvas1"));
let context = canvas.getContext('2d');

context.fillStyle = "rgba(0, 0, 255, 0.55)";
context.fillRect(0, canvas.height / 3, canvas.width, canvas.height);

context.fillStyle = "orange";
context.beginPath();
context.ellipse(200, 250, 25, 45, Math.PI / 2, 0, 2 * Math.PI);

context.fillStyle = "Yellow";
context.beginPath();
context.arc(50, 50 , 50, 0, 2 * Math.PI);
context.fill();

function boat () {
    context.fillStyle = "Brown";
    context.beginPath();
    context.ellipse(300, 150, 100, 50, 0, 0, Math.PI);
    context.fillRect(350, 150, 10, -75);
    context.fill();
}

function sail () {
    context.fillStyle = "rgba(255, 0, 0, 0.55)";
    context.beginPath();
    context.moveTo(300, 150);
    context.lineTo(350, 75);
    context.lineTo(350, 150);
    context.fill();
}


function fish () {
    context.fillStyle = "orange";
    context.beginPath();
    context.ellipse(200, 250, 25, 45, Math.PI / 2, 0, 2 * Math.PI);
    context.moveTo(225, 250);
    context.lineTo(275, 225);
    context.lineTo(275, 275);
    context.fill();

    context.fillStyle = "black";
    context.beginPath();
    context.arc(175, 240, 5, 0 , 2 * Math.PI);
    context.fill();
}

fish();
boat();
sail();