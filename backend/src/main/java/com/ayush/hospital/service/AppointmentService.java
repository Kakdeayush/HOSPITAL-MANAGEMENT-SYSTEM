package com.ayush.hospital.service;

import com.ayush.hospital.model.Appointment;
import com.ayush.hospital.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository){
        this.appointmentRepository = appointmentRepository;
    }

    public Appointment bookAppointment(Appointment appointment){
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAppointments(){
        return appointmentRepository.findAll();
    }

    public void cancelAppointment(Long id){
        appointmentRepository.deleteById(id);
    }

    public List<Appointment> getAppointmentsByDoctor(Long doctorId){
        return appointmentRepository.findByDoctorDoctorId(doctorId);
    }

    public List<Appointment> getAppointmentsByPatient(Long patientId){
        return appointmentRepository.findByPatientPatientId(patientId);
    }

    public Appointment updateAppointmentStatus(Long id, String status){

        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setStatus(status);

        return appointmentRepository.save(appointment);
    }
}