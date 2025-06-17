package com.example.backend.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("DESTINATION")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Destination extends TravelComponent {
	
    private List<String> attractions = new ArrayList<>();
    
    @ManyToMany(mappedBy = "destinations")
    private List<GalleryItem> galleryItems = new ArrayList<>();
    
  

    public Destination() {
    	
    }
	
	public Destination(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, String name, String description,
			String location, String imageUrl, BigDecimal price, Double lat, Double lng, Integer duration,
			Set<String> tags, List<String> attractions, List<GalleryItem> galleryItems) {
		super(id, createdAt, updatedAt, name, description, location, imageUrl, price, lat, lng, duration, tags);
		this.attractions = attractions;
		this.galleryItems = galleryItems;
	}

	public List<String> getAttractions() {
		return attractions;
	}

	public void setAttractions(List<String> attractions) {
		this.attractions = attractions;
	}
    
    
}