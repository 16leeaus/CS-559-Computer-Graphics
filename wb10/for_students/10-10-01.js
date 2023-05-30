/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";
import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";

{
  let mydiv = document.getElementById("div1");

  let world = new GrWorld({ width: mydiv ? 600 : 800, where: mydiv });
  
  // Replace these files with your own shaders!
  
  let shaderMat = shaderMaterial("./shaders/10-10-01.vs", "./shaders/10-10-01.fs", {
    side: T.DoubleSide,
    uniforms: {
      blur: { value: 0.5 },
      amount: { value: 24 },
      jitter: { value: 0.5 },
    },
  });

  let blurSlider = new InputHelpers.LabelSlider("blur", {
    width: 400,
    min: 0,
    max: 1,
    step: 0.1,
    initial: 0.5,
    where: mydiv,
  });

  let patternSlider = new InputHelpers.LabelSlider("amount", {
    width: 400,
    min: 0,
    max: 100,
    step: 1,
    initial: 24,
    where: mydiv,
  });

  let jitterSlider = new InputHelpers.LabelSlider("jitter", {
    width: 400,
    min: 0,
    max: 1,
    step: 0.1,
    initial: 0.5,
    where: mydiv,
  });

  function onchangeBlur() {
    shaderMat.uniforms.blur.value = blurSlider.value();
  }
  blurSlider.oninput = onchangeBlur;
  onchangeBlur();

  function onchangePattern() {
    shaderMat.uniforms.amount.value = patternSlider.value();
  }
  patternSlider.oninput = onchangePattern;
  onchangePattern();

  function onchangeJitter() {
    shaderMat.uniforms.jitter.value = jitterSlider.value();
  }
  jitterSlider.oninput = onchangeJitter;
  onchangeJitter();

  world.add(new SimpleObjects.GrSphere({ x: -2, y: 1, material: shaderMat }));
  world.add(
    new SimpleObjects.GrSquareSign({ x: 2, y: 1, size: 1, material: shaderMat })
  );

  world.go();
}
