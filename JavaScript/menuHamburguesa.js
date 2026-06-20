const btnHamburguesa = document.getElementById('btn_hamburguesa');
const menuDesplegable = document.getElementById('menu_desplegable');

if (btnHamburguesa && menuDesplegable) {
    btnHamburguesa.addEventListener('click', (e) => {
        e.stopPropagation();
        btnHamburguesa.classList.toggle('activo');
        menuDesplegable.classList.toggle('abierto');
    });

    document.addEventListener('click', (e) => {
        if (!menuDesplegable.contains(e.target) && !btnHamburguesa.contains(e.target)) {
            btnHamburguesa.classList.remove('activo');
            menuDesplegable.classList.remove('abierto');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            btnHamburguesa.classList.remove('activo');
            menuDesplegable.classList.remove('abierto');
        }
    });
}
