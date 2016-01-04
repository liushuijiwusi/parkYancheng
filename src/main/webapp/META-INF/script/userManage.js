(function($){
	
	$.fn.user = {};
	$.fn.user.initial = function(){
		bindTrClick();
		bindRefreshClick();
//		renderuser(0, $.fn.page.pageSize);
		bindSeeAll();
		bindSearch();
		bindDelete();
	};
	
	var bindSeeAll=function(){
		$('#seeAllBtn').on('click',$(this),function(){
			renderPagination();
		})
	}
	var bindSearch=function(){
		$('#searchBtn').on('click',$(this),function(){
			getUserByName();
			$('#username').val('');
		})
	}
	var bindDelete=function(){
		$('#deleteBtn').on('click',$(this),function(){
			if (confirm("是否删除所选择的用户")) {
				deleteUsers();
				alert("删除完成");
			}

		})
	}
	var bindAddUser=function(){
		$('#addUserBtn').on('click',$(this),function(){
			
		})
	}
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
			tr.append('<td><input type="checkbox" /></td>');
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
	var getUserByName=function(){
		var username=$('#username1').val();
		if (username=="") {
			alert("请输入用户名");
			return;
		}
		$.ajax({
			url: "getUserByName/"+username,
			type: 'get',
			success: function(data){
				data=$.parseJSON(data);
				filluserTbody(data);
			},
			error: function(data){
				
			}
		});
	}
	var deleteUsers=function(){
		 $("#table").find(":checkbox:checked").each(function(){
		       var id = $(this).parent().next().text();
		   	$.ajax({
				url: "deleteUserById/"+id,
				type: 'get',
				success: function(data){
		//			data=$.parseJSON(data);
		//			filluserTbody(data);
				},
				error: function(data){
					
				}
			});
		    });
	}
	var pageClickFunc = function(index){
		renderuser($.fn.page.pageSize * ($.fn.page.currentPage - 1), $.fn.page.pageSize);
	};
	
})(jQuery);