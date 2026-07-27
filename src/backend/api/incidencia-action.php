<?php
require_once __DIR__ . '/../config.php';
$current = requireRole();
$data = jsonInput();
$id = $data['id'] ?? 0;
if ($current['rol'] === 'tecnico' || $current['rol'] === 'administrador') {
    if (isset($data['estado'])) {
        $stmt = $pdo->prepare('UPDATE incidencias SET estado_id = (SELECT id FROM estados_incidencias WHERE nombre = ?) WHERE id = ?');
        $stmt->execute([$data['estado'], $id]);
    }
    if (isset($data['prioridad'])) {
        $stmt = $pdo->prepare('UPDATE incidencias SET prioridad_id = (SELECT id FROM prioridades WHERE nombre = ?) WHERE id = ?');
        $stmt->execute([$data['prioridad'], $id]);
    }
    if (isset($data['tecnico_id'])) {
        $stmt = $pdo->prepare('UPDATE incidencias SET tecnico_id = ? WHERE id = ?');
        $stmt->execute([$data['tecnico_id'], $id]);
    }
    if (($data['accion'] ?? '') === 'eliminar') {
        $stmt = $pdo->prepare('DELETE FROM incidencias WHERE id = ?');
        $stmt->execute([$id]);
    }
    $snapshot = $pdo->prepare('SELECT estado_id, prioridad_id FROM incidencias WHERE id = ?');
    $snapshot->execute([$id]);
    if ($row = $snapshot->fetch(PDO::FETCH_ASSOC)) {
        $history = $pdo->prepare('INSERT INTO historial_incidencias (incidencia_id, usuario_id, estado_id, prioridad_id, comentario) VALUES (?, ?, ?, ?, ?)');
        $history->execute([$id, $current['id'], $row['estado_id'], $row['prioridad_id'], $data['comentario'] ?? 'Actualización realizada desde el panel técnico.']);
    }
    response(['message' => 'Incidencia actualizada.']);
}
response(['error' => 'No tienes permisos para modificar incidencias.'], 403);
