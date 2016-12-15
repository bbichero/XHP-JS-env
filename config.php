<?hh

$url_path = "";

//Option for log request : SW -> log request SHOW, SELECT and INSERT INTO, UPDATE  RW-> Only INSERT INTO, UPDATE
$log_request_type = "RW";
$log_request = TRUE;

//Show all request 1 -> show all  0 -> show nothing
$debug_req = 0;

// Config for connecting to the DB
$host_name = "";
$db_name = "";
$port = "";
$username = "";
$password = "";
$option_pdo = array(
    // Activation PDO exceptions:
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_TIMEOUT => 10
);
