package com.example.backend.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class AccommodationData {
	private String name;

	public AccommodationData() {
		
	}

	public AccommodationData(String name) {
		super();
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
	
	
}
