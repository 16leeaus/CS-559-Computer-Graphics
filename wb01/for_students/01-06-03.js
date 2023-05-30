/*jshint esversion: 6 */

let lasttime;
let value = 0;
let speed = 1;
let run = true;

let slider = document.getElementById("slider");

function sliderBounce(timestamp) {

    if (! (lasttime == undefined) && run == true) {

        const delta = (timestamp - lasttime) / 10.0;

        if (Number(slider.value) == 0) {
            speed = delta;
        }
        
        if (Number(slider.value) == 99) {
            speed = -delta;
        } 

        value = (value + speed) % 100;
        slider.value = value.toString();
    }

    lasttime = timestamp;
    window.requestAnimationFrame(sliderBounce);
}

window.requestAnimationFrame(sliderBounce);
