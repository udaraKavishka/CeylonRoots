package com.example.backend.model;


import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.example.backend.converter.StringListConverter;

import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("DESTINATION")
@Data
@EqualsAndHashCode(callSuper = true)
public class Destination extends TravelComponent {
	@Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "JSON")
    private List<String> attractions;
}