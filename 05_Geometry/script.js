import * as THREE from "three";
import "./style.css";
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
const geometry = new THREE.BufferGeometry() 
const count=50;
const positionsArray=new Float32Array(count*3*3);
for(let i=0;i<count*3*3;i++){
  positionsArray[i]=Math.random()
}
const positionsAttribute=new THREE.BufferAttribute(positionsArray,3)
geometry.setAttribute('position',positionsAttribute)
//material
const material = new THREE.MeshBasicMaterial({
  color: "#ffffff",
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
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
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//clock
const clock = new THREE.Clock();
//Animation

const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
