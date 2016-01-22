package cn.park.controller;

import java.io.Console;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicHeader;
import org.apache.http.protocol.HTTP;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.apache.commons.fileupload.DiskFileUpload;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FileUtils;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import cn.park.model.Constants;

import cn.park.service.HttpUtil;
import cn.park.service.Utility;
@Controller
public class ApiController {
	//accessController
	@RequestMapping(value="/getAccessDetail",method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public String accessIndex(HttpServletRequest request,@RequestParam("low")int low, @RequestParam("count")int count,
			@RequestParam(value = "parkId", required = false)Integer parkId) {
		
		String url;
		if (parkId!=null) {
			url=Constants.WEBAPIURL+"/getAccessDetail?"+"low="+low+"&&count="+count+"&&parkId"+parkId;
		} else {
			url=Constants.WEBAPIURL+"/getAccessDetail?"+"low="+low+"&&count="+count;
		}
		Map<String, Object> result = HttpUtil.get(url);
		return Utility.gson.toJson(result.get("body"));
	}
	@RequestMapping(value = "/getHourCountByPark", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public Object getHourCountByPark(@RequestBody Map<String, Object> args) throws ParseException{
		String url = Constants.WEBAPIURL+"/getHourCountByPark";
		Map<String, Object> result = HttpUtil.post(url, args);
		return result.get("body");
	}
	@RequestMapping(value = "/insert/park", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public Object insertPark(@RequestBody Map<String, Object> args){	
		String url = Constants.WEBAPIURL+"/insert/park";
		Map<String, Object> result = HttpUtil.post(url, args);
		return result.get("body");
	}
	@RequestMapping(value = "/update/park", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public Object updatePark(@RequestBody Map<String, Object> args){	
		String url = Constants.WEBAPIURL+"/update/park";
		Map<String, Object> result = HttpUtil.post(url, args);
		return result.get("body");
	}
	@RequestMapping(value = "/getDayCountByPark", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public Object getMonthCountByPark(@RequestBody Map<String, Object> args){	
		String url = Constants.WEBAPIURL+"/getDayCountByPark";
		Map<String, Object> result = HttpUtil.post(url, args);
		return result.get("body");
	}
	//parkController
	@RequestMapping(value = "/getPark/{id}", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public Object getParkById(@PathVariable int id){
		String url = Constants.WEBAPIURL+"/getPark/"+id;
		Map<String, Object> result = HttpUtil.get(url);
		return result.get("body");
	}
	
	
	@RequestMapping(value = "/getNewsByParkId/{id}", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public Object getNewsByParkId(@PathVariable int id){
		String url = Constants.WEBAPIURL+"/getNewsByParkId/"+id;
		Map<String, Object> result = HttpUtil.get(url);
		return result.get("body");
	}	
//获取包含盐城的数据
	@RequestMapping(value = "/getParks", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public Object getParks(ModelMap modelMap, HttpServletRequest request, HttpSession session){
		String url = Constants.WEBAPIURL+"/getParks";
		Map<String, Object> result = HttpUtil.get(url);
	
		return result.get("body");
	}
	@RequestMapping(value = "/getParkDetail", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public Object getParkDetail(@RequestBody Map<String, Object> args){
		String url =Constants.WEBAPIURL+"/getParkDetail";
		Map<String, Object> result = HttpUtil.post(url, args);
		return result.get("body");
	}
	@RequestMapping(value = "/insertUserYanchengLoginLog", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public Object insertUserYanchengLoginLog(@RequestBody Map<String, Object> args){
		String url = Constants.WEBAPIURL+"/insertUserYanchengLoginLog";
		Map<String, Object> result = HttpUtil.post(url, args);
		return result.get("body");
	}
	@RequestMapping(value = "/getUserYanchengLoginLog", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public Object getUserYanchengLoginLog(@RequestBody Map<String, Object> args){
		String url = Constants.WEBAPIURL+"/getUserYanchengLoginLog";
		Map<String, Object> result = HttpUtil.post(url, args);
		return result.get("body");
	}
	
	
	/**
	 * 这里这里用的是MultipartFile[] myfiles参数,所以前台就要用<input type="file"
	 * name="myfiles"/>
	 * 上传文件完毕后返回给前台[0`filepath],0表示上传成功(后跟上传后的文件路径),1表示失败(后跟失败描述)
	 */
	static public int filePrefix = 0;
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	@ResponseBody
	public String uploadPicture(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {
		String aa=request.getCharacterEncoding();
		if (request.getCharacterEncoding() == null) {
		//	request.setCharacterEncoding("UTF-8");//你的编码格式
			}
		// 创建一个通用的多部分解析器
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(
				request.getSession().getServletContext());
		// 判断 request 是否有文件上传,即多部分请求
		if (multipartResolver.isMultipart(request)) {
			// 转换成多部分request
			MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
			// 取得request中的所有文件名
			Iterator<String> iter = multiRequest.getFileNames();			
			Map<String, Object> body = new HashMap<String, Object>();
			List<String> uriList = new ArrayList<String>();
			while (iter.hasNext()) {
				// 记录上传过程起始时的时间，用来计算上传时间
				// 取得上传文件
				MultipartFile file = multiRequest.getFile(iter.next());
				if (file != null) {
					// 取得当前上传文件的文件名称
					String myFileName = file.getOriginalFilename();
					// 如果名称不为“”,说明该文件存在，否则说明该文件不存在
					if (myFileName.trim() != "") {
						// 重命名上传后的文件名
						ApiController.filePrefix++;
						//String fileName = "" + new Date().getTime() + file.getOriginalFilename();
						String fileName = UUID.randomUUID()+myFileName.substring(myFileName.lastIndexOf("."));
						// 定义上传路径
						String path = Constants.UPLOADDIR + fileName;
						File localFile = new File(path);
						try {
							file.transferTo(localFile);
						} catch (IllegalStateException | IOException e) {
							e.printStackTrace();
							break;
						}
						uriList.add(Constants.URL + fileName);
					}
				}
			}
			body.put("uri", uriList);
			return Utility.createJsonMsg(1001, "upload file success", body);
		}
		return Utility.createJsonMsg(1002, "upload failed");
	}

	@RequestMapping(value = "/getParkByName", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public String getParkByName(@RequestBody Map<String, Object> args){
		String url = Constants.WEBAPIURL+"/getParkByName";
		Map<String, Object> result = HttpUtil.post(url, args);
		return Utility.gson.toJson(result.get("body"));
	}
	@RequestMapping(value = "/update/parkFields", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public Object updateParkFields(@RequestBody Map<String, Object> args){
		String url = Constants.WEBAPIURL+"/update/parkFields";
		Map<String, Object> result = HttpUtil.post(url, args);
		return result.get("body");
	}
	
	@RequestMapping(value = "/getParkCount", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public Object getParkCount(){
		String url = Constants.WEBAPIURL+"/getParkCount/";
		Map<String, Object> result = HttpUtil.get(url);
		return result.get("body");
	}
	@RequestMapping(value="/insert/parkNews")
	@ResponseBody
	public Object insertParkNews(@RequestBody Map<String, Object> args){
		String url = Constants.WEBAPIURL+"/insert/parkNews";
		Map<String, Object> result = HttpUtil.post(url, args);
		return result.get("body");
	}
	@RequestMapping(value = "/authorityWeb", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
	public String authorityWeb(@RequestParam("username")String username,@RequestParam("password")String password,HttpSession session){
		Map<String, Object> args=new HashMap<String, Object>();
		args.put("username", username);
		args.put("password", password);
		String url = "http://120.25.153.123/parkshow/authorityWeb";
		Map<String, Object> result = HttpUtil.post(url, args);
		System.out.println(result);
		Object data=result.get("body");
		 Gson gson = new Gson();
		 Map<String, Object> mapdata=gson.fromJson((String) data, new TypeToken<Map<String, Object>>(){
         }.getType() );
		 System.out.println(mapdata.get("isAllow"));
		 Boolean isAllow=(Boolean) mapdata.get("isAllow");
		 Boolean isAdmin=(Boolean) mapdata.get("isAdmin");
		 if (isAdmin!=null&&isAdmin) {
			 session.setAttribute("username", username);
			 session.setAttribute("isAdmin", true);
			return "redirect:/manage";
		}
		 else if (isAllow!=null&&isAllow) {
			session.setAttribute("username", username);
			 session.setAttribute("isAdmin", false);
			return "redirect:/parkinfomy";
		}
		 //访问用户表 看是否允许访问
		 String url1 = Constants.WEBAPIURL+"/userValidation";
		 Map<String, Object> result1 = HttpUtil.post(url1, args);
		 Object object1=result1.get("body");
		 Map<String, Object> mapdata1=gson.fromJson((String) object1,new TypeToken<Map<String, Object>>(){
         }.getType() );
		 String status=(String) mapdata1.get("status");
		 if (status.equals("1001")) {
			 session.setAttribute("username", username);
			 session.setAttribute("isAdmin", false);
			 String url2 = Constants.WEBAPIURL+"/insertUserYanchengLoginLog";
			 Map<String, Object> args2=new HashMap<>();
			 args2.put("username", username);
				Map<String, Object> result2 = HttpUtil.post(url2,args2 );
			return "redirect:/parkinfomy";
		}
	//	 String isAllow=(String) mapdata.get("isAllow");
		return (String)data;
	}
}
