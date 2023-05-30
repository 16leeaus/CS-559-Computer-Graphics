/*jshint esversion: 11 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";

let parentOfCanvas = document.getElementById("div1");
let world = new GrWorld({ where: parentOfCanvas });
world.go();

class GrBumpSphere extends GrObject {
    constructor() {
        let sphereGeom = new T.SphereGeometry(1, 32, 32);
        let bumpTex = new T.TextureLoader().load("../images/random_bricks_thick_bump_2k.png");
        let sphereMat = new T.MeshStandardMaterial({
            bumpMap: bumpTex
        });
        let sphereMesh = new T.Mesh(sphereGeom, sphereMat);
        super('sphere', sphereMesh);
    }
}

class GrNromSphere extends GrObject {
    constructor() {
        let sphereGeom = new T.SphereGeometry(1, 32, 32);
        let normMap = new T.TextureLoader().load("../images/random_bricks_thick_nor_gl_2k.png");
        let sphereMat = new T.MeshStandardMaterial({
            normalMap: normMap
        });
        let sphereMesh = new T.Mesh(sphereGeom, sphereMat);
        super('sphere', sphereMesh);
    }
}

class GrSphere extends GrObject {
    constructor() {
        let sphereGeom = new T.SphereGeometry(1, 32, 32);
        let normMap = new T.TextureLoader().load("../images/random_bricks_thick_nor_gl_2k.png");
        let diffMap = new T.TextureLoader().load("../images/random_bricks_thick_diff_2k.png");
        let sphereMat = new T.MeshStandardMaterial({
            map:diffMap,
            normalMap: normMap
        });
        let sphereMesh = new T.Mesh(sphereGeom, sphereMat);
        super('sphere', sphereMesh);
    }
}

function spinY(obj, speed = 1) {
    obj.stepWorld = function(delta, timeOfDay) {
      obj.objects.forEach(obj => obj.rotateY(((speed * delta) / 2000) * Math.PI));
    };
    return obj;
}

let sphere = new GrSphere();
spinY(sphere);
sphere.setPos(0, 1.5, 0);
world.add(sphere);

let sphereBump = new GrBumpSphere();
spinY(sphereBump);
sphereBump.setPos(2.5, 1.5, 0);
world.add(sphereBump);

let sphereNorm = new GrNromSphere();
spinY(sphereNorm);
sphereNorm.setPos(-2.5, 1.5, 0);
world.add(sphereNorm);