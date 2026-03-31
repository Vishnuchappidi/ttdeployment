package com.ecoclean.repository;

import com.ecoclean.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByWorkerIdOrderByAssignedAtDesc(Long workerId);
    List<Assignment> findByWorkerIdAndStatusOrderByAssignedAtDesc(Long workerId, Assignment.AssignmentStatus status);
    Optional<Assignment> findByWasteRequestId(Long requestId);
    boolean existsByWasteRequestId(Long requestId);
    long countByWorkerId(Long workerId);
    long countByWorkerIdAndStatus(Long workerId, Assignment.AssignmentStatus status);
}
