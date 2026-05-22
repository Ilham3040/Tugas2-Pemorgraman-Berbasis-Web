(function() {
    if (sessionStorage.getItem('userId')) {
        window.location.href = 'logout-warning.html';
    }
})();