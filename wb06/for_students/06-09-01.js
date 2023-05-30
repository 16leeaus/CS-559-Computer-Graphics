// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { OrbitControls } from "../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";
import { setupBasicScene } from "./06-09-01-helpers.js";

// students can use the object loader
// uncomment this if necessary
 import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";

/** Setup the window */
/** @type{number} */
let wid = 670; // window.innerWidth;
/** @type{number} */
let ht = 500; // window.innerHeight;
/** @type{T.WebGLRenderer} */
let renderer = new T.WebGLRenderer();
renderer.setSize(wid, ht);
renderer.shadowMap.enabled = true;

document.getElementById("museum_area").appendChild(renderer.domElement);

/* setupBasicScene creates a scene and puts the pedestals in place */
/** @type{T.Scene} */
let scene = setupBasicScene();

// Here, we add a basic, simple first object to the museum.
/**@type{T.Material} */
let material = new T.MeshPhongMaterial({
  color: "#00aa00",
  shininess: 15,
  specular: "#00ff00",
});
/**@type{T.Geometry} */
let geometry = new T.BoxGeometry(0.5, 0.5, 0.5);
/**@type{T.Mesh} */
let cube = new T.Mesh(geometry, material);
cube.position.set(2, 1.35, 2);
cube.rotation.set(Math.PI / 4, 0, Math.PI / 4);
cube.castShadow = true;

// Load astronaut from files:

  let loader = new OBJLoader();
  let astrogroup = new T.Group();
  let astroMat = new T.MeshStandardMaterial({
    color: "White"
  });
  let obj = loader.loadAsync("./objects/07-astronaut.obj");
  obj.then(function(astronaut) { 
    astronaut.traverse(function (node){
      if (node instanceof T.Mesh) {
        node.material = astroMat;
      }
    });
    astrogroup.add(astronaut);
  });

  scene.add(astrogroup);
  astrogroup.position.set(-2, 1.7, 2);
  astrogroup.scale.set(0.125, 0.125, 0.125);

// Make planet with primitives:

  let planet = new T.Group();
  let planetmesh = new T.SphereGeometry(0.5, 32, 24, 0, Math.PI *2, 0, Math.PI);
  let planetmat = new T.MeshBasicMaterial({
    color: "#0000CD",
    reflectivity: 75
  });

  let ringsmesh = new T.RingGeometry(0.75, 1, 32, 24, 0, Math.PI * 2);
  let ringsmat = new T.MeshBasicMaterial({
    color: "#D3D3D3",
    reflectivity: 75
  });

  let planetbody = new T.Mesh(planetmesh, planetmat);
    planetbody.castShadow = true;
  let planetrings = new T.Mesh(ringsmesh, ringsmat);
    let vector = new T.Vector3(0, 1, 1);
    planetrings.rotateOnAxis(vector, Math.PI/2);
    planetrings.material.side = T.DoubleSide;
    planetrings.scale.set(0.5, 0.5, 0.5);
    planetrings.castShadow = true;

  planet.add(planetbody);
  planet.add(planetrings);
  scene.add(planet);

  planet.position.set(-2, 1.5, -2);
  planet.scale.set(0.75, 0.75, 0.75);

// Make atom with primitives:

// Yes I know theres an easier way to do this rather than hardcode a million things

let atom = new T.Group();
let nucleus = new T.Group();

  let protonMesh = new T.SphereGeometry(0.5, 32, 24, 0, Math.PI *2, 0, Math.PI);
  let protonMat = new T.MeshLambertMaterial({
    color: "#0000FF",
    flatShading: true
  });

let proton_1 = new T.Mesh(protonMesh, protonMat);
  // Center of atom do not move!
let proton_2 = new T.Mesh(protonMesh, protonMat);
  proton_2.position.set(0.55, 0.55, 0.55);
let proton_3 = new T.Mesh(protonMesh, protonMat);
  proton_3.position.set(-0.55, 0.55, 0.55);
let proton_4 = new T.Mesh(protonMesh, protonMat);
  proton_4.position.set(0.55, -0.55, 0.55);
