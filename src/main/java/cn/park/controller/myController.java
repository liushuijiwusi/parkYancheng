package cn.park.controller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import cn.park.service.HttpUtil;
@Controller
public class myController {

	@RequestMapping("/parkinfomy")
	public String parkinfomy(){
	
		return "parkinfomy";
	}
	@RequestMapping("/parkmy")
	public String parkmy(ModelMap modelMap){
		String url = "http://120.25.153.123/parkshow/getParksYancheng";
		Map<String, Object> result = HttpUtil.get(url);
		Object data=result.get("body");
		 Gson gson = new Gson();
		 Map<String, Object> mapdata=gson.fromJson((String) data, new TypeToken<Map<String, Object>>(){
         }.getType() );		
		 modelMap.addAttribute("parks", mapdata.get("body"));
		return "parkmy";
	}
	@RequestMapping("/announcementviewmy")
	public String announcementviewmy(ModelMap modelMap){
		String url = "http://120.25.153.123/parkshow/getParksYancheng";
		Map<String, Object> result = HttpUtil.get(url);
		Object data=result.get("body");
		 Gson gson = new Gson();
		 Map<String, Object> mapdata=gson.fromJson((String) data, new TypeToken<Map<String, Object>>(){
         }.getType() );		
		 modelMap.addAttribute("parks", mapdata.get("body"));
		return "announcementviewmy";
	}
	@RequestMapping("/logmy")
	public String logmy(ModelMap modelMap,HttpSession session){
		String username=(String) session.getAttribute("username");
		if (username!="") {
			modelMap.addAttribute("users",username);
			return "logmy";
		}
		return "404";
	}
}
