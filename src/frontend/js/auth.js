const CLAVE_USUARIOS = 'srgsi_usuarios';

function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem(CLAVE_USUARIOS) || '[]');
}

function guardarUsuarios(usuarios) {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

function obtenerSesion() {
    return JSON.parse(sessionStorage.getItem('srgsi_usuario') || 'null');
}

function protegerRuta(rolPermitido) {
    const sesion = obtenerSesion();
    if (!sesion || sesion.rol !== rolPermitido) {
        window.location.replace(new URL('../../../index.html', window.location.href).href);
    }
}
