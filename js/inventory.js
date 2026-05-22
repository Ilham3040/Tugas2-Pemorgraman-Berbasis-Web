new Vue({
    el: '#app',
    data: {
        isSidebarOpen: false,
        isPopupActive: false,
        totalBooks:    [],
        selectedIndex: null,
        stockWarning:  false,
        editForm: { kodeLokasi:'', kodeBarang:'', namaBarang:'', jenisBarang:'', edisi:0, stok:0, cover:'' }
    },

    // computed: reactively counts how many books are low on stock
    computed: {
        lowStockCount() {
            return this.totalBooks.filter(b => b.stok < 10).length;
        }
    },

    // watch: monitors nested editForm.stok to trigger in-popup warning
    watch: {
        'editForm.stok'(val) {
            this.stockWarning = val < 10;
        },
        isSidebarOpen(isOpen) {
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }
    },

    created() {
        const raw = sessionStorage.getItem('books');
        if (raw) {
            this.totalBooks = JSON.parse(raw);
        } else if (typeof dataBahanAjar !== 'undefined') {
            this.totalBooks = dataBahanAjar;
            sessionStorage.setItem('books', JSON.stringify(dataBahanAjar));
        }
    },

    methods: {
        openSidebar()  { this.isSidebarOpen = true;  },
        closeSidebar() { this.isSidebarOpen = false; },
        openPopup(index) {
            this.selectedIndex = index;
            this.editForm      = { ...this.totalBooks[index] };
            this.isPopupActive = true;
        },
        closePopup() {
            this.isPopupActive = false;
            this.selectedIndex = null;
        },
        handleOverlayClick() { this.closePopup(); },
        saveEdit() {
            if (this.selectedIndex !== null) {
                Vue.set(this.totalBooks, this.selectedIndex, { ...this.editForm });
                sessionStorage.setItem('books', JSON.stringify(this.totalBooks));
                this.closePopup();
            }
        },
        handleLogout() {
            sessionStorage.clear();
            window.location.href = 'index.html';
        }
    }
});