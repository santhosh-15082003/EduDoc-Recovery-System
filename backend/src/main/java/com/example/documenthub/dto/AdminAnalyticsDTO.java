package com.example.documenthub.dto;

public class AdminAnalyticsDTO {

    private long total;
    private long approved;
    private long rejected;
    private long underVerification;
    private long pending;

    public AdminAnalyticsDTO(long total, long approved, long rejected, long underVerification, long pending) {
        this.total = total;
        this.approved = approved;
        this.rejected = rejected;
        this.underVerification = underVerification;
        this.pending = pending;
    }

    public long getTotal() { return total; }
    public long getApproved() { return approved; }
    public long getRejected() { return rejected; }
    public long getUnderVerification() { return underVerification; }
    public long getPending() { return pending; }
}