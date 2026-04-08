package com.example.documenthub.service;

import com.example.documenthub.entity.DocumentVerificationRequest;
import com.example.documenthub.entity.User;
import com.example.documenthub.repository.DocumentVerificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DocumentVerificationService {

    private final DocumentVerificationRepository repository;

    // Manual constructor for Java 25 compatibility
    // public DocumentVerificationService(DocumentVerificationRepository repository) {
    //     this.repository = repository;
    // }

    public DocumentVerificationRequest save(DocumentVerificationRequest request, User user) {
        request.setUser(user);
        request.setStatus("PENDING");
        request.setCreatedAt(LocalDateTime.now());
        return repository.save(request);
    }

    public List<DocumentVerificationRequest> getAll() {
        return repository.findAll();
    }

    public List<DocumentVerificationRequest> getByUser(Long userId) {
        return repository.findByUserId(userId);
    }

    public DocumentVerificationRequest updateStatus(Long id, String status) {
        DocumentVerificationRequest req = repository.findById(id).orElseThrow();
        req.setStatus(status);
        return repository.save(req);
    }
}
