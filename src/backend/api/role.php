<?php
require_once __DIR__ . '/../config.php';
$data = jsonInput();
if (!in_array($data['rol'] ?? '', ['docente', 'tecnico', 'administrador'], true)) response(['error' => 'Rol inválido.'], 400);
$target = $pdo->prepare('SELECT rol FROM usuarios WHERE id = ?');
$target->execute([$data['id'] ?? 0]);
$currentRole = $target->fetchColumn();
if ($currentRole === 'administrador' && $data['rol'] !== 'administrador') response(['error' => 'El administrador no puede degradarse.'], 403);
if ($data['rol'] === 'administrador') {
    $check = $pdo->prepare("SELECT COUNT(*) FROM usuarios WHERE rol = 'administrador' AND id <> ? AND estado = 'aprobado'");
    $check->execute([$data['id'] ?? 0]);
    if ((int) $check->fetchColumn() >= 1) response(['error' => 'Ya existe un administrador. El sistema permite solo uno.'], 409);
}
$stmt = $pdo->prepare('UPDATE usuarios SET rol = ? WHERE id = ?');
$stmt->execute([$data['rol'], $data['id']]);
response(['message' => 'Rol actualizado.']);
