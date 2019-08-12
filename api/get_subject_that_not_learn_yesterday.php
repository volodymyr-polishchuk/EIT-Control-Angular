<?php
include 'cors.php';
include "auth.php";
require_once('connect.php');

$connection = EIT_DAO::getConnection();
$user = $user_information['k'];

$query = "
SELECT subject.name AS subjectName 
  FROM subject 
 WHERE k NOT IN (SELECT lessons.subject 
                   FROM lessons 
                  WHERE (UNIX_TIMESTAMP(lessons.date_start) >= (UNIX_TIMESTAMP(CURDATE()) - 86400) 
                        AND UNIX_TIMESTAMP(lessons.date_start) < UNIX_TIMESTAMP(CURDATE())) 
                        AND lessons.active = FALSE
                  GROUP BY lessons.subject)
       AND user LIKE ?
";

$statement = $connection->prepare($query);
$statement->bindParam(1, $user, PDO::PARAM_STR);
if ($statement->execute()) {
  echo json_encode($statement->fetchAll(PDO::FETCH_ASSOC));
} else {
  http_response_code(500);
  die(json_encode($statement->errorInfo()));
}
