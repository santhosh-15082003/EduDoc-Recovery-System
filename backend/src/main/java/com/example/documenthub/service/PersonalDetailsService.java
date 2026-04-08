package com.example.documenthub.service;

import com.example.documenthub.entity.PersonalDetails;
import com.example.documenthub.repository.PersonalDetailsRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class PersonalDetailsService {

    private final PersonalDetailsRepository repo;

    public PersonalDetailsService(PersonalDetailsRepository repo) {
        this.repo = repo;
    }

    public Optional<PersonalDetails> getByUsername(String username) {
        return repo.findByUsername(username);
    }

    public PersonalDetails saveForUser(String username, PersonalDetails payload) {
        // enforce username stored
        payload.setUsername(username);
        // If an entry exists, do not create duplicate — we'll overwrite only if caller uses update
        // But for save (POST) we allow create if not exists
        return repo.save(payload);
    }

    public PersonalDetails updateForUser(String username, PersonalDetails payload) {
        Optional<PersonalDetails> existingOpt = repo.findByUsername(username);
        if (existingOpt.isPresent()) {
            PersonalDetails existing = existingOpt.get();
            // update fields if provided (null checks)
            if (payload.getName() != null) existing.setName(payload.getName());
            if (payload.getAge() != null) existing.setAge(payload.getAge());
            if (payload.getGender() != null) existing.setGender(payload.getGender());
            if (payload.getAddress() != null) existing.setAddress(payload.getAddress());
            if (payload.getMailId() != null) existing.setMailId(payload.getMailId());
            if (payload.getContactNo() != null) existing.setContactNo(payload.getContactNo());
            return repo.save(existing);
        } else {
            // if no existing record, create new bound to username
            payload.setUsername(username);
            return repo.save(payload);
        }
    }
}
