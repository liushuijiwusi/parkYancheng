// JavaScript Document
var time=3; 
var stop;
var Alert={	  
	show3sMsg:function(obj){
	    var subhtml = '<div id="alert_dialog_show_3s_box" style=" overflow:hidden; border:1px solid #ccc"><div id="alert_show_3" class="time1" style="height:100px; width:200px; background-color:#000; color:#fff; opacity:0.8;  border-radius:8px;font-size:24px; text-align:center;z-index: 2000; position:fixed;top:20%;left:45%;"><p style="padding-top:30px;">' + obj + '</p></div></div>';
		$("body").append(subhtml);
		//计数器
		time=3;		
		stop=setInterval(closedShow3sMsg,1000)	
	},
	//确认
	showMsg:function(obj){
	    var subhtml = '<div id="alert_dialog_show_msg_box" style=" overflow:hidden;height:120px;width:300px;     position: absolute; border:1px solid #ccc"><div class="sweet-overlay" tabIndex="-1"></div><div id="alert_show_3" style="height:120px; width:300px; background-color:#fff; color:#000; border-radius:8px;font-size:20px; text-align:center;z-index:2000;position:absolute;"><p style="font-size:14px; padding:20px;">' + obj + '</p><input name="button" onclick="closedShowMsg()" type="button" value="确认" style=" width:60px; height:30px; line-height:30px;" class=" back_green color_f radius_3"  /></div></div>';
	    $("body").append(subhtml);
	    $('#alert_dialog_show_msg_box').css({ 'left': ($(window).width() - 200) / 2 + 'px', 'top': ($(window).height() - 100) / 2 + 'px' })
	},
	showConfirmMsg: function (obj, surecallback, cancelcallback, suretxt, canceltxt) {
	    if (cancelcallback == undefined) cancelcallback = null;
	    if (suretxt == undefined) suretxt = '确定';
	    if (canceltxt == undefined) canceltxt = '取消';
	    var subhtml = '<div id="alert_dialog_show_confirm_box" style=" overflow:hidden;height:120px;width:300px;    position: absolute;  border:1px solid #ccc"><div class="sweet-overlay" tabIndex="-1"></div><div id="alert_show_3" style="height:120px; width:300px; background-color:#fff; color:#000; border-radius:8px;font-size:20px; text-align:center; position:absolute;z-index:2000;"><p style="font-size:14px; padding:20px;">' + obj + '</p><input name="button" onclick="rec(' + surecallback + ')" type="button" value="' + suretxt + '" style=" width:60px; height:30px;line-height:30px;" class=" back_green color_f radius_3"  /><input name="button" onclick="rec(' + cancelcallback + ')" type="button" value="' + canceltxt + '" style=" width:60px; height:30px;line-height:30px; margin-left:20px;" class=" radius_3"  /></div></div>';
	    $("body").append(subhtml);
	    $('#alert_dialog_show_confirm_box').css({ 'left': ($(window).width() - 200) / 2 + 'px', 'top': ($(window).height() - 100) / 2 + 'px' })
	    surecallback = surecallback || function () { };
	},
	
	//
	loading:function(parent,left,top,width,height){
	    var subhtml = '<div id="alert_dialog_show_loading_box" style="overflow:hidden; left:' + left + 'px;top: ' + top + 'px; width: ' + width + 'px;height: ' + height + 'px;position: absolute; border:1px solid #ccc"><div class="sweet-overlay" tabIndex="-1" style="  width: ' + width + 'px;height: ' + height + 'px;z-index:1000;"></div><div id="alert_show_3"  style=" position:absolute;z-index:2000;"><div class="spinner" style="margin-left:' + (width - 40) / 2 + 'px;margin-top:' + (height - 40) / 2 + 'px"><div class="spinner-container container1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container2"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div></div></div></div>';
	    $("#" + parent).append(subhtml);
 
	},
	closedLoading:function(){
		  $("#alert_dialog_show_loading_box").remove();
	}	
}
	
//3s关闭弹出框
function closedShow3sMsg(){
	time=time-1;
	if(time==0){
		$('#alert_dialog_show_3s_box').remove();
		clearInterval(stop);
	}
}
//关闭确认弹出框
function rec(callback){
	$("#alert_dialog_show_confirm_box").remove();
	callback();
}

//关闭弹出框
function closedShowMsg(){
	$("#alert_dialog_show_msg_box").remove();
}


