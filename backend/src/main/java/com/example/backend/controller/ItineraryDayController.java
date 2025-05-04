package com.example.backend.controller;

import com.example.backend.model.ItineraryDay;
import com.example.backend.repository.ItineraryDayRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/itinerary-days")
public class ItineraryDayController {

    private final ItineraryDayRepository itineraryDayRepository;

    public ItineraryDayController(ItineraryDayRepository itineraryDayRepository) {
        this.itineraryDayRepository = itineraryDayRepository;
    }

    @GetMapping
    public List<ItineraryDay> getAllItineraryDays() {
        return itineraryDayRepository.findAll();
    }

    @GetMapping("/{id}")
    public ItineraryDay getItineraryDayById(@PathVariable Long id) {
        return itineraryDayRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Itinerary day not found"));
    }

    @PostMapping
    public ResponseEntity<ItineraryDay> createItineraryDay(@RequestBody ItineraryDay itineraryDay) {
        ItineraryDay savedDay = itineraryDayRepository.save(itineraryDay);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedDay);
    }

    @PutMapping("/{id}")
    public ItineraryDay updateItineraryDay(@PathVariable Long id, @RequestBody ItineraryDay itineraryDay) {
        return itineraryDayRepository.findById(id)
                .map(existingDay -> {
                    itineraryDay.setId(id);
                    return itineraryDayRepository.save(itineraryDay);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Itinerary day not found"));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteItineraryDay(@PathVariable Long id) {
        itineraryDayRepository.deleteById(id);
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<String> handleNotFound(ResponseStatusException ex) {
        return ResponseEntity.status(ex.getStatusCode()).body(ex.getReason());
    }
}