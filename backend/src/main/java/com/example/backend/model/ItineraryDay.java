package com.example.backend.model;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.example.backend.converter.LongListConverter;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "itinerary_day")
@Data
public class ItineraryDay extends BaseEntity {
	private String title;
    private String location;
    private String description;
    private String meals;

    @ManyToOne
    @JoinColumn(name = "accommodation_id")
    private Accommodation accommodation;

    @Convert(converter = LongListConverter.class)
    @Column(columnDefinition = "JSON")
    private List<Long> activityIds;
    
    @ManyToOne
    @JoinColumn(name = "package_id")
    private TravelPackage travelPackage;
}