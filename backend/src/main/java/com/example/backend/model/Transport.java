package com.example.backend.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("TRANSPORT")
@NoArgsConstructor
@AllArgsConstructor
public class Transport extends TravelComponent {
    private String mode;
    private String departureLocation;
    private String arrivalLocation;
    private double departureLat;
    private double departureLng;
    private double arrivalLat;
    private double arrivalLng;
    
    
	public Transport(Long id, String name, String description, String location, String image, double price, double lat,
			double lng, int duration, String mode, String departureLocation, String arrivalLocation,
			double departureLat, double departureLng, double arrivalLat, double arrivalLng) {
		super();
		this.mode = mode;
		this.departureLocation = departureLocation;
		this.arrivalLocation = arrivalLocation;
		this.departureLat = departureLat;
		this.departureLng = departureLng;
		this.arrivalLat = arrivalLat;
		this.arrivalLng = arrivalLng;
	}
    
    
    
    
    
}