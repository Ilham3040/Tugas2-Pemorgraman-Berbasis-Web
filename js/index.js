new Vue({
    el: '#app',
    data: {
        email: '',
        password: '',
        isLoading: false,
        errors: {
            email: false,
            password: false,
            emailMsg: 'Tolong masukkan email yang valid',
            passwordMsg: 'Password salah'
        },
        toast: {
            show: false,
            message: ''
        }
    },
    methods: {
        showToast(msg) {
            this.toast.message = msg;
            this.toast.show = true;
            setTimeout(() => {
                this.toast.show = false;
            }, 3000);
        },
        validate() {
            let isValid = true;
            const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Reset Error States
            this.errors.email = false;
            this.errors.password = false;
            this.errors.emailMsg = 'Tolong masukkan email yang valid';

            // Email Validation
            if (!emailRx.test(this.email)) {
                this.errors.email = true;
                isValid = false;
            }

            // Password Validation
            if (this.password.length < 6) {
                this.errors.password = true;
                isValid = false;
            }

            // Authentication Check via data.js global function
            if (isValid && !checkAuth(this.email, this.password)) {
                this.errors.email = true;
                this.errors.password = true;
                this.errors.emailMsg = 'Email atau password salah';
                isValid = false;
            }

            return isValid;
        },
        handleLogin() {
            if (!this.validate()) return;

            this.isLoading = true;
            
            // Simulating API Latency match to your native code
            setTimeout(() => {
                this.isLoading = false;
                this.showToast('✓ Logged in successfully');
                window.location.href = 'dashboard.html';
            }, 400);
        }
    }
});