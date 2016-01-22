package cn.park.controller;

import java.util.Map;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import cn.park.model.Constants;
import cn.park.service.HttpUtil;
@Controller
public class usersController {
	@RequestMapping("/")
	public String index(){
		return "index";
	}
	@RequestMapping("/help")
	public String index1(){
		return "help";
	}
	@RequestMapping(value = "/getAllUsers")
	@ResponseBody
	public Object getAllUsers(){
		String url =Constants.WEBAPIURL+"/getAllUsers";
		Map<String, Object> result = HttpUtil.get(url);
		return result.get("body");
	}
	@RequestMapping(value = "/getUserByName/{username}")
	@ResponseBody
	public Object getUserByName(@PathVariable("username")String username){
		String url = Constants.WEBAPIURL+"/getUserByName/"+username;
		Map<String, Object> result = HttpUtil.get(url);
		return result.get("body");
	}
	@RequestMapping(value = "/deleteUserById/{id}")
	@ResponseBody
	public Object deleteUserById(@PathVariable("id")int id){
		String url = Constants.WEBAPIURL+"/deleteUserById/"+id;
		Map<String, Object> result = HttpUtil.get(url);
		return result.get("body");
	}
	@RequestMapping("/usermanage")
	public String usermanage(){
		return "userManage";
	}
}
