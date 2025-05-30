const lines = document.querySelectorAll('.line');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    lines.forEach((line, i) => {
        const trigger = 200 + i * 200;
        
        if (scrollY > trigger) {
            line.classList.add('visible');
        }
    });
});