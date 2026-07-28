const listaIncidencias = document.getElementById('lista_incidencias');
const filtroIncidencias = document.getElementById('filtro_incidencias');
let incidencias = [];

async function cargarPanel() {
    const response = await fetch('../../backend/api/tech-incidents.php');
    incidencias = (await response.json()).incidencias || [];
    document.getElementById('panel_vacio').classList.toggle('visible', incidencias.length === 0);
    renderIncidencias();
}

function renderIncidencias() {
    const filtro = filtroIncidencias.value;
    const visibles = incidencias.filter(item => filtro === 'todos' || item.estado === filtro || item.prioridad === filtro);
    listaIncidencias.innerHTML = visibles.map(item => `<article class="incidencia_tecnica ${String(item.prioridad || 'Media').toLowerCase()}" data-id="${item.id}"><div><strong>Salón ${item.numero_espacio} · ${item.materia}</strong><small>${item.fecha} · Grupo ${item.grupo} · ${item.docente}</small></div><span>${item.prioridad || 'Media'}</span></article>`).join('');
}

listaIncidencias.addEventListener('click', event => {
    const fila = event.target.closest('.incidencia_tecnica');
    if (fila && fila.dataset.id) window.location.href = `detalleIncidencia.html?id=${encodeURIComponent(fila.dataset.id)}`;
});

filtroIncidencias.addEventListener('change', renderIncidencias);

cargarPanel();
