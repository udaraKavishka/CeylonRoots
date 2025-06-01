package com.example.backend.controller;

import com.example.backend.model.TravelPackage;
import com.example.backend.service.TravelPackageService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/packages")
public class TravelPackageController {
	private final TravelPackageService service;

    public TravelPackageController(TravelPackageService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<TravelPackage> create(@RequestBody TravelPackage travelPackage) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(travelPackage));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TravelPackage> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<TravelPackage>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<TravelPackage> update(@PathVariable Long id, @RequestBody TravelPackage travelPackage) {
        return ResponseEntity.ok(service.update(id, travelPackage));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        return ResponseEntity.ok(service.delete(id));
    }
}