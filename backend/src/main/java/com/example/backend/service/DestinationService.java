package com.example.backend.service;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Destination;
import com.example.backend.repository.DestinationRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DestinationService {

    private final DestinationRepository repository;

    public DestinationService(DestinationRepository repository) {
        this.repository = repository;
    }

    public Destination create(Destination destination) {
        return repository.save(destination);
    }

    public Destination getById(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Destination not found"));
    }

    public List<Destination> getAll() {
        return repository.findAll();
    }

    public Destination update(Long id, Destination destination) {
        Destination existing = getById(id);
        destination.setId(existing.getId());
        return repository.save(destination);
    }

    @Transactional
    public String delete(Long id) {
        Destination destination = getById(id);
        repository.delete(destination);
        return "Destination with ID " + id + " was deleted successfully";
    }
}