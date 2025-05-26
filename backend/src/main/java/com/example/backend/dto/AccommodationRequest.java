package com.example.backend.dto;

import java.math.BigDecimal;
import java.util.List;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccommodationRequest {
    @NotBlank
    private String name;
    
    private String description;
    
    @NotBlank
    private String location;
    
    @DecimalMin("0.0")
    private BigDecimal price;
    
    private List<String> amenities;
    
    @DecimalMin("0.0") 
    @DecimalMax("5.0")
    private Double rating;
    
    private Double lat;
    private Double lng;
    private Integer duration;
    private List<String> tags;
}