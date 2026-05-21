loginStatus = sessionStorage.getItem('userId');
userRole = sessionStorage.getItem('userRole');
if (!loginStatus || userRole == "UPBJJ-UT") {
    window.location.href = 'denied.html';
}