package com.example.backend.service;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Activity;
import com.example.backend.repository.ActivityRepository;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ActivityService {
    private final ActivityRepository repository;

    public ActivityService(ActivityRepository repository) {
        this.repository = repository;
    }

    public Activity create(Activity activity) {
        return repository.save(activity);
    }

    public Activity getById(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Activity not found"));
    }

    public List<Activity> getAll() {
        return repository.findAll();
    }

    public Activity update(Long id, Activity activity) {
        Activity existing = getById(id);
        activity.setId(existing.getId());
        return repository.save(activity);
    }

    @Transactional
    public String delete(Long id) {
        Activity activity = getById(id);
        repository.delete(activity);
        return "Activity with ID " + id + " was deleted successfully";
    }
}