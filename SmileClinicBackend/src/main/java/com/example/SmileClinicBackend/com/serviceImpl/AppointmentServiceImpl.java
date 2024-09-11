package com.example.SmileClinicBackend.com.serviceImpl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.SmileClinicBackend.com.JWT.JwtFilter;
import com.example.SmileClinicBackend.com.constants.ClinicConstants;
import com.example.SmileClinicBackend.com.dao.AppointmentRepo;
import com.example.SmileClinicBackend.com.dao.UserRepo;
import com.example.SmileClinicBackend.com.model.Appointment;
import com.example.SmileClinicBackend.com.model.AppointmentAdminDTO;
import com.example.SmileClinicBackend.com.model.AppointmentDTO;
import com.example.SmileClinicBackend.com.model.User;
import com.example.SmileClinicBackend.com.service.AppointmentService;
import com.example.SmileClinicBackend.com.utils.ClinicUtils;

import jakarta.transaction.Transactional;

@Service
public class AppointmentServiceImpl implements AppointmentService {

	@Autowired
	AppointmentRepo appointmentRepo;

	@Autowired
	UserRepo userRepo;

	@Autowired
	JwtFilter jwtFilter;

	@Override
	/*
	 * The @Transactional annotation ensures that the method runs in a transaction.
	 * Lock will be held unless this method gets terminated If anything goes wrong,
	 * the transaction will be rolled back.
	 */
	@Transactional
	public ResponseEntity<String> bookAppointment(Appointment appointment) {
		try {
			/*
			 * This method will lock the row until the transaction is completed, ensuring no
			 * other transactions can book the same slot simultaneously.
			 */

			String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
					.getUsername();
			User myDetails = userRepo.findByEmail(username);
			appointment.setUserId(myDetails.getUser_id());
			Appointment existingAppointment = appointmentRepo.findAndLockAppointment(appointment);

			if (existingAppointment != null) {
				return ClinicUtils.getResponseEntity(ClinicConstants.SLOT_ALREADY_BOOKED, HttpStatus.CONFLICT);
			}

			appointmentRepo.save(appointment);
			// Lock is still held until this method (transaction) completes
			return ClinicUtils.getResponseEntity(ClinicConstants.BOOKING_COMPLETE, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ClinicUtils.getResponseEntity(ClinicConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	@Transactional
	public ResponseEntity<String> cancelAppointment(Appointment appointment) {
		try {
			Appointment existingAppointment = appointmentRepo.findByAppointmentId(appointment.getAppointmentId());
			if (existingAppointment != null) {
				existingAppointment.setIsCancelled(true);
				appointmentRepo.save(existingAppointment);
				return ClinicUtils.getResponseEntity(ClinicConstants.APPOINTMENT_CANCELLED, HttpStatus.OK);
			} else
				return ClinicUtils.getResponseEntity(ClinicConstants.BOOKING_NOT_FOUND, HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ClinicUtils.getResponseEntity(ClinicConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);

	}

	@Override
	public ResponseEntity<List<AppointmentDTO>> getMyBookings() {
		try {

			String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
					.getUsername();
			User myDetails = userRepo.findByEmail(username);
			List<AppointmentDTO> myAppointments = appointmentRepo.findByUserId(myDetails.getUser_id());
			return new ResponseEntity<>(myAppointments, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	@Transactional
	public ResponseEntity<List<AppointmentAdminDTO>> getBookingsDateWise(LocalDate date) {
		try {
			if (jwtFilter.isAdmin()) {
				List<AppointmentAdminDTO> listAppointments = appointmentRepo.findByDate(date);
				return new ResponseEntity<>(listAppointments, HttpStatus.OK);
			} else
				return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	@Transactional
	public ResponseEntity<List<Integer>> getSlots(int drId, LocalDate date) {
		try {
			List<Integer> bookedSlots = appointmentRepo.findSlotIdsByDateAndDoctorId(drId, date);
			return new ResponseEntity<>(bookedSlots, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
