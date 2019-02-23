<?php
include 'cors.php';
include 'auth.php';
require_once('connect.php');
$connection = EIT_DAO::getConnection();
$user = $user_information['k'];
$query = '
SELECT s.name AS subject_name,
       s.sum_seconds AS seconds,
       SEC_TO_TIME(s.sum_seconds) AS formatted_time
  FROM (SELECT subject.name AS name,
               SUM(UNIX_TIMESTAMP(date_end) - UNIX_TIMESTAMP(date_start)) AS sum_seconds
          FROM lessons
               INNER JOIN subject ON subject.k = lessons.subject
         WHERE lessons.user LIKE ?
         GROUP BY lessons.subject) AS s
 ORDER BY seconds DESC
';

$statement = $connection->prepare($query);
$statement->bindParam(1, $user, PDO::PARAM_STR);
if ($statement->execute()) {
  echo json_encode($statement->fetchAll(PDO::FETCH_ASSOC));
} else {
  die(json_encode($statement->errorInfo()));
}
