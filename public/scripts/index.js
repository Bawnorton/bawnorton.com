import * as THREE from "https://cdn.skypack.dev/three@v0.138.2"
import {OrbitControls} from "./OrbitControls.js"
import {CSS3DObject, CSS3DRenderer} from "./CSS3DObject.js";

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 45, 10000)
const renderer = new CSS3DRenderer()

let flipButton, controls, pageDiv, doRotate = false, distance

function init() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight)
    })

    controls = initControls()

    let div = document.createElement('div')
    let iframe = document.createElement('iframe')
    iframe.src = './page.html'
    div.appendChild(iframe)
    document.body.appendChild(div)

    pageDiv = new CSS3DObject(div)
    distance = window.innerHeight / (2 * Math.tan(camera.fov * Math.PI / 360))

    pageDiv.position.set(0, 0, -distance)

    controls.target.copy(pageDiv.position)
    controls.update()

    scene.add(pageDiv)

    flipButton = document.createElement("button")
    flipButton.id = "flipbutton"
    flipButton.style.display = "none"
    document.body.appendChild(flipButton)

    flipButton.onclick = () => {
        let zoom = setInterval(() => {
            pageDiv.position.z -= 5
        }, 10)
        setTimeout(() => {
            doRotate = true
            clearInterval(zoom)
        }, 1000)
    }
}

function initControls() {
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enablePan = false
    controls.maxDistance = 1400
    controls.minDistance = 70

    return controls
}

document.addEventListener("DOMContentLoaded", () => {
    init()
})


function animate() {
    requestAnimationFrame(animate)
    if(doRotate) {
        pageDiv.rotateY(Math.PI / 45)
        if (Math.abs(pageDiv.rotation.y) <= 0.01) {
            doRotate = false
            pageDiv.rotation.y = 0
            let iZoom = setInterval(() => {
                pageDiv.position.z += 5
                console.log(pageDiv.position.z, distance)
                if (pageDiv.position.z >= -distance) {
                    clearInterval(iZoom)
                }
            }, 10)
        }
    }
    if (controls) controls.update()
    renderer.render(scene, camera)
}

animate()