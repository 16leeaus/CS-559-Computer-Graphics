/*jshint esversion: 11 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";
import * as Simple from "../libs/CS559-Framework/SimpleObjects.js";
import { CubeCamera } from "../libs/CS559-Three/build/three.module.js";

function spinY(obj, speed = 1) {
  obj.stepWorld = function(delta, timeOfDay) {
    obj.objects.forEach(obj => obj.rotateY(((speed * delta) / 1000) * Math.PI));
  };
  return obj;
}

function test() {
  let parentOfCanvas = document.getElementById("div1");
  let world = new GrWorld({ where: parentOfCanvas });

  let cubeMap = new T.CubeTextureLoader().load([
    "../images/posx.jpg",
    "../images/negx.jpg",
    "../images/posy.jpg",
    "../images/negy.jpg",
    "../images/posz.jpg",
    "../images/negz.jpg"
  ]);

  world.scene.background = cubeMap;

  // Add Cube render target:

  const cubeRenderTarget = new T.WebGLCubeRenderTarget( 256 );
	      cubeRenderTarget.texture.type = T.HalfFloatType;

  const cubeCamera = new T.CubeCamera( 1, 1000, cubeRenderTarget );

  const material = new T.MeshStandardMaterial( {
    envMap: cubeRenderTarget.texture,
    roughness: 0.05,
    metalness: 1
  } );

  const material2 = new T.MeshStandardMaterial( {
    roughness: 0.1,
    metalness: 0
  } );

  const sphere = new T.Mesh(new T.SphereGeometry(), material);
  sphere.position.set(0, 2, 0);
  world.scene.add(sphere);

  world.add(spinY(new Simple.GrCube({ x: -3, y: 1 })));

  let group = new T.Group();
  let mat = new T.MeshStandardMaterial({ color: "blue" });
  let geom = new T.TorusBufferGeometry();
  let tmesh = new T.Mesh(geom, mat);
  tmesh.rotateX(Math.PI / 2);
  tmesh.scale.set(0.5, 0.5, 0.25);
  tmesh.translateX(-2);
  group.add(tmesh);
  let torus = new GrObject("GrTorus", group);
  torus.setPos(0, 2, 0);
  
  world.add(spinY(torus));
  
  world.renderer.render(world.scene, world.camera);
  world.go( {predraw: function() {
    cubeCamera.update(world.renderer, world.scene);
  }} );
}
test();

