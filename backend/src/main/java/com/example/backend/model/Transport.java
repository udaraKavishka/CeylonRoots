package com.example.backend.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("TRANSPORT")
@Data
@EqualsAndHashCode(callSuper = true)
public class Transport extends TravelComponent {
    public enum Mode { CAR, TRAIN, BUS, PLANE, BOAT }

    @Enumerated(EnumType.STRING)
    private Mode transportMode;
    private String departureLocation;
    private String arrivalLocation;
    
    @Embedded
    @AttributeOverride(name = "lat", column = @Column(name = "departure_lat"))
    @AttributeOverride(name = "lng", column = @Column(name = "departure_lng"))
    private Coordinates departureCoordinates;
    
    @Embedded
    @AttributeOverride(name = "lat", column = @Column(name = "arrival_lat"))
    @AttributeOverride(name = "lng", column = @Column(name = "arrival_lng"))
    private Coordinates arrivalCoordinates;

	public Transport(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, String name, String description,
			String location, String imageUrl, BigDecimal price, Coordinates coordinates, Integer duration,
			Set<String> tags, Mode transportMode, String departureLocation, String arrivalLocation,
			Coordinates departureCoordinates, Coordinates arrivalCoordinates) {
		super(id, createdAt, updatedAt, name, description, location, imageUrl, price, coordinates, duration, tags);
		this.transportMode = transportMode;
		this.departureLocation = departureLocation;
		this.arrivalLocation = arrivalLocation;
		this.departureCoordinates = departureCoordinates;
		this.arrivalCoordinates = arrivalCoordinates;
	}

	public Mode getTransportMode() {
		return transportMode;
	}

	public void setTransportMode(Mode transportMode) {
		this.transportMode = transportMode;
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

	public Coordinates getDepartureCoordinates() {
		return departureCoordinates;
	}

	public void setDepartureCoordinates(Coordinates departureCoordinates) {
		this.departureCoordinates = departureCoordinates;
	}

	public Coordinates getArrivalCoordinates() {
		return arrivalCoordinates;
	}

	public void setArrivalCoordinates(Coordinates arrivalCoordinates) {
		this.arrivalCoordinates = arrivalCoordinates;
	}
    
    
}