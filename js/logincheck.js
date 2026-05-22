(function() {
    if (!sessionStorage.getItem('userId')) {
        window.location.href = 'denied.html';
    }
})();