let proton_5 = new T.Mesh(protonMesh, protonMat);
  proton_5.position.set(0.55, 0.55, -0.55);
let proton_6 = new T.Mesh(protonMesh, protonMat);
  proton_6.position.set(0.55, -0.55, -0.55);
let proton_7 = new T.Mesh(protonMesh, protonMat);
  proton_7.position.set(-0.55, -0.55, 0.55);
let proton_8 = new T.Mesh(protonMesh, protonMat);
  proton_8.position.set(-0.55, -0.55, -0.55);

  let neutronMesh = new T.SphereGeometry(0.5, 32, 24, 0, Math.PI *2, 0, Math.PI);
  let neutronMat = new T.MeshLambertMaterial({
    color: "#00FF00",
    flatShading: true
  });

let neutron_1 = new T.Mesh(neutronMesh, neutronMat);
  neutron_1.position.set(-0.55, 0.55, -0.55);
let neutron_2 = new T.Mesh(neutronMesh, neutronMat);
  neutron_2.position.set(0, 1, 0);
let neutron_3 = new T.Mesh(neutronMesh, neutronMat);
  neutron_3.position.set(0, -1, 0);
let neutron_4 = new T.Mesh(neutronMesh, neutronMat);
  neutron_4.position.set(1, 0, 0);
let neutron_5 = new T.Mesh(neutronMesh, neutronMat);
  neutron_5.position.set(-1, 0, 0);
let neutron_6 = new T.Mesh(neutronMesh, neutronMat);
  neutron_6.position.set(0, 0, 1);
let neutron_7 = new T.Mesh(neutronMesh, neutronMat);
  neutron_7.position.set(0, 0, -1);

  let electronMesh = new T.SphereGeometry(0.5, 32, 24, 0, Math.PI *2, 0, Math.PI);
  let electron_Mat = new T.MeshLambertMaterial({
    color: "#FF0000",
    flatShading: true
  });

// First electron shell
let electron_shell_1 = new T.Group();
let electron_1 = new T.Mesh(electronMesh, electron_Mat);
  electron_1.position.set(0, 0, 2.5);
let electron_2 = new T.Mesh(electronMesh, electron_Mat);
  electron_2.position.set(0, 0, -2.5);

electron_shell_1.add(electron_1, electron_2);
// Second electron shell
let electron_shell_2 = new T.Group();
let electron_3 = new T.Mesh(electronMesh, electron_Mat);
  electron_3.position.set(0, 0, -4);
let electron_4 = new T.Mesh(electronMesh, electron_Mat);
  electron_4.position.set(0, 0, 4);
let electron_5 = new T.Mesh(electronMesh, electron_Mat);
  electron_5.position.set(4.5 * Math.cos(45), 0, 4.5 * Math.cos(45));
let electron_6 = new T.Mesh(electronMesh, electron_Mat);
  electron_6.position.set(-4.5 * Math.cos(45), 0, 4.5 * Math.cos(45));
let electron_7 = new T.Mesh(electronMesh, electron_Mat);
  electron_7.position.set(4.5 * Math.cos(45), 0, -4.5 * Math.cos(45));
let electron_8 = new T.Mesh(electronMesh, electron_Mat);
  electron_8.position.set(-4.5 * Math.cos(45), 0, -4.5 * Math.cos(45));

electron_shell_2.add(electron_3, electron_4, electron_5, electron_6, electron_7, electron_8);

nucleus.add(proton_1, proton_2, proton_3, proton_4, proton_5, proton_6, proton_7, proton_8);
nucleus.add(neutron_1, neutron_2, neutron_3, neutron_4, neutron_5, neutron_6, neutron_7);
atom.add(nucleus, electron_shell_1, electron_shell_2);
atom.scale.set(0.125, 0.125, 0.125);
atom.position.set(2, 1.5, -2);
scene.add(atom);

/* put a spotlight on the first object */
/**@type{T.SpotLight} */
let spotlight_1 = new T.SpotLight(0xaaaaff, 0.5);
spotlight_1.angle = Math.PI / 16;
spotlight_1.position.set(2, 5, 2);
spotlight_1.target = cube;
spotlight_1.castShadow = true;
scene.add(spotlight_1);

