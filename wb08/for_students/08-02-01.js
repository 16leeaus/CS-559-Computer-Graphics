/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";
import { DoubleSide } from "../libs/CS559-Three/build/three.module.js";


/*
 * Define your 3 objects here. If the objects fit inside +/- 1,
 * the world code below will place them nicely.
 * Otherwise, you need to modify the world code below to make the
 * world bigger and space the objects out differently.
 */

class Object1 extends GrObject {
  constructor() {
    let geometry = new T.BufferGeometry();
    
    // Add vertices for object geometry:
    const vertices = new Float32Array( [
      0, 0, 0,
      -1, 0, -1,
      1, 0, -1,
      0, 0, -2,
      0, 1, -1,
      0, 0, -2,
      0, 1, -1,
      0, -1, -1
    ] );

   /*  geometry.vertices.push(new T.Vector3(0, 0, 0));

    geometry.vertices.push(new T.Vector3(-1, 0, -1));
    geometry.vertices.push(new T.Vector3(1, 0, -1));
    geometry.vertices.push(new T.Vector3(0, 0, -2));
    geometry.vertices.push(new T.Vector3(0, 1, -1));

    geometry.vertices.push(new T.Vector3(0, 0, -2));

    geometry.vertices.push(new T.Vector3(0, 1, -1));
    geometry.vertices.push(new T.Vector3(0, -1, -1)); */
    
    // Bottom / zero plane
    let f1 = T.Triangle.getNormal(0, 1, 2);
    geometry.faces.push(f1);
    let f2 = new T.Face3(1, 2, 5);
    geometry.faces.push(f2);

    // Top pyramid:
    let f3 = new T.Face3(0, 1, 6);
    f3.color.setStyle("yellow");
    geometry.faces.push(f3);
    let f4 = new T.Face3(0, 2, 6);
    f4.color.setStyle("orange");
    geometry.faces.push(f4);
    let f5 = new T.Face3(1, 5, 6);
    f5.color.setStyle("red");
    geometry.faces.push(f5);
    let f6 = new T.Face3(2, 5, 6);
    f6.color.setStyle("blue");
    geometry.faces.push(f6);

    // Bottom pyramid:
    let f7 = new T.Face3(0, 1, 7);
    f7.color.setStyle("green");
    geometry.faces.push(f7);
    let f8 = new T.Face3(0, 2, 7);
    f8.color.setStyle("grey");
    geometry.faces.push(f8);
    let f9 = new T.Face3(1, 5, 7);
    f9.color.setStyle("black");
    geometry.faces.push(f9);
    let f10 = new T.Face3(2, 5, 7);
    f10.color.setStyle("pink");
    geometry.faces.push(f10);

    geometry.computeFaceNormals();

    // Material for face colorations:
    let material = new T.MeshStandardMaterial({
      roughness: 0.75,
      vertexColors: T.FaceColors,
      side: DoubleSide
    });
    let mesh = new T.Mesh(geometry, material);

    mesh.position.y = 1;

    //
    super("Object1", mesh);
  }
}
class Object2 extends GrObject {
  constructor() {

    let geometry = new T.BufferGeometry();
    
    // Bottom square:
    geometry.vertices.push(new T.Vector3(0, 0, 0));

    geometry.vertices.push(new T.Vector3(-1, 0, -1));
    geometry.vertices.push(new T.Vector3(1, 0, -1));
    geometry.vertices.push(new T.Vector3(0, 0, -2));
    geometry.vertices.push(new T.Vector3(0, 1, -1));

    geometry.vertices.push(new T.Vector3(0, 0, -2));

    geometry.vertices.push(new T.Vector3(0, 1, -1));
    geometry.vertices.push(new T.Vector3(0, -1, -1));

    // Top square:
    geometry.vertices.push(new T.Vector3(0, 1, 0));
    geometry.vertices.push(new T.Vector3(-1, 1, -1));
    geometry.vertices.push(new T.Vector3(1, 1, -1));
    geometry.vertices.push(new T.Vector3(0, 1, -2));
    
    // Bottom / zero plane:
    let f1 = new T.Face3(0, 1, 2);
      f1.vertexColors[0] = new T.Color("red"); // 0
      f1.vertexColors[1] = new T.Color("yellow"); // 1
      f1.vertexColors[2] = new T.Color("white"); // 2
    geometry.faces.push(f1);

    let f2 = new T.Face3(1, 2, 5);
      f2.vertexColors[0] = new T.Color("yellow"); // 1
      f2.vertexColors[1] = new T.Color("white"); // 3
      f2.vertexColors[2] = new T.Color("blue");
    geometry.faces.push(f2);

    // Top panel:
    let f3 = new T.Face3(8, 9, 10);
      f3.vertexColors[0] = new T.Color("red"); // 0
      f3.vertexColors[1] = new T.Color("yellow"); // 1
      f3.vertexColors[2] = new T.Color("white"); // 2
    geometry.faces.push(f3);

    let f4 = new T.Face3(9, 10, 11);
      f4.vertexColors[0] = new T.Color("yellow"); // 1
      f4.vertexColors[1] = new T.Color("white"); // 3
      f4.vertexColors[2] = new T.Color("blue");
    geometry.faces.push(f4);

    // Front left panel:
    let f5 = new T.Face3(0, 8, 9);
      f5.vertexColors[0] = new T.Color("red"); // 0
      f5.vertexColors[1] = new T.Color("red"); // 1
      f5.vertexColors[2] = new T.Color("yellow"); // 2
    geometry.faces.push(f5);

    let f6 = new T.Face3(0, 1, 9);
      f6.vertexColors[0] = new T.Color("red"); // 1
      f6.vertexColors[1] = new T.Color("yellow"); // 3
      f6.vertexColors[2] = new T.Color("yellow");
    geometry.faces.push(f6);

    // Front right panel:
    let f7 = new T.Face3(0, 8, 10);
      f7.vertexColors[0] = new T.Color("red"); // 0
      f7.vertexColors[1] = new T.Color("red"); // 1
      f7.vertexColors[2] = new T.Color("white"); // 2
    geometry.faces.push(f7);

    let f8 = new T.Face3(0, 2, 10);
      f8.vertexColors[0] = new T.Color("red"); // 1
      f8.vertexColors[1] = new T.Color("white"); // 3
      f8.vertexColors[2] = new T.Color("white");
    geometry.faces.push(f8);

    // Back right panel:
    let f9 = new T.Face3(2, 10, 11);
      f9.vertexColors[0] = new T.Color("white"); // 0
      f9.vertexColors[1] = new T.Color("white"); // 1
      f9.vertexColors[2] = new T.Color("blue"); // 2
    geometry.faces.push(f9);

    let f10 = new T.Face3(2, 5, 11);
      f10.vertexColors[0] = new T.Color("white"); // 1
      f10.vertexColors[1] = new T.Color("blue"); // 3
      f10.vertexColors[2] = new T.Color("blue");
    geometry.faces.push(f10);

    // Back left panel:
    let f11 = new T.Face3(11, 5, 1);
      f11.vertexColors[0] = new T.Color("blue"); // 0
      f11.vertexColors[1] = new T.Color("blue"); // 1
      f11.vertexColors[2] = new T.Color("yellow"); // 2
    geometry.faces.push(f11);

    let f12 = new T.Face3(11, 9, 1);
      f12.vertexColors[0] = new T.Color("blue"); // 1
      f12.vertexColors[1] = new T.Color("yellow"); // 3
      f12.vertexColors[2] = new T.Color("yellow");
    geometry.faces.push(f12);

    geometry.computeFaceNormals();

    // Material for face colorations:
    let material = new T.MeshStandardMaterial({
      roughness: 0.75,
      vertexColors: T.VertexColors,
      side: DoubleSide
    });
    let mesh = new T.Mesh(geometry, material);

    mesh.position.y = 0.5;

    //
    super("Object2", mesh);
  }
}
class Object3 extends GrObject {
  constructor() {
    
    let geometry = new T.BufferGeometry();
    
    // Add vertices for object geometry:
    geometry.vertices.push(new T.Vector3(0, 0, 0));
    // Side points:
    geometry.vertices.push(new T.Vector3(-0.75, 0, -0.5));
    geometry.vertices.push(new T.Vector3(-1, 0, -1));
    geometry.vertices.push(new T.Vector3(0.75, 0, -0.5));
    geometry.vertices.push(new T.Vector3(1, 0, -1));
    // High point:
    geometry.vertices.push(new T.Vector3(0, 1, -1));
    // Back point:
    geometry.vertices.push(new T.Vector3(0, 0, -1));

    let f1 = new T.Face3(0, 1, 5);
      geometry.faces.push(f1);
    let f2 = new T.Face3(1, 2, 5);
      geometry.faces.push(f2);

    let f3 = new T.Face3(0, 3, 5);
      geometry.faces.push(f3);
    let f4 = new T.Face3(3, 4, 5);
      geometry.faces.push(f4);

    let f5 = new T.Face3(0, 1, 6);
      geometry.faces.push(f5);
    let f6 = new T.Face3(1, 2, 6);
      geometry.faces.push(f6);
    let f7 = new T.Face3(0, 3, 6);
      geometry.faces.push(f7);
    let f8 = new T.Face3(3, 4, 6);
      geometry.faces.push(f8);

    let f9 = new T.Face3(2, 4, 5);
      geometry.faces.push(f9);

    geometry.computeFaceNormals();

    // Material for face colorations:
    let material = new T.MeshStandardMaterial({
      color: "yellow",
      roughness: 0.75,
      side: DoubleSide
    });
    let mesh = new T.Mesh(geometry, material);

    mesh.position.y = 1;

    //
    super("Object3", mesh);

  }
}

