/*jshint esversion: 6 */
// @ts-check

//
// CS559 - Graphics Town - Workbook 12
// Example Code: 
// Example "Town"
//
// This sets up the town loading different objects. 
//
// It should be called from the onload function, after the world has been created

/** These imports are for the examples - feel free to remove them */
import { SimpleHouse } from "./house.js";
import { BlockCar, CircularTrack, TrackCar } from "./track.js";
import { Helicopter, Helipad } from "./helicopter.js";
import { ShinySculpture } from "./shinySculpture.js";
import { MorphTest } from "./morph.js";
import { GrPineTree } from "./simpleTree.js";
import { GrCar, GrTruck } from "./vehicles.js";
import { GrBuilding, GrFlag, GrPerson, GrWindTurbine } from "./buildings.js";
import { Blimp, Trophy } from "./import.js";
import { AutoUI } from "../libs/CS559-Framework/AutoUI.js";

/********************************************************************** */
/** EXAMPLES - student should not use this! It is just for reference    */
/** you may use the sample objects, but not the sample layout           */
/***/
export function main(world) {
  /** Race Track - with three things racing around */
  let track = new CircularTrack();
  let tc1 = new TrackCar(track);
  let tc2 = new TrackCar(track);
  let tc3 = new TrackCar(track);

  let blockCar = new BlockCar(track);
  blockCar.u = 0.35;
  world.add(blockCar);

  // place things are different points on the track
  tc2.u = 0.25;
  tc3.u = 0.125;
  // and make sure they are in the world
  world.add(track);
  world.add(tc1);
  world.add(tc2);
  world.add(tc3);

  world.add(new GrCar({x: 12, y: 0, z: 13, primaryColor: 0xffffff}));
  world.add(new GrCar({x: 12, y: 0, z: 15}));
  world.add(new GrCar({x: 12, y: 0, z: 17}));

  world.add(new GrCar({x: 12, y: 0, z: -13, primaryColor: 0x00ff00}));
  world.add(new GrCar({x: 12, y: 0, z: -15, primaryColor: 0x0000ff}));
  world.add(new GrCar({x: 12, y: 0, z: -17}));
  
  world.add(new GrTruck({
    scale: 0.04, 
    primaryColor: 0xff0000, 
    secondaryColor: 0xffffff,
    x: -15, y: 0, z:10
  }));

  world.add(new GrTruck({
    scale: 0.04, 
    primaryColor: 0x00ff00, 
    secondaryColor: 0xffffff,
    x: -15, y: 0, z:12
  }));

  world.add(new GrTruck({
    scale: 0.04, 
    primaryColor: 0x0000ff, 
    secondaryColor: 0xffffff,
    x: -15, y: 0, z:8
  }));

  world.add(new GrBuilding({
    scale: 0.5, 
    x: 15, y: 1, z:15
  }));

  world.add(new GrBuilding({
    scale: 0.5, 
    x: 15, y: 1, z:-15
  }));

  // Racing stuff added:
  let trophy = new Trophy();
  trophy.setPos(0, -12.5, 0);
  world.add(spinY(trophy));

  let flag = new GrFlag();
  flag.setPos(6, 1, 10);

  let flag1 = new GrFlag();
  flag1.setPos(6, 1, 6);

  world.add(flag);
  world.add(flag1);

  // Add a small crowd cheering:
  let person_1 = new GrPerson({primaryColor: 0xff0000, x: 10, y: 0.25, z: 10});
  let person_2 = new GrPerson({primaryColor: 0xffff00, x: 8, y: 0.25, z: 10});
  let person_3 = new GrPerson({primaryColor: 0x00ff00, x: 10, y: 0.25, z: 8});
  let person_4 = new GrPerson({primaryColor: 0x0000ff, x: 10, y: 0.25, z: 6});
  let person_5 = new GrPerson({primaryColor: 0x00ffff, x: 8, y: 0.25, z: 8});

  person_1.time = 0.25;
  person_2.time = 0.50;
  person_3.time = 0.75;
  person_5.time = 1.25;

  world.add(person_1);
  world.add(person_2);
  world.add(person_3);
  world.add(person_4);
  world.add(person_5);

  // Add some simple houses for filler:
  world.add(new SimpleHouse({x: -5, y: 0, z: -18}));
  world.add(new SimpleHouse({x: -18, y: 0, z: -7}));

  world.add(new SimpleHouse({x: -18, y: 0, z: 15}));
  world.add(new SimpleHouse({x: -14, y: 0, z: 15}));
  world.add(new SimpleHouse({x: -10, y: 0, z: 15}));
  world.add(new SimpleHouse({x: -6, y: 0, z: 15}));

  // Add some wind turbines with controls.
  let windmill = new GrWindTurbine();
  windmill.setPos(-12, 2.5, -8);
  world.add(windmill);

  let cDiv = document.getElementById("div1");
  let w_ui = new AutoUI(windmill, 300, cDiv);
  w_ui.set("theta" , 0);

  world.add(new GrWindTurbine({x: -15, y: 2.5, z: -15}));
  world.add(new GrWindTurbine({x: -10, y: 2.5, z: -13}));
  world.add(new GrWindTurbine({x: -10, y: 2.5, z: -17}));  
  // Central group of trees:
  world.add(new GrPineTree({x: 4, y: 0, z: -4}));
  world.add(new GrPineTree({x: 4, y: 0, z: 4}));
  world.add(new GrPineTree({x: -4, y: 0, z: -4}));
  world.add(new GrPineTree({x: -4, y: 0, z: 4}));

  // Trees near the building:
  world.add(new GrPineTree({x: 10, y: 0, z: 19}));
  world.add(new GrPineTree({x: 14, y: 0, z: 19}));
  world.add(new GrPineTree({x: 18, y: 0, z: 19}));
  world.add(new GrPineTree({x: 19, y: 0, z: 8}));
  world.add(new GrPineTree({x: 19, y: 0, z: 12}));
  world.add(new GrPineTree({x: 19, y: 0, z: 16}));

  world.add(new GrPineTree({x: 10, y: 0, z: -19}));
  world.add(new GrPineTree({x: 14, y: 0, z: -19}));
  world.add(new GrPineTree({x: 18, y: 0, z: -19}));
  world.add(new GrPineTree({x: 19, y: 0, z: -8}));
  world.add(new GrPineTree({x: 19, y: 0, z: -12}));
  world.add(new GrPineTree({x: 19, y: 0, z: -16}));

  /** Helicopter - first make places for it to land*/
  world.add(new Helipad(-15, 0, 0));
  world.add(new Helipad(15, 0, 0));
  world.add(new Helipad(0, 0, -17));
  world.add(new Helipad(0, 0, 17));
  let copter = new Helicopter();
  world.add(copter);
  copter.getPads(world.objects);

}

function spinY(obj, speed = 1) {
  obj.stepWorld = function(delta, timeOfDay) {
    obj.objects.forEach(obj => obj.rotateY(((speed * delta) / 4000) * Math.PI));
  };
  return obj;
}

