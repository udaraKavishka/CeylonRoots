package com.example.backend.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import com.example.backend.converter.StringListConverter;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "component_type", discriminatorType = DiscriminatorType.STRING)
@Table(name = "travel_component")
public abstract class TravelComponent extends BaseEntity {
    public enum ComponentType { 
        ACCOMMODATION, DESTINATION, ACTIVITY, TRANSPORT 
    }

    private String name;
    protected String description;
    private String location;
    private String imageUrl;
    private BigDecimal price;

    @Embedded
    private Coordinates coordinates;
    
    private Integer duration;
    
    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "JSON")
    private Set<String> tags = new HashSet<>();

	public TravelComponent(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, String name, String description,
			String location, String imageUrl, BigDecimal price, Coordinates coordinates, Integer duration,
			Set<String> tags) {
		super(id, createdAt, updatedAt);
		this.name = name;
		this.description = description;
		this.location = location;
		this.imageUrl = imageUrl;
		this.price = price;
		this.coordinates = coordinates;
		this.duration = duration;
		this.tags = tags;
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

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public Coordinates getCoordinates() {
		return coordinates;
	}

	public void setCoordinates(Coordinates coordinates) {
		this.coordinates = coordinates;
	}

	public Integer getDuration() {
		return duration;
	}

	public void setDuration(Integer duration) {
		this.duration = duration;
	}

	public Set<String> getTags() {
		return tags;
	}

	public void setTags(Set<String> tags) {
		this.tags = tags;
	}
    
    
}
