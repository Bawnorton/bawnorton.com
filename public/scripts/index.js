import * as THREE from "https://cdn.skypack.dev/three@v0.138.2"
import {OrbitControls} from "./OrbitControls.js"
import {CSS3DObject, CSS3DRenderer} from "./CSS3DObject.js";

const sceneGl = new THREE.Scene()
const sceneCss = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 10000)

let controls

let css3DRenderer,
    glRenderer

let reciever,
    page3D,
    skybox

let doRotate = false

function initControls() {
    controls = new OrbitControls(camera, css3DRenderer.domElement)
    controls.enablePan = false
    controls.enableZoom = false
    controls.enableRotate = false

    controls.addEventListener('change', () => {
        skybox.position.set(camera.position.x, camera.position.y, camera.position.z)
    })
}


function initRenderers() {
    css3DRenderer = new CSS3DRenderer()
    glRenderer = new THREE.WebGLRenderer({antialias: true, alpha: true})

    css3DRenderer.setSize(window.innerWidth, window.innerHeight)
    css3DRenderer.domElement.style.position = 'absolute'
    css3DRenderer.domElement.style.zIndex = '1'
    css3DRenderer.domElement.style.top = '0'

    glRenderer.setSize(window.innerWidth, window.innerHeight)
    glRenderer.setClearColor(0xf0f0f0)
    glRenderer.domElement.style.position = 'absolute'
    glRenderer.domElement.style.top = '0'

    document.body.appendChild(css3DRenderer.domElement)
    document.body.appendChild(glRenderer.domElement)

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        glRenderer.setSize(window.innerWidth, window.innerHeight)
        css3DRenderer.setSize(window.innerWidth, window.innerHeight)
    })
}

function create3DPage(position, src) {
    let div = document.createElement('div')
    let iframe = document.createElement('iframe')
    iframe.src = src
    div.appendChild(iframe)
    document.body.appendChild(div)

    page3D = new CSS3DObject(div)
    page3D.position.set(position.x, position.y, position.z)

    sceneCss.add(page3D)

    return page3D
}

function createSkybox() {
    let materialArray = []
    let texture_ft = new THREE.TextureLoader().load('../images/skybox/Front.jpg')
    let texture_bk = new THREE.TextureLoader().load('../images/skybox/Back.jpg')
    let texture_up = new THREE.TextureLoader().load('../images/skybox/Up.jpg')
    let texture_dn = new THREE.TextureLoader().load('../images/skybox/Down.jpg')
    let texture_rt = new THREE.TextureLoader().load('../images/skybox/Right.jpg')
    let texture_lf = new THREE.TextureLoader().load('../images/skybox/Left.jpg')

    materialArray.push(new THREE.MeshBasicMaterial({map: texture_ft}))
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_bk}))
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_up}))
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_dn}))
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_rt}))
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_lf}))

    for (let material of materialArray) {
        material.side = THREE.BackSide
    }

    let skyboxGeo = new THREE.BoxBufferGeometry(100, 100, 100)
    skybox = new THREE.Mesh(skyboxGeo, materialArray)
    skybox.name = "ignore"
    skybox.position.set(camera.position.x, camera.position.y, camera.position.z)
    sceneGl.add(skybox)
}

function init() {

    initRenderers()
    initControls()
    createSkybox()

    let distance = window.innerHeight / (2 * Math.tan(camera.fov * Math.PI / 360))
    let page = create3DPage(new THREE.Vector3(0, 0, -distance), './page.html')

    controls.target.copy(page.position)
    controls.update()

    reciever = document.createElement("button")
    reciever.id = "reciever"
    reciever.style.display = "none"
    document.body.appendChild(reciever)

    reciever.onclick = () => {
        doRotate = true
    }
}

document.addEventListener("DOMContentLoaded", () => {
    init()
    animate()
})


function animate() {
    requestAnimationFrame(animate)

    if (doRotate) rotatePage()
    if (controls) controls.update()

    glRenderer.render(sceneGl, camera)
    css3DRenderer.render(sceneCss, camera)
}

function rotatePage() {
    page3D.rotateY(Math.PI / 45)
    if (Math.abs(page3D.rotation.y) <= 0.01) {
        doRotate = false
        page3D.rotation.y = 0
    }
}