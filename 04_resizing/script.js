import * as THREE from "three";
import './style.css'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { log } from "three/src/nodes/math/MathNode.js";
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
  width: window.innerWidth,
  height: window.innerHeight,
};
window.addEventListener("resize",()=>{
  sizes.width=window.innerWidth
  sizes.height=window.innerHeight

  //update camera
  camera.aspect=sizes.width/sizes.height
  camera.updateProjectionMatrix()

  //update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})

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
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
//clock
const clock = new THREE.Clock();
//Animation

const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
