package com.example.documenthub.repository;

import com.example.documenthub.entity.AdminPersonalDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminPersonalDetailsRepository extends JpaRepository<AdminPersonalDetails, Long> {
    Optional<AdminPersonalDetails> findByUsername(String username);
}
