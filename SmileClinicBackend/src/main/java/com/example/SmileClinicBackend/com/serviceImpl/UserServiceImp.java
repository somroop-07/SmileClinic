package com.example.SmileClinicBackend.com.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.SmileClinicBackend.com.JWT.JwtFilter;
import com.example.SmileClinicBackend.com.JWT.JwtUtil;
import com.example.SmileClinicBackend.com.JWT.UserDetailsServiceImpl;
import com.example.SmileClinicBackend.com.constants.ClinicConstants;
import com.example.SmileClinicBackend.com.dao.UserRepo;
import com.example.SmileClinicBackend.com.model.User;
import com.example.SmileClinicBackend.com.model.UserWrapper;
import com.example.SmileClinicBackend.com.service.UserService;
import com.example.SmileClinicBackend.com.utils.ClinicUtils;

@Service
public class UserServiceImp implements UserService {

	@Autowired
	UserRepo userRepo;

	@Autowired
	AuthenticationManager manager;

	@Autowired
	JwtUtil jwtUtil;
	
	@Autowired
	UserDetailsServiceImpl userDetails;
	
	@Autowired
	JwtFilter jwtFilter;

	@Override
	public ResponseEntity<String> signUp(User user) {
		try {
			User userNew = userRepo.findByEmail(user.getEmail());
			if (Objects.isNull(userNew)) {
				BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
				user.setPassword(encoder.encode(user.getPassword()));
				userRepo.save(user);
				return ClinicUtils.getResponseEntity(ClinicConstants.REGISTERED_SUCCESS, HttpStatus.OK);
			} else {
				return ClinicUtils.getResponseEntity(ClinicConstants.EMAIL_EXISTS, HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ClinicUtils.getResponseEntity(ClinicConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);

	}

	@Override
	public ResponseEntity<String> login(User user) {
		try {
			
			//Declared inside securityconfig
			Authentication auth=manager.authenticate(
					new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword())); //token generated using credentials
			if(auth.isAuthenticated()) {
				return new ResponseEntity<String>("{\"token\":\""
			    +jwtUtil.generateToken(user.getEmail(),
			    		               userDetails.getUserDetails().getRole()) +"\"}",
			                            HttpStatus.OK);
			}
			
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return ClinicUtils.getResponseEntity(ClinicConstants.BAD_CREDENTIALS, HttpStatus.BAD_REQUEST);
	}

	@Override
	public ResponseEntity<List<UserWrapper>> getAllUsers() {
       try {
    	   if(jwtFilter.isAdmin()) {
    	   List<User> userAll=userRepo.findByRole("user");
    	   List<UserWrapper> userList=new ArrayList<>();
    	   for(User user:userAll) {
    		   userList.add(new UserWrapper(user.getUser_id(),user.getName(),user.getEmail(),
    				   user.getPassword(),user.getMobile()));
    	   }
    	   return new ResponseEntity<>(userList, HttpStatus.OK);
    	   }
    	   else {
    		   return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
    	   }
       }
       catch(Exception e) {
    	   e.printStackTrace();
       }
       return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<User> getMyDetails() {
		try {
		String username = ((UserDetails) SecurityContextHolder
				.getContext().getAuthentication().getPrincipal()).getUsername();
		User myDetails=userRepo.findByEmail(username);
		return new ResponseEntity<>(myDetails,HttpStatus.OK);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<String> updateMyDetails(User user) {
		try {
			String username = ((UserDetails) SecurityContextHolder
					.getContext().getAuthentication().getPrincipal()).getUsername();
			User prevDetails=userRepo.findByEmail(username);
			if(prevDetails.getUser_id()==(user.getUser_id())) {
				
				//Scenario when email id is changed by user
				if(!(prevDetails.getEmail().equals(user.getEmail()))) {
					return ClinicUtils.getResponseEntity(ClinicConstants.EMAIL_CANNOT_CHANGE, HttpStatus.BAD_REQUEST);	
				}
				//Scenario when password is changed
				if(!prevDetails.getPassword().equals(user.getPassword())) {
					BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
					user.setPassword(encoder.encode(user.getPassword()));
				}
					userRepo.save(user);
					return ClinicUtils.getResponseEntity(ClinicConstants.DETAILS_UPDATED,HttpStatus.OK);
				} 	
			else {
				return ClinicUtils.getResponseEntity(ClinicConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);	
			}
		}
			catch(Exception e) {
				e.printStackTrace();
			}
		return ClinicUtils.getResponseEntity(ClinicConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<String> checkToken() {
	    return ClinicUtils.getResponseEntity("true", HttpStatus.OK);
	}
		
}
