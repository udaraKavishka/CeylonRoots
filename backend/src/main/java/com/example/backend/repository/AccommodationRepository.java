package com.example.backend.repository;

import com.example.backend.model.Accomodation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccommodationRepository extends JpaRepository<Accomodation, Long> {
}