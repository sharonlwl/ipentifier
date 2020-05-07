<?php
public class ip {
  int $seg_one;
  int $seg_two;
  int $seg_three;
  int $seg_four;
  int $subnet_mask;
  string $class;
  
  /*
   * @param string ip
   * @param int mask
   * @return bool | ip
   */
  public function __construct(string $ip, int $mask) {
    $ip_array = explode(".", $ip);
    $this->seg_one = $ip_array[0];
    $this->seg_two = $ip_array[1];
    $this->seg_three = $ip_array[2];
    $this->seg_four = $ip_array[3];
    $this->subnet_mask = $mask;
    
    if (validate()) {
      $this->class = class_detect();
    }
    
    return false;
  }
  
  /*
   * @return bool
   */
  bool public function validate() {
    if (seg_check($this->seg_one) && seg_check($this->seg_two) && seg_check($this->seg_three) && seg_check($this->seg_four)
      && $this->subnet_mask >= 1 && $this->subnet_mask <= 255) {
      return true;
    }
    return false;
  }
  
  /*
   * @return string
   */
  string public function class_detect() {
    if ($this->subnet_mask <= 8) {
      return "A";
    } elseif ($this->subnet_mask <= 16) {
      return "B";
    } elseif ($this->subnet_mask <= 24) {
      return "C";
    } else {
      return "D";
    }
  }
  
  /*
   * @param int segment
   * @return bool
   */
  bool private function seg_check($segment) {
    if ($segment >= 0 && $segment <= 255) {
      return true;
    }
    return false;
  }
}
?>
