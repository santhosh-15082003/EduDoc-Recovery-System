package com.example.documenthub.controller;

import com.example.documenthub.repository.MissingReportRepository;
import com.example.documenthub.dto.AdminAnalyticsDTO;
import com.example.documenthub.dto.GenerateDescriptionRequest;
import com.example.documenthub.dto.GenerateDescriptionResponse;
import com.example.documenthub.entity.MissingReport;
import com.example.documenthub.entity.User;
import com.example.documenthub.service.MissingReportService;
import com.example.documenthub.service.UserService;

import jakarta.servlet.http.HttpServletResponse;

import com.example.documenthub.service.EmailService;

import org.aspectj.internal.lang.annotation.ajcDeclareAnnotation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletResponse;
import com.example.documenthub.entity.MissingReport;

import java.io.IOException;
import java.io.PrintWriter;
import java.security.Principal;
// import java.util.Map;
// import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/missing")
public class MissingReportController {

    @Autowired
    private MissingReportService service;

    @Autowired
    private MissingReportRepository missingReportRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    // ================= SUBMIT REPORT =================
    @PostMapping(consumes = "multipart/form-data")
    public MissingReport submitReport(

            @RequestParam String fullName,
            @RequestParam String fatherName,
            @RequestParam String addressLine1,
            @RequestParam(required = false) String addressLine2,
            @RequestParam String district,
            @RequestParam String state,
            @RequestParam String pincode,
            @RequestParam String mobile,
            @RequestParam String email,
            @RequestParam String documentType,
            @RequestParam String dateOfLoss,
            @RequestParam String timeOfLoss,
            @RequestParam String placeOfOccurrence,
            @RequestParam String universityName,
            @RequestParam String collegeName,
            @RequestParam String registerNumber,
            @RequestParam String description,
            @RequestParam boolean policeReported,

            @RequestParam(required = false) MultipartFile firCopy,
            @RequestParam(required = false) MultipartFile selfie,
            @RequestParam(required = false) MultipartFile verificationCard,
            @RequestParam(required = false) MultipartFile collegeIdCard,

            Principal principal

    ) throws IOException {

        User user = userService.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        MissingReport report = new MissingReport();

        report.setUser(user);

        report.setFullName(fullName);
        report.setFatherName(fatherName);
        report.setAddressLine1(addressLine1);
        report.setAddressLine2(addressLine2);
        report.setDistrict(district);
        report.setState(state);
        report.setPincode(pincode);
        report.setMobile(mobile);
        report.setEmail(email);

        report.setDocumentType(documentType);
        report.setDateOfLoss(dateOfLoss);
        report.setTimeOfLoss(timeOfLoss);
        report.setPlaceOfOccurrence(placeOfOccurrence);
        report.setUniversityName(universityName);
        report.setCollegeName(collegeName);
        report.setRegisterNumber(registerNumber);
        report.setDescription(description);
        report.setPoliceReported(policeReported);

        if (firCopy != null && !firCopy.isEmpty()) {
            report.setFirCopy(firCopy.getBytes());
            report.setFirName(firCopy.getOriginalFilename());
            report.setFirType(firCopy.getContentType());
        }

        if (selfie != null && !selfie.isEmpty()) {
            report.setSelfie(selfie.getBytes());
            report.setSelfieName(selfie.getOriginalFilename());
            report.setSelfieType(selfie.getContentType());
        }

        if (verificationCard != null && !verificationCard.isEmpty()) {
            report.setVerificationCard(verificationCard.getBytes());
            report.setVerificationName(verificationCard.getOriginalFilename());
            report.setVerificationType(verificationCard.getContentType());
        }

        if (collegeIdCard != null && !collegeIdCard.isEmpty()) {
            report.setCollegeIdCard(collegeIdCard.getBytes());
            report.setCollegeIdName(collegeIdCard.getOriginalFilename());
            report.setCollegeIdType(collegeIdCard.getContentType());
        }

        // SAVE REPORT
        MissingReport savedReport = service.save(report);

        // SEND EMAIL AFTER SUBMISSION
        emailService.sendEmail(
                savedReport.getEmail(),
                "Missing Report Submitted Successfully",
                "Hello " + savedReport.getFullName() + ",\n\n" +
                "Your missing document report has been submitted successfully.\n\n" +
                "Tracking ID: " + savedReport.getId() + "\n" +
                "Current Status: PENDING\n\n" +
                "You can track your report using this ID in the portal.\n\n" +
                "Regards,\nDocument Recovery Hub"
        );

            return savedReport;
    }

    // ================= ADMIN GET ALL =================
    @GetMapping
    public List<MissingReport> getAllReports() {
        return service.getAllReports();
    }

    // ================= USER GET OWN =================
    @GetMapping("/user")
    public List<MissingReport> getUserReports(Principal principal) {

        User user = userService.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return service.getReportsByUser(user);
    }

    // ================= GENERATE DESCRIPTION =================     
        @PostMapping("/generate-description")
        public ResponseEntity<?> generateDescription(@RequestBody GenerateDescriptionRequest req) {

        String description = String.format(
                "I, %s, would like to report that my %s was lost on %s at %s. " +
                "Despite searching thoroughly in the surrounding area, I was unable to locate the document. " +
                "I kindly request the authorities to record this report and assist in case the document is found.",
                req.getFullName(),
                req.getDocumentType(),
                req.getDateOfLoss(),
                req.getPlaceOfOccurrence()
        );

        return ResponseEntity.ok(new GenerateDescriptionResponse(description));
        }

