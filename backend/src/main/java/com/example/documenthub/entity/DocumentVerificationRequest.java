package com.example.documenthub.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "document_verification_requests")
public class DocumentVerificationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String dob;

    private String address;
    private String city;
    private String state;
    private String zip;

    private String email;
    private String phone;

    private String documentType;

    @Lob
    private byte[] uploadedFile;

    private String fileName;
    private String fileType;

    private String status; // PENDING, APPROVED, REJECTED

    private LocalDateTime createdAt;

    @ManyToOne
    private User user;

    // Manual setters for Java 25 compatibility
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setDob(String dob) { this.dob = dob; }
    public void setAddress(String address) { this.address = address; }
    public void setCity(String city) { this.city = city; }
    public void setState(String state) { this.state = state; }
    public void setZip(String zip) { this.zip = zip; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setEmail(String email) { this.email = email; }
    public void setDocumentType(String documentType) { this.documentType = documentType; }
    public void setUploadedFile(byte[] uploadedFile) { this.uploadedFile = uploadedFile; }
    public void setFileName(String fileName) { this.fileName = fileName; }
    public void setFileType(String fileType) { this.fileType = fileType; }
    public void setStatus(String status) { this.status = status; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setUser(User user) { this.user = user; }

    // Manual getters if needed
    public Long getId() { return id; }
    public String getFileName() { return fileName; }
    public byte[] getUploadedFile() { return uploadedFile; }
}
