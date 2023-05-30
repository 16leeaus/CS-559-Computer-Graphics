/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";
import { RectAreaLight, Scene, StringKeyframeTrack } from "../libs/CS559-Three/build/three.module.js";

let parentOfCanvas = document.getElementById("div1");
let world = new GrWorld({ where: parentOfCanvas });
world.go();



class GrSkyBox extends GrObject {
    constructor() {

        let skyBoxImage = "corona";

        function makePathStrings(filename) {
            const basePath = "../images/",
                baseFileName = basePath + filename,
                fileType = ".png",
                sides = ["ft", "bk", "up", "dn", "rt", "lf"],
                pathStings = sides.map(side => {
                    return baseFileName + "_" + side + fileType;
                });

            return pathStings;
        }

        function makeMaterialArray(filename) {
            const skyBoxImagePaths = makePathStrings(filename);
            const materialArray = skyBoxImagePaths.map(image => {
                let texture = new T.TextureLoader().load(image);

                return new T.MeshBasicMaterial({map: texture, side: T.BackSide});
            });
            return materialArray;
        }

        const materialArray = makeMaterialArray(skyBoxImage);
        const skyboxGeo = new T.BoxGeometry(100, 100, 100);
        const skyBox = new T.Mesh(skyboxGeo, materialArray);
        
        super('skyBox', skyBox);
    }
}

let skyBox = new GrSkyBox();
world.add(skyBox);