package com.example.documenthub.repository;

import com.example.documenthub.entity.MissingReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface MissingReportRepository extends JpaRepository<MissingReport, Long> {

    List<MissingReport> findByUserId(Long userId);

    //  ADDED FOR ADMIN DASHBOARD COUNT
    long countByStatus(String status);
    
    // ===== ADDED FOR DATE FILTER ANALYTICS =====

    @Query("SELECT COUNT(m) FROM MissingReport m WHERE m.createdAt BETWEEN :start AND :end")
    long countTotalBetween(@Param("start") LocalDateTime start,
                           @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(m) FROM MissingReport m WHERE m.status='APPROVED' AND m.createdAt BETWEEN :start AND :end")
    long countApprovedBetween(@Param("start") LocalDateTime start,
                              @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(m) FROM MissingReport m WHERE m.status='REJECTED' AND m.createdAt BETWEEN :start AND :end")
    long countRejectedBetween(@Param("start") LocalDateTime start,
                              @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(m) FROM MissingReport m WHERE m.status='UNDER_VERIFICATION' AND m.createdAt BETWEEN :start AND :end")
    long countVerificationBetween(@Param("start") LocalDateTime start,
                                  @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(m) FROM MissingReport m WHERE m.status='PENDING' AND m.createdAt BETWEEN :start AND :end")
    long countPendingBetween(@Param("start") LocalDateTime start,
                             @Param("end") LocalDateTime end);

}