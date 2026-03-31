package com.ayush.hospital.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="doctors")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doctor_id")
    private Long doctorId;

    private String specialization;

    private int experience;

    private String phone;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}