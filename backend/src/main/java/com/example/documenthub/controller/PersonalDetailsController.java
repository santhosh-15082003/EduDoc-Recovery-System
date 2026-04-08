package com.example.documenthub.controller;

import com.example.documenthub.entity.PersonalDetails;
import com.example.documenthub.service.PersonalDetailsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/user/details")
public class PersonalDetailsController {

    private final PersonalDetailsService service;

    public PersonalDetailsController(PersonalDetailsService service) {
        this.service = service;
    }

    // GET /api/user/details
    @GetMapping
    public ResponseEntity<?> getDetails(Principal principal) {
        String username = principal.getName();
        return service.getByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.ok(new PersonalDetails())); // return empty object if none found
    }

    // POST /api/user/details  -> create/save
    @PostMapping
    public ResponseEntity<?> saveDetails(@RequestBody PersonalDetails payload, Principal principal) {
        String username = principal.getName();
        // Optional: check if already exists and return 409 if you want to prevent overwrite
        PersonalDetails saved = service.saveForUser(username, payload);
        return ResponseEntity.ok(saved);
    }

    // PUT /api/user/details  -> update
    @PutMapping
    public ResponseEntity<?> updateDetails(@RequestBody PersonalDetails payload, Principal principal) {
        String username = principal.getName();
        PersonalDetails updated = service.updateForUser(username, payload);
        return ResponseEntity.ok(updated);
    }
}
