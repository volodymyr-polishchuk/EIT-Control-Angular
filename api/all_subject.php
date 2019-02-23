<?php
include 'cors.php';
include "auth.php";
require_once('connect.php');

$user = $user_information['k'];

$connection = EIT_DAO::getConnection();

$query = "SELECT k, name 
            FROM subject
           WHERE user LIKE ?";

$statement = $connection->prepare($query);
$statement->bindParam(1, $user, PDO::PARAM_STR);
if ($statement->execute()) {
  $result_set = $statement->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($result_set);
}

