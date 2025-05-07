package com.example.backend.controller;

import com.example.backend.dto.ItineraryDayRequest;
import com.example.backend.model.ItineraryDay;
import com.example.backend.model.TravelPackage;
import com.example.backend.repository.ItineraryDayRepository;
import com.example.backend.repository.TravelPackageRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/travel-packages/{packageId}/itinerary-days")
public class ItineraryDayController {

    private final ItineraryDayRepository itineraryDayRepository;
    private final TravelPackageRepository travelPackageRepository;

    public ItineraryDayController(ItineraryDayRepository itineraryDayRepository,
                                 TravelPackageRepository travelPackageRepository) {
        this.itineraryDayRepository = itineraryDayRepository;
        this.travelPackageRepository = travelPackageRepository;
    }

    // CREATE Itinerary Day for a specific package
    @PostMapping
    public ResponseEntity<ItineraryDay> createItineraryDay(
            @PathVariable Long packageId,
            @Valid @RequestBody ItineraryDayRequest itineraryDayDTO) {

        TravelPackage travelPackage = travelPackageRepository.findById(packageId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Travel package not found"));

        ItineraryDay newDay = new ItineraryDay();
        newDay.setTitle(itineraryDayDTO.getTitle());
        newDay.setLocation(itineraryDayDTO.getLocation());
        newDay.setDescription(itineraryDayDTO.getDescription());
        newDay.setAccommodation(itineraryDayDTO.getAccommodation());
        newDay.setMeals(itineraryDayDTO.getMeals());
        newDay.setTravelPackage(travelPackage);

        ItineraryDay savedDay = itineraryDayRepository.save(newDay);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedDay);
    }

    // GET ALL Itinerary Days for a package
    @GetMapping
    public List<ItineraryDay> getAllItineraryDays(@PathVariable Long packageId) {
        return itineraryDayRepository.findByTravelPackageId(packageId);
    }

    // GET Single Itinerary Day
    @GetMapping("/{dayId}")
    public ItineraryDay getItineraryDay(
            @PathVariable Long packageId,
            @PathVariable Long dayId) {

        return itineraryDayRepository.findByIdAndTravelPackageId(dayId, packageId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Itinerary day not found"));
    }

    // UPDATE Itinerary Day
    @PutMapping("/{dayId}")
    public ItineraryDay updateItineraryDay(
            @PathVariable Long packageId,
            @PathVariable Long dayId,
            @Valid @RequestBody ItineraryDayRequest updatedDayDTO) {

        return itineraryDayRepository.findByIdAndTravelPackageId(dayId, packageId)
                .map(existingDay -> {
                    if(updatedDayDTO.getTitle() != null) existingDay.setTitle(updatedDayDTO.getTitle());
                    if(updatedDayDTO.getLocation() != null) existingDay.setLocation(updatedDayDTO.getLocation());
                    if(updatedDayDTO.getDescription() != null) existingDay.setDescription(updatedDayDTO.getDescription());
                    if(updatedDayDTO.getAccommodation() != null) existingDay.setAccommodation(updatedDayDTO.getAccommodation());
                    if(updatedDayDTO.getMeals() != null) existingDay.setMeals(updatedDayDTO.getMeals());
                    return itineraryDayRepository.save(existingDay);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Itinerary day not found"));
    }

    // DELETE Itinerary Day
    @DeleteMapping("/{dayId}")
    public ResponseEntity<Void> deleteItineraryDay(
            @PathVariable Long packageId,
            @PathVariable Long dayId) {

        ItineraryDay day = itineraryDayRepository.findByIdAndTravelPackageId(dayId, packageId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Itinerary day not found"));
        
        itineraryDayRepository.delete(day);
        return ResponseEntity.noContent().build();
    }

}