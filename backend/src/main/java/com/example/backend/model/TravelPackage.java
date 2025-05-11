package com.example.backend.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.example.backend.converter.StringListConverter;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "travel_package")
@Data
public class TravelPackage extends BaseEntity {
	private String title;
    private String description;
    private String imageUrl;
    private Integer durationDays;
    private BigDecimal price;
    private Double rating;
    private Integer reviewCount;
    
    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "JSON")
    private List<String> regions;
    
    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "JSON")
    private List<String> themes;
    
    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "JSON")
    private List<String> highlights;

    @OneToMany(mappedBy = "travelPackage", cascade = CascadeType.ALL)
    private List<ItineraryDay> itinerary = new ArrayList<>();

    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "JSON")
    private List<String> priceIncludes;
    
    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "JSON")
    private List<String> priceExcludes;

    @ManyToMany
    @JoinTable(
        name = "package_destination",
        joinColumns = @JoinColumn(name = "package_id"),
        inverseJoinColumns = @JoinColumn(name = "component_id"))
    private List<TravelComponent> destinations = new ArrayList<>();
}
