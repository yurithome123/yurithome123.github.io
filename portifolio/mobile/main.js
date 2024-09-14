var swiper = new Swiper(".swiper", {
    effect: "cube",
    allowTouchMove: true,
    grabCursor: true,
    cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
    },
    mousewheel: false
});

function Navigate(index) {
    const swiper = document.querySelector('.swiper').swiper;
    swiper.slideTo(index);
}


function BackgroundBlack() {
    document.body.style.backgroundColor = "black";
}

function BackgroundWhite() {
    document.body.style.backgroundColor = "white";
}

function SwitchF() {
    if (document.body.style.backgroundColor == "white") {
        document.body.style.backgroundColor = "black";
        document.getElementsByName("aside").backgroundColor = "black"
    } else {
        document.body.style.backgroundColor = "white";
        document.getElementsByName("aside").backgroundColor = "white"
    }
}