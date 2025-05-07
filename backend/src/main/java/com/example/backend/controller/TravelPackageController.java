package com.example.backend.controller;

import com.example.backend.model.TravelPackage;
import com.example.backend.repository.TravelPackageRepository;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

// API Routes Documented
@RestController
@RequestMapping("/api/travel-packages")
public class TravelPackageController {

    private final TravelPackageRepository travelPackageRepository;

    public TravelPackageController(TravelPackageRepository travelPackageRepository) {
        this.travelPackageRepository = travelPackageRepository;
    }

    @GetMapping
    public List<TravelPackage> getAllTravelPackages() {
        return travelPackageRepository.findAll();
    }

    @GetMapping("/{id}")
    public TravelPackage getTravelPackageById(@PathVariable Long id) {
        return travelPackageRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Travel package not found"));
    }

    @PostMapping
    public ResponseEntity<TravelPackage> createTravelPackage(
        @Valid @RequestBody TravelPackage travelPackage
    ) {
        if (travelPackageRepository.existsByTitleIgnoreCase(travelPackage.getTitle())) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT, 
                "Travel package with this title already exists"
            );
        }
        TravelPackage savedPackage = travelPackageRepository.save(travelPackage);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPackage);
    }

    @PutMapping("/{id}")
    public TravelPackage updateTravelPackage(
        @PathVariable Long id,
        @Valid @RequestBody TravelPackage updatedPackage
    ) {
        return travelPackageRepository.findById(id)
            .map(existing -> {
                // Merge all fields conditionally
                if (updatedPackage.getTitle() != null) {
                    existing.setTitle(updatedPackage.getTitle());
                }
                
                if (updatedPackage.getDescription() != null) {
                    existing.setDescription(updatedPackage.getDescription());
                }
                
                if (updatedPackage.getImage() != null) {
                    existing.setImage(updatedPackage.getImage());
                }
                
                if (updatedPackage.getDuration() > 0) {
                    existing.setDuration(updatedPackage.getDuration());
                }
                
                if (updatedPackage.getPrice() >= 0) {
                    existing.setPrice(updatedPackage.getPrice());
                }
                
                if (updatedPackage.getRating() >= 0) {
                    existing.setRating(updatedPackage.getRating());
                }
                
                if (updatedPackage.getReviewCount() >= 0) {
                    existing.setReviewCount(updatedPackage.getReviewCount());
                }
                
                if (updatedPackage.getRegions() != null) {
                    existing.setRegions(updatedPackage.getRegions());
                }
                
                if (updatedPackage.getThemes() != null) {
                    existing.setThemes(updatedPackage.getThemes());
                }
                
                if (updatedPackage.getHighlights() != null) {
                    existing.setHighlights(updatedPackage.getHighlights());
                }
                
                if (updatedPackage.getItinerary() != null) {
                    existing.setItinerary(updatedPackage.getItinerary());
                }
                
                if (updatedPackage.getPriceIncludes() != null) {
                    existing.setPriceIncludes(updatedPackage.getPriceIncludes());
                }
                
                if (updatedPackage.getPriceExcludes() != null) {
                    existing.setPriceExcludes(updatedPackage.getPriceExcludes());
                }

                return travelPackageRepository.save(existing);
            })
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTravelPackage(@PathVariable Long id) {
        TravelPackage travelPackage = travelPackageRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Travel package with id " + id + " not found"
            ));
        travelPackageRepository.delete(travelPackage);
    }
    

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<String> handleNotFound(ResponseStatusException ex) {
        return ResponseEntity.status(ex.getStatusCode()).body(ex.getReason());
    }
}

