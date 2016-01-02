package cn.park.model;

import java.sql.Date;


public class UserDetail {
	public int Id;
	private String userName;
	private String number;
	public Date date;
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public int getId() {
		return Id;
	}
	public String getUserName() {
		return userName;
	}
	public String getNumber() {
		return number;
	}
	public void setId(int id) {
		Id = id;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	
	
}
