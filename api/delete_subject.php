<?php
include 'cors.php';
include "auth.php";
require_once('connect.php');
$subject_k = urldecode($_POST["subject_k"]);

$connection = EIT_DAO::getConnection();
$user = $user_information['k'];

$countRowForSubjectQuery =
  "SELECT count(*) AS result
     FROM subject
          LEFT JOIN lessons ON lessons.subject = subject.k
          LEFT JOIN theme ON theme.subject = subject.k
    WHERE subject.k LIKE ?
          AND subject.user LIKE ?
          AND (theme.k IS NOT NULL
            OR lessons.k IS NOT NULL)";

$countRowForSubjectStatement = $connection->prepare($countRowForSubjectQuery);
$countRowForSubjectStatement->bindParam(1, $subject_k, PDO::PARAM_STR);
$countRowForSubjectStatement->bindParam(2, $user, PDO::PARAM_STR);
$countRowForSubjectStatement->execute();

if ($countRowForSubjectStatement->fetch(PDO::FETCH_ASSOC)['result'] == 0) {
  $query = "DELETE FROM subject WHERE k LIKE ?";
  $sth = $connection->prepare($query);
  $sth->execute(array($subject_k));

  if ($sth->rowCount() == 0) {
    http_response_code(500);
    echo json_encode(array('deleted' => $topic_id, 'message' => 'Видалення не виконано. Такого предмету не існую в базі даних'));
  } else {
    echo json_encode(array('deleted' => $topic_id, 'message' => 'Видалення успішне'));
  }
} else {
  http_response_code(422);
  echo json_encode(array('deleted' => $topic_id, 'message' => 'Не можливо видалити. За цим предметом уже існують теми або заняття'));
}
