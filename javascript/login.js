

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    if (!email || !password) {
        alert('Te rugăm să completezi toate câmpurile!');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        if (remember) {
            localStorage.setItem('rememberedUser', JSON.stringify({ email, password }));
        }

        localStorage.setItem('currentUser', JSON.stringify(user));

        window.location.href = "meniu.html";
    } else {
        alert('Email sau parolă incorecte!');
    }
});


const rememberedUser = JSON.parse(localStorage.getItem('rememberedUser'));
if (rememberedUser) {
    document.getElementById('email').value = rememberedUser.email;
    document.getElementById('password').value = rememberedUser.password;
    document.getElementById('remember').checked = true;
}