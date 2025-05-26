package com.example.backend.model;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("ACTIVITY")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Activity extends TravelComponent {
    public enum Difficulty { EASY, MODERATE, CHALLENGING }
    
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;
    
    @ManyToMany(mappedBy = "activities")
    private List<GalleryItem> galleryItems = new ArrayList<>();

	

	

	public Activity(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, String name, String description,
			String location, String imageUrl, BigDecimal price, Double lat, Double lng, Integer duration,
			Set<String> tags, Difficulty difficulty, List<GalleryItem> galleryItems) {
		super(id, createdAt, updatedAt, name, description, location, imageUrl, price, lat, lng, duration, tags);
		this.difficulty = difficulty;
		this.galleryItems = galleryItems;
	}

	public Difficulty getDifficulty() {
		return difficulty;
	}

	public void setDifficulty(Difficulty difficulty) {
		this.difficulty = difficulty;
	}
    
	
    
}