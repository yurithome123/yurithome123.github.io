var swiper = new Swiper(".swiper", {
    effect: "cube",
    allowTouchMove: false,
    grabCursor: false,
    cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
    },
    mousewheel: true
});
swiper.sliderMove = function (s, e) {
    console.log(s)
}
function Navigate(indx) {
    for (let i of document.querySelectorAll(".Links li")) i.classList.remove("activeLink")
    Array.from(document.querySelectorAll(".Links li"))[indx].classList.add("activeLink")
    swiper.slideTo(indx, 1000, true)
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
    } else
        document.body.style.backgroundColor = "white";
        document.getElementsByName("aside").backgroundColor = "white"
}
function ismobile_redirect() {

}  