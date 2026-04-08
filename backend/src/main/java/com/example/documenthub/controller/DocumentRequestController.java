package com.example.documenthub.controller;

import com.example.documenthub.entity.DocumentRequest;
import com.example.documenthub.entity.User;
import com.example.documenthub.dto.DocumentRequestDTO;
import com.example.documenthub.service.DocumentRequestService;
import com.example.documenthub.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/requests")
public class DocumentRequestController {

    @Autowired
    private DocumentRequestService requestService;

    @Autowired
    private UserService userService;

    // ===============================
    // CREATE DOCUMENT REQUEST + FULL FORM + FIR
    // ===============================
    @PostMapping(consumes = "multipart/form-data")
    public DocumentRequest createRequest(

            @RequestParam String documentType,
            @RequestParam(required = false) String reason,
            @RequestParam(required = false) String applicantName,
            @RequestParam(required = false) String phone,

            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String dob,
            @RequestParam(required = false) String addressLine1,
            @RequestParam(required = false) String addressLine2,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String zipCode,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String requestedBy,
            @RequestParam(required = false) String schoolName,
            @RequestParam(required = false) String grade,
            @RequestParam(required = false) String collegeName,
            @RequestParam(required = false) String registerNumber,
            @RequestParam(required = false) String universityName,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String courseName,
            @RequestParam(required = false) String deliveryMethod,
            @RequestParam(required = false) String specialInstructions,

            @RequestParam(value = "firCopy", required = false) MultipartFile firCopy,
            @RequestParam(value = "idProof", required = false) MultipartFile idProof,
            @RequestParam(value = "oldDocumentImage", required = false) MultipartFile oldDocumentImage,

            Principal principal
    ) throws IOException {

        // ✅ ADD THIS LINE HERE
        System.out.println("Logged in user: " + principal.getName());

        User user = userService.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        DocumentRequest request = new DocumentRequest();

        request.setUser(user);

        request.setApplicantName(applicantName);
        request.setPhone(phone);
        request.setReason(reason);
        request.setDocumentType(documentType);

        request.setFirstName(firstName);
        request.setLastName(lastName);
        request.setDob(dob);
        request.setAddressLine1(addressLine1);
        request.setAddressLine2(addressLine2);
        request.setCity(city);
        request.setState(state);
        request.setZipCode(zipCode);
        request.setEmail(email);
        request.setRequestedBy(requestedBy);
        request.setSchoolName(schoolName);
        request.setGrade(grade);
        request.setCollegeName(collegeName);
        request.setRegisterNumber(registerNumber);
        request.setUniversityName(universityName);
        request.setDepartment(department);
        request.setCourseName(courseName);
        request.setDeliveryMethod(deliveryMethod);
        request.setSpecialInstructions(specialInstructions);

        request.setStatus("PENDING");
        request.setCreatedAt(LocalDateTime.now());

        if (firCopy != null && !firCopy.isEmpty()) {
            request.setFirCopy(firCopy.getBytes());
        }

        // ADD THE NEW CODE HERE

        Path uploadDir = Paths.get("uploads");

        if (!uploadDir.toFile().exists()) {
            uploadDir.toFile().mkdirs();
        }

        if (idProof != null && !idProof.isEmpty()) {
            Path filePath = uploadDir.resolve(idProof.getOriginalFilename());
            idProof.transferTo(filePath);
            request.setIdProof(idProof.getOriginalFilename());
        }

        if (oldDocumentImage != null && !oldDocumentImage.isEmpty()) {
            Path filePath = uploadDir.resolve(oldDocumentImage.getOriginalFilename());
            oldDocumentImage.transferTo(filePath);
            request.setOldDocumentImage(oldDocumentImage.getOriginalFilename());
        }  

        return requestService.createRequest(request);
    
        // 3️⃣ Save main request
        // DocumentRequest savedRequest = requestService.createRequest(request);

        // // 4️⃣ Prepare FULL FORM DATA (JSON)
        // Map<String, Object> fullForm = new HashMap<>();
        // fullForm.put("documentType", documentType);
        // fullForm.put("reason", reason);
        // fullForm.put("applicantName", applicantName);
        // fullForm.put("phone", phone);
        // fullForm.put("submittedBy", user.getEmail());
        // fullForm.put("submittedAt", LocalDateTime.now().toString());

        // 5️⃣ Save FULL FORM JSON
        // requestService.saveFullForm(savedRequest, fullForm);

        // return savedRequest;
    }

