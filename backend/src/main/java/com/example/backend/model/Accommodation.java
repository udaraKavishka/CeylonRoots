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
	@Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "JSON")
    private Set<String> amenities = new HashSet<>();
    
    private Double rating;

    
}