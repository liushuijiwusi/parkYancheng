(function($){
	
$.fn.parkChart = {};
$.fn.parkChart.theme = Highcharts.getOptions();
$.fn.parkChart.chart;
$.fn.parkChart.dayAccess = {'entranceAccess': 0, 'exitAccess':0};
$.fn.parkChart.monthAccess = {'entranceAccess':0, 'exitAccess':0};
$.fn.parkChart.yearAccess = {'entranceAccess': 0, 'exitAccess':0};
/**
 * init content
 */
$.fn.parkChart.initial = function(){
	var chatContent = $('#chart-content');	
	readCookieSetSelect();
	$('#date').val(new Date().format('yyyy-MM-dd'));
	$('#date').datepicker({
		autoClose: true,
	    dateFormat: "yyyy-mm-dd",
	    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
	    daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
	    daysMin: ["日", "一", "二", "三", "四", "五", "六"],
	    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
	    monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
	    showMonthAfterYear: true,
	    viewStart: 0,
	    weekStart: 1,
	    yearSuffix: "年",
	    isDisabled: function(date){return date.valueOf() > Date.now() ? true : false;}	
	});
		
	Highcharts.setOptions(Highcharts.themeGray);
	$.fn.parkChart.renderChart(chatContent);

	$('#parkName').text($('#park-select').find('option:selected').text());
	$('#park-select').on('change', $(this), function(){
		$.cookie('selectValue',$(this).val(),{path:'/',expires:10});
		$('#parkName').text($('#park-select').find('option:selected').text());
		$.fn.parkChart.renderChart(chatContent);
	});
	$('#date').on('change', $(this), function(){
		$.fn.parkChart.renderChart(chatContent);
	});
	
	$('#theme').on('change', $(this), function(){
		
		var value = $(this).val();
		var options;
		switch(parseInt(value)){
		case 0:
			options =  Highcharts.setOptions($.fn.parkChart.theme);
			break;
		case 1:
			options = Highcharts.setOptions(Highcharts.themeGray);
			break;
		case 2:
			options = Highcharts.setOptions(Highcharts.themeDarkBlue);
			break;
		case 3:
			options = Highcharts.setOptions(Highcharts.themeDarkGreen);
			break;
		case 4:
			options = Highcharts.setOptions(Highcharts.themeDarkUnica);
			break;
		case 5:
			options = Highcharts.setOptions(Highcharts.themeGrid);
			break;
			default:
				Highcharts.setOptions($.fn.parkChart.theme);
		}
	
		$.fn.parkChart.renderChart(chatContent);
	})
	
};

var readCookieSetSelect=function(){
	if($.cookie('selectValue')){
		$('#park-select').val($.cookie('selectValue'));
		if($('#park-select').find("option:selected").text().length<3){
			$('#park-select option:last').attr('selected','selected');
		}
	}}
/**
 * render chart
 */
$.fn.parkChart.renderChart = function(chatContent){
	var parkId = parseInt($('#park-select').val());
	var date = $('#date').val();
	
	var url = '/getHourCountByPark?_t=' + (new Date()).getTime();
		
	$.ajax({
		url:url,
		type: 'post',
		contentType: 'application/json;charset=utf-8',			
		datatype: 'json',
		data: $.toJSON({'parkId':parkId, 'date':date}),
		success: function(data){
			if(data.status == 1001){
			$.fn.parkChart.renderChartContent(data.body, chatContent);
		}
		},
		error: function(data){}
	});

};

/**
 * update chart content dynamic
 */
$.fn.parkChart.updateChart = function(){
	$.fn.parkChart.updateLeftPort();
	$.fn.parkChart.updateDayAccess();
	$.fn.parkChart.updateMonthAccess();
	
};

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

/**
 * update day access
 */
$.fn.parkChart.updateDayAccess = function(){
	var chart = $.fn.parkChart.chart;
	var parkId = parseInt($('#park-select').val());
	var date = $('#date').val();
	
	var url = $.fn.config.webroot + '/getHourCountByPark?_t=' + (new Date()).getTime();
	
	var successFunc = function(data){
		var chartData = parseAccessData(data);
		var entranceSeries = chart.series[0];
		var exitSeries = chart.series[1];
		entranceSeries.setData(chartData['entranceAccess']);
		exitSeries.setData(chartData['exitAccess']);

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


/**
 * update month access
 */
$.fn.parkChart.updateMonthAccess = function(){
	var chart = $.fn.parkChart.chart;
	var parkId = parseInt($('#park-select').val());
	var date = $('#date').val();
	$.fn.parkChart.monthAccess['entranceAccess']
	var url = $.fn.config.webroot + '/getDayCountByPark?_t=' + (new Date()).getTime();
	
	var successFunc = function(data){
		var chartData = parseAccessData(data, true);		
		$('#monthAccessVal').text($.fn.parkChart.monthAccess['entranceAccess'] + $.fn.parkChart.monthAccess['exitAccess']);
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




/**
 * update left port
 */
$.fn.parkChart.updateLeftPort = function(){
	var chart = $.fn.parkChart.chart;
	var parkId = parseInt($('#park-select').val());
	var test = 1;
	 $.ajax({
		url:$.fn.config.webroot + '/getPark/' + parkId + '?_t=' + (new Date()).getTime(),
		type: 'get',
		contentType: 'application/json;charset=utf-8',			
		success: function(data){
			if(data.status == 1001){
			/*	var series = chart.series[2];
				var seriesData = [{
		            name: '无车',
		            y: data.body.portLeftCount,
		            color: Highcharts.getOptions().colors[2] 
		        }, {
		            name: '有车',
		            y: data.body.portCount-data.body.portLeftCount,
		            color: Highcharts.getOptions().colors[1] 
		        }];
		       
				series.setData(seriesData); */
				$('#leftPortVal').text(data.body.portLeftCount);
			}
		},
		error: function(data){}
	 });
};

/**
 * render chart content
 */
$.fn.parkChart.renderChartContent = function(data, chatContent){
	var chartData = parseAccessData(data);
	chatContent.highcharts({
		chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 12,
                beta: 12,
                viewDistance: 30,
                depth: 30
            },
            marginTop: 80,
            marginRight: 80,
			 events: {  
                 load: function() {  
                	 $.fn.parkChart.chart = this;
                	 $.fn.parkChart.updateChart();
                	 setInterval(function(){
                		 $.fn.parkChart.updateChart();
                	 }, 1000 * 10);
                 }                                                               
             }   
		},
	    title: {
	        text: '停车场流量统计'
	    },
	    plotOptions: {
            column: {
                stacking: 'normal',
                depth: 40
            }
        },
    xAxis: {
	        categories: chartData['dateTime']
	    },
	    yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: '流  量  数'
            }
        },
	    series: [{
	    	color:Highcharts.getOptions().colors[1],
	        name: '入口',
	        data: chartData['entranceAccess'],
	        stack: 'a',
	        dataLabels: {
                enabled: true,
                rotation: 0,
                color: '#FF0033',
                //align: 'right',
                x: 0,
                y: -15,
                style: {
                    fontSize: '11px',
 
                }
            }
	    }, {
	    	color:Highcharts.getOptions().colors[2],
	        name: '出口',
	        data: chartData['exitAccess'],
	        stack: 'a',
	        dataLabels: {
                enabled: true,
                rotation: 0,
               
                //align: 'right',
                x: 0,
                y: -15,
                style: {
                    fontSize: '11px',
                }
            }
	    }]
	});
};
})(jQuery);