window.addEventListener("load", function() {
    setTimeout(function() {
        const splash = document.querySelector('.splash-screen')
        splash.classList.add('fade-out')

        setTimeout(function() {
            splash.style.display = 'none'
            document.querySelector('.main').style.display = 'block'
        },1000)
    },3000)
})
const data = [
    {
        title: "Capture Your Travel Memories",
        description: "Save your favorite travel moments with photos and stories all in one place.",
        image: "/images/scrollerImg1.png"
    },
    {
        title: "Tell Your Story Your Way",
        description: "Write freely, add photos, voice notes, and design each entry to reflect your journey.",
        image: "/images/scrollerImg2.png"
    },
    {
        title: "Join a Community of Explorers",
        description: "Discover journals from fellow travelers and get inspired by their adventures.",
        image: "/images/scrollerImg3.png"
    }
]

const pages = createScroller(data);
const dots = document.querySelectorAll('.dot');

//next event
document.getElementById('next-btn').addEventListener('click', nextProfile)
nextProfile();

function nextProfile() { 
    const currentScreen = pages.next().value;
    if(currentScreen !== undefined) {
        document.getElementById('scroller').innerHTML = `
    <div id="img-display">
            <img src="${currentScreen.image}" alt="Scroller Image 1" class="scroller-img">
        </div>
        <div id="profile-display">
            <h2>${currentScreen.title}</h2>
            <p>${currentScreen.description}</p>
        </div>`;
       dots.forEach(function(dot) {
        dot.classList.remove('active')});
         const index = data.indexOf(currentScreen);
        dots[index].classList.add('active');
} 
else if (pages.next().done) {
    window.location.href = "/html/loginForm.html";
    }
}

//scroller iterator 
function createScroller(item) {
    let netIndex = 0
    return {
        next: function() {
            return netIndex < item.length ? 
            { value: item[netIndex++], done: false } 
            : { done: true };
        }
         
    }
}
