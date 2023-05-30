// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { OrbitControls } from "../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";

let renderer = new T.WebGLRenderer();
renderer.setSize(400, 400);
document.getElementById("div1").appendChild(renderer.domElement);

let scene = new T.Scene();
let camera = new T.PerspectiveCamera();
camera.position.z = 10;
camera.position.y = 5;
camera.position.x = 5;
camera.lookAt(0, 3, 0);

// since we're animating, add OrbitControls
let controls = new OrbitControls(camera, renderer.domElement);

// Ambient light doesn't work since we're using physical materials
// scene.add(new T.AmbientLight("white",0.2));

//** STUDENT: Add some lights here */

// Very faint overhead spotlight:
let overhead = new T.AmbientLight("white");
//spot1.angle = Math.PI ; // narrow (5 degrees)
overhead.position.set(0, 10, 0);
overhead.intensity = 0.125;
// Add light and use default target
scene.add(overhead);

// Very bright, directly over regular cube:
let spot2 = new T.SpotLight("blue");
    spot2.angle = Math.PI / 8; // narrow (5 degrees)
    spot2.position.set(1.9, 3, 1.9);
    spot2.target.position.set(2, 1.5, 2);
// Add light and target to scene
scene.add(spot2);
scene.add(spot2.target);

// Light pointed on the spinning cube:
let spot3 = new T.SpotLight("green");
    spot3.angle = Math.PI / 4; // narrow (5 degrees)
    spot3.position.set(-1, 0.5, -1);
    spot3.target.position.set(-2, 1, -2);
// Add light and target to scene
scene.add(spot3);
scene.add(spot3.target);

// Lights pointing at centered cube, on 3 sides:
let spot4 = new T.SpotLight("red");
    spot4.angle = Math.PI / 32; // narrow (5 degrees)
    spot4.position.set(0, 0.5, -2);
    spot4.target.position.set(0, 0.5, 0);
    spot4.distance = 3;
// Add light and target to scene
scene.add(spot4);
scene.add(spot4.target);

let spot5 = new T.SpotLight("red");
    spot5.angle = Math.PI / 32; // narrow (5 degrees)
    spot5.position.set(0, 0.5, 2);
    spot5.target.position.set(0, 0.5, 0);
    spot5.distance = 3;
// Add light and target to scene
scene.add(spot5);
scene.add(spot5.target);

let spot6 = new T.SpotLight("red");
    spot6.angle = Math.PI / 16; // narrow (5 degrees)
    spot6.position.set(0, 5, 0);
    spot6.target.position.set(0, 1, 0);
    //spot6.distance = 3;
// Add light and target to scene
scene.add(spot6);
scene.add(spot6.target);

// Spotlight below the tilted box:
let spot7 = new T.SpotLight("white");
    spot7.angle = Math.PI / 8; // narrow (5 degrees)
    spot7.position.set(0, 0, 0);
    spot7.target.position.set(2, 1, -2);
    //spot6.distance = 3;
// Add light and target to scene
scene.add(spot7);
scene.add(spot7.target);

// Spotlights for orange box
let spot8 = new T.SpotLight("orange");
    spot8.angle = Math.PI / 8; // narrow (5 degrees)
    spot8.position.set(0, 0, 0);
    spot8.target.position.set(-2, 1, 2);
    //spot6.distance = 3;
// Add light and target to scene
scene.add(spot8);
scene.add(spot8.target);

let spot9 = new T.SpotLight("orange");
    spot9.angle = Math.PI / 8; // narrow (5 degrees)
    spot9.position.set(-4, 1, 4);
    spot9.target.position.set(-2, 1, 2);
    spot9.distance = 4;
// Add light and target to scene
scene.add(spot9);
scene.add(spot9.target);

// make a ground plane
let groundBox = new T.BoxGeometry(6, 0.1, 6);
let groundMesh = new T.Mesh(
groundBox,
new T.MeshStandardMaterial({ color: 0x888888 })
);
// put the top of the box at the ground level (0)
groundMesh.position.y = -0.05;
scene.add(groundMesh);

/**
 * Make some cubes in various places and orientations
 */

let box = new T.BoxGeometry(1, 1, 1);
let cube1 = new T.Mesh(box, new T.MeshStandardMaterial({ color: "white" }));
cube1.position.set(2, 0.5, 2);
scene.add(cube1);

let cube2 = new T.Mesh(box, new T.MeshStandardMaterial({ color: "white" }));
cube2.position.set(-2, 0.5, 2);
cube2.rotateY(45);
scene.add(cube2);

let cube3 = new T.Mesh(box, new T.MeshStandardMaterial({ color: "white" }));
cube3.position.y = 0.5;
scene.add(cube3);

let cube4 = new T.Mesh(box, new T.MeshStandardMaterial({ color: "white" }));
cube4.position.set(2, Math.sqrt(2) / 2, -2);
cube4.rotateX(45);
scene.add(cube4);

let cube5 = new T.Mesh(box, new T.MeshStandardMaterial({ color: "white" }));
cube5.position.set(-2, 1, -2);
scene.add(cube5);

let lastTimestamp; // undefined to start
  
function animate(timestamp) {
    // Convert time change from milliseconds to seconds
    let timeDelta = 0.001 * (lastTimestamp ? timestamp - lastTimestamp : 0);
    lastTimestamp = timestamp;

    cube5.rotateX(0.5 * timeDelta);
    cube5.rotateY(0.5 * timeDelta);
    renderer.render(scene, camera);

    window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);

