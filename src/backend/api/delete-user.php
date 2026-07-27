<?php
require_once __DIR__ . '/../config.php';
$current = requireRole('administrador');
$data = jsonInput();
$target = $pdo->prepare('SELECT rol FROM usuarios WHERE id = ?');
$target->execute([$data['id'] ?? 0]);
if ($target->fetchColumn() === 'administrador') response(['error' => 'El administrador no puede eliminarse.'], 403);
$stmt = $pdo->prepare('DELETE FROM usuarios WHERE id = ?');
$stmt->execute([$data['id'] ?? 0]);
response(['message' => 'Usuario eliminado.']);
