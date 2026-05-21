loginStatus = sessionStorage.getItem('userId');
if (!loginStatus) {
    window.location.href = 'denied.html';
}