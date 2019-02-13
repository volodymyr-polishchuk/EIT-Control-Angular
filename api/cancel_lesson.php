<?php
include 'cors.php';
include "auth.php";
require_once('connect.php');
$lesson_id = urldecode($_POST["lesson_id"]);

$connection = EIT_DAO::getConnection();
$query = "DELETE FROM lessons WHERE k LIKE ?";
$sth = $connection->prepare($query);
$sth->execute(array($lesson_id));
if ($sth->rowCount() == 0) {
    http_response_code(500);
} else {
    echo $lesson_id;
}
