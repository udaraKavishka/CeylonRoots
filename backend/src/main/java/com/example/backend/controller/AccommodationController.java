package com.example.backend.controller;

import com.example.backend.model.Accomodation;
import com.example.backend.repository.AccommodationRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/accommodations")
public class AccommodationController {

    private final AccommodationRepository repository;

    public AccommodationController(AccommodationRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Accomodation createAccommodation(@Valid @RequestBody Accomodation accommodation) {
        return repository.save(accommodation);
    }

    @GetMapping
    public List<Accomodation> getAllAccommodations() {
        return repository.findAll();
    }

    @PutMapping("/{id}")
    public Accomodation updateAccommodation(
            @PathVariable Long id,
            @Valid @RequestBody Accomodation accommodation) {
        return repository.findById(id)
                .map(existing -> {
                    accommodation.setId(id);
                    return repository.save(accommodation);
                })
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Accommodation not found with id: " + id
                ));
    }
}