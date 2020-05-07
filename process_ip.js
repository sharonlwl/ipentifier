    function process_ip() {
        var ip, mask; //input

        // Get the value of the input field
        ip = document.getElementById("ip").value;
        mask = document.getElementById("mask").value;

        if (validate_ip(ip) && class_check(mask)) {
            identify_max_min();
        }
    }

    function validate_ip(ip) {
        var ip_array, mask;
        ip_array = ip.split(".");

        // If each segment is Not a Number or less than 0 or greater than 255
        if (validate_seg(ip_array[0]) && validate_seg(ip_array[1]) && validate_seg(ip_array[2]) && validate_seg(ip_array[3])) {
            document.getElementById("ip_validation").innerHTML = "IP OK";
            return true;
        } else {
            document.getElementById("ip_validation").innerHTML = "IP is invalid";
            return false;
        }
    }

    function validate_seg(seg) {
        if (seg > 0 || seg < 256) {
            return true;
        }
        return false;
    }

    function class_check(subnet) {
        var class_result;

        document.getElementById("mask_value").innerHTML = subnet;
        if (isNaN(subnet) && !validate_seg(subnet)) {
            class_result = "is not a valid mask";
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
        }
    }

    function identify_max_min() {
        //TODO: need to work on logic
    }
