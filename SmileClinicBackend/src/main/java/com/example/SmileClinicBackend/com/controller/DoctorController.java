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
import org.springframework.web.bind.annotation.RestController;

import com.example.SmileClinicBackend.com.constants.ClinicConstants;
import com.example.SmileClinicBackend.com.model.Doctor;
import com.example.SmileClinicBackend.com.model.DoctorDTO;
import com.example.SmileClinicBackend.com.service.DoctorService;
import com.example.SmileClinicBackend.com.utils.ClinicUtils;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class DoctorController {

	
	@Autowired
	DoctorService doctorService;
	
	@PostMapping(path="/doctors")
	public ResponseEntity<String> addDoctors(@RequestBody Doctor doctor){
		try {
			return doctorService.addDoctors(doctor);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return ClinicUtils.getResponseEntity(ClinicConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@PutMapping(path="/doctors")
	public ResponseEntity<String> updateDoctors(@RequestBody Doctor doctor){
		try {
			return doctorService.updateDoctors(doctor);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return ClinicUtils.getResponseEntity(ClinicConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping(path="/doctors")
	public ResponseEntity<List<DoctorDTO>> getDoctors(){
		try {
			return doctorService.getAllDoctors();
	}
		catch(Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
		
	}
	
	@GetMapping(path="/doctors/{departmentId}")
	public ResponseEntity<List<Doctor>> getDoctorsByDepartment(@PathVariable("departmentId") int departmentId){
		try {
			return doctorService.getDoctorsByDepartment(departmentId);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@DeleteMapping(path="/doctors/{dr_id}")
	public ResponseEntity<String> deleteDoctor(@PathVariable("dr_id") int id){
		try {
			return doctorService.deleteDoctor(id);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return ClinicUtils.getResponseEntity(ClinicConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	
}
