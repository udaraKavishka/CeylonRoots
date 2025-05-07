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

    @PostMapping
    public ResponseEntity<TravelPackage> addItineraryDayToPackage(
            @PathVariable Long packageId,
            @Valid @RequestBody ItineraryDayRequest request) {

        TravelPackage travelPackage = travelPackageRepository.findById(packageId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Travel package not found"));

        ItineraryDay newDay = new ItineraryDay();
        newDay.setTitle(request.getTitle());
        newDay.setLocation(request.getLocation());
        newDay.setDescription(request.getDescription());
        newDay.setAccommodation(request.getAccommodation());
        newDay.setMeals(request.getMeals());
        
        // Add to both sides of the relationship
        newDay.setTravelPackage(travelPackage);
        travelPackage.getItinerary().add(newDay);

        travelPackageRepository.save(travelPackage); // Cascades save to itinerary days

        return ResponseEntity.ok(travelPackage);
    }

    @GetMapping
    public List<ItineraryDay> getAllItineraryDays(@PathVariable Long packageId) {
        return itineraryDayRepository.findByTravelPackageId(packageId);
    }

    @GetMapping("/{dayId}")
    public ItineraryDay getItineraryDay(
            @PathVariable Long packageId,
            @PathVariable Long dayId) {
        
        return itineraryDayRepository.findByIdAndTravelPackageId(dayId, packageId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{dayId}")
    public ItineraryDay updateItineraryDay(
            @PathVariable Long packageId,
            @PathVariable Long dayId,
            @RequestBody ItineraryDay updatedDay) {
        
        return itineraryDayRepository.findByIdAndTravelPackageId(dayId, packageId)
                .map(existing -> {
                    updatedDay.setId(dayId);
                    return itineraryDayRepository.save(updatedDay);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{dayId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteItineraryDay(
            @PathVariable Long packageId,
            @PathVariable Long dayId) {
        
        itineraryDayRepository.deleteById(dayId);
    }
}