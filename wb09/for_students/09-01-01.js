/*jshint esversion: 11 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";

let parentOfCanvas = document.getElementById("div1");
let world = new GrWorld({ where: parentOfCanvas });
world.go();

let boxGeom = new T.BoxBufferGeometry(1, 0.25, 2);
let boxMat = new T.MeshStandardMaterial();
let boxMesh = new T.Mesh(boxGeom, boxMat);

let box = new GrObject("GrBox", boxMesh);
world.add(box);