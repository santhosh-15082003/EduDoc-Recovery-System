
package com.example.documenthub.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "missing_reports")
public class MissingReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ===== PERSONAL DETAILS =====
    private String fullName;
    private String fatherName;
    private String addressLine1;
    private String addressLine2;
    private String district;
    private String state;
    private String pincode;
    private String mobile;
    private String email;

    // ===== DOCUMENT DETAILS =====
    private String documentType;
    private String dateOfLoss;
    private String timeOfLoss;
    private String placeOfOccurrence;

    private String universityName;
    private String collegeName;
    private String registerNumber;

    @Column(columnDefinition = "TEXT")
    private String description;

    private boolean policeReported;

    // ===== FILE UPLOADS =====
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] firCopy;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] selfie;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] verificationCard;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] collegeIdCard;

    private String selfieName;
    private String selfieType;

    private String firName;
    private String firType;

    private String verificationName;
    private String verificationType;

    private String collegeIdName;
    private String collegeIdType;

    // ===== SYSTEM =====
    private String status; // PENDING / APPROVED / REJECTED

    @Column(columnDefinition = "TEXT")
    private String adminRemark;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public MissingReport() {
        this.status = "PENDING";
        this.createdAt = LocalDateTime.now();
    }

    // 👉 Generate ALL getters and setters using IDE

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { 
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }   

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public String getAddressLine1() {
        return addressLine1;
    }

    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    public String getAddressLine2() {
        return addressLine2;
    }

    public void setAddressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public String getDateOfLoss() {
        return dateOfLoss;
    }

    public void setDateOfLoss(String dateOfLoss) {
        this.dateOfLoss = dateOfLoss;
    }

    public String getTimeOfLoss() {
        return timeOfLoss;
    }       

    public void setTimeOfLoss(String timeOfLoss) {
        this.timeOfLoss = timeOfLoss;
    }

    public String getPlaceOfOccurrence() {
        return placeOfOccurrence;
    }

    public void setPlaceOfOccurrence(String placeOfOccurrence) {
        this.placeOfOccurrence = placeOfOccurrence;
    }

    public String getUniversityName() {
        return universityName;
    }

    public void setUniversityName(String universityName) {
        this.universityName = universityName;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }

    public String getRegisterNumber() {
        return registerNumber;
    }

    public void setRegisterNumber(String registerNumber) {
        this.registerNumber = registerNumber;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isPoliceReported() {
        return policeReported;
    }

    public void setPoliceReported(boolean policeReported) {
        this.policeReported = policeReported;
    }

    public byte[] getFirCopy() {
        return firCopy;
    }

    public void setFirCopy(byte[] firCopy) {
        this.firCopy = firCopy;
    }

    public byte[] getSelfie() {
        return selfie;
    }

    public void setSelfie(byte[] selfie) {
        this.selfie = selfie;
    }

    public byte[] getVerificationCard() {
        return verificationCard;
    }

    public void setVerificationCard(byte[] verificationCard) {
        this.verificationCard = verificationCard;
    }

    public byte[] getCollegeIdCard() {
        return collegeIdCard;
    }

    public void setCollegeIdCard(byte[] collegeIdCard) {
        this.collegeIdCard = collegeIdCard;
    }

    public String getSelfieName() {
        return selfieName;
    }

    public void setSelfieName(String selfieName) {
        this.selfieName = selfieName;
    }

    public String getSelfieType() {
        return selfieType;
    }

    public void setSelfieType(String selfieType) {
        this.selfieType = selfieType;
    }

    public String getFirName() {
        return firName;
    }

    public void setFirName(String firName) {
        this.firName = firName;
    }

    public String getFirType() {
        return firType;
    }

    public void setFirType(String firType) {
        this.firType = firType;
    }

    public String getVerificationName() {
        return verificationName;
    }

    public void setVerificationName(String verificationName) {
        this.verificationName = verificationName;
    }

    public String getVerificationType() {
        return verificationType;
    }

    public void setVerificationType(String verificationType) {
        this.verificationType = verificationType;
    }

    public String getCollegeIdName() {
        return collegeIdName;
    }

    public void setCollegeIdName(String collegeIdName) {
        this.collegeIdName = collegeIdName;
    }

    public String getCollegeIdType() {
        return collegeIdType;
    }

    public void setCollegeIdType(String collegeIdType) {
        this.collegeIdType = collegeIdType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAdminRemark() {
        return adminRemark;
    }

    public void setAdminRemark(String adminRemark) {
        this.adminRemark = adminRemark;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}

