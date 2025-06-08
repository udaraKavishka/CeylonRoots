package com.example.backend.dto;

import java.util.List;
import java.util.Set;

import com.example.backend.model.ActivityData;
import com.example.backend.model.MealType;

import lombok.Data;

@Data
public class ItineraryDayRequest {
    private Integer dayNumber;
    private String title;
    private String mainTown;
    private String description;
    private List<String> accommodation;
    private Set<MealType> meals;
    private List<ActivityData> activities;
    
    
	


	public ItineraryDayRequest(Integer dayNumber, String title, String mainTown, String description,
			List<String> accommodation, Set<MealType> meals, List<ActivityData> activities) {
		super();
		this.dayNumber = dayNumber;
		this.title = title;
		this.mainTown = mainTown;
		this.description = description;
		this.accommodation = accommodation;
		this.meals = meals;
		this.activities = activities;
	}


	public Integer getDayNumber() {
		return dayNumber;
	}


	public void setDayNumber(Integer dayNumber) {
		this.dayNumber = dayNumber;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
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


	


	public List<String> getAccommodation() {
		return accommodation;
	}


	public void setAccommodation(List<String> accommodation) {
		this.accommodation = accommodation;
	}


	public Set<MealType> getMeals() {
		return meals;
	}


	public void setMeals(Set<MealType> meals) {
		this.meals = meals;
	}


	public List<ActivityData> getactivities() {
		return activities;
	}


	public void setactivities(List<ActivityData> activities) {
		this.activities = activities;
	}

	
	

	
	
	




    

    
}
