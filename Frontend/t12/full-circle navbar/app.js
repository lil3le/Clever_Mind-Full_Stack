document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');

    hamburger.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.1) rotate(180deg)';
    });

    hamburger.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});