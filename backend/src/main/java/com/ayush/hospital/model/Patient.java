package com.ayush.hospital.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="patients")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="patient_id")
    private Long patientId;

    private Integer age;

    private String gender;

    private String phone;

    private String address;

    private String blood_group;

    @OneToOne
    @JoinColumn(name="user_id")
    private User user;
}