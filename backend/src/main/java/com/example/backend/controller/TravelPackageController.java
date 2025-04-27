package com.example.backend.controller;

import com.example.backend.model.TravelPackage;
import com.example.backend.repository.TravelPackageRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

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
    public ResponseEntity<TravelPackage> createTravelPackage(@RequestBody TravelPackage travelPackage) {
        TravelPackage savedPackage = travelPackageRepository.save(travelPackage);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPackage);
    }

    @PutMapping("/{id}")
    public TravelPackage updateTravelPackage(@PathVariable Long id, @RequestBody TravelPackage travelPackage) {
        return travelPackageRepository.findById(id)
                .map(existingPackage -> {
                    travelPackage.setId(id);
                    return travelPackageRepository.save(travelPackage);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Travel package not found"));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTravelPackage(@PathVariable Long id) {
        travelPackageRepository.deleteById(id);
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<String> handleNotFound(ResponseStatusException ex) {
        return ResponseEntity.status(ex.getStatusCode()).body(ex.getReason());
    }
}

