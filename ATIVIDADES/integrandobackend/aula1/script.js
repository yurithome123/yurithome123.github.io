document.querySelector('form').addEventListener('submit', function(event) { // event function
    event.preventDefault();

    var nome = document.getElementById('nome').value;
    var data_nascimento = document.getElementById('idade').value;
    var hobby = document.getElementById('hobby').value;

    var birthDate = new Date(data_nascimento);
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--; // se ainda não fez aniversário
    }

    if(age < 18) {
        alert("Você é menor de idade, pode sair daqui.");
        return;
    }
    var msg = "Olá, " + nome + "! Você tem " + age + " anos e gosta de " + hobby;

    document.getElementById('msg_result').textContent = msg;
    document.getElementById('titulo').textContent = "Seja bem vindo " + nome;

    var explosion = document.getElementById('explosion');
    explosion.classList.add('animate');

    explosion.addEventListener('animationend', function() {
        explosion.classList.remove('animate');
    });
});
