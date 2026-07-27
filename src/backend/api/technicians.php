<?php
require_once __DIR__ . '/../config.php';
requireRole('tecnico');
$stmt = $pdo->query("SELECT id, nombre, apellido FROM usuarios WHERE rol = 'tecnico' AND estado = 'aprobado' ORDER BY nombre");
response(['tecnicos' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
