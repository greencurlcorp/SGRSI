const formularioLogin = document.querySelector('.form_login');
if (formularioLogin) formularioLogin.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const campos = formularioLogin.querySelectorAll('input');
    const respuesta = await fetch('src/backend/api/login.php', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ cedula: campos[0].value.trim(), contrasena: campos[1].value }) });
    const resultado = await respuesta.json();
    if (!respuesta.ok) {
        const mensaje = document.getElementById('mensaje_login');
        mensaje.textContent = resultado.error;
        mensaje.className = 'mensaje_login error';
        return;
    }
    sessionStorage.setItem('srgsi_token', resultado.token);
    sessionStorage.setItem('srgsi_usuario', JSON.stringify(resultado.user));
    const destinos = { docente: 'src/frontend/solicitante/planillaIncidencias.html', tecnico: 'src/frontend/tecnico/panelIncidencias.html', administrador: 'src/frontend/administrador/panelUsuarios.html' };
    window.location.href = destinos[resultado.user.rol];
});
