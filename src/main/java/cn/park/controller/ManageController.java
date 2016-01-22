package cn.park.controller;

import java.util.Map;

import javax.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.util.HashMap;
import java.util.List;

import cn.park.model.Constants;
import cn.park.service.HttpUtil;
@Controller
public class ManageController {
	@RequestMapping("/announcement")
	public String announcement(ModelMap modelMap){
		String url = Constants.WEBAPIURL+"/getParks";
		Map<String, Object> result = HttpUtil.get(url);
		Object data=result.get("body");
		 Gson gson = new Gson();
		 Map<String, Object> mapdata=gson.fromJson((String) data, new TypeToken<Map<String, Object>>(){
         }.getType() );		
		 modelMap.addAttribute("parks", mapdata.get("body"));
		return "announcement";
	}
	@RequestMapping("/parkchart")
	public String parkchart(){
		return "parkchart";
	}
	@RequestMapping("/parkupdate")
	public String parkupdate(ModelMap modelMap){
		String url =Constants.WEBAPIURL+"/getParks";
		Map<String, Object> result = HttpUtil.get(url);
		Object data=result.get("body");
		 Gson gson = new Gson();
		 Map<String, Object> mapdata=gson.fromJson((String) data, new TypeToken<Map<String, Object>>(){
         }.getType() );		
		 modelMap.addAttribute("parks", mapdata.get("body"));
		return "parkupdate";
	}
	@RequestMapping("/parkinfo")
	public String parkinfo(){
		return "parkinfo";
	}
	@RequestMapping("/announcementview")
	public String announcementview(ModelMap modelMap){
		String url = Constants.WEBAPIURL+"/getParks";
		Map<String, Object> result = HttpUtil.get(url);
		Object data=result.get("body");
		 Gson gson = new Gson();
		 Map<String, Object> mapdata=gson.fromJson((String) data, new TypeToken<Map<String, Object>>(){
         }.getType() );		
		 modelMap.addAttribute("parks", mapdata.get("body"));
		return "announcementview";
	}
	@RequestMapping("/log")
	public String log(ModelMap modelMap,HttpSession session){
		String url = Constants.WEBAPIURL+"/getAllUsers";
		Map<String, Object> result = HttpUtil.get(url);
		Object data=result.get("body");
		 Gson gson = new Gson();
		 Map<String, Object> mapdata=gson.fromJson((String) data, new TypeToken<Map<String, Object>>(){
         }.getType() );		
		 modelMap.addAttribute("users", mapdata.get("body"));
		return "log";
	}
	@RequestMapping("/usersview")
	public String usersview(){
		return "usersView";
	}
}
