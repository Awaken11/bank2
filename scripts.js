document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.service-card');
    
    function checkVisibility() {
        elements.forEach(el => {
            if (isInViewport(el)) {
                el.classList.add('fade-in');
            }
        });
    }

    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
});