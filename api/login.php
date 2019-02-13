<?php
include 'cors.php';
$login = urldecode($_POST['login']);
$password = urldecode($_POST['password']);

require_once('connect.php');
$connection = EIT_DAO::getConnection();

$query = "SELECT k, 
                 password_hash 
            FROM users_eit 
           WHERE login LIKE ? 
                 AND password LIKE ?;";

$sth = $connection->prepare($query);
$sth->execute(array($login, $password));

foreach ($sth->fetchAll() as $row) {
    $response = [];
    $response['auth_token'] = $row['password_hash'];
    $response['auth_k'] = $row['k'];
    setcookie('auth-token', $row['password_hash']);
    setcookie('auth-k', $row['k']);
    $response['location'] = 'index.html';
    echo json_encode($response);
    die();
}
http_response_code(403);
die();
