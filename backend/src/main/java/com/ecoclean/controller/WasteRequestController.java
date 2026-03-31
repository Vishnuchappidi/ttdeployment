package com.ecoclean.controller;

import com.ecoclean.dto.ApiResponse;
import com.ecoclean.dto.WasteRequestDTO;
import com.ecoclean.dto.WasteRequestResponse;
import com.ecoclean.service.WasteRequestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class WasteRequestController {

    @Autowired
    private WasteRequestService requestService;

    @PostMapping
    public ResponseEntity<ApiResponse> createRequest(@Valid @RequestBody WasteRequestDTO dto) {
        WasteRequestResponse response = requestService.createRequest(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Waste request created successfully", response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllRequests() {
        List<WasteRequestResponse> requests = requestService.getAllRequests();
        return ResponseEntity.ok(ApiResponse.success("Requests fetched", requests));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getRequestById(@PathVariable Long id) {
        WasteRequestResponse response = requestService.getRequestById(id);
        return ResponseEntity.ok(ApiResponse.success("Request fetched", response));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse> getRequestsByUser(@PathVariable Long userId) {
        List<WasteRequestResponse> requests = requestService.getRequestsByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success("User requests fetched", requests));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse> searchRequests(
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String phone,
            @RequestParam(required = false) Long requestId) {

        if (requestId != null) {
            WasteRequestResponse response = requestService.getRequestById(requestId);
            return ResponseEntity.ok(ApiResponse.success("Request found", List.of(response)));
        }

        if (email != null && !email.isEmpty()) {
            List<WasteRequestResponse> results = requestService.searchByEmail(email);
            return ResponseEntity.ok(ApiResponse.success("Search results", results));
        }

        if (phone != null && !phone.isEmpty()) {
            List<WasteRequestResponse> results = requestService.searchByPhone(phone);
            return ResponseEntity.ok(ApiResponse.success("Search results", results));
        }

        return ResponseEntity.ok(ApiResponse.success("No search criteria provided", List.of()));
    }

    @GetMapping("/filter")
    public ResponseEntity<ApiResponse> filterRequests(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String area,
            @RequestParam(required = false) String urgency) {
        List<WasteRequestResponse> requests = requestService.filterRequests(status, area, urgency);
        return ResponseEntity.ok(ApiResponse.success("Filtered requests", requests));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse> updateStatus(
            @PathVariable Long id,
            @RequestParam String status,
            @RequestParam(required = false) String remarks,
            @RequestParam(required = false) Long changedBy) {
        WasteRequestResponse response = requestService.updateStatus(id, status, remarks, changedBy);
        return ResponseEntity.ok(ApiResponse.success("Status updated", response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteRequest(@PathVariable Long id) {
        requestService.deleteRequest(id);
        return ResponseEntity.ok(ApiResponse.success("Request deleted"));
    }
}
