// package com.example.documenthub.repository;

// import com.example.documenthub.entity.DocumentRequest;
// import com.example.documenthub.entity.User;
// import com.example.documenthub.dto.DocumentRequestViewDTO;

// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;

// import java.util.List;

// public interface DocumentRequestRepository
//         extends JpaRepository<DocumentRequest, Long> {

//     List<DocumentRequest> findByUser(User user);

//     @Query("""
//         SELECT new com.example.documenthub.dto.DocumentRequestViewDTO(
//             p.firstName,
//             p.lastName,
//             p.dob,
//             p.addressLine1,
//             p.addressLine2,
//             p.city,
//             p.state,
//             p.zip,
//             u.email,
//             p.phone,
//             d.requesterType,
//             d.schoolName,
//             d.grade,
//             d.department,
//             d.reason,
//             r.documentType,
//             r.deliveryMethod,
//             r.specialInstructions,
//             f.fileName,
//             f.filePath
//         )
//         FROM DocumentRequest r
//         JOIN r.user u
//         JOIN PersonalDetails p ON p.user.id = u.id
//         JOIN DocumentRequestDetails d ON d.request.id = r.id
//         LEFT JOIN DocumentFiles f ON f.request.id = r.id
//         WHERE r.id = :id
//     """)
//     DocumentRequestViewDTO findRequestViewById(@Param("id") Long id);
// }

package com.example.documenthub.repository;

import com.example.documenthub.entity.DocumentRequest;
import com.example.documenthub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface DocumentRequestRepository
        extends JpaRepository<DocumentRequest, Long> {

    List<DocumentRequest> findByUser(User user);

    // ===============================
    // Analytics Queries
    // ===============================

    @Query("SELECT COUNT(d) FROM DocumentRequest d")
    long countTotalRequests();

    @Query("SELECT COUNT(d) FROM DocumentRequest d WHERE d.status = 'APPROVED'")
    long countApproved();

    @Query("SELECT COUNT(d) FROM DocumentRequest d WHERE d.status = 'REJECTED'")
    long countRejected();

    @Query("SELECT COUNT(d) FROM DocumentRequest d WHERE d.status = 'PENDING'")
    long countPending();

    @Query("SELECT COUNT(d) FROM DocumentRequest d WHERE d.status = 'UNDER_VERIFICATION'")
    long countUnderVerification();

    // ⭐ ADDED FOR DATE FILTER ANALYTICS

    @Query("SELECT COUNT(d) FROM DocumentRequest d WHERE d.createdAt BETWEEN :start AND :end")
    long countTotalBetween(@Param("start") LocalDateTime start,
                           @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(d) FROM DocumentRequest d WHERE d.status='APPROVED' AND d.createdAt BETWEEN :start AND :end")
    long countApprovedBetween(@Param("start") LocalDateTime start,
                              @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(d) FROM DocumentRequest d WHERE d.status='REJECTED' AND d.createdAt BETWEEN :start AND :end")
    long countRejectedBetween(@Param("start") LocalDateTime start,
                              @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(d) FROM DocumentRequest d WHERE d.status='PENDING' AND d.createdAt BETWEEN :start AND :end")
    long countPendingBetween(@Param("start") LocalDateTime start,
                             @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(d) FROM DocumentRequest d WHERE d.status='UNDER_VERIFICATION' AND d.createdAt BETWEEN :start AND :end")
    long countUnderVerificationBetween(@Param("start") LocalDateTime start,
                                       @Param("end") LocalDateTime end);
}
