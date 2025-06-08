package com.example.backend.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItineraryDay extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "travel_package_id")
    @JsonBackReference
    private TravelPackage travelPackage;

//    @ManyToOne
//    @JoinColumn(name = "accommodation_id")
//    private Accommodation accommodation;

    private String title;
    private Integer dayNumber;
    private String mainTown;
    private String description;
    private List<String> accommodation;
    
    @ElementCollection(targetClass = MealType.class)             
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "day_meal")
    private Set<MealType> meals = new LinkedHashSet<>();

//    @ManyToMany
//    @JoinTable(name = "itinerary_activities",
//        joinColumns = @JoinColumn(name = "itinerary_day_id"),
//        inverseJoinColumns = @JoinColumn(name = "activity_id"))
//    private List<Activity> activities = new ArrayList<>();
    
    
    @ElementCollection
    @CollectionTable(name = "itinerary_day_activities", joinColumns = @JoinColumn(name = "itinerary_day_id"))
    private List<ActivityData> activities;

	public ItineraryDay() {
		
	}

	
	
	
	public ItineraryDay(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, TravelPackage travelPackage,
			List<String> accommodation, String title, Integer dayNumber, String mainTown, String description,
			Set<MealType> meals, List<ActivityData> activities) {
		super(id, createdAt, updatedAt);
		this.travelPackage = travelPackage;
		this.accommodation = accommodation;
		this.title = title;
		this.dayNumber = dayNumber;
		this.mainTown = mainTown;
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

	public List<String> getAccommodation() {
		return accommodation;
	}

	public void setAccommodation(List<String> accommodation) {
		this.accommodation = accommodation;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Integer getDayNumber() {
		return dayNumber;
	}

	public void setDayNumber(Integer dayNumber) {
		this.dayNumber = dayNumber;
	}

	public String getMainTown() {
		return mainTown;
	}

	public void setMainTown(String mainTown) {
		this.mainTown = mainTown;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Set<MealType> getMeals() {
		return meals;
	}

	public void setMeals(Set<MealType> meals) {
		this.meals = meals;
	}




	public List<ActivityData> getActivities() {
		return activities;
	}




	public void setActivities(List<ActivityData> activities) {
		this.activities = activities;
	}

	
	
    
}
