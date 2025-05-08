package com.example.backend.controller;

import com.example.backend.model.Transport;
import com.example.backend.repository.TransportRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/transports")
public class TransportController {

    private final TransportRepository transportRepository;

    public TransportController(TransportRepository transportRepository) {
        this.transportRepository = transportRepository;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Transport createTransport(@Valid @RequestBody Transport transport) {
        return transportRepository.save(transport);
    }

    @PutMapping("/{id}")
    public Transport updateTransport(
            @PathVariable Long id,
            @Valid @RequestBody Transport transport) {
        return transportRepository.findById(id)
                .map(existing -> {
                    transport.setId(id);
                    return transportRepository.save(transport);
                })
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Transport not found with id: " + id
                ));
    }

    @GetMapping
    public List<Transport> getAllTransports() {
        return transportRepository.findAll();
    }

    @GetMapping("/{id}")
    public Transport getTransportById(@PathVariable Long id) {
        return transportRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Transport not found with id: " + id
                ));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTransport(@PathVariable Long id) {
        if (!transportRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Transport not found with id: " + id
            );
        }
        transportRepository.deleteById(id);
    }
}