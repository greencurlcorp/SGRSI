const tablaUsuarios = document.querySelector('#tabla_usuarios tbody');
const usuariosVacio = document.getElementById('usuarios_vacio');
const API_USUARIOS = '../../backend/api/users.php';
const API_ROL = '../../backend/api/role.php';
const API_ELIMINAR = '../../backend/api/delete-user.php';
const API_SOLICITUDES = '../../backend/api/requests.php';
const API_ACCION_SOLICITUD = '../../backend/api/request-action.php';

async function mostrarUsuarios() {
    const respuesta = await fetch(API_USUARIOS);
    const { usuarios } = await respuesta.json();
    tablaUsuarios.innerHTML = '';
    usuariosVacio.hidden = usuarios.length > 0;
    usuarios.forEach((usuario) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `<td>${usuario.nombre} ${usuario.apellido}</td><td>${usuario.cedula}</td><td>${usuario.correo}</td>
            <td><select class="selector_rol" data-id="${usuario.id}">
                <option value="docente" ${usuario.rol === 'docente' ? 'selected' : ''}>Docente</option>
                <option value="tecnico" ${usuario.rol === 'tecnico' ? 'selected' : ''}>Técnico</option>
                <option value="administrador" ${usuario.rol === 'administrador' ? 'selected' : ''}>Administrador</option>
            </select></td>
            <td><button class="btn_eliminar_usuario" data-id="${usuario.id}">Eliminar</button></td>`;
        tablaUsuarios.appendChild(fila);
    });
}

document.getElementById('guardar_roles').addEventListener('click', async () => {
    const cambios = [...document.querySelectorAll('.selector_rol')].map((selector) =>
        fetch(API_ROL, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ id: selector.dataset.id, rol: selector.value }) })
    );
    await Promise.all(cambios);
    mostrarNotificacion('Cambios guardados correctamente.');
});

tablaUsuarios.addEventListener('click', async (evento) => {
    if (!evento.target.matches('.btn_eliminar_usuario')) return;
    const id = evento.target.dataset.id;
    const respuesta = await fetch(API_ELIMINAR, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ id }) });
    const resultado = await respuesta.json();
    mostrarNotificacion(resultado.message || resultado.error, respuesta.ok ? 'exito' : 'error');
    if (respuesta.ok) mostrarUsuarios();
});

mostrarUsuarios();

document.getElementById('ver_solicitudes').addEventListener('click', async () => {
    const contenedor = document.getElementById('solicitudes_registro');
    contenedor.hidden = !contenedor.hidden;
    if (contenedor.hidden) return;
    const respuesta = await fetch(API_SOLICITUDES);
    const { solicitudes } = await respuesta.json();
    document.getElementById('lista_solicitudes').innerHTML = solicitudes.length ? solicitudes.map((solicitud) => `
        <div class="solicitud_registro"><div><strong>${solicitud.nombre} ${solicitud.apellido}</strong><br><small>${solicitud.cedula} · ${solicitud.correo}</small></div>
        <div class="solicitud_registro_acciones"><button class="btn_aprobar" data-id="${solicitud.id}">Aprobar</button><button class="btn_rechazar" data-id="${solicitud.id}">Rechazar</button></div></div>`).join('') : '<p class="usuarios_vacio">No hay solicitudes pendientes.</p>';
});

document.getElementById('lista_solicitudes').addEventListener('click', async (evento) => {
    if (!evento.target.matches('.btn_aprobar, .btn_rechazar')) return;
    const accion = evento.target.classList.contains('btn_aprobar') ? 'aprobar' : 'rechazar';
    await fetch(API_ACCION_SOLICITUD, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ id: evento.target.dataset.id, accion }) });
    mostrarNotificacion(accion === 'aprobar' ? 'Solicitud aprobada.' : 'Solicitud rechazada.');
    document.getElementById('ver_solicitudes').click();
    document.getElementById('ver_solicitudes').click();
    mostrarUsuarios();
});
