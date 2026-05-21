function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }

function validate() {
    const email = document.getElementById('email');
    const pass = document.getElementById('password');
    const emailErr = document.getElementById('email-err');
    const passErr = document.getElementById('pass-err');
    let ok = true;

    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(email.value.trim())) {
        email.classList.add('error-input');
        emailErr.style.display = 'block';
        ok = false;
    } else {
        email.classList.remove('error-input');
        emailErr.style.display = 'none';
    }

    if (pass.value.length < 6) {
        pass.classList.add('error-input');
        passErr.style.display = 'block';
        ok = false;
    } else {
        pass.classList.remove('error-input');
        passErr.style.display = 'none';
    }

    if (ok && !checkAuth(email.value.trim(), pass.value)) {
        email.classList.add('error-input');
        pass.classList.add('error-input');
        emailErr.textContent = 'Email atau password salah';
        emailErr.style.display = 'block';
        ok = false;
    }

    return ok;
}

function handleLogin() {
    if (!validate()) return;
    const btn = document.getElementById('loginBtn');
    btn.classList.add('loading');
    btn.textContent = 'Signing in…';
    setTimeout(function() {
        btn.classList.remove('loading');
        btn.textContent = 'Sign In';
        showToast('✓ Logged in successfully');
        window.location.href = 'dashboard.html';
    }, 400);
}

document.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleLogin();
});
