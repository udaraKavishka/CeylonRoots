package com.example.backend.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItineraryDay extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "travel_package_id")
    private TravelPackage travelPackage;

    @ManyToOne
    @JoinColumn(name = "accommodation_id")
    private Accommodation accommodation;

    private String title;
    private String location;
    private String description;
    private String meals;

    @ManyToMany
    @JoinTable(name = "itinerary_activities",
        joinColumns = @JoinColumn(name = "itinerary_day_id"),
        inverseJoinColumns = @JoinColumn(name = "activity_id"))
    private List<Activity> activities = new ArrayList<>();

	public ItineraryDay(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, TravelPackage travelPackage,
			Accommodation accommodation, String title, String location, String description, String meals,
			List<Activity> activities) {
		super(id, createdAt, updatedAt);
		this.travelPackage = travelPackage;
		this.accommodation = accommodation;
		this.title = title;
		this.location = location;
		this.description = description;
		this.meals = meals;
		this.activities = activities;
	}

	public TravelPackage getTravelPackage() {
		return travelPackage;
	}

	public void setTravelPackage(TravelPackage travelPackage) {
		this.travelPackage = travelPackage;
	}

	public Accommodation getAccommodation() {
		return accommodation;
	}

	public void setAccommodation(Accommodation accommodation) {
		this.accommodation = accommodation;
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

	public List<Activity> getActivities() {
		return activities;
	}

	public void setActivities(List<Activity> activities) {
		this.activities = activities;
	}
    
    
}
