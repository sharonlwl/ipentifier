<script>

var error = null;

  // call with <script src="process_ip_result.js"></script>
function display_result() {
  ip = document.getElementById("ip");
  mask = document.getElemetnById("mask");
  if (typeof ip !== 'undefined'&& typeof mask !== 'undefined') {
    error = "Either value is not set. Please try again.\n";
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

</script>
