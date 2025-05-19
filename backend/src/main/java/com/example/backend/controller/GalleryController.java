package com.example.backend.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.model.GalleryItem;
import com.example.backend.service.GalleryService;

import java.util.List;

@RestController
@RequestMapping("/api/gallery")
public class GalleryController {

    private final GalleryService service;

    public GalleryController(GalleryService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<GalleryItem> create(@RequestBody GalleryItem galleryitem) {
        return ResponseEntity.ok(service.create(galleryitem));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GalleryItem> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<GalleryItem>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<GalleryItem> update(@PathVariable Long id, @RequestBody GalleryItem galleryitem) {
        return ResponseEntity.ok(service.update(id, galleryitem));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}