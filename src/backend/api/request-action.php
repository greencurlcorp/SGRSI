<?php
require_once __DIR__ . '/../config.php';
$data = jsonInput();
$id = $data['id'] ?? 0;
if (($data['accion'] ?? '') === 'aprobar') {
    $stmt = $pdo->prepare("UPDATE usuarios SET estado = 'aprobado' WHERE id = ?");
    $stmt->execute([$id]);
    response(['message' => 'Solicitud aprobada.']);
}
if (($data['accion'] ?? '') === 'rechazar') {
    $find = $pdo->prepare("SELECT cedula FROM usuarios WHERE id = ? AND estado = 'pendiente'");
    $find->execute([$id]);
    $user = $find->fetch(PDO::FETCH_ASSOC);
    if ($user) {
        $save = $pdo->prepare('INSERT INTO solicitudes_rechazadas (cedula) VALUES (?) ON DUPLICATE KEY UPDATE rechazado_en = CURRENT_TIMESTAMP');
        $save->execute([$user['cedula']]);
    }
    $stmt = $pdo->prepare('DELETE FROM usuarios WHERE id = ? AND estado = \'pendiente\'');
    $stmt->execute([$id]);
    response(['message' => 'Solicitud rechazada y usuario eliminado.']);
}
response(['error' => 'Acción inválida.'], 400);
