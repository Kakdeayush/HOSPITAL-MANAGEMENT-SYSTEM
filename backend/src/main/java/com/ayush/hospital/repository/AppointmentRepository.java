package com.ayush.hospital.repository;

import com.ayush.hospital.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByDoctorDoctorId(Long doctorId);

    List<Appointment> findByPatientPatientId(Long patientId);

}