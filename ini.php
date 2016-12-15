<?hh

// Mandatory include for database connection
require("vendor/facebook/xhp-lib/init.php");
require("class/hack/MyQuery.php");
require("class/hack/Connection.php");
require("class/hack/MyPool.php");
require("config.php");

// show all error
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set error handler to print error in browser
set_error_handler(function ($errorNumber, $message, $errfile, $errline)
{
    switch ($errorNumber)
    {
        case E_ERROR :
            $errorLevel = 'Error';
            break;

        case E_WARNING :
            $errorLevel = 'Warning';
            break;

        case E_NOTICE :
            $errorLevel = 'Notice';
            break;

        default :
            $errorLevel = 'Undefined';
    }

    echo '<br/><b>' . $errorLevel . '</b>: ' . $message . ' in <b>'.
        $errfile . '</b> on line <b>' . $errline . '</b><br/>';
});

async function initialise_connection($host_name, int $port, $db_name, $username,
                $password, $log_request, $log_request_type): Awaitable<MyQuery>
{
    $MyPool = new MyPool();
    $conn = await $MyPool->connect($host_name, $port, $db_name, $username, $password);
    $connection = new MyQuery($conn, $log_request, $log_request_type);
    return ($connection);
}

// Create connection
$connection = \HH\asio\join(initialise_connection($host_name, $port, $db_name, $username,
                                    $password, $log_request, $log_request_type));



//Include Connection class
require("class/hack/Connection.class.php");

//Instantiate the PDO object for connection
$PDO = new Connection($host_name, $db_name, $username, $password, $log_request, $debug_req, $option_pdo);
