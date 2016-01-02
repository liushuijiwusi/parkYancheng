package cn.park.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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
		String url = "http://120.25.153.123/parkshow/getAllUsers";
		Map<String, Object> result = HttpUtil.get(url);
		return result.get("body");
	}
}
