<?php
require_once __DIR__ . '/../config.php';
$data = jsonInput();
$stmt = $pdo->prepare('DELETE FROM usuarios WHERE id = ?');
$stmt->execute([$data['id'] ?? 0]);
response(['message' => 'Usuario eliminado.']);
