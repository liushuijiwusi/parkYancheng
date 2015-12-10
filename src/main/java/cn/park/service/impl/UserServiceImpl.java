package cn.park.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.park.dao.UserDAO;
import cn.park.model.User;
import cn.park.service.UserService;


@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserDAO userDAO;
	
	
}
