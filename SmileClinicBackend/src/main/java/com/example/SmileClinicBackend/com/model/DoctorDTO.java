package com.example.SmileClinicBackend.com.model;

public class DoctorDTO {

	int dr_id;
	int departmentId;
	String name;
	String description;
	String department_name;
	int fees;
	public DoctorDTO(int dr_id, int departmentId, String name, String description, String department_name, int fees) {
		super();
		this.dr_id = dr_id;
		this.departmentId = departmentId;
		this.name = name;
		this.description = description;
		this.department_name = department_name;
		this.fees = fees;
	}
	public DoctorDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getDr_id() {
		return dr_id;
	}
	public void setDr_id(int dr_id) {
		this.dr_id = dr_id;
	}
	public int getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(int departmentId) {
		this.departmentId = departmentId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getDepartment_name() {
		return department_name;
	}
	public void setDepartment_name(String department_name) {
		this.department_name = department_name;
	}
	public int getFees() {
		return fees;
	}
	public void setFees(int fees) {
		this.fees = fees;
	}
	
	
	
	
}
