<?php
include 'cors.php';
require_once('connect.php');
$connection = EIT_DAO::getConnection();

$name = urldecode($_POST['name']);
$email = urldecode($_POST['email']);
$login = urldecode($_POST['login']);
$password = urldecode($_POST['password']);

$createSubjectQuery =
  "INSERT INTO users_eit(name, email, login, password_hash) 
   VALUES (?, ?, ?, SHA2(?, 512))";

$insertSubjectStatement = $connection->prepare($createSubjectQuery);
$insertSubjectStatement->bindParam(1, $name, PDO::PARAM_STR);
$insertSubjectStatement->bindParam(2, $email, PDO::PARAM_STR);
$insertSubjectStatement->bindParam(3, $login, PDO::PARAM_STR);
$insertSubjectStatement->bindParam(4, $password, PDO::PARAM_STR);

if ($insertSubjectStatement->execute()) {
  echo json_encode(array('k' => $connection->lastInsertId(), 'message' => 'successful'));
} else {
  http_response_code(500);
  die(json_encode($connection->errorInfo()));
}
