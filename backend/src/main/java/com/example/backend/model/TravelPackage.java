package com.example.backend.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.dto.DestinationRequestDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TravelPackage extends BaseEntity {
	
    private String title;
    private String description;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    private Integer durationDays;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal price;
    
    private Double rating;
    private Integer reviewCount;

    
    @OneToMany(mappedBy = "travelPackage", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ItineraryDay> itineraryDays = new ArrayList<>();

//    @ManyToMany
//    @JoinTable(name = "package_destinations",
//        joinColumns = @JoinColumn(name = "package_id"),
//        inverseJoinColumns = @JoinColumn(name = "destination_id"))
//    private List<Destination> destinations = new ArrayList<>();
    
//    @ElementCollection
//    @CollectionTable(name = "travel_package_destinations", joinColumns = @JoinColumn(name = "travel_package_id"))
//    private List<DestinationRequestDTO> destinations = new ArrayList<>();
    
    private List<String> highlights= new ArrayList<>();
    private List <String> gallery=new ArrayList<>();
    private List<String> includes= new ArrayList<>();
    private List<String> excludes = new ArrayList<>();
    
    
    private List<String> destinations;
    
    
	
    
    
	public TravelPackage() {
		
	}

	
	
	public TravelPackage(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, String title, String description,
			String imageUrl, Integer durationDays, BigDecimal price, Double rating, Integer reviewCount,
			List<ItineraryDay> itineraryDays, List<String> destinations, List<String> highlights, List<String> gallery,
			List<String> includes, List<String> excludes) {
		super(id, createdAt, updatedAt);
		this.title = title;
		this.description = description;
		this.imageUrl = imageUrl;
		this.durationDays = durationDays;
		this.price = price;
		this.rating = rating;
		this.reviewCount = reviewCount;
		this.itineraryDays = itineraryDays;
		this.destinations = destinations;
		this.highlights = highlights;
		this.gallery = gallery;
		this.includes = includes;
		this.excludes = excludes;
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

	public List<ItineraryDay> getItineraryDays() {
		return itineraryDays;
	}

	public void setItineraryDays(List<ItineraryDay> itineraryDays) {
		this.itineraryDays = itineraryDays;
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



	



	

	
    
}