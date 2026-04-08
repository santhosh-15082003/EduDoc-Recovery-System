package com.example.documenthub;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordGenerator {

    public static void main(String[] args) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String rawPassword = "admin123";   // 👈 you can change this

        String encodedPassword = encoder.encode(rawPassword);

        System.out.println("Encoded Password:");
        System.out.println(encodedPassword);
    }
}