<?php
include 'cors.php';
include "auth.php";
require_once('connect.php');
$topic_id = urldecode($_POST["topic_id"]);

$connection = EIT_DAO::getConnection();

$countLessonsWithTopicQuery =
  "SELECT *
     FROM lessons
          INNER JOIN theme ON theme.k = lessons.theme
    WHERE theme.k LIKE ?";

$countLessonsWithTopicStatement = $connection->prepare($countLessonsWithTopicQuery);
$countLessonsWithTopicStatement->execute(array($topic_id));

if ($countLessonsWithTopicStatement->rowCount() == 0) {
  $query = "DELETE FROM theme WHERE k LIKE ?";
  $sth = $connection->prepare($query);
  $sth->execute(array($topic_id));

  if ($sth->rowCount() == 0) {
    http_response_code(500);
    echo json_encode(array('deleted' => $topic_id, 'message' => 'Видалення не виконано. Такої теми не існує в базі даних'));
  } else {
    echo json_encode(array('deleted' => $topic_id, 'message' => 'Видалення успішне'));
  }
} else {
  http_response_code(422);
  echo json_encode(array('deleted' => $topic_id, 'message' => 'Не можливо видалити. За цією темою вже існують зайняття'));
}


