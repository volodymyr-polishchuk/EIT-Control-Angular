<?php
include 'cors.php';
include "auth.php";
require_once('connect.php');

$connection = EIT_DAO::getConnection();
$query = "SELECT k, name FROM subject";

$subjects = array();
foreach ($connection->query($query) as $row) {
    array_push($subjects, $row);
}

$json_obj = json_encode($subjects);
echo $json_obj;

