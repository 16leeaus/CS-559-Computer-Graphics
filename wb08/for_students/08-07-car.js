/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

// define your vehicles here - remember, they need to be imported
// into the "main" program

export class GrCar extends GrObject {
    constructor() {
        // Declare a group of meshes for the car:
        let car = new T.Group();

        // Make some materials for the wheels:
        let wheelGeom = new T.BoxGeometry(3, 3, 8.25);
        let wheelMat = new T.MeshLambertMaterial({ color: 0x333333 });

        let backWheel = new T.Mesh(wheelGeom, wheelMat);
        let frontWheel = new T.Mesh(wheelGeom, wheelMat);

        backWheel.position.y = 1.5;
        backWheel.position.x = -4.5;

        frontWheel.position.y = 1.5;  
        frontWheel.position.x = 4.5;

        // Make some materials for the body:
        let bodyGeom = new T.BoxGeometry(15, 3.75, 7.5);
        let bodyMat = new T.MeshLambertMaterial({ color: 0xff0000 });

        let body = new T.Mesh(bodyGeom, bodyMat);

        body.position.y = 3;

        // Make some materials for the cabin:
        let cabinGeom = new T.BoxGeometry(8.25, 3, 6);
        let cabinMat = new T.MeshLambertMaterial({ color: 0xffffff });

        let cabin = new T.Mesh(cabinGeom, cabinMat);

        cabin.position.x = -1.5;
        cabin.position.y = 6.3;

        car.add(backWheel, frontWheel, body, cabin);

        car.scale.set(0.125, 0.125, 0.125);

        super("GrCar", car);
    }
  }

  export class GrSchoolBus extends GrObject {
    constructor() {
        // Declare a group of meshes for the car:
        let schoolBus = new T.Group();

        let wheelGeom = new T.BoxGeometry(3, 3, 8.25);
        let wheelMat = new T.MeshLambertMaterial({ color: 0x333333 });

        let backWheel = new T.Mesh(wheelGeom, wheelMat);
        let frontWheel = new T.Mesh(wheelGeom, wheelMat);

        let bodyGeom = new T.BoxGeometry(15, 3.75, 7.5);
        let bodyMat = new T.MeshLambertMaterial({ color: 0xffff00 });

        let body = new T.Mesh(bodyGeom, bodyMat);

        let cabinGeom = new T.BoxGeometry(8.25, 3, 6);
        let cabinMat = new T.MeshLambertMaterial({ color: 0xffff00 });

        let cabin = new T.Mesh(cabinGeom, cabinMat);

        backWheel.position.y = 1.5;
        backWheel.position.x = -4.5;

        frontWheel.position.y = 1.5;  
        frontWheel.position.x = 4.5;

        body.position.y = 3;
        cabin.position.x = -1.5;
        cabin.position.y = 6.3;
        cabin.scale.set(1.25, 1.75, 1);

        schoolBus.scale.set(0.175, 0.125, 0.125);

        schoolBus.add(body, cabin, backWheel, frontWheel);

        super("GrSchoolBus", schoolBus);
    }
  }