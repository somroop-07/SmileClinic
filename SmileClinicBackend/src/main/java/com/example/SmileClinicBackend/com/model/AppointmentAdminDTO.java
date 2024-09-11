package com.example.SmileClinicBackend.com.model;

import java.time.LocalDate;

public class AppointmentAdminDTO {

	private int appointmentId;
    private String doctorName;
    private String departmentName;
    private String userName;
    private String userMobile;
    private String userEmail;
    
    public AppointmentAdminDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public AppointmentAdminDTO(int appointmentId, String doctorName, String departmentName, String userName,
			String userMobile, String userEmail, int slotId, Boolean isCancelled, LocalDate date) {
		super();
		this.appointmentId = appointmentId;
		this.doctorName = doctorName;
		this.departmentName = departmentName;
		this.userName = userName;
		this.userMobile = userMobile;
		this.userEmail = userEmail;
		this.slotId = slotId;
		this.isCancelled = isCancelled;
		this.date = date;
	}
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
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserMobile() {
		return userMobile;
	}
	public void setUserMobile(String userMobile) {
		this.userMobile = userMobile;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
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
	private int slotId;
    private Boolean isCancelled;
    private LocalDate date;
}
