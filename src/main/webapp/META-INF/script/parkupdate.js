(function($){
	$.fn.parkChart = {};
	$.fn.parkChart.chart;
	$.fn.parkChart.dayAccess = {'entranceAccess': 0, 'exitAccess':0};
	$.fn.parkChart.monthAccess = {'entranceAccess':0, 'exitAccess':0};
	$.fn.parkChart.yearAccess = {'entranceAccess': 0, 'exitAccess':0};
	$.fn.parkChart.initial = function(){
	//	readCookieSetSelect();
		updateDayAccess();
		updateMonthAccess();
		updateLeftPort();

		$('#park-select').on('change', $(this), function(){
			updateDayAccess();
			updateMonthAccess();
			updateLeftPort();
		//	$.cookie('selectValue',$(this).val(),{path:'/',expires:10});
			
		});
		$('#updateLeftPort').on('click',$(this),function(){
			updateLeftCount();
		});
	};

	var updateLeftCount=function(){
		var leftport=parseInt($('#leftPortData').val());
		if (isNaN($('#leftPortData').val())) {
			alert("请输入数字");
		return;
		}
		var parkId = parseInt($('#park-select').val());
		$.ajax({
			url:"update/parkFields",
			type: 'post',
			contentType: 'application/json;charset=utf-8',			
			datatype: 'json',
			data: $.toJSON({'id':parkId, 'portleftcount':leftport}),
			success: function(data){
				if (data.status=='1001') {
					alert("数据更新成功");
					updateLeftPort();
					$('#leftPortData').val('');
				}
				else {
					alert('数据更新失败');
				}
			},
			error: function(data){
				alert("更新失败");
			}
		});
	}
	//转换数据
	var parseAccessData = function(data, isMonthAccess){
		var dateTime = [];
		var entranceAccess = [];
		var exitAccess = [];
		var entranceSumAccess = 0;
		var exitSumAccess = 0;		
		for(var i = 0; i < 24; i++){
			var entranceValue = data.entrance[i] || 0;
			var exitValue = data.exit[i] || 0;
			dateTime.push(i + ":00");
			entranceAccess.push(entranceValue);
			exitAccess.push(exitValue);
			entranceSumAccess += entranceValue;
			exitSumAccess += exitValue;
		}				
		if(entranceAccess.length == 0){
			for(var i = 0; i < 24; i++){
				dateTime.push(i + ":00");
				entranceAccess.push(0);
				exitAccess.push(0);
			}
		}	
		if(isMonthAccess == true){
			
			var monthEntranceAccess = 0;
			var monthExitAccess = 0;
			for(var i = 0; i < 31; i++){
				var entranceValue = data.entrance[i] || 0;
				var exitValue = data.exit[i] || 0;
				monthEntranceAccess += entranceValue;
				monthExitAccess += exitValue;
			}
			
			$.fn.parkChart.monthAccess['entranceAccess'] = monthEntranceAccess == undefined ? 0 : monthEntranceAccess;
			$.fn.parkChart.monthAccess['exitAccess'] = monthExitAccess == undefined ? 0 : monthExitAccess;
		}else{
			$.fn.parkChart.dayAccess = {"entranceAccess":entranceSumAccess, 'exitAccess': exitSumAccess};
		}		
		return {'dateTime': dateTime, 'entranceAccess': entranceAccess, 'exitAccess': exitAccess};
	};
	
	var updateDayAccess=function(){
		var chart = $.fn.parkChart.chart;
		var parkId = parseInt($('#park-select').val());
		var mydate=new Date();
		var date = mydate.toLocaleDateString();
		
		var url = 'getHourCountByPark?_t=' + (new Date()).getTime();
		
		var successFunc = function(data){
			var chartData = parseAccessData(data);

			$('#dayAccessVal').text($.fn.parkChart.dayAccess['entranceAccess'] + $.fn.parkChart.dayAccess['exitAccess']);
		};	
		$.ajax({
			url:url,
			type: 'post',
			contentType: 'application/json;charset=utf-8',			
			datatype: 'json',
			data: $.toJSON({'parkId':parkId, 'date':date}),
			success: function(data){
				successFunc(data['body']);
			},
			error: function(data){}
		});
	};	
	var updateMonthAccess = function(){
		var chart = $.fn.parkChart.chart;
		var parkId = parseInt($('#park-select').val());
		var mydate=new Date();
		var date = mydate.toLocaleDateString();
		var data1=$.toJSON({'parkId':parkId, 'date':date});
		$.fn.parkChart.monthAccess['entranceAccess']
		var url =  'getDayCountByPark?_t=' + (new Date()).getTime();		
		var successFunc = function(data){
			var chartData = parseAccessData(data, true);
			$('#monthAccessVal').text($.fn.parkChart.monthAccess['entranceAccess'] + $.fn.parkChart.monthAccess['exitAccess']);
		};		
		$.ajax({
			url:url,
			type: 'post',
			contentType: 'application/json;charset=utf-8',			
			datatype: 'json',
			data:data1,
			success: function(data){
				successFunc(data['body']);
			},
			error: function(data){}
		});
	};
	var updateLeftPort = function(){
	//	var chart = $.fn.parkChart.chart;
		var parkId = parseInt($('#park-select').val());
		var test = 1;
		 $.ajax({
			url: 'getPark/' + parkId + '?_t=' + (new Date()).getTime(),
			type: 'get',
			contentType: 'application/json;charset=utf-8',			
			success: function(data){
				if(data.status == 1001){
					$('#leftPortVal').text(data.body.portLeftCount);
				}
			},
			error: function(data){}
		 });
	};
})(jQuery);