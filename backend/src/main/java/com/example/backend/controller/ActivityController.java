package com.example.backend.controller;

import com.example.backend.model.Activity;
import com.example.backend.repository.TravelComponentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/activity")
public class ActivityController extends TravelComponentController {

    public ActivityController(TravelComponentRepository repository) {
        super(repository);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Activity create(@RequestBody Activity activity) {
        return repository.save(activity);
    }

    @PutMapping("/{id}")
    public Activity update(@PathVariable Long id, @RequestBody Activity activity) {
        activity.setId(id);
        return repository.save(activity);
    }
}