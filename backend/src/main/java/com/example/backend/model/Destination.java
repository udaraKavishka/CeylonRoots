package com.example.backend.model;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.example.backend.converter.StringListConverter;

import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("DESTINATION")
@Data
@EqualsAndHashCode(callSuper = true)
public class Destination extends TravelComponent {
	@Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "JSON")
    private List<String> attractions;

	public Destination(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, String name, String description,
			String location, String imageUrl, BigDecimal price, Coordinates coordinates, Integer duration,
			Set<String> tags, List<String> attractions) {
		super(id, createdAt, updatedAt, name, description, location, imageUrl, price, coordinates, duration, tags);
		this.attractions = attractions;
	}

	public List<String> getAttractions() {
		return attractions;
	}

	public void setAttractions(List<String> attractions) {
		this.attractions = attractions;
	}
	
	
}