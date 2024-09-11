package com.example.SmileClinicBackend.com.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.SmileClinicBackend.com.JWT.JwtFilter;
import com.example.SmileClinicBackend.com.constants.ClinicConstants;
import com.example.SmileClinicBackend.com.dao.DepartmentRepo;
import com.example.SmileClinicBackend.com.model.Department;
import com.example.SmileClinicBackend.com.service.DepartmentService;
import com.example.SmileClinicBackend.com.utils.ClinicUtils;

@Service
public class DepartmentServiceImpl implements DepartmentService {

	@Autowired
	DepartmentRepo departmentRepo;
	
	@Autowired
	JwtFilter jwtFilter;

	@Override
	public ResponseEntity<String> addDepartment(Department department) {
      try {
    	   if(jwtFilter.isAdmin()) {
			String department_name=department.getDepartment().toUpperCase();
			Department exisitngCheck=departmentRepo.findByDepartment(department_name);
			if(Objects.isNull(exisitngCheck)) {
				department.setDepartment(department_name);
				departmentRepo.save(department);
				return ClinicUtils.getResponseEntity(ClinicConstants.DEPARTMENT_ADDED, HttpStatus.OK);
			}
			else
				return ClinicUtils.getResponseEntity(ClinicConstants.DEPARTMENT_EXISTS, HttpStatus.BAD_REQUEST);
    	   }
    	   else return ClinicUtils.getResponseEntity(ClinicConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return ClinicUtils.getResponseEntity(ClinicConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<String> updateDepartment(Department department) {
		try {
	    	   if(jwtFilter.isAdmin()) {
				int department_id=department.getDepartment_id();
				Optional<Department> exisitingCheck=departmentRepo.findById(department_id);
				if(exisitingCheck.isPresent()) {
					department.setDepartment(department.getDepartment().toUpperCase());
					departmentRepo.save(department);
					return ClinicUtils.getResponseEntity(ClinicConstants.DETAILS_UPDATED, HttpStatus.OK);
				}
				else
					return ClinicUtils.getResponseEntity(ClinicConstants.DEPARTMENT_NOTFOUND, HttpStatus.BAD_REQUEST);
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
	public ResponseEntity<List<Department>> getAllDepartments(String isUser) {
		try {
			if(isUser!=null && !Strings.isEmpty(isUser) && isUser.equalsIgnoreCase("true")) {
				
				return new ResponseEntity<List<Department>>(departmentRepo.findDepartmentsWithDoctors(),HttpStatus.OK);
			}
			else {
				return new ResponseEntity<List<Department>>(departmentRepo.findAll(),HttpStatus.OK);
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<String> deleteDepartment(int departmentId) {
		try {
		if(jwtFilter.isAdmin()) {
			Optional<Department> exisitngCheck=departmentRepo.findById(departmentId);
			if(!exisitngCheck.isPresent()) {
				return ClinicUtils.getResponseEntity(ClinicConstants.DEPARTMENT_NOTFOUND, HttpStatus.BAD_REQUEST);
			}
			else {
				departmentRepo.deleteById(departmentId);
				return ClinicUtils.getResponseEntity(ClinicConstants.DELETED, HttpStatus.OK);
			}
		}	
    	   else return ClinicUtils.getResponseEntity(ClinicConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return ClinicUtils.getResponseEntity(ClinicConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	

}
