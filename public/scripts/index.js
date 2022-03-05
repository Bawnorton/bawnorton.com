let pointerX = -1;
let pointerY = -1;

document.onmousemove = (event) => {
    pointerX = event.pageX;
    pointerY = event.pageY;
}


document.addEventListener('DOMContentLoaded', function() {
    const menu = document.getElementById("menu")
    const icons = document.getElementsByClassName("icon")

    let iconShadowInterval

    function setIconShadow(icon) {
        icon.style.textShadow = `0 0 50px ${currentHex}`
    }

    for(let icon of icons) {
        icon.addEventListener("mouseenter", () => {
            iconShadowInterval = setInterval(() => { setIconShadow(icon) }, 10)
        })
        icon.addEventListener("mouseleave", () => {
            clearInterval(iconShadowInterval)
            icon.style.textShadow = `0 0 0 ${currentHex}`
        })
    }

    let currentHex;
    let r = 255, g = 0, b = 0

    function rgbToHex(red, green, blue) {
        const rgb = (red << 16) | (green << 8) | (blue << 0);
        return '#' + (0x1000000 + rgb).toString(16).slice(1);
    }

    setInterval( () => {
        if(r > 0 && b === 0){
            r--;
            g++;
        }
        if(g > 0 && r === 0){
            g--;
            b++;
        }
        if(b > 0 && g === 0){
            r++;
            b--;
        }

        currentHex = rgbToHex(r, g, b)

        menu.style.borderColor = rgbToHex(r, g, b)
        menu.style.boxShadow = `0 0 20px ${rgbToHex(r, g, b)}`
    }, 10)
})