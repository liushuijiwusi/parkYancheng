package cn.park.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import cn.park.service.HttpUtil;

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
	@RequestMapping("pay")
	public String pay(){
		return "pay";
	}
	@RequestMapping("/manage")
	public String manage(){
		return "parkinfo";
	}
	@RequestMapping("/register")
	public String register(){
		return "register";
	}
	@RequestMapping(value = "/registerYancheng", method = RequestMethod.POST, produces = "text/html; charset=UTF-8")
	@ResponseBody
	public Object registerYancheng(@RequestParam("username")String username,@RequestParam("password")String password){	
		String url = "http://120.25.153.123/parkshow/registerYancheng";
		Map<String, Object> args=new HashMap<String, Object>();
		args.put("username", username);
		args.put("password", password);
		Map<String, Object> result = HttpUtil.post(url, args);
		Object data=result.get("body");
		 Gson gson = new Gson();
		 Map<String, Object> mapdata=gson.fromJson((String) data, new TypeToken<Map<String, Object>>(){
        }.getType() );
		 String status=(String) mapdata.get("status");
		 if (status.equals("1001")) {
			return "<script>alert('注册成功');window.location.href='login'</script>";
		}
		 else
			 return "<script>alert('注册失败');</script>";
	}
	@RequestMapping("/hello")
	@ResponseBody
	public Map<String, String> hello(){
		Map<String, String> m=new HashMap<String,String>();
		m.put("01", "map01");
		return m;
	}

}
