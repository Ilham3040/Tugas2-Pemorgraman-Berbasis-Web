new Vue({
    el: '#app',
    data: {
        isSidebarOpen: false,
        isModalActive: false,
        isOrderMenuOpen: false,
        localBooks: [],
        userTracking: [],
        selectedBookIdx: '',
        selectedBook: null,
        orderQuantity: 0,
        qtyError: false,
        qtyErrorMsg: ''
    },

    computed: {
        isOrderValid() {
            return (
                this.selectedBook !== null &&
                this.orderQuantity > 0 &&
                this.orderQuantity <= this.selectedBook.stok
            );
        }
    },

    watch: {
        orderQuantity(val) {
            if (!this.selectedBook) return;
            if (val <= 0) {
                this.qtyError = true;
                this.qtyErrorMsg = 'Jumlah harus lebih dari 0';
            } else if (val > this.selectedBook.stok) {
                this.qtyError = true;
                this.qtyErrorMsg = `Stok tidak cukup! Sisa: ${this.selectedBook.stok}`;
            } else {
                this.qtyError = false;
            }
        }
    },

    created() {

        this.loadBooksLocally();


        const rawTracking = sessionStorage.getItem('userTracking');
        if (rawTracking) {
            this.userTracking = JSON.parse(rawTracking);
        } else if (typeof dataTracking !== 'undefined') {
            this.userTracking = dataTracking;
            sessionStorage.setItem('userTracking', JSON.stringify(dataTracking));
        }
    },

    methods: {
        openSidebar() { 
            this.isSidebarOpen = true;  
            document.body.style.overflow = 'hidden'; 
        },
        closeSidebar() { 
            this.isSidebarOpen = false;        
        },
        openCheckout() {
            this.isModalActive = true;
        },
        closeCheckout() {
            this.isModalActive = false;
        },
        openOrderMenu() {
            this.isOrderMenuOpen = true;
            
        },
        closeOrderMenu() {
            this.isOrderMenuOpen = false;
            
        },
        submitOrder() {
            const totalOrder = this.localBooks.reduce((accumulator, book) => {
                return accumulator + (book.jumlahDipesan || 0);
            }, 0);
            if (totalOrder === 0) return;


            const booksToSave = this.localBooks.map(book => {
                
                const bookCopy = { ...book };
                bookCopy.stok -= bookCopy.jumlahDipesan;
                delete bookCopy.jumlahDipesan;
                return bookCopy;
            });

            localStorage.setItem('books', JSON.stringify(booksToSave));
            this.loadBooksLocally();

            console.log(this.localBooks);
            
            alert('Pesanan Berhasil Dikirim!');
            this.closeCheckout();


        },
        reversedPerjalanan(arr) {
            if (!arr) return [];
            return arr.slice().reverse();
        },
        handleLogout() {
            sessionStorage.clear();
            window.location.href = 'index.html';
        },
        incrementQty(idx) {
            const book = this.localBooks[idx];

            if (book.stok > book.jumlahDipesan) {
                book.jumlahDipesan++;
                
                sessionStorage.setItem('books', JSON.stringify(this.localBooks));
            } else {
                alert('Stok barang sudah habis!');
            }
        },

        decrementQty(idx) {
            const book = this.localBooks[idx];
            

            if  (book.jumlahDipesan > 0) {
                book.jumlahDipesan--;
                
                sessionStorage.setItem('books', JSON.stringify(this.localBooks));
            }
        },
        loadBooksLocally() {
            const rawBooks = localStorage.getItem('books');
            if (rawBooks) {
                const parsedBooks = JSON.parse(rawBooks);

                this.localBooks = parsedBooks.map(book => {
                    if (book.jumlahDipesan === undefined) {
                        book.jumlahDipesan = 0;
                    }
                    return book;
                });
            } else if (typeof dataBahanAjar !== 'undefined') {
                this.localBooks = dataBahanAjar.map(book => {
                    return {
                        ...book,
                        jumlahDipesan: 0
                    };
                });
                sessionStorage.setItem('books', JSON.stringify(this.localBooks));
            }
        }
    }
});