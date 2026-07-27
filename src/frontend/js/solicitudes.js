const filtroSolicitudes = document.getElementById('filtro');
const solicitudes = document.querySelectorAll('.solicitud_item');

const criteriosFiltro = {
    todos: () => true,
    sinResolver: (solicitud) => solicitud.classList.contains('sinResolver'),
    enProceso: (solicitud) => solicitud.classList.contains('enProceso'),
    resuelto: (solicitud) => solicitud.classList.contains('resuelto'),
    prioridadAlta: (solicitud) => solicitud.classList.contains('alta'),
    prioridadMedia: (solicitud) => solicitud.classList.contains('media'),
    prioridadBaja: (solicitud) => solicitud.classList.contains('baja')
};

if (filtroSolicitudes) {
    filtroSolicitudes.addEventListener('change', () => {
    const criterio = criteriosFiltro[filtroSolicitudes.value] || criteriosFiltro.todos;

    solicitudes.forEach((solicitud) => {
        solicitud.style.display = criterio(solicitud) ? 'flex' : 'none';
    });
    });
}