    // ===============================
    // ADMIN – GET ALL REQUESTS
    // ===============================
    @GetMapping
    public List<DocumentRequestDTO> getAllRequests() {
        return requestService.getAllRequests()
            .stream()
            .map(DocumentRequestDTO::new)
            .toList();
    }

    // ==========THIS IS PREVIOUS VERSION OF ABOVE CONTENT============
    // public List<DocumentRequestDTO> getAllRequests() { 
    // return requestService.getAllRequests()
    //         .stream()
    //         .map(DocumentRequestDTO::new)
    //         .toList();
    // }

    // ===============================
    // ADMIN – UPDATE STATUS
    // ===============================
    @PutMapping("/{id}/status")
    public DocumentRequest updateStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        return requestService.updateRequestStatus(id, status);
    }

    // ===============================
    // USER – VIEW OWN REQUESTS
    // ===============================
    @GetMapping("/user")
    public List<DocumentRequest> getUserRequests(Principal principal) {
        User user = userService.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return requestService.getRequestsByUser(user);
    }

    // ===============================
    // DOWNLOAD FIR COPY
    // ===============================
    @GetMapping("/{id}/fir-copy")
    public ResponseEntity<byte[]> downloadFirCopy(@PathVariable Long id) {

        DocumentRequest request = requestService.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        byte[] firData = request.getFirCopy();

        if (firData == null || firData.length == 0) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=fir_request_" + id + ".pdf"
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(firData);
    }

    // ===============================
    // DOWNLOAD ID PROOF
    // ===============================
    @GetMapping("/{id}/id-proof")
    public ResponseEntity<Resource> downloadIdProof(@PathVariable Long id) throws IOException {

        DocumentRequest request = requestService.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        String fileName = request.getIdProof();

        if (fileName == null) {
            throw new RuntimeException("ID Proof not found");
        }

        Path filePath = Paths.get("uploads").resolve(fileName);
        Resource resource = new UrlResource(filePath.toUri());

        // ✅ Detect file type dynamically
        String contentType = java.nio.file.Files.probeContentType(filePath);
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType)) // ✅ IMPORTANT
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + fileName + "\"")
                .body(resource);
    }


    // ===============================
    // DOWNLOAD OLD DOCUMENT IMAGE
    // ===============================
    @GetMapping("/{id}/old-document")
    public ResponseEntity<Resource> downloadOldDocument(@PathVariable Long id) throws IOException {

        DocumentRequest request = requestService.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        String fileName = request.getOldDocumentImage();

        if (fileName == null) {
            throw new RuntimeException("Old document not found");
        }

        Path filePath = Paths.get("uploads").resolve(fileName);
        Resource resource = new UrlResource(filePath.toUri());

        // ✅ Detect file type dynamically
        String contentType = java.nio.file.Files.probeContentType(filePath);
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType)) // ✅ IMPORTANT
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + fileName + "\"")
                .body(resource);
    }


    // ======================================================
    // ADMIN VIEW FULL REQUEST (UPDATED - RETURNS ALL COLUMNS)
    // ======================================================

    @GetMapping("/admin/request/{id}")
    public ResponseEntity<Map<String, Object>> getRequestDetails(@PathVariable Long id) {

        DocumentRequest request = requestService.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        Map<String, Object> response = new HashMap<>();

        response.put("firstName", request.getFirstName());
        response.put("lastName", request.getLastName());
        response.put("dob", request.getDob());
        response.put("addressLine1", request.getAddressLine1());
        response.put("addressLine2", request.getAddressLine2());
        response.put("city", request.getCity());
        response.put("state", request.getState());
        response.put("zipCode", request.getZipCode());
        response.put("email", request.getEmail());
        response.put("phone", request.getPhone());
        response.put("requestedBy", request.getRequestedBy());
        response.put("schoolName", request.getSchoolName());
        response.put("grade", request.getGrade());
        response.put("collegeName", request.getCollegeName());
        response.put("registerNumber", request.getRegisterNumber());
        response.put("universityName", request.getUniversityName());
        response.put("department", request.getDepartment());
        response.put("courseName", request.getCourseName());
        response.put("reason", request.getReason());
        response.put("documentType", request.getDocumentType());
        response.put("deliveryMethod", request.getDeliveryMethod());
        response.put("specialInstructions", request.getSpecialInstructions());


        return ResponseEntity.ok(response);
    }


    

}
