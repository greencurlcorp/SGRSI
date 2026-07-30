<?php
declare(strict_types=1);

final class Auth
{
    private const LEVELS = ['docente' => 1, 'tecnico' => 2, 'administrador' => 3];

    public function __construct(private ApiResponse $response)
    {
    }

    public function user(): array
    {
        $user = $_SESSION['user'] ?? null;
        if (!$user) {
            $this->response->json(['error' => 'Sesión no válida.'], 401);
        }
        return $user;
    }

    public function requireRole(?string $role = null): array
    {
        $user = $this->user();
        if ($role !== null && (self::LEVELS[$user['rol']] ?? 0) < (self::LEVELS[$role] ?? 99)) {
            $this->response->json(['error' => 'Acceso denegado.'], 403);
        }
        return $user;
    }
}
