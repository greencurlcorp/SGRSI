<?php
declare(strict_types=1);

session_start();
header('Content-Type: application/json; charset=utf-8');
ini_set('default_charset', 'UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS');

require_once __DIR__ . '/core/Database.php';
require_once __DIR__ . '/core/ApiResponse.php';
require_once __DIR__ . '/core/Auth.php';
require_once __DIR__ . '/core/Input.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

$database = new Database('localhost', 'srgsi', 'root', '');
$pdo = $database->connection();
$api = new ApiResponse();
$auth = new Auth($api);
$pdo->exec('DELETE FROM solicitudes_rechazadas WHERE rechazado_en < DATE_SUB(NOW(), INTERVAL 7 DAY)');

function jsonInput(): array { global $api; return $api->input(); }
function response(array $data, int $status = 200): never { global $api; $api->json($data, $status); }
function requireRole(?string $role = null): array { global $auth; return $auth->requireRole($role); }
function inputString(array $data, string $key, int $max = 255, bool $required = true): ?string { try { return Input::string($data, $key, $max, $required); } catch (InvalidArgumentException $e) { response(['error' => $e->getMessage()], 400); } }
