document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementsByClassName("nav")[0]
    const menu = document.getElementsByClassName("menu")[0]
    const one = document.getElementsByClassName("one")[0]
    const two = document.getElementsByClassName("two")[0]
    const three = document.getElementsByClassName("three")[0]
    const downArrows = document.getElementsByClassName("downarrow")

    const page1 = document.getElementById("page1")
    const page2 = document.getElementById("page2")
    const page1title = document.getElementById("page1title")
    const page2title = document.getElementById("page2title")
    const page1anchor = document.getElementById("page1anchor")
    const page2anchor = document.getElementById("page2anchor")

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
            menu.style.left = "-350px"
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

    page1anchor.addEventListener("click", () => {
        page2.style.display = "none"
        page1anchor.style.display = "none"
        page1title.style.display = "none"
        page1.style.display = "block"
        page2anchor.style.display = "block"
        page2title.style.display = "block"
    })

    page2anchor.addEventListener("click", () => {
        page2.style.display = "block"
        page1anchor.style.display = "block"
        page1title.style.display = "block"
        page1.style.display = "none"
        page2anchor.style.display = "none"
        page2title.style.display = "none"
    })

    for(let downArrow of downArrows) {
        setInterval(() => {
            downArrow.style.bottom = '3vh'
            setTimeout(() => {
                downArrow.style.bottom = '5vh'
            }, 1250)
        }, 2500)

        document.addEventListener("scroll",  () => {
            downArrow.style.opacity = 1 - (window.scrollY * 6 / window.innerHeight)
        })
    }
})