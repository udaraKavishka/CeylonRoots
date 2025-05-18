package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.TravelComponent;

public interface TravelComponentRepository extends JpaRepository<TravelComponent, Long> {
}