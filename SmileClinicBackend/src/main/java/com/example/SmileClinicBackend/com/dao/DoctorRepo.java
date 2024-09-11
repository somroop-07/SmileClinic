package com.example.SmileClinicBackend.com.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.SmileClinicBackend.com.model.Doctor;
import com.example.SmileClinicBackend.com.model.DoctorDTO;



public interface DoctorRepo extends JpaRepository<Doctor,Integer>{ 
     List<Doctor> findByDepartmentId(int department_id);
     
     @Query("SELECT new com.example.SmileClinicBackend.com.model.DoctorDTO(d.dr_id,d.departmentId,d.name,d.description, dep.department,d.fees)" +
	           "FROM Doctor d " +
              "JOIN Department dep ON d.departmentId = dep.department_id ")
     List<DoctorDTO> findAllDoctors();
}
