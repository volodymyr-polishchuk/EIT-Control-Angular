<?php
include 'cors.php';
include "auth.php";
require_once "connect.php";

$auth_token = $_COOKIE['auth-token'];
$auth_k = $_COOKIE['auth-k'];

$PDO = EIT_DAO::getConnection();
$query = "SELECT login, 
                     name, 
                     description 
                FROM users_eit 
               WHERE k LIKE ? 
                     AND password_hash LIKE ? 
               LIMIT 1;";
$statement = $PDO->prepare($query);
if (!$statement->execute(array($auth_k, $auth_token))) {
    die($statement->errorInfo());
}
if ($statement->rowCount() == 0) {
    die("nothing found");
}
$json_obj = json_encode($statement->fetchAll(PDO::FETCH_ASSOC)[0]);
echo $json_obj;

