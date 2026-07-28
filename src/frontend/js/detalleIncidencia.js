const idIncidencia = new URLSearchParams(location.search).get('id');
const contenedor = document.getElementById('detalle_incidencia');

async function cargarDetalle() {
    const [incidenciasData, tecnicosData] = await Promise.all([
        fetch('../../backend/api/tech-incidents.php').then(response => response.json()),
        fetch('../../backend/api/technicians.php').then(response => response.json())
    ]);
    const item = (incidenciasData.incidencias || []).find(incidencia => String(incidencia.id) === idIncidencia);
    if (!item) {
        contenedor.innerHTML = '<h2>Incidencia no encontrada</h2><a class="btn" href="panelIncidencias.html">Volver</a>';
        return;
    }
    const tecnicos = tecnicosData.tecnicos || [];
    contenedor.innerHTML = `<a class="detalle_volver" href="panelIncidencias.html">← Volver a incidencias</a><h2>Detalle de la incidencia</h2><div class="detalle_datos"><p><strong>Salón:</strong> ${item.numero_espacio}</p><p><strong>Materia:</strong> ${item.materia}</p><p><strong>Grupo:</strong> ${item.grupo}</p><p><strong>Docente:</strong> ${item.docente}</p><p><strong>Fecha:</strong> ${item.fecha}</p><p><strong>Hora de inicio:</strong> ${item.hora_inicio || 'No especificada'}</p><p><strong>Hora de fin:</strong> ${item.hora_fin || 'No especificada'}</p><p><strong>Descripción:</strong> ${item.descripcion || 'Sin descripción'}</p></div><div class="detalle_controles"><label>Estado<select id="estado"><option>Pendiente</option><option>En proceso</option><option>Resuelto</option><option>Rechazada</option></select></label><label>Prioridad<select id="prioridad"><option>Baja</option><option>Media</option><option>Alta</option></select></label><label>Técnico<select id="tecnico"><option value="">Sin asignar</option>${tecnicos.map(tecnico => `<option value="${tecnico.id}">${tecnico.nombre} ${tecnico.apellido}</option>`).join('')}</select></label><button class="btn" id="guardar">Guardar cambios</button><button class="btn_eliminar_detalle" id="eliminar">Eliminar incidencia</button></div>`;
    const estado = document.getElementById('estado');
    const prioridad = document.getElementById('prioridad');
    const tecnico = document.getElementById('tecnico');
    estado.value = item.estado || 'Pendiente';
    prioridad.value = item.prioridad || 'Media';
    tecnico.value = item.tecnico_id || '';
    document.getElementById('guardar').addEventListener('click', () => guardar({accion: 'actualizar', estado: estado.value, prioridad: prioridad.value, tecnico_id: tecnico.value}));
    document.getElementById('eliminar').addEventListener('click', () => guardar({accion: 'eliminar'}));
}

async function guardar(datos) {
    const response = await fetch('../../backend/api/incidencia-action.php', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({id: idIncidencia, ...datos})});
    if (response.ok) location.href = 'panelIncidencias.html';
}

cargarDetalle();
