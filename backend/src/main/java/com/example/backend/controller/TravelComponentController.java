package com.example.backend.controller;

import com.example.backend.model.TravelComponent;
import com.example.backend.repository.TravelComponentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/components")
public class TravelComponentController {

    protected final TravelComponentRepository repository;

    public TravelComponentController(TravelComponentRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<TravelComponent> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public TravelComponent getById(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Component not found"));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComponent(@PathVariable Long id) {
        repository.deleteById(id);
    }
}