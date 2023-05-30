/*jshint esversion: 6 */

let slider = document.getElementById("slider");
let startButton = document.getElementById("startButton");
let stopButton = document.getElementById("stopButton");

let value = 0;
let speed = 0;
let stopped;

function advanceSlider() {
    speed = 1;
    if (stopped == false){
        value = (Number(slider.value) + speed) % 100;
        slider.value = value.toString();
    }

    startButton.onclick = function() {
        stopped = false;
    };

    stopButton.onclick = function() {
        stopped = true;
    };

    window.requestAnimationFrame(advanceSlider);
}

window.requestAnimationFrame(advanceSlider);