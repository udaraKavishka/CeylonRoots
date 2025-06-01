package com.example.backend.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GalleryItem extends BaseEntity {
    public enum MediaType { IMAGE, VIDEO }
    
    @Enumerated(EnumType.STRING)
    private MediaType type;
    
    private String url;
    private String thumbnailUrl;
    private String caption;
    private String location;
    
    @Lob
    private String description;
    
    private Boolean featured;
    private LocalDate dateAdded;

    @ManyToMany
    @JoinTable(
        name = "destination_gallery",
        joinColumns = @JoinColumn(name = "gallery_item_id"),
        inverseJoinColumns = @JoinColumn(name = "destination_id")
    )
    private List<Destination> destinations = new ArrayList<>();

    @ManyToMany
    @JoinTable(
        name = "activity_gallery",
        joinColumns = @JoinColumn(name = "gallery_item_id"),
        inverseJoinColumns = @JoinColumn(name = "activity_id")
    )
    private List<Activity> activities = new ArrayList<>();

	

	
	public GalleryItem(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, MediaType type, String url,
			String thumbnailUrl, String caption, String location, String description, Boolean featured,
			LocalDate dateAdded, List<Destination> destinations, List<Activity> activities) {
		super(id, createdAt, updatedAt);
		this.type = type;
		this.url = url;
		this.thumbnailUrl = thumbnailUrl;
		this.caption = caption;
		this.location = location;
		this.description = description;
		this.featured = featured;
		this.dateAdded = dateAdded;
		this.destinations = destinations;
		this.activities = activities;
	}

	public MediaType getType() {
		return type;
	}

	public void setType(MediaType type) {
		this.type = type;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getThumbnailUrl() {
		return thumbnailUrl;
	}

	public void setThumbnailUrl(String thumbnailUrl) {
		this.thumbnailUrl = thumbnailUrl;
	}

	public String getCaption() {
		return caption;
	}

	public void setCaption(String caption) {
		this.caption = caption;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Boolean getFeatured() {
		return featured;
	}

	public void setFeatured(Boolean featured) {
		this.featured = featured;
	}

	public LocalDate getDateAdded() {
		return dateAdded;
	}

	public void setDateAdded(LocalDate dateAdded) {
		this.dateAdded = dateAdded;
	}

	public List<Destination> getDestinations() {
		return destinations;
	}

	public void setDestinations(List<Destination> destinations) {
		this.destinations = destinations;
	}

	public List<Activity> getActivities() {
		return activities;
	}

	public void setActivities(List<Activity> activities) {
		this.activities = activities;
	}
    
    
}