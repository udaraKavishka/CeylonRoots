package com.example.backend.repository;

import com.example.backend.model.ItineraryDay;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ItineraryDayRepository extends JpaRepository<ItineraryDay, Long> {
    
    // Find all itinerary days for a specific travel package
    List<ItineraryDay> findByTravelPackageId(Long travelPackageId);
    
    // Find a specific day within a specific package
    Optional<ItineraryDay> findByIdAndTravelPackageId(Long id, Long travelPackageId);
    
    // Check existence by package ID (optional)
    boolean existsByTravelPackageId(Long travelPackageId);
}