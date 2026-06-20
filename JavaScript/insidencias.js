const chkLaboratorio = document.getElementById('chk_laboratorio');
const chkTaller = document.getElementById('chk_taller');

chkLaboratorio.addEventListener('change', () => {
    if (chkLaboratorio.checked) chkTaller.checked = false;
});

chkTaller.addEventListener('change', () => {
    if (chkTaller.checked) chkLaboratorio.checked = false;
});


const fechaDD = document.getElementById('fecha_dd');
const fechaMM = document.getElementById('fecha_mm');
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

function escaparHtml(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

function validarFecha(dd, mm, aaaa) {
    if (!dd || !mm || !aaaa) {
        return 'La fecha completa es obligatoria';
    }
    if (dd.length === 0 || mm.length === 0 || aaaa.length !== 4) {
        return 'La fecha tiene un formato inválido';
    }

    const diaNum = parseInt(dd, 10);
    const mesNum = parseInt(mm, 10);
    const anioNum = parseInt(aaaa, 10);

    if (isNaN(diaNum) || isNaN(mesNum) || isNaN(anioNum)) {
        return 'La fecha debe contener solo números';
    }
    if (mesNum < 1 || mesNum > 12) {
        return 'El mes debe estar entre 01 y 12';
    }

    const diasEnMes = new Date(anioNum, mesNum, 0).getDate();
    if (diaNum < 1 || diaNum > diasEnMes) {
        return 'El día ingresado no es válido para ese mes';
    }

    return null;
}

function validarFormulario() {
    const errores = [];

    const grupo = document.getElementById('grupo').value.trim();
    const horaInicio = document.getElementById('hora_inicio').value.trim();

    const errorFecha = validarFecha(fechaDD.value.trim(), fechaMM.value.trim(), fechaAAAA.value.trim());
    if (errorFecha) errores.push(errorFecha);

    if (!grupo) errores.push('El grupo es obligatorio');
    if (!horaInicio) errores.push('La hora de inicio es obligatoria');

    if (!chkLaboratorio.checked && !chkTaller.checked) {
        errores.push('Debe seleccionar Laboratorio o Taller');
    }

    const numEspacio = document.querySelector('input[name="numero_espacio"]:checked');
    if (!numEspacio) errores.push('Debe seleccionar un número de espacio');

    const selectsIncidencia = incidenciasLista.querySelectorAll('.select_incidencia');
    selectsIncidencia.forEach((select, index) => {
        if (!select.value) {
            errores.push(`Debe seleccionar un tipo en la incidencia ${index + 1}`);
        }
    });

    const textareasIncidencia = incidenciasLista.querySelectorAll('.textarea_descripcion');
    textareasIncidencia.forEach((textarea, index) => {
        if (!textarea.value.trim()) {
            errores.push(`Debe completar la descripción en la incidencia ${index + 1}`);
        }
    });

    return errores;
}

const form = document.getElementById('form_registro');
const historialBody = document.getElementById('historial_body');
const historialVacio = document.getElementById('historial_vacio');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const errores = validarFormulario();
    if (errores.length > 0) {
        mostrarToast(errores.join(' | '), true);
        return;
    }

    const dd = fechaDD.value.trim().padStart(2, '0');
    const mm = fechaMM.value.trim().padStart(2, '0');
    const aaaa = fechaAAAA.value.trim();
    const fecha = `${dd}/${mm}/${aaaa}`;

    const grupo = document.getElementById('grupo').value.trim();
    const horaInicio = document.getElementById('hora_inicio').value.trim();

    const tipoChecked = chkLaboratorio.checked ? 'L' : 'T';
    const numEspacio = document.querySelector('input[name="numero_espacio"]:checked');
    const espacio = `${tipoChecked}${numEspacio.value}`;

    const tr = document.createElement('tr');
    tr.classList.add('fila_clickeable');
    tr.title = 'Ver en Panel Técnico';
    tr.innerHTML = `
        <td>${escaparHtml(fecha)}</td>
        <td>${escaparHtml(grupo)}</td>
        <td>${escaparHtml(horaInicio)}</td>
        <td>${escaparHtml(espacio)}</td>
        <td><button class="btn_eliminar_registro" onclick="eliminarRegistro(this)" title="Eliminar">✕</button></td>
    `;
    tr.addEventListener('click', (e) => {
        if (e.target.closest('.btn_eliminar_registro')) return;
        window.location.href = 'panel_tecnico.html';
    });
    historialBody.appendChild(tr);

    actualizarHistorialVacio();
    form.reset();
    incidenciasLista.innerHTML = '';
    contadorIncidencias = 0;

    mostrarToast('Registro enviado correctamente.', false);
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

function mostrarToast(mensaje, esError) {
    const existente = document.getElementById('toast_confirmacion');
    if (existente) existente.remove();

    const toast = document.createElement('div');
    toast.id = 'toast_confirmacion';
    toast.classList.add(esError ? 'toast_error' : 'toast_exito');
    toast.innerHTML = `
        <span>${escaparHtml(mensaje)}</span>
        <button class="toast_cerrar" onclick="this.parentElement.remove()" title="Cerrar">✕</button>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        if (toast.parentElement) toast.remove();
    }, 4000);
}

