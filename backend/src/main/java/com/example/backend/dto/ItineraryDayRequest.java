package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ItineraryDayRequest {
    @NotBlank(message = "Title is required")
    @Size(max = 100, message = "Title must be less than 100 characters")
    private String title;

    @Size(max = 200, message = "Location must be less than 200 characters")
    private String location;

    @Size(max = 1000, message = "Description must be less than 1000 characters")
    private String description;

    @Size(max = 200, message = "Accommodation must be less than 200 characters")
    private String accommodation;

    @Size(max = 200, message = "Meals must be less than 200 characters")
    private String meals;

	public ItineraryDayRequest(
			@NotBlank(message = "Title is required") @Size(max = 100, message = "Title must be less than 100 characters") String title,
			@Size(max = 200, message = "Location must be less than 200 characters") String location,
			@Size(max = 1000, message = "Description must be less than 1000 characters") String description,
			@Size(max = 200, message = "Accommodation must be less than 200 characters") String accommodation,
			@Size(max = 200, message = "Meals must be less than 200 characters") String meals) {
		super();
		this.title = title;
		this.location = location;
		this.description = description;
		this.accommodation = accommodation;
		this.meals = meals;
	}

	public ItineraryDayRequest() {
		super();
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

	public String getAccommodation() {
		return accommodation;
	}

	public void setAccommodation(String accommodation) {
		this.accommodation = accommodation;
	}

	public String getMeals() {
		return meals;
	}

	public void setMeals(String meals) {
		this.meals = meals;
	}

    
    
}