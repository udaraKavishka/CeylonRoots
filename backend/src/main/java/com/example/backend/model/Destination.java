package com.example.backend.model;


import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("DESTINATION")
@Data
@EqualsAndHashCode(callSuper = true)
public class Destination extends TravelComponent {
    @ElementCollection
    @CollectionTable(name = "destination_attractions")
    private Set<String> attractions = new HashSet<>();

    @OneToOne(mappedBy = "destination", cascade = CascadeType.ALL)
    private DestinationDetails details;

    @ManyToMany(mappedBy = "destinations")
    private Set<TravelPackage> travelPackages = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "destination_gallery",
        joinColumns = @JoinColumn(name = "destination_id"),
        inverseJoinColumns = @JoinColumn(name = "gallery_item_id"))
    private Set<GalleryItem> galleryItems = new HashSet<>();
}