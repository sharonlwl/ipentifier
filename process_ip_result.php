<?php

if (!isset($_POST['ipv4']) && !isset($_POST['mask'])) {
  echo "Either value not set. Please try again.";
} else {
  $ip_object = new ip($_POST['ipv4'], $_POST['mask']);
  if ($ip_object === false) {
    echo "Either value is invalid. Please try again.";
  } else {
    $class = $ip_object->class;
  }
}

?>
