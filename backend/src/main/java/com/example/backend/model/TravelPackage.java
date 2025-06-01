package com.example.backend.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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
    private List<ItineraryDay> itineraryDays = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "package_destinations",
        joinColumns = @JoinColumn(name = "package_id"),
        inverseJoinColumns = @JoinColumn(name = "destination_id"))
    private List<Destination> destinations = new ArrayList<>();

	public TravelPackage(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, String title, String description,
			String imageUrl, Integer durationDays, BigDecimal price, Double rating, Integer reviewCount,
			List<ItineraryDay> itineraryDays, List<Destination> destinations) {
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

	public List<Destination> getDestinations() {
		return destinations;
	}

	public void setDestinations(List<Destination> destinations) {
		this.destinations = destinations;
	}
    
    
}