<?php
declare(strict_types=1);

final class Database
{
    private PDO $connection;

    public function __construct(string $host, string $database, string $user, string $password)
    {
        $this->connection = new PDO(
            "mysql:host={$host};dbname={$database};charset=utf8mb4",
            $user,
            $password,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
        );
        $this->connection->exec('SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci');
    }

    public function connection(): PDO
    {
        return $this->connection;
    }
}
