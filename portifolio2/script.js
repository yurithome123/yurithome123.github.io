// Wait for the window to load
window.addEventListener('load', function() {
    var loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.animation = 'fadeOut 1s forwards';
});

// Adicionar efeito de transição de página
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('page-transition');

    setTimeout(function() {
        document.body.classList.add('page-loaded');
    }, 50);
});
