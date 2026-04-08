package com.example.documenthub.dto;

import com.example.documenthub.entity.DocumentRequest;

public class DocumentRequestDTO {

    private Long id;
    private String applicantName;   // username
    private String documentType;
    private String status;
    private boolean hasFirCopy;

    // ✅ NEW FIELDS ADDED
    private String idProof;
    private String oldDocumentImage;

    public DocumentRequestDTO(DocumentRequest request) {
        this.id = request.getId();
        this.documentType = request.getDocumentType();
        this.status = request.getStatus();
        this.applicantName = request.getApplicantName();
        this.hasFirCopy = request.getFirCopy() != null;

        // ✅ NEW FIELD MAPPING
        this.idProof = request.getIdProof();
        this.oldDocumentImage = request.getOldDocumentImage();
    }

    public Long getId() {
        return id;
    }

    public String getApplicantName() {
        return applicantName;
    }

    public String getDocumentType() {
        return documentType;
    }

    public String getStatus() {
        return status;
    }

    public boolean isHasFirCopy() {
        return hasFirCopy;
    }

    // ✅ NEW GETTERS

    public String getIdProof() {
        return idProof;
    }

    public String getOldDocumentImage() {
        return oldDocumentImage;
    }
}