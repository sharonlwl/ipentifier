<?php

var $error = null;

function display_result() {
  if (!isset($_POST['ipv4']) && !isset($_POST['mask'])) {
    $error = "Either value is not set. Please try again.\n";
  } else {
    $ip_object = new ip($_POST['ipv4'], $_POST['mask']);
    if ($ip_object === false) {
      $error = "Either value is invalid. Please try again.";
    } else {
      echo "Class is: " . $ip_object->class . "\n";
      echo "It is private.\n";
    }
  }
  
  if (!isnull($error)) {
    echo $error;
  }
}

?>
