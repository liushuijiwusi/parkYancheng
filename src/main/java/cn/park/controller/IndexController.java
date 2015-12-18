package cn.park.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class IndexController {
	@RequestMapping("/")
	public String index(){
		return "index";
	}
	@RequestMapping("/help")
	public String index1(){
		return "help";
	}
}
