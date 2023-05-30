// @ts-check
export {};  // null statement to tell VSCode we're doing a module

// recreate the picture from SVG - but don't use quadratics

let canvas = document.getElementById("canvas1");
if (!(canvas instanceof HTMLCanvasElement))
    throw new Error("Canvas is not HTML Element");

let context = canvas.getContext("2d");

context.strokeStyle = "Black";
context.fillStyle = "#CCC";
context.lineWidth = 10;

context.beginPath();
context.moveTo(150, 100); // 150, 100
context.bezierCurveTo(150, 150, 117, 150, 100, 150);  // 150, 150, x, y, 100, 150
context.bezierCurveTo(83, 150, 50, 150, 50, 100);
context.bezierCurveTo(50, 50, 83, 50, 100, 50);
context.bezierCurveTo(100, 50, 100, 100, 150, 100);
context.closePath();

context.stroke();
context.fill();