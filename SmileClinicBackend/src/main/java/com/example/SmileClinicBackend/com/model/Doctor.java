package com.example.SmileClinicBackend.com.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="doctors")
public class Doctor {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int dr_id;
	int departmentId;
	String name;
	String description;
	int fees;
	
	public Doctor() {
		super();
		
	}

	public Doctor(int dr_id, int department_id, String name, String description, int fees) {
		super();
		this.dr_id = dr_id;
		this.departmentId = department_id;
		this.name = name;
		this.description = description;
		this.fees = fees;
	}

	public int getDr_id() {
		return dr_id;
	}

	public void setDr_id(int dr_id) {
		this.dr_id = dr_id;
	}

	public int getDepartment_id() {
		return departmentId;
	}

	public void setDepartment_id(int department_id) {
		this.departmentId = department_id;
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

	public int getFees() {
		return fees;
	}

	public void setFees(int fees) {
		this.fees = fees;
	}
	
	
}
