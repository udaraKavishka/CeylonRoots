
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

import com.example.backend.model.DestinationDetails;
import com.example.backend.service.DestinationDetailService;

@RestController
@RequestMapping("api/destinationdetail")
public class DestinationDetailController {
	
	private final DestinationDetailService service;
	
	public DestinationDetailController(DestinationDetailService service) {
		this.service=service;
	}
	
	@PostMapping
    public ResponseEntity<DestinationDetails> create(@RequestBody DestinationDetails destinationDetails) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(destinationDetails));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DestinationDetails> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<DestinationDetails>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DestinationDetails> update(@PathVariable Long id, @RequestBody DestinationDetails destinationDetails) {
        return ResponseEntity.ok(service.update(id, destinationDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        return ResponseEntity.ok(service.delete(id));
    }

}
