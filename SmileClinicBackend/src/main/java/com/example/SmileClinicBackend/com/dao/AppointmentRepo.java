package com.example.SmileClinicBackend.com.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import com.example.SmileClinicBackend.com.model.Appointment;
import com.example.SmileClinicBackend.com.model.AppointmentAdminDTO;
import com.example.SmileClinicBackend.com.model.AppointmentDTO;

import jakarta.persistence.LockModeType;

public interface AppointmentRepo extends JpaRepository<Appointment,Integer>{
 
  /*
   * Ensures that the row is locked for updates, 
   * preventing other transactions from reading or 
   * modifying it until the lock is released.
   * */
	@Lock(LockModeType.PESSIMISTIC_WRITE)
	@Query("SELECT a FROM Appointment a WHERE a.drId = :#{#appointment.drId} AND a.date = :#{#appointment.date} AND a.slotId = :#{#appointment.slotId} AND a.isCancelled = false" )
	Appointment findAndLockAppointment(Appointment appointment);
	
	
	@Lock(LockModeType.PESSIMISTIC_READ)
	@Query("SELECT new com.example.SmileClinicBackend.com.model.AppointmentAdminDTO(a.appointmentId,d.name, dep.department, " +
	           "u.name, u.mobile, u.email, a.slotId , a.isCancelled, a.date) " +
	           "FROM Appointment a " +
	           "JOIN User u ON a.userId = u.user_id " +
            "JOIN Doctor d ON a.drId = d.dr_id " +
            "JOIN Department dep ON d.departmentId = dep.department_id " +
             "WHERE a.date = :date")
	List<AppointmentAdminDTO> findByDate(LocalDate date);
	

	@Query("SELECT new com.example.SmileClinicBackend.com.model.AppointmentDTO(a.appointmentId,d.name, dep.department, " +
	           "a.slotId , a.isCancelled, a.date) " +
	           "FROM Appointment a " +
               "JOIN Doctor d ON a.drId = d.dr_id " +
               "JOIN Department dep ON d.departmentId = dep.department_id " +
                "WHERE a.userId = :userId")
	List<AppointmentDTO> findByUserId(int userId);
	
	@Lock(LockModeType.PESSIMISTIC_READ)
	@Query("SELECT a.slotId FROM Appointment a WHERE a.date = :date AND a.drId = :drId AND a.isCancelled = false")
	List<Integer> findSlotIdsByDateAndDoctorId(int drId,LocalDate date);

	@Lock(LockModeType.PESSIMISTIC_READ)
	Appointment findByAppointmentId(int appointmentId);
}
