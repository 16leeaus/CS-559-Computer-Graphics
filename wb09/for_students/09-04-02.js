/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";

let parentOfCanvas = document.getElementById("div1");
let world = new GrWorld({ where: parentOfCanvas });
world.go();

world.scene.background = new T.CubeTextureLoader().load([
    "../images/corona_ft.png",
    "../images/corona_bk.png",
    "../images/corona_up.png",
    "../images/corona_dn.png",
    "../images/corona_rt.png",
    "../images/corona_lf.png"
]);
