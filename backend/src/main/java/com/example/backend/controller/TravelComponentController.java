package com.example.backend.controller;

import com.example.backend.model.TravelComponent;
import com.example.backend.repository.TravelComponentRepository;
import jakarta.validation.Valid;
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

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TravelComponent createComponent(@Valid @RequestBody TravelComponent component) {
        return repository.save(component);
    }

    @GetMapping
    public List<TravelComponent> getAllComponents() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public TravelComponent getComponentById(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, 
                        "Component not found with id: " + id
                ));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComponent(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Component not found with id: " + id
            );
        }
        repository.deleteById(id);
    }
}