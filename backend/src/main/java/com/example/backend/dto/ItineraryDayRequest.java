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
    private Long accommodationId;
    private Set<MealType> meals;
    private List<ActivityData> activity;
    
    
	public ItineraryDayRequest(Integer dayNumber, String title, String mainTown, String description,
			Long accommodationId, Set<MealType> meals, List<ActivityData> activity) {
		super();
		this.dayNumber = dayNumber;
		this.title = title;
		this.mainTown = mainTown;
		this.description = description;
		this.accommodationId = accommodationId;
		this.meals = meals;
		this.activity = activity;
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


	public Long getAccommodationId() {
		return accommodationId;
	}


	public void setAccommodationId(Long accommodationId) {
		this.accommodationId = accommodationId;
	}


	public Set<MealType> getMeals() {
		return meals;
	}


	public void setMeals(Set<MealType> meals) {
		this.meals = meals;
	}


	public List<ActivityData> getActivity() {
		return activity;
	}


	public void setActivity(List<ActivityData> activity) {
		this.activity = activity;
	}

	
	

	
	
	




    

    
}
