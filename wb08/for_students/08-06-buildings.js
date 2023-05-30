/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

// define your buildings here - remember, they need to be imported
// into the "main" program

export class GrPineTree extends GrObject {
    constructor() {
        let pineTree = new T.Group();
        let treeTrunk = new T.Mesh(
            new T.CylinderGeometry(0.5, 0.5, 2),
            new T.MeshLambertMaterial({color:0xbb6600})
        );

        let treeLevel_1 = new T.Mesh(
            new T.ConeGeometry(3, 2, 8),
            new T.MeshLambertMaterial({color:0x006400})
        );

        let treeLevel_2 = new T.Mesh(
            new T.ConeGeometry(2, 2, 8),
            new T.MeshLambertMaterial({color:0x006400})
        );

        let treeLevel_3 = new T.Mesh(
            new T.ConeGeometry(1.5, 2, 8),
            new T.MeshLambertMaterial({color:0x006400})
        );

        treeLevel_1.position.y = 2;
        treeLevel_2.position.y = 3;
        treeLevel_3.position.y = 4;
        
        pineTree.add(treeTrunk, treeLevel_1, treeLevel_2, treeLevel_3);
        pineTree.scale.set(0.5, 0.5, 0.5);
        pineTree.position.y = 0.5;

        pineTree.castShadow = true;
        pineTree.receiveShadow = false;
    
    super("GrPineTree", pineTree);
    }
}

export class GrSchoolHouse extends GrObject {
    constructor() {
        let schoolHouse = new T.Group();

        // Materials for the different parts of the house:
        let materials_default = {
            base: new T.MeshStandardMaterial({
                color: 0xff0000,
                side: T.DoubleSide
            }),
            triangle: new T.MeshStandardMaterial({
                color: 0xaf0000,
                side: T.DoubleSide
            }),
            roof: new T.MeshStandardMaterial({
                color: 0x202020,
                side: T.DoubleSide
            })
        };

        //Function used to create the facade of the house:
        let HouseTriangle = function(materials){
            materials = materials || materials_default;
            let geometry = new T.BufferGeometry();
            let vertices = new Float32Array([
                    -1, 0, 0,
                    0.5, 1.5, 0,
                    2, 0, 0
                ]);
            geometry.setAttribute('position', new T.BufferAttribute(vertices, 3));
            geometry.computeVertexNormals(); // compute vertex normals
            geometry.addGroup(0, 3, 0); // just one group
            return new T.Mesh(
                geometry, 
                materials.triangle);
        };

        //Main body of the house:
        let base = new T.Mesh(new T.BoxGeometry(3, 2, 4), materials_default.base);
        schoolHouse.add(base);

        let triangle1 = HouseTriangle(materials_default);
        triangle1.position.set(-0.5, 1 , 2);
        schoolHouse.add(triangle1);
        let triangle2 = HouseTriangle(materials_default);
        triangle2.position.set(-0.5, 1 , -2);
        schoolHouse.add(triangle2);

        //Roof sections of the house:
        var roof1 = new T.Mesh(
            new T.PlaneGeometry(2.84, 4.5), 
            materials_default.roof);
        roof1.position.set(-1, 1.51, 0);
        roof1.rotation.set(Math.PI * 0.5, Math.PI * 0.25, 0);
        schoolHouse.add(roof1);
        var roof2 = new T.Mesh(
            new T.PlaneGeometry(2.84, 4.5), 
            materials_default.roof);
        roof2.position.set(1, 1.51, 0);
        roof2.rotation.set(Math.PI * 0.5, Math.PI * -0.25, 0);
        schoolHouse.add(roof2);

        schoolHouse.castShadow = true;
        schoolHouse.receiveShadow = false;

        super("GrSchoolHouse", schoolHouse);
    }
}
