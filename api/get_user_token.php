<?php
include 'cors.php';
$login = urldecode($_POST['login']);
$password = urldecode($_POST['password']);

require_once('connect.php');
$connection = EIT_DAO::getConnection();

$query = "SELECT password_hash, k 
            FROM users_eit 
           WHERE login LIKE ? 
                 AND password LIKE ?;";

$sth = $connection->prepare($query);
$sth->execute(array($login, $password));

foreach ($sth->fetchAll() as $row) {
  echo json_encode(array('auth_token' => $row['password_hash'], 'auth_k' => $row['k']));
  die();
}
http_response_code(403);
die();
