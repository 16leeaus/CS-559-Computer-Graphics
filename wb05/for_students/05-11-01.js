// @ts-check
/* jshint -W069, esversion:6 */
export {};  // null statement to tell VSCode we're doing a module

// draw the spiral - account for the checkbox and slider

let canvas = (document.getElementById("canvas1"));
if (!(canvas instanceof HTMLCanvasElement))
    throw new Error("Canvas is not HTML Element");

let context = canvas.getContext("2d");

function draw(sliderVal, isChecked) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    console.log(sliderVal);

    let radius = 0;
    let angle = 0;
    let u = 0;
    
    context.lineWidth = 5;
    context.strokeStyle = "#0096FF"; // blue-ish color
    context.fillStyle = "#0096FF"; // blue-ish color
    context.beginPath();
    context.moveTo(canvas.width / 2, canvas.height / 2);
    
    for (let i = 0; i < sliderVal; i++) {
        radius += 0.75;
        u += 1 / sliderVal;
        // make a complete circle every 50 iterations
        angle += (Math.PI * 8) / sliderVal;

        let x = (200 + u * 180* Math.cos(Math.PI * 8 * u));
        let y = (200 + u * 180* Math.sin(Math.PI * 8 * u));

        //let x = canvas.width / 2 + radius * Math.cos(angle);
        //let y = canvas.height / 2 + radius * Math.sin(angle);

        //let x = 200 + i * 180 * Math.cos(Math.PI * 2 * 4 * i);
        //let y = 200 + 180 * i * Math.sin(Math.PI * 2 * 4 * i);
        
        if (checkbox.checked == true){
            context.lineTo(x, y);
          } else {
            context.fillRect(x, y, 5, 5);
          }

    }
    
    context.stroke();
  
}

checkbox.oninput = function() {
    let isChecked = document.getElementById("checkbox").checked;
    draw(isChecked);
};

slider.oninput = function() {
    let sliderVal = Number(slider.value);
    draw(sliderVal);
};

window.requestAnimationFrame(draw);