<?php
require_once __DIR__ . '/../config.php';
requireRole('tecnico');
$data = jsonInput();
if (!in_array($data['estado'] ?? '', ['pendiente', 'en_proceso', 'resuelta'], true) || !in_array($data['prioridad'] ?? '', ['Baja', 'Media', 'Alta'], true)) response(['error' => 'Estado o prioridad inválidos.'], 400);
$stmt = $pdo->prepare('UPDATE solicitudes_software SET estado = ?, prioridad = ? WHERE id = ?');
$stmt->execute([$data['estado'], $data['prioridad'], $data['id'] ?? 0]);
response(['message' => 'Solicitud actualizada.']);
