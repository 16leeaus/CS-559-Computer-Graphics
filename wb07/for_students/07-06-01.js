/*jshint esversion: 6 */
// @ts-check

/**
 * Minimal Starter Code for the QuadCopter assignment
 */

 import * as T from "../libs/CS559-Three/build/three.module.js";
 import { Group } from "../libs/CS559-Three/build/three.module.js";
 import { OrbitControls } from "../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";
 
 
 let renderer = new T.WebGLRenderer();
 renderer.setSize(600, 400);
 document.body.appendChild(renderer.domElement);
 
 let scene = new T.Scene();
 let camera = new T.PerspectiveCamera(
         40,
         renderer.domElement.width / renderer.domElement.height,
         1,
         1000
     );
 
 camera.position.z = 10;
 camera.position.y = 5;
 camera.position.x = 5;
 camera.lookAt(0, 0, 0);
 
 // since we're animating, add OrbitControls
 let controls = new OrbitControls(camera, renderer.domElement);
 
 scene.add(new T.AmbientLight("white", 0.2));
 
 // two lights - both a little off white to give some contrast
 let dirLight1 = new T.DirectionalLight(0xf0e0d0, 1);
 dirLight1.position.set(1, 1, 0);
 scene.add(dirLight1);
 
 let dirLight2 = new T.DirectionalLight(0xd0e0f0, 1);
 dirLight2.position.set(-1, 1, -0.2);
 scene.add(dirLight2);
 
 // make a ground plane
 let groundBox = new T.BoxGeometry(10, 0.1, 10);
 let groundMesh = new T.Mesh(
         groundBox,
         new T.MeshStandardMaterial({ color: 0x88b888, roughness: 0.9 })
     );
 // put the top of the box at the ground level (0)
 groundMesh.position.y = -0.05;
 scene.add(groundMesh);
 
 // Quadcopter group:
 
 let quadcopter = new Group();
 
 let packageGeom = new T.BoxGeometry(0.5, 0.5, 0.5);
 let packageMat = new T.MeshBasicMaterial( { color: 0xDEB887} );
 let packageMesh = new T.Mesh(packageGeom, packageMat);
 
 packageMesh.position.set(0, 0.70, 0);
 
 let armGeom = new T.BoxGeometry(0.15, 0.1, 1.5);
 let armMat = new T.MeshBasicMaterial( { color: 0x000000} );
 let armMesh_1 = new T.Mesh(armGeom, armMat);
 let armMesh_2 = new T.Mesh(armGeom, armMat);
 
 armMesh_1.position.set(0, 1, 0);
 armMesh_1.rotateOnWorldAxis(new T.Vector3(0,1,0), Math.PI/4);
 armMesh_2.position.set(0, 1, 0);
 armMesh_2.rotateOnWorldAxis(new T.Vector3(0,1,0), -Math.PI/4);
 
 let prophubGeom = new T.TorusGeometry(1);
 let prophubMat = new T.MeshBasicMaterial( { color: 0x000000} );
 let prophubMesh_1 = new T.Mesh(prophubGeom, prophubMat);
 let prophubMesh_2 = new T.Mesh(prophubGeom, prophubMat);
 let prophubMesh_3 = new T.Mesh(prophubGeom, prophubMat);
 let prophubMesh_4 = new T.Mesh(prophubGeom, prophubMat);
 
 prophubMesh_1.scale.set(0.25, 0.25, 0.25);
 prophubMesh_1.rotateOnWorldAxis(new T.Vector3(1, 0, 0), Math.PI/2);
 prophubMesh_1.position.set(0.65, 1, 0.65);
 
 prophubMesh_2.scale.set(0.25, 0.25, 0.25);
 prophubMesh_2.rotateOnWorldAxis(new T.Vector3(1, 0, 0), Math.PI/2);
 prophubMesh_2.position.set(-0.65, 1, -0.65);
 
 prophubMesh_3.scale.set(0.25, 0.25, 0.25);
 prophubMesh_3.rotateOnWorldAxis(new T.Vector3(1, 0, 0), Math.PI/2);
 prophubMesh_3.position.set(-0.65, 1, 0.65);
 
 prophubMesh_4.scale.set(0.25, 0.25, 0.25);
 prophubMesh_4.rotateOnWorldAxis(new T.Vector3(1, 0, 0), Math.PI/2);
 prophubMesh_4.position.set(0.65, 1, -0.65);
 
 let propGeom = new T.BoxGeometry(0.05, 0.05, 0.25);
 let propMat = new T.MeshBasicMaterial( { color: 0xff0000} );
 let propMesh_1 = new T.Mesh(propGeom, propMat);
 let propMesh_2 = new T.Mesh(propGeom, propMat);
 let propMesh_3 = new T.Mesh(propGeom, propMat);
 let propMesh_4 = new T.Mesh(propGeom, propMat);
 
 propMesh_1.position.set(0.65, 1, 0.65);
 propMesh_2.position.set(-0.65, 1, -0.65);
 propMesh_3.position.set(-0.65, 1, 0.65);
 propMesh_4.position.set(0.65, 1, -0.65);
 
 quadcopter.add(packageMesh, armMesh_1, armMesh_2, prophubMesh_1, prophubMesh_2, prophubMesh_3, prophubMesh_4, propMesh_1, propMesh_2, propMesh_3, propMesh_4);
 
 let radarTower = new Group();
 
 let comStationGeom = new T.BoxGeometry(0.5, 0.5, 0.5);
 let comStationMat = new T.MeshBasicMaterial( { color: 0xff0000} );
 let comStationMesh = new T.Mesh(comStationGeom, comStationMat);
 
 const points = [];
 for ( let i = 0; i < 10; i ++ ) {
     points.push( new T.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
 }
 
 let radarGeom = new T.LatheGeometry(points);
 let radarMat = new T.MeshBasicMaterial( { color: 0x000000} );
     radarMat.side = T.DoubleSide;
 let radarMesh = new T.Mesh(radarGeom, radarMat);
 
 radarMesh.scale.set(0.015625, 0.015625, 0.015625);
 radarMesh.position.set(4, 0.55, 4);
 
 comStationMesh.position.set(4, 0.15, 4);
 
 quadcopter.scale.set(0.5, 0.5, 0.5);
 
 radarTower.add(comStationMesh, radarMesh);
 radarTower.position.set(1, 0, 1);
 
 let quadcopter_2 = quadcopter.clone();
 
 scene.add(quadcopter_2);
 scene.add(quadcopter);
 scene.add(radarTower);
 
 // this is the part the student should change
 //** GET RID OF THIS SILLY DONUT! Replace it with an aircraft*/
 
 let tempGeom = new T.TorusGeometry();
 let tempMaterial = new T.MeshStandardMaterial({ color: "red" });
 let tempMesh = new T.Mesh(tempGeom, tempMaterial);
 //scene.add(tempMesh);
 tempMesh.scale.set(0.5, 0.5, 0.5);
 tempMesh.position.y = 2;
 
 // Turn into drone / quadcopter:
 
 let Mesh2 = new T.Mesh(tempGeom, tempMaterial);
 //scene.add(Mesh2);
 Mesh2.scale.set(0.5, 0.5, 0.5);
 Mesh2.position.y = 2;
 
 // Animation Loop:
 function animateLoop(timestamp) {
     
     let theta = timestamp / 1000;
     let omega = timestamp / 3000;
 
     let x = 3 * Math.cos(theta);
     let y = 0.5 + Math.abs(2 * Math.sin(omega));
     let z = 3 * Math.sin(theta);
 
     quadcopter.position.x = x;
     quadcopter.position.z = z;
     quadcopter.lookAt(Math.cos(theta), 0, Math.sin(theta));
 
     quadcopter_2.position.y = y;
 
     radarMesh.lookAt(quadcopter.position.x, quadcopter.position.y, quadcopter.position.z);
 
     propMesh_1.rotateOnAxis(new T.Vector3(0, 1, 0), 270);
     propMesh_2.rotateOnAxis(new T.Vector3(0, 1, 0), 270);
     propMesh_3.rotateOnAxis(new T.Vector3(0, 1, 0), 270);
     propMesh_4.rotateOnAxis(new T.Vector3(0, 1, 0), 270);
     
     let y_2 = 0.5 + Math.abs(2 * Math.sin(omega));
     Mesh2.position.y = y_2;
 
     renderer.render(scene, camera);
     window.requestAnimationFrame(animateLoop);
   }
 window.requestAnimationFrame(animateLoop);