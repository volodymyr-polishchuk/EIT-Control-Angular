<?php
include 'cors.php';
include "auth.php";
require_once('connect.php');
$old_password = urldecode($_POST["old_password"]);
$new_password = urldecode($_POST["new_password"]);

$user = $user_information['k'];

$connection = EIT_DAO::getConnection();

$verifyPasswordQuery = "
  SELECT count(*) AS result
    FROM users_eit
   WHERE password_hash LIKE SHA2(?, 512)
         AND k LIKE ?       
";

$verifyPasswordStatement = $connection->prepare($verifyPasswordQuery);
$verifyPasswordStatement->bindParam(1, $old_password, PDO::PARAM_STR);
$verifyPasswordStatement->bindParam(2, $user, PDO::PARAM_STR);

if ($verifyPasswordStatement->execute() && $verifyPasswordStatement->fetch(PDO::FETCH_ASSOC)['result'] == 1) {
  $changePasswordQuery = "
    UPDATE users_eit
       SET password_hash = SHA2(?, 512)
     WHERE k LIKE ?
  ";

  $changePasswordStatement = $connection->prepare($changePasswordQuery);
  $changePasswordStatement->bindParam(1, $new_password, PDO::PARAM_STR);
  $changePasswordStatement->bindParam(2, $user, PDO::PARAM_STR);
  if ($changePasswordStatement->execute()) {
    die(json_encode(array('message' => 'Пароль змінено успішно')));
  } else {
    http_response_code(500);
    die(json_encode($changePasswordStatement->errorInfo()));
  }
} else {
  http_response_code(422);
  die(json_encode($connection->errorInfo()));
}
