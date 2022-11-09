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
    let navLinks = document.querySelectorAll(".nav-link")

    let main = document.querySelector("main")
    let home = document.querySelector("#home")
    let work = document.querySelector("#work")

    new Flickity(work.querySelector(".carousel"), {
        wrapAround: true,
        selectedAttraction: 0.011,
        friction: 0.2
    })

    anime({
        targets: '#nav-toggle',
        bottom: ['-12rem', '3rem'],
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
        })
    });

});
