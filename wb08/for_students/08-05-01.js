/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { BufferGeometry } from "../libs/CS559-Three/build/three.module.js";

// define a class of Dice here - it should be a subclass of GrObject

let world = new GrWorld();

// put the two dice into the world Here
// don't forget to orient them so they have different numbers facing up

class GrDie extends GrObject {
    constructor() {
        let dieGeom = new T.BoxGeometry(1, 1, 1);
        let dieMat = new T.MeshStandardMaterial( {color: 0xffffff} );
        let dieMesh = new T.Mesh(dieGeom, dieMat);
        

    super("GrDie", dieMesh);
    }
}

let die1 = new GrDie();
die1.setPos(-2, 0.5, 0);
world.add(die1);

let die2 = new GrDie();
die2.setPos(2, 0.5, 0);
world.add(die2);

world.go();

