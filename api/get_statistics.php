<?php
include 'cors.php';
include 'auth.php';
require_once('connect.php');
$connection = EIT_DAO::getConnection();
$query = '
SELECT s.name AS subject_name,
       s.sum_seconds AS seconds,
       SEC_TO_TIME(s.sum_seconds) AS formatted_time
  FROM (SELECT subject.name AS name,
               SUM(UNIX_TIMESTAMP(date_end) - UNIX_TIMESTAMP(date_start)) AS sum_seconds
          FROM lessons
               INNER JOIN subject ON subject.k = lessons.subject
         GROUP BY lessons.subject) AS s
 ORDER BY seconds DESC
';
$arr = array();
foreach ($connection->query($query) as $row) {
    array_push($arr, $row);
}
echo json_encode($arr);
