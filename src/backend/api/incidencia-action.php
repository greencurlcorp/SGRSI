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
    response(['message' => 'Incidencia actualizada.']);
}
response(['error' => 'No tienes permisos para modificar incidencias.'], 403);
