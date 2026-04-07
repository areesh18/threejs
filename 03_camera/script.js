import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const canvas = document.querySelector(".webgl");
/*  console.log(gsap); */
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});
//scene
const scene = new THREE.Scene();
//object
//Geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
//material
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: false,
});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

//Sizes
const sizes = {
  width: 800,
  height: 600,
};

//Camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  1,
  100,
);
camera.position.z = 4;

camera.lookAt(mesh.position);
scene.add(camera); //optional but good practice

//Orbitcontrol-now you can drag-drop(right click) the cube, rotate,etc(left click) and zoom in & Out through wheel.
const controls=new OrbitControls(camera, canvas)
//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);

//clock
const clock = new THREE.Clock();
//Animation

const tick = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
