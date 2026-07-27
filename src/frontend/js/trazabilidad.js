const API_ESTADISTICAS = '../backend/api/stats.php';

function listaEstadistica(id, items, etiqueta) {
    const lista = document.getElementById(id);
    lista.innerHTML = items.length ? items.map(item => `<li><span>${item[etiqueta]}</span><strong>${item.total}</strong></li>`).join('') : '<li>Sin datos todavía</li>';
}

async function cargarEstadisticas() {
    const respuesta = await fetch(API_ESTADISTICAS);
    const datos = await respuesta.json();
    listaEstadistica('lista_salones', datos.salones, 'salon');
    listaEstadistica('lista_software', datos.software, 'software');
    listaEstadistica('lista_estados', datos.estados, 'nombre');
    listaEstadistica('lista_prioridades', datos.prioridades, 'nombre');
}

cargarEstadisticas();
