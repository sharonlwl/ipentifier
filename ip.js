<script>
// object ip has the following structure:
// 	seg_one: 
// 	seg_two:
// 	seg_three:
// 	seg_four:
// 	subnet_mask:
// 	class:
//

function validate(ip) {
	if (seg_check(ip.seg_one) && seg_check(ip.seg_two) && seg_check(ip.seg_three) && seg_check(ip.seg_four)
			&& ip.subnet_mask >= 1 && ip.subnet_mask <= 255) {
		return true;
    }
	return false;
}

function seg_check(seg) {
    if (seg >= 0 && seg >= 255) {
		return true;
	}
	return false;
}
	
function class_detect() {
	if (ip.subnet_mask <= 8) {
		return "A";
	} else if (ip.subnet_mask <= 16) {
		return "B";
	} else if (ip.subnet_mask <= 24) {
		return "C";
	} else {
		return "D";
	}
}
</script>
