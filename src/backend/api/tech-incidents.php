<?php
require_once __DIR__ . '/../config.php';
requireRole('tecnico');
$sql = "SELECT i.*, e.nombre AS estado, p.nombre AS prioridad, CONCAT(u.nombre, ' ', u.apellido) AS tecnico FROM incidencias i LEFT JOIN estados_incidencias e ON e.id = i.estado_id LEFT JOIN prioridades p ON p.id = i.prioridad_id LEFT JOIN usuarios u ON u.id = i.tecnico_id ORDER BY i.creado_en DESC";
response(['incidencias' => $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC)]);
