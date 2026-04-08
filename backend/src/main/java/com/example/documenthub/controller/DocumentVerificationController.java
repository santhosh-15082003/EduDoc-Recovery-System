package com.example.documenthub.controller;

import com.example.documenthub.entity.DocumentVerificationRequest;
import com.example.documenthub.entity.User;
import com.example.documenthub.service.DocumentVerificationService;
import com.example.documenthub.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v2/document-requests")
@RequiredArgsConstructor
public class DocumentVerificationController {

    private final DocumentVerificationService service;
    private final UserService userService;

    // Manual constructor for Java 25 compatibility
    // public DocumentVerificationController(DocumentVerificationService service, UserService userService) {
    //     this.service = service;
    //     this.userService = userService;
    // }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> create(
            @RequestParam String firstName,
            @RequestParam String lastName,
            @RequestParam String dob,
            @RequestParam String address,
            @RequestParam String city,
            @RequestParam String state,
            @RequestParam String zip,
            @RequestParam String phone,
            @RequestParam String documentType,
            @RequestParam MultipartFile file,
            @RequestParam String email
    ) throws Exception {

        User user = userService.getCurrentUser();

        DocumentVerificationRequest req = new DocumentVerificationRequest();
        req.setFirstName(firstName);
        req.setLastName(lastName);
        req.setDob(dob);
        req.setAddress(address);
        req.setCity(city);
        req.setState(state);
        req.setZip(zip);
        req.setPhone(phone);
        req.setEmail(email);
        req.setDocumentType(documentType);
        req.setUploadedFile(file.getBytes());
        req.setFileName(file.getOriginalFilename());
        req.setFileType(file.getContentType());

        return ResponseEntity.ok(service.save(req, user));
    }

    @GetMapping("/admin")
    public ResponseEntity<?> adminAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        return ResponseEntity.ok(service.updateStatus(id, status));
    }

    @GetMapping("/{id}/file")
    public ResponseEntity<byte[]> downloadFile(@PathVariable Long id) {
        DocumentVerificationRequest req =
                service.getAll().stream()
                        .filter(r -> r.getId().equals(id))
                        .findFirst()
                        .orElseThrow();

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=\"" + req.getFileName() + "\"")
                .body(req.getUploadedFile());
}

}
