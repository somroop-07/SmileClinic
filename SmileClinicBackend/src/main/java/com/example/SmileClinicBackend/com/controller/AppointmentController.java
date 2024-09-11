package com.example.SmileClinicBackend.com.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.SmileClinicBackend.com.constants.ClinicConstants;
import com.example.SmileClinicBackend.com.model.Appointment;
import com.example.SmileClinicBackend.com.model.AppointmentAdminDTO;
import com.example.SmileClinicBackend.com.model.AppointmentDTO;
import com.example.SmileClinicBackend.com.service.AppointmentService;
import com.example.SmileClinicBackend.com.utils.ClinicUtils;

@CrossOrigin
@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {
   
	@Autowired
	AppointmentService appointmentService;
	
	@PostMapping(path="/bookings")
	public ResponseEntity<String> bookAppointment(@RequestBody Appointment appointment){
		try {
			return appointmentService.bookAppointment(appointment);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return ClinicUtils.getResponseEntity(ClinicConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@PutMapping(path="/bookings")
	public ResponseEntity<String> cancelAppointment(@RequestBody Appointment appointment){
		try {
			return appointmentService.cancelAppointment(appointment);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return ClinicUtils.getResponseEntity(ClinicConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping(path="/myBookings")
	public ResponseEntity<List<AppointmentDTO>> getMyBookings(){
		try {
			return appointmentService.getMyBookings();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping(path="/bookings")
	public ResponseEntity<List<AppointmentAdminDTO>> getBookingsDateWise(@RequestParam("date") LocalDate date){
		try {
			return appointmentService.getBookingsDateWise(date);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping(path="/slots")
	public ResponseEntity<List<Integer>> getSlots(@RequestParam("date") LocalDate date, 
            @RequestParam("doctorId") int drId){
		try {
			return appointmentService.getSlots(drId,date);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
