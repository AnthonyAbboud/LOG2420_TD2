const ControllerHeader = {
	DisplayNotifications: (newNotifs) => {
		$(".nb-notif").empty();
		if(newNotifs == false) {
			$(".nb-notif").hide();
		} else {
			$(".nb-notif").show();
			$(".nb-notif").append("1");
		}
	}
}

ControllerHeader.DisplayNotifications(true);