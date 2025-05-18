package com.example.backend.model;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.example.backend.converter.LongListConverter;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "itinerary_day")
@Data
public class ItineraryDay extends BaseEntity {
	private String title;
    private String location;
    private String description;
    private String meals;

    @ManyToOne
    @JoinColumn(name = "accommodation_id")
    private Accommodation accommodation;

    @Convert(converter = LongListConverter.class)
    @Column(columnDefinition = "JSON")
    private List<Long> activityIds;
    
    @ManyToOne
    @JoinColumn(name = "package_id")
    private TravelPackage travelPackage;

	public ItineraryDay(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, String title, String location,
			String description, String meals, Accommodation accommodation, List<Long> activityIds,
			TravelPackage travelPackage) {
		super(id, createdAt, updatedAt);
		this.title = title;
		this.location = location;
		this.description = description;
		this.meals = meals;
		this.accommodation = accommodation;
		this.activityIds = activityIds;
		this.travelPackage = travelPackage;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getMeals() {
		return meals;
	}

	public void setMeals(String meals) {
		this.meals = meals;
	}

	public Accommodation getAccommodation() {
		return accommodation;
	}

	public void setAccommodation(Accommodation accommodation) {
		this.accommodation = accommodation;
	}

	public List<Long> getActivityIds() {
		return activityIds;
	}

	public void setActivityIds(List<Long> activityIds) {
		this.activityIds = activityIds;
	}

	public TravelPackage getTravelPackage() {
		return travelPackage;
	}

	public void setTravelPackage(TravelPackage travelPackage) {
		this.travelPackage = travelPackage;
	}
    
    
}