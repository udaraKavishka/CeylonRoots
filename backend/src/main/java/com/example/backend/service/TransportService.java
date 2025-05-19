package com.example.backend.service;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Transport;
import com.example.backend.repository.TransportRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransportService {

    private final TransportRepository repository;

    public TransportService(TransportRepository repository) {
        this.repository = repository;
    }

    public Transport create(Transport transport) {
        return repository.save(transport);
    }

    public Transport getById(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Transport not found"));
    }

    public List<Transport> getAll() {
        return repository.findAll();
    }

    public Transport update(Long id, Transport transport) {
        Transport existing = getById(id);
        transport.setId(existing.getId());
        return repository.save(transport);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}