package cn.park.service;

import java.util.List;

import cn.park.model.User;
import cn.park.model.UserDetail;

public interface UserService {

	List<User> getUsers();
	
	public List<UserDetail> getUserDetail(int low, int count);
	
	public int getUserCount();
	
	String insertUser(User userItem);
	
	String getUserPassword(String userName);
	
	public boolean userExistByUserName(String userName);
	
	public boolean userExistByNumber(String number);
	
	public int getUserIdByNumber(String number);
}
