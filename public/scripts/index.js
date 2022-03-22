document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementsByClassName("nav")[0]
    const menu = document.getElementsByClassName("menu")[0]
    const one = document.getElementsByClassName("one")[0]
    const two = document.getElementsByClassName("two")[0]
    const three = document.getElementsByClassName("three")[0]
    const downArrows = document.getElementsByClassName("downarrow")

    const page1 = document.getElementById("page1")
    const page2 = document.getElementById("page2")

    const page1anchor = document.getElementById("page1anchor")
    const page2anchor = document.getElementById("page2anchor")

    const leftAnchor = document.getElementById("leftanchor")
    const rightAnchor = document.getElementById("rightanchor")

    const darkModeSwitch = document.getElementById("switch")

    let sideMenu = false
    let transitioning = false

    let isMobile = getComputedStyle(document.getElementsByClassName("parallax")[0]).getPropertyValue("background-attachment") !== "fixed"

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
            menu.style.left = "-270px"
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

    darkModeSwitch.addEventListener('click', () => {
        let docStyle = getComputedStyle(document.body)
        let value = docStyle.getPropertyValue("color")
        if(value === "rgb(255, 255, 255)") {
            document.documentElement.style.setProperty("--colour-1", "black")
            document.documentElement.style.setProperty("--colour-2", "#464646")
            document.documentElement.style.setProperty("--colour-3", "#A7A7A7")
            document.documentElement.style.setProperty("--colour-4", "#E9E9E9")
            document.documentElement.style.setProperty("--colour-5", "rgba(255, 255, 255, 0.7)")
            document.documentElement.style.setProperty("--shadow", "0 0 2px rgb(226, 226, 226), 0 0 2px rgb(226, 226, 226)")
        } else {
            document.documentElement.style.setProperty("--colour-1", "rgb(255, 255, 255)")
            document.documentElement.style.setProperty("--colour-2", "#c7c7c7")
            document.documentElement.style.setProperty("--colour-3", "#585858")
            document.documentElement.style.setProperty("--colour-4", "#111")
            document.documentElement.style.setProperty("--colour-5", "rgba(0, 0, 0, 0.7)")
            document.documentElement.style.setProperty("--shadow", "0 0 1vw rgb(29, 29, 29)")
        }
    })

    function movePage1() {
        if(transitioning) return;
        document.documentElement.style.setProperty("--page1-offset", "-100vw")
        document.documentElement.style.setProperty("--page2-offset", "0vw")
        if (isMobile) {
            page1.style.display = "none"
            rightAnchor.style.display = "none"
            leftAnchor.style.display = "flex"
            page2.style.display = "block"
            page2.style.overflowY = "scroll"
            return
        }
        document.documentElement.style.setProperty("--transition-amount", "1s")
        transitioning = true
        setTimeout(() => {
            transitioning = false
            page2.style.overflowY = "scroll"
            document.documentElement.style.setProperty("--transition-amount", "0s")
        }, 1000)
    }

    function movePage2() {
        if(transitioning) return
        page2.style.overflowY = "hidden"
        document.documentElement.style.setProperty("--page1-offset", "0vw")
        document.documentElement.style.setProperty("--page2-offset", "100vw")
        if (isMobile) {
            rightAnchor.style.display = "flex"
            leftAnchor.style.display = "none"
            page1.style.display = "block"
            page2.style.display = "none"
            return
        }
        document.documentElement.style.setProperty("--transition-amount", "1s")
        transitioning = true
        setTimeout(() => {
            transitioning = false
            document.documentElement.style.setProperty("--transition-amount", "0s")
        }, 1000)
    }

    rightAnchor.addEventListener("click", movePage1)
    page2anchor.addEventListener("click", movePage1)
    page1anchor.addEventListener("click", movePage2)
    leftAnchor.addEventListener("click", movePage2)

    for(let downArrow of downArrows) {
        setInterval(() => {
            downArrow.style.bottom = '3vh'
            setTimeout(() => {
                downArrow.style.bottom = '5vh'
            }, 1250)
        }, 2500)

        page1.addEventListener("scroll",  () => {
            downArrow.style.opacity = 1 - (page1.scrollTop * 6 / window.innerHeight)
        })
        page2.addEventListener("scroll",  () => {
            downArrow.style.opacity = 1 - (page2.scrollTop * 6 / window.innerHeight)
        })
    }
})