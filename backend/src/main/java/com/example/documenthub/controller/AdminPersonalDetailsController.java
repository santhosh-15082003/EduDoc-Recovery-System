// package com.example.documenthub.controller;

// import com.example.documenthub.entity.PersonalDetails;
// import com.example.documenthub.service.PersonalDetailsService;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.security.Principal;

// @RestController
// @RequestMapping("/api/admin/details")
// public class AdminDetailsController {

//     private final PersonalDetailsService service;

//     public AdminDetailsController(PersonalDetailsService service) {
//         this.service = service;
//     }

//     @GetMapping
//     public ResponseEntity<?> getDetails(Principal principal) {
//         String username = principal.getName();
//         return service.getByUsername(username)
//                 .map(ResponseEntity::ok)
//                 .orElse(ResponseEntity.ok(new PersonalDetails()));
//     }

//     @PostMapping
//     public ResponseEntity<?> saveDetails(@RequestBody PersonalDetails payload, Principal principal) {
//         String username = principal.getName();
//         PersonalDetails saved = service.saveForUser(username, payload);
//         return ResponseEntity.ok(saved);
//     }

//     @PutMapping
//     public ResponseEntity<?> updateDetails(@RequestBody PersonalDetails payload, Principal principal) {
//         String username = principal.getName();
//         PersonalDetails updated = service.updateForUser(username, payload);
//         return ResponseEntity.ok(updated);
//     }
// }

package com.example.documenthub.controller;

import com.example.documenthub.entity.AdminPersonalDetails;
import com.example.documenthub.service.AdminPersonalDetailsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/admin/details")
public class AdminPersonalDetailsController {

    private final AdminPersonalDetailsService service;

    public AdminPersonalDetailsController(AdminPersonalDetailsService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<?> getDetails(Principal principal) {
        String username = principal.getName();
        return service.getByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.ok(new AdminPersonalDetails()));
    }

    @PostMapping
    public ResponseEntity<?> saveDetails(@RequestBody AdminPersonalDetails payload, Principal principal) {
        String username = principal.getName();
        AdminPersonalDetails saved = service.saveForAdmin(username, payload);
        return ResponseEntity.ok(saved);
    }

    @PutMapping
    public ResponseEntity<?> updateDetails(@RequestBody AdminPersonalDetails payload, Principal principal) {
        String username = principal.getName();
        AdminPersonalDetails updated = service.updateForAdmin(username, payload);
        return ResponseEntity.ok(updated);
    }
}
