package com.example.backend.service;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Activity;
import com.example.backend.repository.ActivityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public void delete(Long id) {
        repository.deleteById(id);
    }
}