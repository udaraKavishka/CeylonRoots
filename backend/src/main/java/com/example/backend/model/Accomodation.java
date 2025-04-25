package com.example.backend.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Accomodation extends TravelComponent {
	private String amenities;
    private int rating;
}
