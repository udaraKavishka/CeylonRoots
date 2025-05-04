package com.example.backend.controller;

import com.example.backend.model.Transport;
import com.example.backend.repository.TravelComponentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transport")
public class TransportController extends TravelComponentController {

    public TransportController(TravelComponentRepository repository) {
        super(repository);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Transport create(@RequestBody Transport transport) {
        return repository.save(transport);
    }

    @PutMapping("/{id}")
    public Transport update(@PathVariable Long id, @RequestBody Transport transport) {
    	transport.setId(id);
        return repository.save(transport);
    }
}