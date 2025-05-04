package com.example.backend.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("ACCOMMODATION")
@NoArgsConstructor
@AllArgsConstructor
public class Accomodation extends TravelComponent {
	
	private String amenities;
    private int rating;
    
    public String getAmenities() {
		return amenities;
	}
	public void setAmenities(String amenities) {
		this.amenities = amenities;
	}
	public int getRating() {
		return rating;
	}
	public void setRating(int rating) {
		this.rating = rating;
	}
	public Accomodation(String amenities, int rating) {
		super();
		this.amenities = amenities;
		this.rating = rating;
	}
	
	
	
}

