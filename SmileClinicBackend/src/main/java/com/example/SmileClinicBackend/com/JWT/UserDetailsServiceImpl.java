package com.example.SmileClinicBackend.com.JWT;

import java.util.ArrayList;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.SmileClinicBackend.com.dao.UserRepo;
import com.example.SmileClinicBackend.com.model.User;
import com.example.SmileClinicBackend.com.model.UserDetailsImpl;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

	@Autowired
	UserRepo userRepo;
	
	private User user;
	
	//Method to check if user present in database
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	    user=userRepo.findByEmail(username);
		if(!Objects.isNull(user))
				return new UserDetailsImpl(user);
		else
		throw new UsernameNotFoundException("user Not Found");	
	}
   public User getUserDetails(){
	   return user;
   }
}
