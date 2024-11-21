document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.fas.fa-bars'); 
    const menu = document.getElementById('menu'); 

    
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active'); 
    });

    
    document.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && event.target !== menuToggle) {
            menu.classList.remove('active'); 
        }
    });
});