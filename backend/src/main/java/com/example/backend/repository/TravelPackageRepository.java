package com.example.backend.repository;

import com.example.backend.model.TravelPackage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelPackageRepository extends JpaRepository<TravelPackage, Long> {
	boolean existsByTitleIgnoreCase(String title);
}