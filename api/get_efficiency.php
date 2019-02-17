<?php
include 'cors.php';
include "auth.php";
require_once('connect.php');

$connection = EIT_DAO::getConnection();

$query = "SELECT ((current_week.sum - previous_week.sum) / previous_week.sum) * 100 AS efficiency
            FROM (
                  SELECT COALESCE(SUM(UNIX_TIMESTAMP(date_end) - UNIX_TIMESTAMP(date_start)), 0) AS sum
                  FROM lessons
                  WHERE UNIX_TIMESTAMP(date_start) > (UNIX_TIMESTAMP(CURDATE()) - 3600 * 24 * 7)
                 ) AS current_week
                 INNER JOIN (
                  SELECT COALESCE(SUM(UNIX_TIMESTAMP(date_end) - UNIX_TIMESTAMP(date_start)), 0) AS sum
                  FROM lessons
                  WHERE UNIX_TIMESTAMP(date_start) > (UNIX_TIMESTAMP(CURDATE()) - 3600 * 24 * 7 * 2)
                        AND UNIX_TIMESTAMP(date_start) <= (UNIX_TIMESTAMP(CURDATE()) - 3600 * 24 * 7)
                 ) AS previous_week";

foreach ($connection->query($query) as $row) {
  echo json_encode(array('efficiency' => $row['efficiency']));
  break;
}
