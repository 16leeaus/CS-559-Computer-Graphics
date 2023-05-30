/*jshint esversion: 11 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";

let parentOfCanvas = document.getElementById("div1");
let world = new GrWorld({ where: parentOfCanvas });
world.go();

class GrSphere extends GrObject {
    constructor() {
        let sphereGeom = new T.SphereGeometry(1, 32, 32);
        let normMap = new T.TextureLoader().load("../images/metal_plate_nor_gl_2k.png");
        let diffMap = new T.TextureLoader().load("../images/metal_plate_diff_2k.png");
        let sphereMat = new T.MeshStandardMaterial({
            map:diffMap,
            normalMap: normMap,
            metalness: 0.1
        });
        let sphereMesh = new T.Mesh(sphereGeom, sphereMat);
        super('sphere', sphereMesh);
    }
}

let sphere = new GrSphere();
sphere.setPos(0, 1.5, 0);
world.add(sphere);