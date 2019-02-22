<?php
include 'cors.php';
include "auth.php";
require_once('connect.php');

$subject_name = urldecode($_POST['subject_name']);
$user = $user_information['k'];

$connection = EIT_DAO::getConnection();

$searchSameSubjectQuery =
  "SELECT count(*) 
     FROM subject
    WHERE name LIKE ?";

$searchSameSubjectStatement = $connection->prepare($searchSameSubjectQuery);
$searchSameSubjectStatement->bindParam(1, $subject_name, PDO::PARAM_STR);
$searchSameSubjectStatement->execute();
$row = $searchSameSubjectStatement->fetch(PDO::FETCH_ASSOC);
if (!$row) {
  http_response_code(422);
  die(array('message' => 'already exist'));
}

$createSubjectQuery =
  "INSERT INTO subject(name, user) 
   VALUES (?, ?)";

$insertSubjectStatement = $connection->prepare($createSubjectQuery);
$insertSubjectStatement->bindParam(1, $subject_name, PDO::PARAM_STR);
$insertSubjectStatement->bindParam(2, $user, PDO::PARAM_STR);
if ($insertSubjectStatement->execute()) {
  echo json_encode(array('k' => $connection->lastInsertId(), 'name' => $subject_name));
} else {
  http_response_code(500);
  die(json_encode($connection->errorInfo()));
}
