package com.example.SmileClinicBackend.com.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.example.SmileClinicBackend.com.model.User;
import com.example.SmileClinicBackend.com.model.UserWrapper;



public interface UserService {


	ResponseEntity<String> signUp(User user);

	ResponseEntity<String> login(User user);

	ResponseEntity<List<UserWrapper>> getAllUsers();

	ResponseEntity<User> getMyDetails();

	ResponseEntity<String> updateMyDetails(User user);

	ResponseEntity<String> checkToken();



}
 