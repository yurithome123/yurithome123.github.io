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
    mousewheel: false
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

async function notifyContact(event) {
    event.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;

    // You can replace this with your preferred notification method
    const whatsappMessage = `Nova mensagem de contato:\nNome: ${name}\nEmail: ${email}\nMensagem: ${message}`;
    const whatsappUrl = `https://wa.me/+5544984484660/?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Clear the form
    event.target.reset();
    
    return false;
}