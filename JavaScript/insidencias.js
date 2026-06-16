const chkLaboratorio = document.getElementById('chk_laboratorio');
const chkTaller = document.getElementById('chk_taller');

chkLaboratorio.addEventListener('change', () => {
    if (chkLaboratorio.checked) chkTaller.checked = false;
});

chkTaller.addEventListener('change', () => {
    if (chkTaller.checked) chkLaboratorio.checked = false;
});


const fechaDD   = document.getElementById('fecha_dd');
const fechaMM   = document.getElementById('fecha_mm');
const fechaAAAA = document.getElementById('fecha_aaaa');

fechaDD.addEventListener('input', () => {
    if (fechaDD.value.length === 2) fechaMM.focus();
});

fechaMM.addEventListener('input', () => {
    if (fechaMM.value.length === 2) fechaAAAA.focus();
});


const incidenciasLista = document.getElementById('incidencias_lista');
const btnAgregar = document.getElementById('btn_agregar');
let contadorIncidencias = 0;

btnAgregar.addEventListener('click', () => {
    contadorIncidencias++;
    const id = contadorIncidencias;

    const div = document.createElement('div');
    div.classList.add('incidencia_item');
    div.id = `incidencia_item_${id}`;
    div.innerHTML = `
        <div class="bloque_tipo_incidencia">
            <label class="field_label" for="tipo_inc_${id}">Tipo de incidencia</label>
            <select id="tipo_inc_${id}" class="select_incidencia">
                <option value="" disabled selected>Seleccionar…</option>
                <option value="hardware">Hardware</option>
                <option value="software">Software</option>
                <option value="red">Red / Conectividad</option>
                <option value="otro">Otro</option>
            </select>
        </div>
        <div class="bloque_descripcion">
            <label class="field_label" for="desc_inc_${id}">Descripción</label>
            <textarea id="desc_inc_${id}" class="textarea_descripcion" placeholder="Describí el problema…" rows="3"></textarea>
        </div>
        <button type="button" class="btn_eliminar_incidencia" onclick="eliminarIncidencia(${id})" title="Cerrar">✕</button>
    `;

    incidenciasLista.appendChild(div);
});

function eliminarIncidencia(id) {
    const el = document.getElementById(`incidencia_item_${id}`);
    if (el) el.remove();
}

const form = document.getElementById('form_registro');
const historialBody = document.getElementById('historial_body');
const historialVacio = document.getElementById('historial_vacio');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const dd   = fechaDD.value.padStart(2, '0')  || '--';
    const mm   = fechaMM.value.padStart(2, '0')  || '--';
    const aaaa = fechaAAAA.value                  || '----';
    const fecha = `${dd}/${mm}/${aaaa}`;

    const grupo      = document.getElementById('grupo').value       || '–';
    const horaInicio = document.getElementById('hora_inicio').value || '--:--';

    const tipoChecked = chkLaboratorio.checked ? 'L' : chkTaller.checked ? 'T' : '–';
    const numEspacio  = document.querySelector('input[name="numero_espacio"]:checked');
    const espacio     = numEspacio ? `${tipoChecked}${numEspacio.value}` : tipoChecked;

    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${fecha}</td>
        <td>${grupo}</td>
        <td>${horaInicio}</td>
        <td>${espacio}</td>
        <td><button class="btn_eliminar_registro" onclick="eliminarRegistro(this)" title="Eliminar">✕</button></td>
    `;
    historialBody.appendChild(tr);

    actualizarHistorialVacio();
    form.reset();
    incidenciasLista.innerHTML = '';
    contadorIncidencias = 0;

    mostrarToast('Registro enviado correctamente.');
});

function eliminarRegistro(btn) {
    btn.closest('tr').remove();
    actualizarHistorialVacio();
}

function actualizarHistorialVacio() {
    const hayFilas = historialBody.querySelectorAll('tr').length > 0;
    historialVacio.classList.toggle('visible', !hayFilas);
}

actualizarHistorialVacio();

function mostrarToast(mensaje) {
    const existente = document.getElementById('toast_confirmacion');
    if (existente) existente.remove();

    const toast = document.createElement('div');
    toast.id = 'toast_confirmacion';
    toast.innerHTML = `
        <span>${mensaje}</span>
        <button class="toast_cerrar" onclick="this.parentElement.remove()" title="Cerrar">✕</button>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        if (toast.parentElement) toast.remove();
    }, 4000);
}
