new Vue({
    el: '#app',
    data: {
        isSidebarOpen: false,
        isModalActive: false,
        isOrderMenuOpen: false,
        localBooks: [],
        userTracking: [],
        selectedPengiriman: 'REG',
        selectedBookIdx: '',
        selectedBook: null,
        orderQuantity: 0,
        qtyError: false,
        qtyErrorMsg: ''
    },
    watch: {
        localBooks: {
            handler(newBooksValue) {
                if (this.isSubmitting) return;
                localStorage.setItem('books', JSON.stringify(newBooksValue));
            },
            deep: true
        },
        userTracking: {
            handler(newUserTrackingValue) {
                const rawTracking = localStorage.getItem('tracking');
                if (!rawTracking) return;
                const allUsersTracking = JSON.parse(rawTracking);
                const currentUserId = Number(sessionStorage.getItem('userId'));
                const userIdx = allUsersTracking.findIndex(u => u.userId === currentUserId);
                if (userIdx !== -1) {
                    allUsersTracking[userIdx].datas = newUserTrackingValue;
                    localStorage.setItem('tracking', JSON.stringify(allUsersTracking));
                }
            },
            deep: true
        }
    },
    created() {
        this.loadBooksLocally();
        this.loadTrackingLocally();
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
            const totalOrder = this.localBooks.reduce((acc, book) => acc + (book.jumlahDipesan || 0), 0);
            if (totalOrder === 0) return;
            this.isSubmitting = true;
            const booksToSave = this.localBooks.map(book => {
                const bookCopy = { ...book };
                bookCopy.qty -= bookCopy.jumlahDipesan;
                delete bookCopy.jumlahDipesan;
                return bookCopy;
            });
            localStorage.setItem('books', JSON.stringify(booksToSave));
            this.loadBooksLocally();
            const randomNum = Math.floor(1000 + Math.random() * 9000);
            const currentTimestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
            const currentDateOnly = currentTimestamp.substring(0, 10);
            const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
            const pengiriman = this.pengirimanList.find(p => p.kode === this.selectedPengiriman);
            const newOrderTracking = {
                nomorDO: `202600${randomNum}`,
                nama: userData.nama || 'User Pembeli',
                status: 'Dalam Perjalanan',
                ekspedisi: pengiriman ? pengiriman.nama : 'Reguler',
                tanggalKirim: currentDateOnly,
                paket: `PAKET-UT-${randomNum}`,
                total: `Rp ${totalOrder * 50000}`,
                perjalanan: [
                    { waktu: currentTimestamp, keterangan: 'Pesanan paket sedang diproses' }
                ]
            };
            this.userTracking.push(newOrderTracking);
            this.isSubmitting = false;
            alert('Pesanan Berhasil Dikirim!');
            this.closeCheckout();
        },
        clearOrder() {
            for (const book of this.localBooks) {
                book.jumlahDipesan = 0;
            }
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
            if (book.qty > book.jumlahDipesan) {
                book.jumlahDipesan++;
            } else {
                alert('Stok barang sudah habis!');
            }
        },
        decrementQty(idx) {
            const book = this.localBooks[idx];
            if (book.jumlahDipesan > 0) {
                book.jumlahDipesan--;
            }
        },
        loadBooksLocally() {
            const rawBooks = localStorage.getItem('books');
            if (rawBooks) {
                const parsedBooks = JSON.parse(rawBooks);
                this.localBooks = parsedBooks.map(book => {
                    if (book.jumlahDipesan === undefined) book.jumlahDipesan = 0;
                    return book;
                });
            } else {
                this.localBooks = this.dataBahanAjar.map(book => ({ ...book, jumlahDipesan: 0 }));
                localStorage.setItem('books', JSON.stringify(this.localBooks));
            }
        },
        loadTrackingLocally() {
            const rawTracking = localStorage.getItem('tracking');
            if (rawTracking) {
                const trackingData = JSON.parse(rawTracking);
                const currentUserId = Number(sessionStorage.getItem('userId'));
                const activeUser = trackingData.find(u => u.userId === currentUserId);
                this.userTracking = activeUser ? activeUser.datas : [];
            } else {
                this.userTracking = [];
                localStorage.setItem('tracking', JSON.stringify(this.dataTracking));
            }
        }
    }
});