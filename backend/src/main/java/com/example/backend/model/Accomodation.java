package com.example.backend.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("ACCOMMODATION")
@NoArgsConstructor
@AllArgsConstructor
public class Accomodation extends TravelComponent {
    private String amenities;
    private int rating;
}
