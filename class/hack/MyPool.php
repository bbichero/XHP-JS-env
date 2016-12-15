<?hh

class MyPool
{
    private \AsyncMysqlConnectionPool $pool;

    public function __construct()
    {
        $this->pool = new \AsyncMysqlConnectionPool(array());
    }

    public function getPool(): \AsyncMysqlConnectionPool
    {
        return $this->pool;
    }

    public async function connect(string $host, int $port, string $database, string $login, string $password): Awaitable<\AsyncMysqlConnection>
    {
        return await $this->pool->connect(
            $host,
            $port,
            $database,
            $login,
            $password
        );
    }
}
