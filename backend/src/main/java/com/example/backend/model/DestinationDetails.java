package com.example.backend.model;

import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DestinationDetails {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String region;
    private String image;
    private String topAttraction;
    private String bestTimeToVisit;
    private String recommendedDuration;
    private String culturalTips;

    @ElementCollection
    private List<String> attractions;

    private double lat;
    private double lng;

    @ElementCollection
    private List<String> gallery;
}
