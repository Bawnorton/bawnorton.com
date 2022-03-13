import * as THREE from "https://cdn.skypack.dev/three@v0.138.2";
import { OrbitControls } from "./OrbitControls.js"

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 45, 3000)

camera.position.set(-90, -20, -90)

const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', () => {})
controls.enablePan = false;
controls.enableZoom = false;

let materialArray = []
let texture_ft = new THREE.TextureLoader().load('skybox/Front.jpg')
let texture_bk = new THREE.TextureLoader().load('skybox/Back.jpg')
let texture_up = new THREE.TextureLoader().load('skybox/Up.jpg')
let texture_dn = new THREE.TextureLoader().load('skybox/Down.jpg')
let texture_rt = new THREE.TextureLoader().load('skybox/Right.jpg')
let texture_lf = new THREE.TextureLoader().load('skybox/Left.jpg')

materialArray.push(new THREE.MeshBasicMaterial({map: texture_ft}))
materialArray.push(new THREE.MeshBasicMaterial({map: texture_bk}))
materialArray.push(new THREE.MeshBasicMaterial({map: texture_up}))
materialArray.push(new THREE.MeshBasicMaterial({map: texture_dn}))
materialArray.push(new THREE.MeshBasicMaterial({map: texture_rt}))
materialArray.push(new THREE.MeshBasicMaterial({map: texture_lf}))

for(let material of materialArray) {
    material.side = THREE.BackSide
}

let skyboxGeo = new THREE.BoxBufferGeometry(1000, 1000, 1000)
let skybox = new THREE.Mesh(skyboxGeo, materialArray)
scene.add(skybox)

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();