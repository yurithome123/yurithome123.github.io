// Smooth scroll para navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animação básica para elementos quando entram na viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

document.querySelectorAll('.section').forEach((section) => {
    observer.observe(section);
});

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', body.dataset.theme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
body.dataset.theme = savedTheme;

// Add animation to cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Image modal
document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <img src="${img.src}">
                <span class="close">&times;</span>
            </div>
        `;
        document.body.appendChild(modal);
        
        modal.querySelector('.close').onclick = () => modal.remove();
    });
});

// Load highlight.js for code syntax highlighting
document.addEventListener('DOMContentLoaded', () => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
    script.onload = () => {
        hljs.highlightAll();
    };
    document.head.appendChild(script);

    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/vs2015.min.css';
    document.head.appendChild(style);
});

// Code toggle functionality
document.querySelectorAll('.code-toggle').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        content.classList.toggle('visible');
        button.textContent = content.classList.contains('visible') ? 'Ocultar Código' : 'Mostrar Código';
    });
});