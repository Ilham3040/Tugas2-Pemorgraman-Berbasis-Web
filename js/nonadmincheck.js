// Keep as a lightweight, instant script
(function() {
    const userRole = sessionStorage.getItem('userRole');
    if (userRole !== 'UPBJJ-UT') {
        window.location.href = 'denied.html';
    }
})();