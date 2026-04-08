package com.example.documenthub.dto;

public class GenerateDescriptionRequest {

    private String fullName;
    private String documentType;
    private String placeOfOccurrence;
    private String dateOfLoss;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public String getPlaceOfOccurrence() {
        return placeOfOccurrence;
    }

    public void setPlaceOfOccurrence(String placeOfOccurrence) {
        this.placeOfOccurrence = placeOfOccurrence;
    }

    public String getDateOfLoss() {
        return dateOfLoss;
    }

    public void setDateOfLoss(String dateOfLoss) {
        this.dateOfLoss = dateOfLoss;
    }
}