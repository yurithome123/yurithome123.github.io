var randomQuotes = [
    { autor: "Roberto Neto", citacao: "Sei de nada" },
    { autor: "Yuri", citacao: "Aqui estou" },
    { autor: "Machado de Assis", citacao: "Ao vencedor, as batatas." },
    { autor: "Clarice Lispector", citacao: "Renda-se, como eu me rendi. Mergulhe no que você não conhece." },
    { autor: "Paulo Freire", citacao: "Educação não transforma o mundo. Educação muda pessoas. Pessoas transformam o mundo." }
];

document.querySelector('form').addEventListener('submit', function (event) { // event function
    event.preventDefault();
    const autor = document.querySelector('#autor-input').value;
    const citacao = document.querySelector('#citacao-input').value;
    console.log(`Autor: ${autor}, Citação: ${citacao}`);
    document.querySelector('#citacao').innerText = citacao;
    document.querySelector('#autor').innerText = autor;
    randomQuotes.push({ autor: autor, citacao: citacao });
    document.querySelector('#autor-input').value = '';
    document.querySelector('#citacao-input').value = '';
});

document.querySelector('#random').addEventListener('click', function (event) { // event function
    event.preventDefault();
    const randomIndex = Math.floor(Math.random() * randomQuotes.length);
    const randomQuote = randomQuotes[randomIndex];
    document.querySelector('#citacao').innerText = randomQuote.citacao;
    document.querySelector('#autor').innerText = randomQuote.autor;
});

document.querySelector('#listar').addEventListener('click', function (event) { // event function
    event.preventDefault();
    const quoteList = document.querySelector('#quote-list');
    quoteList.innerHTML = '';
    randomQuotes.forEach(function(quote) {
        const li = document.createElement('li');
        li.innerText = `${quote.citacao} - ${quote.autor}`;
        quoteList.appendChild(li);
    });
    
});

