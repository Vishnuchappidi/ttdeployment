package com.ecoclean.repository;

import com.ecoclean.entity.WasteRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WasteRequestRepository extends JpaRepository<WasteRequest, Long> {
    List<WasteRequest> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<WasteRequest> findByStatusOrderByCreatedAtDesc(WasteRequest.Status status);
    List<WasteRequest> findAllByOrderByCreatedAtDesc();
    long countByStatus(WasteRequest.Status status);
    long countByUrgency(WasteRequest.Urgency urgency);

    @Query("SELECT w FROM WasteRequest w WHERE w.user.email = :email ORDER BY w.createdAt DESC")
    List<WasteRequest> findByUserEmail(@Param("email") String email);

    @Query("SELECT w FROM WasteRequest w WHERE w.user.phone = :phone ORDER BY w.createdAt DESC")
    List<WasteRequest> findByUserPhone(@Param("phone") String phone);

    @Query("SELECT w FROM WasteRequest w WHERE " +
           "(:status IS NULL OR w.status = :status) AND " +
           "(:area IS NULL OR w.area = :area) AND " +
           "(:urgency IS NULL OR w.urgency = :urgency) " +
           "ORDER BY w.createdAt DESC")
    List<WasteRequest> findWithFilters(
            @Param("status") WasteRequest.Status status,
            @Param("area") String area,
            @Param("urgency") WasteRequest.Urgency urgency);

    @Query("SELECT w.area, COUNT(w) FROM WasteRequest w WHERE w.area IS NOT NULL GROUP BY w.area ORDER BY COUNT(w) DESC")
    List<Object[]> countByArea();

    @Query("SELECT w.wasteType, COUNT(w) FROM WasteRequest w GROUP BY w.wasteType ORDER BY COUNT(w) DESC")
    List<Object[]> countByWasteType();

    @Query("SELECT w.urgency, COUNT(w) FROM WasteRequest w GROUP BY w.urgency")
    List<Object[]> countByUrgencyGroup();
}
