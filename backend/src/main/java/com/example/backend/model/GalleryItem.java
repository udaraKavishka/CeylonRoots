package com.example.backend.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.example.backend.converter.StringListConverter;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "gallery_item")
@Data
public class GalleryItem extends BaseEntity {
public enum MediaType { IMAGE, VIDEO }
    
    @Enumerated(EnumType.STRING)
    private MediaType mediaType;
    
    private String url;
    private String thumbnailUrl;
    private String caption;
    private String location;
    
    @Lob
    private String description;
    
    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "JSON")
    private List<String> categories;
    
    private Boolean featured;
    
    @Embedded
    private UserSubmission submittedBy;
    
    private LocalDate dateAdded;

	public GalleryItem(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, MediaType mediaType, String url,
			String thumbnailUrl, String caption, String location, String description, List<String> categories,
			Boolean featured, UserSubmission submittedBy, LocalDate dateAdded) {
		super(id, createdAt, updatedAt);
		this.mediaType = mediaType;
		this.url = url;
		this.thumbnailUrl = thumbnailUrl;
		this.caption = caption;
		this.location = location;
		this.description = description;
		this.categories = categories;
		this.featured = featured;
		this.submittedBy = submittedBy;
		this.dateAdded = dateAdded;
	}

	public MediaType getMediaType() {
		return mediaType;
	}

	public void setMediaType(MediaType mediaType) {
		this.mediaType = mediaType;
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

	public List<String> getCategories() {
		return categories;
	}

	public void setCategories(List<String> categories) {
		this.categories = categories;
	}

	public Boolean getFeatured() {
		return featured;
	}

	public void setFeatured(Boolean featured) {
		this.featured = featured;
	}

	public UserSubmission getSubmittedBy() {
		return submittedBy;
	}

	public void setSubmittedBy(UserSubmission submittedBy) {
		this.submittedBy = submittedBy;
	}

	public LocalDate getDateAdded() {
		return dateAdded;
	}

	public void setDateAdded(LocalDate dateAdded) {
		this.dateAdded = dateAdded;
	}
    
    
}