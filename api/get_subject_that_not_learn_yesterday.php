<?php
include 'cors.php';
include "auth.php";
require_once('connect.php');

$connection = EIT_DAO::getConnection();

$query = "SELECT subject.name AS subjectName 
                FROM subject 
               WHERE k NOT IN (SELECT lessons.subject 
                                 FROM lessons 
                                WHERE (UNIX_TIMESTAMP(lessons.date_start) >= (UNIX_TIMESTAMP(CURDATE()) - 86400) 
                                      AND UNIX_TIMESTAMP(lessons.date_start) < UNIX_TIMESTAMP(CURDATE())) 
                                      AND lessons.active = FALSE 
               GROUP BY lessons.subject)";

$themes = array();
foreach ($connection->query($query) as $row) {
    array_push($themes, $row);
}

$json_obj = json_encode($themes);
echo $json_obj;
