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

// Removi funções não utilizadas e limpei o código