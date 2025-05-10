package com.example.backend.model;


import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("ACTIVITY")
@Data
@EqualsAndHashCode(callSuper = true)
public class Activity extends TravelComponent {
    public enum Difficulty { EASY, MODERATE, CHALLENGING }

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @ManyToMany(mappedBy = "activities")
    private Set<ItineraryDay> itineraryDays = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "activity_gallery",
        joinColumns = @JoinColumn(name = "activity_id"),
        inverseJoinColumns = @JoinColumn(name = "gallery_item_id"))
    private Set<GalleryItem> galleryItems = new HashSet<>();
}