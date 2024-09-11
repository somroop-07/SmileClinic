package com.example.SmileClinicBackend.com.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.example.SmileClinicBackend.com.model.Doctor;
import com.example.SmileClinicBackend.com.model.DoctorDTO;

public interface DoctorService {

	ResponseEntity<String> addDoctors(Doctor doctor);

	ResponseEntity<String> updateDoctors(Doctor doctor);

	ResponseEntity<List<DoctorDTO>> getAllDoctors();

	ResponseEntity<List<Doctor>> getDoctorsByDepartment(int departmentId);

	ResponseEntity<String> deleteDoctor(int id);

}