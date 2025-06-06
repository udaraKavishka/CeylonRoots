package com.example.backend.service;

import com.example.backend.dto.ItineraryDayRequest;
import com.example.backend.dto.TravelPackageRequest;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Activity;
import com.example.backend.model.ActivityData;
import com.example.backend.model.Destination;
import com.example.backend.model.DestinationData;
import com.example.backend.model.ItineraryDay;
import com.example.backend.model.TravelPackage;
import com.example.backend.repository.ActivityRepository;
import com.example.backend.repository.DestinationRepository;
import com.example.backend.repository.TravelPackageRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TravelPackageService {
	private final TravelPackageRepository repository;

    public TravelPackageService(TravelPackageRepository repository) {
        this.repository = repository;
    }
    
    

//    public TravelPackage create(TravelPackage travelPackage) {
//        return repository.save(travelPackage);
//    }
    
    
    public TravelPackage createPackage(TravelPackageRequest request) {
        TravelPackage travelPackage = new TravelPackage();
        travelPackage.setTitle(request.getTitle());
        travelPackage.setDescription(request.getDescription());
        travelPackage.setImageUrl(request.getImageUrl());
        travelPackage.setDurationDays(request.getDurationDays());
        travelPackage.setPrice(request.getPrice());
        travelPackage.setRating(request.getRating());
        travelPackage.setReviewCount(request.getReviewCount());
        travelPackage.setHighlights(request.getHighlights());
        travelPackage.setGallery(request.getGallery());
        travelPackage.setIncludes(request.getIncludes());
        travelPackage.setExcludes(request.getExcludes());
        travelPackage.setDestinations(request.getDestinations()); // names only

        // Build itinerary days
        List<ItineraryDay> itineraryDays = new ArrayList<>();

        if (request.getItineraryDays() != null) {
            for (ItineraryDayRequest itineraryDTO : request.getItineraryDays()) {
                ItineraryDay itinerary = new ItineraryDay();
                itinerary.setDayNumber(itineraryDTO.getDayNumber());
                itinerary.setTitle(itineraryDTO.getTitle());
                itinerary.setDescription(itineraryDTO.getDescription());
                itinerary.setMainTown(itineraryDTO.getMainTown());
                itinerary.setTravelPackage(travelPackage);

                
                if (itineraryDTO.getActivity() != null) {
                    List<ActivityData> activities = itineraryDTO.getActivity().stream()
                        .map(dto -> {
                            ActivityData activity = new ActivityData();
                            activity.setName(dto.getName());
                            return activity;
                        })
                        .collect(Collectors.toList());

                    itinerary.setActivities(activities);
                }

                itineraryDays.add(itinerary);
            }
        }

        travelPackage.setItineraryDays(itineraryDays);


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