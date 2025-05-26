package com.example.backend.service;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Accommodation;
import com.example.backend.repository.AccommodationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AccommodationService {

    private final AccommodationRepository repository;

    public AccommodationService(AccommodationRepository repository) {
        this.repository = repository;
    }

    public Accommodation create(Accommodation accommodation) {
        return repository.save(accommodation);
    }

    public Accommodation getById(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Accommodation not found"));
    }

    public List<Accommodation> getAll() {
        return repository.findAll();
    }

    public Accommodation update(Long id, Accommodation accommodation) {
        Accommodation existing = getById(id);
        accommodation.setId(existing.getId());
        return repository.save(accommodation);
    }

    @Transactional
    public String delete(Long id) {
        Accommodation accommodation = getById(id);
        repository.delete(accommodation);
        return "Accommodation with ID " + id + " was deleted successfully";
    }
}