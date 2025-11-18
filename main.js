import * as THREE from "three";
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

    // yellow part
    const w2 = Math.random() * 0.3;
    const geometry2 = new THREE.TetrahedronGeometry(
      w2,
      Math.floor(Math.random() * 2)
    );
    geometry2.translate(
      i * r - planeW / 2,
      c * j - planeH / 2,
      Math.random() * 5
    );
    const material2 = new THREE.MeshBasicMaterial({ color: colors.red });
    const cube2 = new THREE.Mesh(geometry2, material2);
    scene.add(cube2);
  }
}

camera.position.z = 4;
camera.position.y = 15;
camera.position.x = 4;
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

function animate() {
  renderer.render(scene, camera);
}
