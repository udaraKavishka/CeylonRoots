package com.example.backend.model;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DestinationDetails extends BaseEntity {
    @OneToOne
    @JoinColumn(name = "destination_id")
    private Destination destination;

    private String region;
    private String topAttraction;
    private String bestTimeToVisit;
    private String recommendedDuration;
    private String culturalTips;
	public DestinationDetails(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, Destination destination,
			String region, String topAttraction, String bestTimeToVisit, String recommendedDuration,
			String culturalTips) {
		super(id, createdAt, updatedAt);
		this.destination = destination;
		this.region = region;
		this.topAttraction = topAttraction;
		this.bestTimeToVisit = bestTimeToVisit;
		this.recommendedDuration = recommendedDuration;
		this.culturalTips = culturalTips;
	}
	public Destination getDestination() {
		return destination;
	}
	public void setDestination(Destination destination) {
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
    
    
}