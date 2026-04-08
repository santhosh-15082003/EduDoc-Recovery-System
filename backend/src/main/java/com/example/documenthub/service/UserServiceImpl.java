// package com.example.documenthub.service;

// import com.example.documenthub.entity.User;
// import com.example.documenthub.repository.UserRepository;
// import lombok.RequiredArgsConstructor;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.stereotype.Service;

// @Service
// @RequiredArgsConstructor
// public class UserServiceImpl implements UserService {

//     private final UserRepository userRepository;

//     @Override
//     public User getCurrentUser() {
//         Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//         String email = auth.getName();
//         return userRepository.findByEmail(email)
//                 .orElseThrow(() -> new RuntimeException("User not found"));
//     }
// }

package com.example.documenthub.service;

import com.example.documenthub.entity.User;
import com.example.documenthub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Manual constructor for Java 25 compatibility
    // public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    //     this.userRepository = userRepository;
    //     this.passwordEncoder = passwordEncoder;
    // }

    @Override
    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User getCurrentUser() {
        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        String email = auth.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
