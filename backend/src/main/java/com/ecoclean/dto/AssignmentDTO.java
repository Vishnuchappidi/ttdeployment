package com.ecoclean.dto;

import jakarta.validation.constraints.NotNull;

public class AssignmentDTO {

    @NotNull(message = "Request ID is required")
    private Long requestId;

    @NotNull(message = "Worker ID is required")
    private Long workerId;

    private Long assignedById;
    private String notes;

    public AssignmentDTO() {}

    public Long getRequestId() { return requestId; }
    public void setRequestId(Long requestId) { this.requestId = requestId; }

    public Long getWorkerId() { return workerId; }
    public void setWorkerId(Long workerId) { this.workerId = workerId; }

    public Long getAssignedById() { return assignedById; }
    public void setAssignedById(Long assignedById) { this.assignedById = assignedById; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
