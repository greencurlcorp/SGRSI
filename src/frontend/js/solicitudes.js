const listaSolicitudes = document.querySelector('.solicitudes_lista');
const filtroSolicitudes = document.getElementById('filtro');
let solicitudes = [];

function renderSolicitudes() {
    const filtro = filtroSolicitudes.value;
    const visibles = solicitudes.filter(item => filtro === 'todos' || item.estado === filtro || item.prioridad === filtro);
    listaSolicitudes.innerHTML = visibles.length ? visibles.map(item => `<li class="solicitud_item ${String(item.prioridad || 'Media').toLowerCase()}" data-id="${item.id}"><div><h3>${item.software}</h3><small>${item.asignatura} · ${item.solicitante} · ${item.grupo}</small></div><span>${item.prioridad || 'Media'}</span></li>`).join('') : '<li class="solicitud_item">No hay solicitudes para este filtro.</li>';
}

async function cargarSolicitudes() {
    const response = await fetch('../../backend/api/tech-software-requests.php');
    const data = await response.json();
    solicitudes = data.solicitudes || [];
    renderSolicitudes();
}

filtroSolicitudes.addEventListener('change', renderSolicitudes);
listaSolicitudes.addEventListener('click', event => {
    const fila = event.target.closest('.solicitud_item');
    if (!fila || !fila.dataset.id) return;
    window.location.href = `detalleSolicitud.html?id=${encodeURIComponent(fila.dataset.id)}`;
});

cargarSolicitudes();
