package com.example.documenthub.service;

import com.example.documenthub.entity.AdminPersonalDetails;
import com.example.documenthub.repository.AdminPersonalDetailsRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminPersonalDetailsService {

    private final AdminPersonalDetailsRepository repository;

    public AdminPersonalDetailsService(AdminPersonalDetailsRepository repository) {
        this.repository = repository;
    }

    public Optional<AdminPersonalDetails> getByUsername(String username) {
        return repository.findByUsername(username);
    }

    public AdminPersonalDetails saveForAdmin(String username, AdminPersonalDetails details) {
        details.setUsername(username);
        return repository.save(details);
    }

    public AdminPersonalDetails updateForAdmin(String username, AdminPersonalDetails details) {
        AdminPersonalDetails existing = repository.findByUsername(username).orElseGet(() -> {
            AdminPersonalDetails newDetails = new AdminPersonalDetails();
            newDetails.setUsername(username);
            return newDetails;
        });

        existing.setName(details.getName());
        existing.setAge(details.getAge());
        existing.setGender(details.getGender());
        existing.setAddress(details.getAddress());
        existing.setMailId(details.getMailId());
        existing.setContactNo(details.getContactNo());

        return repository.save(existing);
    }
}
