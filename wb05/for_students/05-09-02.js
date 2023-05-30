// @ts-check
export {};  // null statement to tell VSCode we're doing a module

// draw a picture using curves!

let canvas = document.getElementById("canvas1");
if (!(canvas instanceof HTMLCanvasElement))
    throw new Error("Canvas is not HTML Element");

    let context = canvas.getContext("2d");

    // Color foreground + night sky
    
        context.fillStyle = "Onyx";
        context.fillRect(0,0, 400, 325);
        context.fill();
    
        context.fillStyle = "#FF9333";
        context.fillRect(0,300, 400, 25);
        context.fill();
    
        context.fillStyle = "#FFC433";
        context.fillRect(0,325, 400, 25);
        context.fill();
    
        context.fillStyle = "Tan";
        context.fillRect(0,350, 400, 50);
        context.fill();
    
    // Translate to (200,150), this is center for the UFO
    
        context.translate(200,150);
    
        // Setup fill style 
    
            context.fillStyle = "Grey";
            context.lineWidth = 4;
    
        // Draw UFO
    
            context.strokeStyle = "lightGreen";
    
            context.save();
            context.bezierCurveTo(0, 100, 200, 100, 100, 10);
            context.moveTo(0,100);
            context.bezierCurveTo(0, 100, -200, 100, -100, 10);
            context.moveTo(-100,10);
            context.bezierCurveTo(-50, -35, 50, -35, 100, 10);
            context.stroke();
            context.fill();
    
        // Fill in center
    
            context.moveTo(0,100);
            context.lineTo(-100,10);
            context.lineTo(100,10);
            context.fill();
    
        // Abduction beam
    
            context.fillStyle = "rgba(144, 238, 144, 0.5)";
    
            context.beginPath();
            context.moveTo(10,100);
            context.lineTo(40,200);
            context.moveTo(-10,100);
            context.lineTo(-40,200);
            context.moveTo(-40,200);
            context.bezierCurveTo(-20, 225, 20, 225, 40, 200);
    
            context.fill();
            
            context.stroke();
    
            context.beginPath();
            context.moveTo(-40, 200);
            context.lineTo(40,200);
            context.lineTo(10,100);
            context.lineTo(-10,100);
            context.closePath();
            context.fill();
    
        // Lights 
    
            context.fillStyle = "rgba(144, 238, 144, 0.5)";
    
            context.moveTo(0,0);
            context.arc(-40, 90, 5, 0, 2* Math.PI);
            context.moveTo(0,0);
            context.arc(40, 90, 5, 0, 2* Math.PI);
    
            context.moveTo(0,0);
            context.arc(-90, 80, 5, 0, 2* Math.PI);
            context.moveTo(0,0);
            context.arc(90, 80, 5, 0, 2* Math.PI);
    
            context.moveTo(0,0);
            context.arc(-120, 50, 5, 0, 2* Math.PI);
            context.moveTo(0,0);
            context.arc(120, 50, 5, 0, 2* Math.PI);
    
            context.moveTo(0,0);
            context.arc(-90, 10, 5, 0, 2* Math.PI);
            context.moveTo(0,0);
            context.arc(90, 10, 5, 0, 2* Math.PI);
    
            context.moveTo(0,0);
            context.arc(-40, -10, 5, 0, 2* Math.PI);
            context.moveTo(0,0);
            context.arc(40, -10, 5, 0, 2* Math.PI);
    
            context.fill();
    
        // Central cockpit 
    
            context.translate(0,40);
    
            context.fillStyle = "DarkGrey";
            context.beginPath();
            context.moveTo(20,0);
            context.ellipse(0,0, 50, 25, 0, 2 * Math.PI, 0);
            context.fill();
            context.stroke();
    
            context.beginPath();
            context.fillStyle = "Black";
            context.ellipse(0,0, 20, 20, 0, 2 * Math.PI, 0);
            context.fill();
    
        // Draw stars
            context.beginPath();
            context.fillStyle = "White";
            context.beginPath();
            context.arc(-100, -100, 2.5, 0, 2 * Math.PI);
            context.closePath();
            context.arc(-75, -134, 2.5, 0, 2 * Math.PI);
            context.closePath();
            context.arc(-125, -178, 2.5, 0, 2 * Math.PI);
            context.closePath();
            context.arc(-150, -126, 2.5, 0, 2 * Math.PI);
            context.closePath();
            context.arc(-75, -134, 2.5, 0, 2 * Math.PI);
            context.closePath();
            context.arc(134, -134, 2.5, 0, 2 * Math.PI);
            context.closePath();
            context.arc(158, -90, 2.5, 0, 2 * Math.PI);
            context.closePath();
            context.arc(-158, -90, 2.5, 0, 2 * Math.PI);
            context.closePath();
            context.arc(-75, -134, 2.5, 0, 2 * Math.PI);
            context.closePath();
            context.arc(-25, -125, 2.5, 0, 2 * Math.PI);
            context.closePath();
            context.arc(-34, -174, 2.5, 0, 2 * Math.PI);
            context.closePath();
            context.arc(36, -98, 2.5, 0, 2 * Math.PI);
    
            context.closePath();
            context.arc(90, -120, 2.5, 0, 2 * Math.PI);
            context.closePath();
            context.arc(115, -134, 2.5, 0, 2 * Math.PI);
            context.closePath();
            context.arc(-75, -150, 2.5, 0, 2 * Math.PI);
    
            context.fill();
