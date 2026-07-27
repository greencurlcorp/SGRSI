<?php
session_start();
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

$pdo = new PDO('mysql:host=localhost;dbname=srgsi;charset=utf8mb4', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->exec("DELETE FROM solicitudes_rechazadas WHERE rechazado_en < DATE_SUB(NOW(), INTERVAL 7 DAY)");

function jsonInput(): array {
    return json_decode(file_get_contents('php://input'), true) ?? [];
}

function response(array $data, int $status = 200): never {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function requireRole(?string $role = null): array {
    $user = $_SESSION['user'] ?? null;
    if (!$user) response(['error' => 'Sesión no válida.'], 401);
    if ($role !== null && $user['rol'] !== $role) response(['error' => 'Acceso denegado.'], 403);
    return $user;
}
