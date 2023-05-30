// @ts-check
/* jshint -W069, esversion:6 */

/**
 * drawing function for box 1
 *
 * draw something.
 **/

// note that checking that canvas is the right type of element tells typescript
// that this is the right type - it's a form of a safe cast 
let canvas = document.getElementById("canvas1");
if (!(canvas instanceof HTMLCanvasElement))
    throw new Error("Canvas is not HTML Element");

let context = canvas.getContext("2d");

context.beginPath();

// change these so that rather than connecting with straight lines,
// they use cardinal interpolation
// your points should cycle - to make a loop

context.moveTo(50,150);     // you don't need to change this line

context.bezierCurveTo(100, 167, 300, 167, 350, 150); 
context.bezierCurveTo(400, 133, 375, 58, 350, 50); 
context.bezierCurveTo(325, 42, 250, 100, 200, 100); 
context.bezierCurveTo(150, 100, 75, 42, 50, 50);
context.bezierCurveTo(25, 58, 0, 133, 50, 150);

context.closePath();
context.lineWidth = 3;
context.stroke();
