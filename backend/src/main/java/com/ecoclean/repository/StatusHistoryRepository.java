package com.ecoclean.repository;

import com.ecoclean.entity.StatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatusHistoryRepository extends JpaRepository<StatusHistory, Long> {
    List<StatusHistory> findByWasteRequestIdOrderByChangedAtDesc(Long requestId);
}
