package com.example.backend.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("TRANSPORT")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transport extends TravelComponent {
    public enum TransportMode { CAR, TRAIN, BUS, PLANE, BOAT }
    
    @Enumerated(EnumType.STRING)
    private TransportMode mode;
    
    private String departureLocation;
    private String arrivalLocation;
    private Double departureLat;
    private Double departureLng;
    private Double arrivalLat;
    private Double arrivalLng;
	
    
    
    
	public Transport(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, String name, String description,
			String location, String imageUrl, BigDecimal price, Double lat, Double lng, Integer duration,
			Set<String> tags, TransportMode mode, String departureLocation, String arrivalLocation, Double departureLat,
			Double departureLng, Double arrivalLat, Double arrivalLng) {
		super(id, createdAt, updatedAt, name, description, location, imageUrl, price, lat, lng, duration, tags);
		this.mode = mode;
		this.departureLocation = departureLocation;
		this.arrivalLocation = arrivalLocation;
		this.departureLat = departureLat;
		this.departureLng = departureLng;
		this.arrivalLat = arrivalLat;
		this.arrivalLng = arrivalLng;
	}
	public TransportMode getMode() {
		return mode;
	}
	public void setMode(TransportMode mode) {
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
	public Double getDepartureLat() {
		return departureLat;
	}
	public void setDepartureLat(Double departureLat) {
		this.departureLat = departureLat;
	}
	public Double getDepartureLng() {
		return departureLng;
	}
	public void setDepartureLng(Double departureLng) {
		this.departureLng = departureLng;
	}
	public Double getArrivalLat() {
		return arrivalLat;
	}
	public void setArrivalLat(Double arrivalLat) {
		this.arrivalLat = arrivalLat;
	}
	public Double getArrivalLng() {
		return arrivalLng;
	}
	public void setArrivalLng(Double arrivalLng) {
		this.arrivalLng = arrivalLng;
	}
    
    
}