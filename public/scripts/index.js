function respondToVisibilityChange(element, callback) {
    let options = {
        root: document.documentElement,
    }

    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            callback(entry.intersectionRatio > 0)
        });
    }, options)

    observer.observe(element)
}

document.addEventListener("DOMContentLoaded", () => {
    let navToggle = document.querySelector("#nav-toggle")
    let githubButton = document.querySelector("#github-button")
    let navLinks = document.querySelectorAll(".nav-link")

    let main = document.querySelector("main")
    let home = document.querySelector("#home")
    let work = document.querySelector("#work")

    new Flickity(work.querySelector(".carousel"), {
        wrapAround: true,
        selectedAttraction: 0.011,
        friction: 0.2,
        dragThreshold: 50
    })

    anime({
        targets: '#nav-toggle',
        bottom: ['-12rem', '3rem'],
        easing: 'easeInOutBack',
        delayTime: 300,
        duration: 1500,
    })

    anime({
        targets: '#github-button',
        right: ['-12rem', '3rem'],
        easing: 'easeInOutBack',
        delayTime: 300,
        duration: 1500,
    })

    respondToVisibilityChange(home, (visible) => {
        if(visible) {
            anime({
                targets: '.line-drawing .lines path',
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: 'easeInOutSine',
                delayTime: 500,
                duration: 2000,
                delay: (el, i) => Math.abs(i - 4.5) * 300,
                direction: 'normal'
            });
        }
    });

    navToggle.addEventListener("click", () => {
        document.body.dataset.nav = document.body.dataset.nav === "open" ? "closed" : "open";
    })

    githubButton.addEventListener("click", () => {
        window.open("https://github.com/Bawnorton", "_blank")
    })

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            let selected;
            for (let i = 0; i < navLinks.length; i++) {
                if(navLinks[i].dataset.selected === "true") {
                    selected = navLinks[i]
                    navLinks[i].dataset.selected = "false"
                }
            }
            document.body.dataset.nav = "closed"
            link.dataset.selected = "true"
            if(selected === link) return
            anime({
                targets: `#${link.querySelector("h2").innerText.toLowerCase()}`,
                opacity: [0, 1],
                duration: 800,
                easing: "easeInOutSine"
            });
            main.dataset.page = link.querySelector("h2").innerText.toLowerCase()
            console.log(main.dataset.page)
            if(main.dataset.page !== "home" && githubButton.style.right !== "-12rem") {
                anime({
                    targets: `#github-button`,
                    right: ['3rem', '-12rem'],
                    easing: 'easeInOutSine',
                    duration: 500
                })
            } else if (main.dataset.page === "home" && githubButton.style.right !== "3rem") {
                anime({
                    targets: `#github-button`,
                    right: ['-12rem', '3rem'],
                    easing: 'easeInOutSine',
                    duration: 500
                })
            }
        })
    });

    let ageSpan = document.querySelector("#age");
    setInterval(() => {
        let ageDifMs = Date.now() - new Date(1043193600000).getTime();
        let age = ageDifMs / 1000 / 60 / 60 / 24 / 365.25
        let ageString = age.toString()
        let dotIndex = ageString.indexOf(".")
        let decimal = ageString.substring(dotIndex + 1)
        let hue = parseFloat("0." + decimal.substring(0, 3)) * 360
        ageSpan.innerText = ageString.substring(0, dotIndex + 10)
        ageSpan.style.color = `hsl(${hue}, 55%, 75%)`
    }, 50);
});
