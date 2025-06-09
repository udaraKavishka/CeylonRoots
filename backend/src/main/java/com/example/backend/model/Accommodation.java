package com.example.backend.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("ACCOMMODATION")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Accommodation extends TravelComponent {
	@ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "accommodation_amenities",
        joinColumns = @JoinColumn(name = "accommodation_id")
    )
    @Column(name = "amenity")
    private Set<String> amenities = new HashSet<>();

    private Double rating;

    public Accommodation() {
		
	}
	
	public Accommodation(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, String name, String description,
			String location, String imageUrl, BigDecimal price, Double lat, Double lng, Integer duration,
			Set<String> tags, Set<String> amenities, Double rating) {
		super(id, createdAt, updatedAt, name, description, location, imageUrl, price, lat, lng, duration, tags);
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