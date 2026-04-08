package com.example.documenthub.repository;

import com.example.documenthub.entity.PersonalDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PersonalDetailsRepository extends JpaRepository<PersonalDetails, Long> {
    Optional<PersonalDetails> findByUsername(String username);
}
