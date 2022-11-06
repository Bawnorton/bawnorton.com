document.addEventListener("DOMContentLoaded", () => {
    let navToggle = document.querySelector("#nav-toggle")
    navToggle.addEventListener("click", () => {
        document.body.dataset.nav = document.body.dataset.nav === "open" ? "closed" : "open";
    })

    let navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            for (let i = 0; i < navLinks.length; i++) {
                navLinks[i].dataset.selected = "false"
            }
            link.dataset.selected = "true"
            document.body.dataset.nav = "closed"
        })
    })
});