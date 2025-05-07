package com.example.backend.model;

import java.util.List;

import jakarta.persistence.*;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TravelPackage {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@NotBlank(message = "Title is mandatory")
    @Size(max = 100, message = "Title cannot exceed 100 characters")
    private String title;
    private String description;
    private String image;
    
    @Positive(message = "Duration must be a positive integer")
    private int duration;
    @PositiveOrZero(message = "Price cannot be negative")
    private double price;
    private int rating;
    private int reviewCount;
    private List<String> regions;
    private List<String> themes;
    private List<String> highlights;

    @OneToMany(mappedBy = "travelPackage", cascade = CascadeType.ALL)
    private List<ItineraryDay> itinerary;

    @ManyToMany
    @JoinTable(
        name = "package_components",
        joinColumns = @JoinColumn(name = "package_id"),
        inverseJoinColumns = @JoinColumn(name = "component_id")
    )
    private List<TravelComponent> components ;

    @ElementCollection
    private List<String> priceIncludes;

    @ElementCollection
    private List<String> priceExcludes;

	public TravelPackage(Long id, String title, String description, String image, int duration, double price,
			int rating, int reviewCount, List<String> regions, List<String> themes, List<String> highlights,
			List<ItineraryDay> itinerary, List<String> priceIncludes, List<String> priceExcludes) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.image = image;
		this.duration = duration;
		this.price = price;
		this.rating = rating;
		this.reviewCount = reviewCount;
		this.regions = regions;
		this.themes = themes;
		this.highlights = highlights;
		this.itinerary = itinerary;
		this.priceIncludes = priceIncludes;
		this.priceExcludes = priceExcludes;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public int getReviewCount() {
		return reviewCount;
	}

	public void setReviewCount(int reviewCount) {
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
    
    
}
