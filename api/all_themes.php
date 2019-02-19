<?php
include 'cors.php';
include "auth.php";
require_once('connect.php');
$code = $_GET["subject_code"];

$connection = EIT_DAO::getConnection();
// TODO change it for read user from HEADERS
$user = ($_COOKIE['auth-k'] ? $_COOKIE['auth-k'] : '1');
if (!is_numeric($user)) die(403);

$query = "SELECT theme.k, 
                 theme.name 
            FROM theme 
           WHERE theme.subject LIKE ? 
                 AND theme.user = $user
           ORDER BY theme.name";
$sth = $connection->prepare($query);
$sth->execute(array($code));

$json_obj = json_encode($sth->fetchAll());
echo $json_obj;
