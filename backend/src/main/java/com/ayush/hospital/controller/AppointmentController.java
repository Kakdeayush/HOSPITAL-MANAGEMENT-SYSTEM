package com.ayush.hospital.controller;

import com.ayush.hospital.model.Appointment;
import com.ayush.hospital.service.AppointmentService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService){
        this.appointmentService = appointmentService;
    }

    @PostMapping
    public Appointment bookAppointment(@RequestBody Appointment appointment){
        return appointmentService.bookAppointment(appointment);
    }

    @GetMapping
    public List<Appointment> getAppointments(){
        return appointmentService.getAppointments();
    }

    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getAppointmentsByDoctor(@PathVariable Long doctorId){
        return appointmentService.getAppointmentsByDoctor(doctorId);
    }

    @GetMapping("/patient/{patientId}")
    public List<Appointment> getAppointmentsByPatient(@PathVariable Long patientId){
        return appointmentService.getAppointmentsByPatient(patientId);
    }

    @DeleteMapping("/{id}")
    public void cancelAppointment(@PathVariable Long id){
        appointmentService.cancelAppointment(id);
    }

    @PutMapping("/{id}")
    public Appointment updateAppointmentStatus(
            @PathVariable Long id,
            @RequestBody Appointment updatedAppointment){

        return appointmentService.updateAppointmentStatus(
                id,
                updatedAppointment.getStatus()
        );
    }


}