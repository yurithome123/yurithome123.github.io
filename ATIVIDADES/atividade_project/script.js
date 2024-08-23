function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginDB = [
        { username: 'yuri', password: 'admin', name: 'Yuri' },
        { username: 'admin', password: 'yuri', name: 'Admin' },
        { username: '1234', password: '5678', name: 'Outro' },
    ];

    const foundLogin = loginDB.find(login => login.username === username && login.password === password);

    if (foundLogin) {
        document.getElementById('login-message').innerText = 'Login successful!';

        document.getElementById('user-name').innerText = `Logged in as: ${foundLogin.name}`;
        loginMusic.play();
    } else {
        document.getElementById('login-message').innerText = 'Invalid username or password.';
        document.getElementById('user-name').innerText = '';
    }
}
