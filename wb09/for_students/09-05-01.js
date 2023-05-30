/*jshint esversion: 11 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";
import { GrSphere } from "../libs/CS559-Framework/SimpleObjects.js";

let parentOfCanvas = document.getElementById("div1");
let world = new GrWorld({ where: parentOfCanvas });
world.go();

let cubeMap = new T.CubeTextureLoader().load([
    "../images/posx.jpg",
    "../images/negx.jpg",
    "../images/posy.jpg",
    "../images/negy.jpg",
    "../images/posz.jpg",
    "../images/negz.jpg"
]);

world.scene.background = cubeMap;

class GrRefSphere extends GrObject {
    constructor() {
        let sphereGeom = new T.SphereBufferGeometry(1, 64, 64);
        let sphereMat = new T.MeshLambertMaterial({
            color: 0xffffff,
            envMap: cubeMap
        });
        let sphereMesh = new T.Mesh(sphereGeom, sphereMat);
        
        super('sphere', sphereMesh);
    }
}

let sphere = new GrRefSphere();
sphere.setPos(0, 1.5, 0);
world.add(sphere);