new Vue({
    el: '#app',
    data: {
        isSidebarOpen: false,
        isPopupActive: false,
        totalBooks: [],
        selectedIndex: null,
        // Model store representing active object mutation details
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
    created() {
        // Hydrate data attributes safely out of sessionStorage or structural data fallback definitions
        const rawBooks = sessionStorage.getItem('books');
        if (rawBooks) {
            this.totalBooks = JSON.parse(rawBooks);
        } else if (typeof books !== 'undefined') {
            this.totalBooks = books;
            sessionStorage.setItem('books', JSON.stringify(books));
        } else if (typeof dataBahanAjar !== 'undefined') {
            // Support bindings targeting structural properties found inside native variable hooks
            this.totalBooks = dataBahanAjar;
            sessionStorage.setItem('books', JSON.stringify(dataBahanAjar));
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
        openPopup(index) {
            this.selectedIndex = index;
            const chosenBook = this.totalBooks[index];

            // Use spread operator to decouple input fields from mutations until 'Simpan' is confirmed
            this.editForm = { ...chosenBook };
            this.isPopupActive = true;
        },
        closePopup() {
            this.isPopupActive = false;
            this.selectedIndex = null;
        },
        handleOverlayClick(e) {
            // Closes modal layout window safely when backdrop regions are selected
            this.closePopup();
        },
        saveEdit() {
            if (this.selectedIndex !== null) {
                // Apply update changes reactively into array index collection values
                Vue.set(this.totalBooks, this.selectedIndex, { ...this.editForm });

                // Commit mutations across global web SessionStorage engine
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