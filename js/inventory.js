const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const popup = document.querySelector('.content .popup')
const logoutButton = document.querySelector('#logout')
const bookList = document.querySelector('#book-list')

userId   = sessionStorage.getItem('userId');
userRole = sessionStorage.getItem('userRole');
userData = JSON.parse(sessionStorage.getItem('userData'));
userTracking = JSON.parse(sessionStorage.getItem('userTracking'));
books = JSON.parse(sessionStorage.getItem('books'));


bookList.innerHTML = dataBahanAjar.map(function(b, i) {
    return `
<tr>
    <td><img src="${b.cover}" alt="Cover"></td>
    <td>${b.kodeLokasi}</td>
    <td>${b.kodeBarang}</td>
    <td>${b.namaBarang}</td>
    <td>${b.jenisBarang}</td>
    <td>${b.edisi}</td>
    <td>${b.stok}</td>
    <td><button class="edit-btn" onclick="openPopup(${i})">Edit</button></td>
</tr>`;
}).join('');


function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function openPopup(index) {
    const b = dataBahanAjar[index];
    document.getElementById('kodeLokasi').value = b.kodeLokasi;
    document.getElementById('kodeBarang').value = b.kodeBarang;
    document.getElementById('namaBarang').value = b.namaBarang;
    document.getElementById('jenisBarang').value = b.jenisBarang;
    document.getElementById('edisi').value = b.edisi;
    document.getElementById('stok').value = b.stok;
    document.getElementById('cover').value = b.cover;
    popup.classList.add('active');
}
function closePopup() {
    popup.classList.remove('active');
}

popup.addEventListener('click', (e) => {
    if (!e.target.closest('.edit-menu')) {
        closePopup();
    }
});

logoutButton.addEventListener('click', function () {
    userId = userRole = userName = null;
    sessionStorage.clear();
    window.location.href = 'index.html';
})

