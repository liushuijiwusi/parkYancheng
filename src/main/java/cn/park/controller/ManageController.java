package cn.park.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ManageController {
	@RequestMapping("/announcement")
	public String announcement(){
		return "announcement";
	}
	@RequestMapping("/parkchart")
	public String parkchart(){
		return "parkchart";
	}
	@RequestMapping("/parkupdate")
	public String parkupdate(){
		return "parkupdate";
	}
	@RequestMapping("/parkinfo")
	public String parkinfo(){
		return "parkinfo";
	}
	@RequestMapping("/log")
	public String log(){
		return "log";
	}
}
