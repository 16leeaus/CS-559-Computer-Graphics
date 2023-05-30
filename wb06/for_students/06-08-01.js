// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { OrbitControls } from "../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";

let renderer = new T.WebGLRenderer();
renderer.setSize(500, 500);
document.getElementById("div1").appendChild(renderer.domElement);

// student does the rest.

let scene = new T.Scene();
let camera = new T.PerspectiveCamera();
camera.position.z = 10;
camera.position.y = 5;
camera.position.x = 5;
camera.lookAt(0, 3, 0);

let controls = new OrbitControls(camera, renderer.domElement);

// Overhead day light:
let overhead = new T.AmbientLight("White");
    overhead.position.set(0, 10, 0);
    overhead.intensity = 0.75;
    scene.add(overhead);

// Make the ground plane:
let groundBox = new T.BoxGeometry(6, 0.1, 6);
let groundMesh = new T.Mesh(groundBox, new T.MeshStandardMaterial({ color: "White" }));
// put the top of the box at the ground level (0)
    groundMesh.position.y = -0.05;
    scene.add(groundMesh);

// Make the snowman
    let snowman = new T.Group();

// Declare snow materials

    let snowmanMesh_1 = new T.SphereGeometry(1, 32, 24, 0, Math.PI *2, 0, Math.PI);
    let snowmanMesh_2 = new T.SphereGeometry(0.65, 32, 24, 0, Math.PI *2, 0, Math.PI);
    let snowmanMesh_3 = new T.SphereGeometry(0.33, 32, 24, 0, Math.PI *2, 0, Math.PI);

    let snowmanMat = new T.MeshBasicMaterial({color: "White"});

    let snowman_1 = new T.Mesh(snowmanMesh_1, snowmanMat);
        snowman_1.position.y = 1;
    let snowman_2 = new T.Mesh(snowmanMesh_2, snowmanMat);
        snowman_2.position.y = 2.25;
    let snowman_3 = new T.Mesh(snowmanMesh_3, snowmanMat);
        snowman_3.position.y = 3.1;

// Snowman face

    let face = new T.Group();

    let noseMesh = new T.ConeGeometry(0.05, 0.25, 32, 24, false);
    let leftEye = new T.SphereGeometry(0.05, 32, 24, 0, Math.PI * 2, 0, Math.PI);
    let rightEye = new T.SphereGeometry(0.05, 32, 24, 0, Math.PI * 2, 0, Math.PI);
    let mouthMesh = new T.SphereGeometry(0.05, 32, 24, 0, Math.PI * 2, 0, Math.PI);

    let eyeMat = new T.MeshLambertMaterial({color: "Black"});
    let noseMat = new T.MeshLambertMaterial({color: "Orange"});
    //let mouthMat = new 

    let nose = new T.Mesh(noseMesh, noseMat);
        nose.position.set(1, 3.125, 0.0625);
        nose.rotateOnAxis(new T.Vector3(1, 0, 0), 90);
    let eye_1 = new T.Mesh(leftEye, eyeMat);
        eye_1.position.set(0.90, 3.25, -0.0625);
    let eye_2 = new T.Mesh(rightEye, eyeMat);
        eye_2.position.set(1.1, 3.25, -0.0625);
    let mouth = new T.Mesh(mouthMesh, eyeMat);
        mouth.position.set(1, 3, -0.0625);
    
    face.add(eye_1, eye_2, nose, mouth);
    face.position.x = -1;
    face.position.z = 0.35;

// Add waving arm:

let armGroup = new T.Group();

let armMesh = new T.BoxGeometry(1.25, 0.25, 0.25);
let armMat = new T.MeshLambertMaterial({color: "Orange"});
let arm = new T.Mesh(armMesh, armMat);


  snowman.add(snowman_1, snowman_2, snowman_3, face);
  snowman.position.y = -0.05;
  arm.position.x = 1;
  arm.position.y = 2.25;
scene.add(snowman);


let lastTimestamp; // undefined to start

function animate(timestamp) {
    // Convert time change from milliseconds to seconds
    let timeDelta = 0.001 * (lastTimestamp ? timestamp - lastTimestamp : 0);
    lastTimestamp = timestamp;

    //snowman.rotateY(0.5 * timeDelta);
    //snowman.rotateY(0.5 * timeDelta);


    renderer.render(scene, camera);

    window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);