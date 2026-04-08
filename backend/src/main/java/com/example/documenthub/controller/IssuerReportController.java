package com.example.documenthub.controller;

import com.example.documenthub.service.IssuerReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/issuer/admin")
@CrossOrigin
public class IssuerReportController {

    @Autowired
    private IssuerReportService service;

    @GetMapping("/analytics")
    public Map<String, Long> getIssuerAnalytics(
        @RequestParam(required = false) String startDate,
        @RequestParam(required = false) String endDate
    ) {

        // ⭐ ADDED DATE FILTER LOGIC

        if(startDate != null && endDate != null){

            return service.getIssuerAnalyticsByDate(
                    LocalDate.parse(startDate),
                    LocalDate.parse(endDate)
            );
        }

        return service.getIssuerAnalytics();
    }
}