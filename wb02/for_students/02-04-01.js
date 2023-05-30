// JavaScript file to be filled in by the student for Box 4-1
// we'll give you something to get started...

// you should start by getting the canvas

// then draw the 4 shapes

/* jshint -W069, -W141, esversion:6 */

let canvas = document.getElementById("canvas1");
let context = canvas.getContext('2d');

// Begin Circle: fill: #F8E; stroke:#846

    // Begin Shape
    context.arc(45, 45, 30, 0, Math.PI * 2);

    // Begin Style
    context.fillStyle = "#F8E";
    context.strokeStyle = "#846";
    context.lineWidth = 5;

    // Render Shape
    context.fill();
    context.stroke();

// Begin Capsule: style=“stroke:darkred; fill:lightpink”

    // Begin Shape
    context.beginPath();
    context.moveTo(150, 15);
    context.lineTo(200, 15);
    context.arc(200, 45, 30, 1.5 * Math.PI, 0.5 * Math.PI);
    context.lineTo(150, 75);
    context.arc(150, 45, 30, 0.5 * Math.PI, 1.5 * Math.PI);

    // Begin Style
    context.fillStyle = "lightpink";
    context.strokeStyle = "darkred";

    // Render Shape
    context.fill();
    context.stroke();

// Begin Triangle: fill:sandybrown; stroke:darkgoldenrod

    // Begin Shape
    context.beginPath();
    context.moveTo(15, 180);
    context.lineTo(45, 125);
    context.lineTo(75, 180);
    context.closePath();

    // Begin Style
    context.lineWidth = 5;
    context.fillStyle = "SandyBrown";
    context.strokeStyle = "darkgoldenrod";

    // Render Shape
    context.fill();
    context.stroke();

// Begin Sawtooth: stroke:black; fill:gray
    
    // Begin Shape
    context.beginPath();
    context.moveTo(120, 180);
    context.lineTo(120, 150);
    context.lineTo(150, 125);
    context.lineTo(180, 150);
    context.lineTo(210, 125);
    context.lineTo(240, 150);
    context.lineTo(240, 180);
    context.closePath();

    // Begin Style
    context.lineWidth = 5;
    context.fillStyle = "grey";
    context.strokeStyle = "black";

    // Render Shape
    context.fill();
    context.stroke();