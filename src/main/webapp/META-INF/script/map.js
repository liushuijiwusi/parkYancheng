(function($){
	$.fn.map={};
	
	$.fn.map.initial=function(){
		mapInitial();
		optionListener();
	};
	var map;
	var point;
	var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
		 offset: new BMap.Size(10, 25), // 指定定位位置
		 imageOffset: new BMap.Size(0, 0 - 10 * 25) // 设置图片偏移
		 });
	var mapInitial=function(){
		map = new BMap.Map("mapyancheng");
		point = new BMap.Point(120.15755, 33.35);
		map.centerAndZoom(point, 15);	
		map.enableScrollWheelZoom();	
		
		getData();
	//	var marker = new BMap.Marker(new BMap.Point(120.15755,33.36664));  // 创建标注
		//map.addOverlay(marker);     
	};
	var data_info;
	var opts = {
				width : 250,     // 信息窗口宽度
				height: 150,     // 信息窗口高度
				title : "停车场信息:" , // 信息窗口标题
				enableMessage:true,//设置允许信息窗发送短息
			   };
	function addClickHandler(content,marker){
		marker.addEventListener("click",function(e){
			openInfo(content,e)}
		);
	}
	
	var optionListener=function(){
		$('#socia_cont .option').on('click',$(this),function(){
			 var choice = $(this).html();
			 point = new BMap.Point(120.15755, 33.35);
				map.centerAndZoom(point, 15);
			 var local = new BMap.LocalSearch(map, {
					renderOptions:{map: map}
					});
					local.search(choice);
		});
	}
	
	function openInfo(content,e){
		var p = e.target;
		var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
		var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
		map.openInfoWindow(infoWindow,point); //开启信息窗口
	} 
	var showparks=function(){
		
		for(var i=0;i<data_info.length;i++){
			var marker = new BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]),{icon: myIcon});  // 创建标注
			var content = data_info[i][2];
			map.addOverlay(marker);               // 将标注添加到地图中
			addClickHandler(content,marker);
		}
	}
	var getData=function(){
		$.ajax({
			url:'getParks',
			type: 'get',
			contentType: 'application/json;charset=utf-8',			
			datatype: 'json',
			success: function(data){
				var parkdata=data["body"];
			//	alert(parkdata.length);
				data_info=new Array(parkdata.length);
				for(var i=0;i<parkdata.length;i++){
					console.log(parkdata[i].name+'\n');
					var tmparray=new Array(3);
					tmparray[0]=parkdata[i].longitude;
					tmparray[1]=parkdata[i].latitude;
					  var v_html = '<div id="tipsjt"></div>';
		                v_html += '    <h1 class="font14 green relative">' + parkdata[i].name + '<i class="i pointer" onclick="closeTip()"></i></h1>';
		                v_html += '<p class="font14">空余车位：<b class="red">' + parkdata[i].portLeftCount + '</b> 个' + (parkdata[i].portLeftCount > 0 ? '<a href="#" class="but_b back_orange font18 radius_3 absolute reservation" style="right:10px;" pid="' + i+ '"><i class="i"></i>预定</a>' : '') + '</p>';
		                v_html += '<p class="green font14">收费标准：</p> ';
		                v_html += '  <div class="color_9">';
					tmparray[2]= v_html;
					data_info[i]=tmparray;
					
				}
			
				showparks();
				getPoints(parkdata);
			},
		});
	}
	
    function getPoints(parkdata) {
    	var v_html='';
        for (var i=0;i<parkdata.length;i++) {
        	
            v_html += "<li p_id=" + i + ">";
            v_html += '<h1 class="font18 color_3">' + parkdata[i].name + '</h1>';
            v_html += '<p>空余车位：<b class="green">' + parkdata[i].portLeftCount + '</b></p>';

            if (parkdata[i].portLeftCount > 0)
                v_html += '<a href="#" class="res back_orange font18 radius_3 absolute reservation" pid="' + i + '"><i class="i"></i>预定</a>';
            v_html += '</li>';
        }
        //setpage(page, maxPage);
        $("#parking_list").html(v_html);
        $("#parking_list li").hover(function () {
            var p_id = $(this).attr('p_id');
            $('#parking_rm_' + p_id).removeClass('map_p_btn').addClass('map_p_btn_on');
            
        }, function () {
            var p_id = $(this).attr('p_id');
            $('#parking_rm_' + p_id).removeClass('map_p_btn_on').addClass('map_p_btn');
        })
    }
	
	function convertData(){
		
	}
})(jQuery);