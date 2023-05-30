/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { GrPineTree, GrSchoolHouse } from "../for_students/08-06-buildings.js";

// your buildings are defined in another file... you should import them
// here

let world = new GrWorld();

// place your buildings and trees into the world here

let pineTree = new GrPineTree();
pineTree.setPos(4, 0.5, 4);
world.add(pineTree);

let school = new GrSchoolHouse();
school.setPos(0, 1, 0);
world.add(school);

world.go();
