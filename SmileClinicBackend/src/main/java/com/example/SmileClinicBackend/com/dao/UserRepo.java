package com.example.SmileClinicBackend.com.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;

import com.example.SmileClinicBackend.com.model.User;
import com.example.SmileClinicBackend.com.model.UserWrapper;


public interface UserRepo extends JpaRepository<User,Integer> {

	User findByEmail(String email);

	List<User> findByRole(String string);

	
}
