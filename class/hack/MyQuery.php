<?hh

newtype FormatString<T> = string;

/**
 * Class for execute and fetch query
 */
class MyQuery
{
    /**
     * \AsyncMysqlConnection object, store $conn
     */
    private \AsyncMysqlConnection $connec;

    /**
     * Bool variable, stock 1 or 0 if request must be display or not
     */
    private bool $debug_request;

    /**
     * 2 char variable, "SW" or "WR", say to logRequest method
     * which type of request log
     */
    private string $log_request;

    /**
     * check if $conn object isValid(), if not release
     * connection
     */
    public function __construct(\AsyncMysqlConnection $conn, bool $debug_request, string $log_request)
    {
        $this->debug_request = $debug_request;
        $this->log_request = $log_request;
        $this->connec = $conn;
        //$this->result = object;
    }

    /**
     * escape query and execute it
     */
    public async function query(string $query): Awaitable<\AsyncMysqlQueryResult>
    {
        $query = $this->connec->escapeString($query);
        $result = "";

        /* Try to execute the query, if fail display error */
        try
        {
            $result = await $this->connec->query($query);
            //log request with ini if $logRequest is true
            await $this->logRequest((string)$query, 0);
        }
        catch (Exception $e)
        {
            echo "Couldn't execute the request, error with message :<br>";
            var_dump($e->getMessage());
            //log request with fail

            await $this->logRequest((string)$query, -1);
        }
        return (object)$result;
    }

    /**
     * escape Map array and execute the request
     */
    public async function queryf($query, array<int, string> $params): Awaitable<\AsyncMysqlQueryResult>
    {
        $result = "";

        /* Try to execute the query, if fail display error */
        try // execute query
        {
            $result = await $this->connec->queryf($query, implode(', ', $params));

            // If log_request === TRUE log request with ini
            await $this->logRequest($query, 0);
        }
        catch (Exception $e) // If the query can't be execute display error
        {
            echo "\nCouldn't execute the request, error with message :<br>\n";
            var_dump($e->getMessage());
            //log request with fail

            await $this->logRequest((string)$query, -1);
        }
        return (object)$result;
    }

    /**
     * Log the SHOW request in log_req_sw table with request,
     * username, SERVER_URI, time, statut, ...
     * state: 0 (init), -1 (fail)
     */
    public async function logRequest(string $query, int $statut): Awaitable<void>
    {
        if ($this->debug_request === TRUE)
            echo "<br>request -> " . $query . "<br>";

        // check if $table_name is fill, and log request in log_request_sw or log_request_rw table
        try // execute query
        {
            // check log_request_type var, if "SW" -> log all request, if "RW" log only write request
            if ((strstr($query, "SELECT") !== FALSE || (strstr($query, "SHOW") !== FALSE))
                && $this->log_request === "SW")
            {
                await $this->connec->queryf(
                'INSERT INTO log_request_sw (username, request, server_uri, date, status)
                VALUES (%s, %s, %s, %s, %d)', 'username', $query, "TODO",
                gmdate("Y-m-d"), 1);
            }
            else if ($this->log_request === "RW")
            {
                await $this->connec->queryf(
                'INSERT INTO log_request_wr (username, request, server_uri, date, status)
                VALUES (%s, %s, %s, %s, %d)', 'username', $query, "TODO",
                gmdate("Y-m-d"), 1);
            }
        }
        catch (Exception $e) // If the query can't be execute display error
        {
            echo "Couldn't log the request, error with message :<br>";
            var_dump($e->getMessage());
        }
    }
}
