document.addEventListener('DOMContentLoaded', () => {
    // Inicializa a funcionalidade quando o DOM estiver pronto
    setupScrollReveal();
});

function setupScrollReveal() {
    // Adiciona a classe reveal-element a todas as seções, cards e elementos importantes
    const elementsToReveal = [
        '.section h2',
        '.card',
        '.timeline-item',
        '.skills-container',
        '.gallery img',
        '.projects-grid .card',
        '.resources-container .card'
    ];

    // Adiciona a classe aos elementos selecionados
    elementsToReveal.forEach(selector => {
        document.querySelectorAll(selector).forEach((element, index) => {
            element.classList.add('reveal-element');
            
            // Adiciona diferentes direções de animação para variedade
            if (index % 4 === 0) {
                element.classList.add('reveal-fade-up');
            } else if (index % 4 === 1) {
                element.classList.add('reveal-fade-right');
            } else if (index % 4 === 2) {
                element.classList.add('reveal-fade-left');
            } else {
                element.classList.add('reveal-fade-in');
            }
            
            // Adiciona delays escalonados para elementos sequenciais
            if (index % 3 === 1) {
                element.classList.add('reveal-delay-1');
            } else if (index % 3 === 2) {
                element.classList.add('reveal-delay-2');
            }
        });
    });

    // Configura o Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Quando o elemento estiver visível na viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Opcional: parar de observar após revelar
                // observer.unobserve(entry.target);
            } 
            // Opcional: remover a classe quando sair da viewport
            // else {
            //     entry.target.classList.remove('revealed');
            // }
        });
    }, {
        // Configurações do observer
        threshold: 0.1,  // Quando 10% do elemento estiver visível
        rootMargin: '0px 0px -50px 0px' // Ativa um pouco antes do elemento entrar na viewport
    });

    // Observa todos os elementos com a classe reveal-element
    document.querySelectorAll('.reveal-element').forEach(element => {
        observer.observe(element);
    });
}
