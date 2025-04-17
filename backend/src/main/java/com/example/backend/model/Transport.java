package com.example.backend.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transport extends TravelComponent{
	private String mode;
    private String departureLocation;
    private String arrivalLocation;
    private double departureLat;
    private double departureLng;
    private double arrivalLat;
    private double arrivalLng;
}
