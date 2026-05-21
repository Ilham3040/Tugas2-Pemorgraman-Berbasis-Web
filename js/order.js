const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const popup = document.querySelector('.content .popup')
const logoutButton = document.querySelector('#logout')
const tracking = document.querySelector('#userTracking')
const bookList = document.querySelector('#book-list')

userId   = sessionStorage.getItem('userId');
userRole = sessionStorage.getItem('userRole');
userData = JSON.parse(sessionStorage.getItem('userData'));
userTracking = JSON.parse(sessionStorage.getItem('userTracking'));
books = JSON.parse(sessionStorage.getItem('books'));


console.log(userTracking);

tracking.innerHTML = userTracking.map(function(t) {
    return `
<div class="order">
    <div class="order-top">
        <div class="order-number">
            <h3>${t.nomorDO}</h3>
            <h3>${t.nama}</h3>
            <h3>${t.paket}</h3>
        </div>
        <div class="time-price">
            <h4>${t.tanggalKirim}</h4>
            <h4>${t.total}</h4>
        </div>
    </div>
    <div class="order-bottom">
        <h4>${t.status}  -  ${t.ekspedisi}</h4>
    </div>
</div>
<div class="tracking">
    <ul>
        ${t.perjalanan.slice().reverse().map(function(p) {
            return '<li><p>' + p.waktu + '</p><p>' + p.keterangan + '</p></li>';
        }).join('')}
    </ul>
</div>`;
}).join('');

bookList.innerHTML = books.map(function(b) {
    return `
<li>
    <img src="${b.cover}">
    <div class="book-info">
        <p>${b.namaBarang}</p>
        <p>${b.kodeBarang}</p>
        <p>Edisi ${b.edisi}</p>
        <p>Stock : ${b.stok}</p>
        <button class="order-btn">Order</button>
    </div>
</li>`;
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

function openPopup() {
    popup.classList.add('active');
}

function closePopup() {
    popup.classList.remove('active');
}

popup.addEventListener('click', (e) => {
    if (!e.target.closest('.book-order')) {
        closePopup();
    }
});


document.getElementById('open-order').addEventListener('click', openPopup);

logoutButton.addEventListener('click', function () {
    userId = userRole = userName = null;
    sessionStorage.clear();
    window.location.href = 'index.html';
})

