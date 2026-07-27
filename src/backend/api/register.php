<?php
require_once __DIR__ . '/../config.php';
$data = jsonInput();
$stmt = $pdo->prepare('SELECT id FROM usuarios WHERE cedula = ?');
$stmt->execute([$data['cedula'] ?? '']);
if ($stmt->fetch()) response(['error' => 'La cédula ya está registrada.'], 409);
$stmt = $pdo->prepare('INSERT INTO usuarios (nombre, apellido, cedula, correo, password_hash, estado) VALUES (?, ?, ?, ?, ?, \'pendiente\')');
$stmt->execute([$data['nombre'], $data['apellido'], $data['cedula'], $data['correo'], password_hash($data['contrasena'], PASSWORD_DEFAULT)]);
response(['message' => 'Usuario registrado.'], 201);
