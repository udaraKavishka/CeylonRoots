package com.example.backend.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.example.backend.converter.StringListConverter;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "travel_package")
@Data
public class TravelPackage extends BaseEntity {
	private String title;
    private String description;
    private String imageUrl;
    private Integer durationDays;
    private BigDecimal price;
    private Double rating;
    private Integer reviewCount;
    
    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "JSON")
    private List<String> regions;
    
    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "JSON")
    private List<String> themes;
    
    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "JSON")
    private List<String> highlights;

    @OneToMany(mappedBy = "travelPackage", cascade = CascadeType.ALL)
    private List<ItineraryDay> itinerary = new ArrayList<>();

    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "JSON")
    private List<String> priceIncludes;
    
    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "JSON")
    private List<String> priceExcludes;

    @ManyToMany
    @JoinTable(
        name = "package_destination",
        joinColumns = @JoinColumn(name = "package_id"),
        inverseJoinColumns = @JoinColumn(name = "component_id"))
    private List<TravelComponent> destinations = new ArrayList<>();

	

	public TravelPackage(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, String title, String description,
			String imageUrl, Integer durationDays, BigDecimal price, Double rating, Integer reviewCount,
			List<String> regions, List<String> themes, List<String> highlights, List<ItineraryDay> itinerary,
			List<String> priceIncludes, List<String> priceExcludes, List<TravelComponent> destinations) {
		super(id, createdAt, updatedAt);
		this.title = title;
		this.description = description;
		this.imageUrl = imageUrl;
		this.durationDays = durationDays;
		this.price = price;
		this.rating = rating;
		this.reviewCount = reviewCount;
		this.regions = regions;
		this.themes = themes;
		this.highlights = highlights;
		this.itinerary = itinerary;
		this.priceIncludes = priceIncludes;
		this.priceExcludes = priceExcludes;
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

	public List<String> getRegions() {
		return regions;
	}

	public void setRegions(List<String> regions) {
		this.regions = regions;
	}

	public List<String> getThemes() {
		return themes;
	}

	public void setThemes(List<String> themes) {
		this.themes = themes;
	}

	public List<String> getHighlights() {
		return highlights;
	}

	public void setHighlights(List<String> highlights) {
		this.highlights = highlights;
	}

	public List<ItineraryDay> getItinerary() {
		return itinerary;
	}

	public void setItinerary(List<ItineraryDay> itinerary) {
		this.itinerary = itinerary;
	}

	public List<String> getPriceIncludes() {
		return priceIncludes;
	}

	public void setPriceIncludes(List<String> priceIncludes) {
		this.priceIncludes = priceIncludes;
	}

	public List<String> getPriceExcludes() {
		return priceExcludes;
	}

	public void setPriceExcludes(List<String> priceExcludes) {
		this.priceExcludes = priceExcludes;
	}

	public List<TravelComponent> getDestinations() {
		return destinations;
	}

	public void setDestinations(List<TravelComponent> destinations) {
		this.destinations = destinations;
	}
    
    
}
