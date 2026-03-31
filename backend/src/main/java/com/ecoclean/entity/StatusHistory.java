package com.ecoclean.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "status_history")
public class StatusHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "request_id", nullable = false)
    private WasteRequest wasteRequest;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private WasteRequest.Status previousStatus;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private WasteRequest.Status newStatus;

    @Column(length = 300)
    private String remarks;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "changed_by")
    private User changedBy;

    @Column(nullable = false, updatable = false)
    private LocalDateTime changedAt;

    @PrePersist
    protected void onCreate() {
        this.changedAt = LocalDateTime.now();
    }

    // Constructors
    public StatusHistory() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public WasteRequest getWasteRequest() { return wasteRequest; }
    public void setWasteRequest(WasteRequest wasteRequest) { this.wasteRequest = wasteRequest; }

    public WasteRequest.Status getPreviousStatus() { return previousStatus; }
    public void setPreviousStatus(WasteRequest.Status previousStatus) { this.previousStatus = previousStatus; }

    public WasteRequest.Status getNewStatus() { return newStatus; }
    public void setNewStatus(WasteRequest.Status newStatus) { this.newStatus = newStatus; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }

    public User getChangedBy() { return changedBy; }
    public void setChangedBy(User changedBy) { this.changedBy = changedBy; }

    public LocalDateTime getChangedAt() { return changedAt; }
    public void setChangedAt(LocalDateTime changedAt) { this.changedAt = changedAt; }
}
