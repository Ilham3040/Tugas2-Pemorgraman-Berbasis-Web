new Vue({
    el: '#app',
    data: {
        isSidebarOpen: false,
        isModalActive: false,
        localBooks:     [],
        selectedBookIdx: '',
        selectedBook:   null,
        orderQuantity:  0,
        qtyError:       false,
        qtyErrorMsg:    ''
    },

    // computed: single source of truth for whether the order can be submitted
    computed: {
        isOrderValid() {
            return (
                this.selectedBook !== null &&
                this.orderQuantity > 0 &&
                this.orderQuantity <= this.selectedBook.stok
            );
        }
    },

    // watch: replaces handleBookSelection @change + handles live qty validation
    watch: {
        selectedBookIdx(val) {
            this.selectedBook  = val !== '' ? this.localBooks[val] : null;
            this.orderQuantity = 0;
            this.qtyError      = false;
        },
        orderQuantity(val) {
            if (!this.selectedBook) return;
            if (val <= 0) {
                this.qtyError   = true;
                this.qtyErrorMsg = 'Jumlah harus lebih dari 0';
            } else if (val > this.selectedBook.stok) {
                this.qtyError   = true;
                this.qtyErrorMsg = `Stok tidak cukup! Sisa: ${this.selectedBook.stok}`;
            } else {
                this.qtyError = false;
            }
        }
    },

    created() {
        const raw = sessionStorage.getItem('books');
        if (raw) {
            this.localBooks = JSON.parse(raw);
        } else if (typeof dataBahanAjar !== 'undefined') {
            this.localBooks = dataBahanAjar;
            sessionStorage.setItem('books', JSON.stringify(dataBahanAjar));
        }
    },

    methods: {
        openSidebar()  { this.isSidebarOpen = true;  document.body.style.overflow = 'hidden'; },
        closeSidebar() { this.isSidebarOpen = false; document.body.style.overflow = '';       },
        submitOrder() {
            if (!this.isOrderValid) return;
            this.selectedBook.stok -= this.orderQuantity;
            sessionStorage.setItem('books', JSON.stringify(this.localBooks));
            this.isModalActive = true;
        },
        closeModal() {
            this.isModalActive   = false;
            this.selectedBookIdx = '';
            this.selectedBook    = null;
            this.orderQuantity   = 0;
        },
        handleLogout() {
            sessionStorage.clear();
            window.location.href = 'index.html';
        }
    }
});