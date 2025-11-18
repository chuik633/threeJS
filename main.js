import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const colors = {
  blue: "#6371AD",
  red: "#E53C29",
  yellow: "#F4B438",
};
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const planeW = 30;
const planeH = 30;
const planeGeometry = new THREE.PlaneGeometry(planeW, planeH);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: colors.blue,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// geometry.translate(0, 0, 0.5);

// const material = new THREE.MeshBasicMaterial({ color: colors.yellow });
// const cube = new THREE.Mesh(geometry, material);
let objects = [];
const r = planeW / 10;
const c = planeH / 10;
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    // yellow part
    const w = Math.random() * 0.5;
    const geometry = new THREE.TetrahedronGeometry(
      w,
      Math.floor(Math.random() * 5)
    );
    geometry.translate(
      i * r - planeW / 2,
      c * j - planeH / 2,
      Math.random() * 5
    );
    const material = new THREE.MeshBasicMaterial({ color: colors.yellow });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    objects.push({
      object: cube,
      direction: "y",
      speed: Math.random(),
    });

    // yellow part
    const w2 = Math.random() * 0.3;
    const geometry2 = new THREE.TetrahedronGeometry(
      w2,
      Math.floor(Math.random() * 2)
    );
    geometry2.translate(
      i * r - planeW / 2,
      c * j - planeH / 2,
      Math.random() * 4
    );
    const material2 = new THREE.MeshBasicMaterial({ color: colors.red });
    const cube2 = new THREE.Mesh(geometry2, material2);
    scene.add(cube2);
    objects.push({
      object: cube2,
      direction: "z",
      speed: Math.random(),
    });

    // yellow part
    const w3 = Math.random() * 0.1;
    const geometry3 = new THREE.TetrahedronGeometry(
      w3,
      Math.floor(Math.random() * 2)
    );
    geometry3.translate(
      i * r - planeW / 2,
      c * j - planeH / 2,
      Math.random() * 3
    );
    const material3 = new THREE.MeshBasicMaterial({ color: "#F1EDDE" });
    const cube3 = new THREE.Mesh(geometry3, material3);
    scene.add(cube3);
    objects.push({
      object: cube3,
      direction: "x",
      speed: Math.random(),
    });
  }
}

camera.position.z = 4;
camera.position.y = 15;
camera.position.x = 4;
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);
let time = 0;
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
function animate() {
  //called every 60 seconds
  time += 0.01;
  controls.update();
  for (const objectInfo of objects) {
    console.log(objectInfo);
    if (objectInfo.direction == "y") {
      objectInfo.object.rotation.y = Math.sin(time * objectInfo.speed);
    } else if (objectInfo.direction == "z") {
      objectInfo.object.rotation.z = Math.sin(time * objectInfo.speed);
    } else {
      objectInfo.object.rotation.x = Math.sin(time * objectInfo.speed);
    }

    objectInfo.object.y += Math.sin(time * objectInfo.speed) * 10;
  }
  // change positions etc so that u can animate here
  renderer.render(scene, camera);
}
