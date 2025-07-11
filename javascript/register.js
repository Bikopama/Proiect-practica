document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeatPassword').value;

    let isValid = true;

    if (!email) {
        document.getElementById('email-error').textContent = 'Te rugăm să introduci o adresă de email';
        isValid = false;
    } else if (!email.includes('@') || !email.includes('.')) {
        document.getElementById('email-error').textContent = 'Te rugăm să introduci o adresă de email validă';
        isValid = false;
    }

    if (!password) {
        document.getElementById('password-error').textContent = 'Te rugăm să introduci o parolă';
        isValid = false;
    } else {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!regex.test(password)) {
            document.getElementById('password-error').textContent = 'Parola trebuie să aibă minim 6 caractere, să conțină cel puțin o literă mare, o literă mică, un număr și un simbol special!';
            isValid = false;
        }
    }

    if (!repeatPassword) {
        document.getElementById('repeatPassword-error').textContent = 'Te rugăm să confirmi parola';
        isValid = false;
    } else if (password !== repeatPassword) {
        document.getElementById('repeatPassword-error').textContent = 'Parolele nu coincid!';
        isValid = false;
    }

    if (!isValid) return;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        document.getElementById('email-error').textContent = 'Acest email este deja înregistrat!';
        return;
    }

    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify({ email, password }));

    window.location.href = "login.html";
});