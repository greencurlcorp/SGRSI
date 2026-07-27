const listaIncidencias = document.getElementById('lista_incidencias');
const API_INCIDENCIAS = '../backend/api/tech-incidents.php';
const API_TECNICOS = '../backend/api/technicians.php';
const API_ACCION = '../backend/api/incidencia-action.php';

async function cargarPanel() {
    const [incidenciasResponse, tecnicosResponse] = await Promise.all([fetch(API_INCIDENCIAS), fetch(API_TECNICOS)]);
    const { incidencias } = await incidenciasResponse.json();
    const { tecnicos } = await tecnicosResponse.json();
    document.getElementById('panel_vacio').classList.toggle('visible', incidencias.length === 0);
    listaIncidencias.innerHTML = incidencias.length ? incidencias.map((item) => `<article class="incidencia_tecnica"><div><strong>Salón ${item.numero_espacio} · ${item.materia}</strong><small>${item.fecha} · Grupo ${item.grupo} · ${item.docente}</small></div><div class="incidencia_controles"><select data-field="estado" data-id="${item.id}"><option>Pendiente</option><option>En proceso</option><option>Resuelta</option><option>Rechazada</option></select><select data-field="prioridad" data-id="${item.id}"><option>Baja</option><option>Media</option><option>Alta</option></select><select data-field="tecnico_id" data-id="${item.id}"><option value="">Sin asignar</option>${tecnicos.map(t => `<option value="${t.id}">${t.nombre} ${t.apellido}</option>`).join('')}</select><button class="btn_actualizar_incidencia" data-id="${item.id}">Guardar</button><button class="btn_eliminar_incidencia" data-id="${item.id}">Eliminar</button></div></article>`).join('') : '<p>No hay incidencias registradas.</p>';
    incidencias.forEach(item => { [['estado', item.estado], ['prioridad', item.prioridad], ['tecnico_id', item.tecnico_id]].forEach(([field, value]) => { const el = listaIncidencias.querySelector(`[data-field="${field}"][data-id="${item.id}"]`); if (el && value) el.value = value; }); });
}

listaIncidencias.addEventListener('click', async (event) => {
    const button = event.target;
    if (!button.matches('.btn_actualizar_incidencia, .btn_eliminar_incidencia')) return;
    const id = button.dataset.id;
    const payload = { id, accion: button.matches('.btn_eliminar_incidencia') ? 'eliminar' : 'actualizar' };
    if (payload.accion === 'actualizar') listaIncidencias.querySelectorAll(`[data-id="${id}"]`).forEach(control => { if (control.dataset.field) payload[control.dataset.field] = control.value; });
    const response = await fetch(API_ACCION, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
    if (response.ok) cargarPanel();
});

cargarPanel();
