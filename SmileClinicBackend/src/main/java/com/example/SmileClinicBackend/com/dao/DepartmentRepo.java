package com.example.SmileClinicBackend.com.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.SmileClinicBackend.com.model.Department;

public interface DepartmentRepo extends JpaRepository<Department,Integer>{

	Department findByDepartment(String department_name);
	
	//Native SQL
	 @Query(value = "SELECT * FROM department d WHERE EXISTS (SELECT 1 FROM doctors doc WHERE doc.department_id = d.department_id)", nativeQuery = true)
	    List<Department> findDepartmentsWithDoctors();

}
