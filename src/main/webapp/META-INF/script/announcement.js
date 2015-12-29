(function($){
	
	 $.fn.initial=function(){
		 
		 $('#submitbtn').on('click',$(this),function(){
				var parkId = parseInt($('#park-select').val());
				var header= $('#infoheader').val();
				var content=$('#infocontent').val();
				$.ajax({
					url:"insert/parkNews",
					type: 'post',
					contentType: 'application/json;charset=utf-8',			
					datatype: 'json',
					data: $.toJSON({'parkId':parkId, 'header':header,'content':content}),
					success:function(data){
					//	alert(data);
						alert("insert success");
					},
					error: function(data){
						alert("更新失败");
					}
				});
			});
	};
	
})(jQuery);