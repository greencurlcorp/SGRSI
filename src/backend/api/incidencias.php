<?php
require_once __DIR__ . '/../config.php';
$data = jsonInput();
$current = requireRole('docente');
$data['usuario_id'] = $current['id'];
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->prepare('SELECT i.*, e.nombre AS estado, p.nombre AS prioridad FROM incidencias i LEFT JOIN estados_incidencias e ON e.id = i.estado_id LEFT JOIN prioridades p ON p.id = i.prioridad_id WHERE i.usuario_id = ? ORDER BY i.creado_en DESC');
    $stmt->execute([$current['id']]);
    response(['incidencias' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
}
$stmt = $pdo->prepare('INSERT INTO incidencias (usuario_id, fecha, grupo, hora_inicio, hora_fin, tipo_espacio, numero_espacio, materia, docente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
$stmt->execute([$data['usuario_id'], $data['fecha'], $data['grupo'], $data['hora_inicio'], $data['hora_fin'] ?? null, $data['tipo_espacio'], $data['numero_espacio'], $data['materia'], $data['docente']]);
response(['message' => 'Incidencia guardada.'], 201);
