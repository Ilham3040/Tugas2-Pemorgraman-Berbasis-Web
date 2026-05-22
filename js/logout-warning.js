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
        goBack() {
            window.history.back(); 
        },

        forceLogout() {
            sessionStorage.clear();
            window.location.href = 'index.html';
        }
    }
});