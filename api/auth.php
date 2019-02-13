<?php
include 'cors.php';
require_once('connect.php');
$connection = EIT_DAO::getConnection();

if (isset($_COOKIE['auth-token']) || isset(getallheaders()['Authorization'])) {
    if (isset($_COOKIE['auth-token'])) {
        $token = $_COOKIE['auth-token'];
    } else {
        $token = explode(' ', getallheaders()['Authorization'])[1];
    }
    $id = '1';

    $query = "SELECT COUNT(*) AS count_column 
                FROM users_eit 
               WHERE password_hash LIKE ? 
                     AND k LIKE ?;";

    $sth = $connection->prepare($query);
    $sth->execute(array($token, $id));
    $row = $sth->fetchAll();
    if ($row[0]['count_column'] == 0) {
        http_response_code(403);
        echo json_encode($row);
        die('can not find in database');
    }
} else {
    http_response_code(403);
    echo $_SERVER['Authorization'];
    die('cookie not exists');
}

