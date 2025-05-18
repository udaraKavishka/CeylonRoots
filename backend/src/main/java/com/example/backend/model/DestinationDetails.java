package com.example.backend.model;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.example.backend.converter.StringListConverter;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "destination_details")
@Data
public class DestinationDetails extends BaseEntity {
	private String region;
    private String topAttraction;
    private String bestTimeToVisit;
    private String recommendedDuration;
    private String culturalTips;
    
    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "JSON")
    private List<String> attractions;
    
    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "JSON")
    private List<String> gallery;

    @OneToOne
    @JoinColumn(name = "destination_id")
    private Destination destination;

	public DestinationDetails(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, String region,
			String topAttraction, String bestTimeToVisit, String recommendedDuration, String culturalTips,
			List<String> attractions, List<String> gallery, Destination destination) {
		super(id, createdAt, updatedAt);
		this.region = region;
		this.topAttraction = topAttraction;
		this.bestTimeToVisit = bestTimeToVisit;
		this.recommendedDuration = recommendedDuration;
		this.culturalTips = culturalTips;
		this.attractions = attractions;
		this.gallery = gallery;
		this.destination = destination;
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

	public List<String> getGallery() {
		return gallery;
	}

	public void setGallery(List<String> gallery) {
		this.gallery = gallery;
	}

	public Destination getDestination() {
		return destination;
	}

	public void setDestination(Destination destination) {
		this.destination = destination;
	}
    
    
}