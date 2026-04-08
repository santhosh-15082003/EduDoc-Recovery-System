package com.example.documenthub.service;

import com.example.documenthub.dto.AdminAnalyticsDTO;
import com.example.documenthub.entity.MissingReport;
import com.example.documenthub.entity.User;
import com.example.documenthub.repository.MissingReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// ===== ADDED FOR DATE FILTER ANALYTICS =====
import java.time.LocalDateTime;
import java.time.LocalDate;

@Service
public class MissingReportService {

    @Autowired
    private MissingReportRepository repository;

    public MissingReport save(MissingReport report) {
        return repository.save(report);
    }

    public List<MissingReport> getAllReports() {
        return repository.findAll();
    }

    public Optional<MissingReport> findById(Long id) {
        return repository.findById(id);
    }

    public List<MissingReport> getReportsByUser(User user) {
        return repository.findByUserId(user.getId());
    }

    public MissingReport updateStatus(Long id, String status, String remark) {
        MissingReport report = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Report not found"));

        report.setStatus(status);
        report.setAdminRemark(remark);

        return repository.save(report);
    }

    public AdminAnalyticsDTO getAnalytics() {

        long total = repository.count();
        long approved = repository.countByStatus("APPROVED");
        long rejected = repository.countByStatus("REJECTED");
        long underVerification = repository.countByStatus("UNDER_VERIFICATION");
        long pending = repository.countByStatus("PENDING");

        return new AdminAnalyticsDTO(total, approved, rejected, underVerification, pending);
    }

     // ===== ADDED FOR DATE FILTER ANALYTICS =====

    public AdminAnalyticsDTO getAnalyticsByDate(LocalDate startDate, LocalDate endDate) {

        LocalDateTime start = startDate.atStartOfDay();
        LocalDateTime end = endDate.atTime(23,59,59);

        long total = repository.countTotalBetween(start, end);
        long approved = repository.countApprovedBetween(start, end);
        long rejected = repository.countRejectedBetween(start, end);
        long underVerification = repository.countVerificationBetween(start, end);
        long pending = repository.countPendingBetween(start, end);

        return new AdminAnalyticsDTO(total, approved, rejected, underVerification, pending);
    }
}