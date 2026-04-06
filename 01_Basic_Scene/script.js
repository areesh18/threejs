import * as THREE from "three";
import { log } from "three/src/nodes/math/MathNode.js";
const canvas = document.querySelector(".webgl");
console.log(canvas);

//scene
const scene = new THREE.Scene();
//object
//Geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
//material
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe:false });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

//Sizes
const sizes = {
  width: 800,
  height: 600,
};

//Camera
const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height);
camera.position.z=3
scene.add(camera); //optional but good practice

//Renderer
const renderer=new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width,sizes.height)

renderer.render(scene, camera)