package com.example.SmileClinicBackend.com.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.SmileClinicBackend.com.constants.ClinicConstants;
import com.example.SmileClinicBackend.com.model.Department;
import com.example.SmileClinicBackend.com.service.DepartmentService;
import com.example.SmileClinicBackend.com.utils.ClinicUtils;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class DepartmentController {
	
	@Autowired
	DepartmentService departmentService;
	
	@PostMapping(path="departments")
	public ResponseEntity<String> addDepartment(@RequestBody Department department){
		try {
			return departmentService.addDepartment(department);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return ClinicUtils.getResponseEntity(ClinicConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@PutMapping(path="departments")
	public ResponseEntity<String> updateDepartment(@RequestBody Department department){
		try {
			return departmentService.updateDepartment(department);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return ClinicUtils.getResponseEntity(ClinicConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	@GetMapping(path="departments")
	public ResponseEntity<List<Department>> getAllDepartments(@RequestParam(required=false) String isUser){
		try {
			return departmentService.getAllDepartments(isUser);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
	}
	@DeleteMapping(path="departments/{departmentId}")
	public ResponseEntity<String> deleteDepartment(@PathVariable("departmentId") int departmentId){
		try {
			return departmentService.deleteDepartment(departmentId);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return ClinicUtils.getResponseEntity(ClinicConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	}
 
}
