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

$connection = EIT_DAO::getConnection();
// TODO get auth-k from HEADERS
$user = ( $_COOKIE['auth-k'] ? $_COOKIE['auth-k'] : '1');
if (!is_numeric($user)) die(403);
$query = "SELECT lessons.k AS lessonID, 
                     subject.name AS lessonName, 
                     theme.name AS themeName, 
                     (UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(lessons.date_start)) AS timeToNowDiff 
                FROM lessons 
                     INNER JOIN subject ON subject.k = lessons.subject 
                     INNER JOIN theme ON theme.k = lessons.theme 
               WHERE lessons.active LIKE 1 
                     AND lessons.user = $user 
               ORDER BY lessons.k ASC";

$subjects = array();
foreach ($connection->query($query) as $row) {
    array_push($subjects, $row);
}

$json_obj = json_encode($subjects);
echo $json_obj;
