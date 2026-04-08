package com.example.documenthub.controller;

import com.example.documenthub.entity.User;
import com.example.documenthub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        // For now, just save directly (later we can hash passwords)
        return userService.registerUser(user);
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(Principal principal) {
        return userService.findByEmail(principal.getName())
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}
