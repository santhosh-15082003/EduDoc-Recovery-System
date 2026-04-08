package com.example.documenthub.repository;

import com.example.documenthub.entity.DocumentVerificationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentVerificationRepository
        extends JpaRepository<DocumentVerificationRequest, Long> {

    List<DocumentVerificationRequest> findByUserId(Long userId);
}
