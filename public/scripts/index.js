import * as THREE from "https://cdn.skypack.dev/three@v0.138.2"
import {OrbitControls} from "./OrbitControls.js"

const scene = new THREE.Scene()
const raycaster = new THREE.Raycaster()
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 45, 10000)
const renderer = new THREE.WebGLRenderer({antialias: true})

let checkClick = false
let mouseVector = new THREE.Vector2()

let lastHover = null
let actionMap = new Map()

function init() {
    camera.position.set(-90, -20, -90)
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    const skybox = createSkybox()
    const controls = initControls(skybox)

    const sphereGeometry = new THREE.SphereGeometry(15, 32, 16)
    const sphereMaterial = new THREE.MeshBasicMaterial({color: 0xffff00})
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.name = "test"

    let iteration = 0

    actionMap.set(sphere, {
        hover: () => {
            sphere.scale.set(1.1, 1.1, 1.1)
        }, leave: () => {
            sphere.scale.set(1, 1, 1)
        }, click: () => {
            if (iteration === 0) {
                sphere.material.color.setHex(0x00ffff)
                iteration = 1
            } else if (iteration === 1) {
                sphere.material.color.setHex(0xff00ff)
                iteration = 2
            } else if (iteration === 2) {
                sphere.material.color.setHex(0xffff00)
                iteration = 0
            }
        }
    })

    scene.add(sphere)
}

function createSkybox() {
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

    let skyboxGeo = new THREE.BoxBufferGeometry(6000, 6000, 6000)
    let skybox = new THREE.Mesh(skyboxGeo, materialArray)
    skybox.name = "ignore"
    skybox.position.set(camera.position.x, camera.position.y, camera.position.z)
    scene.add(skybox)
    
    return skybox
}

function initControls(skybox) {
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enablePan = false
    controls.maxDistance = 1400
    controls.minDistance = 70

    controls.addEventListener('change', () => {
        skybox.position.set(camera.position.x, camera.position.y, camera.position.z)
    })
    
    return controls
}

init()

document.addEventListener('mousemove', (event) => {
    mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
})

document.addEventListener('mousedown', () => {
    checkClick = true
})

function getObject(intersects) {
    if(intersects.length > 0) {
        let object = intersects[0].object
        if(object && object.name && object.name !== "ignore") {
            return object
        }
    }
}

function hoverObject(intersects) {
    let object = getObject(intersects)
    for(let actionable of actionMap.keys()) {
        if (object === actionable) {
            actionMap.get(actionable).hover()
        } else if (lastHover === actionable) {
            actionMap.get(actionable).leave()
        }
        lastHover = object
    }
}

function clickObject(intersects) {
    let object = getObject(intersects)
    if(object) {
        actionMap.get(object).click()
    }
}

function render() {
    raycaster.setFromCamera(mouseVector, camera)
    let intersects = raycaster.intersectObjects(scene.children, true)
    if(checkClick) {
        clickObject(intersects)
        checkClick = false
    }
    hoverObject(intersects)
    renderer.render(scene, camera)
}

function animate() {
    render()
    requestAnimationFrame(animate)
}
animate()