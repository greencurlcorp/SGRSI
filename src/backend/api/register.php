<?php
require_once __DIR__ . '/../config.php';
$data = jsonInput();
$nombre = inputString($data, 'nombre', 80);
$apellido = inputString($data, 'apellido', 80);
$cedula = inputString($data, 'cedula', 20);
$correo = filter_var(inputString($data, 'correo', 180), FILTER_VALIDATE_EMAIL);
$contrasena = inputString($data, 'contrasena', 255);
if (!$correo) response(['error' => 'El correo no es válido.'], 400);
if (!preg_match('/^[0-9]+$/', $cedula)) response(['error' => 'La cédula no es válida.'], 400);
if (strlen($contrasena) < 8) response(['error' => 'La contraseña debe tener al menos 8 caracteres.'], 400);
$stmt = $pdo->prepare('SELECT id FROM usuarios WHERE cedula = ?');
$stmt->execute([$data['cedula'] ?? '']);
if ($stmt->fetch()) response(['error' => 'La cédula ya está registrada.'], 409);
$stmt = $pdo->prepare('INSERT INTO usuarios (nombre, apellido, cedula, correo, password_hash, estado) VALUES (?, ?, ?, ?, ?, \'pendiente\')');
$stmt->execute([$nombre, $apellido, $cedula, $correo, password_hash($contrasena, PASSWORD_DEFAULT)]);
response(['message' => 'Usuario registrado.'], 201);
