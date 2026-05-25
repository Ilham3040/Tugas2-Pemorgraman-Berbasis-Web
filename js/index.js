new Vue({
    el: '#app',
    data: {
        email: '',
        password: '',
        isLoading: false,
        errors: {
            email: false,
            emailMsg: 'Masukkan email yang valid',
            password: false,
            passwordMsg: 'Password minimal 6 karakter'
        },
        toast: { show: false, message: '' }
    },

    computed: {
        isFormReady() {
            return this.email.length > 0 && this.password.length > 0;
        }
    },

    watch: {
        email(val) {
            const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (val.length === 0) { this.errors.email = false; return; }
            this.errors.email    = !rx.test(val);
            this.errors.emailMsg = 'Format email tidak valid';
        },
        password(val) {
            if (val.length === 0) { this.errors.password = false; return; }
            this.errors.password    = val.length < 6;
            this.errors.passwordMsg = 'Password minimal 6 karakter';
        }
    },

    methods: {
        showToast(msg) {
            this.toast.message = msg;
            this.toast.show    = true;
            setTimeout(() => { this.toast.show = false; }, 3000);
        },
        validate() {
            const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.errors.email    = false;
            this.errors.password = false;
            this.errors.emailMsg = 'Masukkan email yang valid';

            if (!rx.test(this.email))       { this.errors.email    = true; return false; }
            if (this.password.length < 6)   { this.errors.password = true; return false; }
            if (!this.checkAuth(this.email, this.password)) {
                this.errors.email    = true;
                this.errors.password = true;
                this.errors.emailMsg = 'Email atau password salah';
                return false;
            }
            return true;
        },
        handleLogin() {
            if (!this.validate()) return;
            this.isLoading = true;
            setTimeout(() => {
                this.isLoading = false;
                this.showToast('✓ Login berhasil');
                window.location.href = 'dashboard.html';
            }, 400);
        }
    }
});