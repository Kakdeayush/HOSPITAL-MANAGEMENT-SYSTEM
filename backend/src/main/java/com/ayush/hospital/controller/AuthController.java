package com.ayush.hospital.controller;

import com.ayush.hospital.model.User;
import com.ayush.hospital.repository.UserRepository;
import com.ayush.hospital.security.JwtUtil;
import com.ayush.hospital.service.EmailService;
import com.ayush.hospital.service.UserService;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;
    private final UserService userService;

    // ✅ FIXED CONSTRUCTOR (VERY IMPORTANT)
    public AuthController(UserRepository userRepository,
                          JwtUtil jwtUtil,
                          EmailService emailService,
                          UserService userService) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.emailService = emailService;
        this.userService = userService;
    }

    // ✅ LOGIN API
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("role", user.getRole());

        return response;
    }

    // ✅ FORGOT PASSWORD (SEND EMAIL)
    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestParam String email) {

        // generate token using service
        String token = userService.generateResetToken(email);

        // send email
        emailService.sendResetEmail(email, token);

        return "Reset link sent to email";
    }

    // ✅ RESET PASSWORD
    @PostMapping("/reset-password")
    public String resetPassword(@RequestParam String token,
                               @RequestParam String newPassword) {

        return userService.resetPassword(token, newPassword);
    }
}