<?php
require_once __DIR__ . '/../config.php';
$data = jsonInput();
$current = requireRole('docente');
$data['usuario_id'] = $current['id'];
$fecha = inputString($data, 'fecha', 10);
$grupo = inputString($data, 'grupo', 50);
$docente = inputString($data, 'docente', 150);
$asignatura = inputString($data, 'asignatura', 150);
$equipos = inputString($data, 'equipos', 30);
$software = inputString($data, 'software', 2000);
if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $fecha)) response(['error' => 'La fecha no es válida.'], 400);
$stmt = $pdo->prepare('INSERT INTO solicitudes_software (usuario_id, fecha, grupo, docente, asignatura, equipos, software) VALUES (?, ?, ?, ?, ?, ?, ?)');
$stmt->execute([$data['usuario_id'], $fecha, $grupo, $docente, $asignatura, $equipos, $software]);
response(['message' => 'Solicitud enviada.'], 201);
