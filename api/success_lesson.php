<?php
include 'cors.php';
include "auth.php";
require_once('connect.php');
$lesson_id = urldecode($_POST["lesson_id"]);

echo $lesson_id;
$connection = EIT_DAO::getConnection();
$query = "UPDATE lessons 
             SET active = FALSE, 
                 date_end = NOW() 
           WHERE k LIKE ?";
$sth = $connection->prepare($query);

$sth->execute(array($lesson_id));
if ($sth->rowCount() == 0) {
    http_response_code(500);
    echo "no row affected";
} else {
    echo $lesson_id;
}
