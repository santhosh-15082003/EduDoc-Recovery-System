package com.example.documenthub.controller;

import com.example.documenthub.dto.ContactRequest;
import com.example.documenthub.service.EmailService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    private final EmailService emailService;

    public ContactController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping
    public String sendContact(@RequestBody ContactRequest req) {

        String body = "Name: " + req.getName() +
                      "\nEmail: " + req.getEmail() +
                      "\nPhone: " + req.getPhone() +
                      "\nMessage: " + req.getMessage();

        emailService.sendEmail(
                "yourmail@gmail.com",
                "New Contact Form Message",
                body
        );

        return "Message Sent Successfully";
    }
}