package com.example.backend.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("ACCOMMODATION")
@Data
@EqualsAndHashCode(callSuper = true)
public class Accommodation extends TravelComponent {
    @ElementCollection
    @CollectionTable(name = "accommodation_amenities")
    private Set<String> amenities = new HashSet<>();
    
    private Double rating;

    @OneToMany(mappedBy = "accommodation")
    private Set<ItineraryDay> itineraryDays = new HashSet<>();
}