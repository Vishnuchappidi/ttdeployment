package com.ecoclean.controller;

import com.ecoclean.dto.ApiResponse;
import com.ecoclean.dto.AssignmentDTO;
import com.ecoclean.dto.WasteRequestResponse;
import com.ecoclean.service.AssignmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @PostMapping
    public ResponseEntity<ApiResponse> assignWorker(@Valid @RequestBody AssignmentDTO dto) {
        WasteRequestResponse response = assignmentService.assignWorker(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Worker assigned successfully", response));
    }

    @GetMapping("/worker/{workerId}")
    public ResponseEntity<ApiResponse> getWorkerAssignments(@PathVariable Long workerId) {
        List<WasteRequestResponse> assignments = assignmentService.getWorkerAssignments(workerId);
        return ResponseEntity.ok(ApiResponse.success("Worker assignments fetched", assignments));
    }

    @PatchMapping("/request/{requestId}/status")
    public ResponseEntity<ApiResponse> updateAssignmentStatus(
            @PathVariable Long requestId,
            @RequestParam String status) {
        WasteRequestResponse response = assignmentService.updateAssignmentStatus(requestId, status);
        return ResponseEntity.ok(ApiResponse.success("Assignment status updated", response));
    }
}
