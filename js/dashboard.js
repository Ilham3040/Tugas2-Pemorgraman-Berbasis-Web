new Vue({
    el: '#app',
    data: {
        isSidebarOpen: false,
        userId: null,
        userRole: '',
        userData: null
    },

    // computed: builds reactive derived strings from data
    computed: {
        greetingHtml() {
            if (!this.userData) return '';
            return `Selamat datang, <strong>${this.userData.nama}</strong>!`;
        },
        brandHtml() {
            return 'MyUT<span class="dot">.</span>';
        }
    },

    // watch: reacts to sidebar state changes — keeps side-effect out of methods
    watch: {
        isSidebarOpen(isOpen) {
            document.body.style.overflow = isOpen ? 'hidden' : '';
        },
        // watch: logs session user changes (useful for debugging / future audit trail)
        userId(val) {
            console.log('Active session userId changed:', val);
        }
    },

    created() {
        this.userId   = sessionStorage.getItem('userId');
        this.userRole = sessionStorage.getItem('userRole');
        const raw     = sessionStorage.getItem('userData');
        if (raw) this.userData = JSON.parse(raw);
    },

    methods: {
        openSidebar()  { this.isSidebarOpen = true;  },
        closeSidebar() { this.isSidebarOpen = false; },
        handleLogout() {
            this.userId   = null;
            this.userRole = '';
            this.userData = null;
            sessionStorage.clear();
            window.location.href = 'index.html';
        }
    }
});