package com.example.backend.model;

import java.time.LocalDate;
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
}