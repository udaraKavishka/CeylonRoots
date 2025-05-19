package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.BlogPost;

public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {

}
