const formularioRegistro = document.querySelector('.form_register');
if (formularioRegistro) formularioRegistro.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const valores = [...formularioRegistro.querySelectorAll('input')].map(input => input.value.trim());
    if (valores[4] !== valores[5]) return mostrarNotificacion('Las contraseñas no coinciden.', 'error');
    const respuesta = await fetch('../../backend/api/register.php', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ nombre: valores[0], apellido: valores[1], cedula: valores[2], correo: valores[3], contrasena: valores[4] }) });
    const resultado = await respuesta.json();
    if (!respuesta.ok) return mostrarNotificacion(resultado.error, 'error');
    const modal = document.createElement('div');
    modal.className = 'modal_registro';
    modal.style.cssText = 'position:fixed;inset:0;z-index:300;display:grid;place-items:center;padding:20px;background:rgba(15,23,42,.55);';
    modal.innerHTML = '<div class="modal_registro_contenido" style="width:min(520px,100%);padding:36px 32px;border-radius:14px;background:#fff;text-align:center;box-shadow:0 18px 50px rgba(15,23,42,.25);"><h2>Solicitud enviada</h2><p>Tu solicitud de registro está pendiente de aprobación por parte de los administradores.</p><button id="btn_modal_ok" type="button">OK</button></div>';
    document.body.appendChild(modal);
    modal.querySelector('#btn_modal_ok').addEventListener('click', () => {
        window.location.href = '../../../index.html';
    });
});
