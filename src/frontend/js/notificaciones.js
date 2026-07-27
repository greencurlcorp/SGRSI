function mostrarNotificacion(mensaje, tipo = 'exito') {
    const anterior = document.querySelector('.notificacion_pagina');
    if (anterior) anterior.remove();

    const notificacion = document.createElement('div');
    notificacion.className = `notificacion_pagina ${tipo}`;
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);

    setTimeout(() => notificacion.remove(), 3500);
}
