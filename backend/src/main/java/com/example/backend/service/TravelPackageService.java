package com.example.backend.service;

import com.example.backend.dto.TravelPackageRequest;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Activity;
import com.example.backend.model.Destination;
import com.example.backend.model.ItineraryDay;
import com.example.backend.model.TravelPackage;
import com.example.backend.repository.ActivityRepository;
import com.example.backend.repository.DestinationRepository;
import com.example.backend.repository.TravelPackageRepository;

import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        return repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("TravelPackage not found"));
    }

    public List<TravelPackage> getAll() {
        return repository.findAll();
    }

    public TravelPackage update(Long id, TravelPackage travelPackage) {
    	TravelPackage existing = getById(id);
    	travelPackage.setId(existing.getId());
        return repository.save(travelPackage);
    }

    @Transactional
    public String delete(Long id) {
    	TravelPackage travelPackage = getById(id);
        repository.delete(travelPackage);
        return "TravelPackage with ID " + id + " was deleted successfully";
    }
}