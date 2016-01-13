(function($){
	$.fn.log={};
	$.fn.log.initial=function(){
		bindSelect();
		getdata();
	}
	var bindSelect=function(){
		$('#user-select').on('change',$(this),function(){
			getdata();
		})
	}
	var getdata=function(){
		var username=$('#user-select').find("option:selected").text();;
		$.ajax({
			url:"getUserYanchengLoginLog",
			type: 'post',
			contentType: 'application/json;charset=utf-8',			
			datatype: 'json',
			data: $.toJSON({'username':username}),
			success: function(data){
				var userlogdata=data['body'];
				var parkBody = $("#parkBody");
				parkBody.html('');
				for(var i=0;i<userlogdata.length;i++){
					var tr = $('<tr></tr>');
					
					tr.append('<td>' + userlogdata[i]['username']+ '</td>');
					tr.append('<td>' + userlogdata[i]['login_date']+ '</td>');
					parkBody.append(tr);
				}
			},
		});
	}
})(jQuery);