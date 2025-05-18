package com.example.backend.model;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("ACTIVITY")
@Data
@EqualsAndHashCode(callSuper = true)
public class Activity extends TravelComponent {
    public enum Difficulty { EASY, MODERATE, CHALLENGING }

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

	public Activity(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, String name, String description,
			String location, String imageUrl, BigDecimal price, Coordinates coordinates, Integer duration,
			Set<String> tags, Difficulty difficulty) {
		super(id, createdAt, updatedAt, name, description, location, imageUrl, price, coordinates, duration, tags);
		this.difficulty = difficulty;
	}

	public Difficulty getDifficulty() {
		return difficulty;
	}

	public void setDifficulty(Difficulty difficulty) {
		this.difficulty = difficulty;
	}



}