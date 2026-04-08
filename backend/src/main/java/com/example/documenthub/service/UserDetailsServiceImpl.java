package com.example.documenthub.service;

import com.example.documenthub.entity.User;
import com.example.documenthub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole()) // USER or ADMIN
                .build();
    }
}

// package com.example.documenthub.service;

// import com.example.documenthub.entity.User;
// import com.example.documenthub.repository.UserRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.stream.Collectors;

// @Service
// public class UserDetailsServiceImpl implements UserDetailsService {

//     @Autowired
//     private UserRepository userRepository;

//     @Override
//     public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//         // Find user from DB
//         User user = userRepository.findByUsername(username)
//                 .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

//         // Convert roles (if you have roles)
//         List<SimpleGrantedAuthority> authorities = user.getRoles() == null ? List.of() :
//                 user.getRoles().stream()
//                         .map(role -> new SimpleGrantedAuthority(role.getName()))
//                         .collect(Collectors.toList());

//         // Return Spring Security-compatible user
//         return org.springframework.security.core.userdetails.User
//                 .withUsername(user.getUsername())
//                 .password(user.getPassword()) // Must be encoded (BCrypt)
//                 .authorities(authorities)
//                 .accountExpired(false)
//                 .accountLocked(false)
//                 .credentialsExpired(false)
//                 .disabled(false)
//                 .build();
//     }
// }

// package com.example.documenthub.service;

// import com.example.documenthub.entity.User;
// import com.example.documenthub.repository.UserRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;

// import java.util.stream.Collectors;

// @Service
// public class UserDetailsServiceImpl implements UserDetailsService {

//     @Autowired
//     private UserRepository userRepository;

//     @Override
//     public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//         User user = userRepository.findByUsername(username)
//                 .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

//         return org.springframework.security.core.userdetails.User
//                 .withUsername(user.getUsername())
//                 .password(user.getPassword())
//                 .authorities(user.getRoles().stream()
//                         .map(role -> new SimpleGrantedAuthority(role.getName()))
//                         .collect(Collectors.toList()))
//                 .build();
//     }
// }
