new Vue({
    el: '#app',
    data: {
        isSidebarOpen: false,
        isPopupActive: false,
        totalBooks: [],
        selectedIndex: null,
        editForm: {
            kode: '',
            judul: '',
            kategori: '',
            upbjj: '',
            lokasiRak: '',
            harga: 0,
            qty: 0,
            safety: 0,
            catatanHTML: ''
        }
    },
    computed: {
        lowStockCount() {
            return this.totalBooks.filter(b => b.qty < b.safety).length;
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
            this.editForm = { ...this.totalBooks[index] };
            this.isPopupActive = true;
        },
        closePopup() {
            this.isPopupActive = false;
            this.selectedIndex = null;
        },
        saveEdit() {
            if (this.selectedIndex !== null) {
                Vue.set(this.totalBooks, this.selectedIndex, { ...this.editForm });
                localStorage.setItem('inventory', JSON.stringify(this.totalBooks));
                this.closePopup();
                alert('Data bahan ajar berhasil diperbarui!');
            }
        },
        loadBooksLocally() {
            const rawBooks = localStorage.getItem('inventory');
            if (rawBooks) {
                this.totalBooks = JSON.parse(rawBooks);
            } else {
                this.totalBooks = [...this.stok];
                localStorage.setItem('inventory', JSON.stringify(this.totalBooks));
            }
        },
        handleLogout() {
            sessionStorage.clear();
            window.location.href = 'index.html';
        }
    }
});