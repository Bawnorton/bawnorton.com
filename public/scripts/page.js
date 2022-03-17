document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementsByClassName("nav")[0]
    const menu = document.getElementsByClassName("menu")[0]
    const one = document.getElementsByClassName("one")[0]
    const two = document.getElementsByClassName("two")[0]
    const three = document.getElementsByClassName("three")[0]
    const flipAnchor = document.getElementById("flip")

    let sideMenu = false

    hamburger.addEventListener('mouseleave', () => {
        if(!sideMenu) {
            two.style.width = "40px"
            three.style.width = "45px"
        }
    })

    hamburger.addEventListener('mouseenter', () => {
        if(!sideMenu) {
            two.style.width = "50px"
            three.style.width = "50px"
        }
    })

    hamburger.addEventListener("click",  () => {
        if(sideMenu) {
            menu.style.left = "-250px"
            hamburger.style.transform = "rotate(0)"
            one.style.width = "50px"
            two.style.width = "40px"
            three.style.width = "45px"
        } else {
            menu.style.left = "0"
            hamburger.style.transform = "rotate(-90deg)"
            one.style.width = "35px"
            two.style.width = "35px"
            three.style.width = "35px"
        }
        sideMenu = !sideMenu;
    })

    flipAnchor.addEventListener('click', () => {
        window.parent.document.getElementById('flipbutton').click()
    })
})