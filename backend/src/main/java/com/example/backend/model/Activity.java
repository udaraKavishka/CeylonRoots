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

	public Activity(String difficulty) {
		super();
		this.difficulty = difficulty;
	}

	public String getDifficulty() {
		return difficulty;
	}

	public void setDifficulty(String difficulty) {
		this.difficulty = difficulty;
	}
    
    
}