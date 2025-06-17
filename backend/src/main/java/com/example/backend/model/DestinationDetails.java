package com.example.backend.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DestinationDetails extends BaseEntity {
    
	private String name;
	private String description;
    private String region;
    private String topAttraction;
    private String bestTimeToVisit;
    private String recommendedDuration;
    private String culturalTips;
    private String image;
	
    @ElementCollection @CollectionTable(name = "destination_attraction")
    private List<String> attractions = new ArrayList<>();
    
    @Embedded
    private Coordinates coordinates;
//    @ManyToMany(mappedBy = "destinationDetails")
//    private Set<TravelPackage> packages = new HashSet<>();
    
    
	public DestinationDetails() {
		
	}





	public DestinationDetails(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, String name, String description,
		String region, String topAttraction, String bestTimeToVisit, String recommendedDuration, String culturalTips,
		String image, List<String> attractions, Coordinates coordinates) {
	super(id, createdAt, updatedAt);
	this.name = name;
	this.description = description;
	this.region = region;
	this.topAttraction = topAttraction;
	this.bestTimeToVisit = bestTimeToVisit;
	this.recommendedDuration = recommendedDuration;
	this.culturalTips = culturalTips;
	this.image = image;
	this.attractions = attractions;
	this.coordinates = coordinates;
}





	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public String getRegion() {
		return region;
	}


	public void setRegion(String region) {
		this.region = region;
	}


	public String getTopAttraction() {
		return topAttraction;
	}


	public void setTopAttraction(String topAttraction) {
		this.topAttraction = topAttraction;
	}


	public String getBestTimeToVisit() {
		return bestTimeToVisit;
	}


	public void setBestTimeToVisit(String bestTimeToVisit) {
		this.bestTimeToVisit = bestTimeToVisit;
	}


	public String getRecommendedDuration() {
		return recommendedDuration;
	}


	public void setRecommendedDuration(String recommendedDuration) {
		this.recommendedDuration = recommendedDuration;
	}


	public String getCulturalTips() {
		return culturalTips;
	}


	public void setCulturalTips(String culturalTips) {
		this.culturalTips = culturalTips;
	}


	public List<String> getAttractions() {
		return attractions;
	}


	public void setAttractions(List<String> attractions) {
		this.attractions = attractions;
	}


	public Coordinates getCoordinates() {
		return coordinates;
	}


	public void setCoordinates(Coordinates coordinates) {
		this.coordinates = coordinates;
	}





	public String getImage() {
		return image;
	}





	public void setImage(String image) {
		this.image = image;
	}


	
    
    
    
}