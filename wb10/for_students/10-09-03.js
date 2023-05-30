/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";
import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";

let image = new T.TextureLoader().load("./textures/iss066e086253_lrg.jpg");

{
  let mydiv = document.getElementById("div1");

  let world = new GrWorld({ width: mydiv ? 600 : 800, where: mydiv });

  let shaderMat = shaderMaterial("./shaders/10-09-03.vs", "./shaders/10-09-03.fs", {
    side: T.DoubleSide,
    uniforms: {
      tex: { value: image },
      checks: { value: 4.0 },
      angle: { value: 0 },
      light: { value: new T.Vector3(1, 1, 1) },
      dark: { value: new T.Vector3(0.2, 0.2, 0.7) },
      colormap: { value: image },
      shininess: { value: 0.5 }
    },
  });

  let s1 = new InputHelpers.LabelSlider("checks", {
    width: 400,
    min: 1,
    max: 20,
    step: 0.5,
    initial: 4,
    where: mydiv,
  });

  let s2 = new InputHelpers.LabelSlider("angle", {
    width: 400,
    min: -1,
    max: 1,
    step: 0.1,
    initial: 0,
    where: mydiv,
  });

  let s3 = new InputHelpers.LabelSlider("shininess", {
    width: 400,
    min: 0,
    max: 2,
    step: 0.01,
    initial: 0.5,
    where: mydiv,
  });

  console.log(shaderMat.uniforms.colormap);

  function onchange() {
    shaderMat.uniforms.checks.value = s1.value();
  }
  s1.oninput = onchange;
  onchange();

  function onchangeAngle() {
    shaderMat.uniforms.angle.value = s2.value();
  }
  s2.oninput = onchangeAngle;
  onchangeAngle();

  world.add(new SimpleObjects.GrSphere({ x: -2, y: 1, material: shaderMat }));
  world.add(
    new SimpleObjects.GrSquareSign({ x: 2, y: 1, size: 1, material: shaderMat })
  );

  world.go();
}