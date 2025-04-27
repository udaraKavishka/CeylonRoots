package com.example.backend.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TravelPackage {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String image;
    private int duration;
    private double price;
    private int rating;
    private int reviewCount;
    private List<String> regions;
    private List<String> themes;
    private List<String> highlights;

    @OneToMany(mappedBy = "travelPackage", cascade = CascadeType.ALL)
    private List<ItineraryDay> itinerary;

    @ElementCollection
    private List<String> priceIncludes;

    @ElementCollection
    private List<String> priceExcludes;
}
