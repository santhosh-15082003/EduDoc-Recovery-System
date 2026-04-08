package com.example.documenthub.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "issuer_reports")
public class IssuerReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String documentType;

    private String applicantName;

    private String status;

    private LocalDateTime createdAt;

    public IssuerReport() {}

    public Long getId() {
        return id;
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public String getApplicantName() {
        return applicantName;
    }

    public void setApplicantName(String applicantName) {
        this.applicantName = applicantName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}