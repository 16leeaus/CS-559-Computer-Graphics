/*jshint esversion: 6 */

let text = document.getElementById("ex3-span");
let r = 255, g = 0, b = 0;

function fade() {
    if (r > 0 && b == 0) {
        r--;
        g++;
    }

    if (g > 0 && r == 0) {
        g--;
        b++;
    }

    if (b > 0 && g == 0) {
        r++;
        b--;
    }

    text.style.backgroundColor = ("rgb(" + r + "," + g + "," + b + ")");
    window.requestAnimationFrame(fade);
}

window.requestAnimationFrame(fade);