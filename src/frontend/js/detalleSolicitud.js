const idSolicitud = new URLSearchParams(location.search).get('id');
const contenedor = document.getElementById('detalle_solicitud');

async function cargarDetalle() {
    const data = await (await fetch('../../backend/api/tech-software-requests.php')).json();
    const item = (data.solicitudes || []).find(solicitud => String(solicitud.id) === idSolicitud);
    if (!item) {
        contenedor.innerHTML = '<h2>Solicitud no encontrada</h2><a class="btn" href="panelSolicitudes.html">Volver</a>';
        return;
    }
    contenedor.innerHTML = `<a class="detalle_volver" href="panelSolicitudes.html">← Volver a solicitudes</a><h2>Detalle de la solicitud</h2><div class="detalle_datos"><p><strong>Software:</strong> ${item.software}</p><p><strong>Solicitante:</strong> ${item.solicitante}</p><p><strong>Asignatura:</strong> ${item.asignatura}</p><p><strong>Grupo:</strong> ${item.grupo}</p><p><strong>Equipos:</strong> ${item.equipos || 'No especificado'}</p><p><strong>Fecha:</strong> ${item.fecha || 'No especificada'}</p><p><strong>Descripción:</strong> ${item.descripcion || 'Sin descripción'}</p></div><div class="detalle_controles"><label>Estado<select id="estado"><option value="pendiente">Pendiente</option><option value="en_proceso">En proceso</option><option value="resuelto">Resuelto</option></select></label><label>Prioridad<select id="prioridad"><option>Baja</option><option>Media</option><option>Alta</option></select></label><button class="btn" id="guardar">Guardar cambios</button></div>`;
    const estado = document.getElementById('estado');
    const prioridad = document.getElementById('prioridad');
    estado.value = item.estado || 'pendiente';
    prioridad.value = item.prioridad || 'Media';
    document.getElementById('guardar').addEventListener('click', async () => {
        const response = await fetch('../../backend/api/software-request-action.php', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({id: idSolicitud, estado: estado.value, prioridad: prioridad.value}) });
        if (response.ok) alert('Solicitud actualizada correctamente.');
    });
}

cargarDetalle();
