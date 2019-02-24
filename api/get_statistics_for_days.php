<?php
include 'cors.php';
include 'auth.php';
require_once('connect.php');
$connection = EIT_DAO::getConnection();
$user = $user_information['k'];
$query = '
SELECT SUM(UNIX_TIMESTAMP(date_end) - UNIX_TIMESTAMP(date_start)) AS day_result,
       CAST(date_start AS DATE) AS date
FROM lessons
       INNER JOIN subject ON subject.k = lessons.subject
WHERE UNIX_TIMESTAMP(CAST(date_start AS DATE)) > UNIX_TIMESTAMP(CURDATE()) - (60 * 60 * 24 * 7)
  AND lessons.user LIKE ?
GROUP BY CAST(date_start AS DATE)
';

$statement = $connection->prepare($query);
$statement->bindParam(1, $user, PDO::PARAM_STR);
if ($statement->execute()) {
  echo json_encode($statement->fetchAll(PDO::FETCH_ASSOC));
} else {
  die(json_encode($statement->errorInfo()));
}
