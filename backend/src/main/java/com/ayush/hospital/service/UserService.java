package com.ayush.hospital.service;

import com.ayush.hospital.model.User;
import com.ayush.hospital.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final EmailService emailService;

    // ✅ ONLY ONE CONSTRUCTOR
    public UserService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    // ✅ REGISTER
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    // ✅ GET ALL USERS
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ FORGOT PASSWORD
    public String generateResetToken(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = UUID.randomUUID().toString();

        user.setResetToken(token);
        userRepository.save(user);

        // ✅ SEND EMAIL
        emailService.sendResetEmail(email, token);

        return "Reset link sent to email";
    }

    // ✅ RESET PASSWORD
    public String resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        user.setPassword(newPassword);
        user.setResetToken(null);

        userRepository.save(user);

        return "Password updated successfully";
    }
}