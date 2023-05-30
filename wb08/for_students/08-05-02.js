/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

// define a class of Domino here - it should be a subclass of GrObject

let world = new GrWorld();

// put the domino into the world Here
// you can, of course, add more than 1

class GrDie extends GrObject {
    constructor() {
        let dieGeom = new T.BoxGeometry(1, 1, 1);
        let dieMat = new T.MeshStandardMaterial( {color: 0xffffff} );
        let dieMesh = new T.Mesh(dieGeom, dieMat);
        

    super("GrDie", dieMesh);
    }
}

let die1 = new GrDie();
die1.setPos(0, 0.5, 0);
die1.setScale(2, 0.5, 1);
world.add(die1);

world.go();
