package com.ayush.hospital.controller;

import com.ayush.hospital.model.Doctor;
import com.ayush.hospital.service.DoctorService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService){
        this.doctorService = doctorService;
    }

    @PostMapping
    public Doctor addDoctor(@RequestBody Doctor doctor){
        return doctorService.saveDoctor(doctor);
    }

    @GetMapping
    public List<Doctor> getDoctors(){
        return doctorService.getAllDoctors();
    }
}