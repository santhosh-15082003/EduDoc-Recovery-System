package com.example.documenthub.repository;

import com.example.documenthub.entity.IssuerReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface IssuerReportRepository extends JpaRepository<IssuerReport, Long> {

    @Query("SELECT COUNT(i) FROM IssuerReport i WHERE LOWER(i.status) = LOWER(:status)")
    long countByStatusIgnoreCase(String status);

    // ⭐ ADDED FOR DATE FILTER ANALYTICS

    @Query("SELECT COUNT(i) FROM IssuerReport i WHERE i.createdAt BETWEEN :start AND :end")
    long countTotalBetween(@Param("start") LocalDateTime start,
                           @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(i) FROM IssuerReport i WHERE LOWER(i.status)='approved' AND i.createdAt BETWEEN :start AND :end")
    long countApprovedBetween(@Param("start") LocalDateTime start,
                              @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(i) FROM IssuerReport i WHERE LOWER(i.status)='rejected' AND i.createdAt BETWEEN :start AND :end")
    long countRejectedBetween(@Param("start") LocalDateTime start,
                              @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(i) FROM IssuerReport i WHERE LOWER(i.status)='pending' AND i.createdAt BETWEEN :start AND :end")
    long countPendingBetween(@Param("start") LocalDateTime start,
                             @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(i) FROM IssuerReport i WHERE LOWER(i.status)='under_verification' AND i.createdAt BETWEEN :start AND :end")
    long countVerificationBetween(@Param("start") LocalDateTime start,
                                  @Param("end") LocalDateTime end);
}

