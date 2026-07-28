const sesion = obtenerSesion();
const menu = document.getElementById('menu_desplegable');

const menusPorRol = {
    docente: [
        ['solicitante/planillaIncidencias.html', 'Registrar incidencia'],
        ['solicitante/planillaSolicitud.html', 'Solicitar software']
    ],
    tecnico: [
        ['tecnico/panelIncidencias.html', 'Panel de incidencias'],
        ['tecnico/panelSolicitudes.html', 'Panel de solicitudes']
    ],
    administrador: [
        ['administrador/panelUsuarios.html', 'Panel de usuarios'],
        ['administrador/esquemaTrazabilidad.html', 'Esquema de trazabilidad']
    ]
};

const grupos = sesion?.rol === 'administrador'
    ? [['administrador', menusPorRol.administrador], ['tecnico', menusPorRol.tecnico], ['docente', menusPorRol.docente]]
    : sesion?.rol === 'tecnico'
        ? [['tecnico', menusPorRol.tecnico], ['docente', menusPorRol.docente]]
        : [['docente', menusPorRol.docente]];
menu.innerHTML = grupos.map(([rol, enlaces]) => `<div class="menu_grupo menu_grupo_${rol}"><span class="menu_grupo_titulo">${rol[0].toUpperCase() + rol.slice(1)}</span>${enlaces.map(([href, texto]) => `<a href="${href}" class="menu_item">${texto}</a>`).join('')}</div>`).join('') + '<a href="../../index.html" class="menu_item menu_cerrar" id="cerrar_sesion">Cerrar sesión</a>';
document.getElementById('cerrar_sesion').addEventListener('click', () => sessionStorage.removeItem('srgsi_usuario'));
