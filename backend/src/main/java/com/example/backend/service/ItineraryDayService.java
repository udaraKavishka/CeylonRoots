package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.dto.ItineraryDayRequest;
import com.example.backend.model.Accommodation;
import com.example.backend.model.Activity;
import com.example.backend.model.ItineraryDay;
import com.example.backend.model.TravelPackage;
import com.example.backend.repository.AccommodationRepository;
import com.example.backend.repository.ActivityRepository;


@Service
public class ItineraryDayService {

    private final AccommodationRepository accommodationRepo;
    
    public ItineraryDayService(AccommodationRepository accommodationRepo) {
		this.accommodationRepo = accommodationRepo;
	
        
    }
   

    public ItineraryDay buildItineraryDay(ItineraryDayRequest dto, TravelPackage travelPackage) {
        ItineraryDay day = new ItineraryDay();
        day.setDayNumber(dto.getDayNumber());
        day.setTitle(dto.getTitle());
        day.setMainTown(dto.getMainTown());
        day.setDescription(dto.getDescription());
        day.setMeals(dto.getMeals());
        day.setTravelPackage(travelPackage);

        // Fetch and set accommodation
        if (dto.getAccommodationId() != null) {
            Accommodation accommodation = accommodationRepo.findById(dto.getAccommodationId())
                    .orElseThrow(() -> new RuntimeException("Accommodation not found"));
            day.setAccommodation(accommodation);
        }

        

        return day;
    }
}