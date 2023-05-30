/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { DoubleSide } from "../libs/CS559-Three/build/three.module.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";

function degreesToRadians(deg) {
    return (deg * Math.PI) / 180;
  }

let windTurbineCtr = 0;
/**
 * we pass a set of properties to a cube to allow for flexible parameters
 *
 * @typedef TurbineProperties
 * @type {object}
 * @property {THREE.Material} [material]
 * @property {string | number} [primaryColor]
 * @property {number} [scale]
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 */
export class GrWindTurbine extends GrObject {
    /**
    * @param {TurbineProperties} params
    * @param {Array<string|Array>} [paramInfo] - parameters for the GrObject (for sliders)
    */
    constructor(params = {}, paramInfo = []) {

        let windTurbine = new T.Group();
        let turbineTower = new T.Mesh(
            new T.CylinderGeometry(0.25, 0.75, 10, 16),
            new T.MeshLambertMaterial({color: params.primaryColor})
        );

        let rotorHub = new T.Mesh(
            new T.CylinderGeometry(0.5, 0.25, 2, 16, 16),
            new T.MeshLambertMaterial({color: params.primaryColor})
        );
        rotorHub.position.y = 5;
        rotorHub.position.z = -0.5;
        rotorHub.rotateX(Math.PI / 2);

        let rotorFront = new T.Mesh(
            new T.SphereGeometry(0.5, 16, 16, 0, 2 * Math.PI, 0, Math.PI),
            new T.MeshLambertMaterial({color: params.primaryColor})
        );
        rotorFront.position.y = 5;
        rotorFront.position.z = 0.5;

        let rotorEndCap = new T.Mesh(
            new T.SphereGeometry(0.25, 16, 16),
            new T.MeshLambertMaterial({color: params.primaryColor})
        );
        rotorEndCap.position.y = 5;
        rotorEndCap.position.z = -1.5;

        
        var blade_seg1 = new T.Mesh(
            new T.CylinderGeometry(0,0.5,3,16,3),
            new T.MeshPhongMaterial({
                color: 0x55AAFF,
                specular: 0x111111,
                shininess: 8
            })
        );
        var blade_seg2 = new T.Mesh(
            new T.CylinderGeometry(0,0.5,1,16,3),
            new T.MeshPhongMaterial({
                color: 0x55AAFF,
                specular: 0x111111,
                shininess: 8
            })
        );
        blade_seg1.position.y = 2.5;
        blade_seg2.position.y = 0.5;
        blade_seg2.rotation.x = Math.PI;
        let blade = new T.Object3D();
        blade.add(blade_seg1);
        blade.add(blade_seg2);
        blade.scale.z = 0.3;
        
        let blade1 = new T.Object3D();
        blade1.add(blade.clone());
        blade.rotation.z = 2*Math.PI/3;
        blade1.add(blade.clone());
        blade.rotation.z = -2*Math.PI/3;
        blade1.add(blade.clone());
        blade1.position.set(0,3.3,0.3);
        

        let rotorGroup = new T.Group();
        rotorGroup.add(blade1);
        rotorGroup.position.y = 1.5;
        
        let rotorHubGroup = new T.Group();
        rotorHubGroup.add(rotorHub, rotorEndCap, rotorFront, rotorGroup);
        windTurbine.add(turbineTower, rotorHubGroup);
        windTurbine.position.y = 2.5;
        windTurbine.scale.set(0.5, 0.5, 0.5);
            
    super(`windTurbine-${windTurbineCtr++}`, windTurbine, [["theta", 0, 360, 0]]);

    windTurbine.position.x = Number(params.x) || 0;
    windTurbine.position.y = Number(params.y) || 0;
    windTurbine.position.z = Number(params.z) || 0;
    windTurbine.rotateY(Math.PI/4);

    this.whole_ob = windTurbine;
    this.rotorhub = rotorHubGroup;
    this.rotorGroup = blade1;
    }

    update(paramValues) {
        this.rotorhub.rotation.y = degreesToRadians(paramValues[0]);
    }

    stepWorld(delta, timeOfDay) {
        this.rotorGroup.rotateZ(90);
    }
}

