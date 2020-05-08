    function process_ip() {
        var ip, ip_array, mask; //input
		var net_addr_array, bc_addr_array; //output
        
        // Get the value of the input field
        ip = document.getElementById("ip").value;
        ip_array = ip.split(".");
        mask = document.getElementById("mask").value;

		ip_check = validate_ip(ip_array);
        subnet_check = class_check(mask);
        if (ip_check && subnet_check) {
        	var net_addr_arry = find_net_addr(ip_array, mask);
            var bc_addr_array = find_bc_addr(ip_array, mask);
            //identify_max_min(ip_array, mask);
            
            document.getElementById("network_addr").innerHTML = format_ip_addr(net_addr_array);
            document.getElementById("broadcast_addr").innerHTML = format_ip_addr(bc_addr_array);
        }
    }

    function validate_ip(ip_array) {
        var mask;

        // If each segment is Not a Number or less than 0 or greater than 255
        if (validate_seg(ip_array[0]) && validate_seg(ip_array[1]) && validate_seg(ip_array[2]) && validate_seg(ip_array[3])) {
            document.getElementById("ip_validation").innerHTML = "IP OK";
            return true;
        } else {
            document.getElementById("ip_validation").innerHTML = "IP is invalid";
            return false;
        }
    }

    function class_check(subnet) {
        var class_result;

        document.getElementById("mask_value").innerHTML = subnet;
        if (isNaN(subnet) && !validate_seg(subnet)) {
            class_result = "is not a valid mask";
            document.getElementById("mask_classification").innerHTML = class_result;
            return false;
        } else {
            if (subnet <= 8) {
                class_result = "is a Class A subnet.";
            } else if (subnet <= 16) {
                class_result = "is a Class B subnet.";
            } else if (subnet <= 24) {
                class_result = "is a Class C subnet.";
            } else {
                class_result = "is a Class D subnet.";
            }
            
            document.getElementById("mask_classification").innerHTML = class_result;
            return true;
        }
    }
    
    function find_net_addr(ip_array, mask) {
        var bin_ip = ip_dec_to_bin(ip_array);
        var bin_net_addr = binary_ip.substr(0, mask).padEnd(32, "0");
        return ip_bin_to_dec(bin_net_addr);
    }
    
    function find_bc_addr(ip_array, mask) {
    	var bin_ip = ip_dec_to_bin(ip_array);
        var bin_bc_addr = binary_ip.substr(0, mask).padEnd(32, "1");
        return ip_bin_to_dec(bin_bc_addr);
    }
    
    function identify_max_min(ip_array, mask) {
        //TODO
    }
    
	function validate_seg(seg) {
        if (seg > 0 || seg < 256) {
            return true;
        }
        return false;
    }
    
    // dec_ip in array, bin_ip in string (32 char)
    function ip_dec_to_bin(ip_array) {
    	var bin_array;
        bin_array[0] = octet_dec_to_bin(ip_array[0]);
        bin_array[1] = octet_dec_to_bin(ip_array[1]);
        bin_array[2] = octet_dec_to_bin(ip_array[2]);
        bin_array[3] = octet_dec_to_bin(ip_array[3]);
        return bin_array[0] + bin_array[1] + bin_array[2] + bin_array[3];
    }
    
    function ip_bin_to_dec(ip) {
    	var dec_array;
        dec_array[0] = octet_bin_to_dec(ip.substr(0,8));
        dec_array[1] = octet_bin_to_dec(ip.substr(8,8));
        dec_array[2] = octet_bin_to_dec(ip.substr(16,8));
        dec_array[3] = octet_bin_to_dec(ip.substr(24,8));
        return dec_array;
    }
    
    // pad bin_octet to each have 8 char
    function octet_dec_to_bin(octet) {
        return octet.toString(2).padStart(8,0);
    }
    
    function octet_bin_to_dec(octet) {
    	return octet.toString(10);
    }
    
    function format_ip_addr(ip_array) {
    	return ip_array[0] + '.' + ip_array[1] + '.' + ip_array[2] + '.' + ip_array[3];
    }
    
	function subnet_mask_format() {
    	//TODO: need to decide on default
    }
