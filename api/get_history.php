<?php
include 'cors.php';
include "auth.php";
require_once('connect.php');
$subject = $_GET['subject'];
$group = $_GET['group'];
$from_date = $_GET['from_date'];
$to_date = $_GET['to_date'];
validateData($subject, $group, $from_date, $to_date);

if ($subject == 0) {
    $subject = '%';
}

$group_sum = "";
$group_by = "";
if ($group != 0) {
    $group_sum = "SUM";
    $group_by = "GROUP BY lessons.theme";
} else {
    $group_sum = "";
    $group_by = "";
}

$from_date_piece = "";
if ($from_date == "") {
    $from_date_piece = "TRUE";
} else {
    $from_date_piece = "lessons.date_start >= '$from_date'";
}

$to_date_piece = "";
if ($to_date == "") {
    $to_date_piece = "TRUE";
} else {
    $to_date_piece = "lessons.date_start < (DATE_ADD('$to_date', INTERVAL 1 DAY))";
}

$sql_query = "SELECT subject.name AS subjectName, 
                         theme.name AS themeName, 
                         $group_sum(UNIX_TIMESTAMP(date_end) - UNIX_TIMESTAMP(date_start)) AS 'time' 
                    FROM `lessons` 
                         INNER JOIN subject ON subject.k = lessons.subject 
                         INNER JOIN theme ON theme.k = lessons.theme 
                   WHERE lessons.subject LIKE '$subject' 
                         AND lessons.active LIKE '0' 
                         AND $from_date_piece 
                         AND $to_date_piece 
                  $group_by";

$connection = EIT_DAO::getConnection();

$themes = array();
foreach ($connection->query($sql_query) as $row) {
    array_push($themes, $row);
}

$json_obj = json_encode($themes);
echo $json_obj;

function validateData($subject, $group, $from_date, $to_date)
{
    if (!is_numeric($subject)) {
        http_response_code(422);
        die();
    }
    if (!is_numeric($group)) {
        http_response_code(422);
        die();
    }
    if ($from_date != "") {
        $from_date_split = explode("-", $from_date);
        if (!(is_numeric($from_date_split[0]) && is_numeric($from_date_split[1]) && is_numeric($from_date_split[2]))) {
            http_response_code(422);
            die();
        }
    }
    if ($to_date != "") {
        $to_date_split = explode("-", $to_date);
        if (!(is_numeric($to_date_split[0]) && is_numeric($to_date_split[1]) && is_numeric($to_date_split[2]))) {
            http_response_code(422);
            die();
        }
    }
}

