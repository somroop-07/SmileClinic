package com.example.SmileClinicBackend.com.serviceImpl;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.SmileClinicBackend.com.JWT.JwtFilter;
import com.example.SmileClinicBackend.com.constants.ClinicConstants;
import com.example.SmileClinicBackend.com.dao.DoctorRepo;
import com.example.SmileClinicBackend.com.model.Doctor;
import com.example.SmileClinicBackend.com.model.DoctorDTO;
import com.example.SmileClinicBackend.com.service.DoctorService;
import com.example.SmileClinicBackend.com.utils.ClinicUtils;

@Service
public class DoctorServiceImpl implements DoctorService {

	@Autowired
	DoctorRepo doctorRepo;
	
	@Autowired
	JwtFilter jwtFilter;
	
	@Override
	public ResponseEntity<String> addDoctors(Doctor doctor) {
		 try {
	    	   if(jwtFilter.isAdmin()) {
				
					doctorRepo.save(doctor);
					return ClinicUtils.getResponseEntity(ClinicConstants.DOCTOR_ADDED, HttpStatus.OK);
	    	   }
	    	   else return ClinicUtils.getResponseEntity(ClinicConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
			}
			catch(Exception e) {
				e.printStackTrace();
			}
			return ClinicUtils.getResponseEntity(ClinicConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<String> updateDoctors(Doctor doctor) {
		try {
			if(jwtFilter.isAdmin()) {
			Optional<Doctor> existingCheck=doctorRepo.findById(doctor.getDr_id()); 
				if(existingCheck.isPresent()){
					doctorRepo.save(doctor);
					return ClinicUtils.getResponseEntity(ClinicConstants.DETAILS_UPDATED, HttpStatus.OK);
				}
				else {
					return ClinicUtils.getResponseEntity(ClinicConstants.DOCTOR_NOTFOUND, HttpStatus.BAD_REQUEST);
				}
			}
			 else return ClinicUtils.getResponseEntity(ClinicConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return ClinicUtils.getResponseEntity(ClinicConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<List<DoctorDTO>> getAllDoctors() {
		try {
			List<DoctorDTO> doctorList=doctorRepo.findAllDoctors();
			return new ResponseEntity<>(doctorList,HttpStatus.OK);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
		
	}

	@Override
	public ResponseEntity<List<Doctor>> getDoctorsByDepartment(int departmentId) {
		try{
			List<Doctor> doctorList=doctorRepo.findByDepartmentId(departmentId);
			return new ResponseEntity<>(doctorList,HttpStatus.OK);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<String> deleteDoctor(int id) {
		try {
			if(jwtFilter.isAdmin()) {
			Optional<Doctor> existingCheck=doctorRepo.findById(id); 
				if(existingCheck.isPresent()){
					doctorRepo.deleteById(id);
					return ClinicUtils.getResponseEntity(ClinicConstants.DELETED, HttpStatus.OK);
				}
				else {
					return ClinicUtils.getResponseEntity(ClinicConstants.DOCTOR_NOTFOUND, HttpStatus.BAD_REQUEST);
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
