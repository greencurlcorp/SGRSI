<?php
require_once __DIR__ . '/../config.php';
$data = jsonInput();
$current = requireRole('docente');
$data['usuario_id'] = $current['id'];
$stmt = $pdo->prepare('INSERT INTO solicitudes_software (usuario_id, fecha, grupo, docente, asignatura, equipos, software) VALUES (?, ?, ?, ?, ?, ?, ?)');
$stmt->execute([$data['usuario_id'], $data['fecha'], $data['grupo'], $data['docente'], $data['asignatura'], $data['equipos'], $data['software']]);
response(['message' => 'Solicitud enviada.'], 201);
