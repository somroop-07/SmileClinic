package com.example.SmileClinicBackend.com.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.SmileClinicBackend.com.constants.ClinicConstants;
import com.example.SmileClinicBackend.com.model.User;
import com.example.SmileClinicBackend.com.model.UserWrapper;
import com.example.SmileClinicBackend.com.service.UserService;

import com.example.SmileClinicBackend.com.utils.ClinicUtils;



@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	@PostMapping(path = "/signup")
	public ResponseEntity<String> signUp(@RequestBody User user) {
		try {
			return userService.signUp(user);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return ClinicUtils.getResponseEntity(ClinicConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@PostMapping(path="/login")
	public ResponseEntity<String> login(@RequestBody User user){
		try {
			return userService.login(user);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return ClinicUtils.getResponseEntity(ClinicConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping(path="/users")
	public ResponseEntity<List<UserWrapper>> getAllUsers(){
		try {
			return userService.getAllUsers();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping(path="/mydetails")
		public ResponseEntity<User> getMyDetails(){
			try {
				return userService.getMyDetails();

			} catch (Exception e) {
				e.printStackTrace();
			}
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	
	@PutMapping(path="/mydetails")
		public ResponseEntity<String> updateMyDetails(@RequestBody User user){
			try {
				return userService.updateMyDetails(user);

			} catch (Exception e) {
				e.printStackTrace();
			}
			return ClinicUtils.getResponseEntity(ClinicConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	@GetMapping(path="/checktoken")
	public ResponseEntity<String> checkToken(){
		try {
			return userService.checkToken();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return ClinicUtils.getResponseEntity(ClinicConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
}
