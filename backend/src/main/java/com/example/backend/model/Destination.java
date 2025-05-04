package com.example.backend.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("DESTINATION")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Destination extends TravelComponent {
    private String attractions;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "details_id")
    private DestinationDetails details;

	public Destination(String attractions) {
		super();
		this.attractions = attractions;
	}

	public String getAttractions() {
		return attractions;
	}

	public void setAttractions(String attractions) {
		this.attractions = attractions;
	}
    
    
}