<?php
require_once __DIR__ . '/../config.php';
requireRole('administrador');

$salones = $pdo->query('SELECT numero_espacio AS salon, COUNT(*) AS total FROM incidencias GROUP BY numero_espacio ORDER BY total DESC')->fetchAll(PDO::FETCH_ASSOC);
$software = $pdo->query('SELECT software, COUNT(*) AS total FROM solicitudes_software GROUP BY software ORDER BY total DESC LIMIT 10')->fetchAll(PDO::FETCH_ASSOC);
$estados = $pdo->query('SELECT e.nombre, COUNT(i.id) AS total FROM estados_incidencias e LEFT JOIN incidencias i ON i.estado_id = e.id GROUP BY e.id ORDER BY total DESC')->fetchAll(PDO::FETCH_ASSOC);
$prioridades = $pdo->query('SELECT p.nombre, COUNT(i.id) AS total FROM prioridades p LEFT JOIN incidencias i ON i.prioridad_id = p.id GROUP BY p.id ORDER BY total DESC')->fetchAll(PDO::FETCH_ASSOC);

response(['salones' => $salones, 'software' => $software, 'estados' => $estados, 'prioridades' => $prioridades]);
