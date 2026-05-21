new Vue({
    el: '#app',
    data: {
        isSidebarOpen: false,
        isModalActive: false,
        localBooks: [],
        selectedBookIdx: '',
        selectedBook: null,
        orderQuantity: 0,
        qtyError: false,
        qtyErrorMsg: ''
    },
    created() {
        // Hydrate localized mock data storage safely
        const rawBooks = sessionStorage.getItem('books');
        if (rawBooks) {
            this.localBooks = JSON.parse(rawBooks);
        } else if (typeof books !== 'undefined') {
            this.localBooks = books; 
            sessionStorage.setItem('books', JSON.stringify(books));
        }
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
        handleBookSelection() {
            this.qtyError = false;
            this.orderQuantity = 0;
            this.selectedBook = this.localBooks[this.selectedBookIdx];
        },
        submitOrder() {
            this.qtyError = false;

            if (!this.selectedBook) return;

            if (this.orderQuantity <= 0) {
                this.qtyError = true;
                this.qtyErrorMsg = 'Jumlah pesanan harus lebih dari 0';
                return;
            }

            if (this.orderQuantity > this.selectedBook.stok) {
                this.qtyError = true;
                this.qtyErrorMsg = `Stok tidak mencukupi! Sisa stok: ${this.selectedBook.stok}`;
                return;
            }

            // Deduct inventory quantities reactively 
            this.selectedBook.stok -= this.orderQuantity;

            // Commit back states directly into global web SessionStorage
            sessionStorage.setItem('books', JSON.stringify(this.localBooks));

            // Trigger complete layout success modals
            this.isModalActive = true;
        },
        closeModal() {
            this.isModalActive = false;
            // Clean dynamic form states tracking out completely
            this.selectedBookIdx = '';
            this.selectedBook = null;
            this.orderQuantity = 0;
        },
        handleLogout() {
            sessionStorage.clear();
            window.location.href = 'index.html';
        }
    }
});