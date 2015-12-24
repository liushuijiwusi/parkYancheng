package cn.park.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
public class myController {
	@RequestMapping("/my")
	public String parkchart(){
		return "parkinfomy";
	}
}
