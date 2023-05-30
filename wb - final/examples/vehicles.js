/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let simpleCarCounter = 0;

/**
 * we pass a set of properties to a cube to allow for flexible parameters
 *
 * @typedef CarProperties
 * @type {object}
 * @property {THREE.Material} [material]
 * @property {string | number} [primaryColor]
 * @property {string | number} [secondaryColor]
 * @property {number} [scale]
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 */
export class GrCar extends GrObject {
    /**
   * @param {CarProperties} params
   * @param {Array<string|Array>} [paramInfo] - parameters for the GrObject (for sliders)
   */
    constructor(params = {}, paramInfo = []) {
        // Declare a group of meshes for the car:
        let car = new T.Group();

        // Make some materials for the wheels:
        let backWheel = new T.Mesh(
            new T.BoxGeometry(3, 3, 8.25), 
            new T.MeshLambertMaterial({ color: 0x333333 })
            );

        let frontWheel = new T.Mesh(
            new T.BoxGeometry(3, 3, 8.25), 
            new T.MeshLambertMaterial({ color: 0x333333 })
            );

        backWheel.position.y = 1.5;
        backWheel.position.x = -4.5;

        frontWheel.position.y = 1.5;  
        frontWheel.position.x = 4.5;

        // Make some materials for the body:
        let body = new T.Mesh(
            new T.BoxGeometry(15, 3.75, 7.5), 
            new T.MeshLambertMaterial({ color: params.primaryColor || 0xff0000 })
            );

        body.position.y = 3;

        // Make some materials for the cabin:
        let cabin = new T.Mesh(
            new T.BoxGeometry(8.25, 3, 6), 
            new T.MeshLambertMaterial({ color: params.secondaryColor || 0xffffff})
        );

        cabin.position.x = -1.5;
        cabin.position.y = 6.3;

        car.add(backWheel, frontWheel, body, cabin);
        car.scale.set(0.125, 0.125, 0.125);
        //car.rotateOnAxis(new T.Vector3(0, 1, 0),Math.PI/2);

        super(`Car-${simpleCarCounter++}`, car, paramInfo);

        // put the object in its place
        car.position.x = Number(params.x) || 0;
        car.position.y = Number(params.y) || 0;
        car.position.z = Number(params.z) || 0;
    }
  }

  function Wheel() {
    const wheel = new T.Mesh(wheelGeometry, wheelMaterial);
    wheel.position.z = 6;
    wheel.castShadow = false;
    wheel.receiveShadow = false;
    return wheel;
  }

  const wheelGeometry = new T.BoxBufferGeometry(12, 33, 12);
  const wheelMaterial = new T.MeshLambertMaterial({ color: 0x333333 });

  let simpleTruckCounter = 0;

  /**
 * we pass a set of properties to a cube to allow for flexible parameters
 *
 * @typedef TruckProperties
 * @type {object}
 * @property {THREE.Material} [material]
 * @property {string | number} [primaryColor]
 * @property {string | number} [secondaryColor]
 * @property {number} [scale]
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 */
  export class GrTruck extends GrObject {
    /**
   * @param {TruckProperties} params
   * @param {Array<string|Array>} [paramInfo] - parameters for the GrObject (for sliders)
   */
    constructor(params = {}, paramInfo = []) {

      const truck = new T.Group();

      const base = new T.Mesh(
        new T.BoxBufferGeometry(100, 25, 5),
        new T.MeshLambertMaterial({ color: 0xb4c6fc })
      );
    base.position.z = 10;
    truck.add(base);
  
    const cargo = new T.Mesh(
      new T.BoxBufferGeometry(75, 35, 40),
      new T.MeshLambertMaterial({ color: params.primaryColor }) // 0xb4c6fc
    );
    cargo.position.x = -15;
    cargo.position.z = 30;
    cargo.castShadow = true;
    cargo.receiveShadow = true;
    truck.add(cargo);

    const cabin = new T.Mesh(new T.BoxBufferGeometry(25, 30, 30), [
      new T.MeshLambertMaterial({ color: params.secondaryColor }),
      new T.MeshLambertMaterial({ color: params.secondaryColor }), 
      new T.MeshLambertMaterial({ color: params.secondaryColor }),
      new T.MeshLambertMaterial({ color: params.secondaryColor }),
      new T.MeshLambertMaterial({ color: params.secondaryColor }), 
      new T.MeshLambertMaterial({ color: params.secondaryColor }) 
    ]);
    cabin.position.x = 40;
    cabin.position.z = 20;
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    truck.add(cabin);
  
    const backWheel = Wheel();
    backWheel.position.x = -30;
    truck.add(backWheel);
  
    const middleWheel = Wheel();
    middleWheel.position.x = 10;
    truck.add(middleWheel);
  
    const frontWheel = Wheel();
    frontWheel.position.x = 38;
    truck.add(frontWheel);

    truck.rotateX(-Math.PI/2);
    truck.scale.set(params.scale, params.scale, params.scale);

    super(`Truck-${simpleTruckCounter++}`, truck, paramInfo);

        // put the object in its place
        truck.position.x = Number(params.x) || 0;
        truck.position.y = Number(params.y) || 0;
        truck.position.z = Number(params.z) || 0;
    }
  }