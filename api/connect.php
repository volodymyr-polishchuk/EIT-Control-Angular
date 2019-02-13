<?php

class EIT_DAO {
  private function __construct() { }

  public static function getConnection() {
    try {
      $database_url = 'mysql:host=localhost;port=3306;dbname=eit_control';
      $username = 'Volodymyr';
      $password = '0000';
      $dbh = new PDO($database_url, $username, $password, array(PDO::ATTR_PERSISTENT => true));
      return $dbh;
    } catch (PDOException $e) {
      http_response_code(500);
      print "Error : " . $e->getMessage() . "<br/>";
      print $e->getCode();
      throw $e;
    }
  }
}

?>