// TODO: You need to place the lights.
let spotlight_2 = new T.SpotLight(0xaaaaff, 0.5);
spotlight_2.angle = Math.PI / 16;
spotlight_2.position.set(-2, 5, -2);
spotlight_2.target = planet;
spotlight_2.castShadow = true;
scene.add(spotlight_2);

let spotlight_3 = new T.SpotLight(0xaaaaff, 0.5);
spotlight_3.angle = Math.PI / 16;
spotlight_3.position.set(-2, 5, 2);
spotlight_3.target = astrogroup;
spotlight_3.castShadow = true;
scene.add(spotlight_3);

let spotlight_4 = new T.SpotLight(0xaaaaff, 0.5);
spotlight_4.angle = Math.PI / 16;
spotlight_4.position.set(2, 5, -2);
spotlight_4.target = atom;
spotlight_4.castShadow = true;
scene.add(spotlight_4);

/** create a "main camera" */
/** @type{T.PerspectiveCamera} */
let main_camera = new T.PerspectiveCamera(60, wid / ht, 1, 100);
main_camera.position.set(0, 4, 6);
main_camera.rotation.set(-0.5, 0, 0);

/** this will be the "current camera" - we will switch when a button is pressed */
let active_camera = main_camera;

// TODO: You need to place these cameras.
let camera_1 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
  camera_1.position.set(0 , 1.5, 0);
  camera_1.lookAt(2, 1.5, -2);
let camera_2 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
  camera_2.position.set(0 , 1.5, 0);
  camera_2.lookAt(2, 1.5, 2);
let camera_3 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
  camera_3.position.set(0 , 1.5, 0);
  camera_3.lookAt(-2, 1.5, 2);
let camera_4 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
  camera_4.position.set(0 , 1.5, 0);
  camera_4.lookAt(-2, 1.5, -2);
scene.add(cube);

// add orbit controls - but only to the main camera
let controls = new OrbitControls(main_camera, renderer.domElement);

/** Tie the buttons to the cameras */
function setupCamButton(name, camera) {
  const button = document.getElementById(name);
  if (!(button instanceof HTMLButtonElement))
    throw new Error(`Button ${name} doesn't exist`);
  button.onclick = function () {
    active_camera = camera;
    renderer.render(scene, active_camera);
  };
}
setupCamButton("main_cam", main_camera);
setupCamButton("cam_1", camera_1);
setupCamButton("cam_2", camera_2);
setupCamButton("cam_3", camera_3);
setupCamButton("cam_4", camera_4);

// finally, draw the scene. Also, add animation.
renderer.render(scene, active_camera);

let lastTimestamp; // undefined to start

function animate(timestamp) {
  // Convert time change from milliseconds to seconds
  let timeDelta = 0.001 * (lastTimestamp ? timestamp - lastTimestamp : 0);
  lastTimestamp = timestamp;

  // Animate the cube (basic object)
  cube.rotateOnWorldAxis(new T.Vector3(0, 1, 0), timeDelta);

  // TODO: animate your objects

    // Planet animations:
    planet.rotateOnWorldAxis(new T.Vector3(0, 1, 0), timeDelta);
    //planet.position.y += Math.sin((Math.random() * Math.PI * 2) + timeDelta) * 0.001;

    // Atom animations
    atom.rotateOnWorldAxis(new T.Vector3(0, 1, 0), timeDelta);
    atom.position.y += Math.sin((Math.random() * Math.PI * 2) + timeDelta) * 0.001;
    nucleus.rotateOnWorldAxis(new T.Vector3(-1, 0, 1), timeDelta);
    electron_shell_1.rotateOnWorldAxis(new T.Vector3(-1, 0, -1), timeDelta);
    electron_shell_2.rotateOnWorldAxis(new T.Vector3(1, 0, 1), timeDelta);

    // Astronaut animations
    astrogroup.rotateOnWorldAxis(new T.Vector3(0, -1, 0), timeDelta);
    astrogroup.position.y += Math.sin((Math.random() * Math.PI * 2) + timeDelta) * 0.001;

  // draw and loop
  renderer.render(scene, active_camera);
  window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);
