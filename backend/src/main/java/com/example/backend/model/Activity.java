package com.example.backend.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("ACTIVITY")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Activity extends TravelComponent {
    private String difficulty;
}