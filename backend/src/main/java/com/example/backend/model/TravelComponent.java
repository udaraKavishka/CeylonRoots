package com.example.backend.model;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import com.example.backend.converter.StringListConverter;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "component_type", discriminatorType = DiscriminatorType.STRING)
@Table(name = "travel_component")
public abstract class TravelComponent extends BaseEntity {
    public enum ComponentType { 
        ACCOMMODATION, DESTINATION, ACTIVITY, TRANSPORT 
    }

    private String name;
    private String description;
    private String location;
    private String imageUrl;
    private BigDecimal price;

    @Embedded
    private Coordinates coordinates;
    
    private Integer duration;
    
    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "JSON")
    private Set<String> tags = new HashSet<>();
}
