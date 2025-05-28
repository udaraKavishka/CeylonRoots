package com.example.backend.repository;

import com.example.backend.model.Activity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
	List<Activity> findByDifficulty(Activity.Difficulty difficulty);
}