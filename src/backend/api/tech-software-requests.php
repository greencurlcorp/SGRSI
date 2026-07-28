<?php
require_once __DIR__ . '/../config.php';
requireRole('tecnico');
$stmt = $pdo->query("SELECT s.*, CONCAT(u.nombre, ' ', u.apellido) AS solicitante FROM solicitudes_software s JOIN usuarios u ON u.id = s.usuario_id ORDER BY s.creado_en DESC");
response(['solicitudes' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
