package com.example.SmileClinicBackend.com.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;

import com.example.SmileClinicBackend.com.model.Appointment;
import com.example.SmileClinicBackend.com.model.AppointmentAdminDTO;
import com.example.SmileClinicBackend.com.model.AppointmentDTO;

public interface AppointmentService {

	ResponseEntity<String> bookAppointment(Appointment appointment);

	ResponseEntity<String> cancelAppointment(Appointment appointment);

	ResponseEntity<List<AppointmentDTO>> getMyBookings();

	ResponseEntity<List<AppointmentAdminDTO>> getBookingsDateWise(LocalDate date);

	ResponseEntity<List<Integer>> getSlots(int drId, LocalDate date);

}
