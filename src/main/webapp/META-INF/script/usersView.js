(function($){
	
	$.fn.user = {};
	$.fn.user.initial = function(){
		bindTrClick();
		bindRefreshClick();
//		renderuser(0, $.fn.page.pageSize);
		renderPagination();
	};
	
	/**bind tr click*/
	var bindTrClick = function(){
		var userBody = $("#userBody");
		userBody.on('click', 'tr', function(event){
			if(event.target.nodeName.toLowerCase() != 'input')
				$(this).find('input[type="checkbox"]').click();
		});
	};
	
	var bindRefreshClick = function(){
		var refreshBtn = $('#refresh');
		refreshBtn.on('click', $(this), function(){
			renderuser($.fn.page.pageSize * ($.fn.page.currentPage - 1), $.fn.page.pageSize);
			$(this).blur();
		});
		
	};
	
	/*** get table user item ***/
	var renderuser = function(low, count){
		
		var cols = $('#userTable').find('thead tr th').length;
		$("#userBody").html('<tr><td colspan="' + cols + '"></td></tr>');

		$.fn.loader.appendLoader($('#userBody').find('td'));

		$.ajax({
			url:$.fn.config.webroot + "/getUserDetail?low=" + low + "&count=" + count,
			type: 'get',
			success: function(data){
				filluserTbody(data);
			},
			error: function(data){
				errorHandle(data);
			}
		});
	};
	
	
	var filluserTbody = function(data){
		var userBody = $("#userBody");
	//	$.fn.loader.removeLoader($('#userDiv'));
		userBody.html('');
	
		data = data.body;
		for(var i = 0; i < data.length; i++){
			var tr = $("<tr></tr>");
			tr.append('<td>' + data[i]['id']+ '</td>');
			tr.append('<td>' + data[i]['username']+ '</td>');
			tr.append('<td>' + data[i]['password']+ '</td>');
			tr.append('<td>' + data[i]['date']+ '</td>');
			if( i % 2 == 0){
				tr.addClass('success');
			}else{
				tr.addClass('active');
			}
			userBody.append(tr);
		}
	};
	
	var errorHandle = function(data){
		alert("get useres failed");
	};
	
	/***render pagination****/
	var renderPagination = function(){

		$.ajax({
			url: "getAllUsers",
			type: 'get',
			success: function(data){
				data=$.parseJSON(data);
			//	data = $.parseJSON(data["body"]);
				filluserTbody(data);
			},
			error: function(data){
				
			}
		});
	};
	
	var pageClickFunc = function(index){
		renderuser($.fn.page.pageSize * ($.fn.page.currentPage - 1), $.fn.page.pageSize);
	};
	
})(jQuery);