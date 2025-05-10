package com.example.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class BlogComment extends BaseEntity {
    private String author;
    private String avatarUrl;
    private LocalDateTime commentDate;
    
    @Lob
    private String text;

    @ManyToOne
    @JoinColumn(name = "blog_post_id")
    private BlogPost blogPost;
}