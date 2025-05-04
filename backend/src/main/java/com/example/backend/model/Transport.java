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
		super(id, arrivalLocation, arrivalLocation, arrivalLocation, arrivalLocation, arrivalLng, arrivalLng, arrivalLng, duration);
		this.mode = mode;
		this.departureLocation = departureLocation;
		this.arrivalLocation = arrivalLocation;
		this.departureLat = departureLat;
		this.departureLng = departureLng;
		this.arrivalLat = arrivalLat;
		this.arrivalLng = arrivalLng;
	}


	public String getMode() {
		return mode;
	}


	public void setMode(String mode) {
		this.mode = mode;
	}


	public String getDepartureLocation() {
		return departureLocation;
	}


	public void setDepartureLocation(String departureLocation) {
		this.departureLocation = departureLocation;
	}


	public String getArrivalLocation() {
		return arrivalLocation;
	}


	public void setArrivalLocation(String arrivalLocation) {
		this.arrivalLocation = arrivalLocation;
	}


	public double getDepartureLat() {
		return departureLat;
	}


	public void setDepartureLat(double departureLat) {
		this.departureLat = departureLat;
	}


	public double getDepartureLng() {
		return departureLng;
	}


	public void setDepartureLng(double departureLng) {
		this.departureLng = departureLng;
	}


	public double getArrivalLat() {
		return arrivalLat;
	}


	public void setArrivalLat(double arrivalLat) {
		this.arrivalLat = arrivalLat;
	}


	public double getArrivalLng() {
		return arrivalLng;
	}


	public void setArrivalLng(double arrivalLng) {
		this.arrivalLng = arrivalLng;
	}
    
	
    
    
    
    
}