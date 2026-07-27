<?php
require_once __DIR__ . '/../config.php';
$data = jsonInput();
$rejected = $pdo->prepare('SELECT id FROM solicitudes_rechazadas WHERE cedula = ?');
$rejected->execute([$data['cedula'] ?? '']);
if ($rejected->fetch()) response(['error' => 'Los administradores no aprobaron tu petición.'], 403);
$pending = $pdo->prepare("SELECT id FROM usuarios WHERE cedula = ? AND estado = 'pendiente'");
$pending->execute([$data['cedula'] ?? '']);
if ($pending->fetch()) response(['error' => 'Los administradores todavía no aprobaron tu solicitud de registro.'], 403);
$stmt = $pdo->prepare("SELECT id, nombre, apellido, cedula, correo, password_hash, rol FROM usuarios WHERE cedula = ? AND estado = 'aprobado'");
$stmt->execute([$data['cedula'] ?? '']);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
if (!$user || !password_verify($data['contrasena'] ?? '', $user['password_hash'])) response(['error' => 'Credenciales incorrectas.'], 401);
unset($user['password_hash']);
response(['user' => $user]);
