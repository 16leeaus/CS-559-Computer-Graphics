/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let simpleObjectCounter = 0;

/**
 * we pass a set of properties to a cube to allow for flexible parameters
 *
 * @typedef TreeProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrPineTree extends GrObject {
      /**
   * @param {TreeProperties} params
   * @param {Array<string|Array>} [paramInfo] - parameters for the GrObject (for sliders)
   */
    constructor(params = {}, paramInfo = []) {
        let pineTree = new T.Group();
        let treeTrunk = new T.Mesh(
            new T.CylinderGeometry(0.5, 0.5, 2, 4),
            new T.MeshLambertMaterial({color:0xbb6600})
        );

        let treeLevel_1 = new T.Mesh(
            new T.ConeGeometry(3, 2, 4),
            new T.MeshLambertMaterial({color:0x006400})
        );

        let treeLevel_2 = new T.Mesh(
            new T.ConeGeometry(2, 2, 4),
            new T.MeshLambertMaterial({color:0x006400})
        );

        let treeLevel_3 = new T.Mesh(
            new T.ConeGeometry(1.5, 2, 4),
            new T.MeshLambertMaterial({color:0x006400})
        );

        treeLevel_1.position.y = 2;
        treeLevel_2.position.y = 3;
        treeLevel_3.position.y = 4;
        
        pineTree.add(treeTrunk, treeLevel_1, treeLevel_2, treeLevel_3);
        pineTree.scale.set(0.5, 0.5, 0.5);
        pineTree.position.y = 0.5;

        pineTree.castShadow = true;
        pineTree.receiveShadow = true;

        pineTree.translateX(params.x || 0);
        pineTree.translateY(params.y || 0);
        pineTree.translateZ(params.z || 0);    
        super(`pineTree-${simpleObjectCounter++}`, pineTree, paramInfo);
    }
}