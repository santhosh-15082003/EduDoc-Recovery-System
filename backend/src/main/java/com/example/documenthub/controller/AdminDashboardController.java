package com.example.documenthub.controller;

import com.example.documenthub.repository.MissingReportRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminDashboardController {

    private final MissingReportRepository repository;

    public AdminDashboardController(MissingReportRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/stats")
    public Map<String, Long> getStats() {

        Map<String, Long> stats = new HashMap<>();

        long total = repository.count();
        long approved = repository.countByStatus("APPROVED");
        long rejected = repository.countByStatus("REJECTED");
        long pending = repository.countByStatus("PENDING");

        stats.put("total", total);
        stats.put("approved", approved);
        stats.put("rejected", rejected);
        stats.put("pending", pending);

        return stats;
    }
}