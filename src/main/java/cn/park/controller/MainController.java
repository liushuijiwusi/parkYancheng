package cn.park.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.context.annotation.Primary;
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
	public String login(HttpSession session){
		//System.out.println(111);
		 if (session.getAttribute("username")==null||session.getAttribute("isAdmin")==null) {
				return "login";
			}
		 if ((boolean)session.getAttribute("isAdmin")==true) {
			return "parkinfo";
		}	
			return "parkinfomy";		
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
	@RequestMapping("/manage")
	public String manage(){
		return "parkinfo";
	}

	@RequestMapping("/hello")
	@ResponseBody
	public Map<String, String> hello(){
		Map<String, String> m=new HashMap<String,String>();
		m.put("01", "map01");
		return m;
	}

}
