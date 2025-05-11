package com.example.backend.model;


import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("ACTIVITY")
@Data
@EqualsAndHashCode(callSuper = true)
public class Activity extends TravelComponent {
    public enum Difficulty { EASY, MODERATE, CHALLENGING }

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;



}