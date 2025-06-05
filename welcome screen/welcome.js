window.addEventListener("load", function() {
    setTimeout(function() {
        const splash = document.querySelector('.splash-screen')
        splash.classList.add('fade-out')

        setTimeout(function() {
            splash.style.display = 'none'
            document.querySelector('.scroller').style.display = 'block'
        },1000)
    },3000)
})
