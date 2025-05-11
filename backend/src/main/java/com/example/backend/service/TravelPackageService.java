package com.example.backend.service;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.TravelPackage;
import com.example.backend.repository.TravelPackageRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TravelPackageService {
    private final TravelPackageRepository repository;

    public TravelPackageService(TravelPackageRepository repository) {
        this.repository = repository;
    }

    public TravelPackage create(TravelPackage travelPackage) {
        return repository.save(travelPackage);
    }

    public TravelPackage getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Package not found"));
    }

    public List<TravelPackage> getAll() {
        return repository.findAll();
    }

    public TravelPackage update(Long id, TravelPackage travelPackage) {
        TravelPackage existing = getById(id);
        existing.setTitle(travelPackage.getTitle());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}