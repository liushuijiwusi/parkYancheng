package cn.park.controller;

import java.io.Console;
import java.io.IOException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import cn.park.service.HttpUtil;
import cn.park.service.Utility;
@Controller
public class ApiController {
	
	@RequestMapping(value="/getAccessDetail",method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public String accessIndex(HttpServletRequest request,@RequestParam("low")int low, @RequestParam("count")int count,
			@RequestParam(value = "parkId", required = false)Integer parkId) {
		
		String url;
		if (parkId!=null) {
			url="http://120.25.153.123/park/getAccessDetail?"+"low="+low+"&&count="+count+"&&parkId"+parkId;
		} else {
			url="http://120.25.153.123/park/getAccessDetail?"+"low="+low+"&&count="+count;
		}
		Map<String, Object> result = HttpUtil.get(url);
		return Utility.gson.toJson(result.get("body"));
	}
	@RequestMapping(value = "/getHourCountByPark", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public String getHourCountByPark(@RequestBody Map<String, Object> args) throws ParseException{
		String url = "http://120.25.153.123/park/getHourCountByPark";
		Map<String, Object> result = HttpUtil.post(url, args);
		return Utility.gson.toJson(result.get("body"));
	}
	@RequestMapping(value = "/getPark/{id}", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public String getParkById(@PathVariable int id){
		String url = "http://120.25.153.123:8080/park/getPark/"+id;
		Map<String, Object> result = HttpUtil.get(url);
		return Utility.gson.toJson(result.get("body"));
	}

	@RequestMapping(value = "/getParks", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public Object getParks(ModelMap modelMap, HttpServletRequest request, HttpSession session){
		String url = "http://120.25.153.123:8080/park/getParks/";
		Map<String, Object> result = HttpUtil.get(url);

//		Map<String, Object> data168=new HashMap<>();
//		data168.put("", value)
		
		return result.get("body");
	}
	@RequestMapping(value = "/getParkByName", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public String getParkByName(@RequestBody Map<String, Object> args){
		String url = "http://120.25.153.123/park/getParkByName";
		Map<String, Object> result = HttpUtil.post(url, args);
		return Utility.gson.toJson(result.get("body"));
	}
	@RequestMapping(value = "/update/parkFields", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public String updateParkFields(@RequestBody Map<String, Object> args){
		String url = "http://120.25.153.123/park/getParkByName";
		Map<String, Object> result = HttpUtil.post(url, args);
		return Utility.gson.toJson(result.get("body"));
	}
	@RequestMapping(value = "/getParkDetail", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public Object getParkDetail(@RequestBody Map<String, Object> args){
		String url = "http://120.25.153.123/park/getParkDetail";
		Map<String, Object> result = HttpUtil.post(url, args);
		return result.get("body");
	}
	@RequestMapping(value = "/getParkCount", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public Object getParkCount(){
		String url = "http://120.25.153.123:8080/park/getParkCount/";
		Map<String, Object> result = HttpUtil.get(url);

		return result.get("body");
	}
	@RequestMapping(value = "/authorityWeb", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
	public Object authorityWeb(@RequestParam("username")String username,@RequestParam("password")String password,HttpSession session){
		Map<String, Object> args=new HashMap<String, Object>();
		args.put("username", username);
		args.put("password", password);
		String url = "http://120.25.153.123/parkshow/authorityWeb";
		Map<String, Object> result = HttpUtil.post(url, args);
		System.out.println(result);
		Object data=result.get("body");
		 Gson gson = new Gson();
		 Map<String, Object> mapdata=gson.fromJson((String) data, new TypeToken<Map<String, Object>>(){
         }.getType() );
		 System.out.println(mapdata.get("isAllow"));
		 Boolean isAllow=(Boolean) mapdata.get("isAllow");
		 Boolean isAdmin=(Boolean) mapdata.get("isAdmin");
		 if (isAdmin) {
			 session.setAttribute("username", username);
			 session.setAttribute("isAdmin", true);
			return "redirect:/manage";
		}
		 else if (isAllow) {
			session.setAttribute("username", username);
			return "redirect:/my";
		}
	//	 String isAllow=(String) mapdata.get("isAllow");
		return data;
	}
}
