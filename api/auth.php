<?php
include 'cors.php';
require_once('connect.php');
$connection = EIT_DAO::getConnection();

$user_information = [];

if (isset(getallheaders()['Authorization'])) {
  $authorization = explode(' ', getallheaders()['Authorization']);
  if (!isset($authorization[0]) || $authorization[0] != 'Bearer' || !isset($authorization[1])) {
    http_response_code(403);
    die('Authorization header not set or authorization type not bearer');
  }

  $token = $authorization[1];
  $id = '1';

  $query = "SELECT k, login, 'name', description, role, password_hash  
              FROM users_eit 
             WHERE password_hash LIKE ? 
                   AND k LIKE ?;";

  $sth = $connection->prepare($query);
  $sth->execute(array($token, $id));
  $row = $sth->fetchAll();
  if (!isset($row[0])) {
    http_response_code(403);
    echo json_encode($row);
    die('can not find in database');
  } else {
    $user_information['k'] = $row[0]['k'];
    $user_information['login'] = $row[0]['login'];
    $user_information['name'] = $row[0]['name'];
    $user_information['description'] = $row[0]['description'];
    $user_information['role'] = $row[0]['role'];
    $user_information['token'] = $row[0]['password_hash'];
  }
} else {
  http_response_code(403);
  die('cookie not exists');
}
