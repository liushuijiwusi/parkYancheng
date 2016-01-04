(function($){
	
	 $.fn.initial=function(){
		 
		 $('#submitbtn').on('click',$(this),function(){
			 getFrameData();
				
			});
	};
	
	var getFrameData=function(){
		var parkId = parseInt($('#park-select').val());
		var header= $('#infoheader').val();
		var content=$('#infocontent').val();
		if (header==""||content=="") {
			alert("输入通知信息");
			return;
		}
		$.ajaxFileUpload({
			url: 'upload',
	        secureuri: false,
	        fileElementId: 'fileToUpload',
	        dataType: 'json',
	        success: function (data) {
	        	var databody=data.body;
	            var uri=databody.uri;
	            if(uri==null){
	            	uri=[""];
	            }	            
					$.ajax({
						url:"insert/parkNews",
						type: 'post',
						contentType: 'application/json;charset=utf-8',			
						datatype: 'json',
						data: $.toJSON({'parkId':parkId, 'header':header,'content':content,'pictureUri':uri[0]}),
						success:function(data){
							alert("公告添加成功");
							 $('#infoheader').val("");
							 $('#infocontent').val("");
						},
						error: function(data){
							alert("添加失败");
						}
					});
	            
	            
	        },
	        error: function (data) {
	            alert("error");
	        }
		});
	}
})(jQuery);