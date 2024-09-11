package com.example.SmileClinicBackend.com.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.example.SmileClinicBackend.com.model.Department;

public interface DepartmentService {

	ResponseEntity<String> addDepartment(Department department);

	ResponseEntity<String> updateDepartment(Department department);

	ResponseEntity<List<Department>> getAllDepartments(String isUser);

	ResponseEntity<String> deleteDepartment(int departmentId);



}
