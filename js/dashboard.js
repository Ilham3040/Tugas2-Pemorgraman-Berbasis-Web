const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const adminMenu = document.querySelector('#admin');
const nonAdminMenu = document.querySelector('#nonadmin');
const logoutButton = document.querySelector('#logout')

userId   = sessionStorage.getItem('userId');
userRole = sessionStorage.getItem('userRole');
userData = JSON.parse(sessionStorage.getItem('userData'));

console.log('session:', userId, userRole, userData.nama);


if (userRole == "UPBJJ-UT") {
    adminMenu.classList.add('hidden')
} else {
    nonAdminMenu.classList.add('hidden')
}

const userIdentity = document.querySelector('#identity');


userIdentity.innerHTML = `
    <h3>${userData.nama}</h3>
    <h3>${userData.role}</h3>
    <h3>${userData.lokasi}</h3>
    `;




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


logoutButton.addEventListener('click', function () {
    userId = userRole = userName = null;
    sessionStorage.clear();
    window.location.href = 'index.html';
})

