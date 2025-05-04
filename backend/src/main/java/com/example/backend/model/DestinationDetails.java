package com.example.backend.model;

import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DestinationDetails {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String region;
    private String image;
    private String topAttraction;
    private String bestTimeToVisit;
    private String recommendedDuration;
    private String culturalTips;

    @ElementCollection
    private List<String> attractions;

    private double lat;
    private double lng;

    @ElementCollection
    private List<String> gallery;

	public DestinationDetails(Long id, String name, String description, String region, String image,
			String topAttraction, String bestTimeToVisit, String recommendedDuration, String culturalTips,
			List<String> attractions, double lat, double lng, List<String> gallery) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.region = region;
		this.image = image;
		this.topAttraction = topAttraction;
		this.bestTimeToVisit = bestTimeToVisit;
		this.recommendedDuration = recommendedDuration;
		this.culturalTips = culturalTips;
		this.attractions = attractions;
		this.lat = lat;
		this.lng = lng;
		this.gallery = gallery;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
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

	public double getLat() {
		return lat;
	}

	public void setLat(double lat) {
		this.lat = lat;
	}

	public double getLng() {
		return lng;
	}

	public void setLng(double lng) {
		this.lng = lng;
	}

	public List<String> getGallery() {
		return gallery;
	}

	public void setGallery(List<String> gallery) {
		this.gallery = gallery;
	}
    
    
}
