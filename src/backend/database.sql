CREATE DATABASE IF NOT EXISTS srgsi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE srgsi;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    apellido VARCHAR(80) NOT NULL,
    cedula VARCHAR(30) NOT NULL UNIQUE,
    correo VARCHAR(150) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol ENUM('docente', 'tecnico', 'administrador') NOT NULL DEFAULT 'docente',
    estado ENUM('pendiente', 'aprobado') NOT NULL DEFAULT 'pendiente',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS solicitudes_rechazadas (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(30) NOT NULL UNIQUE,
    rechazado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
