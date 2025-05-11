package com.example.backend.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import com.example.backend.converter.StringListConverter;

import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("ACCOMMODATION")
@Data
@EqualsAndHashCode(callSuper = true)
public class Accommodation extends TravelComponent {
	@Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "JSON")
    private Set<String> amenities = new HashSet<>();
    
    private Double rating;

	public Accommodation(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, String name, String description,
			String location, String imageUrl, BigDecimal price, Coordinates coordinates, Integer duration,
			Set<String> tags, Set<String> amenities, Double rating) {
		super(id, createdAt, updatedAt, name, description, location, imageUrl, price, coordinates, duration, tags);
		this.amenities = amenities;
		this.rating = rating;
	}

	public Set<String> getAmenities() {
		return amenities;
	}

	public void setAmenities(Set<String> amenities) {
		this.amenities = amenities;
	}

	public Double getRating() {
		return rating;
	}

	public void setRating(Double rating) {
		this.rating = rating;
	}
    
    

    
}