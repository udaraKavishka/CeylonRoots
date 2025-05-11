package com.example.backend.model;

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
}