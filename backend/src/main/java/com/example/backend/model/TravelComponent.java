package com.example.backend.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "component_type", discriminatorType = DiscriminatorType.STRING)
@Table(name = "travel_component")
public abstract class TravelComponent extends BaseEntity {
    private String name;
    private String description;
    private String location;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal price;
    
    private Double lat;
    private Double lng;
    private Integer duration;
    

    @ElementCollection
    @CollectionTable(
        name = "component_tags",
        joinColumns = @JoinColumn(name = "component_id")
    )
    @Column(name = "tag")
    private Set<String> tags = new HashSet<>();

	
	public TravelComponent(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, String name, String description,
			String location, String imageUrl, BigDecimal price, Double lat, Double lng, Integer duration,
			Set<String> tags) {
		super(id, createdAt, updatedAt);
		this.name = name;
		this.description = description;
		this.location = location;
		this.imageUrl = imageUrl;
		this.price = price;
		this.lat = lat;
		this.lng = lng;
		this.duration = duration;
		this.tags = tags;
	}

	public TravelComponent() {
		
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

	public Double getLat() {
		return lat;
	}

	public void setLat(Double lat) {
		this.lat = lat;
	}

	public Double getLng() {
		return lng;
	}

	public void setLng(Double lng) {
		this.lng = lng;
	}

	public Integer getDuration() {
		return duration;
	}

	public void setDuration(Integer duration) {
		this.duration = duration;
	}

    
}