package com.example.backend.service;

import org.springframework.stereotype.Service;
import com.example.backend.config.CorsConfig;
import com.example.backend.dto.ItineraryDayRequest;
import com.example.backend.model.ItineraryDay;
import com.example.backend.model.TravelPackage;
import com.example.backend.repository.ItineraryDayRepository;
import com.example.backend.repository.TravelPackageRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class ItineraryDayService {


    private final ItineraryDayRepository itineraryDayRepository;

    private final TravelPackageRepository travelPackageRepo;

    public ItineraryDayService(
        ItineraryDayRepository itineraryDayRepository,
        TravelPackageRepository travelPackageRepo) {
        this.itineraryDayRepository = itineraryDayRepository;
        this.travelPackageRepo = travelPackageRepo;

    }

    
    public ItineraryDay buildItineraryDay(ItineraryDayRequest dto, TravelPackage travelPackage) {
        ItineraryDay day = new ItineraryDay();
        day.setDayNumber(dto.getDayNumber());
        day.setTitle(dto.getTitle());
        day.setMainTown(dto.getMainTown());
        day.setDescription(dto.getDescription());
        day.setMeals(dto.getMeals());
        day.setTravelPackage(travelPackage);
        day.setAccommodation(dto.getAccommodation());
        day.setActivities(dto.getactivities());

        
        return day;
    }
    
    // Create itinerary day within a package
    public ItineraryDay createItineraryDay(ItineraryDayRequest dto, Long travelPackageId) {
        TravelPackage travelPackage = travelPackageRepo.findById(travelPackageId)
                .orElseThrow(() -> new EntityNotFoundException("TravelPackage not found"));
        ItineraryDay day = buildItineraryDay(dto, travelPackage);
        return itineraryDayRepository.save(day);
    }

    // Get specific day within a package
    public ItineraryDay getDayInPackage(Long travelPackageId, Long dayId) {
        return itineraryDayRepository.findByIdAndTravelPackageId(dayId, travelPackageId)
                .orElseThrow(() -> new EntityNotFoundException(
                    "ItineraryDay not found in travel package"));
    }

    // Get all days for a specific package
    public List<ItineraryDay> getAllByTravelPackage(Long travelPackageId) {
        return itineraryDayRepository.findByTravelPackageId(travelPackageId);
    }

    // Update day within a package
    public ItineraryDay updateItineraryDay(Long travelPackageId, Long dayId, ItineraryDayRequest dto) {
        ItineraryDay existingDay = getDayInPackage(travelPackageId, dayId);
        
        existingDay.setDayNumber(dto.getDayNumber());
        existingDay.setTitle(dto.getTitle());
        existingDay.setMainTown(dto.getMainTown());
        existingDay.setDescription(dto.getDescription());
        existingDay.setMeals(dto.getMeals());
        existingDay.setAccommodation(dto.getAccommodation());
        existingDay.setActivities(dto.getactivities());

  

        return itineraryDayRepository.save(existingDay);
    }

    // Delete day from a package
    public void deleteItineraryDay(Long travelPackageId, Long dayId) {
        ItineraryDay day = getDayInPackage(travelPackageId, dayId);
        itineraryDayRepository.delete(day);
    }
}