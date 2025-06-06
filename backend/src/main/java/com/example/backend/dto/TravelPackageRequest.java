package com.example.backend.dto;

import java.math.BigDecimal;
import java.util.List;

import com.example.backend.model.DestinationData;

import lombok.Data;

@Data
public class TravelPackageRequest {
	private String title;
    private String description;
    private String imageUrl;
    private Integer durationDays;
    private BigDecimal price;
    private Double rating;
    private Integer reviewCount;
    
    private List<String> destinations;
    private List<String> highlights;
    private List<String> gallery;
    private List<String> includes;
    private List<String> excludes;

    private List<ItineraryDayRequest> itineraryDays;

	
    
    
	public TravelPackageRequest(String title, String description, String imageUrl, Integer durationDays,
			BigDecimal price, Double rating, Integer reviewCount, List<String> destinations,
			List<String> highlights, List<String> gallery, List<String> includes, List<String> excludes,
			List<ItineraryDayRequest> itineraryDays) {
		super();
		this.title = title;
		this.description = description;
		this.imageUrl = imageUrl;
		this.durationDays = durationDays;
		this.price = price;
		this.rating = rating;
		this.reviewCount = reviewCount;
		this.destinations = destinations;
		this.highlights = highlights;
		this.gallery = gallery;
		this.includes = includes;
		this.excludes = excludes;
		this.itineraryDays = itineraryDays;
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

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public Integer getDurationDays() {
		return durationDays;
	}

	public void setDurationDays(Integer durationDays) {
		this.durationDays = durationDays;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public Double getRating() {
		return rating;
	}

	public void setRating(Double rating) {
		this.rating = rating;
	}

	public Integer getReviewCount() {
		return reviewCount;
	}

	public void setReviewCount(Integer reviewCount) {
		this.reviewCount = reviewCount;
	}


	public List<String> getDestinations() {
		return destinations;
	}

	public void setDestinations(List<String> destinations) {
		this.destinations = destinations;
	}

	public List<String> getHighlights() {
		return highlights;
	}

	public void setHighlights(List<String> highlights) {
		this.highlights = highlights;
	}

	public List<String> getGallery() {
		return gallery;
	}

	public void setGallery(List<String> gallery) {
		this.gallery = gallery;
	}

	public List<String> getIncludes() {
		return includes;
	}

	public void setIncludes(List<String> includes) {
		this.includes = includes;
	}

	public List<String> getExcludes() {
		return excludes;
	}

	public void setExcludes(List<String> excludes) {
		this.excludes = excludes;
	}

	public List<ItineraryDayRequest> getItineraryDays() {
		return itineraryDays;
	}

	public void setItineraryDays(List<ItineraryDayRequest> itineraryDays) {
		this.itineraryDays = itineraryDays;
	}
    
    

    
}
	
	
    
    
