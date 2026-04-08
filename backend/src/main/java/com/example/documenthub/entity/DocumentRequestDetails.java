package com.example.documenthub.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "document_request_details")
public class DocumentRequestDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "request_id", nullable = false)
    private DocumentRequest request;

    @Lob
    @Column(name = "form_data", columnDefinition = "JSON", nullable = false)
    private String formData;

    public DocumentRequestDetails() {}

    public Long getId() {
        return id;
    }

    public DocumentRequest getRequest() {
        return request;
    }

    public void setRequest(DocumentRequest request) {
        this.request = request;
    }

    public String getFormData() {
        return formData;
    }

    public void setFormData(String formData) {
        this.formData = formData;
    }
}
