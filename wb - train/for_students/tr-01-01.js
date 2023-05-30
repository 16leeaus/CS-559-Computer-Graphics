// @ts-check
/* jshint -W069, esversion:6 */

import { draggablePoints } from "../libs/CS559/dragPoints.js";

/**
 * drawing function for box 2
 *
 * Use this UI code!
 **/

/* no need for onload - we use defer */


let canvas = document.getElementById("canvas1");
if (!(canvas instanceof HTMLCanvasElement))
    throw new Error("Canvas is not HTML Element");

let context = canvas.getContext("2d");

let thePoints = [
    [100, 100],
    [175, 100],
    [200, 150],
    [175, 200],
    [100, 200],
    [75, 150]
];

let width = canvas.width,
    height = canvas.height;

/**
 * the draw function - which the student will fill in - takes a 
 * timestamp parameter, because it will be passed to requestAnimationFrame
 * 
 * However, in most cases, you can ignore the timestamp
 * 
 * @param {DOMHighResTimeStamp} timestamp 
 */
function draw(timestamp) {
/** student does stuff here **/
    context.clearRect(0, 0, width, height);
    // draw the control points
    thePoints.forEach(function(pt) {
    context.beginPath();
    context.arc(pt[0], pt[1], 5, 0, Math.PI * 2);
    context.closePath();
    context.fill();
    });

    for (let i = 0; i < thePoints.length; i++) {
    let previous = thePoints[i == 0 ? thePoints.length -1 : i-1];
    let current = thePoints[i];
    let next = thePoints[i == thePoints.length -1 ? 0 : i + 1];

    context.moveTo(current[0], current[1]);
    context.lineTo(next[0], next[1]);
    context.stroke();
    }
}

draggablePoints(canvas, thePoints, draw);

// draw things when everything is ready
window.requestAnimationFrame(draw);

