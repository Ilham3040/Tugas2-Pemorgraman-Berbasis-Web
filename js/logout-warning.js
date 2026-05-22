new Vue({
    el: '#app',
    data: {
        userName: 'User'
    },
    created() {
        const rawUserData = sessionStorage.getItem('userData');
        if (rawUserData) {
            const parsed = JSON.parse(rawUserData);
            this.userName = parsed.nama || 'User';
        }
    },
    methods: {
        goToDashboard() {
            window.location.href = 'dashboard.html';
        },
        forceLogout() {
            sessionStorage.clear();
            window.location.href = 'index.html';
        }
    }
});