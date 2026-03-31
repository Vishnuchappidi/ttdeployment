package com.ecoclean.service;

import com.ecoclean.dto.DashboardStats;
import com.ecoclean.entity.User;
import com.ecoclean.entity.WasteRequest;
import com.ecoclean.repository.UserRepository;
import com.ecoclean.repository.WasteRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private WasteRequestRepository requestRepository;

    @Autowired
    private UserRepository userRepository;

    public DashboardStats getStats() {
        DashboardStats stats = new DashboardStats();

        stats.setTotalRequests(requestRepository.count());
        stats.setPendingRequests(requestRepository.countByStatus(WasteRequest.Status.PENDING));
        stats.setAssignedRequests(requestRepository.countByStatus(WasteRequest.Status.ASSIGNED));
        stats.setInProgressRequests(requestRepository.countByStatus(WasteRequest.Status.IN_PROGRESS));
        stats.setCollectedRequests(requestRepository.countByStatus(WasteRequest.Status.COLLECTED));
        stats.setRejectedRequests(requestRepository.countByStatus(WasteRequest.Status.REJECTED));
        stats.setHighPriorityRequests(requestRepository.countByUrgency(WasteRequest.Urgency.HIGH));
        stats.setCriticalRequests(requestRepository.countByUrgency(WasteRequest.Urgency.CRITICAL));
        stats.setTotalWorkers(userRepository.countByRole(User.Role.WORKER));
        stats.setTotalCitizens(userRepository.countByRole(User.Role.CITIZEN));

        // Requests by area
        Map<String, Long> byArea = new LinkedHashMap<>();
        requestRepository.countByArea().forEach(row -> {
            byArea.put((String) row[0], (Long) row[1]);
        });
        stats.setRequestsByArea(byArea);

        // Requests by type
        Map<String, Long> byType = new LinkedHashMap<>();
        requestRepository.countByWasteType().forEach(row -> {
            byType.put(row[0].toString(), (Long) row[1]);
        });
        stats.setRequestsByType(byType);

        // Requests by urgency
        Map<String, Long> byUrgency = new LinkedHashMap<>();
        requestRepository.countByUrgencyGroup().forEach(row -> {
            byUrgency.put(row[0].toString(), (Long) row[1]);
        });
        stats.setRequestsByUrgency(byUrgency);

        return stats;
    }
}
