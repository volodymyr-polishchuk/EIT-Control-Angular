<?php
include 'cors.php';
include "auth.php";
require_once('connect.php');

$connection = EIT_DAO::getConnection();
$user = $user_information['k'];

$query = "SELECT ((current_week.sum - previous_week.sum) / previous_week.sum) * 100 AS efficiency
            FROM (
                  SELECT COALESCE(SUM(UNIX_TIMESTAMP(date_end) - UNIX_TIMESTAMP(date_start)), 0) AS sum
                  FROM lessons
                  WHERE UNIX_TIMESTAMP(date_start) > (UNIX_TIMESTAMP(CURDATE()) - 3600 * 24 * 7)
                        AND user LIKE ?
                 ) AS current_week
                 INNER JOIN (
                  SELECT COALESCE(SUM(UNIX_TIMESTAMP(date_end) - UNIX_TIMESTAMP(date_start)), 0) AS sum
                  FROM lessons
                  WHERE UNIX_TIMESTAMP(date_start) > (UNIX_TIMESTAMP(CURDATE()) - 3600 * 24 * 7 * 2)
                        AND UNIX_TIMESTAMP(date_start) <= (UNIX_TIMESTAMP(CURDATE()) - 3600 * 24 * 7)
                        AND user LIKE ?
                 ) AS previous_week";

$statement = $connection->prepare($query);
$statement->bindParam(1, $user, PDO::FETCH_ASSOC);
$statement->bindParam(2, $user, PDO::FETCH_ASSOC);
if ($statement->execute()) {
  echo json_encode(array('efficiency' => $statement->fetch()['efficiency']));
}
