new Vue({
    el: '#app',
    data: {
        isSidebarOpen: false,
        userId: null,
        userRole: '',
        userData: null,
        availableBooks: []
    },
    created() {
        // Hydrate data attributes safely out of sessionStorage during initialization lifecycle
        this.userId = sessionStorage.getItem('userId');
        this.userRole = sessionStorage.getItem('userRole');
        
        const rawUserData = sessionStorage.getItem('userData');
        if (rawUserData) {
            this.userData = JSON.parse(rawUserData);
        }

        const rawBooks = sessionStorage.getItem('books');
        if (rawBooks) {
            this.availableBooks = JSON.parse(rawBooks);
        }

        console.log('Vue Dashboard Session Loaded:', this.userId, this.userRole, this.userData?.nama);
    },
    methods: {
        openSidebar() {
            this.isSidebarOpen = true;
            document.body.style.overflow = 'hidden';
        },
        closeSidebar() {
            this.isSidebarOpen = false;
            document.body.style.overflow = '';
        },
        handleLogout() {
            // Clear down states
            this.userId = null;
            this.userRole = '';
            this.userData = null;
            
            // Wipe Storage Engine and Route out
            sessionStorage.clear();
            window.location.href = 'index.html';
        }
    }
});