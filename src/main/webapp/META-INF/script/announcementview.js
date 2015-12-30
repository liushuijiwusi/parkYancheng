(function($){
	
	 $.fn.initial=function(){
		 getdata();
		 $('#park-select').on('change',$(this),function(){
				$('#infoheader').val('');
				$('#infocontent').val('');
				$('#infodatetime').val('');
				$('#newsPicture').attr('src',"");
				
				$('#infoheader1').val('');
				$('#infocontent1').val('');
				$('#infodatetime1').val('');
				$('#newsPicture1').attr('src',"");
				getdata();
			});
	};
	var getdata=function(){
		var parkId = parseInt($('#park-select').val());
		$.ajax({
			url:"getNewsByParkId/"+parkId,
			type: 'get',
			contentType: 'application/json;charset=utf-8',								
			success:function(data){
				var parkdata=data["body"];//通过这个 parkdata就是一个数组
				if(parkdata!=null){
						var header=parkdata[0].header;
						var content=parkdata[0].content;
						var timeinput=parkdata[0].date;
						var pictureUri=parkdata[0].pictureUri;
						$('#infoheader').val(header);
						$('#infocontent').val(content);
						$('#infodatetime').val(timeinput);
						$('#newsPicture').attr('src',pictureUri);
						for(var i=1;i<parkdata.length;i++){
							var header=parkdata[i].header;
							var content=parkdata[i].content;
							var timeinput=parkdata[i].date;
							var pictureUri=parkdata[i].pictureUri;
							$('#infoheader1').val(header);
							$('#infocontent1').val(content);
							$('#infodatetime1').val(timeinput);
							$('#newsPicture1').attr('src',pictureUri);
					}	
				}
			},
			error: function(data){
				alert("获取数据失败");
			}
		});
	}
})(jQuery);