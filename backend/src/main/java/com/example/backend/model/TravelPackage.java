package com.example.backend.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class TravelPackage extends BaseEntity {
    private String title;
    private String description;
    private String imageUrl;
    private Integer durationDays;
    private BigDecimal price;
    private Double rating;
    private Integer reviewCount;
    
    @ElementCollection
    private Set<String> regions = new HashSet<>();
    
    @ElementCollection
    private Set<String> themes = new HashSet<>();
    
    @ElementCollection
    private Set<String> highlights = new HashSet<>();

    @OneToMany(mappedBy = "travelPackage", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItineraryDay> itinerary = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "price_inclusions")
    private Set<String> priceIncludes = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "price_exclusions")
    private Set<String> priceExcludes = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "package_destinations",
        joinColumns = @JoinColumn(name = "package_id"),
        inverseJoinColumns = @JoinColumn(name = "destination_id"))
    private Set<Destination> destinations = new HashSet<>();
}
