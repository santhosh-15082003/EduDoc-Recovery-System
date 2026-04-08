// package com.example.documenthub.service;

// import com.example.documenthub.entity.User;
// import com.example.documenthub.repository.UserRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// import java.util.Optional;

// @Service
// public class UserService {

//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private PasswordEncoder passwordEncoder;

//     /**
//      * Registers a new user with encoded password
//      */
//     public User registerUser(User user) {
//         // Encode the password using BCrypt before saving
//         user.setPassword(passwordEncoder.encode(user.getPassword()));
//         return userRepository.save(user);
//     }

//     /**
//      * Finds a user by their email
//      */
//     public Optional<User> findByEmail(String email) {
//         return userRepository.findByEmail(email);
//     }

//     /**
//      * Finds a user by their ID
//      */
//     public Optional<User> findById(Long id) {
//         return userRepository.findById(id);
//     }

//     /* ✅ GET CURRENT LOGGED-IN USER */
//     public User getCurrentUser() {
//         Authentication authentication =
//                 SecurityContextHolder.getContext().getAuthentication();

//         String email = authentication.getName();

//         return userRepository.findByEmail(email)
//                 .orElseThrow(() -> new RuntimeException("User not found"));
//     }
// }

package com.example.documenthub.service;

import com.example.documenthub.entity.User;

import java.util.Optional;

public interface UserService {

    User registerUser(User user);

    Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);

    User getCurrentUser();
}
