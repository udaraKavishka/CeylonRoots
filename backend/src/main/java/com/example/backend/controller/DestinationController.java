package com.example.backend.controller;

import com.example.backend.model.Destination;
import com.example.backend.repository.DestinationRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/destinations")
public class DestinationController {

    private final DestinationRepository destinationRepository;

    public DestinationController(DestinationRepository destinationRepository) {
        this.destinationRepository = destinationRepository;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Destination createDestination(@Valid @RequestBody Destination destination) {
        return destinationRepository.save(destination);
    }

    @PutMapping("/{id}")
    public Destination updateDestination(
            @PathVariable Long id,
            @Valid @RequestBody Destination destination) {
        return destinationRepository.findById(id)
                .map(existing -> {
                    destination.setId(id);
                    return destinationRepository.save(destination);
                })
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Destination not found with id: " + id
                ));
    }

    @GetMapping
    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }

    @GetMapping("/{id}")
    public Destination getDestinationById(@PathVariable Long id) {
        return destinationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Destination not found with id: " + id
                ));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDestination(@PathVariable Long id) {
        if (!destinationRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Destination not found with id: " + id
            );
        }
        destinationRepository.deleteById(id);
    }
}