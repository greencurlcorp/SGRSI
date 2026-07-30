<?php
declare(strict_types=1);

final class ApiResponse
{
    public function json(array $data, int $status = 200): never
    {
        http_response_code($status);
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit;
    }

    public function input(): array
    {
        return json_decode(file_get_contents('php://input'), true) ?? [];
    }
}
