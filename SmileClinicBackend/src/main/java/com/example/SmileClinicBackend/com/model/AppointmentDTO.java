package com.example.SmileClinicBackend.com.model;

import java.time.LocalDate;


public class AppointmentDTO {
    public AppointmentDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	private int appointmentId;
    private String doctorName;
    private String departmentName;
    private int slotId;
    private Boolean isCancelled;
    private LocalDate date;

    // Constructor
    public AppointmentDTO(int appointmentId, String doctorName, String departmentName,
                          int slotId, Boolean isCancelled, LocalDate date) {
        this.appointmentId = appointmentId;
        this.doctorName = doctorName;
        this.departmentName = departmentName;
        this.slotId = slotId;
        this.isCancelled = isCancelled;
        this.date = date;
    }

    // Getters and Setters
    public int getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(int appointmentId) {
        this.appointmentId = appointmentId;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
