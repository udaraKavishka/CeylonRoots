package com.example.backend.repository;

import com.example.backend.model.ItineraryDay;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItineraryDayRepository extends JpaRepository<ItineraryDay, Long> {
}