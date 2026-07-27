<?php
require_once __DIR__ . '/../config.php';
$data = jsonInput();
if (!in_array($data['rol'] ?? '', ['docente', 'tecnico', 'administrador'], true)) response(['error' => 'Rol inválido.'], 400);
$stmt = $pdo->prepare('UPDATE usuarios SET rol = ? WHERE id = ?');
$stmt->execute([$data['rol'], $data['id']]);
response(['message' => 'Rol actualizado.']);
