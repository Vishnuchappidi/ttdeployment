package com.ecoclean.service;

import com.ecoclean.dto.WasteRequestDTO;
import com.ecoclean.dto.WasteRequestResponse;
import com.ecoclean.entity.Assignment;
import com.ecoclean.entity.StatusHistory;
import com.ecoclean.entity.User;
import com.ecoclean.entity.WasteRequest;
import com.ecoclean.exception.BadRequestException;
import com.ecoclean.exception.ResourceNotFoundException;
import com.ecoclean.repository.AssignmentRepository;
import com.ecoclean.repository.StatusHistoryRepository;
import com.ecoclean.repository.UserRepository;
import com.ecoclean.repository.WasteRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WasteRequestService {

    @Autowired
    private WasteRequestRepository requestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private StatusHistoryRepository statusHistoryRepository;

    @Transactional
    public WasteRequestResponse createRequest(WasteRequestDTO dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + dto.getUserId()));

        WasteRequest request = new WasteRequest();
        request.setUser(user);
        request.setDescription(dto.getDescription());
        request.setLocation(dto.getLocation());
        request.setArea(dto.getArea());
        request.setCity(dto.getCity());
        request.setPincode(dto.getPincode());
        request.setPhotoUrl(dto.getPhotoUrl());

        try {
            request.setWasteType(WasteRequest.WasteType.valueOf(dto.getWasteType().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid waste type: " + dto.getWasteType());
        }

        try {
            request.setUrgency(WasteRequest.Urgency.valueOf(dto.getUrgency().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid urgency: " + dto.getUrgency());
        }

        request.setStatus(WasteRequest.Status.PENDING);
        WasteRequest saved = requestRepository.save(request);
        return mapToResponse(saved);
    }

    public List<WasteRequestResponse> getAllRequests() {
        return requestRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public WasteRequestResponse getRequestById(Long id) {
        WasteRequest request = requestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Waste request not found with ID: " + id));
        return mapToResponse(request);
    }

    public List<WasteRequestResponse> getRequestsByUserId(Long userId) {
        return requestRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<WasteRequestResponse> searchByEmail(String email) {
        return requestRepository.findByUserEmail(email).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<WasteRequestResponse> searchByPhone(String phone) {
        return requestRepository.findByUserPhone(phone).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<WasteRequestResponse> filterRequests(String status, String area, String urgency) {
        WasteRequest.Status statusEnum = null;
        WasteRequest.Urgency urgencyEnum = null;

        if (status != null && !status.isEmpty()) {
            try {
                statusEnum = WasteRequest.Status.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new BadRequestException("Invalid status: " + status);
            }
        }

        if (urgency != null && !urgency.isEmpty()) {
            try {
                urgencyEnum = WasteRequest.Urgency.valueOf(urgency.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new BadRequestException("Invalid urgency: " + urgency);
            }
        }

        String areaParam = (area != null && !area.isEmpty()) ? area : null;

        return requestRepository.findWithFilters(statusEnum, areaParam, urgencyEnum).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public WasteRequestResponse updateStatus(Long id, String newStatus, String remarks, Long changedById) {
        WasteRequest request = requestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Waste request not found with ID: " + id));

        WasteRequest.Status previousStatus = request.getStatus();
        WasteRequest.Status statusEnum;
        try {
            statusEnum = WasteRequest.Status.valueOf(newStatus.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid status: " + newStatus);
        }

        request.setStatus(statusEnum);
        if (remarks != null) {
            request.setAdminRemarks(remarks);
        }
        if (statusEnum == WasteRequest.Status.COLLECTED) {
            request.setCollectedAt(LocalDateTime.now());
        }

        // Save status history
        StatusHistory history = new StatusHistory();
        history.setWasteRequest(request);
        history.setPreviousStatus(previousStatus);
        history.setNewStatus(statusEnum);
        history.setRemarks(remarks);
        if (changedById != null) {
            User changedBy = userRepository.findById(changedById).orElse(null);
            history.setChangedBy(changedBy);
        }
        statusHistoryRepository.save(history);

        WasteRequest saved = requestRepository.save(request);
        return mapToResponse(saved);
    }

    public void deleteRequest(Long id) {
        if (!requestRepository.existsById(id)) {
            throw new ResourceNotFoundException("Waste request not found with ID: " + id);
        }
        // Delete related assignments and history first
        assignmentRepository.findByWasteRequestId(id).ifPresent(a -> assignmentRepository.delete(a));
        statusHistoryRepository.findByWasteRequestIdOrderByChangedAtDesc(id)
                .forEach(h -> statusHistoryRepository.delete(h));
        requestRepository.deleteById(id);
    }

    private WasteRequestResponse mapToResponse(WasteRequest request) {
        WasteRequestResponse response = new WasteRequestResponse();
        response.setId(request.getId());
        response.setUserId(request.getUser().getId());
        response.setUserName(request.getUser().getFullName());
        response.setUserEmail(request.getUser().getEmail());
        response.setUserPhone(request.getUser().getPhone());
        response.setWasteType(request.getWasteType().name());
        response.setDescription(request.getDescription());
        response.setLocation(request.getLocation());
        response.setArea(request.getArea());
        response.setCity(request.getCity());
        response.setPincode(request.getPincode());
        response.setUrgency(request.getUrgency().name());
        response.setPhotoUrl(request.getPhotoUrl());
        response.setStatus(request.getStatus().name());
        response.setAdminRemarks(request.getAdminRemarks());
        response.setCreatedAt(request.getCreatedAt());
        response.setUpdatedAt(request.getUpdatedAt());
        response.setCollectedAt(request.getCollectedAt());

        // Include assignment info if exists
        assignmentRepository.findByWasteRequestId(request.getId()).ifPresent(assignment -> {
            WasteRequestResponse.AssignmentInfo info = new WasteRequestResponse.AssignmentInfo();
            info.setAssignmentId(assignment.getId());
            info.setWorkerId(assignment.getWorker().getId());
            info.setWorkerName(assignment.getWorker().getFullName());
            info.setWorkerPhone(assignment.getWorker().getPhone());
            info.setNotes(assignment.getNotes());
            info.setAssignedAt(assignment.getAssignedAt());
            info.setStatus(assignment.getStatus().name());
            response.setAssignment(info);
        });

        return response;
    }
}
