package com.example.backend.service;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.BlogPost;
import com.example.backend.repository.BlogPostRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogPostService {

    private final BlogPostRepository repository;

    public BlogPostService(BlogPostRepository repository) {
        this.repository = repository;
    }

    public BlogPost create(BlogPost blogpost) {
        return repository.save(blogpost);
    }

    public BlogPost getById(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("BlogPost not found"));
    }

    public List<BlogPost> getAll() {
        return repository.findAll();
    }

    public BlogPost update(Long id, BlogPost blogpost) {
    	BlogPost existing = getById(id);
        blogpost.setId(existing.getId());
        return repository.save(blogpost);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}