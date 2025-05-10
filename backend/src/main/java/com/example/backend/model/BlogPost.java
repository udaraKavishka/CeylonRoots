package com.example.backend.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class BlogPost extends BaseEntity {
    private String title;
    private String excerpt;
    
    @Lob
    private String content;
    
    private String imageUrl;
    private LocalDate postDate;
    private String author;
    private String category;
    
    @ElementCollection
    @CollectionTable(name = "blog_tags")
    private Set<String> tags = new HashSet<>();
    
    @OneToMany(mappedBy = "blogPost", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BlogComment> comments = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "related_posts",
        joinColumns = @JoinColumn(name = "post_id"),
        inverseJoinColumns = @JoinColumn(name = "related_post_id"))
    private Set<BlogPost> relatedPosts = new HashSet<>();
}