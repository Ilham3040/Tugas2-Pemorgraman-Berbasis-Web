new Vue({
    el: '#app',
    data: {
        isSidebarOpen: false,
        isPopupActive: false,
        totalBooks: [],
        selectedIndex: null,
        stockWarning: false,
        editForm: {
            kodeLokasi: '',
            kodeBarang: '',
            namaBarang: '',
            jenisBarang: '',
            edisi: 0,
            stok: 0,
            cover: ''
        }
    },

    watch: {
        isSidebarOpen(isOpen) {
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }
    },

    created() {
        this.loadBooksLocally();
    },

    methods: {
        openSidebar() {
            this.isSidebarOpen = true;
        },
        closeSidebar() {
            this.isSidebarOpen = false;
        },
        openPopup(index) {
            this.selectedIndex = index;
            // Create a copy to prevent instant binding before saving
            this.editForm = { ...this.totalBooks[index] };
            this.isPopupActive = true;
        },
        closePopup() {
            this.isPopupActive = false;
            this.selectedIndex = null;
        },
        saveEdit() {
            if (this.selectedIndex !== null) {
                // Reactive data assignment using Vue.set
                Vue.set(this.totalBooks, this.selectedIndex, { ...this.editForm });
                
                // Keep data synchronous with global client storage (localStorage)
                localStorage.setItem('books', JSON.stringify(this.totalBooks));
                
                this.closePopup();
                alert('Data bahan ajar berhasil diperbarui!');
            }
        },
        loadBooksLocally() {
            // Priority given to shared localStorage so data stays persistent across orders
            const rawBooks = localStorage.getItem('books');
            if (rawBooks) {
                this.totalBooks = JSON.parse(rawBooks);
            } else if (typeof dataBahanAjar !== 'undefined') {
                this.totalBooks = [...dataBahanAjar];
                localStorage.setItem('books', JSON.stringify(this.totalBooks));
            }
        },
        handleLogout() {
            sessionStorage.clear();
            window.location.href = 'index.html';
        }
    }
});