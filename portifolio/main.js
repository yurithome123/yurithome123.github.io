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

    try {
        const response = await fetch('https://api.staticforms.xyz/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accessKey: 'YOUR_STATIC_FORMS_KEY', // Get this from staticforms.xyz
                name: name,
                email: email,
                message: message,
                subject: `Contact from Portfolio - ${name}`
            })
        });

        if (response.ok) {
            alert('Message sent successfully!');
            event.target.reset();
        } else {
            alert('Error sending message. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error sending message. Please try again.');
    }
    
    return false;
}