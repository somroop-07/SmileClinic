package com.example.SmileClinicBackend.com.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "appointments")
public class Appointment {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int appointmentId;
	
	@Column(name = "user_id", nullable = false)
    private int userId;

    @Column(name = "dr_id", nullable = false)
    private int drId;
    
    @Column(name = "date", nullable = false)
    //2007-12-03 --> Format
    private LocalDate date;

    @Column(name = "slot_id", nullable = false)
    private int slotId;

    @Column(name = "is_cancelled", nullable = false)
    private Boolean isCancelled = false;

	public Appointment() {
		super();
	}

	public Appointment(int appointmentId, int userId, int drId, LocalDate date, int slotId, Boolean isCancelled) {
		super();
		this.appointmentId = appointmentId;
		this.userId = userId;
		this.drId = drId;
		this.date = date;
		this.slotId = slotId;
		this.isCancelled = isCancelled;
	}

	public int getAppointmentId() {
		return appointmentId;
	}

	public void setAppointmentId(int appointmentId) {
		this.appointmentId = appointmentId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getDrId() {
		return drId;
	}

	public void setDrId(int drId) {
		this.drId = drId;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public int getSlotId() {
		return slotId;
	}

	public void setSlotId(int slotId) {
		this.slotId = slotId;
	}

	public Boolean getIsCancelled() {
		return isCancelled;
	}

	public void setIsCancelled(Boolean isCancelled) {
		this.isCancelled = isCancelled;
	}
	
	
    
    
}
