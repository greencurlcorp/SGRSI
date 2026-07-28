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

CREATE TABLE IF NOT EXISTS incidencias (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT UNSIGNED NOT NULL,
    fecha DATE NOT NULL,
    grupo VARCHAR(50) NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NULL,
    tipo_espacio ENUM('laboratorio', 'taller') NOT NULL,
    numero_espacio TINYINT UNSIGNED NOT NULL,
    materia VARCHAR(150) NOT NULL,
    docente VARCHAR(150) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS solicitudes_software (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT UNSIGNED NOT NULL,
    fecha DATE NOT NULL,
    grupo VARCHAR(50) NOT NULL,
    docente VARCHAR(150) NOT NULL,
    asignatura VARCHAR(150) NOT NULL,
    equipos VARCHAR(30) NOT NULL,
    software TEXT NOT NULL,
    estado ENUM('pendiente', 'en_proceso', 'resuelta') NOT NULL DEFAULT 'pendiente',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
ALTER TABLE solicitudes_software ADD COLUMN IF NOT EXISTS prioridad ENUM('Baja', 'Media', 'Alta') NOT NULL DEFAULT 'Media';

CREATE TABLE IF NOT EXISTS estados_incidencias (
    id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS prioridades (
    id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL UNIQUE
);

ALTER TABLE incidencias ADD COLUMN IF NOT EXISTS estado_id TINYINT UNSIGNED NULL;
ALTER TABLE incidencias ADD COLUMN IF NOT EXISTS prioridad_id TINYINT UNSIGNED NULL;
ALTER TABLE incidencias ADD COLUMN IF NOT EXISTS tecnico_id INT UNSIGNED NULL;

CREATE TABLE IF NOT EXISTS asignaciones_incidencias (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    incidencia_id INT UNSIGNED NOT NULL,
    tecnico_id INT UNSIGNED NOT NULL,
    asignado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (incidencia_id) REFERENCES incidencias(id) ON DELETE CASCADE,
    FOREIGN KEY (tecnico_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS historial_incidencias (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    incidencia_id INT UNSIGNED NOT NULL,
    usuario_id INT UNSIGNED NOT NULL,
    estado_id TINYINT UNSIGNED NULL,
    prioridad_id TINYINT UNSIGNED NULL,
    comentario TEXT NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (incidencia_id) REFERENCES incidencias(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

INSERT IGNORE INTO estados_incidencias (nombre) VALUES ('Pendiente'), ('En proceso'), ('Resuelto'), ('Rechazada');
INSERT IGNORE INTO prioridades (nombre) VALUES ('Baja'), ('Media'), ('Alta');
