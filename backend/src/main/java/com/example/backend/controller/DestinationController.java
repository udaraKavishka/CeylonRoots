package com.example.backend.controller;

import com.example.backend.model.Destination;
import com.example.backend.repository.TravelComponentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/destination")
public class DestinationController extends TravelComponentController {

    public DestinationController(TravelComponentRepository repository) {
        super(repository);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Destination create(@RequestBody Destination destination) {
        return repository.save(destination);
    }

    @PutMapping("/{id}")
    public Destination update(@PathVariable Long id, @RequestBody Destination destination) {
        destination.setId(id);
        return repository.save(destination);
    }
}