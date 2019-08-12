<?php

class EIT_DAO {
  private function __construct() { }

  public static function getConnection() {
    try {
      $database_url = 'mysql:host='. $_ENV['DATABASE_HOST'] . ';port=' . $_ENV['DATABASE_POST'] . ';dbname=' . $_ENV['DATABASE_NAME'];
      $username = $_ENV['DATABASE_USER'];
      $password = $_ENV['DATABASE_PASSWORD'];
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
