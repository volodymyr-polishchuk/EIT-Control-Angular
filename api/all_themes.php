<?php
function cors() {
// Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

// Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }
}
cors();
include "auth.php";
require_once('connect.php');
$code = $_GET["subject_code"];

$connection = EIT_DAO::getConnection();
// TODO change it for read user from HEADERS
$user = ($_COOKIE['auth-k'] ? $_COOKIE['auth-k'] : '1');
if (!is_numeric($user)) die(403);

$query = "SELECT theme.k, 
                 theme.name 
            FROM theme 
           WHERE theme.subject LIKE ? 
                 AND theme.user = $user";
$sth = $connection->prepare($query);
$sth->execute(array($code));

$json_obj = json_encode($sth->fetchAll());
echo $json_obj;
