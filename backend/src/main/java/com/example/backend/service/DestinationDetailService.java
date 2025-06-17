package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.DestinationDetails;
import com.example.backend.repository.DestinationDetailRepository;

@Service
public class DestinationDetailService {
	
	private final DestinationDetailRepository repository;
	
	public DestinationDetailService(DestinationDetailRepository repository) {
		this.repository=repository;
	}
	
	public DestinationDetails create(DestinationDetails destinationdetail) {
		return repository.save(destinationdetail);
	}
	
	public DestinationDetails getById(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Destination Details not found"));
    }

    public List<DestinationDetails> getAll() {
        return repository.findAll();
    }

    public DestinationDetails update(Long id, DestinationDetails destinationDetails) {
    	DestinationDetails existing = getById(id);
    	destinationDetails.setId(existing.getId());
        return repository.save(destinationDetails);
    }

    @Transactional
    public String delete(Long id) {
    	DestinationDetails destinationDetails = getById(id);
        repository.delete(destinationDetails);
        return "Destination Detail with ID " + id + " was deleted successfully";
    }
	
	
}
