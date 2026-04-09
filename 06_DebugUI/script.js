import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import gsap from 'gsap'
import { materialColor } from "three/src/nodes/accessors/MaterialNode.js";

/* 
Debug
*/
const parameters={
  color:0xff0000,
  spin:()=>{
    gsap.to(mesh.rotation,{
      y:mesh.rotation.y+10,
    })
  }
}
//simple:const gui=new dat.GUI()
const gui = new dat.GUI({
  hideable:true,
  closed:true,
  width:400,
});

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
const material = new THREE.MeshBasicMaterial({
  color: parameters.color,
  wireframe: false,
});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
//Debug
/* gui.add(mesh.position,'x',-3,3,0.01)
gui.add(mesh.position,'y',-3,3,0.01)
gui.add(mesh.position,'z',-3,3,0.01) */

gui
  .add(mesh.position,'y')
  .min(-3)
  .max(3)
  .step(0.01)
  .name('elevation');
gui
  .add(mesh,'visible')
gui
  .add(material,'wireframe')


gui.addColor(parameters,'color')
.onChange(()=>{
  material.color.set(parameters.color)
})
gui.add(parameters,'spin')
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
