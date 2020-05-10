    function process_ip() {
      var ip, mask; //input
      var net_addr, bc_addr, is_public;

      // Get the value of the input field
      ip = document.getElementById("ip").value;
      mask = document.getElementById("mask").value;
      var ip_array = ip.split(".");
      var formatted_mask = format_mask(mask);

      ip_check = valid_ip(ip_array);
      if (ip_check) {
        document.getElementById("ip_validation").innerHTML = "IP OK";
      } else {
        document.getElementById("ip_validation").innerHTML = "IP is invalid.";
      }

      var subnet_check = mask_check(formatted_mask);
      if (ip_check && subnet_check !== 5 && formatted_mask !== false && formatted_mask !== 32) {
        
        // find network and broadcast addresses
        var net_addr_array = find_net_addr(ip_array, formatted_mask);
        var bc_addr_array = find_bc_addr(ip_array, formatted_mask);
        net_addr = format_ip_addr(net_addr_array);
        bc_addr = format_ip_addr(bc_addr_array);
        
        // determine if
        is_public = pub_priv_check(ip_array, subnet_check);
        
        // format mask again for display purpose
        formatted_mask = "/" + formatted_mask;
      } else {
        formatted_mask = mask;
        net_addr = "N/A";
        bc_addr = "N/A";
      }
      // display results
      // ip_validation is displayed earlier in the function
      document.getElementById("class_result").style.display = "block";
      document.getElementById("network_addr").innerHTML = net_addr;
      document.getElementById("broadcast_addr").innerHTML = bc_addr;
      // mask_classification is displayed in mask_check()
      document.getElementById("mask_value").innerHTML = formatted_mask;
      document.getElementById("public_address").innerHTML = "It is a public address";
    }

    function find_net_addr(ip_array, mask) {
      var bin_ip = ip_dec_to_bin(ip_array);
      var bin_net_addr = bin_ip.substr(0, mask).padEnd(32, "0");
      return ip_bin_to_dec(bin_net_addr);
    }

    function find_bc_addr(ip_array, mask) {
      var bin_ip = ip_dec_to_bin(ip_array);
      var bin_bc_addr = bin_ip.substr(0, mask).padEnd(32, "1");
      return ip_bin_to_dec(bin_bc_addr);
    }

    function identify_max_min(ip_array, mask) {
      //TODO
    }

    function mask_check(subnet) {
      var class_result, formatted_mask;
      var check;

      if (subnet === false) {
        class_result = "is an invalid IP.";
        check = 5;
      }

      // validate mask
      if (check!==5 && subnet >= 0 && subnet <= 32) {
        if (subnet <= 8) {
          class_result = "is a Class A subnet.";
          check = 1;
        } else if (subnet <= 16) {
          class_result = "is a Class B subnet.";
          check = 2;
        } else if (subnet <= 24) {
          class_result = "is a Class C subnet.";
          check = 3;
        } else {
          class_result = "is a Class D subnet.";
          check = 4;
        }
      } else {
        class_result = "is an invalid mask.";
        check = 5;
      }

      document.getElementById("mask_classification").innerHTML = class_result;
      return check;
    }
    
    // return true if it is a public address
    function pub_priv_check(ip_array, subnet_class) {
      if ((subnet_class == 1 && ip_array[0] == 10)
      || (subnet_class == 2 && ip_array[0] == 172 && ip_array[1] >= 16 && ip_array[1] <= 31)
      || (subnet_class == 3 && ip_array[0] == 192 && ip_array[1] == 168)) {
        return false;
      }
      return true;
    }

    function valid_ip(ip_array) {
      // If each segment is Not a Number or less than 0 or greater than 255
      if (ip_array.length == 4 &&
        valid_oct(ip_array[0]) && valid_oct(ip_array[1]) && valid_oct(ip_array[2]) && valid_oct(ip_array[3])) {
        return true;
      }
      return false
    }

    function valid_oct(octet) {
      if (octet >= 0 && octet <= 255) {
        return true;
      }
      return false;
    }


    // dec_ip in array, bin_ip in string (32 char)
    function ip_dec_to_bin(ip_array) {
      var bin_array = new Array(4);
      bin_array[0] = octet_dec_to_bin(ip_array[0]);
      bin_array[1] = octet_dec_to_bin(ip_array[1]);
      bin_array[2] = octet_dec_to_bin(ip_array[2]);
      bin_array[3] = octet_dec_to_bin(ip_array[3]);
      return bin_array[0] + bin_array[1] + bin_array[2] + bin_array[3];
    }

    function ip_bin_to_dec(ip) {
      var dec_array = new Array(4);
      dec_array[0] = octet_bin_to_dec(ip.substr(0, 8));
      dec_array[1] = octet_bin_to_dec(ip.substr(8, 8));
      dec_array[2] = octet_bin_to_dec(ip.substr(16, 8));
      dec_array[3] = octet_bin_to_dec(ip.substr(24, 8));
      return dec_array;
    }

    // pad bin_octet to each have 8 char
    function octet_dec_to_bin(octet) {
      return parseInt(octet, 10).toString(2).padStart(8, 0);
    }

    function octet_bin_to_dec(octet) {
      return parseInt(octet, 2).toString(10);
    }

    // ip address: #.#.#.#
    function format_ip_addr(ip_array) {
      return ip_array[0] + '.' + ip_array[1] + '.' + ip_array[2] + '.' + ip_array[3];
    }

    // change #.#.#.# to /#
    function format_mask(subnet) {
      if (subnet.startsWith("/")) {
        // slash format
        return subnet.substr(1);
        //document.getElementById("mask_value").innerHTML = subnet;
      } else {
        var mask_array = subnet.split("."); // normal IP format
        // do not check mask if IP is invalid
        if (!valid_ip(mask_array)) {
          return false;
        }
        var mask_bin = ip_dec_to_bin(mask_array);
        return (mask_bin.split("0"))[0].length;
        //document.getElementById("mask_value").innerHTML = format_ip_addr(mask_array);
      }
    }
