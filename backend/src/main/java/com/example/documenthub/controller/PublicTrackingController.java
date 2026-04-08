package com.example.documenthub.controller;

import com.example.documenthub.entity.MissingReport;
import com.example.documenthub.repository.MissingReportRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/public")
@CrossOrigin
public class PublicTrackingController {

    private final MissingReportRepository repository;

    public PublicTrackingController(MissingReportRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/track/{id}")
    public Map<String, Object> trackReport(@PathVariable Long id) {

        Optional<MissingReport> optionalReport = repository.findById(id);

        if (optionalReport.isEmpty()) {
            throw new RuntimeException("Report not found");
        }

        MissingReport report = optionalReport.get();

        Map<String, Object> response = new HashMap<>();
        
        response.put("id", report.getId());
        response.put("name", report.getFullName()); // make sure this field exists
        response.put("documentType", report.getDocumentType());
        response.put("status", report.getStatus());
        response.put("createdAt", report.getCreatedAt());

        // ✅ If you have adminRemark field
        try {
            response.put("remark", report.getAdminRemark());
        } catch (Exception e) {
            response.put("remark", "Not updated yet");
        }


        return response;
    }
}