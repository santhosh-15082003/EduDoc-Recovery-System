package com.example.documenthub.service;

import com.example.documenthub.repository.DocumentRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

import java.time.LocalDateTime;
import java.time.LocalDate;

@Service
public class IssuerReportService {

    @Autowired
    private DocumentRequestRepository repository;

    public Map<String, Long> getIssuerAnalytics() {

        Map<String, Long> stats = new HashMap<>();

         // Total Requests
        stats.put("total", repository.countTotalRequests());

        // Approved Requests
        stats.put("approved", repository.countApproved());

        // Rejected Requests
        stats.put("rejected", repository.countRejected());

        // Pending Requests
        stats.put("pending", repository.countPending());

        // Under Verification Requests
        stats.put("underVerification", repository.countUnderVerification());

        return stats;
    }

     // ⭐ ADDED FOR DATE FILTER ANALYTICS

    public Map<String, Long> getIssuerAnalyticsByDate(LocalDate startDate, LocalDate endDate) {

        Map<String, Long> stats = new HashMap<>();

        LocalDateTime start = startDate.atStartOfDay();
        LocalDateTime end = endDate.atTime(23,59,59);

        stats.put("total", repository.countTotalBetween(start, end));
        stats.put("approved", repository.countApprovedBetween(start, end));
        stats.put("rejected", repository.countRejectedBetween(start, end));
        stats.put("pending", repository.countPendingBetween(start, end));
        stats.put("underVerification", repository.countUnderVerificationBetween(start, end));

        return stats;
    }
}