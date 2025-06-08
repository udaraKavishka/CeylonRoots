package com.example.backend.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class DestinationData {
    private String name;

	public DestinationData(String name) {
		super();
		this.name = name;
	}

	public DestinationData() {
		
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
    
    
}