package com.example.backend.dto;

import java.util.List;
import java.util.Set;

public class TravelPackageRequest {
    private String title;
    private String description;
    private double price;
    private int duration;
    private String theme;
    private int groupSize;
    private double rating;
    private Long destinationId;
    private Set<Long> activityIds;
    private List<ItineraryDayRequest> itinerary;
    
    
	public TravelPackageRequest(String title, String description, double price, int duration, String theme,
			int groupSize, double rating, Long destinationId, Set<Long> activityIds,
			List<ItineraryDayRequest> itinerary) {
		super();
		this.title = title;
		this.description = description;
		this.price = price;
		this.duration = duration;
		this.theme = theme;
		this.groupSize = groupSize;
		this.rating = rating;
		this.destinationId = destinationId;
		this.activityIds = activityIds;
		this.itinerary = itinerary;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public double getPrice() {
		return price;
	}


	public void setPrice(double price) {
		this.price = price;
	}


	public int getDuration() {
		return duration;
	}


	public void setDuration(int duration) {
		this.duration = duration;
	}


	public String getTheme() {
		return theme;
	}


	public void setTheme(String theme) {
		this.theme = theme;
	}


	public int getGroupSize() {
		return groupSize;
	}


	public void setGroupSize(int groupSize) {
		this.groupSize = groupSize;
	}


	public double getRating() {
		return rating;
	}


	public void setRating(double rating) {
		this.rating = rating;
	}


	public Long getDestinationId() {
		return destinationId;
	}


	public void setDestinationId(Long destinationId) {
		this.destinationId = destinationId;
	}


	public Set<Long> getActivityIds() {
		return activityIds;
	}


	public void setActivityIds(Set<Long> activityIds) {
		this.activityIds = activityIds;
	}


	public List<ItineraryDayRequest> getItinerary() {
		return itinerary;
	}


	public void setItinerary(List<ItineraryDayRequest> itinerary) {
		this.itinerary = itinerary;
	}
	
	
    
    
}
