$(".menu").mousedown(function(){
	$(this).toggleClass("closed");
	
	if($(this).hasClass("closed")) {
		$(".main.button").text("Menu");
	} else {
		$(".main.button").text("Close");
	}
})