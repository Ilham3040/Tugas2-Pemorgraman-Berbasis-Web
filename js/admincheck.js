(function() {
    const userRole = sessionStorage.getItem('userRole');
    
    // If the user is a UPBJJ-UT account, explicitly deny them entry
    if (userRole === 'UPBJJ-UT') {
        window.location.href = 'denied.html';
    }
})();