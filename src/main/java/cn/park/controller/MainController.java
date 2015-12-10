package cn.park.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainController {

	@RequestMapping("/index")
	public String index(){
		//System.out.println(111);
		return "index";
	}
	@RequestMapping("/login")
	public String login(){
		//System.out.println(111);
		return "login";
	}
	@RequestMapping("/map")
	public String map(){
		return "map";
	}
	@RequestMapping("/parking")
	public String parking(){
		return "parking";
	}
	@RequestMapping("/pay")
	public String pay(){
		return "pay";
	}
	@RequestMapping("/hello")
	@ResponseBody
	public Map<String, String> hello(){
		Map<String, String> m=new HashMap<String,String>();
		m.put("01", "map01");
		return m;
	}
	@RequestMapping("/hello1")
	@ResponseBody
	public String hello1(){
		return "hello1";
	}
	@RequestMapping("/hello2")
	@ResponseBody
	public String hello2(){
		return "hello2";
	}
}
