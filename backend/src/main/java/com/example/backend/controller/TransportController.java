package com.example.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.model.Transport;
import com.example.backend.service.TransportService;

@RestController
@RequestMapping("/api/transport")
public class TransportController {
	private final TransportService service;

    public TransportController(TransportService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Transport> create(@RequestBody Transport transport) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(transport));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transport> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<Transport>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transport> update(@PathVariable Long id, @RequestBody Transport transport) {
        return ResponseEntity.ok(service.update(id, transport));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        return ResponseEntity.ok(service.delete(id));
    }
}
