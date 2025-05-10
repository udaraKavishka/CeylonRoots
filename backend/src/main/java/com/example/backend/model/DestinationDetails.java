package com.example.backend.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class DestinationDetails extends BaseEntity {
    private String region;
    private String topAttraction;
    private String bestTimeToVisit;
    private String recommendedDuration;
    private String culturalTips;

    @ElementCollection
    @CollectionTable(name = "detail_attractions")
    private Set<String> attractions = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "detail_gallery")
    private Set<String> galleryImages = new HashSet<>();

    @OneToOne
    @JoinColumn(name = "destination_id")
    private Destination destination;
}