<?php
include 'cors.php';
include "auth.php";
require_once "connect.php";

$user = $user_information['k'];

$PDO = EIT_DAO::getConnection();
$query = "SELECT login, 
                 name, 
                 description 
            FROM users_eit 
           WHERE k LIKE ? 
           LIMIT 1;";
$statement = $PDO->prepare($query);
if (!$statement->execute(array($user))) {
    die($statement->errorInfo());
}
if ($statement->rowCount() == 0) {
    die("nothing found");
}
$json_obj = json_encode($statement->fetchAll(PDO::FETCH_ASSOC)[0]);
echo $json_obj;