    // ================= UPDATE STATUS =================
    @PutMapping("/{id}/status")
    public MissingReport updateStatus(
            @PathVariable Long id,
            @RequestParam String status,
            @RequestParam(required = false) String remark
    ) {

        MissingReport updatedReport = service.updateStatus(id, status, remark);

        // SEND EMAIL WHEN STATUS CHANGES
        emailService.sendEmail(
                updatedReport.getEmail(),
                "Missing Report Status Updated",
                "Hello " + updatedReport.getFullName() + ",\n\n" +
                "Your Missing Report (Tracking ID: " + updatedReport.getId() + ") has been updated.\n\n" +
                "New Status: " + updatedReport.getStatus() + "\n\n" +
                (remark != null ? "Admin Remark: " + remark + "\n\n" : "") +
                "Regards,\nDocument Recovery Hub"
        );

        return updatedReport;
    }

    // ================= DOWNLOAD FIR =================
    @GetMapping("/{id}/fir")
    public ResponseEntity<byte[]> downloadFir(@PathVariable Long id) {

        MissingReport report = service.findById(id)
                .orElseThrow(() -> new RuntimeException("Report not found"));

        if (report.getFirCopy() == null) {
            throw new RuntimeException("FIR not available");
        }

        String fileName = report.getFirName() != null 
                ? report.getFirName() 
                : "fir.pdf";

        String fileType = report.getFirType() != null 
                ? report.getFirType() 
                : MediaType.APPLICATION_OCTET_STREAM_VALUE;

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + fileName + "\"")
                .contentType(MediaType.parseMediaType(fileType))
                .body(report.getFirCopy());
    }


    // ================= DOWNLOAD SELFIE =================
   
    // @GetMapping("/{id}/selfie")
    // public ResponseEntity<byte[]> downloadSelfie(@PathVariable Long id) {
    //     MissingReport report = service.findById(id)
    //             .orElseThrow(() -> new RuntimeException("Report not found"));
    //     return ResponseEntity.ok()
    //             .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=selfie")
    //             .contentType(MediaType.APPLICATION_OCTET_STREAM)
    //             .body(report.getSelfie());
    // }

    @GetMapping("/{id}/selfie")
    public ResponseEntity<byte[]> downloadSelfie(@PathVariable Long id) {

        MissingReport report = service.findById(id)
                .orElseThrow(() -> new RuntimeException("Report not found"));

        if (report.getSelfie() == null) {
            throw new RuntimeException("Selfie not available");
        }

        String fileName = report.getSelfieName() != null 
                ? report.getSelfieName() 
                : "selfie.jpg";

        String fileType = report.getSelfieType() != null 
                ? report.getSelfieType() 
                : MediaType.APPLICATION_OCTET_STREAM_VALUE;

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + fileName + "\"")
                .contentType(MediaType.parseMediaType(fileType))
                .body(report.getSelfie());
    }


    // ================= DOWNLOAD VERIFICATION CARD =================
    @GetMapping("/{id}/verification")
    public ResponseEntity<byte[]> downloadVerification(@PathVariable Long id) {
        MissingReport report = service.findById(id)
                .orElseThrow(() -> new RuntimeException("Report not found"));

        if (report.getVerificationCard() == null) {
            throw new RuntimeException("Verification card not available");
        }

        String fileName = report.getVerificationName() != null 
                ? report.getVerificationName() 
                : "verification_card.jpg";

        String fileType = report.getVerificationType() != null 
                ? report.getVerificationType() 
                : MediaType.APPLICATION_OCTET_STREAM_VALUE;

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + fileName + "\"")
                .contentType(MediaType.parseMediaType(fileType))
                .body(report.getVerificationCard());
    }

    // ================= DOWNLOAD COLLEGE ID =================
    @GetMapping("/{id}/college-id")
    public ResponseEntity<byte[]> downloadCollegeId(@PathVariable Long id) {    
        MissingReport report = service.findById(id)
                .orElseThrow(() -> new RuntimeException("Report not found"));

        if (report.getCollegeIdCard() == null) {
            throw new RuntimeException("College ID card not available");
        }

        String fileName = report.getCollegeIdName() != null 
                ? report.getCollegeIdName() 
                : "college_id_card.jpg";

        String fileType = report.getCollegeIdType() != null 
                ? report.getCollegeIdType() 
                : MediaType.APPLICATION_OCTET_STREAM_VALUE;

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + fileName + "\"")
                .contentType(MediaType.parseMediaType(fileType))
                .body(report.getCollegeIdCard());
    }

        
    // ===== UPDATED FOR DATE FILTER ANALYTICS =====

        @GetMapping("/admin/analytics")
        public AdminAnalyticsDTO getMissingAnalytics(
                @RequestParam(required = false) String startDate,
                @RequestParam(required = false) String endDate
        ) {

                if(startDate != null && endDate != null){

                        return service.getAnalyticsByDate(
                                java.time.LocalDate.parse(startDate),
                                java.time.LocalDate.parse(endDate)
                        );

                }

                return service.getAnalytics();
        }

        @GetMapping("/admin/export")
        public void exportReports(HttpServletResponse response) throws IOException {

        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=missing_reports.csv");

        List<MissingReport> reports = missingReportRepository.findAll();

        PrintWriter writer = response.getWriter();

        // CSV Header
        writer.println("ID,Full Name,Document Type,Status,Date");

        // CSV Rows
        for (MissingReport r : reports) {
                writer.println(
                        r.getId() + "," +
                        r.getFullName() + "," +
                        r.getDocumentType() + "," +
                        r.getStatus() + "," +
                        r.getCreatedAt()
                );
        }

        writer.flush();
        writer.close();
        }

}