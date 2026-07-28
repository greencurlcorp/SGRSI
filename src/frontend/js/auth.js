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
    const jerarquia = { docente: 1, tecnico: 2, administrador: 3 };
    if (!sesion || (jerarquia[sesion.rol] || 0) < (jerarquia[rolPermitido] || 99)) {
        window.location.replace(new URL('../../../index.html', window.location.href).href);
    }
}
