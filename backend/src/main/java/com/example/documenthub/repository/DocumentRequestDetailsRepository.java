package com.example.documenthub.repository;

import com.example.documenthub.entity.DocumentRequestDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DocumentRequestDetailsRepository
        extends JpaRepository<DocumentRequestDetails, Long> {

    Optional<DocumentRequestDetails> findByRequestId(Long requestId);
}
