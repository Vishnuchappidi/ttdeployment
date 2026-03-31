package com.ecoclean.service;

import com.ecoclean.dto.AssignmentDTO;
import com.ecoclean.dto.WasteRequestResponse;
import com.ecoclean.entity.Assignment;
import com.ecoclean.entity.User;
import com.ecoclean.entity.WasteRequest;
import com.ecoclean.exception.BadRequestException;
import com.ecoclean.exception.ResourceNotFoundException;
import com.ecoclean.repository.AssignmentRepository;
import com.ecoclean.repository.UserRepository;
import com.ecoclean.repository.WasteRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private WasteRequestRepository requestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WasteRequestService wasteRequestService;

    @Transactional
    public WasteRequestResponse assignWorker(AssignmentDTO dto) {
        WasteRequest request = requestRepository.findById(dto.getRequestId())
                .orElseThrow(() -> new ResourceNotFoundException("Waste request not found with ID: " + dto.getRequestId()));

        User worker = userRepository.findById(dto.getWorkerId())
                .orElseThrow(() -> new ResourceNotFoundException("Worker not found with ID: " + dto.getWorkerId()));

        if (worker.getRole() != User.Role.WORKER) {
            throw new BadRequestException("User with ID " + dto.getWorkerId() + " is not a worker");
        }

        // Check if already assigned
        if (assignmentRepository.existsByWasteRequestId(dto.getRequestId())) {
            // Update existing assignment
            Assignment existing = assignmentRepository.findByWasteRequestId(dto.getRequestId()).get();
            existing.setWorker(worker);
            existing.setNotes(dto.getNotes());
            existing.setStatus(Assignment.AssignmentStatus.ASSIGNED);
            assignmentRepository.save(existing);
        } else {
            // Create new assignment
            Assignment assignment = new Assignment();
            assignment.setWasteRequest(request);
            assignment.setWorker(worker);
            assignment.setNotes(dto.getNotes());

            if (dto.getAssignedById() != null) {
                User assignedBy = userRepository.findById(dto.getAssignedById()).orElse(null);
                assignment.setAssignedBy(assignedBy);
            }

            assignmentRepository.save(assignment);
        }

        // Update request status to ASSIGNED
        request.setStatus(WasteRequest.Status.ASSIGNED);
        requestRepository.save(request);

        return wasteRequestService.getRequestById(dto.getRequestId());
    }

    public List<WasteRequestResponse> getWorkerAssignments(Long workerId) {
        return assignmentRepository.findByWorkerIdOrderByAssignedAtDesc(workerId).stream()
                .map(assignment -> wasteRequestService.getRequestById(assignment.getWasteRequest().getId()))
                .collect(Collectors.toList());
    }

    @Transactional
    public WasteRequestResponse updateAssignmentStatus(Long requestId, String status) {
        Assignment assignment = assignmentRepository.findByWasteRequestId(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("No assignment found for request ID: " + requestId));

        Assignment.AssignmentStatus assignmentStatus;
        try {
            assignmentStatus = Assignment.AssignmentStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid assignment status: " + status);
        }

        assignment.setStatus(assignmentStatus);
        if (assignmentStatus == Assignment.AssignmentStatus.COMPLETED) {
            assignment.setCompletedAt(LocalDateTime.now());
        }
        assignmentRepository.save(assignment);

        // Map assignment status to request status
        WasteRequest.Status requestStatus;
        switch (assignmentStatus) {
            case IN_PROGRESS:
                requestStatus = WasteRequest.Status.IN_PROGRESS;
                break;
            case COMPLETED:
                requestStatus = WasteRequest.Status.COLLECTED;
                break;
            default:
                requestStatus = WasteRequest.Status.ASSIGNED;
                break;
        }

        return wasteRequestService.updateStatus(requestId, requestStatus.name(), null, assignment.getWorker().getId());
    }
}
