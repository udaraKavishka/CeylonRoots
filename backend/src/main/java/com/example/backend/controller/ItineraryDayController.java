package com.example.backend.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backend.dto.ItineraryDayRequest;
import com.example.backend.model.ItineraryDay;
import com.example.backend.service.ItineraryDayService;

@RestController
@RequestMapping("/api/travel-packages/{travelPackageId}/itinerary")
public class ItineraryDayController {
    private final ItineraryDayService itineraryDayService;

    public ItineraryDayController(ItineraryDayService itineraryDayService) {
        this.itineraryDayService = itineraryDayService;
    }

    @PostMapping
    public ResponseEntity<ItineraryDay> create(
            @PathVariable Long travelPackageId,
            @RequestBody ItineraryDayRequest dto
    ) {
        ItineraryDay created = itineraryDayService.createItineraryDay(dto, travelPackageId);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/{dayId}")
    public ResponseEntity<ItineraryDay> getById(
            @PathVariable Long travelPackageId,
            @PathVariable Long dayId
    ) {
        return ResponseEntity.ok(itineraryDayService.getDayInPackage(travelPackageId, dayId));
    }

    @GetMapping
    public ResponseEntity<List<ItineraryDay>> getByTravelPackage(
            @PathVariable Long travelPackageId
    ) {
        return ResponseEntity.ok(itineraryDayService.getAllByTravelPackage(travelPackageId));
    }

    @PutMapping("/{dayId}")
    public ResponseEntity<ItineraryDay> update(
            @PathVariable Long travelPackageId,
            @PathVariable Long dayId,
            @RequestBody ItineraryDayRequest dto
    ) {
        return ResponseEntity.ok(
            itineraryDayService.updateItineraryDay(travelPackageId, dayId, dto)
        );
    }

    @DeleteMapping("/{dayId}")
    public ResponseEntity<Void> delete(
            @PathVariable Long travelPackageId,
            @PathVariable Long dayId
    ) {
        itineraryDayService.deleteItineraryDay(travelPackageId, dayId);
        return ResponseEntity.noContent().build();
    }
}