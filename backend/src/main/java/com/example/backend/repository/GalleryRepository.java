package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.GalleryItem;

public interface GalleryRepository extends JpaRepository<GalleryItem, Long> {

}
