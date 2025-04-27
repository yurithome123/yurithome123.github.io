document.addEventListener('DOMContentLoaded', function() {
    // Selecionar todos os botões de estratégia
    const strategyButtons = document.querySelectorAll('.strategy-toggle');

    strategyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const strategyId = this.getAttribute('data-strategy');
            const strategyContent = document.getElementById(`${strategyId}-strategy`);

            // Alternar visibilidade do conteúdo
            const isVisible = strategyContent.classList.contains('visible');
            strategyContent.classList.toggle('visible', !isVisible);

            // Atualizar o texto do botão
            this.textContent = isVisible ? 'Ver Estratégia' : 'Ocultar Estratégia';
        });
    });
});