/**
 * we pass a set of properties to a cube to allow for flexible parameters
 *
 * @typedef BuildingProperties
 * @type {object}
 * @property {THREE.Material} [material]
 * @property {string | number} [primaryColor]
 * @property {string | number} [secondaryColor]
 * @property {number} [scale]
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 */
export class GrBuilding extends GrObject {
    /**
    * @param {BuildingProperties} params
    * @param {Array<string|Array>} [paramInfo] - parameters for the GrObject (for sliders)
    */
    constructor(params = {}, paramInfo = []) {
        let building = new T.Group();

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
        building.add(base);

        let triangle1 = HouseTriangle(materials_default);
        triangle1.position.set(-0.5, 1 , 2);
        building.add(triangle1);
        let triangle2 = HouseTriangle(materials_default);
        triangle2.position.set(-0.5, 1 , -2);
        building.add(triangle2);

        //Roof sections of the house:
        var roof1 = new T.Mesh(
            new T.PlaneGeometry(2.84, 4.5), 
            materials_default.roof);
        roof1.position.set(-1, 1.51, 0);
        roof1.rotation.set(Math.PI * 0.5, Math.PI * 0.25, 0);
        building.add(roof1);
        var roof2 = new T.Mesh(
            new T.PlaneGeometry(2.84, 4.5), 
            materials_default.roof);
        roof2.position.set(1, 1.51, 0);
        roof2.rotation.set(Math.PI * 0.5, Math.PI * -0.25, 0);
        building.add(roof2);

        building.castShadow = true;
        building.receiveShadow = false;

        super("GrBuilding", building);
        // put the object in its place
        building.position.x = Number(params.x) || 0;
        building.position.y = Number(params.y) || 0;
        building.position.z = Number(params.z) || 0;
    }
}

export class GrFlag extends GrObject {
    constructor() {
        let flagObj = new T.Group();

        let flagPole = new T.Mesh(
            new T.CylinderGeometry(0.125, 0.125, 2), 
            new T.MeshLambertMaterial({color: 0xffffff})
            );

        flagPole.position.x = -0.75;

        let shaderMat = shaderMaterial("./shaders/10-06-01.vs", "./shaders/10-06-01.fs", {
            side: T.DoubleSide,
            uniforms: {
              checks: { value: 4.0 },
              light: { value: new T.Vector3(1, 1, 1) },
              dark: { value: new T.Vector3(0, 0, 0) },
            },
          });

        let flag = new T.Mesh(new T.PlaneGeometry(1.5, 1, 15, 10), shaderMat);
        flag.position.y = 0.5;


        flagObj.add(flagPole, flag);
        super("GrFlag", flagObj);
    }
}


let personctr = 0;
/**
 * we pass a set of properties to a cube to allow for flexible parameters
 *
 * @typedef PersonProperties
 * @type {object}
 * @property {THREE.Material} [material]
 * @property {string | number} [primaryColor]
 * @property {number} [scale]
 * @property {number} [u]
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 */
export class GrPerson extends GrObject {
    /**
    * @param {PersonProperties} params
    * @param {Array<string|Array>} [paramInfo] - parameters for the GrObject (for sliders)
    */
    constructor(params = {}, paramInfo = []) {
        let person = new T.Group();
        
        let body = new T.Mesh(
            new T.CylinderGeometry(0.45, 0.45, 1),
            new T.MeshLambertMaterial({color: params.primaryColor})
        );
        let head = new T.Mesh(
            new T.SphereGeometry(0.5, 8, 8),
            new T.MeshLambertMaterial({color: 0xD2B48C})
        );
        head.position.y = 0.75;

        person.add(body, head);
        person.scale.set(0.5, 0.5, 0.5);

        super(`person-${personctr++}`, person);
        person.position.x = Number(params.x) || 0;
        person.position.y = Number(params.y) || 0;
        person.position.z = Number(params.z) || 0;
        this.whole_ob = person;
        this.time = 0;
    }
    stepWorld(step, timeOfDay) {
        this.time += step / 1000; // time in seconds
        // set the y position based on the time
        let t = this.time % 1; // where are we in the cycle?
    
        if (t < 0.1 || t > 0.9) this.whole_ob.position.y = 0.5;
        else {
          this.whole_ob.position.y = 0.5 + 10 * (0.16 - (0.5 - t) * (0.5 - t));
        }
      }

}