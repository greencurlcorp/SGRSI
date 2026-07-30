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
$fecha = inputString($data, 'fecha', 10);
$grupo = inputString($data, 'grupo', 50);
$horaInicio = inputString($data, 'hora_inicio', 5);
$horaFin = inputString($data, 'hora_fin', 5, false);
$tipo = inputString($data, 'tipo_espacio', 20);
$numero = filter_var($data['numero_espacio'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => 255]]);
$materia = inputString($data, 'materia', 150);
$docente = inputString($data, 'docente', 150);
if (!$numero || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $fecha) || !preg_match('/^\d{2}:\d{2}$/', $horaInicio) || ($horaFin !== null && !preg_match('/^\d{2}:\d{2}$/', $horaFin)) || !in_array($tipo, ['laboratorio', 'taller'], true)) response(['error' => 'Hay datos inválidos en la incidencia.'], 400);
$stmt = $pdo->prepare('INSERT INTO incidencias (usuario_id, fecha, grupo, hora_inicio, hora_fin, tipo_espacio, numero_espacio, materia, docente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
$stmt->execute([$data['usuario_id'], $fecha, $grupo, $horaInicio, $horaFin, $tipo, $numero, $materia, $docente]);
response(['message' => 'Incidencia guardada.'], 201);
