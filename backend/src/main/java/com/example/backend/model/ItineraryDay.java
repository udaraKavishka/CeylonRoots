package com.example.backend.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class ItineraryDay extends BaseEntity {
    private String title;
    private String location;
    private String description;
    private String meals;

    @ManyToOne
    @JoinColumn(name = "accommodation_id")
    private Accommodation accommodation;

    @ManyToMany
    @JoinTable(name = "itinerary_activities",
        joinColumns = @JoinColumn(name = "itinerary_day_id"),
        inverseJoinColumns = @JoinColumn(name = "activity_id"))
    private Set<Activity> activities = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "travel_package_id")
    private TravelPackage travelPackage;
}