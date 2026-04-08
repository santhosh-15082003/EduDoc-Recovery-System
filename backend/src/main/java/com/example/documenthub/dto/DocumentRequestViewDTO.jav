package com.example.documenthub.dto;

import java.time.LocalDate;

public class DocumentRequestViewDTO {

    public String firstName;
    public String lastName;
    public LocalDate dob;

    public String addressLine1;
    public String addressLine2;
    public String city;
    public String state;
    public String zip;

    public String email;
    public String phone;

    public String requesterType;
    public String schoolName;
    public String grade;
    public String registerNumber;
    public String universityName;
    public String department;

    public String reason;
    public String documentType;
    public String deliveryMethod;
    public String specialInstructions;

    public String fileName;
    public String filePath;

    // NEW FIELDS
    public String idProof;
    public String oldDocumentImage;

    public DocumentRequestViewDTO(
            String firstName,
            String lastName,
            LocalDate dob,
            String addressLine1,
            String addressLine2,
            String city,
            String state,
            String zip,
            String email,
            String phone,
            String requesterType,
            String schoolName,
            String grade,
            String registerNumber,
            String universityName,
            String department,
            String reason,
            String documentType,
            String deliveryMethod,
            String specialInstructions,
            String fileName,
            String filePath,
            String idProof,
            String oldDocumentImage

    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.email = email;
        this.phone = phone;
        this.requesterType = requesterType;
        this.schoolName = schoolName;
        this.grade = grade;
        this.registerNumber = registerNumber;
        this.universityName = universityName;
        this.department = department;
        this.reason = reason;
        this.documentType = documentType;
        this.deliveryMethod = deliveryMethod;
        this.specialInstructions = specialInstructions;
        this.fileName = fileName;
        this.filePath = filePath;
        this.idProof = idProof;
        this.oldDocumentImage = oldDocumentImage;
    }
}
