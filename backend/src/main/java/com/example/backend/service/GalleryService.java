package com.example.backend.service;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.GalleryItem;
import com.example.backend.repository.GalleryRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GalleryService {

    private final GalleryRepository repository;

    public GalleryService(GalleryRepository repository) {
        this.repository = repository;
    }

    public GalleryItem create(GalleryItem galleryitem) {
        return repository.save(galleryitem);
    }

    public GalleryItem getById(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Gallery Item not found"));
    }

    public List<GalleryItem> getAll() {
        return repository.findAll();
    }

    public GalleryItem update(Long id, GalleryItem galleryitem) {
    	GalleryItem existing = getById(id);
    	galleryitem.setId(existing.getId());
        return repository.save(galleryitem);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}