// translate an object in the X direction
function shift(grobj, x) {
    grobj.objects.forEach(element => {
        element.translateX(x);
    });
  return grobj;
}

// Set the Object's Y rotate
function roty(grobj, ry) {
    grobj.objects.forEach(element => {
        element.rotation.y = ry;
    });
  return grobj;
}

/*
 * The world making code here assumes the objects are +/- 1
 * and have a single mesh as their THREE objects.
 * If you don't follow this convention, you will need to modify
 * the code below.
 * The code is a little funky because it is designed to work for
 * a variety of demos.
 */
let mydiv = document.getElementById("div1");

let box = InputHelpers.makeBoxDiv({ width: mydiv ? 640 : 820 }, mydiv);
if (!mydiv) {
    InputHelpers.makeBreak(); // sticks a break after the box
}
InputHelpers.makeHead("Three Different Objects", box);

let world = new GrWorld({ width: mydiv ? 600 : 800, where: box });
let tt = shift(new Object1(), -3);
world.add(tt);

let t2 = shift(new Object2(), 0);
world.add(t2);

let t3 = shift(new Object3(), 3);
world.add(t3);

let div = InputHelpers.makeBoxDiv({}, box);

let sl = new InputHelpers.LabelSlider("ry", { min: -2, max: 2, where: div });

InputHelpers.makeBreak(box);

sl.oninput = function(evt) {
    let v = sl.value();
    roty(tt,v);
    roty(t2,v);
    roty(t3,v);
};

world.go();