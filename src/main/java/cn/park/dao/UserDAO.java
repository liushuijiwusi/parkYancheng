package cn.park.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import cn.park.model.User;
import cn.park.model.UserDetail;

@Repository
public interface UserDAO {

	List<User> getUsers();
	
	public List<UserDetail> getUserDetail(@Param("low")int low, @Param("count")int count);
	
	public int getUserCount();
	
	int insertUser(User userItem);
	
	String getUserPassword(String userName);
	
	int getUserCountByUserName(String userName);
	
	int getUserCountByNumber(String number);
	
	int getUserIdByNumber(String number);
	
}
