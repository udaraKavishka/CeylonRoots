package com.example.backend.controller;

import com.example.backend.model.Accomodation;
import com.example.backend.repository.TravelComponentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accommodations")
public class AccommodationController extends TravelComponentController {

    public AccommodationController(TravelComponentRepository repository) {
        super(repository);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Accomodation create(@RequestBody Accomodation accommodation) {
        return repository.save(accommodation);
    }

    @PutMapping("/{id}")
    public Accomodation update(@PathVariable Long id, @RequestBody Accomodation accommodation) {
        accommodation.setId(id);
        return repository.save(accommodation);
    }
}

