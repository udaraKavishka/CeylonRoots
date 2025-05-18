package com.example.backend.dto;

public record ItineraryDayResponse(
    Long id,
    String title,
    String location,
    String description,
    String accommodation,
    String meals
) {}