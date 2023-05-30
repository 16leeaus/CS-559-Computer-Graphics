/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";

export class Trophy extends Loaders.FbxGrObject {
    constructor() {
      super({
        fbx: "../examples/assets/WinnerCup.fbx",
        norm: 2.0,
        name: "Trophy",
      });
    }
    
  }

  export class Blimp extends Loaders.FbxGrObject {
    constructor() {
      super({
        fbx: "../examples/assets/Low_Poly_Airship.fbx",
        norm: 2.0,
        name: "Trophy",
      });
    }
    
  }