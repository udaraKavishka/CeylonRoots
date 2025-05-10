package com.example.backend.model;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
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
    
    @ElementCollection
    @CollectionTable(name = "gallery_categories")
    private Set<String> categories = new HashSet<>();
    
    private Boolean featured;
    
    @Embedded
    private UserSubmission submittedBy;
    
    private LocalDate dateAdded;

    @ManyToMany(mappedBy = "galleryItems")
    private Set<Destination> destinations = new HashSet<>();

    @ManyToMany(mappedBy = "galleryItems")
    private Set<Activity> activities = new HashSet<>();
}