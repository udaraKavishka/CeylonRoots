package com.example.backend.dto;

import lombok.Data;

@Data
public class AccommodationRequestDTO {
	private String name;


	public AccommodationRequestDTO(String name) {
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
