<?php
declare(strict_types=1);

final class Input
{
    public static function string(array $data, string $key, int $max = 255, bool $required = true): ?string
    {
        $value = isset($data[$key]) && is_scalar($data[$key]) ? trim((string) $data[$key]) : null;
        if ($required && ($value === null || $value === '')) throw new InvalidArgumentException("El campo {$key} es obligatorio.");
        if ($value !== null && mb_strlen($value) > $max) throw new InvalidArgumentException("El campo {$key} es demasiado largo.");
        return $value;
    }

    public static function email(array $data, string $key = 'correo'): string
    {
        $value = self::string($data, $key, 180);
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) throw new InvalidArgumentException('El correo no es válido.');
        return $value;
    }

    public static function enum(array $data, string $key, array $allowed): string
    {
        $value = self::string($data, $key, 40);
        if (!in_array($value, $allowed, true)) throw new InvalidArgumentException("Valor inválido para {$key}.");
        return $value;
    }
}
