package com.ecoclean.dto;

import java.util.Map;

public class DashboardStats {
    private long totalRequests;
    private long pendingRequests;
    private long assignedRequests;
    private long inProgressRequests;
    private long collectedRequests;
    private long rejectedRequests;
    private long highPriorityRequests;
    private long criticalRequests;
    private long totalWorkers;
    private long totalCitizens;
    private Map<String, Long> requestsByArea;
    private Map<String, Long> requestsByType;
    private Map<String, Long> requestsByUrgency;

    public DashboardStats() {}

    public long getTotalRequests() { return totalRequests; }
    public void setTotalRequests(long totalRequests) { this.totalRequests = totalRequests; }
    public long getPendingRequests() { return pendingRequests; }
    public void setPendingRequests(long pendingRequests) { this.pendingRequests = pendingRequests; }
    public long getAssignedRequests() { return assignedRequests; }
    public void setAssignedRequests(long assignedRequests) { this.assignedRequests = assignedRequests; }
    public long getInProgressRequests() { return inProgressRequests; }
    public void setInProgressRequests(long inProgressRequests) { this.inProgressRequests = inProgressRequests; }
    public long getCollectedRequests() { return collectedRequests; }
    public void setCollectedRequests(long collectedRequests) { this.collectedRequests = collectedRequests; }
    public long getRejectedRequests() { return rejectedRequests; }
    public void setRejectedRequests(long rejectedRequests) { this.rejectedRequests = rejectedRequests; }
    public long getHighPriorityRequests() { return highPriorityRequests; }
    public void setHighPriorityRequests(long highPriorityRequests) { this.highPriorityRequests = highPriorityRequests; }
    public long getCriticalRequests() { return criticalRequests; }
    public void setCriticalRequests(long criticalRequests) { this.criticalRequests = criticalRequests; }
    public long getTotalWorkers() { return totalWorkers; }
    public void setTotalWorkers(long totalWorkers) { this.totalWorkers = totalWorkers; }
    public long getTotalCitizens() { return totalCitizens; }
    public void setTotalCitizens(long totalCitizens) { this.totalCitizens = totalCitizens; }
    public Map<String, Long> getRequestsByArea() { return requestsByArea; }
    public void setRequestsByArea(Map<String, Long> requestsByArea) { this.requestsByArea = requestsByArea; }
    public Map<String, Long> getRequestsByType() { return requestsByType; }
    public void setRequestsByType(Map<String, Long> requestsByType) { this.requestsByType = requestsByType; }
    public Map<String, Long> getRequestsByUrgency() { return requestsByUrgency; }
    public void setRequestsByUrgency(Map<String, Long> requestsByUrgency) { this.requestsByUrgency = requestsByUrgency; }
}
