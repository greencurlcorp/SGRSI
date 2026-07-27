<?php
require_once __DIR__ . '/../config.php';
$stmt = $pdo->query("SELECT id, nombre, apellido, cedula, correo, rol, creado_en FROM usuarios WHERE estado = 'aprobado' ORDER BY creado_en DESC");
response(['usuarios' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
