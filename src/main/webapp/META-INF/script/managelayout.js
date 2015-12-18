$(function(){
	var url=window.location.href;
	var subUrl=url.substring(url.length-3);
	//alert(subUrl);
	$('#daohang li').removeClass("on");
	$('#daohanguser li').removeClass("on");
	switch (subUrl) {
	case "nfo":$('#daohang1').addClass("on");break;
	case "art":$('#daohang2').addClass("on");break;
	case "ate":$('#daohang3').addClass("on");break;
	case "ent":$('#daohang4').addClass("on");break;
	case "log":$('#daohang5').addClass("on");break;
	default:$('#daohang1').addClass("on");break;
	}
});