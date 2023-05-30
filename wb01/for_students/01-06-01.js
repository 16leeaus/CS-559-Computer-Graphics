/*jshint esversion: 6 */

let slider1 = document.getElementById("box1-slider1");
let slider2 = document.getElementById("box1-slider2");
let slider3 = document.getElementById("box1-slider3");

slider1.oninput = function() {
    slider3.value = slider2.value - slider1.value;
    //let slider3prev = slider3.value;
};

slider2.oninput = function() {
    slider3.value = slider2.value - slider1.value;
    //let slider3prev = slider3.value;
};

slider3.oninput = function() {
    if (slider3.value <= 0) {
        slider2.value = slider1.value - slider3.value;
    }

    if (slider3.value >= 0) {
        slider1.value = slider2.value - slider3.value;
    }
};



